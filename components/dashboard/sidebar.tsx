



"use client"

import Link from "next/link"
import Image from "next/image"
import { supabaseBrowser } from "@/lib/supabaseClient"
import { useEffect, useState, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  LayoutDashboard, Eye, Users2, Star, Code2, Settings,
  LogOut, ChevronLeft, ChevronRight, ChevronDown,
  CreditCard, FolderKanban, Plus, Check, Loader2, AlertCircle,Quote, ShieldCheck
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/dashboard/sidebar-context"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

interface UserProfile {
  name:   string
  email:  string
  avatar: string
  tier:   string
}

interface PlanInfo {
  label: string
  price: string
}

interface Project {
  id:     string
  name:   string
  domain: string
}

const analyticsNav = [
  { name: "Overview",    href: "/dashboard",             icon: LayoutDashboard },
  { name: "Visibility",  href: "/dashboard/visibility",  icon: Eye             },
  { name: "Competitors", href: "/dashboard/competitors", icon: Users2          },
]
const optimizationNav = [
  { name: "Recommendations", href: "/dashboard/recommendations", icon: Star  },
  { name: "Schema",          href: "/dashboard/schema",          icon: Code2 },
  { name: "AI Citations",          href: "/dashboard/citations",          icon: Quote },
  { name: "Technical Audit", href: "/dashboard/technical", icon: ShieldCheck },

]
const accountNav = [
  { name: "Projects", href: "/dashboard/projects",  icon: FolderKanban },
  { name: "Billing",  href: "/dashboard/billing",   icon: CreditCard   },
  { name: "Settings", href: "/dashboard/settings",  icon: Settings     },
]

function buildUserProfile(data: any): UserProfile {
  const name  = data?.name  ?? ""
  const email = data?.email ?? ""
  const tier  = data?.tier  ?? "starter"
  return {
    name, email, tier,
    avatar: data?.avatar ?? (name || email).charAt(0).toUpperCase() ?? "?",
  }
}

function mapProject(row: any): Project {
  const rawUrl = row.website_url ?? row.domain ?? row.url ?? ""
  const domain = rawUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
  return { id: String(row.id ?? ""), name: row.name ?? "Untitled", domain }
}

// Derive plan label + price purely from backend data — no hardcoded strings
function buildPlanInfo(row: any): PlanInfo | null {
  if (!row) return null

  const tier = row.tier ?? row.plan_tier ?? "starter"

  // Label — prefer explicit backend field
  const label =
    row.plan_name  ??
    row.plan_label ??
    row.label      ??
    (tier === "pro"        ? "Pro Plan"        :
   
   tier === "free"       ? "Free Plan"       : "Starter Plan")
  // Price — prefer formatted string from backend
  let price: string =
    row.plan_price  ??
    row.price       ??
    row.price_label ??
    ""

  // If backend returns raw amount, format it
  if (!price && row.amount != null) {
    const cycle = row.billing_cycle ?? "monthly"
    price = `₹${Number(row.amount).toLocaleString("en-IN")}/${cycle === "yearly" ? "yr" : "mo"}`
  }
  if (!price && row.price_inr != null) {
    price = `₹${Number(row.price_inr).toLocaleString("en-IN")}/mo`
  }

  return { label, price }
}

export function DashboardSidebar() {
  const pathname = usePathname()
  const router   = useRouter()
  const { collapsed, setCollapsed } = useSidebar()

  const [userProfile,     setUserProfile]     = useState<UserProfile | null>(null)
  const [planInfo,        setPlanInfo]        = useState<PlanInfo | null>(null)
  const [projects,        setProjects]        = useState<Project[]>([])
  const [activeProject,   setActiveProject]   = useState<Project | null>(null)
  const [dropdownOpen,    setDropdownOpen]    = useState(false)
  const [projectsLoading, setProjectsLoading] = useState(true)
  const [loadError,       setLoadError]       = useState<string | null>(null)

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setDropdownOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  useEffect(() => {
    const init = async () => {
      const { data: sessionData } = await supabaseBrowser.auth.getSession()
      const token = sessionData?.session?.access_token
      if (!token) { setLoadError("Not authenticated"); setProjectsLoading(false); return }
      await Promise.all([fetchProfile(token), fetchProjects(token)])
    }
    init()
    const { data: listener } = supabaseBrowser.auth.onAuthStateChange(async (_e, session) => {
      const token = session?.access_token
      if (token) fetchProfile(token)
    })
    return () => listener.subscription.unsubscribe()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchProfile = async (token: string) => {
    try {
      const res  = await fetch(`${BACKEND_URL}/profile`, { headers: { Authorization: `Bearer ${token}` } })
      if (!res.ok) return
      const json = await res.json()
      setUserProfile(buildUserProfile(json?.data ?? json))
    } catch (err) { console.error("[Sidebar] fetchProfile:", err) }
  }

  const fetchProjects = async (token: string) => {
    setProjectsLoading(true); setLoadError(null)
    try {
      const res  = await fetch(`${BACKEND_URL}/plans`, { headers: { Authorization: `Bearer ${token}` } })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        setLoadError(j?.error ?? `Failed (${res.status})`)
        return
      }
      const json    = await res.json()
      const rows: any[] = Array.isArray(json) ? json : json?.data ?? json?.plans ?? []
      const mapped  = rows.map(mapProject)
      setProjects(mapped)

      // Plan info from first row — all derived from backend, nothing hardcoded
      setPlanInfo(buildPlanInfo(rows[0] ?? null))

      const savedId = typeof window !== "undefined" ? localStorage.getItem("activeProjectId") : null
      setActiveProject(mapped.find(p => p.id === savedId) ?? mapped[0] ?? null)
    } catch (err) {
      console.error("[Sidebar] fetchProjects:", err)
      setLoadError("Network error")
    } finally {
      setProjectsLoading(false)
    }
  }

  const selectProject = (p: Project) => {
    setActiveProject(p)
    if (typeof window !== "undefined") localStorage.setItem("activeProjectId", p.id)
    setDropdownOpen(false)
    router.push(`/dashboard?plan=${p.id}`)
  }

  const handleLogout = async () => {
    await supabaseBrowser.auth.signOut()
    router.replace("/login")
    router.refresh()
  }

  const NavItem = ({ item }: { item: { name: string; href: string; icon: any; badge?: number } }) => {
    const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
    return (
      <Link href={item.href} className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors relative",
        isActive ? "bg-emerald/10 text-emerald" : "text-gray-400 hover:text-white hover:bg-white/5"
      )}>
        <item.icon className="h-4 w-4 shrink-0" />
        {!collapsed && (
          <>
            <span className="flex-1">{item.name}</span>
            {item.badge ? (
              <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                {item.badge}
              </span>
            ) : null}
          </>
        )}
        {collapsed && item.badge ? (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
            {item.badge}
          </span>
        ) : null}
      </Link>
    )
  }

  const SectionLabel = ({ label }: { label: string }) => {
    if (collapsed) return <div className="border-t border-white/10 my-2" />
    return (
      <p className="px-3 pt-4 pb-1 text-[10px] font-semibold tracking-widest uppercase text-white/30">
        {label}
      </p>
    )
  }

  return (
    <aside className={cn(
      "fixed left-0 top-0 bottom-0 z-40 flex flex-col bg-charcoal border-r border-white/10 transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>

      {/* LOGO */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-white/10 shrink-0">
        <Link href="/dashboard" className="flex items-center gap-1 min-w-0">
          <Image src="/logoicon.png" alt="Tecsaro AI" width={36} height={36} className="object-contain shrink-0" priority />
          {!collapsed && <span className="font-heading text-base font-bold text-white truncate">Tecsaro AI</span>}
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)}
          className="h-7 w-7 shrink-0 text-gray-400 hover:text-white hover:bg-white/10">
          {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
        </Button>
      </div>

      {/* PROJECT DROPDOWN */}
      {!collapsed && (
        <div className="mx-3 mt-3 shrink-0 relative" ref={dropdownRef}>
          <button onClick={() => setDropdownOpen(v => !v)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 hover:border-white/20 transition-colors group text-left">
            <p className="text-[9px] font-semibold tracking-widest uppercase text-white/30 mb-0.5">Active Project</p>
            <div className="flex items-center justify-between gap-2">
              {projectsLoading ? (
                <Loader2 className="h-3.5 w-3.5 text-white/30 animate-spin" />
              ) : loadError ? (
                <div className="flex items-center gap-1.5 flex-1">
                  <AlertCircle className="h-3.5 w-3.5 text-red-400 shrink-0" />
                  <span className="text-xs text-red-400 truncate">Error loading</span>
                </div>
              ) : (
                <>
                  <div className="min-w-0 flex-1">
                    <span className="text-sm font-semibold text-white block truncate leading-tight">
                      {activeProject?.name ?? "No projects yet"}
                    </span>
                    {activeProject?.domain && (
                      <span className="text-[10px] text-white/30 font-mono truncate block">
                        {activeProject.domain}
                      </span>
                    )}
                  </div>
                  <ChevronDown className={cn(
                    "h-3.5 w-3.5 text-white/30 group-hover:text-white/60 transition-transform duration-200 shrink-0",
                    dropdownOpen && "rotate-180"
                  )} />
                </>
              )}
            </div>
          </button>

          {dropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1.5 z-50 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
              {projects.length > 0 ? (
                <div className="py-1 max-h-48 overflow-y-auto">
                  {projects.map((p) => {
                    const isActive = activeProject?.id === p.id
                    return (
                      <button key={p.id} onClick={() => selectProject(p)}
                        className={cn(
                          "flex items-center gap-2.5 w-full px-3 py-2.5 text-left transition-colors",
                          isActive ? "bg-emerald/[0.07]" : "hover:bg-gray-50"
                        )}>
                        <div className={cn(
                          "w-7 h-7 rounded-md flex items-center justify-center text-[11px] font-bold shrink-0",
                          isActive ? "bg-emerald/20 text-emerald" : "bg-gray-100 text-gray-500"
                        )}>
                          {p.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={cn("text-xs font-semibold truncate", isActive ? "text-emerald" : "text-gray-800")}>
                            {p.name}
                          </p>
                          {p.domain && <p className="text-[10px] text-gray-400 font-mono truncate">{p.domain}</p>}
                        </div>
                        {isActive && <Check className="h-3.5 w-3.5 text-emerald shrink-0" />}
                      </button>
                    )
                  })}
                </div>
              ) : (
                <div className="px-3 py-5 text-center">
                  <p className="text-xs text-gray-500 font-medium mb-1">No projects found</p>
                  <p className="text-[11px] text-gray-400">
                    {loadError ? "Could not load — check console" : "Create your first project below"}
                  </p>
                </div>
              )}
              <div className="border-t border-gray-100">
                <Link href="/dashboard/projects" onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 text-xs text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-colors">
                  <FolderKanban className="h-3.5 w-3.5" /> Manage all projects
                </Link>
                <Link href="/onboarding" onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 text-xs font-semibold text-emerald hover:bg-emerald/5 transition-colors border-t border-gray-100">
                  <Plus className="h-3.5 w-3.5" /> New project
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {/* NAVIGATION */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto space-y-0.5">
        <SectionLabel label="Analytics" />
        {analyticsNav.map(item => <NavItem key={item.name} item={item} />)}
        <SectionLabel label="Optimization" />
        {optimizationNav.map(item => <NavItem key={item.name} item={item} />)}
        <SectionLabel label="Account" />
        {accountNav.map(item => <NavItem key={item.name} item={item} />)}
      </nav>

      {/* BOTTOM */}
      <div className="px-3 pb-4 pt-3 border-t border-white/10 space-y-2 shrink-0">

        {/* Plan info — fully from backend, shown only when expanded */}
        {!collapsed && planInfo && (
          <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg px-3 py-2">
            <div>
              <p className="text-xs font-semibold text-white leading-tight">{planInfo.label}</p>
              {planInfo.price && (
                <p className="text-[10px] text-white/40 font-mono">{planInfo.price}</p>
              )}
            </div>
         {(userProfile?.tier === "free" || userProfile?.tier === "starter") && (
  <Link href="/dashboard/billing"
    className="text-[10px] font-semibold text-emerald hover:text-emerald/80 transition-colors">
    Upgrade
  </Link>
)}
          </div>
        )}

        {/* User row */}
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full bg-emerald/20 border border-emerald/30 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-emerald">{userProfile?.avatar ?? "?"}</span>
          </div>
          {!collapsed && userProfile && (
            <div className="flex-1 min-w-0">
              {userProfile.name && (
                <p className="text-xs font-semibold text-white truncate leading-tight">{userProfile.name}</p>
              )}
              <p className="text-[10px] text-white/40 truncate font-mono">{userProfile.email}</p>
            </div>
          )}
          {!collapsed && (
            <button onClick={handleLogout}
              className="shrink-0 p-1.5 rounded-md text-white/30 hover:text-white hover:bg-white/10 transition-colors"
              title="Log out">
              <LogOut className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {collapsed && (
          <button onClick={handleLogout}
            className="flex items-center justify-center w-full py-2 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-colors"
            title="Log out">
            <LogOut className="h-4 w-4" />
          </button>
        )}
      </div>
    </aside>
  )
}