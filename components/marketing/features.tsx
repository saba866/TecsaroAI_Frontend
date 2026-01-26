"use client"

import React from "react"

import { Search, Zap, Globe, FileText, Settings, BarChart3, Link2, Bot, ArrowUpRight } from "lucide-react"
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, useState } from "react"

const features = [
  {
    name: "AI Search Visibility",
    description: "Get discovered by ChatGPT, Perplexity, Claude, and other AI search engines.",
    icon: Search,
    color: "emerald",
    gradient: "from-emerald/20 via-emerald/5 to-transparent",
  },
  {
    name: "GEO - Generative Engine Optimization",
    description: "Optimize for AI-generated responses. Ensure your brand appears in AI summaries.",
    icon: Bot,
    color: "violet",
    gradient: "from-violet/20 via-violet/5 to-transparent",
  },
  {
    name: "AEO - Answer Engine Optimization",
    description: "Dominate featured snippets and direct answers. Be the definitive source.",
    icon: Zap,
    color: "emerald",
    gradient: "from-emerald/20 via-emerald/5 to-transparent",
  },
  {
    name: "Technical SEO",
    description: "Automated technical audits and fixes. Schema markup, site speed, crawlability.",
    icon: Settings,
    color: "violet",
    gradient: "from-violet/20 via-violet/5 to-transparent",
  },
  {
    name: "Content AI",
    description: "AI-powered content optimization with real-time suggestions for relevance.",
    icon: FileText,
    color: "emerald",
    gradient: "from-emerald/20 via-emerald/5 to-transparent",
  },
  {
    name: "Direct Publishing",
    description: "Push optimized content directly to your CMS. WordPress, Webflow, and more.",
    icon: Globe,
    color: "violet",
    gradient: "from-violet/20 via-violet/5 to-transparent",
  },
  {
    name: "Smart Automation",
    description: "Set it and forget it. Automated optimization workflows that run continuously.",
    icon: Link2,
    color: "emerald",
    gradient: "from-emerald/20 via-emerald/5 to-transparent",
  },
  {
    name: "Performance Analytics",
    description: "Track your AI search performance with detailed analytics and insights.",
    icon: BarChart3,
    color: "violet",
    gradient: "from-violet/20 via-violet/5 to-transparent",
  },
]

// 3D Tilt Card Component
function Feature3DCard({ feature, index }: { feature: (typeof features)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className="relative group"
    >
      <motion.div
        className={`relative p-6 rounded-2xl bg-white border border-gray-100 shadow-sm transition-shadow duration-500 ${
          isHovered ? "shadow-2xl" : ""
        }`}
        animate={{
          borderColor: isHovered ? (feature.color === "emerald" ? "#0FBF9A" : "#6C63FF") : "#f3f4f6",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated gradient background */}
        <motion.div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0`}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{ transform: "translateZ(0)" }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: "-100%", opacity: 0 }}
            animate={isHovered ? { x: "100%", opacity: 1 } : { x: "-100%", opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>

        {/* Icon with animation */}
        <motion.div
          className={`relative inline-flex p-3 rounded-xl mb-4 ${
            feature.color === "emerald" ? "bg-emerald/10 text-emerald" : "bg-violet/10 text-violet"
          }`}
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? [0, -5, 5, 0] : 0,
          }}
          transition={{ duration: 0.4 }}
          style={{ transform: "translateZ(30px)" }}
        >
          <feature.icon className="h-6 w-6" />
        </motion.div>

        {/* Content */}
        <motion.h3
          className="relative font-heading text-lg font-semibold text-charcoal mb-2"
          style={{ transform: "translateZ(20px)" }}
        >
          {feature.name}
        </motion.h3>
        <motion.p
          className="relative text-sm text-graphite leading-relaxed"
          style={{ transform: "translateZ(15px)" }}
        >
          {feature.description}
        </motion.p>

        {/* Learn more link */}
        <motion.div
          className={`relative flex items-center gap-1 mt-4 text-sm font-medium ${
            feature.color === "emerald" ? "text-emerald" : "text-violet"
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
          style={{ transform: "translateZ(25px)" }}
        >
          Learn more
          <motion.span animate={{ x: isHovered ? 5 : 0 }} transition={{ duration: 0.2 }}>
            <ArrowUpRight className="h-4 w-4" />
          </motion.span>
        </motion.div>

        {/* Animated border glow */}
        <motion.div
          className={`absolute inset-0 rounded-2xl ${
            feature.color === "emerald" ? "shadow-emerald/30" : "shadow-violet/30"
          }`}
          initial={{ opacity: 0, boxShadow: "0 0 0 0 currentColor" }}
          animate={{
            opacity: isHovered ? 1 : 0,
            boxShadow: isHovered
              ? feature.color === "emerald"
                ? "0 0 30px rgba(15, 191, 154, 0.2)"
                : "0 0 30px rgba(108, 99, 255, 0.2)"
              : "0 0 0 0 currentColor",
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  )
}

// Animated background orbs
function FloatingOrbs() {
  return (
    <>
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 rounded-full bg-emerald/5 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-violet/5 blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 20, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-emerald/3 to-violet/3 blur-3xl"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
    </>
  )
}

export function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 bg-cloud relative overflow-hidden">
      <FloatingOrbs />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8" ref={ref}>
        {/* Section header with staggered animation */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald/10 mb-4"
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-emerald"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-semibold text-emerald tracking-wide uppercase">Capabilities</span>
          </motion.div>

          <motion.h2
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Everything you need to{" "}
            <motion.span
              className="relative inline-block"
              whileHover={{ scale: 1.05 }}
            >
              <span className="bg-gradient-to-r from-emerald to-violet bg-clip-text text-transparent">
                dominate
              </span>
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-emerald to-violet rounded-full"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              />
            </motion.span>{" "}
            AI search
          </motion.h2>

          <motion.p
            className="text-lg text-graphite leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A complete platform for visibility in the age of AI. Not just tracking - actual optimization and execution.
          </motion.p>
        </div>

        {/* Features grid with 3D cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Feature3DCard key={feature.name} feature={feature} index={index} />
          ))}
        </div>

        {/* Bottom CTA with animation */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.p
            className="text-graphite mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Want to see all features?
          </motion.p>
          <motion.button
            className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal text-white rounded-xl font-medium group"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(11, 15, 20, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            View all features
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowUpRight className="h-4 w-4" />
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
