import type { Metadata } from 'next';
import { MessageCircle, Mail, MapPin, Clock } from 'lucide-react';

import { Section, SectionHeading } from '@/components/ui/Section';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PageHero } from '@/components/PageHero';
import { ContactForm } from '@/components/ContactForm';
import { Faq } from '@/components/Faq';
import { site } from '@/content/site';
import { whatsappLink, whatsappMessages } from '@/content/whatsapp';
import { faqGroups } from '@/content/faq';

export const metadata: Metadata = {
  title: 'Contact | reach us on WhatsApp or email',
  description: `Get in touch with ${site.name}. WhatsApp ${site.contact.whatsapp} or email ${site.contact.email}.`,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  const miniFaq = [
    ...(faqGroups.find((g) => g.heading === 'Payments & refunds')?.items.slice(0, 2) ?? []),
    ...(faqGroups.find((g) => g.heading === 'Advisory')?.items.slice(0, 2) ?? []),
    ...(faqGroups.find((g) => g.heading === 'Learning')?.items.slice(0, 1) ?? []),
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch."
        lede="WhatsApp is the fastest way to reach us, and it is where bookings happen. Email works too if you would rather write it out."
      />

      <Section tone="paper">
        <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
          <div className="flex min-w-0 flex-col gap-4">
            <ScrollReveal>
              <div className="rounded-2xl bg-green-900 p-6 text-white md:p-8">
                <MessageCircle className="h-8 w-8 text-sparkle-400" aria-hidden />
                <h2 className="h3 mt-3">Fastest way to reach us</h2>
                <p className="mt-2 text-sm text-green-100 md:text-base">
                  Message us on WhatsApp and you will usually hear back the same day.
                </p>
                <a
                  href={whatsappLink(whatsappMessages.contact)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--secondary btn--md mt-5 w-full"
                >
                  <MessageCircle className="h-4 w-4 text-sparkle-400" aria-hidden /> {site.contact.whatsapp}
                </a>
                <p className="mt-3 text-xs text-green-200">
                  Response time: {site.contact.responseTime.toLowerCase()}.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <dl className="card min-w-0 space-y-4 p-6">
                <div className="flex gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-green-50">
                    <Mail className="h-4 w-4 text-green-700" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <dt className="text-sm font-semibold text-ink">Email</dt>
                    <dd className="mt-0.5 text-sm text-muted">
                      <a
                        href={`mailto:${site.contact.email}`}
                        className="link-hover font-medium break-words text-green-700"
                      >
                        {site.contact.email}
                      </a>
                      <br />
                      Enquiries, bookings, and support all go here.
                    </dd>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-green-50">
                    <MapPin className="h-4 w-4 text-green-700" aria-hidden />
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-ink">Location</dt>
                    <dd className="mt-0.5 text-sm text-muted">{site.contact.address}</dd>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-green-50">
                    <Clock className="h-4 w-4 text-green-700" aria-hidden />
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-ink">Business hours</dt>
                    <dd className="mt-0.5 text-sm text-muted">{site.contact.hours}</dd>
                  </div>
                </div>
              </dl>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.15} className="min-w-0">
            <div className="card min-w-0 p-6 md:p-8">
              <h2 className="h3">Prefer to write?</h2>
              <p className="mt-2 text-sm text-muted">
                Fill this in and we will reply by email. Everything marked with an asterisk is
                required.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      <Section tone="white">
        <ScrollReveal>
          <SectionHeading eyebrow="Before you write" title="These come up a lot." />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="mt-6 max-w-2xl">
            <Faq items={miniFaq} />
          </div>
        </ScrollReveal>
        <p className="mt-5 text-sm text-muted">
          More on the{' '}
          <a href="/faq" className="link-hover font-semibold text-green-700">
            full FAQ page
          </a>
          .
        </p>
      </Section>
    </>
  );
}
