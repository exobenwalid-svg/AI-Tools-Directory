'use client'

import Link from 'next/link'
import { Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const links = {
    main: [
      { href: '/', label: 'Home' },
      { href: '/tools', label: 'Tools' },
      { href: '/compare', label: 'Compare' },
      { href: '/blog', label: 'Blog' },
    ],
    company: [
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
      { href: '/faq', label: 'FAQ' },
    ],
    legal: [
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms-of-use', label: 'Terms of Use' },
      { href: '/affiliate-disclosure', label: 'Affiliate Disclosure' },
    ],
  }

  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <div className="text-2xl font-bold text-foreground">AILIQ</div>
            <p className="text-sm text-muted-foreground">
              Trusted AI tools directory with expert reviews and comparisons.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://x.com/AILIQDirectory"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="X (formerly Twitter)"
              >
                <span className="text-lg font-bold">𝕏</span>
              </a>
            </div>
          </div>

          {/* Main Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Explore</h3>
            <ul className="space-y-2">
              {links.main.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {links.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              {links.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="mailto:best4liker@gmail.com"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} AILIQ. All rights reserved.
            </p>
            <div className="text-sm text-muted-foreground text-center md:text-right">
              <span>Email: </span>
              <a
                href="mailto:best4liker@gmail.com"
                className="text-primary hover:underline"
              >
                best4liker@gmail.com
              </a>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground text-center">
              Affiliate Disclosure: AILIQ may earn commissions from affiliate partnerships with featured AI tools. We maintain editorial integrity and only recommend tools we believe provide genuine value. <Link href="/affiliate-disclosure" className="text-primary hover:underline">Learn more</Link>.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
