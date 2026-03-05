"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export function usePlanId(): string | null {
  const searchParams = useSearchParams()
  
  const [planId, setPlanId] = useState<string | null>(() => {
    // Only runs on client
    if (typeof window === "undefined") return null
    return searchParams.get("plan") ?? localStorage.getItem("activeProjectId")
  })

  useEffect(() => {
    const fromUrl = searchParams.get("plan")
    if (fromUrl) {
      localStorage.setItem("activeProjectId", fromUrl) // keep in sync
      setPlanId(fromUrl)
      return
    }
    const fromStorage = localStorage.getItem("activeProjectId")
    if (fromStorage) setPlanId(fromStorage)
  }, [searchParams])

  return planId
}