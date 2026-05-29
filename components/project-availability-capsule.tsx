"use client"

import { useEffect, useState, type RefObject } from "react"
import { AnimatePresence, motion } from "framer-motion"
import type { SiteConfig } from "@/data/site-config"

type CapsuleState = SiteConfig["availabilityCapsule"]["available"]

interface ProjectAvailabilityCapsuleProps {
  config: SiteConfig["availabilityCapsule"]
  heroRef: RefObject<HTMLElement | null>
}

function HighlightedDescription({
  description,
  highlight,
}: {
  description: string
  highlight: string
}) {
  if (!highlight || !description.includes(highlight)) {
    return <>{description}</>
  }

  const [before, after] = description.split(highlight, 2)

  return (
    <>
      {before}
      <strong className="font-semibold text-white">{highlight}</strong>
      {after}
    </>
  )
}

export default function ProjectAvailabilityCapsule({
  config,
  heroRef,
}: ProjectAvailabilityCapsuleProps) {
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const heroElement = heroRef.current

    if (!heroElement) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting)
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -18% 0px",
      }
    )

    observer.observe(heroElement)

    return () => observer.disconnect()
  }, [heroRef])

  const currentState: CapsuleState = config.acceptingProjects ? config.available : config.unavailable
  const pulseColor = config.acceptingProjects ? "#3DFF7A" : "#FF5A5A"
  const glowColor = config.acceptingProjects ? "rgba(61, 255, 122, 0.35)" : "rgba(255, 90, 90, 0.35)"

  return (
    <AnimatePresence>
      {isHeroVisible && (
        <motion.div
          onHoverStart={() => setIsExpanded(true)}
          onHoverEnd={() => setIsExpanded(false)}
          aria-label={`${currentState.label} ${currentState.description}`}
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed bottom-5 right-4 z-40 flex w-[min(calc(100vw-2rem),22rem)] cursor-default items-start rounded-full bg-[#101010]/70 px-4 py-3 text-left opacity-70 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-[width,opacity,transform] duration-300 ease-out hover:opacity-90 sm:bottom-7 sm:right-7 sm:w-[22rem] sm:hover:w-[30rem]"
        >
          <motion.span
            initial={false}
            animate={{
              width: isExpanded ? 0 : 12,
              opacity: isExpanded ? 0 : 1,
              scale: isExpanded ? 0.7 : 1,
            }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="relative mt-1 flex h-3 shrink-0 items-center justify-center"
          >
            <motion.span
              aria-hidden="true"
              animate={{ scale: [1, 1.9, 1.9], opacity: [0.7, 0, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              className="absolute h-3 w-3 rounded-full"
              style={{ backgroundColor: pulseColor, boxShadow: `0 0 18px ${glowColor}` }}
            />
            <span
              aria-hidden="true"
              className="relative h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: pulseColor, boxShadow: `0 0 14px ${glowColor}` }}
            />
          </motion.span>

          <span className={`${isExpanded ? "ml-0 pl-3" : "ml-3 pl-1"} min-w-0 flex-1 transition-[margin,padding] duration-200 ease-out`}>
            <span className="flex items-center">
              <span className="truncate text-sm font-medium text-white sm:text-[15px]">
                {currentState.label}
              </span>
            </span>

            <motion.span
              initial={false}
              animate={{
                opacity: isExpanded ? 1 : 0,
                maxHeight: isExpanded ? 80 : 0,
                marginTop: isExpanded ? 8 : 0,
              }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="block overflow-hidden pr-2 text-xs leading-relaxed text-white/70 sm:text-sm"
            >
              <HighlightedDescription
                description={currentState.description}
                highlight={currentState.highlight}
              />
            </motion.span>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
