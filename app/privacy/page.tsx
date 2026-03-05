


"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/marketing/header"
import { Footer } from "@/components/marketing/footer"
import { Shield } from "lucide-react"

const sections = [
  {
    title: "1. Information We Collect",
    content: `We may collect the following types of information:

Personal Information
• Name, email address, company name
• Account login details
• Support communications

Website & Usage Data
• Website URLs connected to our platform
• Publicly accessible website content, headings, FAQs, and structured data (crawled for analysis)
• Usage logs, feature usage, and activity within the platform

AI Tracking Data
• Prompts generated and tracked on your behalf
• AI engine responses containing brand mentions
• Competitor brands detected in AI answers

Payment Information
• Payment details are processed securely by third-party providers (Razorpay)
• We do not store your card or banking details

Technical Information
• IP address
• Device and browser type
• Location (approximate)
• Cookies and analytics data`
  },
  {
    title: "2. How We Use Your Information",
    content: `We use your information to:

• Provide and operate our AEO tracking and analysis services
• Crawl and analyze your website content
• Generate and run prompts across AI engines
• Calculate your AEO Visibility Score
• Detect competitor mentions in AI answers
• Provide recommendations to improve AI visibility
• Generate schema markup for your pages
• Process payments and subscriptions
• Improve product performance
• Communicate updates and support
• Prevent fraud, misuse, and abuse`
  },
  {
    title: "3. AI & Data Processing",
    content: `Tecsaro AI uses AI models and external APIs to process your data for analysis and visibility tracking.

• Only required data is shared with AI providers (e.g. prompts and website content needed for tracking)
• We do not train public AI models using your private data
• Data shared with AI engines is used solely to check for brand mentions and generate visibility results
• Processing is temporary and purpose-limited`
  },
  {
    title: "4. Cookies & Tracking",
    content: `We use cookies to:

• Keep you logged in
• Remember preferences
• Understand usage patterns
• Improve performance

You can disable cookies in your browser, but some features may not work correctly.`
  },
  {
    title: "5. Data Sharing & Third Parties",
    content: `We do not sell your data.

We may share limited data with:
• Payment processors (Razorpay)
• Cloud hosting providers
• Analytics services
• AI service providers (only to run visibility tracking requests on your behalf)
• Email and support tools

All third parties are required to keep your data secure.`
  },
  {
    title: "6. Data Security",
    content: `We protect your data using:

• HTTPS encryption
• Secure cloud infrastructure
• Access controls
• Limited internal access
• Regular monitoring and updates`
  },
  {
    title: "7. Data Retention",
    content: `We retain your data only as long as necessary to provide services or comply with legal obligations.
You can request deletion at any time.`
  },
  {
    title: "8. Your Rights",
    content: `You have the right to:

• Access your data
• Correct inaccurate data
• Delete your account and data
• Export your data
• Withdraw consent for marketing

Email: support@tecsaro.com`
  },
  {
    title: "9. International Users",
    content: `If you access our services from outside India, your data may be processed in India or other regions where our infrastructure providers operate.`
  },
 
  {
    title: "10. Policy Updates",
    content: `We may update this Privacy Policy from time to time.
Changes will be posted on this page with the updated date.`
  },
  {
    title: "11. Contact Us",
    content: `If you have questions about this Privacy Policy or your data, contact:
support@tecsaro.com`
  }
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-transparent" />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 h-16 bg-emerald/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-emerald" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Privacy Policy
              </h1>
              <p className="text-muted-foreground">
                Last updated: January 2026
              </p>
            </motion.div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <p className="text-muted-foreground">
                At Tecsaro AI ("we", "our", "us"), your privacy is important to us.
                This Privacy Policy explains how we collect, use, store, and protect your
                information when you use our website and services. By accessing or using
                Tecsaro AI, you agree to the practices described in this policy.
              </p>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-12">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <h2 className="text-xl font-bold mb-4 text-foreground">{section.title}</h2>
                  <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {section.content}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}