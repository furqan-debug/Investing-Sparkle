import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Info } from 'lucide-react';

import { Section, SectionHeading } from '@/components/ui/Section';
import { ScrollReveal } from '@/components/ScrollReveal';
import { CTABand } from '@/components/CTABand';
import { caseStudies, caseStudyDisclaimer } from '@/content/case-studies';

export const metadata: Metadata = {
  title: 'Worked examples | how the framework applies',
  description:
    'Three illustrative scenarios showing how we reason through a real investing situation, from emergency fund to position sizing.',
  alternates: { canonical: '/case-studies' },
};

export default function CaseStudiesPage() {
  return (
    <>
      <section className="bg-green-950 text-white">
        <div className="container-page py-16 md:py-24">
          <p className="eyebrow animate-fade-in text-sparkle-400">Worked examples</p>
          <h1 className="h1 mt-4 max-w-3xl animate-fade-up">
            What the reasoning actually looks like.
          </h1>
          <p className="lede mt-5 max-w-2xl animate-fade-up stagger-1 text-green-100">
            Three common situations, worked through the way we would work through them in a
            session, so you can judge the method before you pay for it.
          </p>
        </div>
      </section>

      <Section tone="paper" tight>
        <ScrollReveal>
          <div className="flex gap-3 rounded-2xl border-l-4 border-sparkle-400 bg-sparkle-50 p-5 md:p-6">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-green-800" aria-hidden />
            <p className="text-sm leading-relaxed text-ink">
              <strong>These are not real clients.</strong> {caseStudyDisclaimer} We do not publish
              invented client stories, and we will not present these as anything other than what they
              are.
            </p>
          </div>
        </ScrollReveal>
      </Section>

      <Section tone="white">
        <ScrollReveal>
          <SectionHeading eyebrow="The examples" title="Pick the one closest to you." />
        </ScrollReveal>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {caseStudies.map((study, i) => (
            <li key={study.slug}>
              <ScrollReveal delay={0.1 * i}>
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="card group flex h-full flex-col p-6"
                >
                  <h2 className="font-sans text-lg font-semibold leading-snug text-ink">
                    {study.title}
                  </h2>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">{study.summary}</p>
                  <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-green-700">
                    Read the reasoning
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </p>
                </Link>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="paper">
        <ScrollReveal animation="scale-in">
          <div className="card mx-auto max-w-3xl border-l-4 border-l-green-800 p-8 md:p-10">
            <h2 className="h3">Why we publish examples rather than client stories</h2>
            <div className="mt-5 space-y-4 leading-relaxed text-muted">
              <p>
                Most firms in this space publish case studies about named clients with impressive
                returns. We do not, for two reasons.
              </p>
              <p>
                The first is privacy. Describing someone&apos;s income, savings, debts, and portfolio in
                public is a great deal to ask, even with permission and even anonymised.
              </p>
              <p>
                The second is that a case study invented for marketing is a fabricated record. Given
                that our entire argument is that you should not trust advice from people whose
                incentives are hidden, manufacturing evidence would be a strange way to make it.
              </p>
              <p>
                So these examples claim nothing about results. They show the reasoning, which is the
                part you are actually buying.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      <CTABand
        title="Recognise your situation?"
        lede="A Launchpad call works through your actual numbers, and produces a written plan you own."
      />
    </>
  );
}
