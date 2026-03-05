// "use client"

// import { useState, useEffect, useCallback } from "react"
// import { createPortal } from "react-dom"
// import {
//   X, Check, Zap, Star, Loader2, ShieldCheck,
//   AlertCircle, Lock,
// } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { supabaseBrowser } from "@/lib/supabaseClient"

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

// type PlanTier = "starter" | "pro"

// interface CheckoutModalProps {
//   open:         boolean
//   onClose:      () => void
//   defaultPlan?: PlanTier
//   onSuccess?:   (plan: PlanTier) => void
// }

// const PLANS = {
//   starter: {
//     name: "Starter", price: "₹7,900", period: "/month",
//     description: "For founders tracking one brand",
//     features: ["1 brand / project", "20 prompts tracked", "5 competitors", "Gemini + ChatGPT", "Schema markup"],
//   },
//   pro: {
//     name: "Pro", price: "₹24,900", period: "/month",
//     description: "For teams tracking multiple brands",
//     features: ["5 brands / projects", "50 prompts tracked", "20 competitors", "Gemini + ChatGPT + Perplexity", "PDF exports"],
//   },
// }

// function loadRazorpay(): Promise<boolean> {
//   return new Promise((resolve) => {
//     if ((window as any).Razorpay) { resolve(true); return }
//     const s = document.createElement("script")
//     s.src = "https://checkout.razorpay.com/v1/checkout.js"
//     s.onload  = () => resolve(true)
//     s.onerror = () => resolve(false)
//     document.body.appendChild(s)
//   })
// }

// export function CheckoutModal({ open, onClose, defaultPlan = "pro", onSuccess }: CheckoutModalProps) {
//   const [plan,       setPlan]       = useState<PlanTier>(defaultPlan)
//   const [processing, setProcessing] = useState(false)
//   const [error,      setError]      = useState<string | null>(null)
//   const [mounted,    setMounted]    = useState(false)

//   useEffect(() => { setMounted(true) }, [])
//   useEffect(() => {
//     if (open) { setPlan(defaultPlan); setError(null) }
//   }, [open, defaultPlan])

//   useEffect(() => {
//     if (!open) return
//     const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
//     window.addEventListener("keydown", h)
//     return () => window.removeEventListener("keydown", h)
//   }, [open, onClose])

//   const handlePay = useCallback(async () => {
//     setProcessing(true); setError(null)
//     try {
//       const { data } = await supabaseBrowser.auth.getSession()
//       const token    = data?.session?.access_token
//       if (!token) throw new Error("Please log in first")

//       const loaded = await loadRazorpay()
//       if (!loaded) throw new Error("Failed to load payment gateway")

//       // Create subscription on backend
//       const subRes  = await fetch(`${BACKEND_URL}/billing/subscribe`, {
//         method:  "POST",
//         headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//         body:    JSON.stringify({ plan }),
//       })
//       const subData = await subRes.json()
//       if (!subRes.ok) throw new Error(subData?.error ?? "Failed to create subscription")

//       const { data: { user } } = await supabaseBrowser.auth.getUser()

//       // Open Razorpay — it collects billing address, name, etc. natively
//       await new Promise<void>((resolve, reject) => {
//         const rzp = new (window as any).Razorpay({
//           key:             subData.razorpay_key_id,
//           subscription_id: subData.subscription_id,
//           name:            "Tecsaro AI",
//           description:     `${PLANS[plan].name} Plan`,
//           image:           "/logoicon.png",
//           prefill: {
//             email: user?.email ?? "",
//             name:  user?.user_metadata?.full_name ?? "",
//           },
//           theme: { color: "#0fbf9a" },

//           handler: async (response: any) => {
//             try {
//               const verRes  = await fetch(`${BACKEND_URL}/billing/verify`, {
//                 method:  "POST",
//                 headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                   razorpay_payment_id:      response.razorpay_payment_id,
//                   razorpay_subscription_id: response.razorpay_subscription_id,
//                   razorpay_signature:       response.razorpay_signature,
//                   plan,
//                 }),
//               })
//               const verData = await verRes.json()
//               if (!verRes.ok) throw new Error(verData?.error ?? "Verification failed")
//               onSuccess?.(plan)
//               onClose()
//               resolve()
//             } catch (err: any) { reject(err) }
//           },
//           modal: { ondismiss: () => reject(new Error("cancelled")) },
//         })
//         rzp.open()
//       })
//     } catch (err: any) {
//       if (err.message !== "cancelled") setError(err.message)
//     } finally {
//       setProcessing(false)
//     }
//   }, [plan, onClose, onSuccess])

//   if (!mounted || !open) return null

//   return createPortal(
//     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//       <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

//       <div className="relative w-full max-w-md bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
//         <div className="h-0.5 bg-gradient-to-r from-emerald/0 via-emerald to-emerald/0" />

//         {/* Header */}
//         <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
//           <div className="flex items-center gap-2.5">
//             <div className="w-7 h-7 rounded-lg bg-emerald/10 border border-emerald/20 flex items-center justify-center">
//               <ShieldCheck className="h-3.5 w-3.5 text-emerald" />
//             </div>
//             <div>
//               <p className="text-sm font-semibold text-white">Upgrade your plan</p>
//               <p className="text-[10px] text-white/40 font-mono">Secure checkout via Razorpay</p>
//             </div>
//           </div>
//           <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors">
//             <X className="h-4 w-4" />
//           </button>
//         </div>

//         {/* Plan selection */}
//         <div className="p-5 space-y-3">
//           <p className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Select plan</p>

//           {(["starter", "pro"] as PlanTier[]).map((t) => {
//             const p        = PLANS[t]
//             const selected = plan === t
//             return (
//               <button key={t} onClick={() => setPlan(t)}
//                 className={cn(
//                   "w-full text-left rounded-xl border p-4 transition-all duration-200",
//                   selected
//                     ? "border-emerald/40 bg-emerald/5 shadow-[0_0_0_1px_rgba(15,191,154,0.15)]"
//                     : "border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/4"
//                 )}>
//                 <div className="flex items-center justify-between gap-3">
//                   <div className="flex items-center gap-3">
//                     <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", selected ? "bg-emerald/10" : "bg-white/5")}>
//                       {t === "pro"
//                         ? <Star className={cn("h-4 w-4", selected ? "text-emerald" : "text-white/30")} />
//                         : <Zap  className={cn("h-4 w-4", selected ? "text-emerald" : "text-white/30")} />
//                       }
//                     </div>
//                     <div>
//                       <div className="flex items-center gap-2">
//                         <span className="text-sm font-semibold text-white">{p.name}</span>
//                         {t === "pro" && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald text-white">POPULAR</span>}
//                       </div>
//                       <span className="text-[11px] text-white/40">{p.description}</span>
//                     </div>
//                   </div>
//                   <div className="text-right shrink-0">
//                     <p className="text-sm font-bold text-white font-mono">{p.price}</p>
//                     <p className="text-[10px] text-white/30">{p.period}</p>
//                   </div>
//                 </div>

//                 {selected && (
//                   <div className="mt-3 pt-3 border-t border-white/8 grid grid-cols-2 gap-1.5">
//                     {p.features.map((f) => (
//                       <div key={f} className="flex items-center gap-1.5">
//                         <Check className="h-3 w-3 text-emerald shrink-0" />
//                         <span className="text-[11px] text-white/55">{f}</span>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </button>
//             )
//           })}

//           {/* Trial badge */}
//           <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald/5 border border-emerald/10">
//             <ShieldCheck className="h-3.5 w-3.5 text-emerald shrink-0" />
//             <span className="text-[11px] text-emerald font-medium">7-day free trial — Razorpay collects your billing details</span>
//           </div>

//           {error && (
//             <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20">
//               <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
//               <p className="text-xs text-red-400">{error}</p>
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="px-5 pb-5 flex flex-col gap-2">
//           <button
//             onClick={handlePay}
//             disabled={processing}
//             className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald text-white text-sm font-semibold hover:bg-emerald/90 transition-all shadow-[0_0_20px_rgba(15,191,154,0.25)] disabled:opacity-60"
//           >
//             {processing
//               ? <><Loader2 className="h-4 w-4 animate-spin" /> Opening checkout…</>
//               : <><ShieldCheck className="h-4 w-4" /> Continue to Payment</>
//             }
//           </button>
//           <div className="flex items-center justify-center gap-1.5 text-[10px] text-white/25">
//             <Lock className="h-3 w-3" />
//             <span>Secured by Razorpay · Cancel anytime before trial ends</span>
//           </div>
//         </div>
//       </div>
//     </div>,
//     document.body
//   )
// }







"use client"

import { useState, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import { X, Check, Zap, Star, Loader2, ShieldCheck, AlertCircle, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import { supabaseBrowser } from "@/lib/supabaseClient"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

type PlanTier    = "starter" | "pro"
type BillingInterval = "monthly" | "yearly"

interface CheckoutModalProps {
  open:          boolean
  onClose:       () => void
  defaultPlan?:  PlanTier
  defaultInterval?: BillingInterval
  onSuccess?:    (plan: PlanTier, interval: BillingInterval) => void
}

const PLANS = {
  starter: {
    name:        "Starter",
    description: "For founders tracking one brand",
    monthly:     { price: "₹6,900",  priceNum: 6900,   period: "/month", planKey: "starter"        },
    yearly:      { price: "₹69,000", priceNum: 69000,  period: "/year",  planKey: "starter_yearly",
                   perMonth: "₹5,750/mo", savings: "Save 2 months" },
    features: ["1 brand / project", "20 prompts tracked", "5 competitors", "Gemini + ChatGPT", "Schema markup", "7-day free trial"],
  },
  pro: {
    name:        "Pro",
    description: "For teams tracking multiple brands",
    monthly:     { price: "₹20,900", priceNum: 20900,  period: "/month", planKey: "pro"             },
    yearly:      { price: "₹2,09,000", priceNum: 209000, period: "/year", planKey: "pro_yearly",
                   perMonth: "₹17,417/mo", savings: "Save 2 months" },
    features: ["5 brands / projects", "50 prompts tracked", "20 competitors", "Gemini + ChatGPT + Perplexity", "PDF exports", "7-day free trial"],
  },
}

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) { resolve(true); return }
    const s = document.createElement("script")
    s.src = "https://checkout.razorpay.com/v1/checkout.js"
    s.onload  = () => resolve(true)
    s.onerror = () => resolve(false)
    document.body.appendChild(s)
  })
}

export function CheckoutModal({
  open, onClose, defaultPlan = "pro", defaultInterval = "monthly", onSuccess,
}: CheckoutModalProps) {
  const [plan,       setPlan]       = useState<PlanTier>(defaultPlan)
  const [interval,   setInterval]   = useState<BillingInterval>(defaultInterval)
  const [processing, setProcessing] = useState(false)
  const [error,      setError]      = useState<string | null>(null)
  const [mounted,    setMounted]    = useState(false)

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
    if (open) { setPlan(defaultPlan); setInterval(defaultInterval); setError(null) }
  }, [open, defaultPlan, defaultInterval])

  useEffect(() => {
    if (!open) return
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", h)
    return () => window.removeEventListener("keydown", h)
  }, [open, onClose])

  const handlePay = useCallback(async () => {
    setProcessing(true); setError(null)
    try {
      const { data } = await supabaseBrowser.auth.getSession()
      const token    = data?.session?.access_token
      if (!token) throw new Error("Please log in first")

      const loaded = await loadRazorpay()
      if (!loaded) throw new Error("Failed to load payment gateway")

      const planKey = PLANS[plan][interval].planKey

      const subRes  = await fetch(`${BACKEND_URL}/billing/subscribe`, {
        method:  "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body:    JSON.stringify({ plan: planKey, interval }),
      })
      const subData = await subRes.json()
      if (!subRes.ok) throw new Error(subData?.error ?? "Failed to create subscription")

      const { data: { user } } = await supabaseBrowser.auth.getUser()

      await new Promise<void>((resolve, reject) => {
        const rzp = new (window as any).Razorpay({
          key:             subData.razorpay_key_id,
          subscription_id: subData.subscription_id,
          name:            "Tecsaro AI",
          description:     `${PLANS[plan].name} Plan · ${interval === "yearly" ? "Annual" : "Monthly"}`,
          image:           "/logoicon.png",
          prefill: {
            email: user?.email ?? "",
            name:  user?.user_metadata?.full_name ?? "",
          },
          theme: { color: "#0fbf9a" },
          handler: async (response: any) => {
            try {
              const verRes  = await fetch(`${BACKEND_URL}/billing/verify`, {
                method:  "POST",
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_payment_id:      response.razorpay_payment_id,
                  razorpay_subscription_id: response.razorpay_subscription_id,
                  razorpay_signature:       response.razorpay_signature,
                  plan: planKey,
                  interval,
                }),
              })
              const verData = await verRes.json()
              if (!verRes.ok) throw new Error(verData?.error ?? "Verification failed")
              onSuccess?.(plan, interval)
              onClose()
              resolve()
            } catch (err: any) { reject(err) }
          },
          modal: { ondismiss: () => reject(new Error("cancelled")) },
        })
        rzp.open()
      })
    } catch (err: any) {
      if (err.message !== "cancelled") setError(err.message)
    } finally {
      setProcessing(false)
    }
  }, [plan, interval, onClose, onSuccess])

  if (!mounted || !open) return null

  const selectedPlan = PLANS[plan]
  const pricing      = selectedPlan[interval]

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="h-0.5 bg-gradient-to-r from-emerald/0 via-emerald to-emerald/0" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald/10 border border-emerald/20 flex items-center justify-center">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Upgrade your plan</p>
              <p className="text-[10px] text-white/40 font-mono">Secure checkout via Razorpay</p>
            </div>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">

          {/* Billing interval toggle */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/8">
            {(["monthly", "yearly"] as BillingInterval[]).map((i) => (
              <button key={i} onClick={() => setInterval(i)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-xs font-semibold transition-all",
                  interval === i ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"
                )}>
                {i === "monthly" ? "Monthly" : "Yearly"}
                {i === "yearly" && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald text-white">2 MONTHS FREE</span>
                )}
              </button>
            ))}
          </div>

          {/* Plan selection */}
          <p className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Select plan</p>

          {(["starter", "pro"] as PlanTier[]).map((t) => {
            const p        = PLANS[t]
            const px       = p[interval]
            const selected = plan === t
            return (
              <button key={t} onClick={() => setPlan(t)}
                className={cn(
                  "w-full text-left rounded-xl border p-4 transition-all duration-200",
                  selected
                    ? "border-emerald/40 bg-emerald/5 shadow-[0_0_0_1px_rgba(15,191,154,0.15)]"
                    : "border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/4"
                )}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", selected ? "bg-emerald/10" : "bg-white/5")}>
                      {t === "pro"
                        ? <Star className={cn("h-4 w-4", selected ? "text-emerald" : "text-white/30")} />
                        : <Zap  className={cn("h-4 w-4", selected ? "text-emerald" : "text-white/30")} />
                      }
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">{p.name}</span>
                        {t === "pro" && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald text-white">POPULAR</span>}
                      </div>
                      <span className="text-[11px] text-white/40">{p.description}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-white font-mono">{px.price}</p>
                    <p className="text-[10px] text-white/30">{px.period}</p>
                    {"perMonth" in px && (
                      <p className="text-[10px] text-emerald font-mono">{px.perMonth}</p>
                    )}
                  </div>
                </div>

                {selected && (
                  <div className="mt-3 pt-3 border-t border-white/8 grid grid-cols-2 gap-1.5">
                    {p.features.map((f) => (
                      <div key={f} className="flex items-center gap-1.5">
                        <Check className="h-3 w-3 text-emerald shrink-0" />
                        <span className="text-[11px] text-white/55">{f}</span>
                      </div>
                    ))}
                  </div>
                )}
              </button>
            )
          })}

          {/* Summary */}
          <div className="rounded-xl bg-white/[0.03] border border-white/8 p-3 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-white/40 font-mono">
                {interval === "yearly" ? "Billed annually · 2 months free" : "Billed monthly"}
              </p>
              <p className="text-sm font-semibold text-white mt-0.5">
                {selectedPlan.name} · {pricing.price}{pricing.period}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-emerald font-mono">Today</p>
              <p className="text-base font-bold text-emerald font-mono">₹0</p>
            </div>
          </div>

          {/* Trial badge */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald/5 border border-emerald/10">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald shrink-0" />
            <span className="text-[11px] text-emerald font-medium">7-day free trial — billing starts after trial ends</span>
          </div>

          {error && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20">
              <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
              <p className="text-xs text-red-400">{error}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 pb-5 flex flex-col gap-2">
          <button onClick={handlePay} disabled={processing}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald text-white text-sm font-semibold hover:bg-emerald/90 transition-all shadow-[0_0_20px_rgba(15,191,154,0.25)] disabled:opacity-60">
            {processing
              ? <><Loader2 className="h-4 w-4 animate-spin" /> Opening checkout…</>
              : <><ShieldCheck className="h-4 w-4" /> Continue to Payment</>
            }
          </button>
          <div className="flex items-center justify-center gap-1.5 text-[10px] text-white/25">
            <Lock className="h-3 w-3" />
            <span>Secured by Razorpay · Cancel anytime before trial ends</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}