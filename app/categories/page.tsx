import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { getCategories } from '@/lib/tools/queries'

const canonicalUrl = 'https://www.ailiq.xyz/categories'

export const metadata: Metadata = {
  title: 'Best AI Tool Categories 2026 | Writing, SEO, Design & More | AILIQ',
  description:
    'Browse AI tool categories on AILIQ, including writing, SEO, design, research, meeting assistants, productivity, and more.',
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: 'Best AI Tool Categories 2026 | AILIQ',
    description:
      'Explore AI tool categories for writing, SEO, design, research, meetings, productivity, and more.',
    url: canonicalUrl,
    siteName: 'AILIQ',
    type: 'website',
    images: [
      {
        url: 'https://www.ailiq.xyz/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AILIQ AI Tool Categories',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tool Categories 2026 | AILIQ',
    description:
      'Explore AI tool categories for writing, SEO, design, research, meetings, productivity, and more.',
    images: ['https://www.ailiq.xyz/og-image.png'],
  },
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'AI Tool Categories',
    url: canonicalUrl,
    description:
      'Browse AI tool categories on AILIQ, including writing, SEO, design, research, meeting assistants, productivity, and more.',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: categories.map((category, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://www.ailiq.xyz/categories/${category.slug}`,
        name: category.name,
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
        name: 'Categories',
        item: canonicalUrl,
      },
    ],
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Script
        id="categories-collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <Script
        id="categories-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-900">
          Home
        </Link>{' '}
        / <span className="text-gray-900">Categories</span>
      </nav>

      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Best AI Tool Categories
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-600">
          Explore AI tool categories across writing, SEO, research, design,
          video, productivity, meeting assistants, and other workflows.
        </p>
      </header>

      <section className="mb-10 max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-900">
          Browse AI tools by workflow
        </h2>
        <div className="mt-3 space-y-4 text-gray-600 leading-7">
          <p>
            Category pages help you discover AI tools faster by grouping similar
            products into focused hubs. Instead of browsing one tool at a time,
            you can compare related options for writing, SEO, meetings, design,
            research, and other use cases.
          </p>
          <p>
            Each category page on AILIQ is designed to help you explore top
            tools, understand use cases, and find relevant alternatives within a
            single workflow.
          </p>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Explore categories
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Browse {categories.length} AI tool categories across multiple
          workflows and use cases.
        </p>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <article
            key={category.slug}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <h3 className="text-xl font-semibold text-gray-900">
              <Link href={`/categories/${category.slug}`} className="hover:underline">
                {category.name}
              </Link>
            </h3>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              {category.intro_description || `Explore the best ${category.name} tools.`}
            </p>
            <Link
              href={`/categories/${category.slug}`}
              className="mt-4 inline-flex text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Explore category
            </Link>
          </article>
        ))}
      </section>
    </main>
  )
}
