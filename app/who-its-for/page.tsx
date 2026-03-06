



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
  Users,
  BarChart3,
  Globe,
  XCircle,
  ArrowRight,
} from "lucide-react"

const audiences = [
  {
    icon: Rocket,
    title: "Founders & Startups",
    points: [
      "Need AI visibility from day one",
      "No time for complex analysis",
      "Want to compete with bigger brands",
      "Need clear, actionable insights",
    ],
    description:
      "Tecsaro AI shows you if your brand appears in AI answers and tells you exactly what to do to improve — without needing a team of specialists.",
  },
  {
    icon: ShoppingBag,
    title: "E-commerce Businesses",
    points: [
      "Shoppers use AI for recommendations",
      "Products need AI discoverability",
      "Competitors may already be cited",
      "Schema impacts AI answer inclusion",
    ],
    description:
      "Track whether your products and brand are being recommended in AI answers, detect competitors, and generate schema to improve your chances of being cited.",
  },
  {
    icon: Code,
    title: "SaaS Companies",
    points: [
      "Users ask AI engines for tool recommendations",
      "AI answer presence drives signups",
      "Competitor mentions are a real risk",
      "Topical authority affects AI citations",
    ],
    description:
      "Know if your product is being recommended by AI engines, track competitor mentions, and get recommendations to strengthen your AI answer presence.",
  },
  {
    icon: Users,
    title: "Agencies & Consultants",
    points: [
      "Clients ask about AI visibility",
      "Need scalable tracking across clients",
      "Manual monitoring is time-consuming",
      "Want client-ready reporting",
    ],
    description:
      "Track AI visibility across multiple client websites, detect competitors in answers, and deliver clear reports — all from one platform.",
  },
  {
    icon: BarChart3,
    title: "Marketing Teams",
    points: [
      "Need AI visibility data alongside other metrics",
      "Brand monitoring now includes AI engines",
      "Content strategy must account for AEO",
      "Need clear metrics to report to leadership",
    ],
    description:
      "Add AI answer visibility to your existing measurement stack. Track daily changes, monitor competitors, and prioritize content improvements.",
  },
  {
    icon: Globe,
    title: "Growing Businesses",
    points: [
      "Website drives leads and revenue",
      "AI discovery is replacing traditional search",
      "Invisible in AI = losing potential customers",
      "Need to act now, not later",
    ],
    description:
      "Stay competitive as AI-powered search becomes the default. Know your current AI visibility and take the right steps to improve it.",
  },
]

export default function WhoItsForPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-charcoal to-background">
      <Header />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-2 bg-emerald/10 text-emerald rounded-full text-sm font-medium mb-6">
              Who It's For
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Built for businesses that need to be{" "}
              <span className="text-emerald">found in AI answers</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Tecsaro AI is for any business that wants to know where they stand in AI-generated
              answers — and wants a clear path to improving that visibility.
            </p>
          </motion.div>

          {/* Audience Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {audiences.map((audience, index) => (
              <motion.div
                key={audience.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-charcoal-light border border-white/10 rounded-2xl p-6 hover:border-emerald/40 transition-all"
              >
                <div className="w-12 h-12 bg-emerald/10 rounded-xl flex items-center justify-center mb-4">
                  <audience.icon className="h-6 w-6 text-emerald" />
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">
                  {audience.title}
                </h3>

                <ul className="space-y-2 text-gray-400 text-sm mb-4">
                  {audience.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 bg-emerald rounded-full flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-gray-300 text-sm">
                  {audience.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Not For Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-charcoal-light border border-white/10 rounded-2xl p-8 mb-24"
          >
            <div className="flex items-center gap-3 mb-6">
              <XCircle className="h-6 w-6 text-red-400" />
              <h2 className="text-2xl font-semibold text-white">
                Who Tecsaro AI is NOT for
              </h2>
            </div>

            <ul className="grid md:grid-cols-2 gap-4 text-gray-400">
              <li>• Hobby bloggers looking for free tools</li>
              <li>• One-page or offline-only businesses</li>
              <li>• People expecting guaranteed placements in AI answers</li>
              <li>• Businesses with no online presence to optimize</li>
            </ul>
          </motion.div>

          {/* Summary + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              <span className="text-white font-semibold">One-line summary:</span>{" "}
              Tecsaro AI is for businesses that depend on being discovered online —
              and want to know how visible they are in AI-powered answers today.
            </p>

            <Button
              size="lg"
              className="bg-emerald hover:bg-emerald-dark text-charcoal font-semibold"
              asChild
            >
              <Link href="/signup">
                Start your free trail
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  )
}