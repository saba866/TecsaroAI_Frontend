"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/marketing/header"
import { Footer } from "@/components/marketing/footer"
import { 
  Shield, 
  Server, 
  Database, 
  User, 
  CreditCard, 
  Globe, 
  Bot, 
  HardDrive,
  Mail,
  RefreshCw,
  Check
} from "lucide-react"

const securitySections = [
  {
    icon: Server,
    title: "1. Secure Infrastructure",
    description: "Our platform is hosted on secure cloud infrastructure with:",
    points: [
      "Encrypted network communication (HTTPS / TLS)",
      "Firewall protection",
      "Isolated environments",
      "Continuous monitoring",
      "Regular system updates"
    ]
  },
  {
    icon: Database,
    title: "2. Data Protection",
    description: "We protect your data using:",
    points: [
      "Encryption in transit",
      "Secure storage",
      "Limited internal access",
      "Role-based permissions",
      "Logging and monitoring of access"
    ],
    note: "Only authorized team members can access production systems, and access is reviewed regularly."
  },
  {
    icon: User,
    title: "3. Account Security",
    description: "We take account security seriously:",
    points: [
      "Passwords are encrypted and never stored in plain text",
      "Secure authentication methods are used",
      "Session timeouts are enforced",
      "Suspicious activity is monitored"
    ],
    note: "Users are responsible for keeping their login credentials secure."
  },
  {
    icon: CreditCard,
    title: "4. Payment Security",
    description: "All payments are processed securely by trusted providers such as Razorpay (and Stripe for international customers in future).",
    points: [
      "We never store card or bank details",
      "Payment processing is PCI-DSS compliant",
      "Secure tokens are used for transactions"
    ]
  },
  {
    icon: Globe,
    title: "5. Website Access & Publishing Safety",
    description: "When you connect a website:",
    points: [
      "Access is limited to required permissions only",
      "Publishing actions require user approval (based on plan)",
      "Changes are logged and traceable",
      "Rollback options are available for safety"
    ]
  },
  {
    icon: Bot,
    title: "6. AI & Data Processing Security",
    description: "For AI-powered features:",
    points: [
      "Only required data is sent to AI providers for processing",
      "Data is not used to train public models",
      "Processing is temporary and purpose-limited",
      "We follow strict access controls for AI operations"
    ]
  },
  {
    icon: HardDrive,
    title: "7. Backups & Reliability",
    description: "We perform:",
    points: [
      "Regular automated backups",
      "Secure backup storage",
      "Recovery procedures for critical systems",
      "Monitoring for system health and uptime"
    ]
  }
]

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald/5 to-transparent" />
          
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
                Security at Tecsaro AI
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
              <p className="text-muted-foreground text-lg">
                At Tecsaro AI, protecting your data, websites, and accounts is a top priority. 
                We have built our platform with security in mind from day one and follow 
                industry-standard best practices to keep your information safe.
              </p>
            </div>
          </div>
        </section>

        {/* Security Sections */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-8">
              {securitySections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card border border-border rounded-2xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <section.icon className="w-6 h-6 text-emerald" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold mb-2 text-foreground">{section.title}</h2>
                      <p className="text-muted-foreground mb-4">{section.description}</p>
                      <ul className="space-y-2">
                        {section.points.map((point, i) => (
                          <li key={i} className="flex items-start gap-2 text-foreground">
                            <Check className="w-4 h-4 text-emerald mt-1 flex-shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                      {section.note && (
                        <p className="text-sm text-muted-foreground mt-4 italic">{section.note}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Responsible Disclosure */}
        <section className="py-12 bg-card">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-violet/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-violet" />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2 text-foreground">8. Responsible Disclosure</h2>
                  <p className="text-muted-foreground mb-4">
                    If you discover a security vulnerability, please report it responsibly to:
                  </p>
                  <p className="font-medium text-emerald">support@tecsaro.com</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    We take all reports seriously and will investigate promptly.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Updates */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-6 h-6 text-emerald" />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2 text-foreground">9. Security Updates</h2>
                  <p className="text-muted-foreground">
                    We continuously improve our security practices. 
                    This page may be updated as our platform evolves.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-12 bg-charcoal text-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-4">Contact</h2>
              <p className="text-white/70 mb-4">For security-related questions, contact us at:</p>
              <p className="text-emerald-light font-medium text-lg">support@tecsaro.com</p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
