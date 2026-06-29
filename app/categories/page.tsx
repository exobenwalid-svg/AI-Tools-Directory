import Link from 'next/link'
import { getCategories } from '@/lib/tools/queries'

export const metadata = {
  title: 'AI Tool Categories | ailiq',
  description:
    'Browse AI tool categories on ailiq, including writing, SEO, design, research, meeting assistants, and more.',
  alternates: {
    canonical: 'https://www.ailiq.xyz/categories',
  },
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          AI Tool Categories
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-600">
          Explore AI tool categories across writing, SEO, research, design, video,
          productivity, and other workflows.
        </p>
      </header>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <article
            key={category.slug}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-gray-900">
              <Link href={`/categories/${category.slug}`} className="hover:underline">
                {category.name}
              </Link>
            </h2>
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
