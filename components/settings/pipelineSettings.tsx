"use client"

import { useState, useEffect } from "react"
import { supabaseBrowser } from "@/lib/supabaseClient"
import { Loader2, Lock, Check } from "lucide-react"

interface PipelinePrefs {
  auto_run:      boolean
  email_report:  boolean
}

function Toggle({ on, onChange, disabled }: { on: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!on)}
      disabled={disabled}
      className={`relative w-10 h-[22px] rounded-full transition-colors duration-200 shrink-0
        ${on && !disabled ? "bg-emerald" : "bg-gray-200"}
        ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span className={`absolute top-[3px] w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200
        ${on && !disabled ? "translate-x-5" : "translate-x-[3px]"}`}
      />
    </button>
  )
}

export function PipelineSettings() {
  const [prefs,   setPrefs]   = useState<PipelinePrefs>({ auto_run: true, email_report: true })
  const [plan,    setPlan]    = useState<"starter" | "pro">("starter")
  const [loading, setLoading] = useState(true)
  const [saving,  setSaving]  = useState(false)
  const [saved,   setSaved]   = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabaseBrowser.auth.getUser()
      if (!user) { setLoading(false); return }

      setPlan((user.user_metadata?.plan ?? "starter") as "starter" | "pro")

      const { data } = await supabaseBrowser
        .from("pipeline_preferences")
        .select("auto_run, email_report")
        .eq("user_id", user.id)
        .single()

      if (data) setPrefs({ auto_run: data.auto_run ?? true, email_report: data.email_report ?? true })
      setLoading(false)
    }
    load()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    try {
      const { data: { user } } = await supabaseBrowser.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const { error: err } = await supabaseBrowser
        .from("pipeline_preferences")
        .upsert({ user_id: user.id, ...prefs, updated_at: new Date().toISOString() }, { onConflict: "user_id" })

      if (err) throw err
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (err: any) {
      setError(err.message ?? "Save failed")
    } finally {
      setSaving(false)
    }
  }

  const set = (key: keyof PipelinePrefs) => (v: boolean) =>
    setPrefs(p => ({ ...p, [key]: v }))

  if (loading) return <div className="flex items-center justify-center py-16"><Loader2 className="h-6 w-6 text-emerald animate-spin" /></div>

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-lg font-semibold text-charcoal mb-0.5">Pipeline Schedule</h2>
        <p className="text-sm text-graphite">Control how often TecSaro runs your AEO analysis</p>
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-100 px-4 divide-y divide-gray-100">
        {/* Auto run */}
        <div className="flex items-center justify-between py-4 gap-4">
          <div>
            <p className="text-sm font-medium text-charcoal">Automatic visibility runs</p>
            <p className="text-xs text-graphite mt-0.5">
              {plan === "pro" ? "Runs every 3 days automatically" : "Runs every 7 days automatically · Starter plan"}
            </p>
          </div>
          <Toggle on={prefs.auto_run} onChange={set("auto_run")} />
        </div>

        {/* Email report */}
        <div className="flex items-center justify-between py-4 gap-4">
          <div>
            <p className="text-sm font-medium text-charcoal">Email report after each run</p>
            <p className="text-xs text-graphite mt-0.5">Get a summary email when new results are ready</p>
          </div>
          <Toggle on={prefs.email_report} onChange={set("email_report")} />
        </div>

        {/* Manual run — Pro only */}
        <div className="flex items-center justify-between py-4 gap-4">
          <div>
            <p className="text-sm font-medium text-charcoal flex items-center gap-1.5">
              Manual run trigger
              {plan !== "pro" && <Lock className="h-3.5 w-3.5 text-graphite/50" />}
            </p>
            <p className="text-xs text-graphite mt-0.5">
              {plan === "pro"
                ? "Trigger a run on demand · 5 runs/month included"
                : "Available on Pro plan only"}
            </p>
            {plan !== "pro" && (
              <a href="/billing" className="text-[11px] text-emerald font-semibold mt-1 block hover:underline">
                Upgrade to Pro →
              </a>
            )}
          </div>
          <Toggle on={false} onChange={() => {}} disabled={plan !== "pro"} />
        </div>
      </div>

      {error && <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>}

      <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
        {saved && (
          <span className="flex items-center gap-1.5 text-xs text-emerald font-medium">
            <Check className="h-3.5 w-3.5" /> Saved
          </span>
        )}
        <div className="ml-auto">
          <button onClick={handleSave} disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald text-white
              text-sm font-semibold hover:bg-emerald/90 transition-colors disabled:opacity-60">
            {saving ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving…</> : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  )
}