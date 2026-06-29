'use client'

import { ToolCategory } from '@/lib/tools/types'

interface FilterSidebarProps {
  categories: ToolCategory[]
  selectedCategory: string | null
  selectedPrice: string | null
  onCategoryChange: (category: string | null) => void
  onPriceChange: (price: string | null) => void
  toolCounts: Record<string, number>
}

const priceOptions = [
  { value: 'free', label: 'Free Only', color: 'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100' },
  { value: 'freemium', label: 'Freemium', color: 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100' },
  { value: 'paid', label: 'Paid', color: 'bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100' },
]

export function FilterSidebar({
  categories,
  selectedCategory,
  selectedPrice,
  onCategoryChange,
  onPriceChange,
  toolCounts,
}: FilterSidebarProps) {
  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Categories</h3>
        <div className="space-y-2">
          <button
            onClick={() => onCategoryChange(null)}
            className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
              selectedCategory === null
                ? 'bg-primary text-primary-foreground font-medium'
                : 'text-foreground hover:bg-secondary/50'
            }`}
          >
            All Categories
            <span className="float-right text-xs opacity-75">
              ({Object.values(toolCounts).reduce((a, b) => a + b, 0)})
            </span>
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(selectedCategory === category.name ? null : category.name)}
              className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                selectedCategory === category.name
                  ? 'bg-primary text-primary-foreground font-medium'
                  : 'text-foreground hover:bg-secondary/50'
              }`}
            >
              {category.name}
              <span className="float-right text-xs opacity-75">
                ({toolCounts[category.name] || 0})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Pricing</h3>
        <div className="space-y-2">
          <button
            onClick={() => onPriceChange(null)}
            className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
              selectedPrice === null
                ? 'bg-primary text-primary-foreground font-medium'
                : 'text-foreground hover:bg-secondary/50'
            }`}
          >
            All Pricing
          </button>
          {priceOptions.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onPriceChange(selectedPrice === value ? null : value)}
              className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                selectedPrice === value
                  ? 'bg-primary text-primary-foreground font-medium'
                  : 'text-foreground hover:bg-secondary/50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {(selectedCategory || selectedPrice) && (
        <button
          onClick={() => {
            onCategoryChange(null)
            onPriceChange(null)
          }}
          className="w-full px-4 py-2 border border-border rounded text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors"
        >
          Clear Filters
        </button>
      )}
    </div>
  )
}
