


"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { supabaseBrowser } from "@/lib/supabaseClient";
import {  Spinner, ErrorMsg } from "@/components/ui/icons";
import type { ProjectData } from "@/components/onboarding/OnboardingWizard";

// ─────────────────────────────────────────────────────────────────
// ENV
// ─────────────────────────────────────────────────────────────────

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// ─────────────────────────────────────────────────────────────────
// TYPES — mirror exactly what the backend returns
// ─────────────────────────────────────────────────────────────────

type Prompt = {
  id: string;
  prompt: string;
  intent: string;
  keywords?: string[];
  status?: string;
  source?: string;
  created_at?: string;
};

type ReviewPayload = {
  prompts:    Prompt[];
  grouped:    Record<string, Prompt[]>;
  total:      number;
  select_max: number;
  select_min: number;
  tier:       string;
};

// ─────────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────────

const INTENT_COLORS: Record<string, string> = {
  "best-of":        "bg-emerald/10 text-emerald border-emerald/20",
  "comparison":     "bg-violet/10 text-violet-light border-violet/20",
  "alternative":    "bg-amber/10 text-amber border-amber/20",
  "recommendation": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "problem":        "bg-rose-500/10 text-rose-400 border-rose-500/20",
  "switching":      "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "research":       "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  "informational":  "bg-graphite/10 text-graphite border-graphite/20",
  "custom":         "bg-graphite/10 text-graphite border-graphite/20",
};


type Props = {
  data:     ProjectData;
  onUpdate: (p: Partial<ProjectData>) => void;
  onNext:   () => void;
};

// ─────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────

export default function Step4PromptSelection({ data, onUpdate, onNext }: Props) {

  // ── Server state ──────────────────────────────────────────────
  const [prompts,   setPrompts]   = useState<Prompt[]>([]);
  const [selectMax, setSelectMax] = useState(20);
  const [selectMin, setSelectMin] = useState(5);
  const [loadState, setLoadState] = useState<"loading" | "error" | "ready">("loading");
  const [loadError, setLoadError] = useState("");

  // ── Selection (local — sent to server on approve) ─────────────
  const [selected,   setSelected]   = useState<Set<string>>(new Set());

  // ── Custom prompt input ───────────────────────────────────────
  const [customInput,  setCustomInput]  = useState("");
  const [customError,  setCustomError]  = useState("");
  const [addingCustom, setAddingCustom] = useState(false);

  // ── Remove prompt ─────────────────────────────────────────────
  const [removingId, setRemovingId] = useState<string | null>(null);

  // ── Approve / continue ────────────────────────────────────────
  const [saving,    setSaving]    = useState(false);
  const [saveError, setSaveError] = useState("");

  const customRef   = useRef<HTMLInputElement>(null);
  const remaining   = selectMax - selected.size;
  const canContinue = selected.size >= selectMin;

  // ── Auth helper ───────────────────────────────────────────────

  const getToken = async (): Promise<string | null> => {
    const { data: s } = await supabaseBrowser.auth.getSession();
    return s?.session?.access_token ?? null;
  };

  // ─────────────────────────────────────────────────────────────
  // 1. LOAD  —  GET /api/aeo/prompts/review?planId=:planId
  //
  // Service: getPromptsForReview(planId)
  // Returns: { prompts[], grouped{}, total, select_max, select_min, tier }
  // Status:  prompts where status = "pending_review"
  // ─────────────────────────────────────────────────────────────

  const loadPrompts = useCallback(async () => {
    if (!data.planId) {
      setLoadError("Plan ID missing — please go back to Step 1.");
      setLoadState("error");
      return;
    }

    setLoadState("loading");
    setLoadError("");

    try {
      const token = await getToken();
      if (!token) {
        setLoadError("Session expired — please sign in again.");
        setLoadState("error");
        return;
      }

      const res = await fetch(
        `${BACKEND_URL}/aeo/review?planId=${data.planId}`,
        
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setLoadError(json?.error ?? "Failed to load prompts. Please try again.");
        setLoadState("error");
        return;
      }

      const payload: ReviewPayload = await res.json();
      setPrompts(payload.prompts ?? []);
      setSelectMax(payload.select_max ?? 20);
      setSelectMin(payload.select_min ?? 5);
      setLoadState("ready");
    } catch (err) {
      console.error("[Step4] loadPrompts:", err);
      setLoadError("Network error — check your connection.");
      setLoadState("error");
    }
  }, [data.planId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { loadPrompts(); }, [loadPrompts]);

  // ─────────────────────────────────────────────────────────────
  // 2. TOGGLE — local only, sent on approve
  // ─────────────────────────────────────────────────────────────

  const toggle = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (next.size >= selectMax) return prev;
        next.add(id);
      }
      return next;
    });
  }, [selectMax]);

  // ─────────────────────────────────────────────────────────────
  // 3. ADD CUSTOM  —  POST /api/aeo/prompts/manual
  //
  // Body:    { planId, prompt, intent: "custom" }
  // Service: addManualPrompt(planId, promptText, intent)
  //   - validates with isValidPrompt()
  //   - checks slot limit (select_max)
  //   - checks duplicate
  //   - inserts with status: "manually_added", source: "manual"
  // Returns: { success, prompt: {id, prompt, intent, source, status}, remaining_slots, message }
  // Errors:
  //   400 → invalid prompt text
  //   403 → limit reached  (json.limit_reached = true)
  //   400 → duplicate
  // ─────────────────────────────────────────────────────────────

  const addCustom = async () => {
    const val = customInput.trim();
    if (!val) return;

    // Client-side guard — same rules as server isValidPrompt()
    const words = val.split(/\s+/).length;
    if (words < 5)  { setCustomError("Too short — write a full question (at least 5 words)"); return; }
    if (words > 25) { setCustomError("Too long — keep it under 25 words"); return; }

    setAddingCustom(true);
    setCustomError("");

    try {
      const token = await getToken();
      if (!token) { setCustomError("Session expired — please sign in again."); setAddingCustom(false); return; }

      const res = await fetch(`${BACKEND_URL}/aeo/manual`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          planId: data.planId,
          prompt: val,
          intent: "custom",
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setCustomError(json?.error ?? "Failed to add prompt.");
        setAddingCustom(false);
        return;
      }

      // Controller wraps in apiResponse → { data: { prompt, remaining_slots } }
      // Or flat shape → { prompt, remaining_slots }
      const newPrompt: Prompt = json?.data?.prompt ?? json?.prompt;

      if (newPrompt?.id) {
        setPrompts((prev) => [...prev, newPrompt]);
        if (selected.size < selectMax) {
          setSelected((prev) => new Set([...prev, newPrompt.id]));
        }
      }

      setCustomInput("");
      customRef.current?.focus();
    } catch (err) {
      console.error("[Step4] addCustom:", err);
      setCustomError("Network error — try again.");
    } finally {
      setAddingCustom(false);
    }
  };

  // ─────────────────────────────────────────────────────────────
  // 4. REMOVE  —  DELETE /api/aeo/prompts/:promptId?planId=:planId
  //
  // Service: removePrompt(planId, promptId)
  //   - sets status: "dismissed"
  //   - frees up 1 active slot
  // Returns: { success, remaining_slots, message }
  // ─────────────────────────────────────────────────────────────

  const removePrompt = async (promptId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRemovingId(promptId);

    try {
      const token = await getToken();
      if (!token) { setRemovingId(null); return; }

      const res = await fetch(
        `${BACKEND_URL}/aeo/${promptId}?planId=${data.planId}`,
        
        
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        setPrompts((prev) => prev.filter((p) => p.id !== promptId));
        setSelected((prev) => {
          const next = new Set(prev);
          next.delete(promptId);
          return next;
        });
      }
    } catch (err) {
      console.error("[Step4] removePrompt:", err);
    } finally {
      setRemovingId(null);
    }
  };

  // ─────────────────────────────────────────────────────────────
  // 5. APPROVE  —  POST /api/aeo/prompts/approve
  //
  // Body:    { planId, selectedIds: string[] }
  // Service: approvePrompts(planId, selectedIds)
  //   - selected → status: "active"
  //   - rest pending_review → status: "dismissed"
  //   - plan.prompts_approved = true
  //   - plan.pipeline_status = "running"  ← pipeline resumes
  // Returns: { success, activated, message }
  // Errors:
  //   400 → count < select_min
  //   400 → count > select_max
  //   404 → plan not found
  // ─────────────────────────────────────────────────────────────

  const handleContinue = async () => {
    if (!canContinue || saving) return;

    setSaving(true);
    setSaveError("");

    try {
      const token = await getToken();
      if (!token) { setSaveError("Session expired — please sign in again."); setSaving(false); return; }

      const selectedIds = [...selected];

      const res = await fetch(`${BACKEND_URL}/aeo/approve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          planId:      data.planId,
          selectedIds,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setSaveError(json?.error ?? "Failed to save selection. Please try again.");
        setSaving(false);
        return;
      }

      // Persist selected prompt texts into wizard state
      const activatedTexts = prompts
        .filter((p) => selectedIds.includes(p.id))
        .map((p) => p.prompt);

      onUpdate({ selectedPrompts: activatedTexts });
      onNext();
    } catch (err) {
      console.error("[Step4] approve:", err);
      setSaveError("Network error — check your connection and try again.");
      setSaving(false);
    }
  };

  // ─────────────────────────────────────────────────────────────
  // RENDER — loading
  // ─────────────────────────────────────────────────────────────

  if (loadState === "loading") {
    return (
      <div className="animate-in fade-in duration-300 w-full max-w-2xl mx-auto">
        <div className="glass-dark rounded-2xl border border-border/50 p-8 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald/10 border border-emerald/20 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald" />
            <span className="text-xs font-medium text-emerald">Step 4 of 5</span>
          </div>
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">Loading prompts…</h2>
          <p className="text-muted-foreground text-sm mb-10">Fetching the prompts we generated for your website.</p>
          <div className="flex flex-col items-center gap-3 py-10">
            <Spinner size={28} />
            <p className="text-xs text-graphite animate-pulse">Loading your prompts…</p>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // RENDER — fetch error
  // ─────────────────────────────────────────────────────────────

  if (loadState === "error") {
    return (
      <div className="animate-in fade-in duration-300 w-full max-w-2xl mx-auto">
        <div className="glass-dark rounded-2xl border border-border/50 p-8 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald/10 border border-emerald/20 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald" />
            <span className="text-xs font-medium text-emerald">Step 4 of 5</span>
          </div>
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">Select your tracking prompts</h2>
          <ErrorMsg msg={loadError} onRetry={loadPrompts} />
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // RENDER — main
  // ─────────────────────────────────────────────────────────────

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-2xl mx-auto">
      <div className="glass-dark rounded-2xl border border-border/50 shadow-2xl overflow-hidden">

        {/* ── HEADER ─────────────────────────────────────────── */}
        <div className="p-8 pb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald/10 border border-emerald/20 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald" />
            <span className="text-xs font-medium text-emerald">Step 4 of 5</span>
          </div>
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">
            Select your tracking prompts
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            We generated{" "}
            <strong className="text-foreground">{prompts.length}</strong> prompts based on your website.
            Pick up to{" "}
            <strong className="text-foreground">{selectMax}</strong> that best represent how your customers search for you.
          </p>

          {/* Slot bar */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-charcoal rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${selected.size >= selectMax ? "bg-amber" : "bg-emerald"}`}
                style={{ width: `${(selected.size / selectMax) * 100}%` }}
              />
            </div>
            <span className={`text-xs font-mono font-medium ${selected.size >= selectMax ? "text-amber" : "text-emerald"}`}>
              {selected.size}/{selectMax} selected
            </span>
          </div>
          {selected.size > 0 && selected.size < selectMin && (
            <p className="text-xs text-amber mt-1.5">Select at least {selectMin} to continue</p>
          )}
        </div>

        {/* ── CUSTOM PROMPT INPUT ────────────────────────────── */}
        <div className="px-8 pb-5">
          <div className="p-4 rounded-xl bg-charcoal border border-border/50">
            <p className="text-xs font-medium text-graphite mb-2.5 uppercase tracking-wider">Add your own prompt</p>
            <div className="flex gap-2">
              <input
                ref={customRef}
                type="text"
                value={customInput}
                onChange={(e) => { setCustomInput(e.target.value); setCustomError(""); }}
                onKeyDown={(e) => e.key === "Enter" && !addingCustom && addCustom()}
                disabled={addingCustom || selected.size >= selectMax}
                placeholder="What are the best tools for..."
                className="flex-1 px-3.5 py-2.5 rounded-lg bg-charcoal-light border border-border text-foreground
                  placeholder:text-graphite/50 text-sm
                  focus:outline-none focus:ring-2 focus:ring-emerald/30
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-200"
              />
              <button
                onClick={addCustom}
                disabled={!customInput.trim() || addingCustom || selected.size >= selectMax}
                className="px-4 py-2.5 rounded-lg bg-emerald/20 border border-emerald/30 text-emerald text-sm font-medium
                  hover:bg-emerald/30 transition-all duration-200
                  disabled:opacity-30 disabled:cursor-not-allowed
                  flex items-center gap-2 whitespace-nowrap"
              >
                {addingCustom ? <Spinner size={13} /> : "+ Add"}
              </button>
            </div>
            {customError && <p className="text-xs text-destructive mt-1.5">{customError}</p>}
          </div>
        </div>

        {/* ── EMPTY STATE ────────────────────────────────────── */}
        {prompts.length === 0 && (
          <div className="px-8 pb-10 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-charcoal-light flex items-center justify-center mb-4">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="9" stroke="#8A93A6" strokeWidth="1.2" />
                <path d="M7 11h8M11 7v8" stroke="#8A93A6" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-sm text-graphite">No prompts found</p>
            <p className="text-xs text-graphite/60 mt-1">The pipeline may still be running — go back to Step 3 to check.</p>
          </div>
        )}

        {/* ── PROMPTS LIST ───────────────────────────────────── */}
        {prompts.length > 0 && (
          <div className="px-8 pb-6 max-h-[400px] overflow-y-auto space-y-2">
            {prompts.map((p) => {
              const isSelected = selected.has(p.id);
              const isDisabled = !isSelected && selected.size >= selectMax;
              const isRemoving = removingId === p.id;
              const isManual   = p.source === "manual" || p.status === "manually_added";

              return (
                <div
                  key={p.id}
                  onClick={() => !isDisabled && !isRemoving && toggle(p.id)}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all duration-200
                    ${isRemoving
                      ? "opacity-40 cursor-not-allowed"
                      : isSelected
                      ? "bg-emerald/5 border-emerald/30 shadow-[0_0_0_1px_rgba(15,191,154,0.15)] cursor-pointer"
                      : isDisabled
                      ? "border-border/30 opacity-40 cursor-not-allowed"
                      : "border-border/50 hover:border-border hover:bg-charcoal/50 cursor-pointer"}`}
                >
                  {/* Checkbox */}
                  <div className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border transition-all duration-200
                    ${isSelected ? "bg-emerald border-emerald" : "border-border bg-transparent"}`}>
                    {isSelected && (
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4L3 5.5L6.5 2.5" stroke="#0B0F14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>

                  {/* Text + badge */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm leading-relaxed ${isSelected ? "text-foreground" : "text-foreground/80"}`}>
                      {p.prompt}
                    </p>
                    <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium border
                        ${INTENT_COLORS[p.intent] ?? "bg-graphite/10 text-graphite border-graphite/20"}`}>
                        {p.intent}
                      </span>
                      {isManual && (
                        <span className="text-[10px] text-graphite/60">your prompt</span>
                      )}
                    </div>
                  </div>

                  {/* Remove — only for manually added prompts */}
                  {isManual && (
                    <button
                      onClick={(e) => removePrompt(p.id, e)}
                      disabled={isRemoving}
                      className="flex-shrink-0 mt-0.5 text-graphite/30 hover:text-destructive transition-colors duration-150 disabled:opacity-30"
                      title="Remove prompt"
                    >
                      {isRemoving
                        ? <Spinner size={12} />
                        : (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M3 3L9 9M9 3L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        )}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── SAVE ERROR ─────────────────────────────────────── */}
        {saveError && (
          <div className="px-8 pb-4">
            <ErrorMsg msg={saveError} />
          </div>
        )}

        {/* ── FOOTER CTA ─────────────────────────────────────── */}
        <div className="px-8 pb-8 pt-2 border-t border-border/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-graphite">
              {remaining > 0 ? `${remaining} slot${remaining !== 1 ? "s" : ""} remaining` : "Limit reached"}
            </span>
            <span className="text-xs text-graphite">
              {canContinue ? "✓ Ready to continue" : `${selectMin - selected.size} more needed`}
            </span>
          </div>

          <button
            onClick={handleContinue}
            disabled={!canContinue || saving}
            className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-[0.98]
              disabled:cursor-not-allowed
              ${canContinue && !saving
                ? "bg-emerald hover:bg-emerald-light text-charcoal hover:shadow-[0_0_24px_rgba(15,191,154,0.4)]"
                : "bg-charcoal border border-border text-graphite"}`}
          >
            {saving ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner />
                Saving your selection…
              </span>
            ) : canContinue ? (
              `Track These ${selected.size} Prompts →`
            ) : (
              `Select ${selectMin - selected.size} More to Continue`
            )}
          </button>
        </div>

      </div>
    </div>
  );
}