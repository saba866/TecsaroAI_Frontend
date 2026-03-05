


"use client";

import { useState, useEffect, useRef } from "react";
import { supabaseBrowser } from "@/lib/supabaseClient";
import {  Spinner, ErrorMsg } from "@/components/ui/icons";
import type { ProjectData } from "@/components/onboarding/OnboardingWizard";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

type AISuggestion = {
  id: string;
  name: string;
  domain: string;
  confidence_score: number;
  times_seen: number;
  detected_reason?: string;
  classification?: string;
};


type Props = {
  data:     ProjectData;
  onUpdate: (p: Partial<ProjectData>) => void;
  onNext:   () => void;
};

export default function Step5AICompetitors({ data, onUpdate, onNext }: Props) {
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
  // "waiting" = Phase 2 still running, "ready" = suggestions loaded, "error"
  const [loadState,   setLoadState]   = useState<"waiting" | "ready" | "error">("waiting");
  const [loadError,   setLoadError]   = useState("");
  const [accepted,    setAccepted]    = useState<Set<string>>(new Set());
  const [saving,      setSaving]      = useState(false);
  const [saveError,   setSaveError]   = useState("");

  const pollRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const loadedRef  = useRef(false);

  // ── Auth helper ──────────────────────────────────────────────

  const getToken = async () => {
    const { data: s } = await supabaseBrowser.auth.getSession();
    return s?.session?.access_token ?? null;
  };

  // ─────────────────────────────────────────────────────────────
  // PHASE POLLING — wait until plan.pipeline_status = "awaiting_competitor_review"
  // THEN load suggestions
  // ─────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!data.planId) {
      setLoadError("Plan ID missing — please go back to Step 1.");
      setLoadState("error");
      return;
    }

    let cancelled = false;

    const checkPhase = async () => {
      if (cancelled || loadedRef.current) return;

      try {
        const token = await getToken();
        if (!token) { setLoadError("Session expired."); setLoadState("error"); return; }

        const res  = await fetch(`${BACKEND_URL}/plans/${data.planId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;

        const plan   = await res.json();
        const status = (plan?.data?.pipeline_status ?? plan?.pipeline_status ?? "") as string;

        if (status === "awaiting_competitor_review") {
          clearInterval(pollRef.current);
          loadedRef.current = true;
          await loadSuggestions(token);
        }

        // Pipeline already past this stage — skip
        if (status === "completed" && !loadedRef.current) {
          clearInterval(pollRef.current);
          loadedRef.current = true;
          onNext();
        }
      } catch { /* silent retry */ }
    };

    checkPhase();
    pollRef.current = setInterval(checkPhase, 4000);

    return () => { cancelled = true; clearInterval(pollRef.current); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ─────────────────────────────────────────────────────────────
  // LOAD SUGGESTIONS — GET /aeo/competitors/:planId
  // ─────────────────────────────────────────────────────────────

  const loadSuggestions = async (token?: string | null) => {
    try {
      const t = token ?? await getToken();
      if (!t) { setLoadError("Session expired."); setLoadState("error"); return; }

      const res  = await fetch(`${BACKEND_URL}/aeo/competitors/${data.planId}`, {
        headers: { Authorization: `Bearer ${t}` },
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setLoadError(json?.error ?? "Failed to load AI competitor suggestions.");
        setLoadState("error");
        return;
      }

      const payload = await res.json();
      const items: AISuggestion[] = payload?.suggestions ?? payload?.competitors ?? [];

      setSuggestions(items);
      setAccepted(new Set(items.map((c) => c.id))); // pre-select all
      setLoadState("ready");
    } catch (err) {
      console.error("[Step5] loadSuggestions:", err);
      setLoadError("Network error — check your connection.");
      setLoadState("error");
    }
  };

  // ─────────────────────────────────────────────────────────────
  // TOGGLE / BULK ACTIONS
  // ─────────────────────────────────────────────────────────────

  const toggle   = (id: string) =>
    setAccepted((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const acceptAll = () => setAccepted(new Set(suggestions.map((c) => c.id)));
  const clearAll  = () => setAccepted(new Set());

  // ─────────────────────────────────────────────────────────────
  // CONFIRM — PUT /aeo/competitors/:id/accept|ignore per competitor
  // then POST /aeo/competitors/confirm-review to trigger Phase 3
  // ─────────────────────────────────────────────────────────────

  const handleConfirm = async (skipAll = false) => {
    setSaving(true);
    setSaveError("");

    try {
      const token = await getToken();
      if (!token) { setSaveError("Session expired — please sign in again."); setSaving(false); return; }

      if (!skipAll && suggestions.length > 0) {
        // Accept / ignore each competitor in parallel
        const calls = suggestions.map((comp) => {
          const action = accepted.has(comp.id) ? "accept" : "ignore";
          return fetch(`${BACKEND_URL}/aeo/competitors/${comp.id}/${action}`, {
            method:  "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body:    JSON.stringify({ planId: data.planId }),
          });
        });

        const results = await Promise.allSettled(calls);
        const failed  = results.filter((r) => r.status === "rejected" || (r.status === "fulfilled" && !r.value.ok));
        if (failed.length) console.warn(`[Step5] ${failed.length} calls failed`);
      }

      // ── TRIGGER PHASE 3 explicitly ──
      // This is cleaner than relying on "all reviewed" detection in the backend.
      await fetch(`${BACKEND_URL}/aeo/competitors/confirm-review`, {
        method:  "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body:    JSON.stringify({ planId: data.planId }),
      });

      // Persist into wizard state
      onUpdate({
        aiCompetitors: suggestions.map((c) => ({
          name:       c.name,
          domain:     c.domain,
          confidence: Math.round(c.confidence_score * 100),
          accepted:   accepted.has(c.id),
        })),
      });

      onNext();
    } catch (err) {
      console.error("[Step5] handleConfirm:", err);
      setSaveError("Network error — check your connection and try again.");
      setSaving(false);
    }
  };

  // ─────────────────────────────────────────────────────────────
  // RENDER — waiting for Phase 2
  // ─────────────────────────────────────────────────────────────

  if (loadState === "waiting") {
    return (
      <div className="animate-in fade-in duration-300">
        <div className="glass-dark rounded-2xl border border-border/50 p-8 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet/10 border border-violet/20 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-violet animate-pulse"/>
            <span className="text-xs font-medium text-violet-light">Step 5 of 5</span>
          </div>
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">
            Discovering AI competitors…
          </h2>
          <p className="text-muted-foreground text-sm mb-10">
            Running mapping and brand analysis. Checking which brands appear most in AI answers for your prompts.
          </p>

          {/* Phase 2 stages */}
          <div className="space-y-3 mb-6">
            {[
              { label: "Mapping prompts to pages", icon: "🗺️" },
              { label: "Building brand profile",   icon: "🏢" },
              { label: "Discovering competitors",  icon: "🔍" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-emerald/5 border border-emerald/10">
                <span>{s.icon}</span>
                <span className="text-sm text-graphite">{s.label}</span>
                <div className="ml-auto flex gap-0.5">
                  {[0, 1, 2].map((dot) => (
                    <div key={dot} className="w-1 h-1 rounded-full bg-emerald/40 animate-bounce"
                      style={{ animationDelay: `${(i * 300 + dot * 150)}ms` }}/>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-3 py-4">
            <Spinner size={24}/>
            <p className="text-xs text-graphite animate-pulse">This usually takes 30–60 seconds…</p>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // RENDER — error
  // ─────────────────────────────────────────────────────────────

  if (loadState === "error") {
    return (
      <div className="animate-in fade-in duration-300">
        <div className="glass-dark rounded-2xl border border-border/50 p-8 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet/10 border border-violet/20 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-violet"/>
            <span className="text-xs font-medium text-violet-light">Step 5 of 5</span>
          </div>
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">AI found these competitors</h2>
          <ErrorMsg msg={loadError} onRetry={() => loadSuggestions()} />
          <button onClick={() => handleConfirm(true)} disabled={saving}
            className="mt-5 w-full py-3.5 rounded-xl text-graphite text-sm border border-border hover:text-foreground hover:border-border/80 transition-all">
            {saving ? <span className="flex items-center justify-center gap-2"><Spinner/> Finishing…</span> : "Skip this step →"}
          </button>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // RENDER — no suggestions
  // ─────────────────────────────────────────────────────────────

  if (suggestions.length === 0) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="glass-dark rounded-2xl border border-border/50 p-8 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet/10 border border-violet/20 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-violet"/>
            <span className="text-xs font-medium text-violet-light">Step 5 of 5</span>
          </div>
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">No AI competitors found yet</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            No competitor suggestions were found at this stage. You can add competitors manually from the dashboard at any time.
          </p>
          <button onClick={() => handleConfirm(true)} disabled={saving}
            className="w-full py-3.5 rounded-xl bg-emerald hover:bg-emerald-light text-charcoal font-semibold text-sm
              transition-all duration-200 hover:shadow-[0_0_24px_rgba(15,191,154,0.4)] active:scale-[0.98]
              disabled:opacity-70 disabled:cursor-not-allowed">
            {saving ? <span className="flex items-center justify-center gap-2"><Spinner/> Finishing…</span> : "Continue to Dashboard →"}
          </button>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // RENDER — main
  // ─────────────────────────────────────────────────────────────

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="glass-dark rounded-2xl border border-border/50 p-8 shadow-2xl">

        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet/10 border border-violet/20 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-violet animate-pulse"/>
            <span className="text-xs font-medium text-violet-light">Step 5 of 5</span>
          </div>
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">AI found these competitors</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            These brands appeared most often in AI answers for your prompts. Add them for competitive benchmarking.
          </p>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-2 mb-5">
          <button onClick={acceptAll} disabled={saving}
            className="px-3.5 py-1.5 rounded-lg bg-emerald/10 border border-emerald/20 text-emerald text-xs font-medium
              hover:bg-emerald/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
            Accept All
          </button>
          <button onClick={clearAll} disabled={saving}
            className="px-3.5 py-1.5 rounded-lg bg-charcoal border border-border text-graphite text-xs font-medium
              hover:text-foreground hover:border-border/80 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
            Clear All
          </button>
          <span className="ml-auto text-xs text-graphite">{accepted.size} of {suggestions.length} selected</span>
        </div>

        {/* Competitor cards */}
        <div className="space-y-2 mb-7">
          {suggestions.map((comp) => {
            const isAccepted = accepted.has(comp.id);
            const confidence = Math.round(comp.confidence_score * 100);
            const mentions   = comp.times_seen ?? 0;

            return (
              <div key={comp.id} onClick={() => !saving && toggle(comp.id)}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200
                  ${saving ? "cursor-not-allowed opacity-60"
                    : isAccepted
                    ? "bg-emerald/5 border-emerald/30 cursor-pointer"
                    : "border-border/50 hover:border-border hover:bg-charcoal/40 cursor-pointer"}`}>

                <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-heading font-bold text-sm flex-shrink-0 transition-all
                  ${isAccepted ? "bg-emerald/20 text-emerald" : "bg-charcoal-light text-graphite"}`}>
                  {comp.name[0]?.toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{comp.name}</span>
                    <span className="text-xs text-graphite/60 font-mono">{comp.domain}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1.5">
                      <div className="w-20 h-1 bg-charcoal rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-500
                          ${confidence >= 80 ? "bg-emerald" : confidence >= 60 ? "bg-amber" : "bg-graphite"}`}
                          style={{ width: `${confidence}%` }} />
                      </div>
                      <span className="text-[10px] text-graphite">{confidence}% match</span>
                    </div>
                    {mentions > 0 && (
                      <span className="text-[10px] text-graphite">
                        appeared in {mentions} AI answer{mentions !== 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                </div>

                <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border transition-all
                  ${isAccepted ? "bg-emerald border-emerald" : "border-border bg-transparent"}`}>
                  {isAccepted && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5L4 7L8 3" stroke="#0B0F14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {saveError && <div className="mb-5"><ErrorMsg msg={saveError}/></div>}

        <div className="flex gap-3">
          <button onClick={() => handleConfirm(false)} disabled={saving}
            className="flex-1 py-3.5 rounded-xl bg-emerald hover:bg-emerald-light text-charcoal font-semibold text-sm
              transition-all duration-200 hover:shadow-[0_0_24px_rgba(15,191,154,0.4)] active:scale-[0.98]
              disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100">
            {saving ? (
              <span className="flex items-center justify-center gap-2"><Spinner/> Saving…</span>
            ) : accepted.size > 0 ? (
              `Add ${accepted.size} Competitor${accepted.size !== 1 ? "s" : ""} →`
            ) : (
              "Continue →"
            )}
          </button>
          {!saving && (
            <button onClick={() => handleConfirm(true)}
              className="px-5 py-3.5 rounded-xl text-graphite text-sm hover:text-foreground border border-border hover:border-border/80 transition-all">
              Skip
            </button>
          )}
        </div>
      </div>
    </div>
  );
}