import type { Metadata } from 'next';
import Link from 'next/link';

import { Section, SectionHeading } from '@/components/ui/Section';
import { PageHero } from '@/components/PageHero';
import { ZakatCalculator } from '@/components/tools/ZakatCalculator';
import { ToolGate } from '@/components/auth/ToolGate';
import { CTABand } from '@/components/CTABand';

export const metadata: Metadata = {
  title: 'Zakat Calculator | zakat on shares and investments',
  description:
    'Calculate zakat on a share portfolio, dividends, and cash holdings. Shows the reasoning, and says where scholars differ instead of picking for you.',
  alternates: { canonical: '/learn/tools/zakat-calculator' },
};

export default function ZakatPage() {
  return (
    <>
      <PageHero
        back={{ href: '/learn/tools', label: 'All free tools' }}
        eyebrow="Free tool"
        title="Zakat Calculator"
        lede="Free with a Google account. For shares, dividends, and the cash people forget: the balance sitting idle in a trading account. The full liability sheet updates as you type and sends to WhatsApp in one tap."
      />

      <Section tone="paper">
        <ToolGate>
          <ZakatCalculator />
        </ToolGate>
      </Section>

      <Section tone="white">
        <div className="mx-auto max-w-2xl">
          <SectionHeading eyebrow="How this works" title="Why the nisab moves." />
          <div className="prose-article mt-6">
            <p>
              Nisab is derived from prevailing gold or silver prices, so it moves constantly. The
              calculator estimates it from a live gold and silver feed, shows the timestamp, and
              lets you override it with a local figure. A dealer’s rate can differ from the
              international spot price, which is why the field stays editable.
            </p>
            <p>
              Silver is the more inclusive nisab and the one most people use. Gold gives a much
              higher threshold. The tool lets you switch between the two rather than choosing for
              you.
            </p>
            <p>
              The rate applied is 2.5%, the widely used figure for a lunar year.
            </p>
            <h2>Trading holdings versus long-term holdings</h2>
            <p>
              The distinction that matters is intent. Shares bought to sell for gain are generally
              treated like trade goods, and zakat is calculated on full market value. Shares held as
              long-term investments are, on a common view, zakatable on your proportional share of
              the company’s zakatable assets (its cash, receivables, and inventory) rather than on
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
              which liabilities are deductible, scholars differ, and we would rather tell you that
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
