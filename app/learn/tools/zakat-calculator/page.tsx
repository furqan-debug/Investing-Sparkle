import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { Section, SectionHeading } from '@/components/ui/Section';
import { ZakatCalculator } from '@/components/tools/ZakatCalculator';
import { CTABand } from '@/components/CTABand';

export const metadata: Metadata = {
  title: 'Zakat Calculator — zakat on shares and investments',
  description:
    'Calculate zakat on a share portfolio, dividends, and cash holdings. Shows the reasoning, and says where scholars differ instead of picking for you.',
  alternates: { canonical: '/learn/tools/zakat-calculator' },
};

export default function ZakatPage() {
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
          <h1 className="h1 mt-5 max-w-3xl">Zakat Calculator</h1>
          <p className="lede mt-4 max-w-2xl text-green-100">
            For shares, dividends, and the cash people forget — the balance sitting idle in a
            trading account.
          </p>
        </div>
      </section>

      <Section tone="paper">
        <ZakatCalculator />
      </Section>

      <Section tone="white">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="How this works" title="Why we ask you for the nisab." />
          <div className="prose-article mt-6">
            <p>
              Nisab is derived from prevailing gold or silver prices, so it moves constantly. A
              calculator with the threshold baked in gives a confidently wrong answer the moment
              prices shift — so we ask you to enter the current figure from a source you trust.
            </p>
            <p>
              The rate applied is 2.5%, the widely used figure for a lunar year.
            </p>
            <h2>Trading holdings versus long-term holdings</h2>
            <p>
              The distinction that matters is intent. Shares bought to sell for gain are generally
              treated like trade goods, and zakat is calculated on full market value. Shares held as
              long-term investments are, on a common view, zakatable on your proportional share of
              the company’s zakatable assets — its cash, receivables, and inventory — rather than on
              the whole market value.
            </p>
            <p>
              Many Pakistani listed companies publish a zakat-per-share figure precisely so
              investors do not have to attempt that calculation from outside. Check the annual report
              or company website, multiply by your holding, and use that figure in the second field.
            </p>
            <h2>The cash people miss</h2>
            <p>
              Uninvested cash sitting in a brokerage account is zakatable and is the item most often
              overlooked, because it does not feel like savings. Dividends received and still held as
              cash are in the same category.
            </p>
            <h2>Where we stop</h2>
            <p>
              We teach the calculation, not the ruling. On the treatment of long-term holdings and on
              which liabilities are deductible, scholars differ — and we would rather tell you that
              than quietly adopt one position and present it as settled. If your situation is unusual
              or the amount is significant, ask a qualified scholar.
            </p>
            <p>
              There is more detail in{' '}
              <Link href="/learn/insights/zakat-on-shares-in-pakistan">
                our full article on zakat and shares
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
