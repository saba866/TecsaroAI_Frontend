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
//   X,
//   Users
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

// const audiences = [
//   {
//     icon: Rocket,
//     title: "Founders & Startups",
//     description: "If you're building a startup or new product",
//     problems: [
//       "You need fast visibility",
//       "You don't have time to learn complex SEO",
//       "You want clear actions, not reports",
//       "You want to compete with bigger companies"
//     ],
//     solution: "Tecsaro AI helps you optimize, publish, and grow from day one."
//   },
//   {
//     icon: ShoppingBag,
//     title: "E-commerce Businesses",
//     description: "If you run an online store",
//     problems: [
//       "Your products need to be discovered",
//       "AI search is changing how people buy",
//       "Content and product optimization matters",
//       "Technical issues hurt sales"
//     ],
//     solution: "Tecsaro AI helps you optimize products, publish faster, and improve discoverability."
//   },
//   {
//     icon: Code,
//     title: "SaaS Companies",
//     description: "If you're growing a SaaS",
//     problems: [
//       "Organic traffic matters",
//       "Content drives signups",
//       "Technical SEO is critical",
//       "AI search is becoming a major channel"
//     ],
//     solution: "Tecsaro AI helps you stay visible across Google and AI answers."
//   },
//   {
//     icon: Building2,
//     title: "Agencies & Consultants",
//     description: "If you manage websites for clients",
//     problems: [
//       "You need speed",
//       "You need automation",
//       "You need scalable tools",
//       "You need clear reports",
//       "You need better margins"
//     ],
//     solution: "Tecsaro AI helps you manage multiple sites and deliver better results with less effort."
//   },
//   {
//     icon: BarChart3,
//     title: "Marketing Teams",
//     description: "If you manage growth or marketing",
//     problems: [
//       "You need reliable data",
//       "You need execution tools",
//       "You need faster publishing",
//       "You need cross-team clarity"
//     ],
//     solution: "Tecsaro AI becomes your single optimization platform."
//   },
//   {
//     icon: Globe,
//     title: "Growing Businesses",
//     description: "If your website is important for leads, sales, or visibility",
//     problems: [
//       "Search landscape is changing",
//       "AI is reshaping discovery",
//       "Need to stay competitive",
//       "Limited resources for SEO"
//     ],
//     solution: "Tecsaro AI helps you stay competitive as search evolves."
//   }
// ]

// const notFor = [
//   "Hobby bloggers looking for free tools",
//   "One-page websites",
//   "Offline-only businesses",
//   "People expecting guaranteed rankings"
// ]

// export default function WhoItsForPage() {
//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
      
//       <main>
//         {/* Hero Section */}
//         <section className="relative pt-32 pb-20 overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-b from-emerald/5 to-transparent" />
//           <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald/10 rounded-full blur-3xl" />
//           <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet/10 rounded-full blur-3xl" />
          
//           <div className="container mx-auto px-4 relative z-10">
//             <motion.div 
//               className="max-w-4xl mx-auto text-center"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald/10 text-emerald rounded-full text-sm font-medium mb-6">
//                 <Users className="w-4 h-4" />
//                 Who It's For
//               </span>
//               <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
//                 Built for businesses that{" "}
//                 <span className="text-gradient">depend on visibility</span>
//               </h1>
//               <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//                 Tecsaro AI is built for anyone who wants their website to be visible, 
//                 discoverable, and competitive in the age of AI search — without needing to be an SEO expert.
//               </p>
//             </motion.div>
//           </div>
//         </section>

//         {/* Audience Cards */}
//         <section className="py-20">
//           <div className="container mx-auto px-4">
//             <motion.div 
//               className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
//               variants={staggerContainer}
//               initial="initial"
//               whileInView="animate"
//               viewport={{ once: true }}
//             >
//               {audiences.map((audience, index) => (
//                 <motion.div
//                   key={index}
//                   variants={fadeInUp}
//                   className="group bg-card border border-border rounded-2xl p-6 hover:border-emerald/50 hover:shadow-xl hover:shadow-emerald/5 transition-all duration-300"
//                 >
//                   <div className="w-12 h-12 bg-emerald/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald/20 transition-colors">
//                     <audience.icon className="w-6 h-6 text-emerald" />
//                   </div>
//                   <h3 className="text-xl font-bold mb-2 text-foreground">{audience.title}</h3>
//                   <p className="text-muted-foreground mb-4">{audience.description}</p>
                  
//                   <div className="border-t border-border pt-4 mb-4">
//                     <p className="text-sm font-medium text-foreground mb-2">Your challenges:</p>
//                     <ul className="space-y-1.5">
//                       {audience.problems.map((problem, i) => (
//                         <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
//                           <span className="w-1 h-1 bg-amber rounded-full mt-2 flex-shrink-0" />
//                           {problem}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
                  
//                   <div className="bg-emerald/5 rounded-lg p-3">
//                     <p className="text-sm text-emerald font-medium">{audience.solution}</p>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>
//         </section>

//         {/* Not For Section */}
//         <section className="py-16 bg-card">
//           <div className="container mx-auto px-4">
//             <motion.div 
//               className="max-w-2xl mx-auto text-center"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//             >
//               <h2 className="text-2xl font-bold mb-6 text-foreground">Who it's NOT for</h2>
//               <div className="flex flex-wrap justify-center gap-3">
//                 {notFor.map((item, index) => (
//                   <span 
//                     key={index}
//                     className="inline-flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-full text-sm text-muted-foreground"
//                   >
//                     <X className="w-4 h-4 text-destructive" />
//                     {item}
//                   </span>
//                 ))}
//               </div>
//             </motion.div>
//           </div>
//         </section>

//         {/* One-liner Section */}
//         <section className="py-20 bg-charcoal text-white">
//           <div className="container mx-auto px-4">
//             <motion.div 
//               className="max-w-3xl mx-auto text-center"
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//             >
//               <h2 className="text-3xl md:text-4xl font-bold mb-6">One-line summary</h2>
//               <p className="text-xl text-white/80 mb-8">
//                 Tecsaro AI is for businesses that depend on website visibility to grow 
//                 and want to be discoverable in AI-powered search.
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
  Users,
  BarChart3,
  Globe,
  XCircle,
  ArrowRight,
} from "lucide-react"

const audiences = [
  {
    icon: Rocket,
    title: "Founders & Startups",
    points: [
      "Need fast visibility",
      "No time for complex SEO",
      "Want actions, not reports",
      "Compete with bigger companies",
    ],
    description:
      "Tecsaro AI helps you optimize, publish, and grow from day one — without SEO complexity.",
  },
  {
    icon: ShoppingBag,
    title: "E-commerce Businesses",
    points: [
      "Products need discovery",
      "AI search affects buying",
      "Optimization impacts sales",
      "Technical issues hurt revenue",
    ],
    description:
      "Optimize products, publish faster, and improve discoverability across search and AI answers.",
  },
  {
    icon: Code,
    title: "SaaS Companies",
    points: [
      "Organic traffic matters",
      "Content drives signups",
      "Technical SEO is critical",
      "AI search is a new channel",
    ],
    description:
      "Stay visible across Google and AI answers with continuous optimization.",
  },
  {
    icon: Users,
    title: "Agencies & Consultants",
    points: [
      "Need speed & automation",
      "Manage multiple clients",
      "Scale without extra effort",
      "Deliver better reports",
    ],
    description:
      "Manage multiple websites, automate fixes, and improve margins with Tecsaro AI.",
  },
  {
    icon: BarChart3,
    title: "Marketing Teams",
    points: [
      "Need reliable data",
      "Need execution tools",
      "Need faster publishing",
      "Need cross-team clarity",
    ],
    description:
      "Use one platform for analysis, optimization, publishing, and reporting.",
  },
  {
    icon: Globe,
    title: "Growing Businesses",
    points: [
      "Website drives leads",
      "Visibility drives revenue",
      "Search is evolving fast",
      "AI answers matter",
    ],
    description:
      "Stay competitive as search evolves with AI-powered optimization.",
  },
]

export default function WhoItsForPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-charcoal to-background">
      <Header />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-2 bg-emerald/10 text-emerald rounded-full text-sm font-medium mb-6">
              Who It’s For
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Built for businesses that want to{" "}
              <span className="text-emerald">win in AI search</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Tecsaro AI is built for anyone who wants their website to be visible,
              discoverable, and competitive — without needing to be an SEO expert.
            </p>
          </motion.div>

          {/* Audience Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {audiences.map((audience, index) => (
              <motion.div
                key={audience.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-charcoal-light border border-white/10 rounded-2xl p-6 hover:border-emerald/40 transition-all"
              >
                <div className="w-12 h-12 bg-emerald/10 rounded-xl flex items-center justify-center mb-4">
                  <audience.icon className="h-6 w-6 text-emerald" />
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">
                  {audience.title}
                </h3>

                <ul className="space-y-2 text-gray-400 text-sm mb-4">
                  {audience.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 bg-emerald rounded-full" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-gray-300 text-sm">
                  {audience.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Not For Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-charcoal-light border border-white/10 rounded-2xl p-8 mb-24"
          >
            <div className="flex items-center gap-3 mb-6">
              <XCircle className="h-6 w-6 text-red-400" />
              <h2 className="text-2xl font-semibold text-white">
                Who Tecsaro AI is NOT for
              </h2>
            </div>

            <ul className="grid md:grid-cols-2 gap-4 text-gray-400">
              <li>• Hobby bloggers looking for free tools</li>
              <li>• One-page websites</li>
              <li>• Offline-only businesses</li>
              <li>• People expecting guaranteed rankings</li>
            </ul>
          </motion.div>

          {/* Summary + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              <span className="text-white font-semibold">One-line summary:</span>{" "}
              Tecsaro AI is for businesses that depend on website visibility to grow
              and want to be discoverable in AI-powered search.
            </p>

            <Button
              size="lg"
              className="bg-emerald hover:bg-emerald-dark text-charcoal font-semibold"
              asChild
            >
              <Link href="/signup">
                Start your Test Drive
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
