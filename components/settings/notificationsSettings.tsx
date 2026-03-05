"use client"

import { useState, useEffect } from "react"
import { supabaseBrowser } from "@/lib/supabaseClient"
import { Loader2, Check, Info } from "lucide-react"

// ── Types ──────────────────────────────────────────────────────────────────
interface NotifPrefs {
  run_completed:       boolean
  score_drop:          boolean
  new_competitor:      boolean
  weekly_report:       boolean
  optimization_alert:  boolean
  product_updates:     boolean
}

const DEFAULTS: NotifPrefs = {
  run_completed:      true,
  score_drop:         true,
  new_competitor:     true,
  weekly_report:      true,
  optimization_alert: true,
  product_updates:    false,
}

// ── Toggle ─────────────────────────────────────────────────────────────────
function Toggle({
  on, onChange,
}: {
  on: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className={`relative w-10 h-[22px] rounded-full transition-colors duration-200 shrink-0
        ${on ? "bg-emerald" : "bg-gray-200"}`}
      role="switch"
      aria-checked={on}
    >
      <span
        className={`absolute top-[3px] w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200
          ${on ? "translate-x-5" : "translate-x-[3px]"}`}
      />
    </button>
  )
}

// ── Row ────────────────────────────────────────────────────────────────────
function PrefRow({
  title, desc, value, onChange,
}: {
  title: string
  desc: string
  value: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-gray-100 last:border-0 gap-4">
      <div className="min-w-0">
        <p className="text-sm font-medium text-charcoal leading-tight">{title}</p>
        <p className="text-xs text-graphite mt-0.5 leading-relaxed">{desc}</p>
      </div>
      <Toggle on={value} onChange={onChange} />
    </div>
  )
}

// ── Component ──────────────────────────────────────────────────────────────
export function NotificationsSettings() {
  const [prefs,   setPrefs]   = useState<NotifPrefs>(DEFAULTS)
  const [loading, setLoading] = useState(true)
  const [saving,  setSaving]  = useState(false)
  const [saved,   setSaved]   = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  // ── Load from Supabase ────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabaseBrowser.auth.getUser()
      if (!user) { setLoading(false); return }

      const { data } = await supabaseBrowser
        .from("notification_preferences")
        .select("*")
        .eq("user_id", user.id)
        .single()

      if (data) {
        setPrefs({
          run_completed:      data.run_completed      ?? DEFAULTS.run_completed,
          score_drop:         data.score_drop         ?? DEFAULTS.score_drop,
          new_competitor:     data.new_competitor     ?? DEFAULTS.new_competitor,
          weekly_report:      data.weekly_report      ?? DEFAULTS.weekly_report,
          optimization_alert: data.optimization_alert ?? DEFAULTS.optimization_alert,
          product_updates:    data.product_updates    ?? DEFAULTS.product_updates,
        })
      }
      // No row = user hasn't saved yet; defaults are fine
      setLoading(false)
    }
    load()
  }, [])

  // ── Save ─────────────────────────────────────────────────────────────
  const handleSave = async () => {
    setSaving(true)
    setError(null)
    try {
      const { data: { user } } = await supabaseBrowser.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const { error: upsertErr } = await supabaseBrowser
        .from("notification_preferences")
        .upsert(
          { user_id: user.id, ...prefs, updated_at: new Date().toISOString() },
          { onConflict: "user_id" }
        )

      if (upsertErr) throw upsertErr

      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (err: any) {
      setError(err.message ?? "Save failed")
    } finally {
      setSaving(false)
    }
  }

  const set = (key: keyof NotifPrefs) => (v: boolean) =>
    setPrefs(p => ({ ...p, [key]: v }))

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-6 w-6 text-emerald animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-heading text-lg font-semibold text-charcoal mb-0.5">
          Notification Preferences
        </h2>
        <p className="text-sm text-graphite">
          Control which emails your backend cron jobs send you
        </p>
      </div>

      {/* How it works callout */}
      <div className="flex gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
        <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-700 leading-relaxed">
          Your backend cron jobs query the{" "}
          <code className="bg-blue-100 px-1 rounded font-mono">notification_preferences</code>{" "}
          table before sending any email. Toggle off to stop that email type entirely —
          no code changes needed.
        </p>
      </div>

      {/* Pipeline */}
      <div>
        <p className="text-[10px] font-semibold text-graphite uppercase tracking-widest mb-2 font-mono px-1">
          Pipeline Events
        </p>
        <div className="bg-gray-50 rounded-xl border border-gray-100 px-4 divide-y divide-gray-100">
          <PrefRow
            title="Pipeline run completed"
            desc="Email when an automatic or manual AEO scan finishes running"
            value={prefs.run_completed}
            onChange={set("run_completed")}
          />
          <PrefRow
            title="AEO score drop"
            desc="Alert when your score drops 5 or more points between consecutive runs"
            value={prefs.score_drop}
            onChange={set("score_drop")}
          />
          <PrefRow
            title="New competitor discovered"
            desc="When your AI scan surfaces a competitor appearing in your tracked prompts"
            value={prefs.new_competitor}
            onChange={set("new_competitor")}
          />
        </div>
      </div>

      {/* Reports */}
      <div>
        <p className="text-[10px] font-semibold text-graphite uppercase tracking-widest mb-2 font-mono px-1">
          Reports & Insights
        </p>
        <div className="bg-gray-50 rounded-xl border border-gray-100 px-4 divide-y divide-gray-100">
          <PrefRow
            title="Weekly visibility report"
            desc="Every Monday — summary of AI visibility changes across all your prompts"
            value={prefs.weekly_report}
            onChange={set("weekly_report")}
          />
          <PrefRow
            title="Optimization alerts"
            desc="Emailed when new high-impact recommendations are generated after a run"
            value={prefs.optimization_alert}
            onChange={set("optimization_alert")}
          />
        </div>
      </div>

      {/* Product */}
      <div>
        <p className="text-[10px] font-semibold text-graphite uppercase tracking-widest mb-2 font-mono px-1">
          Product
        </p>
        <div className="bg-gray-50 rounded-xl border border-gray-100 px-4">
          <PrefRow
            title="Product updates"
            desc="New features, improvements, and release notes from TecSaro"
            value={prefs.product_updates}
            onChange={set("product_updates")}
          />
        </div>
      </div>

      {error && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
        {saved && (
          <span className="flex items-center gap-1.5 text-xs text-emerald font-medium">
            <Check className="h-3.5 w-3.5" /> Preferences saved
          </span>
        )}
        <div className="ml-auto">
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald text-white
              text-sm font-semibold hover:bg-emerald/90 transition-colors disabled:opacity-60"
          >
            {saving ? (
              <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving…</>
            ) : (
              "Save Preferences"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}