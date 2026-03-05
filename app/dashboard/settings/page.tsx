// "use client"

// import { DashboardHeader } from "@/components/dashboard/header"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Switch } from "@/components/ui/switch"
// import { User, Bell, Shield, Globe, CreditCard, Key } from "lucide-react"
// import { useState } from "react"

// const tabs = [
//   { name: "Profile", icon: User },
//   { name: "Notifications", icon: Bell },
//   { name: "Security", icon: Shield },
//   { name: "Websites", icon: Globe },
//   { name: "Billing", icon: CreditCard },
//   { name: "API", icon: Key },
// ]

// export default function SettingsPage() {
//   const [activeTab, setActiveTab] = useState("Profile")
//   const [isSaving, setIsSaving] = useState(false)

//   const handleSave = () => {
//     setIsSaving(true)
//     setTimeout(() => setIsSaving(false), 1500)
//   }

//   return (
//     <div className="min-h-screen">
//       <DashboardHeader
//         title="Settings"
//         description="Manage your account and preferences"
//       />

//       <div className="p-6">
//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Sidebar tabs */}
//           <div className="lg:w-64 shrink-0">
//             <nav className="space-y-1">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab.name}
//                   onClick={() => setActiveTab(tab.name)}
//                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
//                     activeTab === tab.name
//                       ? "bg-emerald/10 text-emerald"
//                       : "text-graphite hover:bg-gray-100 hover:text-charcoal"
//                   }`}
//                 >
//                   <tab.icon className="h-5 w-5" />
//                   {tab.name}
//                 </button>
//               ))}
//             </nav>
//           </div>

//           {/* Content */}
//           <div className="flex-1 p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
//             {activeTab === "Profile" && (
//               <div className="space-y-6">
//                 <div>
//                   <h2 className="font-heading text-lg font-semibold text-charcoal mb-1">
//                     Profile Information
//                   </h2>
//                   <p className="text-sm text-graphite">
//                     Update your account details and profile picture
//                   </p>
//                 </div>

//                 {/* Avatar */}
//                 <div className="flex items-center gap-4">
//                   <div className="h-20 w-20 rounded-full bg-violet/20 flex items-center justify-center">
//                     <span className="text-2xl font-bold text-violet">JD</span>
//                   </div>
//                   <div>
//                     <Button variant="outline" size="sm" className="mb-2 bg-transparent">
//                       Change Photo
//                     </Button>
//                     <p className="text-xs text-graphite">JPG, PNG or GIF. Max 2MB.</p>
//                   </div>
//                 </div>

//                 {/* Form fields */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <Label htmlFor="firstName" className="text-charcoal">
//                       First Name
//                     </Label>
//                     <Input
//                       id="firstName"
//                       defaultValue="John"
//                       className="mt-1.5 bg-gray-50 border-gray-200"
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="lastName" className="text-charcoal">
//                       Last Name
//                     </Label>
//                     <Input
//                       id="lastName"
//                       defaultValue="Doe"
//                       className="mt-1.5 bg-gray-50 border-gray-200"
//                     />
//                   </div>
//                   <div className="md:col-span-2">
//                     <Label htmlFor="email" className="text-charcoal">
//                       Email Address
//                     </Label>
//                     <Input
//                       id="email"
//                       type="email"
//                       defaultValue="john@company.com"
//                       className="mt-1.5 bg-gray-50 border-gray-200"
//                     />
//                   </div>
//                   <div className="md:col-span-2">
//                     <Label htmlFor="company" className="text-charcoal">
//                       Company
//                     </Label>
//                     <Input
//                       id="company"
//                       defaultValue="Acme Inc."
//                       className="mt-1.5 bg-gray-50 border-gray-200"
//                     />
//                   </div>
//                 </div>

//                 <div className="pt-4 border-t border-gray-200 flex justify-end">
//                   <Button
//                     onClick={handleSave}
//                     disabled={isSaving}
//                     className="bg-emerald hover:bg-emerald-dark text-charcoal font-semibold"
//                   >
//                     {isSaving ? "Saving..." : "Save Changes"}
//                   </Button>
//                 </div>
//               </div>
//             )}

//             {activeTab === "Notifications" && (
//               <div className="space-y-6">
//                 <div>
//                   <h2 className="font-heading text-lg font-semibold text-charcoal mb-1">
//                     Notification Preferences
//                   </h2>
//                   <p className="text-sm text-graphite">
//                     Choose how and when you want to be notified
//                   </p>
//                 </div>

//                 <div className="space-y-4">
//                   {[
//                     {
//                       title: "Weekly Report",
//                       description: "Receive a weekly summary of your AI search performance",
//                       defaultChecked: true,
//                     },
//                     {
//                       title: "Optimization Alerts",
//                       description: "Get notified when new optimization opportunities are found",
//                       defaultChecked: true,
//                     },
//                     {
//                       title: "Performance Drops",
//                       description: "Alert when your visibility score drops significantly",
//                       defaultChecked: true,
//                     },
//                     {
//                       title: "Product Updates",
//                       description: "Stay informed about new features and improvements",
//                       defaultChecked: false,
//                     },
//                     {
//                       title: "Marketing Emails",
//                       description: "Tips, case studies, and best practices",
//                       defaultChecked: false,
//                     },
//                   ].map((notification) => (
//                     <div
//                       key={notification.title}
//                       className="flex items-center justify-between p-4 rounded-lg bg-gray-50"
//                     >
//                       <div>
//                         <h3 className="font-medium text-charcoal text-sm">
//                           {notification.title}
//                         </h3>
//                         <p className="text-xs text-graphite">{notification.description}</p>
//                       </div>
//                       <Switch defaultChecked={notification.defaultChecked} />
//                     </div>
//                   ))}
//                 </div>

//                 <div className="pt-4 border-t border-gray-200 flex justify-end">
//                   <Button className="bg-emerald hover:bg-emerald-dark text-charcoal font-semibold">
//                     Save Preferences
//                   </Button>
//                 </div>
//               </div>
//             )}

//             {activeTab === "Security" && (
//               <div className="space-y-6">
//                 <div>
//                   <h2 className="font-heading text-lg font-semibold text-charcoal mb-1">
//                     Security Settings
//                   </h2>
//                   <p className="text-sm text-graphite">
//                     Manage your password and account security
//                   </p>
//                 </div>

//                 {/* Change password */}
//                 <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
//                   <h3 className="font-medium text-charcoal mb-4">Change Password</h3>
//                   <div className="space-y-4">
//                     <div>
//                       <Label htmlFor="currentPassword" className="text-charcoal">
//                         Current Password
//                       </Label>
//                       <Input
//                         id="currentPassword"
//                         type="password"
//                         className="mt-1.5 bg-white border-gray-200"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="newPassword" className="text-charcoal">
//                         New Password
//                       </Label>
//                       <Input
//                         id="newPassword"
//                         type="password"
//                         className="mt-1.5 bg-white border-gray-200"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="confirmPassword" className="text-charcoal">
//                         Confirm New Password
//                       </Label>
//                       <Input
//                         id="confirmPassword"
//                         type="password"
//                         className="mt-1.5 bg-white border-gray-200"
//                       />
//                     </div>
//                     <Button className="bg-charcoal hover:bg-charcoal-light text-white">
//                       Update Password
//                     </Button>
//                   </div>
//                 </div>

//                 {/* Two-factor auth */}
//                 <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h3 className="font-medium text-charcoal">Two-Factor Authentication</h3>
//                       <p className="text-sm text-graphite">
//                         Add an extra layer of security to your account
//                       </p>
//                     </div>
//                     <Button variant="outline" className="bg-transparent">
//                       Enable
//                     </Button>
//                   </div>
//                 </div>

//                 {/* Sessions */}
//                 <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
//                   <h3 className="font-medium text-charcoal mb-2">Active Sessions</h3>
//                   <p className="text-sm text-graphite mb-4">
//                     You&apos;re currently logged in on 2 devices
//                   </p>
//                   <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent">
//                     Log Out All Devices
//                   </Button>
//                 </div>
//               </div>
//             )}

//             {(activeTab === "Websites" || activeTab === "Billing" || activeTab === "API") && (
//               <div className="flex items-center justify-center h-64 text-graphite">
//                 <p>{activeTab} settings coming soon...</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }




// // <!DOCTYPE html>
// // <html lang="en">
// // <head>
// // <meta charset="UTF-8">
// // <meta name="viewport" content="width=device-width, initial-scale=1.0">
// // <title>TecSaro AI — Dashboard</title>
// // <link href="https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Satoshi:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet">
// // <style>
// // * { margin:0; padding:0; box-sizing:border-box; }

// // :root {
// //   --bg: #F7F6F2;
// //   --white: #FFFFFF;
// //   --ink: #0E0E0C;
// //   --ink2: #3A3A36;
// //   --muted: #8C8C82;
// //   --border: #E4E3DC;
// //   --border2: #CCCCC2;
// //   --accent: #1A1A14;
// //   --green: #1A6B45;
// //   --green-bg: #EBF5EF;
// //   --red: #B83232;
// //   --red-bg: #FAEAEA;
// //   --amber: #B86000;
// //   --amber-bg: #FEF3E2;
// //   --blue: #1A3A6B;
// //   --blue-bg: #EAF0FB;
// //   --score-high: #1A6B45;
// //   --score-mid: #B86000;
// //   --score-low: #B83232;
// //   --sidebar-w: 240px;
// //   --topbar-h: 60px;
// // }

// // body {
// //   font-family: 'Satoshi', sans-serif;
// //   background: var(--bg);
// //   color: var(--ink);
// //   min-height: 100vh;
// //   display: flex;
// //   font-size: 14px;
// // }

// // /* ── SIDEBAR ── */
// // .sidebar {
// //   width: var(--sidebar-w);
// //   min-height: 100vh;
// //   background: var(--white);
// //   border-right: 1px solid var(--border);
// //   display: flex;
// //   flex-direction: column;
// //   position: fixed;
// //   top: 0; left: 0;
// //   z-index: 100;
// // }

// // .sidebar-logo {
// //   padding: 20px 20px 16px;
// //   border-bottom: 1px solid var(--border);
// //   display: flex;
// //   align-items: center;
// //   gap: 10px;
// // }

// // .logo-mark {
// //   width: 32px; height: 32px;
// //   background: var(--ink);
// //   border-radius: 8px;
// //   display: flex; align-items: center; justify-content: center;
// //   font-family: 'Clash Display', sans-serif;
// //   font-size: 14px;
// //   font-weight: 700;
// //   color: #fff;
// //   letter-spacing: -0.5px;
// // }

// // .logo-text {
// //   font-family: 'Clash Display', sans-serif;
// //   font-size: 15px;
// //   font-weight: 600;
// //   color: var(--ink);
// //   letter-spacing: -0.3px;
// // }

// // .logo-text span {
// //   color: var(--muted);
// //   font-weight: 400;
// // }

// // /* Project selector */
// // .project-selector {
// //   margin: 12px;
// //   padding: 10px 12px;
// //   background: var(--bg);
// //   border: 1px solid var(--border);
// //   border-radius: 8px;
// //   cursor: pointer;
// //   transition: border-color 0.15s;
// // }

// // .project-selector:hover { border-color: var(--border2); }

// // .project-selector-label {
// //   font-size: 10px;
// //   letter-spacing: 0.1em;
// //   text-transform: uppercase;
// //   color: var(--muted);
// //   margin-bottom: 3px;
// //   font-family: 'JetBrains Mono', monospace;
// // }

// // .project-selector-name {
// //   font-size: 13px;
// //   font-weight: 600;
// //   color: var(--ink);
// //   display: flex;
// //   align-items: center;
// //   justify-content: space-between;
// // }

// // .project-selector-name svg { opacity: 0.4; }

// // /* Nav */
// // .sidebar-nav {
// //   padding: 8px;
// //   flex: 1;
// // }

// // .nav-section-label {
// //   font-size: 10px;
// //   letter-spacing: 0.12em;
// //   text-transform: uppercase;
// //   color: var(--muted);
// //   padding: 12px 12px 6px;
// //   font-family: 'JetBrains Mono', monospace;
// // }

// // .nav-item {
// //   display: flex;
// //   align-items: center;
// //   gap: 10px;
// //   padding: 9px 12px;
// //   border-radius: 7px;
// //   cursor: pointer;
// //   transition: background 0.12s;
// //   color: var(--ink2);
// //   font-size: 13.5px;
// //   font-weight: 500;
// //   margin-bottom: 1px;
// //   position: relative;
// // }

// // .nav-item:hover { background: var(--bg); }
// // .nav-item.active {
// //   background: var(--ink);
// //   color: #fff;
// // }

// // .nav-item .nav-icon {
// //   width: 18px; height: 18px;
// //   opacity: 0.7;
// //   flex-shrink: 0;
// // }

// // .nav-item.active .nav-icon { opacity: 1; }

// // .nav-badge {
// //   margin-left: auto;
// //   background: var(--red);
// //   color: #fff;
// //   font-size: 10px;
// //   font-weight: 600;
// //   padding: 1px 6px;
// //   border-radius: 10px;
// //   font-family: 'JetBrains Mono', monospace;
// // }

// // .nav-item.active .nav-badge { background: rgba(255,255,255,0.25); }

// // /* Sidebar footer */
// // .sidebar-footer {
// //   padding: 12px;
// //   border-top: 1px solid var(--border);
// // }

// // .plan-chip {
// //   display: flex;
// //   align-items: center;
// //   justify-content: space-between;
// //   padding: 10px 12px;
// //   background: var(--bg);
// //   border: 1px solid var(--border);
// //   border-radius: 8px;
// //   margin-bottom: 10px;
// // }

// // .plan-chip-name {
// //   font-size: 12px;
// //   font-weight: 600;
// //   color: var(--ink);
// // }

// // .plan-chip-badge {
// //   font-size: 10px;
// //   background: var(--amber-bg);
// //   color: var(--amber);
// //   padding: 2px 8px;
// //   border-radius: 10px;
// //   font-weight: 600;
// //   font-family: 'JetBrains Mono', monospace;
// // }

// // .user-row {
// //   display: flex;
// //   align-items: center;
// //   gap: 10px;
// // }

// // .user-avatar {
// //   width: 30px; height: 30px;
// //   border-radius: 50%;
// //   background: var(--ink);
// //   color: #fff;
// //   display: flex; align-items: center; justify-content: center;
// //   font-size: 12px;
// //   font-weight: 600;
// //   flex-shrink: 0;
// // }

// // .user-info { flex: 1; min-width: 0; }
// // .user-name { font-size: 12px; font-weight: 600; color: var(--ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
// // .user-email { font-size: 11px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

// // /* ── MAIN ── */
// // .main {
// //   margin-left: var(--sidebar-w);
// //   flex: 1;
// //   display: flex;
// //   flex-direction: column;
// //   min-height: 100vh;
// // }

// // /* Topbar */
// // .topbar {
// //   height: var(--topbar-h);
// //   background: var(--white);
// //   border-bottom: 1px solid var(--border);
// //   display: flex;
// //   align-items: center;
// //   justify-content: space-between;
// //   padding: 0 28px;
// //   position: sticky;
// //   top: 0;
// //   z-index: 50;
// // }

// // .topbar-left {
// //   display: flex;
// //   flex-direction: column;
// // }

// // .topbar-title {
// //   font-family: 'Clash Display', sans-serif;
// //   font-size: 16px;
// //   font-weight: 600;
// //   color: var(--ink);
// //   letter-spacing: -0.3px;
// // }

// // .topbar-sub {
// //   font-size: 11px;
// //   color: var(--muted);
// //   font-family: 'JetBrains Mono', monospace;
// // }

// // .topbar-right {
// //   display: flex;
// //   align-items: center;
// //   gap: 10px;
// // }

// // .btn {
// //   display: inline-flex;
// //   align-items: center;
// //   gap: 6px;
// //   padding: 8px 16px;
// //   border-radius: 8px;
// //   font-size: 13px;
// //   font-weight: 600;
// //   cursor: pointer;
// //   border: none;
// //   transition: all 0.15s;
// //   font-family: 'Satoshi', sans-serif;
// // }

// // .btn-primary {
// //   background: var(--ink);
// //   color: #fff;
// // }

// // .btn-primary:hover { background: #2a2a20; }

// // .btn-secondary {
// //   background: var(--white);
// //   color: var(--ink);
// //   border: 1px solid var(--border2);
// // }

// // .btn-secondary:hover { background: var(--bg); }

// // .btn-sm { padding: 6px 12px; font-size: 12px; }

// // .next-run-chip {
// //   display: flex;
// //   align-items: center;
// //   gap: 6px;
// //   padding: 6px 12px;
// //   background: var(--bg);
// //   border: 1px solid var(--border);
// //   border-radius: 8px;
// //   font-size: 11px;
// //   color: var(--muted);
// //   font-family: 'JetBrains Mono', monospace;
// // }

// // .next-run-chip .dot {
// //   width: 6px; height: 6px;
// //   border-radius: 50%;
// //   background: var(--green);
// //   animation: pulse 2s infinite;
// // }

// // @keyframes pulse {
// //   0%, 100% { opacity: 1; }
// //   50% { opacity: 0.3; }
// // }

// // /* ── CONTENT ── */
// // .content {
// //   padding: 28px;
// //   flex: 1;
// // }

// // /* Screen switching */
// // .screen { display: none; animation: fadeIn 0.2s ease; }
// // .screen.active { display: block; }

// // @keyframes fadeIn {
// //   from { opacity: 0; transform: translateY(8px); }
// //   to { opacity: 1; transform: translateY(0); }
// // }

// // /* ── OVERVIEW SCREEN ── */
// // .score-hero {
// //   background: var(--white);
// //   border: 1px solid var(--border);
// //   border-radius: 14px;
// //   padding: 28px;
// //   display: grid;
// //   grid-template-columns: auto 1fr auto;
// //   gap: 32px;
// //   align-items: center;
// //   margin-bottom: 20px;
// // }

// // .score-circle {
// //   position: relative;
// //   width: 110px; height: 110px;
// //   flex-shrink: 0;
// // }

// // .score-circle svg { transform: rotate(-90deg); }

// // .score-circle-inner {
// //   position: absolute;
// //   inset: 0;
// //   display: flex;
// //   flex-direction: column;
// //   align-items: center;
// //   justify-content: center;
// // }

// // .score-num {
// //   font-family: 'Clash Display', sans-serif;
// //   font-size: 32px;
// //   font-weight: 700;
// //   color: var(--ink);
// //   line-height: 1;
// // }

// // .score-denom {
// //   font-size: 11px;
// //   color: var(--muted);
// //   font-family: 'JetBrains Mono', monospace;
// // }

// // .score-info {}

// // .score-label {
// //   font-family: 'JetBrains Mono', monospace;
// //   font-size: 10px;
// //   letter-spacing: 0.15em;
// //   text-transform: uppercase;
// //   color: var(--muted);
// //   margin-bottom: 6px;
// // }

// // .score-title {
// //   font-family: 'Clash Display', sans-serif;
// //   font-size: 22px;
// //   font-weight: 600;
// //   color: var(--ink);
// //   margin-bottom: 4px;
// //   letter-spacing: -0.3px;
// // }

// // .score-desc {
// //   font-size: 13px;
// //   color: var(--muted);
// //   max-width: 420px;
// //   line-height: 1.6;
// // }

// // .score-breakdown {
// //   display: flex;
// //   flex-direction: column;
// //   gap: 10px;
// //   min-width: 200px;
// // }

// // .breakdown-item {
// //   display: flex;
// //   flex-direction: column;
// //   gap: 4px;
// // }

// // .breakdown-label {
// //   display: flex;
// //   justify-content: space-between;
// //   font-size: 11px;
// // }

// // .breakdown-name { color: var(--ink2); font-weight: 500; }
// // .breakdown-val { color: var(--muted); font-family: 'JetBrains Mono', monospace; }

// // .breakdown-bar {
// //   height: 4px;
// //   background: var(--border);
// //   border-radius: 2px;
// //   overflow: hidden;
// // }

// // .breakdown-fill {
// //   height: 100%;
// //   border-radius: 2px;
// // }

// // /* Stats grid */
// // .stats-grid {
// //   display: grid;
// //   grid-template-columns: repeat(4, 1fr);
// //   gap: 14px;
// //   margin-bottom: 20px;
// // }

// // .stat-card {
// //   background: var(--white);
// //   border: 1px solid var(--border);
// //   border-radius: 12px;
// //   padding: 20px;
// // }

// // .stat-label {
// //   font-size: 11px;
// //   color: var(--muted);
// //   font-family: 'JetBrains Mono', monospace;
// //   letter-spacing: 0.08em;
// //   text-transform: uppercase;
// //   margin-bottom: 8px;
// // }

// // .stat-value {
// //   font-family: 'Clash Display', sans-serif;
// //   font-size: 28px;
// //   font-weight: 700;
// //   color: var(--ink);
// //   line-height: 1;
// //   margin-bottom: 4px;
// // }

// // .stat-change {
// //   font-size: 11px;
// //   font-family: 'JetBrains Mono', monospace;
// // }

// // .stat-change.up { color: var(--green); }
// // .stat-change.down { color: var(--red); }
// // .stat-change.neutral { color: var(--muted); }

// // /* Two col layout */
// // .two-col {
// //   display: grid;
// //   grid-template-columns: 1fr 1fr;
// //   gap: 14px;
// //   margin-bottom: 20px;
// // }

// // .three-col {
// //   display: grid;
// //   grid-template-columns: 1fr 1fr 1fr;
// //   gap: 14px;
// //   margin-bottom: 20px;
// // }

// // /* Panel */
// // .panel {
// //   background: var(--white);
// //   border: 1px solid var(--border);
// //   border-radius: 12px;
// //   overflow: hidden;
// // }

// // .panel-header {
// //   padding: 16px 20px;
// //   border-bottom: 1px solid var(--border);
// //   display: flex;
// //   align-items: center;
// //   justify-content: space-between;
// // }

// // .panel-title {
// //   font-family: 'Clash Display', sans-serif;
// //   font-size: 14px;
// //   font-weight: 600;
// //   color: var(--ink);
// //   letter-spacing: -0.2px;
// // }

// // .panel-action {
// //   font-size: 12px;
// //   color: var(--muted);
// //   cursor: pointer;
// //   font-weight: 500;
// // }

// // .panel-action:hover { color: var(--ink); }

// // /* Prompt rows */
// // .prompt-row {
// //   display: grid;
// //   grid-template-columns: 1fr 80px 80px 80px;
// //   gap: 0;
// //   border-bottom: 1px solid var(--border);
// //   align-items: center;
// // }

// // .prompt-row:last-child { border-bottom: none; }
// // .prompt-row.header { background: var(--bg); }

// // .prompt-cell {
// //   padding: 11px 16px;
// //   font-size: 12px;
// // }

// // .prompt-row.header .prompt-cell {
// //   font-size: 10px;
// //   letter-spacing: 0.1em;
// //   text-transform: uppercase;
// //   color: var(--muted);
// //   font-family: 'JetBrains Mono', monospace;
// //   font-weight: 400;
// // }

// // .prompt-text {
// //   color: var(--ink2);
// //   font-weight: 500;
// //   white-space: nowrap;
// //   overflow: hidden;
// //   text-overflow: ellipsis;
// //   max-width: 280px;
// // }

// // .model-cell { text-align: center; }

// // .mention-yes {
// //   display: inline-flex;
// //   align-items: center;
// //   justify-content: center;
// //   width: 22px; height: 22px;
// //   background: var(--green-bg);
// //   border-radius: 50%;
// //   font-size: 11px;
// //   color: var(--green);
// // }

// // .mention-no {
// //   display: inline-flex;
// //   align-items: center;
// //   justify-content: center;
// //   width: 22px; height: 22px;
// //   background: var(--red-bg);
// //   border-radius: 50%;
// //   font-size: 11px;
// //   color: var(--red);
// // }

// // .mention-locked {
// //   display: inline-flex;
// //   align-items: center;
// //   justify-content: center;
// //   width: 22px; height: 22px;
// //   background: var(--border);
// //   border-radius: 50%;
// //   font-size: 10px;
// //   color: var(--muted);
// // }

// // /* Competitor list */
// // .competitor-row {
// //   display: flex;
// //   align-items: center;
// //   gap: 12px;
// //   padding: 12px 20px;
// //   border-bottom: 1px solid var(--border);
// // }

// // .competitor-row:last-child { border-bottom: none; }

// // .comp-logo {
// //   width: 32px; height: 32px;
// //   border-radius: 8px;
// //   background: var(--bg);
// //   border: 1px solid var(--border);
// //   display: flex; align-items: center; justify-content: center;
// //   font-size: 12px;
// //   font-weight: 700;
// //   color: var(--ink);
// //   flex-shrink: 0;
// //   font-family: 'Clash Display', sans-serif;
// // }

// // .comp-info { flex: 1; min-width: 0; }
// // .comp-name { font-size: 13px; font-weight: 600; color: var(--ink); }
// // .comp-domain { font-size: 11px; color: var(--muted); font-family: 'JetBrains Mono', monospace; }

// // .comp-rate {
// //   font-family: 'JetBrains Mono', monospace;
// //   font-size: 12px;
// //   font-weight: 600;
// //   color: var(--red);
// // }

// // .comp-bar-wrap {
// //   width: 80px;
// // }

// // .comp-bar {
// //   height: 4px;
// //   background: var(--border);
// //   border-radius: 2px;
// //   overflow: hidden;
// //   margin-top: 4px;
// // }

// // .comp-bar-fill {
// //   height: 100%;
// //   background: var(--red);
// //   border-radius: 2px;
// // }

// // /* ── VISIBILITY SCREEN ── */
// // .visibility-filters {
// //   display: flex;
// //   gap: 8px;
// //   margin-bottom: 16px;
// //   flex-wrap: wrap;
// // }

// // .filter-chip {
// //   padding: 6px 14px;
// //   border-radius: 20px;
// //   border: 1px solid var(--border);
// //   background: var(--white);
// //   font-size: 12px;
// //   font-weight: 500;
// //   color: var(--ink2);
// //   cursor: pointer;
// //   transition: all 0.12s;
// // }

// // .filter-chip:hover { border-color: var(--border2); }
// // .filter-chip.active {
// //   background: var(--ink);
// //   color: #fff;
// //   border-color: var(--ink);
// // }

// // .model-comparison {
// //   display: grid;
// //   grid-template-columns: repeat(3, 1fr);
// //   gap: 14px;
// //   margin-bottom: 20px;
// // }

// // .model-card {
// //   background: var(--white);
// //   border: 1px solid var(--border);
// //   border-radius: 12px;
// //   padding: 20px;
// //   position: relative;
// //   overflow: hidden;
// // }

// // .model-card::before {
// //   content: '';
// //   position: absolute;
// //   top: 0; left: 0; right: 0;
// //   height: 3px;
// // }

// // .model-card.gemini::before { background: #4285F4; }
// // .model-card.chatgpt::before { background: #10a37f; }
// // .model-card.perplexity::before { background: #20808D; }

// // .model-name {
// //   font-size: 11px;
// //   font-family: 'JetBrains Mono', monospace;
// //   letter-spacing: 0.1em;
// //   text-transform: uppercase;
// //   color: var(--muted);
// //   margin-bottom: 8px;
// // }

// // .model-score {
// //   font-family: 'Clash Display', sans-serif;
// //   font-size: 36px;
// //   font-weight: 700;
// //   color: var(--ink);
// //   line-height: 1;
// //   margin-bottom: 4px;
// // }

// // .model-score span {
// //   font-size: 16px;
// //   color: var(--muted);
// //   font-weight: 400;
// // }

// // .model-sub {
// //   font-size: 12px;
// //   color: var(--muted);
// // }

// // .model-locked {
// //   display: flex;
// //   flex-direction: column;
// //   align-items: center;
// //   justify-content: center;
// //   padding: 20px;
// //   text-align: center;
// // }

// // .lock-icon { font-size: 24px; margin-bottom: 8px; }
// // .lock-text { font-size: 12px; color: var(--muted); margin-bottom: 10px; }

// // /* Prompt detail table */
// // .prompt-detail-row {
// //   border-bottom: 1px solid var(--border);
// // }

// // .prompt-detail-row:last-child { border-bottom: none; }

// // .prompt-detail-main {
// //   display: grid;
// //   grid-template-columns: 1fr 90px 90px 90px 100px;
// //   align-items: center;
// //   padding: 14px 20px;
// //   cursor: pointer;
// //   transition: background 0.1s;
// // }

// // .prompt-detail-main:hover { background: var(--bg); }

// // .prompt-q {
// //   font-size: 13px;
// //   font-weight: 500;
// //   color: var(--ink);
// // }

// // .prompt-q-sub {
// //   font-size: 11px;
// //   color: var(--muted);
// //   margin-top: 2px;
// //   font-family: 'JetBrains Mono', monospace;
// // }

// // .status-pill {
// //   display: inline-flex;
// //   align-items: center;
// //   gap: 4px;
// //   padding: 3px 10px;
// //   border-radius: 20px;
// //   font-size: 11px;
// //   font-weight: 600;
// //   font-family: 'JetBrains Mono', monospace;
// // }

// // .pill-win { background: var(--green-bg); color: var(--green); }
// // .pill-shared { background: var(--amber-bg); color: var(--amber); }
// // .pill-missed { background: var(--red-bg); color: var(--red); }

// // /* ── COMPETITORS SCREEN ── */
// // .comp-suggestion-banner {
// //   background: var(--amber-bg);
// //   border: 1px solid #F5D99A;
// //   border-radius: 12px;
// //   padding: 16px 20px;
// //   display: flex;
// //   align-items: center;
// //   gap: 14px;
// //   margin-bottom: 20px;
// // }

// // .suggestion-icon { font-size: 20px; }

// // .suggestion-text { flex: 1; }
// // .suggestion-title { font-size: 13px; font-weight: 600; color: var(--amber); margin-bottom: 2px; }
// // .suggestion-sub { font-size: 12px; color: var(--amber); opacity: 0.8; }

// // .suggestion-actions { display: flex; gap: 8px; }

// // .comp-full-row {
// //   display: grid;
// //   grid-template-columns: 1fr 100px 100px 120px 120px;
// //   align-items: center;
// //   padding: 14px 20px;
// //   border-bottom: 1px solid var(--border);
// //   transition: background 0.1s;
// // }

// // .comp-full-row:hover { background: var(--bg); }
// // .comp-full-row:last-child { border-bottom: none; }
// // .comp-full-row.header { background: var(--bg); }
// // .comp-full-row.header div {
// //   font-size: 10px;
// //   letter-spacing: 0.1em;
// //   text-transform: uppercase;
// //   color: var(--muted);
// //   font-family: 'JetBrains Mono', monospace;
// // }

// // .comp-full-row.suggested { background: #FFFBF0; }

// // .suggested-badge {
// //   display: inline-flex;
// //   align-items: center;
// //   gap: 4px;
// //   padding: 2px 8px;
// //   background: var(--amber-bg);
// //   border: 1px solid #F5D99A;
// //   border-radius: 10px;
// //   font-size: 10px;
// //   color: var(--amber);
// //   font-weight: 600;
// //   font-family: 'JetBrains Mono', monospace;
// //   margin-left: 8px;
// // }

// // .comp-actions { display: flex; gap: 6px; }

// // .btn-accept {
// //   padding: 4px 10px;
// //   background: var(--green-bg);
// //   color: var(--green);
// //   border: 1px solid #A8D5BC;
// //   border-radius: 6px;
// //   font-size: 11px;
// //   font-weight: 600;
// //   cursor: pointer;
// //   transition: all 0.12s;
// // }

// // .btn-accept:hover { background: #d4eddf; }

// // .btn-ignore {
// //   padding: 4px 10px;
// //   background: var(--red-bg);
// //   color: var(--red);
// //   border: 1px solid #F0C4C4;
// //   border-radius: 6px;
// //   font-size: 11px;
// //   font-weight: 600;
// //   cursor: pointer;
// //   transition: all 0.12s;
// // }

// // .btn-ignore:hover { background: #f7d5d5; }

// // /* ── RECOMMENDATIONS SCREEN ── */
// // .rec-filters {
// //   display: flex;
// //   gap: 8px;
// //   margin-bottom: 16px;
// // }

// // .rec-card {
// //   background: var(--white);
// //   border: 1px solid var(--border);
// //   border-radius: 12px;
// //   padding: 20px 24px;
// //   margin-bottom: 12px;
// //   display: grid;
// //   grid-template-columns: 32px 1fr auto;
// //   gap: 16px;
// //   align-items: start;
// //   transition: border-color 0.15s;
// // }

// // .rec-card:hover { border-color: var(--border2); }

// // .rec-num {
// //   font-family: 'Clash Display', sans-serif;
// //   font-size: 24px;
// //   font-weight: 700;
// //   color: var(--border2);
// //   line-height: 1;
// //   padding-top: 2px;
// // }

// // .rec-title {
// //   font-size: 14px;
// //   font-weight: 600;
// //   color: var(--ink);
// //   margin-bottom: 4px;
// // }

// // .rec-impact {
// //   font-size: 12px;
// //   color: var(--green);
// //   font-family: 'JetBrains Mono', monospace;
// //   margin-bottom: 6px;
// // }

// // .rec-desc {
// //   font-size: 12px;
// //   color: var(--muted);
// //   line-height: 1.7;
// //   margin-bottom: 8px;
// // }

// // .rec-example {
// //   font-size: 11px;
// //   color: var(--ink2);
// //   background: var(--bg);
// //   border: 1px solid var(--border);
// //   border-radius: 6px;
// //   padding: 8px 12px;
// //   line-height: 1.6;
// //   font-style: italic;
// // }

// // .rec-meta { display: flex; flex-direction: column; gap: 6px; align-items: flex-end; }

// // .diff-badge {
// //   padding: 3px 10px;
// //   border-radius: 10px;
// //   font-size: 10px;
// //   font-weight: 600;
// //   font-family: 'JetBrains Mono', monospace;
// //   white-space: nowrap;
// // }

// // .diff-low { background: var(--green-bg); color: var(--green); }
// // .diff-med { background: var(--amber-bg); color: var(--amber); }
// // .diff-high { background: var(--red-bg); color: var(--red); }

// // .time-badge {
// //   padding: 3px 10px;
// //   border-radius: 10px;
// //   font-size: 10px;
// //   color: var(--muted);
// //   background: var(--bg);
// //   border: 1px solid var(--border);
// //   font-family: 'JetBrains Mono', monospace;
// //   white-space: nowrap;
// // }

// // /* ── SCHEMA SCREEN ── */
// // .schema-page-row {
// //   display: grid;
// //   grid-template-columns: 1fr 120px 120px 80px;
// //   align-items: center;
// //   padding: 14px 20px;
// //   border-bottom: 1px solid var(--border);
// //   cursor: pointer;
// //   transition: background 0.1s;
// // }

// // .schema-page-row:hover { background: var(--bg); }
// // .schema-page-row:last-child { border-bottom: none; }
// // .schema-page-row.header { background: var(--bg); cursor: default; }
// // .schema-page-row.header div {
// //   font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase;
// //   color: var(--muted); font-family: 'JetBrains Mono', monospace;
// // }

// // .page-url {
// //   font-size: 12px;
// //   font-family: 'JetBrains Mono', monospace;
// //   color: var(--blue);
// // }

// // .page-title {
// //   font-size: 13px;
// //   font-weight: 500;
// //   color: var(--ink);
// //   margin-bottom: 2px;
// // }

// // .schema-types {
// //   display: flex;
// //   gap: 4px;
// //   flex-wrap: wrap;
// // }

// // .schema-type-tag {
// //   padding: 2px 8px;
// //   background: var(--blue-bg);
// //   color: var(--blue);
// //   border-radius: 4px;
// //   font-size: 10px;
// //   font-family: 'JetBrains Mono', monospace;
// //   font-weight: 500;
// // }

// // .schema-type-tag.fail {
// //   background: var(--red-bg);
// //   color: var(--red);
// // }

// // .copy-btn {
// //   padding: 4px 10px;
// //   background: var(--bg);
// //   border: 1px solid var(--border);
// //   border-radius: 6px;
// //   font-size: 11px;
// //   color: var(--muted);
// //   cursor: pointer;
// //   font-weight: 500;
// //   transition: all 0.12s;
// // }

// // .copy-btn:hover { border-color: var(--border2); color: var(--ink); }

// // /* ── SETTINGS SCREEN ── */
// // .settings-grid {
// //   display: grid;
// //   grid-template-columns: 220px 1fr;
// //   gap: 20px;
// // }

// // .settings-nav {
// //   display: flex;
// //   flex-direction: column;
// //   gap: 2px;
// // }

// // .settings-nav-item {
// //   padding: 9px 14px;
// //   border-radius: 8px;
// //   font-size: 13px;
// //   font-weight: 500;
// //   color: var(--ink2);
// //   cursor: pointer;
// //   transition: background 0.12s;
// // }

// // .settings-nav-item:hover { background: var(--white); }
// // .settings-nav-item.active { background: var(--white); color: var(--ink); font-weight: 600; border: 1px solid var(--border); }

// // .settings-panel {
// //   background: var(--white);
// //   border: 1px solid var(--border);
// //   border-radius: 12px;
// //   overflow: hidden;
// // }

// // .settings-section {
// //   padding: 24px;
// //   border-bottom: 1px solid var(--border);
// // }

// // .settings-section:last-child { border-bottom: none; }

// // .settings-section-title {
// //   font-family: 'Clash Display', sans-serif;
// //   font-size: 14px;
// //   font-weight: 600;
// //   color: var(--ink);
// //   margin-bottom: 4px;
// // }

// // .settings-section-desc {
// //   font-size: 12px;
// //   color: var(--muted);
// //   margin-bottom: 16px;
// // }

// // .form-row {
// //   display: grid;
// //   grid-template-columns: 1fr 1fr;
// //   gap: 12px;
// //   margin-bottom: 12px;
// // }

// // .form-field {
// //   display: flex;
// //   flex-direction: column;
// //   gap: 5px;
// // }

// // .form-label {
// //   font-size: 12px;
// //   font-weight: 500;
// //   color: var(--ink2);
// // }

// // .form-input {
// //   padding: 9px 12px;
// //   border: 1px solid var(--border);
// //   border-radius: 8px;
// //   font-size: 13px;
// //   color: var(--ink);
// //   background: var(--bg);
// //   font-family: 'Satoshi', sans-serif;
// //   outline: none;
// //   transition: border-color 0.15s;
// // }

// // .form-input:focus { border-color: var(--border2); background: var(--white); }

// // .toggle-row {
// //   display: flex;
// //   align-items: center;
// //   justify-content: space-between;
// //   padding: 12px 0;
// //   border-bottom: 1px solid var(--border);
// // }

// // .toggle-row:last-child { border-bottom: none; }

// // .toggle-info { }
// // .toggle-title { font-size: 13px; font-weight: 500; color: var(--ink); }
// // .toggle-desc { font-size: 11px; color: var(--muted); margin-top: 2px; }

// // .toggle {
// //   width: 36px; height: 20px;
// //   background: var(--border);
// //   border-radius: 10px;
// //   position: relative;
// //   cursor: pointer;
// //   transition: background 0.2s;
// //   flex-shrink: 0;
// // }

// // .toggle.on { background: var(--ink); }

// // .toggle::after {
// //   content: '';
// //   position: absolute;
// //   width: 14px; height: 14px;
// //   background: #fff;
// //   border-radius: 50%;
// //   top: 3px; left: 3px;
// //   transition: transform 0.2s;
// // }

// // .toggle.on::after { transform: translateX(16px); }

// // /* Plan section in settings */
// // .plan-box {
// //   background: var(--bg);
// //   border: 1px solid var(--border);
// //   border-radius: 10px;
// //   padding: 16px 20px;
// //   display: flex;
// //   align-items: center;
// //   justify-content: space-between;
// // }

// // .plan-box-name {
// //   font-family: 'Clash Display', sans-serif;
// //   font-size: 18px;
// //   font-weight: 700;
// //   color: var(--ink);
// // }

// // .plan-box-price {
// //   font-size: 12px;
// //   color: var(--muted);
// //   font-family: 'JetBrains Mono', monospace;
// // }

// // .usage-bars {
// //   display: flex;
// //   flex-direction: column;
// //   gap: 10px;
// //   margin-top: 14px;
// // }

// // .usage-item { }
// // .usage-label { display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px; }
// // .usage-name { color: var(--ink2); }
// // .usage-val { color: var(--muted); font-family: 'JetBrains Mono', monospace; }
// // .usage-track { height: 5px; background: var(--border); border-radius: 3px; overflow: hidden; }
// // .usage-fill { height: 100%; background: var(--ink); border-radius: 3px; }
// // .usage-fill.warn { background: var(--amber); }
// // .usage-fill.danger { background: var(--red); }

// // /* Section header */
// // .section-header {
// //   display: flex;
// //   align-items: center;
// //   justify-content: space-between;
// //   margin-bottom: 14px;
// // }

// // .section-title {
// //   font-family: 'Clash Display', sans-serif;
// //   font-size: 16px;
// //   font-weight: 600;
// //   color: var(--ink);
// //   letter-spacing: -0.2px;
// // }

// // .section-sub {
// //   font-size: 12px;
// //   color: var(--muted);
// //   margin-top: 2px;
// // }

// // /* Empty / locked state */
// // .locked-overlay {
// //   display: flex;
// //   flex-direction: column;
// //   align-items: center;
// //   justify-content: center;
// //   padding: 32px;
// //   text-align: center;
// // }

// // .locked-icon { font-size: 28px; margin-bottom: 10px; }
// // .locked-title { font-size: 14px; font-weight: 600; color: var(--ink); margin-bottom: 6px; }
// // .locked-desc { font-size: 12px; color: var(--muted); margin-bottom: 14px; max-width: 280px; }

// // </style>
// // </head>
// // <body>

// // <!-- SIDEBAR -->
// // <aside class="sidebar">
// //   <div class="sidebar-logo">
// //     <div class="logo-mark">T</div>
// //     <div class="logo-text">TecSaro <span>AI</span></div>
// //   </div>

// //   <div class="project-selector">
// //     <div class="project-selector-label">Active Project</div>
// //     <div class="project-selector-name">
// //       Notion
// //       <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
// //         <path d="M3 5L6 8L9 5" stroke="#8C8C82" stroke-width="1.5" stroke-linecap="round"/>
// //       </svg>
// //     </div>
// //   </div>

// //   <nav class="sidebar-nav">
// //     <div class="nav-section-label">Analytics</div>
// //     <div class="nav-item active" onclick="showScreen('overview')">
// //       <svg class="nav-icon" viewBox="0 0 18 18" fill="none">
// //         <rect x="2" y="2" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.8"/>
// //         <rect x="10" y="2" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.5"/>
// //         <rect x="2" y="10" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.5"/>
// //         <rect x="10" y="10" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.3"/>
// //       </svg>
// //       Overview
// //     </div>
// //     <div class="nav-item" onclick="showScreen('visibility')">
// //       <svg class="nav-icon" viewBox="0 0 18 18" fill="none">
// //         <circle cx="9" cy="9" r="3" fill="currentColor"/>
// //         <path d="M1.5 9C1.5 9 4 3 9 3S16.5 9 16.5 9 14 15 9 15 1.5 9 1.5 9Z" stroke="currentColor" stroke-width="1.5" fill="none"/>
// //       </svg>
// //       Visibility
// //     </div>
// //     <div class="nav-item" onclick="showScreen('competitors')">
// //       <svg class="nav-icon" viewBox="0 0 18 18" fill="none">
// //         <circle cx="6" cy="7" r="3" stroke="currentColor" stroke-width="1.5"/>
// //         <circle cx="12" cy="7" r="3" stroke="currentColor" stroke-width="1.5"/>
// //         <path d="M2 15c0-2.2 1.8-4 4-4M12 11c2.2 0 4 1.8 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
// //       </svg>
// //       Competitors
// //       <span class="nav-badge">3</span>
// //     </div>

// //     <div class="nav-section-label">Optimization</div>
// //     <div class="nav-item" onclick="showScreen('recommendations')">
// //       <svg class="nav-icon" viewBox="0 0 18 18" fill="none">
// //         <path d="M9 2L11 7H16L12 10.5L13.5 16L9 13L4.5 16L6 10.5L2 7H7L9 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
// //       </svg>
// //       Recommendations
// //     </div>
// //     <div class="nav-item" onclick="showScreen('schema')">
// //       <svg class="nav-icon" viewBox="0 0 18 18" fill="none">
// //         <path d="M3 5h12M3 9h8M3 13h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
// //       </svg>
// //       Schema
// //     </div>

// //     <div class="nav-section-label">Account</div>
// //     <div class="nav-item" onclick="showScreen('settings')">
// //       <svg class="nav-icon" viewBox="0 0 18 18" fill="none">
// //         <circle cx="9" cy="9" r="2.5" stroke="currentColor" stroke-width="1.5"/>
// //         <path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.2 3.2l1.4 1.4M13.4 13.4l1.4 1.4M3.2 14.8l1.4-1.4M13.4 4.6l1.4-1.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
// //       </svg>
// //       Settings
// //     </div>
// //   </nav>

// //   <div class="sidebar-footer">
// //     <div class="plan-chip">
// //       <div class="plan-chip-name">Starter Plan</div>
// //       <div class="plan-chip-badge">$79/mo</div>
// //     </div>
// //     <div class="user-row">
// //       <div class="user-avatar">S</div>
// //       <div class="user-info">
// //         <div class="user-name">Sabab Ahmed</div>
// //         <div class="user-email">sabab@tecsaro.com</div>
// //       </div>
// //     </div>
// //   </div>
// // </aside>

// // <!-- MAIN -->
// // <main class="main">

// //   <!-- TOPBAR -->
// //   <div class="topbar">
// //     <div class="topbar-left">
// //       <div class="topbar-title" id="topbar-title">Overview</div>
// //       <div class="topbar-sub" id="topbar-sub">notion.so · Last run Feb 23, 2026</div>
// //     </div>
// //     <div class="topbar-right">
// //       <div class="next-run-chip">
// //         <div class="dot"></div>
// //         Next run in 4 days
// //       </div>
// //       <button class="btn btn-secondary btn-sm">Export PDF</button>
// //       <button class="btn btn-primary btn-sm">+ New Project</button>
// //     </div>
// //   </div>

// //   <div class="content">

// //     <!-- ══ OVERVIEW SCREEN ══ -->
// //     <div class="screen active" id="screen-overview">

// //       <!-- Score hero -->
// //       <div class="score-hero">
// //         <div class="score-circle">
// //           <svg width="110" height="110" viewBox="0 0 110 110">
// //             <circle cx="55" cy="55" r="46" fill="none" stroke="#E4E3DC" stroke-width="7"/>
// //             <circle cx="55" cy="55" r="46" fill="none" stroke="#0E0E0C" stroke-width="7"
// //               stroke-dasharray="289"
// //               stroke-dashoffset="93"
// //               stroke-linecap="round"/>
// //           </svg>
// //           <div class="score-circle-inner">
// //             <div class="score-num">68</div>
// //             <div class="score-denom">/100</div>
// //           </div>
// //         </div>

// //         <div class="score-info">
// //           <div class="score-label">AEO Score · February 2026</div>
// //           <div class="score-title">Moderate Visibility</div>
// //           <div class="score-desc">Notion has strong crawl and schema coverage but is missing from 4 of 8 AI answers. Microsoft 365 is winning key prompts uncontested.</div>
// //         </div>

// //         <div class="score-breakdown">
// //           <div class="breakdown-item">
// //             <div class="breakdown-label">
// //               <span class="breakdown-name">Crawl Quality</span>
// //               <span class="breakdown-val">20/20</span>
// //             </div>
// //             <div class="breakdown-bar"><div class="breakdown-fill" style="width:100%;background:#1A6B45"></div></div>
// //           </div>
// //           <div class="breakdown-item">
// //             <div class="breakdown-label">
// //               <span class="breakdown-name">Brand Presence</span>
// //               <span class="breakdown-val">15/30</span>
// //             </div>
// //             <div class="breakdown-bar"><div class="breakdown-fill" style="width:50%;background:#B86000"></div></div>
// //           </div>
// //           <div class="breakdown-item">
// //             <div class="breakdown-label">
// //               <span class="breakdown-name">Competitive Position</span>
// //               <span class="breakdown-val">3/20</span>
// //             </div>
// //             <div class="breakdown-bar"><div class="breakdown-fill" style="width:15%;background:#B83232"></div></div>
// //           </div>
// //           <div class="breakdown-item">
// //             <div class="breakdown-label">
// //               <span class="breakdown-name">Schema Coverage</span>
// //               <span class="breakdown-val">15/15</span>
// //             </div>
// //             <div class="breakdown-bar"><div class="breakdown-fill" style="width:100%;background:#1A6B45"></div></div>
// //           </div>
// //           <div class="breakdown-item">
// //             <div class="breakdown-label">
// //               <span class="breakdown-name">Gap Awareness</span>
// //               <span class="breakdown-val">15/15</span>
// //             </div>
// //             <div class="breakdown-bar"><div class="breakdown-fill" style="width:100%;background:#1A6B45"></div></div>
// //           </div>
// //         </div>
// //       </div>

// //       <!-- Stats -->
// //       <div class="stats-grid">
// //         <div class="stat-card">
// //           <div class="stat-label">Brand Presence</div>
// //           <div class="stat-value">50%</div>
// //           <div class="stat-change neutral">4 of 8 prompts</div>
// //         </div>
// //         <div class="stat-card">
// //           <div class="stat-label">Wins</div>
// //           <div class="stat-value" style="color:var(--green)">1</div>
// //           <div class="stat-change up">↑ Brand only mention</div>
// //         </div>
// //         <div class="stat-card">
// //           <div class="stat-label">Missed Prompts</div>
// //           <div class="stat-value" style="color:var(--red)">4</div>
// //           <div class="stat-change down">↓ Lost to Microsoft 365</div>
// //         </div>
// //         <div class="stat-card">
// //           <div class="stat-label">Schemas Generated</div>
// //           <div class="stat-value">9</div>
// //           <div class="stat-change up">✓ 5 pages covered</div>
// //         </div>
// //       </div>

// //       <!-- Two col -->
// //       <div class="two-col">
// //         <!-- Prompt visibility -->
// //         <div class="panel">
// //           <div class="panel-header">
// //             <div class="panel-title">Prompt Visibility</div>
// //             <div class="panel-action" onclick="showScreen('visibility')">View all →</div>
// //           </div>
// //           <div class="prompt-row header">
// //             <div class="prompt-cell">Prompt</div>
// //             <div class="prompt-cell model-cell">Gemini</div>
// //             <div class="prompt-cell model-cell">GPT-4o</div>
// //             <div class="prompt-cell model-cell">Perplxty</div>
// //           </div>
// //           <div class="prompt-row">
// //             <div class="prompt-cell"><div class="prompt-text">Leading all-in-one AI workspace</div></div>
// //             <div class="prompt-cell model-cell"><span class="mention-yes">✓</span></div>
// //             <div class="prompt-cell model-cell"><span class="mention-yes">✓</span></div>
// //             <div class="prompt-cell model-cell"><span class="mention-locked">🔒</span></div>
// //           </div>
// //           <div class="prompt-row">
// //             <div class="prompt-cell"><div class="prompt-text">Top AI platforms for project mgmt</div></div>
// //             <div class="prompt-cell model-cell"><span class="mention-no">✗</span></div>
// //             <div class="prompt-cell model-cell"><span class="mention-no">✗</span></div>
// //             <div class="prompt-cell model-cell"><span class="mention-locked">🔒</span></div>
// //           </div>
// //           <div class="prompt-row">
// //             <div class="prompt-cell"><div class="prompt-text">Consolidate team tools with AI</div></div>
// //             <div class="prompt-cell model-cell"><span class="mention-yes">✓</span></div>
// //             <div class="prompt-cell model-cell"><span class="mention-yes">✓</span></div>
// //             <div class="prompt-cell model-cell"><span class="mention-locked">🔒</span></div>
// //           </div>
// //           <div class="prompt-row">
// //             <div class="prompt-cell"><div class="prompt-text">AI meeting summarization tools</div></div>
// //             <div class="prompt-cell model-cell"><span class="mention-no">✗</span></div>
// //             <div class="prompt-cell model-cell"><span class="mention-no">✗</span></div>
// //             <div class="prompt-cell model-cell"><span class="mention-locked">🔒</span></div>
// //           </div>
// //           <div class="prompt-row">
// //             <div class="prompt-cell"><div class="prompt-text">Small business SaaS replacement</div></div>
// //             <div class="prompt-cell model-cell"><span class="mention-yes">✓</span></div>
// //             <div class="prompt-cell model-cell"><span class="mention-yes">✓</span></div>
// //             <div class="prompt-cell model-cell"><span class="mention-locked">🔒</span></div>
// //           </div>
// //         </div>

// //         <!-- Top competitors -->
// //         <div class="panel">
// //           <div class="panel-header">
// //             <div class="panel-title">Top Competing Brands</div>
// //             <div class="panel-action" onclick="showScreen('competitors')">Manage →</div>
// //           </div>
// //           <div class="competitor-row">
// //             <div class="comp-logo">M</div>
// //             <div class="comp-info">
// //               <div class="comp-name">Microsoft 365</div>
// //               <div class="comp-domain">microsoft.com</div>
// //             </div>
// //             <div class="comp-bar-wrap">
// //               <div style="font-size:11px;color:var(--red);font-family:'JetBrains Mono',monospace;font-weight:600;">50%</div>
// //               <div class="comp-bar"><div class="comp-bar-fill" style="width:50%"></div></div>
// //             </div>
// //           </div>
// //           <div class="competitor-row">
// //             <div class="comp-logo">C</div>
// //             <div class="comp-info">
// //               <div class="comp-name">ClickUp</div>
// //               <div class="comp-domain">clickup.com</div>
// //             </div>
// //             <div class="comp-bar-wrap">
// //               <div style="font-size:11px;color:var(--amber);font-family:'JetBrains Mono',monospace;font-weight:600;">37.5%</div>
// //               <div class="comp-bar"><div class="comp-bar-fill" style="width:37.5%;background:var(--amber)"></div></div>
// //             </div>
// //           </div>
// //           <div class="competitor-row">
// //             <div class="comp-logo">M</div>
// //             <div class="comp-info">
// //               <div class="comp-name">Monday.com</div>
// //               <div class="comp-domain">monday.com</div>
// //             </div>
// //             <div class="comp-bar-wrap">
// //               <div style="font-size:11px;color:var(--amber);font-family:'JetBrains Mono',monospace;font-weight:600;">37.5%</div>
// //               <div class="comp-bar"><div class="comp-bar-fill" style="width:37.5%;background:var(--amber)"></div></div>
// //             </div>
// //           </div>
// //           <div class="competitor-row">
// //             <div class="comp-logo">C</div>
// //             <div class="comp-info">
// //               <div class="comp-name">Coda</div>
// //               <div class="comp-domain">coda.io</div>
// //             </div>
// //             <div class="comp-bar-wrap">
// //               <div style="font-size:11px;color:var(--muted);font-family:'JetBrains Mono',monospace;font-weight:600;">12.5%</div>
// //               <div class="comp-bar"><div class="comp-bar-fill" style="width:12.5%;background:var(--muted)"></div></div>
// //             </div>
// //           </div>
// //           <div class="competitor-row" style="background:var(--amber-bg)">
// //             <div class="comp-logo" style="background:var(--amber-bg);border-color:#F5D99A;color:var(--amber)">G</div>
// //             <div class="comp-info">
// //               <div class="comp-name">Google Workspace <span class="suggested-badge">New</span></div>
// //               <div class="comp-domain">workspace.google.com</div>
// //             </div>
// //             <div style="display:flex;gap:6px">
// //               <button class="btn-accept">Add</button>
// //               <button class="btn-ignore">Skip</button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <!-- Top recommendation preview -->
// //       <div class="panel">
// //         <div class="panel-header">
// //           <div class="panel-title">Top Recommendations</div>
// //           <div class="panel-action" onclick="showScreen('recommendations')">View all 8 →</div>
// //         </div>
// //         <div style="padding:16px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:14px">
// //           <div style="width:32px;height:32px;background:var(--red-bg);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0">🎯</div>
// //           <div style="flex:1">
// //             <div style="font-size:13px;font-weight:600;color:var(--ink);margin-bottom:2px">Publish "Notion vs Microsoft 365" comparison page</div>
// //             <div style="font-size:11px;color:var(--green);font-family:'JetBrains Mono',monospace">↑ Could convert 4 missed answers · Highest ROI action</div>
// //           </div>
// //           <span class="diff-badge diff-med">Medium</span>
// //         </div>
// //         <div style="padding:16px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:14px">
// //           <div style="width:32px;height:32px;background:var(--green-bg);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0">⚡</div>
// //           <div style="flex:1">
// //             <div style="font-size:13px;font-weight:600;color:var(--ink);margin-bottom:2px">Create "Notion for Information Silos" content</div>
// //             <div style="font-size:11px;color:var(--green);font-family:'JetBrains Mono',monospace">↑ Zero competition · Uncontested prompt category</div>
// //           </div>
// //           <span class="diff-badge diff-low">Easy</span>
// //         </div>
// //         <div style="padding:16px 20px;display:flex;align-items:center;gap:14px">
// //           <div style="width:32px;height:32px;background:var(--blue-bg);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0">🧩</div>
// //           <div style="flex:1">
// //             <div style="font-size:13px;font-weight:600;color:var(--ink);margin-bottom:2px">Add SoftwareSuite schema linking all Notion products</div>
// //             <div style="font-size:11px;color:var(--green);font-family:'JetBrains Mono',monospace">↑ Unified entity signal across Calendar, Mail, AI</div>
// //           </div>
// //           <span class="diff-badge diff-low">Easy</span>
// //         </div>
// //       </div>
// //     </div>

// //     <!-- ══ VISIBILITY SCREEN ══ -->
// //     <div class="screen" id="screen-visibility">
// //       <div class="model-comparison">
// //         <div class="model-card gemini">
// //           <div class="model-name">Gemini</div>
// //           <div class="model-score">4<span>/8</span></div>
// //           <div class="model-sub">50% brand presence</div>
// //         </div>
// //         <div class="model-card chatgpt">
// //           <div class="model-name">ChatGPT (GPT-4o)</div>
// //           <div class="model-score">4<span>/8</span></div>
// //           <div class="model-sub">50% brand presence</div>
// //         </div>
// //         <div class="model-card perplexity" style="opacity:0.6">
// //           <div class="model-name">Perplexity</div>
// //           <div class="locked-overlay" style="padding:0;margin-top:4px">
// //             <div class="lock-icon">🔒</div>
// //             <div class="lock-text">Upgrade to Pro to track Perplexity</div>
// //             <button class="btn btn-primary btn-sm">Upgrade</button>
// //           </div>
// //         </div>
// //       </div>

// //       <div class="visibility-filters">
// //         <div class="filter-chip active">All Prompts (8)</div>
// //         <div class="filter-chip">Wins (1)</div>
// //         <div class="filter-chip">Shared (3)</div>
// //         <div class="filter-chip">Missed (4)</div>
// //       </div>

// //       <div class="panel">
// //         <div class="panel-header">
// //           <div class="panel-title">Prompt-Level Visibility</div>
// //           <div class="panel-action">8 prompts tracked</div>
// //         </div>
// //         <div class="prompt-detail-row">
// //           <div class="prompt-detail-main" style="grid-template-columns:1fr 90px 90px 100px">
// //             <div>
// //               <div class="prompt-q">What are the leading all-in-one AI workspace platforms?</div>
// //               <div class="prompt-q-sub">notion.so → score: 0.81</div>
// //             </div>
// //             <div class="model-cell"><span class="mention-yes">✓</span></div>
// //             <div class="model-cell"><span class="mention-yes">✓</span></div>
// //             <div><span class="status-pill pill-shared">⚡ Shared</span></div>
// //           </div>
// //         </div>
// //         <div class="prompt-detail-row">
// //           <div class="prompt-detail-main" style="grid-template-columns:1fr 90px 90px 100px">
// //             <div>
// //               <div class="prompt-q">Compare top AI-powered platforms for project management</div>
// //               <div class="prompt-q-sub">notion.so/product → score: 0.63</div>
// //             </div>
// //             <div class="model-cell"><span class="mention-no">✗</span></div>
// //             <div class="model-cell"><span class="mention-no">✗</span></div>
// //             <div><span class="status-pill pill-missed">✗ Missed</span></div>
// //           </div>
// //         </div>
// //         <div class="prompt-detail-row">
// //           <div class="prompt-detail-main" style="grid-template-columns:1fr 90px 90px 100px">
// //             <div>
// //               <div class="prompt-q">How can I consolidate my team's disparate tools?</div>
// //               <div class="prompt-q-sub">notion.so → score: 0.50</div>
// //             </div>
// //             <div class="model-cell"><span class="mention-yes">✓</span></div>
// //             <div class="model-cell"><span class="mention-yes">✓</span></div>
// //             <div><span class="status-pill pill-shared">⚡ Shared</span></div>
// //           </div>
// //         </div>
// //         <div class="prompt-detail-row">
// //           <div class="prompt-detail-main" style="grid-template-columns:1fr 90px 90px 100px">
// //             <div>
// //               <div class="prompt-q">Platform with intelligent calendar + email + PM</div>
// //               <div class="prompt-q-sub">notion.so/product/calendar → score: 0.61</div>
// //             </div>
// //             <div class="model-cell"><span class="mention-no">✗</span></div>
// //             <div class="model-cell"><span class="mention-no">✗</span></div>
// //             <div><span class="status-pill pill-missed">✗ Missed</span></div>
// //           </div>
// //         </div>
// //         <div class="prompt-detail-row">
// //           <div class="prompt-detail-main" style="grid-template-columns:1fr 90px 90px 100px">
// //             <div>
// //               <div class="prompt-q">Best AI tools for automatically summarizing meetings</div>
// //               <div class="prompt-q-sub">notion.so/product/ai → score: 0.80</div>
// //             </div>
// //             <div class="model-cell"><span class="mention-no">✗</span></div>
// //             <div class="model-cell"><span class="mention-no">✗</span></div>
// //             <div><span class="status-pill pill-missed">✗ Missed</span></div>
// //           </div>
// //         </div>
// //         <div class="prompt-detail-row">
// //           <div class="prompt-detail-main" style="grid-template-columns:1fr 90px 90px 100px">
// //             <div>
// //               <div class="prompt-q">My team is struggling with information silos</div>
// //               <div class="prompt-q-sub">notion.so → score: 0.69</div>
// //             </div>
// //             <div class="model-cell"><span class="mention-no">✗</span></div>
// //             <div class="model-cell"><span class="mention-no">✗</span></div>
// //             <div><span class="status-pill pill-missed">✗ Missed</span></div>
// //           </div>
// //         </div>
// //         <div class="prompt-detail-row">
// //           <div class="prompt-detail-main" style="grid-template-columns:1fr 90px 90px 100px">
// //             <div>
// //               <div class="prompt-q">For a small business looking to replace multiple SaaS</div>
// //               <div class="prompt-q-sub">notion.so/product → score: 0.80</div>
// //             </div>
// //             <div class="model-cell"><span class="mention-yes">✓</span></div>
// //             <div class="model-cell"><span class="mention-yes">✓</span></div>
// //             <div><span class="status-pill pill-win">★ Win</span></div>
// //           </div>
// //         </div>
// //         <div class="prompt-detail-row">
// //           <div class="prompt-detail-main" style="grid-template-columns:1fr 90px 90px 100px">
// //             <div>
// //               <div class="prompt-q">Platforms with deep integration across docs, projects, search</div>
// //               <div class="prompt-q-sub">notion.so/product/ai → score: 0.65</div>
// //             </div>
// //             <div class="model-cell"><span class="mention-yes">✓</span></div>
// //             <div class="model-cell"><span class="mention-yes">✓</span></div>
// //             <div><span class="status-pill pill-shared">⚡ Shared</span></div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>

// //     <!-- ══ COMPETITORS SCREEN ══ -->
// //     <div class="screen" id="screen-competitors">
// //       <div class="comp-suggestion-banner">
// //         <div class="suggestion-icon">💡</div>
// //         <div class="suggestion-text">
// //           <div class="suggestion-title">3 new competitors discovered in your last AI scan</div>
// //           <div class="suggestion-sub">Microsoft 365, Google Workspace, and Asana appeared in AI answers. Add them to track their visibility.</div>
// //         </div>
// //         <div class="suggestion-actions">
// //           <button class="btn btn-secondary btn-sm">Review All</button>
// //           <button class="btn btn-primary btn-sm">Add All</button>
// //         </div>
// //       </div>

// //       <div class="section-header">
// //         <div>
// //           <div class="section-title">Competitor Tracking</div>
// //           <div class="section-sub">5 confirmed · 3 pending review</div>
// //         </div>
// //         <button class="btn btn-secondary btn-sm">+ Add Manually</button>
// //       </div>

// //       <div class="panel">
// //         <div class="comp-full-row header">
// //           <div>Competitor</div>
// //           <div>Presence Rate</div>
// //           <div>Prompts Won</div>
// //           <div>Status</div>
// //           <div>Actions</div>
// //         </div>
// //         <div class="comp-full-row">
// //           <div style="display:flex;align-items:center;gap:10px">
// //             <div class="comp-logo">M</div>
// //             <div>
// //               <div class="comp-name">Microsoft 365</div>
// //               <div class="comp-domain">microsoft.com</div>
// //             </div>
// //           </div>
// //           <div style="font-size:13px;font-weight:600;color:var(--red);font-family:'JetBrains Mono',monospace">50%</div>
// //           <div style="font-size:13px;color:var(--ink2);font-family:'JetBrains Mono',monospace">4/8</div>
// //           <div><span class="status-pill pill-win" style="background:var(--green-bg);color:var(--green)">✓ Confirmed</span></div>
// //           <div><button class="copy-btn">Remove</button></div>
// //         </div>
// //         <div class="comp-full-row">
// //           <div style="display:flex;align-items:center;gap:10px">
// //             <div class="comp-logo">C</div>
// //             <div>
// //               <div class="comp-name">ClickUp</div>
// //               <div class="comp-domain">clickup.com</div>
// //             </div>
// //           </div>
// //           <div style="font-size:13px;font-weight:600;color:var(--amber);font-family:'JetBrains Mono',monospace">37.5%</div>
// //           <div style="font-size:13px;color:var(--ink2);font-family:'JetBrains Mono',monospace">3/8</div>
// //           <div><span class="status-pill pill-win" style="background:var(--green-bg);color:var(--green)">✓ Confirmed</span></div>
// //           <div><button class="copy-btn">Remove</button></div>
// //         </div>
// //         <div class="comp-full-row">
// //           <div style="display:flex;align-items:center;gap:10px">
// //             <div class="comp-logo">M</div>
// //             <div>
// //               <div class="comp-name">Monday.com</div>
// //               <div class="comp-domain">monday.com</div>
// //             </div>
// //           </div>
// //           <div style="font-size:13px;font-weight:600;color:var(--amber);font-family:'JetBrains Mono',monospace">37.5%</div>
// //           <div style="font-size:13px;color:var(--ink2);font-family:'JetBrains Mono',monospace">3/8</div>
// //           <div><span class="status-pill pill-win" style="background:var(--green-bg);color:var(--green)">✓ Confirmed</span></div>
// //           <div><button class="copy-btn">Remove</button></div>
// //         </div>
// //         <div class="comp-full-row suggested">
// //           <div style="display:flex;align-items:center;gap:10px">
// //             <div class="comp-logo" style="background:var(--amber-bg);border-color:#F5D99A;color:var(--amber)">G</div>
// //             <div>
// //               <div style="display:flex;align-items:center;gap:6px">
// //                 <div class="comp-name">Google Workspace</div>
// //                 <span class="suggested-badge">New</span>
// //               </div>
// //               <div class="comp-domain">workspace.google.com</div>
// //             </div>
// //           </div>
// //           <div style="font-size:12px;color:var(--muted);font-family:'JetBrains Mono',monospace">—</div>
// //           <div style="font-size:12px;color:var(--muted);font-family:'JetBrains Mono',monospace">—</div>
// //           <div><span class="status-pill" style="background:var(--amber-bg);color:var(--amber)">⏳ Pending</span></div>
// //           <div class="comp-actions">
// //             <button class="btn-accept">Accept</button>
// //             <button class="btn-ignore">Ignore</button>
// //           </div>
// //         </div>
// //         <div class="comp-full-row suggested">
// //           <div style="display:flex;align-items:center;gap:10px">
// //             <div class="comp-logo" style="background:var(--amber-bg);border-color:#F5D99A;color:var(--amber)">A</div>
// //             <div>
// //               <div style="display:flex;align-items:center;gap:6px">
// //                 <div class="comp-name">Asana</div>
// //                 <span class="suggested-badge">New</span>
// //               </div>
// //               <div class="comp-domain">asana.com</div>
// //             </div>
// //           </div>
// //           <div style="font-size:12px;color:var(--muted);font-family:'JetBrains Mono',monospace">—</div>
// //           <div style="font-size:12px;color:var(--muted);font-family:'JetBrains Mono',monospace">—</div>
// //           <div><span class="status-pill" style="background:var(--amber-bg);color:var(--amber)">⏳ Pending</span></div>
// //           <div class="comp-actions">
// //             <button class="btn-accept">Accept</button>
// //             <button class="btn-ignore">Ignore</button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>

// //     <!-- ══ RECOMMENDATIONS SCREEN ══ -->
// //     <div class="screen" id="screen-recommendations">
// //       <div class="section-header">
// //         <div>
// //           <div class="section-title">Recommendations</div>
// //           <div class="section-sub">8 actions · sorted by impact</div>
// //         </div>
// //       </div>
// //       <div class="rec-filters">
// //         <div class="filter-chip active">All (8)</div>
// //         <div class="filter-chip">Easy wins</div>
// //         <div class="filter-chip">Content</div>
// //         <div class="filter-chip">Schema</div>
// //         <div class="filter-chip">Technical</div>
// //       </div>

// //       <div class="rec-card">
// //         <div class="rec-num">01</div>
// //         <div>
// //           <div class="rec-title">Publish "Notion vs Microsoft 365" structured comparison page</div>
// //           <div class="rec-impact">↑ Converts up to 4 missed AI answers — highest single-page ROI</div>
// //           <div class="rec-desc">Microsoft 365 won 4 prompts where Notion was absent. A dedicated comparison page with explicit feature tables across calendar, email, AI, and PM formatted as FAQ blocks will directly contest these answers.</div>
// //           <div class="rec-example">"Create /notion-vs-microsoft-365 with H2 headers matching exact query patterns. Include side-by-side tables for: meeting notes, email AI, calendar integration, project management, and enterprise search."</div>
// //         </div>
// //         <div class="rec-meta">
// //           <span class="diff-badge diff-med">Medium</span>
// //           <span class="time-badge">2–4 weeks</span>
// //         </div>
// //       </div>

// //       <div class="rec-card">
// //         <div class="rec-num">02</div>
// //         <div>
// //           <div class="rec-title">Create "Notion for Information Silos" problem-aware content</div>
// //           <div class="rec-impact">↑ Captures uncontested prompt — zero competitors currently win this</div>
// //           <div class="rec-desc">No brand appeared for the "information silos" prompt. Notion's wiki + Enterprise Search + Slack integration makes it the natural answer. Publishing targeted content here is a clean win.</div>
// //           <div class="rec-example">"Guide titled: 'How to Eliminate Information Silos with a Connected Workspace'. Frame Notion wiki + Enterprise Search as the solution. Use H2 headers matching natural language patterns."</div>
// //         </div>
// //         <div class="rec-meta">
// //           <span class="diff-badge diff-low">Easy</span>
// //           <span class="time-badge">1–2 weeks</span>
// //         </div>
// //       </div>

// //       <div class="rec-card">
// //         <div class="rec-num">03</div>
// //         <div>
// //           <div class="rec-title">Optimize Notion AI Meeting Notes as standalone answer target</div>
// //           <div class="rec-impact">↑ Enters meeting summarization category — currently 0% presence</div>
// //           <div class="rec-desc">Dedicated /product/ai/meeting-notes page with explicit capability statements and Q&A schema markup. Microsoft Teams wins this prompt by default today.</div>
// //           <div class="rec-example">"Add FAQ schema: Q: 'Does Notion AI summarize meetings?' A: 'Yes — Notion AI automatically transcribes, summarizes, and extracts action items from meetings directly inside your workspace.'"</div>
// //         </div>
// //         <div class="rec-meta">
// //           <span class="diff-badge diff-low">Easy</span>
// //           <span class="time-badge">1–3 weeks</span>
// //         </div>
// //       </div>
// //     </div>

// //     <!-- ══ SCHEMA SCREEN ══ -->
// //     <div class="screen" id="screen-schema">
// //       <div class="section-header">
// //         <div>
// //           <div class="section-title">Schema Coverage</div>
// //           <div class="section-sub">9 schemas across 5 pages · 1 page failed</div>
// //         </div>
// //         <button class="btn btn-secondary btn-sm">Download All</button>
// //       </div>

// //       <div class="stats-grid" style="margin-bottom:20px">
// //         <div class="stat-card">
// //           <div class="stat-label">Pages Covered</div>
// //           <div class="stat-value">4<span style="font-size:16px;color:var(--muted)">/5</span></div>
// //           <div class="stat-change down">1 page failed (calendar)</div>
// //         </div>
// //         <div class="stat-card">
// //           <div class="stat-label">Schemas Generated</div>
// //           <div class="stat-value">9</div>
// //           <div class="stat-change up">✓ Ready to deploy</div>
// //         </div>
// //         <div class="stat-card">
// //           <div class="stat-label">Schema Types</div>
// //           <div class="stat-value">3</div>
// //           <div class="stat-change neutral">WebPage · SoftwareApp · Org</div>
// //         </div>
// //         <div class="stat-card">
// //           <div class="stat-label">Coverage Score</div>
// //           <div class="stat-value" style="color:var(--amber)">80%</div>
// //           <div class="stat-change down">1 failure reduces score</div>
// //         </div>
// //       </div>

// //       <div class="panel">
// //         <div class="schema-page-row header">
// //           <div>Page</div>
// //           <div>Schema Types</div>
// //           <div>Status</div>
// //           <div>Action</div>
// //         </div>
// //         <div class="schema-page-row">
// //           <div>
// //             <div class="page-title">Notion Home</div>
// //             <div class="page-url">notion.so</div>
// //           </div>
// //           <div>
// //             <div class="schema-types">
// //               <span class="schema-type-tag">WebPage</span>
// //               <span class="schema-type-tag">SoftwareApp</span>
// //               <span class="schema-type-tag">Organization</span>
// //             </div>
// //           </div>
// //           <div><span class="status-pill pill-win">✓ Generated</span></div>
// //           <div><button class="copy-btn">Copy JSON</button></div>
// //         </div>
// //         <div class="schema-page-row">
// //           <div>
// //             <div class="page-title">Product Overview</div>
// //             <div class="page-url">notion.so/product</div>
// //           </div>
// //           <div>
// //             <div class="schema-types">
// //               <span class="schema-type-tag">WebPage</span>
// //               <span class="schema-type-tag">SoftwareApp</span>
// //             </div>
// //           </div>
// //           <div><span class="status-pill pill-win">✓ Generated</span></div>
// //           <div><button class="copy-btn">Copy JSON</button></div>
// //         </div>
// //         <div class="schema-page-row">
// //           <div>
// //             <div class="page-title">Notion AI</div>
// //             <div class="page-url">notion.so/product/ai</div>
// //           </div>
// //           <div>
// //             <div class="schema-types">
// //               <span class="schema-type-tag">WebPage</span>
// //               <span class="schema-type-tag">SoftwareApp</span>
// //             </div>
// //           </div>
// //           <div><span class="status-pill pill-win">✓ Generated</span></div>
// //           <div><button class="copy-btn">Copy JSON</button></div>
// //         </div>
// //         <div class="schema-page-row" style="background:var(--red-bg)">
// //           <div>
// //             <div class="page-title">Notion Calendar</div>
// //             <div class="page-url">notion.so/product/calendar</div>
// //           </div>
// //           <div>
// //             <div class="schema-types">
// //               <span class="schema-type-tag fail">✗ Failed</span>
// //             </div>
// //           </div>
// //           <div><span class="status-pill pill-missed">✗ Error</span></div>
// //           <div><button class="btn btn-primary btn-sm">Retry</button></div>
// //         </div>
// //         <div class="schema-page-row">
// //           <div>
// //             <div class="page-title">Notion Mail</div>
// //             <div class="page-url">notion.so/product/mail</div>
// //           </div>
// //           <div>
// //             <div class="schema-types">
// //               <span class="schema-type-tag">WebPage</span>
// //               <span class="schema-type-tag">SoftwareApp</span>
// //             </div>
// //           </div>
// //           <div><span class="status-pill pill-win">✓ Generated</span></div>
// //           <div><button class="copy-btn">Copy JSON</button></div>
// //         </div>
// //       </div>
// //     </div>

// //     <!-- ══ SETTINGS SCREEN ══ -->
// //     <div class="screen" id="screen-settings">
// //       <div class="settings-grid">
// //         <div class="settings-nav">
// //           <div class="settings-nav-item active">Project</div>
// //           <div class="settings-nav-item">Pipeline Schedule</div>
// //           <div class="settings-nav-item">Notifications</div>
// //           <div class="settings-nav-item">Plan & Billing</div>
// //           <div class="settings-nav-item">API Keys</div>
// //         </div>

// //         <div class="settings-panel">
// //           <div class="settings-section">
// //             <div class="settings-section-title">Project Details</div>
// //             <div class="settings-section-desc">Basic information about your tracked brand</div>
// //             <div class="form-row">
// //               <div class="form-field">
// //                 <div class="form-label">Brand Name</div>
// //                 <input class="form-input" value="Notion" />
// //               </div>
// //               <div class="form-field">
// //                 <div class="form-label">Website URL</div>
// //                 <input class="form-input" value="https://notion.so" />
// //               </div>
// //             </div>
// //             <div class="form-row">
// //               <div class="form-field">
// //                 <div class="form-label">Industry</div>
// //                 <input class="form-input" value="Productivity Software" />
// //               </div>
// //               <div class="form-field">
// //                 <div class="form-label">Pages to Crawl</div>
// //                 <input class="form-input" value="10" />
// //               </div>
// //             </div>
// //             <button class="btn btn-primary btn-sm">Save Changes</button>
// //           </div>

// //           <div class="settings-section">
// //             <div class="settings-section-title">Pipeline Schedule</div>
// //             <div class="settings-section-desc">Control how often TecSaro runs your AEO analysis</div>
// //             <div class="toggle-row">
// //               <div class="toggle-info">
// //                 <div class="toggle-title">Automatic visibility runs</div>
// //                 <div class="toggle-desc">Runs every 7 days automatically · Starter plan</div>
// //               </div>
// //               <div class="toggle on"></div>
// //             </div>
// //             <div class="toggle-row">
// //               <div class="toggle-info">
// //                 <div class="toggle-title">Email report after each run</div>
// //                 <div class="toggle-desc">Get a summary email when new results are ready</div>
// //               </div>
// //               <div class="toggle on"></div>
// //             </div>
// //             <div class="toggle-row">
// //               <div class="toggle-info">
// //                 <div class="toggle-title">Manual run button</div>
// //                 <div class="toggle-desc">🔒 Available on Pro plan only</div>
// //               </div>
// //               <div class="toggle" style="opacity:0.4;cursor:not-allowed"></div>
// //             </div>
// //           </div>

// //           <div class="settings-section">
// //             <div class="settings-section-title">Plan & Usage</div>
// //             <div class="settings-section-desc">Your current plan and resource usage</div>
// //             <div class="plan-box" style="margin-bottom:16px">
// //               <div>
// //                 <div class="plan-box-name">Starter</div>
// //                 <div class="plan-box-price">$79/month · renews Mar 23, 2026</div>
// //               </div>
// //               <button class="btn btn-primary btn-sm">Upgrade to Pro</button>
// //             </div>
// //             <div class="usage-bars">
// //               <div class="usage-item">
// //                 <div class="usage-label">
// //                   <span class="usage-name">Prompts tracked</span>
// //                   <span class="usage-val">8 / 20</span>
// //                 </div>
// //                 <div class="usage-track"><div class="usage-fill" style="width:40%"></div></div>
// //               </div>
// //               <div class="usage-item">
// //                 <div class="usage-label">
// //                   <span class="usage-name">Pages crawled</span>
// //                   <span class="usage-val">5 / 10</span>
// //                 </div>
// //                 <div class="usage-track"><div class="usage-fill" style="width:50%"></div></div>
// //               </div>
// //               <div class="usage-item">
// //                 <div class="usage-label">
// //                   <span class="usage-name">Competitors tracked</span>
// //                   <span class="usage-val">5 / 5</span>
// //                 </div>
// //                 <div class="usage-track"><div class="usage-fill warn" style="width:100%"></div></div>
// //               </div>
// //               <div class="usage-item">
// //                 <div class="usage-label">
// //                   <span class="usage-name">Pipeline runs this month</span>
// //                   <span class="usage-val">2 / 4</span>
// //                 </div>
// //                 <div class="usage-track"><div class="usage-fill" style="width:50%"></div></div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>

// //   </div><!-- /content -->
// // </main>

// // <script>
// // const screens = {
// //   overview: { title: 'Overview', sub: 'notion.so · Last run Feb 23, 2026' },
// //   visibility: { title: 'Visibility Tracking', sub: 'notion.so · 8 prompts · 2 models active' },
// //   competitors: { title: 'Competitors', sub: '5 confirmed · 3 pending review' },
// //   recommendations: { title: 'Recommendations', sub: '8 actions · sorted by impact' },
// //   schema: { title: 'Schema', sub: '9 schemas · 4/5 pages covered' },
// //   settings: { title: 'Settings', sub: 'Project configuration & billing' }
// // }

// // function showScreen(name) {
// //   // Hide all
// //   document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'))
// //   document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'))

// //   // Show target
// //   document.getElementById('screen-' + name).classList.add('active')

// //   // Update topbar
// //   document.getElementById('topbar-title').textContent = screens[name].title
// //   document.getElementById('topbar-sub').textContent = screens[name].sub

// //   // Highlight nav
// //   const navItems = document.querySelectorAll('.nav-item')
// //   navItems.forEach(item => {
// //     if (item.getAttribute('onclick') && item.getAttribute('onclick').includes(name)) {
// //       item.classList.add('active')
// //     }
// //   })
// // }

// // // Toggle interactions
// // document.querySelectorAll('.toggle').forEach(t => {
// //   if (!t.style.cursor || t.style.cursor !== 'not-allowed') {
// //     t.addEventListener('click', () => t.classList.toggle('on'))
// //   }
// // })

// // // Filter chips
// // document.querySelectorAll('.filter-chip').forEach(chip => {
// //   chip.addEventListener('click', function() {
// //     this.closest('.visibility-filters, .rec-filters')
// //       ?.querySelectorAll('.filter-chip')
// //       .forEach(c => c.classList.remove('active'))
// //     this.classList.add('active')
// //   })
// // })

// // // Accept/ignore buttons
// // document.querySelectorAll('.btn-accept').forEach(btn => {
// //   btn.addEventListener('click', function() {
// //     const row = this.closest('.comp-full-row, .competitor-row')
// //     if (row) {
// //       row.style.background = 'var(--green-bg)'
// //       row.style.opacity = '0.6'
// //       setTimeout(() => row.remove(), 600)
// //     }
// //   })
// // })

// // document.querySelectorAll('.btn-ignore').forEach(btn => {
// //   btn.addEventListener('click', function() {
// //     const row = this.closest('.comp-full-row, .competitor-row')
// //     if (row) {
// //       row.style.opacity = '0.3'
// //       setTimeout(() => row.remove(), 400)
// //     }
// //   })
// // })
// // </script>
// // </body>
// // </html>



// "use client"

// import { useState } from "react"
// import { User, Bell, Shield, CreditCard, Key, CalendarClock } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { ProfileSettings }       from "@/components/settings/profileSettings"
// import { NotificationsSettings } from "@/components/settings/notificationsSettings"
// import { SecuritySettings }      from "@/components/settings/securitySettings"
// import { PipelineSettings }      from "@/components/settings/pipelineSettings"

// // ── Inline stubs for Billing + API tabs ───────────────────────────────────
// // (full BillingPage already lives at /app/billing/page.tsx)
// function BillingSettings() {
//   return (
//     <div className="space-y-4">
//       <div>
//         <h2 className="font-heading text-lg font-semibold text-charcoal mb-0.5">Plan & Billing</h2>
//         <p className="text-sm text-graphite">Manage your subscription and invoices</p>
//       </div>
//       <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-200 rounded-xl gap-3">
//         <p className="text-sm text-graphite">Billing is managed on its own page</p>
//         <a href="/billing"
//           className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald text-white text-sm font-semibold hover:bg-emerald/90 transition-colors">
//           Open Billing Page →
//         </a>
//       </div>
//     </div>
//   )
// }

// function ApiKeysSettings() {
//   return (
//     <div className="space-y-4">
//       <div>
//         <h2 className="font-heading text-lg font-semibold text-charcoal mb-0.5">API Keys</h2>
//         <p className="text-sm text-graphite">
//           Keys are stored securely in your server environment — never in the browser
//         </p>
//       </div>
//       <div className="border border-gray-200 rounded-xl overflow-hidden">
//         {[
//           { name: "Gemini API Key",      env: "GEMINI_API_KEY",      plan: "all"     },
//           { name: "OpenAI API Key",       env: "OPENAI_API_KEY",      plan: "all"     },
//           { name: "Perplexity API Key",   env: "PERPLEXITY_API_KEY",  plan: "pro"     },
//         ].map((k, i, arr) => (
//           <div key={k.env}
//             className={cn(
//               "flex items-center justify-between px-5 py-3.5",
//               i < arr.length - 1 && "border-b border-gray-100"
//             )}>
//             <div>
//               <p className="text-sm font-medium text-charcoal">{k.name}</p>
//               {k.plan === "pro" && (
//                 <span className="text-[10px] font-mono font-bold text-violet bg-violet/10 px-1.5 py-0.5 rounded-full">
//                   PRO
//                 </span>
//               )}
//             </div>
//             <code className="text-xs font-mono text-graphite bg-gray-100 border border-gray-200 px-2.5 py-1.5 rounded-lg">
//               {k.env}
//             </code>
//           </div>
//         ))}
//       </div>
//       <p className="text-xs text-graphite/60 leading-relaxed">
//         Add these to your{" "}
//         <code className="bg-gray-100 px-1 rounded font-mono">.env.local</code> file and redeploy.
//         Keys are never stored in Supabase or exposed to the client.
//       </p>
//     </div>
//   )
// }

// // ── Tab config ─────────────────────────────────────────────────────────────
// type Tab = "profile" | "pipeline" | "notifications" | "security" | "billing" | "api"

// const TABS: { key: Tab; label: string; icon: React.ElementType }[] = [
//   { key: "profile",       label: "Profile",        icon: User         },
//   { key: "pipeline",      label: "Pipeline",       icon: CalendarClock },
//   { key: "notifications", label: "Notifications",  icon: Bell         },
//   { key: "security",      label: "Security",       icon: Shield       },
//   { key: "billing",       label: "Plan & Billing", icon: CreditCard   },
//   { key: "api",           label: "API Keys",       icon: Key          },
// ]

// // ── Page ───────────────────────────────────────────────────────────────────
// export default function SettingsPage() {
//   const [activeTab, setActiveTab] = useState<Tab>("profile")

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Topbar */}
//       <div className="h-16 bg-white border-b border-gray-200 px-6 flex items-center shrink-0">
//         <div>
//           <h1 className="font-heading text-base font-bold text-charcoal tracking-tight">Settings</h1>
//           <p className="text-xs text-graphite font-mono">Manage your account and preferences</p>
//         </div>
//       </div>

//       <div className="p-6">
//         <div className="flex flex-col lg:flex-row gap-6 max-w-5xl">

//           {/* Left nav */}
//           <div className="lg:w-52 shrink-0">
//             <nav className="space-y-0.5">
//               {TABS.map(tab => (
//                 <button
//                   key={tab.key}
//                   onClick={() => setActiveTab(tab.key)}
//                   className={cn(
//                     "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors text-left",
//                     activeTab === tab.key
//                       ? "bg-emerald/10 text-emerald font-semibold"
//                       : "text-graphite hover:bg-gray-100 hover:text-charcoal"
//                   )}
//                 >
//                   <tab.icon className={cn("h-4 w-4 shrink-0",
//                     activeTab === tab.key ? "text-emerald" : "text-graphite/70"
//                   )} />
//                   {tab.label}
//                 </button>
//               ))}
//             </nav>
//           </div>

//           {/* Content panel */}
//           <div className="flex-1 bg-white border border-gray-200 rounded-xl p-6 shadow-sm min-h-[500px]">
//             {activeTab === "profile"       && <ProfileSettings />}
//             {activeTab === "pipeline"      && <PipelineSettings />}
//             {activeTab === "notifications" && <NotificationsSettings />}
//             {activeTab === "security"      && <SecuritySettings />}
//             {activeTab === "billing"       && <BillingSettings />}
//             {activeTab === "api"           && <ApiKeysSettings />}
//           </div>

//         </div>
//       </div>
//     </div>
//   )
// }



"use client"

import { useState } from "react"
import { User, Bell, Shield, CreditCard, CalendarClock } from "lucide-react"
import { ProfileSettings }       from "@/components/settings/profileSettings"
import { NotificationsSettings } from "@/components/settings/notificationsSettings"
import { SecuritySettings }      from "@/components/settings/securitySettings"
import { PipelineSettings }      from "@/components/settings/pipelineSettings"



// ── Tab config — API Keys removed ─────────────────────────────────────────
type Tab = "profile" | "pipeline" | "notifications" | "security" |"billing"

const TABS: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: "profile",       label: "Profile",        icon: User          },
  { key: "pipeline",      label: "Pipeline",       icon: CalendarClock },
  { key: "notifications", label: "Notifications",  icon: Bell          },
  { key: "security",      label: "Security",       icon: Shield        },
  
]

// ── Page ───────────────────────────────────────────────────────────────────
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile")

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F9FAFB" }}>

      
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6 max-w-5xl">

          {/* Left nav */}
          <div className="lg:w-52 shrink-0">
            <nav className="space-y-0.5">
              {TABS.map(tab => {
                const isActive = activeTab === tab.key
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors text-left"
                    style={{
                      backgroundColor: isActive ? "rgba(15,191,154,0.1)" : "transparent",
                      color: isActive ? "#0FBF9A" : "#374151",
                      fontWeight: isActive ? 600 : 500,
                    }}
                    onMouseEnter={e => {
                      if (!isActive) e.currentTarget.style.backgroundColor = "#F3F4F6"
                    }}
                    onMouseLeave={e => {
                      if (!isActive) e.currentTarget.style.backgroundColor = "transparent"
                    }}
                  >
                    <tab.icon
                      className="h-4 w-4 shrink-0"
                      style={{ color: isActive ? "#0FBF9A" : "#6B7280" }}
                    />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Content panel */}
          <div
            className="flex-1 rounded-xl p-6 shadow-sm min-h-[500px] border"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}
          >
            {activeTab === "profile"       && <ProfileSettings />}
            {activeTab === "pipeline"      && <PipelineSettings />}
            {activeTab === "notifications" && <NotificationsSettings />}
            {activeTab === "security"      && <SecuritySettings />}
            {activeTab === "billing"       && <BillingSettings />}
          </div>

        </div>
      </div>
    </div>
  )
}