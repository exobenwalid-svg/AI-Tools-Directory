import { Metadata } from 'next'
import { fetchTools, getCategories } from '@/lib/tools/queries'
import { ToolsContainer } from '@/components/tools/tools-container'

export const metadata: Metadata = {
  title: 'AI Tools Directory',
  description: 'Discover and compare AI tools with expert reviews, ratings, and detailed comparisons. Browse our curated directory of the best AI solutions.',
  keywords: ['AI tools', 'AI directory', 'AI comparison', 'AI reviews'],
}

export default async function ToolsPage() {
  // Fetch data server-side
  const [tools, categories] = await Promise.all([
    fetchTools(),
    getCategories(),
  ])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-3">AI Tools Directory</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore our curated collection of the best AI tools available today. Filter by category, pricing, and more to find the perfect solution for your needs.
          </p>
        </div>

        {/* Tools Container with Filters */}
        <ToolsContainer tools={tools} categories={categories} />
      </div>
    </div>
  )
}
