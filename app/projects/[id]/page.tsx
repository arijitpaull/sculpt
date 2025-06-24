"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { projects, type Project } from "@/data/projects"
import { siteConfig } from "@/data/site-config"

export default function ProjectPage() {
  const params = useParams() as { id: string } // 👈 assert type
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const foundProject = projects.find((p) => p.id === params.id)
    if (foundProject) {
      setProject(foundProject)
    }
    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-t-2 border-[#EAEFFF] rounded-full animate-spin" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold mb-4">Project not found</h1>
        <p className="mb-8">The project you're looking for doesn't exist or has been removed.</p>
        <Link
          href="/"
          className="inline-flex items-center border border-[#EAEFFF] px-6 py-3 rounded-full hover:bg-[#EAEFFF] hover:text-[#101010] transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-6 mix-blend-difference">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tighter">
            {siteConfig.name}
          </Link>
          <Link href="/" className="inline-flex items-center hover:opacity-70 transition-opacity">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to projects
          </Link>
        </div>
      </header>

      <main>
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-block bg-[#1a1a1a] px-3 py-1 rounded-full text-sm mb-4">{project.category}</div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">{project.title}</h1>
              <p className="text-xl md:text-2xl opacity-80 max-w-3xl">{project.fullDescription}</p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <Image
                src={project.gallery[0]}
                width={1200}
                height={675}
                alt={project.title}
                className="w-full h-auto rounded-3xl object-cover"
              />
            </motion.div>
          </div>
        </section>

        <section className="py-16 px-6 bg-[#151515]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <h2 className="text-2xl font-bold mb-6">The Challenge</h2>
                <p className="text-lg opacity-80">{project.challenge}</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-6">Our Solution</h2>
                <p className="text-lg opacity-80">{project.solution}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {project.gallery.slice(1).map((image: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.8 }}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    width={600}
                    height={400}
                    alt={`${project.title} gallery image ${index + 2}`}
                    className="w-full h-auto rounded-lg object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-6 bg-[#151515]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <h2 className="text-2xl font-bold mb-6">Results</h2>
                <p className="text-lg opacity-80 mb-8">{project.results}</p>
                <h3 className="text-xl font-bold mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string, index: number) => (
                    <span key={index} className="bg-[#1a1a1a] px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-6">Client Testimonial</h2>
                <blockquote className="border-l-2 border-[#EAEFFF] pl-6 italic">
                  <p className="text-lg opacity-80 mb-4">"{project.testimonial.quote}"</p>
                  <footer className="text-sm">— {project.testimonial.author}</footer>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6">Interested in working together?</h2>
            <Link
              href="/#contact"
              className="inline-flex items-center border border-[#EAEFFF] px-6 py-3 rounded-full hover:bg-[#EAEFFF] hover:text-[#101010] transition-colors"
            >
              Get in touch <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-2xl font-bold tracking-tighter">
              {siteConfig.company.name}
            </Link>
            <p className="mt-2 text-sm opacity-70">
              © {new Date().getFullYear()} {siteConfig.company.name} All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
