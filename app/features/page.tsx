

"use client"
import Script from "next/script"
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
  Settings,
  ArrowRight,
  Check,
  Zap
} from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08
    }
  }
}

const featureCategories = [
  {
    id: "crawling",
    icon: Globe,
    title: "Website Crawling",
    color: "emerald",
    features: [
      "Full website content extraction",
      "Page headings and structure analysis",
      "FAQ detection and extraction",
      "Existing structured data detection",
      "Crawl data stored for ongoing analysis",
      "Works with any website"
    ]
  },
  {
    id: "prompts",
    icon: MessageSquare,
    title: "Prompt Generation & Management",
    color: "violet",
    features: [
      "Auto-generated industry and business prompts",
      "Custom prompt creation",
      "Prompt library management",
      "Select prompts to track (min / max per plan)",
      "Brand-focused and competitor-focused queries",
      "Prompt performance history"
    ]
  },
  {
    id: "tracking",
    icon: Activity,
    title: "Daily AI Visibility Tracking",
    color: "emerald",
    features: [
      "Daily automated prompt runs",
      "ChatGPT answer monitoring",
      "Gemini answer monitoring",
      "Perplexity answer monitoring",
      "Brand mention detection",
      "Manual run option (plan-dependent)"
    ]
  },
  {
    id: "scoring",
    icon: BarChart3,
    title: "AEO Visibility Score",
    color: "violet",
    features: [
      "Overall AEO Visibility Score",
      "Per-engine visibility breakdown",
      "Brand mention frequency tracking",
      "Position-in-answer scoring",
      "Score trend over time",
      "Per-prompt performance data"
    ]
  },
  {
    id: "competitors",
    icon: Users,
    title: "Competitor Detection",
    color: "emerald",
    features: [
      "Automatic competitor detection in AI answers",
      "Competitor mention frequency tracking",
      "Side-by-side visibility comparison",
      "Competitor suggestion engine",
      "Manual competitor tracking",
      "Competitor limit per plan"
    ]
  },
  {
    id: "recommendations",
    icon: Lightbulb,
    title: "Recommendations",
    color: "violet",
    features: [
      "Prioritized AEO improvement suggestions",
      "FAQ content recommendations",
      "Topical authority guidance",
      "Content structure improvements",
      "Schema implementation guidance",
      "Based on your actual visibility data"
    ]
  },
  {
    id: "schema",
    icon: Code2,
    title: "Schema Generation",
    color: "emerald",
    features: [
      "FAQ schema generation",
      "Organization schema generation",
      "Article schema generation",
      "Product schema generation (e-commerce)",
      "Ready-to-implement code output",
      "Structured data for AI engine indexing"
    ]
  }
]

const additionalCategories = [
  {
    icon: Shield,
    title: "Security & Privacy",
    features: [
      "Read-only website crawling",
      "Encrypted data transfer (HTTPS)",
      "Secure cloud infrastructure",
      "No website modifications",
      "Data never used to train AI models"
    ]
  },
  {
    icon: Settings,
    title: "Platform",
    features: [
      "Dashboard with daily visibility data",
      "Multi-brand support (plan-dependent)",
      "Multi-engine tracking in one view",
      "Historical data retention",
      "Export reports (plan-dependent)"
    ]
  }
]

function FeatureCard({ category, index }: { category: typeof featureCategories[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity }}
      className={`grid md:grid-cols-2 gap-8 items-center py-16 ${index !== 0 ? "border-t border-border" : ""}`}
    >
      <div className={index % 2 === 1 ? "md:order-2" : ""}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-12 h-12 ${category.color === "emerald" ? "bg-emerald/10" : "bg-violet/10"} rounded-xl flex items-center justify-center`}>
            <category.icon className={`w-6 h-6 ${category.color === "emerald" ? "text-emerald" : "text-violet"}`} />
          </div>
          <h3 className="text-2xl font-bold text-foreground">{category.title}</h3>
        </div>
        <ul className="grid gap-3 mt-6">
          {category.features.map((feature, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 text-muted-foreground"
            >
              <Check className={`w-5 h-5 flex-shrink-0 ${category.color === "emerald" ? "text-emerald" : "text-violet"}`} />
              {feature}
            </motion.li>
          ))}
        </ul>
      </div>
      <div className={index % 2 === 1 ? "md:order-1" : ""}>
        <div className={`rounded-3xl p-8 aspect-square max-w-md mx-auto flex items-center justify-center ${
          category.color === "emerald"
            ? "bg-gradient-to-br from-emerald/10 via-emerald/5 to-transparent"
            : "bg-gradient-to-br from-violet/10 via-violet/5 to-transparent"
        }`}>
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className={`w-32 h-32 rounded-3xl flex items-center justify-center ${
              category.color === "emerald" ? "bg-emerald/20" : "bg-violet/20"
            }`}>
              <category.icon className={`w-16 h-16 ${category.color === "emerald" ? "text-emerald" : "text-violet"}`} />
            </div>
            <div className={`absolute -top-4 -right-4 w-8 h-8 rounded-full flex items-center justify-center ${
              category.color === "emerald" ? "bg-emerald" : "bg-violet"
            }`}>
              <Zap className="w-4 h-4 text-white" />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Script id="schema-features" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Tecsaro AI Features — AEO Tracking, Competitor Detection & More",
  url: "https://ai.tecsaro.com/features",
  description: "Daily AI visibility tracking, competitor detection, AEO score, schema generation, prompt management, and actionable recommendations.",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home",     item: "https://ai.tecsaro.com" },
      { "@type": "ListItem", position: 2, name: "Features", item: "https://ai.tecsaro.com/features" },
    ],
  },
})}} />
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald/5 to-transparent" />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet/10 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald/10 text-emerald rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                Features
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Everything you need to{" "}
                <span className="text-gradient">track & improve AI visibility</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Tecsaro AI is an AEO platform built to track how visible your brand is in
                AI-generated answers, detect competitors, and give you clear steps to improve.
              </p>
              <Button size="lg" className="bg-emerald hover:bg-emerald-dark text-white" asChild>
                <Link href="/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Main Features Section */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {featureCategories.map((category, index) => (
                <FeatureCard key={category.id} category={category} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Additional Features Grid */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Built to Be Safe & Simple</h2>
              <p className="text-muted-foreground">Everything runs automatically. You just act on the results.</p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {additionalCategories.map((category, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-background border border-border rounded-2xl p-6 hover:border-emerald/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-emerald/10 rounded-lg flex items-center justify-center mb-4">
                    <category.icon className="w-5 h-5 text-emerald" />
                  </div>
                  <h3 className="font-semibold mb-3 text-foreground">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.features.map((feature, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1 h-1 bg-emerald rounded-full flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-background to-emerald/5">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Start tracking your AI visibility today</h2>
              <p className="text-xl text-muted-foreground mb-8">
                7-day free trial on Starter and Pro. No credit card required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-emerald hover:bg-emerald-dark text-white" asChild>
                  <Link href="/signup">
                    Start Your Free Trial
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/how-it-works">See How It Works</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}