"use client"

import { Apple, Smartphone, Globe } from "lucide-react"
import Link from "next/link"

interface ProjectLinksProps {
  appStoreUrl?: string
  playStoreUrl?: string
  websiteUrl?: string
}

export default function ProjectLinks({ appStoreUrl, playStoreUrl, websiteUrl }: ProjectLinksProps) {
  // Don't render anything if no links are provided
  if (!appStoreUrl && !playStoreUrl && !websiteUrl) {
    return null
  }

  return (
    <div className="flex items-center gap-3 ml-4">
      {appStoreUrl && (
        <Link
          href={appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-[#252525] hover:bg-[#EAEFFF] hover:text-[#101010] transition-all duration-300"
          aria-label="View on App Store"
          title="View on App Store"
        >
          <Apple className="h-5 w-5" />
        </Link>
      )}
      
      {playStoreUrl && (
        <Link
          href={playStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-[#252525] hover:bg-[#EAEFFF] hover:text-[#101010] transition-all duration-300"
          aria-label="View on Play Store"
          title="View on Play Store"
        >
          <Smartphone className="h-5 w-5" />
        </Link>
      )}
      
      {websiteUrl && (
        <Link
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-[#252525] hover:bg-[#EAEFFF] hover:text-[#101010] transition-all duration-300"
          aria-label="Visit Website"
          title="Visit Website"
        >
          <Globe className="h-5 w-5" />
        </Link>
      )}
    </div>
  )
}