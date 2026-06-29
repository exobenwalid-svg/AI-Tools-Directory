import { Metadata } from 'next'
import Link from 'next/link'
import { fetchToolBySlug, getRelatedTools } from '@/lib/tools/queries'
import { notFound } from 'next/navigation'
import Script from 'next/script'

interface ToolDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const tools = await (await import('@/lib/tools/queries')).fetchTools()
  return tools.map((tool) => ({
    slug: tool.slug,
  }))
}

export async function generateMetadata(
  { params }: ToolDetailPageProps,
): Promise<Metadata> {
  const { slug } = await params
  const tool = await fetchToolBySlug(slug)

  if (!tool) {
    return {
      title: 'Tool Not Found | AILIQ',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const canonicalUrl = `https://www.ailiq.xyz/tools/${tool.slug}`
  const ratingValue = tool.rating.toFixed(1)
  const reviewCount = tool.review_count || 0

  return {
    title: `${tool.name} - AI Tool Review & Pricing | AILIQ`,
    description: `${tool.name} review: ${tool.short_description} Pricing: ${tool.price}. Rating: ${ratingValue} stars (${reviewCount} reviews).`,
    keywords: [
      tool.name,
      `${tool.name} review`,
      `${tool.name} pricing`,
      tool.category,
      'AI tool',
      'AI software',
      ...(tool.tags || []),
    ],
    canonical: canonicalUrl,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `${tool.name} | Review & Pricing - AILIQ`,
      description: tool.short_description,
      type: 'website',
      url: canonicalUrl,
      siteName: 'AILIQ',
      images: [
        {
          url: tool.images[0] || '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${tool.name} - AI Tool`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@AILIQDirectory',
      creator: '@AILIQDirectory',
      title: `${tool.name} | AILIQ`,
      description: tool.short_description,
      images: [tool.images[0] || '/og-image.png'],
    },
  }
}

export default async function ToolDetailPage({ params }: ToolDetailPageProps) {
  const { slug } = await params
  const tool = await fetchToolBySlug(slug)

  if (!tool) {
    notFound()
  }

  const relatedTools = await getRelatedTools(slug, 3)

  // Structured data schemas
  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.short_description,
    url: tool.official_url || `https://www.ailiq.xyz/tools/${tool.slug}`,
    applicationCategory: 'Productivity',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tool.rating.toFixed(1),
      ratingCount: tool.review_count || 0,
    },
    offers: tool.pricing_tiers.length > 0
      ? tool.pricing_tiers.map((tier) => ({
          '@type': 'Offer',
          name: tier.name,
          price: tier.price.includes('Free') ? '0' : tier.price.replace('$', '').split('/')[0],
          priceCurrency: 'USD',
          description: tier.features.join(', '),
        }))
      : undefined,
    image: tool.images[0] || undefined,
  }

  const faqSchema =
    tool.faqs && tool.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: tool.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null

  return (
    <div className="min-h-screen bg-background">
      {/* Structured Data */}
      <Script
        id="software-application-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
      {faqSchema && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/tools" className="hover:text-foreground transition-colors">
            Tools
          </Link>
          <span>/</span>
          <span>{tool.name}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-2">{tool.name}</h1>
                  <p className="text-lg text-muted-foreground">{tool.category}</p>
                </div>
                {tool.featured && (
                  <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100 text-sm font-medium rounded-full whitespace-nowrap">
                    ⭐ Featured
                  </span>
                )}
              </div>

              {/* Rating and Links */}
              <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-border">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-foreground">{tool.rating.toFixed(1)}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.round(tool.rating) ? 'text-amber-400' : 'text-gray-300'}>
                        ★
                      </span>
                    ))}
                  </div>
                  {tool.review_count && (
                    <span className="text-sm text-muted-foreground ml-2">({tool.review_count} reviews)</span>
                  )}
                </div>

                {tool.official_url && (
                  <a
                    href={tool.official_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded hover:bg-primary/90 transition-colors"
                  >
                    Visit Official Site
                  </a>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">About {tool.name}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {tool.full_description || tool.short_description}
              </p>
            </div>

            {/* Pros & Cons */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-green-600">✓</span> Pros
                </h3>
                <ul className="space-y-2">
                  {tool.pros.map((pro, i) => (
                    <li key={i} className="text-muted-foreground text-sm">
                      • {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-red-600">✗</span> Cons
                </h3>
                <ul className="space-y-2">
                  {tool.cons.map((con, i) => (
                    <li key={i} className="text-muted-foreground text-sm">
                      • {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pricing Tiers */}
            {tool.pricing_tiers.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">Pricing Plans</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {tool.pricing_tiers.map((tier, i) => (
                    <div key={i} className="border border-border rounded-lg p-6 bg-card">
                      <h3 className="font-semibold text-foreground mb-2">{tier.name}</h3>
                      <p className="text-2xl font-bold text-foreground mb-4">{tier.price}</p>
                      <ul className="space-y-2">
                        {tier.features.map((feature, j) => (
                          <li key={j} className="text-sm text-muted-foreground">
                            ✓ {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs */}
            {tool.faqs.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {tool.faqs.map((faq, i) => (
                    <details key={i} className="border border-border rounded-lg p-4 cursor-pointer group">
                      <summary className="font-semibold text-foreground group-open:text-primary">
                        {faq.question}
                      </summary>
                      <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Info Card */}
            <div className="sticky top-24 space-y-6">
              {/* Pricing Badge */}
              <div className="border border-border rounded-lg p-6 bg-card">
                <h3 className="font-semibold text-foreground mb-4">Pricing Model</h3>
                <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-sm font-medium rounded capitalize">
                  {tool.price.replace('-', ' ')}
                </span>
              </div>

              {/* Tags */}
              {tool.tags && tool.tags.length > 0 && (
                <div className="border border-border rounded-lg p-6 bg-card">
                  <h3 className="font-semibold text-foreground mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tool.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-secondary/50 text-secondary-foreground text-xs rounded capitalize"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Primary CTA - Affiliate Link */}
              {tool.affiliate_url && (
                <div className="border-2 border-primary rounded-lg p-6 bg-primary/5">
                  <h3 className="font-semibold text-foreground mb-3">Get Started</h3>
                  <a
                    href={tool.affiliate_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-3 bg-primary text-primary-foreground font-semibold rounded text-center hover:bg-primary/90 transition-colors mb-3"
                  >
                    Visit {tool.name}
                  </a>
                  <p className="text-xs text-muted-foreground text-center">
                    We may earn a small affiliate commission at no extra cost to you.
                  </p>
                </div>
              )}

              {/* Affiliate Disclosure */}
              <div className="border border-amber-200 dark:border-amber-900 rounded-lg p-4 bg-amber-50 dark:bg-amber-950/30">
                <div className="flex gap-2">
                  <div className="text-amber-600 dark:text-amber-400 font-bold mt-0.5">ℹ️</div>
                  <div className="text-xs text-amber-900 dark:text-amber-100">
                    <p className="font-semibold mb-1">Affiliate Disclosure</p>
                    <p>
                      AILIQ is a participant in affiliate programs. We may earn commissions when you click and purchase through affiliate links.
                      Our reviews remain independent and objective.{' '}
                      <Link href="/affiliate-disclosure" className="underline hover:no-underline">
                        Learn more
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div className="mt-16 pt-12 border-t border-border">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Similar Tools</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedTools.map((relatedTool) => (
                <Link key={relatedTool.id} href={`/tools/${relatedTool.slug}`}>
                  <div className="p-6 border border-border rounded-lg bg-card hover:border-primary/50 transition-all hover:shadow-md h-full flex flex-col">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{relatedTool.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">{relatedTool.short_description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground">{relatedTool.rating.toFixed(1)} ★</span>
                      <span className="text-xs text-muted-foreground capitalize">{relatedTool.price.replace('-', ' ')}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="mt-12 pt-6 border-t border-border">
          <Link href="/tools" className="text-primary hover:text-primary/80 transition-colors">
            ← Back to All Tools
          </Link>
        </div>
      </div>
    </div>
  )
}
