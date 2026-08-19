import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { Section, SectionHeading } from '@/components/ui/Section';
import { RoiCalculator } from '@/components/tools/RoiCalculator';
import { CTABand } from '@/components/CTABand';

export const metadata: Metadata = {
  title: 'ROI Calculator — what a holding actually returned',
  description:
    'Measure the real return on a PSX position, including dividends and transaction costs, with the annualised figure alongside.',
  alternates: { canonical: '/learn/tools/roi-calculator' },
};

export default function RoiPage() {
  return (
    <>
      <section className="bg-green-950 text-white">
        <div className="container-page py-14 md:py-20">
          <Link
            href="/learn/tools"
            className="inline-flex items-center gap-1.5 text-sm text-green-200 hover:text-sparkle-400"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> All free tools
          </Link>
          <h1 className="h1 mt-5 max-w-3xl">ROI Calculator</h1>
          <p className="lede mt-4 max-w-2xl text-green-100">
            Most people measure a position by comparing the buy price to the sell price. That is not
            the return — it leaves out the dividends you received and the costs you paid.
          </p>
        </div>
      </section>

      <Section tone="paper">
        <RoiCalculator />
      </Section>

      <Section tone="white">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Reading the result"
            title="Two numbers matter more than the headline."
          />
          <div className="prose-article mt-6">
            <h2>The annualised figure</h2>
            <p>
              A 40% total return sounds identical whether it took one year or seven. It is not
              remotely the same thing. The annualised figure converts any holding period into a
              yearly rate, which is the only way to compare positions honestly — or to compare them
              against what you would have earned leaving the money somewhere safe.
            </p>
            <p>
              That comparison is the useful one, and it is uncomfortable more often than people
              expect. In periods when government instruments have offered high yields, a great many
              equity positions have quietly underperformed the risk-free alternative.
            </p>
            <h2>The dividend share</h2>
            <p>
              For a long-held PSX position, dividends frequently account for a substantial portion of
              the total return. Measuring only the price change systematically understates what your
              holdings actually did — sometimes dramatically, on the kind of established
              dividend-paying company a beginner should be looking at in the first place.
            </p>
            <h2>What this deliberately leaves out</h2>
            <p>
              Tax. Capital gains tax on the sale and the tax already deducted from your dividends
              both reduce what you kept. Rates change between budgets, so rather than embedding a
              figure that will go stale, we leave it to you — subtract the tax you actually paid, and
              you have the real after-tax return.
            </p>
            <p>
              It also ignores inflation. A 12% nominal return in a year of high inflation may be a
              real loss in purchasing power. Worth calculating occasionally, if only to keep the
              nominal figures in perspective.
            </p>
            <h2>Use it on positions you still hold</h2>
            <p>
              Enter today’s price as the sell price and it tells you what the position has returned so
              far. Doing this quarterly across your portfolio, alongside{' '}
              <Link href="/learn/insights/when-to-sell-a-stock">the sell framework</Link>, is most of
              what a portfolio review actually consists of.
            </p>
          </div>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
