'use client'

import Link from 'next/link'
import { Tool } from '@/lib/tools/types'

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link href={`/tools/${tool.slug}`}>
      <div className="p-6 border border-border rounded-lg bg-card hover:border-primary/50 transition-all hover:shadow-md h-full flex flex-col">
        {/* Header with Featured Badge */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1">{tool.name}</h3>
            <p className="text-sm text-muted-foreground">{tool.category}</p>
          </div>
          {tool.featured && (
            <span className="ml-2 px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100 text-xs font-medium rounded">
              ⭐ Featured
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
          {tool.short_description}
        </p>

        {/* Rating and Price Row */}
        <div className="flex items-center justify-between mb-4 pb-4 border-t border-border pt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">{tool.rating.toFixed(1)}</span>
            <span className="text-amber-400">★</span>
            {tool.review_count && (
              <span className="text-xs text-muted-foreground">({tool.review_count})</span>
            )}
          </div>
          <span className="inline-block px-2.5 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded capitalize">
            {tool.price.replace('-', ' ')}
          </span>
        </div>

        {/* CTA */}
        <span className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded hover:bg-primary/90 transition-colors w-full">
          View Details →
        </span>
      </div>
    </Link>
  )
}
