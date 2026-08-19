import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, X, MessageCircle, ArrowRight } from 'lucide-react';

import { Section, SectionHeading } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
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
  title: 'Advisory services — personal guidance, your money stays yours',
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

export default function ServicesPage() {
  return (
    <>
      {/* 1 — Hero */}
      <section className="bg-green-950 text-white">
        <div className="container-page py-16 md:py-24">
          <p className="eyebrow text-sparkle-400">Advisory</p>
          <h1 className="h1 mt-4 max-w-4xl">
            Personal guidance. On your terms.{' '}
            <span className="text-sparkle-400">Your money stays yours.</span>
          </h1>
          <p className="lede mt-5 max-w-2xl text-green-100">
            Three services, each designed to make you more independent — not more dependent.
          </p>
          <div className="mt-8">
            <Button href={whatsappLink(whatsappMessages.exploreAdvisory)} size="lg" variant="whatsapp">
              <MessageCircle className="h-4 w-4" aria-hidden /> Book advisory call via WhatsApp
            </Button>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* 2 — Philosophy */}
      <Section tone="paper">
        <SectionHeading eyebrow="Our advisory philosophy" title="What we will and will not do." />
        <div className="mt-6 max-w-3xl space-y-4">
          {advisoryPhilosophy.map((para) => (
            <p key={para.slice(0, 40)} className="text-lg leading-relaxed text-ink">
              {para}
            </p>
          ))}
        </div>
      </Section>

      {/* 3 — Comparison table */}
      <Section tone="white" id="compare">
        <SectionHeading
          eyebrow="Compare"
          title="All three, side by side."
          lede="Pricing is public because you should be able to decide without talking to anyone first."
        />

        {/* Scrolls horizontally on small screens rather than squeezing the columns. */}
        <div className="mt-10 -mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
          <table className="w-full min-w-[48rem] border-collapse text-left">
            <caption className="sr-only">Comparison of the three advisory services</caption>
            <thead>
              <tr>
                <th scope="col" className="w-40 p-4" />
                {services.map((s) => (
                  <th key={s.slug} scope="col" className="p-4 align-bottom">
                    <span className="block font-display text-2xl tracking-wide text-green-800">
                      {s.shortName}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="align-top">
              {(
                [
                  ['What it is', (s: (typeof services)[number]) => s.whatItIs],
                  ['What you get', (s: (typeof services)[number]) => s.summary],
                  ['Best for', (s: (typeof services)[number]) => s.bestFor],
                  ['Duration', (s: (typeof services)[number]) => s.duration],
                ] as const
              ).map(([label, get]) => (
                <tr key={label} className="border-t border-line">
                  <th scope="row" className="p-4 text-sm font-semibold text-muted">
                    {label}
                  </th>
                  {services.map((s) => (
                    <td key={s.slug} className="p-4 text-sm leading-relaxed text-ink">
                      {get(s)}
                    </td>
                  ))}
                </tr>
              ))}

              <tr className="border-t border-line bg-green-50">
                <th scope="row" className="p-4 text-sm font-semibold text-muted">
                  Price
                </th>
                {services.map((s) => (
                  <td key={s.slug} className="p-4">
                    <span className="block font-display text-2xl text-green-800">{s.price}</span>
                    {s.priceNote && (
                      <span className="mt-0.5 block text-xs text-muted">{s.priceNote}</span>
                    )}
                  </td>
                ))}
              </tr>

              <tr className="border-t border-line">
                <th scope="row" className="p-4" />
                {services.map((s) => (
                  <td key={s.slug} className="p-4">
                    <Button href={whatsappLink(s.whatsappMessage)} variant="whatsapp">
                      <MessageCircle className="h-4 w-4" aria-hidden /> {s.ctaLabel}
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <p className="rounded-2xl border border-line bg-paper p-5 text-sm leading-relaxed text-muted">
            All payments accepted via {paymentMethods.join(', ')}. Full refund available before your
            first session. Sparkle Membership can be paused or cancelled any time after your first
            month.
          </p>
          <p className="rounded-2xl bg-sparkle-100 p-5 text-sm font-medium leading-relaxed text-ink">
            {upgradeNote}
          </p>
        </div>

        <p className="mt-6 text-sm text-muted">
          Not sure which fits?{' '}
          <a
            href={whatsappLink(whatsappMessages.notSure)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-green-700 underline underline-offset-2 hover:text-green-600"
          >
            Ask us on WhatsApp
          </a>{' '}
          — we will tell you honestly, including if the answer is “none of them yet”.
        </p>
      </Section>

      {/* 4 — Tier detail */}
      <Section tone="paper">
        <SectionHeading eyebrow="In detail" title="What each service actually involves." />

        <div className="mt-10 space-y-6">
          {services.map((s) => (
            <article
              key={s.slug}
              id={s.slug}
              className="scroll-mt-28 overflow-hidden rounded-3xl border border-line bg-white"
            >
              <div className="grid gap-8 p-8 lg:grid-cols-[1fr_1.3fr] md:p-10">
                <div>
                  <h3 className="h3">{s.name}</h3>
                  <p className="mt-3 text-muted">{s.summary}</p>

                  <p className="mt-6 font-display text-4xl text-green-800">{s.price}</p>
                  {s.priceNote && <p className="mt-1 text-sm text-muted">{s.priceNote}</p>}

                  <dl className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
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

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Button href={whatsappLink(s.whatsappMessage)} variant="whatsapp" size="lg">
                      <MessageCircle className="h-4 w-4" aria-hidden /> {s.ctaLabel}
                    </Button>
                    <Link
                      href={`/services/${s.slug}`}
                      className="inline-flex items-center gap-1.5 px-2 py-2 font-semibold text-green-700 hover:text-green-600"
                    >
                      See full details <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:border-l lg:border-line lg:pl-10">
                  <div>
                    <h4 className="font-sans text-sm font-semibold uppercase tracking-wider text-green-700">
                      What you get
                    </h4>
                    <ul className="mt-4 space-y-2.5">
                      {s.includes.map((item) => (
                        <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-ink">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-sans text-sm font-semibold uppercase tracking-wider text-muted">
                      What you don’t
                    </h4>
                    <ul className="mt-4 space-y-2.5">
                      {s.excludes.map((item) => (
                        <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                          <X className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="rounded-2xl bg-green-50 p-4 text-sm leading-relaxed text-green-800 sm:col-span-2">
                    <span className="font-semibold">Where this ends: </span>
                    {s.endState}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* 5 — How advisory works */}
      <Section tone="white">
        <SectionHeading eyebrow="The process" title="How advisory works." />
        <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {advisoryProcess.map((step) => (
            <li key={step.step} className="rounded-2xl border border-line bg-paper p-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-green-800 font-display text-lg text-sparkle-400">
                {step.step}
              </span>
              <h3 className="mt-4 font-sans text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 6 — Philosophy */}
      <PhilosophyStrip />

      {/* 7 — Testimonials */}
      <Section tone="paper">
        <SectionHeading eyebrow="Advisory clients" title="In their words." />
        <div className="mt-10">
          <Testimonials
            items={advisoryTestimonials}
            emptyMessage="Our first advisory clients are onboarding now. We will publish their words here — with names and faces — once they have something real to say."
          />
        </div>
      </Section>


      {/* 9 — FAQ */}
      <Section tone="paper">
        <SectionHeading eyebrow="Questions" title="Advisory FAQ." />
        <div className="mt-8 max-w-3xl">
          <Faq items={advisoryFaq} />
        </div>
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
