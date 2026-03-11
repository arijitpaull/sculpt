"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { Instagram, Linkedin, Mail } from "lucide-react"
import { socialLinks } from "@/data/social-links"
import { siteConfig } from "@/data/site-config"

const NAV_LINKS = [
  { icon: Instagram, label: "Instagram", key: "Instagram" },
  { icon: Linkedin,  label: "LinkedIn",  key: "Linkedin"  },
  { icon: Mail,      label: "Email",     key: "Mail"      },
]

const HERO_HEIGHT = 900

interface NavbarProps {
  onLetsBuildClick: () => void
}

export default function Navbar({ onLetsBuildClick }: NavbarProps) {
  const { scrollY } = useScroll()

  // progress: 0 = top of page, 1 = scrolled past hero
  const progress = useTransform(scrollY, [0, HERO_HEIGHT * 0.6], [0, 1])

  // Width shrinks as you scroll
  const maxWidthDesktop = useTransform(progress, [0, 1], ["960px", "420px"])

  // ~30px padding on each side in expanded, tighter when compact
  const paddingXDesktop = useTransform(progress, [0, 1], [30, 20])

  // Labels fade + width collapses
  const labelOpacity = useTransform(progress, [0, 0.4], [1, 0])
  const labelMaxWidth = useTransform(progress, [0, 0.35], ["90px", "0px"])

  // Logo container shrinks
  const logoContainerWidth = useTransform(progress, [0, 1], ["180px", "52px"])

  // Full logo fades out early, compact logo fades in
  const fullLogoOpacity = useTransform(progress, [0, 0.3], [1, 0])
  const compactLogoOpacity = useTransform(progress, [0.2, 0.5], [0, 1])

  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  const getSocialLink = (key: string) =>
    socialLinks.find((l) => l.icon === key)

  return (
    <motion.header
      className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >

      {/* ── DESKTOP: scroll-driven expanding/shrinking ── */}
      <motion.div
        style={{
          maxWidth: isDesktop ? maxWidthDesktop : "420px",
          paddingLeft: isDesktop ? paddingXDesktop : 20,
          paddingRight: isDesktop ? paddingXDesktop : 20,
        }}
        className="
          hidden lg:flex
          pointer-events-auto w-full
          bg-[#202020]/60 backdrop-blur-md
          rounded-full py-3 items-center
          border border-[#303030]/30 shadow-2xl
          overflow-hidden
        "
      >
        {/* LEFT: cross-fading logo — no separator */}
        <motion.div
          style={{ maxWidth: logoContainerWidth }}
          className="relative shrink-0 flex items-center overflow-hidden"
        >
          <Link href="/" className="relative flex items-center" style={{ width: "180px" }}>
            {/* Expanded: full wordmark */}
            <motion.img
              src="/images/sculpt_logo_full.webp"
              alt={siteConfig.name}
              style={{ opacity: fullLogoOpacity }}
              className="absolute left-0 h-9 w-auto object-contain object-left"
            />
            {/* Compact: icon mark — slightly bigger */}
            <motion.img
              src="/images/sculpt_logo.webp"
              alt={siteConfig.name}
              style={{ opacity: compactLogoOpacity }}
              className="absolute left-0 h-11 w-auto object-contain object-left"
            />
            {/* Invisible spacer so Link has height */}
            <span className="invisible h-11 w-12 block" />
          </Link>
        </motion.div>

        {/* CENTER: icons + collapsing labels */}
        <div className="flex items-center gap-6 flex-1 justify-center">
          {NAV_LINKS.map(({ icon: Icon, label, key }) => {
            const link = getSocialLink(key)
            const href = link?.url ?? "#"
            return (
              <Link
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center gap-2 hover:opacity-70 transition-opacity"
              >
                <Icon className="h-5 w-5 text-[#EAEFFF] shrink-0" />
                <motion.span
                  style={{ opacity: labelOpacity, maxWidth: labelMaxWidth }}
                  className="overflow-hidden whitespace-nowrap text-sm text-[#EAEFFF]/80 font-medium leading-none inline-flex items-center"
                >
                  {label}
                </motion.span>
              </Link>
            )
          })}
        </div>

        {/* RIGHT: CTA */}
        <div className="shrink-0 ml-4">
          <button
            onClick={onLetsBuildClick}
            className="relative overflow-hidden bg-[#EAEFFF] text-[#202020] px-7 py-3 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 group"
            style={{ boxShadow: "0 0 20px rgba(234,239,255,0.25), 0 4px 14px rgba(234,239,255,0.12)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10">Let's Build!</span>
          </button>
        </div>
      </motion.div>

      {/* ── MOBILE + TABLET: always compact, no expand ── */}
      <div
        className="
          flex lg:hidden
          pointer-events-auto
          bg-[#202020]/60 backdrop-blur-md
          rounded-full px-5 py-3
          items-center gap-4
          border border-[#303030]/30 shadow-2xl
        "
      >
        <Link href="/">
          <img
            src="/images/sculpt_logo.webp"
            alt={siteConfig.name}
            className="h-10 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center gap-4">
          {NAV_LINKS.map(({ icon: Icon, label, key }) => {
            const link = getSocialLink(key)
            const href = link?.url ?? "#"
            return (
              <Link
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="hover:opacity-70 transition-opacity"
              >
                <Icon className="h-5 w-5 text-[#EAEFFF]" />
              </Link>
            )
          })}
        </div>

        <button
          onClick={onLetsBuildClick}
          className="relative overflow-hidden bg-[#EAEFFF] text-[#202020] px-6 py-2.5 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 group"
          style={{ boxShadow: "0 0 15px rgba(234,239,255,0.25)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <span className="relative z-10">Let's Build!</span>
        </button>
      </div>

    </motion.header>
  )
}