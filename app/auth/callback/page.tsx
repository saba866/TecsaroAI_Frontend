



// "use client"

// export const dynamic = "force-dynamic"

// import { useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { supabaseBrowser } from "@/lib/supabaseClient"

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

// export default function AuthCallback() {
//   const router = useRouter()

//   useEffect(() => {
//     const handleAuth = async () => {
//       const { data } = await supabaseBrowser.auth.getSession()

//       if (!data.session) {
//         router.push("/login")
//         return
//       }

//       const token = data.session.access_token
//       const meta  = data.session.user?.user_metadata ?? {}

//       // ── Read plan from URL (?plan=pro) or user_metadata (set during email signUp) ──
//       const urlParams = new URLSearchParams(window.location.search)
//       const rawPlan   = urlParams.get("plan") ?? meta.plan ?? "starter"
//       const plan      = ["starter", "pro"].includes(rawPlan) ? rawPlan : "starter"

//       const name =
//         meta.full_name ??
//         meta.name      ??
//         data.session.user?.email?.split("@")[0] ??
//         ""

//       // ── Sync profile — sets tier=plan, trial_ends_at=now+7days ──
//       try {
//         await fetch(`${BACKEND_URL}/profile/sync`, {
//           method:  "POST",
//           headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//           body:    JSON.stringify({ name, plan }),
//         })
//       } catch (err) {
//         console.error("[auth/callback] profile sync failed:", err)
//         // Don't block — continue even if sync fails
//       }

//       try {
//         // 1. Check if user has any plans
//         const plansRes  = await fetch(`${BACKEND_URL}/plans`, {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         const plansJson = await plansRes.json()
//         const plans     = plansJson?.data ?? plansJson?.plans ?? plansJson ?? []

//         // 2. No plans → fresh onboarding
//         if (!Array.isArray(plans) || plans.length === 0) {
//           router.push("/onboarding")
//           return
//         }

//         // 3. Has plans → check onboarding status
//         const statusRes  = await fetch(`${BACKEND_URL}/aeo/onboarding-status`, {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         const statusJson = await statusRes.json()
//         const { onboarding_step, planId, is_complete } = statusJson?.data ?? {}

//         if (!is_complete && onboarding_step != null) {
//           router.push(`/onboarding?step=${onboarding_step + 1}&planId=${planId}`)
//           return
//         }

//       } catch {
//         // If any check fails, fall through to dashboard
//       }

//       // 4. All complete → dashboard
//       router.push("/dashboard")
//     }

//     handleAuth()
//   }, [router])

//   return (
//     <div className="min-h-screen bg-[#0a0d12] flex items-center justify-center">
//       <div className="flex flex-col items-center gap-4">
//         <svg className="animate-spin" width="28" height="28" viewBox="0 0 28 28" fill="none">
//           <circle cx="14" cy="14" r="11" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
//           <path d="M25 14a11 11 0 00-11-11" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
//         </svg>
//         <p className="text-white/40 text-sm">Signing you in…</p>
//       </div>
//     </div>
//   )
// }



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
      const meta  = data.session.user?.user_metadata ?? {}

      // Read plan from URL (?plan=pro) or user_metadata (set during email signUp)
      const urlParams = new URLSearchParams(window.location.search)
      const rawPlan   = urlParams.get("plan") ?? meta.plan ?? "starter"
      const plan      = ["starter", "pro"].includes(rawPlan) ? rawPlan : "starter"

      const name =
        meta.full_name ??
        meta.name      ??
        data.session.user?.email?.split("@")[0] ??
        ""

      // Sync profile — sets tier=plan, trial_ends_at=now+7days
      try {
        await fetch(`${BACKEND_URL}/profile/sync`, {
          method:  "POST",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body:    JSON.stringify({ name, plan }),
        })
      } catch (err) {
        console.error("[auth/callback] profile sync failed:", err)
        // Don't block — continue even if sync fails
      }

      try {
        // 1. Check if user has any plans
        const plansRes  = await fetch(`${BACKEND_URL}/plans`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const plansJson = await plansRes.json()
        const plans     = plansJson?.data ?? plansJson?.plans ?? plansJson ?? []

        // 2. No plans → fresh onboarding
        if (!Array.isArray(plans) || plans.length === 0) {
          router.push("/onboarding")
          return
        }

        // 3. Has plans → check onboarding status
        const statusRes  = await fetch(`${BACKEND_URL}/aeo/onboarding-status`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const statusJson = await statusRes.json()
        const { onboarding_step, planId, is_complete } = statusJson?.data ?? {}

        // Onboarding not complete → resume at correct step
        if (!is_complete && onboarding_step != null) {
          router.push(`/onboarding?step=${onboarding_step + 1}&planId=${planId}`)
          return
        }

        // 4. Onboarding complete → go to dashboard WITH planId
        // FIX: was router.push("/dashboard") — missing ?project= so usePlanId() returned
        // null and overview page redirected back to onboarding in a loop
        if (planId) {
          router.push(`/dashboard?project=${planId}`)
          return
        }

        // Fallback: planId missing from onboarding-status, fetch from plans list directly
        const latestPlan = Array.isArray(plans) ? plans[0] : null
        if (latestPlan?.id) {
          router.push(`/dashboard?project=${latestPlan.id}`)
          return
        }

      } catch {
        // If any check fails, fall through to onboarding (safer than broken dashboard)
      }

      router.push("/onboarding")
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