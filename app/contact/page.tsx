"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/marketing/header"
import { Footer } from "@/components/marketing/footer"
import { Mail, Clock, Shield, MessageSquare, Building2 } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function ContactPage() {
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
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-emerald/10 text-emerald rounded-full text-sm font-medium mb-6">
                Contact Us
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Let’s talk about your{" "}
                <span className="text-gradient">growth with Tecsaro AI</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                We’re here to help you succeed. Reach out anytime — our team is ready to support you.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">

              {/* Email Support */}
              <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-emerald/50 transition-all">
                <Mail className="w-8 h-8 text-emerald mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Email Support</h3>
                <p className="text-muted-foreground mb-3">
                  For all queries, contact us at:
                </p>
                <p className="text-emerald font-medium">support@tecsaro.com</p>
                <p className="text-sm text-muted-foreground mt-2">
                  We usually respond within 24 business hours.
                </p>
              </motion.div>

              {/* Sales & Partnerships */}
              <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-emerald/50 transition-all">
                <Building2 className="w-8 h-8 text-emerald mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Sales & Partnerships</h3>
                <p className="text-muted-foreground mb-3">
                  Agency or Enterprise plans? Custom solutions or demos?
                </p>
                <p className="text-emerald font-medium">support@tecsaro.com</p>
              </motion.div>

              {/* Security Issues */}
              <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-emerald/50 transition-all">
                <Shield className="w-8 h-8 text-emerald mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Security Issues</h3>
                <p className="text-muted-foreground mb-3">
                  Found a vulnerability or security issue?
                </p>
                <p className="text-emerald font-medium">support@tecsaro.com</p>
              </motion.div>

              {/* Support Hours */}
              <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-emerald/50 transition-all">
                <Clock className="w-8 h-8 text-emerald mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Support Hours</h3>
                <p className="text-muted-foreground">
                  Monday to Friday
                </p>
                <p className="text-foreground font-medium">
                  10:00 AM – 6:00 PM (IST)
                </p>
              </motion.div>

              {/* Company Info */}
              <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-emerald/50 transition-all">
                <Building2 className="w-8 h-8 text-emerald mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Company Info</h3>
                <p className="text-muted-foreground">Tecsaro AI (MVP Product)</p>
                <p className="text-emerald font-medium">https://ai.tecsaro.com</p>
              </motion.div>

              {/* Feedback */}
              <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-emerald/50 transition-all">
                <MessageSquare className="w-8 h-8 text-emerald mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Feedback & Suggestions</h3>
                <p className="text-muted-foreground mb-3">
                  We’re building Tecsaro AI with our users.
                </p>
                <p className="text-emerald font-medium">support@tecsaro.com</p>
              </motion.div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
