





"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, ArrowRight, CheckCircle2 } from "lucide-react"
import { supabaseBrowser } from "@/lib/supabaseClient"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export default function LoginPage() {
  // ADD THIS LINE
  console.log("BACKEND URL:", process.env.NEXT_PUBLIC_BACKEND_URL)
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading,    setIsLoading]    = useState(false)
  const [email,        setEmail]        = useState("")
  const [password,     setPassword]     = useState("")
  const [error,        setError]        = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const { data, error } = await supabaseBrowser.auth.signInWithPassword({ email, password })
      if (error) throw error

      if (!data.user?.email_confirmed_at) {
        setError("Please verify your email before logging in.")
        setIsLoading(false)
        return
      }

      const token = data.session.access_token

      const plansRes = await fetch(`${BACKEND_URL}/plans`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const plansJson = await plansRes.json()
      const plans = plansJson?.plans ?? []

      if (!Array.isArray(plans) || plans.length === 0) {
        router.push("/onboarding")
        return
      }

      const statusRes = await fetch(`${BACKEND_URL}/aeo/onboarding-status`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const statusJson = await statusRes.json()
      const { onboarding_step, planId, is_complete } = statusJson?.data ?? {}

      if (!is_complete && onboarding_step !== null && onboarding_step !== undefined) {
        router.push(`/onboarding?step=${onboarding_step + 1}&planId=${planId}`)
        return
      }

      router.push("/dashboard")

    } catch (err: any) {
      setError(err.message || "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithGoogle = async () => {
    await supabaseBrowser.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        scopes:
          "https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/analytics.readonly",
      },
    })
  }

  return (
    <div className="min-h-screen bg-cloud flex">

      {/* ── Left panel — dark, brand story ── */}
      <div className="hidden lg:flex lg:w-[52%] bg-charcoal relative overflow-hidden flex-col justify-between px-14 py-12">

        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-emerald/8 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-violet/8 blur-[120px]" />
        </div>

        {/* Logo */}
         <div className="flex items-center gap-2">
          <Image src="/logoicon.png" alt="Tecsaro AI" width={80} height={80} priority />
          <span
            className="font-heading font-bold text-white group-hover:text-emerald transition-colors"
            style={{ fontSize: "50px", lineHeight: "50px" }}
          >
            Tecsaro AI
          </span>
        </div>

        {/* Main copy */}
        <div className="relative max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald/10 border border-emerald/20 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
            <span className="text-[11px] font-mono font-bold text-emerald tracking-widest uppercase">
              Answer Engine Optimization
            </span>
          </div>

          <h2 className="font-heading text-3xl font-bold text-white mb-4 leading-tight">
            Know where your brand stands
            <span className="text-emerald"> in AI search</span>
          </h2>
          <p className="text-graphite text-sm leading-relaxed mb-10">
            Tecsaro AI tracks your brand visibility across ChatGPT, Gemini, and Perplexity —
            showing you exactly when competitors are recommended instead of you,
            and what to do about it.
          </p>

          {/* Feature list */}
          <div className="space-y-4">
            {[
              { title: "Daily AI visibility tracking",    desc: "Fresh data every morning across ChatGPT, Gemini & Perplexity" },
              { title: "Competitor detection",            desc: "See which brands appear in AI answers instead of yours"        },
              { title: "AEO Score & recommendations",     desc: "Clear score with actionable steps to improve your ranking"    },
            ].map((f) => (
              <div key={f.title} className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white">{f.title}</p>
                  <p className="text-xs text-graphite leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <div className="relative">
          <p className="text-xs text-graphite">
            Trusted by founders, marketers & SEO teams to win visibility in AI search.
          </p>
        </div>
      </div>

      {/* ── Right panel — login form ── */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-12 bg-white">
        <div className="mx-auto w-full max-w-sm">

          {/* Mobile logo */}
          <div className="flex items-center gap-2 lg:hidden mb-8">
  <Image src="/logoicon.png" alt="Tecsaro AI" width={50} height={50} priority />
  <span
    className="font-heading font-bold text-charcoal"
    style={{ fontSize: "30px", lineHeight: "30px" }}
  >
    Tecsaro AI
  </span>
</div>

          <div className="mb-8">
            <h1 className="font-heading text-2xl font-bold text-charcoal mb-1">
              Welcome back
            </h1>
            <p className="text-graphite text-sm">
              Log in to your Tecsaro AI account
            </p>
          </div>

          {/* Google button */}
          <button
            onClick={loginWithGoogle}
            className="w-full h-12 flex items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white text-charcoal font-semibold text-sm hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm mb-6"
          >
            {/* Google SVG logo */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white text-graphite">or continue with email</span>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-charcoal text-sm font-medium">
                Email
              </Label>
              <Input
                id="email" type="email" value={email}
                onChange={(e) => setEmail(e.target.value)} required
                placeholder="you@company.com"
                className="mt-1.5 h-12 bg-white border-gray-200 text-charcoal placeholder:text-graphite/50 focus:border-emerald focus:ring-emerald/20"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label htmlFor="password" className="text-charcoal text-sm font-medium">
                  Password
                </Label>
                <Link href="/forgot-password" className="text-xs text-emerald hover:underline font-medium">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="h-12 bg-white border-gray-200 text-charcoal placeholder:text-graphite/50 pr-12 focus:border-emerald focus:ring-emerald/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-graphite hover:text-charcoal transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-emerald text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-emerald-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Logging in…
                </span>
              ) : (
                <>Log in <ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-graphite">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-emerald hover:underline font-semibold">
              Start 7-day free trial
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}