import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ailiq.xyz'),
  title: {
    default: 'AILIQ | AI Tools Directory, Reviews & Categories',
    template: '%s | AILIQ',
  },
  description:
    'Discover AI tools for writing, SEO, research, meetings, design, productivity, and more with reviews, categories, and practical comparisons on AILIQ.',
  applicationName: 'AILIQ',
  referrer: 'strict-origin-when-cross-origin',
  creator: 'AILIQ',
  publisher: 'AILIQ',
  authors: [{ name: 'AILIQ' }],
  category: 'Technology',
  classification: 'AI tools directory',
  keywords: [
    'AI tools',
    'AI tools directory',
    'AI reviews',
    'AI categories',
    'AI software',
    'AI comparisons',
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.ailiq.xyz/',
    siteName: 'AILIQ',
    title: 'AILIQ | AI Tools Directory, Reviews & Categories',
    description:
      'Discover AI tools for writing, SEO, research, meetings, design, productivity, and more with reviews, categories, and practical comparisons.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AILIQ - AI Tools Directory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@AILIQDirectory',
    creator: '@AILIQDirectory',
    title: 'AILIQ | AI Tools Directory, Reviews & Categories',
    description:
      'Discover AI tools for writing, SEO, research, meetings, design, productivity, and more with reviews, categories, and practical comparisons.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
