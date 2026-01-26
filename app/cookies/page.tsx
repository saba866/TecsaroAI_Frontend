"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/marketing/header"
import { Footer } from "@/components/marketing/footer"
import { Cookie, Settings, BarChart3, Sparkles, Megaphone } from "lucide-react"

const cookieTypes = [
  {
    icon: Settings,
    title: "Essential Cookies",
    description: "These cookies are required for the website to function properly.",
    details: [
      "Enable core features like login, security, and account access",
      "Without these cookies, the website may not work correctly"
    ]
  },
  {
    icon: BarChart3,
    title: "Performance & Analytics Cookies",
    description: "These cookies help us understand how users use our website, such as:",
    details: [
      "Pages visited",
      "Time spent on pages",
      "Errors and performance issues",
      "This helps us improve our service"
    ]
  },
  {
    icon: Sparkles,
    title: "Functional Cookies",
    description: "These cookies remember:",
    details: [
      "Your language",
      "Your preferences",
      "Settings within the dashboard"
    ]
  },
  {
    icon: Megaphone,
    title: "Marketing Cookies (optional)",
    description: "We may use cookies to:",
    details: [
      "Show relevant content",
      "Measure campaign performance",
      "Improve marketing effectiveness",
      "These cookies are only used when applicable"
    ]
  }
]

const sections = [
  {
    title: "1. What Are Cookies?",
    content: `Cookies are small text files stored on your device (computer, tablet, or mobile) when you visit a website. They help websites function properly, remember your preferences, and improve your experience.`
  },
  {
    title: "2. How We Use Cookies",
    content: `We use cookies to:

• Keep you logged in to your account
• Remember your preferences and settings
• Improve website performance
• Understand how users interact with our platform
• Analyze traffic and usage patterns
• Improve our products and services
• Secure our platform and prevent abuse`
  },
  {
    title: "4. Third-Party Cookies",
    content: `We may use third-party tools (such as analytics or support tools) that set their own cookies to help us operate and improve the service.

These providers are required to handle data securely.`
  },
  {
    title: "5. Managing Cookies",
    content: `You can control or delete cookies from your browser settings at any time.

Please note that disabling some cookies may affect functionality of the website.`
  },
  {
    title: "6. Updates to This Policy",
    content: `We may update this Cookies Policy from time to time.
Any changes will be posted on this page with a revised date.`
  },
  {
    title: "7. Contact Us",
    content: `If you have questions about this Cookies Policy, please contact us:
support@tecsaro.com`
  }
]

export default function CookiesPage() {
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
                <Cookie className="w-8 h-8 text-emerald" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Cookies Policy
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
                This Cookies Policy explains how Tecsaro AI ("we", "our", "us") uses cookies 
                and similar technologies when you visit our website or use our services. 
                By continuing to use our website, you agree to the use of cookies as described in this policy.
              </p>
            </div>
          </div>
        </section>

        {/* What and How Sections */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-12">
              {sections.slice(0, 2).map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
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

        {/* Cookie Types */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-bold mb-6 text-foreground">3. Types of Cookies We Use</h2>
              <div className="grid gap-6">
                {cookieTypes.map((type, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card border border-border rounded-xl p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-emerald/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <type.icon className="w-5 h-5 text-emerald" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2 text-foreground">{type.title}</h3>
                        <p className="text-muted-foreground text-sm mb-3">{type.description}</p>
                        <ul className="space-y-1">
                          {type.details.map((detail, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="w-1 h-1 bg-emerald rounded-full mt-2 flex-shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Remaining Sections */}
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-12">
              {sections.slice(2).map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
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
