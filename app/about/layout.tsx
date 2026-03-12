import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Tecsaro AI — The AEO Platform for Brand Visibility",
  description: "Tecsaro AI was built to help businesses track their brand in ChatGPT, Gemini & Perplexity. Learn our mission, values, and who we serve.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Tecsaro AI — The AEO Platform for Brand Visibility",
    description: "Learn how Tecsaro AI helps brands track visibility in AI-generated answers.",
    url: "https://ai.tecsaro.com/about",
    siteName: "Tecsaro AI",
    images: [{ url: "https://ai.tecsaro.com/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Tecsaro AI — The AEO Platform for Brand Visibility",
    description: "Learn how Tecsaro AI helps brands track visibility in AI-generated answers.",
    images: ["https://ai.tecsaro.com/og-image.png"],
    site: "@tecsaroai",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}