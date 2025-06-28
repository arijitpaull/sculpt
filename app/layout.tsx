import type React from "react"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "react"
import CursorFollower from "@/components/cursor-follower"

export const metadata = {
  title: "SCULPT",
  description: "SCULPT development and design studio: Chiseling Visions into Apps",
  keywords: "app development, web development, AI development, logo design, branding, digital studio, SCULPT",
  authors: [{ name: "SCULPT" }],
  creator: "SCULPT",
  publisher: "SCULPT",
  
  // Open Graph meta tags for social media sharing
  openGraph: {
    title: "SCULPT",
    description: "Chiseling Visions into Apps",
    url: "https://www.sculpt.work", // Replace with your actual domain
    siteName: "SCULPT",
    images: [
      {
        url: "/images/s_banner.png", // This should be your preview image (1200x630px recommended)
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
    icon: "/images/s_logo.png",
    shortcut: "/images/s_logo.png",
    apple: "/images/s_logo.png",
  },
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