import type { Metadata } from 'next';

import { Section, SectionHeading } from '@/components/ui/Section';
import { ArticleCard } from '@/components/ArticleCard';
import { Newsletter } from '@/components/Newsletter';
import { CTABand } from '@/components/CTABand';
import { publishedArticles } from '@/content/insights';

export const metadata: Metadata = {
  title: 'Insights — honest writing about investing in Pakistan',
  description:
    'Explainers on PSX mechanics, fundamental and technical analysis, Shariah-compliant investing, and the mistakes that cost new investors the most.',
  alternates: { canonical: '/learn/insights' },
};

export default function InsightsPage() {
  // The category filter is deliberately deferred until there are enough
  // articles for filtering to be useful — a filter bar over five posts is
  // furniture, not navigation. Add it when the archive passes ~15 articles.
  const [lead, ...rest] = publishedArticles;

  return (
    <>
      <section className="bg-green-950 text-white">
        <div className="container-page py-16 md:py-24">
          <p className="eyebrow text-sparkle-400">Insights</p>
          <h1 className="h1 mt-4 max-w-3xl">
            Writing about investing in Pakistan — without the hype.
          </h1>
          <p className="lede mt-5 max-w-2xl text-green-100">
            No tips, no predictions, no “stocks to watch this week”. Just explanations of how things
            work, written for people who are starting out.
          </p>
        </div>
      </section>

      {lead && (
        <Section tone="paper">
          <SectionHeading eyebrow="Latest" title="Start here." />
          <div className="mt-8 grid gap-8 rounded-3xl border border-line bg-white p-8 lg:grid-cols-[1.3fr_1fr] lg:items-center md:p-10">
            <div>
              <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                {lead.category}
              </span>
              <h2 className="h3 mt-4">
                <a href={`/learn/insights/${lead.slug}`} className="hover:text-green-700">
                  {lead.title}
                </a>
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
        </Section>
      )}

      <Section tone="white">
        <SectionHeading eyebrow="All articles" title="The archive." />
        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((article) => (
            <li key={article.slug}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>

        {rest.length === 0 && (
          <p className="mt-8 text-muted">More articles are being written. Check back soon.</p>
        )}
      </Section>

      <CTABand />
    </>
  );
}
