


"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Header } from "@/components/marketing/header"
import { Footer } from "@/components/marketing/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Globe,
  MessageSquare,
  Activity,
  BarChart3,
  Users,
  Lightbulb,
  Code2,
  Shield,
  ArrowRight,
  Play,
  Check
} from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Globe,
    title: "Connect Your Website",
    description: "Enter your website URL and let Tecsaro AI crawl it. We extract page content, headings, FAQs, and existing structured data to understand your brand.",
    details: [
      "No technical setup required",
      "Works with any website",
      "Reads only publicly available content",
      "Crawl stored for ongoing analysis"
    ],
    color: "emerald"
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "Generate & Select Prompts",
    description: "Tecsaro AI automatically generates the questions real users are asking AI engines about your industry. Review the suggestions, add your own, and select the ones you want to track.",
    details: [
      "Auto-generated industry prompts",
      "Custom prompt support",
      "Brand and competitor queries",
      "Select the prompts that matter most"
    ],
    color: "violet"
  },
  {
    number: "03",
    icon: Activity,
    title: "Daily AI Visibility Tracking",
    description: "Every day, Tecsaro AI runs your selected prompts across ChatGPT, Gemini, and Perplexity — and checks whether your brand appears in the AI-generated answers.",
    details: [
      "Tracks ChatGPT responses",
      "Tracks Gemini responses",
      "Tracks Perplexity responses",
      "Runs automatically every day"
    ],
    color: "emerald"
  },
  {
    number: "04",
    icon: BarChart3,
    title: "View Your AEO Visibility Score",
    description: "See your consolidated AEO Visibility Score — calculated from brand mentions, position in answers, mention frequency, and competitor presence across all tracked prompts.",
    details: [
      "Overall visibility score",
      "Per-engine breakdown",
      "Mention frequency trends",
      "Score changes over time"
    ],
    color: "violet"
  },
  {
    number: "05",
    icon: Users,
    title: "Detect Competitors in AI Answers",
    description: "Tecsaro AI automatically surfaces other brands appearing in AI answers for your tracked prompts. See who is being recommended instead of — or alongside — you.",
    details: [
      "Auto-detected competitor brands",
      "Competitor mention frequency",
      "Side-by-side visibility comparison",
      "Add competitors to track manually"
    ],
    color: "emerald"
  },
  {
    number: "06",
    icon: Lightbulb,
    title: "Get Recommendations",
    description: "Based on your visibility data, Tecsaro AI gives you clear, prioritized recommendations to improve how often your brand appears in AI-generated answers.",
    details: [
      "FAQ content suggestions",
      "Topical authority guidance",
      "Content structure improvements",
      "Schema implementation tips"
    ],
    color: "violet"
  },
  {
    number: "07",
    icon: Code2,
    title: "Generate & Implement Schema",
    description: "Tecsaro AI automatically generates structured schema markup for your pages — making it easier for AI engines to understand your content and cite your brand in answers.",
    details: [
      "FAQ schema generation",
      "Organization schema",
      "Article schema",
      "Product schema (where applicable)"
    ],
    color: "emerald"
  }
]

function StepCard({ step, index }: { step: typeof steps[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"]
  })

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1])

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity }}
      className="relative"
    >
      {index < steps.length - 1 && (
        <div className="absolute left-8 top-24 w-0.5 h-32 bg-gradient-to-b from-border to-transparent hidden md:block" />
      )}

      <div className={`flex gap-6 ${index % 2 === 1 ? "md:flex-row-reverse md:text-right" : ""}`}>
        <div className="flex-shrink-0">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
            step.color === "emerald" ? "bg-emerald/10" : "bg-violet/10"
          }`}>
            <span className={`text-2xl font-bold ${
              step.color === "emerald" ? "text-emerald" : "text-violet"
            }`}>
              {step.number}
            </span>
          </div>
        </div>

        <div className="flex-1">
          <div className={`flex items-center gap-3 mb-3 ${index % 2 === 1 ? "md:justify-end" : ""}`}>
            <step.icon className={`w-5 h-5 ${step.color === "emerald" ? "text-emerald" : "text-violet"}`} />
            <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
          </div>
          <p className="text-muted-foreground mb-4">{step.description}</p>
          <ul className="space-y-2">
            {step.details.map((detail, i) => (
              <li
                key={i}
                className={`flex items-center gap-2 text-sm text-foreground ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              >
                <Check className={`w-4 h-4 flex-shrink-0 ${step.color === "emerald" ? "text-emerald" : "text-violet"}`} />
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

export default function HowItWorksPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-violet/5 to-transparent" />
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-emerald/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-violet/10 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-violet/10 text-violet rounded-full text-sm font-medium mb-6">
                <Play className="w-4 h-4" />
                How It Works
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                From website to{" "}
                <span className="text-gradient">AI answer visibility</span>
                {" "}in minutes
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Tecsaro AI crawls your website, tracks your brand across AI engines daily,
                detects competitors, and tells you exactly what to do to improve your visibility —
                all automatically.
              </p>
              <Button size="lg" className="bg-emerald hover:bg-emerald-dark text-white" asChild>
                <Link href="/signup">
                  Get started
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Steps Section */}
        <section ref={containerRef} className="py-20 relative">
          <div className="absolute left-4 md:left-1/2 top-0 w-1 h-full bg-border hidden md:block">
            <motion.div
              className="w-full bg-gradient-to-b from-emerald to-violet"
              style={{ height: progressHeight }}
            />
          </div>

          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-20">
              {steps.map((step, index) => (
                <StepCard key={step.number} step={step} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Security Badge */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-2xl mx-auto flex flex-col md:flex-row items-center gap-6 text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-emerald/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-8 h-8 text-emerald" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Safe & Non-Invasive</h3>
                <p className="text-muted-foreground">
                  Tecsaro AI only reads publicly available content on your website — the same
                  content AI engines already access. We never modify your website.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-charcoal text-white">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">See your AI visibility in minutes</h2>
              <p className="text-xl text-white/70 mb-8">
                Connect your website, set up your prompts, and get your first AEO Visibility Score today.
                No credit card required.
              </p>
              <Button size="lg" className="bg-emerald hover:bg-emerald-dark text-white" asChild>
                <Link href="/signup">
                  Get started
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}