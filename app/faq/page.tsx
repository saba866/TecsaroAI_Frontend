"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/marketing/header"
import { Footer } from "@/components/marketing/footer"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

/* ================= FAQ DATA ================= */

const faqData = [
  {
    category: "General",
    items: [
      {
        q: "What is Tecsaro AI?",
        a: "Tecsaro AI is an AI-powered website optimization platform that helps you improve technical SEO, optimize for AI search (GEO & AEO), publish optimized content and products, and track performance with clear scores — all from one dashboard."
      },
      {
        q: "Who is Tecsaro AI for?",
        a: "Tecsaro AI is built for founders, startups, e-commerce businesses, SaaS companies, agencies, consultants, and any business that depends on website visibility to grow."
      },
      {
        q: "Do I need SEO knowledge to use Tecsaro AI?",
        a: "No. Tecsaro AI is designed to be simple and action-focused, with clear scores and step-by-step recommendations."
      }
    ]
  },
  {
    category: "Website & Integrations",
    items: [
      { q: "Which platforms can I connect?", a: "You can connect WordPress, Shopify, and custom websites. More integrations will be added in future phases." },
      { q: "Is it safe to connect my website?", a: "Yes. We use secure connections, limited permissions, and industry-standard security practices." },
      { q: "Can I connect multiple websites?", a: "Yes. The number of websites you can connect depends on your plan." },
      { q: "Can I disconnect my website anytime?", a: "Yes. You can disconnect or remove your website anytime." }
    ]
  },
  {
    category: "SEO, GEO & AEO",
    items: [
      { q: "What is GEO?", a: "GEO helps your website appear in AI-generated answers on ChatGPT, Gemini, and Perplexity." },
      { q: "What is AEO?", a: "AEO helps your content directly answer user questions so it is more likely to be used in AI answers." },
      { q: "Does Tecsaro AI work for Google SEO?", a: "Yes. We support technical SEO, keyword tracking, backlink analysis, and content optimization." },
      { q: "Do you guarantee rankings?", a: "No. We provide optimization tools and recommendations, not guaranteed outcomes." },
      { q: "How often are scores updated?", a: "Test Drive: Weekly • Starter: 3× per week • Pro+: Daily" }
    ]
  },
  {
    category: "Content & Publishing",
    items: [
      { q: "Can I publish content directly?", a: "Yes. You can publish optimized pages, blogs, and products directly from Tecsaro AI." },
      { q: "Is publishing automatic?", a: "Auto-publishing depends on your plan. Manual approval is always available." },
      { q: "Can I undo changes?", a: "Yes. You can roll back changes anytime from your dashboard." }
    ]
  },
  {
    category: "Backlinks",
    items: [
      { q: "Does Tecsaro AI check backlinks?", a: "Yes. All plans include backlink health checks." },
      { q: "Do you build backlinks for me?", a: "No. We analyze and guide you but do not build backlinks." }
    ]
  },
  {
    category: "Reports & Data",
    items: [
      { q: "Can I download reports?", a: "PDF/CSV exports are available on Pro and above plans." },
      { q: "How long is data stored?", a: "Pro: 6 months • Agency: 12 months • Enterprise: Custom" },
      { q: "Is my data used for training?", a: "No. Your private data is never used to train public AI models." }
    ]
  },
  {
    category: "Pricing & Billing",
    items: [
      { q: "Can I change my plan?", a: "Yes. Upgrade anytime or downgrade next cycle." },
      { q: "Do you offer refunds?", a: "Yes. Within 7 days if usage is below 20%." },
      { q: "What payment methods do you support?", a: "UPI, cards, net banking, international cards via Razorpay." },
      { q: "Is there a free plan?", a: "Yes. We offer a Test Drive plan." }
    ]
  },
  {
    category: "Security & Privacy",
    items: [
      { q: "How do you protect data?", a: "Encryption, secure infra, monitoring, and backups." },
      { q: "Do you store payment details?", a: "No. Payments are handled securely by Razorpay." },
      { q: "Can I delete my data?", a: "Yes. You can request deletion anytime." }
    ]
  },
  {
    category: "Support & Help",
    items: [
      { q: "Do you offer support?", a: "Yes. Email support for all plans. Priority for Pro+." },
      { q: "How can I contact support?", a: "Email support@tecsaro.com" },
      { q: "Where are updates shared?", a: "Via email and inside the dashboard." }
    ]
  }
]

/* ================= FAQ ITEM ================= */

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-charcoal-light border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left text-white hover:bg-white/10 transition"
      >
        <span className="font-medium">{q}</span>
        <ChevronDown className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="px-5 pb-4 text-gray-300 text-sm leading-relaxed"
        >
          {a}
        </motion.div>
      )}
    </div>
  )
}

/* ================= PAGE ================= */

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-charcoal to-background">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">

          {/* HERO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-400">
              Everything you need to know about Tecsaro AI
            </p>
          </motion.div>

          {/* FAQ SECTIONS */}
          <div className="space-y-12">
            {faqData.map((section) => (
              <div key={section.category}>
                <h2 className="text-2xl font-semibold text-emerald mb-6">
                  {section.category}
                </h2>
                <div className="space-y-4">
                  {section.items.map((item, i) => (
                    <FAQItem key={i} q={item.q} a={item.a} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-20 text-center bg-charcoal-light border border-white/10 rounded-2xl p-8">
            <p className="text-gray-300 mb-2">Still have questions?</p>
            <p className="text-emerald font-semibold text-lg">
              support@tecsaro.com
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
