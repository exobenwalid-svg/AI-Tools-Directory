import type { Metadata } from 'next'
import { fetchTools, getCategories } from '@/lib/tools/queries'
import { ToolsContainer } from '@/components/tools/tools-container'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'AI Tools Directory',
  description:
    'Discover and compare AI tools with expert reviews, ratings, and detailed comparisons. Browse our curated directory of the best AI solutions.',
  keywords: ['AI tools', 'AI directory', 'AI comparison', 'AI reviews'],
}

export default async function ToolsPage() {
  const [tools, categories] = await Promise.all([
    fetchTools(),
    getCategories(),
  ])

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="mb-3 text-4xl font-bold text-foreground">
            AI Tools Directory
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Explore our curated collection of the best AI tools available today.
            Filter by category, pricing, and more to find the right solution for
            your needs.
          </p>
        </div>

        <ToolsContainer tools={tools} categories={categories} />
      </div>
    </div>
  )
}
