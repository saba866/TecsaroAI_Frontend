







"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Plus, MoreHorizontal, ExternalLink, Trash2,
  RefreshCw, Lock, FolderKanban, Clock, Loader2,
  TrendingUp, Minus, TrendingDown, Bell, BellOff,
  CheckCircle2, AlertCircle, FileText, CalendarClock,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { supabaseBrowser } from "@/lib/supabaseClient"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

// ── Types ──────────────────────────────────────────────────────────────────
type PlanTier = "starter" | "pro"

interface Project {
  id: string
  name: string
  domain: string
  score: number | null
  lastRunAt: string | null
  status: "active" | "running" | "error" | "pending"
  prompts: number
  promptsMax: number
  promptsMin: number
  promptsGenerated: number
  promptsReadyForReview: boolean
  promptsApproved: boolean
  brandPresence: number | null
  trend: "up" | "down" | "neutral"
  subscriptionStatus: string
  onboardingStep: number
  visibilityRuns: number
  reportsSentThisMonth: number
  sendDailyReport: boolean
  trialEndsAt: string | null
  currentPeriodEnd: string | null
  billingInterval: string | null
  isFoundingMember: boolean
  country: string | null
  language: string | null
}

const PLAN_LIMITS: Record<PlanTier, number> = { starter: 1, pro: 3 }

// ── Helpers ────────────────────────────────────────────────────────────────
function formatRelative(iso: string | null): string {
  if (!iso) return "Never"
  const diff  = Date.now() - new Date(iso).getTime()
  const mins  = Math.floor(diff / 60_000)
  const hours = Math.floor(diff / 3_600_000)
  const days  = Math.floor(diff / 86_400_000)
  if (mins  < 60) return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

function formatDate(iso: string | null): string {
  if (!iso) return "—"
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

function daysUntil(iso: string | null): number | null {
  if (!iso) return null
  const diff = new Date(iso).getTime() - Date.now()
  if (diff <= 0) return 0
  return Math.ceil(diff / 86_400_000)
}

function nextRunLabel(lastRunAt: string | null, tier: PlanTier): string {
  if (!lastRunAt) return "Not scheduled"
  const intervalMs = (tier === "pro" ? 3 : 7) * 86_400_000
  const diff = new Date(lastRunAt).getTime() + intervalMs - Date.now()
  if (diff <= 0) return "Due now"
  const days  = Math.floor(diff / 86_400_000)
  const hours = Math.floor(diff / 3_600_000)
  return days > 0 ? `in ${days}d` : `in ${hours}h`
}

function mapPlan(p: Record<string, any>): Project {
  const lastRunAt =
    p.last_full_pipeline ??
    p.last_daily_tracking ??
    p.last_weekly_refresh ??
    null

  const rawStatus = (p.pipeline_status ?? "idle") as string
  const status: Project["status"] =
    rawStatus === "running"                          ? "running" :
    rawStatus === "error" || rawStatus === "failed"  ? "error"   :
    rawStatus === "complete" || rawStatus === "idle" ? "active"  :
    "pending"

  return {
    id:                    String(p.id),
    name:                  p.name ?? "Untitled",
    domain:                (p.website_url ?? "").replace(/^https?:\/\//, "").replace(/\/$/, ""),
    score:                 null,
    lastRunAt,
    status,
    prompts:               p.prompts_used_this_month    ?? 0,
    promptsMax:            p.prompt_select_max          ?? 20,
    promptsMin:            p.prompt_select_min          ?? 5,
    promptsGenerated:      p.prompts_generate_count     ?? 50,
    promptsReadyForReview: p.prompts_ready_for_review   ?? false,
    promptsApproved:       p.prompts_approved           ?? false,
    brandPresence:         null,
    trend:                 "neutral" as const,
    subscriptionStatus:    p.subscription_status        ?? "trial",
    onboardingStep:        p.onboarding_step            ?? 0,
    visibilityRuns:        p.visibility_runs_this_month ?? 0,
    reportsSentThisMonth:  p.reports_sent_this_month    ?? 0,
    sendDailyReport:       p.send_daily_report          ?? true,
    trialEndsAt:           p.trial_ends_at              ?? null,
    currentPeriodEnd:      p.current_period_end         ?? null,
    billingInterval:       p.billing_interval           ?? null,
    isFoundingMember:      p.is_founding_member         ?? false,
    country:               p.country                    ?? null,
    language:              p.language                   ?? null,
  }
}

// ── Sub-components ─────────────────────────────────────────────────────────
function StatusDot({ status }: { status: Project["status"] }) {
  if (status === "running" || status === "pending") return <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
  if (status === "error")  return <span className="w-2 h-2 rounded-full bg-destructive" />
  return <span className="w-2 h-2 rounded-full bg-emerald" />
}

function TrialBanner({ trialEndsAt }: { trialEndsAt: string | null }) {
  const days = daysUntil(trialEndsAt)
  if (days === null) return null
  const urgent = days <= 3
  return (
    <div className={cn(
      "flex items-center justify-between px-3 py-2 rounded-lg text-[11px] font-mono mb-3",
      urgent ? "bg-destructive/8 border border-destructive/20" : "bg-amber/8 border border-amber/20"
    )}>
      <span className={cn("font-semibold", urgent ? "text-destructive" : "text-amber")}>
        {days === 0 ? "Trial expired" : `Trial ends in ${days} day${days !== 1 ? "s" : ""}`}
      </span>
      <span className={cn("text-[10px]", urgent ? "text-destructive/70" : "text-amber/70")}>
        {formatDate(trialEndsAt)}
      </span>
    </div>
  )
}

// function PromptsStatus({ approved, readyForReview, used, max }: {
//   approved: boolean
//   readyForReview: boolean
//   used: number
//   max: number
// }) {
//   if (!approved && !readyForReview) {
//     return (
//       <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-mono">
//         <AlertCircle className="h-3 w-3 text-amber shrink-0" />
//         <span className="text-amber">Prompts not set up</span>
//       </div>
//     )
//   }
//   if (!approved && readyForReview) {
//     return (
//       <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-mono">
//         <AlertCircle className="h-3 w-3 text-amber shrink-0" />
//         <span className="text-amber">Prompts awaiting approval</span>
//       </div>
//     )
//   }
//   return (
//     <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-mono">
//       <CheckCircle2 className="h-3 w-3 text-emerald shrink-0" />
//       <span className="text-foreground font-semibold">{used}</span>
//       <span className="text-muted-foreground">/ {max} prompts active</span>
//     </div>
//   )
// }

// ── Page ───────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const router = useRouter()

  const [projects, setProjects] = useState<Project[]>([])
  const [tier,     setTier]     = useState<PlanTier>("starter")
  const [loading,  setLoading]  = useState(true)
  const [fetchErr, setFetchErr] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  const maxProjects = PLAN_LIMITS[tier]
  const canCreate   = projects.length < maxProjects

  const getToken = async (): Promise<string | null> => {
    const { data } = await supabaseBrowser.auth.getSession()
    return data?.session?.access_token ?? null
  }

  const fetchProjects = async () => {
    setLoading(true)
    setFetchErr(null)
    try {
      const token = await getToken()
      if (!token) { router.replace("/login"); return }

      const res = await fetch(`${BACKEND_URL}/plans`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error(`Server error ${res.status}`)

      const json = await res.json()
      const rawPlans = json?.plans ?? json?.data ?? []
      if (!Array.isArray(rawPlans)) throw new Error("Unexpected response from server")

      setProjects(rawPlans.map(mapPlan))
      setTier((json?.tier ?? "starter") as PlanTier)
    } catch (err: any) {
      setFetchErr(err?.message ?? "Failed to load projects")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProjects() }, [])

  const deleteProject = async (id: string) => {
    setDeleting(id)
    setMenuOpen(null)
    try {
      const token = await getToken()
      if (!token) return
      const res = await fetch(`${BACKEND_URL}/plans/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) setProjects((p) => p.filter((pr) => pr.id !== id))
    } catch (err) {
      console.error("Delete error:", err)
    } finally {
      setDeleting(null)
    }
  }

  // const runPipeline = async (id: string) => {
  //   setMenuOpen(null)
  //   try {
  //     const token = await getToken()
  //     if (!token) return
  //     await fetch(`${BACKEND_URL}/plans/${id}/run`, {
  //       method: "POST",
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     setProjects((p) => p.map((pr) => pr.id === id ? { ...pr, status: "running" } : pr))
  //   } catch (err) {
  //     console.error("Run pipeline error:", err)
  //   }
  // }

  // ── States ───────────────────────────────────────────────────────────
  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 text-emerald animate-spin" />
        <p className="text-sm text-muted-foreground font-mono">Loading projects…</p>
      </div>
    </div>
  )

  if (fetchErr) return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="bg-card border border-destructive/20 rounded-xl p-8 text-center max-w-sm">
        <p className="text-sm font-semibold text-foreground mb-2">Failed to load projects</p>
        <p className="text-xs text-muted-foreground mb-4">{fetchErr}</p>
        <button onClick={fetchProjects} className="px-4 py-2 rounded-lg bg-emerald text-white text-sm font-semibold hover:bg-emerald-dark transition-colors">
          Try again
        </button>
      </div>
    </div>
  )

  // ── Main ─────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen bg-background">

      {/* Topbar */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-heading font-bold text-foreground tracking-tight">Projects</h1>
          <p className="text-xs text-muted-foreground font-mono mt-0.5">
            {projects.length} of {maxProjects} used · {tier === "pro" ? "Pro" : "Starter"} Plan
          </p>
        </div>
        {canCreate ? (
          <button
            onClick={() => router.push("/onboarding")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald text-white text-sm font-semibold hover:bg-emerald-dark transition-colors"
          >
            <Plus className="h-4 w-4" /> New Project
          </button>
        ) : (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted border border-border text-sm text-muted-foreground cursor-not-allowed select-none">
            <Lock className="h-3.5 w-3.5" /> {maxProjects} / {maxProjects} projects used
          </div>
        )}
      </div>

      {/* Usage bar */}
      <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
        <FolderKanban className="h-4 w-4 text-muted-foreground shrink-0" />
        <div className="flex-1">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="font-medium text-foreground">Project slots used</span>
            <span className="font-mono text-muted-foreground">{projects.length} / {maxProjects}</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all duration-500",
                projects.length >= maxProjects ? "bg-amber" : "bg-emerald"
              )}
              style={{ width: `${(projects.length / maxProjects) * 100}%` }}
            />
          </div>
        </div>
        {projects.length >= maxProjects && tier === "starter" && (
          <button onClick={() => router.push("./dashboard/billing")} className="text-xs font-semibold text-violet hover:text-violet-light transition-colors whitespace-nowrap">
            Upgrade plan →
          </button>
        )}
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

        {projects.map((project) => (
          <div
            key={project.id}
            className={cn(
              "bg-card border border-border rounded-xl overflow-hidden hover:border-foreground/20 transition-colors",
              deleting === project.id && "opacity-40 pointer-events-none"
            )}
          >
            {/* Status stripe */}
            <div className={cn("h-0.5",
              project.status === "error"   ? "bg-destructive" :
              project.status === "running" || project.status === "pending" ? "bg-amber" : "bg-emerald"
            )} />

            <div className="p-5">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-muted border border-border flex items-center justify-center font-heading text-sm font-bold text-foreground shrink-0">
                    {project.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading text-sm font-bold text-foreground">{project.name}</h3>
                      <StatusDot status={project.status} />
                      {project.isFoundingMember && (
                        <span className="text-[9px] font-bold font-mono px-1.5 py-0.5 rounded-full bg-violet/10 text-violet border border-violet/20 uppercase tracking-wide">
                          Founding
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-muted-foreground font-mono truncate max-w-[160px]">{project.domain}</p>
                  </div>
                </div>

                {/* Menu */}
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen(menuOpen === project.id ? null : project.id)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                  {menuOpen === project.id && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(null)} />
                      <div className="absolute right-0 top-8 z-20 w-44 bg-card border border-border rounded-xl shadow-lg overflow-hidden">
                        <div className="border-t border-border" />
                        <button onClick={() => deleteProject(project.id)}
                          className="flex items-center gap-2.5 w-full px-3 py-2.5 text-sm text-destructive hover:bg-destructive/5 transition-colors">
                          <Trash2 className="h-3.5 w-3.5" /> Delete project
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Trial banner — only if on trial */}
              {project.subscriptionStatus === "trial" && project.trialEndsAt && (
                <TrialBanner trialEndsAt={project.trialEndsAt} />
              )}

              {/* Prompts status — critical onboarding indicator */}
              {/* <div className="mb-3">
                <PromptsStatus
                  approved={project.promptsApproved}
                  readyForReview={project.promptsReadyForReview}
                  used={project.prompts}
                  max={project.promptsMax}
                />
              </div> */}

              {/* Metrics grid */}
              {/* <div className="grid grid-cols-3 gap-2 mb-3">

                <div className="bg-muted/50 rounded-lg p-2.5 text-center">
                  <p className="text-[10px] text-muted-foreground font-mono mb-0.5">Runs</p>
                  <p className="text-sm font-bold font-heading text-foreground">{project.visibilityRuns}</p>
                  <p className="text-[9px] text-muted-foreground font-mono">this month</p>
                </div>

                <div className="bg-muted/50 rounded-lg p-2.5 text-center">
                  
                  <p className="text-[9px] text-muted-foreground font-mono">runs</p>
                </div>

                <div className="bg-muted/50 rounded-lg p-2.5 text-center">
                  <p className="text-[10px] text-muted-foreground font-mono mb-0.5">Reports</p>
                  <p className="text-sm font-bold font-heading text-foreground">{project.reportsSentThisMonth}</p>
                  <p className="text-[9px] text-muted-foreground font-mono">sent</p>
                </div>

              </div> */}

              {/* Billing period end — for active/paid subscribers */}
              {project.subscriptionStatus === "active" && project.currentPeriodEnd && (
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground mb-3">
                  <CalendarClock className="h-3 w-3 shrink-0" />
                  <span>Renews {formatDate(project.currentPeriodEnd)}</span>
                  {project.billingInterval && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground border border-border ml-auto capitalize">
                      {project.billingInterval}
                    </span>
                  )}
                </div>
              )}

              {/* Status row */}
              {/* <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase tracking-wide",
                    project.subscriptionStatus === "active"    ? "bg-emerald/10 text-emerald border border-emerald/20"  :
                    project.subscriptionStatus === "trial"     ? "bg-amber/10 text-amber border border-amber/20"        :
                    project.subscriptionStatus === "cancelled" ? "bg-destructive/10 text-destructive border border-destructive/20" :
                    "bg-muted text-muted-foreground border border-border"
                  )}>
                    {project.subscriptionStatus}
                  </span>
                  {project.onboardingStep < 5 && (
                    <span className="text-[10px] text-amber font-mono font-semibold">
                      Setup {project.onboardingStep}/5
                    </span>
                  )}
                </div> */}

                {/* Daily report toggle indicator */}
                {/* <div className={cn(
                  "inline-flex items-center gap-1 text-[10px] font-mono",
                  project.sendDailyReport ? "text-emerald" : "text-muted-foreground"
                )}>
                  {project.sendDailyReport
                    ? <><Bell className="h-3 w-3" /> Daily report on</>
                    : <><BellOff className="h-3 w-3" /> Daily report off</>
                  }
                </div>
              </div> */}

              {/* Run info */}
              {/* <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-mono">
                  <Clock className="h-3 w-3" />
                  {project.lastRunAt ? formatRelative(project.lastRunAt) : "Never run"}
                </div>
                <div className="text-[11px] font-mono">
                  {project.status === "error" ? (
                    <span className="text-destructive font-semibold">Run failed</span>
                  ) : project.lastRunAt ? (
                    <span className="text-muted-foreground">Next {nextRunLabel(project.lastRunAt, tier)}</span>
                  ) : (
                    <span className="text-muted-foreground">Pending first run</span>
                  )}
                </div>
              </div> */}

              {/* Error banner */}
              {project.status === "error" && (
                <div className="mt-3 px-3 py-2 rounded-lg bg-destructive/5 border border-destructive/20 flex items-center justify-between">
                  <p className="text-xs text-destructive">Pipeline failed — retry to rerun</p>
                  <button onClick={() => runPipeline(project.id)} className="text-xs font-semibold text-destructive hover:opacity-70 transition-opacity">
                    Retry →
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Empty slot */}
        {canCreate && (
          <button
            onClick={() => router.push("/onboarding")}
            className="bg-card border border-dashed border-border rounded-xl p-5 flex flex-col items-center justify-center gap-3 min-h-[240px] hover:border-emerald/50 hover:bg-emerald/[0.02] transition-colors group"
          >
            <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center group-hover:border-emerald/30 group-hover:bg-emerald/5 transition-colors">
              <Plus className="h-5 w-5 text-muted-foreground group-hover:text-emerald transition-colors" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-foreground mb-1">New Project</p>
              <p className="text-xs text-muted-foreground">
                {maxProjects - projects.length} slot{maxProjects - projects.length !== 1 ? "s" : ""} remaining
              </p>
            </div>
          </button>
        )}

        {/* Upgrade slot */}
        {!canCreate && tier === "starter" && (
          <div className="bg-violet/5 border border-violet/20 rounded-xl p-5 flex flex-col items-center justify-center gap-3 min-h-[240px]">
            <div className="w-10 h-10 rounded-xl bg-violet/10 border border-violet/20 flex items-center justify-center">
              <Lock className="h-5 w-5 text-violet" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-foreground mb-1">Unlock more projects</p>
              <p className="text-xs text-muted-foreground mb-3">Upgrade to Pro to track up to 3 brands</p>
              <button onClick={() => router.push("/billing")} className="px-4 py-2 rounded-lg bg-violet text-white text-xs font-semibold hover:opacity-90 transition-opacity">
                Upgrade to Pro
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}