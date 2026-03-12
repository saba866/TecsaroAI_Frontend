import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tecsaro AI Features — AEO Tracking, Competitor Detection & Daily Monitoring",
  description: "Track brand mentions in ChatGPT, Gemini & Perplexity. Detect competitors in AI answers. Get your AEO score and actionable recommendations — updated daily.",
  alternates: { canonical: "/features" },
  openGraph: {
    title: "Tecsaro AI Features — AEO Tracking, Competitor Detection & Daily Monitoring",
    description: "Daily AI visibility tracking, competitor detection, AEO score, and actionable recommendations.",
    url: "https://ai.tecsaro.com/features",
    siteName: "Tecsaro AI",
    images: [{ url: "https://ai.tecsaro.com/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tecsaro AI Features — AEO Tracking & Competitor Detection",
    description: "Daily AI visibility tracking, competitor detection, AEO score, and actionable recommendations.",
    images: ["https://ai.tecsaro.com/og-image.png"],
    site: "@tecsaroai",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}