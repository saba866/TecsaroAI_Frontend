


// "use client";

// import { useState } from "react";
// import { supabaseBrowser } from "@/lib/supabaseClient";
// import type { ProjectData } from "@/components/onboarding/OnboardingWizard";
// import {  Spinner } from "@/components/ui/icons";

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// type Props = {
//   data: ProjectData;
//   onUpdate: (p: Partial<ProjectData>) => void; 
//   onNext: () => void;
// };


// export default function Step2Competitors({ data, onUpdate, onNext }: Props) {
//   const [input,   setInput]   = useState("");
//   const [loading, setLoading] = useState(false);
//   const [apiErr,  setApiErr]  = useState<string | null>(null);

//   const count  = data.competitors.length;
//   const enough = count >= 3;

//   // ── Local list management ────────────────────────────────────

//   const add = () => {
//     const val = input.trim().replace(/^https?:\/\//, "").replace(/\/$/, "");
//     if (!val || data.competitors.includes(val)) { setInput(""); return; }
//     onUpdate({ competitors: [...data.competitors, val] });
//     setInput("");
//   };

//   const remove = (comp: string) =>
//     onUpdate({ competitors: data.competitors.filter((c) => c !== comp) });

//   const handleKey = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") { e.preventDefault(); add(); }
//   };

//   // ── Submit — save competitors to backend then advance ────────

//   const handleNext = async (skip = false) => {
//     setLoading(true);
//     setApiErr(null);

//     try {
//       const { data: sessionData } = await supabaseBrowser.auth.getSession();
//       const token = sessionData?.session?.access_token;

//       if (!token) {
//         setApiErr("Session expired — please sign in again.");
//         setLoading(false);
//         return;
//       }

//       // POST competitors whenever list is non-empty (skip=false)
//       if (!skip && data.competitors.length > 0) {
//         // planId must be set by Step 1 — surface a clear error if missing
//         if (!data.planId) {
//           setApiErr("Plan ID missing — please go back to Step 1 and try again.");
//           setLoading(false);
//           return;
//         }

//         const res = await fetch(`${BACKEND_URL}/aeo/seed`, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   },
//   body: JSON.stringify({
//     planId: data.planId,        // ← was nested in URL
//     domains: data.competitors,  // ← was "competitors"
//   }),
// });

        

//         const json = await res.json();

//         if (!res.ok) {
//           setApiErr(json?.error ?? "Failed to save competitors. Please try again.");
//           setLoading(false);
//           return;
//         }
//       }

//       onNext();
//     } catch (err) {
//       console.error("[Step2] submit error:", err);
//       setApiErr("Network error — check your connection and try again.");
//       setLoading(false);
//     }
//   };

//   // ─────────────────────────────────────────────────────────────
//   // RENDER
//   // ─────────────────────────────────────────────────────────────

//   return (
//     <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
//       <div className="glass-dark rounded-2xl border border-border/50 p-8 shadow-2xl">

//         {/* ── Header ── */}
//         <div className="mb-7">
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet/10 border border-violet/20 mb-4">
//             <div className="w-1.5 h-1.5 rounded-full bg-violet animate-pulse" />
//             <span className="text-xs font-medium text-violet-light">Step 2 of 5</span>
//           </div>
//           <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">
//             Who are your competitors?
//           </h2>
//           <p className="text-muted-foreground text-sm leading-relaxed">
//             We'll track when AI engines recommend them instead of you.
//             Add at least 3 for meaningful comparison data.
//           </p>
//         </div>

//         {/* ── Input ── */}
//         <div className="flex gap-2 mb-5">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={handleKey}
//             disabled={loading}
//             placeholder="competitor.com or brand name"
//             className="flex-1 px-4 py-3 rounded-xl bg-charcoal border border-border text-foreground
//               placeholder:text-graphite/60 text-sm
//               focus:outline-none focus:ring-2 focus:ring-violet/40
//               disabled:opacity-50 disabled:cursor-not-allowed
//               transition-all duration-200 hover:border-border/80"
//           />
//           <button
//             onClick={add}
//             disabled={!input.trim() || loading}
//             className="px-4 py-3 rounded-xl bg-violet/20 border border-violet/30 text-violet-light text-sm font-medium
//               hover:bg-violet/30 transition-all duration-200
//               disabled:opacity-30 disabled:cursor-not-allowed"
//           >
//             Add
//           </button>
//         </div>

//         {/* ── Progress bar ── */}
//         <div className="mb-5">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-xs text-graphite">
//               {count === 0 ? "No competitors added yet" : `${count} competitor${count > 1 ? "s" : ""} added`}
//             </span>
//             <span className={`text-xs font-medium ${enough ? "text-emerald" : "text-amber"}`}>
//               {enough ? "✓ Good to go" : `${3 - count} more recommended`}
//             </span>
//           </div>
//           <div className="h-1 w-full bg-charcoal rounded-full overflow-hidden">
//             <div
//               className={`h-full rounded-full transition-all duration-500 ${enough ? "bg-emerald" : "bg-amber"}`}
//               style={{ width: `${Math.min((count / 5) * 100, 100)}%` }}
//             />
//           </div>
//         </div>

//         {/* ── Competitor chips ── */}
//         {count > 0 && (
//           <div className="flex flex-wrap gap-2 mb-6">
//             {data.competitors.map((comp) => (
//               <div
//                 key={comp}
//                 className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-charcoal border border-border
//                   text-sm text-foreground group hover:border-destructive/40 transition-all duration-200"
//               >
//                 <div className="w-5 h-5 rounded-md bg-emerald/10 flex items-center justify-center flex-shrink-0">
//                   <span className="text-[9px] font-bold text-emerald uppercase">{comp[0]}</span>
//                 </div>
//                 <span className="font-mono text-xs text-graphite">{comp}</span>
//                 <button
//                   onClick={() => remove(comp)}
//                   disabled={loading}
//                   className="text-graphite/40 hover:text-destructive transition-colors duration-150 ml-1 disabled:pointer-events-none"
//                 >
//                   <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
//                     <path d="M3 3L9 9M9 3L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//                   </svg>
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* ── Empty state ── */}
//         {count === 0 && (
//           <div className="mb-6 py-8 rounded-xl border border-dashed border-border/50 flex flex-col items-center justify-center text-center">
//             <div className="w-10 h-10 rounded-xl bg-charcoal-light flex items-center justify-center mb-3">
//               <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
//                 <circle cx="10" cy="10" r="8" stroke="#8A93A6" strokeWidth="1.2" />
//                 <path d="M6 10C6 10 7.5 7 10 7C12.5 7 14 10 14 10C14 10 12.5 13 10 13C7.5 13 6 10 6 10Z" stroke="#8A93A6" strokeWidth="1.2" />
//                 <circle cx="10" cy="10" r="2" stroke="#8A93A6" strokeWidth="1.2" />
//               </svg>
//             </div>
//             <p className="text-sm text-graphite">Add competitors to start tracking</p>
//             <p className="text-xs text-graphite/60 mt-1">Type a domain or brand name above</p>
//           </div>
//         )}

//         {/* ── API error ── */}
//         {apiErr && (
//           <div className="mb-5 flex items-start gap-3 px-4 py-3 rounded-xl bg-destructive/8 border border-destructive/25">
//             <svg className="flex-shrink-0 mt-0.5 text-destructive" width="14" height="14" viewBox="0 0 14 14" fill="none">
//               <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
//               <path d="M7 4V7.5M7 9.5V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
//             </svg>
//             <p className="text-xs text-destructive leading-relaxed">{apiErr}</p>
//           </div>
//         )}

//         {/* ── CTAs ── */}
//        {/* ── CTAs ── */}
// <div className="flex gap-3">
 
//   <button
//     onClick={() => handleNext(false)}
//     disabled={loading}
//     className={`flex-1 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-[0.98]
//       disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100
//       ${enough
//         ? "bg-emerald hover:bg-emerald-light text-charcoal hover:shadow-[0_0_24px_rgba(15,191,154,0.4)]"
//         : "bg-emerald/80 hover:bg-emerald text-charcoal"}`}
//   >
//     {loading ? (
//       <span className="flex items-center justify-center gap-2"><Spinner />Saving…</span>
//     ) : (
//       "Continue →"
//     )}
//   </button>

//   {count === 0 && !loading && (
//     <button
//       onClick={() => handleNext(true)}
//       className="px-5 py-3.5 rounded-xl text-white/50 text-sm hover:text-white
//         border border-white/10 hover:border-white/20 transition-all duration-200"
//     >
//       Skip
//     </button>
//   )}
// </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { supabaseBrowser } from "@/lib/supabaseClient";
import type { ProjectData } from "@/components/onboarding/OnboardingWizard";
import { Spinner } from "@/components/ui/icons";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

type Props = {
  data: ProjectData;
  onUpdate: (p: Partial<ProjectData>) => void;
  onNext: () => void;
};

export default function Step2Competitors({ data, onUpdate, onNext }: Props) {
  const [input,    setInput]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [apiErr,   setApiErr]   = useState<string | null>(null);

  // ── Plan limit (fetched from backend on mount) ───────────────
  const [maxAllowed, setMaxAllowed] = useState<number>(3);  // default to free
  const [limitLoaded, setLimitLoaded] = useState(false);

  const count   = data.competitors.length;
  const enough  = count >= 3;
  const atLimit = count >= maxAllowed;

  // ── Fetch plan limits on mount ───────────────────────────────
  useEffect(() => {
    if (!data.planId) return;

    const fetchLimit = async () => {
      try {
        const { data: sessionData } = await supabaseBrowser.auth.getSession();
        const token = sessionData?.session?.access_token;
        if (!token) return;

        const res = await fetch(`${BACKEND_URL}/aeo/competitors/${data.planId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const json = await res.json();
          const body = json?.data ?? json;
          // Backend returns competitors_max from getPlanTier (billing_profiles source of truth)
          const max = body?.competitors_max ?? 3;
          setMaxAllowed(max);
        }
      } catch (err) {
        console.error("[Step2] fetchLimit error:", err);
        // Silently fail — keep default of 3 (free plan)
      } finally {
        setLimitLoaded(true);
      }
    };

    fetchLimit();
  }, [data.planId]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Local list management ────────────────────────────────────
  const add = () => {
    const val = input.trim().replace(/^https?:\/\//, "").replace(/\/$/, "");
    if (!val) { setInput(""); return; }

    // ── LIMIT CHECK — enforce plan limit before adding locally ──
    if (count >= maxAllowed) {
      setApiErr(`You can add up to ${maxAllowed} competitors on your current plan. Upgrade for more.`);
      setInput("");
      return;
    }

    if (data.competitors.includes(val)) { setInput(""); return; }

    onUpdate({ competitors: [...data.competitors, val] });
    setInput("");
    setApiErr(null);
  };

  const remove = (comp: string) => {
    onUpdate({ competitors: data.competitors.filter((c) => c !== comp) });
    setApiErr(null);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") { e.preventDefault(); add(); }
  };

  // ── Submit ───────────────────────────────────────────────────
  const handleNext = async (skip = false) => {
    setLoading(true);
    setApiErr(null);

    try {
      const { data: sessionData } = await supabaseBrowser.auth.getSession();
      const token = sessionData?.session?.access_token;

      if (!token) {
        setApiErr("Session expired — please sign in again.");
        setLoading(false);
        return;
      }

      if (!skip && data.competitors.length > 0) {
        if (!data.planId) {
          setApiErr("Plan ID missing — please go back to Step 1 and try again.");
          setLoading(false);
          return;
        }

        const res = await fetch(`${BACKEND_URL}/aeo/seed`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            planId:  data.planId,
            domains: data.competitors.slice(0, maxAllowed), // hard cap before sending
          }),
        });

        const json = await res.json();

        if (!res.ok) {
          // Show upgrade message if limit was hit on backend
          if (json?.limit_reached) {
            setApiErr(json?.upgrade_message ?? json?.error ?? "Competitor limit reached.");
          } else {
            setApiErr(json?.error ?? "Failed to save competitors. Please try again.");
          }
          setLoading(false);
          return;
        }

        // Show warning if backend silently skipped some
        if (json?.skipped > 0) {
          setApiErr(`${json.skipped} competitor(s) were skipped — plan limit of ${maxAllowed} reached.`);
          setLoading(false);
          return;
        }
      }

      onNext();
    } catch (err) {
      console.error("[Step2] submit error:", err);
      setApiErr("Network error — check your connection and try again.");
      setLoading(false);
    }
  };

  // ─────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="glass-dark rounded-2xl border border-border/50 p-8 shadow-2xl">

        {/* ── Header ── */}
        <div className="mb-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet/10 border border-violet/20 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-violet animate-pulse" />
            <span className="text-xs font-medium text-violet-light">Step 2 of 5</span>
          </div>
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">
            Who are your competitors?
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            We'll track when AI engines recommend them instead of you.
            Add at least 3 for meaningful comparison data.
            {limitLoaded && (
              <span className="ml-1 text-graphite/60">
                (up to <strong className="text-foreground">{maxAllowed}</strong> on your plan)
              </span>
            )}
          </p>
        </div>

        {/* ── Input ── */}
        <div className="flex gap-2 mb-5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={loading || atLimit}
            placeholder={atLimit ? `Limit reached (${maxAllowed} max on your plan)` : "competitor.com or brand name"}
            className="flex-1 px-4 py-3 rounded-xl bg-charcoal border border-border text-foreground
              placeholder:text-graphite/60 text-sm
              focus:outline-none focus:ring-2 focus:ring-violet/40
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200 hover:border-border/80"
          />
          <button
            onClick={add}
            disabled={!input.trim() || loading || atLimit}
            className="px-4 py-3 rounded-xl bg-violet/20 border border-violet/30 text-violet-light text-sm font-medium
              hover:bg-violet/30 transition-all duration-200
              disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>

        {/* ── Progress bar ── */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-graphite">
              {count === 0
                ? "No competitors added yet"
                : `${count} of ${maxAllowed} competitor${count > 1 ? "s" : ""} added`}
            </span>
            <span className={`text-xs font-medium ${atLimit ? "text-amber" : enough ? "text-emerald" : "text-amber"}`}>
              {atLimit
                ? `✓ Limit reached (${maxAllowed})`
                : enough
                ? "✓ Good to go"
                : `${3 - count} more recommended`}
            </span>
          </div>
          <div className="h-1 w-full bg-charcoal rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                atLimit ? "bg-amber" : enough ? "bg-emerald" : "bg-amber"
              }`}
              style={{ width: `${Math.min((count / maxAllowed) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* ── Competitor chips ── */}
        {count > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {data.competitors.map((comp) => (
              <div
                key={comp}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-charcoal border border-border
                  text-sm text-foreground group hover:border-destructive/40 transition-all duration-200"
              >
                <div className="w-5 h-5 rounded-md bg-emerald/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[9px] font-bold text-emerald uppercase">{comp[0]}</span>
                </div>
                <span className="font-mono text-xs text-graphite">{comp}</span>
                <button
                  onClick={() => remove(comp)}
                  disabled={loading}
                  className="text-graphite/40 hover:text-destructive transition-colors duration-150 ml-1 disabled:pointer-events-none"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 3L9 9M9 3L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ── Empty state ── */}
        {count === 0 && (
          <div className="mb-6 py-8 rounded-xl border border-dashed border-border/50 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 rounded-xl bg-charcoal-light flex items-center justify-center mb-3">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke="#8A93A6" strokeWidth="1.2" />
                <path d="M6 10C6 10 7.5 7 10 7C12.5 7 14 10 14 10C14 10 12.5 13 10 13C7.5 13 6 10 6 10Z" stroke="#8A93A6" strokeWidth="1.2" />
                <circle cx="10" cy="10" r="2" stroke="#8A93A6" strokeWidth="1.2" />
              </svg>
            </div>
            <p className="text-sm text-graphite">Add competitors to start tracking</p>
            <p className="text-xs text-graphite/60 mt-1">Type a domain or brand name above</p>
          </div>
        )}

        {/* ── Plan limit upgrade nudge ── */}
        {atLimit && (
          <div className="mb-5 flex items-start gap-3 px-4 py-3 rounded-xl bg-amber/8 border border-amber/25">
            <svg className="flex-shrink-0 mt-0.5 text-amber" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
              <path d="M7 4V7.5M7 9.5V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <p className="text-xs text-amber leading-relaxed">
              You've reached the {maxAllowed}-competitor limit on your plan.{" "}
              <a href="/dashboard/billing" className="underline underline-offset-2 hover:text-amber/80">
                Upgrade to track more →
              </a>
            </p>
          </div>
        )}

        {/* ── API error ── */}
        {apiErr && !atLimit && (
          <div className="mb-5 flex items-start gap-3 px-4 py-3 rounded-xl bg-destructive/8 border border-destructive/25">
            <svg className="flex-shrink-0 mt-0.5 text-destructive" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
              <path d="M7 4V7.5M7 9.5V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <p className="text-xs text-destructive leading-relaxed">{apiErr}</p>
          </div>
        )}

        {/* ── CTAs ── */}
        <div className="flex gap-3">
          <button
            onClick={() => handleNext(false)}
            disabled={loading}
            className={`flex-1 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-[0.98]
              disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100
              ${enough
                ? "bg-emerald hover:bg-emerald-light text-charcoal hover:shadow-[0_0_24px_rgba(15,191,154,0.4)]"
                : "bg-emerald/80 hover:bg-emerald text-charcoal"}`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2"><Spinner />Saving…</span>
            ) : (
              "Continue →"
            )}
          </button>

          {count === 0 && !loading && (
            <button
              onClick={() => handleNext(true)}
              className="px-5 py-3.5 rounded-xl text-white/50 text-sm hover:text-white
                border border-white/10 hover:border-white/20 transition-all duration-200"
            >
              Skip
            </button>
          )}
        </div>

      </div>
    </div>
  );
}