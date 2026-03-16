








// "use client"

// import { useState, useEffect, useCallback } from "react"

// import { createPortal } from "react-dom"
// import { X, Check, Zap, Star, Loader2, ShieldCheck, AlertCircle, Lock, Tag } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { supabaseBrowser } from "@/lib/supabaseClient"

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

// type PlanTier        = "starter" | "pro"
// type BillingInterval = "monthly" | "yearly"

// interface PlanData {
//   name: string; description: string; monthly_price: number; yearly_price: number
//   yearly_per_month: number; monthly_plan_key: string; yearly_plan_key: string
//   features: string[]; is_popular: boolean; trial_days: number
//   monthly_display: string; yearly_display: string
// }
// interface PlansResponse { starter: PlanData; pro: PlanData }
// interface CheckoutModalProps {
//   open: boolean; onClose: () => void
//   defaultPlan?: PlanTier; defaultInterval?: BillingInterval
//   onSuccess?: (plan: PlanTier, interval: BillingInterval) => void
// }

// function loadRazorpay(): Promise<boolean> {
//   return new Promise((resolve) => {
//     if ((window as any).Razorpay) { resolve(true); return }
//     const s = document.createElement("script")
//     s.src = "https://checkout.razorpay.com/v1/checkout.js"
//     s.onload = () => resolve(true); s.onerror = () => resolve(false)
//     document.body.appendChild(s)
//   })
// }

// function extractPlanId(json: any): string | null {
//   if (json?.plans?.[0]?.id) return json.plans[0].id
//   if (json?.data?.[0]?.id)  return json.data[0].id
//   if (json?.data?.id)       return json.data.id
//   if (json?.id)             return json.id
//   return null
// }

// export function CheckoutModal({ open, onClose, defaultPlan = "pro", defaultInterval = "monthly", onSuccess }: CheckoutModalProps) {
//   const [plan,         setPlan]         = useState<PlanTier>(defaultPlan)
//   const [interval,     setInterval]     = useState<BillingInterval>(defaultInterval)
//   const [processing,   setProcessing]   = useState(false)
//   const [error,        setError]        = useState<string | null>(null)
//   const [mounted,      setMounted]      = useState(false)
//   const [plans,        setPlans]        = useState<PlansResponse | null>(null)
//   const [loadingPlans, setLoadingPlans] = useState(true)
//   const [couponCode,   setCouponCode]   = useState("")
//   const [couponState,  setCouponState]  = useState<"idle"|"checking"|"valid"|"invalid">("idle")
//   const [couponMsg,    setCouponMsg]    = useState("")
//   const [couponDays,   setCouponDays]   = useState<number | null>(null)
//   const [couponData,   setCouponData]   = useState<any>(null)

//   useEffect(() => { setMounted(true) }, [])

//   useEffect(() => {
//     if (!mounted) return
//     setLoadingPlans(true)
//     fetch(`${BACKEND_URL}/billing/plans/pricing`)
//       .then(r => r.json())
//       .then(json => { const d = json?.data ?? json; if (d?.starter && d?.pro) setPlans(d) })
//       .catch(e => console.error("[CheckoutModal] plans fetch failed:", e))
//       .finally(() => setLoadingPlans(false))
//   }, [mounted])

//   useEffect(() => {
//     if (open) {
//       setPlan(defaultPlan); setInterval(defaultInterval); setError(null)
//       setCouponCode(""); setCouponState("idle"); setCouponMsg("")
//       setCouponDays(null); setCouponData(null)
//     }
//   }, [open, defaultPlan, defaultInterval])

//   useEffect(() => {
//     if (!open) return
//     const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
//     window.addEventListener("keydown", h)
//     return () => window.removeEventListener("keydown", h)
//   }, [open, onClose])

//   const checkCoupon = async () => {
//     if (!couponCode.trim()) return
//     setCouponState("checking")
//     try {
//       const { data } = await supabaseBrowser.auth.getSession()
//       const token = data?.session?.access_token
//       const res = await fetch(`${BACKEND_URL}/coupons/validate`, {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//         body: JSON.stringify({ code: couponCode }),
//       })
//       const json = await res.json()
//       if (res.ok) {
//         setCouponState("valid")
//         setCouponMsg(json.data?.message ?? "Coupon valid!")
//         setCouponDays(json.data?.trial_days ?? null)
//         setCouponData(json.data)
//         console.log("[Coupon] validated:", json.data)
//       } else {
//         setCouponState("invalid")
//         setCouponMsg(json.message ?? "Invalid coupon code")
//         setCouponDays(null); setCouponData(null)
//       }
//     } catch {
//       setCouponState("invalid"); setCouponMsg("Failed to validate coupon"); setCouponData(null)
//     }
//   }

//   const handlePay = useCallback(async () => {
//     if (!plans) return
//     setProcessing(true); setError(null)
//     try {
//       const { data } = await supabaseBrowser.auth.getSession()
//       const token = data?.session?.access_token
//       if (!token) throw new Error("Please log in first")
//       const loaded = await loadRazorpay()
//       if (!loaded) throw new Error("Failed to load payment gateway")
//       const { data: { user } } = await supabaseBrowser.auth.getUser()
//       const selectedPlan = plans[plan]
//       const planKey = interval === "yearly" ? selectedPlan.yearly_plan_key : selectedPlan.monthly_plan_key

//       // ── CASE 1: BETA (100% off) — ₹1 symbolic ──
//       if (couponState === "valid" && couponData?.is_beta) {
//         let planId: string | null = null
//         try { planId = extractPlanId(await (await fetch(`${BACKEND_URL}/plans`, { headers: { Authorization: `Bearer ${token}` } })).json()) } catch {}
//         if (!planId) {
//           try { planId = extractPlanId(await (await fetch(`${BACKEND_URL}/plans/active`, { headers: { Authorization: `Bearer ${token}` } })).json()) } catch {}
//         }
//         if (!planId) throw new Error("Could not find your active plan. Please complete onboarding first.")

//         const orderRes = await fetch(`${BACKEND_URL}/coupons/create-symbolic-order`, {
//           method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//           body: JSON.stringify({ code: couponCode, planId }),
//         })
//         const orderData = await orderRes.json()
//         if (!orderRes.ok) throw new Error(orderData.message ?? "Failed to create ₹1 order")

//         await new Promise<void>((resolve, reject) => {
//           new (window as any).Razorpay({
//             key: orderData.data.razorpay_key_id, order_id: orderData.data.order_id,
//             amount: orderData.data.amount, currency: "INR",
//             name: "Tecsaro AI", description: "Beta activation — ₹1 symbolic payment",
//             image: "/logoicon.png",
//             prefill: { email: user?.email ?? "", name: user?.user_metadata?.full_name ?? "" },
//             theme: { color: "#0fbf9a" },
//             handler: async (response: any) => {
//               try {
//                 const v = await (await fetch(`${BACKEND_URL}/coupons/verify-symbolic-order`, {
//                   method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//                   body: JSON.stringify({ razorpay_order_id: response.razorpay_order_id, razorpay_payment_id: response.razorpay_payment_id, razorpay_signature: response.razorpay_signature, code: couponCode, planId }),
//                 })).json()
//                 if (!v.data && v.message) throw new Error(v.message)
//                 onSuccess?.(plan, interval); onClose(); resolve()
//               } catch (e: any) { reject(e) }
//             },
//             modal: { ondismiss: () => reject(new Error("cancelled")) },
//           }).open()
//         })
//         return
//       }

//       // ── CASE 2: Discount coupon ──
//       if (couponState === "valid" && couponData?.is_discount) {
//         const subRes = await fetch(`${BACKEND_URL}/coupons/create-discounted-subscription`, {
//           method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//           body: JSON.stringify({ code: couponCode, planKey, interval }),
//         })
//         const subData = await subRes.json()
//         if (!subRes.ok) throw new Error(subData.message ?? "Failed to create discounted subscription")

//         await new Promise<void>((resolve, reject) => {
//           new (window as any).Razorpay({
//             key: subData.data.razorpay_key_id, subscription_id: subData.data.subscription_id,
//             name: "Tecsaro AI", description: `${selectedPlan.name} · ${couponData.discount_value}% off`,
//             image: "/logoicon.png",
//             prefill: { email: user?.email ?? "", name: user?.user_metadata?.full_name ?? "" },
//             theme: { color: "#0fbf9a" },
//             handler: async (response: any) => {
//               try {
//                 const v = await (await fetch(`${BACKEND_URL}/coupons/verify-discounted-subscription`, {
//                   method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//                   body: JSON.stringify({ razorpay_payment_id: response.razorpay_payment_id, razorpay_subscription_id: response.razorpay_subscription_id, razorpay_signature: response.razorpay_signature, code: couponCode, planKey, interval }),
//                 })).json()
//                 if (v.error) throw new Error(v.error)
//                 onSuccess?.(plan, interval); onClose(); resolve()
//               } catch (e: any) { reject(e) }
//             },
//             modal: { ondismiss: () => reject(new Error("cancelled")) },
//           }).open()
//         })
//         return
//       }

//       // ── CASE 3: Normal / trial coupon ──
//       const subRes = await fetch(`${BACKEND_URL}/billing/subscribe`, {
//         method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//         body: JSON.stringify({ plan: planKey, interval }),
//       })
//       const subData = await subRes.json()
//       if (!subRes.ok) throw new Error(subData?.error ?? "Failed to create subscription")

//       await new Promise<void>((resolve, reject) => {
//         new (window as any).Razorpay({
//           key: subData.razorpay_key_id, subscription_id: subData.subscription_id,
//           name: "Tecsaro AI", description: `${selectedPlan.name} · ${interval === "yearly" ? "Annual" : "Monthly"}`,
//           image: "/logoicon.png",
//           prefill: { email: user?.email ?? "", name: user?.user_metadata?.full_name ?? "" },
//           theme: { color: "#0fbf9a" },
//           handler: async (response: any) => {
//             try {
//               const v = await (await fetch(`${BACKEND_URL}/billing/verify`, {
//                 method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//                 body: JSON.stringify({ razorpay_payment_id: response.razorpay_payment_id, razorpay_subscription_id: response.razorpay_subscription_id, razorpay_signature: response.razorpay_signature, plan: planKey, interval }),
//               })).json()
//               if (v.error) throw new Error(v.error)
//               // Apply trial extension coupon after payment
//               if (couponState === "valid" && couponData?.is_trial && couponCode.trim()) {
//                 try {
//                   const pj = await (await fetch(`${BACKEND_URL}/plans`, { headers: { Authorization: `Bearer ${token}` } })).json()
//                   const pid = extractPlanId(pj)
//                   if (pid) await fetch(`${BACKEND_URL}/coupons/apply`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ code: couponCode, planId: pid }) })
//                 } catch (e) { console.error("[CheckoutModal] trial apply failed:", e) }
//               }
//               onSuccess?.(plan, interval); onClose(); resolve()
//             } catch (e: any) { reject(e) }
//           },
//           modal: { ondismiss: () => reject(new Error("cancelled")) },
//         }).open()
//       })
//     } catch (err: any) {
//       if (err.message !== "cancelled") setError(err.message)
//     } finally {
//       setProcessing(false)
//     }
//   }, [plan, interval, plans, onClose, onSuccess, couponCode, couponState, couponData])

//   if (!mounted || !open) return null

//   const selectedPlan = plans?.[plan]
//   const price = selectedPlan
//     ? interval === "yearly"
//       ? selectedPlan.yearly_display  || `₹${selectedPlan.yearly_price.toLocaleString("en-IN")}`
//       : selectedPlan.monthly_display || `₹${selectedPlan.monthly_price.toLocaleString("en-IN")}`
//     : "…"
//   const period   = interval === "yearly" ? "/year" : "/month"
//   const perMonth = selectedPlan && interval === "yearly" && selectedPlan.yearly_per_month
//     ? `₹${selectedPlan.yearly_per_month.toLocaleString("en-IN")}/mo` : null
//   const trialDays = couponDays ?? selectedPlan?.trial_days ?? 7

//   // ─────────────────────────────────────────────────────────────────
//   // BADGE TEXT — single source of truth, never duplicates green banner
//   //
//   // Backend coupon types (from validateCoupon):
//   //   is_beta     → discount_type="percent", value=100  → ₹1 symbolic, 30 days free
//   //   is_discount → discount_type="percent", value<100  → % off every cycle
//   //   is_trial    → discount_type="trial_days"|"fixed"  → extend trial N days
//   //
//   // Green banner (couponMsg) already says what the coupon does.
//   // Badge shows the BILLING consequence — when/how much they pay.
//   // ─────────────────────────────────────────────────────────────────
//   const badgeText = (() => {
//     if (couponState !== "valid" || !couponData) {
//       return `${trialDays}-day free forever — billing starts after trial ends`
//     }
//     if (couponData.is_beta) {
//       return "Pay ₹1 today — 30 days full access, cancel anytime"
//     }
//     if (couponData.is_discount) {
//       return `${couponData.discount_value}% off every billing cycle — applied at checkout`
//     }
//     if (couponData.is_trial) {
//       // couponMsg already says "🎉 X-day free forever extension unlocked!"
//       // badge shows the result: when billing starts
//       return `Trial extended to ${couponDays ?? 30} days — billing starts after trial ends`
//     }
//     return `${trialDays}-day free forever — billing starts after trial ends`
//   })()

//   const btnLabel = (() => {
//     if (processing) return null
//     if (couponState === "valid" && couponData?.is_beta)
//       return <><ShieldCheck className="h-4 w-4" /> Pay ₹1 &amp; Activate 30 Days Free</>
//     if (couponState === "valid" && couponData?.is_discount)
//       return <><ShieldCheck className="h-4 w-4" /> Continue at {couponData.discount_value}% Off</>
//     if (couponState === "valid" && couponData?.is_trial)
//       return <><ShieldCheck className="h-4 w-4" /> Continue &amp; Extend Trial by {couponDays ?? 30} Days</>
//     return <><ShieldCheck className="h-4 w-4" /> Continue to Payment</>
//   })()

//   return createPortal(
//     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//       <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

//       {/* Modal — flex column, max-h for scroll */}
//       <div className="relative w-full max-w-md bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
//         <div className="h-0.5 bg-gradient-to-r from-emerald/0 via-emerald to-emerald/0 shrink-0" />

//         {/* Sticky header */}
//         <div className="flex items-center justify-between px-5 py-4 border-b border-white/8 shrink-0">
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

//         {/* Scrollable body */}
//         {loadingPlans ? (
//           <div className="flex items-center justify-center py-16 flex-1">
//             <Loader2 className="h-5 w-5 animate-spin text-white/30" />
//           </div>
//         ) : (
//           <div className="overflow-y-auto overscroll-contain flex-1" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }}>
//             <div className="p-5 space-y-4">

//               {/* Billing toggle */}
//               <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/8">
//                 {(["monthly", "yearly"] as BillingInterval[]).map((i) => (
//                   <button key={i} onClick={() => setInterval(i)}
//                     className={cn("flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-xs font-semibold transition-all",
//                       interval === i ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70")}>
//                     {i === "monthly" ? "Monthly" : "Yearly"}
//                     {i === "yearly" && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald text-white">2 MONTHS FREE</span>}
//                   </button>
//                 ))}
//               </div>

//               <p className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Select plan</p>

//               {plans && (["starter", "pro"] as PlanTier[]).map((t) => {
//                 const p = plans[t]
//                 const px_price = interval === "yearly"
//                   ? p.yearly_display  || `₹${p.yearly_price.toLocaleString("en-IN")}`
//                   : p.monthly_display || `₹${p.monthly_price.toLocaleString("en-IN")}`
//                 const px_per = interval === "yearly" && p.yearly_per_month
//                   ? `₹${p.yearly_per_month.toLocaleString("en-IN")}/mo` : null
//                 const selected = plan === t
//                 return (
//                   <button key={t} onClick={() => t === "pro" ? null : setPlan(t)} disabled={t === "pro"}
//                     className={cn("w-full text-left rounded-xl border p-4 transition-all duration-200 relative",
//                       t === "pro" ? "border-white/5 bg-white/[0.01] opacity-50 cursor-not-allowed"
//                       : selected ? "border-emerald/40 bg-emerald/5 shadow-[0_0_0_1px_rgba(15,191,154,0.15)]"
//                       : "border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/4")}>
//                     {t === "pro" && (
//                       <div className="absolute top-3 right-3">
//                         <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-white/10 text-white/50 font-mono border border-white/10">COMING SOON</span>
//                       </div>
//                     )}
//                     <div className="flex items-center justify-between gap-3">
//                       <div className="flex items-center gap-3">
//                         <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", selected ? "bg-emerald/10" : "bg-white/5")}>
//                           {t === "pro" ? <Star className={cn("h-4 w-4", selected ? "text-emerald" : "text-white/30")} />
//                                        : <Zap  className={cn("h-4 w-4", selected ? "text-emerald" : "text-white/30")} />}
//                         </div>
//                         <div>
//                           <div className="flex items-center gap-2">
//                             <span className="text-sm font-semibold text-white">{p.name}</span>
//                             {p.is_popular && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald text-white">POPULAR</span>}
//                           </div>
//                           <span className="text-[11px] text-white/40">{p.description}</span>
//                         </div>
//                       </div>
//                       <div className="text-right shrink-0">
//                         <p className="text-sm font-bold text-white font-mono">
//                           {couponState === "valid" && couponData?.is_discount && t === plan
//                             ? <span>
//                                 <span className="line-through text-white/30 text-[11px] mr-1">{px_price}</span>
//                                 <span className="text-emerald">
//                                   {interval === "yearly"
//                                     ? `₹${Math.round(p.yearly_price * (1 - couponData.discount_value / 100)).toLocaleString("en-IN")}`
//                                     : `₹${Math.round(p.monthly_price * (1 - couponData.discount_value / 100)).toLocaleString("en-IN")}`}
//                                 </span>
//                               </span>
//                             : px_price}
//                         </p>
//                         <p className="text-[10px] text-white/30">{period}</p>
//                         {px_per && <p className="text-[10px] text-emerald font-mono">{px_per}</p>}
//                       </div>
//                     </div>
//                     {selected && p.features.length > 0 && (
//                       <div className="mt-3 pt-3 border-t border-white/8 grid grid-cols-2 gap-1.5">
//                         {p.features.map((f) => (
//                           <div key={f} className="flex items-center gap-1.5">
//                             <Check className="h-3 w-3 text-emerald shrink-0" />
//                             <span className="text-[11px] text-white/55">{f}</span>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </button>
//                 )
//               })}

//               {/* Summary */}
//               <div className="rounded-xl bg-white/[0.03] border border-white/8 p-3 flex items-center justify-between">
//                 <div>
//                   <p className="text-[10px] text-white/40 font-mono">{interval === "yearly" ? "Billed annually · 2 months free" : "Billed monthly"}</p>
//                   <p className="text-sm font-semibold text-white mt-0.5">
//                     {selectedPlan?.name} · {
//                       couponState === "valid" && couponData?.is_discount
//                         ? interval === "yearly"
//                           ? `₹${Math.round((selectedPlan?.yearly_price ?? 0) * (1 - couponData.discount_value / 100)).toLocaleString("en-IN")}`
//                           : `₹${Math.round((selectedPlan?.monthly_price ?? 0) * (1 - couponData.discount_value / 100)).toLocaleString("en-IN")}`
//                         : price
//                     }{period}
//                   </p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-[10px] text-emerald font-mono">Today</p>
//                   <p className="text-base font-bold text-emerald font-mono">{couponState === "valid" && couponData?.is_beta ? "₹1" : "₹0"}</p>
//                 </div>
//               </div>

//               {/* Coupon input */}
//               <div className="flex flex-col gap-2">
//                 <div className="flex gap-2">
//                   <div className="relative flex-1">
//                     <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
//                     <input type="text" value={couponCode}
//                       onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setCouponState("idle"); setCouponDays(null); setCouponData(null) }}
//                       onKeyDown={(e) => e.key === "Enter" && checkCoupon()}
//                       placeholder="Coupon code"
//                       className="w-full pl-8 pr-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs placeholder:text-white/25 focus:outline-none focus:border-emerald/40 font-mono transition-colors" />
//                   </div>
//                   <button onClick={checkCoupon} disabled={!couponCode.trim() || couponState === "checking" || couponState === "valid"}
//                     className="px-4 py-2 rounded-lg bg-white/8 border border-white/10 text-white text-xs font-semibold hover:bg-white/15 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
//                     {couponState === "checking" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : couponState === "valid" ? "✓" : "Apply"}
//                   </button>
//                 </div>

//                 {/* Green banner — shows backend message ONLY (one message, no duplication) */}
//                 {couponState === "valid" && (
//                   <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald/10 border border-emerald/20">
//                     <Check className="h-3.5 w-3.5 text-emerald shrink-0" />
//                     <span className="text-xs text-emerald font-medium">{couponMsg}</span>
//                   </div>
//                 )}
//                 {couponState === "invalid" && (
//                   <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20">
//                     <AlertCircle className="h-3.5 w-3.5 text-red-400 shrink-0" />
//                     <span className="text-xs text-red-400">{couponMsg}</span>
//                   </div>
//                 )}
//               </div>

//               {/* Bottom badge — shows billing consequence, never repeats coupon banner */}
//               <div className={cn("flex items-center gap-2 px-3 py-2 rounded-lg border transition-all",
//                 couponState === "valid" ? "bg-emerald/10 border-emerald/30" : "bg-emerald/5 border-emerald/10")}>
//                 <ShieldCheck className="h-3.5 w-3.5 text-emerald shrink-0" />
//                 <span className="text-[11px] text-emerald font-medium">{badgeText}</span>
//               </div>

//               {error && (
//                 <div className="flex items-start gap-2 px-3 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20">
//                   <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
//                   <p className="text-xs text-red-400 leading-relaxed">{error}</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Sticky footer */}
//         {!loadingPlans && (
//           <div className="px-5 pb-5 pt-3 border-t border-white/8 shrink-0 bg-[#0d1117]">
//             <button onClick={handlePay} disabled={processing || !plans}
//               className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald text-white text-sm font-semibold hover:bg-emerald/90 transition-all shadow-[0_0_20px_rgba(15,191,154,0.25)] disabled:opacity-60">
//               {processing ? <><Loader2 className="h-4 w-4 animate-spin" /> Opening checkout…</> : btnLabel}
//             </button>
//             <div className="flex items-center justify-center gap-1.5 mt-2 text-[10px] text-white/25">
//               <Lock className="h-3 w-3" />
//               <span>Secured by Razorpay · Cancel anytime before trial ends</span>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>,
//     document.body
//   )
// }



"use client"

import { useState, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import { X, Check, Zap, Star, Loader2, ShieldCheck, AlertCircle, Lock, Tag } from "lucide-react"
import { cn } from "@/lib/utils"
import { supabaseBrowser } from "@/lib/supabaseClient"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

type PlanTier        = "starter" | "pro"
type BillingInterval = "monthly" | "yearly"

interface PlanData {
  name: string; description: string; monthly_price: number; yearly_price: number
  yearly_per_month: number; monthly_plan_key: string; yearly_plan_key: string
  features: string[]; is_popular: boolean; trial_days: number
  monthly_display: string; yearly_display: string
}
interface PlansResponse { starter: PlanData; pro: PlanData }
interface CheckoutModalProps {
  open: boolean; onClose: () => void
  defaultPlan?: PlanTier; defaultInterval?: BillingInterval
  onSuccess?: (plan: PlanTier, interval: BillingInterval) => void
}

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) { resolve(true); return }
    const s = document.createElement("script")
    s.src = "https://checkout.razorpay.com/v1/checkout.js"
    s.onload = () => resolve(true); s.onerror = () => resolve(false)
    document.body.appendChild(s)
  })
}

function extractPlanId(json: any): string | null {
  if (json?.plans?.[0]?.id) return json.plans[0].id
  if (json?.data?.[0]?.id)  return json.data[0].id
  if (json?.data?.id)       return json.data.id
  if (json?.id)             return json.id
  return null
}

export function CheckoutModal({ open, onClose, defaultPlan = "pro", defaultInterval = "monthly", onSuccess }: CheckoutModalProps) {
  const [plan,         setPlan]         = useState<PlanTier>(defaultPlan)
  const [interval,     setInterval]     = useState<BillingInterval>(defaultInterval)
  const [processing,   setProcessing]   = useState(false)
  const [error,        setError]        = useState<string | null>(null)
  const [mounted,      setMounted]      = useState(false)
  const [plans,        setPlans]        = useState<PlansResponse | null>(null)
  const [loadingPlans, setLoadingPlans] = useState(true)
  const [couponCode,   setCouponCode]   = useState("")
  const [couponState,  setCouponState]  = useState<"idle"|"checking"|"valid"|"invalid">("idle")
  const [couponMsg,    setCouponMsg]    = useState("")
  const [couponDays,   setCouponDays]   = useState<number | null>(null)
  const [couponData,   setCouponData]   = useState<any>(null)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted) return
    setLoadingPlans(true)
    fetch(`${BACKEND_URL}/billing/plans/pricing`)
      .then(r => r.json())
      .then(json => { const d = json?.data ?? json; if (d?.starter && d?.pro) setPlans(d) })
      .catch(e => console.error("[CheckoutModal] plans fetch failed:", e))
      .finally(() => setLoadingPlans(false))
  }, [mounted])

  useEffect(() => {
    if (open) {
      setPlan(defaultPlan); setInterval(defaultInterval); setError(null)
      setCouponCode(""); setCouponState("idle"); setCouponMsg("")
      setCouponDays(null); setCouponData(null)
    }
  }, [open, defaultPlan, defaultInterval])

  useEffect(() => {
    if (!open) return
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", h)
    return () => window.removeEventListener("keydown", h)
  }, [open, onClose])

  const checkCoupon = async () => {
    if (!couponCode.trim()) return
    setCouponState("checking")
    try {
      const { data } = await supabaseBrowser.auth.getSession()
      const token = data?.session?.access_token
      const res = await fetch(`${BACKEND_URL}/coupons/validate`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode }),
      })
      const json = await res.json()
      if (res.ok) {
        setCouponState("valid")
        setCouponMsg(json.data?.message ?? "Coupon valid!")
        setCouponDays(json.data?.trial_days ?? null)
        setCouponData(json.data)
        console.log("[Coupon] validated:", json.data)
      } else {
        setCouponState("invalid")
        setCouponMsg(json.message ?? "Invalid coupon code")
        setCouponDays(null); setCouponData(null)
      }
    } catch {
      setCouponState("invalid"); setCouponMsg("Failed to validate coupon"); setCouponData(null)
    }
  }

  const handlePay = useCallback(async () => {
    if (!plans) return
    setProcessing(true); setError(null)
    try {
      const { data } = await supabaseBrowser.auth.getSession()
      const token = data?.session?.access_token
      if (!token) throw new Error("Please log in first")
      const loaded = await loadRazorpay()
      if (!loaded) throw new Error("Failed to load payment gateway")
      const { data: { user } } = await supabaseBrowser.auth.getUser()
      const selectedPlan = plans[plan]
      const planKey = interval === "yearly" ? selectedPlan.yearly_plan_key : selectedPlan.monthly_plan_key

      // ── CASE 1: Discount coupon (30% / 50% / 100% off) ──
      // 100% off plans are ₹1/month Razorpay plans — same flow as 30%/50%
      if (couponState === "valid" && (couponData?.is_discount || couponData?.is_full)) {
        const subRes = await fetch(`${BACKEND_URL}/coupons/create-discounted-subscription`, {
          method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify({ code: couponCode, planKey, interval }),
        })
        const subData = await subRes.json()
        if (!subRes.ok) throw new Error(subData.message ?? "Failed to create discounted subscription")

        const discountLabel = couponData?.is_full
          ? "₹1/month"
          : `${couponData.discount_value}% off`

        await new Promise<void>((resolve, reject) => {
          new (window as any).Razorpay({
            key: subData.data.razorpay_key_id, subscription_id: subData.data.subscription_id,
            name: "Tecsaro AI", description: `${selectedPlan.name} · ${discountLabel}`,
            image: "/logoicon.png",
            prefill: { email: user?.email ?? "", name: user?.user_metadata?.full_name ?? "" },
            theme: { color: "#0fbf9a" },
            handler: async (response: any) => {
              try {
                const v = await (await fetch(`${BACKEND_URL}/coupons/verify-discounted-subscription`, {
                  method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                  body: JSON.stringify({
                    razorpay_payment_id:      response.razorpay_payment_id,
                    razorpay_subscription_id: response.razorpay_subscription_id,
                    razorpay_signature:       response.razorpay_signature,
                    code: couponCode, planKey, interval,
                  }),
                })).json()
                if (v.error) throw new Error(v.error)
                onSuccess?.(plan, interval); onClose(); resolve()
              } catch (e: any) { reject(e) }
            },
            modal: { ondismiss: () => reject(new Error("cancelled")) },
          }).open()
        })
        return
      }

      // ── CASE 2: Normal subscription / trial coupon ──
      const subRes = await fetch(`${BACKEND_URL}/billing/subscribe`, {
        method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planKey, interval }),
      })
      const subData = await subRes.json()
      if (!subRes.ok) throw new Error(subData?.error ?? "Failed to create subscription")

      await new Promise<void>((resolve, reject) => {
        new (window as any).Razorpay({
          key: subData.razorpay_key_id, subscription_id: subData.subscription_id,
          name: "Tecsaro AI", description: `${selectedPlan.name} · ${interval === "yearly" ? "Annual" : "Monthly"}`,
          image: "/logoicon.png",
          prefill: { email: user?.email ?? "", name: user?.user_metadata?.full_name ?? "" },
          theme: { color: "#0fbf9a" },
          handler: async (response: any) => {
            try {
              const v = await (await fetch(`${BACKEND_URL}/billing/verify`, {
                method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_payment_id:      response.razorpay_payment_id,
                  razorpay_subscription_id: response.razorpay_subscription_id,
                  razorpay_signature:       response.razorpay_signature,
                  plan: planKey, interval,
                }),
              })).json()
              if (v.error) throw new Error(v.error)
              // Apply trial extension coupon after payment if present
              if (couponState === "valid" && couponData?.is_trial && couponCode.trim()) {
                try {
                  const pj = await (await fetch(`${BACKEND_URL}/plans`, { headers: { Authorization: `Bearer ${token}` } })).json()
                  const pid = extractPlanId(pj)
                  if (pid) await fetch(`${BACKEND_URL}/coupons/apply`, {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                    body: JSON.stringify({ code: couponCode, planId: pid }),
                  })
                } catch (e) { console.error("[CheckoutModal] trial apply failed:", e) }
              }
              onSuccess?.(plan, interval); onClose(); resolve()
            } catch (e: any) { reject(e) }
          },
          modal: { ondismiss: () => reject(new Error("cancelled")) },
        }).open()
      })
    } catch (err: any) {
      if (err.message !== "cancelled") setError(err.message)
    } finally {
      setProcessing(false)
    }
  }, [plan, interval, plans, onClose, onSuccess, couponCode, couponState, couponData])

  if (!mounted || !open) return null

  const selectedPlan = plans?.[plan]
  const price = selectedPlan
    ? interval === "yearly"
      ? selectedPlan.yearly_display  || `₹${selectedPlan.yearly_price.toLocaleString("en-IN")}`
      : selectedPlan.monthly_display || `₹${selectedPlan.monthly_price.toLocaleString("en-IN")}`
    : "…"
  const period   = interval === "yearly" ? "/year" : "/month"
  const perMonth = selectedPlan && interval === "yearly" && selectedPlan.yearly_per_month
    ? `₹${selectedPlan.yearly_per_month.toLocaleString("en-IN")}/mo` : null
  const trialDays = couponDays ?? selectedPlan?.trial_days ?? 7

  // ─────────────────────────────────────────────────────────────────
  // BADGE TEXT — billing consequence shown below coupon banner
  //
  // Backend coupon types (from validateCoupon):
  //   is_full     → discount_type="percent", value=100  → ₹1/month Razorpay plan
  //   is_discount → discount_type="percent", value<100  → % off every cycle
  //   is_trial    → discount_type="trial_days"|"fixed"  → extend trial N days
  // ─────────────────────────────────────────────────────────────────
  const badgeText = (() => {
    if (couponState !== "valid" || !couponData) {
      return `${trialDays}-day free trial — billing starts after trial ends`
    }
    if (couponData.is_full) {
      return "Pay ₹1/month — full access, cancel anytime"
    }
    if (couponData.is_discount) {
      return `${couponData.discount_value}% off every billing cycle — applied at checkout`
    }
    if (couponData.is_trial) {
      return `Trial extended to ${couponDays ?? 30} days — billing starts after trial ends`
    }
    return `${trialDays}-day free trial — billing starts after trial ends`
  })()

  const btnLabel = (() => {
    if (processing) return null
    if (couponState === "valid" && couponData?.is_full)
      return <><ShieldCheck className="h-4 w-4" /> Continue at ₹1/month</>
    if (couponState === "valid" && couponData?.is_discount)
      return <><ShieldCheck className="h-4 w-4" /> Continue at {couponData.discount_value}% Off</>
    if (couponState === "valid" && couponData?.is_trial)
      return <><ShieldCheck className="h-4 w-4" /> Continue &amp; Extend Trial by {couponDays ?? 30} Days</>
    return <><ShieldCheck className="h-4 w-4" /> Continue to Payment</>
  })()

  // "Today you pay" amount shown in summary box
  const todayAmount = (() => {
    if (couponState === "valid" && couponData?.is_full)     return "₹1"
    if (couponState === "valid" && couponData?.is_discount) return "₹0"
    return "₹0"
  })()

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <div className="h-0.5 bg-gradient-to-r from-emerald/0 via-emerald to-emerald/0 shrink-0" />

        {/* Sticky header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/8 shrink-0">
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

        {/* Scrollable body */}
        {loadingPlans ? (
          <div className="flex items-center justify-center py-16 flex-1">
            <Loader2 className="h-5 w-5 animate-spin text-white/30" />
          </div>
        ) : (
          <div className="overflow-y-auto overscroll-contain flex-1" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }}>
            <div className="p-5 space-y-4">

              {/* Billing toggle */}
              <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/8">
                {(["monthly", "yearly"] as BillingInterval[]).map((i) => (
                  <button key={i} onClick={() => setInterval(i)}
                    className={cn("flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-xs font-semibold transition-all",
                      interval === i ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70")}>
                    {i === "monthly" ? "Monthly" : "Yearly"}
                    {i === "yearly" && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald text-white">2 MONTHS FREE</span>}
                  </button>
                ))}
              </div>

              <p className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Select plan</p>

              {plans && (["starter", "pro"] as PlanTier[]).map((t) => {
                const p = plans[t]
                const px_price = interval === "yearly"
                  ? p.yearly_display  || `₹${p.yearly_price.toLocaleString("en-IN")}`
                  : p.monthly_display || `₹${p.monthly_price.toLocaleString("en-IN")}`
                const px_per = interval === "yearly" && p.yearly_per_month
                  ? `₹${p.yearly_per_month.toLocaleString("en-IN")}/mo` : null
                const selected = plan === t

                // Discounted price display (for is_discount and is_full)
                const showDiscounted = couponState === "valid" && (couponData?.is_discount || couponData?.is_full) && t === plan
                const discountedPrice = (() => {
                  if (!showDiscounted) return null
                  if (couponData?.is_full) return "₹1"
                  return interval === "yearly"
                    ? `₹${Math.round(p.yearly_price * (1 - couponData.discount_value / 100)).toLocaleString("en-IN")}`
                    : `₹${Math.round(p.monthly_price * (1 - couponData.discount_value / 100)).toLocaleString("en-IN")}`
                })()

                return (
                  <button key={t} onClick={() => t === "pro" ? null : setPlan(t)} disabled={t === "pro"}
                    className={cn("w-full text-left rounded-xl border p-4 transition-all duration-200 relative",
                      t === "pro" ? "border-white/5 bg-white/[0.01] opacity-50 cursor-not-allowed"
                      : selected ? "border-emerald/40 bg-emerald/5 shadow-[0_0_0_1px_rgba(15,191,154,0.15)]"
                      : "border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/4")}>
                    {t === "pro" && (
                      <div className="absolute top-3 right-3">
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-white/10 text-white/50 font-mono border border-white/10">COMING SOON</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", selected ? "bg-emerald/10" : "bg-white/5")}>
                          {t === "pro" ? <Star className={cn("h-4 w-4", selected ? "text-emerald" : "text-white/30")} />
                                       : <Zap  className={cn("h-4 w-4", selected ? "text-emerald" : "text-white/30")} />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-white">{p.name}</span>
                            {p.is_popular && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald text-white">POPULAR</span>}
                          </div>
                          <span className="text-[11px] text-white/40">{p.description}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-white font-mono">
                          {showDiscounted
                            ? <span>
                                <span className="line-through text-white/30 text-[11px] mr-1">{px_price}</span>
                                <span className="text-emerald">{discountedPrice}</span>
                              </span>
                            : px_price}
                        </p>
                        <p className="text-[10px] text-white/30">{period}</p>
                        {px_per && <p className="text-[10px] text-emerald font-mono">{px_per}</p>}
                      </div>
                    </div>
                    {selected && p.features.length > 0 && (
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
                  <p className="text-[10px] text-white/40 font-mono">{interval === "yearly" ? "Billed annually · 2 months free" : "Billed monthly"}</p>
                  <p className="text-sm font-semibold text-white mt-0.5">
                    {selectedPlan?.name} · {
                      couponState === "valid" && couponData?.is_full
                        ? "₹1"
                        : couponState === "valid" && couponData?.is_discount
                        ? interval === "yearly"
                          ? `₹${Math.round((selectedPlan?.yearly_price ?? 0) * (1 - couponData.discount_value / 100)).toLocaleString("en-IN")}`
                          : `₹${Math.round((selectedPlan?.monthly_price ?? 0) * (1 - couponData.discount_value / 100)).toLocaleString("en-IN")}`
                        : price
                    }{period}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-emerald font-mono">Today</p>
                  <p className="text-base font-bold text-emerald font-mono">{todayAmount}</p>
                </div>
              </div>

              {/* Coupon input */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
                    <input type="text" value={couponCode}
                      onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setCouponState("idle"); setCouponDays(null); setCouponData(null) }}
                      onKeyDown={(e) => e.key === "Enter" && checkCoupon()}
                      placeholder="Coupon code"
                      className="w-full pl-8 pr-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs placeholder:text-white/25 focus:outline-none focus:border-emerald/40 font-mono transition-colors" />
                  </div>
                  <button onClick={checkCoupon} disabled={!couponCode.trim() || couponState === "checking" || couponState === "valid"}
                    className="px-4 py-2 rounded-lg bg-white/8 border border-white/10 text-white text-xs font-semibold hover:bg-white/15 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                    {couponState === "checking" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : couponState === "valid" ? "✓" : "Apply"}
                  </button>
                </div>

                {/* Green banner — shows backend message */}
                {couponState === "valid" && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald/10 border border-emerald/20">
                    <Check className="h-3.5 w-3.5 text-emerald shrink-0" />
                    <span className="text-xs text-emerald font-medium">{couponMsg}</span>
                  </div>
                )}
                {couponState === "invalid" && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20">
                    <AlertCircle className="h-3.5 w-3.5 text-red-400 shrink-0" />
                    <span className="text-xs text-red-400">{couponMsg}</span>
                  </div>
                )}
              </div>

              {/* Bottom badge — billing consequence */}
              <div className={cn("flex items-center gap-2 px-3 py-2 rounded-lg border transition-all",
                couponState === "valid" ? "bg-emerald/10 border-emerald/30" : "bg-emerald/5 border-emerald/10")}>
                <ShieldCheck className="h-3.5 w-3.5 text-emerald shrink-0" />
                <span className="text-[11px] text-emerald font-medium">{badgeText}</span>
              </div>

              {error && (
                <div className="flex items-start gap-2 px-3 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20">
                  <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-red-400 leading-relaxed">{error}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Sticky footer */}
        {!loadingPlans && (
          <div className="px-5 pb-5 pt-3 border-t border-white/8 shrink-0 bg-[#0d1117]">
            <button onClick={handlePay} disabled={processing || !plans}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald text-white text-sm font-semibold hover:bg-emerald/90 transition-all shadow-[0_0_20px_rgba(15,191,154,0.25)] disabled:opacity-60">
              {processing ? <><Loader2 className="h-4 w-4 animate-spin" /> Opening checkout…</> : btnLabel}
            </button>
            <div className="flex items-center justify-center gap-1.5 mt-2 text-[10px] text-white/25">
              <Lock className="h-3 w-3" />
              <span>Secured by Razorpay · Cancel anytime</span>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}