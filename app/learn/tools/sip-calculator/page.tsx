import type { Metadata } from 'next';
import Link from 'next/link';

import { Section, SectionHeading } from '@/components/ui/Section';
import { PageHero } from '@/components/PageHero';
import { SipCalculator } from '@/components/tools/SipCalculator';
import { CTABand } from '@/components/CTABand';

export const metadata: Metadata = {
  title: 'SIP Calculator | what monthly investing builds up to',
  description:
    'Work out what a fixed monthly investment becomes over time, and exactly what starting a few years late costs you. Free, no signup.',
  alternates: { canonical: '/learn/tools/sip-calculator' },
};

export default function SipPage() {
  return (
    <>
      <PageHero
        back={{ href: '/learn/tools', label: 'All free tools' }}
        eyebrow="Free tool"
        title="SIP Calculator"
        lede="The approach that suits most salaried people: a fixed amount, every month, regardless of what the market is doing. Move the delay slider to see the real cost of waiting."
      />

      <Section tone="paper">
        <SipCalculator />
      </Section>

      <Section tone="white">
        <div className="mx-auto max-w-2xl">
          <SectionHeading
            eyebrow="What this shows"
            title="The delay is the expensive part."
          />
          <div className="prose-article mt-6">
            <p>
              Set the delay to five years and look at the gap. Most people expect starting five
              years late to cost roughly five years’ worth of contributions. It costs considerably
              more, because the money you would have invested first is the money with the longest
              time to compound.
            </p>
            <p>
              This is the strongest argument for starting with a small amount now rather than a
              sensible amount later. The first contributions do disproportionate work, and no amount
              of subsequent effort recovers them.
            </p>
            <h2>Why regular investing suits most people</h2>
            <p>
              The main benefit is not the averaging arithmetic, which is modest. It is that a fixed
              schedule removes the decision at exactly the moments your judgement is least reliable
              , after a long rise, when buying feels safe, and after a fall, when it feels dangerous.
              Both instincts are backwards and both are very strong.
            </p>
            <p>
              The month you least want to make your scheduled investment is usually the month it
              does the most good.
            </p>
            <h2>What it does not do</h2>
            <p>
              It does not protect you from loss. Investing regularly into a business that
              deteriorates permanently just means buying more of something falling. And it does not
              beat investing a lump sum on average, if you happen to have one, markets rise more
              often than they fall, so earlier money usually has more time to work.
            </p>
            <p>
              Regular investing is optimal for someone earning a salary and investing as the money
              arrives. That is most people, but it is worth knowing which case you are in.
            </p>
            <p>
              There is more detail in{' '}
              <Link href="/learn/insights/sip-investing-in-pakistan">
                our article on setting this up on PSX
              </Link>
              , including how to work around the absence of an automatic mechanism.
            </p>
          </div>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
