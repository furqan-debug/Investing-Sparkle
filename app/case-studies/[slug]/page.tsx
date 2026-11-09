import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Info, MessageCircle } from 'lucide-react';

import { Section, SectionHeading } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/PageHero';
import { PhilosophyStrip } from '@/components/PhilosophyStrip';
import { caseStudies, getCaseStudy, caseStudyDisclaimer } from '@/content/case-studies';
import { whatsappLink, whatsappMessages } from '@/content/whatsapp';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/case-studies/${study.slug}` },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const others = caseStudies.filter((c) => c.slug !== study.slug);

  return (
    <>
      <PageHero
        back={{ href: '/case-studies', label: 'All worked examples' }}
        eyebrow="Illustrative example"
        title={study.title}
        lede={study.summary}
      />

      <Section tone="paper" tight>
        <div className="mx-auto flex max-w-3xl gap-3 rounded-2xl border-l-4 border-sparkle-400 bg-sparkle-100 p-4 md:p-5">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-green-800" aria-hidden />
          <p className="text-sm leading-relaxed text-ink">
            <strong>Not a real client.</strong> {caseStudyDisclaimer}
          </p>
        </div>
      </Section>

      {/* The situation */}
      <Section tone="white">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="The situation" title="Starting position." />
          <dl className="mt-7 grid gap-x-8 gap-y-4 rounded-2xl border border-line bg-paper p-6 sm:grid-cols-2">
            {study.situation.map((row) => (
              <div key={row.label}>
                <dt className="text-xs uppercase tracking-wider text-muted">{row.label}</dt>
                <dd className="mt-1 font-medium text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>

          <blockquote className="mt-6 border-l-4 border-green-800 pl-5">
            <p className="text-lg leading-relaxed text-ink">{study.question}</p>
          </blockquote>
        </div>
      </Section>

      {/* The reasoning */}
      <Section tone="paper">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Working through it" title="The reasoning, in order." />
          <ol className="mt-8 space-y-4">
            {study.reasoning.map((step, i) => (
              <li key={step.heading} className="rounded-2xl border border-line bg-white p-5 md:p-6">
                <div className="flex gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-green-800 font-display text-sm text-sparkle-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-sans text-base font-semibold leading-snug text-ink">
                    {step.heading}
                  </h3>
                </div>
                <div className="mt-3 space-y-3 sm:pl-[2.75rem]">
                  {step.body.map((para) => (
                    <p key={para.slice(0, 40)} className="text-sm leading-relaxed text-muted md:text-base">
                      {para}
                    </p>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Outcome */}
      <Section tone="white">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Where it lands" title="The plan that comes out." />
          <div className="mt-6 space-y-3.5">
            {study.outcome.map((para) => (
              <p key={para.slice(0, 40)} className="text-base leading-relaxed text-ink md:text-lg">
                {para}
              </p>
            ))}
          </div>

          <p className="mt-6 rounded-2xl bg-green-50 p-5 text-sm leading-relaxed text-green-800 md:text-base">
            <span className="font-semibold">What this example shows: </span>
            {study.lesson}
          </p>
        </div>
      </Section>

      <PhilosophyStrip />

      {/* Next */}
      <Section tone="paper">
        <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionHeading eyebrow="Other examples" title="Different situations." />
            <ul className="mt-6 space-y-3">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/case-studies/${other.slug}`}
                    className="group flex flex-col rounded-xl border border-line bg-white p-5 transition-colors hover:border-green-300"
                  >
                    <h3 className="font-sans text-base font-semibold text-ink">{other.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{other.summary}</p>
                    <span className="mt-2.5 inline-flex items-center gap-1.5 text-sm font-semibold text-green-700">
                      Read it
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-green-900 p-6 text-white md:p-8">
            <h2 className="h3">Your numbers, not these ones</h2>
            <p className="mt-3 text-sm text-green-100 md:text-base">
              A Launchpad call works through your actual situation (income, savings, debts,
              horizon) and produces a written plan you own and execute yourself.
            </p>
            <Button
              href={whatsappLink(whatsappMessages.launchpad)}
              variant="whatsapp"
              size="lg"
              className="mt-5 w-full"
            >
              <MessageCircle className="h-4 w-4" aria-hidden /> Book a call
            </Button>
            <Link
              href="/services/launchpad"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-sparkle-400 hover:text-sparkle-300"
            >
              See what is included <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
