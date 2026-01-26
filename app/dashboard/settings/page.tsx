"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { User, Bell, Shield, Globe, CreditCard, Key } from "lucide-react"
import { useState } from "react"

const tabs = [
  { name: "Profile", icon: User },
  { name: "Notifications", icon: Bell },
  { name: "Security", icon: Shield },
  { name: "Websites", icon: Globe },
  { name: "Billing", icon: CreditCard },
  { name: "API", icon: Key },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Profile")
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => setIsSaving(false), 1500)
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader
        title="Settings"
        description="Manage your account and preferences"
      />

      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar tabs */}
          <div className="lg:w-64 shrink-0">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.name
                      ? "bg-emerald/10 text-emerald"
                      : "text-graphite hover:bg-gray-100 hover:text-charcoal"
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
            {activeTab === "Profile" && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-heading text-lg font-semibold text-charcoal mb-1">
                    Profile Information
                  </h2>
                  <p className="text-sm text-graphite">
                    Update your account details and profile picture
                  </p>
                </div>

                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-full bg-violet/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-violet">JD</span>
                  </div>
                  <div>
                    <Button variant="outline" size="sm" className="mb-2 bg-transparent">
                      Change Photo
                    </Button>
                    <p className="text-xs text-graphite">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>

                {/* Form fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-charcoal">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      defaultValue="John"
                      className="mt-1.5 bg-gray-50 border-gray-200"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-charcoal">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      defaultValue="Doe"
                      className="mt-1.5 bg-gray-50 border-gray-200"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="email" className="text-charcoal">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="john@company.com"
                      className="mt-1.5 bg-gray-50 border-gray-200"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="company" className="text-charcoal">
                      Company
                    </Label>
                    <Input
                      id="company"
                      defaultValue="Acme Inc."
                      className="mt-1.5 bg-gray-50 border-gray-200"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 flex justify-end">
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-emerald hover:bg-emerald-dark text-charcoal font-semibold"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "Notifications" && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-heading text-lg font-semibold text-charcoal mb-1">
                    Notification Preferences
                  </h2>
                  <p className="text-sm text-graphite">
                    Choose how and when you want to be notified
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      title: "Weekly Report",
                      description: "Receive a weekly summary of your AI search performance",
                      defaultChecked: true,
                    },
                    {
                      title: "Optimization Alerts",
                      description: "Get notified when new optimization opportunities are found",
                      defaultChecked: true,
                    },
                    {
                      title: "Performance Drops",
                      description: "Alert when your visibility score drops significantly",
                      defaultChecked: true,
                    },
                    {
                      title: "Product Updates",
                      description: "Stay informed about new features and improvements",
                      defaultChecked: false,
                    },
                    {
                      title: "Marketing Emails",
                      description: "Tips, case studies, and best practices",
                      defaultChecked: false,
                    },
                  ].map((notification) => (
                    <div
                      key={notification.title}
                      className="flex items-center justify-between p-4 rounded-lg bg-gray-50"
                    >
                      <div>
                        <h3 className="font-medium text-charcoal text-sm">
                          {notification.title}
                        </h3>
                        <p className="text-xs text-graphite">{notification.description}</p>
                      </div>
                      <Switch defaultChecked={notification.defaultChecked} />
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-200 flex justify-end">
                  <Button className="bg-emerald hover:bg-emerald-dark text-charcoal font-semibold">
                    Save Preferences
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "Security" && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-heading text-lg font-semibold text-charcoal mb-1">
                    Security Settings
                  </h2>
                  <p className="text-sm text-graphite">
                    Manage your password and account security
                  </p>
                </div>

                {/* Change password */}
                <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                  <h3 className="font-medium text-charcoal mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword" className="text-charcoal">
                        Current Password
                      </Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        className="mt-1.5 bg-white border-gray-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="newPassword" className="text-charcoal">
                        New Password
                      </Label>
                      <Input
                        id="newPassword"
                        type="password"
                        className="mt-1.5 bg-white border-gray-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword" className="text-charcoal">
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        className="mt-1.5 bg-white border-gray-200"
                      />
                    </div>
                    <Button className="bg-charcoal hover:bg-charcoal-light text-white">
                      Update Password
                    </Button>
                  </div>
                </div>

                {/* Two-factor auth */}
                <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-charcoal">Two-Factor Authentication</h3>
                      <p className="text-sm text-graphite">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button variant="outline" className="bg-transparent">
                      Enable
                    </Button>
                  </div>
                </div>

                {/* Sessions */}
                <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                  <h3 className="font-medium text-charcoal mb-2">Active Sessions</h3>
                  <p className="text-sm text-graphite mb-4">
                    You&apos;re currently logged in on 2 devices
                  </p>
                  <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent">
                    Log Out All Devices
                  </Button>
                </div>
              </div>
            )}

            {(activeTab === "Websites" || activeTab === "Billing" || activeTab === "API") && (
              <div className="flex items-center justify-center h-64 text-graphite">
                <p>{activeTab} settings coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
