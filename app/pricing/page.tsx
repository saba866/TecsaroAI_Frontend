



// "use client"
// import Script from "next/script"
// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Header } from "@/components/marketing/header"
// import { Footer } from "@/components/marketing/footer"
// import { Button } from "@/components/ui/button"
// import { Check, X, Sparkles } from "lucide-react"
// import Link from "next/link"
// import { supabaseBrowser } from "@/lib/supabaseClient"

// type PlanTier        = "free" | "starter" | "pro"
// type BillingInterval = "monthly" | "yearly"

// const plans = [
//   {
//     name: "Free", slug: "free" as PlanTier,
//     description: "Get started with basic AEO visibility tracking",
//     monthly: { price: "₹0", sub: "/month" },
//     yearly:  { price: "₹0", sub: "/year" },
//     highlighted: false,
//     features: [
//       "1 brand / website",
//       "Generate 20 prompts",
//       "Select up to 10 prompts to track",
//       "Track up to 3 competitors",
//       "Gemini only",
//       "AEO Visibility Score",
//        "1 AI audits per month", 
//       "Basic Recommendations",
//       "Schema generation",
//       "Email reports",
//       "Sharable report link "
//           ],
//     excluded: [
//       "Daily AI tracking",
//       "ChatGPT + Perplexity",
//     ],
//     cta: "Get Started Free",
//   },
//   {
//     name: "Starter", slug: "starter" as PlanTier,
//     description: "For founders and small businesses serious about AEO",
//     monthly: { price: "₹2,999",  sub: "/month" },
//     yearly:  { price: "₹29,990", sub: "/year", perMonth: "₹2,499/mo", savings: "2 months free" },
//     highlighted: false,
//     features: [
//       "1 brand / website",
//       "Up to 50 prompts generated",
//       "Select up to 20 prompts to track",
//       "Track up to 10 competitors",
//       "Website pages crawled",
//       "2 AI audits per month",
//       "Daily AI visibility tracking",
//       "ChatGPT + Gemini",
//       "AEO Visibility Score",
//       "Recommendations",
//       "Schema generation",
//       "Email reports",
//       "Shareable Report link"
      
//     ],
//     excluded: [
//       "Perplexity tracking",
     
//     ],
//     cta: "Get Started",
//   },
//   {
//     name: "Pro", slug: "pro" as PlanTier,
//     description: "For growing teams serious about AI answer visibility",
//     monthly: { price: "₹7,999",  sub: "/month" },
//     yearly:  { price: "₹79,990", sub: "/year", perMonth: "₹6,666/mo", savings: "2 months free" },
//     highlighted: true,
//     features: [
//       "Up to 3 brands / websites",
//       "Up to 100 prompts generated /brand",
//       "Select up to 50 prompts to track per brand",
//       "Track up to 15 competitors per brand",
//       "Website pages crawled",
//       "4 AI audits per month", 
//       "Daily AI visibility tracking",
//       "ChatGPT + Gemini + Perplexity",
//       "AEO Visibility Score",
//       "Advanced recommendations",
//       "Schema generation",
//       "Email reports",
//        "Shareable Report link",
//       "Priority support",

//     ],
//     excluded: [],
//     cta: "Get Started",
//   },
// ]

// const comparisonFeatures = [
//   { name: "Brands / Websites",     free: "1",        starter: "1",               pro: "3"         },
//   { name: "Prompts Generated",     free: "20",       starter: "50",              pro: "100 / brand"       },
//   { name: "Prompts Tracked",       free: "10",       starter: "Up to 20",        pro: "50 /brand" },
//   { name: "Competitors Tracked",   free: "3",        starter: "10",              pro: "15 /brand"        },
//   { name: "AI Engines",            free: "Gemini",   starter: "ChatGPT, Gemini", pro: "ChatGPT, Gemini, Perplexity"     },
//   { name: "AI Audits / Month", free: "1", starter: "2", pro: "4" },
//   { name: "Daily Tracking",        free: "—",        starter: "✓",               pro: "✓"         },
//   { name: "AEO Score",             free: "✓",        starter: "✓",               pro: "✓"         },
//   { name: "Recommendations",       free: "✓",        starter: "✓",               pro: "Advanced"  },
//   { name: "Schema Generation",     free: "✓",        starter: "✓",               pro: "✓"         },
//   { name: "Email Reports",         free: "1 basic report /month",        starter: "daily & monthly Report",               pro: "daily & weekly report"         },
//   { name: "shareable report link",         free: "✓",        starter: "✓",               pro: "✓"         },
//   { name: "Support",               free: "—",        starter: "Email",           pro: "Priority"  },
// ]

// export default function PricingPage() {
//   const router = useRouter()
//   const [billingPeriod, setBillingPeriod] = useState<BillingInterval>("monthly")

//   const handleCTA = async (slug: PlanTier) => {
//     const { data } = await supabaseBrowser.auth.getSession()

//     if (!data?.session) {
//       router.push(`/signup?plan=${slug}&interval=${billingPeriod}`)
//       return
//     }

//     if (slug === "free") {
//       router.push("/dashboard")
//       return
//     }

//     router.push(`/dashboard/billing?plan=${slug}&interval=${billingPeriod}`)
//   }

//   return (
//     <main className="min-h-screen bg-cloud">
//       <Script id="schema-pricing" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
//         "@context": "https://schema.org",
//         "@type": "WebPage",
//         name: "Tecsaro AI Pricing — AEO Platform Plans",
//         url: "https://ai.tecsaro.com/pricing",
//         description: "Free, Starter and Pro plans for AEO tracking. Free plan available forever. No credit card required.",
//         breadcrumb: {
//           "@type": "BreadcrumbList",
//           itemListElement: [
//             { "@type": "ListItem", position: 1, name: "Home",    item: "https://ai.tecsaro.com" },
//             { "@type": "ListItem", position: 2, name: "Pricing", item: "https://ai.tecsaro.com/pricing" },
//           ],
//         },
//       })}} />
//       <Header />

//       {/* ── Hero ── */}
//       <section className="pt-32 pb-16 bg-charcoal relative overflow-hidden">
//         <div className="absolute inset-0">
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald/10 blur-[100px]" />
//         </div>
//         <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
//           <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
//             Simple, transparent pricing
//           </h1>
//           <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-2">
//             Start free — no credit card required. Upgrade when you're ready.
//           </p>
//           <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white/10 mt-6">
//             <button
//               onClick={() => setBillingPeriod("monthly")}
//               className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
//                 billingPeriod === "monthly" ? "bg-emerald text-charcoal" : "text-gray-400 hover:text-white"
//               }`}
//             >
//               Monthly
//             </button>
//             <button
//               onClick={() => setBillingPeriod("yearly")}
//               className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
//                 billingPeriod === "yearly" ? "bg-emerald text-charcoal" : "text-gray-400 hover:text-white"
//               }`}
//             >
//               Yearly
//               <span className="text-xs px-2 py-0.5 rounded-full bg-amber text-charcoal font-semibold">
//                 2 months free
//               </span>
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* ── Pricing cards ── */}
//       <section className="py-16 -mt-8">
//         <div className="mx-auto max-w-7xl px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
//             {plans.map((plan) => {
//               const pricing = plan.slug === "free" ? plan.monthly : plan[billingPeriod]
//               return (
//                 <div
//                   key={plan.name}
//                   className={`relative rounded-2xl p-8 flex flex-col ${
//                     plan.highlighted
//                       ? "bg-charcoal text-white ring-2 ring-emerald"
//                       : "bg-white border border-gray-200"
//                   }`}
//                 >
//                   {plan.highlighted && (
//                     <div className="absolute -top-4 left-1/2 -translate-x-1/2">
//                       <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-emerald text-charcoal text-sm font-semibold">
//                         <Sparkles className="h-4 w-4" /> Most Popular
//                       </span>
//                     </div>
//                   )}

//                   <div className="mb-4">
//                     <h3 className={`font-heading text-xl font-bold mb-1 ${plan.highlighted ? "text-white" : "text-charcoal"}`}>
//                       {plan.name}
//                     </h3>
//                     <p className={`text-sm mb-3 ${plan.highlighted ? "text-gray-400" : "text-graphite"}`}>
//                       {plan.description}
//                     </p>
//                     {plan.slug === "free" && (
//                       <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald/10 text-emerald">
//                         Free forever — no credit card
//                       </span>
//                     )}
//                   </div>

//                   {/* Price */}
//                   <div className="mb-6">
//                     <div className="flex items-baseline gap-1">
//                       <span className={`font-mono text-4xl font-bold ${plan.highlighted ? "text-white" : "text-charcoal"}`}>
//                         {pricing.price}
//                       </span>
//                       <span className={plan.highlighted ? "text-gray-400" : "text-graphite"}>
//                         {pricing.sub}
//                       </span>
//                     </div>
//                     {"perMonth" in pricing && (
//                       <div className="flex items-center gap-2 mt-1">
//                         <p className={`text-sm ${plan.highlighted ? "text-gray-400" : "text-graphite"}`}>
//                           {pricing.perMonth} billed annually
//                         </p>
//                         <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald/20 text-emerald">
//                           {pricing.savings}
//                         </span>
//                       </div>
//                     )}
//                   </div>

//                   <Button
//                     onClick={() => handleCTA(plan.slug)}
//                     className={`w-full h-12 font-semibold ${
//                       plan.highlighted
//                         ? "bg-emerald hover:bg-emerald/90 text-charcoal"
//                         : plan.slug === "free"
//                         ? "bg-white border-2 border-charcoal text-charcoal hover:bg-gray-50"
//                         : "bg-charcoal hover:bg-charcoal/90 text-white"
//                     }`}
//                   >
//                     {plan.cta}
//                   </Button>

//                   <ul className="mt-8 space-y-3 flex-1">
//                     {plan.features.map((feature) => (
//                       <li key={feature} className="flex items-start gap-3">
//                         <Check className="h-5 w-5 shrink-0 text-emerald mt-0.5" />
//                         <span className={`text-sm ${plan.highlighted ? "text-gray-300" : "text-graphite"}`}>
//                           {feature}
//                         </span>
//                       </li>
//                     ))}
//                     {plan.excluded.map((feature) => (
//                       <li key={feature} className="flex items-start gap-3 opacity-40">
//                         <X className="h-5 w-5 shrink-0 text-gray-400 mt-0.5" />
//                         <span className={`text-sm ${plan.highlighted ? "text-gray-500" : "text-graphite"}`}>
//                           {feature}
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )
//             })}
//           </div>

//           <p className="text-center text-sm text-gray-500 mt-8">
//             Need more brands, higher limits, or custom engines?{" "}
//             <a href="mailto:support@tecsaro.com" className="text-emerald underline">Contact us</a> about Enterprise.
//           </p>
//         </div>
//       </section>

//       {/* ── Comparison table ── */}
//       <section className="py-16 bg-white">
//         <div className="mx-auto max-w-7xl px-6 lg:px-8">
//           <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal text-center mb-12">
//             Compare Plans
//           </h2>
//           <div className="overflow-x-auto max-w-4xl mx-auto">
//             <table className="w-full min-w-[600px]">
//               <thead>
//                 <tr className="border-b border-gray-200">
//                   <th className="text-left py-4 pr-4 font-semibold text-charcoal">Feature</th>
//                   <th className="text-center py-4 px-4 font-semibold text-charcoal">
//                     Free<br /><span className="text-xs font-mono text-graphite font-normal">₹0</span>
//                   </th>
//                   <th className="text-center py-4 px-4 font-semibold text-charcoal">
//                     Starter<br /><span className="text-xs font-mono text-graphite font-normal">₹2,999/mo</span>
//                   </th>
//                   <th className="text-center py-4 px-4 font-semibold text-emerald">
//                     Pro<br /><span className="text-xs font-mono text-graphite font-normal">₹7,999/mo</span>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {comparisonFeatures.map((feature, i) => (
//                   <tr key={feature.name} className={i % 2 === 0 ? "bg-gray-50" : ""}>
//                     <td className="py-4 pr-4 text-sm text-charcoal">{feature.name}</td>
//                     <td className="py-4 px-4 text-sm text-center text-graphite">{feature.free}</td>
//                     <td className="py-4 px-4 text-sm text-center text-graphite">{feature.starter}</td>
//                     <td className="py-4 px-4 text-sm text-center font-medium text-charcoal">{feature.pro}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </section>

//       {/* ── FAQ CTA ── */}
//       <section className="py-16 bg-cloud">
//         <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
//           <h2 className="font-heading text-2xl font-bold text-charcoal mb-4">Have questions?</h2>
//           <p className="text-graphite mb-6">Check our FAQ or reach out to our team</p>
//           <div className="flex items-center justify-center gap-4">
//             <Link href="/faq">
//               <Button variant="outline" className="border-charcoal text-charcoal hover:bg-charcoal hover:text-white bg-transparent">
//                 View FAQ
//               </Button>
//             </Link>
//             <Link href="mailto:support@tecsaro.com">
//               <Button className="bg-charcoal hover:bg-charcoal/90 text-white">
//                 Contact Us
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </main>
//   )
// }



"use client"
import Script from "next/script"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/marketing/header"
import { Footer } from "@/components/marketing/footer"
import { Button } from "@/components/ui/button"
import { Check, X, Sparkles } from "lucide-react"
import Link from "next/link"
import { supabaseBrowser } from "@/lib/supabaseClient"

type PlanTier        = "free" | "starter" | "pro"
type BillingInterval = "monthly" | "yearly"

const plans = [
  {
    name: "Free", slug: "free" as PlanTier,
    description: "Get started with basic AEO visibility tracking",
    monthly: { price: "₹0", sub: "/month" },
    yearly:  { price: "₹0", sub: "/year" },
    highlighted: false,
    features: [
      "1 brand / website",
      "Generate 20 prompts",
      "Select up to 10 prompts to track",
      "Track up to 3 competitors",
      "Gemini only",
      "AEO Visibility Score",
      "1 AI audit per month",
      "Basic Recommendations",
      "Schema generation",
      "Shareable report link",
      "Technical audit (3 pages preview)",
      "Email reports",
    ],
    excluded: [
      "Daily AI tracking",
      "ChatGPT + Perplexity",
      "Score history chart",
      "Competitor discovery",
      "AI Citation tracking",
    ],
    cta: "Get Started Free",
  },
  {
    name: "Starter", slug: "starter" as PlanTier,
    description: "For founders and small businesses serious about AEO",
    monthly: { price: "₹2,999",  sub: "/month" },
    yearly:  { price: "₹29,990", sub: "/year", perMonth: "₹2,499/mo", savings: "2 months free" },
    highlighted: false,
    features: [
      "1 brand / website",
      "Up to 50 prompts generated",
      "Select up to 20 prompts to track",
      "Track up to 10 competitors",
      "ChatGPT + Gemini",
      "2 AI audits per month",
      "Daily AI visibility tracking",
      "AEO Visibility Score",
      "Full Recommendations",
      "Schema generation",
      "Shareable report link",
      "Technical audit (all pages)",
      "Score history chart",
      "Competitor discovery",
      "Email reports",
    ],
    excluded: [
      "Perplexity tracking",
      "AI Citation tracking",
    ],
    cta: "Get Started",
  },
  {
    name: "Pro", slug: "pro" as PlanTier,
    description: "For growing teams serious about AI answer visibility",
    monthly: { price: "₹7,999",  sub: "/month" },
    yearly:  { price: "₹79,990", sub: "/year", perMonth: "₹6,666/mo", savings: "2 months free" },
    highlighted: true,
    features: [
      "Up to 3 brands / websites",
      "Up to 100 prompts generated/brand",
      "Select up to 50 prompts to track/brand",
      "Track up to 15 competitors/brand",
      "ChatGPT + Gemini + Perplexity",
      "4 AI audits per month",
      "Daily AI visibility tracking",
      "AEO Visibility Score",
      "Advanced recommendations",
      "Schema generation",
      "Shareable report link",
      "Technical audit (all pages)",
      "Score history chart",
      "Competitor discovery",
      "AI Citation tracking ✦",
      "Citation rate by engine ✦",
      "Missing source gaps ✦",
      "Email reports",
      "Priority support",
    ],
    excluded: [],
    cta: "Get Started",
  },
]

const comparisonFeatures = [
  { name: "Brands / Websites",        free: "1",                  starter: "1",                       pro: "3"                              },
  { name: "Prompts Generated",        free: "20",                 starter: "50",                      pro: "100 / brand"                    },
  { name: "Prompts Tracked",          free: "10",                 starter: "20",                      pro: "50 / brand"                     },
  { name: "Competitors Tracked",      free: "3",                  starter: "10",                      pro: "15 / brand"                     },
  { name: "AI Engines",               free: "Gemini",             starter: "ChatGPT, Gemini",         pro: "ChatGPT, Gemini, Perplexity"    },
  { name: "AI Audits / Month",        free: "1",                  starter: "2",                       pro: "4"                              },
  { name: "Daily Tracking",           free: "—",                  starter: "✓",                       pro: "✓"                              },
  { name: "AEO Score",                free: "✓",                  starter: "✓",                       pro: "✓"                              },
  { name: "Score History Chart",      free: "—",                  starter: "✓",                       pro: "✓"                              },
  { name: "Recommendations",          free: "Basic",              starter: "Full",                    pro: "Advanced"                       },
  { name: "Schema Generation",        free: "✓",                  starter: "✓",                       pro: "✓"                              },
  { name: "Shareable Report Link",    free: "✓",                  starter: "✓",                       pro: "✓"                              },
  { name: "Technical Audit",          free: "3 pages preview",    starter: "All pages",               pro: "All pages"                      },
  { name: "Competitor Discovery",     free: "—",                  starter: "✓",                       pro: "✓"                              },
  { name: "AI Citation Tracking",     free: "—",                  starter: "—",                       pro: "✓ Perplexity native"            },
  { name: "Citation Rate by Engine",  free: "—",                  starter: "—",                       pro: "✓"                              },
  { name: "Missing Source Gaps",      free: "—",                  starter: "—",                       pro: "✓"                              },
  { name: "Email Reports",            free: "1 basic/month",      starter: "Daily & monthly",         pro: "Daily & weekly"                 },
  { name: "Support",                  free: "—",                  starter: "Email",                   pro: "Priority"                       },
]

export default function PricingPage() {
  const router = useRouter()
  const [billingPeriod, setBillingPeriod] = useState<BillingInterval>("monthly")

  const handleCTA = async (slug: PlanTier) => {
    const { data } = await supabaseBrowser.auth.getSession()
    if (!data?.session) {
      router.push(`/signup?plan=${slug}&interval=${billingPeriod}`)
      return
    }
    if (slug === "free") {
      router.push("/dashboard")
      return
    }
    router.push(`/dashboard/billing?plan=${slug}&interval=${billingPeriod}`)
  }

  return (
    <main className="min-h-screen bg-cloud">
      <Script id="schema-pricing" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Tecsaro AI Pricing — AEO Platform Plans",
        url: "https://ai.tecsaro.com/pricing",
        description: "Free, Starter and Pro plans for AEO tracking. Free plan available forever. No credit card required.",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home",    item: "https://ai.tecsaro.com" },
            { "@type": "ListItem", position: 2, name: "Pricing", item: "https://ai.tecsaro.com/pricing" },
          ],
        },
      })}} />
      <Header />

      {/* ── Hero ── */}
      <section className="pt-32 pb-16 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald/10 blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-2">
            Start free — no credit card required. Upgrade when you're ready.
          </p>
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white/10 mt-6">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingPeriod === "monthly" ? "bg-emerald text-charcoal" : "text-gray-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                billingPeriod === "yearly" ? "bg-emerald text-charcoal" : "text-gray-400 hover:text-white"
              }`}
            >
              Yearly
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber text-charcoal font-semibold">
                2 months free
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ── Pricing cards ── */}
      <section className="py-16 -mt-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => {
              const pricing = plan.slug === "free" ? plan.monthly : plan[billingPeriod]
              return (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl p-8 flex flex-col ${
                    plan.highlighted
                      ? "bg-charcoal text-white ring-2 ring-emerald"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-emerald text-charcoal text-sm font-semibold">
                        <Sparkles className="h-4 w-4" /> Most Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-4">
                    <h3 className={`font-heading text-xl font-bold mb-1 ${plan.highlighted ? "text-white" : "text-charcoal"}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-sm mb-3 ${plan.highlighted ? "text-gray-400" : "text-graphite"}`}>
                      {plan.description}
                    </p>
                    {plan.slug === "free" && (
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald/10 text-emerald">
                        Free forever — no credit card
                      </span>
                    )}
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className={`font-mono text-4xl font-bold ${plan.highlighted ? "text-white" : "text-charcoal"}`}>
                        {pricing.price}
                      </span>
                      <span className={plan.highlighted ? "text-gray-400" : "text-graphite"}>
                        {pricing.sub}
                      </span>
                    </div>
                    {"perMonth" in pricing && (
                      <div className="flex items-center gap-2 mt-1">
                        <p className={`text-sm ${plan.highlighted ? "text-gray-400" : "text-graphite"}`}>
                          {pricing.perMonth} billed annually
                        </p>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald/20 text-emerald">
                          {pricing.savings}
                        </span>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={() => handleCTA(plan.slug)}
                    className={`w-full h-12 font-semibold ${
                      plan.highlighted
                        ? "bg-emerald hover:bg-emerald/90 text-charcoal"
                        : plan.slug === "free"
                        ? "bg-white border-2 border-charcoal text-charcoal hover:bg-gray-50"
                        : "bg-charcoal hover:bg-charcoal/90 text-white"
                    }`}
                  >
                    {plan.cta}
                  </Button>

                  <ul className="mt-8 space-y-3 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="h-5 w-5 shrink-0 text-emerald mt-0.5" />
                        <span className={`text-sm ${plan.highlighted ? "text-gray-300" : "text-graphite"}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                    {plan.excluded.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 opacity-40">
                        <X className="h-5 w-5 shrink-0 text-gray-400 mt-0.5" />
                        <span className={`text-sm ${plan.highlighted ? "text-gray-500" : "text-graphite"}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {plan.slug === "pro" && (
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <p className="text-[11px] text-emerald font-mono leading-relaxed">
                        ✦ AI Citation tracking — see which sources AI engines cite in your category and whether your brand is one of them.
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            Need more brands, higher limits, or custom engines?{" "}
            <a href="mailto:support@tecsaro.com" className="text-emerald underline">Contact us</a> about Enterprise.
          </p>
        </div>
      </section>

      {/* ── Comparison table ── */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal text-center mb-12">
            Compare Plans
          </h2>
          <div className="overflow-x-auto max-w-4xl mx-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 pr-4 font-semibold text-charcoal">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold text-charcoal">
                    Free<br /><span className="text-xs font-mono text-graphite font-normal">₹0</span>
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-charcoal">
                    Starter<br /><span className="text-xs font-mono text-graphite font-normal">₹2,999/mo</span>
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-emerald">
                    Pro<br /><span className="text-xs font-mono text-graphite font-normal">₹7,999/mo</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, i) => (
                  <tr key={feature.name} className={i % 2 === 0 ? "bg-gray-50" : ""}>
                    <td className="py-4 pr-4 text-sm text-charcoal font-medium">{feature.name}</td>
                    <td className="py-4 px-4 text-sm text-center text-graphite">{feature.free}</td>
                    <td className="py-4 px-4 text-sm text-center text-graphite">{feature.starter}</td>
                    <td className="py-4 px-4 text-sm text-center font-medium text-charcoal">{feature.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FAQ CTA ── */}
      <section className="py-16 bg-cloud">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl font-bold text-charcoal mb-4">Have questions?</h2>
          <p className="text-graphite mb-6">Check our FAQ or reach out to our team</p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/faq">
              <Button variant="outline" className="border-charcoal text-charcoal hover:bg-charcoal hover:text-white bg-transparent">
                View FAQ
              </Button>
            </Link>
            <Link href="mailto:support@tecsaro.com">
              <Button className="bg-charcoal hover:bg-charcoal/90 text-white">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}