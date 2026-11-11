import type { Metadata } from 'next';
import Link from 'next/link';

import { Section, SectionHeading } from '@/components/ui/Section';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PageHero } from '@/components/PageHero';
import { InsightsBrowser } from '@/components/InsightsBrowser';
import { Newsletter } from '@/components/Newsletter';
import { CTABand } from '@/components/CTABand';
import { publishedArticles, activeCategories } from '@/content/insights';

export const metadata: Metadata = {
  title: 'Insights | Honest writing about investing in Pakistan',
  description:
    'Explainers on PSX mechanics, fundamental and technical analysis, Shariah-compliant investing, zakat and tax, and the mistakes that cost new investors the most.',
  alternates: { canonical: '/learn/insights' },
};

export default function InsightsPage() {
  const [lead] = publishedArticles;

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Writing about investing in Pakistan, without the hype."
        lede="No tips, no predictions, no &ldquo;stocks to watch this week&rdquo;. Just explanations of how things work, written for people who are starting out."
      />

      {lead && (
        <Section tone="paper">
          <ScrollReveal>
            <SectionHeading eyebrow="Latest" title="Start here." />
          </ScrollReveal>
          <ScrollReveal animation="scale-in" delay={0.15}>
            <div className="card mt-8 grid gap-6 p-6 md:p-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
              <div>
                <span className="mono-label inline-flex items-center gap-1.5 rounded-full border border-green-500/25 bg-green-500/[0.07] px-2.5 py-1 text-[10px] text-green-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
                  {lead.category}
                </span>
                <h2 className="h3 mt-4">
                  <Link href={`/learn/insights/${lead.slug}`} className="link-hover hover:text-green-700">
                    {lead.title}
                  </Link>
                </h2>
                <p className="mt-3 text-muted">{lead.description}</p>
                <p className="mt-4 text-sm text-muted">{lead.readingMinutes} min read</p>
              </div>
              <div className="rounded-2xl bg-paper p-6">
                <Newsletter compact />
                <p className="mt-3 text-xs text-muted">
                  One email a week. One explainer, one market update, nothing else.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </Section>
      )}

      <Section tone="white">
        <ScrollReveal>
          <SectionHeading eyebrow="The archive" title="Browse everything." />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="mt-8">
            <InsightsBrowser articles={publishedArticles} categories={activeCategories()} />
          </div>
        </ScrollReveal>
      </Section>

      <CTABand />
    </>
  );
}
