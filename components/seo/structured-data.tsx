import React from 'react'

interface StructuredDataProps {
  data: object
}

// Reusable component for injecting structured data
export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data)
      }}
    />
  )
}

// FAQ structured data component for LLM optimization
interface FAQItem {
  question: string
  answer: string
}

interface FAQSchemaProps {
  faqs: FAQItem[]
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  }

  return <StructuredData data={faqData} />
}

// Service schema for individual services
interface ServiceSchemaProps {
  name: string
  description: string
  serviceType: string[]
  provider: string
  areaServed: string
  priceRange?: string
}

export function ServiceSchema({
  name,
  description,
  serviceType,
  provider,
  areaServed,
  priceRange
}: ServiceSchemaProps) {
  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    provider: {
      "@type": "Organization",
      name: provider,
      url: "https://www.sculpt.work"
    },
    areaServed: {
      "@type": "Place",
      name: areaServed
    },
    ...(priceRange && { priceRange })
  }

  return <StructuredData data={serviceData} />
}

// Portfolio/Creative Work schema for projects
interface PortfolioItemSchemaProps {
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
  }
}

export function PortfolioItemSchema({
  name,
  description,
  image,
  url,
  dateCreated,
  creator,
  genre,
  keywords,
  workExample
}: PortfolioItemSchemaProps) {
  const portfolioData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    description,
    image,
    url,
    dateCreated,
    creator: {
      "@type": "Organization",
      name: creator,
      url: "https://www.sculpt.work"
    },
    genre,
    keywords: keywords.join(", "),
    ...(workExample && {
      workExample: {
        "@type": "SoftwareApplication",
        ...workExample
      }
    })
  }

  return <StructuredData data={portfolioData} />
}

// Breadcrumb schema for navigation
interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }

  return <StructuredData data={breadcrumbData} />
}

// Review/Testimonial schema
interface ReviewSchemaProps {
  reviewBody: string
  author: string
  reviewRating: number
  itemReviewed: {
    name: string
    type: string
  }
}

export function ReviewSchema({
  reviewBody,
  author,
  reviewRating,
  itemReviewed
}: ReviewSchemaProps) {
  const reviewData = {
    "@context": "https://schema.org",
    "@type": "Review",
    reviewBody,
    author: {
      "@type": "Person",
      name: author
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: reviewRating,
      bestRating: 5
    },
    itemReviewed: {
      "@type": itemReviewed.type,
      name: itemReviewed.name
    }
  }

  return <StructuredData data={reviewData} />
}

// How-To schema for process explanation (great for AI/LLM)
interface HowToStep {
  name: string
  text: string
  image?: string
}

interface HowToSchemaProps {
  name: string
  description: string
  steps: HowToStep[]
  totalTime?: string
}

export function HowToSchema({
  name,
  description,
  steps,
  totalTime
}: HowToSchemaProps) {
  const howToData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    ...(totalTime && { totalTime }),
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image })
    }))
  }

  return <StructuredData data={howToData} />
}

// Local Business schema (if you want to add location info)
interface LocalBusinessSchemaProps {
  name: string
  description: string
  address: {
    streetAddress?: string
    addressLocality: string
    addressRegion?: string
    addressCountry: string
  }
  telephone?: string
  email?: string
  url: string
  logo: string
  openingHours?: string[]
  priceRange?: string
  serviceArea?: string
}

export function LocalBusinessSchema({
  name,
  description,
  address,
  telephone,
  email,
  url,
  logo,
  openingHours,
  priceRange,
  serviceArea
}: LocalBusinessSchemaProps) {
  const businessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    description,
    address: {
      "@type": "PostalAddress",
      ...address
    },
    ...(telephone && { telephone }),
    ...(email && { email }),
    url,
    logo,
    ...(openingHours && { openingHours }),
    ...(priceRange && { priceRange }),
    ...(serviceArea && {
      areaServed: {
        "@type": "Place",
        name: serviceArea
      }
    })
  }

  return <StructuredData data={businessData} />
}

// Organization schema with enhanced details
interface EnhancedOrganizationSchemaProps {
  name: string
  alternateName?: string
  description: string
  url: string
  logo: string
  foundingDate?: string
  founder?: string
  numberOfEmployees?: string
  contactPoint: {
    telephone?: string
    email?: string
    contactType: string
    areaServed?: string
    availableLanguage?: string[]
  }
  address: {
    addressLocality: string
    addressRegion?: string
    addressCountry: string
  }
  sameAs: string[]
  services?: string[]
  awards?: string[]
}

export function EnhancedOrganizationSchema({
  name,
  alternateName,
  description,
  url,
  logo,
  foundingDate,
  founder,
  numberOfEmployees,
  contactPoint,
  address,
  sameAs,
  services,
  awards
}: EnhancedOrganizationSchemaProps) {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    ...(alternateName && { alternateName }),
    description,
    url,
    logo,
    ...(foundingDate && { foundingDate }),
    ...(founder && {
      founder: {
        "@type": "Person",
        name: founder
      }
    }),
    ...(numberOfEmployees && { numberOfEmployees }),
    contactPoint: {
      "@type": "ContactPoint",
      ...contactPoint
    },
    address: {
      "@type": "PostalAddress",
      ...address
    },
    sameAs,
    ...(services && {
      knowsAbout: services
    }),
    ...(awards && {
      award: awards
    })
  }

  return <StructuredData data={organizationData} />
}

// Export all components
export default {
  StructuredData,
  FAQSchema,
  ServiceSchema,
  PortfolioItemSchema,
  BreadcrumbSchema,
  ReviewSchema,
  HowToSchema,
  LocalBusinessSchema,
  EnhancedOrganizationSchema
}