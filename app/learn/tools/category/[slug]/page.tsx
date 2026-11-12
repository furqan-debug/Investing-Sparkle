import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';

import { Section, SectionHeading } from '@/components/ui/Section';
import { PageHero } from '@/components/PageHero';
import { CTABand } from '@/components/CTABand';
import { SourceNote } from '@/components/tools/ToolUI';
import {
  getCategory,
  toolCategories,
  toolsInCategory,
} from '@/content/tools';
import { TAX_YEAR, VERIFIED_ON } from '@/content/tax-rates';
import { formatDate } from '@/lib/format';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return toolCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};

  return {
    title: `${category.name} calculators | Free tools`,
    description: category.description,
    alternates: { canonical: `/learn/tools/category/${category.slug}` },
  };
}

export default async function CategoryPage({ params }: Params) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const items = toolsInCategory(category.slug);
  const live = items.filter((tool) => tool.status === 'live');
  const others = toolCategories.filter((c) => c.slug !== category.slug);

  return (
    <>
      <PageHero
        back={{ href: '/learn/tools', label: 'All free tools' }}
        eyebrow="Tool category"
        title={category.name}
        lede={category.intro}
      >
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.02] px-2.5 py-1">
            <span className="signal-dot" aria-hidden /> {live.length} live
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.02] px-2.5 py-1">
            {items.length} tools in this category
          </span>
          {category.slug === 'tax-zakat' && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.02] px-2.5 py-1">
              <Check className="h-3 w-3 text-green-400" aria-hidden /> Tax year {TAX_YEAR}
            </span>
          )}
        </div>
      </PageHero>

      <Section tone="paper">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((tool) => {
            const isLive = tool.status === 'live';

            const body = (
              <>
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-sans text-sm font-semibold leading-snug text-ink">
                    {tool.name}
                  </h2>
                  {!isLive && (
                    <span className="mono-label shrink-0 rounded-full border border-sparkle-400/25 bg-sparkle-400/[0.06] px-2 py-1 text-[9px] text-sparkle-300">
                      Soon
                    </span>
                  )}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted">{tool.blurb}</p>
                <p className="mt-3 flex-1 border-t border-line pt-3 text-xs leading-relaxed text-muted">
                  <span className="mono-label text-[9px]">Gives you</span>
                  <br />
                  {tool.outcome}
                </p>
                {isLive ? (
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-sparkle-300">
                    Open tool <ArrowRight className="h-3 w-3" aria-hidden />
                  </span>
                ) : (
                  <span className="mono-label mt-4 text-[9px] text-low">In the queue</span>
                )}
              </>
            );

            return (
              <li key={tool.slug}>
                {isLive ? (
                  <Link href={`/learn/tools/${tool.slug}`} className="card flex h-full flex-col p-5">
                    {body}
                  </Link>
                ) : (
                  <div className="card flex h-full flex-col p-5 opacity-65">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </Section>

      {category.slug === 'tax-zakat' && (
        <Section tone="white">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              eyebrow="Where the rates come from"
              title="Published figures, dated and linked."
              lede={`Every rate in these tools was checked against the Finance Act 2026 and the FBR rate card on ${formatDate(VERIFIED_ON)}. Nothing is inferred from a news article.`}
            />

            <div className="mt-6">
              <SourceNote
                sources={['financeAct2026', 'circular2', 'whtCard', 'ordinance', 'salientFeatures']}
                extra="One discrepancy is worth knowing: budget papers quoted 1.5% for section 236K, while the enacted Finance Act 2026 sets 1.25%. The tools use the enacted figure and say so on the page. When a rate changes mid-year, the verified date on each tool is the date to check against."
              />
            </div>

            <div className="prose-article mt-8">
              <h2>Why the tools ask so many questions</h2>
              <p>
                Pakistan tax depends on the kind of income, the date of acquisition, the value of
                the property and whether you are on the Active Taxpayers List. A calculator that
                asks only for income and returns one rate would be fast and wrong. The questions are
                the calculation.
              </p>
              <p>
                Where a figure is genuinely uncertain, the tool shows the range or asks you to enter
                the rate. A confident number built on a guess is worse than an honest blank.
              </p>
            </div>
          </div>
        </Section>
      )}

      <Section tone={category.slug === 'tax-zakat' ? 'paper' : 'white'} tight>
        <SectionHeading eyebrow="Other categories" title="Keep exploring." />

        <ul className="mt-6 flex flex-wrap gap-2">
          {others.map((other) => (
            <li key={other.slug}>
              <Link
                href={`/learn/tools/category/${other.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-white/20 hover:text-ink"
              >
                {other.name}
                <ArrowRight className="h-3 w-3" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CTABand />
    </>
  );
}
