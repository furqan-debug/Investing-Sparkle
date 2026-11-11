import type { Metadata } from 'next';

import { Section, SectionHeading } from '@/components/ui/Section';
import { PageHero } from '@/components/PageHero';
import { RiskProfileQuiz } from '@/components/tools/RiskProfileQuiz';
import { ToolGate } from '@/components/auth/ToolGate';
import { PhilosophyStrip } from '@/components/PhilosophyStrip';

export const metadata: Metadata = {
  title: 'Risk Profile Quiz | what kind of investor are you?',
  description:
    'Eight questions that tell you what kind of investor you actually are, plus an asset allocation blueprint to match. Free with a Google account, and the blueprint is handed to WhatsApp.',
  alternates: { canonical: '/learn/tools/risk-profile' },
};

export default function RiskProfilePage() {
  return (
    <>
      <PageHero
        back={{ href: '/learn/tools', label: 'All free tools' }}
        eyebrow="Free tool"
        title="Risk Profile Quiz"
        lede="Free with a Google account. Eight questions about your timeline, your temperament, and your finances. It takes about two minutes, and it will tell you honestly if the answer is “not yet”. You get a risk profile and an asset allocation blueprint, with the full result ready to send in WhatsApp."
      />

      <Section tone="paper">
        <div className="mx-auto max-w-2xl">
          <ToolGate>
            <RiskProfileQuiz />
          </ToolGate>
        </div>
      </Section>

      <Section tone="white">
        <div className="mx-auto max-w-2xl">
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
              Someone with high capacity and low tolerance sells at the bottom of every correction, 
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
