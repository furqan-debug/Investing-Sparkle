import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calculator, Check, ShieldCheck } from 'lucide-react';

import { Section, SectionHeading } from '@/components/ui/Section';
import { PageHero } from '@/components/PageHero';
import { CTABand } from '@/components/CTABand';
import { ToolDirectory } from '@/components/tools/ToolDirectory';
import { CategoryIcon } from '@/components/tools/CategoryIcon';
import {
  categoryCount,
  essentialTools,
  liveTools,
  toolCategories,
  tools,
} from '@/content/tools';

export const metadata: Metadata = {
  title: 'Free tools | 56 calculators for Pakistani investors',
  description:
    'Tax, PSX trading, returns, dividends, valuation, savings, retirement, loans and gold calculators for Pakistani investors. Free with a Google account, with the rates and sources shown.',
  alternates: { canonical: '/learn/tools' },
};

export default function ToolsPage() {
  return (
    <>
      <PageHero
        eyebrow="Free tools"
        title="Every number, before anyone sells you anything."
        lede="Tax, PSX trading, returns, dividends, valuation, savings, retirement, loans and gold. Free with a Google account. Each calculator shows its working and, where a rate comes from the government, links to the source."
      >
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.02] px-2.5 py-1">
            <span className="signal-dot" aria-hidden /> {liveTools.length} live now
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.02] px-2.5 py-1">
            {tools.length} in the plan
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.02] px-2.5 py-1">
            <ShieldCheck className="h-3 w-3 text-green-400" aria-hidden /> One Google sign-in
          </span>
        </div>
      </PageHero>

      <Section tone="paper" tight>
        <SectionHeading
          eyebrow="Start here"
          title="Four numbers worth knowing before you invest."
          lede="These are the tools we would open first, whether you are checking a salary slip, a zakat date or a monthly investment."
        />

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {essentialTools.map((tool) => (
            <li key={tool.slug}>
              <Link href={`/learn/tools/${tool.slug}`} className="card flex h-full flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-sans text-sm font-semibold text-ink">{tool.name}</h3>
                  <Calculator className="h-4 w-4 shrink-0 text-sparkle-400" aria-hidden />
                </div>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-muted">{tool.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-sparkle-300">
                  Open tool <ArrowRight className="h-3 w-3" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="The directory"
            title={`All ${tools.length} tools, in nine categories.`}
            lede="Search by name, or filter by the part of your money you are trying to understand."
          />
          <p className="max-w-xs text-xs leading-relaxed text-muted">
            Tools marked Soon are in the queue. The live ones open after one Google sign-in, and
            the sign-in lasts 30 days.
          </p>
        </div>

        <div className="mt-8">
          <ToolDirectory items={tools} categories={toolCategories} />
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading
          eyebrow="Categories"
          title="Go straight to the question you have."
          lede="Each category page explains what the tools cover and which ones are live."
        />

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {toolCategories.map((category) => {
            const count = categoryCount(category.slug);
            return (
              <li key={category.slug}>
                <Link
                  href={`/learn/tools/category/${category.slug}`}
                  className="card flex h-full flex-col p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-sparkle-400/20 bg-sparkle-400/[0.06]">
                      <CategoryIcon name={category.icon} className="h-5 w-5 text-sparkle-300" />
                    </span>
                    <span className="mono-label text-[9px]">
                      {count.live}/{count.total} live
                    </span>
                  </div>
                  <h3 className="mt-4 font-sans text-sm font-semibold text-ink">{category.name}</h3>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-muted">
                    {category.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-sparkle-300">
                    View category <ArrowRight className="h-3 w-3" aria-hidden />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="white" tight>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="What free means here"
              title="No card. No lead form. No hidden rate."
              lede="The calculators are free because they are the most honest way we know to show how we think. The advisory work is separate, and nobody will call you because you used a calculator."
            />

            <ul className="mt-6 space-y-3 text-sm text-muted">
              {[
                'One Google sign-in opens every tool for 30 days.',
                'Government rates are dated and linked to the FBR source.',
                'Live prices show the feed and the time they were fetched.',
                'Where a figure is uncertain, the tool says so instead of guessing.',
              ].map((line) => (
                <li key={line} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-sparkle-400" aria-hidden />
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-line bg-white/[0.018] p-6">
            <p className="mono-label text-[10px]">A note on advice</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              These tools do the arithmetic. They do not tell you what to buy, and a result is not
              a recommendation. Tax law has exceptions a calculator cannot see. Use the number to
              ask a better question, then confirm anything material with a qualified professional.
            </p>
            <Link
              href="/disclaimer"
              className="link-hover mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-green-300"
            >
              Read the full disclaimer <ArrowRight className="h-3 w-3" aria-hidden />
            </Link>
          </div>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
