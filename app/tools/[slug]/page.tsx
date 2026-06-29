import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import { fetchToolBySlug, getRelatedTools } from '@/lib/tools/queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface ToolDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: ToolDetailPageProps
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
  const ratingValue = Number(tool.rating || 0).toFixed(1)
  const reviewCount = tool.review_count || 0
  const imageUrl = tool.images?.[0] || '/og-image.png'

  return {
    title: `${tool.name} - AI Tool Review & Pricing | AILIQ`,
    description: `${tool.name} review: ${tool.short_description} Pricing: ${tool.price}. Rating: ${ratingValue} stars (${reviewCount} reviews).`,
    keywords: [
      tool.name,
      `${tool.name} review`,
      `${tool.name} pricing`,
      tool.category || 'AI tool',
      'AI tool',
      'AI software',
      ...(tool.tags || []),
    ],
    alternates: {
      canonical: canonicalUrl,
    },
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
          url: imageUrl,
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
      images: [imageUrl],
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

  const pricingTiers = tool.pricing_tiers || []
  const faqs = tool.faqs || []
  const pros = tool.pros || []
  const cons = tool.cons || []
  const images = tool.images || []
  const tags = tool.tags || []

  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.short_description,
    url: tool.official_url || `https://www.ailiq.xyz/tools/${tool.slug}`,
    applicationCategory: tool.category || 'AI Tool',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: Number(tool.rating || 0).toFixed(1),
      ratingCount: tool.review_count || 0,
    },
    offers:
      pricingTiers.length > 0
        ? pricingTiers.map((tier) => ({
            '@type': 'Offer',
            name: tier.name,
            price: tier.price?.includes('Free')
              ? '0'
              : (tier.price || '').replace('$', '').split('/')[0],
            priceCurrency: 'USD',
            description: Array.isArray(tier.features) ? tier.features.join(', ') : '',
          }))
        : undefined,
    image: images[0] || undefined,
  }

  const faqSchema =
    faqs.length > 0
      ? {
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
      : null

  return (
    <div className="min-h-screen bg-background">
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

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/tools" className="transition-colors hover:text-foreground">
            Tools
          </Link>
          <span>/</span>
          <span>{tool.name}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h1 className="mb-2 text-4xl font-bold text-foreground">{tool.name}</h1>
                  <p className="text-lg text-muted-foreground">{tool.category || 'AI Tool'}</p>
                </div>
                {tool.featured && (
                  <span className="whitespace-nowrap rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-900 dark:bg-amber-900 dark:text-amber-100">
                    ⭐ Featured
                  </span>
                )}
              </div>

              <div className="mb-6 flex flex-wrap items-center gap-4 border-b border-border pb-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-foreground">
                    {Number(tool.rating || 0).toFixed(1)}
                  </span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={i < Math.round(Number(tool.rating || 0)) ? 'text-amber-400' : 'text-gray-300'}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  {tool.review_count ? (
                    <span className="ml-2 text-sm text-muted-foreground">
                      ({tool.review_count} reviews)
                    </span>
                  ) : null}
                </div>

                {tool.official_url && (
                  <a
                    href={tool.official_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Visit Official Site
                  </a>
                )}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="mb-4 text-xl font-semibold text-foreground">About {tool.name}</h2>
              <p className="leading-relaxed text-muted-foreground">
                {tool.full_description || tool.short_description}
              </p>
            </div>

            <div className="mb-8 grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
                  <span className="text-green-600">✓</span> Pros
                </h3>
                <ul className="space-y-2">
                  {pros.map((pro, i) => (
                    <li key={i} className="text-sm text-muted-foreground">
                      • {pro}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
                  <span className="text-red-600">✗</span> Cons
                </h3>
                <ul className="space-y-2">
                  {cons.map((con, i) => (
                    <li key={i} className="text-sm text-muted-foreground">
                      • {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {pricingTiers.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-4 text-xl font-semibold text-foreground">Pricing Plans</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {pricingTiers.map((tier, i) => (
                    <div key={i} className="rounded-lg border border-border bg-card p-6">
                      <h3 className="mb-2 font-semibold text-foreground">{tier.name}</h3>
                      <p className="mb-4 text-2xl font-bold text-foreground">{tier.price}</p>
                      <ul className="space-y-2">
                        {(tier.features || []).map((feature, j) => (
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

            {faqs.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-4 text-xl font-semibold text-foreground">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqs.map((faq, i) => (
                    <details key={i} className="group cursor-pointer rounded-lg border border-border p-4">
                      <summary className="font-semibold text-foreground group-open:text-primary">
                        {faq.question}
                      </summary>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="mb-4 font-semibold text-foreground">Pricing Model</h3>
                <span className="inline-block rounded bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground capitalize">
                  {(tool.price || '').replace(/-/g, ' ')}
                </span>
              </div>

              {tags.length > 0 && (
                <div className="rounded-lg border border-border bg-card p-6">
                  <h3 className="mb-4 font-semibold text-foreground">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-secondary/50 px-2 py-1 text-xs text-secondary-foreground capitalize"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {tool.affiliate_url && (
                <div className="rounded-lg border-2 border-primary bg-primary/5 p-6">
                  <h3 className="mb-3 font-semibold text-foreground">Get Started</h3>
                  <a
                    href={tool.affiliate_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-3 block w-full rounded bg-primary px-4 py-3 text-center font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Visit {tool.name}
                  </a>
                  <p className="text-center text-xs text-muted-foreground">
                    This page may include affiliate links.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {relatedTools.length > 0 && (
          <div className="mt-16 border-t border-border pt-12">
            <h2 className="mb-6 text-2xl font-semibold text-foreground">Similar Tools</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedTools.map((relatedTool) => (
                <Link key={relatedTool.id} href={`/tools/${relatedTool.slug}`}>
                  <div className="flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-md">
                    <h3 className="mb-2 text-lg font-semibold text-foreground">{relatedTool.name}</h3>
                    <p className="mb-4 flex-1 text-sm text-muted-foreground">
                      {relatedTool.short_description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground">
                        {Number(relatedTool.rating || 0).toFixed(1)} ★
                      </span>
                      <span className="text-xs capitalize text-muted-foreground">
                        {(relatedTool.price || '').replace(/-/g, ' ')}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 border-t border-border pt-6">
          <Link href="/tools" className="text-primary transition-colors hover:text-primary/80">
            ← Back to All Tools
          </Link>
        </div>
      </div>
    </div>
  )
}
