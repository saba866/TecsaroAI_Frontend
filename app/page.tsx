

import { Header }       from "@/components/marketing/header"
import { Hero }         from "@/components/marketing/hero"
import { Features }     from "@/components/marketing/features"
import { AboutSection } from "@/components/marketing/about-section"
import { Stats }        from "@/components/marketing/stats"
import { CTA }          from "@/components/marketing/cta"
import { Footer }       from "@/components/marketing/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <AboutSection />
      <Hero />
      <Features />
      {/* <AboutSection />   ← Visible "What is Tecsaro AI" — required for Google OAuth verification */}
      <Stats />
      <CTA />
      <Footer />
    </main>
  )
}