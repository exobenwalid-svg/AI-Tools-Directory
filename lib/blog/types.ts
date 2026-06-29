/**
 * Blog article types - normalized frontend representation
 * Independent of data source (Supabase, seed data, etc.)
 */

export type BlogAuthor = {
  id: string
  name: string
  email: string
  bio?: string
  avatar?: string
}

export type BlogArticle = {
  id: string
  slug: string
  title: string
  excerpt: string
  body: string
  category: string
  author: BlogAuthor
  published_at: string
  updated_at: string
  featured_image?: string
  tags?: string[]
  related_tools?: string[] // Tool slugs
  related_articles?: string[] // Article slugs
  comparison_pair?: {
    slugA: string
    slugB: string
  }
  reading_time?: number // Estimated minutes
  featured?: boolean
}

export type BlogCategory = {
  id: string
  name: string
  slug: string
  description?: string
  count?: number
}

export type BlogSearchResult = {
  articles: BlogArticle[]
  total: number
  query: string
}

export type BlogFilterParams = {
  category?: string
  tag?: string
  sort?: 'newest' | 'oldest' | 'popular'
  page?: number
  per_page?: number
}
