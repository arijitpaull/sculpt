export interface SiteConfig {
  name: string
  tagline: string
  description: string
  heroVideo: string
  heroVideoFallback: string
  logo: string
  availabilityCapsule: {
    acceptingProjects: boolean
    available: {
      label: string
      description: string
      highlight: string
    }
    unavailable: {
      label: string
      description: string
      highlight: string
    }
  }
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
  name: "SCULPT",
  tagline: "Chiseling Visions into Apps",
  description: "We craft digital experiences that blend form and function into seamless, captivating products.",
  heroVideo: "/videos/sculpt-hero.mp4",
  heroVideoFallback: "bg-gradient-to-br from-gray-900 via-gray-800 to-black",
  logo: "/images/sculpt-logo.png",
  availabilityCapsule: {
    acceptingProjects: true,
    available: {
      label: "We are accepting projects!",
      description: "We have 2 project slots remaining. Book a call now!",
      highlight: "2 project slots remaining",
    },
    unavailable: {
      label: "We are all booked for 2 months.",
      description: "Currently our team is working on multiple projects, but you can contact us to book a slot for after 29th June 2026.",
      highlight: "contact us to book a slot for after 29th June 2026.",
    },
  },
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
