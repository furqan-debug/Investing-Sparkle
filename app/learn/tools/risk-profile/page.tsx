import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { Section, SectionHeading } from '@/components/ui/Section';
import { RiskProfileQuiz } from '@/components/tools/RiskProfileQuiz';
import { PhilosophyStrip } from '@/components/PhilosophyStrip';

export const metadata: Metadata = {
  title: 'Risk Profile Quiz — what kind of investor are you?',
  description:
    'Eight questions that tell you what kind of investor you actually are, and what that means for how you should build a portfolio. Free, no signup.',
  alternates: { canonical: '/learn/tools/risk-profile' },
};

export default function RiskProfilePage() {
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
          <h1 className="h1 mt-5 max-w-3xl">Risk Profile Quiz</h1>
          <p className="lede mt-4 max-w-2xl text-green-100">
            Eight questions about your timeline, your temperament, and your finances. It takes about
            two minutes, and it will tell you honestly if the answer is “not yet”.
          </p>
        </div>
      </section>

      <Section tone="paper">
        <div className="mx-auto max-w-3xl">
          <RiskProfileQuiz />
        </div>
      </Section>

      <Section tone="white">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="What this measures"
            title="Risk tolerance is two different things."
          />
          <div className="prose-article mt-6">
            <p>
              People use “risk profile” to mean one thing, but it is really two. Your{' '}
              <strong>capacity</strong> for risk is financial: your time horizon, your income
              stability, your emergency fund, how much of your total savings is involved. It is
              measurable and largely objective.
            </p>
            <p>
              Your <strong>tolerance</strong> for risk is behavioural: what you actually do when a
              position falls 25%. Most people overestimate this until the first time it happens to
              real money.
            </p>
            <p>
              The quiz asks about both, because a mismatch between them is where the damage occurs.
              Someone with high capacity and low tolerance sells at the bottom of every correction —
              the worst outcome available, and one that no amount of stock-picking skill can offset.
            </p>
            <p>
              This is why we teach frameworks rather than giving recommendations. A recommendation
              you cannot evaluate is one you will abandon at exactly the wrong moment.
            </p>
          </div>
        </div>
      </Section>

      <PhilosophyStrip />
    </>
  );
}
