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
import { ScrollReveal } from '@/components/ScrollReveal';
import { Faq } from '@/components/Faq';
import { Testimonials } from '@/components/Testimonials';
import { PhilosophyStrip } from '@/components/PhilosophyStrip';
import { StickyBootcampBar } from '@/components/StickyBootcampBar';
import { Newsletter } from '@/components/Newsletter';

import { bootcamp } from '@/content/bootcamp';
import { site, refundPolicy, paymentMethods } from '@/content/site';
import { whatsappLink, whatsappMessages } from '@/content/whatsapp';
import { learningTestimonials } from '@/content/testimonials';

export const metadata: Metadata = {
  title: `Stock Market Investor Boot Camp | ${bootcamp.dates}`,
  description:
    'A three-day live bootcamp taking you from PSX basics to portfolio construction, in Urdu, with a written investment plan to take home.',
  alternates: { canonical: '/learn/bootcamp' },
};

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
      <section className="bg-green-950 text-white">
        <div className="container-page py-16 md:py-24">
          <p className="eyebrow animate-fade-in rounded-full bg-sparkle-400 px-3.5 py-1.5 text-green-950">
            Currently enrolling · 3-day bootcamp
          </p>
          <h1 className="h1 mt-5 max-w-4xl animate-fade-up">{bootcamp.title}</h1>
          <p className="lede mt-5 max-w-3xl animate-fade-up stagger-1 text-green-100">{bootcamp.subhead}</p>

          <dl className="mt-9 grid animate-fade-up stagger-2 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-5">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-sparkle-400/15">
                  <Icon className="h-4 w-4 shrink-0 text-sparkle-400" aria-hidden />
                </span>
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

          <div className="mt-9 flex flex-col gap-3 animate-fade-up stagger-3 sm:flex-row">
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

      <Section tone="paper">
        <ScrollReveal>
          <SectionHeading eyebrow="Why this bootcamp exists" title="Breaking the loop." />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="mt-6 max-w-3xl space-y-4">
            {bootcamp.whyItExists.map((para) => (
              <p key={para.slice(0, 40)} className="text-lg leading-relaxed text-ink">
                {para}
              </p>
            ))}
          </div>
        </ScrollReveal>
      </Section>

      <Section tone="white">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Fit check"
            title="Be honest with yourself before you pay."
            lede="We would rather you skip this bootcamp than sit through three days that were never meant for you."
          />
        </ScrollReveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <ScrollReveal>
            <div className="rounded-2xl border border-green-200 bg-green-50 p-7">
              <h3 className="font-sans text-lg font-semibold text-green-800">This is right for you if</h3>
              <ul className="mt-4 space-y-3">
                {bootcamp.rightForYou.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-green-200/60">
                      <Check className="h-3 w-3 text-green-700" aria-hidden />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
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
          </ScrollReveal>
        </div>
      </Section>

      <Section tone="paper">
        <ScrollReveal>
          <SectionHeading
            eyebrow="What you walk away with"
            title="By the end of Day 3, you will be able to:"
          />
        </ScrollReveal>
        <ul className="mt-9 grid gap-4 md:grid-cols-2">
          {bootcamp.outcomes.map((item, i) => (
            <li key={item}>
              <ScrollReveal delay={0.06 * i}>
                <div className="card flex gap-3 p-5">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-600" aria-hidden />
                  <span className="text-sm leading-relaxed text-ink">{item}</span>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white">
        <ScrollReveal>
          <SectionHeading eyebrow="Curriculum" title="Three days, in sequence." />
        </ScrollReveal>
        <ol className="mt-10 grid gap-6 lg:grid-cols-3">
          {bootcamp.curriculum.map((day, i) => {
            const accents = ['border-l-sparkle-500', 'border-l-green-500', 'border-l-green-400'];
            return (
              <li key={day.day}>
                <ScrollReveal delay={0.12 * i}>
                  <div className={`rounded-2xl bg-green-900 p-7 text-white border-l-4 ${accents[i % accents.length]}`}>
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
                  </div>
                </ScrollReveal>
              </li>
            );
          })}
        </ol>
      </Section>

      <Section tone="paper">
        <ScrollReveal>
          <SectionHeading eyebrow="Format & logistics" title="What you get, and what you don't." />
        </ScrollReveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <ScrollReveal>
            <div className="card p-7">
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
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="card p-7">
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
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.15}>
          <dl className="card mt-8 grid gap-x-8 gap-y-4 p-7 sm:grid-cols-2 lg:grid-cols-4">
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
        </ScrollReveal>
      </Section>

      <Section tone="paper">
        <ScrollReveal animation="scale-in">
          <div className="card mx-auto max-w-2xl border-2 border-sparkle-300 p-8 text-center md:p-10">
            <p className="eyebrow text-green-600">Pricing</p>
            <p className="mt-4 font-display text-5xl text-sparkle-500 md:text-6xl">{bootcamp.price}</p>
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
        </ScrollReveal>
      </Section>

      <Section tone="paper">
        <ScrollReveal>
          <SectionHeading eyebrow="Past students" title="What previous cohorts said." />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="mt-10">
            <Testimonials
              items={learningTestimonials.filter((t) => t.source.toLowerCase().includes('bootcamp'))}
              emptyMessage="This is one of our first cohorts. Be part of the founding batch. Real testimonials will appear here once students have finished and had time to invest."
            />
          </div>
        </ScrollReveal>
      </Section>

      <PhilosophyStrip />

      <Section tone="white">
        <ScrollReveal>
          <SectionHeading eyebrow="Questions" title="Before you book." />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="mt-8 max-w-3xl">
            <Faq items={bootcamp.faq} />
          </div>
        </ScrollReveal>
      </Section>

      <Section tone="greenDeep">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="h2">Reserve your seat: {bootcamp.dates}</h2>
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
              href={`mailto:${site.contact.email}`}
              className="underline underline-offset-2 hover:text-sparkle-400"
            >
              {site.contact.email}
            </a>{' '}
            and we reply within 24 hours.
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
