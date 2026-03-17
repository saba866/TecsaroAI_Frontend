"use client"

import { useState, useEffect, useCallback } from "react"
import { usePlanId } from "@/hooks/usePlanId"
import { supabaseBrowser } from "@/lib/supabaseClient"
import {
  AlertCircle, CheckCircle2, AlertTriangle, Info,
  Loader2, RefreshCw, ChevronDown, ChevronUp,
  ExternalLink, Shield, FileText, Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Suspense } from "react"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

// ─────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────
interface Issue {
  type:     string
  severity: "critical" | "warning" | "info"
  message:  string
  fix:      string
}

interface AuditPage {
  id:             string
  url:            string
  title:          string | null
  h1:             string | null
  word_count:     number
  score:          number
  issues:         Issue[]
  critical_count: number
  warning_count:  number
  status:         "critical" | "warning" | "healthy"
  crawled_at:     string
}

interface SummaryIssue extends Issue {
  count: number
  pct:   number
}

interface AuditData {
  total_pages:    number
  health_score:   number
  critical_count: number
  warning_count:  number
  pages:          AuditPage[]
  summary:        SummaryIssue[]
  is_limited:     boolean
  tier:           string
  message?:       string
}

// ─────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────
function severityIcon(severity: string, size = "h-4 w-4") {
  if (severity === "critical") return <AlertCircle    className={cn(size, "text-destructive shrink-0")} />
  if (severity === "warning")  return <AlertTriangle  className={cn(size, "text-amber shrink-0")} />
  return                              <Info           className={cn(size, "text-blue-400 shrink-0")} />
}

function severityBadge(severity: string) {
  const map = {
    critical: "bg-destructive/10 text-destructive border-destructive/20",
    warning:  "bg-amber/10 text-amber border-amber/20",
    info:     "bg-blue-400/10 text-blue-400 border-blue-400/20",
  }
  return (
    <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded-full border font-mono uppercase", map[severity] ?? map.info)}>
      {severity}
    </span>
  )
}

function scoreColor(score: number) {
  if (score >= 80) return "text-emerald"
  if (score >= 50) return "text-amber"
  return "text-destructive"
}

function scoreBg(score: number) {
  if (score >= 80) return "bg-emerald/10 border-emerald/20"
  if (score >= 50) return "bg-amber/10 border-amber/20"
  return "bg-destructive/10 border-destructive/20"
}

function shortUrl(url: string) {
  try {
    const u = new URL(url)
    return u.pathname === "/" ? u.hostname : u.pathname
  } catch {
    return url
  }
}

// ─────────────────────────────────────────
// PAGE ROW
// ─────────────────────────────────────────
function PageRow({ page }: { page: AuditPage }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-muted/30 transition-colors text-left"
      >
        {/* Score */}
        <div className={cn("w-10 h-10 rounded-lg border flex items-center justify-center shrink-0 text-sm font-bold font-mono", scoreBg(page.score))}>
          <span className={scoreColor(page.score)}>{page.score}</span>
        </div>

        {/* URL + meta */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{shortUrl(page.url)}</p>
          <p className="text-[11px] text-muted-foreground font-mono truncate mt-0.5">
            {page.title || <span className="text-destructive/70">No title</span>}
          </p>
        </div>

        {/* Issue counts */}
        <div className="flex items-center gap-2 shrink-0">
          {page.critical_count > 0 && (
            <span className="flex items-center gap-1 text-[11px] font-semibold text-destructive font-mono">
              <AlertCircle className="h-3 w-3"/> {page.critical_count}
            </span>
          )}
          {page.warning_count > 0 && (
            <span className="flex items-center gap-1 text-[11px] font-semibold text-amber font-mono">
              <AlertTriangle className="h-3 w-3"/> {page.warning_count}
            </span>
          )}
          {page.critical_count === 0 && page.warning_count === 0 && (
            <CheckCircle2 className="h-4 w-4 text-emerald"/>
          )}
        </div>

        {/* Expand */}
        {open ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0"/> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0"/>}
      </button>

      {/* Expanded issues */}
      {open && (
        <div className="px-5 pb-4 space-y-2">
          {page.issues.length === 0 ? (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-emerald/5 border border-emerald/20">
              <CheckCircle2 className="h-4 w-4 text-emerald shrink-0"/>
              <span className="text-xs text-emerald font-medium">No issues found — this page looks great!</span>
            </div>
          ) : (
            page.issues.map((issue, i) => (
              <div key={i} className={cn(
                "flex items-start gap-3 px-3 py-2.5 rounded-lg border",
                issue.severity === "critical" ? "bg-destructive/5 border-destructive/15" :
                issue.severity === "warning"  ? "bg-amber/5 border-amber/15" :
                "bg-blue-400/5 border-blue-400/15"
              )}>
                <div className="mt-0.5">{severityIcon(issue.severity, "h-3.5 w-3.5")}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-xs font-semibold text-foreground">{issue.message}</p>
                    {severityBadge(issue.severity)}
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{issue.fix}</p>
                </div>
              </div>
            ))
          )}
          <div className="pt-1">
            <a
              href={page.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-3 w-3"/> View page
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────
 function TechnicalAuditPage() {
  const planId = usePlanId()

  const [data,    setData]    = useState<AuditData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState<string | null>(null)
  const [filter,  setFilter]  = useState<"all" | "critical" | "warning" | "healthy">("all")

  const getToken = async () => {
    const { data } = await supabaseBrowser.auth.getSession()
    return data?.session?.access_token ?? null
  }

  const load = useCallback(async () => {
    if (!planId) return
    setLoading(true); setError(null)
    try {
      const token = await getToken()
      const res   = await fetch(`${BACKEND_URL}/aeo/technical-audit/${planId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.message ?? "Failed to load audit")
      setData(json?.data ?? null)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [planId])

  useEffect(() => { load() }, [load])

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="h-6 w-6 animate-spin text-emerald"/>
    </div>
  )

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
      <AlertCircle className="h-7 w-7 text-destructive"/>
      <p className="text-sm text-destructive">{error}</p>
      <button onClick={load} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
        <RefreshCw className="h-3.5 w-3.5"/> Retry
      </button>
    </div>
  )

  if (!data || data.total_pages === 0) return (
    <div className="p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-xl font-heading font-bold text-foreground">Technical Audit</h1>
        <p className="text-xs text-muted-foreground font-mono mt-0.5">Page-by-page technical health check</p>
      </div>
      <div className="flex flex-col items-center justify-center py-20 text-center bg-white border border-border rounded-2xl">
        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4">
          <FileText className="h-5 w-5 text-muted-foreground"/>
        </div>
        <p className="text-sm font-medium text-foreground mb-1">No pages crawled yet</p>
        <p className="text-xs text-muted-foreground max-w-xs">
          {data?.message ?? "Run the pipeline to crawl your website and see technical issues."}
        </p>
      </div>
    </div>
  )

  const filteredPages = data.pages.filter(p => {
    if (filter === "all")      return true
    if (filter === "critical") return p.critical_count > 0
    if (filter === "warning")  return p.warning_count > 0 && p.critical_count === 0
    if (filter === "healthy")  return p.status === "healthy"
    return true
  })

  const healthColor = data.health_score >= 80 ? "text-emerald" : data.health_score >= 50 ? "text-amber" : "text-destructive"
  const healthBg    = data.health_score >= 80 ? "bg-emerald/5 border-emerald/20" : data.health_score >= 50 ? "bg-amber/5 border-amber/20" : "bg-destructive/5 border-destructive/20"

  return (
    <div className="p-6 max-w-5xl space-y-6">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-heading font-bold text-foreground">Technical Audit</h1>
          <p className="text-xs text-muted-foreground font-mono mt-0.5">
            {data.total_pages} pages crawled · Issues affecting AI visibility
          </p>
        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-white text-xs font-semibold text-foreground hover:bg-muted transition-colors"
        >
          <RefreshCw className="h-3 w-3"/> Refresh
        </button>
      </div>

      {/* ── Top stats ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className={cn("rounded-2xl border p-5", healthBg)}>
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-2">Health Score</p>
          <p className={cn("text-3xl font-bold font-mono", healthColor)}>{data.health_score}</p>
          <p className="text-xs text-muted-foreground mt-0.5">/100</p>
        </div>
        <div className="bg-white border border-border rounded-2xl p-5">
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-2">Pages Audited</p>
          <p className="text-3xl font-bold font-mono text-foreground">{data.total_pages}</p>
          <p className="text-xs text-muted-foreground mt-0.5">crawled pages</p>
        </div>
        <div className="bg-white border border-border rounded-2xl p-5">
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-2">Critical Issues</p>
          <p className="text-3xl font-bold font-mono text-destructive">{data.critical_count}</p>
          <p className="text-xs text-muted-foreground mt-0.5">need immediate fix</p>
        </div>
        <div className="bg-white border border-border rounded-2xl p-5">
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-2">Warnings</p>
          <p className="text-3xl font-bold font-mono text-amber">{data.warning_count}</p>
          <p className="text-xs text-muted-foreground mt-0.5">should be fixed</p>
        </div>
      </div>

      {/* ── Issue summary ── */}
      {data.summary.length > 0 && (
        <div className="bg-white border border-border rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-4 w-4 text-muted-foreground"/>
            <p className="text-sm font-heading font-semibold text-foreground">Most Common Issues</p>
          </div>
          <div className="space-y-3">
            {data.summary.map((issue, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-5 shrink-0">{severityIcon(issue.severity, "h-4 w-4")}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs font-medium text-foreground truncate">{issue.message}</p>
                    {severityBadge(issue.severity)}
                  </div>
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full",
                        issue.severity === "critical" ? "bg-destructive" :
                        issue.severity === "warning"  ? "bg-amber" : "bg-blue-400"
                      )}
                      style={{ width: `${issue.pct}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs font-mono text-muted-foreground shrink-0">
                  {issue.count}/{data.total_pages}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Page list ── */}
      <div className="bg-white border border-border rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <p className="text-sm font-heading font-semibold text-foreground">Pages</p>
          {/* Filter tabs */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-muted border border-border">
            {(["all", "critical", "warning", "healthy"] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all capitalize",
                  filter === f ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {filteredPages.length === 0 ? (
          <div className="px-5 py-8 text-center text-xs text-muted-foreground">
            No pages match this filter.
          </div>
        ) : (
          filteredPages.map(page => <PageRow key={page.id} page={page} />)
        )}

        {/* Free plan limit banner */}
        {data.is_limited && (
          <div className="px-5 py-4 bg-violet/5 border-t border-violet/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-3.5 w-3.5 text-violet"/>
              <span className="text-xs text-violet font-medium">
                Showing 3 of {data.total_pages} pages — upgrade to see full audit
              </span>
            </div>
            <a
              href="/dashboard/billing?plan=starter"
              className="text-[10px] font-semibold text-violet hover:text-violet-light transition-colors"
            >
              Upgrade →
            </a>
          </div>
        )}
      </div>

    </div>
  )
 }
  
  export default function TechnicalPage() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <TechnicalAuditPage />
      </Suspense>
    )
  }