"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/marketing/header"
import { Footer } from "@/components/marketing/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Search, 
  Bot, 
  FileText, 
  Rocket,
  Link2,
  BarChart3,
  Settings,
  Shield,
  Puzzle,
  Users,
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
    icon: Search,
    title: "Website Optimization Engine",
    description: "Connect your website and instantly see technical SEO health, crawlability issues, performance problems, content gaps, and AI search readiness.",
    points: ["Full technical SEO audit", "Website health score", "Crawlability & indexability", "Performance analysis"]
  },
  {
    icon: Bot,
    title: "AI Search Optimization (GEO & AEO)",
    description: "Tecsaro AI helps your website appear in AI answers, conversational search, and answer engines.",
    points: ["Optimize for ChatGPT & Gemini", "Answer engine visibility", "AI-ready structure", "Citation opportunities"]
  },
  {
    icon: FileText,
    title: "Content & Product Optimization",
    description: "Improve blog posts, pages, and product descriptions with AI suggestions. Preview changes and publish safely.",
    points: ["AI content suggestions", "Product optimization", "Bulk improvements", "Preview before publish"]
  },
  {
    icon: Rocket,
    title: "Built-in Publishing",
    description: "Publish optimized content directly to WordPress, Shopify, or custom websites with full control and rollback.",
    points: ["One-click publishing", "Safe rollback options", "Change tracking", "Manual approval available"]
  },
  {
    icon: Link2,
    title: "Backlink & Authority Insights",
    description: "Understand your backlink health, referring domains, new & lost links, and competitive gaps.",
    points: ["Backlink health check", "Referring domains", "Toxic link signals", "Competitor comparison"]
  },
  {
    icon: BarChart3,
    title: "Clear Tracking & Progress",
    description: "Track website health score, AI visibility score, keyword movement, and growth over time.",
    points: ["Website health score", "AI visibility score", "Keyword tracking", "Progress insights"]
  }
]

const additionalFeatures = [
  { icon: Settings, title: "Simple Integrations", items: ["WordPress", "Shopify", "Google Search Console", "Google Analytics"] },
  { icon: Shield, title: "Secure by Design", items: ["Encrypted connections", "Limited permissions", "Safe rollback", "Secure publishing"] },
  { icon: Puzzle, title: "Flexible Plans", items: ["Starter", "Pro", "Agency", "Enterprise"] },
  { icon: Users, title: "Built for Teams", items: ["Multiple users", "Role-based access", "Activity logs", "Client management"] }
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
                The all-in-one platform to{" "}
                <span className="text-gradient">optimize, publish & discover</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Tecsaro AI is built to help businesses fix technical SEO, optimize for AI search (GEO & AEO), 
                publish content and products, and track performance — all from one powerful dashboard.
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
              <p className="text-lg md:text-xl font-medium">No more juggling tools.</p>
              <span className="hidden md:block w-2 h-2 bg-emerald rounded-full" />
              <p className="text-lg md:text-xl font-medium">No more confusing reports.</p>
              <span className="hidden md:block w-2 h-2 bg-emerald rounded-full" />
              <p className="text-lg md:text-xl font-medium text-emerald-light">Just clear actions and real progress.</p>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Everything You Need</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                One platform to handle technical SEO, AI optimization, content publishing, and performance tracking
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
                  className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
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
                  <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
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

        {/* Additional Features Grid */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {additionalFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-background border border-border rounded-2xl p-6"
                >
                  <div className="w-10 h-10 bg-violet/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-5 h-5 text-violet" />
                  </div>
                  <h3 className="font-semibold mb-3 text-foreground">{feature.title}</h3>
                  <ul className="space-y-2">
                    {feature.items.map((item, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1 h-1 bg-emerald rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
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
                Because the future of search is AI-driven — and websites need to be ready. 
                Tecsaro AI helps you stay visible today and tomorrow.
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
