import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

const canonicalUrl = 'https://www.ailiq.xyz/'

export const metadata: Metadata = {
  title: 'Best AI Tools Directory 2026 | Reviews, Categories & Comparisons | AILIQ',
  description:
    'Discover the best AI tools for writing, SEO, research, meetings, design, productivity, and more. Browse reviews, categories, ratings, and practical comparisons on AILIQ.',
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: 'Best AI Tools Directory 2026 | AILIQ',
    description:
      'Explore AI tools by category with reviews, ratings, and practical comparisons.',
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
      'Explore AI tools by category with reviews, ratings, and practical comparisons.',
    images: ['https://www.ailiq.xyz/og-image.png'],
  },
}

export default function HomePage() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AILIQ',
    url: canonicalUrl,
    description:
      'Discover the best AI tools for writing, SEO, research, meetings, design, productivity, and more.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.ailiq.xyz/tools',
      'query-input': 'required name=search_term_string',
    },
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AILIQ',
    url: canonicalUrl,
    logo: 'https://www.ailiq.xyz/logo.png',
    sameAs: ['https://x.com/AILIQDirectory'],
  }

  return (
    <main className="min-h-screen bg-background">
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
          Discover the Best AI Tools
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-balance">
          Explore AI tools for writing, SEO, research, meetings, design,
          productivity, and more with category pages, tool reviews, ratings, and
          practical comparisons on AILIQ.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/tools"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Browse Tools →
          </Link>
          <Link
            href="/categories"
            className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/80 transition-colors"
          >
            Browse Categories
          </Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-2xl border border-border bg-card p-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            What you can do on AILIQ
          </h2>
          <div className="space-y-4 text-muted-foreground leading-7">
            <p>
              AILIQ helps you discover AI tools more efficiently by organizing
              them into focused categories and reviewable tool pages. Instead of
              jumping between product websites, you can browse tools by workflow,
              compare options, and find the right fit faster.
            </p>
            <p>
              Whether you are looking for AI writing tools, SEO tools, research
              assistants, meeting tools, or design products, the goal is to make
              exploration simpler and more practical.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 border border-border rounded-lg bg-card hover:border-primary/50 transition-colors">
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Explore by category
            </h2>
            <p className="text-muted-foreground">
              Browse focused category pages for AI writing, SEO, design,
              research, meetings, and more.
            </p>
            <Link
              href="/categories"
              className="mt-4 inline-flex text-sm font-medium text-primary hover:text-primary/80"
            >
              View categories
            </Link>
          </div>

          <div className="p-6 border border-border rounded-lg bg-card hover:border-primary/50 transition-colors">
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Discover tool pages
            </h2>
            <p className="text-muted-foreground">
              Visit detailed tool pages with ratings, pricing models, FAQs, and
              related tool suggestions.
            </p>
            <Link
              href="/tools"
              className="mt-4 inline-flex text-sm font-medium text-primary hover:text-primary/80"
            >
              Browse tools
            </Link>
          </div>

          <div className="p-6 border border-border rounded-lg bg-card hover:border-primary/50 transition-colors">
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Compare workflows
            </h2>
            <p className="text-muted-foreground">
              Use category hubs and related tool links to evaluate different AI
              options for your workflow and use case.
            </p>
            <Link
              href="/tools"
              className="mt-4 inline-flex text-sm font-medium text-primary hover:text-primary/80"
            >
              Start exploring
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Start exploring AI tools
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Browse tools, explore categories, and discover better AI options for
            writing, research, SEO, design, and productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tools"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              View All Tools
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center justify-center px-8 py-3 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/80 transition-colors"
            >
              View Categories
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
