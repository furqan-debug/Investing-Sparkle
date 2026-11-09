import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Section } from '@/components/ui/Section';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PageHero } from '@/components/PageHero';
import { CTABand } from '@/components/CTABand';
import { tools } from '@/content/tools';

export const metadata: Metadata = {
  title: 'Free tools | Calculators and a risk profile quiz',
  description:
    'Free calculators and a risk profile quiz for Pakistani investors. No signup required, no cost, no catch.',
  alternates: { canonical: '/learn/tools' },
};

export default function ToolsPage() {
  return (
    <>
      <PageHero
        eyebrow="Free tools"
        title="Work out the numbers before anyone sells you anything."
        lede="Free to use, no account needed. We ask for your email only if you want the result sent to you, and you can ignore that and still keep the answer."
      />

      <Section tone="paper">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, i) => {
            const isLive = tool.status === 'live';
            const body = (
              <>
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-sans text-base font-semibold text-ink">{tool.name}</h2>
                  {!isLive && (
                    <span className="shrink-0 rounded-full bg-sparkle-100 px-2.5 py-1 text-xs font-medium text-ink">
                      Coming soon
                    </span>
                  )}
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{tool.blurb}</p>
                <p className="mt-3.5 border-t border-line pt-3.5 text-xs text-muted">
                  <span className="font-semibold uppercase tracking-wider">Gives you</span>
                  <br />
                  {tool.outcome}
                </p>
                {isLive && (
                  <span className="mt-3.5 inline-flex items-center gap-1.5 text-sm font-semibold text-green-700">
                    Open tool <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </span>
                )}
              </>
            );

            return (
              <li key={tool.slug}>
                <ScrollReveal delay={0.06 * i}>
                  {isLive ? (
                    <Link
                      href={`/learn/tools/${tool.slug}`}
                      className="card flex h-full flex-col p-5"
                    >
                      {body}
                    </Link>
                  ) : (
                    <div className="card flex h-full flex-col p-5 opacity-70">{body}</div>
                  )}
                </ScrollReveal>
              </li>
            );
          })}
        </ul>

        <p className="mt-7 max-w-2xl text-sm leading-relaxed text-muted">
          More tools are on the way. If there is a calculation you keep doing by hand, tell us on
          WhatsApp. The ones people actually ask for get built first.
        </p>
      </Section>

      <CTABand />
    </>
  );
}
