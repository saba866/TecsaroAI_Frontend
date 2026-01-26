"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/marketing/header"
import { Footer } from "@/components/marketing/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Target, 
  Eye, 
  Lightbulb, 
  Zap, 
  Globe, 
  Rocket,
  Users,
  ShoppingBag,
  Code,
  Building2,
  TrendingUp,
  ArrowRight
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

const values = [
  {
    icon: Lightbulb,
    title: "Clarity over complexity",
    description: "SEO should be understandable, not confusing."
  },
  {
    icon: Zap,
    title: "Action over reports",
    description: "Insights matter only when they lead to action."
  },
  {
    icon: Target,
    title: "Automation with control",
    description: "AI should help you — not replace your decisions."
  },
  {
    icon: Globe,
    title: "Website-first thinking",
    description: "Your website is your digital foundation. We build everything around it."
  },
  {
    icon: Rocket,
    title: "Build for the future",
    description: "We don't chase trends. We build for where search is going."
  }
]

const audiences = [
  { icon: Users, label: "Founders & startups" },
  { icon: ShoppingBag, label: "E-commerce brands" },
  { icon: Code, label: "SaaS companies" },
  { icon: Building2, label: "Agencies & consultants" },
  { icon: TrendingUp, label: "Growing businesses worldwide" }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald/5 to-transparent" />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet/10 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-emerald/10 text-emerald rounded-full text-sm font-medium mb-6">
                About Tecsaro AI
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Making every website discoverable in the{" "}
                <span className="text-gradient">age of AI search</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Search is no longer just about rankings. It's about being the answer — 
                in Google, ChatGPT, Gemini, Perplexity, and beyond.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  To make every website discoverable in the age of AI search.
                </p>
                <p className="text-muted-foreground">
                  Our mission is to help businesses technically optimize, publish, and grow 
                  their websites so they are visible everywhere people search — not just Google, 
                  but ChatGPT, Gemini, Perplexity, and the next generation of AI-powered discovery.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-emerald/20 to-violet/20 rounded-3xl p-8">
                  <div className="bg-card rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-emerald/10 rounded-full flex items-center justify-center">
                        <Eye className="w-5 h-5 text-emerald" />
                      </div>
                      <h3 className="font-semibold text-foreground">Our Vision</h3>
                    </div>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald rounded-full mt-2" />
                        <span>Websites optimize themselves</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald rounded-full mt-2" />
                        <span>AI search works for businesses, not against them</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald rounded-full mt-2" />
                        <span>SEO is simple, transparent, and actionable</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald rounded-full mt-2" />
                        <span>Every business can compete globally, regardless of size</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we build at Tecsaro AI
              </p>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="group bg-card border border-border rounded-2xl p-6 hover:border-emerald/50 hover:shadow-lg hover:shadow-emerald/5 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-emerald/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald/20 transition-colors">
                    <value.icon className="w-6 h-6 text-emerald" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Founder Story Section */}
        <section className="py-20 bg-charcoal text-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">The Tecsaro Story</h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
                <p className="text-lg text-white/80 mb-6">
                  Tecsaro AI was born from a simple problem: Too many tools showed data, 
                  but none helped businesses actually fix and publish what was needed.
                </p>
                <p className="text-white/80 mb-6">
                  With AI changing how people search, we saw a bigger gap — websites were 
                  becoming invisible, not because they were bad, but because tools hadn't evolved.
                </p>
                <p className="text-white/80 mb-8">
                  So we built Tecsaro AI to fix technical SEO automatically, optimize for AI search, 
                  publish content and products directly, and track progress with clear scores.
                </p>
                <p className="text-emerald-light font-semibold text-lg">
                  Not just another SEO tool — but a website optimization engine for the AI era.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Who We Serve Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Who We Serve</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Tecsaro AI is built for businesses that depend on website visibility to grow
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {audiences.map((audience, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex items-center gap-3 bg-card border border-border rounded-full px-6 py-3 hover:border-emerald/50 transition-colors"
                >
                  <audience.icon className="w-5 h-5 text-emerald" />
                  <span className="text-foreground font-medium">{audience.label}</span>
                </motion.div>
              ))}
            </motion.div>
              <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground"></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                MVP Focus: Tecsaro AI currently supports founders, early stage satrtups, e-commerce brands, and SaaS companies. Agency & enterprise features are under development and will be released in phase 2.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Belief & CTA Section */}
        <section className="py-20 bg-gradient-to-b from-emerald/5 to-background">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">What We Believe</h2>
              <blockquote className="text-xl md:text-2xl text-muted-foreground mb-8 italic">
                "The future of search belongs to websites that are technically strong, 
                AI-ready, and action-driven."
              </blockquote>
              <p className="text-muted-foreground mb-8">
                And we're here to help you build exactly that.
              </p>
              <Button size="lg" className="bg-emerald hover:bg-emerald-dark text-white" asChild>
                <Link href="/signup">
                  Start your test drive today
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
