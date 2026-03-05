



"use client"

import React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Globe, BarChart3, Users, CheckCircle, Sparkles } from "lucide-react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"

const workflow = [
  { step: "Connect", icon: Zap, description: "Link your site" },
  { step: "Crawl", icon: Globe, description: "Extract content" },
  { step: "Track", icon: BarChart3, description: "Daily AI checks" },
  { step: "Score", icon: CheckCircle, description: "AEO visibility" },
  { step: "Improve", icon: Users, description: "Act on insights" },
]

// Text scramble component
function ScrambleText({ text, className }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState(text)
  const [isHovered, setIsHovered] = useState(false)
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text)
      return
    }

    let iteration = 0
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) return text[index]
            if (char === " ") return " "
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join("")
      )

      if (iteration >= text.length) {
        clearInterval(interval)
      }
      iteration += 1 / 2
    }, 30)

    return () => clearInterval(interval)
  }, [isHovered, text])

  return (
    <span
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {displayText}
    </span>
  )
}

// Morphing blob component
function MorphingBlob({ className }: { className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{
        borderRadius: [
          "60% 40% 30% 70% / 60% 30% 70% 40%",
          "30% 60% 70% 40% / 50% 60% 30% 60%",
          "60% 40% 30% 70% / 60% 30% 70% 40%",
        ],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  )
}

// Animated gradient text
function GradientText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.span
      className={`bg-gradient-to-r from-emerald via-emerald-light to-emerald bg-[length:200%_auto] bg-clip-text text-transparent ${className}`}
      animate={{ backgroundPosition: ["0%", "200%"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    >
      {children}
    </motion.span>
  )
}

// Floating particle system
function ParticleField() {
  const [particles, setParticles] = useState<
    {
      id: number
      size: number
      x: number
      y: number
      duration: number
      delay: number
    }[]
  >([])

  useEffect(() => {
    const generated = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }))
    setParticles(generated)
  }, [])

  if (!particles.length) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-emerald/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// 3D Card with tilt effect
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const percentX = (e.clientX - centerX) / (rect.width / 2)
    const percentY = (e.clientY - centerY) / (rect.height / 2)
    setRotateX(-percentY * 10)
    setRotateY(percentX * 10)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setRotateX(0)
        setRotateY(0)
      }}
      animate={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
    >
      {children}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            background: `radial-gradient(circle at ${50 + rotateY * 2}% ${50 + rotateX * 2}%, rgba(15, 191, 154, 0.15), transparent 60%)`,
          }}
        />
      )}
    </motion.div>
  )
}

// Typewriter effect
function TypewriterText({ words, className }: { words: string[]; className?: string }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const word = words[currentWordIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < word.length) {
            setCurrentText(word.slice(0, currentText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1))
          } else {
            setIsDeleting(false)
            setCurrentWordIndex((prev) => (prev + 1) % words.length)
          }
        }
      },
      isDeleting ? 50 : 100
    )

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentWordIndex, words])

  return (
    <span className={className}>
      {currentText}
      <motion.span
        className="inline-block w-0.5 h-[1em] bg-emerald ml-1"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      />
    </span>
  )
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  return (
    <section ref={containerRef} className="relative min-h-screen bg-charcoal overflow-hidden">
      {/* Animated morphing background blobs */}
      <MorphingBlob className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet/15 blur-[100px]" />
      <MorphingBlob className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald/10 blur-[80px]" />
      <MorphingBlob className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-emerald/5 blur-[60px]" />

      {/* Animated grid pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "60px 60px"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Particle field */}
      <ParticleField />

      {/* Animated lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <motion.line
          x1="0"
          y1="30%"
          x2="100%"
          y2="70%"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.1 }}
          transition={{ duration: 3, delay: 1 }}
        />
        <motion.line
          x1="100%"
          y1="20%"
          x2="0"
          y2="80%"
          stroke="url(#lineGradient2)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.1 }}
          transition={{ duration: 3, delay: 1.5 }}
        />
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0FBF9A" stopOpacity="0" />
            <stop offset="50%" stopColor="#0FBF9A" stopOpacity="1" />
            <stop offset="100%" stopColor="#6C63FF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6C63FF" stopOpacity="0" />
            <stop offset="50%" stopColor="#6C63FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#0FBF9A" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <motion.div style={{ y, opacity, scale }} className="relative mx-auto max-w-7xl px-6 lg:px-8 pt-32 pb-24">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.2 },
            },
          }}
        >
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 relative overflow-hidden group cursor-pointer"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald/20 to-violet/20"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.span
              className="w-2 h-2 rounded-full bg-emerald"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm text-gray-400 relative z-10">AEO Platform — Track your AI answer visibility</span>
            <Sparkles className="h-3 w-3 text-amber" />
          </motion.div>

          {/* Main headline */}
          {/* <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6"
          >
            <motion.span
              className="text-gray-400 block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              Most brands are invisible in AI answers.
            </motion.span>
            <motion.span
              className="block mt-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <ScrambleText text="Tecsaro AI" className="text-white cursor-pointer" />{" "}
              <GradientText>
                <TypewriterText words={["tracks", "measures", "improves"]} />
              </GradientText>
            </motion.span>
            <motion.span
              className="block mt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              your{" "}
              <motion.span
                className="bg-gradient-to-r from-violet to-violet-light bg-clip-text text-transparent inline-block"
                whileHover={{ scale: 1.05 }}
              >
                AI answer
              </motion.span>{" "}
              visibility.
            </motion.span>
          </motion.h1> */}

          {/* Main headline */}
          {/* NOTE: The <noscript> tag below ensures Google's crawler always sees the full
              app name + purpose even when JS hasn't run the typewriter animation yet. */}
          <noscript>
            <h1 className="font-heading text-4xl font-bold text-white mb-6">
              Tecsaro AI tracks your AI answer visibility across ChatGPT, Gemini, and Perplexity.
            </h1>
          </noscript>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6"
            aria-label="Tecsaro AI tracks your AI answer visibility."
          >
            <motion.span
              className="text-gray-400 block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              Most brands are invisible in AI answers.
            </motion.span>
            <motion.span
              className="block mt-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <ScrambleText text="Tecsaro AI" className="text-white cursor-pointer" />{" "}
              <GradientText>
                <TypewriterText words={["tracks", "measures", "improves"]} />
              </GradientText>
            </motion.span>
            <motion.span
              className="block mt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              your{" "}
              <motion.span
                className="bg-gradient-to-r from-violet to-violet-light bg-clip-text text-transparent inline-block"
                whileHover={{ scale: 1.05 }}
              >
                AI answer
              </motion.span>{" "}
              visibility.
            </motion.span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Track your brand across ChatGPT, Gemini, and Perplexity daily. Detect competitors in AI answers. Get clear recommendations to improve your visibility.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href="/signup">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative group">
                <motion.div
                  className="absolute -inset-1 rounded-xl bg-gradient-to-r from-emerald to-violet opacity-70 blur-lg group-hover:opacity-100 transition-opacity"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <Button
                  size="lg"
                  className="relative bg-emerald hover:bg-emerald-dark text-charcoal font-semibold px-8 h-12 text-base group overflow-hidden"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative z-10 flex items-center">
                    Start Free Trial
                    <motion.span
                      className="inline-block ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.span>
                  </span>
                </Button>
              </motion.div>
            </Link>
            <Link href="/product">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-8 h-12 text-base bg-transparent relative overflow-hidden group"
                >
                  <motion.span
                    className="absolute inset-0 bg-white/5"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">See How It Works</span>
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Workflow strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-transparent to-charcoal z-10 pointer-events-none" />
            <div className="flex items-center justify-center gap-4 sm:gap-8 overflow-x-auto pb-4">
              {workflow.map((item, index) => (
                <motion.div
                  key={item.step}
                  className="flex items-center gap-4 sm:gap-8"
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 1 + index * 0.1,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  <motion.div
                    className="flex flex-col items-center gap-2 cursor-pointer"
                    whileHover={{ y: -5 }}
                  >
                    <motion.div
                      className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden group"
                      whileHover={{
                        borderColor: "rgba(15, 191, 154, 0.5)",
                        boxShadow: "0 0 20px rgba(15, 191, 154, 0.3)",
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-emerald/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                      <item.icon className="h-6 w-6 text-gray-400 group-hover:text-emerald transition-colors relative z-10" />
                    </motion.div>
                    <span className="text-sm font-medium text-gray-400">{item.step}</span>
                    <span className="text-xs text-gray-600 hidden sm:block">{item.description}</span>
                  </motion.div>
                  {index < workflow.length - 1 && (
                    <motion.div
                      className="hidden sm:flex items-center"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
                    >
                      <motion.div
                        className="w-12 h-px bg-gradient-to-r from-emerald/50 to-violet/50"
                        animate={{ opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 rounded-full bg-emerald"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                      />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Hero card / Dashboard preview */}
        <motion.div
          className="mt-16 relative"
          initial={{ opacity: 0, y: 100, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 1.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-emerald/30 via-violet/30 to-emerald/30 rounded-3xl blur-3xl"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [0.98, 1.02, 0.98],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <TiltCard className="relative">
            <div className="relative rounded-2xl border border-white/10 bg-charcoal-light/90 backdrop-blur-xl overflow-hidden shadow-2xl">
              {/* Browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
                <div className="flex gap-1.5">
                  {["bg-red-500", "bg-yellow-500", "bg-green-500"].map((color, i) => (
                    <motion.div
                      key={color}
                      className={`w-3 h-3 rounded-full ${color}/80`}
                      whileHover={{ scale: 1.3 }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.4 + i * 0.1 }}
                    />
                  ))}
                </div>
                <div className="flex-1 flex justify-center">
                  <motion.div
                    className="px-4 py-1 rounded-md bg-white/5 text-xs text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    app.tecsaro.ai/dashboard
                  </motion.div>
                </div>
              </div>

              {/* Dashboard preview content */}
              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "AEO Visibility Score", value: 74, suffix: "", change: "+18 this week", color: "emerald" },
                    { label: "AI Engines Tracked", value: 3, suffix: "", change: "ChatGPT · Gemini · Perplexity", color: "violet" },
                    { label: "Brand Mentions Detected", value: 284, suffix: "", change: "+42 this week", color: "amber" },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 relative overflow-hidden group"
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 1.6 + index * 0.15, type: "spring", stiffness: 200 }}
                      whileHover={{
                        scale: 1.02,
                        borderColor: "rgba(255,255,255,0.2)",
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-emerald/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                      <p className="text-xs text-gray-500 mb-1 relative z-10">{stat.label}</p>
                      <CountUpNumber
                        value={stat.value}
                        suffix={stat.suffix}
                        delay={1.8 + index * 0.15}
                        className="font-mono text-2xl font-bold text-white relative z-10"
                      />
                      <p
                        className={`text-xs mt-1 relative z-10 ${
                          stat.color === "emerald"
                            ? "text-emerald"
                            : stat.color === "violet"
                              ? "text-violet"
                              : "text-amber"
                        }`}
                      >
                        {stat.change}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Animated chart */}
                <div className="h-48 rounded-xl bg-white/5 border border-white/10 flex items-end justify-around p-4 gap-2 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-emerald/5 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                  />
                  {[40, 65, 45, 80, 55, 90, 70, 95, 75, 85, 60, 92].map((height, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-t bg-gradient-to-t from-emerald/60 to-emerald cursor-pointer relative group"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: `${height}%`, opacity: 1 }}
                      transition={{
                        delay: 2 + i * 0.08,
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={{
                        scaleY: 1.1,
                        filter: "brightness(1.2)",
                      }}
                    >
                      <motion.div
                        className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-white/10 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                      >
                        {height}%
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center p-2"
          animate={{ borderColor: ["rgba(255,255,255,0.2)", "rgba(15,191,154,0.5)", "rgba(255,255,255,0.2)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 bg-white/60 rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

// Count up number component
function CountUpNumber({
  value,
  suffix = "",
  delay = 0,
  className,
}: {
  value: number
  suffix?: string
  delay?: number
  className?: string
}) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHasStarted(true)
    }, delay * 1000)
    return () => clearTimeout(timeout)
  }, [delay])

  useEffect(() => {
    if (!hasStarted) return

    const duration = 2000
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)

      if (value >= 1) {
        setCount(Math.floor(easeOutExpo * value))
      } else {
        setCount(Number((easeOutExpo * value).toFixed(1)))
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [hasStarted, value])

  return (
    <span className={className}>
      {value >= 1000 ? count.toLocaleString() : count}
      {suffix}
    </span>
  )
}