




"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/marketing/header"
import { Footer } from "@/components/marketing/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Rocket,
  ShoppingBag,
  Code,
  Building2,
  BarChart3,
  Globe,
  ArrowRight,
  Check,
  Activity,
  Target,
  MessageSquare
} from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1 }
  }
}

const solutions = [
  {
    icon: Rocket,
    title: "For Founders & Startups",
    problem: "You don't know if your brand appears in AI answers, and you lack the tools or time to find out.",
    solutions: [
      "Track AI visibility from day one",
      "See if ChatGPT mentions your brand",
      "Detect competitors in AI answers",
      "Get clear, actionable recommendations",
      "No technical expertise needed"
    ],
    color: "emerald"
  },
  {
    icon: ShoppingBag,
    title: "For E-commerce Businesses",
    problem: "Shoppers are asking AI engines for product recommendations — and your brand may not be showing up.",
    solutions: [
      "Track brand mentions in AI answers",
      "Detect competitors being recommended",
      "Generate product & FAQ schema",
      "Improve AI answer discoverability",
      "Monitor daily visibility changes"
    ],
    color: "violet"
  },
  {
    icon: Code,
    title: "For SaaS Companies",
    problem: "Potential users ask AI tools to recommend software — you need to know if your product is being cited.",
    solutions: [
      "Track AI mentions across engines",
      "Identify gaps in AI answer coverage",
      "Improve topical authority signals",
      "Generate schema for key pages",
      "Monitor competitor AI presence"
    ],
    color: "emerald"
  },
  {
    icon: Building2,
    title: "For Agencies & Consultants",
    problem: "Clients want to know their AI visibility — and you need a reliable way to track and report on it.",
    solutions: [
      "Manage multiple client websites",
      "Daily automated AI tracking",
      "Client-ready visibility reports",
      "Competitor detection per client",
      "Recommendations ready to act on"
    ],
    color: "violet"
  },
  {
    icon: BarChart3,
    title: "For Marketing Teams",
    problem: "You need clear data on where your brand stands in AI-generated answers — not just traditional search.",
    solutions: [
      "Centralize AI visibility tracking",
      "Monitor ChatGPT, Gemini & Perplexity",
      "Measure brand mention frequency",
      "Prioritize content improvements",
      "Track progress over time"
    ],
    color: "emerald"
  },
  {
    icon: Globe,
    title: "For Growing Businesses",
    problem: "AI-powered discovery is replacing traditional search — and most businesses have no idea if they're visible.",
    solutions: [
      "Understand your current AI presence",
      "See who is appearing instead of you",
      "Get schema & content recommendations",
      "Track daily visibility trends",
      "Stay ahead as AI search grows"
    ],
    color: "violet"
  }
]

const whyItWorks = [
  {
    icon: Activity,
    title: "Daily tracking",
    description: "Know your AI visibility every single day"
  },
  {
    icon: Target,
    title: "Competitor awareness",
    description: "See who's appearing in answers instead of you"
  },
  {
    icon: MessageSquare,
    title: "Multi-engine coverage",
    description: "ChatGPT, Gemini, and Perplexity in one place"
  },
  {
    icon: Globe,
    title: "Action-focused",
    description: "Clear recommendations, not just data"
  }
]

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-violet/5 to-transparent" />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-violet/10 text-violet rounded-full text-sm font-medium mb-6">
                🧩 Solutions by Tecsaro AI
              </span>

              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Solve your AI visibility problem{" "}
                <span className="text-gradient">before your competitors do</span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Tecsaro AI helps businesses track, understand, and improve how their brand
                appears in AI-generated answers — across ChatGPT, Gemini, and Perplexity.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Solutions */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-card border border-border rounded-2xl p-8 hover:border-emerald/50 transition"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                    solution.color === "emerald" ? "bg-emerald/10" : "bg-violet/10"
                  }`}>
                    <solution.icon className={`w-7 h-7 ${
                      solution.color === "emerald" ? "text-emerald" : "text-violet"
                    }`} />
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-foreground">
                    {solution.title}
                  </h3>

                  <p className="text-muted-foreground mb-4">
                    <strong>Problem:</strong> {solution.problem}
                  </p>

                  <p className="text-emerald font-medium mb-3">Solution:</p>

                  <ul className="space-y-2">
                    {solution.solutions.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-foreground">
                        <Check className="w-4 h-4 text-emerald" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Why it works */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-3xl font-bold mb-12 text-foreground">
              Why Tecsaro AI Works
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {whyItWorks.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-emerald/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-emerald" />
                  </div>
                  <h3 className="font-semibold mb-2 text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Get Started Free
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            See exactly where your brand stands in AI-powered answers — today.
          </p>

          <Button size="lg" className="bg-emerald hover:bg-emerald-dark text-white" asChild>
            <Link href="/signup">
             Get Started Free
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  )
}