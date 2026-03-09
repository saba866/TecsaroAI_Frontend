


"use client"

import { Suspense, useState, useEffect, useCallback } from "react"
import { supabaseBrowser } from "@/lib/supabaseClient"
import { usePlanId } from "@/hooks/usePlanId"
import { Loader2, Download, RefreshCw } from "lucide-react"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

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

function SchemaPageInner() {
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
            <button onClick={() => downloadAll(pages)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-semibold text-foreground hover:bg-muted transition-colors">
              <Download className="h-3.5 w-3.5" /> Download All
            </button>
          )}
          
        </div>
      </div>

      {genMsg && (
        <div className="px-4 py-2.5 rounded-lg text-xs font-medium text-emerald border border-emerald/20 bg-emerald/5">
          ✓ {genMsg} — results will appear shortly.
        </div>
      )}

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

      {pages.length === 0 ? (
        <div className="bg-card border border-border rounded-xl py-14 flex flex-col items-center gap-3 text-center">
          <span className="text-3xl">🧩</span>
          <p className="text-sm font-semibold text-foreground">No schemas yet</p>
          <p className="text-xs text-muted-foreground max-w-xs">
            Click "Generate Schemas" to analyse your pages and produce structured data ready to deploy.
          </p>
          
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="grid gap-0 border-b border-border bg-muted px-5 py-3"
            style={{ gridTemplateColumns:"1fr 200px 140px 110px" }}>
            {["Page","Schema Types","Status","Action"].map(h => (
              <span key={h} className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{h}</span>
            ))}
          </div>
          {pages.map((page, i) => {
            const failed = isFailed(page)
            return (
              <div key={page.page_id}
                className={`grid gap-0 px-5 py-4 items-center transition-colors ${i < pages.length - 1 ? "border-b border-border" : ""} ${failed ? "bg-destructive/5" : "hover:bg-muted/30"}`}
                style={{ gridTemplateColumns:"1fr 200px 140px 110px" }}>
                <div>
                  <p className="text-sm font-medium text-foreground mb-0.5">{page.title || "Untitled"}</p>
                  <p className="text-[11px] font-mono text-violet">{page.url}</p>
                </div>
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

export default function SchemaPage() {
  return (
    <Suspense fallback={null}>
      <SchemaPageInner />
    </Suspense>
  )
}