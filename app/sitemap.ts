import { MetadataRoute } from 'next'
import { fetchTools } from '@/lib/tools/queries'
import { fetchBlogArticles } from '@/lib/blog/queries'
import { getCuratedComparisons } from '@/lib/tools/comparison-queries'

const BASE_URL = 'https://www.ailiq.xyz'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages (always include)
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/compare`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/terms-of-use`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/affiliate-disclosure`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  try {
    // Fetch tools
    const tools = await fetchTools()
    const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
      url: `${BASE_URL}/tools/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

    // Fetch blog articles
    const articles = await fetchBlogArticles()
    const blogPages: MetadataRoute.Sitemap = articles.map((article) => ({
      url: `${BASE_URL}/blog/${article.slug}`,
      lastModified: new Date(article.published_at),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    // Get comparison pages
    const comparisons = getCuratedComparisons()
    const comparisonPages: MetadataRoute.Sitemap = comparisons.map((comp) => ({
      url: `${BASE_URL}/compare/${comp.slugA.localeCompare(comp.slugB) < 0 ? `${comp.slugA}-vs-${comp.slugB}` : `${comp.slugB}-vs-${comp.slugA}`}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    return [...staticPages, ...toolPages, ...blogPages, ...comparisonPages]
  } catch (error) {
    // Fallback: return only static pages if data fetching fails
    console.error('[SITEMAP] Error fetching dynamic pages:', error)
    return staticPages
  }
}
