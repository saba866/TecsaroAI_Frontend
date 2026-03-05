


// "use client"

// import { useState, useEffect, useCallback } from "react"
// import {
//   Check, Zap, Lock, CreditCard, FileText, ExternalLink,
//   Loader2, Star, AlertCircle, XCircle, CheckCircle2, RefreshCw,
// } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { supabaseBrowser } from "@/lib/supabaseClient"
// import { CheckoutModal } from "@/components/checkout/CheckoutModal"

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

// type PlanTier = "starter" | "pro" | "free"

// interface BillingData {
//   tier: PlanTier; razorpay_subscription_id: string | null
//   subscription_status: string; current_period_end: string | null
//   is_active: boolean; is_pro: boolean
// }
// interface Invoice { id: string; date: string; amount: string; status: string }
// interface UsageData {
//   prompts_used: number; prompts_max: number
//   pages_used: number; pages_max: number
//   competitors_used: number; competitors_max: number
//   projects_used: number; projects_max: number
//   reset_date: string | null
// }

// const PLANS = [
//   {
//     tier: "starter" as PlanTier, name: "Starter", price: "₹7,900", period: "/month",
//     description: "For founders and solo marketers tracking one brand.",
//     features: [
//       { label: "1 brand / project",       included: true  },
//       { label: "20 AI prompts tracked",    included: true  },
//       { label: "5 competitors tracked",    included: true  },
//       { label: "Gemini + ChatGPT",         included: true  },
//       { label: "Schema markup",            included: true  },
//       { label: "7-day free trial",         included: true  },
//       { label: "Perplexity tracking",      included: false },
//       { label: "PDF report export",        included: false },
//     ],
//   },
//   {
//     tier: "pro" as PlanTier, name: "Pro", price: "₹24,900", period: "/month",
//     description: "For growth teams tracking multiple brands across all AI models.",
//     highlight: true,
//     features: [
//       { label: "Up to 5 brands",                included: true },
//       { label: "50 AI prompts tracked",          included: true },
//       { label: "20 competitors tracked",         included: true },
//       { label: "Gemini + ChatGPT + Perplexity", included: true },
//       { label: "Schema markup",                  included: true },
//       { label: "7-day free trial",               included: true },
//       { label: "Perplexity tracking",            included: true },
//       { label: "PDF report export",              included: true },
//     ],
//   },
// ]

// function formatDate(iso: string | null) {
//   if (!iso) return "—"
//   return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
// }

// function StatusBadge({ status }: { status: string }) {
//   const map: Record<string, { label: string; cls: string }> = {
//     active:               { label: "Active",         cls: "bg-emerald/10 text-emerald border-emerald/20" },
//     authenticated:        { label: "Active",         cls: "bg-emerald/10 text-emerald border-emerald/20" },
//     trial:                { label: "Trial",          cls: "bg-amber/10 text-amber border-amber/20" },
//     payment_failed:       { label: "Payment Failed", cls: "bg-destructive/10 text-destructive border-destructive/20" },
//     halted:               { label: "Halted",         cls: "bg-destructive/10 text-destructive border-destructive/20" },
//     canceled:             { label: "Cancelled",      cls: "bg-muted text-muted-foreground border-border" },
//     pending_cancellation: { label: "Cancelling",     cls: "bg-amber/10 text-amber border-amber/20" },
//     inactive:             { label: "Inactive",       cls: "bg-muted text-muted-foreground border-border" },
//   }
//   const s = map[status] ?? { label: status, cls: "bg-muted text-muted-foreground border-border" }
//   return <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full border text-[11px] font-bold font-mono", s.cls)}>{s.label}</span>
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
//   const [billing,      setBilling]      = useState<BillingData | null>(null)
//   const [usage,        setUsage]        = useState<UsageData | null>(null)
//   const [invoices,     setInvoices]     = useState<Invoice[]>([])
//   const [loading,      setLoading]      = useState(true)
//   const [error,        setError]        = useState<string | null>(null)
//   const [cancelling,   setCancelling]   = useState(false)
//   const [toast,        setToast]        = useState<{ type: "success" | "error"; msg: string } | null>(null)
//   const [checkoutOpen, setCheckoutOpen] = useState(false)
//   const [checkoutPlan, setCheckoutPlan] = useState<"starter" | "pro">("pro")

//   const showToast = (type: "success" | "error", msg: string) => {
//     setToast({ type, msg })
//     setTimeout(() => setToast(null), 4000)
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

//   const currentTier = billing?.tier ?? "free"
//   const isActive    = billing?.is_active ?? false
//   const subStatus   = billing?.subscription_status ?? "inactive"

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

//       {/* Current plan */}
//       <div className={cn("rounded-xl border p-5 flex items-center justify-between gap-4 flex-wrap", currentTier === "pro" ? "bg-emerald/5 border-emerald/20" : "bg-card border-border")}>
//         <div className="flex items-center gap-4">
//           <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", currentTier === "pro" ? "bg-emerald/10" : "bg-muted")}>
//             {currentTier === "pro" ? <Star className="h-5 w-5 text-emerald" /> : <Zap className="h-5 w-5 text-muted-foreground" />}
//           </div>
//           <div>
//             <div className="flex items-center gap-2 mb-0.5">
//               <p className="font-heading text-base font-bold text-foreground">
//                 {currentTier === "pro" ? "Pro Plan" : currentTier === "starter" ? "Starter Plan" : "Free Plan"}
//               </p>
//               <StatusBadge status={subStatus} />
//             </div>
//             <p className="text-xs text-muted-foreground font-mono">
//               {currentTier === "pro" ? "₹24,900/month" : currentTier === "starter" ? "₹7,900/month" : "Free"}
//               {billing?.current_period_end && isActive ? ` · renews ${formatDate(billing.current_period_end)}` : ""}
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           {isActive && billing?.razorpay_subscription_id && (
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

//       {/* Plans */}
//       <div>
//         <p className="font-heading text-sm font-semibold text-foreground mb-4">{currentTier === "pro" ? "Your Plan" : "Choose a Plan"}</p>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           {PLANS.map((plan) => {
//             const isCurrent = plan.tier === currentTier
//             return (
//               <div key={plan.tier} className={cn(
//                 "relative bg-card border rounded-2xl overflow-hidden",
//                 plan.highlight && !isCurrent ? "border-emerald/30 shadow-[0_0_0_1px_rgba(15,191,154,0.2)]" : "border-border",
//                 isCurrent && "ring-2 ring-emerald/20"
//               )}>
//                 {plan.highlight && <div className="absolute top-4 right-4"><span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald text-white font-mono">RECOMMENDED</span></div>}
//                 <div className={cn("h-0.5", plan.highlight ? "bg-emerald" : "bg-border")} />
//                 <div className="p-6">
//                   <p className="font-heading text-base font-bold text-foreground mb-1">{plan.name}</p>
//                   <div className="flex items-end gap-1 mb-2">
//                     <span className="font-heading text-3xl font-bold text-foreground">{plan.price}</span>
//                     <span className="text-sm text-muted-foreground mb-1">{plan.period}</span>
//                   </div>
//                   <p className="text-xs text-muted-foreground mb-5">{plan.description}</p>
//                   {isCurrent ? (
//                     <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-muted border border-border text-sm font-semibold text-muted-foreground mb-5">
//                       <Check className="h-4 w-4 text-emerald" /> Current Plan
//                     </div>
//                   ) : (
//                     <button
//                       onClick={() => { setCheckoutPlan(plan.tier as "starter" | "pro"); setCheckoutOpen(true) }}
//                       className={cn("w-full py-2.5 rounded-lg text-sm font-semibold transition-colors mb-5",
//                         plan.highlight ? "bg-emerald text-white hover:bg-emerald/90" : "bg-muted border border-border text-foreground hover:bg-foreground hover:text-background"
//                       )}
//                     >
//                       Upgrade to {plan.name}
//                     </button>
//                   )}
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
//                     inv.status === "Paid"    ? "bg-emerald/10 text-emerald border-emerald/20" :
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
//         onSuccess={(plan) => {
//           showToast("success", `${plan.charAt(0).toUpperCase() + plan.slice(1)} plan activated! 🎉`)
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
} from "lucide-react"
import { cn } from "@/lib/utils"
import { supabaseBrowser } from "@/lib/supabaseClient"
import { CheckoutModal } from "@/components/checkout/CheckoutModal"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

type PlanTier        = "starter" | "pro" | "free"
type BillingInterval = "monthly" | "yearly"

interface BillingData {
  tier: PlanTier; razorpay_subscription_id: string | null
  subscription_status: string; current_period_end: string | null
  is_active: boolean; is_pro: boolean; billing_interval?: string
}
interface Invoice  { id: string; date: string; amount: string; status: string }
interface UsageData {
  prompts_used: number; prompts_max: number
  pages_used: number; pages_max: number
  competitors_used: number; competitors_max: number
  projects_used: number; projects_max: number
  reset_date: string | null
}

const PLANS = [
  {
    tier: "starter" as PlanTier, name: "Starter",
    monthly: { price: "₹6,900",    period: "/month" },
    yearly:  { price: "₹69,000",   period: "/year", perMonth: "₹5,750/mo" },
    description: "For founders and solo marketers tracking one brand.",
    features: [
      { label: "1 brand / project",       included: true  },
      { label: "20 AI prompts tracked",    included: true  },
      { label: "5 competitors tracked",    included: true  },
      { label: "Gemini + ChatGPT",         included: true  },
      { label: "Schema markup",            included: true  },
      { label: "7-day free trial",         included: true  },
      { label: "Perplexity tracking",      included: false },
      { label: "PDF report export",        included: false },
    ],
  },
  {
    tier: "pro" as PlanTier, name: "Pro", highlight: true,
    monthly: { price: "₹20,900",   period: "/month" },
    yearly:  { price: "₹2,09,000", period: "/year", perMonth: "₹17,417/mo" },
    description: "For growth teams tracking multiple brands across all AI models.",
    features: [
      { label: "Up to 5 brands",                included: true },
      { label: "50 AI prompts tracked",          included: true },
      { label: "20 competitors tracked",         included: true },
      { label: "Gemini + ChatGPT + Perplexity", included: true },
      { label: "Schema markup",                  included: true },
      { label: "7-day free trial",               included: true },
      { label: "Perplexity tracking",            included: true },
      { label: "PDF report export",              included: true },
    ],
  },
]

function formatDate(iso: string | null) {
  if (!iso) return "—"
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    active:               { label: "Active",         cls: "bg-emerald/10 text-emerald border-emerald/20" },
    authenticated:        { label: "Active",         cls: "bg-emerald/10 text-emerald border-emerald/20" },
    trial:                { label: "Trial",          cls: "bg-amber/10 text-amber border-amber/20" },
    payment_failed:       { label: "Payment Failed", cls: "bg-destructive/10 text-destructive border-destructive/20" },
    halted:               { label: "Halted",         cls: "bg-destructive/10 text-destructive border-destructive/20" },
    canceled:             { label: "Cancelled",      cls: "bg-muted text-muted-foreground border-border" },
    pending_cancellation: { label: "Cancelling",     cls: "bg-amber/10 text-amber border-amber/20" },
    inactive:             { label: "Inactive",       cls: "bg-muted text-muted-foreground border-border" },
  }
  const s = map[status] ?? { label: status, cls: "bg-muted text-muted-foreground border-border" }
  return <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full border text-[11px] font-bold font-mono", s.cls)}>{s.label}</span>
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
        <div className={cn("h-full rounded-full transition-all", used >= max ? "bg-amber" : "bg-emerald")} style={{ width: `${pct}%` }} />
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
  // Local toggle for plan cards display
  const [planInterval,  setPlanInterval]  = useState<BillingInterval>("monthly")

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg }); setTimeout(() => setToast(null), 4000)
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
      const res   = await fetch(`${BACKEND_URL}/billing/cancel`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body:   JSON.stringify({ cancel_at_cycle_end: true }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error ?? "Failed to cancel")
      showToast("success", "Subscription will cancel at end of billing period.")
      await loadBilling()
    } catch (err: any) { showToast("error", err.message) }
    finally { setCancelling(false) }
  }

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-7 w-7 text-emerald animate-spin" /></div>
  if (error)   return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
      <AlertCircle className="h-8 w-8 text-destructive" />
      <p className="text-sm text-destructive">{error}</p>
      <button onClick={loadBilling} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"><RefreshCw className="h-3 w-3" /> Retry</button>
    </div>
  )

  const currentTier = billing?.tier ?? "free"
  const isActive    = billing?.is_active ?? false
  const subStatus   = billing?.subscription_status ?? "inactive"
  const isYearly    = billing?.billing_interval === "yearly"

  const currentPrice = () => {
    if (currentTier === "pro")     return isYearly ? "₹2,09,000/year" : "₹20,900/month"
    if (currentTier === "starter") return isYearly ? "₹69,000/year"   : "₹6,900/month"
    return "Free"
  }

  return (
    <div className="flex flex-col gap-8 p-6 min-h-screen bg-background max-w-5xl relative">

      {toast && (
        <div className={cn(
          "fixed top-4 right-4 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl border shadow-lg text-sm font-medium",
          toast.type === "success" ? "bg-emerald/10 border-emerald/20 text-emerald" : "bg-destructive/10 border-destructive/20 text-destructive"
        )}>
          {toast.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          {toast.msg}
        </div>
      )}

      <div>
        <h1 className="text-xl font-heading font-bold text-foreground tracking-tight">Plan & Billing</h1>
        <p className="text-xs text-muted-foreground font-mono mt-0.5">Manage your subscription and usage</p>
      </div>

      {/* Current plan banner */}
      <div className={cn("rounded-xl border p-5 flex items-center justify-between gap-4 flex-wrap", currentTier === "pro" ? "bg-emerald/5 border-emerald/20" : "bg-card border-border")}>
        <div className="flex items-center gap-4">
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", currentTier === "pro" ? "bg-emerald/10" : "bg-muted")}>
            {currentTier === "pro" ? <Star className="h-5 w-5 text-emerald" /> : <Zap className="h-5 w-5 text-muted-foreground" />}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <p className="font-heading text-base font-bold text-foreground">
                {currentTier === "pro" ? "Pro Plan" : currentTier === "starter" ? "Starter Plan" : "Free Plan"}
                {isYearly && <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald/20 text-emerald font-mono">ANNUAL</span>}
              </p>
              <StatusBadge status={subStatus} />
            </div>
            <p className="text-xs text-muted-foreground font-mono">
              {currentPrice()}
              {billing?.current_period_end && isActive ? ` · renews ${formatDate(billing.current_period_end)}` : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isActive && billing?.razorpay_subscription_id && (
            <button onClick={handleCancel} disabled={cancelling}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-destructive/30 bg-destructive/5 text-xs font-semibold text-destructive hover:bg-destructive/10 transition-colors">
              {cancelling ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <XCircle className="h-3.5 w-3.5" />}
              Cancel
            </button>
          )}
          <button onClick={loadBilling} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-semibold text-foreground hover:bg-muted transition-colors">
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
          {usage.reset_date && <p className="text-xs text-muted-foreground mt-4 font-mono">Resets on {formatDate(usage.reset_date)}</p>}
        </div>
      )}

      {/* Plans */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="font-heading text-sm font-semibold text-foreground">{currentTier === "pro" ? "Your Plan" : "Choose a Plan"}</p>
          {/* Interval toggle */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-muted border border-border">
            {(["monthly", "yearly"] as BillingInterval[]).map((i) => (
              <button key={i} onClick={() => setPlanInterval(i)}
                className={cn(
                  "px-3 py-1 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5",
                  planInterval === i ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}>
                {i === "monthly" ? "Monthly" : "Yearly"}
                {i === "yearly" && <span className="text-[9px] font-bold px-1 py-0.5 rounded-full bg-emerald text-white">-17%</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PLANS.map((plan) => {
            const isCurrent = plan.tier === currentTier
            const pricing   = plan[planInterval]
            return (
              <div key={plan.tier} className={cn(
                "relative bg-card border rounded-2xl overflow-hidden",
                plan.highlight && !isCurrent ? "border-emerald/30 shadow-[0_0_0_1px_rgba(15,191,154,0.2)]" : "border-border",
                isCurrent && "ring-2 ring-emerald/20"
              )}>
                {plan.highlight && <div className="absolute top-4 right-4"><span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald text-white font-mono">RECOMMENDED</span></div>}
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
                  ) : (
                    <button
                      onClick={() => openCheckout(plan.tier as "starter" | "pro", planInterval)}
                      className={cn("w-full py-2.5 rounded-lg text-sm font-semibold transition-colors mb-5",
                        plan.highlight ? "bg-emerald text-white hover:bg-emerald/90" : "bg-muted border border-border text-foreground hover:bg-foreground hover:text-background"
                      )}
                    >
                      Upgrade to {plan.name}
                    </button>
                  )}

                  <ul className="space-y-2.5">
                    {plan.features.map((f) => (
                      <li key={f.label} className="flex items-center gap-2.5 text-sm">
                        {f.included ? <Check className="h-3.5 w-3.5 text-emerald shrink-0" /> : <Lock className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0" />}
                        <span className={cn(f.included ? "text-foreground" : "text-muted-foreground/50")}>{f.label}</span>
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
          <div className="px-5 py-8 text-center text-sm text-muted-foreground">No invoices yet — they'll appear here after your first payment.</div>
        ) : (
          <div className="divide-y divide-border">
            {invoices.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center"><FileText className="h-3.5 w-3.5 text-muted-foreground" /></div>
                  <div><p className="text-sm font-medium text-foreground">{inv.id}</p><p className="text-xs text-muted-foreground font-mono">{inv.date}</p></div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-mono font-semibold text-foreground">{inv.amount}</span>
                  <span className={cn("text-[11px] font-bold px-2 py-0.5 rounded-full font-mono border",
                    inv.status === "Paid"    ? "bg-emerald/10 text-emerald border-emerald/20" :
                    inv.status === "Pending" ? "bg-amber/10 text-amber border-amber/20" :
                    "bg-muted text-muted-foreground border-border"
                  )}>{inv.status}</span>
                  <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">Download</button>
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