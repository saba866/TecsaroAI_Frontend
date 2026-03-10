"use client"

export const dynamic = "force-dynamic"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabaseBrowser } from "@/lib/supabaseClient"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
const ONBOARDING_COMPLETE_STEP = 6

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuth = async () => {
      const { data } = await supabaseBrowser.auth.getSession()

      if (!data.session) {
        router.push("/login")
        return
      }

      const token = data.session.access_token
      const meta  = data.session.user?.user_metadata ?? {}

      const urlParams = new URLSearchParams(window.location.search)
      const rawPlan   = urlParams.get("plan") ?? meta.plan ?? "starter"
      const plan      = ["starter", "pro"].includes(rawPlan) ? rawPlan : "starter"
      const name      = meta.full_name ?? meta.name ?? data.session.user?.email?.split("@")[0] ?? ""

      try {
        await fetch(`${BACKEND_URL}/profile/sync`, {
          method:  "POST",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body:    JSON.stringify({ name, plan }),
        })
      } catch (err) {
        console.error("[auth/callback] profile sync failed:", err)
      }

      try {
        const plansRes  = await fetch(`${BACKEND_URL}/plans`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const plansJson = await plansRes.json()

        const plans: Array<{ id: string; onboarding_step: number }> =
          Array.isArray(plansJson?.plans) ? plansJson.plans :
          Array.isArray(plansJson?.data)  ? plansJson.data  :
          Array.isArray(plansJson)        ? plansJson        : []

        if (plans.length === 0) {
          router.push("/onboarding")
          return
        }

        const latestPlan = plans[0]
        const step       = latestPlan.onboarding_step ?? 0
        const planId     = latestPlan.id

        if (step >= ONBOARDING_COMPLETE_STEP) {
          router.push("/dashboard")
          return
        }

        router.push(`/onboarding?step=${step + 1}&planId=${planId}`)

      } catch (err) {
        console.error("[auth/callback] routing check failed:", err)
        router.push("/dashboard")
      }
    }

    handleAuth()
  }, [router])

  return (
    <div className="min-h-screen bg-[#0a0d12] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <svg className="animate-spin" width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="11" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
          <path d="M25 14a11 11 0 00-11-11" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <p className="text-white/40 text-sm">Signing you in…</p>
      </div>
    </div>
  )
}