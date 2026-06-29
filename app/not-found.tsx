import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Page Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors w-full"
          >
            ← Back to Home
          </Link>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/tools"
              className="px-4 py-2 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/80 transition-colors text-sm"
            >
              Browse Tools
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/80 transition-colors text-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            If you think this is a mistake, please{' '}
            <a
              href="mailto:best4liker@gmail.com"
              className="text-primary hover:underline"
            >
              let us know
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
