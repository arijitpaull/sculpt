"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"
import type { Project } from "@/data/projects"
import { siteConfig } from "@/data/site-config"
import ProjectLinks from "@/components/project-links"

interface ClientProjectPageProps {
  project: Project
}

export default function ClientProjectPage({ project }: ClientProjectPageProps) {
  return (
    <>
      {/* Enhanced SEO Head Content - moved to server component via metadata */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "@id": `https://www.sculpt.work/projects/${project.slug}#creativework`,
            "name": project.title,
            "description": project.fullDescription,
            "image": `https://www.sculpt.work${project.image}`,
            "url": `https://www.sculpt.work/projects/${project.slug}`,
            "author": {
              "@type": "Organization",
              "name": "SCULPT",
              "url": "https://www.sculpt.work"
            },
            "creator": {
              "@type": "Organization", 
              "name": "SCULPT",
              "url": "https://www.sculpt.work"
            },
            "dateCreated": "2024-01-01",
            "datePublished": "2024-01-01",
            "keywords": project.technologies.join(", "),
            "genre": project.category,
            "about": {
              "@type": "Thing",
              "name": `${project.category} Development`,
              "description": `Custom ${project.category.toLowerCase()} development project showcasing ${project.technologies.join(", ")} technologies`
            },
            "workExample": {
              "@type": "SoftwareApplication",
              "name": project.title,
              "description": project.description,
              "applicationCategory": project.category,
              "operatingSystem": "Cross-platform",
              "softwareVersion": "1.0",
              "screenshot": project.gallery.map(img => `https://www.sculpt.work${img}`)
            },
            "review": {
              "@type": "Review",
              "reviewBody": project.testimonial.quote,
              "author": {
                "@type": "Person",
                "name": project.testimonial.author
              },
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              }
            }
          })
        }}
      />

      <div className="min-h-screen">
        {/* Floating Header */}
        <motion.header 
          className="fixed top-4 left-0 right-0 z-50 flex justify-center"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-[#202020]/50 backdrop-blur-md rounded-full px-6 py-3 flex items-center space-x-8 border border-[#303030]/30 shadow-2xl">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold tracking-tighter text-[#EAEFFF]">
              {siteConfig.name}
            </Link>
            
            {/* Back to Projects Button */}
            <Link 
              href="/" 
              className="relative overflow-hidden bg-[#EAEFFF] text-[#202020] px-6 py-2.5 rounded-full font-bold transition-all duration-300 hover:scale-105 group inline-flex items-center shadow-lg text-lg"
              style={{
                boxShadow: '0 0 20px rgba(234, 239, 255, 0.3), 0 4px 14px rgba(234, 239, 255, 0.15)'
              }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <ArrowLeft className="mr-2 h-4 w-4 relative z-10" />
              <span className="relative z-10 flex items-center justify-center h-full">Back to projects</span>
            </Link>
          </div>
        </motion.header>

        <main>
          {/* Hero Section with Enhanced SEO */}
          <section className="pt-32 pb-16 px-6">
            <div className="max-w-7xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                {/* Breadcrumb for SEO */}
                <nav className="mb-6" aria-label="Breadcrumb">
                  <ol className="flex items-center space-x-2 text-sm opacity-70">
                    <li><Link href="/" className="hover:opacity-100 transition-opacity">Home</Link></li>
                    <li>/</li>
                    <li><Link href="/#projects" className="hover:opacity-100 transition-opacity">Projects</Link></li>
                    <li>/</li>
                    <li className="text-[#EAEFFF]" aria-current="page">{project.title}</li>
                  </ol>
                </nav>

                <div className="inline-block bg-[#1a1a1a] px-3 py-1 rounded-full text-sm mb-4">{project.category}</div>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">{project.title}</h1>
                <ProjectLinks 
                  appStoreUrl={project.appStoreUrl}
                  playStoreUrl={project.playStoreUrl}
                  websiteUrl={project.websiteUrl}
                />
                </div>
<p className="text-xl md:text-2xl opacity-80 max-w-3xl">{project.fullDescription}</p>

                {/* Technology tags for SEO */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="bg-[#252525] px-3 py-1 rounded-full text-sm border border-[#353535]">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Enhanced Project Image with Alt Text */}
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
                  alt={`${project.title} - ${project.category} app development showcase featuring ${project.technologies.join(", ")} technologies`}
                  className="w-full h-auto rounded-3xl object-cover"
                  priority
                />
              </motion.div>
            </div>
          </section>

          {/* Project Details with Schema Markup */}
          <section className="py-16 px-6 bg-[#151515]" itemScope itemType="https://schema.org/Article">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                  <h2 className="text-2xl font-bold mb-6">The Challenge</h2>
                  <p className="text-lg opacity-80" itemProp="about">{project.challenge}</p>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-6">Our Solution</h2>
                  <p className="text-lg opacity-80">{project.solution}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Project Gallery with Horizontal Scroll */}
          <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">Project Gallery</h2>
              <div className="overflow-x-auto pb-4 -mx-6 px-6 scrollbar-custom">
                <div className="flex gap-6">
                  {project.gallery.slice(1).map((image: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.8 }}
                      className="flex-shrink-0"
                      style={{ height: '600px' }}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        width={800}
                        height={600}
                        alt={`${project.title} ${project.category} app screenshot ${index + 2} showing ${project.technologies[index % project.technologies.length]} implementation`}
                        className="h-full w-auto rounded-lg object-contain"
                        loading="lazy"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Custom Scrollbar Styles */}
              <style jsx>{`
                .scrollbar-custom {
                  scrollbar-width: thin;
                  scrollbar-color: #252525 #151515;
                }
                .scrollbar-custom::-webkit-scrollbar {
                  height: 10px;
                }
                .scrollbar-custom::-webkit-scrollbar-track {
                  background: #151515;
                  border-radius: 5px;
                }
                .scrollbar-custom::-webkit-scrollbar-thumb {
                  background: #252525;
                  border-radius: 5px;
                }
                .scrollbar-custom::-webkit-scrollbar-thumb:hover {
                  background: #353535;
                }
              `}</style>
            </div>
          </section>

          {/* Results and Testimonial with Schema */}
          <section className="py-16 px-6 bg-[#151515]" itemScope itemType="https://schema.org/Review">
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
  {project.testimonial.quote && project.testimonial.author && (
    <>
      <h2 className="text-2xl font-bold mb-6">Client Testimonial</h2>
      <blockquote className="border-l-2 border-[#EAEFFF] pl-6 italic" itemProp="reviewBody">
        <p className="text-lg opacity-80 mb-4">"{project.testimonial.quote}"</p>
        <footer className="text-sm">
          — <span itemProp="author" itemScope itemType="https://schema.org/Person">
            <span itemProp="name">{project.testimonial.author}</span>
          </span>
        </footer>
      </blockquote>
      <div style={{display: "none"}}>
        <span itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
          <meta itemProp="ratingValue" content="5" />
          <meta itemProp="bestRating" content="5" />
        </span>
      </div>
    </>
  )}
</div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-6">Ready to Start Your Project?</h2>
              <p className="text-lg opacity-80 mb-8">Let's discuss how we can bring your vision to life with the same expertise and attention to detail.</p>
              <Link
                href="/#contact"
                className="inline-flex items-center border border-[#EAEFFF] px-6 py-3 rounded-full hover:bg-[#EAEFFF] hover:text-[#101010] transition-colors"
              >
                Get in touch <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </section>
        </main>

        {/* Enhanced Footer */}
        <footer className="py-12 px-6" itemScope itemType="https://schema.org/WPFooter">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link href="/" className="text-2xl font-bold tracking-tighter">
                {siteConfig.company.name}
              </Link>
              <p className="mt-2 text-sm opacity-70">
                © {new Date().getFullYear()} {siteConfig.company.name} All rights reserved.
              </p>
            </div>
            <nav aria-label="Footer Navigation">
              <Link 
                href="/" 
                className="text-sm opacity-70 hover:opacity-100 transition-opacity mr-6"
              >
                Back to Portfolio
              </Link>
              <Link 
                href="/#contact" 
                className="text-sm opacity-70 hover:opacity-100 transition-opacity"
              >
                Start Your Project
              </Link>
            </nav>
          </div>
        </footer>
      </div>
    </>
  )
}