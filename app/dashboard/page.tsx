"use client"


import {
  TrendingUp,
  TrendingDown,
  Eye,
  FileText,
  Search,
  Zap,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const stats = [
  {
    name: "AI Visibility Score",
    value: "94",
    change: "+12%",
    trend: "up",
    icon: Eye,
    color: "emerald",
  },
  {
    name: "Pages Optimized",
    value: "1,248",
    change: "+86 this week",
    trend: "up",
    icon: FileText,
    color: "violet",
  },
  {
    name: "Search Impressions",
    value: "2.4M",
    change: "+34%",
    trend: "up",
    icon: Search,
    color: "amber",
  },
  {
    name: "Automations Active",
    value: "12",
    change: "3 pending",
    trend: "neutral",
    icon: Zap,
    color: "emerald",
  },
]

const recentActivity = [
  {
    id: 1,
    type: "optimization",
    title: "Homepage SEO updated",
    description: "Meta tags and schema markup optimized",
    time: "5 min ago",
    status: "completed",
  },
  {
    id: 2,
    type: "content",
    title: "Blog post published",
    description: "AI Search Trends 2024 - optimized for GEO",
    time: "1 hour ago",
    status: "completed",
  },
  {
    id: 3,
    type: "alert",
    title: "Performance drop detected",
    description: "Product page loading time increased",
    time: "2 hours ago",
    status: "warning",
  },
  {
    id: 4,
    type: "automation",
    title: "Weekly audit running",
    description: "Scanning 500 pages for optimization opportunities",
    time: "3 hours ago",
    status: "running",
  },
]

const quickActions = [
  { name: "Run AI Audit", href: "/dashboard/ai-search", icon: Search },
  { name: "Optimize Content", href: "/dashboard/content", icon: FileText },
  { name: "View Analytics", href: "/dashboard/analytics", icon: TrendingUp },
  { name: "Manage Automations", href: "/dashboard/automation", icon: Zap },
]

const topPages = [
  { url: "/products/ai-assistant", score: 98, impressions: "124K", change: "+18%" },
  { url: "/blog/ai-seo-guide", score: 95, impressions: "89K", change: "+24%" },
  { url: "/features", score: 92, impressions: "67K", change: "+12%" },
  { url: "/pricing", score: 88, impressions: "45K", change: "+8%" },
  { url: "/about", score: 85, impressions: "32K", change: "+5%" },
]

export default function DashboardPage() {
  return (
    

      <div className="p-6 space-y-6">
        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-2 rounded-lg ${
                    stat.color === "emerald"
                      ? "bg-emerald/10 text-emerald"
                      : stat.color === "violet"
                        ? "bg-violet/10 text-violet"
                        : "bg-amber/10 text-amber"
                  }`}
                >
                  <stat.icon className="h-5 w-5" />
                </div>
                {stat.trend === "up" && (
                  <div className="flex items-center gap-1 text-emerald text-sm">
                    <TrendingUp className="h-4 w-4" />
                    {stat.change}
                  </div>
                )}
                {stat.trend === "down" && (
                  <div className="flex items-center gap-1 text-red-500 text-sm">
                    <TrendingDown className="h-4 w-4" />
                    {stat.change}
                  </div>
                )}
                {stat.trend === "neutral" && (
                  <div className="text-graphite text-sm">{stat.change}</div>
                )}
              </div>
              <p className="font-mono text-3xl font-bold text-charcoal mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-graphite">{stat.name}</p>
            </div>
          ))}
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart section */}
          <div className="lg:col-span-2 p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-heading text-lg font-semibold text-charcoal">
                  AI Search Performance
                </h2>
                <p className="text-sm text-graphite">Last 30 days</p>
              </div>
              <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-charcoal bg-white">
                <option>Last 30 days</option>
                <option>Last 7 days</option>
                <option>Last 90 days</option>
              </select>
            </div>

            {/* Chart placeholder */}
            <div className="h-64 flex items-end justify-around gap-2">
              {[40, 55, 45, 60, 50, 75, 65, 80, 70, 85, 75, 90, 82, 88, 78, 92, 85, 95, 88, 92, 85, 90, 88, 94, 90, 93, 88, 91, 89, 94].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-gradient-to-t from-emerald/60 to-emerald transition-all duration-300 hover:from-emerald hover:to-emerald-light"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald" />
                  <span className="text-sm text-graphite">Visibility Score</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-violet" />
                  <span className="text-sm text-graphite">Impressions</span>
                </div>
              </div>
              <Link href="/dashboard/analytics" className="text-sm text-emerald hover:underline flex items-center gap-1">
                View detailed analytics <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Recent activity */}
          <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
            <h2 className="font-heading text-lg font-semibold text-charcoal mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div
                    className={`p-1.5 rounded-lg shrink-0 ${
                      activity.status === "completed"
                        ? "bg-emerald/10 text-emerald"
                        : activity.status === "warning"
                          ? "bg-amber/10 text-amber"
                          : "bg-violet/10 text-violet"
                    }`}
                  >
                    {activity.status === "completed" && <CheckCircle className="h-4 w-4" />}
                    {activity.status === "warning" && <AlertCircle className="h-4 w-4" />}
                    {activity.status === "running" && <Clock className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-charcoal truncate">
                      {activity.title}
                    </p>
                    <p className="text-xs text-graphite truncate">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/dashboard/activity"
              className="mt-4 block text-center text-sm text-emerald hover:underline"
            >
              View all activity
            </Link>
          </div>
        </div>

        {/* Quick actions and top pages */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick actions */}
          <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
            <h2 className="font-heading text-lg font-semibold text-charcoal mb-4">
              Quick Actions
            </h2>
            <div className="space-y-2">
              {quickActions.map((action) => (
                <Link
                  key={action.name}
                  href={action.href}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-gray-100 text-graphite group-hover:bg-emerald/10 group-hover:text-emerald transition-colors">
                    <action.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium text-charcoal group-hover:text-emerald transition-colors">
                    {action.name}
                  </span>
                  <ArrowRight className="h-4 w-4 ml-auto text-gray-400 group-hover:text-emerald transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Top performing pages */}
          <div className="lg:col-span-2 p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-lg font-semibold text-charcoal">
                Top Performing Pages
              </h2>
              <Button variant="outline" size="sm" className="text-xs bg-transparent border-gray-200 text-charcoal hover:bg-gray-50">
                View all
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 text-xs font-medium text-graphite uppercase tracking-wider">
                      Page
                    </th>
                    <th className="text-center py-3 text-xs font-medium text-graphite uppercase tracking-wider">
                      Score
                    </th>
                    <th className="text-center py-3 text-xs font-medium text-graphite uppercase tracking-wider">
                      Impressions
                    </th>
                    <th className="text-right py-3 text-xs font-medium text-graphite uppercase tracking-wider">
                      Change
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topPages.map((page) => (
                    <tr key={page.url} className="border-b border-gray-50 last:border-0">
                      <td className="py-3">
                        <span className="text-sm text-charcoal font-medium truncate block max-w-[200px]">
                          {page.url}
                        </span>
                      </td>
                      <td className="py-3 text-center">
                        <span
                          className={`inline-flex items-center justify-center w-10 h-6 rounded text-xs font-bold ${
                            page.score >= 90
                              ? "bg-emerald/10 text-emerald"
                              : page.score >= 80
                                ? "bg-amber/10 text-amber"
                                : "bg-red-100 text-red-600"
                          }`}
                        >
                          {page.score}
                        </span>
                      </td>
                      <td className="py-3 text-center">
                        <span className="font-mono text-sm text-charcoal">
                          {page.impressions}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <span className="text-sm text-emerald font-medium">
                          {page.change}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    
  )
}
