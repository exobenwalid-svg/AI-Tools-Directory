import { Metadata } from 'next'
import Link from 'next/link'
import { fetchTools } from '@/lib/tools/queries'
import { getCuratedComparisons } from '@/lib/tools/comparison-queries'
import { CompareToolsContainer } from '@/components/compare/compare-tools-container'

export const metadata: Metadata = {
  title: 'Compare AI Tools | Find the Perfect Solution | AILIQ',
  description:
    'Compare AI tools side-by-side with detailed analysis of features, pricing, and capabilities. Make informed decisions with AILIQ.',
  keywords: ['AI comparison', 'tool comparison', 'AI tools', 'compare tools', 'best AI tools'],
}

export default async function ComparePage() {
  const tools = await fetchTools()
  const curations = getCuratedComparisons()

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-3">Compare AI Tools</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Find the perfect tool by comparing features, pricing, strengths, and use cases side-by-side. Select any two tools to see a detailed comparison.
          </p>
        </div>

        {/* Comparison Selector */}
        <div className="mb-16">
          <CompareToolsContainer tools={tools} />
        </div>

        {/* Curated Comparisons */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Popular Comparisons</h2>
          <p className="text-muted-foreground mb-6">
            Browse our curated comparisons to discover how different AI tools stack up.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {curations.map((comparison) => (
              <Link
                key={`${comparison.slugA}-vs-${comparison.slugB}`}
                href={`/compare/${comparison.slugA}-vs-${comparison.slugB}`}
                className="p-6 border border-border rounded-lg bg-card hover:border-primary/50 hover:bg-card/80 transition-all"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">{comparison.title}</h3>
                <p className="text-sm text-muted-foreground">{comparison.description}</p>
                <div className="mt-4 text-sm text-primary font-medium">View Comparison →</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
