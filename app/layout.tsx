import type React from "react"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "react"
import CursorFollower from "@/components/cursor-follower"

export const metadata = {
  title: "SCULPT",
  description:
    "SCULPT is a software freelancing agency building powerful websites, apps, and AI tools.",
  keywords:
    "app development freelancing agency, hire app developer, freelancer, Fiverr app freelancer, Upwork, app development, web development, AI tools for business,, AI, Chatbots, SCULPT, Arijit Paul",
  authors: [{ name: "Arijit Paul" }],
  creator: "Arijit Paul",
  publisher: "Arijit Paul",
  category: "Technology",
  applicationName: "SCULPT",
  generator: "Next.js",
  themeColor: "#101010",

  openGraph: {
    title: "SCULPT",
    description: "Chiseling Visions into Apps",
    url: "https://www.sculpt.work",
    siteName: "SCULPT",
    images: [
      {
        url: "/images/s_banner.png",
        width: 1200,
        height: 630,
        alt: "SCULPT - Development and Design Studio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    site: "@sculptvisions",
    title: "SCULPT",
    description: "Software & AI Freelancing Agency",
    images: ["/images/s_banner.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

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
        {/* Canonical Link */}
        <link rel="canonical" href="https://www.sculpt.work" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "SCULPT",
              url: "https://www.sculpt.work",
              logo: "https://www.sculpt.work/images/s_logo.png",
              sameAs: [
                "https://www.linkedin.com/company/sculptvisions",
                "https://www.fiverr.com/sculpt",
                "https://www.upwork.com/agencies/sculpt",
              ],
              description:
                "SCULPT is a software freelancing agency building websites, apps, and AI tools.",
              founder: {
                "@type": "Person",
                name: "Arijit Paul",
              },
            }),
          }}
        />
      </head>
      <body className="bg-[#101010] text-[#EAEFFF] font-helvetica antialiased">
        {/* Hidden SEO Header Content */}
        <div style={{ display: "none" }}>
        <h1>App Development Freelancing Agency – Hire Top Freelancers via Fiverr & Linkedin or Hire Directly | SCULPT</h1>
        <h2>
          Expert App, Web, and AI Development Services by SCULPT – Your Trusted Freelancing Agency on Fiverr, Upwork, Linkedin and Direct Hire
        </h2>
        <p>
          SCULPT connects you with skilled app developers, web designers, and AI specialists for custom software solutions. Hire vetted freelancers through Fiverr, Upwork, or work directly with our agency for reliable, high-quality development. From mobile apps and chatbots to advanced AI tools, we help businesses scale and innovate.
        </p>

        </div>

        <Suspense>
          {children}
          <CursorFollower />
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
