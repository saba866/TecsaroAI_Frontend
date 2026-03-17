


"use client";

import { useEffect, useState, useRef } from "react";
import { supabaseBrowser } from "@/lib/supabaseClient";
import type { ProjectData } from "@/components/onboarding/OnboardingWizard";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const STAGES = [
  { id: "crawling",               label: "Crawling your website",    detail: "Reading pages, extracting content",          pct: 0   },
  { id: "analyzing",              label: "Analyzing content",        detail: "Understanding topics, intent, and industry",  pct: 25  },
  { id: "generating_prompts",     label: "Generating AI prompts",    detail: "Crafting prompts for your niche",            pct: 60  },
  { id: "awaiting_prompt_review", label: "Prompts ready for review", detail: "Select the ones that best fit your brand",   pct: 100 },
];

function statusToStageIndex(status: string | null): number {
  switch (status) {
    case "crawling":               return 0;
    case "analyzing":              return 1;
    case "generating_prompts":     return 2;
    case "awaiting_prompt_review": return 3;
    case "awaiting_competitor_review":
    case "running":
    case "completed":              return 3;
    default:                       return 0;
  }
}

// ── Cloudflare block info ──────────────────────────────────────────
type CloudflareBlock = {
  message:  string;
  fix:      string;
  helpLink: string;
};

type Props = { data: ProjectData; onNext: () => void };

export default function Step3Pipeline({ data, onNext }: Props) {
  const [currentStage,      setCurrentStage]      = useState(0);
  const [progress,          setProgress]          = useState(0);
  const [done,              setDone]              = useState(false);
  const [error,             setError]             = useState<string | null>(null);
  const [started,           setStarted]           = useState(false);
  const [crawlPages,        setCrawlPages]        = useState<{ crawled: number; max: number } | null>(null);
  const [cloudflareBlocked, setCloudflareBlocked] = useState<CloudflareBlock | null>(null);

  const notified    = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    if (!data.planId) { setError("Plan ID missing — please go back to Step 1."); return; }

    let cancelled = false;

    const startScan = async () => {
      try {
        const { data: sd } = await supabaseBrowser.auth.getSession();
        const token = sd?.session?.access_token;
        if (!token) { setError("Session expired — please sign in again."); return; }

        const res = await fetch(`${BACKEND_URL}/aeo/onboard/start`, {
          method:  "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body:    JSON.stringify({ planId: data.planId }),
        });

        if (!res.ok) {
          const json = await res.json().catch(() => ({}));
          setError(json?.error ?? "Failed to start scan. Please try again.");
          return;
        }

        setStarted(true);

        const poll = async () => {
          if (cancelled || notified.current) return;

          try {
            const pollRes = await fetch(`${BACKEND_URL}/plans/${data.planId}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (!pollRes.ok) return;

            const plan   = await pollRes.json();
            console.log("[Step3] poll response:", plan);
            const status = (plan?.data?.pipeline_status ?? plan?.pipeline_status ?? null) as string;
            console.log("[Step3] status:", status);

            // ── Grab crawl progress + detect Cloudflare block ──
            if (status === "crawling" || !status) {
              const cr = await fetch(`${BACKEND_URL}/aeo/crawl/status/${data.planId}`, {
                headers: { Authorization: `Bearer ${token}` },
              }).catch(() => null);

              if (cr?.ok) {
                const cd = await cr.json();

                // ── Cloudflare blocked — stop polling, show fix ──
                if (cd?.errorType === "CLOUDFLARE_BLOCKED") {
                  notified.current = true;
                  clearInterval(intervalRef.current);
                  setCloudflareBlocked({
                    message:  cd.message  ?? "Your website's Cloudflare is blocking TecsaroBot",
                    fix:      cd.fix      ?? "Add a WAF rule to allow TecsaroBot",
                    helpLink: cd.helpLink ?? "https://ai.tecsaro.com/help",
                  });
                  return;
                }

                setCrawlPages({ crawled: cd?.pages_crawled ?? 0, max: cd?.max_pages ?? 20 });
              }
            }

            // ── Pipeline failed for other reason ──
            if (status === "failed" && !notified.current) {
              notified.current = true;
              clearInterval(intervalRef.current);
              setError("The scan failed unexpectedly. Please try again.");
              return;
            }

            const stageIdx = statusToStageIndex(status);
            setCurrentStage(stageIdx);
            setProgress(STAGES[stageIdx]?.pct ?? 0);

            if (status === "awaiting_prompt_review" && !notified.current) {
              notified.current = true;
              clearInterval(intervalRef.current);
              setCurrentStage(STAGES.length - 1);
              setProgress(100);
              setDone(true);
            }

            if (
              ["awaiting_competitor_review", "running", "completed"].includes(status)
              && !notified.current
            ) {
              notified.current = true;
              clearInterval(intervalRef.current);
              onNext();
            }
          } catch { /* silent retry */ }
        };

        poll();
        intervalRef.current = setInterval(poll, 3000);
      } catch (err) {
        console.error("[Step3]", err);
        setError("Network error — check your connection and try again.");
      }
    };

    startScan();
    return () => { cancelled = true; clearInterval(intervalRef.current); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Cloudflare blocked UI ──────────────────────────────────────
  if (cloudflareBlocked) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="glass-dark rounded-2xl border border-border/50 p-8 shadow-2xl">

          {/* Header */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber/10 border border-amber/20 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-amber" />
              <span className="text-xs font-medium text-amber">Step 3 of 5</span>
            </div>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">
              🚫 Cloudflare is blocking TecsaroBot
            </h2>
            <p className="text-muted-foreground text-sm">
              {cloudflareBlocked.message}. Follow the steps below to fix it.
            </p>
          </div>

          {/* Fix Steps */}
          <div className="mb-6 rounded-xl border border-amber/25 bg-amber/5 p-5 space-y-3">
            <p className="text-xs font-semibold text-amber uppercase tracking-wide">How to fix it</p>

            {[
              { step: "1", text: "Login to dash.cloudflare.com" },
              { step: "2", text: "Select your domain" },
              { step: "3", text: "Go to Security → WAF → Custom Rules" },
              { step: "4", text: 'Click "Create Rule"' },
              { step: "5", text: 'Set: User Agent → contains → TecsaroBot' },
              { step: "6", text: "Set Action → Allow → Deploy ✅" },
            ].map(({ step, text }) => (
              <div key={step} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-amber/20 border border-amber/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[10px] font-bold text-amber">{step}</span>
                </div>
                <p className="text-sm text-foreground/80">{text}</p>
              </div>
            ))}
          </div>

          {/* robots.txt note */}
          <div className="mb-6 rounded-xl border border-border/40 bg-charcoal/40 p-4">
            <p className="text-xs font-semibold text-graphite uppercase tracking-wide mb-2">
              Also add to your robots.txt
            </p>
            <pre className="text-xs text-emerald font-mono bg-black/30 rounded-lg p-3 select-all">
{`User-agent: TecsaroBot
Allow: /`}
            </pre>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3.5 rounded-xl bg-emerald hover:bg-emerald-light text-charcoal font-semibold text-sm
                transition-all duration-200 hover:shadow-[0_0_24px_rgba(15,191,154,0.4)] active:scale-[0.98]"
            >
              I've fixed it — retry scan →
            </button>
            <a
              href={cloudflareBlocked.helpLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl border border-border/50 text-center text-sm text-muted-foreground
                hover:border-border hover:text-foreground transition-all duration-200"
            >
              View full guide at ai.tecsaro.com/help ↗
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ── Normal pipeline UI ─────────────────────────────────────────
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="glass-dark rounded-2xl border border-border/50 p-8 shadow-2xl">

        <div className="mb-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber/10 border border-amber/20 mb-4">
            <div className={`w-1.5 h-1.5 rounded-full bg-amber ${!done && !error ? "animate-pulse" : ""}`} />
            <span className="text-xs font-medium text-amber">Step 3 of 5</span>
          </div>
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">
            {error ? "Something went wrong" : done ? "Analysis complete" : `Analyzing ${data.brandName || "your website"}…`}
          </h2>
          <p className="text-muted-foreground text-sm">
            {error
              ? error
              : done
              ? "We've generated prompts for your review."
              : started
              ? "Reading your website and generating AI search queries. This takes 1–2 minutes."
              : "Starting the AEO scan…"}
          </p>
        </div>

        {error && (
          <div className="mb-6 flex items-start gap-3 px-4 py-3 rounded-xl bg-destructive/8 border border-destructive/25">
            <svg className="flex-shrink-0 mt-0.5 text-destructive" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M7 4V7.5M7 9.5V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <div>
              <p className="text-xs text-destructive leading-relaxed">{error}</p>
              <button onClick={() => window.location.reload()}
                className="mt-2 text-xs text-destructive/80 underline underline-offset-2 hover:text-destructive">
                Reload and try again
              </button>
            </div>
          </div>
        )}

        {!error && (
          <div className="mb-7">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-graphite">{STAGES[currentStage]?.label}</span>
              <span className="text-xs font-mono text-emerald">{progress}%</span>
            </div>
            <div className="h-2 bg-charcoal rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald to-emerald-light rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs text-graphite/60 mt-2">{STAGES[currentStage]?.detail}</p>
            {currentStage === 0 && crawlPages && (
              <p className="text-xs text-emerald/70 mt-1.5">
                🕷️ {crawlPages.crawled} / {crawlPages.max} pages crawled
              </p>
            )}
          </div>
        )}

        {!error && (
          <div className="space-y-3">
            {STAGES.map((stage, i) => {
              const isPast    = i < currentStage;
              const isCurrent = i === currentStage;
              return (
                <div key={stage.id}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300
                    ${isCurrent ? "bg-emerald/5 border border-emerald/20" : "border border-transparent"}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300
                    ${isPast ? "bg-emerald" : isCurrent ? "bg-emerald/20 border border-emerald" : "bg-charcoal border border-border"}`}>
                    {isPast ? (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : isCurrent ? (
                      <div className="w-2 h-2 rounded-full bg-emerald animate-pulse"/>
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-graphite/30"/>
                    )}
                  </div>
                  <div>
                    <p className={`text-sm font-medium transition-colors duration-300
                      ${isPast || isCurrent ? "text-foreground" : "text-graphite/40"}`}>
                      {stage.label}
                    </p>
                    {isCurrent && (
                      <p className="text-xs text-graphite/60 mt-0.5 animate-in fade-in duration-300">{stage.detail}</p>
                    )}
                  </div>
                  {isCurrent && i < STAGES.length - 1 && (
                    <div className="ml-auto flex gap-0.5">
                      {[0, 1, 2].map((dot) => (
                        <div key={dot} className="w-1 h-1 rounded-full bg-emerald animate-bounce"
                          style={{ animationDelay: `${dot * 150}ms` }} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {done && (
          <button onClick={onNext}
            className="mt-7 w-full py-3.5 rounded-xl bg-emerald hover:bg-emerald-light text-charcoal font-semibold text-sm
              transition-all duration-200 hover:shadow-[0_0_24px_rgba(15,191,154,0.4)] active:scale-[0.98]
              animate-in fade-in slide-in-from-bottom-2 duration-500">
            Review Generated Prompts →
          </button>
        )}
      </div>
    </div>
  );
}