"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/marketing/header"
import { Footer } from "@/components/marketing/footer"
import { FileText } from "lucide-react"

const sections = [
  {
    title: "1. Service Description",
    content: `Tecsaro AI is an AI-powered website optimization platform that provides tools for:
    
• Technical SEO analysis
• GEO (Generative Engine Optimization)
• AEO (Answer Engine Optimization)
• Content optimization
• Website publishing
• Website scoring and tracking
• Reporting and analytics

We provide tools and recommendations only. We do not guarantee rankings, traffic, or revenue.`
  },
  {
    title: "2. Eligibility",
    content: `To use Tecsaro AI, you must:
    
• Be at least 18 years old
• Have the legal right to manage the website you connect
• Provide accurate and complete information
• Use the platform only for lawful purposes`
  },
  {
    title: "3. Account Registration",
    content: `You are responsible for:
    
• Maintaining the confidentiality of your account
• All activity that occurs under your account
• Ensuring access credentials are secure

We are not responsible for unauthorized access caused by your negligence.`
  },
  {
    title: "4. Subscription & Payments",
    content: `• All plans are billed in advance (monthly or annually)
• Payments are processed through Razorpay or other approved providers
• Subscription renews automatically unless canceled
• You may cancel at any time from your dashboard
• Refunds are governed by our Refund Policy`
  },
  {
    title: "5. Acceptable Use Policy",
    content: `You agree not to:
    
• Use the platform for illegal purposes
• Publish harmful, misleading, or copyrighted content without rights
• Abuse AI, crawling, or publishing features
• Attempt to reverse-engineer the platform
• Interfere with system security or performance

Violation may result in suspension or termination.`
  },
  {
    title: "6. Content & Publishing Responsibility",
    content: `You are fully responsible for:
    
• Content you publish using Tecsaro AI
• Ensuring compliance with laws, regulations, and platform policies
• Reviewing content before publishing

Tecsaro AI is not responsible for errors, penalties, or damages caused by published content.`
  },
  {
    title: "7. Intellectual Property",
    content: `• All platform software, design, algorithms, and branding belong to Tecsaro AI
• You retain ownership of your website content and data
• You grant us limited rights to process your data to provide services`
  },
  {
    title: "8. Data & Privacy",
    content: `Your use of the platform is governed by our Privacy Policy.
We only use your data to provide and improve the service.`
  },
  {
    title: "9. Service Availability",
    content: `We strive for high uptime but do not guarantee uninterrupted service.
We may perform maintenance, updates, or improvements that temporarily affect availability.`
  },
  {
    title: "10. Account Suspension & Termination",
    content: `We may suspend or terminate accounts if:
    
• Terms are violated
• Abuse or misuse is detected
• Payments fail or are reversed
• Fraud or illegal activity is suspected`
  },
  {
    title: "11. Limitation of Liability",
    content: `To the maximum extent permitted by law:
    
• We are not liable for indirect or consequential damages
• We are not responsible for search engine algorithm changes
• We are not responsible for traffic or ranking loss
• Our total liability is limited to the amount paid in the last billing cycle`
  },
  {
    title: "12. Modifications to Service",
    content: `We may update features, pricing, or limits at any time.
Major changes will be communicated via email or dashboard.`
  },
  {
    title: "13. Governing Law",
    content: `These Terms are governed by the laws of India.
Any disputes will be subject to the jurisdiction of Indian courts.`
  },
  {
    title: "14. Contact Information",
    content: `For questions about these Terms, contact:
support@tecsaro.com`
  },
  {
    title: "15. Acceptance of Terms",
    content: `By using Tecsaro AI, you confirm that you have read, understood, and agreed to these Terms & Conditions.`
  }
]

export default function TermsPage() {
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
                <FileText className="w-8 h-8 text-emerald" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Terms & Conditions
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
                Welcome to Tecsaro AI ("we", "our", "us"). By accessing or using our website, 
                platform, and services, you agree to be bound by these Terms & Conditions. 
                If you do not agree, please do not use the service.
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
