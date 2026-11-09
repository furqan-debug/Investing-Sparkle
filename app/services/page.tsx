import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, X, MessageCircle, ArrowRight } from 'lucide-react';

import { Section, SectionHeading } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PageHero } from '@/components/PageHero';
import { Faq } from '@/components/Faq';
import { Testimonials } from '@/components/Testimonials';
import { PhilosophyStrip } from '@/components/PhilosophyStrip';
import { TrustBar } from '@/components/TrustBar';
import { CTABand } from '@/components/CTABand';

import {
  services,
  upgradeNote,
  advisoryPhilosophy,
  advisoryProcess,
  advisoryFaq,
  advisoryTestimonials,
} from '@/content/services';
import { paymentMethods } from '@/content/site';
import { whatsappLink, whatsappMessages } from '@/content/whatsapp';

export const metadata: Metadata = {
  title: 'Advisory services | Personal guidance, your money stays yours',
  description:
    'Three advisory tiers with public pricing: Launchpad Advisory Call, Guided Start, and Sparkle Membership. We never hold funds or execute trades.',
  alternates: { canonical: '/services' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: advisoryFaq.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const comparisonRows = [
  ['What it is', (s: (typeof services)[number]) => s.whatItIs],
  ['What you get', (s: (typeof services)[number]) => s.summary],
  ['Best for', (s: (typeof services)[number]) => s.bestFor],
  ['Duration', (s: (typeof services)[number]) => s.duration],
] as const;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Advisory"
        title={
          <>
            Personal guidance. On your terms.{' '}
            <span className="text-sparkle-400">Your money stays yours.</span>
          </>
        }
        lede="Three services, each designed to make you more independent, not more dependent."
      >
        <Button href={whatsappLink(whatsappMessages.exploreAdvisory)} size="lg" variant="whatsapp">
          <MessageCircle className="h-4 w-4" aria-hidden /> Book advisory call via WhatsApp
        </Button>
      </PageHero>

      <TrustBar />

      <Section tone="paper">
        <ScrollReveal>
          <SectionHeading eyebrow="Our advisory philosophy" title="What we will and will not do." />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="mt-6 max-w-2xl space-y-3.5">
            {advisoryPhilosophy.map((para) => (
              <p key={para.slice(0, 40)} className="text-base leading-relaxed text-ink md:text-lg">
                {para}
              </p>
            ))}
          </div>
        </ScrollReveal>
      </Section>

      <Section tone="white" id="compare">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Compare"
            title="All three, side by side."
            lede="Pricing is public because you should be able to decide without talking to anyone first."
          />
        </ScrollReveal>

        {/* Desktop table */}
        <ScrollReveal animation="scale-in" delay={0.15}>
          <div className="mt-8 hidden lg:block">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Comparison of the three advisory services</caption>
              <thead>
                <tr>
                  <th scope="col" className="w-40 p-3" />
                  {services.map((s) => (
                    <th key={s.slug} scope="col" className="p-3 align-bottom">
                      <span className="block font-display text-xl text-green-800">
                        {s.shortName}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="align-top">
                {comparisonRows.map(([label, get]) => (
                  <tr key={label} className="border-t border-line">
                    <th scope="row" className="p-3 text-sm font-semibold text-muted">
                      {label}
                    </th>
                    {services.map((s) => (
                      <td key={s.slug} className="p-3 text-sm leading-relaxed text-ink">
                        {get(s)}
                      </td>
                    ))}
                  </tr>
                ))}

                <tr className="border-t border-line bg-green-50">
                  <th scope="row" className="p-3 text-sm font-semibold text-muted">
                    Price
                  </th>
                  {services.map((s) => (
                    <td key={s.slug} className="p-3">
                      <span className="block font-display text-xl text-green-800">{s.price}</span>
                      {s.priceNote && (
                        <span className="mt-0.5 block text-xs text-muted">{s.priceNote}</span>
                      )}
                    </td>
                  ))}
                </tr>

                <tr className="border-t border-line">
                  <th scope="row" className="p-3" />
                  {services.map((s) => (
                    <td key={s.slug} className="p-3">
                      <Button href={whatsappLink(s.whatsappMessage)} variant="whatsapp">
                        <MessageCircle className="h-4 w-4" aria-hidden /> {s.ctaLabel}
                      </Button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        {/* Mobile / tablet stacked cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:hidden">
          {services.map((s, i) => (
            <ScrollReveal key={s.slug} delay={0.06 * i}>
              <article className="card flex h-full flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl text-green-800">{s.shortName}</h3>
                  <div className="text-right">
                    <span className="block font-display text-lg leading-tight text-green-800">
                      {s.price}
                    </span>
                    {s.priceNote && (
                      <span className="block text-[11px] text-muted">{s.priceNote}</span>
                    )}
                  </div>
                </div>

                <p className="mt-2 text-sm leading-relaxed text-muted">{s.summary}</p>

                <dl className="mt-4 flex-1 space-y-2 border-t border-line pt-3.5 text-sm">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                      Best for
                    </dt>
                    <dd className="mt-0.5 leading-relaxed text-ink">{s.bestFor}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                      Duration
                    </dt>
                    <dd className="mt-0.5 leading-relaxed text-ink">{s.duration}</dd>
                  </div>
                </dl>

                <Button
                  href={whatsappLink(s.whatsappMessage)}
                  variant="whatsapp"
                  className="mt-4 w-full"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden /> {s.ctaLabel}
                </Button>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <p className="card p-4 text-sm leading-relaxed text-muted">
            All payments accepted via {paymentMethods.join(', ')}. Full refund available before your
            first session. Sparkle Membership can be paused or cancelled any time after your first
            month.
          </p>
          <p className="rounded-xl border border-sparkle-300 bg-sparkle-50 p-4 text-sm font-medium leading-relaxed text-ink">
            {upgradeNote}
          </p>
        </div>

        <p className="mt-5 text-sm text-muted">
          Not sure which fits?{' '}
          <a
            href={whatsappLink(whatsappMessages.notSure)}
            target="_blank"
            rel="noopener noreferrer"
            className="link-hover font-semibold text-green-700"
          >
            Ask us on WhatsApp
          </a>{' '}
          and we will tell you honestly, including if the answer is &ldquo;none of them yet&rdquo;.
        </p>
      </Section>

      <Section tone="paper">
        <ScrollReveal>
          <SectionHeading eyebrow="In detail" title="What each service actually involves." />
        </ScrollReveal>

        <div className="mt-8 space-y-5">
          {services.map((s, idx) => (
            <ScrollReveal key={s.slug} animation="scale-in" delay={0.08 * idx}>
              <article id={s.slug} className="card scroll-mt-24 overflow-hidden">
                <div className="grid gap-6 p-6 md:p-8 lg:grid-cols-[1fr_1.3fr]">
                  <div>
                    <h3 className="h3">{s.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">
                      {s.summary}
                    </p>

                    <p className="mt-5 font-display text-3xl text-green-800">{s.price}</p>
                    {s.priceNote && <p className="mt-0.5 text-sm text-muted">{s.priceNote}</p>}

                    <dl className="mt-5 space-y-2.5 border-t border-line pt-4 text-sm">
                      <div>
                        <dt className="font-semibold text-ink">Best for</dt>
                        <dd className="mt-0.5 text-muted">{s.bestFor}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-ink">Timeline</dt>
                        <dd className="mt-0.5 text-muted">{s.duration}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-ink">Refund</dt>
                        <dd className="mt-0.5 text-muted">{s.refund}</dd>
                      </div>
                    </dl>

                    <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:items-center">
                      <Button href={whatsappLink(s.whatsappMessage)} variant="whatsapp" size="lg">
                        <MessageCircle className="h-4 w-4" aria-hidden /> {s.ctaLabel}
                      </Button>
                      <Link
                        href={`/services/${s.slug}`}
                        className="link-hover inline-flex items-center justify-center gap-1.5 px-2 py-2 text-sm font-semibold text-green-700"
                      >
                        See full details <ArrowRight className="h-4 w-4" aria-hidden />
                      </Link>
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2 lg:border-l lg:border-line lg:pl-8">
                    <div>
                      <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-green-700">
                        What you get
                      </h4>
                      <ul className="mt-3 space-y-2">
                        {s.includes.map((item) => (
                          <li key={item} className="flex gap-2 text-sm leading-relaxed text-ink">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" aria-hidden />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-muted">
                        What you don&apos;t
                      </h4>
                      <ul className="mt-3 space-y-2">
                        {s.excludes.map((item) => (
                          <li key={item} className="flex gap-2 text-sm leading-relaxed text-muted">
                            <X className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="rounded-xl bg-green-50 p-3.5 text-sm leading-relaxed text-green-800 sm:col-span-2">
                      <span className="font-semibold">Where this ends: </span>
                      {s.endState}
                    </p>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <ScrollReveal>
          <SectionHeading eyebrow="The process" title="How advisory works." />
        </ScrollReveal>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {advisoryProcess.map((step, i) => (
            <li key={step.step}>
              <ScrollReveal delay={0.06 * i}>
                <div className="card h-full p-5">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-green-700 font-display text-base text-white">
                    {step.step}
                  </span>
                  <h3 className="mt-3.5 font-sans text-base font-semibold text-ink">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.detail}</p>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </Section>

      <PhilosophyStrip />

      <Section tone="paper">
        <ScrollReveal>
          <SectionHeading eyebrow="Advisory clients" title="In their words." />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="mt-8">
            <Testimonials
              items={advisoryTestimonials}
              emptyMessage="Our first advisory clients are onboarding now. We will publish their words here, with names and faces, once they have something real to say."
            />
          </div>
        </ScrollReveal>
      </Section>

      <Section tone="white" tight>
        <ScrollReveal>
          <SectionHeading eyebrow="Questions" title="Advisory FAQ." />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="mt-6 max-w-2xl">
            <Faq items={advisoryFaq} />
          </div>
        </ScrollReveal>
      </Section>

      <CTABand
        title="Ready to build a real plan?"
        lede="A 60-minute call and a written plan you own. No retainer, no lock-in, no access to your account."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
