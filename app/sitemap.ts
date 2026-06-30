import type { MetadataRoute } from 'next'
import { fetchTools } from '@/lib/tools/queries'
import { fetchBlogArticles } from '@/lib/blog/queries'

const BASE_URL = 'https://www.ailiq.xyz'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/categories`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  try {
    const tools = await fetchTools({ page: 1, per_page: 5000 })

    const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
      url: `${BASE_URL}/tools/${tool.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

    let blogPages: MetadataRoute.Sitemap = []

    try {
      const articles = await fetchBlogArticles()
      blogPages = [
        {
          url: `${BASE_URL}/blog`,
          lastModified: now,
          changeFrequency: 'weekly',
          priority: 0.7,
        },
        ...articles.map((article) => ({
          url: `${BASE_URL}/blog/${article.slug}`,
          lastModified: article.published_at
            ? new Date(article.published_at)
            : now,
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        })),
      ]
    } catch {
      blogPages = []
    }

    return [...staticPages, ...toolPages, ...blogPages]
  } catch (error) {
    console.error('[SITEMAP] Error generating sitemap:', error)
    return staticPages
  }
}
