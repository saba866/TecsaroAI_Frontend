// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { supabaseBrowser } from "@/lib/supabaseClient";

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// export default function PlansPage() {
//   const [plans, setPlans] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const loadPlans = async () => {
//       try {
//         const { data } = await supabaseBrowser.auth.getSession();
//         const token = data?.session?.access_token;

//         const res = await fetch(`${BACKEND_URL}/plans`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!res.ok) throw new Error("Failed to load plans");

//         const json = await res.json();
//         setPlans(Array.isArray(json) ? json : []);
//       } catch (err) {
//         console.error("Load plans error:", err);
//         setPlans([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadPlans();
//   }, []);

//   return (
//     <div className="max-w-5xl mx-auto p-10">
//       <div className="flex justify-between mb-6">
//         <h1 className="text-2xl font-bold">Your Plans</h1>

//         <button
//           onClick={() => router.push("/dashboard/plans/new")}
//           className="button-primary"
//         >
//           + New Plan
//         </button>
//       </div>

//       {loading ? (
//         <p className="text-muted-foreground">Loading...</p>
//       ) : plans.length === 0 ? (
//         <p className="text-muted-foreground">No plans yet</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {plans.map((plan) => (
//             <div
//               key={plan.id}
//               className="card cursor-pointer hover:border-emerald/40 transition"
//               onClick={() =>
//                 router.push(`/dashboard/overview?plan=${plan.id}`)
//               }
//             >
//               <h2 className="font-semibold text-lg">{plan.name}</h2>
//               <p className="text-sm text-muted-foreground">
//                 {plan.website_url}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }




// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { supabaseBrowser } from "@/lib/supabaseClient";

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// export default function PlansPage() {
//   const [plans, setPlans] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const loadPlans = async () => {
//       const { data } = await supabaseBrowser.auth.getSession();
//       const token = data?.session?.access_token;

//       const res = await fetch(`${BACKEND_URL}/plans`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const json = await res.json();
//       setPlans(Array.isArray(json) ? json : []);
//       setLoading(false);
//     };

//     loadPlans();
//   }, []);

//   return (
//     <div className="min-h-screen bg-background text-foreground px-4 sm:px-8 py-8">
//       <div className="max-w-6xl mx-auto space-y-8">

//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-heading font-bold">
//               Your Plans
//             </h1>
//             <p className="text-muted-foreground text-sm">
//               Manage your AI optimization plans
//             </p>
//           </div>

//           <button
//             onClick={() => router.push("/dashboard/plans/new")}
//             className="button-primary w-full sm:w-auto"
//           >
//             + Create Plan
//           </button>
//         </div>

//         {/* Content */}
//         {loading ? (
//           <div className="text-muted-foreground">Loading plans…</div>
//         ) : plans.length === 0 ? (
//           <div className="card text-center py-12">
//             <p className="text-muted-foreground mb-4">No plans yet</p>
//             <button
//               onClick={() => router.push("/dashboard/plans/new")}
//               className="button-primary"
//             >
//               Create your first plan
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {plans.map((plan) => (
//               <div
//                 key={plan.id}
//                 onClick={() =>
//                   router.push(`/dashboard/overview?plan=${plan.id}`)
//                 }
//                 className="card cursor-pointer hover:border-emerald/40 hover:shadow-lg transition group"
//               >
//                 <h2 className="text-lg font-semibold group-hover:text-emerald transition">
//                   {plan.name}
//                 </h2>
//                 <p className="text-sm text-muted-foreground mt-1">
//                   {plan.website_url}
//                 </p>

//                 <div className="mt-4 text-xs text-muted-foreground">
//                   Created {new Date(plan.created_at).toLocaleDateString()}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }






// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { supabaseBrowser } from "@/lib/supabaseClient";

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// export default function PlansPage() {
//   const [plans, setPlans] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const loadPlans = async () => {
//       const { data } = await supabaseBrowser.auth.getSession();
//       const token = data?.session?.access_token;

//       const res = await fetch(`${BACKEND_URL}/plans`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const json = await res.json();
//       setPlans(Array.isArray(json) ? json : []);
//       setLoading(false);
//     };

//     loadPlans();
//   }, []);

//   return (
//     <div className="min-h-screen bg-background px-6 py-10">
//       <div className="max-w-7xl mx-auto space-y-8">

//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold tracking-tight">Plans</h1>
//             <p className="text-muted-foreground mt-1">
//               Manage all your AI optimization projects
//             </p>
//           </div>

//           <button
//             onClick={() => router.push("/dashboard/plans/new")}
//             className="button-primary"
//           >
//             + New Plan
//           </button>
//         </div>

//         {/* Content */}
//         {loading ? (
//           <div className="text-muted-foreground">Loading…</div>
//         ) : plans.length === 0 ? (
//           <div className="card p-12 text-center">
//             <h2 className="text-lg font-semibold mb-2">No plans yet</h2>
//             <p className="text-muted-foreground mb-6">
//               Create your first AI plan to start optimizing your website
//             </p>
//             <button
//               onClick={() => router.push("/dashboard/plans/new")}
//               className="button-primary"
//             >
//               Create Plan
//             </button>
//           </div>
//         ) : (
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {plans.map((plan) => (
//               <div
//                 key={plan.id}
//                 onClick={() =>
//                   router.push(`/dashboard/overview?plan=${plan.id}`)
//                 }
//                 className="card cursor-pointer hover:shadow-xl hover:-translate-y-1 transition"
//               >
//                 <h2 className="font-semibold text-lg">{plan.name}</h2>
//                 <p className="text-sm text-muted-foreground mt-1">
//                   {plan.website_url}
//                 </p>

//                 <div className="mt-6 text-xs text-muted-foreground">
//                   Created on {new Date(plan.created_at).toLocaleDateString()}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }





"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Globe, BarChart3, Brain, Plus } from "lucide-react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function PlansPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadPlans = async () => {
      const { data } = await supabaseBrowser.auth.getSession();
      const token = data?.session?.access_token;

      const res = await fetch(`${BACKEND_URL}/plans`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json();
      setPlans(Array.isArray(json) ? json : []);
      setLoading(false);
    };

    loadPlans();
  }, []);

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Plans</h1>
            <p className="text-muted-foreground mt-1">
              Manage all your SEO, GEO & AEO optimization projects
            </p>
          </div>

          <Button onClick={() => router.push("/dashboard/plans/new")}>
            <Plus className="h-4 w-4 mr-2" />
            New Plan
          </Button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-muted-foreground">Loading…</div>
        ) : plans.length === 0 ? (
          <Card className="p-12 text-center">
            <h2 className="text-lg font-semibold mb-2">No plans yet</h2>
            <p className="text-muted-foreground mb-6">
              Create your first AI plan to start optimizing your website
            </p>
            <Button onClick={() => router.push("/dashboard/plans/new")}>
              Create Plan
            </Button>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card key={plan.id} className="hover:shadow-lg transition">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-lg">{plan.name}</h2>
                      <p className="text-sm text-muted-foreground truncate max-w-[220px]">
                        {plan.website_url}
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Created on{" "}
                    {new Date(plan.created_at).toLocaleDateString()}
                  </div>
                </CardContent>

                <CardFooter className="flex gap-3 p-4 pt-0">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() =>
                      router.push(`/dashboard/overview?plan=${plan.id}`)
                    }
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Overview
                  </Button>

                  <Button
                    className="flex-1"
                    onClick={() =>
                      router.push(`/dashboard/content?plan=${plan.id}`)
                    }
                  >
                    <Brain className="h-4 w-4 mr-2" />
                    AEO
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
