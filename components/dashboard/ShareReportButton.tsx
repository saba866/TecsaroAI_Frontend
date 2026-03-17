"use client"

import { useState } from "react"
import { Link2, Copy, Check, Loader2, X } from "lucide-react"
import { supabaseBrowser } from "@/lib/supabaseClient"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export function ShareReportButton({ planId }: { planId: string }) {
  const [url,     setUrl]     = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [copied,  setCopied]  = useState(false)
  const [open,    setOpen]    = useState(false)

  const generate = async () => {
    if (url) { setOpen(o => !o); return }
    setLoading(true)
    try {
      const { data: s } = await supabaseBrowser.auth.getSession()
      const token = s?.session?.access_token
      const res = await fetch(`${BACKEND_URL}/reports/share`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      })
      const j = await res.json()
      if (j?.data?.url) { setUrl(j.data.url); setOpen(true) }
      else console.error("Share failed:", j)
    } catch (e) {
      console.error("Share error", e)
    } finally {
      setLoading(false)
    }
  }

  const copy = async () => {
    if (!url) return
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={generate}
        disabled={loading}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-semibold text-foreground hover:bg-muted transition-colors disabled:opacity-60"
      >
        {loading
          ? <Loader2 className="h-3.5 w-3.5 animate-spin"/>
          : <Link2  className="h-3.5 w-3.5"/>}
        Share Report
      </button>

      {open && url && (
        <div className="absolute right-0 top-10 z-50 w-80 bg-card border border-border rounded-xl p-4"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.12)" }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-foreground">Shareable link</p>
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="h-3.5 w-3.5"/>
            </button>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-muted border border-border">
            <p className="text-[11px] font-mono text-muted-foreground truncate flex-1">{url}</p>
            <button onClick={copy} className="shrink-0 p-1 rounded hover:bg-border transition-colors">
              {copied
                ? <Check className="h-3.5 w-3.5 text-emerald"/>
                : <Copy  className="h-3.5 w-3.5 text-muted-foreground"/>}
            </button>
          </div>
          <p className="text-[10px] text-muted-foreground font-mono mt-2">
            Anyone with this link can view your report
          </p>
        </div>
      )}
    </div>
  )
}