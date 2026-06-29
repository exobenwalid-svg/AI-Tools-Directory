import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Use - AILIQ',
  description: 'Terms of use for AILIQ website, including content usage, affiliate links, and your rights and responsibilities.',
}

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Use</h1>

        <div className="space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing and using the AILIQ website (https://www.ailiq.xyz), you accept and agree to be bound by the terms and conditions of this
              agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">2. Use License</h2>
            <p>
              Permission is granted to temporarily download and view the materials (information, reviews, comparisons, and articles) on AILIQ for
              personal, non-commercial, educational purposes only. This constitutes a grant of a license, not a transfer of title, and under this license
              you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer any software contained on AILIQ</li>
              <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Use automated tools (scrapers, bots) to collect content without permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">3. Disclaimer of Warranties</h2>
            <p>
              The materials on AILIQ are provided on an &apos;as is&apos; basis. AILIQ makes no warranties, expressed or implied, and hereby disclaims
              and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a
              particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p className="mt-3">
              <strong>Important:</strong> Our reviews and recommendations are based on research and analysis but may not reflect your specific needs or
              circumstances. AI tool functionality, pricing, and availability change frequently. We recommend verifying current information directly with
              tool providers before making purchasing decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">4. Limitations of Liability</h2>
            <p>
              In no event shall AILIQ or its suppliers be liable for any damages (including, without limitation, damages for loss of data, profits, or
              business interruption) arising out of the use or inability to use the materials on AILIQ, even if AILIQ or an authorized representative has
              been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">5. Accuracy of Materials</h2>
            <p>
              The materials appearing on AILIQ, including tool reviews, comparisons, and pricing information, could include technical, typographical, or
              photographic errors. AILIQ does not warrant that any of the materials on its website are accurate, complete, or current. Tool information
              is updated regularly, but third-party providers may change features and pricing without notice. We recommend checking directly with tool
              providers for the most current information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">6. Affiliate Links and Third-Party Content</h2>
            <p>
              AILIQ contains affiliate links to AI tools and services. When you click these links, you may be tracked by third-party services. These
              third parties have their own terms of service and privacy policies that govern your interaction with them. AILIQ is not responsible for
              the content, accuracy, or practices of third-party websites.
            </p>
            <p className="mt-3">
              You pay no additional cost when using AILIQ affiliate links. Our commission structure does not influence which tools we review or recommend.
              For more information, see our{' '}
              <Link href="/affiliate-disclosure" className="text-primary hover:underline">
                affiliate disclosure page
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">7. External Links</h2>
            <p>
              AILIQ contains links to external websites and tools. These links are provided for convenience and informational purposes only. AILIQ does
              not endorse, control, or assume responsibility for the content of linked sites. Your use of external websites is at your own risk and
              subject to their terms and conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">8. User Conduct</h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon any intellectual property rights</li>
              <li>Harass, threaten, or defame any person or entity</li>
              <li>Post spam, viruses, or malicious code</li>
              <li>Attempt to gain unauthorized access to AILIQ systems</li>
              <li>Use automated tools to scrape or collect content without permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">9. Content Ownership</h2>
            <p>
              All content on AILIQ, including reviews, comparisons, blog articles, and recommendations, is owned by or licensed to AILIQ. You may use this
              content for personal, non-commercial purposes. Commercial use, reproduction, or distribution without permission is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">10. Modifications to Terms</h2>
            <p>
              AILIQ may revise these terms at any time without notice. By continuing to use this website after revisions are posted, you agree to be bound
              by the revised terms. We recommend checking this page periodically for changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">11. Severability</h2>
            <p>
              If any provision of these terms is found to be invalid or unenforceable, that provision shall be modified to the minimum extent necessary to
              make it enforceable, or if not possible, severed. The remaining provisions shall continue in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">12. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Use or AILIQ&apos;s practices, please contact us at{' '}
              <a href="mailto:best4liker@gmail.com" className="text-primary hover:underline">
                best4liker@gmail.com
              </a>
              {' '}or on{' '}
              <a
                href="https://x.com/AILIQDirectory"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                X (@AILIQDirectory)
              </a>
              .
            </p>
          </section>

          <div className="pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">Last Updated: June 2026</p>
          </div>
        </div>
      </div>
    </div>
  )
}
