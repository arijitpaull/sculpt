"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CursorFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile/touch device
    const checkIsMobile = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const smallScreen = window.innerWidth <= 768
      const userAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      
      return hasTouch || smallScreen || userAgent
    }

    setIsMobile(checkIsMobile())

    // Listen for window resize to update mobile detection
    const handleResize = () => {
      setIsMobile(checkIsMobile())
    }

    window.addEventListener('resize', handleResize)

    // Only add mouse event listeners if not mobile
    if (!checkIsMobile()) {
      const updateMousePosition = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }

      const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        const isClickable =
          target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.closest("a") ||
          target.closest("button") ||
          target.style.cursor === "pointer" ||
          window.getComputedStyle(target).cursor === "pointer"

        setIsHovering(Boolean(isClickable))
      }

      const handleMouseOut = () => {
        setIsHovering(false)
      }

      const handleMouseDown = () => {
        setIsClicking(true)
      }

      const handleMouseUp = () => {
        setIsClicking(false)
      }

      window.addEventListener("mousemove", updateMousePosition)
      document.addEventListener("mouseover", handleMouseOver)
      document.addEventListener("mouseout", handleMouseOut)
      document.addEventListener("mousedown", handleMouseDown)
      document.addEventListener("mouseup", handleMouseUp)

      return () => {
        window.removeEventListener("mousemove", updateMousePosition)
        document.removeEventListener("mouseover", handleMouseOver)
        document.removeEventListener("mouseout", handleMouseOut)
        document.removeEventListener("mousedown", handleMouseDown)
        document.removeEventListener("mouseup", handleMouseUp)
        window.removeEventListener('resize', handleResize)
      }
    }

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Don't render cursor follower on mobile devices
  if (isMobile) {
    return null
  }

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - (isHovering ? 20 : 8),
          y: mousePosition.y - (isHovering ? 20 : 8),
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        <div
          className={`bg-white rounded-full opacity-80 transition-all duration-200 ${
            isHovering ? "w-10 h-10" : "w-4 h-4"
          }`}
        />
      </motion.div>

      {/* Outer ring that appears on hover */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
        animate={{
          x: mousePosition.x - (isHovering ? 24 : 16),
          y: mousePosition.y - (isHovering ? 24 : 16),
          scale: isHovering ? 1 : 0,
          opacity: isHovering ? 0.6 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
          mass: 0.8,
        }}
      >
        <div
          className={`border border-white rounded-full transition-all duration-200 ${
            isHovering ? "w-12 h-12" : "w-8 h-8"
          }`}
        />
      </motion.div>

      {/* Click ripple effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997] mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isClicking ? 1.5 : 0,
          opacity: isClicking ? 0.3 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 1,
        }}
      >
        <div className="w-8 h-8 border-2 border-white rounded-full" />
      </motion.div>
    </>
  )
}