"use client"

import Link from "next/link"
import { useState } from "react"
import { Check, Zap, ArrowRight, Lock } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const plans = [
  {
    name:        "Free",
    slug:        "free",
    monthly:     0,
    yearly:      0,
    badge:       null,
    highlight:   false,
    description: "Start tracking your AI visibility today. No credit card needed, forever.",
    cta:         "Get Started Free",
    ctaHref:     "/signup",
    features: [
      "1 brand / project",
      "10 prompts tracked",
      "3 competitors tracked",
      "Gemini only",
      "1 manual audit/month",
      "AEO Visibility Score",
      "Basic recommendations",
      "Shareable report link",
      "Technical audit (3 pages preview)",
    ],
    locked: [
      "ChatGPT tracking",
      "Perplexity tracking",
      "Daily automated scans",
      "AI Citation tracking",
    ],
  },
  {
    name:        "Starter",
    slug:        "starter",
    monthly:     2999,
    yearly:      1999,
    badge:       "Most Popular",
    highlight:   true,
    description: "For founders and marketers serious about AI search visibility.",
    cta:         "Start Starter",
    ctaHref:     "/signup?plan=starter",
    features: [
      "1 brand / project",
      "20 prompts tracked",
      "10 competitors tracked",
      "ChatGPT + Gemini",
      "2 manual audits/month",
      "AEO Visibility Score",
      "Full recommendations",
      "Shareable report link",
      "Technical audit (all pages)",
      "Daily automated scans",
      "Score history chart",
      "Competitor discovery",
    ],
    locked: [
      "Perplexity tracking",
      "AI Citation tracking",
    ],
  },
  {
    name:        "Pro",
    slug:        "pro",
    monthly:     7999,
    yearly:      5999,
    badge:       null,
    highlight:   false,
    description: "For agencies and teams tracking across all AI engines.",
    cta:         "Start Pro",
    ctaHref:     "/signup?plan=pro",
    features: [
      "3 brands / projects",
      "50 prompts per brand",
      "15 competitors tracked",
      "ChatGPT + Gemini + Perplexity",
      "4 manual audits/month",
      "AEO Visibility Score",
      "Full recommendations",
      "Shareable report link",
      "Technical audit (all pages)",
      "Daily automated scans",
      "Score history chart",
      "Competitor discovery",
      "AI Citation tracking ✦",
      "Citation rate by engine ✦",
      "Missing source gaps ✦",
    ],
    locked: [],
  },
]

export function PricingSection() {
  const [yearly, setYearly] = useState(false)

  return (
    <section id="pricing" className="py-24 bg-cloud relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(15,191,154,0.05),transparent)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald/10 border border-emerald/20 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
            <span className="text-sm font-semibold text-emerald tracking-wide uppercase font-mono">Pricing</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl font-bold text-charcoal mb-3"
          >
            Start free. Upgrade when ready.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-graphite text-base mb-8 max-w-lg mx-auto"
          >
            No credit card required. No trial. Free plan runs forever.
          </motion.p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-white border border-border shadow-sm">
            <button
              onClick={() => setYearly(false)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-semibold transition-all",
                !yearly ? "bg-charcoal text-white shadow-sm" : "text-graphite hover:text-charcoal"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2",
                yearly ? "bg-charcoal text-white shadow-sm" : "text-graphite hover:text-charcoal"
              )}
            >
              Yearly
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald/20 text-emerald">
                Save 33%
              </span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "relative rounded-2xl border flex flex-col",
                plan.highlight
                  ? "bg-charcoal border-emerald/40 shadow-2xl shadow-emerald/10 md:-mt-2"
                  : "bg-white border-border shadow-sm"
              )}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald text-charcoal text-[11px] font-bold shadow-md">
                    <Zap className="h-3 w-3" /> {plan.badge}
                  </span>
                </div>
              )}

              <div className="p-6 flex flex-col gap-5">

                {/* Name + price */}
                <div>
                  <p className={cn("text-[10px] font-mono font-bold uppercase tracking-widest mb-2",
                    plan.highlight ? "text-emerald" : "text-graphite"
                  )}>
                    {plan.name}
                  </p>
                  <div className="flex items-end gap-1 mb-1.5">
                    {plan.monthly === 0 ? (
                      <span className={cn("font-heading text-4xl font-bold", plan.highlight ? "text-white" : "text-charcoal")}>
                        Free
                      </span>
                    ) : (
                      <>
                        <span className={cn("font-heading text-4xl font-bold", plan.highlight ? "text-white" : "text-charcoal")}>
                          ₹{(yearly ? plan.yearly : plan.monthly).toLocaleString("en-IN")}
                        </span>
                        <span className={cn("text-sm mb-1.5", plan.highlight ? "text-white/50" : "text-graphite")}>
                          /mo
                        </span>
                      </>
                    )}
                  </div>
                  {plan.monthly > 0 && yearly && (
                    <p className={cn("text-xs line-through", plan.highlight ? "text-white/30" : "text-graphite/50")}>
                      ₹{plan.monthly.toLocaleString("en-IN")}/mo billed monthly
                    </p>
                  )}
                  <p className={cn("text-xs leading-relaxed mt-2", plan.highlight ? "text-white/60" : "text-graphite")}>
                    {plan.description}
                  </p>
                </div>

                {/* CTA */}
                <Link
                  href={plan.ctaHref}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all",
                    plan.highlight
                      ? "bg-emerald text-charcoal hover:bg-emerald/90"
                      : plan.monthly === 0
                      ? "bg-charcoal text-white hover:bg-charcoal/90"
                      : "border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-white"
                  )}
                >
                  {plan.cta} <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                {/* Features */}
                <div className="space-y-2">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <Check className="h-3.5 w-3.5 shrink-0 mt-0.5 text-emerald" />
                      <span className={cn("text-xs leading-relaxed",
                        plan.highlight ? "text-white/80" : "text-charcoal"
                      )}>
                        {f}
                      </span>
                    </div>
                  ))}

                  {plan.locked.length > 0 && (
                    <>
                      <div className={cn("my-2 border-t", plan.highlight ? "border-white/10" : "border-border")} />
                      {plan.locked.map((f) => (
                        <div key={f} className="flex items-start gap-2.5 opacity-35">
                          <Lock className="h-3 w-3 shrink-0 mt-0.5" />
                          <span className={cn("text-xs leading-relaxed",
                            plan.highlight ? "text-white/50" : "text-graphite"
                          )}>
                            {f}
                          </span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs text-graphite mt-8"
        >
          All prices in INR · No credit card required · Cancel anytime ·{" "}
          <Link href="/pricing" className="text-emerald hover:underline font-medium">
            View full pricing details →
          </Link>
        </motion.p>
      </div>
    </section>
  )
}