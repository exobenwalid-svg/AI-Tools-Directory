'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const links = {
    explore: [
      { href: '/', label: 'Home' },
      { href: '/tools', label: 'Tools' },
      { href: '/categories', label: 'Categories' },
    ],
    company: [
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
      { href: '/faq', label: 'FAQ' },
    ],
    legal: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Use' },
    ],
  }

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <div className="text-2xl font-bold text-foreground">AILIQ</div>
            <p className="text-sm text-muted-foreground">
              AI tools directory for discovering tools, browsing categories, and
              exploring practical reviews.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://x.com/AILIQDirectory"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="AILIQ on X"
              >
                <span className="text-lg font-bold">𝕏</span>
              </a>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold text-foreground">Explore</h2>
            <ul className="space-y-2">
              {links.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold text-foreground">Company</h2>
            <ul className="space-y-2">
              {links.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold text-foreground">Legal</h2>
            <ul className="space-y-2">
              {links.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="mailto:best4liker@gmail.com"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  best4liker@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              © {currentYear} AILIQ. All rights reserved.
            </p>

            <div className="text-center text-sm text-muted-foreground md:text-right">
              <span>Email: </span>
              <a
                href="mailto:best4liker@gmail.com"
                className="text-primary hover:underline"
              >
                best4liker@gmail.com
              </a>
            </div>
          </div>

          <div className="mt-4 border-t border-border/50 pt-4">
            <p className="text-center text-xs text-muted-foreground">
              We link to official tool websites whenever possible and aim to keep
              our directory accurate and useful.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
