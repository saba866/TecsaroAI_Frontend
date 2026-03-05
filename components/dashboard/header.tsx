// "use client"

// import { useEffect, useState } from "react"
// import { usePathname } from "next/navigation"
// import { Bell, HelpCircle, ChevronDown, Settings, LogOut } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { supabaseBrowser } from "@/lib/supabaseClient"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
//   DropdownMenuSeparator,
// } from "@/components/ui/dropdown-menu"
// import { HelpPanel } from "@/components/dashboard/help-panel"
// import { NotificationsDropdown } from "@/components/dashboard/notifications-dropdown"

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

// /* ── Page title map ─────────────────────────────────────────────── */
// const pageMap: Record<string, { title: string; description?: string }> = {
//   "/dashboard":                    { title: "Dashboard",        description: "Overview of your workspace"         },
//   "/dashboard/projects":           { title: "Projects",         description: "Manage your projects"               },
//   "/dashboard/overview":           { title: "Overview",         description: "High-level performance insights"    },
//   "/dashboard/visibility":         { title: "Visibility",       description: "Track brand mentions in AI answers" },
//   "/dashboard/competitors":        { title: "Competitors",      description: "Monitor competing brands in AI"     },
//   "/dashboard/recommendations":    { title: "Recommendations",  description: "Actionable steps to improve AEO"   },
//   "/dashboard/optimization-hub":   { title: "Optimization Hub", description: "Improve and optimize your AEO"     },
//   "/dashboard/reports":            { title: "Reports",          description: "Analyse and download reports"       },
//   "/dashboard/app-integration":    { title: "Integrations",     description: "Connect your platforms"            },
//   "/billing":                      { title: "Billing",          description: "Plans, invoices & payments"         },
//   "/settings":                     { title: "Settings",         description: "Account & preferences"              },
// }

// /* ── Types ──────────────────────────────────────────────────────── */
// interface Profile {
//   id:     string
//   name:   string | null
//   email:  string | null
//   avatar: string | null
//   tier:   string
// }

// /* ── Helper ─────────────────────────────────────────────────────── */
// function getInitial(name: string | null, email: string | null): string {
//   if (name?.trim())  return name.trim().charAt(0).toUpperCase()
//   if (email?.trim()) return email.trim().charAt(0).toUpperCase()
//   return "U"
// }

// /* ── Component ──────────────────────────────────────────────────── */
// export function DashboardHeader() {
//   const pathname = usePathname()
//   const [mounted, setMounted] = useState(false)
//   const [profile, setProfile] = useState<Profile | null>(null)

//   useEffect(() => { setMounted(true) }, [])

//   useEffect(() => {
//     if (!mounted) return
//     const load = async () => {
//       try {
//         const { data: { session } } = await supabaseBrowser.auth.getSession()
//         if (!session?.access_token) return

//         const res = await fetch(`${BACKEND_URL}/profile`, {
//           headers: { Authorization: `Bearer ${session.access_token}` },
//         })
//         if (!res.ok) return

//         const json = await res.json()
//         setProfile(json?.data ?? json)
//       } catch (err) {
//         console.error("[DashboardHeader] profile load failed:", err)
//       }
//     }
//     load()
//   }, [mounted])

//   const handleLogout = async () => {
//     await supabaseBrowser.auth.signOut()
//     window.location.href = "/login"
//   }

//   if (!mounted) return null

//   /* ── Page title ── */
//   const pageData = pageMap[pathname] ?? {
//     title: pathname.split("/").pop()
//       ?.replace(/-/g, " ")
//       .replace(/\b\w/g, c => c.toUpperCase()) ?? "Dashboard",
//     description: "",
//   }

//   /* ── Avatar ── */
//   const avatarLetter = profile?.avatar ?? getInitial(profile?.name ?? null, profile?.email ?? null)

//   /* ── Tier badge ── */
//   const tier      = profile?.tier ?? "starter"
//   const tierLabel = tier === "pro" ? "Pro" : tier === "enterprise" ? "Enterprise" : "Starter"
//   const tierColor = tier === "pro"
//     ? "bg-violet/10 text-violet border-violet/20"
//     : tier === "enterprise"
//     ? "bg-amber/10 text-amber border-amber/20"
//     : "bg-emerald/10 text-emerald border-emerald/20"

//   return (
//     <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-background/80 backdrop-blur-sm border-b border-border">

//       {/* Page title */}
//       <div>
//         <h1 className="font-heading text-base font-bold text-foreground leading-tight">
//           {pageData.title}
//         </h1>
//         {pageData.description && (
//           <p className="text-xs text-muted-foreground">{pageData.description}</p>
//         )}
//       </div>

//       {/* Right actions */}
//       <div className="flex items-center gap-2">

//         {/* Help */}
//         <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
//           <HelpCircle className="h-4 w-4" />
//         </Button>

//         {/* Notifications */}
//         <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
//           <Bell className="h-4 w-4" />
//           <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald" />
//         </Button>

//         {/* Profile dropdown */}
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <button className="flex items-center gap-2 pl-2 rounded-lg hover:bg-muted/50 transition-colors h-9 pr-1">
//               <div className="h-7 w-7 rounded-full bg-violet/15 border border-violet/20 flex items-center justify-center shrink-0">
//                 <span className="text-xs font-bold text-violet leading-none">
//                   {avatarLetter}
//                 </span>
//               </div>
//               {profile?.name && (
//                 <span className="hidden sm:block text-sm font-medium text-foreground max-w-[120px] truncate">
//                   {profile.name.split(" ")[0]}
//                 </span>
//               )}
//               <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
//             </button>
//           </DropdownMenuTrigger>

//           <DropdownMenuContent align="end" className="w-60 p-2">

//             {/* Profile info */}
//             <div className="flex items-center gap-3 px-2 py-2.5 mb-1">
//               <div className="h-10 w-10 rounded-full bg-violet/15 border border-violet/20 flex items-center justify-center shrink-0">
//                 <span className="text-sm font-bold text-violet">
//                   {avatarLetter}
//                 </span>
//               </div>
//               <div className="min-w-0">
//                 <p className="text-sm font-semibold text-foreground truncate">
//                   {profile?.name ?? "—"}
//                 </p>
//                 <p className="text-xs text-muted-foreground truncate">
//                   {profile?.email ?? "—"}
//                 </p>
//                 <span className={`inline-flex items-center mt-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold font-mono border ${tierColor}`}>
//                   {tierLabel}
//                 </span>
//               </div>
//             </div>

//             <DropdownMenuSeparator />

//             <a
//               href="/settings"
//               className="flex items-center gap-2.5 px-2 py-2 rounded-md text-sm text-foreground hover:bg-muted/60 transition-colors"
//             >
//               <Settings className="h-4 w-4 text-muted-foreground" />
//               Settings
//             </a>

//             <a
//               href="/billing"
//               className="flex items-center gap-2.5 px-2 py-2 rounded-md text-sm text-foreground hover:bg-muted/60 transition-colors"
//             >
//               <span className="h-4 w-4 flex items-center justify-center text-muted-foreground text-xs">₹</span>
//               Billing & Plan
//             </a>

//             <DropdownMenuSeparator />

//             <button
//               onClick={handleLogout}
//               className="w-full flex items-center gap-2.5 px-2 py-2 rounded-md text-sm text-destructive hover:bg-destructive/5 transition-colors"
//             >
//               <LogOut className="h-4 w-4" />
//               Log out
//             </button>

//           </DropdownMenuContent>
//         </DropdownMenu>

//       </div>
//     </header>
//   )
// }


"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Bell, HelpCircle, ChevronDown, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabaseBrowser } from "@/lib/supabaseClient"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { HelpPanel } from "@/components/dashboard/help-panel"
import { NotificationsDropdown } from "@/components/dashboard/notifications-dropdown"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

/* ── Page title map ─────────────────────────────────────────────── */
const pageMap: Record<string, { title: string; description?: string }> = {
  "/dashboard":                    { title: "Dashboard",        description: "Overview of your workspace"         },
  "/dashboard/projects":           { title: "Projects",         description: "Manage your projects"               },
  "/dashboard/overview":           { title: "Overview",         description: "High-level performance insights"    },
  "/dashboard/visibility":         { title: "Visibility",       description: "Track brand mentions in AI answers" },
  "/dashboard/competitors":        { title: "Competitors",      description: "Monitor competing brands in AI"     },
  "/dashboard/recommendations":    { title: "Recommendations",  description: "Actionable steps to improve AEO"   },
  "/dashboard/optimization-hub":   { title: "Optimization Hub", description: "Improve and optimize your AEO"     },
  "/dashboard/reports":            { title: "Reports",          description: "Analyse and download reports"       },
  "/dashboard/app-integration":    { title: "Integrations",     description: "Connect your platforms"            },
  "/billing":                      { title: "Billing",          description: "Plans, invoices & payments"         },
  "/settings":                     { title: "Settings",         description: "Account & preferences"              },
}

/* ── Types ──────────────────────────────────────────────────────── */
interface Profile {
  id:     string
  name:   string | null
  email:  string | null
  avatar: string | null
  tier:   string
}

/* ── Helper ─────────────────────────────────────────────────────── */
function getInitial(name: string | null, email: string | null): string {
  if (name?.trim())  return name.trim().charAt(0).toUpperCase()
  if (email?.trim()) return email.trim().charAt(0).toUpperCase()
  return "U"
}

/* ── Component ──────────────────────────────────────────────────── */
export function DashboardHeader() {
  const pathname = usePathname()
  const [mounted,    setMounted]    = useState(false)
  const [profile,    setProfile]    = useState<Profile | null>(null)
  const [showHelp,   setShowHelp]   = useState(false)
  const [showNotifs, setShowNotifs] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted) return
    const load = async () => {
      try {
        const { data: { session } } = await supabaseBrowser.auth.getSession()
        if (!session?.access_token) return

        const res = await fetch(`${BACKEND_URL}/profile`, {
          headers: { Authorization: `Bearer ${session.access_token}` },
        })
        if (!res.ok) return

        const json = await res.json()
        setProfile(json?.data ?? json)
      } catch (err) {
        console.error("[DashboardHeader] profile load failed:", err)
      }
    }
    load()
  }, [mounted])

  const handleLogout = async () => {
    await supabaseBrowser.auth.signOut()
    window.location.href = "/login"
  }

  if (!mounted) return null

  /* ── Page title ── */
  const pageData = pageMap[pathname] ?? {
    title: pathname.split("/").pop()
      ?.replace(/-/g, " ")
      .replace(/\b\w/g, c => c.toUpperCase()) ?? "Dashboard",
    description: "",
  }

  /* ── Avatar ── */
  const avatarLetter = profile?.avatar ?? getInitial(profile?.name ?? null, profile?.email ?? null)

  /* ── Tier badge ── */
  const tier      = profile?.tier ?? "starter"
  const tierLabel = tier === "pro" ? "Pro" : tier === "enterprise" ? "Enterprise" : "Starter"
  const tierColor = tier === "pro"
    ? "bg-violet/10 text-violet border-violet/20"
    : tier === "enterprise"
    ? "bg-amber/10 text-amber border-amber/20"
    : "bg-emerald/10 text-emerald border-emerald/20"

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-background/80 backdrop-blur-sm border-b border-border">

      {/* Page title */}
      <div>
        <h1 className="font-heading text-base font-bold text-foreground leading-tight">
          {pageData.title}
        </h1>
        {pageData.description && (
          <p className="text-xs text-muted-foreground">{pageData.description}</p>
        )}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">

        {/* Help */}
        {/* <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground"
          onClick={() => setShowHelp(true)}
        >
          <HelpCircle className="h-4 w-4" />
        </Button>

        {/* Notifications */}
        {/* <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground hover:text-foreground"
          onClick={() => setShowNotifs(true)}
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald" />
        </Button>  */}

        {/* Profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 pl-2 rounded-lg hover:bg-muted/50 transition-colors h-9 pr-1">
              <div className="h-7 w-7 rounded-full bg-violet/15 border border-violet/20 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-violet leading-none">
                  {avatarLetter}
                </span>
              </div>
              {profile?.name && (
                <span className="hidden sm:block text-sm font-medium text-foreground max-w-[120px] truncate">
                  {profile.name.split(" ")[0]}
                </span>
              )}
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-60 p-2">

            {/* Profile info */}
            <div className="flex items-center gap-3 px-2 py-2.5 mb-1">
              <div className="h-10 w-10 rounded-full bg-violet/15 border border-violet/20 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-violet">
                  {avatarLetter}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {profile?.name ?? "—"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {profile?.email ?? "—"}
                </p>
                <span className={`inline-flex items-center mt-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold font-mono border ${tierColor}`}>
                  {tierLabel}
                </span>
              </div>
            </div>

            <DropdownMenuSeparator />

            <a
              href="/settings"
              className="flex items-center gap-2.5 px-2 py-2 rounded-md text-sm text-foreground hover:bg-muted/60 transition-colors"
            >
              <Settings className="h-4 w-4 text-muted-foreground" />
              Settings
            </a>

            <a
              href="/billing"
              className="flex items-center gap-2.5 px-2 py-2 rounded-md text-sm text-foreground hover:bg-muted/60 transition-colors"
            >
              <span className="h-4 w-4 flex items-center justify-center text-muted-foreground text-xs">₹</span>
              Billing & Plan
            </a>

            <DropdownMenuSeparator />

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-2 py-2 rounded-md text-sm text-destructive hover:bg-destructive/5 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>

          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </header>

    
  )
}