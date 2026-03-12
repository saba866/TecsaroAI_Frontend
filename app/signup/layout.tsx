import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign Up Free — Tecsaro AI | 7-Day Free Trial",
  description: "Create your free Tecsaro AI account. Track your brand in ChatGPT & Gemini. 7-day free trial. No credit card required.",
  alternates: { canonical: "/signup" },
  openGraph: {
    title: "Sign Up Free — Tecsaro AI | 7-Day Free Trial",
    description: "Create your free account. Track your brand in ChatGPT & Gemini. 7-day free trial. No credit card required.",
    url: "https://ai.tecsaro.com/signup",
    siteName: "Tecsaro AI",
    images: [{ url: "https://ai.tecsaro.com/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign Up Free — Tecsaro AI | 7-Day Free Trial",
    description: "Track your brand in ChatGPT & Gemini. 7-day free trial. No credit card required.",
    images: ["https://ai.tecsaro.com/og-image.png"],
    site: "@tecsaroai",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}