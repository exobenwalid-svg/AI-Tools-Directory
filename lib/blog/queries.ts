/**
 * Blog queries layer
 * Handles fetching blog articles from any data source
 * Currently uses seed data, but compatible with Supabase
 */

import { BlogArticle, BlogCategory, BlogFilterParams } from './types'

// Import seed data functions
// In production, these would be replaced with Supabase queries
const seedModule = import('@/data/blog/seed/index')

/**
 * Fetch all blog articles
 * In Supabase mode, this would query the articles table
 */
export async function fetchBlogArticles(filters?: BlogFilterParams): Promise<BlogArticle[]> {
  try {
    // Check if Supabase is configured (future enhancement)
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      // TODO: Implement Supabase query
      // return querySupabaseArticles(filters)
    }

    // Use seed data as fallback
    const seed = await seedModule
    let articles = await seed.getBlogArticles()

    // Apply filters
    if (filters?.category) {
      articles = articles.filter((a) => a.category.toLowerCase() === filters.category?.toLowerCase())
    }

    if (filters?.tag) {
      articles = articles.filter((a) => a.tags?.includes(filters.tag?.toLowerCase() || ''))
    }

    // Sort
    const sort = filters?.sort || 'newest'
    if (sort === 'newest') {
      articles.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    } else if (sort === 'oldest') {
      articles.sort((a, b) => new Date(a.published_at).getTime() - new Date(b.published_at).getTime())
    }

    // Pagination
    const page = filters?.page || 1
    const per_page = filters?.per_page || 10
    const start = (page - 1) * per_page
    const end = start + per_page

    return articles.slice(start, end)
  } catch (error) {
    console.error('[v0] Error fetching blog articles:', error)
    return []
  }
}

/**
 * Fetch a single article by slug
 */
export async function fetchBlogArticleBySlug(slug: string): Promise<BlogArticle | null> {
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      // TODO: Implement Supabase query
    }

    const seed = await seedModule
    return await seed.getBlogArticleBySlug(slug)
  } catch (error) {
    console.error('[v0] Error fetching article by slug:', error)
    return null
  }
}

/**
 * Get featured articles for homepage
 */
export async function getFeaturedBlogArticles(limit = 3): Promise<BlogArticle[]> {
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      // TODO: Implement Supabase query
    }

    const seed = await seedModule
    const articles = await seed.getBlogArticles()
    return articles.filter((a) => a.featured).slice(0, limit)
  } catch (error) {
    console.error('[v0] Error fetching featured articles:', error)
    return []
  }
}

/**
 * Get all blog categories
 */
export async function getBlogCategories(): Promise<BlogCategory[]> {
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      // TODO: Implement Supabase query
    }

    const seed = await seedModule
    const articles = await seed.getBlogArticles()

    // Extract unique categories and count articles
    const categoryMap = new Map<string, number>()
    articles.forEach((article) => {
      const current = categoryMap.get(article.category) || 0
      categoryMap.set(article.category, current + 1)
    })

    return Array.from(categoryMap).map(([name, count]) => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      count,
    }))
  } catch (error) {
    console.error('[v0] Error fetching categories:', error)
    return []
  }
}

/**
 * Search blog articles
 */
export async function searchBlogArticles(query: string): Promise<BlogArticle[]> {
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      // TODO: Implement Supabase full-text search
    }

    const seed = await seedModule
    return await seed.searchBlogArticles(query)
  } catch (error) {
    console.error('[v0] Error searching articles:', error)
    return []
  }
}

/**
 * Get articles related to specific tools
 * Used to link from tool pages to relevant articles
 */
export async function getBlogArticlesByTools(toolSlugs: string[]): Promise<BlogArticle[]> {
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      // TODO: Implement Supabase query
    }

    const seed = await seedModule
    const articles = await seed.getBlogArticles()
    const slugSet = new Set(toolSlugs.map((s) => s.toLowerCase()))

    return articles.filter((article) => article.related_tools?.some((slug) => slugSet.has(slug.toLowerCase())))
  } catch (error) {
    console.error('[v0] Error fetching articles by tools:', error)
    return []
  }
}

/**
 * Get total article count
 */
export async function getBlogArticleCount(): Promise<number> {
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      // TODO: Implement Supabase count
    }

    const seed = await seedModule
    const articles = await seed.getBlogArticles()
    return articles.length
  } catch (error) {
    console.error('[v0] Error counting articles:', error)
    return 0
  }
}
