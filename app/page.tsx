"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Menu, X, Instagram, Linkedin, Mail } from "lucide-react"
import ProjectCard from "@/components/project-card"
import TestimonialScroller from "@/components/testimonial-scroller"
import MultiStepForm from "@/components/multi-step-form"
import SplashScreen from "@/components/splash-screen"
import FiverrLogo from "@/components/fiverr-logo"
import { projects } from "@/data/projects"
import { testimonials } from "@/data/testimonials"
import { socialLinks } from "@/data/social-links"
import { siteConfig } from "@/data/site-config"

// Icon mapping for dynamic icon rendering
const iconMap = {
  Instagram,
  Linkedin,
  Mail,
  FiverrLogo,
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showSplash, setShowSplash] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const { scrollYProgress } = useScroll()
  const headerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  // Check if splash screen should be shown (only on first visit)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasSeenSplash = sessionStorage.getItem("sculpt-splash-shown")
      if (!hasSeenSplash) {
        setShowSplash(true)
      }
    }
  }, [])

  // Prevent scrolling when splash screen is shown
  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [showSplash])

  // Handle video loading
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const handleLoadedData = () => {
        console.log("Video loaded successfully")
        setVideoError(false)
      }

      const handleError = (e: any) => {
        console.error("Video failed to load:", e)
        setVideoError(true)
      }

      video.addEventListener("loadeddata", handleLoadedData)
      video.addEventListener("error", handleError)

      return () => {
        video.removeEventListener("loadeddata", handleLoadedData)
        video.removeEventListener("error", handleError)
      }
    }
  }, [])

  const renderSocialIcon = (link: (typeof socialLinks)[0]) => {
    const IconComponent = iconMap[link.icon as keyof typeof iconMap]
    if (!IconComponent) return null

    return (
      <Link
        key={link.id}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-70 transition-opacity"
        aria-label={link.ariaLabel}
      >
        <IconComponent className="h-5 w-5" />
      </Link>
    )
  }

  const renderMobileSocialIcon = (link: (typeof socialLinks)[0]) => {
    const IconComponent = iconMap[link.icon as keyof typeof iconMap]
    if (!IconComponent) return null

    return (
      <Link
        key={link.id}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-70 transition-opacity"
        aria-label={link.ariaLabel}
      >
        <IconComponent className="h-6 w-6" />
      </Link>
    )
  }

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-6 mix-blend-difference">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tighter">
            {siteConfig.name}
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-4 ml-8">{socialLinks.map(renderSocialIcon)}</div>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#101010] z-30 flex items-center justify-center">
          <nav className="flex flex-col items-center space-y-8 text-2xl">
            <div className="flex items-center space-x-6 mt-8">{socialLinks.map(renderMobileSocialIcon)}</div>
          </nav>
        </div>
      )}

      <main>
        <section className="relative h-screen overflow-hidden" ref={headerRef}>
          <motion.div className="absolute inset-0 z-0" style={{ opacity, scale }}>
            {!videoError ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover opacity-40"
                onError={() => setVideoError(true)}
              >
                <source src={siteConfig.heroVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className={`w-full h-full ${siteConfig.heroVideoFallback} opacity-40`} />
            )}
          </motion.div>

          {/* Gradient overlay for smooth transition */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#101010] via-[#101010]/80 to-transparent z-10" />

          <div className="relative z-20 h-full flex flex-col items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6">{siteConfig.tagline}</h1>
              <p className="text-lg md:text-xl opacity-80 mb-8 max-w-2xl mx-auto">{siteConfig.description}</p>
            </motion.div>
          </div>

          <div className="absolute bottom-10 left-0 right-0 flex justify-center z-20">
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
              <ArrowRight className="h-6 w-6 rotate-90" />
            </motion.div>
          </div>
        </section>

        <section id="projects" className="relative py-32 px-6 -mt-16">
          <div className="max-w-7xl mx-auto relative z-10">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">Our Projects</h2>
              <p className="text-lg opacity-70">Some of our work for your reference.</p>
            </motion.div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-24">
          <div className="max-w-7xl mx-auto px-6 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">Client Testimonials</h2>
            <p className="text-lg opacity-70">What our clients say about working with us.</p>
          </div>
          <TestimonialScroller testimonials={testimonials} />
        </section>

        <section id="contact" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">Let's Create Something Amazing</h2>
              <p className="text-lg opacity-70 mb-12">
                Have a project in mind? We'd love to hear about it. Get in touch with us and let's start a conversation.
              </p>
              <MultiStepForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="block">
              <Image
                src={siteConfig.logo || "/placeholder.svg"}
                alt={siteConfig.name}
                width={150}
                height={40}
                className="h-auto"
              />
            </Link>
            <p className="mt-4 text-sm opacity-70">
              © {new Date().getFullYear()} {siteConfig.company.name} All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
