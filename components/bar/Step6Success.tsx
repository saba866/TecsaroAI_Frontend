


"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseClient";
import type { ProjectData } from "../../components/onboarding/OnboardingWizard";
import DashboardPage from "@/app/dashboard/page";

const BACKEND_URL     = process.env.NEXT_PUBLIC_BACKEND_URL;
const POLL_MS         = 5000;    // poll every 5 seconds
const TIMEOUT_MS      = 720000;  // give up after 12 minutes

// pipeline_status values written by aeoPipeline.job.js
type PipelineStatus =
  | "analyzing"
  | "generating_prompts"
  | "awaiting_prompt_review"
  | "running"
  | "awaiting_competitor_review"
  | "completed"
  | "error"
  | "failed"
  | null;

// Human-readable label per status
const STATUS_LABEL: Record<string, string> = {
  analyzing:                   "Reading and understanding your website content…",
  generating_prompts:          "Building the questions AI engines will be asked about you…",
  awaiting_prompt_review:      "Matching questions to your best pages…",
  awaiting_competitor_review:  "Identifying who you compete with in AI results…",
  running:                     "Asking ChatGPT and Gemini about your brand — please wait…",
  completed:                   "All done! Your data is ready.",
  error:                       "Something went wrong",
  failed:                      "Something went wrong",
};

// Progress % per status so the bar feels meaningful
const STATUS_PROGRESS: Record<string, number> = {
  analyzing:                   15,
  generating_prompts:          30,
  awaiting_prompt_review:      45,
  awaiting_competitor_review:  60,
  running:                     80,
  completed:                   100,
};

type Props = { data: ProjectData };

export default function Step6Success({ data }: Props) {
  const router  = useRouter();
  const planId  = data.planId ?? null;

  const [status,     setStatus]     = useState<PipelineStatus>("analyzing");
  const [progress,   setProgress]   = useState(10);
  const [redirectIn, setRedirectIn] = useState(5);
  const [timedOut,   setTimedOut]   = useState(false);

  const startedAt   = useRef(Date.now());
  const pollRef     = useRef<ReturnType<typeof setInterval> | null>(null);
  const countRef    = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopPolling = useCallback(() => {
    if (pollRef.current)  clearInterval(pollRef.current);
    if (countRef.current) clearInterval(countRef.current);
  }, []);

  const startCountdown = useCallback(() => {
    countRef.current = setInterval(() => {
      setRedirectIn(n => {
        if (n <= 1) {
          stopPolling();
          router.push(`/dashboard/overview?project=${planId}`);
          return 0;
        }
        return n - 1;
      });
    }, 1000);
  }, [planId, router, stopPolling]);

  const poll = useCallback(async () => {
    if (!planId) return;

    // Safety timeout
    if (Date.now() - startedAt.current > TIMEOUT_MS) {
      stopPolling();
      setTimedOut(true);
      return;
    }

    try {
      const { data: s } = await supabaseBrowser.auth.getSession();
      const token = s?.session?.access_token;
      if (!token) return;

      const res  = await fetch(`${BACKEND_URL}/plans/${planId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;

      const json      = await res.json();
      const ps        = (json?.pipeline_status ?? null) as PipelineStatus;

      setStatus(ps);
      setProgress(STATUS_PROGRESS[ps ?? ""] ?? progress);

      if (ps === "completed") {
        stopPolling();
        startCountdown();
      }

      if (ps === "error" || ps === "failed") {
        stopPolling();
      }
    } catch (err) {
      console.error("[Step6] poll error:", err);
    }
  }, [planId, progress, startCountdown, stopPolling]);

  useEffect(() => {
    if (!planId) {
      // No planId — redirect immediately
      router.push("/dashboard");
      return;
    }

    poll(); // immediate first check
    pollRef.current = setInterval(poll, POLL_MS);

    return () => stopPolling();
  }, [planId]); // eslint-disable-line react-hooks/exhaustive-deps

  const isCompleted = status === "completed";
  const isError     = status === "error" || status === "failed" || timedOut;
  const isRunning   = !isCompleted && !isError;

  const totalCompetitors =
    (data.competitors?.length ?? 0) +
    (data.aiCompetitors?.filter(c => c.accepted).length ?? 0);

  const currentLabel = timedOut
    ? "Taking longer than expected…"
    : STATUS_LABEL[status ?? ""] ?? "Setting up your monitoring…";

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="glass-dark rounded-2xl border border-white/10 p-10 shadow-2xl text-center">

        {/* ── Icon ── */}
        <div className="relative mx-auto mb-7 w-20 h-20">
          {isRunning  && <div className="absolute inset-0 rounded-full bg-violet/20 animate-ping" />}
          {isCompleted && <div className="absolute inset-0 rounded-full bg-emerald/20 animate-ping" />}

          <div className={`relative w-20 h-20 rounded-full flex items-center justify-center border transition-colors duration-500
            ${isCompleted ? "bg-emerald/10 border-emerald/30"
            : isError    ? "bg-destructive/10 border-destructive/30"
            :               "bg-violet/10 border-violet/30"}`}>

            {isRunning && (
              <svg className="animate-spin" width="36" height="36" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="14" stroke="rgba(139,92,246,0.15)" strokeWidth="3"/>
                <path d="M18 4 A14 14 0 0 1 32 18" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            )}
            {isCompleted && (
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path d="M8 18L14 24L28 12" stroke="#0FBF9A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
            {isError && (
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path d="M18 12V20M18 24V25" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="18" cy="18" r="12" stroke="#EF4444" strokeWidth="2"/>
              </svg>
            )}
          </div>
        </div>

        {/* ── Heading ── */}
        <h2 className="font-heading text-2xl font-semibold text-white mb-3">
          {isCompleted ? "Your data is ready!" :
           isError     ? "Setup ran into an issue" :
                         "We're preparing your data…"}
        </h2>

        <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-sm mx-auto">
          {isCompleted
            ? "Your dashboard is ready. All visibility data has been collected and analysed."
            : isError
            ? timedOut
              ? "Still working in the background — head to your dashboard and data will appear shortly."
              : "The pipeline hit an issue. Your dashboard is still accessible."
            : "Please wait while we prepare your data. We're scanning AI engines and building your visibility report — this takes just a few minutes."
          }
        </p>

        {/* ── Progress bar + status label (running only) ── */}
        {isRunning && (
          <div className="mb-7">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-violet animate-pulse shrink-0" />
              <p className="text-xs text-violet-light font-mono">{currentLabel}</p>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet to-emerald rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[10px] text-white/20 font-mono mt-2">
              {Math.floor((Date.now() - startedAt.current) / 1000)}s elapsed
            </p>
          </div>
        )}

        {/* ── Warm waiting message ── */}
        {isRunning && (
          <div className="mb-6 px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-left">
            <p className="text-sm text-white/70 leading-relaxed">
              ☕{" "}<span className="font-semibold text-white">Almost there</span> — we're scanning
              ChatGPT &amp; Gemini, detecting brand mentions, and building your full visibility report.
            </p>
            <p className="text-xs text-white/35 mt-2 font-mono">
              Most reports are ready in under 10 minutes. Please keep this tab open.
            </p>
          </div>
        )}

        {/* ── Stats ── */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Prompts tracked", value: data.selectedPrompts?.length || "—" },
            { label: "Competitors",     value: totalCompetitors || "—"             },
            { label: "AI engines",      value: 2                                   },
          ].map((stat) => (
            <div key={stat.label} className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="font-heading text-2xl font-semibold text-emerald mb-1">{stat.value}</div>
              <div className="text-xs text-white/40">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
       {/* ── CTA ── */}
{isCompleted && (
  <button
    onClick={() => { stopPolling(); router.push("/dashboard"); }}
    className="w-full py-3.5 rounded-xl bg-emerald hover:bg-emerald-light text-charcoal font-semibold text-sm
      transition-all duration-200 hover:shadow-[0_0_24px_rgba(15,191,154,0.4)] active:scale-[0.98] mb-3"
  >
    Go to Dashboard →
  </button>
)}

{(isRunning || isError) && (
  <button
    onClick={() => { stopPolling(); router.push("/dashboard"); }}
    className="w-full py-3.5 rounded-xl border border-white/10 hover:border-white/20 text-white/60 hover:text-white text-sm font-semibold
      transition-all duration-200 mb-3"
  >
    {isError ? "Go to Dashboard →" : "Skip — I'll check back later →"}
  </button>
)}

<p className="text-xs text-white/25 font-mono">
  {isCompleted
    ? `Redirecting in ${redirectIn}s…`
    : isError
    ? "Pipeline will continue running in the background"
    : "Hang tight — we'll redirect you automatically when your data is ready"
  }
</p>

      </div>
    </div>
  );
}