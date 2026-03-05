

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { supabaseBrowser } from "@/lib/supabaseClient";
// import { countries } from "@/lib/countries";
// import { goals } from "@/lib/goals";
// import { getLanguagesByCountry } from "@/lib/languages";

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// export default function CreatePlanPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({
//     name: "",
//     website_url: "",
//     country: "",
//     language: "en",
//     goal: "",
//   });

//   const languages = getLanguagesByCountry(form.country);

//   const submit = async () => {
//     if (!form.name || !form.website_url) {
//       return alert("Plan name and website are required");
//     }

//     setLoading(true);
//     const { data } = await supabaseBrowser.auth.getSession();
//     const token = data?.session?.access_token;

//     const res = await fetch(`${BACKEND_URL}/plans`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(form),
//     });

//     const json = await res.json();
//     if (!res.ok) return alert(json.error);

//     router.push(`/dashboard/overview?plan=${json.plan.id}`);
//   };

//   return (
//     <div className="min-h-screen bg-background px-6 py-10">
//       <div className="max-w-3xl mx-auto space-y-8">

//         {/* Header */}
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">
//             Create AI Optimization Plan
//           </h1>
//           <p className="text-muted-foreground mt-2">
//             Configure your website, target market and goals. You can change this later.
//           </p>
//         </div>

//         {/* Main Card */}
//         <div className="card p-8 space-y-6">

//           {/* Section */}
//           <div>
//             <h2 className="font-semibold text-lg mb-1">Basic Details</h2>
//             <p className="text-sm text-muted-foreground mb-4">
//               This helps us personalize your AI strategy
//             </p>

//             <div className="grid gap-4">
//               <input
//                 className="input"
//                 placeholder="Plan name (e.g. SEO Growth)"
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//               />

//               <input
//                 className="input"
//                 placeholder="Website domain (example.com)"
//                 value={form.website_url}
//                 onChange={(e) => setForm({ ...form, website_url: e.target.value })}
//               />
//             </div>
//           </div>

//           <hr className="border-border" />

//           {/* Section */}
//           <div>
//             <h2 className="font-semibold text-lg mb-1">Target Market</h2>

//             <div className="grid sm:grid-cols-2 gap-4 mt-4">
//               <select
//                 className="select"
//                 value={form.country}
//                 onChange={(e) => setForm({ ...form, country: e.target.value })}
//               >
//                 <option value="">Country</option>
//                 {countries.map((c) => (
//                   <option key={c.value} value={c.value}>{c.label}</option>
//                 ))}
//               </select>

//               <select
//                 className="select"
//                 value={form.language}
//                 disabled={!form.country}
//                 onChange={(e) => setForm({ ...form, language: e.target.value })}
//               >
//                 <option value="">Language</option>
//                 {languages.map((l) => (
//                   <option key={l.value} value={l.value}>{l.label}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <hr className="border-border" />

//           {/* Section */}
//           <div>
//             <h2 className="font-semibold text-lg mb-1">Primary Goal</h2>
//             <select
//               className="select mt-3"
//               value={form.goal}
//               onChange={(e) => setForm({ ...form, goal: e.target.value })}
//             >
//               <option value="">Choose goal</option>
//               {goals.map((g) => (
//                 <option key={g.value} value={g.value}>{g.label}</option>
//               ))}
//             </select>
//           </div>

//           {/* Footer */}
//           <div className="flex justify-end pt-6">
//             <button
//               disabled={loading}
//               onClick={submit}
//               className="button-primary px-8"
//             >
//               {loading ? "Creating..." : "Create Plan"}
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }






"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseClient";
import { countries } from "@/lib/countries";
import { goals } from "@/lib/goals";
import { getLanguagesByCountry } from "@/lib/languages";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Target, Settings, Loader2 } from "lucide-react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function CreatePlanPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    website_url: "",
    country: "",
    language: "en",
    goal: "",
  });

  const languages = getLanguagesByCountry(form.country);

  const submit = async () => {
    if (!form.name || !form.website_url) {
      alert("Plan name and website are required");
      return;
    }

    setLoading(true);

    const { data } = await supabaseBrowser.auth.getSession();
    const token = data?.session?.access_token;

    const res = await fetch(`${BACKEND_URL}/plans`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const json = await res.json();
    if (!res.ok) {
      setLoading(false);
      alert(json.error);
      return;
    }

    router.push(`/dashboard/overview?plan=${json.plan.id}`);
  };

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Create Optimization Plan
          </h1>
          <p className="text-muted-foreground mt-2">
            Tell us about your website so Tecsaro AI can optimize it for SEO, GEO & AEO.
          </p>
        </div>

        {/* Step 1 */}
        <Card>
          <CardContent className="p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Settings className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold">1. Website Setup</h2>
            </div>

            <div className="grid gap-4 mt-4">
              <input
                className="input"
                placeholder="Plan name (e.g. SEO Growth)"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                className="input"
                placeholder="Website domain (example.com)"
                value={form.website_url}
                onChange={(e) =>
                  setForm({ ...form, website_url: e.target.value })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Step 2 */}
        <Card>
          <CardContent className="p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold">2. Target Market</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <select
                className="select"
                value={form.country}
                onChange={(e) =>
                  setForm({ ...form, country: e.target.value })
                }
              >
                <option value="">Select country</option>
                {countries.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>

              <select
                className="select"
                value={form.language}
                disabled={!form.country}
                onChange={(e) =>
                  setForm({ ...form, language: e.target.value })
                }
              >
                <option value="">Language</option>
                {languages.map((l) => (
                  <option key={l.value} value={l.value}>
                    {l.label}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Step 3 */}
        <Card>
          <CardContent className="p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold">3. Primary Goal</h2>
            </div>

            <select
              className="select mt-4"
              value={form.goal}
              onChange={(e) => setForm({ ...form, goal: e.target.value })}
            >
              <option value="">Choose your goal</option>
              {goals.map((g) => (
                <option key={g.value} value={g.value}>
                  {g.label}
                </option>
              ))}
            </select>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="flex justify-end pt-6">
          <Button
            onClick={submit}
            disabled={loading}
            className="px-10 text-lg"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Creating Plan..." : "Create Plan"}
          </Button>
        </div>

      </div>
    </div>
  );
}
