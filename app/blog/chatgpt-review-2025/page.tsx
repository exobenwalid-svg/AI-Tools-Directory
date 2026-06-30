import type { Metadata } from 'next'
import Link from 'next/link'

const siteUrl = 'https://www.ailiq.xyz'
const pageUrl = `${siteUrl}/blog/chatgpt-review-2025`
const ogImageUrl = `${siteUrl}/images/chatgpt-review-2025-og.jpg`

const title = 'ChatGPT Review 2025: Is ChatGPT Plus Worth It? | ailiq'
const description =
  'Honest ChatGPT review for 2025 covering key features, pricing, pros, cons, Arabic support, and whether ChatGPT Plus is worth paying for.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title,
    description,
    url: pageUrl,
    siteName: 'ailiq',
    type: 'article',
    images: ogImageUrl ? [{ url: ogImageUrl }] : undefined,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

const faqs = [
  {
    question: 'Is ChatGPT free to use?',
    answer:
      'Yes. ChatGPT offers a free tier that is enough for light usage and experimentation, but access to stronger models and more consistent performance usually requires a paid plan.',
  },
  {
    question: 'Is ChatGPT Plus worth it?',
    answer:
      'For frequent users, writers, researchers, and professionals, ChatGPT Plus can be worth it because it offers stronger models, more reliable performance, and extra capabilities that are not always available on the free tier.',
  },
  {
    question: 'Can ChatGPT write in Arabic?',
    answer:
      'Yes. ChatGPT supports Arabic and can help with drafting, rewriting, summarizing, brainstorming, and translation in Arabic. However, the quality still varies by task and prompt, and users should review the output carefully.',
  },
  {
    question: 'Who should use ChatGPT?',
    answer:
      'ChatGPT is useful for students, marketers, writers, developers, researchers, and business users who need fast help with text, ideas, coding, and day-to-day productivity tasks.',
  },
]

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'ChatGPT Review 2025: Is ChatGPT Plus Worth It?',
  description,
  author: {
    '@type': 'Organization',
    name: 'ailiq',
  },
  publisher: {
    '@type': 'Organization',
    name: 'ailiq',
    logo: {
      '@type': 'ImageObject',
      // TODO: replace with a real existing logo URL in production
      url: `${siteUrl}/logo.png`,
    },
  },
  mainEntityOfPage: pageUrl,
  datePublished: '2026-06-30',
  dateModified: '2026-06-30',
  image: ogImageUrl ? [ogImageUrl] : undefined,
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: siteUrl,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: `${siteUrl}/blog`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'ChatGPT Review 2025',
      item: pageUrl,
    },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

export default function ChatGPTReview2025Page() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      {/* Structured data for Article, Breadcrumbs, and FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumb navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>
          </li>
          <li>/</li>
          <li className="text-foreground">ChatGPT Review 2025</li>
        </ol>
      </nav>

      <article className="space-y-10">
        {/* Header */}
        <header className="space-y-4">
          <p className="text-sm text-muted-foreground">
            By <span className="font-medium text-foreground">ailiq editorial team</span> · Last
            updated: June 30, 2026
          </p>
          <h1 className="text-4xl font-bold tracking-tight">
            ChatGPT Review 2025: Is ChatGPT Plus Worth It?
          </h1>
          <p className="text-lg text-muted-foreground">
            ChatGPT remains one of the most popular AI assistants in 2025, but popularity alone
            does not make it the right tool for everyone. In this review, we focus on real-world
            usage: where ChatGPT performs well, where it falls short, and whether ChatGPT Plus is
            worth paying for.
          </p>
        </header>

        {/* Optional hero image (replace src with a real image in production) */}
        <section aria-label="ChatGPT interface screenshot" className="space-y-3">
          <div className="overflow-hidden rounded-xl border bg-muted">
            <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
              {/* Replace this placeholder with a real <Image> or <img> when you have assets */}
              ChatGPT interface illustration (replace with real screenshot in production)
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            This article focuses on practical use cases and tradeoffs of ChatGPT in 2025, not
            just a feature list.
          </p>
        </section>

        {/* Quick verdict */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Quick verdict</h2>
          <p>
            ChatGPT is still one of the strongest all-around AI tools for writing,
            brainstorming, summarization, research assistance, and general productivity. Its
            biggest strength is versatility, while its main weakness is that output quality can
            still vary depending on the prompt, model, and task.
          </p>
          <p>
            For many users, ChatGPT is a strong default starting point. However, power users and
            specialized workflows sometimes get better results from alternatives that focus on a
            single task, such as SEO content optimization, long-context reasoning, or coding-first
            environments.
          </p>
        </section>

        {/* What is ChatGPT? */}
        <section className="space-y-4">
          <h
