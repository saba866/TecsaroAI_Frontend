"use client"

import { GoogleOAuthProvider } from "@react-oauth/google"
import { Analytics } from "@vercel/analytics/next"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      {children}
      <Analytics />
    </GoogleOAuthProvider>
  )
}
