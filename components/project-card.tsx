"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { Project } from "@/data/projects"

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="group"
    >
      <Link href={`/projects/${project.id}`} className="block">
        <div className="relative overflow-hidden bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl transition-all duration-700 hover:border-[#2a2a2a] hover:shadow-2xl hover:shadow-black/30 aspect-[4/5]">
          {/* Background Image - Uses first gallery image or fallback to main image */}
          <Image
            src={project.image}
            width={800}
            height={1000}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          />

          {/* Gradient Overlays for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />

          {/* Enhanced blur fade for bottom section */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/95 via-black/60 to-transparent backdrop-blur-[1px]" />

          {/* Interactive Arrow - Top Right */}
          <div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
              <ArrowUpRight className="w-5 h-5 text-white transform group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>

          {/* Content Overlay - Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
            <div className="space-y-3">
              {/* Title */}
              <h3 className="text-2xl font-bold text-white group-hover:text-white/90 transition-colors duration-300 leading-tight">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-white/80 leading-relaxed group-hover:text-white/90 transition-colors duration-300 max-w-[90%]">
                {project.description}
              </p>

              {/* Bottom indicator line */}
              <div className="pt-2">
                <div className="w-12 h-0.5 bg-white/40 group-hover:bg-white/60 group-hover:w-16 transition-all duration-500" />
              </div>
            </div>
          </div>

          {/* Subtle hover glow */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br from-white/5 via-transparent to-white/5" />
        </div>
      </Link>
    </motion.div>
  )
}
