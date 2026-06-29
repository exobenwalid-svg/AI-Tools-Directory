'use client'

import { useState, useMemo } from 'react'
import { Tool, ToolCategory } from '@/lib/tools/types'
import { ToolCard } from './tool-card'
import { FilterSidebar } from './filter-sidebar'
import { SearchBar } from './search-bar'

interface ToolsContainerProps {
  tools: Tool[]
  categories: ToolCategory[]
}

export function ToolsContainer({ tools, categories }: ToolsContainerProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null)

  // Calculate tool counts by category
  const toolCountsByCategory = useMemo(() => {
    const counts: Record<string, number> = {}
    categories.forEach((cat) => {
      counts[cat.name] = tools.filter((t) => t.category === cat.name).length
    })
    return counts
  }, [tools, categories])

  // Filter tools based on all criteria
  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      // Category filter
      if (selectedCategory && tool.category !== selectedCategory) {
        return false
      }

      // Price filter
      if (selectedPrice && tool.price !== selectedPrice) {
        return false
      }

      // Search filter (matches name, description, category, tags)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const matchesName = tool.name.toLowerCase().includes(query)
        const matchesDescription = tool.short_description.toLowerCase().includes(query)
        const matchesCategory = tool.category.toLowerCase().includes(query)
        const matchesTags = tool.tags?.some((tag) => tag.toLowerCase().includes(query)) || false

        if (!matchesName && !matchesDescription && !matchesCategory && !matchesTags) {
          return false
        }
      }

      return true
    })
  }, [tools, selectedCategory, selectedPrice, searchQuery])

  // Sort options
  const sortedTools = useMemo(() => {
    const sorted = [...filteredTools]
    // Default sort: featured first, then by rating, then by name
    sorted.sort((a, b) => {
      if (a.featured !== b.featured) return b.featured ? 1 : -1
      if (a.rating !== b.rating) return b.rating - a.rating
      return a.name.localeCompare(b.name)
    })
    return sorted
  }, [filteredTools])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar */}
      <div className="lg:col-span-1">
        <div className="sticky top-24 space-y-6">
          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            selectedPrice={selectedPrice}
            onCategoryChange={setSelectedCategory}
            onPriceChange={setSelectedPrice}
            toolCounts={toolCountsByCategory}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {sortedTools.length === 0 ? 'No tools found' : `${sortedTools.length} tool${sortedTools.length !== 1 ? 's' : ''} found`}
          </p>
        </div>

        {/* Tools Grid */}
        {sortedTools.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {sortedTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mb-4 text-4xl opacity-20">🔍</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No tools found</h3>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              Try adjusting your filters or search terms to find what you&apos;re looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory(null)
                setSelectedPrice(null)
              }}
              className="inline-flex items-center justify-center px-6 py-2 bg-primary text-primary-foreground font-medium rounded hover:bg-primary/90 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Footer Info */}
        {sortedTools.length > 0 && (
          <div className="mt-12 p-6 bg-secondary/10 border border-secondary/20 rounded-lg text-center text-sm text-muted-foreground">
            Showing all {sortedTools.length} available tool{sortedTools.length !== 1 ? 's' : ''}. More tools coming soon as AILIQ grows.
          </div>
        )}
      </div>
    </div>
  )
}
