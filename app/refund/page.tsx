"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/marketing/header"
import { Footer } from "@/components/marketing/footer"
import { RotateCcw, Check, X, AlertCircle } from "lucide-react"

const eligibleConditions = [
  "Less than 20% of your plan limits have been used",
  "No bulk publishing has been performed",
  "No API access has been used",
  "No abuse or misuse is detected",
  "The request is submitted within 7 days of payment"
]

const nonRefundableConditions = [
  "More than 7 days have passed since purchase",
  "More than 20% of plan usage has been consumed",
  "Content or products have been published",
  "AI-intensive features have been heavily used",
  "API access has been used",
  "Add-ons have been purchased and used",
  "The subscription has been renewed",
  "Annual plans are activated",
  "Accounts are suspended due to misuse or violation of terms"
]

const sections = [
  {
    title: "3. Subscription Cancellations",
    content: `• You can cancel your subscription at any time from your dashboard
• Cancellation stops future billing
• You will retain access until the end of your billing period
• No partial refunds are issued for unused time`
  },
  {
    title: "4. Enterprise & Custom Plans",
    content: `Enterprise and custom plans are governed by separate agreements and handled case-by-case.`
  },
  {
    title: "5. Chargebacks & Disputes",
    content: `Initiating a chargeback without contacting support may result in account suspension.
We encourage users to contact us first for faster resolution.`
  },
  {
    title: "6. How to Request a Refund",
    content: `To request a refund, email us at:
support@tecsaro.com

Subject: Refund Request
Include your account email and payment date.`
  },
  {
    title: "7. Policy Updates",
    content: `We may update this policy from time to time.
The latest version will always be available on this page.`
  }
]

export default function RefundPage() {
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
                <RotateCcw className="w-8 h-8 text-emerald" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Refund Policy
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
                At Tecsaro AI, we provide digital, AI-powered services that begin processing 
                immediately after activation. This policy explains when refunds are applicable 
                and when they are not.
              </p>
            </div>
          </div>
        </section>

        {/* Eligibility Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-emerald/5 border border-emerald/20 rounded-2xl p-6 mb-8"
              >
                <h2 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald" />
                  1. Eligibility for Refund
                </h2>
                <p className="text-muted-foreground mb-4">
                  You may request a refund within 7 days of your first purchase if all of the following conditions are met:
                </p>
                <ul className="space-y-2">
                  {eligibleConditions.map((condition, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <Check className="w-4 h-4 text-emerald mt-1 flex-shrink-0" />
                      {condition}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  If eligible, the refund will be processed to the original payment method within 7-10 business days.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-destructive/5 border border-destructive/20 rounded-2xl p-6 mb-8"
              >
                <h2 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <X className="w-5 h-5 text-destructive" />
                  2. Non-Refundable Situations
                </h2>
                <p className="text-muted-foreground mb-4">
                  Refunds will not be issued if:
                </p>
                <ul className="space-y-2">
                  {nonRefundableConditions.map((condition, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <X className="w-4 h-4 text-destructive mt-1 flex-shrink-0" />
                      {condition}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Other Sections */}
        <section className="pb-12">
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

        {/* Why This Policy Exists */}
        <section className="py-12 bg-card">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-amber" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 text-foreground">Why this policy exists</h3>
                  <p className="text-muted-foreground">
                    Our services use AI, APIs, and infrastructure that incur immediate costs once activated. 
                    This policy helps us keep pricing fair for all users while ensuring sustainability.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
