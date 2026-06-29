import type { Metadata } from 'next'
import Link from 'next/link'
import { fetchTools } from '@/lib/tools/queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'AI Tools Directory | AILIQ',
  description:
    'Discover and compare AI tools with reviews, ratings, and practical insights.',
}

export default async function ToolsPage() {
  const tools = await fetchTools()

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="mb-3 text-4xl font-bold text-foreground">
            AI Tools Directory
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Explore AI tools, compare options, and find the right solution for
            writing, productivity, research, design, and more.
          </p>
        </div>

        <section className="mb-10 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-2xl font-semibold text-foreground">
            Browse by Category
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Explore category hubs to find the best AI tools for writing, SEO,
            meetings, research, design, and other workflows.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/categories/ai-writing"
              className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Explore AI Writing
            </Link>

            <Link
              href="/categories/ai-seo-tools"
              className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Explore AI SEO Tools
            </Link>

            <Link
              href="/categories/ai-meeting-assistants"
              className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Explore AI Meeting Assistants
            </Link>

            <Link
              href="/categories/ai-design"
              className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Explore AI Design
            </Link>

            <Link
              href="/categories/ai-research-tools"
              className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Explore AI Research Tools
            </Link>

            <Link
              href="/categories"
              className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/15"
            >
              View All Categories
            </Link>
          </div>
        </section>

        {tools.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-8">
            <h2 className="mb-2 text-xl font-semibold text-foreground">
              No tools found
            </h2>
            <p className="text-muted-foreground">
              No tools are currently available in the directory.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Link key={tool.id} href={`/tools/${tool.slug}`}>
                <article className="h-full rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-md">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">
                        {tool.name}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {tool.category || 'AI Tool'}
                      </p>
                    </div>

                    {tool.featured ? (
                      <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-900 dark:bg-amber-900 dark:text-amber-100">
                        Featured
                      </span>
                    ) : null}
                  </div>

                  <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {tool.short_description}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">
                      {Number(tool.rating || 0).toFixed(1)} ★
                    </span>
                    <span className="text-muted-foreground">
                      {(tool.price || 'N/A').replace(/-/g, ' ')}
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
