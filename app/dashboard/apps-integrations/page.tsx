// "use client"

// import { useEffect, useState } from "react"
// import { supabaseBrowser } from "@/lib/supabaseClient"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { CheckCircle, Plug, RefreshCcw, AlertCircle } from "lucide-react"

// type IntegrationStatus = "connected" | "not_connected" | "error"

// export default function AppsIntegrationsPage() {
//   const [googleStatus, setGoogleStatus] = useState<IntegrationStatus>("not_connected")
//   const [loading, setLoading] = useState(false)

//   // ============================
//   // CHECK INTEGRATION STATUS
//   // ============================
//   useEffect(() => {
//     const checkStatus = async () => {
//       const { data: sessionData } = await supabaseBrowser.auth.getSession()
//       if (!sessionData.session) return

//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/integrations/status`,
//         {
//           headers: {
//             Authorization: `Bearer ${sessionData.session.access_token}`,
//           },
//         }
//       )

//       const data = await res.json()
//       if (data.google) setGoogleStatus("connected")
//     }

//     checkStatus()
//   }, [])

//   // ============================
//   // CONNECT GOOGLE
//   // ============================
//   const connectGoogle = async () => {
//     setLoading(true)
//     const { data } = await supabaseBrowser.auth.getSession()

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/google/connect`,
//       {
//         headers: {
//           Authorization: `Bearer ${data.session.access_token}`,
//         },
//       }
//     )

//     const { url } = await res.json()
//     window.location.href = url
//   }

//   // ============================
//   // RECONNECT GOOGLE
//   // ============================
//   const reconnectGoogle = async () => {
//     await connectGoogle()
//   }

//   return (
//     <div className="p-8 space-y-8">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold text-white">Apps & Integrations</h1>
//         <p className="text-gray-400 mt-1">
//           Connect external services to unlock automation and AI insights
//         </p>
//       </div>

//       {/* Integrations Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

//         {/* GOOGLE SEARCH CONSOLE */}
//         <Card className="p-6 bg-charcoal border border-white/10">
//           <div className="flex items-start justify-between">
//             <div className="space-y-1">
//               <h2 className="text-white font-semibold">
//                 Google Search Console
//               </h2>
//               <p className="text-sm text-gray-400">
//                 Fetch search queries, clicks, impressions and AI SEO insights
//               </p>
//             </div>

//             {googleStatus === "connected" ? (
//               <CheckCircle className="text-emerald h-5 w-5" />
//             ) : googleStatus === "error" ? (
//               <AlertCircle className="text-red-500 h-5 w-5" />
//             ) : (
//               <Plug className="text-gray-500 h-5 w-5" />
//             )}
//           </div>

//           <div className="mt-6 flex gap-3">
//             {googleStatus === "connected" ? (
//               <>
//                 <Button
//                   variant="outline"
//                   onClick={reconnectGoogle}
//                   className="flex gap-2"
//                 >
//                   <RefreshCcw className="h-4 w-4" />
//                   Reconnect
//                 </Button>
//               </>
//             ) : (
//               <Button
//                 onClick={connectGoogle}
//                 disabled={loading}
//                 className="bg-emerald text-black"
//               >
//                 {loading ? "Connecting..." : "Connect"}
//               </Button>
//             )}
//           </div>
//         </Card>

//         {/* PLACEHOLDER FOR FUTURE INTEGRATIONS */}
//         <Card className="p-6 bg-charcoal border border-white/10 opacity-60">
//           <h2 className="text-white font-semibold">Google Analytics</h2>
//           <p className="text-sm text-gray-400 mt-1">
//             Coming soon
//           </p>
//         </Card>

//         <Card className="p-6 bg-charcoal border border-white/10 opacity-60">
//           <h2 className="text-white font-semibold">Shopify</h2>
//           <p className="text-sm text-gray-400 mt-1">
//             Coming soon
//           </p>
//         </Card>

//         <Card className="p-6 bg-charcoal border border-white/10 opacity-60">
//           <h2 className="text-white font-semibold">WordPress</h2>
//           <p className="text-sm text-gray-400 mt-1">
//             Coming soon
//           </p>
//         </Card>

//       </div>
//     </div>
//   )
// }





// "use client"

// import { useEffect, useState } from "react"
// import { supabaseBrowser } from "@/lib/supabaseClient"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import {
//   CheckCircle,
//   Plug,
//   RefreshCcw,
//   AlertTriangle,
//   Zap,
// } from "lucide-react"

// type GoogleStatus = "connected" | "not_connected" | "error"

// export default function AppsIntegrationsPage() {
//   const [googleStatus, setGoogleStatus] = useState<GoogleStatus>("not_connected")
//   const [loading, setLoading] = useState(false)

//   // ==========================
//   // CHECK INTEGRATION STATUS
//   // ==========================
// // ==========================
// // CHECK INTEGRATION STATUS
// // ==========================
// useEffect(() => {
//   const checkStatus = async () => {
//     const { data } = await supabaseBrowser.auth.getSession()
//     if (!data.session) return

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/integrations/status`,
//       {
//         headers: {
//           Authorization: `Bearer ${data.session.access_token}`,
//         },
//       }
//     )

//     const json = await res.json()
//     if (json.google) setGoogleStatus("connected")
//   }

//   checkStatus()
// }, [])

// // ==========================
// // CONNECT GOOGLE
// // ==========================
// const connectGoogle = async () => {
//   setLoading(true)

//   const { data } = await supabaseBrowser.auth.getSession()
//   if (!data.session) throw new Error("User not authenticated")

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/google/connect`,
//     {
//       headers: {
//         Authorization: `Bearer ${data.session.access_token}`,
//       },
//     }
//   )

//   const { url } = await res.json()
//   window.location.href = url
// }

//   return (
//     <div className="p-8 space-y-8">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold text-white">Apps & Integrations</h1>
//         <p className="text-gray-400 mt-1">
//           Connect your tools to unlock automation & AI insights
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

//         {/* GOOGLE SERVICES */}
//         <Card className="p-6 bg-charcoal border border-white/10">
//           <div className="flex items-start justify-between">
//             <div>
//               <h2 className="text-white font-semibold">Google Services</h2>
//               <p className="text-sm text-gray-400 mt-1">
//                 One connection for all Google SEO APIs
//               </p>
//             </div>

//             {googleStatus === "connected" ? (
//               <CheckCircle className="h-5 w-5 text-emerald" />
//             ) : googleStatus === "error" ? (
//               <AlertTriangle className="h-5 w-5 text-red-500" />
//             ) : (
//               <Plug className="h-5 w-5 text-gray-500" />
//             )}
//           </div>

//           {/* Services list */}
//           <ul className="mt-4 space-y-2 text-sm">
//             <li className="flex items-center gap-2 text-gray-300">
//               <CheckCircle className="h-4 w-4 text-emerald" />
//               Search Console API
//             </li>
//             <li className="flex items-center gap-2 text-gray-300">
//               <CheckCircle className="h-4 w-4 text-emerald" />
//               Analytics API (GA4)
//             </li>
//             <li className="flex items-center gap-2 text-gray-300">
//               <CheckCircle className="h-4 w-4 text-emerald" />
//               PageSpeed Insights API
//             </li>
//             <li className="flex items-center gap-2 text-emerald">
//               <Zap className="h-4 w-4" />
//               Indexing API (instant indexing)
//             </li>
//           </ul>

//           {/* Actions */}
//           <div className="mt-6 flex gap-3">
//             {googleStatus === "connected" ? (
//               <Button variant="outline" onClick={connectGoogle}>

//                 <RefreshCcw className="h-4 w-4 mr-2" />
//                 Reconnect Google
//               </Button>
//             ) : (
//               <Button
//                 onClick={connectGoogle}
//                 disabled={loading}
//                 className="bg-emerald text-black"
//               >
//                 {loading ? "Connecting..." : "Connect Google"}
//               </Button>
//             )}
//           </div>
//         </Card>

//         {/* FUTURE INTEGRATIONS */}
//         <Card className="p-6 bg-charcoal border border-white/10 opacity-60">
//           <h2 className="text-white font-semibold">Shopify</h2>
//           <p className="text-sm text-gray-400 mt-1">
//             Sync products & SEO automatically
//           </p>
//         </Card>

//         <Card className="p-6 bg-charcoal border border-white/10 opacity-60">
//           <h2 className="text-white font-semibold">WordPress</h2>
//           <p className="text-sm text-gray-400 mt-1">
//             Publish & optimize content with AI
//           </p>
//         </Card>

//       </div>
//     </div>
//   )
// }


// "use client"

// import { useEffect, useState } from "react"
// import { supabaseBrowser } from "@/lib/supabaseClient"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import {
//   CheckCircle,
//   Plug,
//   RefreshCcw,
//   AlertTriangle,
//   Zap,
// } from "lucide-react"

// type GoogleStatus = "connected" | "not_connected" | "error"

// export default function AppsIntegrationsPage() {
//   const [googleStatus, setGoogleStatus] = useState<GoogleStatus>("not_connected")
//   const [loading, setLoading] = useState(false)

//   const [gaProperties, setGaProperties] = useState<any[]>([])
//   const [selectedGA, setSelectedGA] = useState<string>("")
//   const [gaConfigured, setGaConfigured] = useState(false)

//   // ==========================
//   // CHECK INTEGRATION STATUS
//   // ==========================
//   useEffect(() => {
//     const checkStatus = async () => {
//       const { data } = await supabaseBrowser.auth.getSession()
//       if (!data.session) return

//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/integrations/status`,
//           {
//             headers: {
//               Authorization: `Bearer ${data.session.access_token}`,
//             },
//           }
//         )

//         const json = await res.json()
//         if (json.google) {
//           setGoogleStatus("connected")
//           fetchGAProperties()
//         } else {
//           setGoogleStatus("not_connected")
//         }
//       } catch {
//         setGoogleStatus("error")
//       }
//     }

//     checkStatus()
//   }, [])

//   // ==========================
//   // CONNECT GOOGLE
//   // ==========================
//   const connectGoogle = async () => {
//     setLoading(true)
//     const { data } = await supabaseBrowser.auth.getSession()
//     if (!data.session) return

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/google/connect`,
//       {
//         headers: {
//           Authorization: `Bearer ${data.session.access_token}`,
//         },
//       }
//     )

//     const { url } = await res.json()
//     window.location.href = url
//   }

//   // ==========================
//   // FETCH GA PROPERTIES
//   // ==========================
//   const fetchGAProperties = async () => {
//     const { data } = await supabaseBrowser.auth.getSession()
//     if (!data.session) return

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/google/ga-properties`,
//       {
//         headers: {
//           Authorization: `Bearer ${data.session.access_token}`,
//         },
//       }
//     )

//     const json = await res.json()
//     setGaProperties(json.properties || [])
//   }

//   // ==========================
//   // SAVE GA PROPERTY TO PLAN
//   // ==========================
//   const saveGAProperty = async (propertyId: string) => {
//     setSelectedGA(propertyId)
//     const { data } = await supabaseBrowser.auth.getSession()
//     if (!data.session) return

//     // ⚠️ Replace planId with your active plan id
//     const planId = localStorage.getItem("active_plan_id")

//     await fetch(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/plans/${planId}/ga-property`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${data.session.access_token}`,
//         },
//         body: JSON.stringify({ ga_property_id: propertyId }),
//       }
//     )

//     setGaConfigured(true)
//   }

//   return (
//     <div className="p-8 space-y-8">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold text-white">Apps & Integrations</h1>
//         <p className="text-gray-400 mt-1">
//           Connect your tools to unlock automation & AI insights
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

//         {/* GOOGLE SERVICES */}
//         <Card className="p-6 bg-charcoal border border-white/10">
//           <div className="flex items-start justify-between">
//             <div>
//               <h2 className="text-white font-semibold">Google Services</h2>
//               <p className="text-sm text-gray-400 mt-1">
//                 Search Console, Analytics, PageSpeed & Indexing
//               </p>
//             </div>

//             {googleStatus === "connected" ? (
//               <CheckCircle className="h-5 w-5 text-emerald" />
//             ) : googleStatus === "error" ? (
//               <AlertTriangle className="h-5 w-5 text-red-500" />
//             ) : (
//               <Plug className="h-5 w-5 text-gray-500" />
//             )}
//           </div>

//           {/* Services list */}
//           <ul className="mt-4 space-y-2 text-sm">
//             <li className="flex items-center gap-2 text-gray-300">
//               <CheckCircle className="h-4 w-4 text-emerald" />
//               Search Console API
//             </li>
//             <li className="flex items-center gap-2 text-gray-300">
//               <CheckCircle className="h-4 w-4 text-emerald" />
//               Analytics API (GA4)
//             </li>
//             <li className="flex items-center gap-2 text-gray-300">
//               <CheckCircle className="h-4 w-4 text-emerald" />
//               PageSpeed Insights
//             </li>
//             <li className="flex items-center gap-2 text-emerald">
//               <Zap className="h-4 w-4" />
//               Indexing API
//             </li>
//           </ul>

//           {/* GA PROPERTY SELECTOR */}
//           {googleStatus === "connected" && !gaConfigured && (
//             <div className="mt-4">
//               <label className="text-sm text-gray-400">
//                 Select GA4 Property
//               </label>

//               <select
//                 className="mt-2 w-full bg-black border border-white/10 text-white p-2 rounded"
//                 onChange={(e) => saveGAProperty(e.target.value)}
//               >
//                 <option value="">Select property</option>
//                 {gaProperties.map((p) => (
//                   <option key={p.propertyId} value={p.propertyId}>
//                     {p.displayName}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}

//           {/* Status */}
//           {gaConfigured && (
//             <p className="mt-3 text-emerald text-sm">
//               ✅ Google Analytics connected
//             </p>
//           )}

//           {/* Actions */}
//           <div className="mt-6 flex gap-3">
//             {googleStatus === "connected" ? (
//               <Button variant="outline" onClick={connectGoogle}>
//                 <RefreshCcw className="h-4 w-4 mr-2" />
//                 Reconnect Google
//               </Button>
//             ) : (
//               <Button
//                 onClick={connectGoogle}
//                 disabled={loading}
//                 className="bg-emerald text-black"
//               >
//                 {loading ? "Connecting..." : "Connect Google"}
//               </Button>
//             )}
//           </div>
//         </Card>

//         {/* FUTURE */}
//         <Card className="p-6 bg-charcoal border border-white/10 opacity-60">
//           <h2 className="text-white font-semibold">Shopify</h2>
//           <p className="text-sm text-gray-400 mt-1">
//             Sync products & SEO automatically
//           </p>
//         </Card>

//         <Card className="p-6 bg-charcoal border border-white/10 opacity-60">
//           <h2 className="text-white font-semibold">WordPress</h2>
//           <p className="text-sm text-gray-400 mt-1">
//             Publish & optimize content with AI
//           </p>
//         </Card>
//       </div>
//     </div>
//   )
// }










// "use client"

// import { useEffect, useState } from "react"
// import { supabaseBrowser } from "@/lib/supabaseClient"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import {
//   CheckCircle,
//   Plug,
//   RefreshCcw,
//   AlertTriangle,
//   Zap,
// } from "lucide-react"

// type GoogleStatus = "connected" | "not_connected" | "error"

// export default function AppsIntegrationsPage() {
//   const [googleStatus, setGoogleStatus] = useState<GoogleStatus>("not_connected")
//   const [loading, setLoading] = useState(false)

//   const [plans, setPlans] = useState<any[]>([])
//   const [selectedPlan, setSelectedPlan] = useState<string>("")

//   const [gaProperties, setGaProperties] = useState<any[]>([])
//   const [gaConfigured, setGaConfigured] = useState(false)

//   useEffect(() => {
//   const plan = plans.find(p => p.id === selectedPlan)

//   if (plan?.ga_property_id) {
//     setGaConfigured(true)
//   } else {
//     setGaConfigured(false)
//   }
// }, [selectedPlan, plans])


//   // ==========================
//   // INIT LOAD
//   // ==========================
//   useEffect(() => {
//     const init = async () => {
//       const { data } = await supabaseBrowser.auth.getSession()
//       if (!data.session) return

//       const token = data.session.access_token

//       // fetch plans
//     const plansRes = await fetch(
//   `${process.env.NEXT_PUBLIC_BACKEND_URL}/plans`,
//   { headers: { Authorization: `Bearer ${token}` } }
// )

// const plansData = await plansRes.json()
// setPlans(plansData)


// // auto select first project
// if (plansData.length > 0) {
//   setSelectedPlan(plansData[0].id)

//   // ✅ restore GA state from DB
//   if (plansData[0].ga_property_id) {
//     setGaConfigured(true)
//   } else {
//     setGaConfigured(false)
//   }
// }


//       // check google connection
//       const statusRes = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/integrations/status`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       const status = await statusRes.json()

//       if (status.google) {
//         setGoogleStatus("connected")

//         // fetch GA properties
//         const gaRes = await fetch(
//           `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/google/ga-properties`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         )
//         const gaJson = await gaRes.json()
//         setGaProperties(gaJson.properties || [])
//       } else {
//         setGoogleStatus("not_connected")
//       }
//     }

//     init()
//   }, [])

//   // ==========================
//   // CONNECT GOOGLE
//   // ==========================
//   const connectGoogle = async () => {
//     setLoading(true)

//     const { data } = await supabaseBrowser.auth.getSession()
//     if (!data.session) return

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/google/connect`,
//       {
//         headers: {
//           Authorization: `Bearer ${data.session.access_token}`,
//         },
//       }
//     )

//     const { url } = await res.json()
//     window.location.href = url
//   }

//   // ==========================
//   // SAVE GA PROPERTY TO PLAN
//   // ==========================
//   const saveGAProperty = async (propertyId: string) => {
//     if (!selectedPlan) {
//       alert("Please select a project first")
//       return
//     }

//     const { data } = await supabaseBrowser.auth.getSession()
//     if (!data.session) return

//     await fetch(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/plans/${selectedPlan}/ga-property`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${data.session.access_token}`,
//         },
//         body: JSON.stringify({ ga_property_id: propertyId }),
//       }
//     )

//     setGaConfigured(true)
//   }

//   return (
//     <div className="p-8 space-y-8">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold text-white">Apps & Integrations</h1>
//         <p className="text-gray-400 mt-1">
//           Connect your tools to unlock automation & AI insights
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//         {/* GOOGLE */}
//         <Card className="p-6 bg-charcoal border border-white/10">
//           <div className="flex items-start justify-between">
//             <div>
//               <h2 className="text-white font-semibold">Google Services</h2>
//               <p className="text-sm text-gray-400 mt-1">
//                 Search Console, Analytics, PageSpeed & Indexing
//               </p>
//             </div>

//             {googleStatus === "connected" ? (
//               <CheckCircle className="h-5 w-5 text-emerald" />
//             ) : googleStatus === "error" ? (
//               <AlertTriangle className="h-5 w-5 text-red-500" />
//             ) : (
//               <Plug className="h-5 w-5 text-gray-500" />
//             )}
//           </div>

//           {/* Services */}
//           <ul className="mt-4 space-y-2 text-sm">
//             <li className="flex items-center gap-2 text-gray-300">
//               <CheckCircle className="h-4 w-4 text-emerald" />
//               Search Console API
//             </li>
//             <li className="flex items-center gap-2 text-gray-300">
//               <CheckCircle className="h-4 w-4 text-emerald" />
//               Analytics API (GA4)
//             </li>
//             <li className="flex items-center gap-2 text-gray-300">
//               <CheckCircle className="h-4 w-4 text-emerald" />
//               PageSpeed Insights
//             </li>
//             <li className="flex items-center gap-2 text-emerald">
//               <Zap className="h-4 w-4" />
//               Indexing API
//             </li>
//           </ul>

//           {/* PLAN SELECT */}
//           {googleStatus === "connected" && (
//             <div className="mt-4">
//               <label className="text-sm text-gray-400">Select Project</label>
//               <select
//                 value={selectedPlan}
//                 onChange={(e) => setSelectedPlan(e.target.value)}
//                 className="w-full mt-2 p-2 bg-black text-white border border-white/10 rounded"
//               >
//                 <option value="">-- Select Project --</option>
//                 {plans.map((p) => (
//                   <option key={p.id} value={p.id}>
//                     {p.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}

//           {/* GA PROPERTY SELECT */}
//           {googleStatus === "connected" && selectedPlan && !gaConfigured && (
//             <div className="mt-4">
//               <label className="text-sm text-gray-400">
//                 Select GA4 Property
//               </label>
//               <select
//                 className="w-full mt-2 p-2 bg-black text-white border border-white/10 rounded"
//                 onChange={(e) => saveGAProperty(e.target.value)}
//               >
//                 <option value="">-- Select GA Property --</option>
//                 {gaProperties.map((p) => (
//                   <option key={p.propertyId} value={p.propertyId}>
//                     {p.displayName}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}

//           {gaConfigured && (
//             <p className="mt-3 text-emerald text-sm">
//               ✅ Google Analytics connected
//             </p>
//           )}

//           {/* ACTION */}
//           <div className="mt-6 flex gap-3">
//             {googleStatus === "connected" ? (
//               <Button variant="outline" onClick={connectGoogle}>
//                 <RefreshCcw className="h-4 w-4 mr-2" />
//                 Reconnect Google
//               </Button>
//             ) : (
//               <Button
//                 onClick={connectGoogle}
//                 disabled={loading}
//                 className="bg-emerald text-black"
//               >
//                 {loading ? "Connecting..." : "Connect Google"}
//               </Button>
//             )}
//           </div>
//         </Card>

//         {/* FUTURE */}
//         <Card className="p-6 bg-charcoal border border-white/10 opacity-60">
//           <h2 className="text-white font-semibold">Shopify</h2>
//           <p className="text-sm text-gray-400 mt-1">
//             Sync products & SEO automatically
//           </p>
//         </Card>

//         <Card className="p-6 bg-charcoal border border-white/10 opacity-60">
//           <h2 className="text-white font-semibold">WordPress</h2>
//           <p className="text-sm text-gray-400 mt-1">
//             Publish & optimize content with AI
//           </p>
//         </Card>
//       </div>
//     </div>
//   )
// }




"use client"

import { useEffect, useState } from "react"
import { supabaseBrowser } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  CheckCircle,
  Plug,
  RefreshCcw,
  AlertTriangle,
  Zap,
} from "lucide-react"

type GoogleStatus = "connected" | "not_connected" | "error"

export default function AppsIntegrationsPage() {
  const [googleStatus, setGoogleStatus] = useState<GoogleStatus>("not_connected")
  const [loading, setLoading] = useState(false)

  const [plans, setPlans] = useState<any[]>([])
  const [selectedPlan, setSelectedPlan] = useState<string>("")

  const [gaProperties, setGaProperties] = useState<any[]>([])
  const [gaConfigured, setGaConfigured] = useState(false)

  // ==========================
  // INIT LOAD
  // ==========================
  useEffect(() => {
    const init = async () => {
      const { data } = await supabaseBrowser.auth.getSession()
      if (!data.session) return

      const token = data.session.access_token

      // fetch plans
      const plansRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/plans`,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      const plansData = await plansRes.json()
      setPlans(plansData)

      // auto select first plan
      if (plansData.length > 0) {
        setSelectedPlan(plansData[0].id)
      }

      // check google connection
      const statusRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/integrations/status`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      const status = await statusRes.json()

      if (status.google) {
        setGoogleStatus("connected")

        const gaRes = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/google/ga-properties`,
          { headers: { Authorization: `Bearer ${token}` } }
        )

        const gaJson = await gaRes.json()
        setGaProperties(gaJson.properties || [])
      } else {
        setGoogleStatus("not_connected")
      }
    }

    init()
  }, [])

  // ==========================
  // RESTORE GA STATE FROM DB
  // ==========================
  useEffect(() => {
    const plan = plans.find(p => p.id === selectedPlan)
    setGaConfigured(!!plan?.ga_property_id)
  }, [selectedPlan, plans])

  // ==========================
  // CONNECT GOOGLE
  // ==========================
  const connectGoogle = async () => {
    setLoading(true)

    const { data } = await supabaseBrowser.auth.getSession()
    if (!data.session) return

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/google/connect`,
      {
        headers: {
          Authorization: `Bearer ${data.session.access_token}`,
        },
      }
    )

    const { url } = await res.json()
    window.location.href = url
  }

  // ==========================
  // SAVE GA PROPERTY
  // ==========================
  const saveGAProperty = async (propertyId: string) => {
    if (!selectedPlan) return alert("Please select a project first")

    const { data } = await supabaseBrowser.auth.getSession()
    if (!data.session) return

    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/plans/${selectedPlan}/ga-property`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.session.access_token}`,
        },
        body: JSON.stringify({ ga_property_id: propertyId }),
      }
    )

    // ✅ update local state (THIS FIXES REFRESH ISSUE)
    setPlans(prev =>
      prev.map(p =>
        p.id === selectedPlan ? { ...p, ga_property_id: propertyId } : p
      )
    )

    setGaConfigured(true)
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Apps & Integrations</h1>
        <p className="text-gray-400 mt-1">
          Connect your tools to unlock automation & AI insights
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* GOOGLE */}
        <Card className="p-6 bg-charcoal border border-white/10">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-white font-semibold">Google Services</h2>
              <p className="text-sm text-gray-400 mt-1">
                Search Console, Analytics, PageSpeed & Indexing
              </p>
            </div>

            {googleStatus === "connected" ? (
              <CheckCircle className="h-5 w-5 text-emerald" />
            ) : googleStatus === "error" ? (
              <AlertTriangle className="h-5 w-5 text-red-500" />
            ) : (
              <Plug className="h-5 w-5 text-gray-500" />
            )}
          </div>

          {/* PLAN SELECT */}
          {googleStatus === "connected" && (
            <div className="mt-4">
              <label className="text-sm text-gray-400">Select Project</label>
              <select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-full mt-2 p-2 bg-black text-white border border-white/10 rounded"
              >
                <option value="">-- Select Project --</option>
                {plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* GA PROPERTY SELECT */}
          {googleStatus === "connected" && selectedPlan && !gaConfigured && (
            <div className="mt-4">
              <label className="text-sm text-gray-400">
                Select GA4 Property
              </label>

              <select
                disabled={gaConfigured}
                value={
                  plans.find(p => p.id === selectedPlan)?.ga_property_id || ""
                }
                onChange={(e) => saveGAProperty(e.target.value)}
                className="w-full mt-2 p-2 bg-black text-white border border-white/10 rounded disabled:opacity-50"
              >
                <option value="">-- Select GA Property --</option>
                {gaProperties.map((p) => (
                  <option key={p.propertyId} value={p.propertyId}>
                    {p.displayName}
                  </option>
                ))}
              </select>
            </div>
          )}

          {gaConfigured && (
            <p className="mt-3 text-emerald text-sm">
              ✅ Google Analytics connected
            </p>
          )}

          {/* ACTION */}
          <div className="mt-6 flex gap-3">
            <Button variant="outline" onClick={connectGoogle}>
              <RefreshCcw className="h-4 w-4 mr-2" />
              Reconnect Google
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
