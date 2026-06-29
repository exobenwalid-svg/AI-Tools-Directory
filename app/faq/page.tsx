import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'FAQ - AILIQ | Frequently Asked Questions',
  description: 'Find answers to common questions about AILIQ, our reviews, affiliate disclosure, and how to submit tools.',
}

export default function FAQPage() {
  const faqs = [
    {
      category: 'About AILIQ',
      questions: [
        {
          question: 'What is AILIQ?',
          answer:
            'AILIQ is a trusted directory, review platform, and comparison engine for AI tools. We help individuals and organizations navigate the rapidly evolving AI landscape by providing honest, detailed reviews, side-by-side comparisons, and expert guides. Our mission is to save you time and money by doing the research for you.',
        },
        {
          question: 'How is AILIQ different from other AI tool directories?',
          answer:
            'AILIQ stands out through our commitment to transparency, detailed editorial methodology, and comprehensive comparisons. We not only list tools—we review them deeply, explain our methodology, disclose affiliate relationships clearly, and link directly to comparisons to help you understand which tool is best for your specific use case.',
        },
        {
          question: 'Is AILIQ free to use?',
          answer:
            'Yes, AILIQ is completely free to use. You can browse reviews, read comparisons, and access our blog without any cost. We generate revenue through affiliate commissions when you purchase tools through our links, but this doesn&apos;t affect your experience or costs.',
        },
      ],
    },
    {
      category: 'Our Reviews & Comparisons',
      questions: [
        {
          question: 'How do you select which tools to review?',
          answer:
            'We prioritize tools that are actively maintained, offer genuine value to users, and have meaningful adoption or innovative features in the AI space. Tools should be production-ready (not beta-only) and relevant to our audience. We also consider tool submissions and community requests.',
        },
        {
          question: 'Are your reviews biased?',
          answer:
            'No. We maintain strict editorial independence. Our reviews are based on actual use, research, and analysis—not affiliate commission rates or sponsorships. Higher commission rates don&apos;t lead to higher ratings. We disclose when we have affiliate relationships so you can make informed decisions. Read more about our editorial practices on our About page.',
        },
        {
          question: 'How do you handle sponsored or paid reviews?',
          answer:
            'We don&apos;t publish paid reviews. We do earn affiliate commissions when you buy tools through our links, and we disclose this clearly. But affiliate relationships never influence which tools we review or how we rate them. A tool&apos;s inclusion and rating are based solely on its merits.',
        },
        {
          question: 'How often do you update tool reviews?',
          answer:
            'We update existing reviews when tools release major features, change pricing, or when we discover significant changes in functionality or quality. We also add new tools regularly as the AI landscape evolves. For the most current information, we always recommend visiting the tool&apos;s official website.',
        },
        {
          question: 'Do you compare specific tools on AILIQ?',
          answer:
            'Yes! We have dedicated comparison pages for popular tool pairings like ChatGPT vs Claude, Midjourney vs DALL-E, and GitHub Copilot vs Tabnine. You can also use our comparison tool to compare any two tools side-by-side. Check out our Comparisons section.',
        },
      ],
    },
    {
      category: 'Submissions & Partnerships',
      questions: [
        {
          question: 'How can I submit my AI tool for review?',
          answer:
            'We&apos;d love to consider your tool! Email us at best4liker@gmail.com with your tool name, a link to your website, a brief description of what it does, target audience, and why you think it&apos;s valuable. We review submissions and will respond within 48 hours with next steps.',
        },
        {
          question: 'Do you accept paid submissions or sponsorships?',
          answer:
            'No. We accept tool submissions based on merit alone, not payment. Our reviews are independent, and we don&apos;t accept fees to review, rank, or feature tools. This ensures our recommendations remain unbiased and trustworthy.',
        },
        {
          question: 'Are you interested in partnerships?',
          answer:
            'We&apos;re open to meaningful partnerships that align with our editorial mission. This might include content collaborations, cross-promotions, or other opportunities. Reach out to us at best4liker@gmail.com or @AILIQDirectory on X.',
        },
      ],
    },
    {
      category: 'Affiliate Disclosure',
      questions: [
        {
          question: 'Does AILIQ use affiliate links?',
          answer:
            'Yes, AILIQ uses affiliate links to generate revenue. When you click a tool&apos;s &quot;Visit&quot; button or use our links, we may earn a small commission if you make a purchase. You pay nothing extra—the price you pay is the same whether you go through AILIQ or directly to the tool.',
        },
        {
          question: 'Does affiliate revenue influence your reviews?',
          answer:
            'No. Our reviews are based on honest assessment and thorough research. A tool&apos;s inclusion in AILIQ, its rating, and its comparison to other tools are never influenced by affiliate commission rates. We recommend tools we believe provide genuine value, regardless of commission structure.',
        },
        {
          question: 'How much commission does AILIQ earn?',
          answer:
            'Commission rates vary by tool provider and typically range from 5-30% of a purchase (when you purchase a paid plan). You always pay the regular price—affiliate relationships never cost you extra. Our goal is to help you find the right tool, and affiliate revenue is a bonus that helps sustain AILIQ.',
        },
        {
          question: 'Where can I learn more about your affiliate policy?',
          answer:
            'See our detailed Affiliate Disclosure page for complete information about how we handle affiliate relationships, our editorial policy, and how commissions work.',
        },
      ],
    },
    {
      category: 'Privacy & Data',
      questions: [
        {
          question: 'Do you collect personal information?',
          answer:
            'We collect minimal information: IP address, browser type, and pages visited through analytics services like Google Analytics. If you email us, we store your email and message. We use cookies to remember preferences like dark mode. See our Privacy Policy for full details.',
        },
        {
          question: 'How do you use analytics data?',
          answer:
            'We use analytics data to understand how visitors use AILIQ, which tools and comparisons are most popular, and where we can improve content. This helps us create better reviews and comparisons based on what our audience finds most valuable.',
        },
        {
          question: 'Will you sell my email address?',
          answer:
            'No, we will never sell your email or personal information. We respect your privacy. If you reach out to us, we use your email only to respond to you. We don&apos;t maintain a mailing list unless you specifically opt-in.',
        },
        {
          question: 'What about cookies and tracking?',
          answer:
            'We use cookies to enhance your experience (e.g., remembering your dark mode preference) and to track affiliate link clicks (to ensure you get credit for referred purchases). You can disable cookies in your browser settings, but this may affect your experience.',
        },
      ],
    },
    {
      category: 'Technical & Site Questions',
      questions: [
        {
          question: 'Is AILIQ available on mobile?',
          answer:
            'Yes! AILIQ is fully responsive and works great on mobile devices. You can browse reviews, read comparisons, and access all content from your phone or tablet.',
        },
        {
          question: 'I found a broken link or error on AILIQ. What should I do?',
          answer:
            'Please report it! Email us at best4liker@gmail.com with details about what you found and where. We take data accuracy seriously and will fix issues as soon as possible.',
        },
        {
          question: 'Can I use AILIQ content on my website or blog?',
          answer:
            'Our content is copyrighted by AILIQ. You&apos;re welcome to link to our reviews and comparisons and quote small excerpts with attribution. For larger uses, please contact us at best4liker@gmail.com for permission.',
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-3">Frequently Asked Questions</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Find answers to common questions about AILIQ, our reviews, and how we help you find the best AI tools.
        </p>

        <div className="space-y-12">
          {faqs.map((faqGroup, groupIndex) => (
            <section key={groupIndex}>
              <h2 className="text-2xl font-semibold text-foreground mb-6">{faqGroup.category}</h2>
              <div className="space-y-4">
                {faqGroup.questions.map((faq, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg bg-card hover:border-primary/50 transition-colors">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 p-6 border border-border rounded-lg bg-card">
          <h2 className="text-lg font-semibold text-foreground mb-3">Didn&apos;t find your answer?</h2>
          <p className="text-muted-foreground mb-4">
            We&apos;re always happy to help. Reach out to us via email at{' '}
            <a href="mailto:best4liker@gmail.com" className="text-primary hover:underline">
              best4liker@gmail.com
            </a>
            {' '}or on{' '}
            <a href="https://x.com/AILIQDirectory" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              X (@AILIQDirectory)
            </a>
            . You can also check our{' '}
            <Link href="/contact" className="text-primary hover:underline">
              Contact page
            </Link>{' '}
            for more ways to get in touch.
          </p>
        </div>
      </div>
    </div>
  )
}
