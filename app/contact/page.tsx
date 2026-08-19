import type { Metadata } from 'next';
import { MessageCircle, Mail, MapPin, Clock } from 'lucide-react';

import { Section, SectionHeading } from '@/components/ui/Section';
import { ContactForm } from '@/components/ContactForm';
import { Faq } from '@/components/Faq';
import { site } from '@/content/site';
import { whatsappLink, whatsappMessages } from '@/content/whatsapp';
import { faqGroups } from '@/content/faq';

export const metadata: Metadata = {
  title: 'Contact — reach us on WhatsApp or email',
  description: `Get in touch with ${site.name}. WhatsApp ${site.contact.whatsapp} or email ${site.contact.emailGeneral}.`,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  // A short mix of the questions people most often arrive at this page with.
  const miniFaq = [
    ...(faqGroups.find((g) => g.heading === 'Payments & refunds')?.items.slice(0, 2) ?? []),
    ...(faqGroups.find((g) => g.heading === 'Advisory')?.items.slice(0, 2) ?? []),
    ...(faqGroups.find((g) => g.heading === 'Learning')?.items.slice(0, 1) ?? []),
  ];

  return (
    <>
      <section className="bg-green-950 text-white">
        <div className="container-page py-16 md:py-24">
          <p className="eyebrow text-sparkle-400">Contact</p>
          <h1 className="h1 mt-4">Get in touch.</h1>
          <p className="lede mt-5 max-w-2xl text-green-100">
            WhatsApp is the fastest way to reach us, and it is where bookings happen. Email works
            too if you would rather write it out.
          </p>
        </div>
      </section>

      <Section tone="paper">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          {/* WhatsApp-first */}
          <div className="flex flex-col gap-5">
            <div className="rounded-3xl bg-green-800 p-8 text-white">
              <MessageCircle className="h-9 w-9 text-sparkle-400" aria-hidden />
              <h2 className="h3 mt-4">Fastest way to reach us</h2>
              <p className="mt-3 text-green-100">
                Message us on WhatsApp and you will usually hear back the same day.
              </p>
              <a
                href={whatsappLink(whatsappMessages.contact)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 font-semibold text-green-950 hover:bg-[#1eb857]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden /> {site.contact.whatsapp}
              </a>
              <p className="mt-4 text-sm text-green-200">
                Response time: {site.contact.responseTime.toLowerCase()}.
              </p>
            </div>

            <dl className="space-y-4 rounded-3xl border border-line bg-white p-7">
              <div className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-green-700" aria-hidden />
                <div>
                  <dt className="text-sm font-semibold text-ink">Email</dt>
                  <dd className="mt-0.5 text-sm text-muted">
                    <a
                      href={`mailto:${site.contact.emailGeneral}`}
                      className="hover:text-green-700 hover:underline"
                    >
                      {site.contact.emailGeneral}
                    </a>
                    <br />
                    <a
                      href={`mailto:${site.contact.emailSupport}`}
                      className="hover:text-green-700 hover:underline"
                    >
                      {site.contact.emailSupport}
                    </a>{' '}
                    — for course and payment queries
                  </dd>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-green-700" aria-hidden />
                <div>
                  <dt className="text-sm font-semibold text-ink">Location</dt>
                  <dd className="mt-0.5 text-sm text-muted">{site.contact.address}</dd>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-green-700" aria-hidden />
                <div>
                  <dt className="text-sm font-semibold text-ink">Business hours</dt>
                  <dd className="mt-0.5 text-sm text-muted">{site.contact.hours}</dd>
                </div>
              </div>
            </dl>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-line bg-white p-7 md:p-9">
            <h2 className="h3">Prefer to write?</h2>
            <p className="mt-2 text-sm text-muted">
              Fill this in and we will reply by email. Everything marked with an asterisk is
              required.
            </p>
            <div className="mt-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading eyebrow="Before you write" title="These come up a lot." />
        <div className="mt-8 max-w-3xl">
          <Faq items={miniFaq} />
        </div>
        <p className="mt-6 text-sm text-muted">
          More on the{' '}
          <a href="/faq" className="font-semibold text-green-700 underline underline-offset-2">
            full FAQ page
          </a>
          .
        </p>
      </Section>
    </>
  );
}
