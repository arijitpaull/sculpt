import { Metadata } from "next"
import { notFound } from "next/navigation"
import { projects, type Project } from "@/data/projects"
import { siteConfig } from "@/data/site-config"
import ClientProjectPage from "./client-page"

// This is a server component that generates metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  // Await params in Next.js 15+
  const resolvedParams = await params
  const project = projects.find((p) => p.slug === resolvedParams.slug)
  
  if (!project) {
    return {
      title: "Project Not Found | SCULPT",
      description: "The requested project could not be found."
    }
  }

  return {
    title: `${project.title} - ${project.category} Project | SCULPT Case Study`,
    description: `${project.description} - A detailed case study of our ${project.category.toLowerCase()} project including challenges, solutions, and results.`,
    keywords: [
      project.title.toLowerCase(),
      project.category.toLowerCase(),
      ...project.technologies.map(tech => tech.toLowerCase()),
      "case study",
      "app development project",
      "sculpt portfolio",
      "custom software development"
    ].join(", "),
    
    openGraph: {
      title: `${project.title} - SCULPT Case Study`,
      description: project.fullDescription,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: `${project.title} - ${project.category} App Development Project`
        }
      ],
      type: "article",
      publishedTime: "2024-01-01T00:00:00.000Z",
      authors: ["SCULPT Team"],
      section: "Portfolio",
      tags: project.technologies
    },

    twitter: {
      card: "summary_large_image",
      title: `${project.title} - App Development Case Study`,
      description: project.description,
      images: [project.image]
    },

    alternates: {
      canonical: `https://www.sculpt.work/projects/${project.slug}`
    }
  }
}

// Generate static params for all projects (optional, for static generation)
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

// Server component that fetches data and passes to client
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await params in Next.js 15+
  const resolvedParams = await params
  const project = projects.find((p) => p.slug === resolvedParams.slug)

  if (!project) {
    notFound()
  }

  // Pass the project data to the client component
  return <ClientProjectPage project={project} />
}