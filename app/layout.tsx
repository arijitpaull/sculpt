import type React from "react"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "react"

// Separate viewport export (required in Next.js 15+)
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EAEFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#101010" }
  ],
  colorScheme: "dark light",
}

export const metadata = {
  metadataBase: new URL('https://www.sculpt.work'),
  
  // Enhanced basic meta tags
  title: {
    default: "SCULPT - Software Development Agency | Full-Stack Development & AI Solutions",
    template: "%s | SCULPT - Expert App & AI Development"
  },
  icons: {
    icon: [
      { url: '/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/images/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  
  description: "SCULPT is a premium software freelancing agency specializing in mobile app AI models, and web apps development, and logo design and branding. Hire through Fiverr, Linkedin, or work directly with our agency for custom software solutions.",
  
  keywords: [
    // Primary keywords
    "app development freelancing agency",
    "hire app developer",
    "mobile app development services",
    "custom software development",
    "AI development services",
    
    // Platform-specific keywords
    "fiverr app developer",
    "upwork mobile developer",
    "freelance app development",
    "app development company",
    
    // Service-specific keywords
    "flutter app development",
    "react native development",
    "web app development",
    "AI chatbot development",
    "UI UX design services",
    
    // Technology keywords
    "next.js development",
    "flutter development",
    "openai integration",
    "supabase development",
    
    // Business keywords
    "startup app development",
    "enterprise app solutions",
    "app development consultation",
    "digital transformation services",
    
    // Location + service
    "app developers india",
    "software agency delhi",
    "mobile app development delhi"
  ].join(", "),
  
  authors: [
    { name: "Arijit Paul", url: "https://www.sculpt.work" },
    { name: "SCULPT Team", url: "https://www.sculpt.work" }
  ],
  
  creator: "SCULPT - Arijit Paul",
  publisher: "SCULPT Software Agency",
  category: "Technology Services",
  classification: "Business Services",
  
  // Enhanced application info
  applicationName: "SCULPT Agency",
  generator: "Next.js 15",
  referrer: "origin-when-cross-origin",

  // Enhanced OpenGraph
  openGraph: {
    type: "website",
    siteName: "SCULPT - App Development Agency",
    title: "SCULPT - Premier App Development Freelancing Agency",
    description: "Transform your digital vision into reality with SCULPT's expert app developers. Specializing in mobile apps, web development, and AI solutions. Available on Fiverr, Upwork, or direct hire.",
    url: "https://www.sculpt.work",
    locale: "en_US",
    images: [
      {
        url: "/images/s_banner.png",
        width: 1200,
        height: 630,
        alt: "SCULPT - Expert App Development and Digital Solutions",
        type: "image/png"
      },
      {
        url: "/images/sculpt-portfolio.png",
        width: 1200,
        height: 675,
        alt: "SCULPT Portfolio - Mobile Apps and Web Development",
        type: "image/png"
      }
    ],
  },

  // Enhanced Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@sculptvisions",
    creator: "@sculptvisions",
    title: "SCULPT - Expert App Development Agency",
    description: "Premier freelancing agency for mobile apps, web development & AI solutions. Hire top developers via Fiverr, Upwork, or directly.",
    images: ["/images/s_banner.png"],
  },

  // Enhanced robots
  robots: {
    index: true,
    follow: true,
    noarchive: false,
    nosnippet: false,
    noimageindex: false,
    nocache: false,
    notranslate: false,
    indexifembedded: true,
    maxSnippet: -1,
    maxImagePreview: "large",
    maxVideoPreview: -1,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Manifest for PWA
  manifest: "/site.webmanifest",

  // Additional verification
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
    other: {
      "msvalidate.01": "your-bing-verification-code",
    },
  },

  // App-specific metadata
  alternates: {
    canonical: "https://www.sculpt.work",
    languages: {
      "en-US": "https://www.sculpt.work",
      "en-GB": "https://www.sculpt.work",
    },
  },

  // Additional meta tags
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "SCULPT",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#101010",
    "msapplication-config": "/browserconfig.xml",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Canonical Link */}
        <link rel="canonical" href="https://www.sculpt.work" />

        {/* Preconnect to improve performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.cal.com" />
        <link rel="dns-prefetch" href="https://vercel.live" />

        {/* Enhanced JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.sculpt.work/#organization",
                  name: "SCULPT",
                  alternateName: "SCULPT Agency",
                  url: "https://www.sculpt.work",
                  logo: {
                    "@type": "ImageObject",
                    "@id": "https://www.sculpt.work/#logo",
                    url: "https://www.sculpt.work/images/sculpt_logo.png",
                    contentUrl: "https://www.sculpt.work/images/sculpt_logo.png",
                    width: 512,
                    height: 512,
                    caption: "SCULPT Logo"
                  },
                  image: {
                    "@type": "ImageObject",
                    "@id": "https://www.sculpt.work/#image",
                    url: "https://www.sculpt.work/images/s_banner.png",
                    contentUrl: "https://www.sculpt.work/images/s_banner.png",
                    width: 1200,
                    height: 630,
                    caption: "SCULPT - App Development Agency"
                  },
                  description: "SCULPT is a premium software development agency specializing in mobile app development, web development, and AI tools.",
                  slogan: "Chiseling Visions into Apps",
                  foundingDate: "2024",
                  foundingLocation: {
                    "@type": "Place",
                    name: "Delhi, India"
                  },
                  founder: {
                    "@type": "Person",
                    name: "Arijit Paul",
                    jobTitle: "Founder & Lead Developer",
                    url: "https://www.sculpt.work"
                  },
                  contactPoint: {
                    "@type": "ContactPoint",
                    telephone: "+91-9650639071",
                    email: "admin@sculpt.work",
                    contactType: "Customer Service",
                    availableLanguage: ["English", "Hindi"],
                    areaServed: "Worldwide"
                  },
                  address: {
                    "@type": "PostalAddress",
                    addressRegion: "Delhi",
                    addressCountry: "India"
                  },
                  sameAs: [
                    "https://www.linkedin.com/company/sculptvisions",
                    "https://instagram.com/sculptvisions",
                    "https://www.fiverr.com/arijitpaulll",
                    "https://www.upwork.com/agencies/sculpt"
                  ],
                  knowsAbout: [
                    "Mobile App Development",
                    "Web Development",
                    "AI Development",
                    "Flutter Development",
                    "React Native",
                    "Next.js",
                    "UI/UX Design",
                    "Custom Software Solutions"
                  ],
                  serviceArea: {
                    "@type": "Place",
                    name: "Worldwide"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.sculpt.work/#website",
                  url: "https://www.sculpt.work",
                  name: "SCULPT - App Development Agency",
                  description: "Premier freelancing agency for mobile app development, web development, and AI solutions.",
                  publisher: {
                    "@id": "https://www.sculpt.work/#organization"
                  },
                  potentialAction: [
                    {
                      "@type": "SearchAction",
                      target: {
                        "@type": "EntryPoint",
                        urlTemplate: "https://www.sculpt.work/search?q={search_term_string}"
                      },
                      "query-input": "required name=search_term_string"
                    }
                  ],
                  inLanguage: "en-US"
                },
                {
                  "@type": "Service",
                  "@id": "https://www.sculpt.work/#service",
                  name: "App Development Services",
                  description: "Comprehensive mobile app development, web development, and AI solution services for businesses worldwide.",
                  provider: {
                    "@id": "https://www.sculpt.work/#organization"
                  },
                  serviceType: [
                    "Mobile App Development",
                    "Web Development",
                    "AI Development",
                    "UI/UX Design",
                    "Custom Software Development"
                  ],
                  areaServed: {
                    "@type": "Place",
                    name: "Worldwide"
                  },
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "App Development Services",
                    itemListElement: [
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Mobile App Development",
                          description: "Custom mobile app development for iOS and Android using Flutter and React Native"
                        }
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Web Development",
                          description: "Modern web application development using Next.js, React, and other cutting-edge technologies"
                        }
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "AI Development",
                          description: "AI-powered applications and chatbots using OpenAI, custom ML models, and AI integrations"
                        }
                      }
                    ]
                  }
                },
                {
                  "@type": "ProfessionalService",
                  "@id": "https://www.sculpt.work/#professional-service",
                  name: "SCULPT Development Agency",
                  image: "https://www.sculpt.work/images/s_banner.png",
                  description: "Expert app development agency providing custom software solutions, mobile apps, and AI tools for businesses worldwide.",
                  priceRange: "$500-$50000",
                  address: {
                    "@type": "PostalAddress",
                    addressRegion: "Delhi",
                    addressCountry: "India"
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: "28.7041",
                    longitude: "77.1025"
                  },
                  url: "https://www.sculpt.work",
                  telephone: "+91-9650639071",
                  email: "admin@sculpt.work",
                  openingHoursSpecification: {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                    opens: "09:00",
                    closes: "18:00",
                    validFrom: "2024-01-01",
                    validThrough: "2025-12-31"
                  },
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "4.9",
                    reviewCount: "50",
                    bestRating: "5",
                    worstRating: "1"
                  }
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": "https://www.sculpt.work/#breadcrumbs",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      name: "Home",
                      item: "https://www.sculpt.work"
                    },
                    {
                      "@type": "ListItem",
                      position: 2,
                      name: "Projects",
                      item: "https://www.sculpt.work/#projects"
                    },
                    {
                      "@type": "ListItem",
                      position: 3,
                      name: "Contact",
                      item: "https://www.sculpt.work/#contact"
                    }
                  ]
                }
              ]
            }),
          }}
        />

        {/* FAQ Schema for LLM optimization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What services does SCULPT provide?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "SCULPT provides comprehensive app development services including mobile app development for iOS and Android, web development using modern frameworks like Next.js and React, AI development and chatbot creation, UI/UX design, and custom software solutions. We work with clients through Fiverr, Upwork, or direct hire."
                  }
                },
                {
                  "@type": "Question", 
                  name: "How can I hire SCULPT for my project?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "You can hire SCULPT through multiple channels: 1) Find us on Fiverr as a top-rated app developer, 2) Connect with us on Upwork for larger projects, 3) Contact us directly through our website at sculpt.work for custom quotes and enterprise solutions, or 4) Book a consultation call to discuss your project requirements."
                  }
                },
                {
                  "@type": "Question",
                  name: "What technologies does SCULPT use for app development?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "SCULPT uses cutting-edge technologies including Flutter and React Native for mobile apps, Next.js and React for web development, OpenAI and custom AI models for AI solutions, Supabase and Firebase for backend services, and modern design tools for UI/UX. We choose the best technology stack for each project's specific requirements."
                  }
                },
                {
                  "@type": "Question",
                  name: "Does SCULPT work with startups and enterprise clients?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, SCULPT works with clients of all sizes - from individual entrepreneurs and startups to large enterprises. We offer scalable solutions and flexible engagement models to match your budget and requirements, whether you need a simple MVP or a complex enterprise application."
                  }
                },
                {
                  "@type": "Question",
                  name: "What is SCULPT's project delivery timeline?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Project timelines vary based on complexity and requirements. Simple mobile apps typically take 2-4 weeks, while complex applications with AI features may take 2-6 months. We provide detailed project timelines during our consultation phase and maintain regular communication throughout development."
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className="bg-[#101010] text-[#EAEFFF] font-helvetica antialiased">
        {/* Enhanced SEO Header Content for LLM Understanding */}
        <div style={{ display: "none" }} itemScope itemType="https://schema.org/Organization">
          <h1 itemProp="name">SCULPT - Premier App Development Freelancing Agency</h1>
          <h2 itemProp="slogan">Expert Mobile App, Web Development & AI Solutions</h2>
          
          <div itemProp="description">
            <p>SCULPT is a leading software freelancing agency specializing in custom mobile app development, modern web applications, and innovative AI solutions. Our expert team of developers creates high-quality digital experiences for startups, SMEs, and enterprise clients worldwide.</p>
            
            <p>Services include: Flutter and React Native mobile app development, Next.js and React web development, OpenAI and custom AI integrations, UI/UX design, and full-stack software solutions. Available for hire through Fiverr, Upwork, or direct consultation.</p>
            
            <p>Founded by Arijit Paul in 2024, SCULPT has delivered successful projects across industries including dating apps, health and wellness applications, business utilities, and educational platforms. We pride ourselves on combining technical expertise with creative design to deliver exceptional digital products.</p>
          </div>

          <div itemProp="knowsAbout">
            Mobile App Development, iOS Development, Android Development, Flutter Development, React Native, Web Development, Next.js Development, React Development, AI Development, OpenAI Integration, Chatbot Development, UI/UX Design, Custom Software Development, Startup App Development, Enterprise Software Solutions, Freelance Development Services, Fiverr App Developer, Upwork Mobile Developer
          </div>

          <address itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <span itemProp="addressLocality">Delhi</span>,
            <span itemProp="addressCountry">India</span>
          </address>

          <div itemProp="contactPoint" itemScope itemType="https://schema.org/ContactPoint">
            <meta itemProp="contactType" content="Customer Service" />
            <meta itemProp="telephone" content="+91-9650639071" />
            <meta itemProp="email" content="admin@sculpt.work" />
          </div>
        </div>

        <Suspense>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}