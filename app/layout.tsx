// import React from "react"
// import type { Metadata, Viewport } from 'next'
// import { Space_Grotesk, Inter, DM_Sans } from 'next/font/google'
// import { Analytics } from '@vercel/analytics/next'
// import './globals.css'

// const spaceGrotesk = Space_Grotesk({ 
//   subsets: ["latin"],
//   variable: '--font-heading'
// })

// const inter = Inter({ 
//   subsets: ["latin"],
//   variable: '--font-body'
// })

// const dmSans = DM_Sans({ 
//   subsets: ["latin"],
//   variable: '--font-mono'
// })
// export const metadata: Metadata = {
//   title: 'Tecsaro AI - AI-Powered Website Optimization Platform',
//   description:
//     'Most tools track visibility. Tecsaro AI fixes, optimizes, and publishes for AI search. SEO + GEO + AEO + Publishing + Automation in one platform.',
//   keywords: ['SEO', 'GEO', 'AEO', 'AI Search', 'Content Optimization', 'Website Optimization'],
//   icons: {
//     icon: [
//       { url: '/favicon.ico' },
//       { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
//       { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
//     ],
//     apple: '/apple-touch-icon.png',
//   },
// }



// export const viewport: Viewport = {
//   themeColor: '#0B0F14',
//   width: 'device-width',
//   initialScale: 1,
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="en">
//       <body className={`${spaceGrotesk.variable} ${inter.variable} ${dmSans.variable} font-sans antialiased`}>
//         {children}
//         <Analytics />
//       </body>
//     </html>
//   )
// }






// import React from "react"
// import type { Metadata, Viewport } from "next"
// import { Space_Grotesk, Inter, DM_Sans } from "next/font/google"
// import { Analytics } from "@vercel/analytics/next"
// import { GoogleOAuthProvider } from "@react-oauth/google"
// import "./globals.css"

// const spaceGrotesk = Space_Grotesk({
//   subsets: ["latin"],
//   variable: "--font-heading",
// })

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-body",
// })

// const dmSans = DM_Sans({
//   subsets: ["latin"],
//   variable: "--font-mono",
// })

// export const metadata: Metadata = {
//   title: "Tecsaro AI - AI-Powered Website Optimization Platform",
//   description:
//     "Most tools track visibility. Tecsaro AI fixes, optimizes, and publishes for AI search. SEO + GEO + AEO + Publishing + Automation in one platform.",
//   keywords: [
//     "SEO",
//     "GEO",
//     "AEO",
//     "AI Search",
//     "Content Optimization",
//     "Website Optimization",
//   ],
//   icons: {
//     icon: [
//       { url: "/favicon.ico" },
//       { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
//       { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
//     ],
//     apple: "/apple-touch-icon.png",
//   },
// }

// export const viewport: Viewport = {
//   themeColor: "#0B0F14",
//   width: "device-width",
//   initialScale: 1,
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body
//         className={`${spaceGrotesk.variable} ${inter.variable} ${dmSans.variable} font-sans antialiased`}
//       >
//         <GoogleOAuthProvider
//           clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
//         >
//           {children}
//         </GoogleOAuthProvider>

//         <Analytics />
//       </body>
//     </html>
//   )
// }




import type { Metadata, Viewport } from "next"
import { Space_Grotesk, Inter, DM_Sans } from "next/font/google"
import { Providers } from "./providers"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Tecsaro AI - AI-Powered Website Optimization Platform",
  description:
    "Most tools track visibility. Tecsaro AI fixes, optimizes, and publishes for AI search. SEO + GEO + AEO + Publishing + Automation in one platform.",
  keywords: [
    "SEO",
    "GEO",
    "AEO",
    "AI Search",
    "Content Optimization",
    "Website Optimization",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#0B0F14",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${dmSans.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
