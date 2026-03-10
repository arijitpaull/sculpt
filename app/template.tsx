"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const prevPathname = useRef<string | null>(null)

  useEffect(() => {
    const prev = prevPathname.current
    const isGoingToProject = pathname.startsWith("/projects/")
    const isComingFromProject = prev?.startsWith("/projects/")

    // Only scroll to top when navigating INTO a project page
    // When coming back from a project, let the browser restore position
    if (isGoingToProject && !isComingFromProject) {
      window.scrollTo(0, 0)
    }

    prevPathname.current = pathname
  }, [pathname])

  return <>{children}</>
}