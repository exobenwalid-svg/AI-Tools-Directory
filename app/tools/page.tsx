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
