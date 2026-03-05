"use client"

import Link from "next/link"
import Image from "next/image"
import { Twitter, Linkedin, Facebook, Youtube, Instagram } from "lucide-react"
import { motion, useInView, type Variants } from "framer-motion"

import { useRef } from "react"

const footerLinks = {
  product: [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Who It's For", href: "/who-its-for" },
  ],

  company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Security", href: "/security" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Refund Policy", href: "/refund" },
  ],
}

const socialLinks = [
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "Youtube", href: "#", icon: Youtube },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <footer className="bg-charcoal border-t border-white/10 relative overflow-hidden">
      {/* Subtle animated background */}
      <motion.div 
        className="absolute top-0 left-1/4 w-96 h-96 bg-emerald/5 rounded-full blur-[100px]"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-16" ref={ref}>
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Brand column */}
          <motion.div 
            className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0"
            variants={itemVariants}
          >
            <Link href="/" className="flex items-center gap-2 mb-4 group">
            <motion.div
  whileHover={{ scale: 1.05 }}
  transition={{ type: "spring", stiffness: 300 }}
  className="flex items-center"
>
  <Image
    src="/logoicon.png"
    alt="Tecsaro AI"
    width={40}
    height={40}
    className="object-contain"
    priority
  />
</motion.div>

              <span className="font-heading text-xl font-bold text-white group-hover:text-emerald transition-colors">
                Tecsaro AI
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-6 max-w-xs">
              AI-powered website optimization and publishing platform for the future of search.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-gray-500 hover:text-white transition-colors"
                  aria-label={item.name}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Product */}
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <Link 
                    href={link.href} 
                    className="text-sm text-gray-400 hover:text-white transition-colors relative group"
                  >
                    <span>{link.name}</span>
                    <motion.span 
                      className="absolute -bottom-0.5 left-0 h-px bg-emerald"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
         
          
          {/* Company */}
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.05 }}
                >
                  <Link 
                    href={link.href} 
                    className="text-sm text-gray-400 hover:text-white transition-colors relative group"
                  >
                    <span>{link.name}</span>
                    <motion.span 
                      className="absolute -bottom-0.5 left-0 h-px bg-emerald"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Legal */}
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.05 }}
                >
                  <Link 
                    href={link.href} 
                    className="text-sm text-gray-400 hover:text-white transition-colors relative group"
                  >
                    <span>{link.name}</span>
                    <motion.span 
                      className="absolute -bottom-0.5 left-0 h-px bg-emerald"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
        
        {/* Bottom bar */}
        <motion.div 
          className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Tecsaro AI. All rights reserved.
          </p>
          <motion.p 
            className="text-sm text-gray-600"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
           Tecsaro AI is an AI-powered SaaS platform currently in MVP stage.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  )
}
