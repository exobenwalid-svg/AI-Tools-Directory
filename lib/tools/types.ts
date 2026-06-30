/**
 * Tool types - normalized frontend representation
 * These types are independent of the data source (Supabase, seed data, etc.)
 */

export type PricingTier = {
  name: string
  price: string
  features: string[]
  best_for?: string
}

export type ToolFAQ = {
  question: string
  answer: string
}

export type CategoryFAQ = {
  q: string
  a: string
}

export type Tool = {
  id: string
  slug: string
  name: string
  category: string
  price: string // 'free', 'freemium', 'paid', 'enterprise', etc.
  short_description: string
  full_description?: string
  rating: number // 0-5
  review_count?: number
  pros: string[]
  cons: string[]
  affiliate_url?: string
  official_url?: string
  images: string[] // Image URLs
  pricing_tiers: PricingTier[]
  faqs: ToolFAQ[]
  alternatives: string[] // Slugs of alternative tools
  featured: boolean
  created_at: string
  updated_at: string
  tags?: string[]
}

export type ToolCategory = {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  count?: number
  intro_title?: string
  intro_description?: string
  seo_title?: string
  seo_description?: string
  faqs?: CategoryFAQ[]
}

export type SearchResult = {
  tools: Tool[]
  total: number
  query: string
}

export type PaginationParams = {
  page: number
  per_page: number
}

export type SortOption = 'newest' | 'rating' | 'name'

export type FilterParams = {
  category?: string
  price_range?: 'free' | 'freemium' | 'paid'
  min_rating?: number
  sort?: SortOption
  page?: number
  per_page?: number
}
