'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Tool } from '@/lib/tools/types'

interface ComparisonDetailProps {
  toolA: Tool
  toolB: Tool
  allTools: Tool[]
}

export function ComparisonDetail({ toolA, toolB }: ComparisonDetailProps) {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)

  return (
    <div className="space-y-12">
      {/* Overview Section */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">Overview</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border border-border rounded-lg bg-card">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-semibold text-foreground">{toolA.name}</h3>
              <div className="text-right">
                <div className="text-2xl font-bold text-yellow-500">{toolA.rating.toFixed(1)}</div>
                <div className="text-xs text-muted-foreground">{toolA.review_count || 0} reviews</div>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">{toolA.short_description}</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category:</span>
                <span className="font-medium text-foreground">{toolA.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pricing:</span>
                <span className="font-medium text-foreground capitalize">{toolA.price}</span>
              </div>
            </div>
          </div>

          <div className="p-6 border border-border rounded-lg bg-card">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-semibold text-foreground">{toolB.name}</h3>
              <div className="text-right">
                <div className="text-2xl font-bold text-yellow-500">{toolB.rating.toFixed(1)}</div>
                <div className="text-xs text-muted-foreground">{toolB.review_count || 0} reviews</div>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">{toolB.short_description}</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category:</span>
                <span className="font-medium text-foreground">{toolB.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pricing:</span>
                <span className="font-medium text-foreground capitalize">{toolB.price}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">Pricing</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border border-border rounded-lg bg-card">
            <h3 className="font-semibold text-foreground mb-4">{toolA.name} Pricing</h3>
            {toolA.pricing_tiers.length > 0 ? (
              <div className="space-y-3">
                {toolA.pricing_tiers.map((tier, idx) => (
                  <div key={idx} className="p-3 border border-border/50 rounded bg-background/50">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-foreground">{tier.name}</p>
                      <p className="text-sm font-bold text-primary">{tier.price}</p>
                    </div>
                    {tier.features.length > 0 && (
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {tier.features.slice(0, 3).map((feature, i) => (
                          <li key={i}>• {feature}</li>
                        ))}
                        {tier.features.length > 3 && <li className="text-xs">+ {tier.features.length - 3} more</li>}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">Pricing details not available</p>
            )}
          </div>

          <div className="p-6 border border-border rounded-lg bg-card">
            <h3 className="font-semibold text-foreground mb-4">{toolB.name} Pricing</h3>
            {toolB.pricing_tiers.length > 0 ? (
              <div className="space-y-3">
                {toolB.pricing_tiers.map((tier, idx) => (
                  <div key={idx} className="p-3 border border-border/50 rounded bg-background/50">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-foreground">{tier.name}</p>
                      <p className="text-sm font-bold text-primary">{tier.price}</p>
                    </div>
                    {tier.features.length > 0 && (
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {tier.features.slice(0, 3).map((feature, i) => (
                          <li key={i}>• {feature}</li>
                        ))}
                        {tier.features.length > 3 && <li className="text-xs">+ {tier.features.length - 3} more</li>}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">Pricing details not available</p>
            )}
          </div>
        </div>
      </section>

      {/* Strengths & Weaknesses */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">Strengths & Weaknesses</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-foreground mb-3">{toolA.name}</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">Strengths</p>
                  <ul className="space-y-1">
                    {toolA.pros.map((pro, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">Weaknesses</p>
                  <ul className="space-y-1">
                    {toolA.cons.map((con, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-red-600 dark:text-red-400 mt-0.5">✗</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-foreground mb-3">{toolB.name}</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">Strengths</p>
                  <ul className="space-y-1">
                    {toolB.pros.map((pro, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">Weaknesses</p>
                  <ul className="space-y-1">
                    {toolB.cons.map((con, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-red-600 dark:text-red-400 mt-0.5">✗</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases & Verdict */}
      <section className="bg-card border border-border rounded-lg p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Best For</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-foreground mb-3">Choose {toolA.name} if you:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Need {toolA.category.toLowerCase()}</li>
              <li>• Prefer a {toolA.price} model</li>
              <li>• Value {toolA.pros[0]}</li>
              <li>• Want straightforward integration</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-3">Choose {toolB.name} if you:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Need {toolB.category.toLowerCase()}</li>
              <li>• Prefer a {toolB.price} model</li>
              <li>• Value {toolB.pros[0]}</li>
              <li>• Want advanced features</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQs */}
      {(toolA.faqs.length > 0 || toolB.faqs.length > 0) && (
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {/* Combined FAQs from both tools */}
            {toolA.faqs
              .concat(toolB.faqs)
              .slice(0, 5)
              .map((faq, idx) => (
                <details
                  key={idx}
                  open={expandedFAQ === `${idx}`}
                  onToggle={() => setExpandedFAQ(expandedFAQ === `${idx}` ? null : `${idx}`)}
                  className="border border-border rounded-lg p-4 bg-card hover:border-primary/50 transition-colors cursor-pointer"
                >
                  <summary className="font-semibold text-foreground select-none">{faq.question}</summary>
                  <p className="text-sm text-muted-foreground mt-3">{faq.answer}</p>
                </details>
              ))}
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="bg-primary/5 border border-primary/20 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">Ready to decide?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Try both tools to see which one works best for your workflow. Many offer free trials or freemium plans.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {toolA.affiliate_url && (
            <a
              href={toolA.affiliate_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try {toolA.name}
            </a>
          )}
          {toolB.affiliate_url && (
            <a
              href={toolB.affiliate_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/80 transition-colors"
            >
              Try {toolB.name}
            </a>
          )}
        </div>
      </section>
    </div>
  )
}
