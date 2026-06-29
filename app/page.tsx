import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
          Discover the Best AI Tools
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
          Explore 500+ AI solutions with expert reviews, detailed comparisons, and trusted recommendations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/tools"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Browse Tools →
          </Link>
          <Link
            href="/compare"
            className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/80 transition-colors"
          >
            Compare Tools
          </Link>
        </div>
      </section>

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 border border-border rounded-lg bg-card hover:border-primary/50 transition-colors">
            <h3 className="text-lg font-semibold text-foreground mb-2">Expert Reviews</h3>
            <p className="text-muted-foreground">
              In-depth analysis of popular AI tools with real-world use cases and honest assessments.
            </p>
          </div>
          <div className="p-6 border border-border rounded-lg bg-card hover:border-primary/50 transition-colors">
            <h3 className="text-lg font-semibold text-foreground mb-2">Comparison Tools</h3>
            <p className="text-muted-foreground">
              Side-by-side comparisons to find the perfect tool for your specific needs.
            </p>
          </div>
          <div className="p-6 border border-border rounded-lg bg-card hover:border-primary/50 transition-colors">
            <h3 className="text-lg font-semibold text-foreground mb-2">Latest News</h3>
            <p className="text-muted-foreground">
              Stay updated with the latest AI developments, releases, and industry trends.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Ready to explore?</h2>
        <p className="text-muted-foreground mb-8">
          Start discovering AI tools that can transform your workflow.
        </p>
        <Link
          href="/tools"
          className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
        >
          View All Tools
        </Link>
      </section>
    </div>
  )
}
