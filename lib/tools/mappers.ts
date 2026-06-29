/**
 * Data mappers - convert Supabase rows to normalized Tool types
 */

import { Tool, ToolCategory } from './types'

// Row types from Supabase (can be extended as needed)
export interface SupabaseToolRow {
  id: string
  slug: string
  name: string
  category: string
  price: string
  short_description: string
  full_description?: string | null
  rating: number
  review_count?: number | null
  pros: string[]
  cons: string[]
  affiliate_url?: string | null
  official_url?: string | null
  images: string[]
  pricing_tiers: Array<{
    name: string
    price: string
    features: string[]
    best_for?: string
  }> | null
  faqs: Array<{
    question: string
    answer: string
  }> | null
  alternatives: string[] | null
  featured: boolean
  created_at: string
  updated_at: string
  tags?: string[] | null
}

export interface SupabaseCategoryRow {
  id: string
  name: string
  slug: string
  description?: string | null
  icon?: string | null
  count?: number | null
}

/**
 * Convert a Supabase tool row to normalized Tool type
 */
export function mapSupabaseToolToTool(row: SupabaseToolRow): Tool {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    price: row.price,
    short_description: row.short_description,
    full_description: row.full_description || undefined,
    rating: row.rating,
    review_count: row.review_count || undefined,
    pros: row.pros || [],
    cons: row.cons || [],
    affiliate_url: row.affiliate_url || undefined,
    official_url: row.official_url || undefined,
    images: row.images || [],
    pricing_tiers: row.pricing_tiers || [],
    faqs: row.faqs || [],
    alternatives: row.alternatives || [],
    featured: row.featured || false,
    created_at: row.created_at,
    updated_at: row.updated_at,
    tags: row.tags || undefined,
  }
}

/**
 * Convert multiple Supabase tool rows to normalized Tool types
 */
export function mapSupabaseToolsToTools(rows: SupabaseToolRow[]): Tool[] {
  return rows.map(mapSupabaseToolToTool)
}

/**
 * Convert a Supabase category row to normalized ToolCategory type
 */
export function mapSupabaseCategoryToCategory(row: SupabaseCategoryRow): ToolCategory {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description || undefined,
    icon: row.icon || undefined,
    count: row.count || undefined,
  }
}

/**
 * Convert multiple Supabase category rows to normalized ToolCategory types
 */
export function mapSupabaseCategoriesToCategories(rows: SupabaseCategoryRow[]): ToolCategory[] {
  return rows.map(mapSupabaseCategoryToCategory)
}
