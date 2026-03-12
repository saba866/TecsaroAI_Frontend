
import Script from "next/script"

import type { Metadata, Viewport } from "next"
import { GoogleAnalytics } from "@/components/GoogleAnalytics"
import { Space_Grotesk, Inter, DM_Sans } from "next/font/google"
import { Providers } from "./providers"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  

  // ── Title (Google SEO — concise, keyword-rich) ─────────────────────────
  title: {
    default:  "Tecsaro AI — Track Your Brand in ChatGPT & Gemini",
    template: "%s | Tecsaro AI",
  },

  // ── Description (Google SEO — short, action-driven, under 160 chars) ───
  description:
    "See how ChatGPT, Gemini & Perplexity mention your brand. Track competitors, get an AEO score, and fix your AI visibility. Start free for 7 days.",

  // ── Keywords ───────────────────────────────────────────────────────────
  keywords: [
    // Core
    "AEO platform",
    "Answer Engine Optimization",
    "AI visibility tracking",
    "brand visibility in AI answers",
    "AI search optimization",
    // Engine-specific
    "track brand in ChatGPT",
    "monitor brand in Gemini",
    "Perplexity brand tracking",
    "ChatGPT brand monitoring",
    "Gemini brand tracking",
    // Long-tail
    "how to appear in AI search results",
    "optimize content for AI answers",
    "competitor tracking in AI engines",
    "AI answer tracking software",
    "AI brand monitoring platform",
    // Category
    "AEO vs SEO",
    "generative engine optimization",
    "GEO",
    "LLM visibility tool",
    "AI citation tracking",
    // Audience
    "AEO tool for SaaS",
    "AI visibility for SaaS founders",
    "marketing tool for AI search",
    // Feature
    "AI visibility score",
    "daily AI brand monitoring",
    "AI answer gap analysis",
    "prompt tracking tool",
  ],

  // ── Brand ──────────────────────────────────────────────────────────────
  applicationName: "Tecsaro AI",
  authors:         [{ name: "Tecsaro AI", url: "https://ai.tecsaro.com" }],
  creator:         "Tecsaro AI",
  publisher:       "Tecsaro AI",
  category:        "Technology",

  // ── Canonical ──────────────────────────────────────────────────────────
  metadataBase: new URL("https://ai.tecsaro.com"),
  alternates:   { canonical: "/" },

  // ── Open Graph (LinkedIn, WhatsApp, Facebook — humans see this) ────────
  // Different from SEO title/desc — more compelling, action-oriented
  openGraph: {
    type:     "website",
    url:      "https://ai.tecsaro.com",
    siteName: "Tecsaro AI",
    locale:   "en_US",
    title:       "Tecsaro AI — Track Your Brand Visibility in AI Search",
    description:
      "Monitor ChatGPT, Gemini & Perplexity daily. See who AI recommends, track competitors, and improve your AEO score. Start free for 7 days",
    images: [
      {
        url:    "/og-image.png",
        width:  1200,
        height: 630,
        alt:    "Tecsaro AI — AI Visibility Tracking Platform",
      },
    ],
  },

  // ── Twitter / X Card (humans see this on Twitter) ──────────────────────
  // Different from SEO — punchy, audience-specific
  twitter: {
    card:        "summary_large_image",
    site:        "@tecsaroai",
    creator:     "@tecsaroai",
    title:       "Tecsaro AI — Track Your Brand Visibility in AI Search",
    description:
      "Monitor ChatGPT, Gemini & Perplexity daily. See who AI recommends, track competitors, and improve your AEO score. Start free for 7 days",
    images: ["/og-image.png"],
  },

  // ── Icons ──────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },

  // ── Robots ─────────────────────────────────────────────────────────────
  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:               true,
      follow:              true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet":       -1,
    },
  },

  // ── Verification ───────────────────────────────────────────────────────
  // Domain property verified via DNS in Google Search Console — no HTML tag needed
}

export const viewport: Viewport = {
  themeColor:   "#0B0F14",
  width:        "device-width",
  initialScale: 1,
}



 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${dmSans.variable} font-sans antialiased`}
      >
        <GoogleAnalytics />  
        <Providers>{children}</Providers>

        <Script
  defer
  data-domain="ai.tecsaro.com"
  src="https://plausible.io/js/script.js"
  strategy="afterInteractive"
/>
  <Script id="schema-organization" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tecsaro AI",
    url: "https://ai.tecsaro.com",
    logo: "https://ai.tecsaro.com/logoicon.png",
    description: "Tecsaro AI is an Answer Engine Optimization (AEO) platform that tracks brand visibility across ChatGPT, Gemini, and Perplexity.",
    foundingDate: "2025",
    sameAs: ["https://x.com/tecsaroai","https://www.linkedin.com/company/tecsaroai","https://www.instagram.com/tecsaroai","https://www.facebook.com/tecsaroai","https://www.youtube.com/@tecsaroai"],
    contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: "support@tecsaro.com", url: "https://ai.tecsaro.com/contact" },
  })}} />
 
  <Script id="schema-website" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tecsaro AI",
    url: "https://ai.tecsaro.com",
    description: "AEO platform for tracking brand visibility in ChatGPT, Gemini, and Perplexity.",
  })}} />

      </body>
    </html>
  )
}