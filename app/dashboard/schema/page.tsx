

// "use client"

// import { useState, useEffect, useCallback } from "react"
// import { supabaseBrowser } from "@/lib/supabaseClient"
// import { usePlanId } from "@/hooks/usePlanId"
// import { Loader2, Download, RefreshCw } from "lucide-react"
// import { cn } from "@/lib/utils"

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

// // ── Types ──────────────────────────────────────────────────────────────────
// interface Schema {
//   id:          string
//   schema_type: string
//   schema_json: any
//   created_at:  string
// }

// interface PageGroup {
//   page_id:  string
//   url:      string
//   title:    string
//   status:   string
//   schemas:  Schema[]
// }

// interface SchemaStats {
//   total:        number
//   total_pages:  number
//   covered:      number
//   failed:       number
//   schema_types: string[]
//   coverage_pct: number
// }

// // ── Helpers ────────────────────────────────────────────────────────────────
// function isFailed(page: PageGroup) {
//   return page.status === "error" || page.status === "failed" || page.schemas.length === 0
// }

// function copyJSON(json: any) {
//   navigator.clipboard.writeText(JSON.stringify(json, null, 2))
//     .then(() => alert("Copied to clipboard!"))
//     .catch(() => alert("Copy failed"))
// }

// function downloadAll(pages: PageGroup[]) {
//   const all = pages.flatMap(p =>
//     p.schemas.map(s => ({ page: p.url, type: s.schema_type, schema: s.schema_json }))
//   )
//   const blob = new Blob([JSON.stringify(all, null, 2)], { type: "application/json" })
//   const url  = URL.createObjectURL(blob)
//   const a    = document.createElement("a")
//   a.href     = url
//   a.download = "schemas.json"
//   a.click()
//   URL.revokeObjectURL(url)
// }

// // ── Page ───────────────────────────────────────────────────────────────────
// export default function SchemaPage() {
//   const planId = usePlanId()

//   const [pages,      setPages]      = useState<PageGroup[]>([])
//   const [stats,      setStats]      = useState<SchemaStats | null>(null)
//   const [loading,    setLoading]    = useState(true)
//   const [error,      setError]      = useState("")
//   const [generating, setGenerating] = useState(false)
//   const [genMsg,     setGenMsg]     = useState("")

//   // ── LOAD ──
//   const load = useCallback(async () => {
//     if (!planId) return
//     setLoading(true)
//     setError("")
//     try {
//       const { data: s } = await supabaseBrowser.auth.getSession()
//       const token = s?.session?.access_token
//       if (!token) { setError("Session expired"); return }

//       const res  = await fetch(`${BACKEND_URL}/aeo/schema/${planId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       const json = await res.json()
//       if (!res.ok) { setError(json?.error ?? "Failed to load"); return }

//       setPages(json.pages ?? [])
//       setStats({
//         total:        json.total        ?? 0,
//         total_pages:  json.total_pages  ?? 0,
//         covered:      json.covered      ?? 0,
//         failed:       json.failed       ?? 0,
//         schema_types: json.schema_types ?? [],
//         coverage_pct: json.coverage_pct ?? 0,
//       })
//     } catch { setError("Network error") } finally { setLoading(false) }
//   }, [planId])

//   useEffect(() => { load() }, [load])

//   // ── GENERATE ──
//   const handleGenerate = async () => {
//     if (!planId) return
//     setGenerating(true)
//     setGenMsg("")
//     try {
//       const { data: s } = await supabaseBrowser.auth.getSession()
//       const token = s?.session?.access_token
//       if (!token) return

//       const res  = await fetch(`${BACKEND_URL}/aeo/schema`, {
//         method:  "POST",
//         headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//         body:    JSON.stringify({ planId }),
//       })
//       const json = await res.json()
//       setGenMsg(json?.message ?? "Schema generation started")
//       // poll after 5s
//       setTimeout(() => load(), 5000)
//     } catch { setGenMsg("Failed to start generation") } finally { setGenerating(false) }
//   }

//   // ── RETRY PAGE ──
//   const handleRetry = async (pageId: string) => {
//     if (!planId) return
//     try {
//       const { data: s } = await supabaseBrowser.auth.getSession()
//       const token = s?.session?.access_token
//       if (!token) return

//       await fetch(`${BACKEND_URL}/aeo/schema`, {
//         method:  "POST",
//         headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//         body:    JSON.stringify({ planId, pageId }),
//       })
//       setTimeout(() => load(), 3000)
//     } catch (e) { console.error(e) }
//   }

//   // ── GUARDS ──
//   if (!planId) return (
//     <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"100vh", gap:12 }}>
//       <p style={{ fontSize:13, color:"var(--muted)" }}>No project selected.</p>
//       <a href="/dashboard" style={{ fontSize:12, color:"var(--green)", textDecoration:"underline" }}>Go to Dashboard and select a project</a>
//     </div>
//   )

//   if (loading) return (
//     <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh" }}>
//       <Loader2 style={{ width:24, height:24, color:"var(--muted)", animation:"spin 1s linear infinite" }} />
//     </div>
//   )

//   if (error) return (
//     <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh" }}>
//       <p style={{ color:"var(--red)", fontSize:13 }}>{error}</p>
//     </div>
//   )

//   const coveragePct  = stats?.coverage_pct ?? 0
//   const coverageColor = coveragePct >= 80 ? "var(--green)" : coveragePct >= 50 ? "var(--amber)" : "var(--red)"

//   return (
//     <div style={{ padding:28, flex:1, background:"var(--bg)", minHeight:"100vh" }}>

//       {/* ── SECTION HEADER ── */}
//       <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
//         <div>
//           <h1 style={{ fontFamily:"'Clash Display',sans-serif", fontSize:16, fontWeight:600, color:"var(--ink)", letterSpacing:"-0.2px" }}>
//             Schema Coverage
//           </h1>
//           <p style={{ fontSize:12, color:"var(--muted)", marginTop:2 }}>
//             {stats?.total ?? 0} schemas across {stats?.total_pages ?? 0} pages
//             {(stats?.failed ?? 0) > 0 && ` · ${stats!.failed} page${stats!.failed > 1 ? "s" : ""} failed`}
//           </p>
//         </div>
//         <div style={{ display:"flex", gap:8 }}>
//           {pages.length > 0 && (
//             <button
//               onClick={() => downloadAll(pages)}
//               style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"6px 12px", borderRadius:8, fontSize:12, fontWeight:600, cursor:"pointer", background:"var(--white)", color:"var(--ink)", border:"1px solid var(--border2)" }}>
//               <Download style={{ width:13, height:13 }} /> Download All
//             </button>
//           )}
//           <button
//             onClick={handleGenerate}
//             disabled={generating}
//             style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"6px 12px", borderRadius:8, fontSize:12, fontWeight:600, cursor:"pointer", background:"var(--ink)", color:"#fff", border:"none", opacity: generating ? 0.7 : 1 }}>
//             {generating
//               ? <><Loader2 style={{ width:13, height:13, animation:"spin 1s linear infinite" }} /> Generating...</>
//               : <><RefreshCw style={{ width:13, height:13 }} /> {pages.length > 0 ? "Re-generate" : "Generate Schemas"}</>
//             }
//           </button>
//         </div>
//       </div>

//       {/* Gen message */}
//       {genMsg && (
//         <div style={{ marginBottom:14, padding:"10px 16px", background:"var(--green-bg)", border:"1px solid #A8D5BC", borderRadius:8, fontSize:12, color:"var(--green)" }}>
//           ✓ {genMsg} — results will appear shortly.
//         </div>
//       )}

//       {/* ── STATS GRID ── */}
//       <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
//         <div style={{ background:"var(--white)", border:"1px solid var(--border)", borderRadius:12, padding:20 }}>
//           <div style={{ fontSize:11, color:"var(--muted)", fontFamily:"'JetBrains Mono',monospace", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>Pages Covered</div>
//           <div style={{ fontFamily:"'Clash Display',sans-serif", fontSize:28, fontWeight:700, color:"var(--ink)", lineHeight:1, marginBottom:4 }}>
//             {stats?.covered ?? 0}<span style={{ fontSize:16, color:"var(--muted)", fontWeight:400 }}>/{stats?.total_pages ?? 0}</span>
//           </div>
//           <div style={{ fontSize:11, fontFamily:"'JetBrains Mono',monospace", color: (stats?.failed ?? 0) > 0 ? "var(--red)" : "var(--green)" }}>
//             {(stats?.failed ?? 0) > 0 ? `↓ ${stats!.failed} page failed` : "✓ All pages covered"}
//           </div>
//         </div>

//         <div style={{ background:"var(--white)", border:"1px solid var(--border)", borderRadius:12, padding:20 }}>
//           <div style={{ fontSize:11, color:"var(--muted)", fontFamily:"'JetBrains Mono',monospace", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>Schemas Generated</div>
//           <div style={{ fontFamily:"'Clash Display',sans-serif", fontSize:28, fontWeight:700, color:"var(--ink)", lineHeight:1, marginBottom:4 }}>{stats?.total ?? 0}</div>
//           <div style={{ fontSize:11, fontFamily:"'JetBrains Mono',monospace", color:"var(--green)" }}>✓ Ready to deploy</div>
//         </div>

//         <div style={{ background:"var(--white)", border:"1px solid var(--border)", borderRadius:12, padding:20 }}>
//           <div style={{ fontSize:11, color:"var(--muted)", fontFamily:"'JetBrains Mono',monospace", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>Schema Types</div>
//           <div style={{ fontFamily:"'Clash Display',sans-serif", fontSize:28, fontWeight:700, color:"var(--ink)", lineHeight:1, marginBottom:4 }}>{stats?.schema_types?.length ?? 0}</div>
//           <div style={{ fontSize:11, fontFamily:"'JetBrains Mono',monospace", color:"var(--muted)" }}>
//             {stats?.schema_types?.slice(0,3).join(" · ") || "—"}
//           </div>
//         </div>

//         <div style={{ background:"var(--white)", border:"1px solid var(--border)", borderRadius:12, padding:20 }}>
//           <div style={{ fontSize:11, color:"var(--muted)", fontFamily:"'JetBrains Mono',monospace", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>Coverage Score</div>
//           <div style={{ fontFamily:"'Clash Display',sans-serif", fontSize:28, fontWeight:700, color: coverageColor, lineHeight:1, marginBottom:4 }}>{coveragePct}%</div>
//           <div style={{ fontSize:11, fontFamily:"'JetBrains Mono',monospace", color: (stats?.failed ?? 0) > 0 ? "var(--red)" : "var(--green)" }}>
//             {(stats?.failed ?? 0) > 0 ? "↓ Failures reduce score" : "✓ Full coverage"}
//           </div>
//         </div>
//       </div>

//       {/* ── PAGES TABLE ── */}
//       {pages.length === 0 ? (
//         <div style={{ background:"var(--white)", border:"1px solid var(--border)", borderRadius:12, padding:"48px 20px", textAlign:"center" }}>
//           <div style={{ fontSize:28, marginBottom:10 }}>🧩</div>
//           <div style={{ fontSize:14, fontWeight:600, color:"var(--ink)", marginBottom:6 }}>No schemas yet</div>
//           <div style={{ fontSize:12, color:"var(--muted)", marginBottom:16, maxWidth:280, margin:"0 auto 16px" }}>
//             Click "Generate Schemas" to analyse your pages and generate structured data.
//           </div>
//         </div>
//       ) : (
//         <div style={{ background:"var(--white)", border:"1px solid var(--border)", borderRadius:12, overflow:"hidden" }}>

//           {/* Header row */}
//           <div style={{ display:"grid", gridTemplateColumns:"1fr 160px 120px 100px", alignItems:"center", padding:"12px 20px", background:"var(--bg)", borderBottom:"1px solid var(--border)" }}>
//             {["Page","Schema Types","Status","Action"].map(h => (
//               <div key={h} style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--muted)", fontFamily:"'JetBrains Mono',monospace" }}>{h}</div>
//             ))}
//           </div>

//           {/* Data rows */}
//           {pages.map((page, i) => {
//             const failed = isFailed(page)
//             return (
//               <div key={page.page_id}
//                 style={{
//                   display:"grid", gridTemplateColumns:"1fr 160px 120px 100px",
//                   alignItems:"center", padding:"14px 20px",
//                   borderBottom: i < pages.length - 1 ? "1px solid var(--border)" : "none",
//                   background: failed ? "var(--red-bg)" : "transparent",
//                   transition:"background 0.1s",
//                 }}>

//                 {/* Page info */}
//                 <div>
//                   <div style={{ fontSize:13, fontWeight:500, color:"var(--ink)", marginBottom:2 }}>
//                     {page.title || "Untitled"}
//                   </div>
//                   <div style={{ fontSize:12, fontFamily:"'JetBrains Mono',monospace", color:"var(--blue)" }}>
//                     {page.url}
//                   </div>
//                 </div>

//                 {/* Schema type tags */}
//                 <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
//                   {failed ? (
//                     <span style={{ padding:"2px 8px", background:"var(--red-bg)", color:"var(--red)", borderRadius:4, fontSize:10, fontFamily:"'JetBrains Mono',monospace", fontWeight:500 }}>
//                       ✗ Failed
//                     </span>
//                   ) : (
//                     page.schemas.map(s => (
//                       <span key={s.id} style={{ padding:"2px 8px", background:"var(--blue-bg)", color:"var(--blue)", borderRadius:4, fontSize:10, fontFamily:"'JetBrains Mono',monospace", fontWeight:500 }}>
//                         {s.schema_type}
//                       </span>
//                     ))
//                   )}
//                 </div>

//                 {/* Status pill */}
//                 <div>
//                   {failed ? (
//                     <span style={{ display:"inline-flex", alignItems:"center", gap:4, padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:600, fontFamily:"'JetBrains Mono',monospace", background:"var(--red-bg)", color:"var(--red)" }}>
//                       ✗ Error
//                     </span>
//                   ) : (
//                     <span style={{ display:"inline-flex", alignItems:"center", gap:4, padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:600, fontFamily:"'JetBrains Mono',monospace", background:"var(--green-bg)", color:"var(--green)" }}>
//                       ✓ Generated
//                     </span>
//                   )}
//                 </div>

//                 {/* Action button */}
//                 <div>
//                   {failed ? (
//                     <button
//                       onClick={() => handleRetry(page.page_id)}
//                       style={{ padding:"4px 12px", background:"var(--ink)", color:"#fff", border:"none", borderRadius:6, fontSize:11, fontWeight:600, cursor:"pointer" }}>
//                       Retry
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => {
//                         const allJson = page.schemas.reduce((acc, s) => ({ ...acc, [s.schema_type]: s.schema_json }), {})
//                         copyJSON(allJson)
//                       }}
//                       style={{ padding:"4px 10px", background:"var(--bg)", border:"1px solid var(--border)", borderRadius:6, fontSize:11, color:"var(--muted)", cursor:"pointer", fontWeight:500 }}>
//                       Copy JSON
//                     </button>
//                   )}
//                 </div>
//               </div>
//             )
//           })}
//         </div>
//       )}

//       {/* Spin keyframe */}
//       <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
//     </div>
//   )
// }




"use client"

import { useState, useEffect, useCallback } from "react"
import { supabaseBrowser } from "@/lib/supabaseClient"
import { usePlanId } from "@/hooks/usePlanId"
import { Loader2, Download, RefreshCw } from "lucide-react"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

// ── Types ──────────────────────────────────────────────────────────────────
interface Schema {
  id:          string
  schema_type: string
  schema_json: any
  created_at:  string
}

interface PageGroup {
  page_id: string
  url:     string
  title:   string
  status:  string
  schemas: Schema[]
}

interface SchemaStats {
  total:        number
  total_pages:  number
  covered:      number
  failed:       number
  schema_types: string[]
  coverage_pct: number
}

// ── Helpers ────────────────────────────────────────────────────────────────
function isFailed(page: PageGroup) {
  return page.status === "error" || page.status === "failed" || page.schemas.length === 0
}

function copyJSON(json: any) {
  navigator.clipboard.writeText(JSON.stringify(json, null, 2))
    .then(() => alert("Copied to clipboard!"))
    .catch(() => alert("Copy failed"))
}

function downloadAll(pages: PageGroup[]) {
  const all  = pages.flatMap(p => p.schemas.map(s => ({ page: p.url, type: s.schema_type, schema: s.schema_json })))
  const blob = new Blob([JSON.stringify(all, null, 2)], { type: "application/json" })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement("a")
  a.href = url; a.download = "schemas.json"; a.click()
  URL.revokeObjectURL(url)
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function SchemaPage() {
  const planId = usePlanId()

  const [pages,      setPages]      = useState<PageGroup[]>([])
  const [stats,      setStats]      = useState<SchemaStats | null>(null)
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState("")
  const [generating, setGenerating] = useState(false)
  const [genMsg,     setGenMsg]     = useState("")

  const load = useCallback(async () => {
    if (!planId) return
    setLoading(true); setError("")
    try {
      const { data: s } = await supabaseBrowser.auth.getSession()
      const token = s?.session?.access_token
      if (!token) { setError("Session expired"); return }

      const res  = await fetch(`${BACKEND_URL}/aeo/schema/${planId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await res.json()
      if (!res.ok) { setError(json?.error ?? "Failed to load"); return }

      setPages(json.pages ?? [])
      setStats({
        total:        json.total        ?? 0,
        total_pages:  json.total_pages  ?? 0,
        covered:      json.covered      ?? 0,
        failed:       json.failed       ?? 0,
        schema_types: json.schema_types ?? [],
        coverage_pct: json.coverage_pct ?? 0,
      })
    } catch { setError("Network error") } finally { setLoading(false) }
  }, [planId])

  useEffect(() => { load() }, [load])

  const handleGenerate = async () => {
    if (!planId) return
    setGenerating(true); setGenMsg("")
    try {
      const { data: s } = await supabaseBrowser.auth.getSession()
      const token = s?.session?.access_token
      if (!token) return
      const res  = await fetch(`${BACKEND_URL}/aeo/schema`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body:   JSON.stringify({ planId }),
      })
      const json = await res.json()
      setGenMsg(json?.message ?? "Schema generation started")
      setTimeout(() => load(), 5000)
    } catch { setGenMsg("Failed to start generation") } finally { setGenerating(false) }
  }

  const handleRetry = async (pageId: string) => {
    if (!planId) return
    try {
      const { data: s } = await supabaseBrowser.auth.getSession()
      const token = s?.session?.access_token
      if (!token) return
      await fetch(`${BACKEND_URL}/aeo/schema`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body:   JSON.stringify({ planId, pageId }),
      })
      setTimeout(() => load(), 3000)
    } catch (e) { console.error(e) }
  }

  // ── Guards ──
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
      <p className="text-sm text-destructive">{error}</p>
    </div>
  )

  const coveragePct   = stats?.coverage_pct ?? 0
  const coverageColor = coveragePct >= 80 ? "text-emerald" : coveragePct >= 50 ? "text-amber" : "text-destructive"

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen bg-background">

      {/* ── Header ── */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-heading font-bold text-foreground tracking-tight">Schema Coverage</h1>
          <p className="text-xs text-muted-foreground font-mono mt-0.5">
            {stats?.total ?? 0} schemas across {stats?.total_pages ?? 0} pages
            {(stats?.failed ?? 0) > 0 && ` · ${stats!.failed} page${stats!.failed > 1 ? "s" : ""} failed`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {pages.length > 0 && (
            <button
              onClick={() => downloadAll(pages)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-semibold text-foreground hover:bg-muted transition-colors">
              <Download className="h-3.5 w-3.5" /> Download All
            </button>
          )}
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity disabled:opacity-50">
            {generating
              ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Generating...</>
              : <><RefreshCw className="h-3.5 w-3.5" /> {pages.length > 0 ? "Re-generate" : "Generate Schemas"}</>
            }
          </button>
        </div>
      </div>

      {/* Gen message */}
      {genMsg && (
        <div className="px-4 py-2.5 rounded-lg text-xs font-medium text-emerald border border-emerald/20 bg-emerald/5">
          ✓ {genMsg} — results will appear shortly.
        </div>
      )}

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-4 gap-4">

        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Pages Covered</p>
          <p className="font-heading text-3xl font-bold text-foreground leading-none mb-1">
            {stats?.covered ?? 0}
            <span className="text-base font-normal text-muted-foreground">/{stats?.total_pages ?? 0}</span>
          </p>
          <p className={`text-[11px] font-mono ${(stats?.failed ?? 0) > 0 ? "text-destructive" : "text-emerald"}`}>
            {(stats?.failed ?? 0) > 0 ? `↓ ${stats!.failed} page failed` : "✓ All pages covered"}
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Schemas Generated</p>
          <p className="font-heading text-3xl font-bold text-foreground leading-none mb-1">{stats?.total ?? 0}</p>
          <p className="text-[11px] font-mono text-emerald">✓ Ready to deploy</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Schema Types</p>
          <p className="font-heading text-3xl font-bold text-foreground leading-none mb-1">{stats?.schema_types?.length ?? 0}</p>
          <p className="text-[11px] font-mono text-muted-foreground truncate">
            {stats?.schema_types?.slice(0,3).join(" · ") || "—"}
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Coverage Score</p>
          <p className={`font-heading text-3xl font-bold leading-none mb-1 ${coverageColor}`}>{coveragePct}%</p>
          <p className={`text-[11px] font-mono ${(stats?.failed ?? 0) > 0 ? "text-destructive" : "text-emerald"}`}>
            {(stats?.failed ?? 0) > 0 ? "↓ Failures reduce score" : "✓ Full coverage"}
          </p>
        </div>
      </div>

      {/* ── Pages Table ── */}
      {pages.length === 0 ? (
        <div className="bg-card border border-border rounded-xl py-14 flex flex-col items-center gap-3 text-center">
          <span className="text-3xl">🧩</span>
          <p className="text-sm font-semibold text-foreground">No schemas yet</p>
          <p className="text-xs text-muted-foreground max-w-xs">
            Click "Generate Schemas" to analyse your pages and produce structured data ready to deploy.
          </p>
          <button onClick={handleGenerate} disabled={generating}
            className="mt-1 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity disabled:opacity-50">
            {generating ? "Generating..." : "Generate Schemas"}
          </button>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">

          {/* Table header */}
          <div className="grid gap-0 border-b border-border bg-muted px-5 py-3"
            style={{ gridTemplateColumns:"1fr 200px 140px 110px" }}>
            {["Page","Schema Types","Status","Action"].map(h => (
              <span key={h} className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{h}</span>
            ))}
          </div>

          {/* Table rows */}
          {pages.map((page, i) => {
            const failed = isFailed(page)
            return (
              <div key={page.page_id}
                className={`grid gap-0 px-5 py-4 items-center transition-colors ${i < pages.length - 1 ? "border-b border-border" : ""} ${failed ? "bg-destructive/5" : "hover:bg-muted/30"}`}
                style={{ gridTemplateColumns:"1fr 200px 140px 110px" }}>

                {/* Page */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-0.5">{page.title || "Untitled"}</p>
                  <p className="text-[11px] font-mono text-violet">{page.url}</p>
                </div>

                {/* Schema type tags */}
                <div className="flex gap-1.5 flex-wrap">
                  {failed ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-destructive/10 text-destructive">
                      ✗ Failed
                    </span>
                  ) : (
                    page.schemas.map(s => (
                      <span key={s.id} className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-violet/10 text-violet">
                        {s.schema_type}
                      </span>
                    ))
                  )}
                </div>

                {/* Status */}
                <div>
                  {failed ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-destructive/10 text-destructive">
                      ✗ Error
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-emerald/10 text-emerald">
                      ✓ Generated
                    </span>
                  )}
                </div>

                {/* Action */}
                <div>
                  {failed ? (
                    <button onClick={() => handleRetry(page.page_id)}
                      className="px-3 py-1 rounded-md bg-foreground text-background text-[11px] font-semibold hover:opacity-90 transition-opacity cursor-pointer border-none">
                      Retry
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        const allJson = page.schemas.reduce((acc, s) => ({ ...acc, [s.schema_type]: s.schema_json }), {})
                        copyJSON(allJson)
                      }}
                      className="px-2.5 py-1 rounded-md border border-border bg-muted text-[11px] text-muted-foreground font-medium hover:text-foreground hover:border-border/80 transition-colors cursor-pointer">
                      Copy JSON
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}