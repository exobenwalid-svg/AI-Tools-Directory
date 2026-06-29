import { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import Script from 'next/script'
import {
  fetchComparisonPair,
  getAllComparisonPairs,
  parseComparisonSlug,
  generateComparisonSlug,
} from '@/lib/tools/comparison-queries'
import { fetchTools } from '@/lib/tools/queries'
import { ComparisonDetail } from '@/components/compare/comparison-detail'

interface ComparisonPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ComparisonPageProps): Promise<Metadata> {
  const { slug } = await params
  const parsed = parseComparisonSlug(slug)

  if (!parsed) {
    return {
      title: 'Invalid Comparison',
      robots: { index: false, follow: false },
    }
  }

  const canonicalSlug = generateComparisonSlug(parsed.slugA, parsed.slugB)

  const pair = await fetchComparisonPair(parsed.slugA, parsed.slugB)

  if (!pair) {
    return {
      title: 'Comparison Not Found',
      robots: { index: false, follow: false },
    }
  }

  const { toolA, toolB } = pair
  const title = `${toolA.name} vs ${toolB.name}: Complete Comparison | AILIQ`
  const description = `Compare ${toolA.name} and ${toolB.name} side-by-side. See pricing, features, pros, cons, and best use cases.`
  const url = `https://www.ailiq.xyz/compare/${canonicalSlug}`

  return {
    title,
    description,
    keywords: [
      `${toolA.name} vs ${toolB.name}`,
      toolA.name,
      toolB.name,
      'tool comparison',
      'AI comparison',
    ],
    alternates: {
      canonical: url,
    },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: 'website',
      url,
      siteName: 'AILIQ',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${toolA.name} vs ${toolB.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@AILIQDirectory',
      title,
      description,
      images: ['/og-image.png'],
    },
  }
}

export async function generateStaticParams() {
  const pairs = await getAllComparisonPairs()
  return pairs.map((pair) => ({
    slug: generateComparisonSlug(pair.slugA, pair.slugB),
  }))
}

export default async function ComparisonPage({ params }: ComparisonPageProps) {
  const { slug } = await params
  const parsed = parseComparisonSlug(slug)

  if (!parsed) {
    notFound()
  }

  const canonicalSlug = generateComparisonSlug(parsed.slugA, parsed.slugB)

  if (slug !== canonicalSlug) {
    redirect(`/compare/${canonicalSlug}`)
  }

  const pair = await fetchComparisonPair(parsed.slugA, parsed.slugB)

  if (!pair) {
    notFound()
  }

  const { toolA, toolB } = pair
  const allTools = await fetchTools()

  const comparisonSchema = {
    '@context': 'https://schema.org',
    '@type': 'ComparisonChart',
    name: `${toolA.name} vs ${toolB.name}`,
    itemReviewed: [
      {
        '@type': 'SoftwareApplication',
        name: toolA.name,
        url: toolA.official_url || `https://www.ailiq.xyz/tools/${toolA.slug}`,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: toolA.rating.toFixed(1),
          ratingCount: toolA.review_count || 0,
        },
      },
      {
        '@type': 'SoftwareApplication',
        name: toolB.name,
        url: toolB.official_url || `https://www.ailiq.xyz/tools/${toolB.slug}`,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: toolB.rating.toFixed(1),
          ratingCount: toolB.review_count || 0,
        },
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      <Script
        id="comparison-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(comparisonSchema),
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/compare" className="hover:text-foreground transition-colors">
            Compare
          </Link>
          <span>/</span>
          <span>
            {toolA.name} vs {toolB.name}
          </span>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {toolA.name} vs {toolB.name}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A comprehensive side-by-side comparison of two popular AI tools. Compare features, pricing, strengths, and best use cases.
          </p>
        </div>

        <ComparisonDetail toolA={toolA} toolB={toolB} allTools={allTools} />

        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">Learn more about each tool:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href={`/tools/${toolA.slug}`}
              className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-card/50 transition-colors"
            >
              <h3 className="font-semibold text-foreground mb-1">{toolA.name} Details</h3>
              <p className="text-sm text-muted-foreground">{toolA.short_description}</p>
            </Link>
            <Link
              href={`/tools/${toolB.slug}`}
              className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-card/50 transition-colors"
            >
              <h3 className="font-semibold text-foreground mb-1">{toolB.name} Details</h3>
              <p className="text-sm text-muted-foreground">{toolB.short_description}</p>
            </Link>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6">Other Comparisons</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {allTools
              .filter((t) => t.slug !== toolA.slug && t.slug !== toolB.slug)
              .slice(0, 3)
              .map((tool) => {
                const comparisonSlug = generateComparisonSlug(toolA.slug, tool.slug)

                return (
                  <Link
                    key={tool.id}
                    href={`/compare/${comparisonSlug}`}
                    className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-card/50 transition-colors"
                  >
                    <h3 className="font-semibold text-foreground mb-1">
                      {toolA.name} vs {tool.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">Compare →</p>
                  </Link>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}
