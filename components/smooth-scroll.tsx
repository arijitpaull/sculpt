"use client"

import { useEffect } from "react"
import Lenis from "lenis"

// Site-wide smooth scrolling. Renders nothing; mounted once in the root layout.
export default function SmoothScroll() {
  useEffect(() => {
    // People who ask for less motion get native scrolling.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    let frame = requestAnimationFrame(function loop(time) {
      lenis.raf(time)
      frame = requestAnimationFrame(loop)
    })

    // Lenis measures the page once; images, animations and lazy sections change the height later.
    let lastH = document.documentElement.scrollHeight
    const interval = setInterval(() => {
      const h = document.documentElement.scrollHeight
      if (h !== lastH) {
        lastH = h
        lenis.resize()
      }
    }, 500)
    const onResize = () => lenis.resize()
    window.addEventListener("resize", onResize)

    // Modals lock the page with body.style.overflow = "hidden". Lenis scrolls the window
    // itself and would ignore that, so pause it while the body is locked.
    const syncLock = () => (document.body.style.overflow === "hidden" ? lenis.stop() : lenis.start())
    const observer = new MutationObserver(syncLock)
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] })
    syncLock()

    return () => {
      cancelAnimationFrame(frame)
      clearInterval(interval)
      window.removeEventListener("resize", onResize)
      observer.disconnect()
      lenis.destroy()
    }
  }, [])

  return null
}
