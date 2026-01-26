// "use client"

// import { motion } from "framer-motion"
// import { Header } from "@/components/marketing/header"
// import { Footer } from "@/components/marketing/footer"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"
// import { 
//   Rocket, 
//   ShoppingBag, 
//   Code, 
//   Building2,
//   BarChart3,
//   Globe,
//   ArrowRight,
//   Check,
//   Lightbulb,
//   Zap,
//   Target
// } from "lucide-react"

// const fadeInUp = {
//   initial: { opacity: 0, y: 20 },
//   animate: { opacity: 1, y: 0 },
//   transition: { duration: 0.5 }
// }

// const staggerContainer = {
//   animate: {
//     transition: {
//       staggerChildren: 0.1
//     }
//   }
// }

// const solutions = [
//   {
//     icon: Rocket,
//     title: "For Founders & Startups",
//     problem: "Low visibility, limited time, no SEO expertise, expensive tools.",
//     solutions: [
//       "Clear website health scores",
//       "Step-by-step optimization",
//       "AI-ready content suggestions",
//       "Easy publishing",
//       "Fast results without complexity"
//     ],
//     color: "emerald"
//   },
//   {
//     icon: ShoppingBag,
//     title: "For E-commerce Businesses",
//     problem: "Products not getting discovered, weak descriptions, technical issues.",
//     solutions: [
//       "Optimize product pages",
//       "Improve descriptions for AI & SEO",
//       "Publish updates safely",
//       "Fix technical SEO issues",
//       "Track visibility improvements"
//     ],
//     color: "violet"
//   },
//   {
//     icon: Code,
//     title: "For SaaS Companies",
//     problem: "Content not ranking, technical SEO debt, AI search invisibility.",
//     solutions: [
//       "Optimize blogs & landing pages",
//       "Improve AI answer visibility",
//       "Fix technical issues",
//       "Track growth clearly",
//       "Scale content faster"
//     ],
//     color: "emerald"
//   },
//   {
//     icon: Building2,
//     title: "For Agencies & Consultants",
//     problem: "Too many tools, manual work, low margins, slow delivery.",
//     solutions: [
//       "Manage multiple websites",
//       "Automate audits & publishing",
//       "Deliver better results faster",
//       "Generate client-ready reports",
//       "Increase margins"
//     ],
//     color: "violet"
//   },
//   {
//     icon: BarChart3,
//     title: "For Marketing Teams",
//     problem: "Scattered data, slow execution, unclear priorities.",
//     solutions: [
//       "Centralize SEO & AI visibility",
//       "Prioritize actions",
//       "Publish faster",
//       "Measure progress clearly",
//       "Collaborate with teams"
//     ],
//     color: "emerald"
//   },
//   {
//     icon: Globe,
//     title: "For Growing Businesses",
//     problem: "Losing visibility as search evolves to AI-driven discovery.",
//     solutions: [
//       "GEO & AEO optimization",
//       "AI-ready structure",
//       "Continuous improvements",
//       "Clear tracking"
//     ],
//     color: "violet"
//   }
// ]

// const whyItWorks = [
//   { icon: Zap, title: "Action over reports", description: "Focus on what matters, not endless data" },
//   { icon: Target, title: "Publishing, not just analysis", description: "Actually make changes, not just suggestions" },
//   { icon: Lightbulb, title: "AI search readiness", description: "Prepare for the future of search" },
//   { icon: Globe, title: "Website-first optimization", description: "Everything centers on your website" }
// ]

// export default function SolutionsPage() {
//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
      
//       <main>
//         {/* Hero Section */}
//         <section className="relative pt-32 pb-20 overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-b from-violet/5 to-transparent" />
//           <div className="absolute top-20 right-1/4 w-96 h-96 bg-emerald/10 rounded-full blur-3xl" />
//           <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-violet/10 rounded-full blur-3xl" />
          
//           <div className="container mx-auto px-4 relative z-10">
//             <motion.div 
//               className="max-w-4xl mx-auto text-center"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <span className="inline-flex items-center gap-2 px-4 py-2 bg-violet/10 text-violet rounded-full text-sm font-medium mb-6">
//                 <Lightbulb className="w-4 h-4" />
//                 Solutions
//               </span>
//               <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
//                 Solve your visibility problems{" "}
//                 <span className="text-gradient">once and for all</span>
//               </h1>
//               <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//                 Tecsaro AI helps businesses solve visibility problems across SEO, AI search, 
//                 content, and publishing — all from one platform.
//               </p>
//             </motion.div>
//           </div>
//         </section>

//         {/* Solutions Grid */}
//         <section className="py-20">
//           <div className="container mx-auto px-4">
//             <motion.div 
//               className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
//               variants={staggerContainer}
//               initial="initial"
//               whileInView="animate"
//               viewport={{ once: true }}
//             >
//               {solutions.map((solution, index) => (
//                 <motion.div
//                   key={index}
//                   variants={fadeInUp}
//                   className="bg-card border border-border rounded-2xl p-8 hover:border-emerald/50 hover:shadow-xl transition-all duration-300"
//                 >
//                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
//                     solution.color === 'emerald' ? 'bg-emerald/10' : 'bg-violet/10'
//                   }`}>
//                     <solution.icon className={`w-7 h-7 ${
//                       solution.color === 'emerald' ? 'text-emerald' : 'text-violet'
//                     }`} />
//                   </div>
                  
//                   <h3 className="text-2xl font-bold mb-3 text-foreground">{solution.title}</h3>
                  
//                   <div className="mb-6">
//                     <p className="text-sm font-medium text-amber mb-1">Problem:</p>
//                     <p className="text-muted-foreground">{solution.problem}</p>
//                   </div>
                  
//                   <div>
//                     <p className="text-sm font-medium text-emerald mb-3">Solution:</p>
//                     <ul className="space-y-2">
//                       {solution.solutions.map((item, i) => (
//                         <li key={i} className="flex items-center gap-2 text-foreground">
//                           <Check className={`w-4 h-4 flex-shrink-0 ${
//                             solution.color === 'emerald' ? 'text-emerald' : 'text-violet'
//                           }`} />
//                           {item}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>
//         </section>

//         {/* Why It Works Section */}
//         <section className="py-20 bg-card">
//           <div className="container mx-auto px-4">
//             <motion.div 
//               className="text-center mb-12"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//             >
//               <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Why Tecsaro AI Works</h2>
//               <p className="text-muted-foreground">Because it focuses on what actually matters</p>
//             </motion.div>
            
//             <motion.div 
//               className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
//               variants={staggerContainer}
//               initial="initial"
//               whileInView="animate"
//               viewport={{ once: true }}
//             >
//               {whyItWorks.map((item, index) => (
//                 <motion.div
//                   key={index}
//                   variants={fadeInUp}
//                   className="text-center"
//                 >
//                   <div className="w-12 h-12 bg-emerald/10 rounded-xl flex items-center justify-center mx-auto mb-4">
//                     <item.icon className="w-6 h-6 text-emerald" />
//                   </div>
//                   <h3 className="font-semibold mb-2 text-foreground">{item.title}</h3>
//                   <p className="text-sm text-muted-foreground">{item.description}</p>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="py-20 bg-gradient-to-b from-background to-emerald/5">
//           <div className="container mx-auto px-4">
//             <motion.div 
//               className="max-w-3xl mx-auto text-center"
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//             >
//               <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
//                 Ready to solve your visibility challenges?
//               </h2>
//               <p className="text-xl text-muted-foreground mb-8">
//                 Start your Test Drive and see the difference Tecsaro AI can make for your business.
//               </p>
//               <Button size="lg" className="bg-emerald hover:bg-emerald-dark text-white" asChild>
//                 <Link href="/signup">
//                   Start Your Test Drive
//                   <ArrowRight className="ml-2 w-4 h-4" />
//                 </Link>
//               </Button>
//             </motion.div>
//           </div>
//         </section>
//       </main>

//       <Footer />
//     </div>
//   )
// }





"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/marketing/header"
import { Footer } from "@/components/marketing/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Rocket,
  ShoppingBag,
  Code,
  Building2,
  BarChart3,
  Globe,
  ArrowRight,
  Check,
  Lightbulb,
  Zap,
  Target
} from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1 }
  }
}

const solutions = [
  {
    icon: Rocket,
    title: "For Founders & Startups",
    problem:
      "Low visibility, limited time, no SEO expertise, expensive tools.",
    solutions: [
      "Clear website health scores",
      "Step-by-step optimization",
      "AI-ready content suggestions",
      "Easy publishing",
      "Fast results without complexity"
    ],
    color: "emerald"
  },
  {
    icon: ShoppingBag,
    title: "For E-commerce Businesses",
    problem:
      "Products not getting discovered, weak descriptions, technical issues.",
    solutions: [
      "Optimize product pages",
      "Improve descriptions for AI & SEO",
      "Publish updates safely",
      "Fix technical SEO issues",
      "Track visibility improvements"
    ],
    color: "violet"
  },
  {
    icon: Code,
    title: "For SaaS Companies",
    problem:
      "Content not ranking, technical SEO debt, AI search invisibility.",
    solutions: [
      "Optimize blogs & landing pages",
      "Improve AI answer visibility",
      "Fix technical issues",
      "Track growth clearly",
      "Scale content faster"
    ],
    color: "emerald"
  },
  {
    icon: Building2,
    title: "For Agencies & Consultants",
    problem:
      "Too many tools, manual work, low margins, slow delivery.",
    solutions: [
      "Manage multiple websites",
      "Automate audits & publishing",
      "Deliver better results faster",
      "Generate client-ready reports",
      "Increase margins"
    ],
    color: "violet"
  },
  {
    icon: BarChart3,
    title: "For Marketing Teams",
    problem:
      "Scattered data, slow execution, unclear priorities.",
    solutions: [
      "Centralize SEO & AI visibility",
      "Prioritize actions",
      "Publish faster",
      "Measure progress clearly",
      "Collaborate with teams"
    ],
    color: "emerald"
  },
  {
    icon: Globe,
    title: "For Growing Businesses",
    problem:
      "Losing visibility as search evolves to AI-driven discovery.",
    solutions: [
      "GEO & AEO optimization",
      "AI-ready structure",
      "Continuous improvements",
      "Clear tracking"
    ],
    color: "violet"
  }
]

const whyItWorks = [
  {
    icon: Zap,
    title: "Action over reports",
    description: "Focus on doing, not reading dashboards"
  },
  {
    icon: Target,
    title: "Publishing, not just analysis",
    description: "Changes go live, not just recommendations"
  },
  {
    icon: Lightbulb,
    title: "AI search readiness",
    description: "Built for ChatGPT, Gemini & future AI engines"
  },
  {
    icon: Globe,
    title: "Website-first optimization",
    description: "Everything improves your actual website"
  }
]

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-violet/5 to-transparent" />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-violet/10 text-violet rounded-full text-sm font-medium mb-6">
                🧩 Solutions by Tecsaro AI
              </span>

              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Solve your visibility problems{" "}
                <span className="text-gradient">across SEO & AI search</span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Tecsaro AI helps businesses solve visibility problems across SEO,
                AI search, content, and publishing — all from one platform.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Solutions */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-card border border-border rounded-2xl p-8 hover:border-emerald/50 transition"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                    solution.color === "emerald" ? "bg-emerald/10" : "bg-violet/10"
                  }`}>
                    <solution.icon className={`w-7 h-7 ${
                      solution.color === "emerald" ? "text-emerald" : "text-violet"
                    }`} />
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-foreground">
                    {solution.title}
                  </h3>

                  <p className="text-muted-foreground mb-4">
                    <strong>Problem:</strong> {solution.problem}
                  </p>

                  <p className="text-emerald font-medium mb-3">Solution:</p>

                  <ul className="space-y-2">
                    {solution.solutions.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-foreground">
                        <Check className="w-4 h-4 text-emerald" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Why it works */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-3xl font-bold mb-12 text-foreground">
              Why Tecsaro AI Works
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {whyItWorks.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-emerald/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-emerald" />
                  </div>
                  <h3 className="font-semibold mb-2 text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Start your Test Drive
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            See how Tecsaro AI changes your visibility in AI-powered search.
          </p>

          <Button size="lg" className="bg-emerald hover:bg-emerald-dark text-white" asChild>
            <Link href="/signup">
              Start Your Test Drive
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  )
}
