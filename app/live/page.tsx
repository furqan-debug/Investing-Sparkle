import type { Metadata } from 'next';
import {
  Calendar,
  Check,
  Facebook,
  MessageCircle,
  Radio,
  Ticket,
  Users,
} from 'lucide-react';

import { Section, SectionHeading } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PageHero } from '@/components/PageHero';
import { Faq } from '@/components/Faq';
import { Newsletter } from '@/components/Newsletter';
import { CTABand } from '@/components/CTABand';

import { liveSession } from '@/content/live-session';
import { whatsappLink, whatsappMessages } from '@/content/whatsapp';

export const metadata: Metadata = {
  title: `${liveSession.title} | Free Facebook Live`,
  description: `${liveSession.subtitle} Join the free live session on ${liveSession.date}, streaming on Facebook Live.`,
  alternates: { canonical: '/live' },
};

const agenda = [
  {
    title: 'Where you actually stand',
    detail:
      'A clear-eyed way to measure your current financial position, without the usual optimistic guesswork.',
  },
  {
    title: 'The order that matters',
    detail:
      'What to do first, what to do next, and why most people start at the wrong end and stay stuck there.',
  },
  {
    title: 'Building the plan',
    detail:
      'A step-by-step blueprint for 2027: savings, investing, and the decisions that compound over time.',
  },
  {
    title: 'Questions, answered live',
    detail:
      'We take questions during the broadcast. Bring your situation and we will work through it honestly.',
  },
];

const steps = [
  {
    title: 'Follow the page',
    detail: `Follow ${liveSession.host} on Facebook so the live broadcast appears in your feed.`,
  },
  {
    title: 'Set a reminder',
    detail: `Message us on WhatsApp or subscribe below and we will remind you before ${liveSession.date}.`,
  },
  {
    title: 'Watch live',
    detail: `On the day, open the Facebook page at the scheduled time and join the live broadcast.`,
  },
];

const faq = [
  {
    q: 'Is it really free?',
    a: 'Yes. The session is free to attend and there is no upsell during the broadcast. If we ever run a paid workshop, it will be announced separately with its price and terms shown upfront.',
  },
  {
    q: 'Do I need a Facebook account?',
    a: 'To watch live you will need to be able to open Facebook. The broadcast plays from our public page, so you do not need to join a group or share anything.',
  },
  {
    q: 'Will there be a recording?',
    a: 'Facebook usually keeps live replays on the page for a while, and we will share the replay there. We cannot guarantee how long the platform keeps it available.',
  },
  {
    q: 'What if I cannot attend on the day?',
    a: 'Set a reminder anyway and watch the replay when it is posted. If you have a specific question, message us on WhatsApp and we will answer it directly.',
  },
];

export default function LiveSessionPage() {
  return (
    <>
      <PageHero
        eyebrow={liveSession.eyebrow}
        title={
          <>
            {liveSession.title}{' '}
            <span className="text-sparkle-400">— a blueprint for your money.</span>
          </>
        }
        lede={liveSession.subtitle}
      >
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-green-100">
          <li className="flex items-center gap-2">
            <Calendar className="h-4 w-4 shrink-0 text-sparkle-400" aria-hidden />
            {liveSession.date}
          </li>
          <li className="flex items-center gap-2">
            <Facebook className="h-4 w-4 shrink-0 text-sparkle-400" aria-hidden />
            {liveSession.platform}
          </li>
          <li className="flex items-center gap-2">
            <Ticket className="h-4 w-4 shrink-0 text-sparkle-400" aria-hidden />
            Free to attend
          </li>
        </ul>

        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <Button href={liveSession.platformUrl} size="lg" external goo="var(--color-sparkle-700)" gooScale>
            <Radio className="h-4 w-4" aria-hidden /> {liveSession.watchLabel}
          </Button>
          <Button
            href={whatsappLink(whatsappMessages.liveSessionReminder)}
            size="lg"
            variant="ghost"
            className="text-white"
          >
            <MessageCircle className="h-4 w-4" aria-hidden /> {liveSession.reminderLabel}
          </Button>
        </div>
      </PageHero>

      <Section tone="paper">
        <ScrollReveal>
          <SectionHeading
            eyebrow="What we will cover"
            title="A complete blueprint, not a pep talk."
            lede="The session is built around decisions you can actually make, in the order that makes them work."
          />
        </ScrollReveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {agenda.map((item, i) => (
            <li key={item.title}>
              <ScrollReveal delay={0.06 * i}>
                <div className="card flex h-full gap-3 p-5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" aria-hidden />
                  <div>
                    <h3 className="font-sans text-base font-semibold text-ink">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.detail}</p>
                  </div>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white">
        <ScrollReveal>
          <SectionHeading eyebrow="How to join" title="Three steps, two minutes." />
        </ScrollReveal>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title}>
              <ScrollReveal delay={0.06 * i}>
                <div className="card h-full p-5">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-green-700 font-display text-base text-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-3.5 font-sans text-base font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.detail}</p>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ol>

        <p className="mt-6 text-sm text-muted">
          Prefer to ask something first?{' '}
          <a
            href={whatsappLink(whatsappMessages.liveSessionQuestion)}
            target="_blank"
            rel="noopener noreferrer"
            className="link-hover font-semibold text-green-700"
          >
            Message us on WhatsApp
          </a>
          .
        </p>
      </Section>

      <Section tone="paper">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <ScrollReveal>
            <div>
              <SectionHeading
                eyebrow="Reminder"
                title="Do not miss it."
                lede="We will send one reminder before the session. Nothing else, unless you ask for it."
              />
              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                <Button href={whatsappLink(whatsappMessages.liveSessionReminder)} variant="whatsapp" size="lg">
                  <MessageCircle className="h-4 w-4" aria-hidden /> Remind me on WhatsApp
                </Button>
                <Button href={liveSession.platformUrl} variant="secondary" size="lg" external>
                  <Facebook className="h-4 w-4" aria-hidden /> Follow on Facebook
                </Button>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="card p-5 md:p-6">
              <p className="flex items-center gap-2 font-sans text-base font-semibold text-ink">
                <Users className="h-4 w-4 text-green-700" aria-hidden />
                Remind me by email
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                One email before the session. You can unsubscribe at any time.
              </p>
              <div className="mt-4">
                <Newsletter compact />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      <Section tone="white" tight>
        <ScrollReveal>
          <SectionHeading eyebrow="Questions" title="Before you join." />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="mt-6 max-w-2xl">
            <Faq items={faq} />
          </div>
        </ScrollReveal>
      </Section>

      <CTABand
        title="Ready to take control of your money in 2027?"
        lede={`Join the free live session on ${liveSession.date}, streaming on ${liveSession.platform}.`}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Event',
            name: liveSession.title,
            description: liveSession.subtitle,
            startDate: liveSession.dateISO,
            eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
            eventStatus: 'https://schema.org/EventScheduled',
            location: {
              '@type': 'VirtualLocation',
              url: liveSession.platformUrl,
            },
            organizer: {
              '@type': 'Organization',
              name: liveSession.host,
              url: 'https://investingsparkle.com',
            },
            isAccessibleForFree: true,
          }),
        }}
      />
    </>
  );
}
