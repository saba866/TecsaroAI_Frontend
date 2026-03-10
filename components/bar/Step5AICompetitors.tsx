


// "use client";

// import { useState, useEffect, useRef } from "react";
// import { supabaseBrowser } from "@/lib/supabaseClient";
// import { Spinner, ErrorMsg } from "@/components/ui/icons";
// import type { ProjectData } from "@/components/onboarding/OnboardingWizard";

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// // Max seconds to wait for pipeline_status = "awaiting_competitor_review"
// // before loading suggestions anyway (pipeline may have set status differently)
// const POLL_TIMEOUT_MS = 90_000;

// type AISuggestion = {
//   id: string;
//   name: string;
//   domain: string;
//   confidence_score: number;
//   times_seen: number;
//   detected_reason?: string;
//   classification?: string;
// };

// type Props = {
//   data:     ProjectData;
//   onUpdate: (p: Partial<ProjectData>) => void;
//   onNext:   () => void;
// };

// export default function Step5AICompetitors({ data, onUpdate, onNext }: Props) {
//   const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
//   const [loadState,   setLoadState]   = useState<"waiting" | "ready" | "error">("waiting");
//   const [loadError,   setLoadError]   = useState("");
//   const [accepted,    setAccepted]    = useState<Set<string>>(new Set());
//   const [saving,      setSaving]      = useState(false);
//   const [saveError,   setSaveError]   = useState("");

//   const pollRef    = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
//   const timeoutRef = useRef<ReturnType<typeof setTimeout>  | undefined>(undefined);
//   const loadedRef  = useRef(false);

//   // ── Auth helper ─────────────────────────────────────────────────────────
//   const getToken = async () => {
//     const { data: s } = await supabaseBrowser.auth.getSession();
//     return s?.session?.access_token ?? null;
//   };

//   // ── Phase polling ────────────────────────────────────────────────────────
//   // Wait for pipeline_status = "awaiting_competitor_review", then load.
//   // Fallback: after POLL_TIMEOUT_MS try loading anyway — handles cases where
//   // the pipeline uses a different status value or already completed.
//   useEffect(() => {
//     if (!data.planId) {
//       setLoadError("Plan ID missing — please go back to Step 1.");
//       setLoadState("error");
//       return;
//     }

//     let cancelled = false;

//     const checkPhase = async () => {
//       if (cancelled || loadedRef.current) return;
//       try {
//         const token = await getToken();
//         if (!token) { setLoadError("Session expired."); setLoadState("error"); return; }

//         const res  = await fetch(`${BACKEND_URL}/plans/${data.planId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!res.ok) return;

//         const json   = await res.json();
//         const plan   = json?.data ?? json;
//         const status = (plan?.pipeline_status ?? "") as string;

//         if (status === "awaiting_competitor_review") {
//           clearInterval(pollRef.current);
//           clearTimeout(timeoutRef.current);
//           loadedRef.current = true;
//           await loadSuggestions(token);
//           return;
//         }

//         // Pipeline already past this stage — move on
//         if (status === "completed" && !loadedRef.current) {
//           clearInterval(pollRef.current);
//           clearTimeout(timeoutRef.current);
//           loadedRef.current = true;
//           onNext();
//         }
//       } catch { /* silent retry */ }
//     };

//     // Start polling every 4 s
//     checkPhase();
//     pollRef.current = setInterval(checkPhase, 4000);

//     // Timeout fallback: try loading suggestions regardless after POLL_TIMEOUT_MS
//     timeoutRef.current = setTimeout(async () => {
//       if (cancelled || loadedRef.current) return;
//       clearInterval(pollRef.current);
//       loadedRef.current = true;
//       console.warn("[Step5] poll timeout — trying loadSuggestions anyway");
//       const token = await getToken();
//       await loadSuggestions(token);
//     }, POLL_TIMEOUT_MS);

//     return () => {
//       cancelled = true;
//       clearInterval(pollRef.current);
//       clearTimeout(timeoutRef.current);
//     };
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

//   // ── Load suggestions ─────────────────────────────────────────────────────
//   // GET /aeo/competitors/:planId
//   // apiResponse wraps payload in { data: { competitors, suggestions } }
//   const loadSuggestions = async (token?: string | null) => {
//     try {
//       const t = token ?? await getToken();
//       if (!t) { setLoadError("Session expired."); setLoadState("error"); return; }

//       const res = await fetch(`${BACKEND_URL}/aeo/competitors/${data.planId}`, {
//         headers: { Authorization: `Bearer ${t}` },
//       });

//       if (!res.ok) {
//         const json = await res.json().catch(() => ({}));
//         setLoadError(json?.message ?? json?.error ?? "Failed to load AI competitor suggestions.");
//         setLoadState("error");
//         return;
//       }

//       const payload = await res.json();

//       // ── FIX: apiResponse wraps in .data — unwrap before reading suggestions ──
//       const body  = payload?.data ?? payload;
//       // Onboarding shows suggestions (unapproved); fall back to competitors if empty
//       const items: AISuggestion[] =
//         body?.suggestions?.length  ? body.suggestions  :
//         body?.competitors?.length  ? body.competitors  :
//         [];

//       setSuggestions(items);
//       setAccepted(new Set(items.map((c) => c.id))); // pre-select all
//       setLoadState("ready");
//     } catch (err) {
//       console.error("[Step5] loadSuggestions:", err);
//       setLoadError("Network error — check your connection.");
//       setLoadState("error");
//     }
//   };

//   // ── Toggle / bulk actions ────────────────────────────────────────────────
//   const toggle    = (id: string) =>
//     setAccepted((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
//   const acceptAll = () => setAccepted(new Set(suggestions.map((c) => c.id)));
//   const clearAll  = () => setAccepted(new Set());

//   // ── Confirm ──────────────────────────────────────────────────────────────
//   // 1. PUT /aeo/competitors/:id/approve  (was /accept — fixed)
//   // 2. PUT /aeo/competitors/:id/ignore
//   // 3. POST /aeo/competitors/confirm-review  → sets pipeline_status = phase3_pending
//   const handleConfirm = async (skipAll = false) => {
//     setSaving(true);
//     setSaveError("");

//     try {
//       const token = await getToken();
//       if (!token) { setSaveError("Session expired — please sign in again."); setSaving(false); return; }

//       if (!skipAll && suggestions.length > 0) {
//         // ── FIX: route is /approve not /accept ──
//         const calls = suggestions.map((comp) => {
//           const action = accepted.has(comp.id) ? "approve" : "ignore";
//           return fetch(`${BACKEND_URL}/aeo/competitors/${comp.id}/${action}`, {
//             method:  "PUT",
//             headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//             body:    JSON.stringify({ planId: data.planId }),
//           });
//         });

//         const results = await Promise.allSettled(calls);
//         const failed  = results.filter(r => r.status === "rejected" || (r.status === "fulfilled" && !r.value.ok));
//         if (failed.length) console.warn(`[Step5] ${failed.length} approve/ignore calls failed`);
//       }

//       // ── POST confirm-review to advance pipeline to Phase 3 ──
//       const confirmRes = await fetch(`${BACKEND_URL}/aeo/competitors/confirm-review`, {
//         method:  "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body:    JSON.stringify({ planId: data.planId }),
//       });

//       if (!confirmRes.ok) {
//         const j = await confirmRes.json().catch(() => ({}));
//         console.error("[Step5] confirm-review failed:", j);
//         // Non-fatal — still advance the wizard
//       }

//       // Persist into wizard state
//       onUpdate({
//         aiCompetitors: suggestions.map((c) => ({
//           name:       c.name,
//           domain:     c.domain,
//           confidence: Math.round(c.confidence_score * 100),
//           accepted:   accepted.has(c.id),
//         })),
//       });

//       onNext();
//     } catch (err) {
//       console.error("[Step5] handleConfirm:", err);
//       setSaveError("Network error — check your connection and try again.");
//       setSaving(false);
//     }
//   };

//   // ── Render: waiting ──────────────────────────────────────────────────────
//   if (loadState === "waiting") {
//     return (
//       <div className="animate-in fade-in duration-300">
//         <div className="glass-dark rounded-2xl border border-border/50 p-8 shadow-2xl">
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet/10 border border-violet/20 mb-5">
//             <div className="w-1.5 h-1.5 rounded-full bg-violet animate-pulse"/>
//             <span className="text-xs font-medium text-violet-light">Step 5 of 5</span>
//           </div>
//           <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">
//             Discovering AI competitors…
//           </h2>
//           <p className="text-muted-foreground text-sm mb-10">
//             Running mapping and brand analysis. Checking which brands appear most in AI answers for your prompts.
//           </p>

//           <div className="space-y-3 mb-6">
//             {[
//               { label: "Mapping prompts to pages", icon: "🗺️" },
//               { label: "Building brand profile",   icon: "🏢" },
//               { label: "Discovering competitors",  icon: "🔍" },
//             ].map((s, i) => (
//               <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-emerald/5 border border-emerald/10">
//                 <span>{s.icon}</span>
//                 <span className="text-sm text-graphite">{s.label}</span>
//                 <div className="ml-auto flex gap-0.5">
//                   {[0, 1, 2].map((dot) => (
//                     <div key={dot} className="w-1 h-1 rounded-full bg-emerald/40 animate-bounce"
//                       style={{ animationDelay: `${(i * 300 + dot * 150)}ms` }}/>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="flex flex-col items-center gap-3 py-4">
//             <Spinner size={24}/>
//             <p className="text-xs text-graphite animate-pulse">This usually takes 30–60 seconds…</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ── Render: error ────────────────────────────────────────────────────────
//   if (loadState === "error") {
//     return (
//       <div className="animate-in fade-in duration-300">
//         <div className="glass-dark rounded-2xl border border-border/50 p-8 shadow-2xl">
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet/10 border border-violet/20 mb-5">
//             <div className="w-1.5 h-1.5 rounded-full bg-violet"/>
//             <span className="text-xs font-medium text-violet-light">Step 5 of 5</span>
//           </div>
//           <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">AI found these competitors</h2>
//           <ErrorMsg msg={loadError} onRetry={() => { loadedRef.current = false; loadSuggestions(); }} />
//           <button onClick={() => handleConfirm(true)} disabled={saving}
//             className="mt-5 w-full py-3.5 rounded-xl text-graphite text-sm border border-border hover:text-foreground hover:border-border/80 transition-all">
//             {saving ? <span className="flex items-center justify-center gap-2"><Spinner/> Finishing…</span> : "Skip this step →"}
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ── Render: no suggestions ───────────────────────────────────────────────
//   if (suggestions.length === 0) {
//     return (
//       <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
//         <div className="glass-dark rounded-2xl border border-border/50 p-8 shadow-2xl">
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet/10 border border-violet/20 mb-5">
//             <div className="w-1.5 h-1.5 rounded-full bg-violet"/>
//             <span className="text-xs font-medium text-violet-light">Step 5 of 5</span>
//           </div>
//           <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">No AI competitors found yet</h2>
//           <p className="text-muted-foreground text-sm leading-relaxed mb-8">
//             No competitor suggestions were found at this stage. You can add competitors manually from the dashboard at any time.
//           </p>
//           <button onClick={() => handleConfirm(true)} disabled={saving}
//             className="w-full py-3.5 rounded-xl bg-emerald hover:bg-emerald-light text-charcoal font-semibold text-sm
//               transition-all duration-200 hover:shadow-[0_0_24px_rgba(15,191,154,0.4)] active:scale-[0.98]
//               disabled:opacity-70 disabled:cursor-not-allowed">
//             {saving ? <span className="flex items-center justify-center gap-2"><Spinner/> Finishing…</span> : "Continue to Dashboard →"}
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ── Render: main list ────────────────────────────────────────────────────
//   return (
//     <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
//       <div className="glass-dark rounded-2xl border border-border/50 p-8 shadow-2xl">

//         <div className="mb-6">
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet/10 border border-violet/20 mb-4">
//             <div className="w-1.5 h-1.5 rounded-full bg-violet animate-pulse"/>
//             <span className="text-xs font-medium text-violet-light">Step 5 of 5</span>
//           </div>
//           <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">AI found these competitors</h2>
//           <p className="text-muted-foreground text-sm leading-relaxed">
//             These brands appeared most often in AI answers for your prompts. Add them for competitive benchmarking.
//           </p>
//         </div>

//         {/* Quick actions */}
//         <div className="flex items-center gap-2 mb-5">
//           <button onClick={acceptAll} disabled={saving}
//             className="px-3.5 py-1.5 rounded-lg bg-emerald/10 border border-emerald/20 text-emerald text-xs font-medium
//               hover:bg-emerald/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
//             Accept All
//           </button>
//           <button onClick={clearAll} disabled={saving}
//             className="px-3.5 py-1.5 rounded-lg bg-charcoal border border-border text-graphite text-xs font-medium
//               hover:text-foreground hover:border-border/80 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
//             Clear All
//           </button>
//           <span className="ml-auto text-xs text-graphite">{accepted.size} of {suggestions.length} selected</span>
//         </div>

//         {/* Competitor cards */}
//         <div className="space-y-2 mb-7">
//           {suggestions.map((comp) => {
//             const isAccepted = accepted.has(comp.id);
//             const confidence = Math.round(comp.confidence_score * 100);
//             const mentions   = comp.times_seen ?? 0;

//             return (
//               <div key={comp.id} onClick={() => !saving && toggle(comp.id)}
//                 className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200
//                   ${saving ? "cursor-not-allowed opacity-60"
//                     : isAccepted
//                     ? "bg-emerald/5 border-emerald/30 cursor-pointer"
//                     : "border-border/50 hover:border-border hover:bg-charcoal/40 cursor-pointer"}`}>

//                 <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-heading font-bold text-sm flex-shrink-0 transition-all
//                   ${isAccepted ? "bg-emerald/20 text-emerald" : "bg-charcoal-light text-graphite"}`}>
//                   {comp.name[0]?.toUpperCase()}
//                 </div>

//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center gap-2">
//                     <span className="text-sm font-medium text-foreground">{comp.name}</span>
//                     <span className="text-xs text-graphite/60 font-mono">{comp.domain}</span>
//                   </div>
//                   <div className="flex items-center gap-3 mt-1">
//                     <div className="flex items-center gap-1.5">
//                       <div className="w-20 h-1 bg-charcoal rounded-full overflow-hidden">
//                         <div className={`h-full rounded-full transition-all duration-500
//                           ${confidence >= 80 ? "bg-emerald" : confidence >= 60 ? "bg-amber" : "bg-graphite"}`}
//                           style={{ width: `${confidence}%` }} />
//                       </div>
//                       <span className="text-[10px] text-graphite">{confidence}% match</span>
//                     </div>
//                     {mentions > 0 && (
//                       <span className="text-[10px] text-graphite">
//                         appeared in {mentions} AI answer{mentions !== 1 ? "s" : ""}
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border transition-all
//                   ${isAccepted ? "bg-emerald border-emerald" : "border-border bg-transparent"}`}>
//                   {isAccepted && (
//                     <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
//                       <path d="M2 5L4 7L8 3" stroke="#0B0F14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                     </svg>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {saveError && <div className="mb-5"><ErrorMsg msg={saveError}/></div>}

//         <div className="flex gap-3">
//           <button onClick={() => handleConfirm(false)} disabled={saving}
//             className="flex-1 py-3.5 rounded-xl bg-emerald hover:bg-emerald-light text-charcoal font-semibold text-sm
//               transition-all duration-200 hover:shadow-[0_0_24px_rgba(15,191,154,0.4)] active:scale-[0.98]
//               disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100">
//             {saving ? (
//               <span className="flex items-center justify-center gap-2"><Spinner/> Saving…</span>
//             ) : accepted.size > 0 ? (
//               `Add ${accepted.size} Competitor${accepted.size !== 1 ? "s" : ""} →`
//             ) : (
//               "Continue →"
//             )}
//           </button>
//           {!saving && (
//             <button onClick={() => handleConfirm(true)}
//               className="px-5 py-3.5 rounded-xl text-graphite text-sm hover:text-foreground border border-border hover:border-border/80 transition-all">
//               Skip
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




// "use client";

// import { useState, useEffect, useRef } from "react";
// import { supabaseBrowser } from "@/lib/supabaseClient";
// import { Spinner, ErrorMsg } from "@/components/ui/icons";
// import type { ProjectData } from "@/components/onboarding/OnboardingWizard";

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// // Max ms to wait for pipeline_status = "awaiting_competitor_review"
// const POLL_TIMEOUT_MS = 90_000;

// type AISuggestion = {
//   id:                string;
//   name:              string;
//   domain:            string;
//   confidence_score:  number;
//   times_seen:        number;
//   detected_reason?:  string;
//   classification?:   string;
// };

// type Props = {
//   data:     ProjectData;
//   onUpdate: (p: Partial<ProjectData>) => void;
//   onNext:   () => void;
// };

// export default function Step5AICompetitors({ data, onUpdate, onNext }: Props) {
//   const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
//   const [loadState,   setLoadState]   = useState<"waiting" | "ready" | "error">("waiting");
//   const [loadError,   setLoadError]   = useState("");
//   const [accepted,    setAccepted]    = useState<Set<string>>(new Set());
//   const [saving,      setSaving]      = useState(false);
//   const [saveError,   setSaveError]   = useState("");

//   const pollRef    = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
//   const timeoutRef = useRef<ReturnType<typeof setTimeout>  | undefined>(undefined);
//   const loadedRef  = useRef(false);

//   // ── Auth helper ─────────────────────────────────────────────────────────
//   const getToken = async () => {
//     const { data: s } = await supabaseBrowser.auth.getSession();
//     return s?.session?.access_token ?? null;
//   };

//   // ── Phase polling ────────────────────────────────────────────────────────
//   useEffect(() => {
//     if (!data.planId) {
//       setLoadError("Plan ID missing — please go back to Step 1.");
//       setLoadState("error");
//       return;
//     }

//     let cancelled = false;

//     const checkPhase = async () => {
//       if (cancelled || loadedRef.current) return;
//       try {
//         const token = await getToken();
//         if (!token) { setLoadError("Session expired."); setLoadState("error"); return; }

//         const res  = await fetch(`${BACKEND_URL}/plans/${data.planId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!res.ok) return;

//         const json   = await res.json();
//         const plan   = json?.data ?? json;
//         const status = (plan?.pipeline_status ?? "") as string;

//         if (status === "awaiting_competitor_review") {
//           clearInterval(pollRef.current);
//           clearTimeout(timeoutRef.current);
//           loadedRef.current = true;
//           await loadSuggestions(token);
//           return;
//         }

//         // Pipeline already past this stage — move on
//         if (status === "completed" && !loadedRef.current) {
//           clearInterval(pollRef.current);
//           clearTimeout(timeoutRef.current);
//           loadedRef.current = true;
//           onNext();
//         }
//       } catch { /* silent retry */ }
//     };

//     checkPhase();
//     pollRef.current = setInterval(checkPhase, 4000);

//     // Fallback: try loading after timeout regardless
//     timeoutRef.current = setTimeout(async () => {
//       if (cancelled || loadedRef.current) return;
//       clearInterval(pollRef.current);
//       loadedRef.current = true;
//       console.warn("[Step5] poll timeout — trying loadSuggestions anyway");
//       const token = await getToken();
//       await loadSuggestions(token);
//     }, POLL_TIMEOUT_MS);

//     return () => {
//       cancelled = true;
//       clearInterval(pollRef.current);
//       clearTimeout(timeoutRef.current);
//     };
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

//   // ── Load suggestions — exclude what user already added in Step 2 ─────────
//   const loadSuggestions = async (token?: string | null) => {
//     try {
//       const t = token ?? await getToken();
//       if (!t) { setLoadError("Session expired."); setLoadState("error"); return; }

//       const res = await fetch(`${BACKEND_URL}/aeo/competitors/${data.planId}`, {
//         headers: { Authorization: `Bearer ${t}` },
//       });

//       if (!res.ok) {
//         const json = await res.json().catch(() => ({}));
//         setLoadError(json?.message ?? json?.error ?? "Failed to load AI competitor suggestions.");
//         setLoadState("error");
//         return;
//       }

//       const payload = await res.json();
//       const body    = payload?.data ?? payload;

//       // ── KEY: only show AI suggestions (source="ai", approved=false) ──
//       // Filter out any domain the user already added manually in Step 2
//       // data.competitors = string[] of domains user added in Step 2
//       const userDomains = new Set(
//         (data.competitors ?? []).map((d: string) =>
//           d.toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0]
//         )
//       );

//       const rawSuggestions: AISuggestion[] =
//         body?.suggestions?.length ? body.suggestions :
//         body?.competitors?.length ? body.competitors :
//         [];

//       // Exclude what user already added
//       const filtered = rawSuggestions.filter((c) => {
//         const domain = c.domain?.toLowerCase().replace(/^www\./, "");
//         return !userDomains.has(domain);
//       });

//       setSuggestions(filtered);
//       setAccepted(new Set(filtered.map((c) => c.id))); // pre-select all
//       setLoadState("ready");
//     } catch (err) {
//       console.error("[Step5] loadSuggestions:", err);
//       setLoadError("Network error — check your connection.");
//       setLoadState("error");
//     }
//   };

//   // ── Toggle / bulk actions ────────────────────────────────────────────────
//   const toggle    = (id: string) =>
//     setAccepted((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
//   const acceptAll = () => setAccepted(new Set(suggestions.map((c) => c.id)));
//   const clearAll  = () => setAccepted(new Set());

//   // ── Confirm ──────────────────────────────────────────────────────────────
//   const handleConfirm = async (skipAll = false) => {
//     setSaving(true);
//     setSaveError("");

//     try {
//       const token = await getToken();
//       if (!token) { setSaveError("Session expired — please sign in again."); setSaving(false); return; }

//       if (!skipAll && suggestions.length > 0) {
//         const calls = suggestions.map((comp) => {
//           const action = accepted.has(comp.id) ? "approve" : "ignore";
//           return fetch(`${BACKEND_URL}/aeo/competitors/${comp.id}/${action}`, {
//             method:  "PUT",
//             headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//             body:    JSON.stringify({ planId: data.planId }),
//           });
//         });

//         const results = await Promise.allSettled(calls);
//         const failed  = results.filter(r => r.status === "rejected" || (r.status === "fulfilled" && !r.value.ok));
//         if (failed.length) console.warn(`[Step5] ${failed.length} approve/ignore calls failed`);
//       }

//       // Advance pipeline to Phase 3
//       const confirmRes = await fetch(`${BACKEND_URL}/aeo/competitors/confirm-review`, {
//         method:  "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body:    JSON.stringify({ planId: data.planId }),
//       });

//       if (!confirmRes.ok) {
//         const j = await confirmRes.json().catch(() => ({}));
//         console.error("[Step5] confirm-review failed:", j);
//         // Non-fatal — still advance wizard
//       }

//       onUpdate({
//         aiCompetitors: suggestions.map((c) => ({
//           name:       c.name,
//           domain:     c.domain,
//           confidence: Math.round(c.confidence_score * 100),
//           accepted:   accepted.has(c.id),
//         })),
//       });

//       onNext();
//     } catch (err) {
//       console.error("[Step5] handleConfirm:", err);
//       setSaveError("Network error — check your connection and try again.");
//       setSaving(false);
//     }
//   };

//   // ── Render: waiting ──────────────────────────────────────────────────────
//   if (loadState === "waiting") {
//     return (
//       <div className="animate-in fade-in duration-300">
//         <div className="glass-dark rounded-2xl border border-border/50 p-8 shadow-2xl">
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet/10 border border-violet/20 mb-5">
//             <div className="w-1.5 h-1.5 rounded-full bg-violet animate-pulse" />
//             <span className="text-xs font-medium text-violet-light">Step 5 of 5</span>
//           </div>
//           <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">
//             Discovering AI competitors…
//           </h2>
//           <p className="text-muted-foreground text-sm mb-10">
//             Running mapping and brand analysis. Checking which brands appear most in AI answers for your prompts.
//           </p>

//           <div className="space-y-3 mb-6">
//             {[
//               { label: "Mapping prompts to pages", icon: "🗺️" },
//               { label: "Building brand profile",   icon: "🏢" },
//               { label: "Discovering competitors",  icon: "🔍" },
//             ].map((s, i) => (
//               <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-emerald/5 border border-emerald/10">
//                 <span>{s.icon}</span>
//                 <span className="text-sm text-graphite">{s.label}</span>
//                 <div className="ml-auto flex gap-0.5">
//                   {[0, 1, 2].map((dot) => (
//                     <div key={dot} className="w-1 h-1 rounded-full bg-emerald/40 animate-bounce"
//                       style={{ animationDelay: `${(i * 300 + dot * 150)}ms` }} />
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="flex flex-col items-center gap-3 py-4">
//             <Spinner size={24} />
//             <p className="text-xs text-graphite animate-pulse">This usually takes 30–60 seconds…</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ── Render: error ────────────────────────────────────────────────────────
//   if (loadState === "error") {
//     return (
//       <div className="animate-in fade-in duration-300">
//         <div className="glass-dark rounded-2xl border border-border/50 p-8 shadow-2xl">
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet/10 border border-violet/20 mb-5">
//             <div className="w-1.5 h-1.5 rounded-full bg-violet" />
//             <span className="text-xs font-medium text-violet-light">Step 5 of 5</span>
//           </div>
//           <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">AI found these competitors</h2>
//           <ErrorMsg msg={loadError} onRetry={() => { loadedRef.current = false; loadSuggestions(); }} />
//           <button onClick={() => handleConfirm(true)} disabled={saving}
//             className="mt-5 w-full py-3.5 rounded-xl text-graphite text-sm border border-border hover:text-foreground hover:border-border/80 transition-all">
//             {saving ? <span className="flex items-center justify-center gap-2"><Spinner /> Finishing…</span> : "Skip this step →"}
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ── Render: no suggestions (all already added or none found) ─────────────
//   if (suggestions.length === 0) {
//     return (
//       <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
//         <div className="glass-dark rounded-2xl border border-border/50 p-8 shadow-2xl">
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet/10 border border-violet/20 mb-5">
//             <div className="w-1.5 h-1.5 rounded-full bg-violet" />
//             <span className="text-xs font-medium text-violet-light">Step 5 of 5</span>
//           </div>
//           <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">
//             {(data.competitors?.length ?? 0) > 0
//               ? "No new AI competitors found"
//               : "No AI competitors found yet"
//             }
//           </h2>
//           <p className="text-muted-foreground text-sm leading-relaxed mb-8">
//             {(data.competitors?.length ?? 0) > 0
//               ? "The AI didn't discover any competitors beyond the ones you already added. You can add more manually from the dashboard anytime."
//               : "No competitor suggestions were found at this stage. You can add competitors manually from the dashboard at any time."
//             }
//           </p>
//           <button onClick={() => handleConfirm(true)} disabled={saving}
//             className="w-full py-3.5 rounded-xl bg-emerald hover:bg-emerald-light text-charcoal font-semibold text-sm
//               transition-all duration-200 hover:shadow-[0_0_24px_rgba(15,191,154,0.4)] active:scale-[0.98]
//               disabled:opacity-70 disabled:cursor-not-allowed">
//             {saving ? <span className="flex items-center justify-center gap-2"><Spinner /> Finishing…</span> : "Continue to Dashboard →"}
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ── Render: main suggestions list ────────────────────────────────────────
//   return (
//     <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
//       <div className="glass-dark rounded-2xl border border-border/50 p-8 shadow-2xl">

//         <div className="mb-6">
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet/10 border border-violet/20 mb-4">
//             <div className="w-1.5 h-1.5 rounded-full bg-violet animate-pulse" />
//             <span className="text-xs font-medium text-violet-light">Step 5 of 5</span>
//           </div>
//           <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">
//             AI found these competitors
//           </h2>
//           <p className="text-muted-foreground text-sm leading-relaxed">
//             These brands appeared most in AI answers for your prompts — and weren't in your list yet.
//             Accept the ones you want to track, ignore the rest.
//           </p>
//         </div>

//         {/* ── User-added reminder pill ── */}
//         {(data.competitors?.length ?? 0) > 0 && (
//           <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald/5 border border-emerald/10 mb-5">
//             <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
//               <circle cx="7" cy="7" r="6" stroke="#0fbf9a" strokeWidth="1.2" />
//               <path d="M4.5 7L6.5 9L9.5 5" stroke="#0fbf9a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//             <span className="text-xs text-emerald font-medium">
//               {data.competitors.length} competitor{data.competitors.length !== 1 ? "s" : ""} you added are already being tracked
//             </span>
//           </div>
//         )}

//         {/* ── Quick actions ── */}
//         <div className="flex items-center gap-2 mb-5">
//           <button onClick={acceptAll} disabled={saving}
//             className="px-3.5 py-1.5 rounded-lg bg-emerald/10 border border-emerald/20 text-emerald text-xs font-medium
//               hover:bg-emerald/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
//             Accept All
//           </button>
//           <button onClick={clearAll} disabled={saving}
//             className="px-3.5 py-1.5 rounded-lg bg-charcoal border border-border text-graphite text-xs font-medium
//               hover:text-foreground hover:border-border/80 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
//             Ignore All
//           </button>
//           <span className="ml-auto text-xs text-graphite">{accepted.size} of {suggestions.length} selected</span>
//         </div>

//         {/* ── Competitor cards ── */}
//         <div className="space-y-2 mb-7">
//           {suggestions.map((comp) => {
//             const isAccepted = accepted.has(comp.id);
//             const confidence = Math.round(comp.confidence_score * 100);
//             const mentions   = comp.times_seen ?? 0;

//             return (
//               <div key={comp.id} onClick={() => !saving && toggle(comp.id)}
//                 className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200
//                   ${saving ? "cursor-not-allowed opacity-60"
//                     : isAccepted
//                     ? "bg-emerald/5 border-emerald/30 cursor-pointer"
//                     : "border-border/50 hover:border-border hover:bg-charcoal/40 cursor-pointer"
//                   }`}
//               >
//                 <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-heading font-bold text-sm flex-shrink-0 transition-all
//                   ${isAccepted ? "bg-emerald/20 text-emerald" : "bg-charcoal-light text-graphite"}`}>
//                   {comp.name[0]?.toUpperCase()}
//                 </div>

//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center gap-2">
//                     <span className="text-sm font-medium text-foreground">{comp.name}</span>
//                     <span className="text-xs text-graphite/60 font-mono">{comp.domain}</span>
//                   </div>
//                   <div className="flex items-center gap-3 mt-1">
//                     <div className="flex items-center gap-1.5">
//                       <div className="w-20 h-1 bg-charcoal rounded-full overflow-hidden">
//                         <div
//                           className={`h-full rounded-full transition-all duration-500
//                             ${confidence >= 80 ? "bg-emerald" : confidence >= 60 ? "bg-amber" : "bg-graphite"}`}
//                           style={{ width: `${confidence}%` }}
//                         />
//                       </div>
//                       <span className="text-[10px] text-graphite">{confidence}% match</span>
//                     </div>
//                     {mentions > 0 && (
//                       <span className="text-[10px] text-graphite">
//                         appeared in {mentions} AI answer{mentions !== 1 ? "s" : ""}
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border transition-all
//                   ${isAccepted ? "bg-emerald border-emerald" : "border-border bg-transparent"}`}>
//                   {isAccepted && (
//                     <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
//                       <path d="M2 5L4 7L8 3" stroke="#0B0F14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                     </svg>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {saveError && <div className="mb-5"><ErrorMsg msg={saveError} /></div>}

//         <div className="flex gap-3">
//           <button onClick={() => handleConfirm(false)} disabled={saving}
//             className="flex-1 py-3.5 rounded-xl bg-emerald hover:bg-emerald-light text-charcoal font-semibold text-sm
//               transition-all duration-200 hover:shadow-[0_0_24px_rgba(15,191,154,0.4)] active:scale-[0.98]
//               disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100">
//             {saving ? (
//               <span className="flex items-center justify-center gap-2"><Spinner /> Saving…</span>
//             ) : accepted.size > 0 ? (
//               `Add ${accepted.size} Competitor${accepted.size !== 1 ? "s" : ""} →`
//             ) : (
//               "Continue →"
//             )}
//           </button>
//           {!saving && (
//             <button onClick={() => handleConfirm(true)}
//               className="px-5 py-3.5 rounded-xl text-graphite text-sm hover:text-foreground border border-border hover:border-border/80 transition-all">
//               Skip
//             </button>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }



"use client";

import { useState, useEffect, useRef } from "react";
import { supabaseBrowser } from "@/lib/supabaseClient";
import { Spinner, ErrorMsg } from "@/components/ui/icons";
import type { ProjectData } from "@/components/onboarding/OnboardingWizard";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const POLL_TIMEOUT_MS = 90_000;

type AISuggestion = {
  id:               string;
  name:             string;
  domain:           string;
  confidence_score: number;
  times_seen:       number;
  detected_reason?: string;
  classification?:  string;
};

type Props = {
  data:     ProjectData;
  onUpdate: (p: Partial<ProjectData>) => void;
  onNext:   () => void;
};

export default function Step5AICompetitors({ data, onUpdate, onNext }: Props) {
  const [suggestions,   setSuggestions]   = useState<AISuggestion[]>([]);
  const [loadState,     setLoadState]     = useState<"waiting" | "ready" | "error">("waiting");
  const [loadError,     setLoadError]     = useState("");
  const [accepted,      setAccepted]      = useState<Set<string>>(new Set());
  const [saving,        setSaving]        = useState(false);
  const [saveError,     setSaveError]     = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [expandedId,    setExpandedId]    = useState<string | null>(null);
  const [token,         setToken]         = useState<string>("");

  const pollRef    = useRef<ReturnType<typeof setInterval>  | undefined>(undefined);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>   | undefined>(undefined);
  const loadedRef  = useRef(false);

  // ── Auth helper ──────────────────────────────────────────────────────────
  const getToken = async () => {
    const { data: s } = await supabaseBrowser.auth.getSession();
    return s?.session?.access_token ?? null;
  };

  // ── Phase polling ────────────────────────────────────────────────────────
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
        const t = await getToken();
        if (!t) { setLoadError("Session expired."); setLoadState("error"); return; }
        setToken(t);

        const res = await fetch(`${BACKEND_URL}/plans/${data.planId}`, {
          headers: { Authorization: `Bearer ${t}` },
        });
        if (!res.ok) return;

        const json   = await res.json();
        const plan   = json?.data ?? json;
        const status = (plan?.pipeline_status ?? "") as string;

        if (status === "awaiting_competitor_review") {
          clearInterval(pollRef.current);
          clearTimeout(timeoutRef.current);
          loadedRef.current = true;
          await loadSuggestions(t);
          return;
        }

        if (status === "completed" && !loadedRef.current) {
          clearInterval(pollRef.current);
          clearTimeout(timeoutRef.current);
          loadedRef.current = true;
          onNext();
        }
      } catch { /* silent retry */ }
    };

    checkPhase();
    pollRef.current = setInterval(checkPhase, 4000);

    timeoutRef.current = setTimeout(async () => {
      if (cancelled || loadedRef.current) return;
      clearInterval(pollRef.current);
      loadedRef.current = true;
      console.warn("[Step5] poll timeout — trying loadSuggestions anyway");
      const t = await getToken();
      await loadSuggestions(t);
    }, POLL_TIMEOUT_MS);

    return () => {
      cancelled = true;
      clearInterval(pollRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Load suggestions ─────────────────────────────────────────────────────
  const load = async (t?: string | null) => {
    try {
      const tok = t ?? token ?? await getToken();
      if (!tok) { setLoadError("Session expired."); setLoadState("error"); return; }

      const res = await fetch(`${BACKEND_URL}/aeo/competitors/${data.planId}`, {
        headers: { Authorization: `Bearer ${tok}` },
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setLoadError(json?.message ?? json?.error ?? "Failed to load AI competitor suggestions.");
        setLoadState("error");
        return;
      }

      const payload = await res.json();
      const body    = payload?.data ?? payload;

      const userDomains = new Set(
        (data.competitors ?? []).map((d: string) =>
          d.toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0]
        )
      );

      const rawSuggestions: AISuggestion[] =
        body?.suggestions?.length ? body.suggestions :
        body?.competitors?.length ? body.competitors :
        [];

      const filtered = rawSuggestions.filter((c) => {
        const domain = c.domain?.toLowerCase().replace(/^www\./, "");
        return !userDomains.has(domain);
      });

      setSuggestions(filtered);
      setAccepted(new Set(filtered.map((c) => c.id)));
      setLoadState("ready");
    } catch (err) {
      console.error("[Step5] load:", err);
      setLoadError("Network error — check your connection.");
      setLoadState("error");
    }
  };

  // Keep old name working too
  const loadSuggestions = load;

  // ── New approve / ignore / remove ────────────────────────────────────────
  const handleAccept = async (id: string) => {
    setActionLoading(id);
    try {
      const t = token || await getToken();
      await fetch(`${BACKEND_URL}/aeo/competitors/${id}/accept`, {
        method:  "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${t}` },
        body:    JSON.stringify({ planId: data.planId }),
      });
      await load();
    } finally {
      setActionLoading(null);
    }
  };

  const handleIgnore = async (id: string) => {
    setActionLoading(id);
    try {
      const t = token || await getToken();
      await fetch(`${BACKEND_URL}/aeo/competitors/${id}/ignore`, {
        method:  "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${t}` },
        body:    JSON.stringify({ planId: data.planId }),
      });
      await load();
    } finally {
      setActionLoading(null);
    }
  };

  const handleRemove = async (id: string) => {
    setActionLoading(id);
    try {
      const t = token || await getToken();
      await fetch(`${BACKEND_URL}/aeo/competitors/${id}`, {
        method:  "DELETE",
        headers: { Authorization: `Bearer ${t}` },
      });
      if (expandedId === id) setExpandedId(null);
      await load();
    } finally {
      setActionLoading(null);
    }
  };

  // ── Toggle / bulk actions ────────────────────────────────────────────────
  const toggle    = (id: string) =>
    setAccepted((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const acceptAll = () => setAccepted(new Set(suggestions.map((c) => c.id)));
  const clearAll  = () => setAccepted(new Set());

  // ── Confirm ──────────────────────────────────────────────────────────────
  const handleConfirm = async (skipAll = false) => {
    setSaving(true);
    setSaveError("");

    try {
      const t = token || await getToken();
      if (!t) { setSaveError("Session expired — please sign in again."); setSaving(false); return; }

      if (!skipAll && suggestions.length > 0) {
        const calls = suggestions.map((comp) => {
          const action = accepted.has(comp.id) ? "approve" : "ignore";
          return fetch(`${BACKEND_URL}/aeo/competitors/${comp.id}/${action}`, {
            method:  "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${t}` },
            body:    JSON.stringify({ planId: data.planId }),
          });
        });

        const results = await Promise.allSettled(calls);
        const failed  = results.filter(r => r.status === "rejected" || (r.status === "fulfilled" && !r.value.ok));
        if (failed.length) console.warn(`[Step5] ${failed.length} approve/ignore calls failed`);
      }

      const confirmRes = await fetch(`${BACKEND_URL}/aeo/competitors/confirm-review`, {
        method:  "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${t}` },
        body:    JSON.stringify({ planId: data.planId }),
      });

      if (!confirmRes.ok) {
        const j = await confirmRes.json().catch(() => ({}));
        console.error("[Step5] confirm-review failed:", j);
      }

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

  // ── Render: waiting ──────────────────────────────────────────────────────
  if (loadState === "waiting") {
    return (
      <div className="animate-in fade-in duration-300">
        <div className="glass-dark rounded-2xl border border-border/50 p-8 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet/10 border border-violet/20 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-violet animate-pulse" />
            <span className="text-xs font-medium text-violet-light">Step 5 of 5</span>
          </div>
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">
            Discovering AI competitors…
          </h2>
          <p className="text-muted-foreground text-sm mb-10">
            Running mapping and brand analysis. Checking which brands appear most in AI answers for your prompts.
          </p>

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
                      style={{ animationDelay: `${(i * 300 + dot * 150)}ms` }} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-3 py-4">
            <Spinner size={24} />
            <p className="text-xs text-graphite animate-pulse">This usually takes 30–60 seconds…</p>
          </div>
        </div>
      </div>
    );
  }

  // ── Render: error ────────────────────────────────────────────────────────
  if (loadState === "error") {
    return (
      <div className="animate-in fade-in duration-300">
        <div className="glass-dark rounded-2xl border border-border/50 p-8 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet/10 border border-violet/20 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-violet" />
            <span className="text-xs font-medium text-violet-light">Step 5 of 5</span>
          </div>
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">AI found these competitors</h2>
          <ErrorMsg msg={loadError} onRetry={() => { loadedRef.current = false; load(); }} />
          <button onClick={() => handleConfirm(true)} disabled={saving}
            className="mt-5 w-full py-3.5 rounded-xl text-graphite text-sm border border-border hover:text-foreground hover:border-border/80 transition-all">
            {saving ? <span className="flex items-center justify-center gap-2"><Spinner /> Finishing…</span> : "Skip this step →"}
          </button>
        </div>
      </div>
    );
  }

  // ── Render: no suggestions ───────────────────────────────────────────────
  if (suggestions.length === 0) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="glass-dark rounded-2xl border border-border/50 p-8 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet/10 border border-violet/20 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-violet" />
            <span className="text-xs font-medium text-violet-light">Step 5 of 5</span>
          </div>
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">
            {(data.competitors?.length ?? 0) > 0
              ? "No new AI competitors found"
              : "No AI competitors found yet"}
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            {(data.competitors?.length ?? 0) > 0
              ? "The AI didn't discover any competitors beyond the ones you already added. You can add more manually from the dashboard anytime."
              : "No competitor suggestions were found at this stage. You can add competitors manually from the dashboard at any time."}
          </p>
          <button onClick={() => handleConfirm(true)} disabled={saving}
            className="w-full py-3.5 rounded-xl bg-emerald hover:bg-emerald-light text-charcoal font-semibold text-sm
              transition-all duration-200 hover:shadow-[0_0_24px_rgba(15,191,154,0.4)] active:scale-[0.98]
              disabled:opacity-70 disabled:cursor-not-allowed">
            {saving ? <span className="flex items-center justify-center gap-2"><Spinner /> Finishing…</span> : "Continue to Dashboard →"}
          </button>
        </div>
      </div>
    );
  }

  // ── Render: suggestions list ─────────────────────────────────────────────
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="glass-dark rounded-2xl border border-border/50 p-8 shadow-2xl">

        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet/10 border border-violet/20 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-violet animate-pulse" />
            <span className="text-xs font-medium text-violet-light">Step 5 of 5</span>
          </div>
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">
            AI found these competitors
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            These brands appeared most in AI answers for your prompts — and weren't in your list yet.
            Accept the ones you want to track, ignore the rest.
          </p>
        </div>

        {(data.competitors?.length ?? 0) > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald/5 border border-emerald/10 mb-5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="#0fbf9a" strokeWidth="1.2" />
              <path d="M4.5 7L6.5 9L9.5 5" stroke="#0fbf9a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-xs text-emerald font-medium">
              {data.competitors.length} competitor{data.competitors.length !== 1 ? "s" : ""} you added are already being tracked
            </span>
          </div>
        )}

        <div className="flex items-center gap-2 mb-5">
          <button onClick={acceptAll} disabled={saving || !!actionLoading}
            className="px-3.5 py-1.5 rounded-lg bg-emerald/10 border border-emerald/20 text-emerald text-xs font-medium
              hover:bg-emerald/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
            Accept All
          </button>
          <button onClick={clearAll} disabled={saving || !!actionLoading}
            className="px-3.5 py-1.5 rounded-lg bg-charcoal border border-border text-graphite text-xs font-medium
              hover:text-foreground hover:border-border/80 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
            Ignore All
          </button>
          <span className="ml-auto text-xs text-graphite">{accepted.size} of {suggestions.length} selected</span>
        </div>

        <div className="space-y-2 mb-7">
          {suggestions.map((comp) => {
            const isAccepted    = accepted.has(comp.id);
            const isActioning   = actionLoading === comp.id;
            const confidence    = Math.round(comp.confidence_score * 100);
            const mentions      = comp.times_seen ?? 0;

            return (
              <div key={comp.id}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200
                  ${isActioning ? "opacity-50 cursor-wait"
                    : saving    ? "cursor-not-allowed opacity-60"
                    : isAccepted ? "bg-emerald/5 border-emerald/30"
                    : "border-border/50 hover:border-border hover:bg-charcoal/40"
                  }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-heading font-bold text-sm flex-shrink-0 transition-all
                  ${isAccepted ? "bg-emerald/20 text-emerald" : "bg-charcoal-light text-graphite"}`}>
                  {comp.name[0]?.toUpperCase()}
                </div>

                <div className="flex-1 min-w-0" onClick={() => !saving && !isActioning && toggle(comp.id)} style={{ cursor: "pointer" }}>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{comp.name}</span>
                    <span className="text-xs text-graphite/60 font-mono">{comp.domain}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1.5">
                      <div className="w-20 h-1 bg-charcoal rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500
                            ${confidence >= 80 ? "bg-emerald" : confidence >= 60 ? "bg-amber" : "bg-graphite"}`}
                          style={{ width: `${confidence}%` }}
                        />
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

                {/* Per-card Accept / Ignore / Remove buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  {isActioning ? (
                    <Spinner size={16} />
                  ) : (
                    <>
                      {!isAccepted && (
                        <button onClick={() => handleAccept(comp.id)}
                          className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-emerald/10 text-emerald border border-emerald/20 hover:bg-emerald/20 transition-colors">
                          Accept
                        </button>
                      )}
                      {isAccepted && (
                        <button onClick={() => handleIgnore(comp.id)}
                          className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20 transition-colors">
                          Ignore
                        </button>
                      )}
                      <button onClick={() => handleRemove(comp.id)}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-charcoal border border-border text-graphite hover:text-foreground hover:border-border/80 transition-colors">
                        Remove
                      </button>
                    </>
                  )}
                </div>

                <div onClick={() => !saving && !isActioning && toggle(comp.id)}
                  className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border transition-all cursor-pointer
                    ${isAccepted ? "bg-emerald border-emerald" : "border-border bg-transparent"}`}>
                  {isAccepted && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5L4 7L8 3" stroke="#0B0F14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {saveError && <div className="mb-5"><ErrorMsg msg={saveError} /></div>}

        <div className="flex gap-3">
          <button onClick={() => handleConfirm(false)} disabled={saving || !!actionLoading}
            className="flex-1 py-3.5 rounded-xl bg-emerald hover:bg-emerald-light text-charcoal font-semibold text-sm
              transition-all duration-200 hover:shadow-[0_0_24px_rgba(15,191,154,0.4)] active:scale-[0.98]
              disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100">
            {saving ? (
              <span className="flex items-center justify-center gap-2"><Spinner /> Saving…</span>
            ) : accepted.size > 0 ? (
              `Add ${accepted.size} Competitor${accepted.size !== 1 ? "s" : ""} →`
            ) : (
              "Continue →"
            )}
          </button>
          {!saving && !actionLoading && (
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