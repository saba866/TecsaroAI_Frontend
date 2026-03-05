"use client"

import { useState, useEffect } from "react"
import { X, HelpCircle, ExternalLink, ChevronRight, MessageCircle, BookOpen, Zap, BarChart3, Users, Search } from "lucide-react"
import { cn } from "@/lib/utils"

const quickLinks = [
  {
    icon: Search,
    title: "What is AEO?",
    description: "Learn what Answer Engine Optimization means",
    href: "/faq#what-is-aeo",
  },
  {
    icon: BarChart3,
    title: "Understanding your AEO Score",
    description: "How the score is calculated and what it means",
    href: "/faq#aeo-visibility-score",
  },
  {
    icon: Users,
    title: "Competitor detection",
    description: "How Tecsaro AI finds competing brands",
    href: "/faq#competitor-detection",
  },
  {
    icon: Zap,
    title: "Prompts & tracking",
    description: "How prompts work and how often they run",
    href: "/faq#prompt-generation-tracking",
  },
  {
    icon: BookOpen,
    title: "Schema generation",
    description: "What schema markup does and how to use it",
    href: "/faq#recommendations-schema",
  },
]

interface HelpPanelProps {
  open:    boolean
  onClose: () => void
}

export function HelpPanel({ open, onClose }: HelpPanelProps) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    if (open) document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open, onClose])

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div className={cn(
        "fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-card border-l border-border shadow-2xl flex flex-col",
        "transform transition-transform duration-300 ease-in-out",
        open ? "translate-x-0" : "translate-x-full"
      )}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald/10 border border-emerald/20 flex items-center justify-center">
              <HelpCircle className="h-3.5 w-3.5 text-emerald" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Help & Support</p>
              <p className="text-[10px] text-muted-foreground font-mono">Tecsaro AI docs</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">

          {/* Quick answers */}
          <div>
            <p className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-widest mb-3">
              Quick answers
            </p>
            <div className="flex flex-col gap-1.5">
              {quickLinks.map(link => {
                const Icon = link.icon
                return (
                  <a
                    key={link.title}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-3 rounded-xl border border-border bg-card hover:bg-muted/40 hover:border-emerald/30 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0 group-hover:bg-emerald/10 transition-colors">
                      <Icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-emerald transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{link.title}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{link.description}</p>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-emerald transition-colors shrink-0" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* FAQ link */}
          <div>
            <p className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-widest mb-3">
              Full FAQ
            </p>
            <a
              href="/faq"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-3 rounded-xl border border-border bg-card hover:bg-muted/40 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="text-sm font-medium text-foreground">View all FAQ</span>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
            </a>
          </div>

        </div>

        {/* Footer — contact support */}
        <div className="px-5 py-4 border-t border-border">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald/5 border border-emerald/15">
            <div className="w-8 h-8 rounded-lg bg-emerald/10 flex items-center justify-center shrink-0">
              <MessageCircle className="h-3.5 w-3.5 text-emerald" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground">Still stuck?</p>
              <a
                href="mailto:support@tecsaro.com"
                className="text-[11px] text-emerald hover:underline font-mono"
              >
                support@tecsaro.com
              </a>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}