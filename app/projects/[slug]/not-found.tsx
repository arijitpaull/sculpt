import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { siteConfig } from "@/data/site-config"

export default function ProjectNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Simple Header */}
      <div className="absolute top-4 left-4">
        <Link href="/" className="text-xl font-bold tracking-tighter text-[#EAEFFF]">
          {siteConfig.name}
        </Link>
      </div>

      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-[#EAEFFF]">404</h1>
        <h2 className="text-3xl font-bold mb-4">Project not found</h2>
        <p className="text-lg opacity-80 mb-8 max-w-md">
          The project you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center border border-[#EAEFFF] px-6 py-3 rounded-full hover:bg-[#EAEFFF] hover:text-[#101010] transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>
      </div>
    </div>
  )
}