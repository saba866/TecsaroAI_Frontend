"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Header } from "@/components/marketing/header"
import { Footer } from "@/components/marketing/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Link2, 
  Search, 
  Lightbulb, 
  FileText, 
  Rocket,
  BarChart3,
  TrendingUp,
  Shield,
  ArrowRight,
  Play,
  Check
} from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Link2,
    title: "Connect Your Website",
    description: "Connect your website in minutes. We support WordPress, Shopify, and custom websites.",
    details: [
      "Secure connection via API or plugin",
      "Full control of permissions",
      "Automatic scan preparation",
      "No technical skills required"
    ],
    color: "emerald"
  },
  {
    number: "02",
    icon: Search,
    title: "Run Website Analysis",
    description: "Tecsaro AI automatically runs comprehensive analysis on your entire website.",
    details: [
      "Technical SEO audit",
      "Content quality analysis",
      "GEO (AI search) readiness check",
      "AEO (answer optimization) scan",
      "Backlink health check",
      "Performance & structure checks"
    ],
    color: "violet"
  },
  {
    number: "03",
    icon: Lightbulb,
    title: "Get AI Recommendations",
    description: "Our AI analyzes your site and gives you clear, prioritized suggestions.",
    details: [
      "What to fix",
      "What to optimize",
      "What to publish",
      "What's blocking visibility",
      "What will improve your scores"
    ],
    color: "emerald"
  },
  {
    number: "04",
    icon: FileText,
    title: "Optimize Content & Products",
    description: "Select any page, blog, or product and improve it with AI suggestions.",
    details: [
      "Improve content with AI suggestions",
      "Optimize for SEO, GEO & AEO",
      "Preview changes before publishing",
      "Improve visibility scores instantly"
    ],
    color: "violet"
  },
  {
    number: "05",
    icon: Rocket,
    title: "Publish with One Click",
    description: "Publish optimized content directly to your website with full control.",
    details: [
      "Publish pages, blogs, products",
      "All changes are logged",
      "Rollback available if needed",
      "Manual approval option"
    ],
    color: "emerald"
  },
  {
    number: "06",
    icon: BarChart3,
    title: "Track Progress",
    description: "Monitor improvements with clear scores and actionable insights.",
    details: [
      "Website health score",
      "AI visibility score",
      "Keyword tracking",
      "Backlink trends",
      "Performance insights"
    ],
    color: "violet"
  },
  {
    number: "07",
    icon: TrendingUp,
    title: "Scale as You Grow",
    description: "Tecsaro AI grows with your business. Add more as you need.",
    details: [
      "Add more websites",
      "Add more keywords",
      "Add more AI checks",
      "Add more publishing",
      "Add more users"
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
      {/* Connection Line */}
      {index < steps.length - 1 && (
        <div className="absolute left-8 top-24 w-0.5 h-32 bg-gradient-to-b from-border to-transparent hidden md:block" />
      )}
      
      <div className={`flex gap-6 ${index % 2 === 1 ? 'md:flex-row-reverse md:text-right' : ''}`}>
        {/* Step Number */}
        <div className="flex-shrink-0">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
            step.color === 'emerald' ? 'bg-emerald/10' : 'bg-violet/10'
          }`}>
            <span className={`text-2xl font-bold ${
              step.color === 'emerald' ? 'text-emerald' : 'text-violet'
            }`}>
              {step.number}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <div className={`flex items-center gap-3 mb-3 ${index % 2 === 1 ? 'md:justify-end' : ''}`}>
            <step.icon className={`w-5 h-5 ${step.color === 'emerald' ? 'text-emerald' : 'text-violet'}`} />
            <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
          </div>
          <p className="text-muted-foreground mb-4">{step.description}</p>
          <ul className={`space-y-2 ${index % 2 === 1 ? 'md:items-end' : ''}`}>
            {step.details.map((detail, i) => (
              <li key={i} className={`flex items-center gap-2 text-sm text-foreground ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <Check className={`w-4 h-4 flex-shrink-0 ${step.color === 'emerald' ? 'text-emerald' : 'text-violet'}`} />
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
                Start optimizing in{" "}
                <span className="text-gradient">minutes, not weeks</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Tecsaro AI helps you optimize, publish, and get discovered in the age of AI search — 
                in just a few simple steps. No complex setup. No technical skills needed.
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

        {/* Steps Section */}
        <section ref={containerRef} className="py-20 relative">
          {/* Progress Bar */}
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
                <h3 className="text-xl font-bold mb-2 text-foreground">Safe & Secure</h3>
                <p className="text-muted-foreground">
                  Your data is protected with secure infrastructure, limited access, 
                  and industry-standard security practices.
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Start in minutes</h2>
              <p className="text-xl text-white/70 mb-8">
                Connect your website, run your first analysis, and see results immediately.
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
