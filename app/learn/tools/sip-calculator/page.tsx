import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { Section, SectionHeading } from '@/components/ui/Section';
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
      <section className="bg-green-950 text-white">
        <div className="container-page py-14 md:py-20">
          <Link
            href="/learn/tools"
            className="inline-flex items-center gap-1.5 text-sm text-green-200 hover:text-sparkle-400"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> All free tools
          </Link>
          <h1 className="h1 mt-5 max-w-3xl">SIP Calculator</h1>
          <p className="lede mt-4 max-w-2xl text-green-100">
            The approach that suits most salaried people: a fixed amount, every month, regardless of
            what the market is doing. Move the delay slider to see the real cost of waiting.
          </p>
        </div>
      </section>

      <Section tone="paper">
        <SipCalculator />
      </Section>

      <Section tone="white">
        <div className="mx-auto max-w-3xl">
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
