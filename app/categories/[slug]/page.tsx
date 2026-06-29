import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCategories, fetchTools } from '@/lib/tools/queries'

type PageProps = {
  params: Promise<{
    slug: string
  }>
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

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-900">
          Home
        </Link>{' '}
        /{' '}
        <Link href="/tools" className="hover:text-gray-900">
          Tools
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <article
              key={tool.slug}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  <Link href={`/tools/${tool.slug}`} className="hover:underline">
                    {tool.name}
                  </Link>
                </h2>
                <span className="text-sm font-medium text-gray-500">{tool.rating}</span>
              </div>

              <p className="mb-4 text-sm leading-6 text-gray-600">
                {tool.short_description}
              </p>

              <div className="mb-4 flex flex-wrap gap-2 text-xs text-gray-500">
                {tool.price && (
                  <span className="rounded-full bg-gray-100 px-3 py-1">{tool.price}</span>
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
                Read review
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900">How to choose</h2>
        <div className="mt-4 max-w-3xl space-y-4 text-gray-600">
          <p>
            Compare tools based on your actual workflow. Some tools are better for SEO
            content, others are stronger for marketing copy, long-form writing, editing,
            or collaboration.
          </p>
          <p>
            Look at pricing, strengths, content quality, and how well each tool fits your
            team or publishing workflow before choosing one.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900">Related categories</h2>
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
                {c.name}
              </Link>
            ))}
        </div>
      </section>
    </main>
  )
}
