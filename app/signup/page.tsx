



// "use client"

// import React, { useState } from "react"
// import Link from "next/link"
// import Image from "next/image"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Eye, EyeOff, ArrowRight, CheckCircle2 } from "lucide-react"
// import { supabaseBrowser } from "@/lib/supabaseClient"

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

// const syncProfileAfterSignup = async (token: string, name: string) => {
//   try {
//     await fetch(`${BACKEND_URL}/profile/sync`, {
//       method:  "POST",
//       headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//       body: JSON.stringify({ name }),
//     })
//   } catch (err) {
//     console.error("[Signup] profile sync failed:", err)
//   }
// }

// export default function SignupPage() {
//   const [form, setForm] = useState({
//     firstName: "", lastName: "", email: "", password: "", confirmPassword: "",
//   })
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirm,  setShowConfirm]  = useState(false)
//   const [isLoading,    setIsLoading]    = useState(false)
//   const [error,        setError]        = useState("")
//   const [success,      setSuccess]      = useState("")

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
//     setForm({ ...form, [e.target.name]: e.target.value })

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")
//     setSuccess("")

//     if (form.password !== form.confirmPassword) {
//       setError("Passwords do not match")
//       return
//     }

//     try {
//       setIsLoading(true)
//       const { data, error: signUpError } = await supabaseBrowser.auth.signUp({
//         email:    form.email,
//         password: form.password,
//         options: {
//           emailRedirectTo: `${window.location.origin}/auth/callback`,
//           data: {
//             name:       `${form.firstName} ${form.lastName}`.trim(),
//             full_name:  `${form.firstName} ${form.lastName}`.trim(),
//             first_name: form.firstName,
//             last_name:  form.lastName,
//           },
//         },
//       })

//       if (signUpError) throw signUpError

//       if (data.user && data.session) {
//         const fullName = `${form.firstName} ${form.lastName}`.trim()
//         await syncProfileAfterSignup(data.session.access_token, fullName)
//         window.location.href = "/onboarding"
//         return
//       }

//       setSuccess("We've sent a verification link to your email. Click it to continue — you'll be taken to onboarding automatically.")
//     } catch (err: any) {
//       setError(err.message || "Signup failed")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleGoogleSignup = async () => {
//     await supabaseBrowser.auth.signInWithOAuth({
//       provider: "google",
//       options: {
//         redirectTo: `${window.location.origin}/auth/callback`,
//         // scopes: "https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/analytics.readonly",
//       },
//     })
//   }

//   return (
//     <div className="min-h-screen bg-cloud flex">

//       {/* ── Left panel — dark, brand story ── */}
//       <div className="hidden lg:flex lg:w-[52%] bg-charcoal relative overflow-hidden flex-col justify-between px-14 py-12">

//         {/* Background glows */}
//         <div className="absolute inset-0 pointer-events-none">
//           <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-emerald/8 blur-[120px]" />
//           <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-violet/8 blur-[120px]" />
//         </div>

//         {/* Logo */}
//         <div className="relative">
//           <Image src="/TecsaroAIfulllogo.png" alt="Tecsaro AI" width={180} height={48} priority />
//         </div>

//         {/* Main copy */}
//         <div className="relative max-w-md">
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald/10 border border-emerald/20 mb-6">
//             <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
//             <span className="text-[11px] font-mono font-bold text-emerald tracking-widest uppercase">
//               7-day free trial · No credit card
//             </span>
//           </div>

//           <h2 className="font-heading text-3xl font-bold text-white mb-4 leading-tight">
//             Start tracking your brand
//             <span className="text-emerald"> in AI search today</span>
//           </h2>
//           <p className="text-graphite text-sm leading-relaxed mb-10">
//             Tecsaro AI is an Answer Engine Optimization platform that helps businesses
//             track visibility and optimize content for AI search engines like
//             ChatGPT, Gemini and Perplexity.
//           </p>

//           {/* What you get in trial */}
//           <div className="space-y-4">
//             {[
//               { title: "Full platform access for 7 days",    desc: "Every feature unlocked — no limitations during your trial"   },
//               { title: "Daily AI visibility reports",         desc: "Fresh data every morning across ChatGPT, Gemini & Perplexity" },
//               { title: "Competitor detection & AEO Score",   desc: "See who beats you in AI answers and exactly how to fix it"    },
//             ].map((f) => (
//               <div key={f.title} className="flex items-start gap-3">
//                 <CheckCircle2 className="h-4 w-4 text-emerald shrink-0 mt-0.5" />
//                 <div>
//                   <p className="text-sm font-semibold text-white">{f.title}</p>
//                   <p className="text-xs text-graphite leading-relaxed">{f.desc}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Social proof */}
//           <div className="mt-10 pt-8 border-t border-white/10">
//             <p className="text-xs text-graphite italic leading-relaxed">
//               "Tecsaro AI showed us our brand wasn't appearing in any ChatGPT answers
//               for our core keywords — within 2 weeks of following the recommendations, that changed."
//             </p>
//             <p className="text-xs text-emerald font-semibold mt-2">— Early access user</p>
//           </div>
//         </div>

//         {/* Bottom note */}
//         <div className="relative">
//           <p className="text-xs text-graphite">
//             No credit card required · Cancel anytime · support@tecsaro.com
//           </p>
//         </div>
//       </div>

//       {/* ── Right panel — signup form ── */}
//       <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-12 bg-white overflow-y-auto">
//         <div className="mx-auto w-full max-w-sm">

//           {/* Mobile logo */}
//           <div className="flex justify-center mb-8 lg:hidden">
//             <Image src="/TecsaroAIfulllogo.png" alt="Tecsaro AI" width={180} height={48} priority />
//           </div>

//           <div className="mb-6">
//             <h1 className="font-heading text-2xl font-bold text-charcoal mb-1">
//               Create your account
//             </h1>
//             <p className="text-graphite text-sm">
//               Start your 7-day free trial — no credit card required
//             </p>
//           </div>

//           {/* Success */}
//           {success && (
//             <div className="mb-4 px-4 py-3 rounded-lg bg-emerald/10 border border-emerald/20 text-emerald text-sm">
//               {success}
//             </div>
//           )}

//           {/* Error */}
//           {error && (
//             <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm">
//               {error}
//             </div>
//           )}

//           {/* Google button */}
//           <button
//             onClick={handleGoogleSignup}
//             className="w-full h-12 flex items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white text-charcoal font-semibold text-sm hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm mb-6"
//           >
//             <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
//               <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
//               <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
//               <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
//               <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
//             </svg>
//             Continue with Google
//           </button>

//           {/* Divider */}
//           <div className="relative mb-5">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-200" />
//             </div>
//             <div className="relative flex justify-center text-xs">
//               <span className="px-3 bg-white text-graphite">or use email</span>
//             </div>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="grid grid-cols-2 gap-3">
//               <div>
//                 <Label className="text-charcoal text-sm font-medium">First name</Label>
//                 <Input
//                   name="firstName" placeholder="John" required onChange={handleChange}
//                   className="mt-1.5 h-12 bg-white border-gray-200 text-charcoal placeholder:text-graphite/50 focus:border-emerald focus:ring-emerald/20"
//                 />
//               </div>
//               <div>
//                 <Label className="text-charcoal text-sm font-medium">Last name</Label>
//                 <Input
//                   name="lastName" placeholder="Smith" required onChange={handleChange}
//                   className="mt-1.5 h-12 bg-white border-gray-200 text-charcoal placeholder:text-graphite/50 focus:border-emerald focus:ring-emerald/20"
//                 />
//               </div>
//             </div>

//             <div>
//               <Label className="text-charcoal text-sm font-medium">Work email</Label>
//               <Input
//                 name="email" type="email" placeholder="you@company.com" required onChange={handleChange}
//                 className="mt-1.5 h-12 bg-white border-gray-200 text-charcoal placeholder:text-graphite/50 focus:border-emerald focus:ring-emerald/20"
//               />
//             </div>

//             <div>
//               <Label className="text-charcoal text-sm font-medium">Password</Label>
//               <div className="relative mt-1.5">
//                 <Input
//                   name="password" type={showPassword ? "text" : "password"}
//                   placeholder="Create a strong password" required autoComplete="new-password"
//                   onChange={handleChange}
//                   // className="h-12 bg-white border-gray-200 text-charcoal placeholder:text-graphite/50  focus:border-emerald focus:ring-emerald/20"
//                   className="h-12 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-emerald focus:ring-emerald/20 [&:-webkit-autofill]:bg-white [&:-webkit-autofill]:[box-shadow:0_0_0px_1000px_white_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:#111827]"
                   
//                 />
//                 <button type="button" onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal hover:text-charcoal transition-colors">
//                   {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                 </button>
//               </div>
//             </div>

//             <div>
//               <Label className="text-charcoal text-sm font-medium">Confirm password</Label>
//               <div className="relative mt-1.5">
//                 <Input
//                   name="confirmPassword" type={showConfirm ? "text" : "password"}
//                   placeholder="Re-enter password" required autoComplete="new-password"
//                   onChange={handleChange}
//                   className="h-12 bg-white border-gray-200 text-charcoal placeholder:text-graphite/50 pr-12 focus:border-emerald focus:ring-emerald/20"
//                 />
//                 <button type="button" onClick={() => setShowConfirm(!showConfirm)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-graphite hover:text-charcoal transition-colors">
//                   {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                 </button>
//               </div>
//             </div>

//             <button
//               type="submit" disabled={isLoading}
//               className="w-full h-12 bg-emerald text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-emerald-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-1"
//             >
//               {isLoading ? (
//                 <span className="flex items-center gap-2">
//                   <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                   Creating account…
//                 </span>
//               ) : (
//                 <>Start free trial <ArrowRight className="h-4 w-4" /></>
//               )}
//             </button>
//           </form>

//           <p className="mt-4 text-center text-xs text-graphite">
//             By signing up, you agree to our{" "}
//             <Link href="/terms" className="text-emerald hover:underline">Terms</Link>{" "}
//             and{" "}
//             <Link href="/privacy" className="text-emerald hover:underline">Privacy Policy</Link>
//           </p>

//           <p className="mt-5 text-center text-sm text-graphite">
//             Already have an account?{" "}
//             <Link href="/login" className="text-emerald hover:underline font-semibold">Log in</Link>
//           </p>

//         </div>
//       </div>
//     </div>
//   )
// }





"use client"

import React, { useState, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, ArrowRight, CheckCircle2 } from "lucide-react"
import { supabaseBrowser } from "@/lib/supabaseClient"
import { useSearchParams } from "next/navigation"  // ← ADDED

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

// ← CHANGED: added plan param
const syncProfileAfterSignup = async (token: string, name: string, plan: string) => {
  try {
    await fetch(`${BACKEND_URL}/profile/sync`, {
      method:  "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ name, plan }),  // ← was { name }
    })
  } catch (err) {
    console.error("[Signup] profile sync failed:", err)
  }
}

function SignupForm() {
  // ← ADDED: read plan from URL e.g. /signup?plan=pro
  const params  = useSearchParams()
  const rawPlan = params.get("plan") ?? "starter"
  const plan    = (["starter", "pro"].includes(rawPlan) ? rawPlan : "starter") as "starter" | "pro"
  const isPro   = plan === "pro"

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: "", confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm,  setShowConfirm]  = useState(false)
  const [isLoading,    setIsLoading]    = useState(false)
  const [error,        setError]        = useState("")
  const [success,      setSuccess]      = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    try {
      setIsLoading(true)
      const { data, error: signUpError } = await supabaseBrowser.auth.signUp({
        email:    form.email,
        password: form.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?plan=${plan}`,  // ← CHANGED: added ?plan=
          data: {
            name:       `${form.firstName} ${form.lastName}`.trim(),
            full_name:  `${form.firstName} ${form.lastName}`.trim(),
            first_name: form.firstName,
            last_name:  form.lastName,
            plan,  // ← ADDED: in user_metadata for email-confirm flow
          },
        },
      })

      if (signUpError) throw signUpError

      if (data.user && data.session) {
        const fullName = `${form.firstName} ${form.lastName}`.trim()
        await syncProfileAfterSignup(data.session.access_token, fullName, plan)  // ← CHANGED: pass plan
        window.location.href = "/onboarding"
        return
      }

      setSuccess("We've sent a verification link to your email. Click it to continue — you'll be taken to onboarding automatically.")
    } catch (err: any) {
      setError(err.message || "Signup failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    await supabaseBrowser.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?plan=${plan}`,  // ← CHANGED: added ?plan=
        // scopes: "https://www.googleapis.com/auth/webmasters.readonly ...",
      },
    })
  }

  return (
    <div className="min-h-screen bg-cloud flex">

      {/* ── Left panel ── */}
      <div className="hidden lg:flex lg:w-[52%] bg-charcoal relative overflow-hidden flex-col justify-between px-14 py-12">

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-emerald/8 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-violet/8 blur-[120px]" />
        </div>

       <div className="flex items-center gap-2">
  <Image src="/logoicon.png" alt="Tecsaro AI" width={80} height={80} priority />
  <span
    className="font-heading font-bold text-white group-hover:text-emerald transition-colors"
    style={{ fontSize: "50px", lineHeight: "50px" }}
  >
    Tecsaro AI
  </span>
</div>

        <div className="relative max-w-md">
          {/* ← CHANGED: badge reflects chosen plan */}
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6 ${isPro ? "bg-violet/10 border-violet/20" : "bg-emerald/10 border-emerald/20"}`}>
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isPro ? "bg-violet" : "bg-emerald"}`} />
            <span className={`text-[11px] font-mono font-bold tracking-widest uppercase ${isPro ? "text-violet" : "text-emerald"}`}>
              {isPro ? "Pro Plan — 7-day free trial" : "7-day free trial · No credit card"}
            </span>
          </div>

          <h2 className="font-heading text-3xl font-bold text-white mb-4 leading-tight">
            Start tracking your brand
            <span className={isPro ? " text-violet" : " text-emerald"}> in AI search today</span>
          </h2>
          <p className="text-graphite text-sm leading-relaxed mb-10">
            Tecsaro AI is an Answer Engine Optimization platform that helps businesses
            track visibility and optimize content for AI search engines like
            ChatGPT, Gemini and Perplexity.
          </p>

          {/* ← CHANGED: features differ by plan */}
          <div className="space-y-4">
            {(isPro ? [
              { title: "Full Pro access for 7 days",        desc: "3 brands, 50 prompts tracked, Perplexity included"            },
              { title: "Daily AI visibility reports",        desc: "Fresh data every morning across ChatGPT, Gemini & Perplexity" },
              { title: "Advanced recommendations & exports", desc: "Priority support and exportable reports included"              },
            ] : [
              { title: "Full platform access for 7 days",   desc: "Every feature unlocked — no limitations during your trial"    },
              { title: "Daily AI visibility reports",        desc: "Fresh data every morning across ChatGPT, Gemini & Perplexity" },
              { title: "Competitor detection & AEO Score",   desc: "See who beats you in AI answers and exactly how to fix it"    },
            ]).map((f) => (
              <div key={f.title} className="flex items-start gap-3">
                <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${isPro ? "text-violet" : "text-emerald"}`} />
                <div>
                  <p className="text-sm font-semibold text-white">{f.title}</p>
                  <p className="text-xs text-graphite leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Social proof — unchanged */}
          <div className="mt-10 pt-8 border-t border-white/10">
            <p className="text-xs text-graphite italic leading-relaxed">
              "Tecsaro AI showed us our brand wasn't appearing in any ChatGPT answers
              for our core keywords — within 2 weeks of following the recommendations, that changed."
            </p>
            <p className="text-xs text-emerald font-semibold mt-2">— Early access user</p>
          </div>
        </div>

        <div className="relative">
          <p className="text-xs text-graphite">
            No credit card required · Cancel anytime · support@tecsaro.com
          </p>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-12 bg-white overflow-y-auto">
        <div className="mx-auto w-full max-w-sm">

            <div className="flex items-center gap-2 lg:hidden mb-8">
                      <Image src="/logoicon.png" alt="Tecsaro AI" width={50} height={50} priority />
                      <span
                        className="font-heading font-bold text-charcoal"
                        style={{ fontSize: "30px", lineHeight: "30px" }}
                      >
                        Tecsaro AI
                      </span>
                    </div>
          

          <div className="mb-6">
            <h1 className="font-heading text-2xl font-bold text-charcoal mb-1">
              Create your account
            </h1>
            <p className="text-graphite text-sm">
              {isPro
                ? "Start your 7-day Pro trial — no credit card required"
                : "Start your 7-day free trial — no credit card required"}
            </p>
          </div>

          {/* ← ADDED: plan badge with change link */}
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border mb-5 ${isPro ? "bg-violet/5 border-violet/20" : "bg-emerald/5 border-emerald/20"}`}>
            <span className={`w-2 h-2 rounded-full ${isPro ? "bg-violet" : "bg-emerald"}`} />
            <span className="text-xs font-semibold text-charcoal">{isPro ? "Pro Plan" : "Starter Plan"}</span>
            <span className="text-xs text-graphite ml-auto">7-day free trial</span>
            <Link href="./pricing" className="text-[10px] text-graphite hover:text-charcoal underline ml-2">Change</Link>
          </div>

          {success && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-emerald/10 border border-emerald/20 text-emerald text-sm">
              {success}
            </div>
          )}
          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Google button — unchanged */}
          <button
            onClick={handleGoogleSignup}
            className="w-full h-12 flex items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white text-charcoal font-semibold text-sm hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm mb-6"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white text-graphite">or use email</span>
            </div>
          </div>

          {/* Form — 100% unchanged from your original */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-charcoal text-sm font-medium">First name</Label>
                <Input name="firstName" placeholder="John" required onChange={handleChange}
                  className="mt-1.5 h-12 bg-white border-gray-200 text-charcoal placeholder:text-graphite/50 focus:border-emerald focus:ring-emerald/20" />
              </div>
              <div>
                <Label className="text-charcoal text-sm font-medium">Last name</Label>
                <Input name="lastName" placeholder="Smith" required onChange={handleChange}
                  className="mt-1.5 h-12 bg-white border-gray-200 text-charcoal placeholder:text-graphite/50 focus:border-emerald focus:ring-emerald/20" />
              </div>
            </div>

            <div>
              <Label className="text-charcoal text-sm font-medium">Work email</Label>
              <Input name="email" type="email" placeholder="you@company.com" required onChange={handleChange}
                className="mt-1.5 h-12 bg-white border-gray-200 text-charcoal placeholder:text-graphite/50 focus:border-emerald focus:ring-emerald/20" />
            </div>

            <div>
              <Label className="text-charcoal text-sm font-medium">Password</Label>
              <div className="relative mt-1.5">
                <Input name="password" type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password" required autoComplete="new-password"
                  onChange={handleChange}
                  className="h-12 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-emerald focus:ring-emerald/20 [&:-webkit-autofill]:bg-white [&:-webkit-autofill]:[box-shadow:0_0_0px_1000px_white_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:#111827]" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal hover:text-charcoal transition-colors">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <Label className="text-charcoal text-sm font-medium">Confirm password</Label>
              <div className="relative mt-1.5">
                <Input name="confirmPassword" type={showConfirm ? "text" : "password"}
                  placeholder="Re-enter password" required autoComplete="new-password"
                  onChange={handleChange}
                  className="h-12 bg-white border-gray-200 text-charcoal placeholder:text-graphite/50 pr-12 focus:border-emerald focus:ring-emerald/20" />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-graphite hover:text-charcoal transition-colors">
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isLoading}
              className="w-full h-12 bg-emerald text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-emerald-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-1">
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account…
                </span>
              ) : (
                <>Start {isPro ? "Pro" : "free"} trial <ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-graphite">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="text-emerald hover:underline">Terms</Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-emerald hover:underline">Privacy Policy</Link>
          </p>

          <p className="mt-5 text-center text-sm text-graphite">
            Already have an account?{" "}
            <Link href="/login" className="text-emerald hover:underline font-semibold">Log in</Link>
          </p>

        </div>
      </div>
    </div>
  )
}

// Suspense required because useSearchParams is used
export default function SignupPage() {
  return <Suspense><SignupForm /></Suspense>
}