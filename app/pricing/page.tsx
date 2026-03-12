






"use client"
import Script from "next/script"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/marketing/header"
import { Footer } from "@/components/marketing/footer"
import { Button } from "@/components/ui/button"
import { Check, Sparkles } from "lucide-react"
import Link from "next/link"
import { supabaseBrowser } from "@/lib/supabaseClient"

type PlanTier        = "starter" | "pro"
type BillingInterval = "monthly" | "yearly"

/* ── Pricing: Starter ₹2,999/mo · ₹29,990/yr | Pro ₹7,999/mo · ₹79,990/yr */
const plans = [
  {
    name: "Starter", slug: "starter" as PlanTier,
    description: "For founders and small businesses starting with AEO",
    monthly: { price: "₹2,999",  sub: "/month" },
    yearly:  { price: "₹29,990", sub: "/year", perMonth: "₹2,499/mo", savings: "2 months free" },
    trial: "7-day free trial", highlighted: false,
    features: [
      "1 brand / website",
      "Up to 50 prompts generated",
      "Select up to 20 prompts to track",
      "Track up to 10 competitors",
      "Website pages crawled",
      "Daily AI visibility tracking",
      "ChatGPT, Gemini",
      "AEO Visibility Score",
      "Recommendations",
      "Schema generation",
      "Email support",
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Pro", slug: "pro" as PlanTier,
    description: "For growing teams serious about AI answer visibility",
    monthly: { price: "₹7,999",  sub: "/month" },
    yearly:  { price: "₹79,990", sub: "/year", perMonth: "₹6,666/mo", savings: "2 months free" },
    trial: "7-day free trial", highlighted: true,
    features: [
      "Up to 3 brands / websites",
      "Up to 300 prompts generated",
      "Select up to 50 prompts to track per brand",
      "Track up to 15 competitors per brand",
      "Websites pages crawled",
      "Daily AI visibility tracking",
      "ChatGPT, Gemini & Perplexity",
      "AEO Visibility Score",
      "Advanced recommendations",
      "Schema generation",
      "Exportable reports",
      "Priority support",
    ],
    cta: "Start Free Trial",
  },
]

const comparisonFeatures = [
  { name: "Brands / Websites",    starter: "1",               pro: "3"         },
  { name: "Prompts Generated",    starter: "50",              pro: "300"       },
  { name: "Prompts Tracked",      starter: "Up to 20",        pro: "Up to 150" },
  { name: "Competitors Tracked",  starter: "10",              pro: "45"        },
  { name: "Pages Crawled",        starter: "Yes",             pro: "Yes"       },
  { name: "AI Engines Tracked",   starter: "ChatGPT, Gemini", pro: "All 3"     },
  { name: "Daily Tracking",       starter: "✓",               pro: "✓"         },
  { name: "AEO Visibility Score", starter: "✓",               pro: "✓"         },
  { name: "Recommendations",      starter: "✓",               pro: "Advanced"  },
  { name: "Schema Generation",    starter: "✓",               pro: "✓"         },
  { name: "Report Export",        starter: "—",               pro: "✓"         },
  { name: "Free Trial",           starter: "7 days",          pro: "7 days"    },
  { name: "Support",              starter: "Email",           pro: "Priority"  },
]

export default function PricingPage() {
  const router = useRouter()
  const [billingPeriod, setBillingPeriod] = useState<BillingInterval>("monthly")

  const handleCTA = async (slug: PlanTier) => {
    const { data } = await supabaseBrowser.auth.getSession()

    if (!data?.session) {
      // Not logged in → go to signup with plan pre-selected
      router.push(`/signup?plan=${slug}&interval=${billingPeriod}`)
      return
    }

    // Already logged in → send to billing page to subscribe/upgrade
    router.push(`/dashboard/billing?plan=${slug}&interval=${billingPeriod}`)
  }

  return (
    <main className="min-h-screen bg-cloud">
      <Script id="schema-pricing" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Tecsaro AI Pricing — AEO Platform Plans",
  url: "https://ai.tecsaro.com/pricing",
  description: "View Tecsaro AI pricing plans. Start with a 7-day free trial. Starter from ₹2,999/month. Pro from ₹7,999/month. No credit card required.",
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
            7-day free trial on all plans. No credit card required.
          </p>
          <p className="text-sm text-gray-500 max-w-xl mx-auto mb-8">
            Your trial starts when you sign up. If you don't upgrade, tracking stops after day 7 — you're never charged automatically.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white/10">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => {
              const pricing = plan[billingPeriod]
              return (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl p-8 ${
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

                  <div className="mb-6">
                    <h3 className={`font-heading text-xl font-bold mb-1 ${plan.highlighted ? "text-white" : "text-charcoal"}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-sm mb-2 ${plan.highlighted ? "text-gray-400" : "text-graphite"}`}>
                      {plan.description}
                    </p>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      plan.highlighted ? "bg-emerald/20 text-emerald" : "bg-emerald/10 text-emerald"
                    }`}>
                      {plan.trial} — no credit card required
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className={`font-mono text-4xl font-bold transition-all ${
                        plan.highlighted ? "text-white" : "text-charcoal"
                      }`}>
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
                   

                   {/* actual code */}
                  {/* <Button
                    onClick={() => handleCTA(plan.slug)}
                    className={`w-full h-12 font-semibold ${
                      plan.highlighted
                        ? "bg-emerald hover:bg-emerald/90 text-charcoal"
                        : "bg-charcoal hover:bg-charcoal/90 text-white"
                    }`}
                  >
                    {plan.cta}
                  </Button> */}

                  {/* comingsoon block */}
                  {plan.slug === "pro" ? (
  <div className="relative w-full h-12">
    <div className="w-full h-12 rounded-md bg-emerald/20 border border-emerald/30 flex items-center justify-center gap-2 cursor-not-allowed">
      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald/30 text-emerald font-mono">COMING SOON</span>
      <span className="text-sm font-semibold text-emerald/60">Pro Plan</span>
    </div>
  </div>
) : (
  <Button
    onClick={() => handleCTA(plan.slug)}
    className="w-full h-12 font-semibold bg-charcoal hover:bg-charcoal/90 text-white"
  >
    {plan.cta}
  </Button>
)}

                  <ul className="mt-8 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="h-5 w-5 shrink-0 text-emerald mt-0.5" />
                        <span className={`text-sm ${plan.highlighted ? "text-gray-300" : "text-graphite"}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
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
          <div className="overflow-x-auto max-w-3xl mx-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 pr-4 font-semibold text-charcoal">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold text-charcoal">
                    Starter<br />
                    <span className="text-xs font-mono text-graphite font-normal">₹2,999/mo</span>
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-emerald">
                    Pro<br />
                    <span className="text-xs font-mono text-graphite font-normal">₹7,999/mo</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, i) => (
                  <tr key={feature.name} className={i % 2 === 0 ? "bg-gray-50" : ""}>
                    <td className="py-4 pr-4 text-sm text-charcoal">{feature.name}</td>
                    <td className="py-4 px-4 text-sm text-center text-graphite">{feature.starter}</td>
                    <td className="py-4 px-4 text-sm text-center font-medium text-charcoal">{feature.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── How trial works ── */}
      <section className="py-16 bg-cloud">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl font-bold text-charcoal mb-4">How the free trial works</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8 text-left">
            {[
              { step: "1", title: "Sign up",            body: "Create your account. No credit card needed." },
              { step: "2", title: "Explore for 7 days", body: "Full access to all features on your chosen plan." },
              { step: "3", title: "Upgrade when ready", body: "If you don't upgrade, tracking stops on day 8. You're never charged automatically." },
            ].map((item) => (
              <div key={item.step} className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="w-8 h-8 rounded-full bg-emerald/10 text-emerald font-bold text-sm flex items-center justify-center mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold text-charcoal mb-1">{item.title}</h3>
                <p className="text-sm text-graphite">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ CTA ── */}
      <section className="py-16 bg-white">
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