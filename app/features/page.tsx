"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Header } from "@/components/marketing/header"
import { Footer } from "@/components/marketing/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Search, 
  Bot, 
  FileText, 
  ShoppingCart,
  Rocket,
  Link2,
  BarChart3,
  LineChart,
  Shield,
  Settings,
  Puzzle,
  Users,
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
    id: "technical-seo",
    icon: Search,
    title: "Website Analysis & Technical SEO",
    color: "emerald",
    features: [
      "Full technical SEO audit",
      "Website health score",
      "Crawlability & indexability checks",
      "Broken links & redirect detection",
      "Core Web Vitals & performance checks",
      "Metadata issues detection",
      "Internal linking analysis",
      "Mobile & UX readiness checks"
    ]
  },
  {
    id: "ai-search",
    icon: Bot,
    title: "AI Search Optimization (GEO & AEO)",
    color: "violet",
    features: [
      "AI visibility scoring",
      "Optimization for ChatGPT, Gemini, Perplexity",
      "Answer readiness checks",
      "Brand mention detection",
      "AI citation opportunity analysis",
      "Content structure optimization for AI answers"
    ]
  },
  {
    id: "content",
    icon: FileText,
    title: "Content Optimization",
    color: "emerald",
    features: [
      "AI-powered content suggestions",
      "SEO, GEO & AEO content improvements",
      "Keyword and intent alignment",
      "Content scoring system",
      "Preview before publishing",
      "Bulk optimization (higher plans)"
    ]
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    title: "Product Optimization (E-commerce)",
    color: "violet",
    features: [
      "Product title & description optimization",
      "Structured product content",
      "AI-ready product pages",
      "Shopify & WooCommerce support",
      "Bulk product optimization"
    ]
  },
  {
    id: "publishing",
    icon: Rocket,
    title: "Publishing & Website Updates",
    color: "emerald",
    features: [
      "One-click publishing",
      "WordPress, Shopify, Custom site support",
      "Manual approval & rollback",
      "Change tracking & logs",
      "Safe publishing workflow"
    ]
  },
  {
    id: "backlinks",
    icon: Link2,
    title: "Backlink Analysis",
    color: "violet",
    features: [
      "Backlink health check",
      "Referring domains analysis",
      "New & lost link detection",
      "Toxic link signals",
      "Competitor backlink comparison (Pro+)"
    ]
  },
  {
    id: "keywords",
    icon: BarChart3,
    title: "Keyword & Traditional SEO Tracking",
    color: "emerald",
    features: [
      "Keyword ranking tracking",
      "SERP feature tracking",
      "Local SEO tracking",
      "Competitor tracking",
      "Weekly / daily updates based on plan"
    ]
  },
  {
    id: "reporting",
    icon: LineChart,
    title: "Reporting & Scores",
    color: "violet",
    features: [
      "Website health score",
      "Content quality score",
      "AI visibility score",
      "Keyword performance insights",
      "Progress tracking over time",
      "Exportable reports (Pro+)"
    ]
  }
]

const additionalCategories = [
  {
    icon: Shield,
    title: "Security & Reliability",
    features: ["Secure website connection", "Encrypted data transfer", "Limited publishing permissions", "Safe rollback options", "Secure payment handling"]
  },
  {
    icon: Settings,
    title: "Integrations",
    features: ["WordPress", "Shopify", "Custom websites", "Google Search Console", "Google Analytics", "More coming soon"]
  },
  {
    icon: Puzzle,
    title: "Add-ons & Customization",
    features: ["Extra websites", "Extra keywords", "Extra AI checks", "API access", "White-label (Agency)", "Priority processing"]
  },
  {
    icon: Users,
    title: "Team & Collaboration (Pro+)",
    features: ["Multiple user access", "Role-based permissions", "Activity logs", "Team collaboration tools"]
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
      className={`grid md:grid-cols-2 gap-8 items-center py-16 ${index !== 0 ? 'border-t border-border' : ''}`}
    >
      <div className={index % 2 === 1 ? 'md:order-2' : ''}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-12 h-12 ${category.color === 'emerald' ? 'bg-emerald/10' : 'bg-violet/10'} rounded-xl flex items-center justify-center`}>
            <category.icon className={`w-6 h-6 ${category.color === 'emerald' ? 'text-emerald' : 'text-violet'}`} />
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
              <Check className={`w-5 h-5 flex-shrink-0 ${category.color === 'emerald' ? 'text-emerald' : 'text-violet'}`} />
              {feature}
            </motion.li>
          ))}
        </ul>
      </div>
      <div className={index % 2 === 1 ? 'md:order-1' : ''}>
        <div className={`rounded-3xl p-8 aspect-square max-w-md mx-auto flex items-center justify-center ${
          category.color === 'emerald' 
            ? 'bg-gradient-to-br from-emerald/10 via-emerald/5 to-transparent' 
            : 'bg-gradient-to-br from-violet/10 via-violet/5 to-transparent'
        }`}>
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className={`w-32 h-32 rounded-3xl flex items-center justify-center ${
              category.color === 'emerald' ? 'bg-emerald/20' : 'bg-violet/20'
            }`}>
              <category.icon className={`w-16 h-16 ${category.color === 'emerald' ? 'text-emerald' : 'text-violet'}`} />
            </div>
            <div className={`absolute -top-4 -right-4 w-8 h-8 rounded-full flex items-center justify-center ${
              category.color === 'emerald' ? 'bg-emerald' : 'bg-violet'
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
                <span className="text-gradient">optimize & grow</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Tecsaro AI combines technical SEO, AI search optimization (GEO & AEO), 
                content publishing, and tracking into a single, easy-to-use dashboard.
              </p>
              <Button size="lg" className="bg-emerald hover:bg-emerald-dark text-white" asChild>
                <Link href="/signup">
                  Start Test Drive
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">And Much More</h2>
              <p className="text-muted-foreground">Additional capabilities to power your growth</p>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
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
                        <span className="w-1 h-1 bg-emerald rounded-full" />
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Built for Growth</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Tecsaro AI grows with your business — from your first website to enterprise scale.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-emerald hover:bg-emerald-dark text-white" asChild>
                  <Link href="/signup">
                    Start Your Test Drive
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
