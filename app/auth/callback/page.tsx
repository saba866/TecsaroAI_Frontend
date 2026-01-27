




"use client"

export const dynamic = "force-dynamic"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabaseBrowser } from "@/lib/supabaseClient"

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuth = async () => {
      const { data } = await supabaseBrowser.auth.getSession()

      if (!data.session) {
        router.push("/dashboard")
        return
      }

      const providerToken = data.session.provider_token
      const refreshToken = data.session.provider_refresh_token

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.session.access_token}`,
        },
        body: JSON.stringify({
          providerToken,
          refreshToken,
        }),
      })

      router.push("/dashboard")
    }

    handleAuth()
  }, [router])

  return <p className="text-center mt-20">Signing you in...</p>
}
