


// "use client"

// import { useState, useEffect, useCallback } from "react"
// import { supabaseBrowser } from "@/lib/supabaseClient"
// import { usePlanId } from "@/hooks/usePlanId"
// import {
//   Plus, ChevronRight, CheckCircle2, XCircle,
//   Lock, TrendingUp, TrendingDown, Minus, Loader2
// } from "lucide-react"
// import { cn } from "@/lib/utils"

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

// type MentionStatus = "yes" | "no" | "locked"
// type DiffLevel     = "Easy" | "Medium" | "Hard"
// interface BreakdownItem { label: string; value: number; max: number }
// interface OverviewData {
//   pages: number; totalPrompts: number; brandMentioned: number; brandWins: number
//   brandLosses: number; noVisibility: number; visibilityRate: number; winRate: number
//   competitorDominance: number; noVisibilityRate: number; trustScore: number
// }
// interface ScoreData { score: number; breakdown: any; trend: "up"|"down"|"stable"; change: number }
// interface PromptRow {
//   id: string; question: string
//   engines: Record<string, { mentioned: boolean; position: number | null }>
//   status: "win"|"shared"|"missed"
// }
// interface Competitor {
//   id: string; name: string; domain: string
//   confidence_score: number; status: string
// }
// interface Recommendation {
//   id: string; summary: string; expected_impact: string
//   priority: "high"|"medium"|"low"; pattern: string
// }

// const scoreColor   = (v:number,m:number) => { const p=v/m; return p>=.85?"#0FBF9A":p>=.45?"#F4B740":"#EF4444" }
// const rateColor    = (r:number) => r>=40?"text-destructive":r>=20?"text-amber":"text-muted-foreground"
// const rateBarColor = (r:number) => r>=40?"bg-destructive":r>=20?"bg-amber":"bg-muted-foreground"

// function MentionIcon({ status }: { status: MentionStatus }) {
//   if (status==="yes") return <CheckCircle2 className="h-4 w-4 text-emerald mx-auto"/>
//   if (status==="no")  return <XCircle className="h-4 w-4 text-destructive mx-auto"/>
//   return <div className="flex items-center justify-center"><Lock className="h-3.5 w-3.5 text-muted-foreground"/></div>
// }
// function DiffBadge({ level }: { level: DiffLevel }) {
//   const cls = { Easy:"bg-emerald/10 text-emerald border-emerald/20", Medium:"bg-amber/10 text-amber border-amber/20", Hard:"bg-destructive/10 text-destructive border-destructive/20" }[level]
//   return <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full border font-mono",cls)}>{level}</span>
// }
// function TrendIcon({ trend }: { trend?: string }) {
//   if (trend==="up")   return <TrendingUp   className="h-3.5 w-3.5 text-emerald"/>
//   if (trend==="down") return <TrendingDown  className="h-3.5 w-3.5 text-destructive"/>
//   return                     <Minus         className="h-3.5 w-3.5 text-muted-foreground"/>
// }
// const patternIcon = (p:string) => p==="missed"?"🎯":p==="losing"?"⚡":p==="competing"?"🧩":"✨"
// const toDiff      = (p:string): DiffLevel => p==="high"?"Hard":p==="medium"?"Medium":"Easy"
// const fmtDate     = (d:string|null) => d ? new Date(d).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"}) : "Never"

// // ── Page ───────────────────────────────────────────────────────────────────
// export default function OverviewPage() {
//   const planId = usePlanId()

//   const [overview,    setOverview]    = useState<OverviewData | null>(null)
//   const [scoreData,   setScoreData]   = useState<ScoreData | null>(null)
//   const [promptRows,  setPromptRows]  = useState<PromptRow[]>([])
//   const [competitors, setCompetitors] = useState<Competitor[]>([])
//   const [suggestions, setSuggestions] = useState<Competitor[]>([])
//   const [recs,        setRecs]        = useState<Recommendation[]>([])
//   const [plan,        setPlan]        = useState<any>(null)
//   const [loading,     setLoading]     = useState(true)

//   const [dismissed,   setDismissed]   = useState<string[]>([])
//   const [accepted,    setAccepted]    = useState<string[]>([])
//   const [mounted,     setMounted]     = useState(false)

//   const load = useCallback(async () => {
//     if (!planId) return
//     setLoading(true)
//     try {
//       const { data: s } = await supabaseBrowser.auth.getSession()
//       const token = s?.session?.access_token
//       if (!token) return
//       const h = { Authorization: `Bearer ${token}` }

//       const [ovR,scR,viR,coR,reR] = await Promise.allSettled([
//         fetch(`${BACKEND_URL}/aeo/overview/simple?planId=${planId}`,    { headers: h }),
//         fetch(`${BACKEND_URL}/aeo/score/${planId}`,                     { headers: h }),
//         fetch(`${BACKEND_URL}/aeo/visibility?planId=${planId}`,         { headers: h }),
//         fetch(`${BACKEND_URL}/aeo/competitors/simple?planId=${planId}`, { headers: h }),
//         fetch(`${BACKEND_URL}/aeo/recommendations?planId=${planId}`,    { headers: h }),
//       ])

//       if (ovR.status==="fulfilled"&&ovR.value.ok) { const j=await ovR.value.json(); setOverview(j?.data??j); setPlan(j?.plan??null) }
//       if (scR.status==="fulfilled"&&scR.value.ok) { const j=await scR.value.json(); const d=j?.data??j; setScoreData({score:d.score,breakdown:d.breakdown,trend:d.trend,change:d.change}) }
//       if (viR.status==="fulfilled"&&viR.value.ok) { const j=await viR.value.json(); setPromptRows((j?.data?.prompts??j?.prompts??[]).slice(0,5)) }
//       if (coR.status==="fulfilled"&&coR.value.ok) { const j=await coR.value.json(); const d=j?.data??j; setCompetitors((d?.competitors??[]).slice(0,4)); setSuggestions((d?.suggestions??[]).slice(0,2)) }
//       if (reR.status==="fulfilled"&&reR.value.ok) { const j=await reR.value.json(); setRecs((j?.data?.recommendations??[]).slice(0,3)) }
//     } catch(e){console.error(e)} finally{setLoading(false)}
//   }, [planId])

//   useEffect(()=>{ setMounted(true) },[])
//   useEffect(()=>{ load() },[load])

//   const handleAccept = async (id:string,name:string) => {
//     setAccepted(a=>[...a,name])
//     const { data: s } = await supabaseBrowser.auth.getSession()
//     const token = s?.session?.access_token
//     await fetch(`${BACKEND_URL}/aeo/competitors/${id}/accept`,{method:"PUT",headers:{Authorization:`Bearer ${token!}`,"Content-Type":"application/json"}})
//   }
//   const handleIgnore = async (id:string,name:string) => {
//     setDismissed(d=>[...d,name])
//     const { data: s } = await supabaseBrowser.auth.getSession()
//     const token = s?.session?.access_token
//     await fetch(`${BACKEND_URL}/aeo/competitors/${id}/ignore`,{method:"PUT",headers:{Authorization:`Bearer ${token!}`,"Content-Type":"application/json"}})
//   }


//   // Prevent SSR/client mismatch — render nothing until mounted on client
//   if (!mounted) return (
//     <div className="flex items-center justify-center min-h-screen">
//       <Loader2 className="h-6 w-6 animate-spin text-muted-foreground"/>
//     </div>
//   )

//   if (!planId) return (
//     <div className="flex flex-col items-center justify-center min-h-screen gap-3">
//       <p className="text-sm text-muted-foreground">No project selected.</p>
//       <a href="/dashboard" className="text-xs text-emerald underline">Go to Dashboard</a>
//     </div>
//   )

//   if (loading) return (
//     <div className="flex items-center justify-center min-h-screen">
//       <Loader2 className="h-6 w-6 animate-spin text-muted-foreground"/>
//     </div>
//   )

//   const score         = scoreData?.score ?? 0
//   const circumference = 2 * Math.PI * 46
//   const offset        = circumference - (score/100)*circumference

//   const breakdownItems: BreakdownItem[] = scoreData?.breakdown?.scoreComponents
//     ? scoreData.breakdown.scoreComponents.map((c:any)=>({label:c.category,value:c.points,max:c.max}))
//     : overview
//     ? [
//         {label:"Brand Presence",       value:overview.visibilityRate,           max:100},
//         {label:"Win Rate",             value:overview.winRate,                  max:100},
//         {label:"Competitive Position", value:100-overview.competitorDominance,  max:100},
//       ]
//     : []

//   const statCards = overview ? [
//     {label:"Brand Presence",    value:`${overview.visibilityRate}%`, sub:`${overview.brandMentioned} of ${overview.totalPrompts} prompts`, trend:"neutral" as const},
//     {label:"Wins",              value:String(overview.brandWins),    sub:"Brand first mention",                                           trend:"up"      as const},
//     {label:"Missed Prompts",    value:String(overview.noVisibility), sub:`${overview.noVisibilityRate}% no visibility`,                   trend:"down"    as const},
//     {label:"Schemas Generated", value:String(overview.pages),        sub:`${overview.pages} pages covered`,                              trend:"up"      as const},
//   ] : []

//   const domain         = plan?.website_url?.replace(/^https?:\/\//,"").replace(/\/$/,"") ?? "—"
//   const lastRun        = plan?.last_full_pipeline ?? null
//   const allCompetitors = [...competitors,...suggestions.filter(s=>!dismissed.includes(s.name)&&!accepted.includes(s.name))]

//   return (
//     <div className="flex flex-col gap-6 p-6 min-h-screen bg-background">

//       {/* Topbar */}
//       <div className="flex items-start justify-between flex-wrap gap-3">
//         <div>
//           <h1 className="text-xl font-heading font-bold text-foreground tracking-tight">Overview</h1>
//           <p className="text-xs text-muted-foreground font-mono mt-0.5">{domain} · Last run {fmtDate(lastRun)}</p>
//         </div>
//         <div className="flex items-center gap-2 flex-wrap">
//           <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted border border-border text-xs text-muted-foreground font-mono">
//             <span className="w-2 h-2 rounded-full bg-emerald animate-pulse shrink-0"/>
//             Pipeline: {plan?.pipeline_status ?? "idle"}
//           </div>

//           <a href="/onboarding" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald text-white text-xs font-semibold hover:opacity-90 transition-opacity">
//             <Plus className="h-3.5 w-3.5"/>New Project
//           </a>
//         </div>
//       </div>

//       {/* Score Hero */}
//       <div className="bg-card border border-border rounded-2xl p-6 flex flex-wrap gap-6 items-center">
//         <div className="relative w-28 h-28 shrink-0">
//           <svg className="-rotate-90 w-full h-full" viewBox="0 0 110 110">
//             <circle cx="55" cy="55" r="46" fill="none" stroke="var(--border)" strokeWidth="8"/>
//             <circle cx="55" cy="55" r="46" fill="none" stroke="var(--emerald)" strokeWidth="8"
//               strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
//               className="transition-all duration-700"/>
//           </svg>
//           <div className="absolute inset-0 flex flex-col items-center justify-center">
//             <span className="font-heading text-3xl font-bold text-foreground leading-none">{score}</span>
//             <span className="text-[10px] font-mono text-muted-foreground">/100</span>
//           </div>
//         </div>
//         <div className="flex-1 min-w-[200px]">
//           <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-1">
//             AEO Score · {new Date().toLocaleDateString("en-GB",{month:"long",year:"numeric"})}
//           </p>
//           <h2 className="font-heading text-xl font-bold text-foreground mb-2">
//             {score>=80?"Strong Visibility":score>=50?"Moderate Visibility":"Low Visibility"}
//           </h2>
//           <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
//             {overview
//               ? `Brand appears in ${overview.visibilityRate}% of AI answers with ${overview.brandWins} outright wins and ${overview.noVisibility} missed prompts.`
//               : "Run the pipeline to generate your AEO score."}
//           </p>
//           {scoreData && (
//             <div className="flex items-center gap-1.5 mt-2">
//               <TrendIcon trend={scoreData.trend}/>
//               <span className="text-xs font-mono text-muted-foreground">
//                 {scoreData.change>0?`+${scoreData.change}`:scoreData.change} pts from last run
//               </span>
//             </div>
//           )}
//         </div>
//         {breakdownItems.length>0 && (
//           <div className="flex flex-col gap-2.5 min-w-[210px] w-full sm:w-auto">
//             {breakdownItems.map(b=>(
//               <div key={b.label} className="flex flex-col gap-1">
//                 <div className="flex justify-between text-[11px]">
//                   <span className="text-foreground/70 font-medium">{b.label}</span>
//                   <span className="font-mono text-muted-foreground">{b.value}/{b.max}</span>
//                 </div>
//                 <div className="h-1.5 bg-muted rounded-full overflow-hidden">
//                   <div className="h-full rounded-full transition-all duration-700"
//                     style={{width:`${Math.min((b.value/b.max)*100,100)}%`,background:scoreColor(b.value,b.max)}}/>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Stat Cards */}
//       {statCards.length>0 && (
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//           {statCards.map(s=>(
//             <div key={s.label} className="bg-card border border-border rounded-xl p-5">
//               <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-2">{s.label}</p>
//               <p className={cn("font-heading text-3xl font-bold leading-none mb-1.5",
//                 s.trend==="up"?"text-emerald":s.trend==="down"?"text-destructive":"text-foreground")}>
//                 {s.value}
//               </p>
//               <div className="flex items-center gap-1">
//                 <TrendIcon trend={s.trend}/>
//                 <span className="text-xs text-muted-foreground">{s.sub}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Two-col */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//         {/* Prompt Visibility */}
//         <div className="bg-card border border-border rounded-xl overflow-hidden">
//           <div className="flex items-center justify-between px-5 py-4 border-b border-border">
//             <h3 className="font-heading text-sm font-semibold text-foreground">Prompt Visibility</h3>
//             <a href="/dashboard/visibility" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5">
//               View all <ChevronRight className="h-3 w-3"/>
//             </a>
//           </div>
//           <div className="grid grid-cols-[1fr_64px_64px_64px] px-5 py-2 bg-muted/50 border-b border-border">
//             {["Prompt","Gemini","GPT-4o","Perplxty"].map(h=>(
//               <div key={h} className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground text-center first:text-left">{h}</div>
//             ))}
//           </div>
//           {promptRows.length===0 ? (
//             <div className="px-5 py-8 text-center text-xs text-muted-foreground">No visibility data yet — run the pipeline first.</div>
//           ) : (
//             promptRows.map(p=>{
//               const gemini:    MentionStatus = p.engines?.gemini  ?(p.engines.gemini.mentioned  ?"yes":"no"):"no"
//               const chatgpt:   MentionStatus = p.engines?.chatgpt ?(p.engines.chatgpt.mentioned ?"yes":"no"):"no"
//               return (
//                 <div key={p.id} className="grid grid-cols-[1fr_64px_64px_64px] px-5 py-3 border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
//                   <span className="text-xs font-medium text-foreground/80 truncate pr-2">{p.question}</span>
//                   <MentionIcon status={gemini}/>
//                   <MentionIcon status={chatgpt}/>
//                   <MentionIcon status="locked"/>
//                 </div>
//               )
//             })
//           )}
//           <div className="px-5 py-3 bg-violet/5 border-t border-violet/10 flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <Lock className="h-3.5 w-3.5 text-violet"/>
//               <span className="text-xs text-violet font-medium">Unlock Perplexity tracking</span>
//             </div>
//             <a href="/billing" className="text-[10px] font-semibold text-violet hover:text-violet-light">Upgrade to Pro →</a>
//           </div>
//         </div>

//         {/* Competitors */}
//         <div className="bg-card border border-border rounded-xl overflow-hidden">
//           <div className="flex items-center justify-between px-5 py-4 border-b border-border">
//             <h3 className="font-heading text-sm font-semibold text-foreground">Top Competing Brands</h3>
//             <a href="/dashboard/competitors" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5">
//               Manage <ChevronRight className="h-3 w-3"/>
//             </a>
//           </div>
//           {allCompetitors.length===0 ? (
//             <div className="px-5 py-8 text-center text-xs text-muted-foreground">No competitors tracked yet.</div>
//           ) : (
//             allCompetitors.map(c=>{
//               const isSuggested = suggestions.some(s=>s.id===c.id)
//               const isAccepted  = accepted.includes(c.name)
//               const rate        = Math.round((c.confidence_score??0)*100)
//               return (
//                 <div key={c.id} className={cn("flex items-center gap-3 px-5 py-3.5 border-b border-border last:border-0 transition-colors",
//                   isSuggested&&!isAccepted?"bg-amber/5":"hover:bg-muted/30")}>
//                   <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0",
//                     isSuggested?"bg-amber/10 text-amber border border-amber/20":"bg-muted text-foreground border border-border")}>
//                     {(c.name||"?").charAt(0).toUpperCase()}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center gap-2 flex-wrap">
//                       <span className="text-sm font-semibold text-foreground">{c.name}</span>
//                       {isSuggested&&<span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber/10 text-amber border border-amber/20 font-mono">NEW</span>}
//                     </div>
//                     <span className="text-[11px] text-muted-foreground font-mono">{c.domain}</span>
//                   </div>
//                   {isSuggested&&!isAccepted ? (
//                     <div className="flex gap-2 shrink-0">
//                       <button onClick={()=>handleAccept(c.id,c.name)} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-emerald/10 text-emerald border border-emerald/20 hover:bg-emerald/20 transition-colors">Add</button>
//                       <button onClick={()=>handleIgnore(c.id,c.name)} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20 transition-colors">Skip</button>
//                     </div>
//                   ) : (
//                     <div className="shrink-0 text-right min-w-[70px]">
//                       <p className={cn("text-sm font-bold font-mono",rateColor(rate))}>
//                         {rate>0?`${rate}%`:isAccepted?"Tracking":"—"}
//                       </p>
//                       {rate>0&&(
//                         <div className="mt-1 h-1 w-16 ml-auto bg-muted rounded-full overflow-hidden">
//                           <div className={cn("h-full rounded-full",rateBarColor(rate))} style={{width:`${rate}%`}}/>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               )
//             })
//           )}
//         </div>
//       </div>

//       {/* Recommendations */}
//       <div className="bg-card border border-border rounded-xl overflow-hidden">
//         <div className="flex items-center justify-between px-5 py-4 border-b border-border">
//           <h3 className="font-heading text-sm font-semibold text-foreground">Top Recommendations</h3>
//           <a href="/dashboard/recommendations" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5">
//             View all <ChevronRight className="h-3 w-3"/>
//           </a>
//         </div>
//         {recs.length===0 ? (
//           <div className="px-5 py-8 text-center text-xs text-muted-foreground">No recommendations yet — run the pipeline first.</div>
//         ) : (
//           recs.map(r=>(
//             <div key={r.id} className="flex items-start gap-4 px-5 py-4 border-b border-border last:border-0 hover:bg-muted/30 transition-colors group">
//               <div className="w-9 h-9 rounded-xl bg-muted border border-border flex items-center justify-center text-base shrink-0 group-hover:scale-105 transition-transform">
//                 {patternIcon(r.pattern)}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-semibold text-foreground mb-1">{r.summary}</p>
//                 <p className="text-xs text-emerald font-mono">{r.expected_impact}</p>
//               </div>
//               <div className="shrink-0 pt-0.5"><DiffBadge level={toDiff(r.priority)}/></div>
//             </div>
//           ))
//         )}
//       </div>

//     </div>
//   )
// }





// "use client"

// import { useState, useEffect, useCallback } from "react"
// import { supabaseBrowser } from "@/lib/supabaseClient"
// import { usePlanId } from "@/hooks/usePlanId"
// import {
//   Plus, ChevronRight, CheckCircle2, XCircle,
//   Lock, TrendingUp, TrendingDown, Minus, Loader2,
//   Sparkles, ChevronDown, ChevronUp,
// } from "lucide-react"
// import { cn } from "@/lib/utils"

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

// type MentionStatus = "yes" | "no" | "locked"
// type DiffLevel     = "Easy" | "Medium" | "Hard"

// interface BreakdownItem { label: string; value: number; max: number }
// interface OverviewData {
//   pages: number; totalPrompts: number; brandMentioned: number; brandWins: number
//   brandLosses: number; noVisibility: number; visibilityRate: number; winRate: number
//   competitorDominance: number; noVisibilityRate: number; trustScore: number
// }
// interface ScoreData { score: number; breakdown: any; trend: "up"|"down"|"stable"; change: number }
// interface PromptRow {
//   id: string; question: string
//   engines: Record<string, { mentioned: boolean; position: number | null }>
//   status: "win"|"shared"|"missed"
// }
// interface Competitor { id: string; name: string; domain: string; confidence_score: number; status: string }
// interface Recommendation { id: string; summary: string; expected_impact: string; priority: "high"|"medium"|"low"; pattern: string }
// interface ScoreExplanation { summary: string; strengths: string[]; gaps: string[]; next_step: string }

// const scoreColor   = (v:number,m:number) => { const p=v/m; return p>=.85?"#0FBF9A":p>=.45?"#F4B740":"#EF4444" }
// const rateColor    = (r:number) => r>=40?"text-destructive":r>=20?"text-amber":"text-muted-foreground"
// const rateBarColor = (r:number) => r>=40?"bg-destructive":r>=20?"bg-amber":"bg-muted-foreground"

// function MentionIcon({ status }: { status: MentionStatus }) {
//   if (status==="yes") return <CheckCircle2 className="h-4 w-4 text-emerald mx-auto"/>
//   if (status==="no")  return <XCircle className="h-4 w-4 text-destructive mx-auto"/>
//   return <div className="flex items-center justify-center"><Lock className="h-3.5 w-3.5 text-muted-foreground"/></div>
// }
// function DiffBadge({ level }: { level: DiffLevel }) {
//   const cls = { Easy:"bg-emerald/10 text-emerald border-emerald/20", Medium:"bg-amber/10 text-amber border-amber/20", Hard:"bg-destructive/10 text-destructive border-destructive/20" }[level]
//   return <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full border font-mono",cls)}>{level}</span>
// }
// function TrendIcon({ trend }: { trend?: string }) {
//   if (trend==="up")   return <TrendingUp   className="h-3.5 w-3.5 text-emerald"/>
//   if (trend==="down") return <TrendingDown className="h-3.5 w-3.5 text-destructive"/>
//   return                     <Minus        className="h-3.5 w-3.5 text-muted-foreground"/>
// }
// const patternIcon = (p:string) => p==="missed"?"🎯":p==="losing"?"⚡":p==="competing"?"🧩":"✨"
// const toDiff      = (p:string): DiffLevel => p==="high"?"Hard":p==="medium"?"Medium":"Easy"
// const fmtDate     = (d:string|null) => d ? new Date(d).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"}) : "Never"

// // ── Score Explanation Panel ────────────────────────────────────────────────
// function ScoreExplanationPanel({ planId, token }: { planId: string; token: string }) {
//   const [explanation, setExplanation] = useState<ScoreExplanation | null>(null)
//   const [loading,     setLoading]     = useState(true)
//   const [generating,  setGenerating]  = useState(false)
//   const [expanded,    setExpanded]    = useState(false)
//   const [error,       setError]       = useState("")

//   // Load existing explanation on mount
//   useEffect(() => {
//     const load = async () => {
//       setLoading(true)
//       try {
//         const res = await fetch(`${BACKEND_URL}/aeo/score/${planId}/explanation`, {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         if (res.ok) {
//           const j = await res.json()
//           const d = j?.data ?? j
//           if (d?.summary) setExplanation(d)
//         }
//         // 404 = not generated yet — show "Explain this score" button
//       } catch { /* silent */ } finally { setLoading(false) }
//     }
//     load()
//   }, [planId, token])

//   const generate = async () => {
//     setGenerating(true); setError("")
//     try {
//       const res = await fetch(`${BACKEND_URL}/aeo/score/explain`, {
//         method:  "POST",
//         headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//         body:    JSON.stringify({ planId }),
//       })
//       if (!res.ok) { setError("Failed to generate"); setGenerating(false); return }

//       // Job is async — poll once after 3.5s
//       setTimeout(async () => {
//         try {
//           const r2 = await fetch(`${BACKEND_URL}/aeo/score/${planId}/explanation`, {
//             headers: { Authorization: `Bearer ${token}` },
//           })
//           if (r2.ok) {
//             const j = await r2.json()
//             const d = j?.data ?? j
//             if (d?.summary) { setExplanation(d); setExpanded(true) }
//           }
//         } catch { /* silent */ } finally { setGenerating(false) }
//       }, 3500)
//     } catch { setError("Network error"); setGenerating(false) }
//   }

//   // Still loading existing explanation
//   if (loading) return (
//     <div className="flex items-center gap-2 mt-3 text-[11px] text-muted-foreground font-mono">
//       <Loader2 className="h-3 w-3 animate-spin"/> Loading explanation…
//     </div>
//   )

//   // No explanation yet
//   if (!explanation) return (
//     <div className="mt-3">
//       {error && <p className="text-[11px] text-destructive mb-2">{error}</p>}
//       <button
//         onClick={generate}
//         disabled={generating}
//         className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet/10 border border-violet/20 text-violet text-[11px] font-semibold hover:bg-violet/20 transition-colors disabled:opacity-50"
//       >
//         {generating
//           ? <><Loader2 className="h-3 w-3 animate-spin"/> Generating…</>
//           : <><Sparkles className="h-3 w-3"/> Explain this score</>
//         }
//       </button>
//     </div>
//   )

//   // Has explanation
//   return (
//     <div className="mt-3 w-full">
//       {/* Toggle button */}
//       <button
//         onClick={() => setExpanded(e => !e)}
//         className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet/10 border border-violet/20 text-violet text-[11px] font-semibold hover:bg-violet/20 transition-colors"
//       >
//         <Sparkles className="h-3 w-3"/>
//         AI Explanation
//         {expanded ? <ChevronUp className="h-3 w-3"/> : <ChevronDown className="h-3 w-3"/>}
//       </button>

//       {expanded && (
//         <div className="mt-3 rounded-xl border border-violet/15 bg-violet/[0.04] p-4 flex flex-col gap-3 max-w-xl">

//           {/* Summary */}
//           <p className="text-xs text-foreground/80 leading-relaxed">{explanation.summary}</p>

//           {/* Strengths */}
//           {explanation.strengths?.length > 0 && (
//             <div>
//               <p className="text-[10px] font-mono font-bold text-emerald uppercase tracking-wider mb-1.5">What's working</p>
//               <ul className="flex flex-col gap-1">
//                 {explanation.strengths.map((s, i) => (
//                   <li key={i} className="flex items-start gap-2 text-[11px] text-foreground/70 leading-relaxed">
//                     <CheckCircle2 className="h-3 w-3 text-emerald shrink-0 mt-0.5"/>{s}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* Gaps */}
//           {explanation.gaps?.length > 0 && (
//             <div>
//               <p className="text-[10px] font-mono font-bold text-destructive uppercase tracking-wider mb-1.5">Gaps to close</p>
//               <ul className="flex flex-col gap-1">
//                 {explanation.gaps.map((g, i) => (
//                   <li key={i} className="flex items-start gap-2 text-[11px] text-foreground/70 leading-relaxed">
//                     <XCircle className="h-3 w-3 text-destructive shrink-0 mt-0.5"/>{g}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* Next step */}
//           {explanation.next_step && (
//             <div className="flex items-start gap-2 px-3 py-2.5 rounded-lg bg-amber/5 border border-amber/20">
//               <Sparkles className="h-3 w-3 text-amber shrink-0 mt-0.5"/>
//               <p className="text-[11px] text-amber font-medium leading-relaxed">{explanation.next_step}</p>
//             </div>
//           )}

//           {/* Regenerate */}
//           <button
//             onClick={generate}
//             disabled={generating}
//             className="self-start text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
//           >
//             {generating ? "Regenerating…" : "↺ Regenerate"}
//           </button>
//         </div>
//       )}
//     </div>
//   )
// }

// // ── Page ───────────────────────────────────────────────────────────────────
// export default function OverviewPage() {
//   const planId = usePlanId()

//   const [overview,    setOverview]    = useState<OverviewData | null>(null)
//   const [scoreData,   setScoreData]   = useState<ScoreData | null>(null)
//   const [promptRows,  setPromptRows]  = useState<PromptRow[]>([])
//   const [competitors, setCompetitors] = useState<Competitor[]>([])
//   const [suggestions, setSuggestions] = useState<Competitor[]>([])
//   const [recs,        setRecs]        = useState<Recommendation[]>([])
//   const [plan,        setPlan]        = useState<any>(null)
//   const [token,       setToken]       = useState("")
//   const [loading,     setLoading]     = useState(true)
//   const [dismissed,   setDismissed]   = useState<string[]>([])
//   const [accepted,    setAccepted]    = useState<string[]>([])
//   const [mounted,     setMounted]     = useState(false)

//   const load = useCallback(async () => {
//     if (!planId) return
//     setLoading(true)
//     try {
//       const { data: s } = await supabaseBrowser.auth.getSession()
//       const t = s?.session?.access_token
//       if (!t) return
//       setToken(t)
//       const h = { Authorization: `Bearer ${t}` }

//       const [ovR,scR,viR,coR,reR] = await Promise.allSettled([
//         fetch(`${BACKEND_URL}/aeo/overview/simple?planId=${planId}`,    { headers: h }),
//         fetch(`${BACKEND_URL}/aeo/score/${planId}`,                     { headers: h }),
//         fetch(`${BACKEND_URL}/aeo/visibility?planId=${planId}`,         { headers: h }),
//         fetch(`${BACKEND_URL}/aeo/competitors/simple?planId=${planId}`, { headers: h }),
//         fetch(`${BACKEND_URL}/aeo/recommendations?planId=${planId}`,    { headers: h }),
//       ])

//       if (ovR.status==="fulfilled"&&ovR.value.ok) { const j=await ovR.value.json(); setOverview(j?.data??j); setPlan(j?.plan??null) }
//       if (scR.status==="fulfilled"&&scR.value.ok) { const j=await scR.value.json(); const d=j?.data??j; setScoreData({score:d.score,breakdown:d.breakdown,trend:d.trend,change:d.change}) }
//       if (viR.status==="fulfilled"&&viR.value.ok) { const j=await viR.value.json(); setPromptRows((j?.data?.prompts??j?.prompts??[]).slice(0,5)) }
//       if (coR.status==="fulfilled"&&coR.value.ok) { const j=await coR.value.json(); const d=j?.data??j; setCompetitors((d?.competitors??[]).slice(0,4)); setSuggestions((d?.suggestions??[]).slice(0,2)) }
//       if (reR.status==="fulfilled"&&reR.value.ok) { const j=await reR.value.json(); setRecs((j?.data?.recommendations??[]).slice(0,3)) }
//     } catch(e){console.error(e)} finally{setLoading(false)}
//   }, [planId])

//   useEffect(()=>{ setMounted(true) },[])
//   useEffect(()=>{ load() },[load])

//   const handleAccept = async (id:string,name:string) => {
//     setAccepted(a=>[...a,name])
//     const { data: s } = await supabaseBrowser.auth.getSession()
//     const t = s?.session?.access_token
//     await fetch(`${BACKEND_URL}/aeo/competitors/${id}/accept`,{method:"PUT",headers:{Authorization:`Bearer ${t!}`,"Content-Type":"application/json"}})
//   }
//   const handleIgnore = async (id:string,name:string) => {
//     setDismissed(d=>[...d,name])
//     const { data: s } = await supabaseBrowser.auth.getSession()
//     const t = s?.session?.access_token
//     await fetch(`${BACKEND_URL}/aeo/competitors/${id}/ignore`,{method:"PUT",headers:{Authorization:`Bearer ${t!}`,"Content-Type":"application/json"}})
//   }

//   if (!mounted) return <div className="flex items-center justify-center min-h-screen"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground"/></div>
//   if (!planId)  return <div className="flex flex-col items-center justify-center min-h-screen gap-3"><p className="text-sm text-muted-foreground">No project selected.</p><a href="/dashboard" className="text-xs text-emerald underline">Go to Dashboard</a></div>
//   if (loading)  return <div className="flex items-center justify-center min-h-screen"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground"/></div>

//   const score         = scoreData?.score ?? 0
//   const circumference = 2 * Math.PI * 46
//   const offset        = circumference - (score/100)*circumference

//   const breakdownItems: BreakdownItem[] = scoreData?.breakdown?.scoreComponents
//     ? scoreData.breakdown.scoreComponents.map((c:any)=>({label:c.category,value:c.points,max:c.max}))
//     : overview
//     ? [
//         {label:"Brand Presence",       value:overview.visibilityRate,          max:100},
//         {label:"Win Rate",             value:overview.winRate,                 max:100},
//         {label:"Competitive Position", value:100-overview.competitorDominance, max:100},
//       ]
//     : []

//   const statCards = overview ? [
//     {label:"Brand Presence",    value:`${overview.visibilityRate}%`, sub:`${overview.brandMentioned} of ${overview.totalPrompts} prompts`, trend:"neutral" as const},
//     {label:"Wins",              value:String(overview.brandWins),    sub:"Brand first mention",                                           trend:"up"      as const},
//     {label:"Missed Prompts",    value:String(overview.noVisibility), sub:`${overview.noVisibilityRate}% no visibility`,                   trend:"down"    as const},
//     {label:"Schemas Generated", value:String(overview.pages),        sub:`${overview.pages} pages covered`,                              trend:"up"      as const},
//   ] : []

//   const domain         = plan?.website_url?.replace(/^https?:\/\//,"").replace(/\/$/,"") ?? "—"
//   const lastRun        = plan?.last_full_pipeline ?? null
//   const allCompetitors = [...competitors,...suggestions.filter(s=>!dismissed.includes(s.name)&&!accepted.includes(s.name))]

//   return (
//     <div className="flex flex-col gap-6 p-6 min-h-screen bg-background">

//       {/* Topbar */}
//       <div className="flex items-start justify-between flex-wrap gap-3">
//         <div>
//           <h1 className="text-xl font-heading font-bold text-foreground tracking-tight">Overview</h1>
//           <p className="text-xs text-muted-foreground font-mono mt-0.5">{domain} · Last run {fmtDate(lastRun)}</p>
//         </div>
//         <div className="flex items-center gap-2 flex-wrap">
//           <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted border border-border text-xs text-muted-foreground font-mono">
//             <span className="w-2 h-2 rounded-full bg-emerald animate-pulse shrink-0"/>
//             Pipeline: {plan?.pipeline_status ?? "idle"}
//           </div>
//           <a href="/onboarding" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald text-white text-xs font-semibold hover:opacity-90 transition-opacity">
//             <Plus className="h-3.5 w-3.5"/> New Project
//           </a>
//         </div>
//       </div>

//       {/* ── Score Hero ──────────────────────────────────────────────────── */}
//       <div className="bg-card border border-border rounded-2xl p-6">
//         {/* Top row: ring + text + breakdown bars */}
//         <div className="flex flex-wrap gap-6 items-start">

//           {/* Ring */}
//           <div className="relative w-28 h-28 shrink-0">
//             <svg className="-rotate-90 w-full h-full" viewBox="0 0 110 110">
//               <circle cx="55" cy="55" r="46" fill="none" stroke="var(--border)" strokeWidth="8"/>
//               <circle cx="55" cy="55" r="46" fill="none" stroke="var(--emerald)" strokeWidth="8"
//                 strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
//                 className="transition-all duration-700"/>
//             </svg>
//             <div className="absolute inset-0 flex flex-col items-center justify-center">
//               <span className="font-heading text-3xl font-bold text-foreground leading-none">{score}</span>
//               <span className="text-[10px] font-mono text-muted-foreground">/100</span>
//             </div>
//           </div>

//           {/* Label + summary text + trend */}
//           <div className="flex-1 min-w-[200px]">
//             <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-1">
//               AEO Score · {new Date().toLocaleDateString("en-GB",{month:"long",year:"numeric"})}
//             </p>
//             <h2 className="font-heading text-xl font-bold text-foreground mb-2">
//               {score>=80?"Strong Visibility":score>=50?"Moderate Visibility":"Low Visibility"}
//             </h2>
//             <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
//               {overview
//                 ? `Brand appears in ${overview.visibilityRate}% of AI answers with ${overview.brandWins} outright wins and ${overview.noVisibility} missed prompts.`
//                 : "Run the pipeline to generate your AEO score."}
//             </p>
//             {scoreData && (
//               <div className="flex items-center gap-1.5 mt-2">
//                 <TrendIcon trend={scoreData.trend}/>
//                 <span className="text-xs font-mono text-muted-foreground">
//                   {scoreData.change>0?`+${scoreData.change}`:scoreData.change} pts from last run
//                 </span>
//               </div>
//             )}
//           </div>

//           {/* Breakdown bars */}
//           {breakdownItems.length>0 && (
//             <div className="flex flex-col gap-2.5 min-w-[210px] w-full sm:w-auto">
//               {breakdownItems.map(b=>(
//                 <div key={b.label} className="flex flex-col gap-1">
//                   <div className="flex justify-between text-[11px]">
//                     <span className="text-foreground/70 font-medium">{b.label}</span>
//                     <span className="font-mono text-muted-foreground">{b.value}/{b.max}</span>
//                   </div>
//                   <div className="h-1.5 bg-muted rounded-full overflow-hidden">
//                     <div className="h-full rounded-full transition-all duration-700"
//                       style={{width:`${Math.min((b.value/b.max)*100,100)}%`,background:scoreColor(b.value,b.max)}}/>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* AI Explanation — sits below the top row, only when score exists */}
//         {score > 0 && planId && token && (
//           <div className="mt-4 pt-4 border-t border-border/50">
//             <ScoreExplanationPanel planId={planId} token={token}/>
//           </div>
//         )}
//       </div>

//       {/* Stat Cards */}
//       {statCards.length>0 && (
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//           {statCards.map(s=>(
//             <div key={s.label} className="bg-card border border-border rounded-xl p-5">
//               <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-2">{s.label}</p>
//               <p className={cn("font-heading text-3xl font-bold leading-none mb-1.5",
//                 s.trend==="up"?"text-emerald":s.trend==="down"?"text-destructive":"text-foreground")}>
//                 {s.value}
//               </p>
//               <div className="flex items-center gap-1">
//                 <TrendIcon trend={s.trend}/>
//                 <span className="text-xs text-muted-foreground">{s.sub}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Two-col */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

//         {/* Prompt Visibility */}
//         <div className="bg-card border border-border rounded-xl overflow-hidden">
//           <div className="flex items-center justify-between px-5 py-4 border-b border-border">
//             <h3 className="font-heading text-sm font-semibold text-foreground">Prompt Visibility</h3>
//             <a href="/dashboard/visibility" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5">
//               View all <ChevronRight className="h-3 w-3"/>
//             </a>
//           </div>
//           <div className="grid grid-cols-[1fr_64px_64px_64px] px-5 py-2 bg-muted/50 border-b border-border">
//             {["Prompt","Gemini","GPT-4o","Perplxty"].map(h=>(
//               <div key={h} className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground text-center first:text-left">{h}</div>
//             ))}
//           </div>
//           {promptRows.length===0 ? (
//             <div className="px-5 py-8 text-center text-xs text-muted-foreground">No visibility data yet — run the pipeline first.</div>
//           ) : (
//             promptRows.map(p=>{
//               const gemini:  MentionStatus = p.engines?.gemini  ?(p.engines.gemini.mentioned  ?"yes":"no"):"no"
//               const chatgpt: MentionStatus = p.engines?.chatgpt ?(p.engines.chatgpt.mentioned ?"yes":"no"):"no"
//               return (
//                 <div key={p.id} className="grid grid-cols-[1fr_64px_64px_64px] px-5 py-3 border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
//                   <span className="text-xs font-medium text-foreground/80 truncate pr-2">{p.question}</span>
//                   <MentionIcon status={gemini}/>
//                   <MentionIcon status={chatgpt}/>
//                   <MentionIcon status="locked"/>
//                 </div>
//               )
//             })
//           )}
//           <div className="px-5 py-3 bg-violet/5 border-t border-violet/10 flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <Lock className="h-3.5 w-3.5 text-violet"/>
//               <span className="text-xs text-violet font-medium">Unlock Perplexity tracking</span>
//             </div>
//             <a href="/billing" className="text-[10px] font-semibold text-violet hover:text-violet-light">Upgrade to Pro →</a>
//           </div>
//         </div>

//         {/* Competitors */}
//         <div className="bg-card border border-border rounded-xl overflow-hidden">
//           <div className="flex items-center justify-between px-5 py-4 border-b border-border">
//             <h3 className="font-heading text-sm font-semibold text-foreground">Top Competing Brands</h3>
//             <a href="/dashboard/competitors" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5">
//               Manage <ChevronRight className="h-3 w-3"/>
//             </a>
//           </div>
//           {allCompetitors.length===0 ? (
//             <div className="px-5 py-8 text-center text-xs text-muted-foreground">No competitors tracked yet.</div>
//           ) : (
//             allCompetitors.map(c=>{
//               const isSuggested = suggestions.some(s=>s.id===c.id)
//               const isAccepted  = accepted.includes(c.name)
//               const rate        = Math.round((c.confidence_score??0)*100)
//               return (
//                 <div key={c.id} className={cn("flex items-center gap-3 px-5 py-3.5 border-b border-border last:border-0 transition-colors",
//                   isSuggested&&!isAccepted?"bg-amber/5":"hover:bg-muted/30")}>
//                   <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0",
//                     isSuggested?"bg-amber/10 text-amber border border-amber/20":"bg-muted text-foreground border border-border")}>
//                     {(c.name||"?").charAt(0).toUpperCase()}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center gap-2 flex-wrap">
//                       <span className="text-sm font-semibold text-foreground">{c.name}</span>
//                       {isSuggested&&<span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber/10 text-amber border border-amber/20 font-mono">NEW</span>}
//                     </div>
//                     <span className="text-[11px] text-muted-foreground font-mono">{c.domain}</span>
//                   </div>
//                   {isSuggested&&!isAccepted ? (
//                     <div className="flex gap-2 shrink-0">
//                       <button onClick={()=>handleAccept(c.id,c.name)} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-emerald/10 text-emerald border border-emerald/20 hover:bg-emerald/20 transition-colors">Add</button>
//                       <button onClick={()=>handleIgnore(c.id,c.name)} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20 transition-colors">Skip</button>
//                     </div>
//                   ) : (
//                     <div className="shrink-0 text-right min-w-[70px]">
//                       <p className={cn("text-sm font-bold font-mono",rateColor(rate))}>
//                         {rate>0?`${rate}%`:isAccepted?"Tracking":"—"}
//                       </p>
//                       {rate>0&&(
//                         <div className="mt-1 h-1 w-16 ml-auto bg-muted rounded-full overflow-hidden">
//                           <div className={cn("h-full rounded-full",rateBarColor(rate))} style={{width:`${rate}%`}}/>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               )
//             })
//           )}
//         </div>
//       </div>

//       {/* Recommendations */}
//       <div className="bg-card border border-border rounded-xl overflow-hidden">
//         <div className="flex items-center justify-between px-5 py-4 border-b border-border">
//           <h3 className="font-heading text-sm font-semibold text-foreground">Top Recommendations</h3>
//           <a href="/dashboard/recommendations" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5">
//             View all <ChevronRight className="h-3 w-3"/>
//           </a>
//         </div>
//         {recs.length===0 ? (
//           <div className="px-5 py-8 text-center text-xs text-muted-foreground">No recommendations yet — run the pipeline first.</div>
//         ) : (
//           recs.map(r=>(
//             <div key={r.id} className="flex items-start gap-4 px-5 py-4 border-b border-border last:border-0 hover:bg-muted/30 transition-colors group">
//               <div className="w-9 h-9 rounded-xl bg-muted border border-border flex items-center justify-center text-base shrink-0 group-hover:scale-105 transition-transform">
//                 {patternIcon(r.pattern)}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-semibold text-foreground mb-1">{r.summary}</p>
//                 <p className="text-xs text-emerald font-mono">{r.expected_impact}</p>
//               </div>
//               <div className="shrink-0 pt-0.5"><DiffBadge level={toDiff(r.priority)}/></div>
//             </div>
//           ))
//         )}
//       </div>

//     </div>
//   )
// }








// "use client"

// import { useState, useEffect, useCallback } from "react"
// import { supabaseBrowser } from "@/lib/supabaseClient"
// import { usePlanId } from "@/hooks/usePlanId"
// import {
//   Plus, ChevronRight, CheckCircle2, XCircle,
//   Lock, TrendingUp, TrendingDown, Minus, Loader2,
//   ChevronDown, ChevronUp, Sparkles,
// } from "lucide-react"
// import { cn } from "@/lib/utils"

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

// type MentionStatus = "yes" | "no" | "locked"
// type DiffLevel     = "Easy" | "Medium" | "Hard"

// interface BreakdownComponent { category: string; points: number; max: number; explanation?: string }
// interface BreakdownItem      { label: string; value: number; max: number; explanation?: string }

// interface OverviewData {
//   pages: number; totalPrompts: number; brandMentioned: number; brandWins: number
//   brandLosses: number; noVisibility: number; visibilityRate: number; winRate: number
//   competitorDominance: number; noVisibilityRate: number; trustScore: number
// }

// interface ScoreData {
//   score:     number
//   breakdown: { scoreComponents: BreakdownComponent[] }
//   trend:     "up" | "down" | "stable"
//   change:    number
// }

// // Maps to aeo_score_explanations table columns
// interface ScoreExplanationData {
//   score:           number
//   headline:        string | null
//   explanation:     string | null
//   what_is_working: string[]
//   top_issues:      string[]
//   improvements:    { title: string; description: string; impact?: string }[]
//   recommendations: string | null
// }

// interface PromptRow {
//   id: string; question: string
//   engines: Record<string, { mentioned: boolean; position: number | null }>
//   status: "win" | "shared" | "missed"
// }

// interface Competitor { id: string; name: string; domain: string; confidence_score: number; status: string }
// interface Recommendation { id: string; summary: string; expected_impact: string; priority: "high"|"medium"|"low"; pattern: string }

// // ── Helpers ────────────────────────────────────────────────────────────────
// const scoreColor   = (v: number, m: number) => { const p = v/m; return p>=.85?"#0FBF9A":p>=.45?"#F4B740":"#EF4444" }
// const rateColor    = (r: number) => r>=40?"text-destructive":r>=20?"text-amber":"text-muted-foreground"
// const rateBarColor = (r: number) => r>=40?"bg-destructive":r>=20?"bg-amber":"bg-muted-foreground"

// function MentionIcon({ status }: { status: MentionStatus }) {
//   if (status==="yes") return <CheckCircle2 className="h-4 w-4 text-emerald mx-auto"/>
//   if (status==="no")  return <XCircle      className="h-4 w-4 text-destructive mx-auto"/>
//   return <div className="flex items-center justify-center"><Lock className="h-3.5 w-3.5 text-muted-foreground"/></div>
// }

// function DiffBadge({ level }: { level: DiffLevel }) {
//   const cls = {
//     Easy:   "bg-emerald/10 text-emerald border-emerald/20",
//     Medium: "bg-amber/10 text-amber border-amber/20",
//     Hard:   "bg-destructive/10 text-destructive border-destructive/20",
//   }[level]
//   return <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full border font-mono", cls)}>{level}</span>
// }

// function TrendIcon({ trend }: { trend?: string }) {
//   if (trend==="up")   return <TrendingUp   className="h-3.5 w-3.5 text-emerald"/>
//   if (trend==="down") return <TrendingDown className="h-3.5 w-3.5 text-destructive"/>
//   return                     <Minus        className="h-3.5 w-3.5 text-muted-foreground"/>
// }

// const patternIcon = (p: string) => p==="missed"?"🎯":p==="losing"?"⚡":p==="competing"?"🧩":"✨"
// const toDiff      = (p: string): DiffLevel => p==="high"?"Hard":p==="medium"?"Medium":"Easy"
// const fmtDate     = (d: string|null) => d
//   ? new Date(d).toLocaleDateString("en-GB", { day:"numeric", month:"short", year:"numeric" })
//   : "Never"

// // ── Score Explanation Dropdown ─────────────────────────────────────────────
// // Loads from aeo_score_explanations via /aeo/score/:planId/explanation
// // No generation — reads saved data only
// function ScoreExplanationDropdown({
//   planId, token, score,
// }: {
//   planId: string; token: string; score: number
// }) {
//   const [open,        setOpen]        = useState(false)
//   const [explanation, setExplanation] = useState<ScoreExplanationData | null>(null)
//   const [loading,     setLoading]     = useState(false)
//   const [fetched,     setFetched]     = useState(false)

//   // Load when first opened
//   useEffect(() => {
//     if (!open || fetched) return
//     const load = async () => {
//       setLoading(true)
//       try {
//         const res = await fetch(`${BACKEND_URL}/aeo/score/${planId}/explanation`, {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         if (res.ok) {
//           const j = await res.json()
//           const d = j?.data ?? j
//           // Only set if the response has actual explanation content
//           if (d?.explanation || d?.headline || d?.what_is_working?.length) {
//             setExplanation(d)
//           }
//         }
//       } catch { /* silent */ }
//       finally { setLoading(false); setFetched(true) }
//     }
//     load()
//   }, [open, fetched, planId, token])

//   return (
//     <div className="mt-4 pt-4 border-t border-border/50">
//       {/* Toggle button */}
//       <button
//         onClick={() => setOpen(o => !o)}
//         className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet/10 border border-violet/20 text-violet text-[11px] font-semibold hover:bg-violet/20 transition-colors"
//       >
//         <Sparkles className="h-3 w-3"/>
//         Score Explanation
//         {open ? <ChevronUp className="h-3 w-3"/> : <ChevronDown className="h-3 w-3"/>}
//       </button>

//       {open && (
//         <div className="mt-3 rounded-xl border border-violet/15 bg-violet/[0.03] p-4 max-w-2xl">

//           {loading && (
//             <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-mono">
//               <Loader2 className="h-3 w-3 animate-spin"/> Loading explanation…
//             </div>
//           )}

//           {!loading && !explanation && (
//             <p className="text-[11px] text-muted-foreground font-mono">
//               No explanation available yet — run the pipeline to generate one.
//             </p>
//           )}

//           {!loading && explanation && (
//             <div className="flex flex-col gap-4">

//               {/* Headline */}
//               {explanation.headline && (
//                 <p className="text-sm font-semibold text-foreground">{explanation.headline}</p>
//               )}

//               {/* Summary explanation */}
//               {explanation.explanation && (
//                 <p className="text-xs text-foreground/70 leading-relaxed">{explanation.explanation}</p>
//               )}

//               {/* What's working */}
//               {explanation.what_is_working?.length > 0 && (
//                 <div>
//                   <p className="text-[10px] font-mono font-bold text-emerald uppercase tracking-wider mb-2">What's working</p>
//                   <ul className="flex flex-col gap-1.5">
//                     {explanation.what_is_working.map((s, i) => (
//                       <li key={i} className="flex items-start gap-2 text-[11px] text-foreground/70 leading-relaxed">
//                         <CheckCircle2 className="h-3 w-3 text-emerald shrink-0 mt-0.5"/>{s}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               {/* Top issues */}
//               {explanation.top_issues?.length > 0 && (
//                 <div>
//                   <p className="text-[10px] font-mono font-bold text-destructive uppercase tracking-wider mb-2">Top issues</p>
//                   <ul className="flex flex-col gap-1.5">
//                     {explanation.top_issues.map((g, i) => (
//                       <li key={i} className="flex items-start gap-2 text-[11px] text-foreground/70 leading-relaxed">
//                         <XCircle className="h-3 w-3 text-destructive shrink-0 mt-0.5"/>{g}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               {/* Improvements */}
//               {explanation.improvements?.length > 0 && (
//                 <div>
//                   <p className="text-[10px] font-mono font-bold text-amber uppercase tracking-wider mb-2">Improvements</p>
//                   <div className="flex flex-col gap-2">
//                     {explanation.improvements.map((imp, i) => (
//                       <div key={i} className="flex items-start gap-3 px-3 py-2.5 rounded-lg bg-amber/5 border border-amber/15">
//                         <span className="text-amber font-bold text-[11px] font-mono shrink-0 mt-0.5">{i + 1}.</span>
//                         <div className="flex-1 min-w-0">
//                           <p className="text-[11px] font-semibold text-foreground mb-0.5">{imp.title}</p>
//                           <p className="text-[11px] text-foreground/60 leading-relaxed">{imp.description}</p>
//                           {imp.impact && (
//                             <p className="text-[10px] text-emerald font-mono mt-1">{imp.impact}</p>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Recommendations text block */}
//               {explanation.recommendations && (
//                 <div className="px-3 py-2.5 rounded-lg bg-muted/50 border border-border">
//                   <p className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Recommendations</p>
//                   <p className="text-[11px] text-foreground/70 leading-relaxed whitespace-pre-line">
//                     {explanation.recommendations}
//                   </p>
//                 </div>
//               )}

//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

// // ── Page ───────────────────────────────────────────────────────────────────
// export default function OverviewPage() {
//   const planId = usePlanId()

//   const [overview,    setOverview]    = useState<OverviewData | null>(null)
//   const [scoreData,   setScoreData]   = useState<ScoreData | null>(null)
//   const [promptRows,  setPromptRows]  = useState<PromptRow[]>([])
//   const [competitors, setCompetitors] = useState<Competitor[]>([])
//   const [suggestions, setSuggestions] = useState<Competitor[]>([])
//   const [recs,        setRecs]        = useState<Recommendation[]>([])
//   const [plan,        setPlan]        = useState<any>(null)
//   const [token,       setToken]       = useState("")
//   const [loading,     setLoading]     = useState(true)
//   const [dismissed,   setDismissed]   = useState<string[]>([])
//   const [accepted,    setAccepted]    = useState<string[]>([])
//   const [mounted,     setMounted]     = useState(false)

//   const load = useCallback(async () => {
//     if (!planId) return
//     setLoading(true)
//     try {
//       const { data: s } = await supabaseBrowser.auth.getSession()
//       const t = s?.session?.access_token
//       if (!t) return
//       setToken(t)
//       const h = { Authorization: `Bearer ${t}` }

//       const [ovR, scR, viR, coR, reR] = await Promise.allSettled([
//         fetch(`${BACKEND_URL}/aeo/overview/simple?planId=${planId}`, { headers: h }),
//         fetch(`${BACKEND_URL}/aeo/score/${planId}`,                  { headers: h }),
//         fetch(`${BACKEND_URL}/aeo/visibility?planId=${planId}`,      { headers: h }),
//         fetch(`${BACKEND_URL}/aeo/competitors/${planId}`,            { headers: h }),
//         fetch(`${BACKEND_URL}/aeo/recommendations?planId=${planId}`, { headers: h }),
//       ])

//       // ── Overview — source of truth for all stat cards ──────────────────
//       if (ovR.status==="fulfilled" && ovR.value.ok) {
//         const j = await ovR.value.json()
//         const d = j?.data ?? j
//         setOverview(d)
//         if (d?.plan) setPlan(d.plan)
//       }

//       // ── Score ──────────────────────────────────────────────────────────
//       if (scR.status==="fulfilled" && scR.value.ok) {
//         const j = await scR.value.json()
//         const d = j?.data ?? j
//         setScoreData({ score: d.score, breakdown: d.breakdown, trend: d.trend, change: d.change })
//         if (d?.plan && !plan) setPlan((p: any) => p ?? d.plan)
//       }

//       // ── Visibility — prompt table only ────────────────────────────────
//       if (viR.status==="fulfilled" && viR.value.ok) {
//         const j = await viR.value.json()
//         const d = j?.data ?? j
//         setPromptRows((d?.prompts ?? []).slice(0, 5))
//         if (d?.plan) setPlan((p: any) => p ?? d.plan)
//       }

//       // ── Competitors ───────────────────────────────────────────────────
//       if (coR.status==="fulfilled" && coR.value.ok) {
//         const j = await coR.value.json()
//         const d = j?.data ?? j
//         setCompetitors((d?.competitors ?? []).slice(0, 4))
//         setSuggestions((d?.suggestions ?? []).slice(0, 2))
//       }

//       // ── Recommendations ───────────────────────────────────────────────
//       if (reR.status==="fulfilled" && reR.value.ok) {
//         const j = await reR.value.json()
//         setRecs((j?.data?.recommendations ?? j?.recommendations ?? []).slice(0, 3))
//       }

//     } catch(e) { console.error("Overview load error:", e) }
//     finally    { setLoading(false) }
//   }, [planId])

//   useEffect(() => { setMounted(true) }, [])
//   useEffect(() => { load() },          [load])

//   const handleAccept = async (id: string, name: string) => {
//     setAccepted(a => [...a, name])
//     const { data: s } = await supabaseBrowser.auth.getSession()
//     const t = s?.session?.access_token
//     await fetch(`${BACKEND_URL}/aeo/competitors/${id}/accept`, {
//       method: "PUT",
//       headers: { Authorization: `Bearer ${t!}`, "Content-Type": "application/json" },
//       body: JSON.stringify({ planId }),
//     })
//   }

//   const handleIgnore = async (id: string, name: string) => {
//     setDismissed(d => [...d, name])
//     const { data: s } = await supabaseBrowser.auth.getSession()
//     const t = s?.session?.access_token
//     await fetch(`${BACKEND_URL}/aeo/competitors/${id}/ignore`, {
//       method: "PUT",
//       headers: { Authorization: `Bearer ${t!}`, "Content-Type": "application/json" },
//       body: JSON.stringify({ planId }),
//     })
//   }

//   if (!mounted) return <div className="flex items-center justify-center min-h-screen"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground"/></div>
//   if (!planId)  return <div className="flex flex-col items-center justify-center min-h-screen gap-3"><p className="text-sm text-muted-foreground">No project selected.</p><a href="/dashboard" className="text-xs text-emerald underline">Go to Dashboard</a></div>
//   if (loading)  return <div className="flex items-center justify-center min-h-screen"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground"/></div>

//   const score         = scoreData?.score ?? 0
//   const circumference = 2 * Math.PI * 46
//   const offset        = circumference - (score / 100) * circumference

//   // Breakdown bars — from score endpoint components
//   const breakdownItems: BreakdownItem[] = scoreData?.breakdown?.scoreComponents?.length
//     ? scoreData.breakdown.scoreComponents.map(c => ({
//         label:       c.category,
//         value:       c.points,
//         max:         c.max,
//         explanation: c.explanation,
//       }))
//     : overview
//     ? [
//         { label: "Brand Presence",       value: overview.visibilityRate,            max: 100 },
//         // ── Corrected: win rate = brandWins / totalPrompts × 100 ──────────
//         { label: "Win Rate",             value: overview.winRate,                   max: 100 },
//         { label: "Competitive Position", value: 100 - overview.competitorDominance, max: 100 },
//       ]
//     : []

//   const statCards = overview ? [
//     {
//       label: "Brand Presence",
//       value: `${overview.visibilityRate}%`,
//       // Shows: "19 of 20 prompts" — brandMentioned is prompt-level, not answer-level
//       sub:   `${overview.brandMentioned} of ${overview.totalPrompts} prompts`,
//       trend: "neutral" as const,
//     },
//     {
//       label: "Wins",
//       value: String(overview.brandWins),
//       // Win rate = wins / total prompts (not wins / mentioned)
//       sub:   `${overview.winRate}% win rate · ${overview.brandWins} of ${overview.totalPrompts} prompts`,
//       trend: "up" as const,
//     },
//     {
//       label: "Missed Prompts",
//       value: String(overview.noVisibility),
//       sub:   `${overview.noVisibilityRate}% no visibility`,
//       trend: "down" as const,
//     },
//     {
//       label: "Schemas Generated",
//       value: String(overview.pages),
//       sub:   `${overview.pages} pages covered`,
//       trend: "up" as const,
//     },
//   ] : []

//   const domain   = plan?.website_url?.replace(/^https?:\/\//, "").replace(/\/$/, "") ?? plan?.domain ?? "—"
//   const lastRun  = plan?.last_full_pipeline ?? plan?.last_daily_tracking ?? null
//   const allComps = [
//     ...competitors,
//     ...suggestions.filter(s => !dismissed.includes(s.name) && !accepted.includes(s.name)),
//   ]

//   return (
//     <div className="flex flex-col gap-6 p-6 min-h-screen bg-background">

//       {/* Topbar */}
//       <div className="flex items-start justify-between flex-wrap gap-3">
//         <div>
//           <h1 className="text-xl font-heading font-bold text-foreground tracking-tight">Overview</h1>
//           <p className="text-xs text-muted-foreground font-mono mt-0.5">{domain} · Last run {fmtDate(lastRun)}</p>
//         </div>
//         <div className="flex items-center gap-2 flex-wrap">
//           <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted border border-border text-xs text-muted-foreground font-mono">
//             <span className="w-2 h-2 rounded-full bg-emerald animate-pulse shrink-0"/>
//             Pipeline: {plan?.pipeline_status ?? "idle"}
//           </div>
//           <a href="/onboarding" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald text-white text-xs font-semibold hover:opacity-90 transition-opacity">
//             <Plus className="h-3.5 w-3.5"/> New Project
//           </a>
//         </div>
//       </div>

//       {/* Score Hero */}
//       <div className="bg-card border border-border rounded-2xl p-6">
//         <div className="flex flex-wrap gap-6 items-start">

//           {/* Ring */}
//           <div className="relative w-28 h-28 shrink-0">
//             <svg className="-rotate-90 w-full h-full" viewBox="0 0 110 110">
//               <circle cx="55" cy="55" r="46" fill="none" stroke="var(--border)" strokeWidth="8"/>
//               <circle cx="55" cy="55" r="46" fill="none" stroke="var(--emerald)" strokeWidth="8"
//                 strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
//                 className="transition-all duration-700"/>
//             </svg>
//             <div className="absolute inset-0 flex flex-col items-center justify-center">
//               <span className="font-heading text-3xl font-bold text-foreground leading-none">{score}</span>
//               <span className="text-[10px] font-mono text-muted-foreground">/100</span>
//             </div>
//           </div>

//           {/* Label + summary + trend */}
//           <div className="flex-1 min-w-[200px]">
//             <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-1">
//               AEO Score · {new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
//             </p>
//             <h2 className="font-heading text-xl font-bold text-foreground mb-2">
//               {score>=80 ? "Strong Visibility" : score>=50 ? "Moderate Visibility" : "Low Visibility"}
//             </h2>
//             <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
//               {overview
//                 ? `Brand appears in ${overview.visibilityRate}% of AI answers with ${overview.brandWins} outright wins and ${overview.noVisibility} missed prompt${overview.noVisibility !== 1 ? "s" : ""}.`
//                 : "Run the pipeline to generate your AEO score."}
//             </p>
//             {scoreData && (
//               <div className="flex items-center gap-1.5 mt-2">
//                 <TrendIcon trend={scoreData.trend}/>
//                 <span className="text-xs font-mono text-muted-foreground">
//                   {scoreData.change > 0 ? `+${scoreData.change}` : scoreData.change} pts from last run
//                 </span>
//               </div>
//             )}
//           </div>

//           {/* Breakdown bars */}
//           {breakdownItems.length > 0 && (
//             <div className="flex flex-col gap-2.5 min-w-[210px] w-full sm:w-auto">
//               {breakdownItems.map(b => (
//                 <div key={b.label} className="flex flex-col gap-1">
//                   <div className="flex justify-between text-[11px]">
//                     <span className="text-foreground/70 font-medium">{b.label}</span>
//                     <span className="font-mono text-muted-foreground">{b.value}/{b.max}</span>
//                   </div>
//                   <div className="h-1.5 bg-muted rounded-full overflow-hidden">
//                     <div className="h-full rounded-full transition-all duration-700"
//                       style={{ width: `${Math.min((b.value/b.max)*100, 100)}%`, background: scoreColor(b.value, b.max) }}/>
//                   </div>
//                   {b.explanation && (
//                     <p className="text-[10px] text-muted-foreground leading-snug">{b.explanation}</p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Score Explanation dropdown — reads from aeo_score_explanations */}
//         {score > 0 && planId && token && (
//           <ScoreExplanationDropdown planId={planId} token={token} score={score}/>
//         )}
//       </div>

//       {/* Stat Cards */}
//       {statCards.length > 0 && (
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//           {statCards.map(s => (
//             <div key={s.label} className="bg-card border border-border rounded-xl p-5">
//               <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-2">{s.label}</p>
//               <p className={cn("font-heading text-3xl font-bold leading-none mb-1.5",
//                 s.trend==="up"?"text-emerald":s.trend==="down"?"text-destructive":"text-foreground")}>
//                 {s.value}
//               </p>
//               <div className="flex items-center gap-1">
//                 <TrendIcon trend={s.trend}/>
//                 <span className="text-xs text-muted-foreground">{s.sub}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Two-col: Prompt Visibility + Competitors */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

//         {/* Prompt Visibility */}
//         <div className="bg-card border border-border rounded-xl overflow-hidden">
//           <div className="flex items-center justify-between px-5 py-4 border-b border-border">
//             <h3 className="font-heading text-sm font-semibold text-foreground">Prompt Visibility</h3>
//             <a href="/dashboard/visibility" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5">
//               View all <ChevronRight className="h-3 w-3"/>
//             </a>
//           </div>
//           <div className="grid grid-cols-[1fr_64px_64px_64px] px-5 py-2 bg-muted/50 border-b border-border">
//             {["Prompt", "Gemini", "GPT-4o", "Perplxty"].map(h => (
//               <div key={h} className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground text-center first:text-left">{h}</div>
//             ))}
//           </div>
//           {promptRows.length === 0 ? (
//             <div className="px-5 py-8 text-center text-xs text-muted-foreground">No visibility data yet — run the pipeline first.</div>
//           ) : (
//             promptRows.map(p => {
//               const gemini:  MentionStatus = p.engines?.gemini  ? (p.engines.gemini.mentioned  ? "yes" : "no") : "no"
//               const chatgpt: MentionStatus = p.engines?.chatgpt ? (p.engines.chatgpt.mentioned ? "yes" : "no") : "no"
//               return (
//                 <div key={p.id} className="grid grid-cols-[1fr_64px_64px_64px] px-5 py-3 border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
//                   <span className="text-xs font-medium text-foreground/80 truncate pr-2">{p.question}</span>
//                   <MentionIcon status={gemini}/>
//                   <MentionIcon status={chatgpt}/>
//                   <MentionIcon status="locked"/>
//                 </div>
//               )
//             })
//           )}
//           <div className="px-5 py-3 bg-violet/5 border-t border-violet/10 flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <Lock className="h-3.5 w-3.5 text-violet"/>
//               <span className="text-xs text-violet font-medium">Unlock Perplexity tracking</span>
//             </div>
//             <a href="/billing" className="text-[10px] font-semibold text-violet hover:text-violet-light">Upgrade to Pro →</a>
//           </div>
//         </div>

//         {/* Competitors */}
//         <div className="bg-card border border-border rounded-xl overflow-hidden">
//           <div className="flex items-center justify-between px-5 py-4 border-b border-border">
//             <h3 className="font-heading text-sm font-semibold text-foreground">Top Competing Brands</h3>
//             <a href="/dashboard/competitors" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5">
//               Manage <ChevronRight className="h-3 w-3"/>
//             </a>
//           </div>
//           {allComps.length === 0 ? (
//             <div className="px-5 py-8 text-center text-xs text-muted-foreground">No competitors tracked yet.</div>
//           ) : (
//             allComps.map(c => {
//               const isSuggested = suggestions.some(s => s.id === c.id)
//               const isAccepted  = accepted.includes(c.name)
//               const rate        = Math.round((c.confidence_score ?? 0) * 100)
//               return (
//                 <div key={c.id} className={cn(
//                   "flex items-center gap-3 px-5 py-3.5 border-b border-border last:border-0 transition-colors",
//                   isSuggested && !isAccepted ? "bg-amber/5" : "hover:bg-muted/30"
//                 )}>
//                   <div className={cn(
//                     "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0",
//                     isSuggested ? "bg-amber/10 text-amber border border-amber/20" : "bg-muted text-foreground border border-border"
//                   )}>
//                     {(c.name || "?").charAt(0).toUpperCase()}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center gap-2 flex-wrap">
//                       <span className="text-sm font-semibold text-foreground">{c.name}</span>
//                       {isSuggested && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber/10 text-amber border border-amber/20 font-mono">NEW</span>}
//                     </div>
//                     <span className="text-[11px] text-muted-foreground font-mono">{c.domain}</span>
//                   </div>
//                   {isSuggested && !isAccepted ? (
//                     <div className="flex gap-2 shrink-0">
//                       <button onClick={() => handleAccept(c.id, c.name)} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-emerald/10 text-emerald border border-emerald/20 hover:bg-emerald/20 transition-colors">Add</button>
//                       <button onClick={() => handleIgnore(c.id, c.name)} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20 transition-colors">Skip</button>
//                     </div>
//                   ) : (
//                     <div className="shrink-0 text-right min-w-[70px]">
//                       <p className={cn("text-sm font-bold font-mono", rateColor(rate))}>
//                         {rate > 0 ? `${rate}%` : isAccepted ? "Tracking" : "—"}
//                       </p>
//                       {rate > 0 && (
//                         <div className="mt-1 h-1 w-16 ml-auto bg-muted rounded-full overflow-hidden">
//                           <div className={cn("h-full rounded-full", rateBarColor(rate))} style={{ width: `${rate}%` }}/>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               )
//             })
//           )}
//         </div>
//       </div>

//       {/* Recommendations */}
//       <div className="bg-card border border-border rounded-xl overflow-hidden">
//         <div className="flex items-center justify-between px-5 py-4 border-b border-border">
//           <h3 className="font-heading text-sm font-semibold text-foreground">Top Recommendations</h3>
//           <a href="/dashboard/recommendations" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5">
//             View all <ChevronRight className="h-3 w-3"/>
//           </a>
//         </div>
//         {recs.length === 0 ? (
//           <div className="px-5 py-8 text-center text-xs text-muted-foreground">No recommendations yet — run the pipeline first.</div>
//         ) : (
//           recs.map(r => (
//             <div key={r.id} className="flex items-start gap-4 px-5 py-4 border-b border-border last:border-0 hover:bg-muted/30 transition-colors group">
//               <div className="w-9 h-9 rounded-xl bg-muted border border-border flex items-center justify-center text-base shrink-0 group-hover:scale-105 transition-transform">
//                 {patternIcon(r.pattern)}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-semibold text-foreground mb-1">{r.summary}</p>
//                 <p className="text-xs text-emerald font-mono">{r.expected_impact}</p>
//               </div>
//               <div className="shrink-0 pt-0.5"><DiffBadge level={toDiff(r.priority)}/></div>
//             </div>
//           ))
//         )}
//       </div>

//     </div>
//   )
// }














// "use client"

// import { useState, useEffect, useCallback } from "react"
// import { supabaseBrowser } from "@/lib/supabaseClient"
// import { usePlanId } from "@/hooks/usePlanId"
// import {
//   Plus, ChevronRight, CheckCircle2, XCircle,
//   Lock, TrendingUp, TrendingDown, Minus, Loader2,
//   ChevronDown, ChevronUp, Sparkles,
// } from "lucide-react"
// import { cn } from "@/lib/utils"

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

// type MentionStatus = "yes" | "no" | "locked"
// type DiffLevel     = "Easy" | "Medium" | "Hard"

// interface BreakdownComponent { category: string; points: number; max: number; explanation?: string }
// interface BreakdownItem      { label: string; value: number; max: number; explanation?: string }

// interface OverviewData {
//   pages: number; totalPrompts: number; brandMentioned: number; brandWins: number
//   brandLosses: number; noVisibility: number; visibilityRate: number; winRate: number
//   competitorDominance: number; noVisibilityRate: number; trustScore: number
// }

// interface ScoreData {
//   score:     number
//   breakdown: { scoreComponents: BreakdownComponent[] }
//   trend:     "up" | "down" | "stable"
//   change:    number
// }

// // Maps to aeo_score_explanations table columns
// interface ScoreExplanationData {
//   score:           number
//   headline:        string | null
//   explanation:     string | null
//   what_is_working: string[]
//   top_issues:      string[]
//   improvements:    { title: string; description: string; impact?: string }[]
//   recommendations: string | null
// }

// interface PromptRow {
//   id: string; question: string
//   engines: Record<string, { mentioned: boolean; position: number | null }>
//   status: "win" | "shared" | "missed"
// }

// interface Competitor { id: string; name: string; domain: string; confidence_score: number; status: string }
// interface Recommendation { id: string; summary: string; expected_impact: string; priority: "high"|"medium"|"low"; pattern: string }

// // ── Helpers ────────────────────────────────────────────────────────────────
// const scoreColor   = (v: number, m: number) => { const p = v/m; return p>=.85?"#0FBF9A":p>=.45?"#F4B740":"#EF4444" }
// const rateColor    = (r: number) => r>=40?"text-destructive":r>=20?"text-amber":"text-muted-foreground"
// const rateBarColor = (r: number) => r>=40?"bg-destructive":r>=20?"bg-amber":"bg-muted-foreground"

// function MentionIcon({ status }: { status: MentionStatus }) {
//   if (status==="yes") return <CheckCircle2 className="h-4 w-4 text-emerald mx-auto"/>
//   if (status==="no")  return <XCircle      className="h-4 w-4 text-destructive mx-auto"/>
//   return <div className="flex items-center justify-center"><Lock className="h-3.5 w-3.5 text-muted-foreground"/></div>
// }

// function DiffBadge({ level }: { level: DiffLevel }) {
//   const cls = {
//     Easy:   "bg-emerald/10 text-emerald border-emerald/20",
//     Medium: "bg-amber/10 text-amber border-amber/20",
//     Hard:   "bg-destructive/10 text-destructive border-destructive/20",
//   }[level]
//   return <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full border font-mono", cls)}>{level}</span>
// }

// function TrendIcon({ trend }: { trend?: string }) {
//   if (trend==="up")   return <TrendingUp   className="h-3.5 w-3.5 text-emerald"/>
//   if (trend==="down") return <TrendingDown className="h-3.5 w-3.5 text-destructive"/>
//   return                     <Minus        className="h-3.5 w-3.5 text-muted-foreground"/>
// }

// const patternIcon = (p: string) => p==="missed"?"🎯":p==="losing"?"⚡":p==="competing"?"🧩":"✨"
// const toDiff      = (p: string): DiffLevel => p==="high"?"Hard":p==="medium"?"Medium":"Easy"
// const fmtDate     = (d: string|null) => d
//   ? new Date(d).toLocaleDateString("en-GB", { day:"numeric", month:"short", year:"numeric" })
//   : "Never"

// // ── Score Explanation Dropdown ─────────────────────────────────────────────
// // Loads from aeo_score_explanations via /aeo/score/:planId/explanation
// // No generation — reads saved data only
// function ScoreExplanationDropdown({
//   planId, token, score,
// }: {
//   planId: string; token: string; score: number
// }) {
//   const [open,        setOpen]        = useState(false)
//   const [explanation, setExplanation] = useState<ScoreExplanationData | null>(null)
//   const [loading,     setLoading]     = useState(false)
//   const [fetched,     setFetched]     = useState(false)

//   // Load when first opened
//   useEffect(() => {
//     if (!open || fetched) return
//     const load = async () => {
//       setLoading(true)
//       try {
//         const res = await fetch(`${BACKEND_URL}/aeo/score/${planId}/explanation`, {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         if (res.ok) {
//           const j = await res.json()
//           const d = j?.data ?? j
//           // Only set if the response has actual explanation content
//           if (d?.explanation || d?.headline || d?.what_is_working?.length) {
//             setExplanation(d)
//           }
//         }
//       } catch { /* silent */ }
//       finally { setLoading(false); setFetched(true) }
//     }
//     load()
//   }, [open, fetched, planId, token])

//   return (
//     <div className="mt-4 pt-4 border-t border-border/50">
//       {/* Toggle button */}
//       <button
//         onClick={() => setOpen(o => !o)}
//         className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet/10 border border-violet/20 text-violet text-[11px] font-semibold hover:bg-violet/20 transition-colors"
//       >
//         <Sparkles className="h-3 w-3"/>
//         Score Explanation
//         {open ? <ChevronUp className="h-3 w-3"/> : <ChevronDown className="h-3 w-3"/>}
//       </button>

//       {open && (
//         <div className="mt-3 rounded-xl border border-violet/15 bg-violet/[0.03] p-4 max-w-2xl">

//           {loading && (
//             <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-mono">
//               <Loader2 className="h-3 w-3 animate-spin"/> Loading explanation…
//             </div>
//           )}

//           {!loading && !explanation && (
//             <p className="text-[11px] text-muted-foreground font-mono">
//               No explanation available yet — run the pipeline to generate one.
//             </p>
//           )}

//           {!loading && explanation && (
//             <div className="flex flex-col gap-4">

//               {/* Headline */}
//               {explanation.headline && (
//                 <p className="text-sm font-semibold text-foreground">{explanation.headline}</p>
//               )}

//               {/* Summary explanation */}
//               {explanation.explanation && (
//                 <p className="text-xs text-foreground/70 leading-relaxed">{explanation.explanation}</p>
//               )}

//               {/* What's working */}
//               {explanation.what_is_working?.length > 0 && (
//                 <div>
//                   <p className="text-[10px] font-mono font-bold text-emerald uppercase tracking-wider mb-2">What's working</p>
//                   <ul className="flex flex-col gap-1.5">
//                     {explanation.what_is_working.map((s, i) => (
//                       <li key={i} className="flex items-start gap-2 text-[11px] text-foreground/70 leading-relaxed">
//                         <CheckCircle2 className="h-3 w-3 text-emerald shrink-0 mt-0.5"/>{s}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               {/* Top issues */}
//               {explanation.top_issues?.length > 0 && (
//                 <div>
//                   <p className="text-[10px] font-mono font-bold text-destructive uppercase tracking-wider mb-2">Top issues</p>
//                   <ul className="flex flex-col gap-1.5">
//                     {explanation.top_issues.map((g, i) => (
//                       <li key={i} className="flex items-start gap-2 text-[11px] text-foreground/70 leading-relaxed">
//                         <XCircle className="h-3 w-3 text-destructive shrink-0 mt-0.5"/>{g}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               {/* Improvements */}
//               {explanation.improvements?.length > 0 && (
//                 <div>
//                   <p className="text-[10px] font-mono font-bold text-amber uppercase tracking-wider mb-2">Improvements</p>
//                   <div className="flex flex-col gap-2">
//                     {explanation.improvements.map((imp, i) => (
//                       <div key={i} className="flex items-start gap-3 px-3 py-2.5 rounded-lg bg-amber/5 border border-amber/15">
//                         <span className="text-amber font-bold text-[11px] font-mono shrink-0 mt-0.5">{i + 1}.</span>
//                         <div className="flex-1 min-w-0">
//                           <p className="text-[11px] font-semibold text-foreground mb-0.5">{imp.title}</p>
//                           <p className="text-[11px] text-foreground/60 leading-relaxed">{imp.description}</p>
//                           {imp.impact && (
//                             <p className="text-[10px] text-emerald font-mono mt-1">{imp.impact}</p>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Recommendations text block */}
//               {explanation.recommendations && (
//                 <div className="px-3 py-2.5 rounded-lg bg-muted/50 border border-border">
//                   <p className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Recommendations</p>
//                   <p className="text-[11px] text-foreground/70 leading-relaxed whitespace-pre-line">
//                     {explanation.recommendations}
//                   </p>
//                 </div>
//               )}

//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

// // ── Page ───────────────────────────────────────────────────────────────────
// export default function OverviewPage() {
//   const planId = usePlanId()

//   const [overview,    setOverview]    = useState<OverviewData | null>(null)
//   const [scoreData,   setScoreData]   = useState<ScoreData | null>(null)
//   const [promptRows,  setPromptRows]  = useState<PromptRow[]>([])
//   const [competitors, setCompetitors] = useState<Competitor[]>([])
//   const [suggestions, setSuggestions] = useState<Competitor[]>([])
//   const [recs,        setRecs]        = useState<Recommendation[]>([])
//   const [plan,        setPlan]        = useState<any>(null)
//   const [token,       setToken]       = useState("")
//   const [loading,     setLoading]     = useState(true)
//   const [dismissed,   setDismissed]   = useState<string[]>([])
//   const [accepted,    setAccepted]    = useState<string[]>([])
//   const [mounted,     setMounted]     = useState(false)

//   const load = useCallback(async () => {
//     if (!planId) return
//     setLoading(true)
//     try {
//       const { data: s } = await supabaseBrowser.auth.getSession()
//       const t = s?.session?.access_token
//       if (!t) return
//       setToken(t)
//       const h = { Authorization: `Bearer ${t}` }

//       const [ovR, scR, viR, coR, reR] = await Promise.allSettled([
//         fetch(`${BACKEND_URL}/aeo/overview/simple?planId=${planId}`, { headers: h }),
//         fetch(`${BACKEND_URL}/aeo/score/${planId}`,                  { headers: h }),
//         fetch(`${BACKEND_URL}/aeo/visibility?planId=${planId}`,      { headers: h }),
//         fetch(`${BACKEND_URL}/aeo/competitors/${planId}`,            { headers: h }),
//         fetch(`${BACKEND_URL}/aeo/recommendations?planId=${planId}`, { headers: h }),
//       ])

//       // ── Overview — source of truth for all stat cards ──────────────────
//       if (ovR.status==="fulfilled" && ovR.value.ok) {
//         const j = await ovR.value.json()
//         const d = j?.data ?? j
//         setOverview(d)
//         if (d?.plan) setPlan(d.plan)
//       }

//       // ── Score ──────────────────────────────────────────────────────────
//       if (scR.status==="fulfilled" && scR.value.ok) {
//         const j = await scR.value.json()
//         const d = j?.data ?? j
//         setScoreData({ score: d.score, breakdown: d.breakdown, trend: d.trend, change: d.change })
//         if (d?.plan && !plan) setPlan((p: any) => p ?? d.plan)
//       }

//       // ── Visibility — prompt table only ────────────────────────────────
//       if (viR.status==="fulfilled" && viR.value.ok) {
//         const j = await viR.value.json()
//         const d = j?.data ?? j
//         setPromptRows((d?.prompts ?? []).slice(0, 5))
//         if (d?.plan) setPlan((p: any) => p ?? d.plan)
//       }

//       // ── Competitors ───────────────────────────────────────────────────
//       if (coR.status==="fulfilled" && coR.value.ok) {
//         const j = await coR.value.json()
//         const d = j?.data ?? j
//         setCompetitors((d?.competitors ?? []).slice(0, 4))
//         setSuggestions((d?.suggestions ?? []).slice(0, 2))
//       }

//       // ── Recommendations ───────────────────────────────────────────────
//       if (reR.status==="fulfilled" && reR.value.ok) {
//         const j = await reR.value.json()
//         setRecs((j?.data?.recommendations ?? j?.recommendations ?? []).slice(0, 3))
//       }

//     } catch(e) { console.error("Overview load error:", e) }
//     finally    { setLoading(false) }
//   }, [planId])

//   useEffect(() => { setMounted(true) }, [])
//   useEffect(() => { load() },          [load])

//   const handleAccept = async (id: string, name: string) => {
//     setAccepted(a => [...a, name])
//     const { data: s } = await supabaseBrowser.auth.getSession()
//     const t = s?.session?.access_token
//     await fetch(`${BACKEND_URL}/aeo/competitors/${id}/accept`, {
//       method: "PUT",
//       headers: { Authorization: `Bearer ${t!}`, "Content-Type": "application/json" },
//       body: JSON.stringify({ planId }),
//     })
//   }

//   const handleIgnore = async (id: string, name: string) => {
//     setDismissed(d => [...d, name])
//     const { data: s } = await supabaseBrowser.auth.getSession()
//     const t = s?.session?.access_token
//     await fetch(`${BACKEND_URL}/aeo/competitors/${id}/ignore`, {
//       method: "PUT",
//       headers: { Authorization: `Bearer ${t!}`, "Content-Type": "application/json" },
//       body: JSON.stringify({ planId }),
//     })
//   }

//   if (!mounted) return <div className="flex items-center justify-center min-h-screen"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground"/></div>
//   if (!planId)  return <div className="flex flex-col items-center justify-center min-h-screen gap-3"><p className="text-sm text-muted-foreground">No project selected.</p><a href="/dashboard" className="text-xs text-emerald underline">Go to Dashboard</a></div>
//   if (loading)  return <div className="flex items-center justify-center min-h-screen"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground"/></div>

//   const score         = scoreData?.score ?? 0
//   const circumference = 2 * Math.PI * 46
//   const offset        = circumference - (score / 100) * circumference

//   // Breakdown bars — from score endpoint components
//   const breakdownItems: BreakdownItem[] = scoreData?.breakdown?.scoreComponents?.length
//     ? scoreData.breakdown.scoreComponents.map(c => ({
//         label:       c.category,
//         value:       c.points,
//         max:         c.max,
//         explanation: c.explanation,
//       }))
//     : overview
//     ? [
//         { label: "Brand Presence",       value: overview.visibilityRate,            max: 100 },
//         // ── Corrected: win rate = brandWins / totalPrompts × 100 ──────────
//         { label: "Win Rate",             value: overview.winRate,                   max: 100 },
//         { label: "Competitive Position", value: 100 - overview.competitorDominance, max: 100 },
//       ]
//     : []

//   const statCards = overview ? [
//     {
//       label: "Brand Presence",
//       value: `${overview.visibilityRate}%`,
//       sub:   `${overview.brandMentioned} of ${overview.totalPrompts} prompts`,
//       trend: "neutral" as const,
//     },
//     {
//       label: "Wins",
//       value: String(overview.brandWins),
//       sub:   `${overview.winRate}% of all prompts`,
//       trend: "up" as const,
//     },
//     {
//       label: "Missed Prompts",
//       value: String(overview.noVisibility),
//       sub:   `${overview.noVisibilityRate}% no visibility`,
//       trend: "down" as const,
//     },
//     {
//       label: "Schemas Generated",
//       value: String(overview.pages),
//       sub:   "pages crawled & indexed",
//       trend: "up" as const,
//     },
//   ] : []

//   const domain  = plan?.website_url?.replace(/^https?:\/\//, "").replace(/\/$/, "") ?? plan?.domain ?? "—"
//   const lastRun = plan?.last_full_pipeline ?? plan?.last_daily_tracking ?? null

//   // Accepted suggestions show as confirmed inline without reload
//   // Dismissed suggestions are removed immediately
//   const allComps = [
//     ...competitors,
//     ...suggestions
//       .filter(s => !dismissed.includes(s.name))
//       .map(s => accepted.includes(s.name) ? { ...s, status: "active" } : s),
//   ]

//   return (
//     <div className="flex flex-col gap-6 p-6 min-h-screen bg-background">

//       {/* Topbar */}
//       <div className="flex items-start justify-between flex-wrap gap-3">
//         <div>
//           <h1 className="text-xl font-heading font-bold text-foreground tracking-tight">Overview</h1>
//           <p className="text-xs text-muted-foreground font-mono mt-0.5">{domain} · Last run {fmtDate(lastRun)}</p>
//         </div>
//         <div className="flex items-center gap-2 flex-wrap">
//           <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted border border-border text-xs text-muted-foreground font-mono">
//             <span className="w-2 h-2 rounded-full bg-emerald animate-pulse shrink-0"/>
//             Pipeline: {plan?.pipeline_status ?? "idle"}
//           </div>
//           <a href="/onboarding" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald text-white text-xs font-semibold hover:opacity-90 transition-opacity">
//             <Plus className="h-3.5 w-3.5"/> New Project
//           </a>
//         </div>
//       </div>

//       {/* Score Hero */}
//       <div className="bg-card border border-border rounded-2xl p-6">
//         <div className="flex flex-wrap gap-6 items-start">

//           {/* Ring */}
//           <div className="relative w-28 h-28 shrink-0">
//             <svg className="-rotate-90 w-full h-full" viewBox="0 0 110 110">
//               <circle cx="55" cy="55" r="46" fill="none" stroke="var(--border)" strokeWidth="8"/>
//               <circle cx="55" cy="55" r="46" fill="none" stroke="var(--emerald)" strokeWidth="8"
//                 strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
//                 className="transition-all duration-700"/>
//             </svg>
//             <div className="absolute inset-0 flex flex-col items-center justify-center">
//               <span className="font-heading text-3xl font-bold text-foreground leading-none">{score}</span>
//               <span className="text-[10px] font-mono text-muted-foreground">/100</span>
//             </div>
//           </div>

//           {/* Label + summary + trend */}
//           <div className="flex-1 min-w-[200px]">
//             <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-1">
//               AEO Score · {new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
//             </p>
//             <h2 className="font-heading text-xl font-bold text-foreground mb-2">
//               {score>=80 ? "Strong Visibility" : score>=50 ? "Moderate Visibility" : "Low Visibility"}
//             </h2>
//             <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
//               {overview
//                 ? `Brand appears in ${overview.visibilityRate}% of AI answers with ${overview.brandWins} outright wins and ${overview.noVisibility} missed prompt${overview.noVisibility !== 1 ? "s" : ""}.`
//                 : "Run the pipeline to generate your AEO score."}
//             </p>
//             {scoreData && (
//               <div className="flex items-center gap-1.5 mt-2">
//                 <TrendIcon trend={scoreData.trend}/>
//                 <span className="text-xs font-mono text-muted-foreground">
//                   {scoreData.change > 0 ? `+${scoreData.change}` : scoreData.change} pts from last run
//                 </span>
//               </div>
//             )}
//           </div>

//           {/* Breakdown bars */}
//           {breakdownItems.length > 0 && (
//             <div className="flex flex-col gap-2.5 min-w-[210px] w-full sm:w-auto">
//               {breakdownItems.map(b => (
//                 <div key={b.label} className="flex flex-col gap-1">
//                   <div className="flex justify-between text-[11px]">
//                     <span className="text-foreground/70 font-medium">{b.label}</span>
//                     <span className="font-mono text-muted-foreground">{b.value}/{b.max}</span>
//                   </div>
//                   <div className="h-1.5 bg-muted rounded-full overflow-hidden">
//                     <div className="h-full rounded-full transition-all duration-700"
//                       style={{ width: `${Math.min((b.value/b.max)*100, 100)}%`, background: scoreColor(b.value, b.max) }}/>
//                   </div>
//                   {b.explanation && (
//                     <p className="text-[10px] text-muted-foreground leading-snug">{b.explanation}</p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Score Explanation dropdown — reads from aeo_score_explanations */}
//         {score > 0 && planId && token && (
//           <ScoreExplanationDropdown planId={planId} token={token} score={score}/>
//         )}
//       </div>

//       {/* Stat Cards */}
//       {statCards.length > 0 && (
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//           {statCards.map(s => (
//             <div key={s.label} className="bg-card border border-border rounded-xl p-5">
//               <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-2">{s.label}</p>
//               <p className={cn("font-heading text-3xl font-bold leading-none mb-1.5",
//                 s.trend==="up"?"text-emerald":s.trend==="down"?"text-destructive":"text-foreground")}>
//                 {s.value}
//               </p>
//               <div className="flex items-center gap-1">
//                 <TrendIcon trend={s.trend}/>
//                 <span className="text-xs text-muted-foreground">{s.sub}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Two-col: Prompt Visibility + Competitors */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

//         {/* Prompt Visibility */}
//         <div className="bg-card border border-border rounded-xl overflow-hidden">
//           <div className="flex items-center justify-between px-5 py-4 border-b border-border">
//             <h3 className="font-heading text-sm font-semibold text-foreground">Prompt Visibility</h3>
//             <a href="/dashboard/visibility" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5">
//               View all <ChevronRight className="h-3 w-3"/>
//             </a>
//           </div>
//           <div className="grid grid-cols-[1fr_64px_64px_64px] px-5 py-2 bg-muted/50 border-b border-border">
//             {["Prompt", "Gemini", "GPT-4o", "Perplxty"].map(h => (
//               <div key={h} className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground text-center first:text-left">{h}</div>
//             ))}
//           </div>
//           {promptRows.length === 0 ? (
//             <div className="px-5 py-8 text-center text-xs text-muted-foreground">No visibility data yet — run the pipeline first.</div>
//           ) : (
//             promptRows.map(p => {
//               const gemini:  MentionStatus = p.engines?.gemini  ? (p.engines.gemini.mentioned  ? "yes" : "no") : "no"
//               const chatgpt: MentionStatus = p.engines?.chatgpt ? (p.engines.chatgpt.mentioned ? "yes" : "no") : "no"
//               return (
//                 <div key={p.id} className="grid grid-cols-[1fr_64px_64px_64px] px-5 py-3 border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
//                   <span className="text-xs font-medium text-foreground/80 truncate pr-2">{p.question}</span>
//                   <MentionIcon status={gemini}/>
//                   <MentionIcon status={chatgpt}/>
//                   <MentionIcon status="locked"/>
//                 </div>
//               )
//             })
//           )}
//           <div className="px-5 py-3 bg-violet/5 border-t border-violet/10 flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <Lock className="h-3.5 w-3.5 text-violet"/>
//               <span className="text-xs text-violet font-medium">Unlock Perplexity tracking</span>
//             </div>
//             <a href="/billing" className="text-[10px] font-semibold text-violet hover:text-violet-light">Upgrade to Pro →</a>
//           </div>
//         </div>

//         {/* Competitors */}
//         <div className="bg-card border border-border rounded-xl overflow-hidden">
//           <div className="flex items-center justify-between px-5 py-4 border-b border-border">
//             <h3 className="font-heading text-sm font-semibold text-foreground">Top Competing Brands</h3>
//             <a href="/dashboard/competitors" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5">
//               Manage <ChevronRight className="h-3 w-3"/>
//             </a>
//           </div>
//           {allComps.length === 0 ? (
//             <div className="px-5 py-8 text-center text-xs text-muted-foreground">No competitors tracked yet.</div>
//           ) : (
//             allComps.map(c => {
//               const isSuggested = suggestions.some(s => s.id === c.id)
//               const isAccepted  = accepted.includes(c.name)
//               const rate        = Math.round((c.confidence_score ?? 0) * 100)
//               return (
//                 <div key={c.id} className={cn(
//                   "flex items-center gap-3 px-5 py-3.5 border-b border-border last:border-0 transition-colors",
//                   isSuggested && !isAccepted ? "bg-amber/5" : "hover:bg-muted/30"
//                 )}>
//                   <div className={cn(
//                     "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0",
//                     isSuggested ? "bg-amber/10 text-amber border border-amber/20" : "bg-muted text-foreground border border-border"
//                   )}>
//                     {(c.name || "?").charAt(0).toUpperCase()}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center gap-2 flex-wrap">
//                       <span className="text-sm font-semibold text-foreground">{c.name}</span>
//                       {isSuggested && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber/10 text-amber border border-amber/20 font-mono">NEW</span>}
//                     </div>
//                     <span className="text-[11px] text-muted-foreground font-mono">{c.domain}</span>
//                   </div>
//                   {isSuggested && !isAccepted ? (
//                     <div className="flex gap-2 shrink-0">
//                       <button onClick={() => handleAccept(c.id, c.name)} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-emerald/10 text-emerald border border-emerald/20 hover:bg-emerald/20 transition-colors">Add</button>
//                       <button onClick={() => handleIgnore(c.id, c.name)} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20 transition-colors">Skip</button>
//                     </div>
//                   ) : (
//                     <div className="shrink-0 text-right min-w-[70px]">
//                       <p className={cn("text-sm font-bold font-mono", rateColor(rate))}>
//                         {rate > 0 ? `${rate}%` : isAccepted ? "Tracking" : "—"}
//                       </p>
//                       {rate > 0 && (
//                         <div className="mt-1 h-1 w-16 ml-auto bg-muted rounded-full overflow-hidden">
//                           <div className={cn("h-full rounded-full", rateBarColor(rate))} style={{ width: `${rate}%` }}/>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               )
//             })
//           )}
//         </div>
//       </div>

//       {/* Recommendations */}
//       <div className="bg-card border border-border rounded-xl overflow-hidden">
//         <div className="flex items-center justify-between px-5 py-4 border-b border-border">
//           <h3 className="font-heading text-sm font-semibold text-foreground">Top Recommendations</h3>
//           <a href="/dashboard/recommendations" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5">
//             View all <ChevronRight className="h-3 w-3"/>
//           </a>
//         </div>
//         {recs.length === 0 ? (
//           <div className="px-5 py-8 text-center text-xs text-muted-foreground">No recommendations yet — run the pipeline first.</div>
//         ) : (
//           recs.map(r => (
//             <div key={r.id} className="flex items-start gap-4 px-5 py-4 border-b border-border last:border-0 hover:bg-muted/30 transition-colors group">
//               <div className="w-9 h-9 rounded-xl bg-muted border border-border flex items-center justify-center text-base shrink-0 group-hover:scale-105 transition-transform">
//                 {patternIcon(r.pattern)}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-semibold text-foreground mb-1">{r.summary}</p>
//                 <p className="text-xs text-emerald font-mono">{r.expected_impact}</p>
//               </div>
//               <div className="shrink-0 pt-0.5"><DiffBadge level={toDiff(r.priority)}/></div>
//             </div>
//           ))
//         )}
//       </div>

//     </div>
//   )
// }






// "use client"

// import { useState, useEffect, useCallback } from "react"
// import { supabaseBrowser } from "@/lib/supabaseClient"
// import { usePlanId } from "@/hooks/usePlanId"
// import {
//   Plus, ChevronRight, CheckCircle2, XCircle,
//   Lock, TrendingUp, TrendingDown, Minus, Loader2,
//   ChevronDown, ChevronUp, Sparkles,
// } from "lucide-react"
// import { cn } from "@/lib/utils"

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

// type MentionStatus = "yes" | "no" | "locked"
// type DiffLevel     = "Easy" | "Medium" | "Hard"

// interface BreakdownComponent { category: string; points: number; max: number; explanation?: string }
// interface BreakdownItem      { label: string; value: number; max: number; explanation?: string }

// interface OverviewData {
//   pages: number; totalPrompts: number; brandMentioned: number; brandWins: number
//   brandLosses: number; noVisibility: number; visibilityRate: number; winRate: number
//   competitorDominance: number; noVisibilityRate: number; trustScore: number
// }

// interface ScoreData {
//   score:     number
//   breakdown: { scoreComponents: BreakdownComponent[] }
//   trend:     "up" | "down" | "stable"
//   change:    number
// }

// interface ScoreExplanationData {
//   score:           number
//   headline:        string | null
//   explanation:     string | null
//   what_is_working: string[]
//   top_issues:      string[]
//   improvements:    { title: string; description: string; impact?: string }[]
//   recommendations: string | null
// }

// interface PromptRow {
//   id: string; question: string
//   engines: Record<string, { mentioned: boolean; position: number | null }>
//   status: "win" | "shared" | "missed"
// }

// interface Competitor { id: string; name: string; domain: string; confidence_score: number; status: string }
// interface Recommendation { id: string; summary: string; expected_impact: string; priority: "high"|"medium"|"low"; pattern: string }

// // ── Helpers ────────────────────────────────────────────────────────────────
// const scoreColor   = (v: number, m: number) => { const p = v/m; return p>=.85?"#0FBF9A":p>=.45?"#F4B740":"#EF4444" }
// const rateColor    = (r: number) => r>=40?"text-destructive":r>=20?"text-amber":"text-muted-foreground"
// const rateBarColor = (r: number) => r>=40?"bg-destructive":r>=20?"bg-amber":"bg-muted-foreground"

// function MentionIcon({ status }: { status: MentionStatus }) {
//   if (status==="yes") return <CheckCircle2 className="h-4 w-4 text-emerald mx-auto"/>
//   if (status==="no")  return <XCircle      className="h-4 w-4 text-destructive mx-auto"/>
//   return <div className="flex items-center justify-center"><Lock className="h-3.5 w-3.5 text-muted-foreground"/></div>
// }

// function DiffBadge({ level }: { level: DiffLevel }) {
//   const cls = {
//     Easy:   "bg-emerald/10 text-emerald border-emerald/20",
//     Medium: "bg-amber/10 text-amber border-amber/20",
//     Hard:   "bg-destructive/10 text-destructive border-destructive/20",
//   }[level]
//   return <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full border font-mono", cls)}>{level}</span>
// }

// function TrendIcon({ trend }: { trend?: string }) {
//   if (trend==="up")   return <TrendingUp   className="h-3.5 w-3.5 text-emerald"/>
//   if (trend==="down") return <TrendingDown className="h-3.5 w-3.5 text-destructive"/>
//   return                     <Minus        className="h-3.5 w-3.5 text-muted-foreground"/>
// }

// const patternIcon = (p: string) => p==="missed"?"🎯":p==="losing"?"⚡":p==="competing"?"🧩":"✨"
// const toDiff      = (p: string): DiffLevel => p==="high"?"Hard":p==="medium"?"Medium":"Easy"
// const fmtDate     = (d: string|null) => d
//   ? new Date(d).toLocaleDateString("en-GB", { day:"numeric", month:"short", year:"numeric" })
//   : "Never"

// // ── Score Explanation Dropdown ─────────────────────────────────────────────
// function ScoreExplanationDropdown({ planId, token, score }: { planId: string; token: string; score: number }) {
//   const [open,        setOpen]        = useState(false)
//   const [explanation, setExplanation] = useState<ScoreExplanationData | null>(null)
//   const [loading,     setLoading]     = useState(false)
//   const [fetched,     setFetched]     = useState(false)

//   useEffect(() => {
//     if (!open || fetched) return
//     const load = async () => {
//       setLoading(true)
//       try {
//         const res = await fetch(`${BACKEND_URL}/aeo/score/${planId}/explanation`, {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         if (res.ok) {
//           const j = await res.json()
//           const d = j?.data ?? j
//           if (d?.explanation || d?.headline || d?.what_is_working?.length) setExplanation(d)
//         }
//       } catch { /* silent */ }
//       finally { setLoading(false); setFetched(true) }
//     }
//     load()
//   }, [open, fetched, planId, token])

//   return (
//     <div className="mt-4 pt-4 border-t border-border/50">
//       <button onClick={() => setOpen(o => !o)}
//         className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet/10 border border-violet/20 text-violet text-[11px] font-semibold hover:bg-violet/20 transition-colors">
//         <Sparkles className="h-3 w-3"/>Score Explanation
//         {open ? <ChevronUp className="h-3 w-3"/> : <ChevronDown className="h-3 w-3"/>}
//       </button>
//       {open && (
//         <div className="mt-3 rounded-xl border border-violet/15 bg-violet/[0.03] p-4 max-w-2xl">
//           {loading && <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-mono"><Loader2 className="h-3 w-3 animate-spin"/> Loading explanation…</div>}
//           {!loading && !explanation && <p className="text-[11px] text-muted-foreground font-mono">No explanation available yet — run the pipeline to generate one.</p>}
//           {!loading && explanation && (
//             <div className="flex flex-col gap-4">
//               {explanation.headline && <p className="text-sm font-semibold text-foreground">{explanation.headline}</p>}
//               {explanation.explanation && <p className="text-xs text-foreground/70 leading-relaxed">{explanation.explanation}</p>}
//               {explanation.what_is_working?.length > 0 && (
//                 <div>
//                   <p className="text-[10px] font-mono font-bold text-emerald uppercase tracking-wider mb-2">What's working</p>
//                   <ul className="flex flex-col gap-1.5">
//                     {explanation.what_is_working.map((s, i) => (
//                       <li key={i} className="flex items-start gap-2 text-[11px] text-foreground/70 leading-relaxed">
//                         <CheckCircle2 className="h-3 w-3 text-emerald shrink-0 mt-0.5"/>{s}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//               {explanation.top_issues?.length > 0 && (
//                 <div>
//                   <p className="text-[10px] font-mono font-bold text-destructive uppercase tracking-wider mb-2">Top issues</p>
//                   <ul className="flex flex-col gap-1.5">
//                     {explanation.top_issues.map((g, i) => (
//                       <li key={i} className="flex items-start gap-2 text-[11px] text-foreground/70 leading-relaxed">
//                         <XCircle className="h-3 w-3 text-destructive shrink-0 mt-0.5"/>{g}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//               {explanation.improvements?.length > 0 && (
//                 <div>
//                   <p className="text-[10px] font-mono font-bold text-amber uppercase tracking-wider mb-2">Improvements</p>
//                   <div className="flex flex-col gap-2">
//                     {explanation.improvements.map((imp, i) => (
//                       <div key={i} className="flex items-start gap-3 px-3 py-2.5 rounded-lg bg-amber/5 border border-amber/15">
//                         <span className="text-amber font-bold text-[11px] font-mono shrink-0 mt-0.5">{i + 1}.</span>
//                         <div className="flex-1 min-w-0">
//                           <p className="text-[11px] font-semibold text-foreground mb-0.5">{imp.title}</p>
//                           <p className="text-[11px] text-foreground/60 leading-relaxed">{imp.description}</p>
//                           {imp.impact && <p className="text-[10px] text-emerald font-mono mt-1">{imp.impact}</p>}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//               {explanation.recommendations && (
//                 <div className="px-3 py-2.5 rounded-lg bg-muted/50 border border-border">
//                   <p className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Recommendations</p>
//                   <p className="text-[11px] text-foreground/70 leading-relaxed whitespace-pre-line">{explanation.recommendations}</p>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

// // ── Page ───────────────────────────────────────────────────────────────────
// export default function OverviewPage() {
//   const planId = usePlanId()

//   const [overview,    setOverview]    = useState<OverviewData | null>(null)
//   const [scoreData,   setScoreData]   = useState<ScoreData | null>(null)
//   const [promptRows,  setPromptRows]  = useState<PromptRow[]>([])
//   const [competitors, setCompetitors] = useState<Competitor[]>([])
//   const [suggestions, setSuggestions] = useState<Competitor[]>([])
//   const [recs,        setRecs]        = useState<Recommendation[]>([])
//   const [plan,        setPlan]        = useState<any>(null)
//   const [token,       setToken]       = useState("")
//   const [loading,     setLoading]     = useState(true)
//   const [dismissed,   setDismissed]   = useState<string[]>([])
//   const [accepted,    setAccepted]    = useState<string[]>([])
//   const [mounted,     setMounted]     = useState(false)

//   const load = useCallback(async () => {
//     if (!planId) return
//     setLoading(true)
//     try {
//       const { data: s } = await supabaseBrowser.auth.getSession()
//       const t = s?.session?.access_token
//       if (!t) return
//       setToken(t)
//       const h = { Authorization: `Bearer ${t}` }

//       const [ovR, scR, viR, coR, reR] = await Promise.allSettled([
//         fetch(`${BACKEND_URL}/aeo/overview/simple?planId=${planId}`, { headers: h }),
//         fetch(`${BACKEND_URL}/aeo/score/${planId}`,                  { headers: h }),
//         fetch(`${BACKEND_URL}/aeo/visibility?planId=${planId}`,      { headers: h }),
//         fetch(`${BACKEND_URL}/aeo/competitors/${planId}`,            { headers: h }),
//         fetch(`${BACKEND_URL}/aeo/recommendations?planId=${planId}`, { headers: h }),
//       ])

//       if (ovR.status==="fulfilled" && ovR.value.ok) {
//         const j = await ovR.value.json()
//         const d = j?.data ?? j
//         setOverview(d)
//         if (d?.plan) setPlan(d.plan)
//       }

//       if (scR.status==="fulfilled" && scR.value.ok) {
//         const j = await scR.value.json()
//         const d = j?.data ?? j
//         setScoreData({ score: d.score, breakdown: d.breakdown, trend: d.trend, change: d.change })
//         if (d?.plan && !plan) setPlan((p: any) => p ?? d.plan)
//       }

//       if (viR.status==="fulfilled" && viR.value.ok) {
//         const j = await viR.value.json()
//         const d = j?.data ?? j
//         setPromptRows((d?.prompts ?? []).slice(0, 5))
//         if (d?.plan) setPlan((p: any) => p ?? d.plan)
//       }

//       if (coR.status==="fulfilled" && coR.value.ok) {
//         const j = await coR.value.json()
//         const d = j?.data ?? j
//         setCompetitors(d?.competitors ?? [])
//         setSuggestions((d?.suggestions ?? []).slice(0, 2))
//       }

//       if (reR.status==="fulfilled" && reR.value.ok) {
//         const j = await reR.value.json()
//         setRecs((j?.data?.recommendations ?? j?.recommendations ?? []).slice(0, 3))
//       }

//     } catch(e) { console.error("Overview load error:", e) }
//     finally    { setLoading(false) }
//   }, [planId])

//   useEffect(() => { setMounted(true) }, [])
//   useEffect(() => { load() },          [load])

//   const handleAccept = async (id: string, name: string) => {
//     setAccepted(a => [...a, name])
//     const { data: s } = await supabaseBrowser.auth.getSession()
//     const t = s?.session?.access_token
//     await fetch(`${BACKEND_URL}/aeo/competitors/${id}/accept`, {
//       method: "PUT",
//       headers: { Authorization: `Bearer ${t!}`, "Content-Type": "application/json" },
//       body: JSON.stringify({ planId }),
//     })
//   }

//   const handleIgnore = async (id: string, name: string) => {
//     setDismissed(d => [...d, name])
//     const { data: s } = await supabaseBrowser.auth.getSession()
//     const t = s?.session?.access_token
//     await fetch(`${BACKEND_URL}/aeo/competitors/${id}/ignore`, {
//       method: "PUT",
//       headers: { Authorization: `Bearer ${t!}`, "Content-Type": "application/json" },
//       body: JSON.stringify({ planId }),
//     })
//   }

//   if (!mounted) return <div className="flex items-center justify-center min-h-screen"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground"/></div>
//   if (!planId)  return <div className="flex flex-col items-center justify-center min-h-screen gap-3"><p className="text-sm text-muted-foreground">No project selected.</p><a href="/dashboard" className="text-xs text-emerald underline">Go to Dashboard</a></div>
//   if (loading)  return <div className="flex items-center justify-center min-h-screen"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground"/></div>

//   const score         = scoreData?.score ?? 0
//   const circumference = 2 * Math.PI * 46
//   const offset        = circumference - (score / 100) * circumference

//   const breakdownItems: BreakdownItem[] = scoreData?.breakdown?.scoreComponents?.length
//     ? scoreData.breakdown.scoreComponents.map(c => ({
//         label:       c.category,
//         value:       c.points,
//         max:         c.max,
//         explanation: c.explanation,
//       }))
//     : overview
//     ? [
//         { label: "Brand Presence",       value: overview.visibilityRate,            max: 100 },
//         { label: "Win Rate",             value: overview.winRate,                   max: 100 },
//         { label: "Competitive Position", value: 100 - overview.competitorDominance, max: 100 },
//       ]
//     : []

//   // ── Tier: starter = 2 engines, pro = 3 ──
//   const engineCount   = plan?.tier === "pro" ? 3 : 2
//   const confirmedComp = competitors.length

//   // ── 4 stat cards: Score · Prompts · Competitor Dominance · Competitors ──
//   const statCards = [
//     {
//       label:    "AEO Score",
//       value:    score > 0 ? String(score) : "—",
//       sub:      scoreData?.change != null
//                   ? `${scoreData.change >= 0 ? "+" : ""}${scoreData.change} pts from last run`
//                   : "No previous run",
//       trend:    (scoreData?.trend ?? "stable") as "up" | "down" | "stable",
//       color:    score >= 70 ? "text-emerald" : score >= 40 ? "text-amber" : "text-destructive",
//     },
//     {
//       label:    "Prompts Tracked",
//       value:    overview ? String(overview.totalPrompts) : "—",
//       sub:      `across ${engineCount} engine${engineCount !== 1 ? "s" : ""}`,
//       trend:    "stable" as const,
//       color:    "text-foreground",
//     },
//     {
//       label:    "Competitor Dominance",
//       value:    overview ? `${overview.competitorDominance}%` : "—",
//       sub:      overview
//                   ? `${Math.round((overview.competitorDominance / 100) * (overview.totalPrompts || 1))} prompt${Math.round((overview.competitorDominance / 100) * (overview.totalPrompts || 1)) !== 1 ? "s" : ""} lost to competitors`
//                   : "No data yet",
//       trend:    overview
//                   ? overview.competitorDominance >= 40 ? "down" as const
//                   : overview.competitorDominance >= 20 ? "stable" as const
//                   : "up" as const
//                   : "stable" as const,
//       color:    overview
//                   ? overview.competitorDominance >= 40 ? "text-destructive"
//                   : overview.competitorDominance >= 20 ? "text-amber"
//                   : "text-emerald"
//                   : "text-foreground",
//     },
//     {
//       label:    "Competitors Tracked",
//       value:    confirmedComp > 0 ? String(confirmedComp) : "—",
//       sub:      confirmedComp > 0 ? "actively monitored" : "None confirmed yet",
//       trend:    "stable" as const,
//       color:    "text-foreground",
//     },
//   ]

//   const domain  = plan?.website_url?.replace(/^https?:\/\//, "").replace(/\/$/, "") ?? plan?.domain ?? "—"
//   const lastRun = plan?.last_full_pipeline ?? plan?.last_daily_tracking ?? null

//   const allComps = [
//     ...competitors,
//     ...suggestions
//       .filter(s => !dismissed.includes(s.name))
//       .map(s => accepted.includes(s.name) ? { ...s, status: "active" } : s),
//   ]

//   return (
//     <div className="flex flex-col gap-6 p-6 min-h-screen bg-background">

//       {/* Topbar */}
//       <div className="flex items-start justify-between flex-wrap gap-3">
//         <div>
//           <h1 className="text-xl font-heading font-bold text-foreground tracking-tight">Overview</h1>
//           <p className="text-xs text-muted-foreground font-mono mt-0.5">{domain} · Last run {fmtDate(lastRun)}</p>
//         </div>
//         <div className="flex items-center gap-2 flex-wrap">
//           <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted border border-border text-xs text-muted-foreground font-mono">
//             <span className="w-2 h-2 rounded-full bg-emerald animate-pulse shrink-0"/>
//             Pipeline: {plan?.pipeline_status ?? "idle"}
//           </div>
//           <a href="/onboarding" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald text-white text-xs font-semibold hover:opacity-90 transition-opacity">
//             <Plus className="h-3.5 w-3.5"/> New Project
//           </a>
//         </div>
//       </div>

//       {/* Score Hero */}
//       <div className="bg-card border border-border rounded-2xl p-6">
//         <div className="flex flex-wrap gap-6 items-start">
//           <div className="relative w-28 h-28 shrink-0">
//             <svg className="-rotate-90 w-full h-full" viewBox="0 0 110 110">
//               <circle cx="55" cy="55" r="46" fill="none" stroke="var(--border)" strokeWidth="8"/>
//               <circle cx="55" cy="55" r="46" fill="none" stroke="var(--emerald)" strokeWidth="8"
//                 strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
//                 className="transition-all duration-700"/>
//             </svg>
//             <div className="absolute inset-0 flex flex-col items-center justify-center">
//               <span className="font-heading text-3xl font-bold text-foreground leading-none">{score}</span>
//               <span className="text-[10px] font-mono text-muted-foreground">/100</span>
//             </div>
//           </div>
//           <div className="flex-1 min-w-[200px]">
//             <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-1">
//               AEO Score · {new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
//             </p>
//             <h2 className="font-heading text-xl font-bold text-foreground mb-2">
//               {score>=80 ? "Strong Visibility" : score>=50 ? "Moderate Visibility" : "Low Visibility"}
//             </h2>
//             <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
//               {overview
//                 ? `Brand appears in ${overview.visibilityRate}% of AI answers with ${overview.brandWins} outright wins and ${overview.noVisibility} missed prompt${overview.noVisibility !== 1 ? "s" : ""}.`
//                 : "Run the pipeline to generate your AEO score."}
//             </p>
//             {scoreData && (
//               <div className="flex items-center gap-1.5 mt-2">
//                 <TrendIcon trend={scoreData.trend}/>
//                 <span className="text-xs font-mono text-muted-foreground">
//                   {scoreData.change > 0 ? `+${scoreData.change}` : scoreData.change} pts from last run
//                 </span>
//               </div>
//             )}
//           </div>
//           {breakdownItems.length > 0 && (
//             <div className="flex flex-col gap-2.5 min-w-[210px] w-full sm:w-auto">
//               {breakdownItems.map(b => (
//                 <div key={b.label} className="flex flex-col gap-1">
//                   <div className="flex justify-between text-[11px]">
//                     <span className="text-foreground/70 font-medium">{b.label}</span>
//                     <span className="font-mono text-muted-foreground">{b.value}/{b.max}</span>
//                   </div>
//                   <div className="h-1.5 bg-muted rounded-full overflow-hidden">
//                     <div className="h-full rounded-full transition-all duration-700"
//                       style={{ width: `${Math.min((b.value/b.max)*100, 100)}%`, background: scoreColor(b.value, b.max) }}/>
//                   </div>
//                   {b.explanation && <p className="text-[10px] text-muted-foreground leading-snug">{b.explanation}</p>}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//         {score > 0 && planId && token && (
//           <ScoreExplanationDropdown planId={planId} token={token} score={score}/>
//         )}
//       </div>

//       {/* ── Stat Cards ── */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//         {statCards.map(s => (
//           <div key={s.label} className="bg-card border border-border rounded-xl p-5">
//             <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-2">{s.label}</p>
//             <p className={cn("font-heading text-3xl font-bold leading-none mb-1.5", s.color)}>
//               {s.value}
//             </p>
//             <div className="flex items-center gap-1">
//               <TrendIcon trend={s.trend}/>
//               <span className="text-xs text-muted-foreground">{s.sub}</span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Two-col: Prompt Visibility + Competitors */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

//         {/* Prompt Visibility */}
//         <div className="bg-card border border-border rounded-xl overflow-hidden">
//           <div className="flex items-center justify-between px-5 py-4 border-b border-border">
//             <h3 className="font-heading text-sm font-semibold text-foreground">Prompt Visibility</h3>
//             <a href="/dashboard/visibility" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5">
//               View all <ChevronRight className="h-3 w-3"/>
//             </a>
//           </div>
//           <div className="grid grid-cols-[1fr_64px_64px_64px] px-5 py-2 bg-muted/50 border-b border-border">
//             {["Prompt", "Gemini", "GPT-4o", "Perplxty"].map(h => (
//               <div key={h} className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground text-center first:text-left">{h}</div>
//             ))}
//           </div>
//           {promptRows.length === 0 ? (
//             <div className="px-5 py-8 text-center text-xs text-muted-foreground">No visibility data yet — run the pipeline first.</div>
//           ) : (
//             promptRows.map(p => {
//               const gemini:  MentionStatus = p.engines?.gemini  ? (p.engines.gemini.mentioned  ? "yes" : "no") : "no"
//               const chatgpt: MentionStatus = p.engines?.chatgpt ? (p.engines.chatgpt.mentioned ? "yes" : "no") : "no"
//               return (
//                 <div key={p.id} className="grid grid-cols-[1fr_64px_64px_64px] px-5 py-3 border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
//                   <span className="text-xs font-medium text-foreground/80 truncate pr-2">{p.question}</span>
//                   <MentionIcon status={gemini}/>
//                   <MentionIcon status={chatgpt}/>
//                   <MentionIcon status="locked"/>
//                 </div>
//               )
//             })
//           )}
//           <div className="px-5 py-3 bg-violet/5 border-t border-violet/10 flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <Lock className="h-3.5 w-3.5 text-violet"/>
//               <span className="text-xs text-violet font-medium">Unlock Perplexity tracking</span>
//             </div>
//             <a href="/billing" className="text-[10px] font-semibold text-violet hover:text-violet-light">Upgrade to Pro →</a>
//           </div>
//         </div>

//         {/* Competitors */}
//         <div className="bg-card border border-border rounded-xl overflow-hidden">
//           <div className="flex items-center justify-between px-5 py-4 border-b border-border">
//             <h3 className="font-heading text-sm font-semibold text-foreground">Top Competing Brands</h3>
//             <a href="/dashboard/competitors" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5">
//               Manage <ChevronRight className="h-3 w-3"/>
//             </a>
//           </div>
//           {allComps.length === 0 ? (
//             <div className="px-5 py-8 text-center text-xs text-muted-foreground">No competitors tracked yet.</div>
//           ) : (
//             allComps.map(c => {
//               const isSuggested = suggestions.some(s => s.id === c.id)
//               const isAccepted  = accepted.includes(c.name)
//               const rate        = Math.round((c.confidence_score ?? 0) * 100)
//               return (
//                 <div key={c.id} className={cn(
//                   "flex items-center gap-3 px-5 py-3.5 border-b border-border last:border-0 transition-colors",
//                   isSuggested && !isAccepted ? "bg-amber/5" : "hover:bg-muted/30"
//                 )}>
//                   <div className={cn(
//                     "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0",
//                     isSuggested ? "bg-amber/10 text-amber border border-amber/20" : "bg-muted text-foreground border border-border"
//                   )}>
//                     {(c.name || "?").charAt(0).toUpperCase()}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center gap-2 flex-wrap">
//                       <span className="text-sm font-semibold text-foreground">{c.name}</span>
//                       {isSuggested && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber/10 text-amber border border-amber/20 font-mono">NEW</span>}
//                     </div>
//                     <span className="text-[11px] text-muted-foreground font-mono">{c.domain}</span>
//                   </div>
//                   {isSuggested && !isAccepted ? (
//                     <div className="flex gap-2 shrink-0">
//                       <button onClick={() => handleAccept(c.id, c.name)} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-emerald/10 text-emerald border border-emerald/20 hover:bg-emerald/20 transition-colors">Add</button>
//                       <button onClick={() => handleIgnore(c.id, c.name)} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20 transition-colors">Skip</button>
//                     </div>
//                   ) : (
//                     <div className="shrink-0 text-right min-w-[70px]">
//                       <p className={cn("text-sm font-bold font-mono", rateColor(rate))}>
//                         {rate > 0 ? `${rate}%` : isAccepted ? "Tracking" : "—"}
//                       </p>
//                       {rate > 0 && (
//                         <div className="mt-1 h-1 w-16 ml-auto bg-muted rounded-full overflow-hidden">
//                           <div className={cn("h-full rounded-full", rateBarColor(rate))} style={{ width: `${rate}%` }}/>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               )
//             })
//           )}
//         </div>
//       </div>

//       {/* Recommendations */}
//       <div className="bg-card border border-border rounded-xl overflow-hidden">
//         <div className="flex items-center justify-between px-5 py-4 border-b border-border">
//           <h3 className="font-heading text-sm font-semibold text-foreground">Top Recommendations</h3>
//           <a href="/dashboard/recommendations" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5">
//             View all <ChevronRight className="h-3 w-3"/>
//           </a>
//         </div>
//         {recs.length === 0 ? (
//           <div className="px-5 py-8 text-center text-xs text-muted-foreground">No recommendations yet — run the pipeline first.</div>
//         ) : (
//           recs.map(r => (
//             <div key={r.id} className="flex items-start gap-4 px-5 py-4 border-b border-border last:border-0 hover:bg-muted/30 transition-colors group">
//               <div className="w-9 h-9 rounded-xl bg-muted border border-border flex items-center justify-center text-base shrink-0 group-hover:scale-105 transition-transform">
//                 {patternIcon(r.pattern)}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-semibold text-foreground mb-1">{r.summary}</p>
//                 <p className="text-xs text-emerald font-mono">{r.expected_impact}</p>
//               </div>
//               <div className="shrink-0 pt-0.5"><DiffBadge level={toDiff(r.priority)}/></div>
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
import {
  Plus, ChevronRight, CheckCircle2, XCircle,
  Lock, TrendingUp, TrendingDown, Minus, Loader2,
  ChevronDown, ChevronUp, Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

type MentionStatus = "yes" | "no" | "locked"
type DiffLevel     = "Easy" | "Medium" | "Hard"

interface BreakdownComponent { category: string; points: number; max: number; explanation?: string }
interface BreakdownItem      { label: string; value: number; max: number; explanation?: string }

interface OverviewData {
  pages: number; totalPrompts: number; brandMentioned: number; brandWins: number
  brandLosses: number; noVisibility: number; visibilityRate: number; winRate: number
  competitorDominance: number; noVisibilityRate: number; trustScore: number
}

interface ScoreData {
  score:     number
  breakdown: { scoreComponents: BreakdownComponent[] }
  trend:     "up" | "down" | "stable"
  change:    number
}

interface ScoreExplanationData {
  score:           number
  headline:        string | null
  explanation:     string | null
  what_is_working: string[]
  top_issues:      string[]
  improvements:    { title: string; description: string; impact?: string }[]
  recommendations: string | null
}

interface PromptRow {
  id: string; question: string
  engines: Record<string, { mentioned: boolean; position: number | null }>
  status: "win" | "shared" | "missed"
}

interface Competitor { id: string; name: string; domain: string; confidence_score: number; status: string }
interface Recommendation { id: string; summary: string; expected_impact: string; priority: "high"|"medium"|"low"; pattern: string }

// ── Helpers ────────────────────────────────────────────────────────────────
const scoreColor   = (v: number, m: number) => { const p = v/m; return p>=.85?"#0FBF9A":p>=.45?"#F4B740":"#EF4444" }
const rateColor    = (r: number) => r>=40?"text-destructive":r>=20?"text-amber":"text-muted-foreground"
const rateBarColor = (r: number) => r>=40?"bg-destructive":r>=20?"bg-amber":"bg-muted-foreground"

function MentionIcon({ status }: { status: MentionStatus }) {
  if (status==="yes") return <CheckCircle2 className="h-4 w-4 text-emerald mx-auto"/>
  if (status==="no")  return <XCircle      className="h-4 w-4 text-destructive mx-auto"/>
  return <div className="flex items-center justify-center"><Lock className="h-3.5 w-3.5 text-muted-foreground"/></div>
}

function DiffBadge({ level }: { level: DiffLevel }) {
  const cls = {
    Easy:   "bg-emerald/10 text-emerald border-emerald/20",
    Medium: "bg-amber/10 text-amber border-amber/20",
    Hard:   "bg-destructive/10 text-destructive border-destructive/20",
  }[level]
  return <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full border font-mono", cls)}>{level}</span>
}

function TrendIcon({ trend }: { trend?: string }) {
  if (trend==="up")   return <TrendingUp   className="h-3.5 w-3.5 text-emerald"/>
  if (trend==="down") return <TrendingDown className="h-3.5 w-3.5 text-destructive"/>
  return                     <Minus        className="h-3.5 w-3.5 text-muted-foreground"/>
}

const patternIcon = (p: string) => p==="missed"?"🎯":p==="losing"?"⚡":p==="competing"?"🧩":"✨"
const toDiff      = (p: string): DiffLevel => p==="high"?"Hard":p==="medium"?"Medium":"Easy"
const fmtDate     = (d: string|null) => d
  ? new Date(d).toLocaleDateString("en-GB", { day:"numeric", month:"short", year:"numeric" })
  : "Never"

// ── Score Explanation Dropdown ─────────────────────────────────────────────
function ScoreExplanationDropdown({ planId, token, score }: { planId: string; token: string; score: number }) {
  const [open,        setOpen]        = useState(false)
  const [explanation, setExplanation] = useState<ScoreExplanationData | null>(null)
  const [loading,     setLoading]     = useState(false)
  const [fetched,     setFetched]     = useState(false)

  useEffect(() => {
    if (!open || fetched) return
    const load = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${BACKEND_URL}/aeo/score/${planId}/explanation`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (res.ok) {
          const j = await res.json()
          const d = j?.data ?? j
          if (d?.explanation || d?.headline || d?.what_is_working?.length) setExplanation(d)
        }
      } catch { /* silent */ }
      finally { setLoading(false); setFetched(true) }
    }
    load()
  }, [open, fetched, planId, token])

  return (
    <div className="mt-4 pt-4 border-t border-border/50">
      <button onClick={() => setOpen(o => !o)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet/10 border border-violet/20 text-violet text-[11px] font-semibold hover:bg-violet/20 transition-colors">
        <Sparkles className="h-3 w-3"/>Score Explanation
        {open ? <ChevronUp className="h-3 w-3"/> : <ChevronDown className="h-3 w-3"/>}
      </button>
      {open && (
        <div className="mt-3 rounded-xl border border-violet/15 bg-violet/[0.03] p-4 max-w-2xl">
          {loading && <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-mono"><Loader2 className="h-3 w-3 animate-spin"/> Loading explanation…</div>}
          {!loading && !explanation && <p className="text-[11px] text-muted-foreground font-mono">No explanation available yet — run the pipeline to generate one.</p>}
          {!loading && explanation && (
            <div className="flex flex-col gap-4">
              {explanation.headline && <p className="text-sm font-semibold text-foreground">{explanation.headline}</p>}
              {explanation.explanation && <p className="text-xs text-foreground/70 leading-relaxed">{explanation.explanation}</p>}
              {explanation.what_is_working?.length > 0 && (
                <div>
                  <p className="text-[10px] font-mono font-bold text-emerald uppercase tracking-wider mb-2">What's working</p>
                  <ul className="flex flex-col gap-1.5">
                    {explanation.what_is_working.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-[11px] text-foreground/70 leading-relaxed">
                        <CheckCircle2 className="h-3 w-3 text-emerald shrink-0 mt-0.5"/>{s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {explanation.top_issues?.length > 0 && (
                <div>
                  <p className="text-[10px] font-mono font-bold text-destructive uppercase tracking-wider mb-2">Top issues</p>
                  <ul className="flex flex-col gap-1.5">
                    {explanation.top_issues.map((g, i) => (
                      <li key={i} className="flex items-start gap-2 text-[11px] text-foreground/70 leading-relaxed">
                        <XCircle className="h-3 w-3 text-destructive shrink-0 mt-0.5"/>{g}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {explanation.improvements?.length > 0 && (
                <div>
                  <p className="text-[10px] font-mono font-bold text-amber uppercase tracking-wider mb-2">Improvements</p>
                  <div className="flex flex-col gap-2">
                    {explanation.improvements.map((imp, i) => (
                      <div key={i} className="flex items-start gap-3 px-3 py-2.5 rounded-lg bg-amber/5 border border-amber/15">
                        <span className="text-amber font-bold text-[11px] font-mono shrink-0 mt-0.5">{i + 1}.</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-semibold text-foreground mb-0.5">{imp.title}</p>
                          <p className="text-[11px] text-foreground/60 leading-relaxed">{imp.description}</p>
                          {imp.impact && <p className="text-[10px] text-emerald font-mono mt-1">{imp.impact}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {explanation.recommendations && (
                <div className="px-3 py-2.5 rounded-lg bg-muted/50 border border-border">
                  <p className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Recommendations</p>
                  <p className="text-[11px] text-foreground/70 leading-relaxed whitespace-pre-line">{explanation.recommendations}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function OverviewPage() {
  const planId = usePlanId()

  const [overview,    setOverview]    = useState<OverviewData | null>(null)
  const [scoreData,   setScoreData]   = useState<ScoreData | null>(null)
  const [promptRows,  setPromptRows]  = useState<PromptRow[]>([])
  const [competitors, setCompetitors] = useState<Competitor[]>([])
  const [suggestions, setSuggestions] = useState<Competitor[]>([])
  const [recs,        setRecs]        = useState<Recommendation[]>([])
  const [plan,        setPlan]        = useState<any>(null)
  const [token,       setToken]       = useState("")
  const [loading,     setLoading]     = useState(true)
  const [dismissed,   setDismissed]   = useState<string[]>([])
  const [accepted,    setAccepted]    = useState<string[]>([])
  const [mounted,     setMounted]     = useState(false)

  const load = useCallback(async () => {
    if (!planId) return
    setLoading(true)
    try {
      const { data: s } = await supabaseBrowser.auth.getSession()
      const t = s?.session?.access_token
      if (!t) return
      setToken(t)
      const h = { Authorization: `Bearer ${t}` }

      const [ovR, scR, viR, coR, reR] = await Promise.allSettled([
        fetch(`${BACKEND_URL}/aeo/overview/simple?planId=${planId}`, { headers: h }),
        fetch(`${BACKEND_URL}/aeo/score/${planId}`,                  { headers: h }),
        fetch(`${BACKEND_URL}/aeo/visibility?planId=${planId}`,      { headers: h }),
        fetch(`${BACKEND_URL}/aeo/competitors/${planId}`,            { headers: h }),
        fetch(`${BACKEND_URL}/aeo/recommendations?planId=${planId}`, { headers: h }),
      ])

      if (ovR.status==="fulfilled" && ovR.value.ok) {
        const j = await ovR.value.json()
        const d = j?.data ?? j
        setOverview(d)
        if (d?.plan) setPlan(d.plan)
      }

      if (scR.status==="fulfilled" && scR.value.ok) {
        const j = await scR.value.json()
        const d = j?.data ?? j
        setScoreData({ score: d.score, breakdown: d.breakdown, trend: d.trend, change: d.change })
        if (d?.plan && !plan) setPlan((p: any) => p ?? d.plan)
      }

      if (viR.status==="fulfilled" && viR.value.ok) {
        const j = await viR.value.json()
        const d = j?.data ?? j
        setPromptRows((d?.prompts ?? []).slice(0, 5))
        if (d?.plan) setPlan((p: any) => p ?? d.plan)
      }

      if (coR.status==="fulfilled" && coR.value.ok) {
        const j = await coR.value.json()
        const d = j?.data ?? j
        setCompetitors(d?.competitors ?? [])
        setSuggestions((d?.suggestions ?? []).slice(0, 2))
      }

      if (reR.status==="fulfilled" && reR.value.ok) {
        const j = await reR.value.json()
        setRecs((j?.data?.recommendations ?? j?.recommendations ?? []).slice(0, 3))
      }

    } catch(e) { console.error("Overview load error:", e) }
    finally    { setLoading(false) }
  }, [planId])

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => { load() },          [load])

  const handleAccept = async (id: string, name: string) => {
    setAccepted(a => [...a, name])
    const { data: s } = await supabaseBrowser.auth.getSession()
    const t = s?.session?.access_token
    await fetch(`${BACKEND_URL}/aeo/competitors/${id}/accept`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${t!}`, "Content-Type": "application/json" },
      body: JSON.stringify({ planId }),
    })
  }

  const handleIgnore = async (id: string, name: string) => {
    setDismissed(d => [...d, name])
    const { data: s } = await supabaseBrowser.auth.getSession()
    const t = s?.session?.access_token
    await fetch(`${BACKEND_URL}/aeo/competitors/${id}/ignore`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${t!}`, "Content-Type": "application/json" },
      body: JSON.stringify({ planId }),
    })
  }

  if (!mounted) return <div className="flex items-center justify-center min-h-screen"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground"/></div>
  if (!planId)  return <div className="flex flex-col items-center justify-center min-h-screen gap-3"><p className="text-sm text-muted-foreground">No project selected.</p><a href="/dashboard" className="text-xs text-emerald underline">Go to Dashboard</a></div>
  if (loading)  return <div className="flex items-center justify-center min-h-screen"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground"/></div>

  const score         = scoreData?.score ?? 0
  const circumference = 2 * Math.PI * 46
  const offset        = circumference - (score / 100) * circumference

  // ── Breakdown bars ──────────────────────────────────────────────────────
  // Priority: scoreComponents from score endpoint (saved by pipeline)
  // BUT override Win Rate detail text with live overview data so numbers
  // always match the hero sentence above (brandWins, totalPrompts).
  const breakdownItems: BreakdownItem[] = scoreData?.breakdown?.scoreComponents?.length
    ? scoreData.breakdown.scoreComponents.map(c => {
        // Keep points/max from score job, but patch Win Rate explanation
        // to match overview so users don't see conflicting numbers
        if (c.category === "Win Rate" && overview) {
          return {
            label:       c.category,
            value:       c.points,
            max:         c.max,
            explanation: `${overview.brandWins} wins out of ${overview.totalPrompts} prompts (${overview.winRate}% win rate)`,
          }
        }
        if (c.category === "Presence Rate" && overview) {
          return {
            label:       c.category,
            value:       c.points,
            max:         c.max,
            explanation: `Brand mentioned in ${overview.visibilityRate}% of AI answers`,
          }
        }
        return {
          label:       c.category,
          value:       c.points,
          max:         c.max,
          explanation: c.explanation,
        }
      })
    : overview
    ? [
        { label: "Brand Presence",       value: overview.visibilityRate,            max: 100 },
        { label: "Win Rate",             value: overview.winRate,                   max: 100 },
        { label: "Competitive Position", value: 100 - overview.competitorDominance, max: 100 },
      ]
    : []

  // ── Tier: starter = 2 engines, pro = 3 ──
  const engineCount   = plan?.tier === "pro" ? 3 : 2
  const confirmedComp = competitors.length

  // ── 4 stat cards: Score · Prompts · Competitor Dominance · Competitors ──
  const statCards = [
    {
      label:    "AEO Score",
      value:    score > 0 ? String(score) : "—",
      sub:      scoreData?.change != null
                  ? `${scoreData.change >= 0 ? "+" : ""}${scoreData.change} pts from last run`
                  : "No previous run",
      trend:    (scoreData?.trend ?? "stable") as "up" | "down" | "stable",
      color:    score >= 70 ? "text-emerald" : score >= 40 ? "text-amber" : "text-destructive",
    },
    {
      label:    "Prompts Tracked",
      value:    overview ? String(overview.totalPrompts) : "—",
      sub:      `across ${engineCount} engine${engineCount !== 1 ? "s" : ""}`,
      trend:    "stable" as const,
      color:    "text-foreground",
    },
    {
      label:    "Competitor Dominance",
      value:    overview ? `${overview.competitorDominance}%` : "—",
      sub:      overview
                  ? `${Math.round((overview.competitorDominance / 100) * (overview.totalPrompts || 1))} prompt${Math.round((overview.competitorDominance / 100) * (overview.totalPrompts || 1)) !== 1 ? "s" : ""} lost to competitors`
                  : "No data yet",
      trend:    overview
                  ? overview.competitorDominance >= 40 ? "down" as const
                  : overview.competitorDominance >= 20 ? "stable" as const
                  : "up" as const
                  : "stable" as const,
      color:    overview
                  ? overview.competitorDominance >= 40 ? "text-destructive"
                  : overview.competitorDominance >= 20 ? "text-amber"
                  : "text-emerald"
                  : "text-foreground",
    },
    {
      label:    "Competitors Tracked",
      value:    confirmedComp > 0 ? String(confirmedComp) : "—",
      sub:      confirmedComp > 0 ? "actively monitored" : "None confirmed yet",
      trend:    "stable" as const,
      color:    "text-foreground",
    },
  ]

  const domain  = plan?.website_url?.replace(/^https?:\/\//, "").replace(/\/$/, "") ?? plan?.domain ?? "—"
  const lastRun = plan?.last_full_pipeline ?? plan?.last_daily_tracking ?? null

  const allComps = [
    ...competitors,
    ...suggestions
      .filter(s => !dismissed.includes(s.name))
      .map(s => accepted.includes(s.name) ? { ...s, status: "active" } : s),
  ]

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen bg-background">

      {/* Topbar */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-heading font-bold text-foreground tracking-tight">Overview</h1>
          <p className="text-xs text-muted-foreground font-mono mt-0.5">{domain} · Last run {fmtDate(lastRun)}</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted border border-border text-xs text-muted-foreground font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald animate-pulse shrink-0"/>
            Pipeline: {plan?.pipeline_status ?? "idle"}
          </div>
          <a href="/onboarding" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald text-white text-xs font-semibold hover:opacity-90 transition-opacity">
            <Plus className="h-3.5 w-3.5"/> New Project
          </a>
        </div>
      </div>

      {/* Score Hero */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex flex-wrap gap-6 items-start">
          <div className="relative w-28 h-28 shrink-0">
            <svg className="-rotate-90 w-full h-full" viewBox="0 0 110 110">
              <circle cx="55" cy="55" r="46" fill="none" stroke="var(--border)" strokeWidth="8"/>
              <circle cx="55" cy="55" r="46" fill="none" stroke="var(--emerald)" strokeWidth="8"
                strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
                className="transition-all duration-700"/>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-heading text-3xl font-bold text-foreground leading-none">{score}</span>
              <span className="text-[10px] font-mono text-muted-foreground">/100</span>
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-1">
              AEO Score · {new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
            </p>
            <h2 className="font-heading text-xl font-bold text-foreground mb-2">
              {score>=80 ? "Strong Visibility" : score>=50 ? "Moderate Visibility" : "Low Visibility"}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              {overview
                ? `Brand appears in ${overview.visibilityRate}% of AI answers with ${overview.brandWins} outright wins and ${overview.noVisibility} missed prompt${overview.noVisibility !== 1 ? "s" : ""}.`
                : "Run the pipeline to generate your AEO score."}
            </p>
            {scoreData && (
              <div className="flex items-center gap-1.5 mt-2">
                <TrendIcon trend={scoreData.trend}/>
                <span className="text-xs font-mono text-muted-foreground">
                  {scoreData.change > 0 ? `+${scoreData.change}` : scoreData.change} pts from last run
                </span>
              </div>
            )}
          </div>
          {breakdownItems.length > 0 && (
            <div className="flex flex-col gap-2.5 min-w-[210px] w-full sm:w-auto">
              {breakdownItems.map(b => (
                <div key={b.label} className="flex flex-col gap-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-foreground/70 font-medium">{b.label}</span>
                    <span className="font-mono text-muted-foreground">{b.value}/{b.max}</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${Math.min((b.value/b.max)*100, 100)}%`, background: scoreColor(b.value, b.max) }}/>
                  </div>
                  {b.explanation && <p className="text-[10px] text-muted-foreground leading-snug">{b.explanation}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Stale score warning — shows when saved score was calculated on different prompt count */}
        {score > 0 && overview && scoreData?.breakdown?.promptCount != null &&
         scoreData.breakdown.promptCount !== overview.totalPrompts && (
          <div className="mt-4 pt-4 border-t border-border/50 flex items-center gap-2">
            <span className="text-[10px] px-2 py-1 rounded-lg bg-amber/10 border border-amber/20 text-amber font-mono">
              ⚠ Score calculated on {scoreData.breakdown.promptCount} prompts — re-run pipeline to refresh
            </span>
          </div>
        )}
        {score > 0 && planId && token && (
          <ScoreExplanationDropdown planId={planId} token={token} score={score}/>
        )}
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-5">
            <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-2">{s.label}</p>
            <p className={cn("font-heading text-3xl font-bold leading-none mb-1.5", s.color)}>
              {s.value}
            </p>
            <div className="flex items-center gap-1">
              <TrendIcon trend={s.trend}/>
              <span className="text-xs text-muted-foreground">{s.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Two-col: Prompt Visibility + Competitors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Prompt Visibility */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h3 className="font-heading text-sm font-semibold text-foreground">Prompt Visibility</h3>
            <a href="/dashboard/visibility" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5">
              View all <ChevronRight className="h-3 w-3"/>
            </a>
          </div>
          <div className="grid grid-cols-[1fr_64px_64px_64px] px-5 py-2 bg-muted/50 border-b border-border">
            {["Prompt", "Gemini", "GPT-4o", "Perplxty"].map(h => (
              <div key={h} className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground text-center first:text-left">{h}</div>
            ))}
          </div>
          {promptRows.length === 0 ? (
            <div className="px-5 py-8 text-center text-xs text-muted-foreground">No visibility data yet — run the pipeline first.</div>
          ) : (
            promptRows.map(p => {
              const gemini:  MentionStatus = p.engines?.gemini  ? (p.engines.gemini.mentioned  ? "yes" : "no") : "no"
              const chatgpt: MentionStatus = p.engines?.chatgpt ? (p.engines.chatgpt.mentioned ? "yes" : "no") : "no"
              return (
                <div key={p.id} className="grid grid-cols-[1fr_64px_64px_64px] px-5 py-3 border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <span className="text-xs font-medium text-foreground/80 truncate pr-2">{p.question}</span>
                  <MentionIcon status={gemini}/>
                  <MentionIcon status={chatgpt}/>
                  <MentionIcon status="locked"/>
                </div>
              )
            })
          )}
          <div className="px-5 py-3 bg-violet/5 border-t border-violet/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="h-3.5 w-3.5 text-violet"/>
              <span className="text-xs text-violet font-medium">Unlock Perplexity tracking</span>
            </div>
            <a href="/billing" className="text-[10px] font-semibold text-violet hover:text-violet-light">Upgrade to Pro →</a>
          </div>
        </div>

        {/* Competitors */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h3 className="font-heading text-sm font-semibold text-foreground">Top Competing Brands</h3>
            <a href="/dashboard/competitors" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5">
              Manage <ChevronRight className="h-3 w-3"/>
            </a>
          </div>
          {allComps.length === 0 ? (
            <div className="px-5 py-8 text-center text-xs text-muted-foreground">No competitors tracked yet.</div>
          ) : (
            allComps.map(c => {
              const isSuggested = suggestions.some(s => s.id === c.id)
              const isAccepted  = accepted.includes(c.name)
              const rate        = Math.round((c.confidence_score ?? 0) * 100)
              return (
                <div key={c.id} className={cn(
                  "flex items-center gap-3 px-5 py-3.5 border-b border-border last:border-0 transition-colors",
                  isSuggested && !isAccepted ? "bg-amber/5" : "hover:bg-muted/30"
                )}>
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0",
                    isSuggested ? "bg-amber/10 text-amber border border-amber/20" : "bg-muted text-foreground border border-border"
                  )}>
                    {(c.name || "?").charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-foreground">{c.name}</span>
                      {isSuggested && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber/10 text-amber border border-amber/20 font-mono">NEW</span>}
                    </div>
                    <span className="text-[11px] text-muted-foreground font-mono">{c.domain}</span>
                  </div>
                  {isSuggested && !isAccepted ? (
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => handleAccept(c.id, c.name)} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-emerald/10 text-emerald border border-emerald/20 hover:bg-emerald/20 transition-colors">Add</button>
                      <button onClick={() => handleIgnore(c.id, c.name)} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20 transition-colors">Skip</button>
                    </div>
                  ) : (
                    <div className="shrink-0 text-right min-w-[70px]">
                      <p className={cn("text-sm font-bold font-mono", rateColor(rate))}>
                        {rate > 0 ? `${rate}%` : isAccepted ? "Tracking" : "—"}
                      </p>
                      {rate > 0 && (
                        <div className="mt-1 h-1 w-16 ml-auto bg-muted rounded-full overflow-hidden">
                          <div className={cn("h-full rounded-full", rateBarColor(rate))} style={{ width: `${rate}%` }}/>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h3 className="font-heading text-sm font-semibold text-foreground">Top Recommendations</h3>
          <a href="/dashboard/recommendations" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5">
            View all <ChevronRight className="h-3 w-3"/>
          </a>
        </div>
        {recs.length === 0 ? (
          <div className="px-5 py-8 text-center text-xs text-muted-foreground">No recommendations yet — run the pipeline first.</div>
        ) : (
          recs.map(r => (
            <div key={r.id} className="flex items-start gap-4 px-5 py-4 border-b border-border last:border-0 hover:bg-muted/30 transition-colors group">
              <div className="w-9 h-9 rounded-xl bg-muted border border-border flex items-center justify-center text-base shrink-0 group-hover:scale-105 transition-transform">
                {patternIcon(r.pattern)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground mb-1">{r.summary}</p>
                <p className="text-xs text-emerald font-mono">{r.expected_impact}</p>
              </div>
              <div className="shrink-0 pt-0.5"><DiffBadge level={toDiff(r.priority)}/></div>
            </div>
          ))
        )}
      </div>

    </div>
  )
}