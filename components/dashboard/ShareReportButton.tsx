"use client"

import { useState, useEffect } from "react"
import { Share2, Link2, Check, Trash2, Loader2, X, Eye } from "lucide-react"
import { supabaseBrowser } from "@/lib/supabaseClient"
import { cn } from "@/lib/utils"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

interface ShareStatus {
  token:       string
  url:         string
  is_active:   boolean
  views:       number
  created_at:  string
  last_viewed: string | null
}

interface ShareReportButtonProps {
  planId: string
}

export function ShareReportButton({ planId }: ShareReportButtonProps) {
  const [open,      setOpen]      = useState(false)
  const [status,    setStatus]    = useState<ShareStatus | null>(null)
  const [loading,   setLoading]   = useState(false)
  const [copied,    setCopied]    = useState(false)
  const [revoking,  setRevoking]  = useState(false)
  const [generating, setGenerating] = useState(false)

  const getToken = async () => {
    const { data } = await supabaseBrowser.auth.getSession()
    return data?.session?.access_token ?? null
  }

  // Load share status when modal opens
  useEffect(() => {
    if (!open || !planId) return
    loadStatus()
  }, [open, planId])

  const loadStatus = async () => {
    setLoading(true)
    try {
      const token = await getToken()
      const res   = await fetch(`${BACKEND_URL}/reports/share/${planId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await res.json()
      setStatus(json?.data ?? null)
    } catch (err) {
      console.error("[ShareReport] load error:", err)
    } finally {
      setLoading(false)
    }
  }

  const generate = async () => {
    setGenerating(true)
    try {
      const token = await getToken()
      const res   = await fetch(`${BACKEND_URL}/reports/share`, {
        method:  "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body:    JSON.stringify({ planId }),
      })
      const json = await res.json()
      if (json?.data) setStatus(json.data)
    } catch (err) {
      console.error("[ShareReport] generate error:", err)
    } finally {
      setGenerating(false)
    }
  }

  const revoke = async () => {
    if (!confirm("Revoke this link? Anyone with the link won't be able to view it anymore.")) return
    setRevoking(true)
    try {
      const token = await getToken()
      await fetch(`${BACKEND_URL}/reports/share/${planId}`, {
        method:  "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      setStatus(null)
    } catch (err) {
      console.error("[ShareReport] revoke error:", err)
    } finally {
      setRevoking(false)
    }
  }

  const copyLink = async () => {
    if (!status?.url) return
    await navigator.clipboard.writeText(status.url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const dateStr = (iso: string | null) => {
    if (!iso) return "—"
    return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
  }

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-white text-xs font-semibold text-foreground hover:bg-muted transition-colors"
      >
        <Share2 className="h-3.5 w-3.5" />
        Share Report
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />

          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-border overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald/10 border border-emerald/20 flex items-center justify-center">
                  <Share2 className="h-4 w-4 text-emerald" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Share Report</p>
                  <p className="text-[10px] text-muted-foreground font-mono">Public · No login required · Never expires</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5">
              {loading ? (
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              ) : status ? (
                // ── Active link ──
                <div className="space-y-4">
                  {/* What it shows */}
                  <div className="bg-muted/50 rounded-xl p-3.5">
                    <p className="text-xs font-semibold text-foreground mb-2">Report includes</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        "AEO Score",
                        "Brand mention rate",
                        "Top competitors",
                        "Recommendations",
                        "Citation data",
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald shrink-0" />
                          <span className="text-[11px] text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Link box */}
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1.5">Shareable link</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted border border-border rounded-lg px-3 py-2 min-w-0">
                        <p className="text-xs font-mono text-foreground truncate">{status.url}</p>
                      </div>
                      <button
                        onClick={copyLink}
                        className={cn(
                          "shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all",
                          copied
                            ? "bg-emerald text-white"
                            : "bg-foreground text-background hover:bg-foreground/90"
                        )}
                      >
                        {copied ? <><Check className="h-3.5 w-3.5" /> Copied</> : <><Link2 className="h-3.5 w-3.5" /> Copy</>}
                      </button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      <span>{status.views} view{status.views !== 1 ? "s" : ""}</span>
                    </div>
                    <span>Created {dateStr(status.created_at)}</span>
                    {status.last_viewed && <span>Last viewed {dateStr(status.last_viewed)}</span>}
                  </div>

                  {/* Revoke */}
                  <div className="pt-1 border-t border-border">
                    <button
                      onClick={revoke}
                      disabled={revoking}
                      className="flex items-center gap-1.5 text-xs text-destructive hover:text-destructive/80 transition-colors"
                    >
                      {revoking
                        ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Revoking…</>
                        : <><Trash2 className="h-3.5 w-3.5" /> Revoke link</>}
                    </button>
                  </div>
                </div>
              ) : (
                // ── No link yet ──
                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-xl p-4 text-center">
                    <Share2 className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm font-medium text-foreground mb-1">No shareable link yet</p>
                    <p className="text-xs text-muted-foreground">
                      Generate a public link to share your AEO report with anyone — no login required.
                    </p>
                  </div>

                  {/* What it shows */}
                  <div className="bg-emerald/5 border border-emerald/20 rounded-xl p-3.5">
                    <p className="text-xs font-semibold text-foreground mb-2">Report will include</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        "AEO Score",
                        "Brand mention rate",
                        "Top competitors",
                        "Recommendations",
                        "Citation data",
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald shrink-0" />
                          <span className="text-[11px] text-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={generate}
                    disabled={generating}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald text-white text-sm font-semibold hover:bg-emerald/90 transition-colors disabled:opacity-60"
                  >
                    {generating
                      ? <><Loader2 className="h-4 w-4 animate-spin" /> Generating…</>
                      : <><Share2 className="h-4 w-4" /> Generate Shareable Link</>}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}