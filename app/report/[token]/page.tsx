// app/report/[token]/page.tsx
// Public page — no auth required
// Shows full AEO report for the token

import type { Metadata } from "next"
import { PublicReportClient } from "./PublicReportClient"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export async function generateMetadata({ params }: { params: { token: string } }): Promise<Metadata> {
  return {
    title:  "AEO Visibility Report — Tecsaro AI",
    description: "Brand visibility in ChatGPT, Gemini & Perplexity — powered by Tecsaro AI",
    robots: { index: false, follow: false },
  }
}

export default function PublicReportPage({ params }: { params: { token: string } }) {
  return <PublicReportClient token={params.token} />
}