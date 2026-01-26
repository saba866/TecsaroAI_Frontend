"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/marketing/header"
import { Footer } from "@/components/marketing/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  ArrowRight,
  Check,
  Shield,
  Plug,
  Globe,
  BarChart3,
  Bot,
  Rocket,
  RefreshCw
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

const websiteIntegrations = [
  {
    name: "WordPress",
    icon: "W",
    features: [
      "One-click connection",
      "Page & blog sync",
      "WooCommerce product sync",
      "Safe publishing & rollback",
      "Automatic re-sync",
      "Full control over changes"
    ]
  },
  {
    name: "Shopify",
    icon: "S",
    features: [
      "Secure API connection",
      "Product & collection sync",
      "Blog & page sync",
      "AI-optimized publishing",
      "Bulk product optimization",
      "Safe rollback"
    ]
  },
  {
    name: "Custom Websites",
    icon: "C",
    features: [
      "Works with any website",
      "Secure crawl & analysis",
      "Content optimization guidance",
      "Publishing via API or manual mode",
      "Full flexibility"
    ]
  }
]

const analyticsIntegrations = [
  {
    name: "Google Search Console",
    features: ["Indexing status", "Search queries", "Clicks & impressions", "Coverage issues", "SEO performance insights"]
  },
  {
    name: "Google Analytics",
    features: ["Traffic trends", "Page performance", "User behavior insights", "Conversion tracking"]
  }
]

const otherIntegrations = [
  {
    icon: Bot,
    title: "AI & Optimization",
    features: ["AI models for content optimization", "AI visibility checks", "Answer engine analysis", "Structured data enhancement"]
  },
  {
    icon: Rocket,
    title: "Publishing",
    features: ["WordPress REST API", "Shopify Admin API", "Custom API connectors", "Manual publishing option"]
  }
]

const securityFeatures = [
  "Encrypted connections",
  "Limited permissions",
  "User-approved actions",
  "Activity logs",
  "Safe rollback options"
]

const comingSoon = [
  "CMS platforms",
  "E-commerce platforms",
  "Marketing tools",
  "Reporting tools",
  "API access for developers"
]

export default function IntegrationsPage() {
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
                <Plug className="w-4 h-4" />
                Integrations
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Connect your website{" "}
                <span className="text-gradient">in minutes</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Connect your website and tools to Tecsaro AI and start optimizing, 
                publishing, and tracking from one dashboard. No complex setup. No coding required.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Website Integrations */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-emerald/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-emerald" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Website Integrations</h2>
              <p className="text-muted-foreground">Connect and optimize any website platform</p>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {websiteIntegrations.map((integration, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-card border border-border rounded-2xl p-6 hover:border-emerald/50 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-charcoal text-white rounded-2xl flex items-center justify-center mb-6 text-2xl font-bold">
                    {integration.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-foreground">{integration.name}</h3>
                  <ul className="space-y-2">
                    {integration.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-muted-foreground">
                        <Check className="w-4 h-4 text-emerald flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Analytics Integrations */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-violet/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-violet" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Analytics Integrations</h2>
              <p className="text-muted-foreground">Connect your analytics for deeper insights</p>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {analyticsIntegrations.map((integration, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-background border border-border rounded-2xl p-6"
                >
                  <h3 className="text-xl font-bold mb-4 text-foreground">{integration.name}</h3>
                  <ul className="space-y-2">
                    {integration.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-muted-foreground">
                        <Check className="w-4 h-4 text-violet flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Other Integrations */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {otherIntegrations.map((integration, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-card border border-border rounded-2xl p-6"
                >
                  <div className="w-12 h-12 bg-emerald/10 rounded-xl flex items-center justify-center mb-4">
                    <integration.icon className="w-6 h-6 text-emerald" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-foreground">{integration.title}</h3>
                  <ul className="space-y-2">
                    {integration.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-muted-foreground">
                        <Check className="w-4 h-4 text-emerald flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground mt-4 italic">
                    (All processing is secure and limited to your data only)
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Security Section */}
        <section className="py-20 bg-charcoal text-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-20 h-20 bg-emerald/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-10 h-10 text-emerald" />
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Secure by Design</h2>
                  <p className="text-white/70 mb-6">All integrations use industry-standard security practices</p>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    {securityFeatures.map((feature, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-sm"
                      >
                        <Check className="w-3 h-3 text-emerald" />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-violet/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-6 h-6 text-violet" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">More Integrations Coming</h2>
              <p className="text-muted-foreground mb-6">We're continuously adding new integrations</p>
              <div className="flex flex-wrap gap-3 justify-center">
                {comingSoon.map((item, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-card border border-border rounded-full text-sm text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Connect your website and get started in minutes
              </h2>
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
