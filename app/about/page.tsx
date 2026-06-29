import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About AILIQ | Our Mission & Review Methodology',
  description:
    'Learn about AILIQ, our editorial mission, how we review AI tools, and our commitment to transparency and honest comparisons.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">About AILIQ</h1>

        <div className="space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Our Mission</h2>
            <p>
              AILIQ exists to solve a real problem: the overwhelming complexity of choosing the right AI tool. We&apos;re dedicated to helping individuals,
              teams, and organizations navigate the rapidly evolving landscape of AI solutions with trusted, honest, and detailed reviews. Our goal is to
              save you time, money, and frustration by providing the research and comparisons you need to make confident decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Who We Serve</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>
                <strong>Content Creators</strong> - Looking for AI writing and image generation tools
              </li>
              <li>
                <strong>Developers</strong> - Seeking coding assistants and AI development tools
              </li>
              <li>
                <strong>Business Decision-Makers</strong> - Evaluating enterprise AI solutions
              </li>
              <li>
                <strong>Students & Learners</strong> - Exploring AI tools for education and skill development
              </li>
              <li>
                <strong>AI Enthusiasts</strong> - Staying updated on the latest AI developments and tools
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">How We Review Tools</h2>
            <p className="mb-3">
              Our review process is built on transparency and honesty. Every tool on AILIQ is evaluated based on:
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li>
                <strong>Functionality</strong> - Does the tool actually deliver on its promises?
              </li>
              <li>
                <strong>Ease of Use</strong> - How intuitive is the interface and onboarding?
              </li>
              <li>
                <strong>Value for Money</strong> - Is the pricing fair relative to features and quality?
              </li>
              <li>
                <strong>Community & Support</strong> - Does the tool have active support and a healthy user community?
              </li>
              <li>
                <strong>Innovation</strong> - Are there unique features or advanced capabilities?
              </li>
              <li>
                <strong>Reliability</strong> - Is the tool stable and actively maintained?
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Comparison Philosophy</h2>
            <p>
              We don&apos;t believe there&apos;s a single &quot;best&quot; AI tool for everyone. Tools are best evaluated in context. That&apos;s why
              our comparison pages focus on helping you understand the strengths, weaknesses, and ideal use cases for each tool. When you{' '}
              <Link href="/compare" className="text-primary hover:underline">
                compare tools on AILIQ
              </Link>
              , you&apos;re getting an honest assessment of what each does well and where it falls short.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Editorial Independence & Affiliate Disclosure</h2>
            <p className="mb-3">
              AILIQ is committed to editorial integrity. We disclose affiliate relationships transparently because we believe you deserve to know when
              we may benefit from your purchase. Here&apos;s how we maintain independence:
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li>We review tools based on merit, not affiliate commission rates</li>
              <li>Affiliate relationships never influence which tools appear in our directory</li>
              <li>We clearly mark affiliate links and explain our disclosure policy</li>
              <li>You pay nothing extra when using our affiliate links</li>
              <li>Commission revenue helps us maintain and improve the AILIQ service</li>
            </ul>
            <p className="mt-3">
              Learn more about our affiliate practices on our{' '}
              <Link href="/affiliate-disclosure" className="text-primary hover:underline">
                affiliate disclosure page
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Scale & Future Vision</h2>
            <p>
              We started with a curated selection of the most popular and innovative AI tools. As the AI landscape evolves, we&apos;re committed to
              scaling responsibly—expanding our directory to cover more tools while maintaining our editorial standards. Our goal is to eventually
              catalog 500+ AI tools across all categories, ensuring you have the most comprehensive resource available.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Our Content: Blog & Guides</h2>
            <p>
              Beyond reviews and comparisons, we publish in-depth guides, tutorials, and analysis on AILIQ&apos;s{' '}
              <Link href="/blog" className="text-primary hover:underline">
                blog
              </Link>
              . Our content covers:
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li>AI tool comparison guides (e.g., ChatGPT vs Claude, Midjourney vs DALL-E)</li>
              <li>Beginner tutorials for popular tools</li>
              <li>Industry trends and announcements</li>
              <li>Tips for maximizing your AI tool investments</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Get in Touch</h2>
            <p>
              Have feedback? Found an issue with a review? Want to suggest a tool for our directory? Reach out to us at{' '}
              <a href="mailto:best4liker@gmail.com" className="text-primary hover:underline">
                best4liker@gmail.com
              </a>
              {' '}or{' '}
              <a
                href="https://x.com/AILIQDirectory"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                follow us on X (@AILIQDirectory)
              </a>
              . We read and respond to every message.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
