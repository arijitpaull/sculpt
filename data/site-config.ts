export interface SiteConfig {
  name: string
  tagline: string
  description: string
  heroVideo: string
  heroVideoFallback: string
  logo: string
  contact: {
    email: string
    phone?: string
  }
  company: {
    name: string
    foundedYear: number
    location?: string
  }
}

export const siteConfig: SiteConfig = {
  name: "SCULPT.",
  tagline: "Chiseling Visions into Apps",
  description: "We craft digital experiences that blend form and function into seamless, captivating products.",
  heroVideo: "/videos/sculpt-hero.mp4",
  heroVideoFallback: "bg-gradient-to-br from-gray-900 via-gray-800 to-black",
  logo: "/images/sculpt-logo.png",
  contact: {
    email: "admin@sculpt.work",
    phone: "+91 9650639071", // Optional
  },
  company: {
    name: "SCULPT",
    foundedYear: 2024,
    location: "Delhi, India", // Optional
  },
}
