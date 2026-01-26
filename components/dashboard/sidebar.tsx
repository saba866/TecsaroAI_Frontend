


"use client"

import Link from "next/link"
import Image from "next/image"
import { supabaseBrowser } from '@/lib/supabaseClient'
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Search,
  Globe,
  BarChart3,
  FileText,
  Zap,
  Link2,
  CreditCard,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  FolderKanban,
  Gauge,
  Wrench,
  Brain,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Project", href: "/dashboard/projects", icon: FolderKanban },
  { name: "Overview", href: "/dashboard/overview", icon: Gauge  },
  { name: "Optimization hub", href: "/dashboard/optimization-hub", icon: Wrench },
  { name: "GEO Intelligence", href: "/dashboard/geo", icon: Globe },
  { name: "Content & AEO AI", href: "/dashboard/content", icon: Brain },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
  { name: "Integrations", href: "/dashboard/app-integration", icon: Link2 },
]

const bottomNavigation = [
  { name: "Billing", href: "/billing", icon: CreditCard },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [user, setUser] = useState<any>(null)

 const router = useRouter()
const handleLogout = async () => {
  const { error } = await supabaseBrowser.auth.signOut()

  if (error) {
    console.error("Logout error:", error.message)
    return
  }

  router.replace("/login")
  router.refresh() // 🔥 this is the missing part
}


  return (
    <aside
      className={cn(
        "fixed left-0 top-0 bottom-0 z-40 flex flex-col bg-charcoal border-r border-white/10 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
        <Link href="/dashboard" className="flex items-center gap-0">
          <Image
            src="/logoicon.png"
            alt="Tecsaro AI"
            width={50}
            height={50}
            className="object-contain transition-all duration-300"
            priority
          />
          {!collapsed && (
            <span className="font-heading text-lg font-bold text-white">
              Tecsaro AI
            </span>
          )}
        </Link>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Main navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-emerald/10 text-emerald"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Bottom navigation */}
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        {bottomNavigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-emerald/10 text-emerald"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          )
        })}

        <button
  onClick={handleLogout}
  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors w-full"
>
  <LogOut className="h-5 w-5 shrink-0" />
  {!collapsed && <span>Log out</span>}
</button>

      </div>

      
    </aside>
  )
}
