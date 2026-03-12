




// import type { Metadata, Viewport } from "next"
// import { Space_Grotesk, Inter, DM_Sans } from "next/font/google"
// import { Providers } from "./providers"
// import "./globals.css"

// const spaceGrotesk = Space_Grotesk({
//   subsets: ["latin"],
//   variable: "--font-heading",
// })

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-body",
// })

// const dmSans = DM_Sans({
//   subsets: ["latin"],
//   variable: "--font-mono",
// })

// export const metadata: Metadata = {
//   title: "Tecsaro AI - AI-Powered Website Optimization Platform",
//   description:
//     "Most tools track visibility. Tecsaro AI fixes, optimizes, and publishes for AI search. SEO + GEO + AEO + Publishing + Automation in one platform.",
//   keywords: [
//     "SEO",
//     "GEO",
//     "AEO",
//     "AI Search",
//     "Content Optimization",
//     "Website Optimization",
//   ],
//   icons: {
//     icon: [
//       { url: "/favicon.ico" },
//       { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
//       { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
//     ],
//     apple: "/apple-touch-icon.png",
//   },
// }

// export const viewport: Viewport = {
//   themeColor: "#0B0F14",
//   width: "device-width",
//   initialScale: 1,
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body
//         className={`${spaceGrotesk.variable} ${inter.variable} ${dmSans.variable} font-sans antialiased`}
//       >
//         <Providers>{children}</Providers>
//       </body>
//     </html>
//   )
// }




import type { Metadata, Viewport } from "next"
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
  // ── Title ──────────────────────────────────────────────────────────────
  title: {
    default:  "Tecsaro AI — Track and Optimize Your Brand's Visibility in AI Answers",
    template: "%s | Tecsaro AI",
  },

  // ── Description ────────────────────────────────────────────────────────
  description:
    "Tecsaro AI is an Answer Engine Optimization (AEO) platform that tracks your brand visibility across ChatGPT, Gemini, and Perplexity. Monitor AI mentions, analyze competitor presence, and get actionable recommendations to improve your AI search rankings.",

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

  // ── Open Graph (Facebook, LinkedIn, WhatsApp) ──────────────────────────
  openGraph: {
    type:        "website",
    url:         "https://ai.tecsaro.com",
    siteName:    "Tecsaro AI",
    title:       "Tecsaro AI — Track and Optimize Your Brand's Visibility in AI Answers",
    description:
      "Monitor your brand across ChatGPT, Gemini, and Perplexity daily. Detect competitors in AI answers. Get clear recommendations to improve your AEO visibility score. Free 7-day trial, no credit card required.",
    locale: "en_US",
    images: [
      {
        url:    "/og-image.png", // 1200×630 PNG in /public/og-image.png
        width:  1200,
        height: 630,
        alt:    "Tecsaro AI — AI Visibility Tracking Platform",
      },
    ],
  },

  // ── Twitter / X card ───────────────────────────────────────────────────
  twitter: {
    card:        "summary_large_image",
    site:        "@tecsaroai",
    creator:     "@tecsaroai",
    title:       "Tecsaro AI — Track and Optimize Your Brand's Visibility in AI Answers",
    description:
      "Monitor your brand across ChatGPT, Gemini, and Perplexity. Detect competitors. Improve your AI visibility score. Built for SaaS founders.",
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
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}