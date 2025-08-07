// SEO utility functions for SCULPT website

export interface SEOData {
    title: string
    description: string
    keywords: string[]
    canonicalUrl: string
    ogImage?: string
    structuredData?: object
  }
  
  export function generateSEOMetadata(data: SEOData) {
    return {
      title: data.title,
      description: data.description,
      keywords: data.keywords.join(', '),
      openGraph: {
        title: data.title,
        description: data.description,
        url: data.canonicalUrl,
        siteName: 'SCULPT - App Development Agency',
        images: data.ogImage ? [
          {
            url: data.ogImage,
            width: 1200,
            height: 630,
            alt: data.title,
          }
        ] : [],
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@sculptvisions',
        title: data.title,
        description: data.description,
        images: data.ogImage ? [data.ogImage] : [],
      },
      alternates: {
        canonical: data.canonicalUrl,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    }
  }
  
  // Generate FAQ structured data for LLM optimization
  export function generateFAQSchema(faqs: Array<{question: string, answer: string}>) {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    }
  }
  
  // Generate service-specific structured data
  export function generateServiceSchema(service: {
    name: string
    description: string
    provider: string
    areaServed: string
    serviceType: string[]
    priceRange?: string
    offers?: Array<{name: string, description: string}>
  }) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.name,
      description: service.description,
      provider: {
        '@type': 'Organization',
        name: service.provider,
        url: 'https://www.sculpt.work'
      },
      serviceType: service.serviceType,
      areaServed: {
        '@type': 'Place',
        name: service.areaServed
      },
      ...(service.priceRange && { priceRange: service.priceRange }),
      ...(service.offers && {
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `${service.name} Services`,
          itemListElement: service.offers.map(offer => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: offer.name,
              description: offer.description
            }
          }))
        }
      })
    }
  }
  
  // LLM-optimized content generation helpers
  export function generateLLMOptimizedContent(topic: string, services: string[]) {
    const conversationalQuestions = [
      `What is ${topic}?`,
      `How does ${topic} work?`,
      `Why choose SCULPT for ${topic}?`,
      `What are the benefits of ${topic}?`,
      `How much does ${topic} cost?`,
      `How long does ${topic} take?`,
      `Who should use ${topic} services?`,
      `What technologies are used in ${topic}?`,
      `Can SCULPT help with ${topic} projects?`,
      `What makes SCULPT's ${topic} services unique?`
    ]
    
    const naturalLanguagePatterns = [
      `SCULPT specializes in ${topic} development`,
      `Our team provides expert ${topic} services`,
      `We deliver high-quality ${topic} solutions`,
      `Looking for ${topic} development? SCULPT can help`,
      `Professional ${topic} services by SCULPT agency`,
      `Get custom ${topic} solutions from SCULPT`,
      `Hire SCULPT for your ${topic} needs`,
      `Expert ${topic} development team at SCULPT`,
      `Transform your vision with SCULPT's ${topic} services`,
      `Leading ${topic} development agency - SCULPT`
    ]
    
    return {
      conversationalQuestions,
      naturalLanguagePatterns,
      relatedServices: services,
      keyPhrases: services.map(service => `${service} development`),
    }
  }
  
  // Performance optimization utilities
  export function optimizeImageLoading(src: string, alt: string, priority: boolean = false) {
    return {
      src,
      alt,
      priority,
      quality: 90,
      placeholder: 'blur' as const,
      blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==',
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
    }
  }
  
  // Analytics and tracking utilities for SEO
  export function trackSEOEvent(eventName: string, parameters: Record<string, any>) {
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', eventName, parameters)
    }
  }
  
  // Core Web Vitals optimization helpers
  export function preloadCriticalResources() {
    if (typeof document !== 'undefined') {
      // Preload critical fonts
      const fontPreload = document.createElement('link')
      fontPreload.rel = 'preload'
      fontPreload.href = '/fonts/HelveticaNeue.woff2'
      fontPreload.as = 'font'
      fontPreload.type = 'font/woff2'
      fontPreload.crossOrigin = 'anonymous'
      document.head.appendChild(fontPreload)
      
      // Preload hero image
      const imagePreload = document.createElement('link')
      imagePreload.rel = 'preload'
      imagePreload.href = '/images/s_banner.png'
      imagePreload.as = 'image'
      document.head.appendChild(imagePreload)
    }
  }
  
  // Schema markup generators for different content types
  export const schemaGenerators = {
    breadcrumb: (items: Array<{name: string, url: string}>) => ({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    }),
    
    organization: (org: {
      name: string
      url: string
      logo: string
      description: string
      contactPoint: {
        telephone: string
        email: string
        contactType: string
      }
      address: {
        addressLocality: string
        addressCountry: string
      }
      sameAs: string[]
    }) => ({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: org.name,
      url: org.url,
      logo: org.logo,
      description: org.description,
      contactPoint: {
        '@type': 'ContactPoint',
        ...org.contactPoint
      },
      address: {
        '@type': 'PostalAddress',
        ...org.address
      },
      sameAs: org.sameAs
    }),
    
    service: (service: {
      name: string
      description: string
      provider: string
      serviceType: string[]
      areaServed: string
      offers: Array<{name: string, description: string}>
    }) => ({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.name,
      description: service.description,
      provider: {
        '@type': 'Organization',
        name: service.provider
      },
      serviceType: service.serviceType,
      areaServed: {
        '@type': 'Place',
        name: service.areaServed
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${service.name} Services`,
        itemListElement: service.offers.map(offer => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: offer.name,
            description: offer.description
          }
        }))
      }
    }),
  
    professionalService: (service: {
      name: string
      description: string
      priceRange: string
      address: {
        addressLocality: string
        addressRegion?: string
        addressCountry: string
      }
      geo?: {
        latitude: string
        longitude: string
      }
      url: string
      telephone?: string
      email?: string
      openingHours?: {
        dayOfWeek: string[]
        opens: string
        closes: string
      }
      aggregateRating?: {
        ratingValue: string
        reviewCount: string
      }
    }) => ({
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: service.name,
      description: service.description,
      priceRange: service.priceRange,
      address: {
        '@type': 'PostalAddress',
        ...service.address
      },
      ...(service.geo && {
        geo: {
          '@type': 'GeoCoordinates',
          ...service.geo
        }
      }),
      url: service.url,
      ...(service.telephone && { telephone: service.telephone }),
      ...(service.email && { email: service.email }),
      ...(service.openingHours && {
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          ...service.openingHours,
          validFrom: new Date().getFullYear() + '-01-01',
          validThrough: (new Date().getFullYear() + 1) + '-12-31'
        }
      }),
      ...(service.aggregateRating && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: service.aggregateRating.ratingValue,
          reviewCount: service.aggregateRating.reviewCount,
          bestRating: '5',
          worstRating: '1'
        }
      })
    }),
  
    creativeWork: (work: {
      name: string
      description: string
      image: string
      url: string
      dateCreated: string
      creator: string
      genre: string
      keywords: string[]
      workExample?: {
        name: string
        description: string
        applicationCategory: string
        operatingSystem?: string
        softwareVersion?: string
        screenshot?: string[]
      }
      review?: {
        reviewBody: string
        author: string
        rating: string
      }
    }) => ({
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: work.name,
      description: work.description,
      image: work.image,
      url: work.url,
      dateCreated: work.dateCreated,
      datePublished: work.dateCreated,
      creator: {
        '@type': 'Organization',
        name: work.creator,
        url: 'https://www.sculpt.work'
      },
      genre: work.genre,
      keywords: work.keywords.join(', '),
      about: {
        '@type': 'Thing',
        name: `${work.genre} Development`,
        description: `Custom ${work.genre.toLowerCase()} development project showcasing ${work.keywords.join(', ')} technologies`
      },
      ...(work.workExample && {
        workExample: {
          '@type': 'SoftwareApplication',
          name: work.workExample.name,
          description: work.workExample.description,
          applicationCategory: work.workExample.applicationCategory,
          operatingSystem: work.workExample.operatingSystem || 'Cross-platform',
          softwareVersion: work.workExample.softwareVersion || '1.0',
          ...(work.workExample.screenshot && { screenshot: work.workExample.screenshot })
        }
      }),
      ...(work.review && {
        review: {
          '@type': 'Review',
          reviewBody: work.review.reviewBody,
          author: {
            '@type': 'Person',
            name: work.review.author
          },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: work.review.rating,
            bestRating: '5'
          }
        }
      })
    }),
  
    howTo: (howTo: {
      name: string
      description: string
      image?: string
      totalTime?: string
      estimatedCost?: string
      supply?: string[]
      tool?: string[]
      steps: Array<{
        name: string
        text: string
        image?: string
        url?: string
      }>
    }) => ({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: howTo.name,
      description: howTo.description,
      ...(howTo.image && { image: howTo.image }),
      ...(howTo.totalTime && { totalTime: howTo.totalTime }),
      ...(howTo.estimatedCost && { estimatedCost: howTo.estimatedCost }),
      ...(howTo.supply && { supply: howTo.supply }),
      ...(howTo.tool && { tool: howTo.tool }),
      step: howTo.steps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.name,
        text: step.text,
        ...(step.image && { image: step.image }),
        ...(step.url && { url: step.url })
      }))
    }),
  
    article: (article: {
      headline: string
      description: string
      image: string
      author: string
      datePublished: string
      dateModified?: string
      publisher: string
      wordCount?: number
      articleSection?: string
      keywords?: string[]
    }) => ({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.headline,
      description: article.description,
      image: article.image,
      author: {
        '@type': 'Person',
        name: article.author
      },
      datePublished: article.datePublished,
      dateModified: article.dateModified || article.datePublished,
      publisher: {
        '@type': 'Organization',
        name: article.publisher,
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.sculpt.work/images/s_logo.png'
        }
      },
      ...(article.wordCount && { wordCount: article.wordCount }),
      ...(article.articleSection && { articleSection: article.articleSection }),
      ...(article.keywords && { keywords: article.keywords.join(', ') })
    }),
  
    localBusiness: (business: {
      name: string
      description: string
      address: {
        streetAddress?: string
        addressLocality: string
        addressRegion?: string
        postalCode?: string
        addressCountry: string
      }
      geo?: {
        latitude: string
        longitude: string
      }
      telephone?: string
      email?: string
      url: string
      logo: string
      image?: string
      priceRange?: string
      paymentAccepted?: string[]
      currenciesAccepted?: string[]
      openingHours?: string[]
      serviceArea?: string[]
      areaServed?: string
    }) => ({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: business.name,
      description: business.description,
      address: {
        '@type': 'PostalAddress',
        ...business.address
      },
      ...(business.geo && {
        geo: {
          '@type': 'GeoCoordinates',
          latitude: business.geo.latitude,
          longitude: business.geo.longitude
        }
      }),
      ...(business.telephone && { telephone: business.telephone }),
      ...(business.email && { email: business.email }),
      url: business.url,
      logo: business.logo,
      ...(business.image && { image: business.image }),
      ...(business.priceRange && { priceRange: business.priceRange }),
      ...(business.paymentAccepted && { paymentAccepted: business.paymentAccepted }),
      ...(business.currenciesAccepted && { currenciesAccepted: business.currenciesAccepted }),
      ...(business.openingHours && { openingHours: business.openingHours }),
      ...(business.serviceArea && {
        serviceArea: business.serviceArea.map(area => ({
          '@type': 'Place',
          name: area
        }))
      }),
      ...(business.areaServed && {
        areaServed: {
          '@type': 'Place',
          name: business.areaServed
        }
      })
    }),
  
    webSite: (site: {
      name: string
      description: string
      url: string
      publisher: string
      inLanguage?: string
      potentialAction?: {
        target: string
        queryInput: string
      }
    }) => ({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: site.name,
      description: site.description,
      url: site.url,
      publisher: {
        '@type': 'Organization',
        name: site.publisher,
        url: site.url
      },
      inLanguage: site.inLanguage || 'en-US',
      ...(site.potentialAction && {
        potentialAction: [{
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: site.potentialAction.target
          },
          'query-input': site.potentialAction.queryInput
        }]
      })
    })
  }
  
  // Generate AI/LLM optimized keywords
  export function generateAIKeywords(primaryService: string, technologies: string[], location?: string) {
    const baseKeywords = [
      `${primaryService} development`,
      `custom ${primaryService} solutions`,
      `professional ${primaryService} services`,
      `${primaryService} agency`,
      `hire ${primaryService} developer`,
      `${primaryService} development company`,
      `${primaryService} development services`,
      `expert ${primaryService} development`,
      `affordable ${primaryService} development`,
      `${primaryService} development freelancer`
    ]
    
    const techKeywords = technologies.flatMap(tech => [
      `${tech} development`,
      `${tech} ${primaryService}`,
      `custom ${tech} solutions`,
      `${tech} development services`,
      `${tech} expert developer`,
      `${tech} freelancer`,
      `${tech} app development`,
      `${tech} programming services`
    ])
    
    const locationKeywords = location ? [
      `${primaryService} development ${location}`,
      `${primaryService} agency ${location}`,
      `${primaryService} developers ${location}`,
      `${primaryService} company ${location}`,
      `hire ${primaryService} developer ${location}`,
      `${primaryService} services ${location}`,
      `${primaryService} freelancer ${location}`
    ] : []
    
    const longTailKeywords = [
      `best ${primaryService} development agency`,
      `affordable ${primaryService} development services`,
      `enterprise ${primaryService} solutions`,
      `startup ${primaryService} development`,
      `${primaryService} development consultation`,
      `custom ${primaryService} application development`,
      `${primaryService} development for small business`,
      `${primaryService} development project management`,
      `end-to-end ${primaryService} development`,
      `${primaryService} development with modern technologies`
    ]
  
    const questionKeywords = [
      `how to develop ${primaryService}`,
      `what is ${primaryService} development`,
      `why choose ${primaryService} development`,
      `${primaryService} development process`,
      `${primaryService} development timeline`,
      `${primaryService} development cost`,
      `${primaryService} development benefits`,
      `${primaryService} development best practices`
    ]
    
    return [
      ...baseKeywords,
      ...techKeywords,
      ...locationKeywords,
      ...longTailKeywords,
      ...questionKeywords
    ]
  }
  
  // Generate content for AI/LLM optimization
  export function generateAIOptimizedContent(service: {
    name: string
    description: string
    benefits: string[]
    process: string[]
    technologies: string[]
    pricing?: string
    timeline?: string
  }) {
    const faqContent = [
      {
        question: `What is ${service.name}?`,
        answer: `${service.description} Our expert team specializes in delivering high-quality ${service.name.toLowerCase()} solutions using modern technologies like ${service.technologies.slice(0, 3).join(', ')}.`
      },
      {
        question: `Why choose SCULPT for ${service.name}?`,
        answer: `SCULPT offers expert ${service.name.toLowerCase()} services with proven experience in ${service.technologies.join(', ')}. We deliver ${service.benefits.slice(0, 3).join(', ')} for businesses of all sizes.`
      },
      {
        question: `How does the ${service.name} process work?`,
        answer: `Our ${service.name.toLowerCase()} process includes: ${service.process.join(', ')}. We ensure transparent communication and regular updates throughout the development cycle.`
      },
      {
        question: `What technologies does SCULPT use for ${service.name}?`,
        answer: `We use cutting-edge technologies including ${service.technologies.join(', ')} to deliver robust and scalable ${service.name.toLowerCase()} solutions.`
      }
    ]
  
    if (service.timeline) {
      faqContent.push({
        question: `How long does ${service.name} take?`,
        answer: `${service.name} typically takes ${service.timeline}. The exact timeline depends on project complexity and requirements. We provide detailed timelines during our consultation phase.`
      })
    }
  
    if (service.pricing) {
      faqContent.push({
        question: `How much does ${service.name} cost?`,
        answer: `${service.name} pricing ${service.pricing}. We offer flexible pricing models and provide detailed quotes based on your specific requirements. Contact us for a personalized estimate.`
      })
    }
  
    const conversationalContent = {
      introduction: `Looking for professional ${service.name.toLowerCase()}? SCULPT is a leading development agency specializing in ${service.name.toLowerCase()} using ${service.technologies.join(', ')}. We help businesses transform their digital vision into reality.`,
      
      benefits: `Our ${service.name.toLowerCase()} services provide ${service.benefits.join(', ')}. Whether you're a startup or enterprise, we deliver solutions that drive growth and success.`,
      
      process: `Our proven ${service.name.toLowerCase()} process ensures success: ${service.process.join(' → ')}. We maintain transparency and communication throughout every project phase.`,
      
      technologies: `We leverage modern technologies including ${service.technologies.join(', ')} to build scalable, secure, and high-performance solutions for ${service.name.toLowerCase()}.`,
      
      callToAction: `Ready to start your ${service.name.toLowerCase()} project? Contact SCULPT today for a free consultation. We're available on Fiverr, Upwork, or for direct hire.`
    }
  
    return {
      faqContent,
      conversationalContent,
      structuredData: generateFAQSchema(faqContent)
    }
  }
  
  // Export utility for Next.js metadata API
  export function createMetadataObject(seo: SEOData) {
    return {
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords.join(', '),
      openGraph: {
        title: seo.title,
        description: seo.description,
        url: seo.canonicalUrl,
        siteName: 'SCULPT',
        images: seo.ogImage ? [{
          url: seo.ogImage,
          width: 1200,
          height: 630,
          alt: seo.title
        }] : [],
        locale: 'en_US',
        type: 'website'
      },
      twitter: {
        card: 'summary_large_image',
        site: '@sculptvisions',
        title: seo.title,
        description: seo.description,
        images: seo.ogImage ? [seo.ogImage] : []
      },
      alternates: {
        canonical: seo.canonicalUrl
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1
        }
      }
    }
  }
  
  // Page-specific SEO generators
  export const pageSeO = {
    // Homepage SEO
    homepage: () => ({
      title: "SCULPT - Premier App Development Freelancing Agency | Hire Expert Developers",
      description: "SCULPT is a leading software freelancing agency specializing in mobile app development, web development, and AI solutions. Hire expert developers through Fiverr, Upwork, or direct consultation. Custom software development for startups and enterprises.",
      keywords: generateAIKeywords("app", ["Flutter", "React Native", "Next.js", "OpenAI", "Supabase"], "India"),
      canonicalUrl: "https://www.sculpt.work",
      ogImage: "/images/s_banner.png"
    }),
  
    // Services SEO
    appDevelopment: () => ({
      title: "Mobile App Development Services | Flutter & React Native Experts | SCULPT",
      description: "Professional mobile app development services using Flutter and React Native. Custom iOS and Android apps for startups and enterprises. Hire SCULPT's expert mobile developers on Fiverr, Upwork, or directly.",
      keywords: generateAIKeywords("mobile app", ["Flutter", "React Native", "iOS", "Android", "Firebase"], "India"),
      canonicalUrl: "https://www.sculpt.work/services/app-development",
      ogImage: "/images/app-development-banner.png"
    }),
  
    webDevelopment: () => ({
      title: "Web Development Services | Next.js & React Experts | SCULPT Agency",
      description: "Custom web development services using Next.js, React, and modern frameworks. Responsive websites, web applications, and e-commerce solutions. Professional web developers available for hire.",
      keywords: generateAIKeywords("web", ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"], "India"),
      canonicalUrl: "https://www.sculpt.work/services/web-development",
      ogImage: "/images/web-development-banner.png"
    }),
  
    aiDevelopment: () => ({
      title: "AI Development Services | OpenAI Integration & Custom AI Solutions | SCULPT",
      description: "Expert AI development services including OpenAI integration, chatbots, and custom AI solutions. Transform your business with intelligent automation and AI-powered applications.",
      keywords: generateAIKeywords("AI", ["OpenAI", "ChatGPT", "Machine Learning", "Artificial Intelligence", "Automation"], "India"),
      canonicalUrl: "https://www.sculpt.work/services/ai-development",
      ogImage: "/images/ai-development-banner.png"
    })
  }
  
  // Utility to generate meta tags for any page
  export function generatePageMeta(page: keyof typeof pageSeO) {
    const seoData = pageSeO[page]()
    return createMetadataObject(seoData)
  }
  
  // Social media optimized content generators
  export function generateSocialContent(project: {
    title: string
    description: string
    technologies: string[]
    category: string
  }) {
    return {
      twitter: `🚀 Just launched ${project.title}! A ${project.category.toLowerCase()} app built with ${project.technologies.slice(0, 2).join(' & ')}. ${project.description} #AppDevelopment #${project.technologies[0]} #TechInnovation`,
      
      linkedin: `Excited to share our latest project: ${project.title}!\n\n${project.description}\n\nBuilt with: ${project.technologies.join(', ')}\nCategory: ${project.category}\n\nInterested in custom app development? Let's connect!\n\n#AppDevelopment #SoftwareDevelopment #${project.category.replace(' ', '')}`,
      
      instagram: `✨ ${project.title} ✨\n\n${project.description.substring(0, 100)}...\n\n🛠️ Tech: ${project.technologies.slice(0, 3).join(', ')}\n📱 Category: ${project.category}\n\n#SCULPT #AppDevelopment #${project.technologies[0]} #TechInnovation #SoftwareAgency`,
      
      facebook: `🎉 Proud to showcase ${project.title}!\n\n${project.description}\n\nThis ${project.category.toLowerCase()} project demonstrates our expertise in ${project.technologies.join(', ')}.\n\nLooking for custom software development? SCULPT is here to bring your vision to life!\n\n💼 Available on Fiverr, Upwork, or direct hire\n🌐 sculpt.work`
    }
  }
  
  // Generate sitemap entries
  export function generateSitemapEntries(projects: Array<{slug: string}>) {
    const baseUrl = 'https://www.sculpt.work'
    
    const staticPages = [
      { url: baseUrl, changeFrequency: 'weekly' as const, priority: 1.0 },
      { url: `${baseUrl}/#testimonials`, changeFrequency: 'monthly' as const, priority: 0.7 },
      { url: `${baseUrl}/#contact`, changeFrequency: 'monthly' as const, priority: 0.6 },
      { url: `${baseUrl}/services/app-development`, changeFrequency: 'monthly' as const, priority: 0.8 },
      { url: `${baseUrl}/services/web-development`, changeFrequency: 'monthly' as const, priority: 0.8 },
      { url: `${baseUrl}/services/ai-development`, changeFrequency: 'monthly' as const, priority: 0.8 }
    ]
  
    const projectPages = projects.map(project => ({
      url: `${baseUrl}/projects/${project.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      lastModified: new Date()
    }))
  
    return [...staticPages, ...projectPages]
  }
  
  // Core Web Vitals optimization utilities
  export const performanceUtils = {
    // Preload critical resources
    preloadCriticalAssets: () => {
      if (typeof document === 'undefined') return
  
      // Preload critical fonts
      const criticalFonts = [
        '/fonts/HelveticaNeue.woff2',
        '/fonts/HelveticaNeue-Bold.woff2'
      ]
  
      criticalFonts.forEach(font => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.href = font
        link.as = 'font'
        link.type = 'font/woff2'
        link.crossOrigin = 'anonymous'
        document.head.appendChild(link)
      })
  
      // Preload hero image
      const heroImageLink = document.createElement('link')
      heroImageLink.rel = 'preload'
      heroImageLink.href = '/images/s_banner.png'
      heroImageLink.as = 'image'
      document.head.appendChild(heroImageLink)
    },
  
    // Optimize image loading
    getImageProps: (src: string, alt: string, priority = false) => ({
      src,
      alt,
      priority,
      quality: 90,
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
      placeholder: 'blur' as const,
      blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
    }),
  
    // Lazy load non-critical resources
    lazyLoadResource: (src: string, type: 'script' | 'style' | 'image') => {
      if (typeof document === 'undefined') return
  
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (type === 'script') {
              const script = document.createElement('script')
              script.src = src
              script.async = true
              document.head.appendChild(script)
            } else if (type === 'style') {
              const link = document.createElement('link')
              link.rel = 'stylesheet'
              link.href = src
              document.head.appendChild(link)
            }
            observer.unobserve(entry.target)
          }
        })
      })
  
      // Create a placeholder element to observe
      const placeholder = document.createElement('div')
      placeholder.style.height = '1px'
      document.body.appendChild(placeholder)
      observer.observe(placeholder)
    }
  }
  
  // Analytics and conversion tracking
  export const analyticsUtils = {
    // Track SEO events
    trackSEOEvent: (eventName: string, parameters: Record<string, any>) => {
      if (
        typeof window !== 'undefined' &&
        typeof (window as any).gtag === 'function'
      ) {
        (window as any).gtag('event', eventName, {
          event_category: 'SEO',
          ...parameters
        })
      }
    },
  
    // Track conversion events
    trackConversion: (
      conversionType: 'contact_form' | 'project_inquiry' | 'call_booking',
      value?: number
    ) => {
      if (
        typeof window !== 'undefined' &&
        typeof (window as any).gtag === 'function'
      ) {
        (window as any).gtag('event', 'conversion', {
          send_to: 'AW-CONVERSION_ID', // Replace with actual conversion ID
          value: value || 1,
          currency: 'USD',
          event_category: 'Conversion',
          event_label: conversionType
        })
      }
    },
  
    // Track page performance
    trackPerformance: () => {
      if (typeof window !== 'undefined' && 'performance' in window) {
        window.addEventListener('load', () => {
          setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
            
            if (typeof (window as any).gtag === 'function' && perfData) {
              (window as any).gtag('event', 'page_performance', {
                event_category: 'Performance',
                page_load_time: Math.round(perfData.loadEventEnd - perfData.fetchStart),
                dom_content_loaded: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart),
                first_contentful_paint: Math.round(perfData.responseEnd - perfData.fetchStart)
              })
            }
          }, 0)
        })
      }
    }
  }
  
  // Content optimization for different search engines
  export const contentOptimization = {
    // Generate content for Google optimization
    forGoogle: (service: string, location?: string) => ({
      title: `${service} Development Services${location ? ` in ${location}` : ''} | SCULPT Agency`,
      description: `Professional ${service.toLowerCase()} development services by SCULPT. Expert developers, proven results, competitive pricing. Available on Fiverr, Upwork, or direct hire.`,
      keywords: generateAIKeywords(service, ['Custom Software', 'Professional Development', 'Expert Services'], location)
    }),
  
    // Generate content for Bing optimization
    forBing: (service: string, location?: string) => ({
      title: `Expert ${service} Development | SCULPT Software Agency${location ? ` - ${location}` : ''}`,
      description: `Transform your business with expert ${service.toLowerCase()} development from SCULPT. Specialized in custom solutions, modern technologies, and exceptional results.`,
      keywords: generateAIKeywords(service, ['Business Solutions', 'Custom Development', 'Professional Services'], location)
    }),
  
    // Generate content for AI/LLM search optimization
    forAI: (service: string, benefits: string[]) => ({
      title: `How SCULPT Delivers Exceptional ${service} Development Solutions`,
      description: `SCULPT specializes in ${service.toLowerCase()} development, providing ${benefits.join(', ')}. Our expert team uses modern technologies to deliver custom solutions that drive business growth.`,
      conversationalQueries: [
        `What makes SCULPT's ${service.toLowerCase()} development unique?`,
        `How does SCULPT approach ${service.toLowerCase()} projects?`,
        `Why should I choose SCULPT for ${service.toLowerCase()} development?`,
        `What technologies does SCULPT use for ${service.toLowerCase()}?`
      ]
    })
  }
  
  // Accessibility optimization for SEO
  export const accessibilityUtils = {
    // Generate accessible alt text for images
    generateAltText: (context: {
      projectName?: string
      technology?: string
      purpose?: string
      feature?: string
    }) => {
      const parts = []
      if (context.projectName) parts.push(context.projectName)
      if (context.technology) parts.push(`${context.technology} application`)
      if (context.purpose) parts.push(`showing ${context.purpose}`)
      if (context.feature) parts.push(`featuring ${context.feature}`)
      
      return parts.join(' - ')
    },
  
    // Generate accessible headings structure
    generateHeadingStructure: (content: {
      mainTitle: string
      sections: Array<{
        title: string
        subsections?: string[]
      }>
    }) => ({
      h1: content.mainTitle,
      structure: content.sections.map(section => ({
        h2: section.title,
        h3s: section.subsections || []
      }))
    }),
  
    // Generate ARIA labels
    generateAriaLabels: (component: 'navigation' | 'main' | 'footer' | 'form' | 'button', context?: string) => {
      const labels = {
        navigation: 'Main navigation',
        main: 'Main content',
        footer: 'Footer',
        form: context ? `${context} form` : 'Contact form',
        button: context ? `${context} button` : 'Action button'
      }
      return labels[component]
    }
  }
  
  // International SEO utilities
  export const internationalSEO = {
    // Generate hreflang tags
    generateHreflang: (currentUrl: string, languages: Record<string, string>) => 
      Object.entries(languages).map(([lang, url]) => ({
        rel: 'alternate',
        hreflang: lang,
        href: url
      })),
  
    // Generate localized content
    generateLocalizedContent: (baseContent: {
      title: string
      description: string
      keywords: string[]
    }, locale: 'en-US' | 'en-GB' | 'en-AU' | 'en-CA') => {
      const localizations = {
        'en-US': { currency: 'USD', spelling: 'optimize' },
        'en-GB': { currency: 'GBP', spelling: 'optimise' },
        'en-AU': { currency: 'AUD', spelling: 'optimise' },
        'en-CA': { currency: 'CAD', spelling: 'optimize' }
      }
  
      const localization = localizations[locale]
      
      return {
        ...baseContent,
        title: baseContent.title.replace(/optimize/gi, localization.spelling),
        description: baseContent.description.replace(/optimize/gi, localization.spelling),
        currency: localization.currency
      }
    }
  }
  
  // Technical SEO utilities
  export const technicalSEO = {
    // Generate robots meta tag
    generateRobotsMeta: (options: {
      index?: boolean
      follow?: boolean
      noarchive?: boolean
      nosnippet?: boolean
      noimageindex?: boolean
      maxSnippet?: number
      maxImagePreview?: 'none' | 'standard' | 'large'
      maxVideoPreview?: number
    } = {}) => {
      const {
        index = true,
        follow = true,
        noarchive = false,
        nosnippet = false,
        noimageindex = false,
        maxSnippet = -1,
        maxImagePreview = 'large',
        maxVideoPreview = -1
      } = options
  
      const directives = []
      if (index) directives.push('index')
      else directives.push('noindex')
      
      if (follow) directives.push('follow')
      else directives.push('nofollow')
      
      if (noarchive) directives.push('noarchive')
      if (nosnippet) directives.push('nosnippet')
      if (noimageindex) directives.push('noimageindex')
      if (maxSnippet !== -1) directives.push(`max-snippet:${maxSnippet}`)
      if (maxImagePreview !== 'large') directives.push(`max-image-preview:${maxImagePreview}`)
      if (maxVideoPreview !== -1) directives.push(`max-video-preview:${maxVideoPreview}`)
  
      return directives.join(', ')
    },
  
    // Generate canonical URL
    generateCanonical: (baseUrl: string, path: string, params?: Record<string, string>) => {
      let canonical = `${baseUrl}${path}`
      if (params && Object.keys(params).length > 0) {
        const searchParams = new URLSearchParams(params)
        canonical += `?${searchParams.toString()}`
      }
      return canonical
    },
  
    // Generate pagination meta tags
    generatePaginationMeta: (currentPage: number, totalPages: number, baseUrl: string) => {
      const meta: Array<{rel: string, href: string}> = []
      
      if (currentPage > 1) {
        meta.push({
          rel: 'prev',
          href: `${baseUrl}?page=${currentPage - 1}`
        })
      }
      
      if (currentPage < totalPages) {
        meta.push({
          rel: 'next',
          href: `${baseUrl}?page=${currentPage + 1}`
        })
      }
      
      return meta
    }
  }
  
  // Export all utilities
  export default {
    generateSEOMetadata,
    generateFAQSchema,
    generateServiceSchema,
    generateLLMOptimizedContent,
    optimizeImageLoading,
    trackSEOEvent,
    preloadCriticalResources,
    schemaGenerators,
    generateAIKeywords,
    generateAIOptimizedContent,
    createMetadataObject,
    pageSeO,
    generatePageMeta,
    generateSocialContent,
    generateSitemapEntries,
    performanceUtils,
    analyticsUtils,
    contentOptimization,
    accessibilityUtils,
    internationalSEO,
    technicalSEO
  }