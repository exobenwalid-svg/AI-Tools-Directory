/**
 * Comparison-specific queries
 * Handles fetching pairs of tools for comparison pages
 */

import { Tool } from './types'
import { fetchToolBySlug, fetchTools } from './queries'

export type ComparisonPair = {
  toolA: Tool
  toolB: Tool
}

/**
 * Fetch two tools by their slugs for comparison
 * Returns null if either tool doesn't exist
 */
export async function fetchComparisonPair(slugA: string, slugB: string): Promise<ComparisonPair | null> {
  const normalizedA = slugA.toLowerCase()
  const normalizedB = slugB.toLowerCase()

  if (normalizedA === normalizedB) {
    return null
  }

  const [toolA, toolB] = await Promise.all([
    fetchToolBySlug(normalizedA),
    fetchToolBySlug(normalizedB),
  ])

  if (!toolA || !toolB) {
    return null
  }

  return { toolA, toolB }
}

/**
 * Get all valid comparison pairs (for sitemap generation)
 * Returns pairs of real comparisons that should be indexed
 */
export async function getAllComparisonPairs(): Promise<Array<{ slugA: string; slugB: string }>> {
  const curations = getCuratedComparisons()
  const allTools = await fetchTools()
  const toolSlugs = new Set(allTools.map((t) => t.slug.toLowerCase()))

  return curations.filter(
    (pair) =>
      toolSlugs.has(pair.slugA.toLowerCase()) &&
      toolSlugs.has(pair.slugB.toLowerCase())
  )
}

/**
 * Curated comparison pairs
 */
export function getCuratedComparisons(): Array<{
  slugA: string
  slugB: string
  title: string
  description: string
}> {
  return [
    {
      slugA: 'chatgpt',
      slugB: 'claude',
      title: 'ChatGPT vs Claude',
      description: 'Compare two of the most popular conversational AI tools for writing and analysis.',
    },
    {
      slugA: 'chatgpt',
      slugB: 'copy-ai',
      title: 'ChatGPT vs Copy.ai',
      description: 'See how ChatGPT compares to Copy.ai for content generation and copywriting.',
    },
    {
      slugA: 'claude',
      slugB: 'copy-ai',
      title: 'Claude vs Copy.ai',
      description: 'Compare Claude and Copy.ai for content creation and copywriting.',
    },
    {
      slugA: 'midjourney',
      slugB: 'dall-e-3',
      title: 'Midjourney vs DALL-E 3',
      description: 'Discover the differences between two leading AI image generation platforms.',
    },
    {
      slugA: 'github-copilot',
      slugB: 'tabnine',
      title: 'GitHub Copilot vs Tabnine',
      description: 'Compare AI-powered coding assistants to boost your development workflow.',
    },
    {
      slugA: 'chatgpt',
      slugB: 'github-copilot',
      title: 'ChatGPT vs GitHub Copilot',
      description: 'Compare general-purpose AI with specialized coding assistance.',
    },
  ]
}

/**
 * Generate comparison slug from two tool slugs
 * Always puts them in alphabetical order for consistency
 */
export function generateComparisonSlug(slugA: string, slugB: string): string {
  const [first, second] = [slugA, slugB].sort()
  return `${first}-vs-${second}`
}

/**
 * Parse comparison slug into two tool slugs
 * Returns null if slug is invalid
 */
export function parseComparisonSlug(slug: string): { slugA: string; slugB: string } | null {
  const parts = slug.split('-vs-')
  if (parts.length !== 2) {
    return null
  }
  return { slugA: parts[0], slugB: parts[1] }
}

/**
 * Check if a slug is a valid comparison format
 */
export function isValidComparisonSlug(slug: string): boolean {
  return slug.includes('-vs-') && parseComparisonSlug(slug) !== null
}
