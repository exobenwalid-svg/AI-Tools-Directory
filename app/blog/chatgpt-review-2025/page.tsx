import type { Metadata } from 'next'
import Link from 'next/link'

const siteUrl = 'https://www.ailiq.xyz'
const pageUrl = `${siteUrl}/blog/chatgpt-review-2025`
const ogImageUrl = `${siteUrl}/images/chatgpt-review-2025-hero.png`

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
        <section aria-label="ChatGPT interface screenshot" className="space-y-3">
          <div className="overflow-hidden rounded-xl border">
            <img
              src="/images/chatgpt-review-2025-hero.png"
              alt="ChatGPT interface screenshot used in the 2025 review article"
              width={1600}
              height={900}
              className="h-auto w-full"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Screenshot used to illustrate the ChatGPT review and overall workflow experience in 2025.
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
          <h2 className="text-2xl font-semibold">What is ChatGPT?</h2>
          <p>
            ChatGPT is an AI assistant developed by OpenAI. It helps users generate text,
            summarize information, answer questions, brainstorm ideas, rewrite content, assist
            with code, and support many day-to-day knowledge tasks.
          </p>
          <p>
            It is used by individuals, teams, students, creators, and businesses. The main
            appeal is that it brings multiple use cases into one interface instead of acting as
            a single-purpose tool.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Key features in 2025</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>Strong general-purpose writing, rewriting, and summarization.</li>
            <li>Idea generation for content, marketing, and business tasks.</li>
            <li>Coding help for debugging, explanation, and drafting code.</li>
            <li>Multilingual support including Arabic, French, and Spanish.</li>
            <li>Browser-based, iOS, and Android apps with conversation history.</li>
            <li>Versatile enough for both casual users and professionals.</li>
          </ul>
          <p>
            The strongest part of ChatGPT is not a single feature — it is the ability to switch
            between many tasks quickly without needing a different product for each workflow. If
            you need a focused content optimizer, see our{' '}
            <Link href="/categories/ai-seo-tools" className="underline underline-offset-4">
              AI SEO tools category
            </Link>{' '}
            for alternatives built specifically for search.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">My experience using ChatGPT</h2>
          <p>
            When testing ChatGPT for writing and research workflows, the most consistent
            strengths are summarization of long documents, brainstorming ideas from a brief, and
            rewriting drafts with tone adjustments. For shorter tasks, the free tier holds up
            well.
          </p>
          <p>
            Where it became inconsistent was in longer content workflows and tasks that required
            very specific structure or factual precision. For those, prompting carefully and
            verifying outputs made a significant difference. The tool is not plug-and-play for
            everything — it rewards users who know how to prompt it well.
          </p>
          <p>
            Arabic support is real and useful for basic tasks, but users writing high-quality
            Arabic content professionally should plan to review and refine the output, especially
            for formal register.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Pricing: Free vs Plus vs Team</h2>
          <p className="text-sm text-muted-foreground">
            Pricing is subject to change. Verify current plans at{' '}
            <a
              href="https://openai.com/chatgpt/pricing"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              openai.com
            </a>{' '}
            before making a decision.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-3 pr-6 font-semibold">Plan</th>
                  <th className="py-3 pr-6 font-semibold">Price</th>
                  <th className="py-3 font-semibold">Best for</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-3 pr-6 font-medium">Free</td>
                  <td className="py-3 pr-6">$0/month</td>
                  <td className="py-3 text-muted-foreground">
                    Light usage, testing, occasional tasks
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-6 font-medium">Plus</td>
                  <td className="py-3 pr-6">~$20/month</td>
                  <td className="py-3 text-muted-foreground">
                    Frequent users, writers, researchers
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-6 font-medium">Team</td>
                  <td className="py-3 pr-6">~$25–30/user/month</td>
                  <td className="py-3 text-muted-foreground">
                    Small teams needing shared workspace and admin controls
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-6 font-medium">Enterprise</td>
                  <td className="py-3 pr-6">Custom</td>
                  <td className="py-3 text-muted-foreground">
                    Large organizations with security and compliance needs
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Pros and cons</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border p-5">
              <h3 className="mb-3 text-xl font-medium">Pros</h3>
              <ul className="list-disc space-y-2 pl-6">
                <li>Very flexible across many different tasks.</li>
                <li>Beginner-friendly interface with no learning curve.</li>
                <li>Strong ecosystem and broad integrations.</li>
                <li>Good for writing, brainstorming, and productivity.</li>
                <li>Reliable Arabic and multilingual support for everyday use.</li>
              </ul>
            </div>
            <div className="rounded-lg border p-5">
              <h3 className="mb-3 text-xl font-medium">Cons</h3>
              <ul className="list-disc space-y-2 pl-6">
                <li>Output quality varies by prompt quality and model.</li>
                <li>Advanced capabilities locked behind paid plans.</li>
                <li>Not always the best specialist for niche workflows.</li>
                <li>Requires fact-checking for important factual tasks.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Who should use ChatGPT?</h2>
          <p>
            ChatGPT is a strong fit for users who need one AI assistant for many general tasks —
            writers, marketers, students, founders, researchers, and solo operators who want
            speed and flexibility in one tool.
          </p>
          <p>
            It is especially useful when your work involves drafting, ideation, summarization,
            or quick iteration. If your need is very narrow, such as dedicated SEO content
            scoring, you may get better results from a specialized tool. Browse our{' '}
            <Link href="/categories" className="underline underline-offset-4">
              AI tool categories
            </Link>{' '}
            to find alternatives for specific workflows.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">ChatGPT vs alternatives</h2>
          <p>
            Compared with other AI assistants, ChatGPT competes mainly on versatility and brand
            familiarity. Some alternatives are stronger in long-context reasoning, deep coding
            tasks, or SEO-focused content workflows.
          </p>
          <p>
            For a direct comparison, see our upcoming{' '}
            <Link href="/blog" className="underline underline-offset-4">
              ChatGPT vs Claude vs Gemini comparison
            </Link>
            . To explore tools by category, browse the full{' '}
            <Link href="/tools" className="underline underline-offset-4">
              AI tools directory
            </Link>
            .
          </p>
        </section>

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

        <section className="space-y-4 rounded-xl border p-6">
          <h2 className="text-2xl font-semibold">Final assessment</h2>
          <p>
            ChatGPT continues to be one of the most practical general-purpose AI assistants for
            2025. For users who want one tool that handles writing, research, brainstorming, and
            coding assistance without switching between products, it remains a strong default
            choice.
          </p>
          <p>
            The best next step is testing it against your specific workflow, especially if you
            are deciding whether the Plus plan is worth the cost. For most frequent users, it
            is.
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
              href="/blog"
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Read More Reviews
            </Link>
          </div>
        </section>
      </article>
    </div>
  )
}
