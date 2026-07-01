import type { Metadata } from 'next'
import Link from 'next/link'

const siteUrl = 'https://www.ailiq.xyz'
const pageUrl = `${siteUrl}/blog/chatgpt-vs-claude-vs-gemini`
const ogImageUrl = `${siteUrl}/images/chatgpt-vs-claude-vs-gemini-hero.png`

const title = 'ChatGPT vs Claude vs Gemini (2025): Which AI Assistant Should You Use? | ailiq'
const description =
  'Side‑by‑side comparison of ChatGPT, Claude, and Gemini in 2025. See strengths, weaknesses, pricing, and best use cases so you know which AI assistant fits your workflow.'

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
    question: 'Which is better overall: ChatGPT, Claude, or Gemini?',
    answer:
      'There is no single winner for every workflow. ChatGPT is strongest as a flexible all‑round assistant, Claude shines in deep reasoning and long texts, and Gemini is best when you care about Google ecosystem integration and speed.',
  },
  {
    question: 'Which AI is best for coding tasks?',
    answer:
      'ChatGPT is strong for quick, practical code and explanations. Claude is often better for deep debugging and complex reasoning. Gemini is useful when you live inside Google tools and want tight integration.',
  },
  {
    question: 'Which AI is best for long‑form writing?',
    answer:
      'Claude is usually the best choice for long‑form, nuanced writing and large context. ChatGPT handles general drafting and rewriting well. Gemini can be useful when you combine writing with research inside Google products.',
  },
  {
    question: 'Which AI is best if I only want one subscription?',
    answer:
      'If you only want one subscription and you need a general‑purpose assistant, ChatGPT Plus is still a strong default. If deep reasoning and long documents are your priority, Claude Pro may be a better fit.',
  },
]

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'ChatGPT vs Claude vs Gemini (2025): Which AI Assistant Should You Use?',
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
      url: `${siteUrl}/logo.png`, // TODO: replace with real logo URL in production
    },
  },
  mainEntityOfPage: pageUrl,
  datePublished: '2026-07-01',
  dateModified: '2026-07-01',
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
      name: 'ChatGPT vs Claude vs Gemini',
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

export default function ChatGPTVsClaudeVsGeminiPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      {/* Structured data */}
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

      {/* Breadcrumb */}
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
          <li className="text-foreground">ChatGPT vs Claude vs Gemini</li>
        </ol>
      </nav>

      <article className="space-y-10">
        {/* Header */}
        <header className="space-y-4">
          <p className="text-sm text-muted-foreground">
            By <span className="font-medium text-foreground">ailiq editorial team</span> · Last
            updated: July 1, 2026
          </p>
          <h1 className="text-4xl font-bold tracking-tight">
            ChatGPT vs Claude vs Gemini (2025): Which AI Assistant Should You Use?
          </h1>
          <p className="text-lg text-muted-foreground">
            If you only test one AI assistant, you miss the strengths of the others. This
            comparison looks at ChatGPT, Claude, and Gemini side‑by‑side so you can decide which
            AI is best for coding, writing, research, and everyday tasks — or when it makes
            sense to use more than one.
          </p>
        </header>

                <section aria-label="AI assistant comparison illustration" className="space-y-3">
          <div className="overflow-hidden rounded-xl border">
            <img
              src="/images/chatgpt-vs-claude-vs-gemini-hero.png"
              alt="Hero illustration comparing ChatGPT, Claude, and Gemini in 2025"
              width={1600}
              height={900}
              className="h-auto w-full"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Visual overview for comparing ChatGPT, Claude, and Gemini across major use cases.
          </p>
        </section>
        
        {/* Intro summary */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Short answer</h2>
          <p>
            For most users, <strong>ChatGPT</strong> remains the best single general‑purpose AI
            assistant. <strong>Claude</strong> is usually stronger for deep reasoning and long
            texts. <strong>Gemini</strong> is most appealing when you live inside Google Docs,
            Drive, and Gmail and want tight integration.
          </p>
          <p>
            Instead of asking “Which one is the best?”, it is more useful to ask “Which one is
            best for my workflow?”. This article breaks down the differences so you can match
            each model to specific tasks.
          </p>
        </section>

        {/* Comparison table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">High‑level comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-3 pr-6 font-semibold">Aspect</th>
                  <th className="py-3 pr-6 font-semibold">ChatGPT</th>
                  <th className="py-3 pr-6 font-semibold">Claude</th>
                  <th className="py-3 font-semibold">Gemini</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-3 pr-6 font-medium">Overall use case</td>
                  <td className="py-3 pr-6 text-muted-foreground">
                    Best all‑round assistant for many everyday tasks.
                  </td>
                  <td className="py-3 pr-6 text-muted-foreground">
                    Best for deep reasoning, long documents, and nuanced writing.
                  </td>
                  <td className="py-3 text-muted-foreground">
                    Best when you rely heavily on Google ecosystem and want integration.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-6 font-medium">Writing & content</td>
                  <td className="py-3 pr-6 text-muted-foreground">
                    Strong for drafting, rewriting, and brainstorming.
                  </td>
                  <td className="py-3 pr-6 text-muted-foreground">
                    Excellent for long‑form, structured, and subtle writing.
                  </td>
                  <td className="py-3 text-muted-foreground">
                    Good for content combined with research in Google tools.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-6 font-medium">Coding help</td>
                  <td className="py-3 pr-6 text-muted-foreground">
                    Great for quick, practical code snippets and explanations.
                  </td>
                  <td className="py-3 pr-6 text-muted-foreground">
                    Often better for debugging complex issues and reasoning about architecture.
                  </td>
                  <td className="py-3 text-muted-foreground">
                    Useful when you want code inside Google products and tight integration.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-6 font-medium">Pricing (approx.)</td>
                  <td className="py-3 pr-6 text-muted-foreground">
                    Free tier + Plus around $20/month.
                  </td>
                  <td className="py-3 pr-6 text-muted-foreground">
                    Free tier + Pro around $20–25/month.
                  </td>
                  <td className="py-3 text-muted-foreground">
                    Free tier + paid plans depending on Google Workspace setup.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-6 font-medium">Best for</td>
                  <td className="py-3 pr-6 text-muted-foreground">
                    Users who want one flexible assistant for many tasks.
                  </td>
                  <td className="py-3 pr-6 text-muted-foreground">
                    Users who prioritize deep reasoning and long‑form content quality.
                  </td>
                  <td className="py-3 text-muted-foreground">
                    Users embedded in Google products and collaboration flows.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground">
            Pricing and capabilities can change. Always verify current plans on the official
            websites before making long‑term decisions.
          </p>
        </section>

        {/* ChatGPT section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">ChatGPT: best all‑round assistant</h2>
          <p>
            ChatGPT is still the easiest starting point for most people. It combines strong
            writing, rewriting, summarization, coding help, and general assistance in one place,
            with a simple interface and broad ecosystem support.
          </p>
          <p>
            If you want a single tool to cover many different tasks — drafting blog posts,
            rewriting emails, summarizing PDFs, helping with code, and generating ideas — ChatGPT
            Plus remains one of the most practical choices.
          </p>
          <p>
            For a deep dive, read our dedicated{' '}
            <Link
              href="/blog/chatgpt-review-2025"
              className="underline underline-offset-4 font-medium"
            >
              ChatGPT review for 2025
            </Link>
            .
          </p>
        </section>

        {/* Claude section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Claude: best for depth and long texts</h2>
          <p>
            Claude is often preferred for long‑form writing, complex reasoning, and large
            documents. It tends to produce thoughtful, well‑structured outputs and handles long
            context particularly well.
          </p>
          <p>
            If your main work involves multi‑page reports, deep code reviews, or nuanced
            writing, Claude Pro may feel more “trustworthy” for those specific tasks, even if you
            still use ChatGPT for quick everyday queries.
          </p>
        </section>

        {/* Gemini section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Gemini: best inside Google ecosystem</h2>
          <p>
            Gemini is most appealing when you live inside Google tools. If your team relies
            heavily on Google Docs, Sheets, Drive, and Gmail, Gemini can feel like a natural fit
            because it integrates deeply with those products.
          </p>
          <p>
            It is also useful for users who combine AI assistance with search, research, and
            collaboration primarily within Google Workspace.
          </p>
        </section>

        {/* Use cases */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Which one should you pick for each task?</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Everyday personal assistance:</strong> ChatGPT is usually the best default.
            </li>
            <li>
              <strong>Long‑form writing and deep reasoning:</strong> Claude often wins on depth
              and nuance.
            </li>
            <li>
              <strong>Coding and debugging:</strong> ChatGPT for quick solutions, Claude for
              complex bugs and architecture reasoning, Gemini if you want tight Google
              integration.
            </li>
            <li>
              <strong>Working inside Google Docs and Gmail:</strong> Gemini is most natural when
              your workflow is already Google‑centric.
            </li>
          </ul>
          <p>
            For content‑heavy workflows, also explore our{' '}
            <Link
              href="/categories/ai-writing-tools"
              className="underline underline-offset-4 font-medium"
            >
              AI writing tools category
            </Link>{' '}
            to see specialized tools built for SEO and long‑form content.
          </p>
        </section>

        {/* FAQ */}
        <section className="space-y-5">
          <h2 className="text-2xl font-semibold">Frequently asked questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-lg border p-5">
                <h3 className="text-lg font-medium">{faq.question}</h3>
                <p className="mt-2 text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final recommendations */}
        <section className="space-y-4 rounded-xl border p-6">
          <h2 className="text-2xl font-semibold">Final recommendations</h2>
          <p>
            If you only want one subscription and you care about flexibility, ChatGPT Plus is
            still a strong first choice. If long‑form content and deep reasoning matter most,
            Claude Pro may be worth testing alongside it. If your team lives inside Google
            products, Gemini becomes more attractive.
          </p>
          <p>
            The best strategy for many professionals is not to choose one tool forever, but to
            match each model to what it does best and switch as your workflow changes.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/tools"
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Browse All AI Tools
            </Link>
            <Link
              href="/categories"
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Explore Categories
            </Link>
            <Link
              href="/blog/chatgpt-review-2025"
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Read ChatGPT Review
            </Link>
          </div>
        </section>
      </article>
    </div>
  )
}
