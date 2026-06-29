import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact AILIQ | Get in Touch',
  description: 'Contact AILIQ with feedback, tool submissions, partnership inquiries, or general questions. Multiple ways to reach us.',
}

export default function ContactPage() {
  const contactReasons = [
    {
      title: 'Tool Review Request',
      description: 'Want to suggest an AI tool for our directory? Tell us about it, and we&apos;ll evaluate it for inclusion.',
    },
    {
      title: 'Feedback & Issues',
      description: 'Found an error in a review? Disagree with our assessment? We want to hear your perspective.',
    },
    {
      title: 'Partnership & Collaboration',
      description: 'Interested in featuring AILIQ on your platform or collaborating on content? Let&apos;s talk.',
    },
    {
      title: 'Media & Interviews',
      description: 'Journalist or podcaster? We&apos;re available for interviews about AI tools and industry trends.',
    },
    {
      title: 'General Questions',
      description: 'Have a question about AILIQ, our methodology, or anything else? We&apos;re here to help.',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-3">Contact AILIQ</h1>
        <p className="text-lg text-muted-foreground mb-12">
          We&apos;re always happy to hear from our readers, tool creators, and partners. Here&apos;s how to reach us.
        </p>

        {/* Direct Contact */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Direct Contact</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border border-border rounded-lg bg-card hover:border-primary/50 transition-colors">
              <h3 className="text-lg font-semibold text-foreground mb-3">Email</h3>
              <p className="text-muted-foreground mb-4">Send us an email for any inquiry. We respond to all messages within 48 hours.</p>
              <a href="mailto:best4liker@gmail.com" className="text-primary font-semibold hover:underline">
                best4liker@gmail.com
              </a>
            </div>

            <div className="p-6 border border-border rounded-lg bg-card hover:border-primary/50 transition-colors">
              <h3 className="text-lg font-semibold text-foreground mb-3">X (Twitter)</h3>
              <p className="text-muted-foreground mb-4">For quick questions or conversations, reach out on X. We check regularly.</p>
              <a
                href="https://x.com/AILIQDirectory"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:underline"
              >
                @AILIQDirectory
              </a>
            </div>
          </div>
        </div>

        {/* Contact Reasons */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Common Reasons to Contact Us</h2>

          <div className="space-y-4">
            {contactReasons.map((reason, index) => (
              <div key={index} className="p-4 border border-border rounded-lg bg-card/50 hover:border-primary/50 transition-colors">
                <h3 className="font-semibold text-foreground mb-2">{reason.title}</h3>
                <p className="text-muted-foreground text-sm">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Response Expectations */}
        <div className="p-6 border border-border rounded-lg bg-card">
          <h2 className="text-lg font-semibold text-foreground mb-3">What to Expect</h2>
          <ul className="space-y-2 list-disc list-inside text-muted-foreground">
            <li>We read every message we receive</li>
            <li>Response time is typically 24-48 hours for email</li>
            <li>Spam messages and promotional solicitations may not receive responses</li>
            <li>For tool review requests, include a detailed description and your use case</li>
            <li>Partnership inquiries are reviewed on a case-by-case basis</li>
          </ul>
        </div>

        {/* FAQ Link */}
        <div className="mt-12 p-6 border border-border rounded-lg bg-card">
          <h2 className="text-lg font-semibold text-foreground mb-3">Have a Quick Question?</h2>
          <p className="text-muted-foreground mb-4">
            Check our{' '}
            <a href="/faq" className="text-primary hover:underline">
              FAQ page
            </a>{' '}
            first—your question might already be answered there.
          </p>
        </div>
      </div>
    </div>
  )
}
