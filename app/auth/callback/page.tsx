






"use client"

export const dynamic = "force-dynamic"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabaseBrowser } from "@/lib/supabaseClient"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

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

      try {
        // 1. Check if user has any plans
        const plansRes = await fetch(`${BACKEND_URL}/plans`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const plansJson = await plansRes.json()
        const plans = plansJson?.data ?? plansJson?.plans ?? plansJson ?? []

        // 2. No plans → fresh onboarding from step 1
        if (!Array.isArray(plans) || plans.length === 0) {
          router.push("/onboarding")
          return
        }

        // 3. Has plans → check if onboarding was completed
        const statusRes = await fetch(`${BACKEND_URL}/aeo/onboarding-status`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const statusJson = await statusRes.json()
        const { onboarding_step, planId, is_complete } = statusJson?.data ?? {}

        if (!is_complete && onboarding_step !== null && onboarding_step !== undefined) {
          // Resume where they left off
          router.push(`/onboarding?step=${onboarding_step + 1}&planId=${planId}`)
          return
        }

      } catch {
        // If any check fails, fall through to dashboard
      }

      // 4. All complete → dashboard
      router.push("/dashboard")
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