import type React from "react"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "react"
import CursorFollower from "@/components/cursor-follower"

export const metadata = {
  title: "SCULPT - Chiseling Visions into Apps",
  description: "SCULPT development and design studio: We craft digital experiences that blend form and function into seamless, captivating products.",
  keywords: "app development, web development, AI development, logo design, branding, digital studio, SCULPT",
  authors: [{ name: "SCULPT" }],
  creator: "SCULPT",
  publisher: "SCULPT",
  
  // Open Graph meta tags for social media sharing
  openGraph: {
    title: "SCULPT - Chiseling Visions into Apps",
    description: "We craft digital experiences that blend form and function into seamless, captivating products.",
    url: "https://www.sculpt.work", // Replace with your actual domain
    siteName: "SCULPT",
    images: [
      {
        url: "/s_banner.png", // This should be your preview image (1200x630px recommended)
        width: 1200,
        height: 630,
        alt: "SCULPT - Development and Design Studio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  
  // Additional meta tags
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Favicon
  icons: {
    icon: "/s_logo.png",
    shortcut: "/s_logo.png",
    apple: "/s_logo.png",
  },
  
  // Manifest for PWA (optional)
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Additional meta tags that might be needed */}
        <meta name="theme-color" content="#101010" />
        <meta name="msapplication-TileColor" content="#101010" />
        <link rel="canonical" href="https://your-website-domain.com" />
      </head>
      <body className="bg-[#101010] text-[#EAEFFF] font-helvetica antialiased">
        <Suspense>
          {children}
          <CursorFollower />
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}