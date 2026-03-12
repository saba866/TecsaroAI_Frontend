import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Log In — Tecsaro AI",
  description: "Log in to your Tecsaro AI account to view your brand's visibility in ChatGPT, Gemini & Perplexity.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}