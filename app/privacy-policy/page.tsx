import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - AILIQ',
  description: 'How AILIQ handles your personal data, cookies, analytics, and affiliate links. Your privacy is important to us.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>

        <div className="space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">1. Overview</h2>
            <p>
              AILIQ (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the website https://www.ailiq.xyz (the &quot;Service&quot;). This Privacy
              Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, including any other media form,
              media channel, mobile website, or mobile application related to or connected thereto.
            </p>
            <p className="mt-3">
              Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our Service. By using
              our Service, you signify that you have read, understood, and agree to be bound by all the terms of this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">2. Information We Collect</h2>
            <p className="mb-3">We collect information in the following ways:</p>
            <h3 className="text-lg font-semibold text-foreground mb-2">Automatically Collected Information</h3>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>
                <strong>Log Data:</strong> When you visit AILIQ, our servers automatically record information such as your IP address, browser type,
                operating system, and pages visited.
              </li>
              <li>
                <strong>Analytics:</strong> We use Google Analytics and similar tools to understand how visitors use our site, including which pages
                are most popular and how long you spend on each page.
              </li>
              <li>
                <strong>Cookies:</strong> We use cookies and similar tracking technologies to remember your preferences and improve your experience.
                See our Cookies section below for details.
              </li>
              <li>
                <strong>Referrer Information:</strong> We track which website referred you to AILIQ.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground mb-2">Information You Provide</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Email:</strong> If you contact us via email at best4liker@gmail.com, we collect and store your email address and message
                content.
              </li>
              <li>
                <strong>Feedback:</strong> If you submit feedback or suggestions about our reviews, we may collect that information.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">3. How We Use Your Information</h2>
            <p>AILIQ uses the collected data for the following purposes:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>To provide, maintain, and improve our Service</li>
              <li>To understand how you interact with our content and recommendations</li>
              <li>To respond to your emails and inquiries</li>
              <li>To send you updates about new tools or features (if you opt-in)</li>
              <li>To detect and prevent fraud, abuse, and security incidents</li>
              <li>To comply with legal obligations</li>
              <li>To analyze usage patterns and optimize user experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">4. Cookies and Tracking Technologies</h2>
            <p className="mb-3">
              We use cookies to enhance your experience on AILIQ. Cookies are small files stored on your device that help us remember your preferences.
            </p>
            <h3 className="text-lg font-semibold text-foreground mb-2">Types of Cookies We Use</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Essential Cookies:</strong> These are necessary for the website to function properly.
              </li>
              <li>
                <strong>Analytics Cookies:</strong> These help us understand how you use AILIQ through services like Google Analytics.
              </li>
              <li>
                <strong>Preference Cookies:</strong> These remember your settings and preferences (e.g., dark mode choice).
              </li>
              <li>
                <strong>Marketing Cookies:</strong> These track your interactions with our affiliate links and recommendations.
              </li>
            </ul>
            <p className="mt-3">
              Most browsers allow you to control cookies through their settings. You can disable cookies, but this may affect your experience on AILIQ.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">5. Affiliate Links and Third-Party Services</h2>
            <p>
              AILIQ uses affiliate links to generate revenue. When you click a tool&apos;s &quot;Visit&quot; button or affiliate link, you may be tracked
              by third-party services. These third parties have their own privacy policies. We do not control how third-party services use your data,
              and their practices may differ from ours. We recommend reviewing their privacy policies before making purchases.
            </p>
            <p className="mt-3">
              Third-party services we work with may include:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Tool providers (ChatGPT, Claude, Midjourney, etc.)</li>
              <li>Affiliate networks and tracking platforms</li>
              <li>Analytics services (Google Analytics, Vercel Analytics)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">6. Data Security</h2>
            <p>
              We take data security seriously and implement appropriate technical and organizational measures to protect your information against
              unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is
              100% secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">7. Your Rights and Choices</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal data, including the right to access, correct, or delete
              your information. To exercise these rights, please contact us at best4liker@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">8. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, and other
              factors. We will notify you of significant changes by posting the updated policy on this page and updating the &quot;Last Updated&quot;
              date. Your continued use of AILIQ after such updates constitutes your acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">9. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy, our privacy practices, or how we handle your data, please contact us at:{' '}
              <a href="mailto:best4liker@gmail.com" className="text-primary hover:underline">
                best4liker@gmail.com
              </a>
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
