

"use client"

import { motion } from "framer-motion"
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
  ArrowRight,
  Check,
  Sparkles
} from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const productFeatures = [
  {
    icon: Globe,
    title: "Website Crawling",
    description: "Connect your website and let Tecsaro AI crawl and extract what matters — page content, headings, FAQs, and structured data — to build a complete picture of your brand's online presence.",
    points: [
      "Full website content extraction",
      "Heading & FAQ detection",
      "Structured data analysis",
      "Stored for ongoing analysis"
    ]
  },
  {
    icon: MessageSquare,
    title: "Smart Prompt Generation",
    description: "Tecsaro AI automatically generates the questions and prompts people are likely to ask AI engines about your business. You can also add your own custom prompts to track exactly what matters to you.",
    points: [
      "Auto-generated industry prompts",
      "Custom prompt support",
      "Business & competitor queries",
      "Prompt library management"
    ]
  },
  {
    icon: Activity,
    title: "Daily AI Visibility Tracking",
    description: "Every day, Tecsaro AI runs your prompts across the major AI answer engines and checks whether your brand appears in the responses — giving you a real-time pulse on your AI discoverability.",
    points: [
      "Tracks ChatGPT responses",
      "Tracks Gemini responses",
      "Tracks Perplexity responses",
      "Daily automated monitoring"
    ]
  },
  {
    icon: BarChart3,
    title: "AEO Visibility Score",
    description: "Get a clear, consolidated score that tells you exactly how visible your brand is in AI-generated answers — based on mentions, position, frequency, and competitor presence.",
    points: [
      "Brand mention tracking",
      "Position-in-answer scoring",
      "Mention frequency analysis",
      "Score trends over time"
    ]
  },
  {
    icon: Users,
    title: "Competitor Detection",
    description: "Discover which competitors are showing up in AI answers instead of — or alongside — your brand. Tecsaro AI surfaces them automatically and lets you track them going forward.",
    points: [
      "Auto-detected competitors",
      "Competitor mention tracking",
      "AI answer gap analysis",
      "Competitor suggestions"
    ]
  },
  {
    icon: Lightbulb,
    title: "Actionable Recommendations",
    description: "Get clear, prioritized suggestions to improve your AI visibility — from adding FAQ sections and improving topical authority to enhancing your schema and content structure.",
    points: [
      "FAQ content suggestions",
      "Topical authority guidance",
      "Schema improvement tips",
      "Content structure advice"
    ]
  },
  {
    icon: Code2,
    title: "Schema Generation",
    description: "Tecsaro AI automatically generates structured schema markup for your pages — making it easier for AI engines to understand and cite your content in their answers.",
    points: [
      "FAQ schema generation",
      "Organization schema",
      "Article schema",
      "Product schema (where applicable)"
    ]
  }
]

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-violet/5 to-transparent" />
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-emerald/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet/10 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-violet/10 text-violet rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Product
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Know exactly how visible your brand is{" "}
                <span className="text-gradient">in AI answers</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Tecsaro AI helps you track, understand, and improve how your brand appears
                in AI-generated answers — across ChatGPT, Gemini, and Perplexity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-emerald hover:bg-emerald-dark text-white" asChild>
                  <Link href="/signup">
                    Start Test Drive
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tagline Banner */}
        <section className="py-12 bg-charcoal text-white">
          <div className="container mx-auto px-4">
            <motion.div
              className="flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-lg md:text-xl font-medium">Track AI mentions daily.</p>
              <span className="hidden md:block w-2 h-2 bg-emerald rounded-full" />
              <p className="text-lg md:text-xl font-medium">Detect competitors in AI answers.</p>
              <span className="hidden md:block w-2 h-2 bg-emerald rounded-full" />
              <p className="text-lg md:text-xl font-medium text-emerald-light">Improve your visibility with clear actions.</p>
            </motion.div>
          </div>
        </section>

        {/* Main Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Everything You Need for AEO</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                One platform to crawl your website, track AI answer visibility, detect competitors,
                and get actionable recommendations to improve your brand's presence in AI engines.
              </p>
            </motion.div>

            <motion.div
              className="space-y-8 max-w-6xl mx-auto"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {productFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`grid md:grid-cols-2 gap-8 items-center`}
                >
                  <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-emerald/10 rounded-xl flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-emerald" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">{feature.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-6">{feature.description}</p>
                    <ul className="grid grid-cols-2 gap-3">
                      {feature.points.map((point, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                          <Check className="w-4 h-4 text-emerald flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
                    <div className="bg-gradient-to-br from-emerald/10 to-violet/10 rounded-3xl p-8 aspect-video flex items-center justify-center">
                      <div className="bg-card rounded-2xl shadow-xl p-6 w-full max-w-sm">
                        <div className="flex items-center gap-3 mb-4">
                          <feature.icon className="w-8 h-8 text-emerald" />
                          <div className="h-2 bg-muted rounded-full flex-1" />
                        </div>
                        <div className="space-y-2">
                          <div className="h-3 bg-muted rounded w-3/4" />
                          <div className="h-3 bg-muted rounded w-1/2" />
                          <div className="h-3 bg-muted rounded w-2/3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Why Tecsaro Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Why Tecsaro AI?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                AI engines are now a primary discovery channel. Millions of people ask ChatGPT, Gemini,
                and Perplexity questions every day — and if your brand isn't in those answers, you're
                invisible to a growing audience. Tecsaro AI gives you the clarity and tools to change that.
              </p>
              <Button size="lg" className="bg-emerald hover:bg-emerald-dark text-white" asChild>
                <Link href="/signup">
                  Start Your Test Drive
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