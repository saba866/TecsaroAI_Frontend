

// "use client"

// import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion"
// import { useRef, useEffect, useState } from "react"

// /* -------------------- DATA -------------------- */

// const stats = [
//   { value: 300, suffix: "%", label: "Average increase in AI search visibility", icon: "chart" },
//   { value: 10, suffix: "K+", label: "Pages optimized daily", icon: "pages" },
//   { value: 2.5, suffix: "M", label: "AI search impressions generated", icon: "eye" },
//   { value: 98, suffix: "%", label: "Customer satisfaction rate", icon: "star" },
// ]

// const logos = ["TechCorp", "MediaFlow", "DataSync", "CloudBase", "AIForward", "NexGen", "Quantum", "Elevate"]

// /* -------------------- COUNTER -------------------- */

// function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
//   const count = useMotionValue(0)
//   const rounded = useTransform(count, (latest) =>
//     Number.isInteger(value) ? Math.floor(latest) : latest.toFixed(1)
//   )
//   const [displayValue, setDisplayValue] = useState("0")

//   useEffect(() => {
//     if (!inView) return

//     const controls = animate(count, value, { duration: 2.5, ease: [0.22, 1, 0.36, 1] })
//     const unsubscribe = rounded.on("change", (v) => setDisplayValue(String(v)))

//     return () => {
//       controls.stop()
//       unsubscribe()
//     }
//   }, [inView, value, count, rounded])

//   return (
//     <span>
//       {displayValue}
//       {suffix}
//     </span>
//   )
// }

// /* -------------------- STAT CARD -------------------- */

// function StatCard({
//   stat,
//   index,
//   isInView,
// }: {
//   stat: (typeof stats)[0]
//   index: number
//   isInView: boolean
// }) {
//   const [isHovered, setIsHovered] = useState(false)

//   return (
//     <motion.div
//       className="relative text-center group cursor-pointer"
//       initial={{ opacity: 0, y: 50, scale: 0.9 }}
//       animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
//       transition={{ delay: index * 0.15, duration: 0.6, type: "spring", stiffness: 100 }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <motion.div
//         className="absolute -inset-4 bg-gradient-to-r from-emerald/20 to-violet/20 rounded-2xl blur-xl"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: isHovered ? 0.5 : 0 }}
//         transition={{ duration: 0.3 }}
//       />

//       <motion.div
//         className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
//         animate={{
//           borderColor: isHovered ? "rgba(15, 191, 154, 0.3)" : "rgba(255, 255, 255, 0.1)",
//           y: isHovered ? -5 : 0,
//         }}
//         transition={{ duration: 0.3 }}
//       >
//         <motion.div
//           className="w-12 h-12 mx-auto mb-4 rounded-xl bg-emerald/10 flex items-center justify-center"
//           animate={{
//             scale: isHovered ? 1.1 : 1,
//             rotate: isHovered ? [0, -5, 5, 0] : 0,
//           }}
//           transition={{ duration: 0.4 }}
//         >
//           <StatIcon type={stat.icon} />
//         </motion.div>

//         <motion.p
//           className="font-mono text-4xl sm:text-5xl font-bold bg-gradient-to-r from-emerald via-emerald-light to-emerald bg-[length:200%_auto] bg-clip-text text-transparent mb-2"
//           animate={{ backgroundPosition: isHovered ? ["0%", "200%"] : "0%" }}
//           transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
//         >
//           <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={isInView} />
//         </motion.p>

//         <motion.p
//           className="text-sm text-gray-400 max-w-[180px] mx-auto leading-relaxed"
//           animate={{ color: isHovered ? "#F7F9FC" : "#8A93A6" }}
//           transition={{ duration: 0.3 }}
//         >
//           {stat.label}
//         </motion.p>

//         <motion.div
//           className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald to-violet rounded-full"
//           animate={{ width: isHovered ? "60%" : "0%" }}
//           transition={{ duration: 0.3 }}
//         />
//       </motion.div>
//     </motion.div>
//   )
// }

// /* -------------------- ICONS -------------------- */

// function StatIcon({ type }: { type: string }) {
//   const iconClass = "w-6 h-6 text-emerald"
//   switch (type) {
//     case "chart":
//       return <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
//     case "pages":
//       return <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
//     case "eye":
//       return <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
//     case "star":
//       return <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
//     default:
//       return null
//   }
// }

// /* -------------------- BLOBS -------------------- */

// function MorphingBlobs() {
//   return (
//     <div className="absolute inset-0 overflow-hidden">
//       <motion.div
//         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald/5 blur-[120px]"
//         animate={{
//           borderRadius: [
//             "60% 40% 30% 70% / 60% 30% 70% 40%",
//             "30% 60% 70% 40% / 50% 60% 30% 60%",
//             "60% 40% 30% 70% / 60% 30% 70% 40%",
//           ],
//           scale: [1, 1.1, 1],
//         }}
//         transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//       />
//     </div>
//   )
// }

// /* -------------------- FLOATING PARTICLES (FIXED) -------------------- */

// function FloatingParticles() {
//   const [particles, setParticles] = useState<any[]>([])

//   useEffect(() => {
//     setParticles(
//       Array.from({ length: 20 }).map((_, i) => ({
//         size: Math.random() * 4 + 1,
//         left: `${Math.random() * 100}%`,
//         top: `${Math.random() * 100}%`,
//         color: i % 2 === 0 ? "rgba(15, 191, 154, 0.4)" : "rgba(108, 99, 255, 0.4)",
//         duration: 5 + Math.random() * 5,
//         delay: Math.random() * 3,
//         xMove: Math.random() * 20 - 10,
//       }))
//     )
//   }, [])

//   if (!particles.length) return null

//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none">
//       {particles.map((p, i) => (
//         <motion.div
//           key={i}
//           className="absolute rounded-full"
//           style={{
//             width: p.size,
//             height: p.size,
//             left: p.left,
//             top: p.top,
//             backgroundColor: p.color,
//           }}
//           animate={{
//             y: [0, -30, 0],
//             x: [0, p.xMove, 0],
//             opacity: [0.2, 0.8, 0.2],
//             scale: [0.8, 1.2, 0.8],
//           }}
//           transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
//         />
//       ))}
//     </div>
//   )
// }

// /* -------------------- LOGO -------------------- */

// function AnimatedLogo({ name }: { name: string }) {
//   const [isHovered, setIsHovered] = useState(false)

//   return (
//     <motion.div
//       className="relative px-8 cursor-pointer"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       whileHover={{ scale: 1.1 }}
//     >
//       <motion.span
//         className="text-xl font-heading font-bold whitespace-nowrap"
//         animate={{ color: isHovered ? "#F7F9FC" : "#4B5563" }}
//         transition={{ duration: 0.2 }}
//       >
//         {name}
//       </motion.span>
//       <motion.div
//         className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald to-violet"
//         initial={{ scaleX: 0 }}
//         animate={{ scaleX: isHovered ? 1 : 0 }}
//         transition={{ duration: 0.3 }}
//       />
//     </motion.div>
//   )
// }

// /* -------------------- STATS SECTION -------------------- */

// export function Stats() {
//   const ref = useRef(null)
//   const isInView = useInView(ref, { once: true, margin: "-100px" })
//   const reversedLogos = [...logos].reverse()

//   return (
//     <section className="py-24 bg-charcoal relative overflow-hidden">
//       <MorphingBlobs />
//       <FloatingParticles />

//       <div className="relative mx-auto max-w-7xl px-6 lg:px-8" ref={ref}>
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
//           {stats.map((stat, index) => (
//             <StatCard key={stat.label} stat={stat} index={index} isInView={isInView} />
//           ))}
//         </div>

//         <div className="border-t border-white/10 pt-16">
//           <div className="relative overflow-hidden">
//             <motion.div className="flex items-center mb-6" animate={{ x: [0, -800] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
//               {[...logos, ...logos, ...logos].map((logo, index) => (
//                 <AnimatedLogo key={`row1-${index}`} name={logo} />
//               ))}
//             </motion.div>

//             <motion.div className="flex items-center" animate={{ x: [-800, 0] }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }}>
//               {[...reversedLogos, ...logos, ...logos].map((logo, index) => (
//                 <AnimatedLogo key={`row2-${index}`} name={logo} />
//               ))}
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }





"use client"

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion"
import { useRef, useEffect, useState } from "react"

/* -------------------- DATA -------------------- */

const stats = [
  { value: 3, suffix: " engines", label: "AI engines tracked daily — ChatGPT, Gemini & Perplexity", icon: "chart" },
  { value: 95, suffix: "%", label: "Of tracked prompts return brand visibility data within 24 hours", icon: "pages" },
  { value: 7, suffix: " days", label: "Free trial — no credit card, no auto-billing if you don't upgrade", icon: "eye" },
  { value: 98, suffix: "%", label: "Customer satisfaction rate", icon: "star" },
]

const logos = ["TechCorp", "MediaFlow", "DataSync", "CloudBase", "AIForward", "NexGen", "Quantum", "Elevate"]

/* -------------------- COUNTER -------------------- */

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) =>
    Number.isInteger(value) ? Math.floor(latest) : latest.toFixed(1)
  )
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    if (!inView) return

    const controls = animate(count, value, { duration: 2.5, ease: [0.22, 1, 0.36, 1] })
    const unsubscribe = rounded.on("change", (v) => setDisplayValue(String(v)))

    return () => {
      controls.stop()
      unsubscribe()
    }
  }, [inView, value, count, rounded])

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  )
}

/* -------------------- STAT CARD -------------------- */

function StatCard({
  stat,
  index,
  isInView,
}: {
  stat: (typeof stats)[0]
  index: number
  isInView: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative text-center group cursor-pointer"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6, type: "spring", stiffness: 100 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute -inset-4 bg-gradient-to-r from-emerald/20 to-violet/20 rounded-2xl blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
        animate={{
          borderColor: isHovered ? "rgba(15, 191, 154, 0.3)" : "rgba(255, 255, 255, 0.1)",
          y: isHovered ? -5 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="w-12 h-12 mx-auto mb-4 rounded-xl bg-emerald/10 flex items-center justify-center"
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? [0, -5, 5, 0] : 0,
          }}
          transition={{ duration: 0.4 }}
        >
          <StatIcon type={stat.icon} />
        </motion.div>

        <motion.p
          className="font-mono text-4xl sm:text-5xl font-bold bg-gradient-to-r from-emerald via-emerald-light to-emerald bg-[length:200%_auto] bg-clip-text text-transparent mb-2"
          animate={{ backgroundPosition: isHovered ? ["0%", "200%"] : "0%" }}
          transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
        >
          <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={isInView} />
        </motion.p>

        <motion.p
          className="text-sm text-gray-400 max-w-[180px] mx-auto leading-relaxed"
          animate={{ color: isHovered ? "#F7F9FC" : "#8A93A6" }}
          transition={{ duration: 0.3 }}
        >
          {stat.label}
        </motion.p>

        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald to-violet rounded-full"
          animate={{ width: isHovered ? "60%" : "0%" }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  )
}

/* -------------------- ICONS -------------------- */

function StatIcon({ type }: { type: string }) {
  const iconClass = "w-6 h-6 text-emerald"
  switch (type) {
    case "chart":
      return <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
    case "pages":
      return <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
    case "eye":
      return <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
    case "star":
      return <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
    default:
      return null
  }
}

/* -------------------- BLOBS -------------------- */

function MorphingBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald/5 blur-[120px]"
        animate={{
          borderRadius: [
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "30% 60% 70% 40% / 50% 60% 30% 60%",
            "60% 40% 30% 70% / 60% 30% 70% 40%",
          ],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}

/* -------------------- FLOATING PARTICLES -------------------- */

function FloatingParticles() {
  const [particles, setParticles] = useState<any[]>([])

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }).map((_, i) => ({
        size: Math.random() * 4 + 1,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        color: i % 2 === 0 ? "rgba(15, 191, 154, 0.4)" : "rgba(108, 99, 255, 0.4)",
        duration: 5 + Math.random() * 5,
        delay: Math.random() * 3,
        xMove: Math.random() * 20 - 10,
      }))
    )
  }, [])

  if (!particles.length) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            backgroundColor: p.color,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, p.xMove, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}
    </div>
  )
}

/* -------------------- LOGO -------------------- */

function AnimatedLogo({ name }: { name: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative px-8 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
    >
      <motion.span
        className="text-xl font-heading font-bold whitespace-nowrap"
        animate={{ color: isHovered ? "#F7F9FC" : "#4B5563" }}
        transition={{ duration: 0.2 }}
      >
        {name}
      </motion.span>
      <motion.div
        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald to-violet"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

/* -------------------- STATS SECTION -------------------- */

export function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const reversedLogos = [...logos].reverse()

  return (
    <section className="py-24 bg-charcoal relative overflow-hidden">
      <MorphingBlobs />
      <FloatingParticles />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8" ref={ref}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} isInView={isInView} />
          ))}
        </div>

        <div className="border-t border-white/10 pt-16">
          {/* <div className="relative overflow-hidden">
            <motion.div className="flex items-center mb-6" animate={{ x: [0, -800] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
              {[...logos, ...logos, ...logos].map((logo, index) => (
                <AnimatedLogo key={`row1-${index}`} name={logo} />
              ))}
            </motion.div>

            <motion.div className="flex items-center" animate={{ x: [-800, 0] }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }}>
              {[...reversedLogos, ...logos, ...logos].map((logo, index) => (
                <AnimatedLogo key={`row2-${index}`} name={logo} />
              ))}
            </motion.div>
          </div> */}
        </div>
      </div>
    </section>
  )
}