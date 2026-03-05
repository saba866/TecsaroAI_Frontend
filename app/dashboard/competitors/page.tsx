




// "use client"

// import { useState, useEffect, useCallback } from "react"
// import { supabaseBrowser } from "@/lib/supabaseClient"
// import {
//   UserPlus, Lightbulb, CheckCircle2, Clock,
//   Trash2, Loader2, TrendingUp, TrendingDown, Minus,
//   ChevronDown, ChevronUp, Zap,
// } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { usePlanId } from "@/hooks/usePlanId"

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

// // ── Types ──────────────────────────────────────────────────────────────────
// interface EngineBreakdown {
//   engine:    string
//   wins:      number
//   losses:    number
//   shared:    number
//   total:     number
//   win_rate:  number
// }

// interface Competitor {
//   actual_mention_count: number
//   id:               string
//   name:             string
//   domain:           string
//   confidence_score: number
//   status:           string
//   times_seen:       number
//   wins:             number
//   losses:           number
//   shared:           number
//   total_answers:    number
//   win_rate:         number
//   loss_rate:        number
//   shared_rate:      number
//   engine_breakdown: EngineBreakdown[]
// }

// interface Summary { wins: number; losses: number; shared: number; total: number }

// interface CompetitorData {
//   competitors:      Competitor[]
//   suggestions:      Competitor[]
//   competitors_used: number
//   competitors_max:  number
//   summary:          Summary
// }

// interface PromptEngine {
//   engine:          string
//   outcome:         "win" | "shared"
//   brand_mentioned: boolean
//   comp_mentioned:  boolean
// }

// interface CompetitorPrompt {
//   prompt_id:       string
//   question:        string
//   engines:         PromptEngine[]
//   wins:            number
//   shared:          number
//   overall_outcome: "win" | "shared" | "mixed"
// }

// // ── Engine display config ─────────────────────────────────────────────────
// const ENGINE_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
//   chatgpt:    { label: "GPT-4o",     color: "text-emerald",  bg: "bg-emerald/10 border-emerald/20"   },
//   gemini:     { label: "Gemini",     color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
//   perplexity: { label: "Perplexity", color: "text-violet",   bg: "bg-violet/10 border-violet/20"     },
// }

// const OUTCOME_CONFIG = {
//   win:    { label: "Competitor wins",  color: "text-destructive", bg: "bg-destructive/10 border-destructive/20", icon: TrendingDown },
//   shared: { label: "Both mentioned",  color: "text-amber",       bg: "bg-amber/10 border-amber/20",             icon: Minus        },
//   mixed:  { label: "Mixed",           color: "text-amber",       bg: "bg-amber/10 border-amber/20",             icon: Zap          },
// }

// // ── Sub-components ─────────────────────────────────────────────────────────
// function WLSBadge({ wins, losses, shared, total_answers }: Pick<Competitor, "wins"|"losses"|"shared"|"total_answers">) {
//   if (total_answers === 0) return <span className="text-xs text-muted-foreground font-mono">No data</span>
//   const neither = total_answers - wins - losses - shared
//   return (
//     <div className="flex items-center gap-1 justify-center flex-wrap">
//       <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald/10 text-emerald border border-emerald/20 text-[10px] font-bold font-mono">
//         <TrendingUp className="h-2.5 w-2.5"/>{wins}W
//       </span>
//       <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-destructive/10 text-destructive border border-destructive/20 text-[10px] font-bold font-mono">
//         <TrendingDown className="h-2.5 w-2.5"/>{losses}L
//       </span>
//       <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber/10 text-amber border border-amber/20 text-[10px] font-bold font-mono">
//         <Minus className="h-2.5 w-2.5"/>{shared}S
//       </span>
//       {neither > 0 && (
//         <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 text-white/30 border border-white/10 text-[10px] font-bold font-mono">
//           {neither}N
//         </span>
//       )}
//     </div>
//   )
// }

// function WinRateBar({ win_rate, loss_rate, shared_rate }: { win_rate: number; loss_rate: number; shared_rate: number }) {
//   if (win_rate === 0 && loss_rate === 0 && shared_rate === 0)
//     return <span className="text-xs text-muted-foreground font-mono">—</span>
//   const color = win_rate >= 60 ? "text-emerald" : win_rate >= 30 ? "text-amber" : "text-destructive"
//   const bar   = win_rate >= 60 ? "bg-emerald"   : win_rate >= 30 ? "bg-amber"   : "bg-destructive"
//   return (
//     <div className="min-w-[60px]">
//       <p className={cn("text-sm font-bold font-mono", color)}>{win_rate}%</p>
//       <div className="mt-1 h-1.5 w-16 bg-muted rounded-full overflow-hidden flex">
//         <div className={cn("h-full", bar)} style={{ width: `${win_rate}%` }}/>
//         <div className="h-full bg-amber/50"  style={{ width: `${shared_rate}%` }}/>
//       </div>
//       <p className="text-[9px] text-muted-foreground font-mono mt-0.5">win rate</p>
//     </div>
//   )
// }

// function EngineRow({ breakdown }: { breakdown: EngineBreakdown[] }) {
//   if (!breakdown?.length) return null
//   return (
//     <div className="flex flex-col gap-1 mt-2">
//       {breakdown.map(e => {
//         const cfg   = ENGINE_CONFIG[e.engine] ?? { label: e.engine, color: "text-muted-foreground", bg: "bg-muted border-border" }
//         const total = e.total || 1
//         return (
//           <div key={e.engine} className="flex items-center gap-2">
//             <span className={`inline-flex px-1.5 py-0.5 rounded text-[9px] font-bold font-mono border ${cfg.bg} ${cfg.color} w-16 justify-center shrink-0`}>
//               {cfg.label}
//             </span>
//             <div className="flex items-center gap-1">
//               <span className="text-[10px] font-mono text-emerald font-bold">{e.wins}W</span>
//               <span className="text-[10px] font-mono text-destructive font-bold">{e.losses}L</span>
//               <span className="text-[10px] font-mono text-amber font-bold">{e.shared}S</span>
//             </div>
//             <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden flex max-w-[60px]">
//               <div className="h-full bg-emerald"     style={{ width: `${Math.round((e.wins   / total) * 100)}%` }}/>
//               <div className="h-full bg-amber/60"    style={{ width: `${Math.round((e.shared / total) * 100)}%` }}/>
//               <div className="h-full bg-destructive" style={{ width: `${Math.round((e.losses / total) * 100)}%` }}/>
//             </div>
//             <span className={`text-[10px] font-mono font-bold ${cfg.color}`}>{e.win_rate}%</span>
//           </div>
//         )
//       })}
//     </div>
//   )
// }

// function StatusPill({ status }: { status: string }) {
//   if (status === "active")
//     return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald/10 text-emerald border border-emerald/20 text-[11px] font-bold font-mono whitespace-nowrap"><CheckCircle2 className="h-3 w-3"/>Confirmed</span>
//   return   <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber/10 text-amber border border-amber/20 text-[11px] font-bold font-mono whitespace-nowrap"><Clock className="h-3 w-3"/>Pending</span>
// }

// // ── Prompt wins panel ──────────────────────────────────────────────────────
// function CompetitorPromptPanel({
//   competitorName, planId, token,
// }: {
//   competitorName: string
//   planId: string
//   token: string
// }) {
//   const [prompts,  setPrompts]  = useState<CompetitorPrompt[]>([])
//   const [loading,  setLoading]  = useState(true)
//   const [error,    setError]    = useState("")

//   useEffect(() => {
//     const load = async () => {
//       setLoading(true); setError("")
//       try {
//         const encoded = encodeURIComponent(competitorName)
//         const res  = await fetch(
//           `${BACKEND_URL}/aeo/competitors/${encoded}/prompts?planId=${planId}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         )
//         const json = await res.json()
//         if (!res.ok) { setError(json?.error ?? "Failed to load"); return }
//         setPrompts(json?.data?.prompts ?? [])
//       } catch { setError("Network error") } finally { setLoading(false) }
//     }
//     load()
//   }, [competitorName, planId, token])

//   if (loading) return (
//     <div className="flex items-center gap-2 px-5 py-4 bg-muted/30 border-t border-border">
//       <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground"/>
//       <span className="text-xs text-muted-foreground font-mono">Loading prompts…</span>
//     </div>
//   )

//   if (error) return (
//     <div className="px-5 py-4 bg-muted/30 border-t border-border">
//       <p className="text-xs text-destructive">{error}</p>
//     </div>
//   )

//   if (prompts.length === 0) return (
//     <div className="px-5 py-4 bg-muted/30 border-t border-border">
//       <p className="text-xs text-muted-foreground font-mono">
//         {competitorName} hasn't outranked your brand in any tracked prompts yet.
//       </p>
//     </div>
//   )

//   return (
//     <div className="border-t border-border bg-muted/20">
//       {/* Panel header */}
//       <div className="flex items-center justify-between px-5 py-3 border-b border-border/50">
//         <p className="text-[11px] font-mono font-semibold text-foreground">
//           Prompts where <span className="text-destructive">{competitorName}</span> appears
//         </p>
//         <span className="text-[10px] font-mono text-muted-foreground">
//           {prompts.length} prompt{prompts.length !== 1 ? "s" : ""}
//         </span>
//       </div>

//       {/* Prompt rows */}
//       {prompts.map((p, i) => {
//         const cfg = OUTCOME_CONFIG[p.overall_outcome] ?? OUTCOME_CONFIG.mixed
//         const Icon = cfg.icon
//         return (
//           <div
//             key={p.prompt_id}
//             className={cn(
//               "flex items-start gap-4 px-5 py-3.5 border-b border-border/40 last:border-0",
//               i % 2 === 0 ? "bg-transparent" : "bg-muted/10"
//             )}
//           >
//             {/* Outcome badge */}
//             <div className={cn(
//               "inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-bold font-mono shrink-0 mt-0.5",
//               cfg.bg, cfg.color
//             )}>
//               <Icon className="h-2.5 w-2.5"/>
//               {p.overall_outcome === "win" ? "Wins" : p.overall_outcome === "shared" ? "Shared" : "Mixed"}
//             </div>

//             {/* Prompt text */}
//             <p className="flex-1 text-xs text-foreground/80 leading-relaxed">
//               {p.question}
//             </p>

//             {/* Engine pills */}
//             <div className="flex items-center gap-1 shrink-0 flex-wrap justify-end">
//               {p.engines.map((e, ei) => {
//                 const ecfg    = ENGINE_CONFIG[e.engine] ?? { label: e.engine, color: "text-muted-foreground", bg: "bg-muted border-border" }
//                 const outcome = e.outcome === "win" ? "bg-destructive/10 text-destructive border-destructive/20" : "bg-amber/10 text-amber border-amber/20"
//                 return (
//                   <span
//                     key={ei}
//                     className={cn("text-[9px] font-bold font-mono px-1.5 py-0.5 rounded border", outcome)}
//                     title={e.outcome === "win" ? `${ecfg.label}: competitor wins` : `${ecfg.label}: both mentioned`}
//                   >
//                     {ecfg.label}
//                   </span>
//                 )
//               })}
//             </div>
//           </div>
//         )
//       })}
//     </div>
//   )
// }

// // ── Add manually modal ─────────────────────────────────────────────────────
// function AddManuallyModal({ planId, token, onAdded, onClose }: {
//   planId: string; token: string; onAdded: () => void; onClose: () => void
// }) {
//   const [domain,  setDomain]  = useState("")
//   const [loading, setLoading] = useState(false)
//   const [error,   setError]   = useState("")

//   const handleAdd = async () => {
//     if (!domain.trim()) return
//     setLoading(true); setError("")
//     try {
//       const res  = await fetch(`${BACKEND_URL}/aeo/competitors/add`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ planId, domain: domain.trim() }),
//       })
//       const json = await res.json()
//       if (!res.ok) { setError(json?.error ?? "Failed to add"); return }
//       onAdded(); onClose()
//     } catch { setError("Network error") } finally { setLoading(false) }
//   }

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
//       <div className="bg-card border border-border rounded-xl p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
//         <h3 className="font-heading text-sm font-semibold text-foreground mb-4">Add Competitor</h3>
//         <input
//           value={domain} onChange={e => setDomain(e.target.value)}
//           onKeyDown={e => e.key === "Enter" && handleAdd()}
//           placeholder="e.g. competitor.com"
//           className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald/30 mb-3"
//         />
//         {error && <p className="text-xs text-destructive mb-3">{error}</p>}
//         <div className="flex gap-2">
//           <button onClick={onClose} className="flex-1 py-2 rounded-lg border border-border text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors">Cancel</button>
//           <button onClick={handleAdd} disabled={loading || !domain.trim()} className="flex-1 py-2 rounded-lg bg-emerald text-white text-xs font-semibold disabled:opacity-50">
//             {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin mx-auto"/> : "Add"}
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// // ── Page ───────────────────────────────────────────────────────────────────
// export default function CompetitorsPage() {
//   const planId = usePlanId()

//   const [data,          setData]          = useState<CompetitorData | null>(null)
//   const [loading,       setLoading]       = useState(true)
//   const [error,         setError]         = useState("")
//   const [token,         setToken]         = useState("")
//   const [showModal,     setShowModal]     = useState(false)
//   const [bannerDismiss, setBannerDismiss] = useState(false)
//   const [actionLoading, setActionLoading] = useState<string | null>(null)

//   // Which competitor row has the prompt panel open
//   const [expandedId, setExpandedId] = useState<string | null>(null)

//   const getToken = async () => {
//     const { data: s } = await supabaseBrowser.auth.getSession()
//     return s?.session?.access_token ?? ""
//   }

//   const load = useCallback(async () => {
//     if (planId === null) return
//     setLoading(true); setError("")
//     try {
//       const t = await getToken()
//       setToken(t)
//       const res  = await fetch(`${BACKEND_URL}/aeo/competitors/${planId}`, {
//         headers: { Authorization: `Bearer ${t}` },
//       })
//       const json = await res.json()
//       if (!res.ok) { setError(json?.error ?? "Failed to load"); return }
//       setData(json?.data ?? json)
//     } catch { setError("Network error") } finally { setLoading(false) }
//   }, [planId])

//   useEffect(() => { load() }, [load])

//   const handleAccept = async (id: string) => {
//     setActionLoading(id)
//     try {
//       await fetch(`${BACKEND_URL}/aeo/competitors/${id}/accept`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ planId }),
//       })
//       await load()
//     } finally { setActionLoading(null) }
//   }

//   const handleIgnore = async (id: string) => {
//     setActionLoading(id)
//     try {
//       await fetch(`${BACKEND_URL}/aeo/competitors/${id}/ignore`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ planId }),
//       })
//       await load()
//     } finally { setActionLoading(null) }
//   }

//   const handleRemove = async (id: string) => {
//     setActionLoading(id)
//     try {
//       await fetch(`${BACKEND_URL}/aeo/competitors/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       if (expandedId === id) setExpandedId(null)
//       await load()
//     } finally { setActionLoading(null) }
//   }

//   const toggleExpand = (id: string) => {
//     setExpandedId(prev => prev === id ? null : id)
//   }

//   if (!planId) return (
//     <div className="flex flex-col items-center justify-center min-h-screen gap-3">
//       <p className="text-sm text-muted-foreground">No project selected.</p>
//       <a href="/dashboard" className="text-xs text-emerald underline">Go to Dashboard</a>
//     </div>
//   )

//   if (loading) return <div className="flex items-center justify-center min-h-screen"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground"/></div>
//   if (error)   return <div className="flex items-center justify-center min-h-screen"><p className="text-destructive text-sm">{error}</p></div>

//   const confirmed   = data?.competitors ?? []
//   const suggestions = data?.suggestions ?? []
//   const summary     = data?.summary     ?? { wins: 0, losses: 0, shared: 0, total: 0 }

//   const renderCompetitorRow = (c: Competitor, isSuggestion = false) => {
//     const isExpanded = expandedId === c.id
//     const rowBg      = isSuggestion ? "bg-amber/[0.03] hover:bg-amber/[0.06]" : "hover:bg-muted/30"

//     return (
//       <div key={c.id} className={cn("border-b border-border last:border-0 transition-colors", isExpanded ? "bg-muted/10" : "")}>
//         {/* Main row */}
//         <div className={cn("grid grid-cols-[1fr_180px_110px_160px_120px_140px] px-5 py-4 transition-colors items-start", rowBg)}>

//           {/* Competitor name + meta */}
//           <div className="flex items-start gap-3 min-w-0">
//             <div className={cn(
//               "w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 border mt-0.5",
//               isSuggestion ? "bg-amber/10 text-amber border-amber/20" : "bg-muted text-foreground border-border"
//             )}>
//               {c.name.charAt(0).toUpperCase()}
//             </div>
//             <div className="min-w-0">
//               <div className="flex items-center gap-2">
//                 <p className="text-sm font-semibold text-foreground">{c.name}</p>
//                 {isSuggestion && (
//                   <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber/10 text-amber border border-amber/20 font-mono uppercase">New</span>
//                 )}
//               </div>
//               <p className="text-[11px] text-muted-foreground font-mono truncate">{c.domain}</p>
//               {c.actual_mention_count > 0
//                 ? <p className="text-[10px] text-muted-foreground">Mentioned in {c.actual_mention_count} of {c.total_answers} answers</p>
//                 : <p className="text-[10px] text-muted-foreground">Not yet mentioned</p>
//               }
//             </div>
//           </div>

//           <div className="flex justify-center pt-1">
//             <WLSBadge wins={c.wins} losses={c.losses} shared={c.shared} total_answers={c.total_answers}/>
//           </div>

//           <div className="flex justify-center pt-1">
//             <WinRateBar win_rate={c.win_rate} loss_rate={c.loss_rate} shared_rate={c.shared_rate}/>
//           </div>

//           <div className="flex justify-start pt-1 px-2">
//             <EngineRow breakdown={c.engine_breakdown ?? []}/>
//           </div>

//           <div className="flex justify-center pt-1">
//             <StatusPill status={isSuggestion ? "pending_approval" : c.status}/>
//           </div>

//           {/* Actions */}
//           <div className="flex items-center justify-center gap-1.5 pt-1 flex-wrap">
//             {isSuggestion ? (
//               <>
//                 <button onClick={() => handleAccept(c.id)} disabled={actionLoading === c.id}
//                   className="px-2.5 py-1.5 rounded-lg bg-emerald/10 text-emerald border border-emerald/20 text-[11px] font-bold hover:bg-emerald/20 transition-colors disabled:opacity-40">
//                   {actionLoading === c.id ? <Loader2 className="h-3 w-3 animate-spin"/> : "Accept"}
//                 </button>
//                 <button onClick={() => handleIgnore(c.id)} disabled={actionLoading === c.id}
//                   className="px-2.5 py-1.5 rounded-lg bg-destructive/10 text-destructive border border-destructive/20 text-[11px] font-bold hover:bg-destructive/20 transition-colors disabled:opacity-40">
//                   Ignore
//                 </button>
//               </>
//             ) : (
//               <>
//                 {/* Prompt wins toggle */}
//                 <button
//                   onClick={() => toggleExpand(c.id)}
//                   className={cn(
//                     "inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-[11px] font-bold transition-colors",
//                     isExpanded
//                       ? "bg-destructive/10 text-destructive border-destructive/20"
//                       : "bg-muted border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
//                   )}
//                   title="Show prompts this competitor wins"
//                 >
//                   {isExpanded ? <ChevronUp className="h-3 w-3"/> : <ChevronDown className="h-3 w-3"/>}
//                   Prompts
//                 </button>

//                 <button onClick={() => handleRemove(c.id)} disabled={actionLoading === c.id}
//                   className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border bg-card text-[11px] font-semibold text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-colors disabled:opacity-40">
//                   {actionLoading === c.id ? <Loader2 className="h-3 w-3 animate-spin"/> : <><Trash2 className="h-3 w-3"/>Remove</>}
//                 </button>
//               </>
//             )}
//           </div>
//         </div>

//         {/* Expandable prompt panel — only for confirmed competitors */}
//         {!isSuggestion && isExpanded && planId && token && (
//           <CompetitorPromptPanel
//             competitorName={c.name}
//             planId={planId}
//             token={token}
//           />
//         )}
//       </div>
//     )
//   }

//   return (
//     <div className="flex flex-col gap-6 p-6 min-h-screen bg-background">

//       {/* Header */}
//       <div className="flex items-start justify-between flex-wrap gap-3">
//         <div>
//           <h1 className="text-xl font-heading font-bold text-foreground tracking-tight">Competitors</h1>
//           <p className="text-xs text-muted-foreground font-mono mt-0.5">
//             {confirmed.length} confirmed · {suggestions.length} pending review
//           </p>
//         </div>
//       </div>

//       {/* Summary cards */}
//       {summary.total > 0 && (
//         <div className="grid grid-cols-3 gap-4">
//           <div className="bg-card border border-emerald/20 rounded-xl p-4 text-center">
//             <div className="flex items-center justify-center gap-1.5 mb-1">
//               <TrendingUp className="h-3.5 w-3.5 text-emerald"/>
//               <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Wins</p>
//             </div>
//             <p className="font-heading text-3xl font-bold text-emerald">{summary.wins}</p>
//             <p className="text-[10px] text-muted-foreground font-mono mt-1">Brand only mentioned</p>
//           </div>
//           <div className="bg-card border border-amber/20 rounded-xl p-4 text-center">
//             <div className="flex items-center justify-center gap-1.5 mb-1">
//               <Minus className="h-3.5 w-3.5 text-amber"/>
//               <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Shared</p>
//             </div>
//             <p className="font-heading text-3xl font-bold text-amber">{summary.shared}</p>
//             <p className="text-[10px] text-muted-foreground font-mono mt-1">Both mentioned</p>
//           </div>
//           <div className="bg-card border border-destructive/20 rounded-xl p-4 text-center">
//             <div className="flex items-center justify-center gap-1.5 mb-1">
//               <TrendingDown className="h-3.5 w-3.5 text-destructive"/>
//               <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Losses</p>
//             </div>
//             <p className="font-heading text-3xl font-bold text-destructive">{summary.losses}</p>
//             <p className="text-[10px] text-muted-foreground font-mono mt-1">Competitor only mentioned</p>
//           </div>
//         </div>
//       )}

//       {/* Suggestion banner */}
//       {!bannerDismiss && suggestions.length > 0 && (
//         <div className="flex items-start gap-4 p-4 rounded-xl bg-amber/5 border border-amber/20">
//           <div className="w-9 h-9 rounded-xl bg-amber/10 border border-amber/20 flex items-center justify-center shrink-0">
//             <Lightbulb className="h-4 w-4 text-amber"/>
//           </div>
//           <div className="flex-1 min-w-0">
//             <p className="text-sm font-semibold text-foreground mb-0.5">
//               {suggestions.length} new competitor{suggestions.length !== 1 ? "s" : ""} discovered in your last AI scan
//             </p>
//             <p className="text-xs text-muted-foreground leading-relaxed">
//               {suggestions.map(c => c.name).join(", ")} appeared in AI answers.
//             </p>
//           </div>
//           <div className="flex items-center gap-2 shrink-0">
//             <button onClick={() => setBannerDismiss(true)} className="px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-semibold text-foreground hover:bg-muted transition-colors">Dismiss</button>
//             <button
//               onClick={async () => { setBannerDismiss(true); for (const s of suggestions) await handleAccept(s.id) }}
//               className="px-3 py-1.5 rounded-lg bg-emerald text-white text-xs font-semibold hover:bg-emerald-dark transition-colors"
//             >Add All</button>
//           </div>
//         </div>
//       )}

//       {/* Table */}
//       <div className="bg-card border border-border rounded-xl overflow-hidden">
//         <div className="flex items-center justify-between px-5 py-4 border-b border-border">
//           <div>
//             <h3 className="font-heading text-sm font-semibold text-foreground">Competitor Tracking</h3>
//             <p className="text-xs text-muted-foreground font-mono mt-0.5">{confirmed.length}/{data?.competitors_max ?? 10} slots used</p>
//           </div>
//           <button onClick={() => setShowModal(true)}
//             className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-semibold text-foreground hover:bg-muted transition-colors">
//             <UserPlus className="h-3.5 w-3.5"/> Add Manually
//           </button>
//         </div>

//         {/* Column headers */}
//         <div className="grid grid-cols-[1fr_180px_110px_160px_120px_140px] px-5 py-2.5 bg-muted/50 border-b border-border">
//           {["Competitor", "Win / Loss / Shared", "Win Rate", "By Engine", "Status", "Actions"].map((h, i) => (
//             <div key={h} className={cn("text-[10px] font-mono tracking-wider uppercase text-muted-foreground", i > 0 ? "text-center" : "")}>{h}</div>
//           ))}
//         </div>

//         {confirmed.map(c => renderCompetitorRow(c, false))}
//         {suggestions.map(c => renderCompetitorRow(c, true))}

//         {confirmed.length === 0 && suggestions.length === 0 && (
//           <div className="px-5 py-16 text-center">
//             <p className="text-sm text-muted-foreground mb-4">No competitors tracked yet.</p>
//             <button onClick={() => setShowModal(true)}
//               className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald text-white text-sm font-semibold hover:bg-emerald-dark transition-colors">
//               <UserPlus className="h-4 w-4"/> Add your first competitor
//             </button>
//           </div>
//         )}
//       </div>

//       {showModal && planId && token && (
//         <AddManuallyModal planId={planId} token={token} onAdded={load} onClose={() => setShowModal(false)}/>
//       )}
//     </div>
//   )
// }


import { Suspense } from "react"
import CompetitorsClient from "./CompetitorsClient"

export default function Page() {
  return (
    <Suspense fallback={<div style={{padding:20}}>Loading...</div>}>
      <CompetitorsClient />
    </Suspense>
  )
}