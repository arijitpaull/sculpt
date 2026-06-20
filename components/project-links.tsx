"use client"

import { Globe } from "lucide-react"
import { SiAppstore, SiGoogleplay } from "react-icons/si"
import Link from "next/link"

interface ProjectLinksProps {
  appStoreUrl?: string
  playStoreUrl?: string
  websiteUrl?: string
  availabilityNotice?: string
}

export default function ProjectLinks({ appStoreUrl, playStoreUrl, websiteUrl, availabilityNotice }: ProjectLinksProps) {
  // Don't render anything if no links are provided
  if (!appStoreUrl && !playStoreUrl && !websiteUrl) {
    return null
  }

  return (
    <div className="flex items-center gap-3 ml-4">
      {appStoreUrl && (
        <div className="flex items-center gap-2">
          <Link
            href={appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-[#252525] hover:bg-[#EAEFFF] hover:text-[#101010] transition-all duration-300"
            aria-label="View on App Store"
            title="View on App Store"
          >
            <SiAppstore className="h-5 w-5" />
          </Link>
          {availabilityNotice && (
            <span className="text-xs text-[#EAEFFF]/40 italic whitespace-nowrap">
              {availabilityNotice}
            </span>
          )}
        </div>
      )}

      {playStoreUrl && (
        <Link
          href={playStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-xl bg-[#252525] hover:bg-[#EAEFFF] hover:text-[#101010] transition-all duration-300"
          aria-label="View on Play Store"
          title="View on Play Store"
        >
          <SiGoogleplay className="h-5 w-5" />
        </Link>
      )}
      
      {websiteUrl && (
        <Link
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-xl bg-[#252525] hover:bg-[#EAEFFF] hover:text-[#101010] transition-all duration-300"
          aria-label="Visit Website"
          title="Visit Website"
        >
          <Globe className="h-5 w-5" />
        </Link>
      )}
    </div>
  )
}