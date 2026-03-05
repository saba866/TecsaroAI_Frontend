// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { Loader2, Lock, Sparkles, Send } from "lucide-react"

// const AEO_ENGINES = [
//   { id: "gemini", name: "Gemini", active: true },
//   { id: "openai", name: "ChatGPT", active: false },
//   { id: "claude", name: "Claude", active: false },
//   { id: "perplexity", name: "Perplexity", active: false },
// ]

// export default function AEOPage() {
//   const [engine, setEngine] = useState("gemini")
//   const [query, setQuery] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [result, setResult] = useState<string | null>(null)

//   const runAEO = async () => {
//     if (!query) return
//     setLoading(true)
//     setResult(null)

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/aeo/query`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           provider: engine,
//           query,
//         }),
//       }
//     )

//     const data = await res.json()
//     setResult(data.answer || data.message)
//     setLoading(false)
//   }

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold text-gradient">
//           Answer Engine Optimization (AEO)
//         </h1>
//         <p className="text-muted-foreground">
//           Optimize your content for AI search engines like Gemini, ChatGPT,
//           Claude & Perplexity
//         </p>
//       </div>

//       {/* Engine Tabs */}
//       <div className="flex gap-2 flex-wrap">
//         {AEO_ENGINES.map((e) => (
//           <button
//             key={e.id}
//             onClick={() => e.active && setEngine(e.id)}
//             className={`px-4 py-2 rounded-lg text-sm font-medium border transition
//               ${
//                 engine === e.id
//                   ? "bg-primary text-primary-foreground"
//                   : "bg-card text-muted-foreground"
//               }
//               ${!e.active && "opacity-50 cursor-not-allowed"}
//             `}
//           >
//             {e.name}
//             {!e.active && <Lock className="inline ml-1 h-3 w-3" />}
//           </button>
//         ))}
//       </div>

//       {/* Input Card */}
//       <div className="rounded-xl border bg-card p-6 space-y-4">
//         <textarea
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Ask how your content should be optimized for AI search..."
//           className="w-full min-h-[120px] bg-background border rounded-lg p-4 outline-none focus:ring-2 focus:ring-primary"
//         />

//         <div className="flex justify-end">
//           <button
//             onClick={runAEO}
//             disabled={loading}
//             className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition"
//           >
//             {loading ? (
//               <Loader2 className="animate-spin h-4 w-4" />
//             ) : (
//               <Send className="h-4 w-4" />
//             )}
//             Run AEO
//           </button>
//         </div>
//       </div>

//       {/* Result */}
//       {result && (
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="rounded-xl border bg-card p-6 space-y-3"
//         >
//           <div className="flex items-center gap-2 text-primary font-semibold">
//             <Sparkles className="h-4 w-4" />
//             AI Answer ({engine})
//           </div>
//           <div className="text-sm whitespace-pre-wrap text-foreground">
//             {result}
//           </div>
//         </motion.div>
//       )}
//     </div>
//   )
// }





// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   BarChart3,
//   Brain,
//   Globe,
//   TrendingUp,
//   AlertTriangle,
//   CheckCircle2,
// } from "lucide-react";

// export default function AeoDashboardPage() {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // later you will fetch real data here
//     setTimeout(() => setLoading(false), 800);
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex h-[70vh] items-center justify-center text-muted-foreground">
//         Loading AEO dashboard...
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 p-6">
//       {/* Header */}
//       <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">
//             AEO Dashboard
//           </h1>
//           <p className="text-muted-foreground">
//             Track how AI engines see and use your website
//           </p>
//         </div>
//         <Button className="bg-primary text-primary-foreground">
//           Run AEO Scan
//         </Button>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
//         <StatCard
//           title="AI Visibility"
//           value="72%"
//           icon={<TrendingUp className="h-5 w-5" />}
//           color="text-emerald"
//         />
//         <StatCard
//           title="Prompts Won"
//           value="18"
//           icon={<CheckCircle2 className="h-5 w-5" />}
//           color="text-emerald"
//         />
//         <StatCard
//           title="Prompts Lost"
//           value="9"
//           icon={<AlertTriangle className="h-5 w-5" />}
//           color="text-amber"
//         />
//         <StatCard
//           title="Pages Optimized"
//           value="26"
//           icon={<Brain className="h-5 w-5" />}
//           color="text-violet"
//         />
//       </div>

//       {/* Main Grid */}
//       <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
//         {/* Visibility Chart */}
//         <Card className="lg:col-span-2">
//           <CardHeader>
//             <CardTitle>AI Visibility Trend</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="h-[220px] flex items-center justify-center text-muted-foreground">
//               Chart will be connected here
//             </div>
//           </CardContent>
//         </Card>

//         {/* Alerts */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Recent Alerts</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-3">
//             <AlertItem
//               type="win"
//               text="You gained visibility in ChatGPT for 3 prompts"
//             />
//             <AlertItem
//               type="drop"
//               text="Visibility dropped for 2 prompts"
//             />
//             <AlertItem
//               type="info"
//               text="5 new prompts discovered"
//             />
//           </CardContent>
//         </Card>
//       </div>

//       {/* Prompt Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Top AEO Prompts</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-3">
//             <PromptRow
//               prompt="What is Answer Engine Optimization?"
//               status="won"
//             />
//             <PromptRow
//               prompt="How does ChatGPT choose sources?"
//               status="lost"
//             />
//             <PromptRow
//               prompt="Best AEO tools in 2026"
//               status="won"
//             />
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// /* ------------------ Components ------------------ */

// function StatCard({
//   title,
//   value,
//   icon,
//   color,
// }: {
//   title: string;
//   value: string;
//   icon: React.ReactNode;
//   color: string;
// }) {
//   return (
//     <Card>
//       <CardContent className="flex items-center justify-between p-4">
//         <div>
//           <p className="text-sm text-muted-foreground">{title}</p>
//           <p className="text-2xl font-bold">{value}</p>
//         </div>
//         <div className={`rounded-lg bg-muted p-2 ${color}`}>
//           {icon}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// function AlertItem({
//   type,
//   text,
// }: {
//   type: "win" | "drop" | "info";
//   text: string;
// }) {
//   const color =
//     type === "win"
//       ? "bg-emerald/10 text-emerald"
//       : type === "drop"
//       ? "bg-amber/10 text-amber"
//       : "bg-muted text-muted-foreground";

//   return (
//     <div className={`rounded-lg p-3 text-sm ${color}`}>
//       {text}
//     </div>
//   );
// }

// function PromptRow({
//   prompt,
//   status,
// }: {
//   prompt: string;
//   status: "won" | "lost";
// }) {
//   return (
//     <div className="flex items-center justify-between rounded-lg border p-3">
//       <p className="text-sm">{prompt}</p>
//       <Badge
//         variant={status === "won" ? "default" : "destructive"}
//       >
//         {status === "won" ? "Won" : "Lost"}
//       </Badge>
//     </div>
//   );
// }







// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { useSearchParams } from "next/navigation";
// import { api } from "@/lib/api";
// import {
//   TrendingUp,
//   Brain,
//   AlertTriangle,
//   CheckCircle2,
// } from "lucide-react";

// export default function AeoDashboardPage() {
//   const [loading, setLoading] = useState(true);
//   const [overview, setOverview] = useState<any>(null);
//   const [alerts, setAlerts] = useState<any[]>([]);
//   const [prompts, setPrompts] = useState<any[]>([]);

//   // 🔴 replace later with real planId
// const searchParams = useSearchParams();
// const planId = searchParams.get("plan");
// if (!planId) {
//   return <div className="p-6">Plan not found</div>;
// }

//   useEffect(() => {
//     async function load() {
//       try {
//         const [o, a, p] = await Promise.all([
//           api(`/aeo/overview?planId=${planId}`),
//            api(`/aeo/alerts/${planId}`), 
//           api(`/aeo/prompts?planId=${planId}`),
//         ]);
//         setOverview(o);
//         setAlerts(a);
//         setPrompts(p);
//       } catch (e) {
//         console.error("AEO fetch error", e);
//       } finally {
//         setLoading(false);
//       }
//     }
//     load();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex h-[70vh] items-center justify-center text-muted-foreground">
//         Loading AEO dashboard...
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 p-6">
//       {/* Header */}
//       <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">AEO Dashboard</h1>
//           <p className="text-muted-foreground">
//             Track how AI engines see and use your website
//           </p>
//         </div>
//         {/* <Button
//           className="bg-primary text-primary-foreground"
//           onClick={() => api(`/aeo/visibility/track?planId=${planId}`)}
//         >
//           Run AEO Scan
//         </Button> */}
//         <Button
//   className="bg-primary text-primary-foreground"
//   onClick={async () => {
//     await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/aeo/onboard/start`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ planId }),
//     });
//     alert("AEO scan started. Data will appear in 1–2 minutes.");
//   }}
// >
//   Run AEO Scan
// </Button>

//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
//         <StatCard title="AI Visibility" value={`${overview.visibility}%`} icon={<TrendingUp className="h-5 w-5" />} />
//         <StatCard title="Prompts Won" value={overview.won} icon={<CheckCircle2 className="h-5 w-5" />} />
//         <StatCard title="Prompts Lost" value={overview.lost} icon={<AlertTriangle className="h-5 w-5" />} />
//         <StatCard title="Pages Optimized" value={overview.pages} icon={<Brain className="h-5 w-5" />} />
//       </div>

//       {/* Alerts */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Recent Alerts</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-3">
//           {alerts.length === 0 && (
//             <p className="text-sm text-muted-foreground">No alerts yet</p>
//           )}
//           {alerts.map((a) => (
//             <AlertItem key={a.id} text={a.message} />
//           ))}
//         </CardContent>
//       </Card>

//       {/* Prompts */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Top AEO Prompts</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-3">
//           {prompts.map((p) => (
//             <PromptRow key={p.id} prompt={p.prompt} status={p.status} />
//           ))}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// /* ---------------- Components ---------------- */

// function StatCard({ title, value, icon }: any) {
//   return (
//     <Card>
//       <CardContent className="flex items-center justify-between p-4">
//         <div>
//           <p className="text-sm text-muted-foreground">{title}</p>
//           <p className="text-2xl font-bold">{value}</p>
//         </div>
//         <div className="rounded-lg bg-muted p-2">{icon}</div>
//       </CardContent>
//     </Card>
//   );
// }

// function AlertItem({ text }: { text: string }) {
//   return <div className="rounded-lg bg-muted p-3 text-sm">{text}</div>;
// }

// function PromptRow({
//   prompt,
//   status,
// }: {
//   prompt: string;
//   status: "won" | "lost";
// }) {
//   return (
//     <div className="flex items-center justify-between rounded-lg border p-3">
//       <p className="text-sm">{prompt}</p>
//       <Badge variant={status === "won" ? "default" : "destructive"}>
//         {status === "won" ? "Won" : "Lost"}
//       </Badge>
//     </div>
//   );
// }






// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { useSearchParams } from "next/navigation";
// import { api } from "@/lib/api";
// import {
//   TrendingUp,
//   Brain,
//   AlertTriangle,
//   CheckCircle2,
// } from "lucide-react";

// export default function AeoDashboardPage() {
//   const searchParams = useSearchParams();
//   const planId = searchParams.get("plan");

//   const [loading, setLoading] = useState(true);
//   const [overview, setOverview] = useState<any>(null);
//   const [alerts, setAlerts] = useState<any[]>([]);
//   const [prompts, setPrompts] = useState<any[]>([]);

//   if (!planId) {
//     return <div className="p-6">Plan not found</div>;
//   }

//   useEffect(() => {
//     let mounted = true;

//     async function load() {
//       try {
//         const [o, a, p] = await Promise.all([
//           api(`/aeo/overview?planId=${planId}`),
//           api(`/aeo/alerts/${planId}`),
//           api(`/aeo/prompts?planId=${planId}`),
//         ]);

//         if (!mounted) return;

//         setOverview(o);

//         // ✅ normalize backend responses
//         setAlerts(Array.isArray(a) ? a : a?.data || []);
//         setPrompts(Array.isArray(p) ? p : p?.data || []);
//       } catch (e) {
//         console.error("AEO fetch error", e);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     }

//     load();
//     return () => {
//       mounted = false;
//     };
//   }, [planId]);

//   if (loading) {
//     return (
//       <div className="flex h-[70vh] items-center justify-center text-muted-foreground">
//         Loading AEO dashboard...
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 p-6">
//       {/* Header */}
//       <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">AEO Dashboard</h1>
//           <p className="text-muted-foreground">
//             Track how AI engines see and use your website
//           </p>
//         </div>

//         <Button
//           className="bg-primary text-primary-foreground"
//           onClick={async () => {
//             await fetch(
//               `${process.env.NEXT_PUBLIC_BACKEND_URL}/aeo/onboard/start`,
//               {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ planId }),
//               }
//             );
//             alert("AEO scan started. Data will appear in 1–2 minutes.");
//           }}
//         >
//           Run AEO Scan
//         </Button>
//       </div>

//       {/* Stats */}
//       {overview && (
//         <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
//           <StatCard
//             title="AI Visibility"
//             value={`${overview.visibility ?? 0}%`}
//             icon={<TrendingUp className="h-5 w-5" />}
//           />
//           <StatCard
//             title="Prompts Won"
//             value={overview.won ?? 0}
//             icon={<CheckCircle2 className="h-5 w-5" />}
//           />
//           <StatCard
//             title="Prompts Lost"
//             value={overview.lost ?? 0}
//             icon={<AlertTriangle className="h-5 w-5" />}
//           />
//           <StatCard
//             title="Pages Optimized"
//             value={overview.pages ?? 0}
//             icon={<Brain className="h-5 w-5" />}
//           />
//         </div>
//       )}

//       {/* Alerts */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Recent Alerts</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-3">
//           {alerts.length === 0 && (
//             <p className="text-sm text-muted-foreground">No alerts yet</p>
//           )}
//           {alerts.map((a) => (
//             <AlertItem key={a.id} text={a.message} />
//           ))}
//         </CardContent>
//       </Card>

//       {/* Prompts */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Top AEO Prompts</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-3">
//           {prompts.map((p) => (
//             <PromptRow
//               key={p.id}
//               prompt={p.prompt}
//               status={p.status}
//             />
//           ))}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// /* ---------------- Components ---------------- */

// function StatCard({ title, value, icon }: any) {
//   return (
//     <Card>
//       <CardContent className="flex items-center justify-between p-4">
//         <div>
//           <p className="text-sm text-muted-foreground">{title}</p>
//           <p className="text-2xl font-bold">{value}</p>
//         </div>
//         <div className="rounded-lg bg-muted p-2">{icon}</div>
//       </CardContent>
//     </Card>
//   );
// }

// function AlertItem({ text }: { text: string }) {
//   return <div className="rounded-lg bg-muted p-3 text-sm">{text}</div>;
// }

// function PromptRow({
//   prompt,
//   status,
// }: {
//   prompt: string;
//   status: "won" | "lost";
// }) {
//   return (
//     <div className="flex items-center justify-between rounded-lg border p-3">
//       <p className="text-sm">{prompt}</p>
//       <Badge variant={status === "won" ? "default" : "destructive"}>
//         {status === "won" ? "Won" : "Lost"}
//       </Badge>
//     </div>
//   );
// }








// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { useSearchParams } from "next/navigation";
// import { api } from "@/lib/api";
// import {
//   TrendingUp,
//   Brain,
//   AlertTriangle,
//   CheckCircle2,
//   Target,
//   Users,
// } from "lucide-react";

// export default function AeoDashboardPage() {
//   const searchParams = useSearchParams();
//   const planId = searchParams.get("plan");

//   const [loading, setLoading] = useState(true);
//   const [overview, setOverview] = useState<any>(null);
//   const [alerts, setAlerts] = useState<any[]>([]);
//   const [prompts, setPrompts] = useState<any[]>([]);
//   const [score, setScore] = useState<number>(0);
//   const [visibility, setVisibility] = useState<number>(0);
//   const [scoreExplain, setScoreExplain] = useState<string>("");

//   if (!planId) return <div className="p-6">Plan not found</div>;

//   useEffect(() => {
//     let mounted = true;

//     async function load() {
//       try {
//         const [o, a, p, s, v] = await Promise.all([
//           api(`/aeo/overview?planId=${planId}`),
//           api(`/aeo/alerts/${planId}`),
//           api(`/aeo/prompts?planId=${planId}`),
//           api(`/aeo/score`, {
//             method: "POST",
//             body: JSON.stringify({ planId }),
//           }),
//           api(`/aeo/visibility/track?planId=${planId}`),
//         ]);

//         if (!mounted) return;

//         setOverview(o);
//         setAlerts(Array.isArray(a) ? a : a?.data || []);
//         setPrompts(Array.isArray(p) ? p : p?.data || []);
//         setScore(s?.score ?? 0);
//         setVisibility(v?.visibility ?? 0);
//       } catch (e) {
//         console.error("AEO fetch error", e);
//       } finally {
//         mounted && setLoading(false);
//       }
//     }

//     load();
//     return () => {
//       mounted = false;
//     };
//   }, [planId]);

//   async function explainScore() {
//     const res = await api(`/aeo/score/explain`, {
//       method: "POST",
//       body: JSON.stringify({ planId }),
//     });
//     setScoreExplain(res.explanation);
//   }

//   if (loading) {
//     return (
//       <div className="flex h-[70vh] items-center justify-center text-muted-foreground">
//         Loading AEO dashboard...
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 p-6">
//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold">AEO Dashboard</h1>
//           <p className="text-muted-foreground">
//             How AI engines rank and mention your website
//           </p>
//         </div>

//         <Button
//           onClick={async () => {
//             await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/aeo/onboard/start`, {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({ planId }),
//             });
//             alert("AEO scan started");
//           }}
//         >
//           Run AEO Scan
//         </Button>
//       </div>

//       {/* KPI ROW */}
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//         <StatCard title="AEO Score" value={score} icon={<Target />} />
//         <StatCard title="AI Visibility" value={`${visibility}%`} icon={<TrendingUp />} />
//         <StatCard title="Prompts Won" value={overview.won} icon={<CheckCircle2 />} />
//         <StatCard title="Prompts Lost" value={overview.lost} icon={<AlertTriangle />} />
//         <StatCard title="Pages Optimized" value={overview.pages} icon={<Brain />} />
//       </div>

//       {/* SCORE EXPLANATION */}
//       <Card>
//         <CardHeader className="flex flex-row justify-between items-center">
//           <CardTitle>Why is my AEO score {score}?</CardTitle>
//           <Button size="sm" onClick={explainScore}>
//             Explain
//           </Button>
//         </CardHeader>
//         <CardContent>
//           {scoreExplain ? (
//             <p className="text-sm whitespace-pre-line">{scoreExplain}</p>
//           ) : (
//             <p className="text-muted-foreground text-sm">
//               Click “Explain” to understand what to improve.
//             </p>
//           )}
//         </CardContent>
//       </Card>

//       {/* ALERTS */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Alerts</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-2">
//           {alerts.length === 0 && (
//             <p className="text-sm text-muted-foreground">No alerts yet</p>
//           )}
//           {alerts.map((a) => (
//             <div key={a.id} className="rounded bg-muted p-2 text-sm">
//               {a.message}
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* PROMPTS */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Top AEO Prompts</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-2">
//           {prompts.map((p) => (
//             <div key={p.id} className="flex justify-between border p-2 rounded">
//               <span>{p.prompt}</span>
//               <Badge variant={p.status === "won" ? "default" : "destructive"}>
//                 {p.status}
//               </Badge>
//             </div>
//           ))}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// /* ---------------- UI COMPONENTS ---------------- */

// function StatCard({ title, value, icon }: any) {
//   return (
//     <Card>
//       <CardContent className="flex justify-between items-center p-4">
//         <div>
//           <p className="text-sm text-muted-foreground">{title}</p>
//           <p className="text-2xl font-bold">{value}</p>
//         </div>
//         <div className="p-2 bg-muted rounded">{icon}</div>
//       </CardContent>
//     </Card>
//   );
// }







// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { useSearchParams } from "next/navigation";
// import { api } from "@/lib/api";
// import {
//   TrendingUp,
//   Brain,
//   AlertTriangle,
//   CheckCircle2,
//   Target,
// } from "lucide-react";

// export default function AeoDashboardPage() {
//   const searchParams = useSearchParams();
//   const planId = searchParams.get("plan");

//   const [loading, setLoading] = useState(true);
//   const [overview, setOverview] = useState<any>(null);
//   const [alerts, setAlerts] = useState<any[]>([]);
//   const [prompts, setPrompts] = useState<any[]>([]);
//   const [score, setScore] = useState<number>(0);
//   const [visibility, setVisibility] = useState<number>(0);
//   const [scoreExplain, setScoreExplain] = useState<string>("");

//   if (!planId) return <div className="p-6">Plan not found</div>;

//   useEffect(() => {
//     let mounted = true;

//     async function load() {
//       try {
//         const [o, a, p, s, v] = await Promise.all([
//           api(`/aeo/overview?planId=${planId}`),
//           api(`/aeo/alerts/${planId}`),
//           api(`/aeo/prompts?planId=${planId}`),
//           api(`/aeo/score`, {
//             method: "POST",
//             body: { planId }, // ✅ correct
//           }),
//           api(`/aeo/visibility/track?planId=${planId}`),
//         ]);

//         if (!mounted) return;

//         setOverview(o);
//         setAlerts(Array.isArray(a) ? a : a?.data || []);
//         setPrompts(Array.isArray(p) ? p : p?.data || []);
//         setScore(s?.score ?? 0);
//         setVisibility(v?.visibility ?? 0);
//       } catch (e) {
//         console.error("AEO fetch error", e);
//       } finally {
//         mounted && setLoading(false);
//       }
//     }

//     load();
//     return () => {
//       mounted = false;
//     };
//   }, [planId]);

//   async function explainScore() {
//     const res = await api(`/aeo/score/explain`, {
//       method: "POST",
//       body: { planId }, // ✅ correct
//     });
//     setScoreExplain(res.explanation);
//   }

//   if (loading) {
//     return (
//       <div className="flex h-[70vh] items-center justify-center text-muted-foreground">
//         Loading AEO dashboard...
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 p-6">
//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold">AEO Dashboard</h1>
//           <p className="text-muted-foreground">
//             How AI engines rank and mention your website
//           </p>
//         </div>

//         <Button
//           onClick={async () => {
//             await fetch(
//               `${process.env.NEXT_PUBLIC_BACKEND_URL}/aeo/onboard/start`,
//               {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ planId }), // ✅ OK (raw fetch)
//               }
//             );
//             alert("AEO scan started");
//           }}
//         >
//           Run AEO Scan
//         </Button>
//       </div>

//       {/* KPI ROW */}
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//         <StatCard title="AEO Score" value={score} icon={<Target />} />
//         <StatCard
//           title="AI Visibility"
//           value={`${visibility}%`}
//           icon={<TrendingUp />}
//         />
//         <StatCard title="Prompts Won" value={overview?.won ?? 0} icon={<CheckCircle2 />} />
//         <StatCard title="Prompts Lost" value={overview?.lost ?? 0} icon={<AlertTriangle />} />
//         <StatCard title="Pages Optimized" value={overview?.pages ?? 0} icon={<Brain />} />
//       </div>

//       {/* SCORE EXPLANATION */}
//       <Card>
//         <CardHeader className="flex flex-row justify-between items-center">
//           <CardTitle>Why is my AEO score {score}?</CardTitle>
//           <Button size="sm" onClick={explainScore}>
//             Explain
//           </Button>
//         </CardHeader>
//         <CardContent>
//           {scoreExplain ? (
//             <p className="text-sm whitespace-pre-line">{scoreExplain}</p>
//           ) : (
//             <p className="text-muted-foreground text-sm">
//               Click “Explain” to understand what to improve.
//             </p>
//           )}
//         </CardContent>
//       </Card>

//       {/* ALERTS */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Alerts</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-2">
//           {alerts.length === 0 && (
//             <p className="text-sm text-muted-foreground">No alerts yet</p>
//           )}
//           {alerts.map((a) => (
//             <div key={a.id} className="rounded bg-muted p-2 text-sm">
//               {a.message}
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* PROMPTS */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Top AEO Prompts</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-2">
//           {prompts.map((p) => (
//             <div key={p.id} className="flex justify-between border p-2 rounded">
//               <span>{p.prompt}</span>
//               <Badge variant={p.status === "won" ? "default" : "destructive"}>
//                 {p.status}
//               </Badge>
//             </div>
//           ))}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// /* ---------------- UI COMPONENT ---------------- */

// function StatCard({ title, value, icon }: any) {
//   return (
//     <Card>
//       <CardContent className="flex justify-between items-center p-4">
//         <div>
//           <p className="text-sm text-muted-foreground">{title}</p>
//           <p className="text-2xl font-bold">{value}</p>
//         </div>
//         <div className="p-2 bg-muted rounded">{icon}</div>
//       </CardContent>
//     </Card>
//   );
// }








// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { api } from "@/lib/api";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";

// import {
//   TrendingUp,
//   Brain,
//   AlertTriangle,
//   CheckCircle2,
//   Target,
//   Users,
//   Split,
// } from "lucide-react";

// /* ---------------- PAGE ---------------- */

// export default function AeoDashboardPage() {
//   const searchParams = useSearchParams();
//   const planId = searchParams.get("plan");

//   const [loading, setLoading] = useState(true);

//   const [overview, setOverview] = useState<any>(null);
//   const [alerts, setAlerts] = useState<any[]>([]);
//   const [prompts, setPrompts] = useState<any[]>([]);

//   const [score, setScore] = useState(0);
//   const [visibility, setVisibility] = useState(0);
//   const [scoreExplain, setScoreExplain] = useState("");

//   const [competitors, setCompetitors] = useState<any[]>([]);
//   const [yourVisibility, setYourVisibility] = useState(0);

//   const [gaps, setGaps] = useState<any[]>([]);

//   if (!planId) return <div className="p-6">Plan not found</div>;

//   /* ---------------- LOAD DASHBOARD ---------------- */

//   useEffect(() => {
//     let mounted = true;

//     async function load() {
//       try {
//         const [
//           o,
//           a,
//           p,
//           s,
//           v,
//           c,
//           g,
//         ] = await Promise.all([
//           api(`/aeo/overview?planId=${planId}`),
//           api(`/aeo/alerts/${planId}`),
//           api(`/aeo/prompts?planId=${planId}`),
//           api(`/aeo/score`, { method: "POST", body: { planId } }),
//           api(`/aeo/visibility/track?planId=${planId}`),
//           api(`/aeo/competitors`, { method: "POST", body: { planId } }),
//           api(`/aeo/gaps/${planId}`),
//         ]);

//         if (!mounted) return;

//         setOverview(o);
//         setAlerts(Array.isArray(a) ? a : []);
//         setPrompts(Array.isArray(p) ? p : []);

//         setScore(s?.score ?? 0);
//         setVisibility(v?.visibility ?? 0);

//         setYourVisibility(c?.you?.visibility ?? 0);
//         setCompetitors(c?.competitors ?? []);

//         setGaps(Array.isArray(g) ? g : []);
//       } catch (err) {
//         console.error("AEO dashboard load failed", err);
//       } finally {
//         mounted && setLoading(false);
//       }
//     }

//     load();
//     return () => {
//       mounted = false;
//     };
//   }, [planId]);

//   /* ---------------- SCORE EXPLANATION ---------------- */

//   async function explainScore() {
//     const res = await api(`/aeo/score/explain`, {
//       method: "POST",
//       body: { planId },
//     });
//     setScoreExplain(res?.explanation ?? "");
//   }

//   if (loading) {
//     return (
//       <div className="flex h-[70vh] items-center justify-center text-muted-foreground">
//         Loading AEO dashboard...
//       </div>
//     );
//   }

//   /* ---------------- UI ---------------- */

//   return (
//     <div className="space-y-6 p-6">

//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold">AEO Dashboard</h1>
//           <p className="text-muted-foreground">
//             AI search visibility, competitors & answer gaps
//           </p>
//         </div>

//         <Button
//           onClick={async () => {
//             await fetch(
//               `${process.env.NEXT_PUBLIC_BACKEND_URL}/aeo/onboard/start`,
//               {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ planId }),
//               }
//             );
//             alert("AEO scan started");
//           }}
//         >
//           Run AEO Scan
//         </Button>
//       </div>

//       {/* KPI ROW */}
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//         <StatCard title="AEO Score" value={score} icon={<Target />} />
//         <StatCard title="AI Visibility" value={`${visibility}%`} icon={<TrendingUp />} />
//         <StatCard title="Prompts Won" value={overview?.won ?? 0} icon={<CheckCircle2 />} />
//         <StatCard title="Prompts Lost" value={overview?.lost ?? 0} icon={<AlertTriangle />} />
//         <StatCard title="Pages Optimized" value={overview?.pages ?? 0} icon={<Brain />} />
//       </div>

//       {/* SCORE EXPLANATION */}
//       <Card>
//         <CardHeader className="flex justify-between items-center">
//           <CardTitle>Why is my AEO score {score}?</CardTitle>
//           <Button size="sm" onClick={explainScore}>Explain</Button>
//         </CardHeader>
//         <CardContent>
//           {scoreExplain ? (
//             <p className="text-sm whitespace-pre-line">{scoreExplain}</p>
//           ) : (
//             <p className="text-sm text-muted-foreground">
//               Click “Explain” to see improvement insights.
//             </p>
//           )}
//         </CardContent>
//       </Card>

//       {/* COMPETITOR VISIBILITY */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Users size={18} /> Competitor AI Visibility
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-3">
//           <div className="flex justify-between font-medium">
//             <span>Your Website</span>
//             <span>{yourVisibility}%</span>
//           </div>

//           {competitors.map((c) => (
//             <div key={c.domain} className="flex justify-between text-sm border-b pb-1">
//               <span>{c.domain}</span>
//               <span>{c.visibility}%</span>
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* ALERTS */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Alerts</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-2">
//           {alerts.length === 0 && (
//             <p className="text-sm text-muted-foreground">No alerts yet</p>
//           )}
//           {alerts.map((a) => (
//             <div key={a.id} className="rounded bg-muted p-2 text-sm">
//               {a.message}
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* ANSWER GAP MONITOR */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Gap size={18} /> Answer Gap Monitor
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-3">
//           {gaps.length === 0 && (
//             <p className="text-sm text-muted-foreground">
//               No answer gaps detected 🎉
//             </p>
//           )}

//           {gaps.map((g, i) => (
//             <div key={i} className="border rounded p-3 space-y-1 text-sm">
//               <div className="font-medium">{g.prompt}</div>

//               <div className="flex justify-between text-xs">
//                 <Badge variant={g.status === "missing" ? "destructive" : "secondary"}>
//                   {g.status}
//                 </Badge>
//                 <span>Winner: {g.competitorWinner}</span>
//               </div>

//               <div className="text-xs text-muted-foreground">
//                 Suggested page: {g.suggestedPage}
//               </div>
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* PROMPTS */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Top AEO Prompts</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-2">
//           {prompts.map((p) => (
//             <div key={p.id} className="flex justify-between border p-2 rounded">
//               <span>{p.prompt}</span>
//               <Badge variant={p.status === "won" ? "default" : "destructive"}>
//                 {p.status}
//               </Badge>
//             </div>
//           ))}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// /* ---------------- STAT CARD ---------------- */

// function StatCard({ title, value, icon }: any) {
//   return (
//     <Card>
//       <CardContent className="flex justify-between items-center p-4">
//         <div>
//           <p className="text-sm text-muted-foreground">{title}</p>
//           <p className="text-2xl font-bold">{value}</p>
//         </div>
//         <div className="p-2 bg-muted rounded">{icon}</div>
//       </CardContent>
//     </Card>
//   );
// }






// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { api } from "@/lib/api";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";

// import {
//   TrendingUp,
//   Brain,
//   AlertTriangle,
//   CheckCircle2,
//   Target,
//   Users,
//   Split,
// } from "lucide-react";

// export default function AeoDashboardPage() {
//   const searchParams = useSearchParams();
//   const planId = searchParams.get("plan");

//   const [loading, setLoading] = useState(true);

//   const [overview, setOverview] = useState<any>(null);
//   const [alerts, setAlerts] = useState<any[]>([]);
//   const [prompts, setPrompts] = useState<any[]>([]);

//   const [score, setScore] = useState(0);
//   const [visibility, setVisibility] = useState(0);

//   const [competitors, setCompetitors] = useState<any[]>([]);
//   const [yourVisibility, setYourVisibility] = useState(0);

//   const [gaps, setGaps] = useState<any[]>([]);
//   const [scoreExplain, setScoreExplain] = useState("");

//   if (!planId) {
//     return <div className="p-6">Plan not found</div>;
//   }

//   /* ---------------- LOAD DASHBOARD ---------------- */

//   useEffect(() => {
//     let mounted = true;

//     async function load() {
//       try {
//         const [
//           overviewRes,
//           alertsRes,
//           promptsRes,
//           scoreRes,
//           competitorsRes,
//           gapsRes,
//         ] = await Promise.all([
//           api(`/aeo/overview?planId=${planId}`),
//           api(`/aeo/alerts/${planId}`),
//           api(`/aeo/prompts?planId=${planId}`),
//           api(`/aeo/score`, { method: "POST", body: { planId } }),
//           api(`/aeo/competitors`, { method: "POST", body: { planId } }),
//           api(`/aeo/gaps/${planId}`),
//         ]);

//         if (!mounted) return;

//         // OVERVIEW (single source of truth)
//         setOverview(overviewRes);
//         setVisibility(overviewRes?.visibility ?? 0);

//         // OTHER DATA
//         setAlerts(Array.isArray(alertsRes) ? alertsRes : []);
//         setPrompts(Array.isArray(promptsRes) ? promptsRes : []);
//         setScore(scoreRes?.score ?? 0);

//         setYourVisibility(competitorsRes?.you?.visibility ?? 0);
//         setCompetitors(competitorsRes?.competitors ?? []);

//         setGaps(Array.isArray(gapsRes) ? gapsRes : []);
//       } catch (err) {
//         console.error("AEO dashboard load failed", err);
//       } finally {
//         mounted && setLoading(false);
//       }
//     }

//     load();
//     return () => {
//       mounted = false;
//     };
//   }, [planId]);

//   /* ---------------- SCORE EXPLANATION ---------------- */

//   async function explainScore() {
//     const res = await api(`/aeo/score/explain`, {
//       method: "POST",
//       body: { planId },
//     });
//     setScoreExplain(res?.explanation ?? "");
//   }

//   if (loading) {
//     return (
//       <div className="flex h-[70vh] items-center justify-center text-muted-foreground">
//         Loading AEO dashboard...
//       </div>
//     );
//   }

//   /* ---------------- UI ---------------- */

//   return (
//     <div className="space-y-6 p-6">
//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold">AEO Dashboard</h1>
//           <p className="text-muted-foreground">
//             AI search visibility, competitors & answer gaps
//           </p>
//         </div>

//         <Button
//           onClick={async () => {
//             await fetch(
//               `${process.env.NEXT_PUBLIC_BACKEND_URL}/aeo/onboard/start`,
//               {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ planId }),
//               }
//             );
//             alert("AEO scan started");
//           }}
//         >
//           Run AEO Scan
//         </Button>
//       </div>

//       {/* KPI ROW */}
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//         <StatCard title="AEO Score" value={score} icon={<Target />} />
//         <StatCard title="AI Visibility" value={`${visibility}%`} icon={<TrendingUp />} />
//         <StatCard title="Prompts Won" value={overview?.won ?? 0} icon={<CheckCircle2 />} />
//         <StatCard title="Prompts Lost" value={overview?.lost ?? 0} icon={<AlertTriangle />} />
//         <StatCard title="Pages Optimized" value={overview?.pages ?? 0} icon={<Brain />} />
//       </div>

//       {/* SCORE EXPLANATION */}
//       <Card>
//         <CardHeader className="flex justify-between items-center">
//           <CardTitle>Why is my AEO score {score}?</CardTitle>
//           <Button size="sm" onClick={explainScore}>Explain</Button>
//         </CardHeader>
//         <CardContent>
//           {scoreExplain ? (
//             <p className="text-sm whitespace-pre-line">{scoreExplain}</p>
//           ) : (
//             <p className="text-sm text-muted-foreground">
//               Click “Explain” to understand what to improve.
//             </p>
//           )}
//         </CardContent>
//       </Card>

//       {/* COMPETITOR VISIBILITY */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Users size={18} /> Competitor AI Visibility
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-3">
//           <div className="flex justify-between font-medium">
//             <span>Your Website</span>
//             <span>{yourVisibility}%</span>
//           </div>

//           {competitors.map((c) => (
//             <div key={c.domain} className="flex justify-between text-sm border-b pb-1">
//               <span>{c.domain}</span>
//               <span>{c.visibility}%</span>
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* ALERTS */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Alerts</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-2">
//           {alerts.length === 0 && (
//             <p className="text-sm text-muted-foreground">No alerts yet</p>
//           )}
//           {alerts.map((a) => (
//             <div key={a.id} className="rounded bg-muted p-2 text-sm">
//               {a.message}
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* ANSWER GAP MONITOR */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Split size={18} /> Answer Gap Monitor
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-3">
//           {gaps.length === 0 && (
//             <p className="text-sm text-muted-foreground">
//               No answer gaps detected 🎉
//             </p>
//           )}

//           {gaps.map((g, i) => (
//             <div key={i} className="border rounded p-3 space-y-1 text-sm">
//               <div className="font-medium">{g.prompt}</div>

//               <div className="flex justify-between text-xs">
//                 <Badge variant={g.status === "missing" ? "destructive" : "secondary"}>
//                   {g.status}
//                 </Badge>
//                 <span>Winner: {g.competitorWinner}</span>
//               </div>

//               <div className="text-xs text-muted-foreground">
//                 Suggested page: {g.suggestedPage}
//               </div>
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* PROMPTS */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Top AEO Prompts</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-2">
//           {prompts.map((p) => (
//             <div key={p.id} className="flex justify-between border p-2 rounded">
//               <span>{p.prompt}</span>
//               <Badge variant={p.status === "won" ? "default" : "destructive"}>
//                 {p.status}
//               </Badge>
//             </div>
//           ))}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// /* ---------------- STAT CARD ---------------- */

// function StatCard({ title, value, icon }: any) {
//   return (
//     <Card>
//       <CardContent className="flex justify-between items-center p-4">
//         <div>
//           <p className="text-sm text-muted-foreground">{title}</p>
//           <p className="text-2xl font-bold">{value}</p>
//         </div>
//         <div className="p-2 bg-muted rounded">{icon}</div>
//       </CardContent>
//     </Card>
//   );
// }






// "use client";

// import { useEffect, useState, useRef } from "react";
// import { useSearchParams } from "next/navigation";
// import { api } from "@/lib/api";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";

// import {
//   TrendingUp,
//   Brain,
//   AlertTriangle,
//   CheckCircle2,
//   Target,
//   Users,
//   Split,
// } from "lucide-react";

// export default function AeoDashboardPage() {
//   const searchParams = useSearchParams();
//   const planId = searchParams.get("plan");

//   const [loading, setLoading] = useState(true);

//   const [overview, setOverview] = useState<any>(null);
//   const [alerts, setAlerts] = useState<any[]>([]);
//   const [prompts, setPrompts] = useState<any[]>([]);

//   const [score, setScore] = useState(0);
//   const [visibility, setVisibility] = useState(0);

//   const [competitors, setCompetitors] = useState<any[]>([]);
//   const [yourVisibility, setYourVisibility] = useState(0);

//   const [gaps, setGaps] = useState<any[]>([]);
//   const [scoreExplain, setScoreExplain] = useState("");

//   // ✅ Prevent double execution in React dev mode
//   const ranOnce = useRef(false);

//   if (!planId) {
//     return <div className="p-6">Plan not found</div>;
//   }

//   /* ---------------- LOAD DASHBOARD ---------------- */

//   useEffect(() => {
//     if (ranOnce.current) return;
//     ranOnce.current = true;

//     let mounted = true;

//     async function load() {
//       try {
//         const [
//           overviewRes,
//           alertsRes,
//           promptsRes,
//           scoreRes,
//           competitorsRes,
//           gapsRes,
//         ] = await Promise.all([
//           api(`/aeo/overview?planId=${planId}`),
//           api(`/aeo/alerts/${planId}`),
//           api(`/aeo/prompts?planId=${planId}`),
//           api(`/aeo/score`, { method: "POST", body: { planId } }),
//           api(`/aeo/competitors`, { method: "POST", body: { planId } }),
//           api(`/aeo/gaps/${planId}`),
//         ]);

//         if (!mounted) return;

//         // OVERVIEW = single source of truth
//         setOverview(overviewRes);
//         setVisibility(overviewRes?.visibility ?? 0);

//         setAlerts(Array.isArray(alertsRes) ? alertsRes : []);
//         setPrompts(Array.isArray(promptsRes) ? promptsRes : []);
//         setScore(scoreRes?.score ?? 0);

//         setYourVisibility(competitorsRes?.you?.visibility ?? 0);
//         setCompetitors(competitorsRes?.competitors ?? []);

//         setGaps(Array.isArray(gapsRes) ? gapsRes : []);
//       } catch (err) {
//         console.error("AEO dashboard load failed", err);
//       } finally {
//         mounted && setLoading(false);
//       }
//     }

//     load();
//     return () => {
//       mounted = false;
//     };
//   }, [planId]);

//   /* ---------------- SCORE EXPLANATION ---------------- */

//   async function explainScore() {
//     const res = await api(`/aeo/score/explain`, {
//       method: "POST",
//       body: { planId },
//     });
//     setScoreExplain(res?.explanation ?? "");
//   }

//   if (loading) {
//     return (
//       <div className="flex h-[70vh] items-center justify-center text-muted-foreground">
//         Loading AEO dashboard...
//       </div>
//     );
//   }

//   /* ---------------- UI ---------------- */

//   return (
//     <div className="space-y-6 p-6">
//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold">AEO Dashboard</h1>
//           <p className="text-muted-foreground">
//             AI search visibility, competitors & answer gaps
//           </p>
//         </div>

//         <Button
//           onClick={async () => {
//             await fetch(
//               `${process.env.NEXT_PUBLIC_BACKEND_URL}/aeo/onboard/start`,
//               {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ planId }),
//               }
//             );
//             alert("AEO scan started");
//           }}
//         >
//           Run AEO Scan
//         </Button>
//       </div>

//       {/* KPI ROW */}
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//         <StatCard title="AEO Score" value={score} icon={<Target />} />
//         <StatCard title="AI Visibility" value={`${visibility}%`} icon={<TrendingUp />} />
//         <StatCard title="Prompts Won" value={overview?.won ?? 0} icon={<CheckCircle2 />} />
//         <StatCard title="Prompts Lost" value={overview?.lost ?? 0} icon={<AlertTriangle />} />
//         <StatCard title="Pages Optimized" value={overview?.pages ?? 0} icon={<Brain />} />
//       </div>

//       {/* SCORE EXPLANATION */}
//       <Card>
//         <CardHeader className="flex justify-between items-center">
//           <CardTitle>Why is my AEO score {score}?</CardTitle>
//           <Button size="sm" onClick={explainScore}>Explain</Button>
//         </CardHeader>
//         <CardContent>
//           {scoreExplain ? (
//             <p className="text-sm whitespace-pre-line">{scoreExplain}</p>
//           ) : (
//             <p className="text-sm text-muted-foreground">
//               Click “Explain” to understand what to improve.
//             </p>
//           )}
//         </CardContent>
//       </Card>

//       {/* COMPETITOR VISIBILITY */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Users size={18} /> Competitor AI Visibility
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-3">
//           <div className="flex justify-between font-medium">
//             <span>Your Website</span>
//             <span>{yourVisibility}%</span>
//           </div>

//           {competitors.map((c) => (
//             <div key={c.domain} className="flex justify-between text-sm border-b pb-1">
//               <span>{c.domain}</span>
//               <span>{c.visibility}%</span>
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* ALERTS */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Alerts</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-2">
//           {alerts.length === 0 && (
//             <p className="text-sm text-muted-foreground">No alerts yet</p>
//           )}
//           {alerts.map((a) => (
//             <div key={a.id} className="rounded bg-muted p-2 text-sm">
//               {a.message}
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* ANSWER GAP MONITOR */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Split size={18} /> Answer Gap Monitor
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-3">
//           {gaps.length === 0 && (
//             <p className="text-sm text-muted-foreground">
//               No answer gaps detected 🎉
//             </p>
//           )}

//           {gaps.map((g, i) => (
//             <div key={i} className="border rounded p-3 space-y-1 text-sm">
//               <div className="font-medium">{g.prompt}</div>

//               <div className="flex justify-between text-xs">
//                 <Badge variant={g.status === "missing" ? "destructive" : "secondary"}>
//                   {g.status}
//                 </Badge>
//                 <span>Winner: {g.competitorWinner}</span>
//               </div>

//               <div className="text-xs text-muted-foreground">
//                 Suggested page: {g.suggestedPage}
//               </div>
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* PROMPTS */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Top AEO Prompts</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-2">
//           {prompts.map((p) => (
//             <div key={p.id} className="flex justify-between border p-2 rounded">
//               <span>{p.prompt}</span>
//               <Badge variant={p.status === "won" ? "default" : "destructive"}>
//                 {p.status}
//               </Badge>
//             </div>
//           ))}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// /* ---------------- STAT CARD ---------------- */

// function StatCard({ title, value, icon }: any) {
//   return (
//     <Card>
//       <CardContent className="flex justify-between items-center p-4">
//         <div>
//           <p className="text-sm text-muted-foreground">{title}</p>
//           <p className="text-2xl font-bold">{value}</p>
//         </div>
//         <div className="p-2 bg-muted rounded">{icon}</div>
//       </CardContent>
//     </Card>
//   );
// }








// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { api } from "@/lib/api";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";

// import {
//   TrendingUp,
//   Brain,
//   AlertTriangle,
//   CheckCircle2,
//   Target,
//   Split,
// } from "lucide-react";

// export default function AeoDashboardPage() {
//   const searchParams = useSearchParams();
//   const planId = searchParams.get("plan");

//   const [loading, setLoading] = useState(true);

//   const [overview, setOverview] = useState<any>(null);
//   const [alerts, setAlerts] = useState<any[]>([]);
//   const [prompts, setPrompts] = useState<any[]>([]);
//   const [gaps, setGaps] = useState<any[]>([]);

//   const [score, setScore] = useState(0);
//   const [visibility, setVisibility] = useState(0);
//   const [scoreExplain, setScoreExplain] = useState("");

//   if (!planId) {
//     return <div className="p-6">Plan not found</div>;
//   }

//   /* ---------------- LOAD DASHBOARD ---------------- */

//   useEffect(() => {
//     if (!planId) return;

//     let mounted = true;

//     async function load() {
//       setLoading(true);

//       try {
//         const [
//           overviewRes,
//           alertsRes,
//           promptsRes,
//           scoreRes,
//           gapsRes,
//         ] = await Promise.all([
//           api(`/aeo/overview?planId=${planId}`),
//           api(`/aeo/alerts/${planId}`),
//           api(`/aeo/prompts?planId=${planId}`), // raw array
//           api(`/aeo/score`, { method: "POST", body: { planId } }),
//           api(`/aeo/gaps/${planId}`),
//         ]);

//         if (!mounted) return;

//         // 🔑 Normalize apiResponse
//         const overviewData = overviewRes?.data ?? overviewRes;
//         const alertsData = alertsRes?.data ?? alertsRes;
//         const scoreData = scoreRes?.data ?? scoreRes;
//         const gapsData = gapsRes?.data ?? gapsRes;

//         setOverview(overviewData);
//         setVisibility(overviewData?.visibility ?? 0);

//         setAlerts(Array.isArray(alertsData) ? alertsData : []);
//         setPrompts(Array.isArray(promptsRes) ? promptsRes : []);
//         setScore(scoreData?.score ?? 0);
//         setGaps(Array.isArray(gapsData) ? gapsData : []);
//       } catch (err) {
//         console.error("AEO dashboard load failed", err);
//       } finally {
//         mounted && setLoading(false);
//       }
//     }

//     load();
//     return () => {
//       mounted = false;
//     };
//   }, [planId]);

//   /* ---------------- SCORE EXPLANATION ---------------- */

//   async function explainScore() {
//     const res = await api(`/aeo/score/explain`, {
//       method: "POST",
//       body: { planId },
//     });

//     const data = res?.data ?? res;
//     setScoreExplain(data?.explanation ?? "");
//   }

//   if (loading) {
//     return (
//       <div className="flex h-[70vh] items-center justify-center text-muted-foreground">
//         Loading AEO dashboard...
//       </div>
//     );
//   }

//   /* ---------------- UI ---------------- */

//   return (
//     <div className="space-y-6 p-6">
//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold">AEO Dashboard</h1>
//           <p className="text-muted-foreground">
//             AI search visibility & answer gaps
//           </p>
//         </div>

//         <Button
//           onClick={async () => {
//             await fetch(
//               `${process.env.NEXT_PUBLIC_BACKEND_URL}/aeo/onboard/start`,
//               {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ planId }),
//               }
//             );
//             alert("AEO scan started");
//           }}
//         >
//           Run AEO Scan
//         </Button>
//       </div>

//       {/* KPI ROW */}
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//         <StatCard title="AEO Score" value={score} icon={<Target />} />
//         <StatCard title="AI Visibility" value={`${visibility}%`} icon={<TrendingUp />} />
//         <StatCard title="Prompts Won" value={overview?.won ?? 0} icon={<CheckCircle2 />} />
//         <StatCard title="Prompts Lost" value={overview?.lost ?? 0} icon={<AlertTriangle />} />
//         <StatCard title="Pages Optimized" value={overview?.pages ?? 0} icon={<Brain />} />
//       </div>

//       {/* SCORE EXPLANATION */}
//       <Card>
//         <CardHeader className="flex justify-between items-center">
//           <CardTitle>Why is my AEO score {score}?</CardTitle>
//           <Button size="sm" onClick={explainScore}>
//             Explain
//           </Button>
//         </CardHeader>
//         <CardContent>
//           {scoreExplain ? (
//             <p className="text-sm whitespace-pre-line">{scoreExplain}</p>
//           ) : (
//             <p className="text-sm text-muted-foreground">
//               Click “Explain” to understand what to improve.
//             </p>
//           )}
//         </CardContent>
//       </Card>

//       {/* ALERTS */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Alerts</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-2">
//           {alerts.length === 0 && (
//             <p className="text-sm text-muted-foreground">No alerts yet</p>
//           )}
//           {alerts.map((a) => (
//             <div key={a.id} className="rounded bg-muted p-2 text-sm">
//               {a.message}
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* ANSWER GAP MONITOR */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Split size={18} /> Answer Gap Monitor
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-3">
//           {gaps.length === 0 && (
//             <p className="text-sm text-muted-foreground">
//               No answer gaps detected 🎉
//             </p>
//           )}

//           {gaps.map((g) => (
//             <div key={g.id} className="border rounded p-3 space-y-1 text-sm">
//               <div className="font-medium">
//                 {g.aeo_prompts?.prompt}
//               </div>

//               <div className="flex justify-between text-xs">
//                 <Badge variant={g.missing ? "destructive" : "secondary"}>
//                   {g.missing ? "missing" : "covered"}
//                 </Badge>
//               </div>

//               <div className="text-xs text-muted-foreground">
//                 Suggested page: {g.suggestion}
//               </div>
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* PROMPTS */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Top AEO Prompts</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-2">
//           {prompts.map((p) => (
//             <div key={p.id} className="flex justify-between border p-2 rounded">
//               <span>{p.prompt}</span>
//               <Badge variant={p.status === "won" ? "default" : "destructive"}>
//                 {p.status}
//               </Badge>
//             </div>
//           ))}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// /* ---------------- STAT CARD ---------------- */

// function StatCard({ title, value, icon }: any) {
//   return (
//     <Card>
//       <CardContent className="flex justify-between items-center p-4">
//         <div>
//           <p className="text-sm text-muted-foreground">{title}</p>
//           <p className="text-2xl font-bold">{value}</p>
//         </div>
//         <div className="p-2 bg-muted rounded">{icon}</div>
//       </CardContent>
//     </Card>
//   );
// }








// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { api } from "@/lib/api";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";

// import {
//   TrendingUp,
//   Brain,
//   AlertTriangle,
//   CheckCircle2,
//   Target,
//   Split,
  
// } from "lucide-react";

// export default function AeoDashboardPage() {
//   const searchParams = useSearchParams();
//   const planId = searchParams.get("plan");

//   const [loading, setLoading] = useState(true);

//   const [overview, setOverview] = useState<any>(null);
//   const [alerts, setAlerts] = useState<any[]>([]);
//   const [prompts, setPrompts] = useState<any[]>([]);
//   const [gaps, setGaps] = useState<any[]>([]);

//   const [score, setScore] = useState(0);
//   const [visibility, setVisibility] = useState(0);
//   const [scoreExplain, setScoreExplain] = useState("");
// const [competitors, setCompetitors] = useState<any[]>([]);
//   if (!planId) {
//     return <div className="p-6">Plan not found</div>;
//   }

//   /* ---------------- LOAD DASHBOARD ---------------- */

//  useEffect(() => {
//   let mounted = true;

//   async function load() {
//     setLoading(true);

//     try {
//       const [
//         overviewRes,
//         alertsRes,
//         promptsRes,
//         scoreRes,
//         gapsRes,
//          competitorsRes,
//       ] = await Promise.all([
//         api(`/aeo/overview/simple?planId=${planId}`),
//         api(`/aeo/alerts/${planId}`),
//         api(`/aeo/prompts?planId=${planId}`),
//         api(`/aeo/score`, { method: "POST", body: { planId } }),
//         api(`/aeo/gaps/${planId}`),
        
//          api(`/aeo/competitors/simple?planId=${planId}`), // 👈 ADD
//       ]);

//       if (!mounted) return;

//       const o = overviewRes?.data ?? {};
//       const alertsData = alertsRes?.data ?? [];
//       const scoreData = scoreRes?.data ?? {};
//       const gapsData = gapsRes?.data ?? [];
//      const competitorsData = competitorsRes?.data ?? [];
//       setOverview(o);
//       setVisibility(o.visibility ?? 0); // ✅ FIXED
//       setAlerts(alertsData);
//       setPrompts(Array.isArray(promptsRes) ? promptsRes : []);
//       setScore(scoreData.score ?? 0);
//       setGaps(gapsData);
//       setCompetitors(
//   Array.isArray(competitorsData) ? competitorsData : []
// );
//     } catch (err) {
//       console.error("AEO dashboard load failed", err);
//     } finally {
//       mounted && setLoading(false);
//     }
//   }

//   load();
//   return () => {
//     mounted = false;
//   };
// }, [planId]);


//   /* ---------------- SCORE EXPLANATION ---------------- */
// async function explainScore() {
//   // 1️⃣ Trigger explanation generation
//   await api(`/aeo/score/explain`, {
//     method: "POST",
//     body: { planId },
//   });

//   // 2️⃣ Fetch latest explanation
//   const res = await api(`/aeo/score/explain/${planId}`);

//   const data = res?.data;

//   setScoreExplain(
//     data
//       ? `${data.explanation}\n\nRecommendations:\n${data.recommendations}`
//       : ""
//   );
// }


//   if (loading) {
//     return (
//       <div className="flex h-[70vh] items-center justify-center text-muted-foreground">
//         Loading AEO dashboard...
//       </div>
//     );
//   }

//   /* ---------------- UI ---------------- */

//   return (
//     <div className="space-y-6 p-6">
//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold">AEO Dashboard</h1>
//           <p className="text-muted-foreground">
//             AI search visibility & answer gaps
//           </p>
//         </div>

//         <Button
//           onClick={async () => {
//             await fetch(
//               `${process.env.NEXT_PUBLIC_BACKEND_URL}/aeo/onboard/start`,
//               {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ planId }),
//               }
//             );
//             alert("AEO scan started");
//           }}
//         >
//           Run AEO Scan
//         </Button>
//       </div>

//       {/* KPI ROW */}
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//         <StatCard title="AEO Score" value={score} icon={<Target />} />
//         <StatCard
//           title="AI Visibility"
//           value={`${visibility}%`}
//           icon={<TrendingUp />}
//         />
//       <StatCard title="Prompts Won" value={overview?.won ?? 0} icon={<CheckCircle2 />} />
// <StatCard title="Prompts Lost" value={overview?.lost ?? 0} icon={<AlertTriangle />} />
// <StatCard title="Pages Optimized" value={overview?.pages ?? 0} icon={<Brain />} />

//       </div>

//       {/* SCORE EXPLANATION */}
//       <Card>
//         <CardHeader className="flex justify-between items-center">
//           <CardTitle>Why is my AEO score {score}?</CardTitle>
//           <Button size="sm" onClick={explainScore}>
//             Explain
//           </Button>
//         </CardHeader>
//         <CardContent>
//           {scoreExplain ? (
//             <p className="text-sm whitespace-pre-line">{scoreExplain}</p>
//           ) : (
//             <p className="text-sm text-muted-foreground">
//               Click “Explain” to understand what to improve.
//             </p>
//           )}
//         </CardContent>
//       </Card>

//       {/* ALERTS */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Alerts</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-2">
//           {alerts.length === 0 && (
//             <p className="text-sm text-muted-foreground">No alerts yet</p>
//           )}
//           {alerts.map((a) => (
//             <div key={a.id} className="rounded bg-muted p-2 text-sm">
//               {a.message}
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* ANSWER GAP MONITOR */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Split size={18} /> Answer Gap Monitor
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-3">
//           {gaps.length === 0 && (
//             <p className="text-sm text-muted-foreground">
//               No answer gaps detected 🎉
//             </p>
//           )}

//           {gaps.map((g) => (
//             <div key={g.id} className="border rounded p-3 space-y-1 text-sm">
//               <div className="font-medium">
//                 {g.aeo_prompts?.prompt}
//               </div>

//               <div className="flex justify-between text-xs">
//                 <Badge variant={g.missing ? "destructive" : "secondary"}>
//                   {g.missing ? "missing" : "covered"}
//                 </Badge>
//               </div>

//               <div className="text-xs text-muted-foreground">
//                 Suggested page: {g.suggestion}
//               </div>
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* PROMPTS */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Top AEO Prompts</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-2">
//           {prompts.map((p) => (
//             <div key={p.id} className="flex justify-between border p-2 rounded">
//               <span>{p.prompt}</span>
//               <Badge
//                 variant={p.status === "won" ? "default" : "destructive"}
//               >
//                 {p.status}
//               </Badge>
//             </div>
//           ))}
//         </CardContent>
//       </Card>
//       {/* COMPETITORS */}
// <Card>
//   <CardHeader>
//     <CardTitle>Competitor AI Visibility</CardTitle>
//   </CardHeader>

//   <CardContent className="space-y-2">
//     {competitors.length === 0 && (
//       <p className="text-sm text-muted-foreground">
//         No competitor data yet
//       </p>
//     )}

//     {competitors.map((c) => (
//       <div
//         key={c.domain}
//         className="flex justify-between border-b pb-1 text-sm"
//       >
//         <span>{c.domain}</span>
//         <span className="font-medium">{c.visibility}%</span>
//       </div>
//     ))}
//   </CardContent>
// </Card>

//     </div>
//   );
// }

// /* ---------------- STAT CARD ---------------- */

// function StatCard({ title, value, icon }: any) {
//   return (
//     <Card>
//       <CardContent className="flex justify-between items-center p-4">
//         <div>
//           <p className="text-sm text-muted-foreground">{title}</p>
//           <p className="text-2xl font-bold">{value}</p>
//         </div>
//         <div className="p-2 bg-muted rounded">{icon}</div>
//       </CardContent>
//     </Card>
//   );
// }





"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  TrendingUp,
  Brain,
  AlertTriangle,
  CheckCircle2,
  Target,
  Split,
} from "lucide-react";

export default function AeoDashboardPage() {
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan");

  const [loading, setLoading] = useState(true);

  const [overview, setOverview] = useState<any>(null);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [prompts, setPrompts] = useState<any[]>([]);
  const [gaps, setGaps] = useState<any[]>([]);
  const [competitors, setCompetitors] = useState<any[]>([]);
  const [presence, setPresence] = useState<any>(null);

  const [score, setScore] = useState(0);
  const [visibility, setVisibility] = useState(0);
  const [scoreExplain, setScoreExplain] = useState("");

  if (!planId) {
    return <div className="p-6">Plan not found</div>;
  }

  /* ---------------- LOAD DASHBOARD ---------------- */

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);

      try {
        const [
          overviewRes,
          alertsRes,
          promptsRes,
          scoreRes,
          gapsRes,
          competitorsRes,
          presenceRes
        ] = await Promise.all([
          api(`/aeo/overview/simple?planId=${planId}`),
          api(`/aeo/alerts/${planId}`),
          api(`/aeo/prompts?planId=${planId}`),
          api(`/aeo/score`, { method: "POST", body: { planId } }),
          api(`/aeo/gaps/${planId}`),
          api(`/aeo/competitors/simple?planId=${planId}`),
          api(`/aeo/presence-metrics?planId=${planId}`)
        ]);

        if (!mounted) return;

        setOverview(overviewRes?.data ?? {});
        setVisibility(overviewRes?.data?.visibility ?? 0);
        setAlerts(alertsRes?.data ?? []);
        setPrompts(Array.isArray(promptsRes) ? promptsRes : []);
        setScore(scoreRes?.data?.score ?? 0);
        setGaps(gapsRes?.data ?? []);
        setCompetitors(Array.isArray(competitorsRes?.data) ? competitorsRes.data : []);
        setPresence(presenceRes?.data ?? null);

      } catch (err) {
        console.error("AEO dashboard load failed", err);
      } finally {
        mounted && setLoading(false);
      }
    }

    load();
    return () => { mounted = false };
  }, [planId]);

  /* ---------------- SCORE EXPLANATION ---------------- */

  async function explainScore() {
    await api(`/aeo/score/explain`, { method: "POST", body: { planId } });
    const res = await api(`/aeo/score/explain/${planId}`);
    const data = res?.data;

    setScoreExplain(
      data
        ? `${data.explanation}\n\nRecommendations:\n${data.recommendations}`
        : ""
    );
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-muted-foreground">
        Loading AEO dashboard...
      </div>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-6 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">AEO Dashboard</h1>
          <p className="text-muted-foreground">
            AI search visibility & answer intelligence
          </p>
        </div>

        <Button
          onClick={async () => {
            await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/aeo/onboard/start`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ planId }),
              }
            );
            alert("AEO scan started");
          }}
        >
          Run AEO Scan
        </Button>
      </div>

      {/* KPI ROW */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">

        <StatCard title="AEO Score" value={score} icon={<Target />} />

        <StatCard
          title="AI Visibility"
          value={`${visibility}%`}
          icon={<TrendingUp />}
        />

        <StatCard
          title="Brand Presence"
          value={presence ? `${Math.round(presence.brand_presence * 100)}%` : "-"}
          icon={<Brain />}
        />

        <StatCard
          title="Wins"
          value={presence?.win_loss?.wins ?? 0}
          icon={<CheckCircle2 />}
        />

        <StatCard
          title="Losses"
          value={presence?.win_loss?.losses ?? 0}
          icon={<AlertTriangle />}
        />

        <StatCard
          title="Pages Optimized"
          value={overview?.pages ?? 0}
          icon={<Split />}
        />
      </div>

      {/* SCORE EXPLANATION */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Why is my AEO score {score}?</CardTitle>
          <Button size="sm" onClick={explainScore}>Explain</Button>
        </CardHeader>
        <CardContent>
          {scoreExplain ? (
            <p className="text-sm whitespace-pre-line">{scoreExplain}</p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Click “Explain” to understand what to improve.
            </p>
          )}
        </CardContent>
      </Card>

      {/* AI SHARE OF VOICE */}
      <Card>
        <CardHeader>
          <CardTitle>AI Share of Voice</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          {!presence && (
            <p className="text-sm text-muted-foreground">
              No presence data yet
            </p>
          )}

          {presence?.competitor_presence?.map((c:any) => (
            <div key={c.name} className="flex justify-between border-b pb-1 text-sm">
              <span>{c.name}</span>
              <span className="font-medium">
                {Math.round(c.rate * 100)}%
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ALERTS */}
      <Card>
        <CardHeader><CardTitle>Alerts</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {alerts.length === 0 && (
            <p className="text-sm text-muted-foreground">No alerts yet</p>
          )}
          {alerts.map((a) => (
            <div key={a.id} className="rounded bg-muted p-2 text-sm">
              {a.message}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* GAP MONITOR */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Split size={18} /> Answer Gap Monitor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {gaps.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No answer gaps detected 🎉
            </p>
          )}

          {gaps.map((g) => (
            <div key={g.id} className="border rounded p-3 space-y-1 text-sm">
              <div className="font-medium">
                {g.aeo_prompts?.prompt}
              </div>

              <div className="flex justify-between text-xs">
                <Badge variant={g.missing ? "destructive" : "secondary"}>
                  {g.missing ? "missing" : "covered"}
                </Badge>
              </div>

              <div className="text-xs text-muted-foreground">
                Suggested page: {g.suggestion}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

    </div>
  );
}

/* ---------------- STAT CARD ---------------- */

function StatCard({ title, value, icon }: any) {
  return (
    <Card>
      <CardContent className="flex justify-between items-center p-4">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="p-2 bg-muted rounded">{icon}</div>
      </CardContent>
    </Card>
  );
}