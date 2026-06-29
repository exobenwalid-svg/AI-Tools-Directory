import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { fetchBlogArticleBySlug, fetchBlogArticles, getBlogArticlesByTools } from '@/lib/blog/queries'
import { fetchToolBySlug } from '@/lib/tools/queries'
import { notFound } from 'next/navigation'

interface BlogArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await fetchBlogArticleBySlug(slug)

  if (!article) {
    return {
      title: 'Article Not Found | AILIQ',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const canonicalUrl = `https://www.ailiq.xyz/blog/${article.slug}`

  return {
    title: `${article.title} | AILIQ Blog`,
    description: article.excerpt,
    keywords: [article.title, ...( article.tags || []), 'AI', 'tools'],
    canonical: canonicalUrl,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      url: canonicalUrl,
      siteName: 'AILIQ',
      publishedTime: article.published_at,
      modifiedTime: article.updated_at,
      authors: [article.author.name],
      images: article.featured_image
        ? [
            {
              url: article.featured_image,
              width: 1200,
              height: 630,
              alt: article.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@AILIQDirectory',
      creator: '@AILIQDirectory',
      title: article.title,
      description: article.excerpt,
      images: article.featured_image ? [article.featured_image] : undefined,
    },
  }
}

export async function generateStaticParams() {
  const articles = await fetchBlogArticles({ per_page: 100 })
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params
  const article = await fetchBlogArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  // Fetch related content
  const [relatedArticles, toolReferences] = await Promise.all([
    article.related_articles ? fetchBlogArticles({ per_page: 3 }) : Promise.resolve([]),
    article.related_tools
      ? Promise.all(article.related_tools.map((toolSlug) => fetchToolBySlug(toolSlug)))
      : Promise.resolve([]),
  ])

  // Filter out null tools
  const validTools = toolReferences.filter((t) => t !== null)

  // Structured data for Article schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    image: article.featured_image || '/og-image.png',
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: {
      '@type': 'Person',
      name: article.author.name,
      email: article.author.email,
      ...(article.author.bio && { description: article.author.bio }),
    },
    publisher: {
      '@type': 'Organization',
      name: 'AILIQ',
      logo: {
        '@type': 'ImageObject',
        url: '/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.ailiq.xyz/blog/${article.slug}`,
    },
  }

  const publishDate = new Date(article.published_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const readingTime = article.reading_time || Math.ceil(article.body.split(/\s+/).length / 200)

  return (
    <div className="min-h-screen bg-background">
      {/* Structured Data */}
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/blog" className="hover:text-foreground">
            Blog
          </Link>
          <span>/</span>
          <span className="text-foreground">{article.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="px-2 py-1 rounded bg-secondary/20 text-secondary-foreground font-medium">
              {article.category}
            </span>
            <span>{publishDate}</span>
            <span>{readingTime} min read</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{article.title}</h1>

          <p className="text-xl text-muted-foreground">{article.excerpt}</p>

          {/* Author Info */}
          <div className="mt-6 flex items-center gap-4 border-t border-border pt-6">
            {article.author.avatar && (
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
            <div>
              <div className="font-semibold text-foreground">{article.author.name}</div>
              {article.author.bio && <p className="text-sm text-muted-foreground">{article.author.bio}</p>}
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {article.featured_image && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img src={article.featured_image} alt={article.title} className="w-full h-auto" />
          </div>
        )}

        {/* Article Body */}
        <div className="prose prose-invert max-w-none mb-12">
          {article.body.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('##')) {
              return (
                <h2 key={index} className="text-2xl font-bold text-foreground mt-8 mb-4">
                  {paragraph.replace(/^##\s*/, '')}
                </h2>
              )
            }
            if (paragraph.startsWith('**')) {
              return (
                <p key={index} className="font-semibold text-foreground mb-4">
                  {paragraph}
                </p>
              )
            }
            if (paragraph.startsWith('-') || paragraph.startsWith('•')) {
              return (
                <ul key={index} className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                  {paragraph.split('\n').map((item, i) => (
                    <li key={i} className="ml-4">
                      {item.replace(/^[-•]\s*/, '')}
                    </li>
                  ))}
                </ul>
              )
            }
            if (paragraph.startsWith('1.') || paragraph.match(/^\d+\./)) {
              return (
                <ol key={index} className="list-decimal list-inside space-y-2 text-muted-foreground mb-4">
                  {paragraph.split('\n').map((item, i) => (
                    <li key={i} className="ml-4">
                      {item.replace(/^\d+\.\s*/, '')}
                    </li>
                  ))}
                </ol>
              )
            }
            return (
              <p key={index} className="text-muted-foreground mb-4 leading-relaxed">
                {paragraph}
              </p>
            )
          })}
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mb-8 border-t border-border pt-6">
            <p className="text-sm font-semibold text-foreground mb-3">Tags:</p>
            <div className="flex gap-2 flex-wrap">
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Tools */}
        {validTools.length > 0 && (
          <section className="mb-12 border-t border-border pt-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Tools Mentioned</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {validTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="p-4 border border-border rounded-lg bg-card hover:border-primary/50 transition-colors"
                >
                  <div className="font-semibold text-foreground">{tool.name}</div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{tool.short_description}</p>
                  <div className="mt-2 text-sm text-primary">Learn more →</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Comparison Link */}
        {article.comparison_pair && (
          <section className="mb-12 border-t border-border pt-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">See the Comparison</h2>
            <Link
              href={`/compare/${article.comparison_pair.slugA}-vs-${article.comparison_pair.slugB}`}
              className="inline-block px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              View Side-by-Side Comparison →
            </Link>
          </section>
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="border-t border-border pt-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Related Articles</h2>
            <div className="space-y-4">
              {relatedArticles
                .filter((a) => a.slug !== article.slug)
                .slice(0, 3)
                .map((relatedArticle) => (
                  <Link
                    key={relatedArticle.slug}
                    href={`/blog/${relatedArticle.slug}`}
                    className="block p-4 border border-border rounded-lg bg-card hover:border-primary/50 transition-colors"
                  >
                    <div className="font-semibold text-foreground hover:text-primary transition-colors">
                      {relatedArticle.title}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{relatedArticle.excerpt}</p>
                  </Link>
                ))}
            </div>
          </section>
        )}

        {/* Back Link */}
        <div className="mt-12 border-t border-border pt-8">
          <Link href="/blog" className="text-primary font-medium hover:underline">
            ← Back to All Articles
          </Link>
        </div>
      </article>
    </div>
  )
}
