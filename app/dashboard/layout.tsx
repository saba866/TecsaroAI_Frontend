


"use client"

import { ReactNode } from "react"
import type { Metadata } from "next"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { SidebarProvider, useSidebar } from "@/components/dashboard/sidebar-context"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const titles: Record<string, { title: string; description?: string }> = {
  "/dashboard":                  { title: "Dashboard",      description: "Overview of your SEO performance" },
  "/dashboard/app-integration":  { title: "Integrations",   description: "Connect your website & tools" },
  "/dashboard/reports":          { title: "Reports",        description: "Download and analyze reports" },
  "/dashboard/content":          { title: "Content & AEO AI", description: "Generate and optimize content with AI" },
  "/dashboard/geo":              { title: "GEO Intelligence", description: "Location-based SEO insights" },
  "/dashboard/settings":         { title: "Settings",       description: "Manage your account & preferences" },
}

function DashboardInner({ children }: { children: ReactNode }) {
  const pathname   = usePathname()
  const { collapsed } = useSidebar()
  const headerData = titles[pathname] || { title: "Dashboard", description: "" }

  return (
    <div className="flex min-h-screen bg-cloud">
      <DashboardSidebar />

      {/* ✅ margin transitions with sidebar */}
      <div className={cn(
        "flex flex-col flex-1 transition-all duration-300",
        collapsed ? "ml-16" : "ml-64"
      )}>
        <DashboardHeader
          title={headerData.title}
          description={headerData.description}
        />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: "Dashboard — Tecsaro AI",
  alternates: { canonical: "/dashboard" },
  robots: { index: false, follow: false },
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardInner>{children}</DashboardInner>
    </SidebarProvider>
  )
}