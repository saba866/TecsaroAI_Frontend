import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tecsaro AI Pricing — Start Free for 7 Days",
  description: "Simple, transparent pricing. Starter from ₹2,999/month. Pro from ₹7,999/month. free forever on all plans. No credit card required.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Tecsaro AI Pricing — Start Free for 7 Days",
    description: "Starter from ₹2,999/month · Pro from ₹7,999/month · free forever · No credit card required.",
    url: "https://ai.tecsaro.com/pricing",
    siteName: "Tecsaro AI",
    images: [{ url: "https://ai.tecsaro.com/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tecsaro AI Pricing — Start Free for 7 Days",
    description: "Starter from ₹2,999/month · Pro from ₹7,999/month · free forever · No credit card required.",
    images: ["https://ai.tecsaro.com/og-image.png"],
    site: "@tecsaroai",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}