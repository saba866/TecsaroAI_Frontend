"use client"

import { ReactNode } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { usePathname } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const pathname = usePathname()

  // Page titles based on route (optional but professional)
  const titles: Record<string, { title: string; description?: string }> = {
    "/dashboard": {
      title: "Dashboard",
      description: "Overview of your SEO performance",
    },
    "/dashboard/app-integration": {
      title: "Integrations",
      description: "Connect your website & tools",
    },
    "/dashboard/reports": {
      title: "Reports",
      description: "Download and analyze reports",
    },
    "/dashboard/content": {
      title: "Content & AEO AI",
      description: "Generate and optimize content with AI",
    },
    "/dashboard/geo": {
      title: "GEO Intelligence",
      description: "Location-based SEO insights",
    },
    "/dashboard/settings": {
      title: "Settings",
      description: "Manage your account & preferences",
    },
  }

  const headerData =
    titles[pathname] || { title: "Dashboard", description: "" }

  return (
    <div className="flex min-h-screen bg-cloud">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1 ml-64">
        {/* Header */}
        <DashboardHeader
          title={headerData.title}
          description={headerData.description}
        />

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

