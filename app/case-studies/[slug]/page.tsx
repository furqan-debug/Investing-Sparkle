import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Info, MessageCircle } from 'lucide-react';

import { Section, SectionHeading } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
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
      <section className="bg-green-950 text-white">
        <div className="container-page py-14 md:py-20">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1.5 text-sm text-green-200 hover:text-sparkle-400"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> All worked examples
          </Link>
          <p className="eyebrow mt-6 text-sparkle-400">Illustrative example</p>
          <h1 className="h1 mt-4 max-w-4xl">{study.title}</h1>
          <p className="lede mt-5 max-w-2xl text-green-100">{study.summary}</p>
        </div>
      </section>

      <Section tone="paper" tight>
        <div className="mx-auto flex max-w-3xl gap-3 rounded-2xl border-l-4 border-sparkle-400 bg-sparkle-100 p-5">
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
          <dl className="mt-8 grid gap-x-8 gap-y-5 rounded-2xl border border-line bg-paper p-7 sm:grid-cols-2">
            {study.situation.map((row) => (
              <div key={row.label}>
                <dt className="text-xs uppercase tracking-wider text-muted">{row.label}</dt>
                <dd className="mt-1 font-medium text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>

          <blockquote className="mt-8 border-l-4 border-green-800 pl-6">
            <p className="text-xl leading-relaxed text-ink">{study.question}</p>
          </blockquote>
        </div>
      </Section>

      {/* The reasoning */}
      <Section tone="paper">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Working through it" title="The reasoning, in order." />
          <ol className="mt-9 space-y-6">
            {study.reasoning.map((step, i) => (
              <li key={step.heading} className="rounded-2xl border border-line bg-white p-7 md:p-8">
                <div className="flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-green-800 font-display text-base text-sparkle-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-sans text-lg font-semibold leading-snug text-ink">
                    {step.heading}
                  </h3>
                </div>
                <div className="mt-4 space-y-3.5 pl-13">
                  {step.body.map((para) => (
                    <p key={para.slice(0, 40)} className="leading-relaxed text-muted">
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
          <div className="mt-7 space-y-4">
            {study.outcome.map((para) => (
              <p key={para.slice(0, 40)} className="text-lg leading-relaxed text-ink">
                {para}
              </p>
            ))}
          </div>

          <p className="mt-8 rounded-2xl bg-green-50 p-6 leading-relaxed text-green-800">
            <span className="font-semibold">What this example shows: </span>
            {study.lesson}
          </p>
        </div>
      </Section>

      <PhilosophyStrip />

      {/* Next */}
      <Section tone="paper">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionHeading eyebrow="Other examples" title="Different situations." />
            <ul className="mt-8 space-y-4">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/case-studies/${other.slug}`}
                    className="group flex flex-col rounded-2xl border border-line bg-white p-6 transition-colors hover:border-green-300"
                  >
                    <h3 className="font-sans text-lg font-semibold text-ink">{other.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{other.summary}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-green-700">
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

          <div className="rounded-3xl bg-green-900 p-8 text-white">
            <h2 className="h3">Your numbers, not these ones</h2>
            <p className="mt-4 text-green-100">
              A Launchpad call works through your actual situation — income, savings, debts,
              horizon — and produces a written plan you own and execute yourself.
            </p>
            <Button
              href={whatsappLink(whatsappMessages.launchpad)}
              variant="whatsapp"
              size="lg"
              className="mt-7 w-full"
            >
              <MessageCircle className="h-4 w-4" aria-hidden /> Book a call
            </Button>
            <Link
              href="/services/launchpad"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sparkle-400 hover:text-sparkle-300"
            >
              See what is included <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
