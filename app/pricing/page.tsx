"use client"

import { useState } from "react"
import { Header } from "@/components/marketing/header"
import { Footer } from "@/components/marketing/footer"
import { Button } from "@/components/ui/button"
import { Check, Sparkles } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Test Drive",
    description: "Perfect for exploring Tecsaro AI capabilities",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "5 pages analyzed",
      "Basic AI search audit",
      "SEO health check",
      "1 optimization suggestion",
      "Email support",
    ],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Starter",
    description: "For growing businesses ready to optimize",
    monthlyPrice: 79,
    yearlyPrice: 790,
    features: [
      "100 pages analyzed",
      "Full AI search audit",
      "SEO + GEO optimization",
      "Basic content AI",
      "1 website integration",
      "Weekly reports",
      "Priority email support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    description: "For teams serious about AI search dominance",
    monthlyPrice: 199,
    yearlyPrice: 1990,
    features: [
      "Unlimited pages",
      "Advanced AI search optimization",
      "SEO + GEO + AEO",
      "Full Content AI suite",
      "Direct publishing",
      "Automation workflows",
      "5 website integrations",
      "Real-time analytics",
      "API access",
      "Dedicated support",
    ],
    cta: "Start Pro Trial",
    highlighted: true,
  },
]

const addons = [
  { name: "Extra Website Integration", price: "$29/mo" },
  { name: "Custom AI Training", price: "$499 one-time" },
  // { name: "White Label Reports", price: "$49/mo" },
  // { name: "Priority API Access", price: "$99/mo" },
]

const comparisonFeatures = [
  { name: "Pages Analyzed", testDrive: "5", starter: "100", pro: "Unlimited" },
  { name: "AI Search Audit", testDrive: "Basic", starter: "Full", pro: "Advanced" },
  { name: "SEO Optimization", testDrive: "Check only", starter: "Yes", pro: "Yes" },
  { name: "GEO Optimization", testDrive: "-", starter: "Yes", pro: "Yes" },
  { name: "AEO Optimization", testDrive: "-", starter: "-", pro: "Yes" },
  { name: "Content AI", testDrive: "-", starter: "Basic", pro: "Full Suite" },
  { name: "Direct Publishing", testDrive: "-", starter: "-", pro: "Yes" },
  { name: "Automation", testDrive: "-", starter: "-", pro: "Yes" },
  { name: "Website Integrations", testDrive: "-", starter: "1", pro: "5" },
  { name: "Analytics", testDrive: "-", starter: "Weekly", pro: "Real-time" },
  { name: "API Access", testDrive: "-", starter: "-", pro: "Yes" },
  { name: "Support", testDrive: "Email", starter: "Priority", pro: "Dedicated" },
]

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly")

  return (
    <main className="min-h-screen bg-cloud">
      <Header />
      
      {/* Hero section */}
      <section className="pt-32 pb-16 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald/10 blur-[100px]" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>
          
          {/* Billing toggle */}
          <div className="inline-flex items-center gap-4 p-1 rounded-full bg-white/10">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingPeriod === "monthly"
                  ? "bg-emerald text-charcoal"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                billingPeriod === "yearly"
                  ? "bg-emerald text-charcoal"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Yearly
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber text-charcoal font-semibold">
                Save 17%
              </span>
            </button>
          </div>
        </div>
      </section>
      
      {/* Pricing cards */}
      <section className="py-16 -mt-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
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
                      <Sparkles className="h-4 w-4" />
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className={`font-heading text-xl font-bold mb-2 ${
                    plan.highlighted ? "text-white" : "text-charcoal"
                  }`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${plan.highlighted ? "text-gray-400" : "text-graphite"}`}>
                    {plan.description}
                  </p>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className={`font-mono text-4xl font-bold ${
                      plan.highlighted ? "text-white" : "text-charcoal"
                    }`}>
                      ${billingPeriod === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                    </span>
                    <span className={plan.highlighted ? "text-gray-400" : "text-graphite"}>
                      /{billingPeriod === "monthly" ? "mo" : "yr"}
                    </span>
                  </div>
                  {billingPeriod === "yearly" && plan.monthlyPrice > 0 && (
                    <p className={`text-sm mt-1 ${plan.highlighted ? "text-gray-500" : "text-graphite"}`}>
                      ${Math.round(plan.yearlyPrice / 12)}/mo billed annually
                    </p>
                  )}
                </div>
                
                <Link href="/signup">
                  <Button
                    className={`w-full h-12 font-semibold ${
                      plan.highlighted
                        ? "bg-emerald hover:bg-emerald-dark text-charcoal"
                        : "bg-charcoal hover:bg-charcoal-light text-white"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
                
                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className={`h-5 w-5 shrink-0 ${
                        plan.highlighted ? "text-emerald" : "text-emerald"
                      }`} />
                      <span className={`text-sm ${
                        plan.highlighted ? "text-gray-300" : "text-graphite"
                      }`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Feature comparison table */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal text-center mb-12">
            Compare Plans
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 pr-4 font-semibold text-charcoal">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold text-charcoal">Test Drive</th>
                  <th className="text-center py-4 px-4 font-semibold text-charcoal">Starter</th>
                  <th className="text-center py-4 px-4 font-semibold text-emerald">Pro</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, index) => (
                  <tr key={feature.name} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                    <td className="py-4 pr-4 text-sm text-charcoal">{feature.name}</td>
                    <td className="py-4 px-4 text-sm text-center text-graphite">{feature.testDrive}</td>
                    <td className="py-4 px-4 text-sm text-center text-graphite">{feature.starter}</td>
                    <td className="py-4 px-4 text-sm text-center font-medium text-charcoal">{feature.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      {/* Add-ons */}
      <section className="py-16 bg-cloud">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal text-center mb-4">
            Power-ups & Add-ons
          </h2>
          <p className="text-graphite text-center mb-12 max-w-2xl mx-auto">
            Enhance your plan with additional features
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {addons.map((addon) => (
              <div key={addon.name} className="p-6 rounded-xl bg-white border border-gray-200">
                <h3 className="font-semibold text-charcoal mb-2">{addon.name}</h3>
                <p className="font-mono text-lg text-emerald">{addon.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ CTA */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl font-bold text-charcoal mb-4">
            Have questions?
          </h2>
          <p className="text-graphite mb-6">
            Check out our FAQ or reach out to our team
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/faq">
              <Button variant="outline" className="border-charcoal text-charcoal hover:bg-charcoal hover:text-white bg-transparent">
                View FAQ
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="bg-charcoal hover:bg-charcoal-light text-white">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
