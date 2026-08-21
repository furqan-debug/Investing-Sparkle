import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, X, MessageCircle } from 'lucide-react';

import { Section, SectionHeading } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Faq } from '@/components/Faq';
import { Testimonials } from '@/components/Testimonials';
import { PhilosophyStrip } from '@/components/PhilosophyStrip';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';

import { services, getService, advisoryTestimonials } from '@/content/services';
import { site, paymentMethods } from '@/content/site';
import { whatsappLink, whatsappMessages } from '@/content/whatsapp';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: `${service.name} | ${service.price}`,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);
  const cta = whatsappLink(service.whatsappMessage);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.summary,
    serviceType: 'Financial education and advisory',
    provider: { '@type': 'Organization', name: site.name, url: site.url },
    areaServed: 'PK',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-green-950 text-white">
        <div className="container-page py-14 md:py-20">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm text-green-200 hover:text-sparkle-400"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> All advisory services
          </Link>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <div>
              <p className="eyebrow text-sparkle-400">Advisory</p>
              <h1 className="h1 mt-4">{service.name}</h1>
              <p className="lede mt-5 max-w-2xl text-green-100">{service.summary}</p>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/5 p-7 backdrop-blur">
              <p className="font-display text-4xl text-sparkle-400">{service.price}</p>
              {service.priceNote && (
                <p className="mt-1 text-sm text-green-200">{service.priceNote}</p>
              )}

              <dl className="mt-6 space-y-3 border-t border-white/15 pt-5 text-sm">
                <div>
                  <dt className="text-green-300">Best for</dt>
                  <dd className="mt-0.5">{service.bestFor}</dd>
                </div>
                <div>
                  <dt className="text-green-300">Timeline</dt>
                  <dd className="mt-0.5">{service.duration}</dd>
                </div>
              </dl>

              <Button href={cta} variant="whatsapp" size="lg" className="mt-7 w-full">
                <MessageCircle className="h-4 w-4" aria-hidden /> {service.ctaLabel}
              </Button>

              <p className="mt-4 text-xs leading-relaxed text-green-200">{service.refund}</p>
            </div>
          </div>
        </div>
      </section>

      {/* What it's really for */}
      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="What this is" title="Why it exists." />
          <div className="space-y-5">
            {service.detail.map((para) => (
              <p key={para.slice(0, 40)} className="text-lg leading-relaxed text-ink">
                {para}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* Fit check */}
      <Section tone="white">
        <SectionHeading
          eyebrow="Fit check"
          title="Be honest with yourself before you pay."
          lede="We would rather lose the sale than take money from someone this was never going to help."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-green-200 bg-green-50 p-7">
            <h3 className="font-sans text-lg font-semibold text-green-800">Right for you if</h3>
            <ul className="mt-4 space-y-3">
              {service.rightForYou.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-line bg-paper p-7">
            <h3 className="font-sans text-lg font-semibold text-ink">Not for you if</h3>
            <ul className="mt-4 space-y-3">
              {service.notForYou.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-danger" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section tone="paper">
        <SectionHeading eyebrow="Step by step" title="What actually happens." />
        <ol className="mt-10 space-y-4">
          {service.steps.map((step) => (
            <li
              key={step.step}
              className="flex gap-5 rounded-2xl border border-line bg-white p-6 md:p-7"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-green-800 font-display text-lg text-sparkle-400">
                {step.step}
              </span>
              <div>
                <h3 className="font-sans text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-1.5 leading-relaxed text-muted">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Deliverables + exclusions */}
      <Section tone="white">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-green-900 p-8 text-white md:p-10">
            <h2 className="h3">What you walk away with</h2>
            <ul className="mt-6 space-y-3">
              {service.deliverables.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-green-100">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-sparkle-400" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-7 rounded-2xl bg-white/10 p-5 text-sm leading-relaxed">
              <span className="font-semibold text-sparkle-400">Where this ends: </span>
              {service.endState}
            </p>
          </div>

          <div className="rounded-3xl border border-line bg-paper p-8 md:p-10">
            <h2 className="h3">What it is not</h2>
            <ul className="mt-6 space-y-3">
              {service.excludes.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-7 text-sm leading-relaxed text-muted">
              We are not licensed investment advisors under the SECP. We provide education and
              general guidance, every decision and every execution stays with you.
            </p>
          </div>
        </div>
      </Section>

      {/* Pricing */}
      <Section tone="paper">
        <div className="mx-auto max-w-2xl rounded-3xl border-2 border-green-800 bg-white p-8 text-center md:p-10">
          <p className="eyebrow text-green-600">Pricing</p>
          <p className="mt-4 font-display text-5xl text-green-800 md:text-6xl">{service.price}</p>
          {service.priceNote && <p className="mt-2 text-sm text-muted">{service.priceNote}</p>}

          <div className="mt-7 border-t border-line pt-6 text-left">
            <p className="text-sm font-semibold text-ink">Payment options</p>
            <p className="mt-1.5 text-sm text-muted">{paymentMethods.join(' · ')}</p>

            <p className="mt-5 text-sm font-semibold text-ink">Refund</p>
            <p className="mt-1.5 text-sm text-muted">{service.refund}</p>
          </div>

          <Button href={cta} variant="whatsapp" size="lg" className="mt-8 w-full">
            <MessageCircle className="h-4 w-4" aria-hidden /> {service.ctaLabel}
          </Button>

          <div className="mt-6">
            <CalendlyEmbed />
          </div>

          <p className="mt-4 text-xs text-muted">
            Not sure this is the right one?{' '}
            <a
              href={whatsappLink(whatsappMessages.notSure)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-green-700 underline underline-offset-2"
            >
              Ask us
            </a>{' '}
            , and we will say so if it is not.
          </p>
        </div>
      </Section>


      <PhilosophyStrip />

      {/* Testimonials */}
      <Section tone="paper">
        <SectionHeading eyebrow="Clients" title="In their words." />
        <div className="mt-10">
          <Testimonials
            items={advisoryTestimonials.filter((t) => t.source.includes(service.shortName))}
            emptyMessage="No published testimonials for this service yet. We will add them (with names and faces) once clients have had time to run their plans and form a real view."
          />
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="white">
        <SectionHeading eyebrow="Questions" title={`About ${service.shortName}.`} />
        <div className="mt-8 max-w-3xl">
          <Faq items={service.faq} />
        </div>
      </Section>

      {/* Other services */}
      <Section tone="paper">
        <SectionHeading eyebrow="Compare" title="The other two." />
        <ul className="mt-9 grid gap-5 md:grid-cols-2">
          {others.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-colors hover:border-green-300"
              >
                <h3 className="font-sans text-lg font-semibold text-ink">{s.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.summary}</p>
                <p className="mt-4 font-display text-2xl text-green-800">{s.price}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-green-700">
                  See details <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
