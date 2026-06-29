# Tools Data Layer API

Quick reference for using the AILIQ tools data layer.

## Import Path

```typescript
import { 
  fetchTools,
  fetchToolBySlug,
  fetchToolsByCategory,
  searchTools,
  getRelatedTools,
  getFeaturedTools,
  getCategories
} from '@/lib/tools/queries'

import type { 
  Tool, 
  ToolCategory, 
  FilterParams,
  PricingTier,
  ToolFAQ 
} from '@/lib/tools/types'
```

## Functions

### `fetchTools(filters?: FilterParams): Promise<Tool[]>`

Fetch tools with optional filtering and pagination.

```typescript
// All tools
const tools = await fetchTools()

// Filter by category and sort by rating
const tools = await fetchTools({
  category: 'Writing & Content',
  sort: 'rating',
  page: 1,
  per_page: 20
})

// Free tools only
const free = await fetchTools({
  price_range: 'free'
})

// Highly rated tools
const top = await fetchTools({
  min_rating: 4.5,
  sort: 'rating'
})
```

### `fetchToolBySlug(slug: string): Promise<Tool | null>`

Get a single tool by slug.

```typescript
const tool = await fetchToolBySlug('chatgpt')
if (!tool) {
  // Handle 404
}
```

### `fetchToolsByCategory(category: string, limit?: number): Promise<Tool[]>`

Get tools in a specific category.

```typescript
const writingTools = await fetchToolsByCategory('Writing & Content', 10)
```

### `searchTools(query: string, limit?: number): Promise<Tool[]>`

Search tools by name and description.

```typescript
const results = await searchTools('image generation', 20)
```

### `getRelatedTools(slug: string, limit?: number): Promise<Tool[]>`

Get alternative tools in same category.

```typescript
const alternatives = await getRelatedTools('chatgpt', 5)
```

### `getFeaturedTools(limit?: number): Promise<Tool[]>`

Get featured tools for homepage/marketing.

```typescript
const featured = await getFeaturedTools(6)
```

### `getCategories(): Promise<ToolCategory[]>`

Get all tool categories.

```typescript
const categories = await getCategories()
```

---

## Types

### `Tool`

```typescript
type Tool = {
  id: string
  slug: string
  name: string
  category: string
  price: 'free' | 'freemium' | 'paid' | 'enterprise'
  short_description: string
  full_description?: string
  rating: number // 0-5
  review_count?: number
  pros: string[]
  cons: string[]
  affiliate_url?: string
  official_url?: string
  images: string[]
  pricing_tiers: PricingTier[]
  faqs: ToolFAQ[]
  alternatives: string[] // Slugs
  featured: boolean
  created_at: string
  updated_at: string
  tags?: string[]
}
```

### `ToolCategory`

```typescript
type ToolCategory = {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  count?: number
}
```

### `FilterParams`

```typescript
type FilterParams = {
  category?: string
  price_range?: 'free' | 'freemium' | 'paid' | 'enterprise'
  min_rating?: number
  sort?: 'newest' | 'rating' | 'name'
  page?: number
  per_page?: number
}
```

### `PricingTier`

```typescript
type PricingTier = {
  name: string
  price: string
  features: string[]
  best_for?: string
}
```

### `ToolFAQ`

```typescript
type ToolFAQ = {
  question: string
  answer: string
}
```

---

## Common Patterns

### Tools Page with Categories

```typescript
// app/tools/page.tsx
import { fetchTools, getCategories } from '@/lib/tools/queries'

export default async function ToolsPage({ searchParams }) {
  const category = searchParams.category
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  
  const [tools, categories] = await Promise.all([
    fetchTools({ category, page, per_page: 20 }),
    getCategories()
  ])

  return (
    <>
      <CategoryFilter categories={categories} selected={category} />
      <ToolGrid tools={tools} />
    </>
  )
}
```

### Tool Detail Page

```typescript
// app/tools/[slug]/page.tsx
import { fetchToolBySlug, getRelatedTools } from '@/lib/tools/queries'
import { notFound } from 'next/navigation'

export default async function ToolPage({ params }) {
  const [tool, related] = await Promise.all([
    fetchToolBySlug(params.slug),
    getRelatedTools(params.slug, 5)
  ])

  if (!tool) notFound()

  return (
    <>
      <ToolHeader tool={tool} />
      <ToolDetails tool={tool} />
      <RelatedTools tools={related} />
    </>
  )
}
```

### Search

```typescript
// app/search/page.tsx
import { searchTools } from '@/lib/tools/queries'

export default async function SearchPage({ searchParams }) {
  const query = searchParams.q || ''
  const results = await searchTools(query)

  return (
    <>
      <h1>Search: {query}</h1>
      <p>{results.length} tools found</p>
      <ToolGrid tools={results} />
    </>
  )
}
```

### Featured Tools on Homepage

```typescript
// app/page.tsx
import { getFeaturedTools } from '@/lib/tools/queries'

export default async function HomePage() {
  const featured = await getFeaturedTools(6)

  return (
    <>
      <Hero />
      <FeaturedTools tools={featured} />
    </>
  )
}
```

---

## Notes

- All functions are async (must `await`)
- They work with seed data by default
- Automatically use Supabase when configured
- No error handling needed (return empty arrays on error)
- All responses are fully typed
- Use `Promise.all()` to fetch multiple data sources in parallel
- Cache results using Next.js `cache()` if frequently accessed

---

## Configuration

### Seed Mode (Default)

Works immediately with 8 sample tools from `data/tools/seed/index.ts`

### Supabase Mode

Set these environment variables to switch to Supabase:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
```

See [SUPABASE_SETUP.md](../../SUPABASE_SETUP.md) for detailed instructions.

