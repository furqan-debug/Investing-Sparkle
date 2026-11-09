import type { Metadata } from 'next';

import { Section, SectionHeading } from '@/components/ui/Section';
import { PageHero } from '@/components/PageHero';
import { CompoundingCalculator } from '@/components/tools/CompoundingCalculator';
import { CTABand } from '@/components/CTABand';

export const metadata: Metadata = {
  title: 'Compounding Calculator | see what time does to your money',
  description:
    'Work out what a starting amount plus monthly investing becomes over time, and how much of the total is growth rather than your own contributions.',
  alternates: { canonical: '/learn/tools/compounding-calculator' },
};

export default function CompoundingPage() {
  return (
    <>
      <PageHero
        back={{ href: '/learn/tools', label: 'All free tools' }}
        eyebrow="Free tool"
        title="Compounding Calculator"
        lede="Move the sliders and watch which input actually changes the outcome. It is almost never the one people expect."
      />

      <Section tone="paper">
        <CompoundingCalculator />
      </Section>

      <Section tone="white">
        <div className="mx-auto max-w-2xl">
          <SectionHeading
            eyebrow="What the numbers mean"
            title="Time does more work than returns."
          />
          <div className="prose-article mt-6">
            <p>
              Try this: set the return rate to 12% and the horizon to 10 years, and note the growth
              figure. Now leave the rate alone and change the horizon to 20 years. The result does
              not double, it grows by considerably more.
            </p>
            <p>
              Then go back and try the opposite. Keep the horizon at 10 years and raise the return
              from 12% to 15%. The improvement is real, but it is far smaller than what the extra
              decade produced.
            </p>
            <p>
              This is the single most useful thing a beginner can internalise, because it reorders
              the priorities. Chasing an extra few percent of return is where most people direct
              their effort, and where most of them lose money trying. Starting earlier and
              continuing for longer requires no skill at all.
            </p>
            <h2>What this calculator does not do</h2>
            <p>
              It assumes a constant return, applied evenly. No market behaves that way. Real returns
              arrive in bursts and drawdowns, and the sequence matters, particularly if you need to
              withdraw money during a bad stretch.
            </p>
            <p>
              It also ignores inflation, taxes, and transaction costs, all of which are real and all
              of which reduce what you actually keep. Treat the output as an illustration of how
              compounding behaves, not as a projection of your account balance.
            </p>
            <p>
              And the return rate is your assumption, not our forecast. We do not publish expected
              returns, because nobody can know them, and anyone who tells you otherwise is selling
              something.
            </p>
          </div>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
