




// "use client"

// import { useState, useEffect, useCallback } from "react"
// import {
//   Check, Zap, Lock, FileText, ExternalLink,
//   Loader2, Star, AlertCircle, XCircle, CheckCircle2, RefreshCw,
//   Calendar, CreditCard, Clock,
// } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { supabaseBrowser } from "@/lib/supabaseClient"
// import { CheckoutModal } from "@/components/checkout/CheckoutModal"

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

// type PlanTier        = "starter" | "pro" | "free"
// type BillingInterval = "monthly" | "yearly"

// interface BillingData {
//   tier:                     PlanTier
//   razorpay_subscription_id: string | null
//   subscription_status:      string
//   current_period_end:       string | null
//   next_billing_at:          string | null
//   is_active:                boolean
//   is_pro:                   boolean
//   billing_interval?:        string
// }
// interface Invoice  { id: string; date: string; amount: string; status: string }
// interface UsageData {
//   prompts_used: number;     prompts_max: number
//   pages_used: number;       pages_max: number
//   competitors_used: number; competitors_max: number
//   projects_used: number;    projects_max: number
//   reset_date: string | null
// }

// const PLANS = [
//   {
//     tier: "free" as PlanTier, name: "Free",
//     monthly: { price: "₹0",      period: "/month" },
//     yearly:  { price: "₹0",      period: "/year" },
//     description: "Basic AEO visibility. 1 pipeline run per month.",
//     features: [
//       { label: "1 brand / project",          included: true  },
//       { label: "Generate 20 prompts",        included: true  },
//       { label: "10 prompts tracked",         included: true  },
//       { label: "3 competitors tracked",      included: true  },
//       { label: "Gemini only",                included: true  },
//       { label: "1 pipeline run / month",     included: true  },
//       { label: "AEO Visibility Score",       included: true  },
//       { label: "Schema markup",              included: true  },
//       { label: "Email reports",              included: false },
//     ],
//   },
  
//   {
//     tier: "starter" as PlanTier, name: "Starter",
//     monthly: { price: "₹2,999",  period: "/month" },
//     yearly:  { price: "₹29,990", period: "/year", perMonth: "₹2,499/mo" },
//     description: "For founders and solo marketers tracking one brand.",
//     features: [
//       { label: "1 brand / project",       included: true  },
//       { label: "20 AI prompts tracked",   included: true  },
//       { label: "10 competitors tracked",   included: true  },
//       { label: "Gemini + ChatGPT",        included: true  },
//       { label: "Schema markup",           included: true  },
//      { label: "Daily AI tracking",          included: true  },
//       { label: "AEO Visibility Score",       included: true  },
//       { label: "Recommendation",              included: true  },
//       { label: "Email reports",              included: true  },
//       { label: "Shareable report link",       included: false },
//     ],
//   },
//   {
//     tier: "pro" as PlanTier, name: "Pro", highlight: true,
//     monthly: { price: "₹7,999",  period: "/month" },
//     yearly:  { price: "₹79,990", period: "/year", perMonth: "₹6,666/mo" },
//     description: "For growth teams tracking multiple brands across all AI models.",
//     features: [
//       { label: "Up to 3 brands",                included: true },
//       { label: "50 AI prompts tracked",         included: true },
//       { label: "15 competitors tracked",        included: true },
//       { label: "Gemini + ChatGPT + Perplexity", included: true },
//       { label: "Schema markup",                 included: true },
//  { label: "Daily AI tracking",             included: true },
//       { label: "AEO Visibility Score",          included: true },
//       { label: "Reccomdation",                 included: true },
//       { label: "Email reports",                 included: true },
//       { label: "Perplexity tracking",           included: true },
//       { label: "Shareable report link",             included: true },
//     ],
//   },
// ]

// // Tier rank — used to detect upgrade vs downgrade
// const TIER_RANK: Record<PlanTier, number> = { free: 0, starter: 1, pro: 2 }

// function formatDate(iso: string | null) {
//   if (!iso) return "—"
//   return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
// }

// function daysUntil(iso: string | null): number | null {
//   if (!iso) return null
//   const diff = new Date(iso).getTime() - Date.now()
//   return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
// }

// function StatusBadge({ status }: { status: string }) {
//   const map: Record<string, { label: string; cls: string }> = {
//     active:               { label: "Active",         cls: "bg-emerald/10 text-emerald border-emerald/20"             },
//     authenticated:        { label: "Active",         cls: "bg-emerald/10 text-emerald border-emerald/20"             },
//     trial:                { label: "Trial",          cls: "bg-amber/10 text-amber border-amber/20"                   },
//     payment_failed:       { label: "Payment Failed", cls: "bg-destructive/10 text-destructive border-destructive/20" },
//     halted:               { label: "Halted",         cls: "bg-destructive/10 text-destructive border-destructive/20" },
//     canceled:             { label: "Cancelled",      cls: "bg-muted text-muted-foreground border-border"             },
//     pending_cancellation: { label: "Cancelling",     cls: "bg-amber/10 text-amber border-amber/20"                   },
//     inactive:             { label: "Inactive",       cls: "bg-muted text-muted-foreground border-border"             },
//     paused:               { label: "Paused",         cls: "bg-muted text-muted-foreground border-border"             },
//   }
//   const s = map[status] ?? { label: status, cls: "bg-muted text-muted-foreground border-border" }
//   return (
//     <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full border text-[11px] font-bold font-mono", s.cls)}>
//       {s.label}
//     </span>
//   )
// }

// function UsageBar({ label, used, max }: { label: string; used: number; max: number }) {
//   const pct = max > 0 ? Math.min((used / max) * 100, 100) : 0
//   return (
//     <div>
//       <div className="flex justify-between text-xs mb-1.5">
//         <span className="text-foreground/70 font-medium">{label}</span>
//         <span className="font-mono text-muted-foreground">{used} / {max}</span>
//       </div>
//       <div className="h-1.5 bg-muted rounded-full overflow-hidden">
//         <div className={cn("h-full rounded-full transition-all", used >= max ? "bg-amber" : "bg-emerald")} style={{ width: `${pct}%` }} />
//       </div>
//     </div>
//   )
// }

// export default function BillingPage() {
//   const [billing,       setBilling]       = useState<BillingData | null>(null)
//   const [usage,         setUsage]         = useState<UsageData | null>(null)
//   const [invoices,      setInvoices]      = useState<Invoice[]>([])
//   const [loading,       setLoading]       = useState(true)
//   const [error,         setError]         = useState<string | null>(null)
//   const [cancelling,    setCancelling]    = useState(false)
//   const [toast,         setToast]         = useState<{ type: "success" | "error"; msg: string } | null>(null)
//   const [checkoutOpen,  setCheckoutOpen]  = useState(false)
//   const [checkoutPlan,  setCheckoutPlan]  = useState<"starter" | "pro">("pro")
//   const [checkoutIntvl, setCheckoutIntvl] = useState<BillingInterval>("monthly")
//   const [planInterval,  setPlanInterval]  = useState<BillingInterval>("monthly")

//   const showToast = (type: "success" | "error", msg: string) => {
//     setToast({ type, msg }); setTimeout(() => setToast(null), 4000)
//   }

//   const getToken = async () => {
//     const { data } = await supabaseBrowser.auth.getSession()
//     return data?.session?.access_token ?? null
//   }

//   const loadBilling = useCallback(async () => {
//     setLoading(true); setError(null)
//     try {
//       const token = await getToken()
//       if (!token) { setError("Not authenticated"); setLoading(false); return }
//       const [bRes, uRes, iRes] = await Promise.all([
//         fetch(`${BACKEND_URL}/billing`,          { headers: { Authorization: `Bearer ${token}` } }),
//         fetch(`${BACKEND_URL}/billing/usage`,    { headers: { Authorization: `Bearer ${token}` } }).catch(() => null),
//         fetch(`${BACKEND_URL}/billing/invoices`, { headers: { Authorization: `Bearer ${token}` } }).catch(() => null),
//       ])
//       if (!bRes.ok) throw new Error("Failed to load billing")
//       const b = await bRes.json(); setBilling(b?.data ?? b)
//       if (uRes?.ok) { const u = await uRes.json(); setUsage(u?.data ?? null) }
//       if (iRes?.ok) { const i = await iRes.json(); setInvoices(i?.data ?? []) }
//     } catch (err: any) { setError(err.message) }
//     finally { setLoading(false) }
//   }, [])

//   useEffect(() => { loadBilling() }, [loadBilling])

//   const openCheckout = (tier: "starter" | "pro", interval: BillingInterval) => {
//     setCheckoutPlan(tier); setCheckoutIntvl(interval); setCheckoutOpen(true)
//   }

//   const handleCancel = async () => {
//     if (!confirm("Cancel your subscription? You'll keep access until end of billing period.")) return
//     setCancelling(true)
//     try {
//       const token = await getToken()
//       const res   = await fetch(`${BACKEND_URL}/billing/cancel`, {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//         body:   JSON.stringify({ cancel_at_cycle_end: true }),
//       })
//       const data = await res.json()
//       if (!res.ok) throw new Error(data?.error ?? "Failed to cancel")
//       showToast("success", "Subscription will cancel at end of billing period.")
//       await loadBilling()
//     } catch (err: any) { showToast("error", err.message) }
//     finally { setCancelling(false) }
//   }

//   if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-7 w-7 text-emerald animate-spin" /></div>
//   if (error)   return (
//     <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
//       <AlertCircle className="h-8 w-8 text-destructive" />
//       <p className="text-sm text-destructive">{error}</p>
//       <button onClick={loadBilling} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"><RefreshCw className="h-3 w-3" /> Retry</button>
//     </div>
//   )

//   const currentTier  = billing?.tier ?? "free"
//   const subStatus    = billing?.subscription_status ?? "inactive"
//   const isActive     = billing?.is_active ?? false
//   const isYearly     = billing?.billing_interval === "yearly"
//   const nextBillDate = billing?.next_billing_at ?? billing?.current_period_end ?? null
//   const daysLeft     = daysUntil(nextBillDate)

//   const isPaidSubscriber = isActive && !!billing?.razorpay_subscription_id
//   const isOnTrial        = !isPaidSubscriber

//   const currentPrice = () => {
//     if (!isPaidSubscriber) return "free forever"
//     if (currentTier === "pro")     return isYearly ? "₹79,990/year" : "₹7,999/month"
//     if (currentTier === "starter") return isYearly ? "₹29,990/year" : "₹2,999/month"
//     return "Free"
//   }

//   return (
//     <div className="flex flex-col gap-8 p-6 min-h-screen bg-background max-w-5xl relative">

//       {toast && (
//         <div className={cn(
//           "fixed top-4 right-4 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl border shadow-lg text-sm font-medium",
//           toast.type === "success" ? "bg-emerald/10 border-emerald/20 text-emerald" : "bg-destructive/10 border-destructive/20 text-destructive"
//         )}>
//           {toast.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
//           {toast.msg}
//         </div>
//       )}

//       <div>
//         <h1 className="text-xl font-heading font-bold text-foreground tracking-tight">Plan & Billing</h1>
//         <p className="text-xs text-muted-foreground font-mono mt-0.5">Manage your subscription and usage</p>
//       </div>

//       {/* Trial banner — only for non-paid users */}
//       {isOnTrial && (
//         <div className="rounded-xl border border-amber/20 bg-amber/5 p-4 flex items-start gap-3">
//           <Clock className="h-4 w-4 text-amber shrink-0 mt-0.5" />
//           <div>
//             <p className="text-sm font-semibold text-foreground">
//               You're on a {currentTier === "pro" ? "Pro" : "Starter"} free forever
//             </p>
//             <p className="text-xs text-muted-foreground mt-0.5">
//               {nextBillDate
//                 ? `Your trial ends on ${formatDate(nextBillDate)}. Subscribe below to keep access — you won't be charged until then.`
//                 : "Subscribe below to keep access after your trial ends — you won't be charged until the trial ends."
//               }
//             </p>
//           </div>
//         </div>
//       )}

//       {/* Current plan banner */}
//       <div className={cn(
//         "rounded-xl border p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4",
//         currentTier === "pro" && isPaidSubscriber ? "bg-emerald/5 border-emerald/20" : "bg-card border-border"
//       )}>
//         <div className="flex items-center gap-4">
//           <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
//             currentTier === "pro" && isPaidSubscriber ? "bg-emerald/10" : "bg-muted"
//           )}>
//             {currentTier === "pro" && isPaidSubscriber
//               ? <Star className="h-5 w-5 text-emerald" />
//               : <Zap  className="h-5 w-5 text-muted-foreground" />}
//           </div>
//           <div className="min-w-0">
//             <div className="flex items-center gap-2 mb-0.5 flex-wrap">
//               <p className="font-heading text-base font-bold text-foreground">
//                 {currentTier === "pro" ? "Pro Plan" : currentTier === "starter" ? "Starter Plan" : "Free Plan"}
//                 {isYearly && isPaidSubscriber && (
//                   <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald/20 text-emerald font-mono">ANNUAL</span>
//                 )}
//                 {isOnTrial && (
//                   <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber/20 text-amber font-mono">TRIAL</span>
//                 )}
//               </p>
//               <StatusBadge status={isOnTrial ? "trial" : subStatus} />
//             </div>
//             <p className="text-xs text-muted-foreground font-mono">{currentPrice()}</p>
//             {isPaidSubscriber && isActive && nextBillDate && (
//               <div className="flex items-center gap-1.5 mt-1.5">
//                 <Calendar className="h-3 w-3 text-muted-foreground shrink-0" />
//                 <p className="text-xs text-muted-foreground font-mono">
//                   Next bill on <span className="text-foreground font-semibold">{formatDate(nextBillDate)}</span>
//                   {daysLeft !== null && (
//                     <span className={cn(
//                       "ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold border font-mono",
//                       daysLeft <= 3 ? "bg-destructive/10 text-destructive border-destructive/20"
//                       : daysLeft <= 7 ? "bg-amber/10 text-amber border-amber/20"
//                       : "bg-muted text-muted-foreground border-border"
//                     )}>{daysLeft}d left</span>
//                   )}
//                 </p>
//               </div>
//             )}
//             {isOnTrial && nextBillDate && (
//               <div className="flex items-center gap-1.5 mt-1.5">
//                 <CreditCard className="h-3 w-3 text-muted-foreground shrink-0" />
//                 <p className="text-xs text-muted-foreground font-mono">
//                   Trial ends <span className="text-foreground font-semibold">{formatDate(nextBillDate)}</span>
//                   {daysLeft !== null && (
//                     <span className={cn(
//                       "ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold border font-mono",
//                       daysLeft <= 2 ? "bg-destructive/10 text-destructive border-destructive/20"
//                       : "bg-amber/10 text-amber border-amber/20"
//                     )}>{daysLeft}d left</span>
//                   )}
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="flex items-center gap-2 shrink-0">
//           {isPaidSubscriber && billing?.razorpay_subscription_id && (
//             <button onClick={handleCancel} disabled={cancelling}
//               className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-destructive/30 bg-destructive/5 text-xs font-semibold text-destructive hover:bg-destructive/10 transition-colors">
//               {cancelling ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <XCircle className="h-3.5 w-3.5" />}
//               Cancel
//             </button>
//           )}
//           <button onClick={loadBilling} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-semibold text-foreground hover:bg-muted transition-colors">
//             <RefreshCw className="h-3 w-3" /> Refresh
//           </button>
//         </div>
//       </div>

//       {/* Usage */}
//       {usage && (
//         <div className="bg-card border border-border rounded-xl p-5">
//           <p className="font-heading text-sm font-semibold text-foreground mb-4">Current Usage</p>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <UsageBar label="Prompts tracked"    used={usage.prompts_used}     max={usage.prompts_max}     />
//             <UsageBar label="Pages crawled"       used={usage.pages_used}       max={usage.pages_max}       />
//             <UsageBar label="Competitors tracked" used={usage.competitors_used} max={usage.competitors_max} />
//             <UsageBar label="Projects"            used={usage.projects_used}    max={usage.projects_max}    />
//           </div>
//           {usage.reset_date && <p className="text-xs text-muted-foreground mt-4 font-mono">Resets on {formatDate(usage.reset_date)}</p>}
//         </div>
//       )}

//       {/* Plan cards */}
//       <div>
//         <div className="flex items-center justify-between mb-4">
//           <p className="font-heading text-sm font-semibold text-foreground">
//             {isPaidSubscriber ? "Your Plan" : "Choose a Plan to Subscribe"}
//           </p>
//           <div className="flex items-center gap-1 p-1 rounded-lg bg-muted border border-border">
//             {(["monthly", "yearly"] as BillingInterval[]).map((i) => (
//               <button key={i} onClick={() => setPlanInterval(i)}
//                 className={cn("px-3 py-1 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5",
//                   planInterval === i ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
//                 )}>
//                 {i === "monthly" ? "Monthly" : "Yearly"}
//                 {i === "yearly" && <span className="text-[9px] font-bold px-1 py-0.5 rounded-full bg-emerald text-white">2 months free</span>}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           {PLANS.map((plan) => {
//             // Paid subscriber on this exact tier → "Current Plan"
//             const isCurrent = isPaidSubscriber && plan.tier === currentTier

//             // Pro user viewing Starter card — don't prompt to downgrade
//             const isDowngrade = (TIER_RANK[plan.tier] ?? 0) < (TIER_RANK[currentTier] ?? 0)

//             const pricing = plan[planInterval]

//             return (
//               <div key={plan.tier} className={cn(
//                 "relative bg-card border rounded-2xl overflow-hidden",
//                 plan.highlight && !isCurrent ? "border-emerald/30 shadow-[0_0_0_1px_rgba(15,191,154,0.2)]" : "border-border",
//                 isCurrent && "ring-2 ring-emerald/20",
//                 // Visually dim the downgrade card so it doesn't compete for attention
//                 isDowngrade && "opacity-70"
//               )}>
//                 {plan.highlight && (
//                   <div className="absolute top-4 right-4">
//                     <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald text-white font-mono">RECOMMENDED</span>
//                   </div>
//                 )}
//                 <div className={cn("h-0.5", plan.highlight ? "bg-emerald" : "bg-border")} />
//                 <div className="p-6">
//                   <p className="font-heading text-base font-bold text-foreground mb-1">{plan.name}</p>
//                   <div className="flex items-end gap-1 mb-1">
//                     <span className="font-heading text-3xl font-bold text-foreground">{pricing.price}</span>
//                     <span className="text-sm text-muted-foreground mb-1">{pricing.period}</span>
//                   </div>
//                   {"perMonth" in pricing && <p className="text-xs text-emerald font-mono mb-1">{pricing.perMonth} · 2 months free</p>}
//                   <p className="text-xs text-muted-foreground mb-5">{plan.description}</p>

//                   {isCurrent ? (
//                     // Paid subscriber already on this plan
//                     <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-muted border border-border text-sm font-semibold text-muted-foreground mb-5">
//                       <Check className="h-4 w-4 text-emerald" /> Current Plan
//                     </div>
//                   ) : isDowngrade ? (
//                     // Pro user looking at Starter — no upgrade prompt, quiet label only
//                     <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-muted/50 border border-border text-xs font-mono text-muted-foreground mb-5 cursor-default select-none">
//                       <Lock className="h-3.5 w-3.5 shrink-0" /> Contact us to downgrade
//                     </div>

//                  {isCurrent ? (
//   <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-muted border border-border text-sm font-semibold text-muted-foreground mb-5">
//     <Check className="h-4 w-4 text-emerald" /> Current Plan
//   </div>
// ) : isDowngrade ? (
//   <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-muted/50 border border-border text-xs font-mono text-muted-foreground mb-5 cursor-default select-none">
//     <Lock className="h-3.5 w-3.5 shrink-0" /> Contact us to downgrade
//   </div>
// ) : plan.tier === "free" ? (
//   // Free plan — user already has free or is looking at it
//   <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-muted border border-border text-sm font-semibold text-muted-foreground mb-5">
//     <Check className="h-4 w-4 text-emerald" /> Free Plan
//   </div>
// ) : (
//   // Starter or Pro — show subscribe/upgrade button
//   <button
//     onClick={() => openCheckout(plan.tier as "starter" | "pro", planInterval)}
//     className={cn("w-full py-2.5 rounded-lg text-sm font-semibold transition-colors mb-5",
//       plan.highlight
//         ? "bg-emerald text-white hover:bg-emerald/90"
//         : "bg-muted border border-border text-foreground hover:bg-foreground hover:text-background"
//     )}>
//     {isOnTrial && plan.tier === currentTier
//       ? `Subscribe to ${plan.name}`
//       : `Upgrade to ${plan.name}`
//     }
//   </button>
// )}
 
             


//                   <ul className="space-y-2.5">
//                     {plan.features.map((f) => (
//                       <li key={f.label} className="flex items-center gap-2.5 text-sm">
//                         {f.included ? <Check className="h-3.5 w-3.5 text-emerald shrink-0" /> : <Lock className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0" />}
//                         <span className={cn(f.included ? "text-foreground" : "text-muted-foreground/50")}>{f.label}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             )
//           })}
//         </div>
//       </div>

//       {/* Invoices */}
//       <div className="bg-card border border-border rounded-xl overflow-hidden">
//         <div className="flex items-center justify-between px-5 py-4 border-b border-border">
//           <p className="font-heading text-sm font-semibold text-foreground">Invoice History</p>
//           <button className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
//             <ExternalLink className="h-3.5 w-3.5" /> Billing Portal
//           </button>
//         </div>
//         {invoices.length === 0 ? (
//           <div className="px-5 py-8 text-center text-sm text-muted-foreground">No invoices yet — they'll appear here after your first payment.</div>
//         ) : (
//           <div className="divide-y divide-border">
//             {invoices.map((inv) => (
//               <div key={inv.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-muted/30 transition-colors">
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center"><FileText className="h-3.5 w-3.5 text-muted-foreground" /></div>
//                   <div><p className="text-sm font-medium text-foreground">{inv.id}</p><p className="text-xs text-muted-foreground font-mono">{inv.date}</p></div>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <span className="text-sm font-mono font-semibold text-foreground">{inv.amount}</span>
//                   <span className={cn("text-[11px] font-bold px-2 py-0.5 rounded-full font-mono border",
//                     inv.status === "Paid" ? "bg-emerald/10 text-emerald border-emerald/20" :
//                     inv.status === "Pending" ? "bg-amber/10 text-amber border-amber/20" :
//                     "bg-muted text-muted-foreground border-border"
//                   )}>{inv.status}</span>
//                   <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">Download</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <CheckoutModal
//         open={checkoutOpen}
//         onClose={() => setCheckoutOpen(false)}
//         defaultPlan={checkoutPlan}
//         defaultInterval={checkoutIntvl}
//         onSuccess={(plan, interval) => {
//           showToast("success", `${plan.charAt(0).toUpperCase() + plan.slice(1)} ${interval} plan activated! 🎉`)
//           loadBilling()
//         }}
//       />
//     </div>
//   )
// }




"use client"

import { useState, useEffect, useCallback } from "react"
import {
  Check, Zap, Lock, FileText, ExternalLink,
  Loader2, Star, AlertCircle, XCircle, CheckCircle2, RefreshCw,
  Calendar,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { supabaseBrowser } from "@/lib/supabaseClient"
import { CheckoutModal } from "@/components/checkout/CheckoutModal"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

type PlanTier        = "free" | "starter" | "pro"
type BillingInterval = "monthly" | "yearly"

interface BillingData {
  tier:                     PlanTier
  razorpay_subscription_id: string | null
  subscription_status:      string
  current_period_end:       string | null
  next_billing_at:          string | null
  is_active:                boolean
  is_pro:                   boolean
  billing_interval?:        string
}
interface Invoice { id: string; date: string; amount: string; status: string }
interface UsageData {
  prompts_used:     number; prompts_max:     number
  pages_used:       number; pages_max:       number
  competitors_used: number; competitors_max: number
  projects_used:    number; projects_max:    number
  reset_date: string | null
}

const PLANS = [
  {
    tier: "free" as PlanTier, name: "Free",
    monthly: { price: "₹0", period: "/month" },
    yearly:  { price: "₹0", period: "/year" },
    description: "Basic AEO visibility. 1 pipeline run per month.",
    features: [
      { label: "1 brand / project",          included: true  },
      { label: "Generate 20 prompts",         included: true  },
      { label: "10 prompts tracked",          included: true  },
      { label: "3 competitors tracked",       included: true  },
      { label: "Gemini only",                 included: true  },
      { label: "1 audit/month",               included: true  },
      { label: "AEO Visibility Score",        included: true  },
      { label: "Schema markup",               included: true  },
      { label: "Shareable report link",       included: true  },
      { label: "Technical audit (3 pages)",   included: true  },
      { label: "Email reports",               included: true  },
      { label: "Daily AI tracking",           included: false },
      { label: "ChatGPT tracking",            included: false },
      { label: "Perplexity tracking",         included: false },
      { label: "Score history chart",         included: false },
      { label: "Competitor discovery",        included: false },
      { label: "AI Citation tracking",        included: false },
    ],
  },
  {
    tier: "starter" as PlanTier, name: "Starter",
    monthly: { price: "₹2,999",  period: "/month" },
    yearly:  { price: "₹29,990", period: "/year", perMonth: "₹2,499/mo" },
    description: "For founders and solo marketers tracking one brand.",
    features: [
      { label: "1 brand / project",           included: true  },
      { label: "Generate 50 prompts",          included: true  },
      { label: "20 prompts tracked",           included: true  },
      { label: "10 competitors tracked",       included: true  },
      { label: "ChatGPT + Gemini",             included: true  },
      { label: "2 audits/month",               included: true  },
      { label: "Daily AI tracking",            included: true  },
      { label: "AEO Visibility Score",         included: true  },
      { label: "Recommendations",              included: true  },
      { label: "Schema markup",                included: true  },
      { label: "Shareable report link",        included: true  },
      { label: "Technical audit (all pages)",  included: true  },
      { label: "Score history chart",          included: true  },
      { label: "Competitor discovery",         included: true  },
      { label: "Email reports",                included: true  },
      { label: "Perplexity tracking",          included: false },
      { label: "AI Citation tracking",         included: false },
    ],
  },
  {
    tier: "pro" as PlanTier, name: "Pro", highlight: true,
    monthly: { price: "₹7,999",  period: "/month" },
    yearly:  { price: "₹79,990", period: "/year", perMonth: "₹6,666/mo" },
    description: "For growth teams tracking multiple brands across all AI models.",
    features: [
      { label: "Up to 3 brands",               included: true },
      { label: "100 prompts generated/brand",  included: true },
      { label: "50 prompts tracked/brand",     included: true },
      { label: "15 competitors/brand",         included: true },
      { label: "ChatGPT + Gemini + Perplexity",included: true },
      { label: "4 audits/month",               included: true },
      { label: "Daily AI tracking",            included: true },
      { label: "AEO Visibility Score",         included: true },
      { label: "Advanced recommendations",     included: true },
      { label: "Schema markup",                included: true },
      { label: "Shareable report link",        included: true },
      { label: "Technical audit (all pages)",  included: true },
      { label: "Score history chart",          included: true },
      { label: "Competitor discovery",         included: true },
      { label: "AI Citation tracking ✦",       included: true },
      { label: "Citation rate by engine ✦",    included: true },
      { label: "Missing source gaps ✦",        included: true },
      { label: "Email reports",                included: true },
      { label: "Priority support",             included: true },
    ],
  },
]

const TIER_RANK: Record<PlanTier, number> = { free: 0, starter: 1, pro: 2 }

function formatDate(iso: string | null) {
  if (!iso) return "—"
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
}

function daysUntil(iso: string | null): number | null {
  if (!iso) return null
  const diff = new Date(iso).getTime() - Date.now()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    active:               { label: "Active",         cls: "bg-emerald/10 text-emerald border-emerald/20"             },
    authenticated:        { label: "Active",         cls: "bg-emerald/10 text-emerald border-emerald/20"             },
    payment_failed:       { label: "Payment Failed", cls: "bg-destructive/10 text-destructive border-destructive/20" },
    halted:               { label: "Halted",         cls: "bg-destructive/10 text-destructive border-destructive/20" },
    canceled:             { label: "Cancelled",      cls: "bg-muted text-muted-foreground border-border"             },
    pending_cancellation: { label: "Cancelling",     cls: "bg-amber/10 text-amber border-amber/20"                   },
    inactive:             { label: "Inactive",       cls: "bg-muted text-muted-foreground border-border"             },
    paused:               { label: "Paused",         cls: "bg-muted text-muted-foreground border-border"             },
  }
  const s = map[status] ?? { label: status, cls: "bg-muted text-muted-foreground border-border" }
  return (
    <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full border text-[11px] font-bold font-mono", s.cls)}>
      {s.label}
    </span>
  )
}

function UsageBar({ label, used, max }: { label: string; used: number; max: number }) {
  const pct = max > 0 ? Math.min((used / max) * 100, 100) : 0
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-foreground/70 font-medium">{label}</span>
        <span className="font-mono text-muted-foreground">{used} / {max}</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all", used >= max ? "bg-amber" : "bg-emerald")}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default function BillingPage() {
  const [billing,       setBilling]       = useState<BillingData | null>(null)
  const [usage,         setUsage]         = useState<UsageData | null>(null)
  const [invoices,      setInvoices]      = useState<Invoice[]>([])
  const [loading,       setLoading]       = useState(true)
  const [error,         setError]         = useState<string | null>(null)
  const [cancelling,    setCancelling]    = useState(false)
  const [toast,         setToast]         = useState<{ type: "success" | "error"; msg: string } | null>(null)
  const [checkoutOpen,  setCheckoutOpen]  = useState(false)
  const [checkoutPlan,  setCheckoutPlan]  = useState<"starter" | "pro">("pro")
  const [checkoutIntvl, setCheckoutIntvl] = useState<BillingInterval>("monthly")
  const [planInterval,  setPlanInterval]  = useState<BillingInterval>("monthly")

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 4000)
  }

  const getToken = async () => {
    const { data } = await supabaseBrowser.auth.getSession()
    return data?.session?.access_token ?? null
  }

  const loadBilling = useCallback(async () => {
    setLoading(true); setError(null)
    try {
      const token = await getToken()
      if (!token) { setError("Not authenticated"); setLoading(false); return }
      const [bRes, uRes, iRes] = await Promise.all([
        fetch(`${BACKEND_URL}/billing`,          { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${BACKEND_URL}/billing/usage`,    { headers: { Authorization: `Bearer ${token}` } }).catch(() => null),
        fetch(`${BACKEND_URL}/billing/invoices`, { headers: { Authorization: `Bearer ${token}` } }).catch(() => null),
      ])
      if (!bRes.ok) throw new Error("Failed to load billing")
      const b = await bRes.json(); setBilling(b?.data ?? b)
      if (uRes?.ok) { const u = await uRes.json(); setUsage(u?.data ?? null) }
      if (iRes?.ok) { const i = await iRes.json(); setInvoices(i?.data ?? []) }
    } catch (err: any) { setError(err.message) }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { loadBilling() }, [loadBilling])

  const openCheckout = (tier: "starter" | "pro", interval: BillingInterval) => {
    setCheckoutPlan(tier); setCheckoutIntvl(interval); setCheckoutOpen(true)
  }

  const handleCancel = async () => {
    if (!confirm("Cancel your subscription? You'll keep access until end of billing period.")) return
    setCancelling(true)
    try {
      const token = await getToken()
      const res = await fetch(`${BACKEND_URL}/billing/cancel`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ cancel_at_cycle_end: true }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error ?? "Failed to cancel")
      showToast("success", "Subscription will cancel at end of billing period.")
      await loadBilling()
    } catch (err: any) { showToast("error", err.message) }
    finally { setCancelling(false) }
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="h-7 w-7 text-emerald animate-spin" />
    </div>
  )

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
      <AlertCircle className="h-8 w-8 text-destructive" />
      <p className="text-sm text-destructive">{error}</p>
      <button onClick={loadBilling} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
        <RefreshCw className="h-3 w-3" /> Retry
      </button>
    </div>
  )

  const currentTier  = billing?.tier ?? "free"
  const subStatus    = billing?.subscription_status ?? "active"
  const isActive     = billing?.is_active ?? true
  const isYearly     = billing?.billing_interval === "yearly"
  const nextBillDate = billing?.next_billing_at ?? billing?.current_period_end ?? null
  const daysLeft     = daysUntil(nextBillDate)
  const isPaidSubscriber = isActive && !!billing?.razorpay_subscription_id

  const currentPrice = () => {
    if (currentTier === "free")    return "Free"
    if (currentTier === "pro")     return isYearly ? "₹79,990/year" : "₹7,999/month"
    if (currentTier === "starter") return isYearly ? "₹29,990/year" : "₹2,999/month"
    return "Free"
  }

  return (
    <div className="flex flex-col gap-8 p-6 min-h-screen bg-background max-w-5xl relative">

      {/* Toast */}
      {toast && (
        <div className={cn(
          "fixed top-4 right-4 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl border shadow-lg text-sm font-medium",
          toast.type === "success"
            ? "bg-emerald/10 border-emerald/20 text-emerald"
            : "bg-destructive/10 border-destructive/20 text-destructive"
        )}>
          {toast.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-xl font-heading font-bold text-foreground tracking-tight">Plan & Billing</h1>
        <p className="text-xs text-muted-foreground font-mono mt-0.5">Manage your subscription and usage</p>
      </div>

      {/* Current plan banner */}
      <div className={cn(
        "rounded-xl border p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4",
        currentTier === "pro" && isPaidSubscriber ? "bg-emerald/5 border-emerald/20" : "bg-card border-border"
      )}>
        <div className="flex items-center gap-4">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
            currentTier === "pro" && isPaidSubscriber ? "bg-emerald/10" : "bg-muted"
          )}>
            {currentTier === "pro" && isPaidSubscriber
              ? <Star className="h-5 w-5 text-emerald" />
              : <Zap  className="h-5 w-5 text-muted-foreground" />}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
              <p className="font-heading text-base font-bold text-foreground">
                {currentTier === "pro" ? "Pro Plan" : currentTier === "starter" ? "Starter Plan" : "Free Plan"}
                {isYearly && isPaidSubscriber && (
                  <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald/20 text-emerald font-mono">
                    ANNUAL
                  </span>
                )}
              </p>
              <StatusBadge status={subStatus} />
            </div>
            <p className="text-xs text-muted-foreground font-mono">{currentPrice()}</p>
            {isPaidSubscriber && nextBillDate && (
              <div className="flex items-center gap-1.5 mt-1.5">
                <Calendar className="h-3 w-3 text-muted-foreground shrink-0" />
                <p className="text-xs text-muted-foreground font-mono">
                  Next bill on{" "}
                  <span className="text-foreground font-semibold">{formatDate(nextBillDate)}</span>
                  {daysLeft !== null && (
                    <span className={cn(
                      "ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold border font-mono",
                      daysLeft <= 3
                        ? "bg-destructive/10 text-destructive border-destructive/20"
                        : daysLeft <= 7
                        ? "bg-amber/10 text-amber border-amber/20"
                        : "bg-muted text-muted-foreground border-border"
                    )}>{daysLeft}d left</span>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {isPaidSubscriber && billing?.razorpay_subscription_id && (
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-destructive/30 bg-destructive/5 text-xs font-semibold text-destructive hover:bg-destructive/10 transition-colors"
            >
              {cancelling ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <XCircle className="h-3.5 w-3.5" />}
              Cancel
            </button>
          )}
          <button
            onClick={loadBilling}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-semibold text-foreground hover:bg-muted transition-colors"
          >
            <RefreshCw className="h-3 w-3" /> Refresh
          </button>
        </div>
      </div>

      {/* Usage */}
      {usage && (
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="font-heading text-sm font-semibold text-foreground mb-4">Current Usage</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UsageBar label="Prompts tracked"    used={usage.prompts_used}     max={usage.prompts_max}     />
            <UsageBar label="Pages crawled"       used={usage.pages_used}       max={usage.pages_max}       />
            <UsageBar label="Competitors tracked" used={usage.competitors_used} max={usage.competitors_max} />
            <UsageBar label="Projects"            used={usage.projects_used}    max={usage.projects_max}    />
          </div>
          {usage.reset_date && (
            <p className="text-xs text-muted-foreground mt-4 font-mono">
              Resets on {formatDate(usage.reset_date)}
            </p>
          )}
        </div>
      )}

      {/* Plan cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="font-heading text-sm font-semibold text-foreground">
            {isPaidSubscriber ? "Your Plan" : "Choose a Plan"}
          </p>
          <div className="flex items-center gap-1 p-1 rounded-lg bg-muted border border-border">
            {(["monthly", "yearly"] as BillingInterval[]).map((i) => (
              <button
                key={i}
                onClick={() => setPlanInterval(i)}
                className={cn(
                  "px-3 py-1 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5",
                  planInterval === i
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {i === "monthly" ? "Monthly" : "Yearly"}
                {i === "yearly" && (
                  <span className="text-[9px] font-bold px-1 py-0.5 rounded-full bg-emerald text-white">
                    2 months free
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PLANS.map((plan) => {
            const isCurrent   = plan.tier === currentTier
            const isDowngrade = (TIER_RANK[plan.tier] ?? 0) < (TIER_RANK[currentTier] ?? 0)
            const pricing     = plan[planInterval] ?? plan.monthly

            return (
              <div
                key={plan.tier}
                className={cn(
                  "relative bg-card border rounded-2xl overflow-hidden",
                  plan.highlight && !isCurrent
                    ? "border-emerald/30 shadow-[0_0_0_1px_rgba(15,191,154,0.2)]"
                    : "border-border",
                  isCurrent  && "ring-2 ring-emerald/20",
                  isDowngrade && "opacity-50"
                )}
              >
                {plan.highlight && (
                  <div className="absolute top-4 right-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald text-white font-mono">
                      RECOMMENDED
                    </span>
                  </div>
                )}
                <div className={cn("h-0.5", plan.highlight ? "bg-emerald" : "bg-border")} />
                <div className="p-6">
                  <p className="font-heading text-base font-bold text-foreground mb-1">{plan.name}</p>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="font-heading text-3xl font-bold text-foreground">{pricing.price}</span>
                    <span className="text-sm text-muted-foreground mb-1">{pricing.period}</span>
                  </div>
                  {"perMonth" in pricing && (
                    <p className="text-xs text-emerald font-mono mb-1">{pricing.perMonth} · 2 months free</p>
                  )}
                  <p className="text-xs text-muted-foreground mb-5">{plan.description}</p>

                  {isCurrent ? (
                    <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-muted border border-border text-sm font-semibold text-muted-foreground mb-5">
                      <Check className="h-4 w-4 text-emerald" /> Current Plan
                    </div>
                  ) : isDowngrade ? null : plan.tier === "free" ? (
                    <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-muted border border-border text-sm font-semibold text-muted-foreground mb-5">
                      <Check className="h-4 w-4 text-emerald" /> Free Plan
                    </div>
                  ) : (
                    <button
                      onClick={() => openCheckout(plan.tier as "starter" | "pro", planInterval)}
                      className={cn(
                        "w-full py-2.5 rounded-lg text-sm font-semibold transition-colors mb-5",
                        plan.highlight
                          ? "bg-emerald text-white hover:bg-emerald/90"
                          : "bg-muted border border-border text-foreground hover:bg-foreground hover:text-background"
                      )}
                    >
                      Upgrade to {plan.name}
                    </button>
                  )}

                  <ul className="space-y-2.5">
                    {plan.features.map((f) => (
                      <li key={f.label} className="flex items-center gap-2.5 text-sm">
                        {f.included
                          ? <Check className="h-3.5 w-3.5 text-emerald shrink-0" />
                          : <Lock  className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0" />}
                        <span className={cn(f.included ? "text-foreground" : "text-muted-foreground/50")}>
                          {f.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Invoices */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <p className="font-heading text-sm font-semibold text-foreground">Invoice History</p>
          <button className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <ExternalLink className="h-3.5 w-3.5" /> Billing Portal
          </button>
        </div>
        {invoices.length === 0 ? (
          <div className="px-5 py-8 text-center text-sm text-muted-foreground">
            No invoices yet — they'll appear here after your first payment.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {invoices.map((inv) => (
              <div
                key={inv.id}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center">
                    <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{inv.id}</p>
                    <p className="text-xs text-muted-foreground font-mono">{inv.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-mono font-semibold text-foreground">{inv.amount}</span>
                  <span className={cn(
                    "text-[11px] font-bold px-2 py-0.5 rounded-full font-mono border",
                    inv.status === "Paid"    ? "bg-emerald/10 text-emerald border-emerald/20" :
                    inv.status === "Pending" ? "bg-amber/10 text-amber border-amber/20" :
                    "bg-muted text-muted-foreground border-border"
                  )}>
                    {inv.status}
                  </span>
                  <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        defaultPlan={checkoutPlan}
        defaultInterval={checkoutIntvl}
        onSuccess={(plan, interval) => {
          showToast("success", `${plan.charAt(0).toUpperCase() + plan.slice(1)} ${interval} plan activated! 🎉`)
          loadBilling()
        }}
      />
    </div>
  )
}