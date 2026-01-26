




"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Bell, HelpCircle, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabaseBrowser } from "@/lib/supabaseClient"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

/* ------------------ Page Title Map ------------------ */

const pageMap: Record<string, { title: string; description?: string }> = {
  "/dashboard": {
    title: "Dashboard",
    description: "Overview of your workspace",
  },
  "/dashboard/projects": {
    title: "Project",
    description: "Manage your projects",
  },
  "/dashboard/overview": {
    title: "Overview",
    description: "High-level performance insights",
  },
  "/dashboard/optimization-hub": {
    title: "Optimization Hub",
    description: "Improve and optimize your SEO",
  },
  "/dashboard/geo": {
    title: "GEO Intelligence",
    description: "Location-based SEO insights",
  },
  "/dashboard/content": {
    title: "Content & AEO AI",
    description: "AI-powered content creation",
  },
  "/dashboard/reports": {
    title: "Reports",
    description: "Analyze and download reports",
  },
  "/dashboard/app-integration": {
    title: "Integrations",
    description: "Connect your platforms",
  },
  "/billing": {
    title: "Billing",
    description: "Plans, invoices & payments",
  },
  "/settings": {
    title: "Settings",
    description: "Account & preferences",
  },
}

/* ------------------ Profile Types ------------------ */

interface Profile {
  name: string
  email: string
  avatar: string | null
}

/* ------------------ Component ------------------ */

export function DashboardHeader() {
  const pathname = usePathname()
  const [profile, setProfile] = useState<Profile | null>(null)

  /* ----------- Load profile safely ----------- */
  useEffect(() => {
    const loadProfile = async () => {
      const {
        data: { user },
      } = await supabaseBrowser.auth.getUser()

      if (!user) return

      const { data } = await supabaseBrowser
        .from("profiles")
        .select("name, email, avatar")
        .eq("id", user.id)
        .maybeSingle()

      setProfile(
        data || {
          name: user.user_metadata?.name || "User",
          email: user.email || "",
          avatar: null,
        }
      )
    }

    loadProfile()
  }, [])

  /* ----------- Resolve page title ----------- */
  const pageData =
    pageMap[pathname] ||
    {
      title:
        pathname
          .split("/")
          .pop()
          ?.replace(/-/g, " ")
          .replace(/\b\w/g, c => c.toUpperCase()) || "Dashboard",
      description: "",
    }

  /* ----------- Avatar initials ----------- */
  const avatarText =
    profile?.avatar ||
    profile?.name
      ?.split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase() ||
    "U"

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-cloud/80 backdrop-blur-sm border-b border-gray-200">
      {/* Page Title */}
      <div>
        <h1 className="font-heading text-xl font-bold text-charcoal">
          {pageData.title}
        </h1>
        {pageData.description && (
          <p className="text-sm text-graphite">{pageData.description}</p>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald" />
        </Button>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-violet/20 flex items-center justify-center">
                <span className="text-sm font-medium text-violet">
                  {avatarText}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 p-3">
            <div className="flex gap-3 items-center">
              <div className="h-10 w-10 rounded-full bg-violet/20 flex items-center justify-center">
                <span className="text-sm font-medium text-violet">
                  {avatarText}
                </span>
              </div>

              <div>
                <p className="text-sm font-medium">{profile?.name}</p>
                <p className="text-xs text-muted-foreground">
                  {profile?.email}
                </p>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
