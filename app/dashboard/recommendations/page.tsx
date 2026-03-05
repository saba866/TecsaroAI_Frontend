// "use client"

// import { useState } from "react"
// import { FileText, Plus, CheckCheck } from "lucide-react"
// import { cn } from "@/lib/utils"

// // ── Types ──────────────────────────────────────────────────────────────────
// type Difficulty = "Easy" | "Medium" | "Hard"
// type Category   = "all" | "easy" | "content" | "schema" | "technical"

// interface Recommendation {
//   id: number
//   title: string
//   impact: string
//   description: string
//   example: string
//   difficulty: Difficulty
//   timeToEffect: string
//   category: Category[]
//   done: boolean
// }

// // ── Data ───────────────────────────────────────────────────────────────────
// const initialRecs: Recommendation[] = [
//   {
//     id: 1,
//     title: 'Publish "Notion vs Microsoft 365" structured comparison page',
//     impact: "↑ Converts up to 4 missed AI answers — highest single-page ROI",
//     description:
//       "Microsoft 365 won 4 prompts where Notion was absent. A dedicated comparison page with explicit feature tables across calendar, email, AI, and PM formatted as FAQ blocks will directly contest these answers.",
//     example:
//       "Create /notion-vs-microsoft-365 with H2 headers matching exact query patterns. Include side-by-side tables for: meeting notes, email AI, calendar integration, project management, and enterprise search.",
//     difficulty: "Medium",
//     timeToEffect: "2–4 weeks",
//     category: ["content"],
//     done: false,
//   },
//   {
//     id: 2,
//     title: 'Create "Notion for Information Silos" problem-aware content',
//     impact: "↑ Captures uncontested prompt — zero competitors currently win this",
//     description:
//       "No brand appeared for the information silos prompt. Notion's wiki + Enterprise Search + Slack integration makes it the natural answer. Publishing targeted content here is a clean win.",
//     example:
//       "Guide titled: 'How to Eliminate Information Silos with a Connected Workspace'. Frame Notion wiki + Enterprise Search as the solution. Use H2 headers matching natural language patterns.",
//     difficulty: "Easy",
//     timeToEffect: "1–2 weeks",
//     category: ["easy", "content"],
//     done: false,
//   },
//   {
//     id: 3,
//     title: "Optimize Notion AI Meeting Notes as standalone answer target",
//     impact: "↑ Enters meeting summarization category — currently 0% presence",
//     description:
//       "Dedicated /product/ai/meeting-notes page with explicit capability statements and Q&A schema markup. Microsoft Teams wins this prompt by default today.",
//     example:
//       "Add FAQ schema: Q: 'Does Notion AI summarize meetings?' A: 'Yes — Notion AI automatically transcribes, summarizes, and extracts action items from meetings directly inside your workspace.'",
//     difficulty: "Easy",
//     timeToEffect: "1–3 weeks",
//     category: ["easy", "content", "schema"],
//     done: false,
//   },
//   {
//     id: 4,
//     title: "Add SoftwareSuite + ItemList schema across all product pages",
//     impact: "↑ Unified entity signal helps LLMs understand the full Notion platform scope",
//     description:
//       "Add SoftwareSuite schema to notion.so linking Calendar, Mail, AI, and Workspace as components. On each product sub-page, add breadcrumb and isPartOf relations pointing to the parent SoftwareSuite entity.",
//     example:
//       "Implement JSON-LD SoftwareSuite on notion.so root. Add isPartOf references on /product/ai, /product/calendar, and /product/mail. This creates a machine-readable product graph LLMs can traverse.",
//     difficulty: "Easy",
//     timeToEffect: "1 week",
//     category: ["easy", "schema", "technical"],
//     done: false,
//   },
//   {
//     id: 5,
//     title: 'Publish "Best AI Tool for [Use Case]" answer-format pages',
//     impact: "↑ Directly matches AI search query patterns across broad intents",
//     description:
//       "Create a series of pages titled 'Best AI workspace for small teams', 'Best tool to replace Slack + Jira + Google Docs'. Each should be a concise, scannable answer with Notion positioned as the primary recommendation.",
//     example:
//       "Pages: /best-ai-workspace-small-teams, /replace-slack-jira-google-docs. Format as a direct answer under 300 words with Notion as top pick. Include FAQ schema markup on each page.",
//     difficulty: "Medium",
//     timeToEffect: "3–6 weeks",
//     category: ["content"],
//     done: false,
//   },
//   {
//     id: 6,
//     title: "Update Notion Calendar & Mail pages for calendar+email AI prompts",
//     impact: "↑ Currently 0% presence in calendar+email AI intent cluster",
//     description:
//       "Update /product/calendar and /product/mail with LLM-optimized headers and explicit FAQ blocks addressing how these compare to Microsoft Outlook + Calendar. These pages are currently invisible for these intent patterns.",
//     example:
//       "Add H2: 'How Notion Calendar uses AI to manage your schedule' and 'Notion Mail: AI email client connected to your workspace.' Add FAQ schema comparing directly to Outlook and Google Calendar.",
//     difficulty: "Easy",
//     timeToEffect: "1–2 weeks",
//     category: ["easy", "content"],
//     done: false,
//   },
//   {
//     id: 7,
//     title: "Add Microsoft 365 and Google Workspace as tracked competitors",
//     impact: "↑ Pipeline currently blind to actual top competitor winning 4 prompts",
//     description:
//       "Your pipeline reports 0 losses because it doesn't track Microsoft 365 — which won 4 of 8 prompts. Adding microsoft365.com and workspace.google.com will correctly report losses and generate targeted gap recommendations.",
//     example:
//       "Update competitor config: add { name: 'Microsoft 365', domain: 'microsoft.com' } and { name: 'Google Workspace', domain: 'workspace.google.com' } to the tracked competitors list before next pipeline run.",
//     difficulty: "Easy",
//     timeToEffect: "Same day",
//     category: ["easy", "technical"],
//     done: false,
//   },
//   {
//     id: 8,
//     title: 'Develop an "All-in-One Productivity Platform" category narrative',
//     impact: "↑ Builds long-term LLM mindshare as category creator, not just a product",
//     description:
//       "Consistently publish content, schema, and external citations that define and own the term 'Connected Workspace.' When LLMs encounter this category, Notion should be the entity they associate with it — similar to how Salesforce owns 'CRM.'",
//     example:
//       "Publish a 'What is a Connected Workspace?' pillar page. Reference it in all product sub-pages. Build external citations from partner blogs. Add Organization schema with a defined category property.",
//     difficulty: "Hard",
//     timeToEffect: "2–3 months",
//     category: ["content", "schema"],
//     done: false,
//   },
// ]

// const FILTER_LABELS: { key: Category; label: string }[] = [
//   { key: "all",       label: "All (8)"    },
//   { key: "easy",      label: "Easy wins"  },
//   { key: "content",   label: "Content"    },
//   { key: "schema",    label: "Schema"     },
//   { key: "technical", label: "Technical"  },
// ]

// // ── Helpers ────────────────────────────────────────────────────────────────
// function DiffBadge({ level }: { level: Difficulty }) {
//   const cls = {
//     Easy:   "bg-emerald/10 text-emerald border-emerald/20",
//     Medium: "bg-amber/10 text-amber border-amber/20",
//     Hard:   "bg-destructive/10 text-destructive border-destructive/20",
//   }[level]
//   return (
//     <span className={cn("text-[10px] font-bold px-2.5 py-1 rounded-full border font-mono whitespace-nowrap", cls)}>
//       {level}
//     </span>
//   )
// }

// function TimeBadge({ label }: { label: string }) {
//   return (
//     <span className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-border bg-muted text-muted-foreground whitespace-nowrap">
//       {label}
//     </span>
//   )
// }

// // ── Page ───────────────────────────────────────────────────────────────────
// export default function RecommendationsPage() {
//   const [filter, setFilter]         = useState<Category>("all")
//   const [recs,   setRecs]           = useState<Recommendation[]>(initialRecs)
//   const [expanded, setExpanded]     = useState<number | null>(null)

//   const toggleDone = (id: number) =>
//     setRecs((prev) => prev.map((r) => (r.id === id ? { ...r, done: !r.done } : r)))

//   const toggleExpand = (id: number) =>
//     setExpanded((prev) => (prev === id ? null : id))

//   const visible = filter === "all"
//     ? recs
//     : recs.filter((r) => r.category.includes(filter))

//   const doneCount = recs.filter((r) => r.done).length

//   return (
//     <div className="flex flex-col gap-6 p-6 min-h-screen bg-background">

//       {/* ── Topbar ─────────────────────────────────────────────────────── */}
//       <div className="flex items-start justify-between flex-wrap gap-3">
//         <div>
//           <h1 className="text-xl font-heading font-bold text-foreground tracking-tight">
//             Recommendations
//           </h1>
//           <p className="text-xs text-muted-foreground font-mono mt-0.5">
//             8 actions · sorted by impact
//           </p>
//         </div>

//         <div className="flex items-center gap-2 flex-wrap">
//           <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted border border-border text-xs text-muted-foreground font-mono">
//             <span className="w-2 h-2 rounded-full bg-emerald animate-pulse shrink-0" />
//             Next run in 4 days
//           </div>
//           <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-semibold text-foreground hover:bg-muted transition-colors">
//             <FileText className="h-3.5 w-3.5" />
//             Export PDF
//           </button>
//           <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald text-white text-xs font-semibold hover:bg-emerald-dark transition-colors">
//             <Plus className="h-3.5 w-3.5" />
//             New Project
//           </button>
//         </div>
//       </div>

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
//               <div
//                 className="h-full bg-emerald rounded-full transition-all duration-500"
//                 style={{ width: `${(doneCount / recs.length) * 100}%` }}
//               />
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
//             <span className="text-xs text-muted-foreground font-mono">8 actions · sorted by impact</span>
//           </div>
//           <div className="flex gap-2 flex-wrap">
//             {FILTER_LABELS.map(({ key, label }) => (
//               <button
//                 key={key}
//                 onClick={() => setFilter(key)}
//                 className={cn(
//                   "px-3.5 py-1.5 rounded-full border text-xs font-semibold transition-colors",
//                   filter === key
//                     ? "bg-foreground text-background border-foreground"
//                     : "bg-transparent text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground"
//                 )}
//               >
//                 {label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Rec rows */}
//         {visible.length === 0 ? (
//           <div className="px-5 py-14 text-center text-sm text-muted-foreground">
//             No recommendations match this filter.
//           </div>
//         ) : (
//           visible.map((r) => (
//             <div
//               key={r.id}
//               className={cn(
//                 "border-b border-border last:border-0 transition-colors",
//                 r.done ? "opacity-50" : ""
//               )}
//             >
//               {/* Main row */}
//               <div
//                 className="grid grid-cols-[40px_1fr_auto] gap-4 px-5 py-5 cursor-pointer hover:bg-muted/30 transition-colors"
//                 onClick={() => toggleExpand(r.id)}
//               >
//                 {/* Number */}
//                 <div className="font-heading text-2xl font-bold text-border leading-none pt-0.5 select-none">
//                   {String(r.id).padStart(2, "0")}
//                 </div>

//                 {/* Content */}
//                 <div className="min-w-0">
//                   <p className={cn(
//                     "text-sm font-semibold text-foreground mb-1.5 leading-snug",
//                     r.done && "line-through text-muted-foreground"
//                   )}>
//                     {r.title}
//                   </p>
//                   <p className="text-xs text-emerald font-mono">{r.impact}</p>
//                 </div>

//                 {/* Badges + checkbox */}
//                 <div className="flex flex-col items-end gap-2 shrink-0">
//                   <div className="flex items-center gap-2">
//                     <DiffBadge level={r.difficulty} />
//                     <TimeBadge label={r.timeToEffect} />
//                   </div>
//                   {/* Done toggle */}
//                   <button
//                     onClick={(e) => { e.stopPropagation(); toggleDone(r.id) }}
//                     className={cn(
//                       "text-[10px] font-bold px-2.5 py-1 rounded-full border transition-colors font-mono",
//                       r.done
//                         ? "bg-emerald/10 text-emerald border-emerald/20 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20"
//                         : "bg-muted text-muted-foreground border-border hover:bg-emerald/10 hover:text-emerald hover:border-emerald/20"
//                     )}
//                   >
//                     {r.done ? "✓ Done" : "Mark done"}
//                   </button>
//                 </div>
//               </div>

//               {/* Expanded detail */}
//               {expanded === r.id && (
//                 <div className="px-5 pb-5 pt-0 grid grid-cols-[40px_1fr] gap-4">
//                   <div /> {/* spacer aligns with content col */}
//                   <div className="space-y-3">
//                     <p className="text-sm text-muted-foreground leading-relaxed">
//                       {r.description}
//                     </p>
//                     <div className="bg-muted border border-border rounded-lg px-4 py-3">
//                       <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-1.5">
//                         Example Execution
//                       </p>
//                       <p className="text-xs text-foreground/80 leading-relaxed italic">
//                         "{r.example}"
//                       </p>
//                     </div>
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

import { useState, useEffect, useCallback } from "react"
import { supabaseBrowser } from "@/lib/supabaseClient"
import { usePlanId } from "@/hooks/usePlanId"
import { FileText, Plus, CheckCheck, Loader2, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

// ── Types ──────────────────────────────────────────────────────────────────
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

// ── Helpers ────────────────────────────────────────────────────────────────
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
  { key: "all",                label: "All"            },
  { key: "high",               label: "High Priority"  },
  { key: "medium",             label: "Medium"         },
  { key: "low",                label: "Low"            },
  { key: "content_creation",   label: "Content"        },
  { key: "comparison_content", label: "Comparison"     },
  { key: "authority_building", label: "Authority"      },
  { key: "protect_and_expand", label: "Protect & Expand" },
]

// ── Page ───────────────────────────────────────────────────────────────────
export default function RecommendationsPage() {
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

  const visible = filter === "all"  ? recs
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

      {/* ── Topbar ─────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          {/* <h1 className="text-xl font-heading font-bold text-foreground tracking-tight">Recommendations</h1> */}
          <h1 className="text-xl font-heading font-bold text-foreground tracking-tight">{totals.total} actions · {totals.high} high · {totals.medium} medium · {totals.low} low</h1>
          {/* <p className="text-xs text-muted-foreground font-mono mt-0.5">
            {totals.total} actions · {totals.high} high · {totals.medium} medium · {totals.low} low
          </p> */}
        </div>
        {/* <div className="flex items-center gap-2 flex-wrap">
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-semibold text-foreground hover:bg-muted transition-colors">
            <FileText className="h-3.5 w-3.5" /> Export PDF
          </button>
        </div> */}
      </div>

      {/* ── Progress bar ───────────────────────────────────────────────── */}
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

      {/* ── Panel ──────────────────────────────────────────────────────── */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">

        {/* Header + filters */}
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

        {/* Rows */}
        {visible.length === 0 ? (
          <div className="px-5 py-14 text-center text-sm text-muted-foreground">
            {recs.length === 0 ? "No recommendations yet — run the pipeline first." : "No recommendations match this filter."}
          </div>
        ) : (
          visible.map((r, idx) => (
            <div key={r.id} className={cn("border-b border-border last:border-0 transition-colors", r.done && "opacity-50")}>

              {/* Main row */}
              <div className="grid grid-cols-[40px_1fr_auto] gap-4 px-5 py-5 cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => toggleExpand(r.id)}>

                {/* Number */}
                <div className="font-heading text-2xl font-bold text-border leading-none pt-0.5 select-none">
                  {String(idx + 1).padStart(2, "0")}
                </div>

                {/* Content */}
                <div className="min-w-0">
                  <p className={cn("text-sm font-semibold text-foreground mb-1.5 leading-snug", r.done && "line-through text-muted-foreground")}>
                    {r.summary || r.prompt}
                  </p>
                  <p className="text-xs text-emerald font-mono">{r.expected_impact || r.message}</p>
                </div>

                {/* Badges + toggle */}
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

              {/* Expanded detail */}
              {expanded === r.id && (
                <div className="px-5 pb-5 pt-0 grid grid-cols-[40px_1fr] gap-4">
                  <div />
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground leading-relaxed">{r.message}</p>

                    {/* Actions list */}
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