"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  TrendingUp, Users2, Star, Link2, AlertCircle,
  Loader2, CheckCircle2, XCircle, BarChart2, Zap
} from "lucide-react"
import { cn } from "@/lib/utils"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

// ─────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────
interface Score {
  value:         number
  date:          string | null
  wins:          number
  losses:        number
  shared:        number
  missed:        number
  presence_rate: number
}

interface Explanation {
  headline:        string
  summary:         string
  what_is_working: string[] | string
  improvements:    string[] | string
  top_issues:      string[] | string
  recommendations: string[] | string
}

interface Competitor {
  name:   string
  domain: string
}

interface TopCompetitor {
  name:  string
  count: number
}

interface ReportData {
  report_label?:   string
  brand_name:      string
  domain:          string
  tier:            string
  generated_at:    string
  score:           Score
  explanation:     Explanation | null
  top_competitors: TopCompetitor[]
  competitors:     Competitor[]
}

// ─────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────
function scoreColor(score: number) {
  if (score >= 70) return "text-emerald"
  if (score >= 40) return "text-amber"
  return "text-red-500"
}

function scoreBg(score: number) {
  if (score >= 70) return "bg-emerald/10 border-emerald/20"
  if (score >= 40) return "bg-amber/10 border-amber/20"
  return "bg-red-500/10 border-red-500/20"
}

function toArray(val: string[] | string | null | undefined): string[] {
  if (!val) return []
  if (Array.isArray(val)) return val
  return [val]
}

function formatDate(iso: string | null) {
  if (!iso) return ""
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
}

// ─────────────────────────────────────────
// STAT CARD
// ─────────────────────────────────────────
function StatCard({ label, value, color = "text-foreground" }: {
  label: string; value: string | number; color?: string
}) {
  return (
    <div className="bg-white border border-border rounded-xl p-4 text-center">
      <p className={cn("text-2xl font-bold font-mono", color)}>{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
    </div>
  )
}

// ─────────────────────────────────────────
// MAIN CLIENT
// ─────────────────────────────────────────
export function PublicReportClient({ token }: { token: string }) {
  const [data,    setData]    = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState<string | null>(null)

  useEffect(() => {
    if (!token) return
    fetch(`${BACKEND_URL}/report/public/${token}`)
      .then(async (res) => {
        const json = await res.json()
        if (!res.ok) throw new Error(json?.message ?? "Report not found")
        setData(json?.data ?? null)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [token])

  // ── Loading ──
  if (loading) return (
    <div className="min-h-screen bg-cloud flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-7 w-7 animate-spin text-emerald" />
        <p className="text-sm text-muted-foreground">Loading report…</p>
      </div>
    </div>
  )

  // ── Error / Revoked ──
  if (error || !data) return (
    <div className="min-h-screen bg-cloud flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="w-14 h-14 rounded-2xl bg-muted border border-border flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="h-6 w-6 text-muted-foreground" />
        </div>
        <h1 className="text-lg font-heading font-bold text-foreground mb-2">Report unavailable</h1>
        <p className="text-sm text-muted-foreground mb-6">
          {error ?? "This report link is invalid or has been revoked."}
        </p>
        <Link href="https://ai.tecsaro.com"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald text-white text-sm font-semibold hover:bg-emerald/90 transition-colors">
          Go to Tecsaro AI
        </Link>
      </div>
    </div>
  )

  const score        = data.score
  const scoreVal     = score.value ?? 0
  const presencePct  = score.presence_rate ?? 0
  const explanation  = data.explanation
  const recommendations = toArray(explanation?.recommendations)
  const whatWorking     = toArray(explanation?.what_is_working)
  const improvements    = toArray(explanation?.improvements)
  const topIssues       = toArray(explanation?.top_issues)

  return (
    <div className="min-h-screen bg-cloud">

      {/* ── Branded header ── */}
      <header className="bg-charcoal border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="https://ai.tecsaro.com" className="flex items-center gap-2">
            <Image src="/logoicon.png" alt="Tecsaro AI" width={28} height={28} />
            <span className="font-heading text-sm font-semibold text-white">Tecsaro AI</span>
          </Link>
          <div className="text-right">
            <p className="text-[10px] text-white/40 font-mono">AEO Visibility Report</p>
            {data.generated_at && (
              <p className="text-[10px] text-white/30 font-mono">{formatDate(data.generated_at)}</p>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">

        {/* ── Brand info ── */}
        <div className="bg-white border border-border rounded-2xl p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-heading font-bold text-foreground">{data.brand_name}</h1>
              {data.domain && (
                <p className="text-sm text-muted-foreground font-mono mt-0.5">{data.domain}</p>
              )}
              {data.report_label && (
                <span className="inline-block mt-2 text-xs font-medium px-2.5 py-1 rounded-full bg-muted border border-border text-muted-foreground">
                  {data.report_label}
                </span>
              )}
            </div>

            {/* Score badge */}
            <div className={cn("rounded-2xl border px-6 py-4 text-center min-w-[100px]", scoreBg(scoreVal))}>
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">AEO Score</p>
              <p className={cn("text-4xl font-bold font-mono leading-none", scoreColor(scoreVal))}>{scoreVal}</p>
              <p className="text-xs text-muted-foreground mt-0.5">/100</p>
            </div>
          </div>
        </div>

        {/* ── Score breakdown ── */}
        <div>
          <h2 className="text-sm font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
            <BarChart2 className="h-4 w-4 text-emerald" /> Visibility Breakdown
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <StatCard label="Brand Presence"  value={`${presencePct}%`} color="text-emerald"           />
            <StatCard label="Wins"             value={score.wins}        color="text-emerald"           />
            <StatCard label="Shared"           value={score.shared}      color="text-amber"             />
            <StatCard label="Losses"           value={score.losses}      color="text-red-500"           />
            <StatCard label="Missed"           value={score.missed}      color="text-muted-foreground"  />
          </div>
        </div>

        {/* ── Explanation headline ── */}
        {explanation?.headline && (
          <div className="bg-white border border-border rounded-2xl p-5">
            <p className="text-base font-heading font-semibold text-foreground">{explanation.headline}</p>
            {explanation.summary && (
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{explanation.summary}</p>
            )}
          </div>
        )}

        {/* ── What's working + Issues ── */}
        {(whatWorking.length > 0 || topIssues.length > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {whatWorking.length > 0 && (
              <div className="bg-white border border-border rounded-2xl p-5">
                <p className="text-sm font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald" /> What's Working
                </p>
                <ul className="space-y-2">
                  {whatWorking.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald shrink-0 mt-1.5" />
                      <span className="text-xs text-foreground leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {topIssues.length > 0 && (
              <div className="bg-white border border-border rounded-2xl p-5">
                <p className="text-sm font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-400" /> Top Issues
                </p>
                <ul className="space-y-2">
                  {topIssues.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1.5" />
                      <span className="text-xs text-foreground leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* ── Recommendations ── */}
        {recommendations.length > 0 && (
          <div className="bg-white border border-border rounded-2xl p-5">
            <p className="text-sm font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber" /> Recommendations
            </p>
            <ul className="space-y-2.5">
              {recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-amber/10 border border-amber/20 text-amber text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-foreground leading-relaxed">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── Top competitors ── */}
        {data.top_competitors?.length > 0 && (
          <div className="bg-white border border-border rounded-2xl p-5">
            <p className="text-sm font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
              <Users2 className="h-4 w-4 text-violet" /> Top Competitors in AI Answers
            </p>
            <div className="space-y-2">
              {data.top_competitors.map((c, i) => {
                const maxCount = data.top_competitors[0]?.count ?? 1
                const pct      = Math.round((c.count / maxCount) * 100)
                return (
                  <div key={c.name} className="flex items-center gap-3">
                    <span className="text-xs font-mono text-muted-foreground w-4 shrink-0">#{i + 1}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-foreground">{c.name}</span>
                        <span className="text-xs font-mono text-muted-foreground">{c.count}×</span>
                      </div>
                      <div className="h-1 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-violet/40 transition-all duration-700"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── Improvements ── */}
        {improvements.length > 0 && (
          <div className="bg-white border border-border rounded-2xl p-5">
            <p className="text-sm font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-500" /> Areas to Improve
            </p>
            <ul className="space-y-2">
              {improvements.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5" />
                  <span className="text-xs text-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── CTA footer ── */}
        <div className="bg-charcoal rounded-2xl p-6 text-center">
          <p className="text-white font-heading font-semibold mb-1">Want to track your own brand?</p>
          <p className="text-white/50 text-sm mb-4">Monitor your AI visibility in ChatGPT, Gemini & Perplexity.</p>
          <Link
            href="https://ai.tecsaro.com/signup"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald text-white text-sm font-semibold hover:bg-emerald/90 transition-colors"
          >
            Start Free — Tecsaro AI
          </Link>
        </div>

        {/* ── Powered by ── */}
        <div className="text-center pb-4">
          <p className="text-xs text-muted-foreground">
            Powered by{" "}
            <Link href="https://ai.tecsaro.com" className="text-emerald hover:underline font-medium">
              Tecsaro AI
            </Link>
            {" "}— AEO Visibility Platform
          </p>
        </div>

      </main>
    </div>
  )
}