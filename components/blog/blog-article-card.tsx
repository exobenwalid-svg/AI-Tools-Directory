import Link from 'next/link'
import { BlogArticle } from '@/lib/blog/types'

interface BlogArticleCardProps {
  article: BlogArticle
}

export function BlogArticleCard({ article }: BlogArticleCardProps) {
  const publishDate = new Date(article.published_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <Link href={`/blog/${article.slug}`}>
      <article className="h-full p-6 border border-border rounded-lg bg-card hover:border-primary/50 hover:shadow-md transition-all cursor-pointer">
        {/* Featured Image */}
        {article.featured_image && (
          <div className="mb-4 h-40 bg-muted rounded-lg overflow-hidden">
            <img src={article.featured_image} alt={article.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Category & Meta */}
        <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
          <span className="px-2 py-1 rounded bg-secondary/20 text-secondary-foreground font-medium">
            {article.category}
          </span>
          <span>{publishDate}</span>
          {article.reading_time && <span>{article.reading_time} min read</span>}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 hover:text-primary transition-colors">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{article.excerpt}</p>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {article.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Read More Link */}
        <div className="mt-4 text-sm text-primary font-medium">Read Article →</div>
      </article>
    </Link>
  )
}
