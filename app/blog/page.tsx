import { Metadata } from 'next'
import { fetchBlogArticles, getBlogCategories } from '@/lib/blog/queries'
import { BlogArticleCard } from '@/components/blog/blog-article-card'

export const metadata: Metadata = {
  title: 'AI Blog & Guides | Expert Insights on AI Tools | AILIQ',
  description:
    'Discover in-depth guides, comparisons, and expert insights about the best AI tools and how to use them effectively.',
  keywords: ['AI blog', 'AI guides', 'AI tutorials', 'tool comparisons', 'AI news'],
}

export default async function BlogPage() {
  const [articles, categories] = await Promise.all([fetchBlogArticles({ per_page: 12 }), getBlogCategories()])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-3">AI Blog & Guides</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Expert insights, in-depth guides, and comparisons to help you master AI tools and stay ahead of the curve.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <BlogArticleCard key={article.id} article={article} />
          ))}
        </div>

        {/* No Articles Message */}
        {articles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No articles found. Check back soon for new content!</p>
          </div>
        )}
      </div>
    </div>
  )
}
