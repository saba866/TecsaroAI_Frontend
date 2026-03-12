
import Script from "next/script"
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
      <Script id="schema-homepage" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Tecsaro AI",
  url: "https://ai.tecsaro.com",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "AEO platform that tracks brand visibility in ChatGPT, Gemini, and Perplexity. Monitor AI mentions, detect competitors, and improve your AEO score.",
  offers: [
    { "@type": "Offer", name: "Starter Plan", price: "2999", priceCurrency: "INR", description: "1 brand, 20 prompts, 5 competitors, ChatGPT & Gemini", url: "https://ai.tecsaro.com/pricing" },
    { "@type": "Offer", name: "Pro Plan",     price: "7999", priceCurrency: "INR", description: "3 brands, 50 prompts, 15 competitors, ChatGPT, Gemini & Perplexity", url: "https://ai.tecsaro.com/pricing" },
  ],
  featureList: [
    "Brand visibility tracking in ChatGPT",
    "Brand visibility tracking in Gemini",
    "Brand visibility tracking in Perplexity",
    "Competitor detection in AI answers",
    "AEO Visibility Score",
    "Daily AI answer monitoring",
    "Actionable AEO recommendations",
    "Schema markup generation",
  ],
})}} />
 
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