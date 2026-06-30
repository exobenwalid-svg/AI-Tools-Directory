import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { fetchTools } from '@/lib/tools/queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const canonicalUrl = 'https://www.ailiq.xyz/tools'

export const metadata: Metadata = {
  title: 'Best AI Tools Directory 2026 | Reviews, Ratings & Categories | AILIQ',
  description:
    'Browse the best AI tools in 2026 by category. Discover reviews, ratings, pricing models, and practical comparisons for writing, SEO, research, design, meetings, and more.',
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: 'Best AI Tools Directory 2026 | AILIQ',
    description:
      'Browse AI tools by category with reviews, ratings, pricing, and comparisons.',
    url: canonicalUrl,
    siteName: 'AILIQ',
    type: 'website',
    images: [
      {
        url: 'https://www.ailiq.xyz/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AILIQ AI Tools Directory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools Directory 2026 | AILIQ',
    description:
      'Browse AI tools by category with reviews, ratings, pricing, and comparisons.',
    images: ['https://www.ailiq.xyz/og-image.png'],
  },
}

export default async function ToolsPage() {
  const tools = await fetchTools({ page: 1, per_page: 5000 })

  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Best AI Tools Directory 2026',
    url: canonicalUrl,
    description:
      'Browse AI tools by category with reviews, ratings, pricing, and practical comparisons.',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: tools.slice(0, 100).map((tool, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://www.ailiq.xyz/tools/${tool.slug}`,
        name: tool.name,
      })),
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.ailiq.xyz/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tools',
        item: canonicalUrl,
      },
    ],
  }

  return (
    <main className="min-h-screen bg-background">
      <Script
        id="tools-collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <Script
        id="tools-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>{' '}
          / <span className="text-foreground">Tools</span>
        </nav>

        <header className="mb-10">
          <h1 className="mb-3 text-4xl font-bold text-foreground">
            Best AI Tools Directory
          </h1>
          <p className="max-w-3xl text-lg text-muted-foreground">
            Discover, compare, and explore AI tools for writing, SEO, research,
            meetings, design, productivity, and more. AILIQ helps you browse
            tools by category, pricing model, rating, and real-world use case.
          </p>
        </header>

        <section className="mb-10 max-w-3xl">
          <h2 className="text-2xl font-semibold text-foreground">
            Compare AI tools more effectively
          </h2>
          <div className="mt-3 space-y-4 text-muted-foreground leading-7">
            <p>
              Instead of jumping between official tool websites, you can use
              AILIQ to quickly compare features, pricing models, categories, and
              ratings across a growing directory of AI products.
            </p>
            <p>
              Each tool page is designed to give you a clearer overview of what
              the tool does, who it is best for, and which alternatives you may
              want to consider before making a decision.
            </p>
          </div>
        </section>

        <section className="mb-10 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-2xl font-semibold text-foreground">
            Browse by Category
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Explore category hubs to find the best AI tools for writing, SEO,
            meetings, research, design, and other workflows.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/categories/ai-writing"
              className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Explore AI Writing
            </Link>

            <Link
              href="/categories/ai-seo-tools"
              className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Explore AI SEO Tools
            </Link>

            <Link
              href="/categories/ai-meeting-assistants"
              className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Explore AI Meeting Assistants
            </Link>

            <Link
              href="/categories/ai-design"
              className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Explore AI Design
            </Link>

            <Link
              href="/categories/ai-research-tools"
              className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Explore AI Research Tools
            </Link>

            <Link
              href="/categories"
              className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/15"
            >
              View All Categories
            </Link>
          </div>
        </section>

        {tools.length === 0 ? (
          <section className="rounded-lg border border-border bg-card p-8">
            <h2 className="mb-2 text-xl font-semibold text-foreground">
              No tools found
            </h2>
            <p className="text-muted-foreground">
              No tools are currently available in the directory.
            </p>
          </section>
        ) : (
          <>
            <section className="mb-6">
              <h2 className="text-2xl font-semibold text-foreground">
                Explore AI tools
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Browse {tools.length} AI tools with ratings, pricing models, and
                category information.
              </p>
            </section>

            <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <Link key={tool.id} href={`/tools/${tool.slug}`}>
                  <article className="h-full rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-md">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">
                          {tool.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {tool.category || 'AI Tool'}
                        </p>
                      </div>

                      {tool.featured ? (
                        <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-900 dark:bg-amber-900 dark:text-amber-100">
                          Featured
                        </span>
                      ) : null}
                    </div>

                    <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {tool.short_description}
                    </p>

                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground">
                        {Number(tool.rating || 0).toFixed(1)} ★
                      </span>
                      <span className="text-muted-foreground">
                        {(tool.price || 'N/A').replace(/-/g, ' ')}
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </section>
          </>
        )}
      </div>
    </main>
  )
}
