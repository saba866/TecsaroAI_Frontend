


"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/marketing/header"
import { Footer } from "@/components/marketing/footer"
import { RotateCcw, Check, X, AlertCircle, Info, CreditCard } from "lucide-react"

const howItWorks = [
  "Sign up and start your free forever — no credit card required",
  "Get full access to AI visibility tracking, prompts, competitor detection, and schema generation",
  "On day 8, tracking stops automatically if you have not upgraded",
  "To continue, you actively choose to upgrade and enter your payment details",
  "You are only ever charged after a deliberate upgrade action"
]

const nonRefundableConditions = [
  "You have actively upgraded to a paid plan and billing has started",
  "AI visibility tracking has been run on your paid plan",
  "Prompts have been executed across AI engines",
  "Schema generation features have been used",
  "The subscription has been renewed",
  "Annual plans are activated",
  "Accounts are suspended due to misuse or violation of terms"
]

const sections = [
  {
    title: "3. Subscription Cancellations",
    content: `• You can cancel your subscription at any time from your dashboard
• Cancellation stops future billing immediately
• You will retain access until the end of your current billing period
• No partial refunds are issued for unused time within a billing period`
  },
  {
    title: "4. Enterprise & Custom Plans",
    content: `Enterprise and custom plans are governed by separate agreements and handled on a case-by-case basis. Please contact support@tecsaro.com before purchasing an enterprise plan if you have questions about billing terms.`
  },
  {
    title: "5. Chargebacks & Disputes",
    content: `Initiating a chargeback without contacting support may result in immediate account suspension.
We encourage users to reach out to us first — we resolve most issues quickly and fairly.`
  },
  {
    title: "6. Billing Issues",
    content: `If you believe you were charged incorrectly, contact us at:
support@tecsaro.com

Subject: Billing Issue
Include your account email and the date of the charge.

We will review and respond within 2 business days.`
  },
  {
    title: "7. Policy Updates",
    content: `We may update this policy from time to time.
The latest version will always be available on this page with the updated date.`
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
                At Tecsaro AI, we believe you should never pay for something you haven't had a
                chance to evaluate. That's why every new user gets a full free forever —
                with no credit card required. You are only ever charged if you actively choose
                to upgrade. Because of this, all purchases are final and non-refundable.
              </p>
            </div>
          </div>
        </section>

        {/* No Credit Card Banner */}
        <section className="py-4">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-emerald/5 border border-emerald/20 rounded-2xl p-5 flex items-start gap-4"
              >
                <div className="w-9 h-9 bg-emerald/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-5 h-5 text-emerald" />
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">No credit card required to start</p>
                  <p className="text-sm text-muted-foreground">
                    Your free forever starts the moment you sign up — no card, no commitment.
                    If you don't upgrade before day 7, tracking stops automatically and you are
                    never charged. Simple as that.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-2xl p-6 mb-8"
              >
                <h2 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <Info className="w-5 h-5 text-violet" />
                  1. How Our Trial & Billing Works
                </h2>
                <ul className="space-y-3">
                  {howItWorks.map((step, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-6 h-6 rounded-full bg-emerald/10 text-emerald text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground mt-5 pt-4 border-t border-border">
                  Because you are only charged after a deliberate upgrade action, there is no scenario where you are accidentally billed.
                </p>
              </motion.div>

              {/* Non-Refundable */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-destructive/5 border border-destructive/20 rounded-2xl p-6 mb-8"
              >
                <h2 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <X className="w-5 h-5 text-destructive" />
                  2. All Purchases Are Final
                </h2>
                <p className="text-muted-foreground mb-4">
                  Once you have upgraded to a paid plan, refunds are not issued. This applies when:
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
                    Every time we run a prompt across ChatGPT, Gemini, or Perplexity to check your
                    brand's visibility, we are charged by the AI provider in real time. Daily tracking
                    across multiple engines and prompts adds up immediately. Since we give you a full
                    7 days to evaluate the platform with no card required, upgrading is always a
                    conscious, informed decision — which is why all paid purchases are final.
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