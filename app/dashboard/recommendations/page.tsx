


// "use client"

// import { useState, useEffect, useCallback } from "react"
// import { supabaseBrowser } from "@/lib/supabaseClient"
// import { usePlanId } from "@/hooks/usePlanId"
// import { FileText, Plus, CheckCheck, Loader2, ChevronDown, ChevronUp } from "lucide-react"
// import { cn } from "@/lib/utils"

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

// // ── Types ──────────────────────────────────────────────────────────────────
// type Priority = "high" | "medium" | "low"
// type Pattern  = "missed" | "losing" | "competing" | "winning"
// type Filter   = "all" | "high" | "medium" | "low" | "content_creation" | "comparison_content" | "authority_building" | "protect_and_expand"

// interface Action {
//   timeframe: string
//   action:    string
//   detail:    string
// }

// interface Recommendation {
//   id:              string
//   prompt:          string
//   type:            string
//   pattern:         Pattern
//   priority:        Priority
//   summary:         string
//   message:         string
//   actions:         Action[]
//   expected_impact: string
//   estimated_weeks: number
//   top_competitor:  string | null
//   competitor_count:number
//   rec_source:      string
//   done:            boolean
// }

// // ── Helpers ────────────────────────────────────────────────────────────────
// function PriorityBadge({ priority }: { priority: Priority }) {
//   const cls = {
//     high:   "bg-destructive/10 text-destructive border-destructive/20",
//     medium: "bg-amber/10 text-amber border-amber/20",
//     low:    "bg-emerald/10 text-emerald border-emerald/20",
//   }[priority]
//   const label = { high: "High", medium: "Medium", low: "Low" }[priority]
//   return (
//     <span className={cn("text-[10px] font-bold px-2.5 py-1 rounded-full border font-mono whitespace-nowrap", cls)}>
//       {label}
//     </span>
//   )
// }

// function PatternBadge({ pattern }: { pattern: Pattern }) {
//   const cls = {
//     missed:    "bg-destructive/10 text-destructive border-destructive/20",
//     losing:    "bg-amber/10 text-amber border-amber/20",
//     competing: "bg-violet/10 text-violet border-violet/20",
//     winning:   "bg-emerald/10 text-emerald border-emerald/20",
//   }[pattern] ?? "bg-muted text-muted-foreground border-border"
//   return (
//     <span className={cn("text-[10px] font-bold px-2.5 py-1 rounded-full border font-mono whitespace-nowrap capitalize", cls)}>
//       {pattern}
//     </span>
//   )
// }

// function TimeBadge({ weeks }: { weeks: number }) {
//   return (
//     <span className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-border bg-muted text-muted-foreground whitespace-nowrap">
//       ~{weeks}w
//     </span>
//   )
// }

// const FILTER_LABELS: { key: Filter; label: string }[] = [
//   { key: "all",                label: "All"            },
//   { key: "high",               label: "High Priority"  },
//   { key: "medium",             label: "Medium"         },
//   { key: "low",                label: "Low"            },
//   { key: "content_creation",   label: "Content"        },
//   { key: "comparison_content", label: "Comparison"     },
//   { key: "authority_building", label: "Authority"      },
//   { key: "protect_and_expand", label: "Protect & Expand" },
// ]

// // ── Page ───────────────────────────────────────────────────────────────────
// export default function RecommendationsPage() {
//   const planId = usePlanId()

//   const [recs,     setRecs]     = useState<Recommendation[]>([])
//   const [loading,  setLoading]  = useState(true)
//   const [error,    setError]    = useState("")
//   const [filter,   setFilter]   = useState<Filter>("all")
//   const [expanded, setExpanded] = useState<string | null>(null)
//   const [totals,   setTotals]   = useState({ total: 0, high: 0, medium: 0, low: 0 })

//   const load = useCallback(async () => {
//     if (!planId) return
//     setLoading(true)
//     setError("")
//     try {
//       const { data: s } = await supabaseBrowser.auth.getSession()
//       const token = s?.session?.access_token
//       if (!token) { setError("Session expired"); return }

//       const res  = await fetch(`${BACKEND_URL}/aeo/recommendations?planId=${planId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       const json = await res.json()
//       if (!res.ok) { setError(json?.error ?? "Failed to load"); return }

//       const rows = (json?.data?.recommendations ?? []).map((r: any) => ({ ...r, done: false }))
//       setRecs(rows)
//       setTotals({
//         total:  json?.data?.total  ?? 0,
//         high:   json?.data?.high   ?? 0,
//         medium: json?.data?.medium ?? 0,
//         low:    json?.data?.low    ?? 0,
//       })
//     } catch { setError("Network error") } finally { setLoading(false) }
//   }, [planId])

//   useEffect(() => { load() }, [load])

//   const toggleDone   = (id: string) => setRecs(prev => prev.map(r => r.id === id ? { ...r, done: !r.done } : r))
//   const toggleExpand = (id: string) => setExpanded(prev => prev === id ? null : id)

//   const visible = filter === "all"  ? recs
//     : ["high","medium","low"].includes(filter) ? recs.filter(r => r.priority === filter)
//     : recs.filter(r => r.type === filter)

//   const doneCount = recs.filter(r => r.done).length

//   if (!planId) return (
//     <div className="flex flex-col items-center justify-center min-h-screen gap-3">
//       <p className="text-sm text-muted-foreground">No project selected.</p>
//       <a href="/dashboard" className="text-xs text-emerald underline">Go to Dashboard and select a project</a>
//     </div>
//   )

//   if (loading) return (
//     <div className="flex items-center justify-center min-h-screen">
//       <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
//     </div>
//   )

//   if (error) return (
//     <div className="flex items-center justify-center min-h-screen">
//       <p className="text-destructive text-sm">{error}</p>
//     </div>
//   )

//   return (
//     <div className="flex flex-col gap-6 p-6 min-h-screen bg-background">

      

//       {/* ── Progress bar ───────────────────────────────────────────────── */}
//       {doneCount > 0 && (
//         <div className="flex items-center gap-4 p-4 bg-emerald/5 border border-emerald/20 rounded-xl">
//           <CheckCheck className="h-5 w-5 text-emerald shrink-0" />
//           <div className="flex-1">
//             <div className="flex justify-between text-xs mb-1.5">
//               <span className="font-semibold text-foreground">{doneCount} of {recs.length} completed</span>
//               <span className="font-mono text-muted-foreground">{Math.round((doneCount / recs.length) * 100)}%</span>
//             </div>
//             <div className="h-1.5 bg-muted rounded-full overflow-hidden">
//               <div className="h-full bg-emerald rounded-full transition-all duration-500"
//                 style={{ width: `${(doneCount / recs.length) * 100}%` }} />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ── Panel ──────────────────────────────────────────────────────── */}
//       <div className="bg-card border border-border rounded-xl overflow-hidden">

//         {/* Header + filters */}
//         <div className="px-5 pt-4 pb-3 border-b border-border">
//           <div className="flex items-center justify-between mb-3">
//             <h3 className="font-heading text-sm font-semibold text-foreground">Recommendations</h3>
//             <span className="text-xs text-muted-foreground font-mono">{visible.length} actions</span>
//           </div>
//           <div className="flex gap-2 flex-wrap">
//             {FILTER_LABELS.map(({ key, label }) => (
//               <button key={key} onClick={() => setFilter(key)}
//                 className={cn("px-3.5 py-1.5 rounded-full border text-xs font-semibold transition-colors",
//                   filter === key
//                     ? "bg-foreground text-background border-foreground"
//                     : "bg-transparent text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground")}>
//                 {label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Rows */}
//         {visible.length === 0 ? (
//           <div className="px-5 py-14 text-center text-sm text-muted-foreground">
//             {recs.length === 0 ? "No recommendations yet — run the pipeline first." : "No recommendations match this filter."}
//           </div>
//         ) : (
//           visible.map((r, idx) => (
//             <div key={r.id} className={cn("border-b border-border last:border-0 transition-colors", r.done && "opacity-50")}>

//               {/* Main row */}
//               <div className="grid grid-cols-[40px_1fr_auto] gap-4 px-5 py-5 cursor-pointer hover:bg-muted/30 transition-colors"
//                 onClick={() => toggleExpand(r.id)}>

//                 {/* Number */}
//                 <div className="font-heading text-2xl font-bold text-border leading-none pt-0.5 select-none">
//                   {String(idx + 1).padStart(2, "0")}
//                 </div>

//                 {/* Content */}
//                 <div className="min-w-0">
//                   <p className={cn("text-sm font-semibold text-foreground mb-1.5 leading-snug", r.done && "line-through text-muted-foreground")}>
//                     {r.summary || r.prompt}
//                   </p>
//                   <p className="text-xs text-emerald font-mono">{r.expected_impact || r.message}</p>
//                 </div>

//                 {/* Badges + toggle */}
//                 <div className="flex flex-col items-end gap-2 shrink-0">
//                   <div className="flex items-center gap-2">
//                     <PatternBadge pattern={r.pattern} />
//                     <PriorityBadge priority={r.priority} />
//                     <TimeBadge weeks={r.estimated_weeks ?? 4} />
//                   </div>
//                   <button onClick={e => { e.stopPropagation(); toggleDone(r.id) }}
//                     className={cn("text-[10px] font-bold px-2.5 py-1 rounded-full border transition-colors font-mono",
//                       r.done
//                         ? "bg-emerald/10 text-emerald border-emerald/20 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20"
//                         : "bg-muted text-muted-foreground border-border hover:bg-emerald/10 hover:text-emerald hover:border-emerald/20")}>
//                     {r.done ? "✓ Done" : "Mark done"}
//                   </button>
//                 </div>
//               </div>

//               {/* Expanded detail */}
//               {expanded === r.id && (
//                 <div className="px-5 pb-5 pt-0 grid grid-cols-[40px_1fr] gap-4">
//                   <div />
//                   <div className="space-y-3">
//                     <p className="text-sm text-muted-foreground leading-relaxed">{r.message}</p>

//                     {/* Actions list */}
//                     {Array.isArray(r.actions) && r.actions.length > 0 && (
//                       <div className="space-y-2">
//                         {r.actions.map((a, i) => (
//                           <div key={i} className="bg-muted border border-border rounded-lg px-4 py-3">
//                             <div className="flex items-center gap-2 mb-1">
//                               <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">{a.timeframe}</span>
//                               <span className="text-xs font-semibold text-foreground">{a.action}</span>
//                             </div>
//                             <p className="text-xs text-foreground/80 leading-relaxed">{a.detail}</p>
//                           </div>
//                         ))}
//                       </div>
//                     )}

//                     {r.top_competitor && (
//                       <p className="text-[11px] text-muted-foreground font-mono">
//                         Top competitor: <span className="text-foreground">{r.top_competitor}</span>
//                         {r.competitor_count > 1 && ` (+${r.competitor_count - 1} more)`}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   )
// }




"use client"

import { Suspense, useState, useEffect, useCallback } from "react"
import { supabaseBrowser } from "@/lib/supabaseClient"
import { usePlanId } from "@/hooks/usePlanId"
import { FileText, Plus, CheckCheck, Loader2, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

type Priority = "high" | "medium" | "low"
type Pattern  = "missed" | "losing" | "competing" | "winning"
type Filter   = "all" | "high" | "medium" | "low" | "content_creation" | "comparison_content" | "authority_building" | "protect_and_expand"

interface Action {
  timeframe: string
  action:    string
  detail:    string
}

interface Recommendation {
  id:              string
  prompt:          string
  type:            string
  pattern:         Pattern
  priority:        Priority
  summary:         string
  message:         string
  actions:         Action[]
  expected_impact: string
  estimated_weeks: number
  top_competitor:  string | null
  competitor_count:number
  rec_source:      string
  done:            boolean
}

function PriorityBadge({ priority }: { priority: Priority }) {
  const cls = {
    high:   "bg-destructive/10 text-destructive border-destructive/20",
    medium: "bg-amber/10 text-amber border-amber/20",
    low:    "bg-emerald/10 text-emerald border-emerald/20",
  }[priority]
  const label = { high: "High", medium: "Medium", low: "Low" }[priority]
  return (
    <span className={cn("text-[10px] font-bold px-2.5 py-1 rounded-full border font-mono whitespace-nowrap", cls)}>
      {label}
    </span>
  )
}

function PatternBadge({ pattern }: { pattern: Pattern }) {
  const cls = {
    missed:    "bg-destructive/10 text-destructive border-destructive/20",
    losing:    "bg-amber/10 text-amber border-amber/20",
    competing: "bg-violet/10 text-violet border-violet/20",
    winning:   "bg-emerald/10 text-emerald border-emerald/20",
  }[pattern] ?? "bg-muted text-muted-foreground border-border"
  return (
    <span className={cn("text-[10px] font-bold px-2.5 py-1 rounded-full border font-mono whitespace-nowrap capitalize", cls)}>
      {pattern}
    </span>
  )
}

function TimeBadge({ weeks }: { weeks: number }) {
  return (
    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-border bg-muted text-muted-foreground whitespace-nowrap">
      ~{weeks}w
    </span>
  )
}

const FILTER_LABELS: { key: Filter; label: string }[] = [
  { key: "all",                label: "All"              },
  { key: "high",               label: "High Priority"    },
  { key: "medium",             label: "Medium"           },
  { key: "low",                label: "Low"              },
  { key: "content_creation",   label: "Content"          },
  { key: "comparison_content", label: "Comparison"       },
  { key: "authority_building", label: "Authority"        },
  { key: "protect_and_expand", label: "Protect & Expand" },
]

function RecommendationsPageInner() {
  const planId = usePlanId()

  const [recs,     setRecs]     = useState<Recommendation[]>([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState("")
  const [filter,   setFilter]   = useState<Filter>("all")
  const [expanded, setExpanded] = useState<string | null>(null)
  const [totals,   setTotals]   = useState({ total: 0, high: 0, medium: 0, low: 0 })

  const load = useCallback(async () => {
    if (!planId) return
    setLoading(true)
    setError("")
    try {
      const { data: s } = await supabaseBrowser.auth.getSession()
      const token = s?.session?.access_token
      if (!token) { setError("Session expired"); return }

      const res  = await fetch(`${BACKEND_URL}/aeo/recommendations?planId=${planId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await res.json()
      if (!res.ok) { setError(json?.error ?? "Failed to load"); return }

      const rows = (json?.data?.recommendations ?? []).map((r: any) => ({ ...r, done: false }))
      setRecs(rows)
      setTotals({
        total:  json?.data?.total  ?? 0,
        high:   json?.data?.high   ?? 0,
        medium: json?.data?.medium ?? 0,
        low:    json?.data?.low    ?? 0,
      })
    } catch { setError("Network error") } finally { setLoading(false) }
  }, [planId])

  useEffect(() => { load() }, [load])

  const toggleDone   = (id: string) => setRecs(prev => prev.map(r => r.id === id ? { ...r, done: !r.done } : r))
  const toggleExpand = (id: string) => setExpanded(prev => prev === id ? null : id)

  const visible = filter === "all" ? recs
    : ["high","medium","low"].includes(filter) ? recs.filter(r => r.priority === filter)
    : recs.filter(r => r.type === filter)

  const doneCount = recs.filter(r => r.done).length

  if (!planId) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-3">
      <p className="text-sm text-muted-foreground">No project selected.</p>
      <a href="/dashboard" className="text-xs text-emerald underline">Go to Dashboard and select a project</a>
    </div>
  )

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  )

  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-destructive text-sm">{error}</p>
    </div>
  )

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen bg-background">

      {doneCount > 0 && (
        <div className="flex items-center gap-4 p-4 bg-emerald/5 border border-emerald/20 rounded-xl">
          <CheckCheck className="h-5 w-5 text-emerald shrink-0" />
          <div className="flex-1">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="font-semibold text-foreground">{doneCount} of {recs.length} completed</span>
              <span className="font-mono text-muted-foreground">{Math.round((doneCount / recs.length) * 100)}%</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-emerald rounded-full transition-all duration-500"
                style={{ width: `${(doneCount / recs.length) * 100}%` }} />
            </div>
          </div>
        </div>
      )}

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-5 pt-4 pb-3 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-heading text-sm font-semibold text-foreground">Recommendations</h3>
            <span className="text-xs text-muted-foreground font-mono">{visible.length} actions</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {FILTER_LABELS.map(({ key, label }) => (
              <button key={key} onClick={() => setFilter(key)}
                className={cn("px-3.5 py-1.5 rounded-full border text-xs font-semibold transition-colors",
                  filter === key
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground")}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="px-5 py-14 text-center text-sm text-muted-foreground">
            {recs.length === 0 ? "No recommendations yet — run the pipeline first." : "No recommendations match this filter."}
          </div>
        ) : (
          visible.map((r, idx) => (
            <div key={r.id} className={cn("border-b border-border last:border-0 transition-colors", r.done && "opacity-50")}>
              <div className="grid grid-cols-[40px_1fr_auto] gap-4 px-5 py-5 cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => toggleExpand(r.id)}>
                <div className="font-heading text-2xl font-bold text-border leading-none pt-0.5 select-none">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <div className="min-w-0">
                  <p className={cn("text-sm font-semibold text-foreground mb-1.5 leading-snug", r.done && "line-through text-muted-foreground")}>
                    {r.summary || r.prompt}
                  </p>
                  <p className="text-xs text-emerald font-mono">{r.expected_impact || r.message}</p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div className="flex items-center gap-2">
                    <PatternBadge pattern={r.pattern} />
                    <PriorityBadge priority={r.priority} />
                    <TimeBadge weeks={r.estimated_weeks ?? 4} />
                  </div>
                  <button onClick={e => { e.stopPropagation(); toggleDone(r.id) }}
                    className={cn("text-[10px] font-bold px-2.5 py-1 rounded-full border transition-colors font-mono",
                      r.done
                        ? "bg-emerald/10 text-emerald border-emerald/20 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20"
                        : "bg-muted text-muted-foreground border-border hover:bg-emerald/10 hover:text-emerald hover:border-emerald/20")}>
                    {r.done ? "✓ Done" : "Mark done"}
                  </button>
                </div>
              </div>

              {expanded === r.id && (
                <div className="px-5 pb-5 pt-0 grid grid-cols-[40px_1fr] gap-4">
                  <div />
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground leading-relaxed">{r.message}</p>
                    {Array.isArray(r.actions) && r.actions.length > 0 && (
                      <div className="space-y-2">
                        {r.actions.map((a, i) => (
                          <div key={i} className="bg-muted border border-border rounded-lg px-4 py-3">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">{a.timeframe}</span>
                              <span className="text-xs font-semibold text-foreground">{a.action}</span>
                            </div>
                            <p className="text-xs text-foreground/80 leading-relaxed">{a.detail}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {r.top_competitor && (
                      <p className="text-[11px] text-muted-foreground font-mono">
                        Top competitor: <span className="text-foreground">{r.top_competitor}</span>
                        {r.competitor_count > 1 && ` (+${r.competitor_count - 1} more)`}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default function RecommendationsPage() {
  return (
    <Suspense fallback={null}>
      <RecommendationsPageInner />
    </Suspense>
  )
}