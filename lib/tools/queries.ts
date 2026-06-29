/**
 * Data access queries layer
 */

import { Tool, ToolCategory, FilterParams } from './types'
import { getSupabaseClient, isSupabaseEnabled } from './supabase-client'
import {
  mapSupabaseToolToTool,
  mapSupabaseToolsToTools,
  mapSupabaseCategoryToCategory,
} from './mappers'

let seedTools: Tool[] | null = null
let seedCategories: ToolCategory[] | null = null

async function loadSeedData() {
  if (seedTools === null || seedCategories === null) {
    try {
      const { tools, categories } = await import('@/data/tools/seed')
      seedTools = tools
      seedCategories = categories
    } catch (error) {
      console.error('[AILIQ] Failed to load seed data:', error)
      seedTools = []
      seedCategories = []
    }
  }

  return { tools: seedTools || [], categories: seedCategories || [] }
}

export async function fetchTools(filters?: FilterParams): Promise<Tool[]> {
  if (isSupabaseEnabled()) {
    return fetchToolsFromSupabase(filters)
  }
  return fetchToolsFromSeed(filters)
}

export async function fetchToolBySlug(slug: string): Promise<Tool | null> {
  if (isSupabaseEnabled()) {
    return fetchToolBySlugFromSupabase(slug)
  }
  return fetchToolBySlugFromSeed(slug)
}

export async function fetchToolsByCategory(category: string, limit?: number): Promise<Tool[]> {
  if (isSupabaseEnabled()) {
    return fetchToolsByCategoryFromSupabase(category, limit)
  }
  return fetchToolsByCategoryFromSeed(category, limit)
}

export async function searchTools(query: string, limit: number = 20): Promise<Tool[]> {
  if (!query.trim()) return []

  if (isSupabaseEnabled()) {
    return searchToolsFromSupabase(query, limit)
  }
  return searchToolsFromSeed(query, limit)
}

export async function getRelatedTools(slug: string, limit: number = 5): Promise<Tool[]> {
  if (isSupabaseEnabled()) {
    return getRelatedToolsFromSupabase(slug, limit)
  }
  return getRelatedToolsFromSeed(slug, limit)
}

export async function getFeaturedTools(limit: number = 6): Promise<Tool[]> {
  if (isSupabaseEnabled()) {
    return getFeaturedToolsFromSupabase(limit)
  }
  return getFeaturedToolsFromSeed(limit)
}

export async function getCategories(): Promise<ToolCategory[]> {
  if (isSupabaseEnabled()) {
    return getCategoriesFromSupabase()
  }
  return getCategoriesFromSeed()
}

// ============================================================================
// SUPABASE IMPLEMENTATIONS
// ============================================================================

async function fetchToolsFromSupabase(filters?: FilterParams): Promise<Tool[]> {
  const client = getSupabaseClient()
  if (!client) return []

  let query = client
    .from('tools')
    .select('*')
    .eq('published', true)

  if (filters?.price_range) {
    query = query.eq('pricing', filters.price_range)
  }

  if (filters?.min_rating) {
    query = query.gte('rating', filters.min_rating)
  }

  const sortColumn =
    filters?.sort === 'rating'
      ? 'rating'
      : filters?.sort === 'name'
        ? 'name'
        : 'created_at'

  const ascending = filters?.sort === 'name'
  query = query.order(sortColumn, { ascending })

  const page = filters?.page || 1
  const perPage = filters?.per_page || 20
  const offset = (page - 1) * perPage
  query = query.range(offset, offset + perPage - 1)

  const { data, error } = await query

  if (error) {
    console.error('[AILIQ] Supabase fetch tools error:', error)
    return []
  }

  return mapSupabaseToolsToTools(data || [])
}

async function fetchToolBySlugFromSupabase(slug: string): Promise<Tool | null> {
  const client = getSupabaseClient()
  if (!client) return null

  const { data, error } = await client
    .from('tools')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle()

  if (error) {
    console.error('[AILIQ] Supabase fetch tool by slug error:', error)
    return null
  }

  if (!data) return null

  return mapSupabaseToolToTool(data)
}

async function fetchToolsByCategoryFromSupabase(category: string, limit?: number): Promise<Tool[]> {
  const client = getSupabaseClient()
  if (!client) return []

  const categories = await getCategoriesFromSupabase()
  const matchedCategory = categories.find(
    (c) => c.slug === category || c.name === category
  )

  if (!matchedCategory) {
    return []
  }

  let query = client
    .from('tools')
    .select('*')
    .eq('category_id', matchedCategory.id)
    .eq('published', true)
    .order('rating', { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) {
    console.error('[AILIQ] Supabase fetch tools by category error:', error)
    return []
  }

  return mapSupabaseToolsToTools(data || [])
}

async function searchToolsFromSupabase(query: string, limit: number): Promise<Tool[]> {
  const client = getSupabaseClient()
  if (!client) return []

  const searchTerm = `%${query}%`

  const { data, error } = await client
    .from('tools')
    .select('*')
    .eq('published', true)
    .or(`name.ilike.${searchTerm},short_description.ilike.${searchTerm},best_for.ilike.${searchTerm}`)
    .limit(limit)

  if (error) {
    console.error('[AILIQ] Supabase search tools error:', error)
    return []
  }

  return mapSupabaseToolsToTools(data || [])
}

async function getRelatedToolsFromSupabase(slug: string, limit: number): Promise<Tool[]> {
  const client = getSupabaseClient()
  if (!client) return []

  const { data: toolData, error: toolError } = await client
    .from('tools')
    .select('category_id')
    .eq('slug', slug)
    .maybeSingle()

  if (toolError) {
    console.error('[AILIQ] Supabase get related tool seed error:', toolError)
    return []
  }

  if (!toolData?.category_id) {
    return []
  }

  const { data, error } = await client
    .from('tools')
    .select('*')
    .eq('category_id', toolData.category_id)
    .neq('slug', slug)
    .eq('published', true)
    .order('rating', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('[AILIQ] Supabase get related tools error:', error)
    return []
  }

  return mapSupabaseToolsToTools(data || [])
}

async function getFeaturedToolsFromSupabase(limit: number): Promise<Tool[]> {
  const client = getSupabaseClient()
  if (!client) return []

  const { data, error } = await client
    .from('tools')
    .select('*')
    .eq('featured', true)
    .eq('published', true)
    .order('rating', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('[AILIQ] Supabase get featured tools error:', error)
    return []
  }

  return mapSupabaseToolsToTools(data || [])
}

async function getCategoriesFromSupabase(): Promise<ToolCategory[]> {
  const client = getSupabaseClient()
  if (!client) return []

  const { data, error } = await client
    .from('categories')
    .select('*')
    .order('name')

  if (error) {
    console.error('[AILIQ] Supabase get categories error:', error)
    return []
  }

  return data ? data.map(mapSupabaseCategoryToCategory) : []
}

// ============================================================================
// SEED DATA IMPLEMENTATIONS
// ============================================================================

async function fetchToolsFromSeed(filters?: FilterParams): Promise<Tool[]> {
  const { tools } = await loadSeedData()

  let result = [...tools]

  if (filters?.category) {
    result = result.filter((t) => t.category === filters.category)
  }

  if (filters?.price_range) {
    result = result.filter((t) => t.price === filters.price_range)
  }

  if (filters?.min_rating) {
    result = result.filter((t) => t.rating >= filters.min_rating)
  }

  if (filters?.sort === 'rating') {
    result.sort((a, b) => b.rating - a.rating)
  } else if (filters?.sort === 'name') {
    result.sort((a, b) => a.name.localeCompare(b.name))
  } else {
    result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }

  const page = filters?.page || 1
  const perPage = filters?.per_page || 20
  const offset = (page - 1) * perPage
  result = result.slice(offset, offset + perPage)

  return result
}

async function fetchToolBySlugFromSeed(slug: string): Promise<Tool | null> {
  const { tools } = await loadSeedData()
  return tools.find((t) => t.slug === slug) || null
}

async function fetchToolsByCategoryFromSeed(category: string, limit?: number): Promise<Tool[]> {
  const { tools } = await loadSeedData()

  let result = tools.filter((t) => t.category === category)
  result.sort((a, b) => b.rating - a.rating)

  if (limit) {
    result = result.slice(0, limit)
  }

  return result
}

async function searchToolsFromSeed(query: string, limit: number): Promise<Tool[]> {
  const { tools } = await loadSeedData()
  const lowerQuery = query.toLowerCase()

  return tools
    .filter(
      (t) =>
        t.name.toLowerCase().includes(lowerQuery) ||
        t.short_description.toLowerCase().includes(lowerQuery) ||
        t.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
    )
    .slice(0, limit)
}

async function getRelatedToolsFromSeed(slug: string, limit: number): Promise<Tool[]> {
  const { tools } = await loadSeedData()
  const tool = tools.find((t) => t.slug === slug)

  if (!tool) return []

  return tools
    .filter((t) => t.category === tool.category && t.slug !== slug)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit)
}

async function getFeaturedToolsFromSeed(limit: number): Promise<Tool[]> {
  const { tools } = await loadSeedData()
  return tools.filter((t) => t.featured).slice(0, limit)
}

async function getCategoriesFromSeed(): Promise<ToolCategory[]> {
  const { categories } = await loadSeedData()
  return categories
}
