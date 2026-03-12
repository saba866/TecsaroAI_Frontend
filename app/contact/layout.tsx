import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Tecsaro AI — Get Support or Send Feedback",
  description: "Get in touch with the Tecsaro AI team for support, feedback, or partnership enquiries.",
  alternates: { canonical: "/contact" },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}