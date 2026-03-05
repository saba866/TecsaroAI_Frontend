



// "use client"

// import { useState, useEffect, useCallback } from "react"
// import { useSearchParams } from "next/navigation"
// import { supabaseBrowser } from "@/lib/supabaseClient"
// import { FileText, Lock, CheckCircle2, XCircle, Star, Zap, ChevronRight, Loader2 } from "lucide-react"
// import { cn } from "@/lib/utils"

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

// type Filter  = "all" | "win" | "shared" | "missed"
// type EngineResult = { mentioned: boolean; position: number | null }

// interface PromptRow {
//   id:       string
//   question: string
//   intent:   string
//   engines:  Record<string, EngineResult>
//   status:   "win" | "shared" | "missed"
// }

// interface EngineStats {
//   total:     number
//   mentioned: number
// }

// interface VisibilityData {
//   plan:        { name: string; domain: string }
//   prompts:     PromptRow[]
//   engineStats: Record<string, EngineStats>
//   totals:      { win: number; shared: number; missed: number }
// }

// function MentionCell({ result }: { result?: EngineResult }) {
//   if (!result) return <span className="text-muted-foreground text-xs mx-auto block text-center">—</span>
//   return result.mentioned
//     ? <CheckCircle2 className="h-4 w-4 text-emerald mx-auto" />
//     : <XCircle className="h-4 w-4 text-destructive mx-auto" />
// }

// function StatusPill({ status }: { status: "win" | "shared" | "missed" }) {
//   if (status === "win")
//     return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald/10 text-emerald border border-emerald/20 text-[11px] font-bold font-mono whitespace-nowrap"><Star className="h-3 w-3" /> Win</span>
//   if (status === "shared")
//     return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber/10 text-amber border border-amber/20 text-[11px] font-bold font-mono whitespace-nowrap"><Zap className="h-3 w-3" /> Shared</span>
//   return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-destructive/10 text-destructive border border-destructive/20 text-[11px] font-bold font-mono whitespace-nowrap"><XCircle className="h-3 w-3" /> Missed</span>
// }

// export default function VisibilityPage() {
//   const searchParams = useSearchParams()
//   const [filter,   setFilter]   = useState<Filter>("all")
//   const [data,     setData]     = useState<VisibilityData | null>(null)
//   const [loading,  setLoading]  = useState(true)
//   const [error,    setError]    = useState("")

//   const planId = searchParams.get("plan")
//     ?? (typeof window !== "undefined" ? localStorage.getItem("activeProjectId") : null)

//   const load = useCallback(async () => {
//     if (!planId) { setError("No project selected"); setLoading(false); return }
//     setLoading(true)
//     try {
//       const { data: s } = await supabaseBrowser.auth.getSession()
//       const token = s?.session?.access_token
//       if (!token) { setError("Session expired"); setLoading(false); return }

//       const res  = await fetch(`${BACKEND_URL}/aeo/visibility?planId=${planId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       const json = await res.json()
//       setData(json?.data ?? null)
//     } catch (err) {
//       setError("Failed to load visibility data")
//     } finally {
//       setLoading(false)
//     }
//   }, [planId])

//   useEffect(() => { load() }, [load])

//   const prompts = data?.prompts ?? []
//   const visible = filter === "all" ? prompts : prompts.filter(p => p.status === filter)
//   const engines = data?.engineStats ? Object.keys(data.engineStats) : ["chatgpt", "gemini"]
//   const totals  = data?.totals ?? { win: 0, shared: 0, missed: 0 }
//   const total   = prompts.length

//   const FILTER_LABELS: Record<Filter, string> = {
//     all:    `All Prompts (${total})`,
//     win:    `Wins (${totals.win})`,
//     shared: `Shared (${totals.shared})`,
//     missed: `Missed (${totals.missed})`,
//   }

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

//       {/* Topbar */}
//       <div className="flex items-start justify-between flex-wrap gap-3">
//         <div>
//           <h1 className="text-xl font-heading font-bold text-foreground tracking-tight">Visibility Tracking</h1>
//           <p className="text-xs text-muted-foreground font-mono mt-0.5">
//             {data?.plan?.domain} · {total} prompts · {engines.length} models active
//           </p>
//         </div>
//         {/* <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-semibold text-foreground hover:bg-muted transition-colors">
//           <FileText className="h-3.5 w-3.5" /> Export PDF
//         </button> */}
//       </div>

//       {/* Engine Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         {["chatgpt", "gemini"].map((engine) => {
//           const stats  = data?.engineStats?.[engine]
//           const count  = stats?.mentioned ?? 0
//           const ttl    = stats?.total ?? 0
//           const pct    = ttl > 0 ? Math.round((count / ttl) * 100) : 0
//           const colors: Record<string, string> = { chatgpt: "#10a37f", gemini: "#4285F4" }
//           const labels: Record<string, string> = { chatgpt: "ChatGPT (GPT-4o)", gemini: "Gemini" }
//           return (
//             <div key={engine} className="bg-card border border-border rounded-xl overflow-hidden">
//               <div className="h-0.5" style={{ backgroundColor: colors[engine] }} />
//               <div className="p-5">
//                 <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-3">{labels[engine]}</p>
//                 <p className="font-heading text-4xl font-bold text-foreground leading-none mb-1">
//                   {count}<span className="text-xl text-muted-foreground font-normal">/{ttl}</span>
//                 </p>
//                 <p className="text-xs text-muted-foreground mt-1">{pct}% brand presence</p>
//               </div>
//             </div>
//           )
//         })}

//         {/* Perplexity locked */}
//         <div className="bg-card border border-border rounded-xl overflow-hidden opacity-70">
//           <div className="h-0.5 bg-[#20808D]" />
//           <div className="p-5 flex flex-col items-center justify-center text-center gap-2">
//             <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center">
//               <Lock className="h-4 w-4 text-muted-foreground" />
//             </div>
//             <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Perplexity</p>
//             <p className="text-xs text-muted-foreground leading-relaxed">Upgrade to Pro to track Perplexity</p>
//             <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-violet text-white text-xs font-semibold hover:opacity-90 transition-opacity">
//               Upgrade <ChevronRight className="h-3 w-3" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Filter Chips */}
//       <div className="flex gap-2 flex-wrap">
//         {(Object.keys(FILTER_LABELS) as Filter[]).map((f) => (
//           <button key={f} onClick={() => setFilter(f)}
//             className={cn("px-4 py-1.5 rounded-full border text-xs font-semibold transition-colors",
//               filter === f
//                 ? "bg-foreground text-background border-foreground"
//                 : "bg-card text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground")}>
//             {FILTER_LABELS[f]}
//           </button>
//         ))}
//       </div>

//       {/* Prompt Table */}
//       <div className="bg-card border border-border rounded-xl overflow-hidden">
//         <div className="flex items-center justify-between px-5 py-4 border-b border-border">
//           <h3 className="font-heading text-sm font-semibold text-foreground">Prompt-Level Visibility</h3>
//           <span className="text-xs text-muted-foreground font-mono">{visible.length} prompts tracked</span>
//         </div>

//         <div className="grid grid-cols-[1fr_72px_72px_100px] px-5 py-2.5 bg-muted/50 border-b border-border">
//           {["Prompt", "Gemini", "GPT-4o", "Status"].map((h, i) => (
//             <div key={h} className={cn("text-[10px] font-mono tracking-wider uppercase text-muted-foreground", i > 0 ? "text-center" : "")}>{h}</div>
//           ))}
//         </div>

//         {visible.length === 0 ? (
//           <div className="px-5 py-10 text-center text-sm text-muted-foreground">
//             {total === 0 ? "No visibility data yet — run a visibility check first." : "No prompts match this filter."}
//           </div>
//         ) : (
//           visible.map((p) => (
//             <div key={p.id}
//               className={cn("grid grid-cols-[1fr_72px_72px_100px] px-5 py-4 border-b border-border last:border-0 hover:bg-muted/30 transition-colors",
//                 p.status === "win"    && "bg-emerald/[0.02]",
//                 p.status === "missed" && "bg-destructive/[0.02]")}>
//               <div className="min-w-0 pr-4">
//                 <p className="text-sm font-medium text-foreground leading-snug mb-1 line-clamp-2">{p.question}</p>
//                 <span className="text-[11px] text-muted-foreground font-mono">{p.intent}</span>
//               </div>
//               <div className="flex items-center justify-center"><MentionCell result={p.engines["gemini"]} /></div>
//               <div className="flex items-center justify-center"><MentionCell result={p.engines["chatgpt"]} /></div>
//               <div className="flex items-center justify-center"><StatusPill status={p.status} /></div>
//             </div>
//           ))
//         )}

//         <div className="px-5 py-3 bg-violet/5 border-t border-violet/10 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <Lock className="h-3.5 w-3.5 text-violet" />
//             <span className="text-xs text-violet font-medium">Add Perplexity to see visibility across 3 AI models</span>
//           </div>
//           <button className="text-[10px] font-semibold text-violet hover:text-violet-light transition-colors">Upgrade to Pro →</button>
//         </div>
//       </div>
//     </div>
//   )
// }



"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { supabaseBrowser } from "@/lib/supabaseClient"
import { Lock, CheckCircle2, XCircle, Star, Zap, ChevronRight, Loader2, RefreshCw, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

// ── Types ──────────────────────────────────────────────────────────────────
type Filter       = "all" | "win" | "shared" | "missed"
interface EngineResult  { mentioned: boolean; position: number | null }
interface PromptRow     { id: string; question: string; intent: string; engines: Record<string, EngineResult>; status: "win" | "shared" | "missed" }
interface EngineStats   { total: number; mentioned: number }
interface VisibilityData {
  plan:        { name: string; domain: string }
  prompts:     PromptRow[]
  engineStats: Record<string, EngineStats>
  totals:      { win: number; shared: number; missed: number }
}

// ── Engine config ──────────────────────────────────────────────────────────
// Keys match EXACTLY what aeoVisibility.job.js writes to aeo_ai_answers.engine:
//   Starter: "chatgpt", "gemini"
//   Pro:     "chatgpt", "gemini", "perplexity"
const ENGINE_CONFIG: Record<string, { label: string; shortLabel: string; color: string; pro?: boolean }> = {
  chatgpt:    { label: "ChatGPT (GPT-4o)", shortLabel: "GPT-4o",     color: "#10a37f" },
  gemini:     { label: "Gemini",            shortLabel: "Gemini",     color: "#4285F4" },
  perplexity: { label: "Perplexity",        shortLabel: "Perplexity", color: "#20808D", pro: true },
}

// Display order
const ENGINE_ORDER = ["chatgpt", "gemini", "perplexity"]

// ── Sub-components ─────────────────────────────────────────────────────────
function MentionCell({ result }: { result?: EngineResult }) {
  if (!result) return <span className="text-muted-foreground text-xs block text-center">—</span>
  return result.mentioned
    ? <CheckCircle2 className="h-4 w-4 text-emerald mx-auto" />
    : <XCircle      className="h-4 w-4 text-destructive mx-auto" />
}

function StatusPill({ status }: { status: PromptRow["status"] }) {
  if (status === "win")
    return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald/10 text-emerald border border-emerald/20 text-[11px] font-bold font-mono whitespace-nowrap"><Star className="h-3 w-3" />Win</span>
  if (status === "shared")
    return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber/10 text-amber border border-amber/20 text-[11px] font-bold font-mono whitespace-nowrap"><Zap className="h-3 w-3" />Shared</span>
  return   <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-destructive/10 text-destructive border border-destructive/20 text-[11px] font-bold font-mono whitespace-nowrap"><XCircle className="h-3 w-3" />Missed</span>
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function VisibilityPage() {
  const searchParams = useSearchParams()
  const [filter,  setFilter]  = useState<Filter>("all")
  const [data,    setData]    = useState<VisibilityData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState<string | null>(null)

  const planId =
    searchParams.get("planId") ??
    searchParams.get("plan") ??
    (typeof window !== "undefined" ? localStorage.getItem("activeProjectId") : null)

  const load = useCallback(async () => {
    if (!planId) { setError("No project selected"); setLoading(false); return }
    setLoading(true); setError(null)
    try {
      const { data: s } = await supabaseBrowser.auth.getSession()
      const token = s?.session?.access_token
      if (!token) { setError("Session expired — sign in again"); setLoading(false); return }

      const res  = await fetch(`${BACKEND_URL}/aeo/visibility?planId=${planId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await res.json()
      if (!res.ok) { setError(json?.message ?? `Error ${res.status}`); setLoading(false); return }
      setData(json?.data ?? null)
    } catch (err: any) {
      setError(err?.message ?? "Network error")
    } finally {
      setLoading(false)
    }
  }, [planId])

  useEffect(() => { load() }, [load])

  // ── Derived ───────────────────────────────────────────────────────────────
  const prompts = data?.prompts ?? []
  const totals  = data?.totals  ?? { win: 0, shared: 0, missed: 0 }
  const total   = prompts.length
  const visible = filter === "all" ? prompts : prompts.filter(p => p.status === filter)

  // Which engines actually have data (from API response), sorted in display order
  const activeEngines = ENGINE_ORDER.filter(k => k in (data?.engineStats ?? {}))
  // Non-perplexity engines go in the table columns
  const tableEngines  = activeEngines.filter(k => k !== "perplexity")
  const hasPerpelxity = activeEngines.includes("perplexity")

  // Grid: prompt col + 72px per table engine + status col
  const gridCols = `1fr ${tableEngines.map(() => "72px").join(" ")} 100px`

  const FILTER_LABELS: Record<Filter, string> = {
    all:    `All (${total})`,
    win:    `Wins (${totals.win})`,
    shared: `Shared (${totals.shared})`,
    missed: `Missed (${totals.missed})`,
  }

  // ── Loading / Error ───────────────────────────────────────────────────────
  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-7 w-7 animate-spin text-muted-foreground" />
        <p className="text-xs text-muted-foreground font-mono">Loading visibility data…</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="bg-card border border-destructive/20 rounded-xl p-8 text-center max-w-sm w-full">
        <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-3" />
        <p className="text-sm font-semibold text-foreground mb-1">Could not load visibility data</p>
        <p className="text-xs text-muted-foreground mb-5">{error}</p>
        <button onClick={load} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald text-white text-sm font-semibold hover:bg-emerald/90 transition-colors">
          <RefreshCw className="h-3.5 w-3.5" /> Try again
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen bg-background">

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-heading font-bold text-foreground tracking-tight">Visibility Tracking</h1>
          <p className="text-xs text-muted-foreground font-mono mt-0.5">
            {data?.plan?.domain ?? "—"} · {total} prompts · {activeEngines.length || 2} models active
          </p>
        </div>
        <button onClick={load} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-semibold text-foreground hover:bg-muted transition-colors">
          <RefreshCw className="h-3.5 w-3.5" /> Refresh
        </button>
      </div>

      {/* Engine Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        {/* ChatGPT card */}
        {(() => {
          const key   = "chatgpt"
          const cfg   = ENGINE_CONFIG[key]
          const stats = data?.engineStats?.[key]
          const pct   = stats && stats.total > 0 ? Math.round((stats.mentioned / stats.total) * 100) : 0
          return (
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="h-0.5" style={{ backgroundColor: cfg.color }} />
              <div className="p-5">
                <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-3">{cfg.label}</p>
                <p className="font-heading text-4xl font-bold text-foreground leading-none mb-1">
                  {stats?.mentioned ?? "—"}
                  {stats && <span className="text-xl text-muted-foreground font-normal">/{stats.total}</span>}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{stats ? `${pct}% brand presence` : "No data yet"}</p>
              </div>
            </div>
          )
        })()}

        {/* Gemini card */}
        {(() => {
          const key   = "gemini"
          const cfg   = ENGINE_CONFIG[key]
          const stats = data?.engineStats?.[key]
          const pct   = stats && stats.total > 0 ? Math.round((stats.mentioned / stats.total) * 100) : 0
          return (
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="h-0.5" style={{ backgroundColor: cfg.color }} />
              <div className="p-5">
                <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-3">{cfg.label}</p>
                <p className="font-heading text-4xl font-bold text-foreground leading-none mb-1">
                  {stats?.mentioned ?? "—"}
                  {stats && <span className="text-xl text-muted-foreground font-normal">/{stats.total}</span>}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{stats ? `${pct}% brand presence` : "No data yet"}</p>
              </div>
            </div>
          )
        })()}

        {/* Perplexity — shows real data for Pro, locked card for Starter */}
        {hasPerpelxity ? (() => {
          const key   = "perplexity"
          const cfg   = ENGINE_CONFIG[key]
          const stats = data!.engineStats[key]
          const pct   = stats.total > 0 ? Math.round((stats.mentioned / stats.total) * 100) : 0
          return (
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="h-0.5" style={{ backgroundColor: cfg.color }} />
              <div className="p-5">
                <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-3">{cfg.label}</p>
                <p className="font-heading text-4xl font-bold text-foreground leading-none mb-1">
                  {stats.mentioned}<span className="text-xl text-muted-foreground font-normal">/{stats.total}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">{pct}% brand presence</p>
              </div>
            </div>
          )
        })() : (
          <div className="bg-card border border-border rounded-xl overflow-hidden opacity-70">
            <div className="h-0.5 bg-[#20808D]" />
            <div className="p-5 flex flex-col items-center justify-center text-center gap-2">
              <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center">
                <Lock className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Perplexity</p>
              <p className="text-xs text-muted-foreground leading-relaxed">Upgrade to Pro to track Perplexity</p>
              <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-violet text-white text-xs font-semibold hover:opacity-90 transition-opacity">
                Upgrade <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 flex-wrap">
        {(Object.keys(FILTER_LABELS) as Filter[]).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={cn("px-4 py-1.5 rounded-full border text-xs font-semibold transition-colors",
              filter === f
                ? "bg-foreground text-background border-foreground"
                : "bg-card text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground"
            )}>
            {FILTER_LABELS[f]}
          </button>
        ))}
      </div>

      {/* Prompt table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h3 className="font-heading text-sm font-semibold text-foreground">Prompt-Level Visibility</h3>
          <span className="text-xs text-muted-foreground font-mono">{visible.length} prompts</span>
        </div>

        {/* Column headers */}
        <div className="px-5 py-2.5 bg-muted/50 border-b border-border grid" style={{ gridTemplateColumns: gridCols }}>
          <div className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground">Prompt</div>
          {tableEngines.length > 0
            ? tableEngines.map(k => (
                <div key={k} className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground text-center">
                  {ENGINE_CONFIG[k]?.shortLabel ?? k}
                </div>
              ))
            : <>
                <div className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground text-center">GPT-4o</div>
                <div className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground text-center">Gemini</div>
              </>
          }
          <div className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground text-center">Status</div>
        </div>

        {/* Rows */}
        {visible.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <p className="text-sm text-muted-foreground">
              {total === 0 ? "No visibility data yet — run a visibility check first" : "No prompts match this filter"}
            </p>
          </div>
        ) : visible.map(p => (
          <div key={p.id}
            className={cn(
              "px-5 py-4 border-b border-border last:border-0 hover:bg-muted/30 transition-colors grid",
              p.status === "win"    && "bg-emerald/[0.02]",
              p.status === "missed" && "bg-destructive/[0.02]",
            )}
            style={{ gridTemplateColumns: gridCols }}>

            <div className="min-w-0 pr-4">
              <p className="text-sm font-medium text-foreground leading-snug mb-1 line-clamp-2">{p.question}</p>
              <span className="text-[11px] text-muted-foreground font-mono">{p.intent}</span>
            </div>

            {/* Cells use exact engine key — "chatgpt" and "gemini" — matching what job stored */}
            {tableEngines.length > 0
              ? tableEngines.map(k => (
                  <div key={k} className="flex items-center justify-center">
                    <MentionCell result={p.engines[k]} />
                  </div>
                ))
              : <>
                  <div className="flex items-center justify-center"><MentionCell result={undefined} /></div>
                  <div className="flex items-center justify-center"><MentionCell result={undefined} /></div>
                </>
            }

            <div className="flex items-center justify-center">
              <StatusPill status={p.status} />
            </div>
          </div>
        ))}

        {/* Perplexity upsell — only shown on Starter */}
        {!hasPerpelxity && (
          <div className="px-5 py-3 bg-violet/5 border-t border-violet/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="h-3.5 w-3.5 text-violet" />
              <span className="text-xs text-violet font-medium">Upgrade to Pro to track Perplexity alongside ChatGPT & Gemini</span>
            </div>
            <button className="text-[10px] font-semibold text-violet hover:text-violet-light transition-colors">
              Upgrade to Pro →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}