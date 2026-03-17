// app/report/[token]/page.tsx

import type { Metadata } from "next"
import { PublicReportClient } from "./PublicReportClient"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title:       "AEO Visibility Report — Tecsaro AI",
    description: "Brand visibility in ChatGPT, Gemini & Perplexity — powered by Tecsaro AI",
    robots:      { index: false, follow: false },
  }
}

// Next.js 15 — params is a Promise, must be awaited
export default async function PublicReportPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  return <PublicReportClient token={token} />
}