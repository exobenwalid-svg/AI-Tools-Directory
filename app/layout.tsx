import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ailiq.xyz'),
  title: {
    default: 'AILIQ | Trusted AI Tools Directory & Reviews',
    template: '%s | AILIQ',
  },
  description: 'Discover and compare 500+ AI tools with detailed reviews, ratings, and expert comparisons. Find the best AI solutions for your needs.',
  keywords: ['AI tools', 'AI directory', 'AI comparison', 'AI reviews', 'AI solutions'],
  generator: 'Next.js',
  applicationName: 'AILIQ',
  referrer: 'strict-origin-when-cross-origin',
  creator: 'AILIQ',
  publisher: 'AILIQ',
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.ailiq.xyz',
    siteName: 'AILIQ',
    title: 'AILIQ | Trusted AI Tools Directory & Reviews',
    description: 'Discover and compare 500+ AI tools with detailed reviews, ratings, and expert comparisons.',
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
    title: 'AILIQ | Trusted AI Tools Directory & Reviews',
    description: 'Discover and compare 500+ AI tools with detailed reviews, ratings, and expert comparisons.',
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
      <body className="font-sans antialiased bg-background text-foreground flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
