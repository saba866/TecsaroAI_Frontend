"use client"

import { useState, useEffect, useRef } from "react"
import { Bell, X, TrendingDown, TrendingUp, AlertTriangle, Info, CheckCircle2, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { supabaseBrowser } from "@/lib/supabaseClient"
import { usePlanId } from "@/hooks/usePlanId"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

interface Alert {
  id:         string
  type:       string   // "score_drop" | "score_rise" | "new_competitor" | "visibility_drop" | "info"
  title:      string
  message:    string
  created_at: string
  read?:      boolean
}

function alertIcon(type: string) {
  switch (type) {
    case "score_drop":       return <TrendingDown  className="h-3.5 w-3.5 text-destructive" />
    case "score_rise":       return <TrendingUp    className="h-3.5 w-3.5 text-emerald"     />
    case "new_competitor":   return <AlertTriangle className="h-3.5 w-3.5 text-amber"       />
    case "visibility_drop":  return <TrendingDown  className="h-3.5 w-3.5 text-destructive" />
    default:                 return <Info          className="h-3.5 w-3.5 text-muted-foreground" />
  }
}

function alertBg(type: string) {
  switch (type) {
    case "score_drop":
    case "visibility_drop": return "bg-destructive/8 border-destructive/15"
    case "score_rise":      return "bg-emerald/8 border-emerald/15"
    case "new_competitor":  return "bg-amber/8 border-amber/15"
    default:                return "bg-muted/50 border-border"
  }
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins  = Math.floor(diff / 60000)
  const hours = Math.floor(mins / 60)
  const days  = Math.floor(hours / 24)
  if (days  > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  if (mins  > 0) return `${mins}m ago`
  return "just now"
}

export function NotificationsDropdown() {
  const planId  = usePlanId()
  const ref     = useRef<HTMLDivElement>(null)

  const [open,    setOpen]    = useState(false)
  const [alerts,  setAlerts]  = useState<Alert[]>([])
  const [loading, setLoading] = useState(false)
  const [read,    setRead]    = useState<Set<string>>(new Set())

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [])

  // Load alerts when opened
  useEffect(() => {
    if (!open || !planId) return
    const load = async () => {
      setLoading(true)
      try {
        const { data: { session } } = await supabaseBrowser.auth.getSession()
        if (!session?.access_token) return
        const res = await fetch(`${BACKEND_URL}/aeo/alerts/${planId}`, {
          headers: { Authorization: `Bearer ${session.access_token}` },
        })
        if (!res.ok) return
        const json = await res.json()
        setAlerts(json?.data ?? json?.alerts ?? json ?? [])
      } catch (err) {
        console.error("[NotificationsDropdown] load failed:", err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [open, planId])

  const unread = alerts.filter(a => !read.has(a.id)).length

  const markAllRead = () => {
    setRead(new Set(alerts.map(a => a.id)))
  }

  return (
    <div ref={ref} className="relative">

      {/* Bell button */}
      <button
        onClick={() => setOpen(o => !o)}
        className={cn(
          "relative w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors",
          open && "bg-muted/60 text-foreground"
        )}
      >
        <Bell className="h-4 w-4" />
        {unread > 0 && (
          <span className="absolute top-1 right-1 min-w-[14px] h-[14px] rounded-full bg-emerald flex items-center justify-center">
            <span className="text-[8px] font-bold text-white leading-none px-0.5">
              {unread > 9 ? "9+" : unread}
            </span>
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-2xl shadow-2xl z-50 overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <Bell className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-sm font-semibold text-foreground">Notifications</span>
              {unread > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-emerald/10 border border-emerald/20 text-[10px] font-bold text-emerald font-mono">
                  {unread} new
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {unread > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-[10px] font-mono text-muted-foreground hover:text-emerald transition-colors px-2 py-1 rounded"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="w-6 h-6 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Alert list */}
          <div className="max-h-80 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-10 gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-xs font-mono">Loading alerts…</span>
              </div>
            ) : alerts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 gap-2">
                <CheckCircle2 className="h-8 w-8 text-emerald/40" />
                <p className="text-sm text-muted-foreground">All clear — no alerts</p>
                <p className="text-[11px] text-muted-foreground/60 font-mono">We'll notify you when something changes</p>
              </div>
            ) : (
              <div className="p-2 flex flex-col gap-1.5">
                {alerts.slice(0, 15).map(alert => {
                  const isRead = read.has(alert.id)
                  return (
                    <div
                      key={alert.id}
                      onClick={() => setRead(r => new Set([...r, alert.id]))}
                      className={cn(
                        "flex items-start gap-3 px-3 py-3 rounded-xl border cursor-pointer transition-all",
                        alertBg(alert.type),
                        isRead && "opacity-50"
                      )}
                    >
                      {/* Icon */}
                      <div className="w-6 h-6 rounded-lg bg-background/60 flex items-center justify-center shrink-0 mt-0.5">
                        {alertIcon(alert.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-semibold text-foreground leading-snug">
                            {alert.title}
                          </p>
                          {!isRead && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald shrink-0 mt-1" />
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">
                          {alert.message}
                        </p>
                        <p className="text-[10px] text-muted-foreground/60 font-mono mt-1">
                          {timeAgo(alert.created_at)}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {alerts.length > 0 && (
            <div className="px-4 py-2.5 border-t border-border">
              <p className="text-[10px] text-muted-foreground text-center font-mono">
                Alerts are generated daily by the pipeline
              </p>
            </div>
          )}

        </div>
      )}
    </div>
  )
}