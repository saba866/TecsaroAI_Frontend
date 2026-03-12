import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tecsaro AI FAQ — Everything About AEO & Brand Visibility in AI",
  description: "Got questions? Learn what AEO is, how Tecsaro AI tracks ChatGPT and Gemini, how the visibility score works, and how to improve your brand in AI answers.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Tecsaro AI FAQ — Everything About AEO & Brand Visibility in AI",
    description: "What is AEO? How does Tecsaro track ChatGPT and Gemini? How is the AEO score calculated? All answered.",
    url: "https://ai.tecsaro.com/faq",
    siteName: "Tecsaro AI",
    images: [{ url: "https://ai.tecsaro.com/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tecsaro AI FAQ — Everything About AEO & Brand Visibility",
    description: "What is AEO? How is the AEO score calculated? All answered.",
    images: ["https://ai.tecsaro.com/og-image.png"],
    site: "@tecsaroai",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}