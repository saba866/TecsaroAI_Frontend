"use client"

import { useState, useEffect, useCallback } from "react"
import {
  Link2, TrendingUp, Globe, AlertCircle,
  Loader2, RefreshCw, Lock, ExternalLink,
  CheckCircle2, XCircle, ChevronRight, Zap,
  BarChart2, Search
} from "lucide-react"
import { cn } from "@/lib/utils"
import { supabaseBrowser } from "@/lib/supabaseClient"
import { usePlanId } from "@/hooks/usePlanId"
import { Suspense } from "react"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

// ─────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────
interface EngineBreakdown {
  total: number
  brand_cited: number
  rate: number
}

interface TopSource {
  domain: string
  count: number
  is_brand: boolean
}

interface RecentCitation {
  id: string
  prompt: string
  engine: string
  brand_is_source: boolean
  brand_position: number | null
  source_count: number
  sources: string[]
  created_at: string
}

interface CitationData {
  citation_rate: number
  total_runs: number
  brand_cited: number
  by_engine: Record<string, EngineBreakdown>
  top_sources: TopSource[]
  missing_sources: TopSource[]
  recent: RecentCitation[]
  message?: string
}

// ─────────────────────────────────────────
// ENGINE LABELS
// ─────────────────────────────────────────
const ENGINE_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  chatgpt:    { label: "ChatGPT",    color: "text-emerald-700",  bg: "bg-emerald-50 border-emerald-200"   },
  gemini:     { label: "Gemini",     color: "text-blue-700",     bg: "bg-blue-50 border-blue-200"         },
  perplexity: { label: "Perplexity", color: "text-violet-700",   bg: "bg-violet-50 border-violet-200"     },
}

// ─────────────────────────────────────────
// STAT CARD
// ─────────────────────────────────────────
function StatCard({ label, value, sub, icon: Icon, highlight = false }: {
  label: string; value: string | number; sub?: string
  icon: any; highlight?: boolean
}) {
  return (
    <div className={cn(
      "rounded-2xl border p-5 flex flex-col gap-3",
      highlight ? "bg-emerald/5 border-emerald/20" : "bg-white border-border"
    )}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{label}</span>
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center",
          highlight ? "bg-emerald/10" : "bg-muted"
        )}>
          <Icon className={cn("h-4 w-4", highlight ? "text-emerald" : "text-muted-foreground")} />
        </div>
      </div>
      <div>
        <p className={cn("text-3xl font-bold font-mono tracking-tight",
          highlight ? "text-emerald" : "text-foreground"
        )}>{value}</p>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────
// ENGINE BREAKDOWN CARD
// ─────────────────────────────────────────
function EngineCard({ engine, data }: { engine: string; data: EngineBreakdown }) {
  const meta  = ENGINE_LABELS[engine] ?? { label: engine, color: "text-foreground", bg: "bg-muted border-border" }
  const pct   = Math.round(data.rate * 100)
  return (
    <div className="bg-white border border-border rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full border font-mono", meta.bg, meta.color)}>
          {meta.label}
        </span>
        <span className="text-lg font-bold font-mono text-foreground">{pct}%</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-3">
        <div
          className="h-full rounded-full bg-emerald transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
        <span>{data.brand_cited} cited</span>
        <span>{data.total} total</span>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────
// SOURCE ROW
// ─────────────────────────────────────────
function SourceRow({ source, rank, maxCount }: { source: TopSource; rank: number; maxCount: number }) {
  const pct = Math.round((source.count / maxCount) * 100)
  return (
    <div className="flex items-center gap-4 py-3 border-b border-border last:border-0">
      <span className="text-xs font-mono text-muted-foreground w-5 shrink-0">#{rank}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-foreground truncate">{source.domain}</span>
          {source.is_brand && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald/10 text-emerald border border-emerald/20 font-mono shrink-0">
              YOUR SITE
            </span>
          )}
        </div>
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <div
            className={cn("h-full rounded-full transition-all duration-700",
              source.is_brand ? "bg-emerald" : "bg-violet/40"
            )}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <span className="text-sm font-mono font-semibold text-foreground shrink-0">{source.count}×</span>
    </div>
  )
}

// ─────────────────────────────────────────
// RECENT ROW
// ─────────────────────────────────────────
function RecentRow({ citation }: { citation: RecentCitation }) {
  const meta    = ENGINE_LABELS[citation.engine] ?? { label: citation.engine, color: "text-foreground", bg: "bg-muted border-border" }
  const dateStr = new Date(citation.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })

  return (
    <div className="flex items-start gap-4 py-3.5 border-b border-border last:border-0">
      <div className="mt-0.5 shrink-0">
        {citation.brand_is_source
          ? <CheckCircle2 className="h-4 w-4 text-emerald" />
          : <XCircle      className="h-4 w-4 text-muted-foreground/40" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground truncate mb-1">{citation.prompt}</p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-full border font-mono", meta.bg, meta.color)}>
            {meta.label}
          </span>
          <span className="text-xs text-muted-foreground font-mono">{citation.source_count} sources</span>
          {citation.brand_position && (
            <span className="text-xs text-muted-foreground font-mono">pos #{citation.brand_position}</span>
          )}
        </div>
      </div>
      <span className="text-xs text-muted-foreground font-mono shrink-0">{dateStr}</span>
    </div>
  )
}

// ─────────────────────────────────────────
// PRO GATE
// ─────────────────────────────────────────
function ProGate() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-violet/10 border border-violet/20 flex items-center justify-center mb-6">
        <Lock className="h-7 w-7 text-violet" />
      </div>
      <h2 className="text-xl font-heading font-bold text-foreground mb-2">AI Citation Tracking</h2>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">
        See which sources AI engines cite when answering questions in your category — and whether your website is one of them.
      </p>
      <div className="bg-white border border-border rounded-2xl p-5 max-w-xs w-full mb-6 text-left">
        {[
          "Citation rate across ChatGPT, Gemini & Perplexity",
          "Top sources AI pulls from in your category",
          "Gaps — high-traffic sources you're missing from",
          "Per-prompt citation breakdown",
        ].map((f) => (
          <div key={f} className="flex items-start gap-2.5 mb-3 last:mb-0">
            <CheckCircle2 className="h-4 w-4 text-emerald shrink-0 mt-0.5" />
            <span className="text-xs text-foreground">{f}</span>
          </div>
        ))}
      </div>
      <button
        onClick={() => window.location.href = "/dashboard/billing?plan=pro"}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald text-white text-sm font-semibold hover:bg-emerald/90 transition-colors"
      >
        <Zap className="h-4 w-4" /> Upgrade to Pro
      </button>
    </div>
  )
}

// ─────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────
 function CitationsContent() {
  const planId = usePlanId()

  const [data,     setData]     = useState<CitationData | null>(null)
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState<string | null>(null)
  const [isPro,    setIsPro]    = useState<boolean | null>(null)

  const getToken = async () => {
    const { data } = await supabaseBrowser.auth.getSession()
    return data?.session?.access_token ?? null
  }

  const load = useCallback(async () => {
    if (!planId) return
    setLoading(true); setError(null)
    try {
      const token = await getToken()
      const res   = await fetch(`${BACKEND_URL}/aeo/citations/${planId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.status === 403) { setIsPro(false); setLoading(false); return }
      if (!res.ok) throw new Error("Failed to load citation data")

      const json = await res.json()
      setIsPro(true)
      setData(json?.data ?? null)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [planId])

  useEffect(() => { load() }, [load])

  // ── Loading ──
  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="h-6 w-6 animate-spin text-emerald" />
    </div>
  )

  // ── Pro gate ──
  if (isPro === false) return <ProGate />

  // ── Error ──
  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
      <AlertCircle className="h-7 w-7 text-destructive" />
      <p className="text-sm text-destructive">{error}</p>
      <button onClick={load} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
        <RefreshCw className="h-3.5 w-3.5" /> Retry
      </button>
    </div>
  )

  // ── Empty state ──
  if (!data || data.total_runs === 0) return (
    <div className="p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-xl font-heading font-bold text-foreground">AI Citation Tracking</h1>
        <p className="text-xs text-muted-foreground font-mono mt-0.5">Which sources AI cites when answering about your category</p>
      </div>
      <div className="flex flex-col items-center justify-center py-20 text-center bg-white border border-border rounded-2xl">
        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium text-foreground mb-1">No citation data yet</p>
        <p className="text-xs text-muted-foreground max-w-xs">
          Run an AI audit from your dashboard to start tracking which sources AI engines cite in your category.
        </p>
      </div>
    </div>
  )

  const citationPct  = Math.round((data.citation_rate ?? 0) * 100)
  const maxSrcCount  = data.top_sources?.[0]?.count ?? 1

  return (
    <div className="p-6 max-w-5xl space-y-6">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-heading font-bold text-foreground">AI Citation Tracking</h1>
          <p className="text-xs text-muted-foreground font-mono mt-0.5">
            Which sources AI cites when answering about your category
          </p>
        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-white text-xs font-semibold text-foreground hover:bg-muted transition-colors"
        >
          <RefreshCw className="h-3 w-3" /> Refresh
        </button>
      </div>

      {/* ── Top stats ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          label="Citation Rate"
          value={`${citationPct}%`}
          sub="of prompts your site was cited"
          icon={TrendingUp}
          highlight
        />
        <StatCard
          label="Total Audits"
          value={data.total_runs}
          sub="prompts checked"
          icon={BarChart2}
        />
        <StatCard
          label="Brand Cited"
          value={data.brand_cited}
          sub="times as a source"
          icon={Link2}
        />
        <StatCard
          label="Sources Found"
          value={data.top_sources?.length ?? 0}
          sub="unique domains cited"
          icon={Globe}
        />
      </div>

      {/* ── Engine breakdown ── */}
      {Object.keys(data.by_engine ?? {}).length > 0 && (
        <div className="bg-white border border-border rounded-2xl p-5">
          <p className="text-sm font-heading font-semibold text-foreground mb-4">Citation Rate by Engine</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.entries(data.by_engine).map(([engine, breakdown]) => (
              <EngineCard key={engine} engine={engine} data={breakdown} />
            ))}
          </div>
        </div>
      )}

      {/* ── Top sources + Missing sources ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Top sources */}
        <div className="bg-white border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-heading font-semibold text-foreground">Top Cited Sources</p>
            <span className="text-xs text-muted-foreground font-mono">by frequency</span>
          </div>
          {data.top_sources?.length > 0 ? (
            <div>
              {data.top_sources.map((src, i) => (
                <SourceRow key={src.domain} source={src} rank={i + 1} maxCount={maxSrcCount} />
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground py-4 text-center">No sources found yet</p>
          )}
        </div>

        {/* Missing sources */}
        <div className="bg-white border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-heading font-semibold text-foreground">Missing Opportunities</p>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Sources AI cites often — but your brand isn't there yet
          </p>
          {data.missing_sources?.length > 0 ? (
            <div>
              {data.missing_sources.map((src, i) => (
                <div key={src.domain} className="flex items-center gap-3 py-3 border-b border-border last:border-0">
                  <div className="w-7 h-7 rounded-lg bg-amber/10 border border-amber/20 flex items-center justify-center shrink-0">
                    <AlertCircle className="h-3.5 w-3.5 text-amber" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{src.domain}</p>
                    <p className="text-xs text-muted-foreground font-mono">cited {src.count}× — you're not listed</p>
                  </div>
                  <a
                    href={`https://${src.domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle2 className="h-8 w-8 text-emerald mb-2" />
              <p className="text-sm font-medium text-foreground">No gaps found</p>
              <p className="text-xs text-muted-foreground mt-1">Your brand appears in all frequently cited sources</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Recent citations ── */}
      {data.recent?.length > 0 && (
        <div className="bg-white border border-border rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <p className="text-sm font-heading font-semibold text-foreground">Recent Citation Results</p>
            <span className="text-xs text-muted-foreground font-mono">last {data.recent.length} audits</span>
          </div>
          <div className="px-5">
            {data.recent.map((c) => (
              <RecentRow key={c.id} citation={c} />
            ))}
          </div>
        </div>
      )}

      {/* ── Action tips ── */}
      {data.missing_sources?.length > 0 && (
        <div className="bg-amber/5 border border-amber/20 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber/10 border border-amber/20 flex items-center justify-center shrink-0 mt-0.5">
              <Zap className="h-4 w-4 text-amber" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">How to improve your citation rate</p>
              <ul className="space-y-1.5">
                {data.missing_sources.slice(0, 3).map((src) => (
                  <li key={src.domain} className="flex items-start gap-2">
                    <ChevronRight className="h-3.5 w-3.5 text-amber shrink-0 mt-0.5" />
                    <span className="text-xs text-foreground">
                      Get listed on <strong>{src.domain}</strong> — AI cites it {src.count}× in your category
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default function CitationsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CitationsContent />
    </Suspense>
  )
}