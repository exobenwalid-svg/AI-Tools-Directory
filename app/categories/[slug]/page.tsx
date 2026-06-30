import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCategories, fetchTools } from '@/lib/tools/queries'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

type CategoryFaq = {
  q: string
  a: string
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const categories = await getCategories()
  const category = categories.find((c) => c.slug === slug)

  if (!category) {
    return {
      title: 'Category Not Found | ailiq',
      description: 'The requested category could not be found.',
    }
  }

  return {
    title: category.seo_title || `${category.name} | ailiq`,
    description:
      category.seo_description ||
      category.intro_description ||
      `Explore the best ${category.name} tools on ailiq.`,
    alternates: {
      canonical: `https://www.ailiq.xyz/categories/${category.slug}`,
    },
    openGraph: {
      title: category.seo_title || `${category.name} | ailiq`,
      description:
        category.seo_description ||
        category.intro_description ||
        `Explore the best ${category.name} tools on ailiq.`,
      url: `https://www.ailiq.xyz/categories/${category.slug}`,
      siteName: 'ailiq',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: category.seo_title || `${category.name} | ailiq`,
      description:
        category.seo_description ||
        category.intro_description ||
        `Explore the best ${category.name} tools on ailiq.`,
    },
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const categories = await getCategories()
  const category = categories.find((c) => c.slug === slug)

  if (!category) {
    notFound()
  }

  const tools = await fetchTools({
    category: slug,
    per_page: 100,
    page: 1,
    sort: 'rating',
  })

  const faqs: CategoryFaq[] = Array.isArray(category.faqs) ? category.faqs : []

  const breadcrumbJsonLd = {
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
        item: 'https://www.ailiq.xyz/categories',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: category.name,
        item: `https://www.ailiq.xyz/categories/${category.slug}`,
      },
    ],
  }

  const faqJsonLd =
    faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.a,
            },
          })),
        }
      : null

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-900">
          Home
        </Link>{' '}
        /{' '}
        <Link href="/categories" className="hover:text-gray-900">
          Categories
        </Link>{' '}
        / <span className="text-gray-900">{category.name}</span>
      </nav>

      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          {category.intro_title || category.name}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-600">
          {category.intro_description ||
            `Explore the best ${category.name} tools, reviews, features, pros, cons, alternatives, and use cases.`}
        </p>
      </header>

      <section className="mb-12">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Top {category.name} tools
          </h2>
          <Link
            href="/tools"
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Browse all AI tools
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <article
              key={tool.slug}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-xl font-semibold text-gray-900">
                  <Link href={`/tools/${tool.slug}`} className="hover:underline">
                    {tool.name}
                  </Link>
                </h3>
                <span className="text-sm font-medium text-gray-500">
                  {tool.rating}
                </span>
              </div>

              <p className="mb-4 text-sm leading-6 text-gray-600">
                {tool.short_description}
              </p>

              <div className="mb-4 flex flex-wrap gap-2 text-xs text-gray-500">
                {tool.price && (
                  <span className="rounded-full bg-gray-100 px-3 py-1">
                    {tool.price}
                  </span>
                )}
                {tool.featured && (
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">
                    Featured
                  </span>
                )}
              </div>

              <Link
                href={`/tools/${tool.slug}`}
                className="inline-flex text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Read {tool.name} review
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900">
          How to choose the right {category.name} tool
        </h2>
        <div className="mt-4 max-w-3xl space-y-4 text-gray-600">
          <p>
            Compare tools based on your actual workflow. Some tools are better
            for SEO content, others are stronger for marketing copy, long-form
            writing, editing, collaboration, research, or productivity.
          </p>
          <p>
            Look at pricing, strengths, output quality, feature depth, and how
            well each option fits your individual or team workflow before making
            a decision.
          </p>
        </div>
      </section>

      {faqs.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900">
            Frequently asked questions about {category.name}
          </h2>
          <div className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <article
                key={faq.q}
                className="rounded-2xl border border-gray-200 bg-white p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {faq.q}
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {faq.a}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-semibold text-gray-900">
          Explore related AI tool categories
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {categories
            .filter((c) => c.slug !== category.slug)
            .slice(0, 6)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/categories/${c.slug}`}
                className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Explore {c.name}
              </Link>
            ))}
        </div>
      </section>
    </main>
  )
}
