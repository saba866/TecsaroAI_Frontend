



"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navigation = [
  { name: "Product",   href: "/product"   },
  { name: "Features",  href: "/features"  },
  { name: "Pricing",   href: "/pricing"   },
  { name: "About",     href: "/about"     },
  { name: "Solutions", href: "/solutions" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled,       setScrolled]       = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Before scroll → white bg, dark text
  // After scroll  → charcoal bg, light text
  const isScrolled = scrolled

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-charcoal/95 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0,    opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Global">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <motion.div
            className="flex lg:flex-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src="/logoicon.png"
                  alt="Tecsaro AI"
                  width={50}
                  height={40}
                  className="object-contain"
                  priority
                />
              </motion.div>
              <span className={`font-heading text-xl font-bold transition-colors ${
                isScrolled
                  ? "text-white group-hover:text-emerald"
                  : "text-charcoal group-hover:text-emerald"
              }`}>
                Tecsaro AI
              </span>
            </Link>
          </motion.div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <motion.button
              type="button"
              className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 ${
                isScrolled ? "text-gray-400" : "text-gray-600"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">Open main menu</span>
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate: 90,   opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X    className="h-6 w-6" aria-hidden="true" />
                  </motion.div>
                ) : (
                  <motion.div key="menu"
                    initial={{ rotate: 90,  opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate: -90,  opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
              >
                <Link
                  href={item.href}
                  className={`relative text-sm font-medium transition-colors group ${
                    isScrolled
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-charcoal"
                  }`}
                >
                  {item.name}
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald rounded-full origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA buttons */}
          <motion.div
            className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link href="/login">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="ghost"
                  className={isScrolled
                    ? "text-gray-300 hover:text-white hover:bg-white/10"
                    : "text-gray-600 hover:text-charcoal hover:bg-gray-100"
                  }
                >
                  Log in
                </Button>
              </motion.div>
            </Link>
            <Link href="/signup">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="bg-emerald hover:bg-emerald-dark text-charcoal font-semibold relative overflow-hidden group">
                  <motion.span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Get Started Free</span>
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className={`lg:hidden py-4 border-t ${
                isScrolled ? "border-white/10" : "border-gray-200"
              }`}
              initial={{ opacity: 0, height: 0      }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{   opacity: 0, height: 0      }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.div
                className="space-y-2"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
              >
                {navigation.map((item) => (
                  <motion.div
                    key={item.name}
                    variants={{
                      hidden:  { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0   },
                    }}
                  >
                    <Link
                      href={item.href}
                      className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                        isScrolled
                          ? "text-gray-300 hover:text-white hover:bg-white/5"
                          : "text-gray-600 hover:text-charcoal hover:bg-gray-100"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile CTA */}
                <motion.div
                  className="pt-4 flex flex-col gap-2 px-3"
                  variants={{
                    hidden:  { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0  },
                  }}
                >
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      variant="outline"
                      className={`w-full bg-transparent ${
                        isScrolled
                          ? "border-white/20 text-white hover:bg-white/10"
                          : "border-gray-300 text-charcoal hover:bg-gray-100"
                      }`}
                    >
                      Log in
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-emerald hover:bg-emerald-dark text-charcoal font-semibold">
                      Get Started Free
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}