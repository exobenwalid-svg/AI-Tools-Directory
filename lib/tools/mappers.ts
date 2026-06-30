/**
 * Data mappers - convert Supabase rows to normalized Tool types
 */

import { Tool, ToolCategory } from './types'

export interface SupabaseToolRow {
  id: string
  category_id: string | null
  slug: string
  name: string
  official_url: string | null
  pricing: string | null
  rating: number | null
  short_description: string | null
  full_review: string | null
  best_for: string | null
  key_features: string[] | null
  pros: string[] | null
  cons: string[] | null
  use_cases: string[] | null
  faqs:
    | Array<{
        q?: string
        a?: string
        question?: string
        answer?: string
      }>
    | null
  alternatives: string[] | null
  logo_url: string | null
  cover_image_url: string | null
  featured: boolean | null
  published: boolean | null
  seo_title: string | null
  seo_description: string | null
  created_at: string
  updated_at: string
  categories?: {
    id: string
    name: string
    slug: string
    description?: string | null
    icon?: string | null
    count?: number | null
  } | null
}

export interface SupabaseCategoryRow {
  id: string
  name: string
  slug: string
  description?: string | null
  icon?: string | null
  count?: number | null
  intro_title?: string | null
  intro_description?: string | null
  seo_title?: string | null
  seo_description?: string | null
  faqs?:
    | Array<{
        q?: string
        a?: string
        question?: string
        answer?: string
      }>
    | null
}

export function mapSupabaseToolToTool(row: SupabaseToolRow): Tool {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.categories?.name || 'AI Tool',
    price: row.pricing || 'N/A',
    short_description: row.short_description || '',
    full_description: row.full_review || undefined,
    rating: Number(row.rating || 0),
    review_count: undefined,
    pros: row.pros || [],
    cons: row.cons || [],
    affiliate_url: undefined,
    official_url: row.official_url || undefined,
    images: [row.logo_url, row.cover_image_url].filter(Boolean) as string[],
    pricing_tiers: [],
    faqs:
      row.faqs?.map((faq) => ({
        question: faq.question || faq.q || '',
        answer: faq.answer || faq.a || '',
      })) || [],
    alternatives: row.alternatives || [],
    featured: !!row.featured,
    created_at: row.created_at,
    updated_at: row.updated_at,
    tags: row.key_features || [],
  }
}

export function mapSupabaseToolsToTools(rows: SupabaseToolRow[]): Tool[] {
  return rows.map(mapSupabaseToolToTool)
}

export function mapSupabaseCategoryToCategory(row: SupabaseCategoryRow): ToolCategory {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description || undefined,
    icon: row.icon || undefined,
    count: row.count || undefined,
    intro_title: row.intro_title || undefined,
    intro_description: row.intro_description || undefined,
    seo_title: row.seo_title || undefined,
    seo_description: row.seo_description || undefined,
    faqs:
      row.faqs?.map((faq) => ({
        q: faq.q || faq.question || '',
        a: faq.a || faq.answer || '',
      })) || [],
  }
}

export function mapSupabaseCategoriesToCategories(rows: SupabaseCategoryRow[]): ToolCategory[] {
  return rows.map(mapSupabaseCategoryToCategory)
}
