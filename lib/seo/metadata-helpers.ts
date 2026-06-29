import { Metadata } from 'next'

const BASE_URL = 'https://www.ailiq.xyz'
const DEFAULT_OG_IMAGE = '/og-image.png'

/**
 * Generate default metadata object with common fields
 */
export function generateBaseMetadata(overrides: Partial<Metadata> = {}): Metadata {
  return {
    metadataBase: new URL(BASE_URL),
    generator: 'Next.js',
    applicationName: 'AILIQ',
    referrer: 'strict-origin-when-cross-origin',
    creator: 'AILIQ',
    publisher: 'AILIQ',
    robots: {
      index: true,
      follow: true,
      nocache: false,
    },
    ...overrides,
  }
}

/**
 * Generate page-level metadata with title, description, and canonical
 */
export function generatePageMetadata(
  title: string,
  description: string,
  path: string,
  options?: {
    image?: string
    keywords?: string[]
    type?: 'website' | 'article'
    publishedDate?: Date
    modifiedDate?: Date
    author?: string
  }
): Metadata {
  const url = `${BASE_URL}${path}`
  const image = options?.image || DEFAULT_OG_IMAGE

  const metadata: Metadata = {
    title,
    description,
    keywords: options?.keywords,
    openGraph: {
      type: options?.type || 'website',
      title,
      description,
      url,
      siteName: 'AILIQ',
      locale: 'en_US',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@AILIQDirectory',
      title,
      description,
      images: [image],
    },
    canonical: url,
  }

  // Add article-specific metadata
  if (options?.type === 'article') {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime: options?.publishedDate?.toISOString(),
      modifiedTime: options?.modifiedDate?.toISOString(),
      authors: options?.author ? [options.author] : ['AILIQ Team'],
    }
  }

  return generateBaseMetadata(metadata)
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{
    name: string
    url?: string
  }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      ...(crumb.url && { item: `${BASE_URL}${crumb.url}` }),
    })),
  }
}

/**
 * Generate organization structured data
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AILIQ',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description: 'Trusted AI Tools Directory & Reviews',
    sameAs: ['https://x.com/AILIQDirectory'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'best4liker@gmail.com',
    },
  }
}

/**
 * Generate tool review structured data
 */
export function generateToolSchema(tool: {
  name: string
  description: string
  url: string
  slug: string
  pricing?: string
  rating?: number
  reviewCount?: number
}) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    url: tool.url,
    applicationCategory: 'Productivity Software',
  }

  if (tool.rating !== undefined && tool.reviewCount !== undefined) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: tool.rating,
      ratingCount: tool.reviewCount,
    }
  }

  return schema
}

/**
 * Generate comparison page structured data
 */
export function generateComparisonSchema(
  tool1: { name: string; url: string },
  tool2: { name: string; url: string }
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ComparisonChart',
    name: `${tool1.name} vs ${tool2.name}`,
    itemReviewed: [
      {
        '@type': 'SoftwareApplication',
        name: tool1.name,
        url: tool1.url,
      },
      {
        '@type': 'SoftwareApplication',
        name: tool2.name,
        url: tool2.url,
      },
    ],
  }
}

/**
 * Generate blog article structured data
 */
export function generateArticleSchema(article: {
  title: string
  description: string
  slug: string
  publishedDate: Date
  modifiedDate?: Date
  author?: string
  image?: string
}) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    image: article.image || DEFAULT_OG_IMAGE,
    datePublished: article.publishedDate.toISOString(),
    dateModified: article.modifiedDate?.toISOString() || article.publishedDate.toISOString(),
    author: {
      '@type': 'Person',
      name: article.author || 'AILIQ Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AILIQ',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${article.slug}`,
    },
  }

  return schema
}

/**
 * Generate FAQ structured data
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Generate canonical URL
 */
export function canonicalUrl(path: string): string {
  return `${BASE_URL}${path}`
}
