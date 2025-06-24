import type React from "react"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "react"
import CursorFollower from "@/components/cursor-follower"

export const metadata = {
  title: "SCULPT",
  description: "SCULPT development and design studio: Chiseling Visions into Apps",
  icons: {
    icon: "../images/s_logo.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
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
