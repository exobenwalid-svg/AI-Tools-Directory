import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure - AILIQ',
  description: 'Learn about AILIQ affiliate partnerships and disclosure policy.',
}

export default function AffiliateDisclosurePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">Affiliate Disclosure</h1>

        <div className="space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Our Commitment to Transparency</h2>
            <p>
              AILIQ maintains editorial integrity as our highest priority. We believe in full transparency regarding our business model and relationships with the tools we review.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Affiliate Partnerships</h2>
            <p>
              AILIQ may earn commissions through affiliate partnerships with some of the AI tools featured in our directory. These affiliate relationships do not influence our editorial decisions or review content.
            </p>
            <p className="mt-3">
              When a tool is part of an affiliate program, we disclose this information clearly on the relevant tool page and in our reviews.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">How We Maintain Editorial Integrity</h2>
            <ul className="space-y-2 list-disc list-inside ml-4">
              <li>We only recommend tools we genuinely believe provide value</li>
              <li>Affiliate status never determines whether or not we review a tool</li>
              <li>We clearly disclose affiliate relationships</li>
              <li>Negative reviews are published when warranted, regardless of affiliate status</li>
              <li>Our recommendations are based on features, usability, and effectiveness</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Support AILIQ</h2>
            <p>
              Using our affiliate links to purchase or subscribe to tools helps support the continued operation and maintenance of AILIQ. You pay the same price regardless of whether you use our link, but we earn a small commission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Questions?</h2>
            <p>
              If you have questions about our affiliate partnerships or editorial policy, please contact us at{' '}
              <a
                href="mailto:best4liker@gmail.com"
                className="text-primary hover:underline"
              >
                best4liker@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
