"use client"

import React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Zap, Shield, Clock } from "lucide-react"
import { motion, useInView, useMotionValue, useSpring } from "framer-motion"
import { useRef, useState } from "react"

const benefits = [
  { icon: Zap, text: "Setup in 5 minutes" },
  { icon: Shield, text: "Enterprise-grade security" },
  { icon: Clock, text: "24/7 automated optimization" },
]

// Magnetic button component
function MagneticButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.15)
    y.set((e.clientY - centerY) * 0.15)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Animated particle ring
function ParticleRing() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-emerald/30"
          style={{
            transformOrigin: "center center",
          }}
          animate={{
            rotate: [0, 360],
            x: [
              Math.cos((i * 30 * Math.PI) / 180) * 200,
              Math.cos(((i * 30 + 360) * Math.PI) / 180) * 200,
            ],
            y: [
              Math.sin((i * 30 * Math.PI) / 180) * 150,
              Math.sin(((i * 30 + 360) * Math.PI) / 180) * 150,
            ],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  )
}

// Animated gradient border
function AnimatedBorder() {
  return (
    <motion.div
      className="absolute -inset-[1px] rounded-3xl overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-emerald via-violet to-emerald"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
      />
      <div className="absolute inset-[1px] rounded-3xl bg-charcoal" />
    </motion.div>
  )
}

export function CTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="py-24 bg-cloud relative overflow-hidden">
      {/* Background decorations */}
      <motion.div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald/10 rounded-full blur-[120px]"
        animate={{
          x: [-30, 30, -30],
          y: [-20, 20, -20],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet/10 rounded-full blur-[120px]"
        animate={{
          x: [30, -30, 30],
          y: [20, -20, 20],
          scale: [1.2, 1, 1.2],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8" ref={ref}>
        <div className="mx-auto max-w-4xl">
          {/* CTA Card */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Animated gradient border */}
            <AnimatedBorder />

            {/* Glow effect */}
            <motion.div
              className="absolute -inset-8 bg-gradient-to-r from-emerald/20 via-violet/20 to-emerald/20 rounded-[40px] blur-3xl"
              animate={{
                opacity: isHovered ? 0.8 : 0.4,
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.4 }}
            />

            <div className="relative rounded-3xl bg-charcoal p-8 sm:p-12 lg:p-16 overflow-hidden">
              {/* Particle ring */}
              <ParticleRing />

              {/* Animated mesh gradient background */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 20% 20%, rgba(15, 191, 154, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(108, 99, 255, 0.15) 0%, transparent 50%)",
                }}
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Animated grid */}
              <motion.div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: "40px 40px",
                }}
                animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              {/* Floating sparkles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${10 + i * 12}%`,
                    top: `${20 + (i % 4) * 18}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    x: [0, Math.random() * 10 - 5, 0],
                    opacity: [0.2, 0.8, 0.2],
                    rotate: [0, 180, 360],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                >
                  <Sparkles className="w-4 h-4 text-emerald/40" />
                </motion.div>
              ))}

              <div className="relative text-center">
                {/* Badge */}
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald/10 border border-emerald/20 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    className="w-2 h-2 rounded-full bg-emerald"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-sm font-medium text-emerald">Limited Time: 30% Off Annual Plans</span>
                </motion.div>

                {/* Headline */}
                <motion.h2
                  className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  Ready to{" "}
                  <motion.span
                    className="relative inline-block"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="bg-gradient-to-r from-emerald via-emerald-light to-emerald bg-[length:200%_auto] bg-clip-text text-transparent">
                      dominate
                    </span>
                    <motion.span
                      className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-emerald to-violet rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : {}}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    />
                  </motion.span>{" "}
                  AI search?
                </motion.h2>

                <motion.p
                  className="text-lg text-gray-400 max-w-2xl mx-auto mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 }}
                >
                  Join thousands of companies already optimizing for the future of search. Start your free test drive
                  today.
                </motion.p>

                {/* Benefits row */}
                <motion.div
                  className="flex flex-wrap items-center justify-center gap-6 mb-8"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 }}
                >
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit.text}
                      className="flex items-center gap-2 text-gray-400"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ color: "#F7F9FC", x: 5 }}
                    >
                      <benefit.icon className="w-4 h-4 text-emerald" />
                      <span className="text-sm">{benefit.text}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 }}
                >
                  <Link href="/signup">
                    <MagneticButton>
                      <motion.div
                        className="relative group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Button glow */}
                        <motion.div
                          className="absolute -inset-1 bg-gradient-to-r from-emerald to-violet rounded-xl opacity-70 blur-lg group-hover:opacity-100 transition-opacity"
                          animate={{ opacity: [0.5, 0.8, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <Button
                          size="lg"
                          className="relative bg-emerald hover:bg-emerald-dark text-charcoal font-semibold px-8 h-14 text-base overflow-hidden"
                        >
                          {/* Shimmer effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            initial={{ x: "-100%" }}
                            animate={{ x: "200%" }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                          />
                          <span className="relative z-10 flex items-center">
                            Start Free Test Drive
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
                    </MagneticButton>
                  </Link>

                  <Link href="/contact">
                    <MagneticButton>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          size="lg"
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10 px-8 h-14 text-base bg-transparent relative overflow-hidden group"
                        >
                          <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "0%" }}
                            transition={{ duration: 0.3 }}
                          />
                          <span className="relative z-10">Talk to Sales</span>
                        </Button>
                      </motion.div>
                    </MagneticButton>
                  </Link>
                </motion.div>

                {/* Trust text */}
                <motion.p
                  className="mt-8 text-sm text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.8 }}
                >
                  <motion.span
                    className="inline-flex items-center gap-1"
                    whileHover={{ color: "#8A93A6" }}
                  >
                    <Shield className="w-3 h-3" />
                    No credit card required
                  </motion.span>
                  <span className="mx-2">·</span>
                  <span>14-day free trial</span>
                  <span className="mx-2">·</span>
                  <span>Cancel anytime</span>
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
