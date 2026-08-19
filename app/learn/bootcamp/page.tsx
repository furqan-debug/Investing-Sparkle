import type { Metadata } from 'next';
import {
  Calendar,
  Clock,
  Globe,
  Languages,
  Ticket,
  Check,
  X,
  MessageCircle,
  Mail,
  Users,
} from 'lucide-react';

import { Section, SectionHeading } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Faq } from '@/components/Faq';
import { Testimonials } from '@/components/Testimonials';
import { PhilosophyStrip } from '@/components/PhilosophyStrip';
import { StickyBootcampBar } from '@/components/StickyBootcampBar';
import { Newsletter } from '@/components/Newsletter';

import { bootcamp } from '@/content/bootcamp';
import { site, refundPolicy, paymentMethods } from '@/content/site';
import { whatsappLink, whatsappMessages } from '@/content/whatsapp';

export const metadata: Metadata = {
  title: `Stock Market Investor Boot Camp — ${bootcamp.dates}`,
  description:
    'A three-day live bootcamp taking you from PSX basics to portfolio construction, in Urdu, with a written investment plan to take home.',
  alternates: { canonical: '/learn/bootcamp' },
};

/** Course schema — helps this page surface as a course in search results. */
const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: bootcamp.title,
  description: bootcamp.subhead,
  provider: {
    '@type': 'Organization',
    name: site.name,
    sameAs: site.url,
  },
  inLanguage: 'ur',
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'online',
    courseWorkload: bootcamp.commitment,
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: bootcamp.faq.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function BootcampPage() {
  const reserveLink = whatsappLink(whatsappMessages.bootcampReserve(bootcamp.cohort));
  const questionLink = whatsappLink(whatsappMessages.bootcampQuestion(bootcamp.cohort));

  // No open cohort — show the waitlist state rather than a stale sales page.
  if (bootcamp.status !== 'enrolling') {
    return (
      <Section tone="paper">
        <SectionHeading
          eyebrow="Between cohorts"
          title="The next bootcamp is being scheduled."
          lede="Join the list and you will hear about the next cohort before it is announced publicly."
        />
        <div className="mt-8">
          <Newsletter />
        </div>
      </Section>
    );
  }

  const facts = [
    { icon: Calendar, label: 'Dates', value: bootcamp.dates },
    { icon: Clock, label: 'Time', value: bootcamp.time },
    { icon: Globe, label: 'Format', value: bootcamp.format },
    { icon: Languages, label: 'Language', value: bootcamp.language },
    { icon: Ticket, label: 'Price', value: bootcamp.price },
  ];

  return (
    <>
      {/* 1 — Hero */}
      <section className="relative overflow-hidden bg-green-950 text-white">
        <div
          className="pointer-events-none absolute -left-32 top-0 h-[30rem] w-[30rem] rounded-full bg-green-700/25 blur-3xl"
          aria-hidden
        />
        <div className="container-page relative py-16 md:py-24">
          <p className="eyebrow rounded-full bg-sparkle-400 px-3.5 py-1.5 text-green-950">
            Currently enrolling · 3-day bootcamp
          </p>
          <h1 className="h1 mt-5 max-w-4xl">{bootcamp.title}</h1>
          <p className="lede mt-5 max-w-3xl text-green-100">{bootcamp.subhead}</p>

          <dl className="mt-9 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-5">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-sparkle-400" aria-hidden />
                <div>
                  <dt className="text-xs uppercase tracking-wider text-green-300">{label}</dt>
                  <dd className="mt-0.5 text-sm font-medium">{value}</dd>
                </div>
              </div>
            ))}
          </dl>

          {(bootcamp.seatsRemaining !== null || bootcamp.classCap !== null) && (
            <p className="mt-6 flex items-center gap-2 text-sm text-sparkle-400">
              <Users className="h-4 w-4" aria-hidden />
              {bootcamp.seatsRemaining !== null
                ? `${bootcamp.seatsRemaining} seats remaining`
                : `Capped at ${bootcamp.classCap} to keep sessions interactive`}
            </p>
          )}

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={reserveLink} size="lg" variant="whatsapp">
              <MessageCircle className="h-4 w-4" aria-hidden /> Reserve your seat via WhatsApp
            </Button>
            <Button href={questionLink} size="lg" variant="ghost" className="text-white">
              Ask a question first
            </Button>
          </div>

          <p className="mt-5 max-w-xl text-sm text-green-200">
            Payment via {paymentMethods.join(', ')}. {refundPolicy.bootcamp}
          </p>
        </div>
      </section>

      {/* 2 — Why this exists */}
      <Section tone="paper">
        <SectionHeading eyebrow="Why this bootcamp exists" title="Breaking the loop." />
        <div className="mt-6 max-w-3xl space-y-4">
          {bootcamp.whyItExists.map((para) => (
            <p key={para.slice(0, 40)} className="text-lg leading-relaxed text-ink">
              {para}
            </p>
          ))}
        </div>
      </Section>

      {/* 3 — Who this is for */}
      <Section tone="white">
        <SectionHeading
          eyebrow="Fit check"
          title="Be honest with yourself before you pay."
          lede="We would rather you skip this bootcamp than sit through three days that were never meant for you."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-green-200 bg-green-50 p-7">
            <h3 className="font-sans text-lg font-semibold text-green-800">This is right for you if</h3>
            <ul className="mt-4 space-y-3">
              {bootcamp.rightForYou.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-line bg-paper p-7">
            <h3 className="font-sans text-lg font-semibold text-ink">This is not for you if</h3>
            <ul className="mt-4 space-y-3">
              {bootcamp.notForYou.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-danger" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 4 — Outcomes */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="What you walk away with"
          title="By the end of Day 3, you will be able to:"
        />
        <ul className="mt-9 grid gap-4 md:grid-cols-2">
          {bootcamp.outcomes.map((item) => (
            <li key={item} className="flex gap-3 rounded-2xl border border-line bg-white p-5">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-600" aria-hidden />
              <span className="text-sm leading-relaxed text-ink">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 5 — Curriculum */}
      <Section tone="white">
        <SectionHeading eyebrow="Curriculum" title="Three days, in sequence." />
        <ol className="mt-10 grid gap-6 lg:grid-cols-3">
          {bootcamp.curriculum.map((day) => (
            <li key={day.day} className="rounded-2xl bg-green-900 p-7 text-white">
              <p className="eyebrow text-sparkle-400">{day.day}</p>
              <h3 className="h3 mt-2">{day.title}</h3>
              <ul className="mt-5 space-y-2.5">
                {day.topics.map((topic) => (
                  <li key={topic} className="flex gap-2.5 text-sm leading-relaxed text-green-100">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sparkle-400" aria-hidden />
                    {topic}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      {/* 6 — Format & logistics */}
      <Section tone="paper">
        <SectionHeading eyebrow="Format & logistics" title="What you get, and what you don’t." />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-7">
            <h3 className="font-sans text-lg font-semibold text-ink">Included</h3>
            <ul className="mt-4 space-y-3">
              {bootcamp.included.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-line bg-white p-7">
            <h3 className="font-sans text-lg font-semibold text-ink">Not included</h3>
            <ul className="mt-4 space-y-3">
              {bootcamp.notIncluded.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <dl className="mt-8 grid gap-x-8 gap-y-4 rounded-2xl border border-line bg-white p-7 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted">Session length</dt>
            <dd className="mt-1 text-sm font-medium">{bootcamp.sessionLength}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted">Total commitment</dt>
            <dd className="mt-1 text-sm font-medium">{bootcamp.commitment}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted">Delivery</dt>
            <dd className="mt-1 text-sm font-medium">{bootcamp.format}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted">Language</dt>
            <dd className="mt-1 text-sm font-medium">{bootcamp.language}</dd>
          </div>
        </dl>
      </Section>

      {/* 7 — Pricing */}
      <Section tone="white">
        <div className="mx-auto max-w-2xl rounded-3xl border-2 border-green-800 bg-paper p-8 text-center md:p-10">
          <p className="eyebrow text-green-600">Pricing</p>
          <p className="mt-4 font-display text-5xl text-green-800 md:text-6xl">{bootcamp.price}</p>
          <p className="mt-2 text-sm text-muted">Full 3-day bootcamp, everything listed above.</p>

          <div className="mt-7 border-t border-line pt-6 text-left">
            <p className="text-sm font-semibold text-ink">Payment options</p>
            <p className="mt-1.5 text-sm text-muted">{paymentMethods.join(' · ')}</p>

            <p className="mt-5 text-sm font-semibold text-ink">Refund policy</p>
            <p className="mt-1.5 text-sm text-muted">{refundPolicy.bootcamp}</p>
          </div>

          <Button href={reserveLink} size="lg" variant="whatsapp" className="mt-8 w-full">
            <MessageCircle className="h-4 w-4" aria-hidden /> Reserve your seat
          </Button>
        </div>
      </Section>

      {/* 8 — Past students */}
      <Section tone="paper">
        <SectionHeading eyebrow="Past students" title="What previous cohorts said." />
        <div className="mt-10">
          <Testimonials
            items={bootcamp.testimonials}
            emptyMessage="This is one of our first cohorts. Be part of the founding batch — real testimonials will appear here once students have finished and had time to invest."
          />
        </div>
      </Section>

      {/* 9 — Philosophy */}
      <PhilosophyStrip />

      {/* 10 — FAQ */}
      <Section tone="white">
        <SectionHeading eyebrow="Questions" title="Before you book." />
        <div className="mt-8 max-w-3xl">
          <Faq items={bootcamp.faq} />
        </div>
      </Section>

      {/* 11 — Reserve */}
      <Section tone="greenDeep">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="h2">Reserve your seat — {bootcamp.dates}</h2>
          <p className="lede mt-4 text-green-100">
            Registration is confirmed over WhatsApp. Tap the button, we share payment details, and
            your seat is locked as soon as payment is confirmed.
          </p>
          <div className="mt-8">
            <Button href={reserveLink} size="lg" variant="whatsapp">
              <MessageCircle className="h-4 w-4" aria-hidden /> Reserve via WhatsApp
            </Button>
          </div>
          <p className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-green-200">
            <Mail className="h-4 w-4" aria-hidden />
            Prefer email? Write to{' '}
            <a
              href={`mailto:${site.contact.emailSupport}`}
              className="underline underline-offset-2 hover:text-sparkle-400"
            >
              {site.contact.emailSupport}
            </a>{' '}
            — we reply within 24 hours.
          </p>
        </div>
      </Section>

      <StickyBootcampBar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
