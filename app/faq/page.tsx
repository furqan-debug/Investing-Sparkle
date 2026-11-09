import type { Metadata } from 'next';

import { Section, SectionHeading } from '@/components/ui/Section';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PageHero } from '@/components/PageHero';
import { Faq } from '@/components/Faq';
import { CTABand } from '@/components/CTABand';
import { faqGroups, allFaqItems } from '@/content/faq';

export const metadata: Metadata = {
  title: "FAQ | courses, advisory, payments, and what we don't do",
  description:
    'Answers about our courses, free live sessions, advisory services, pricing, refunds, and our licensing status.',
  alternates: { canonical: '/faq' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: allFaqItems.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Questions, answered straight."
        lede="Including the ones most companies in this space would rather not answer in public."
      />

      {faqGroups.map((group, i) => (
        <Section key={group.heading} tone={i % 2 === 0 ? 'paper' : 'white'}>
          <div className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-10">
            <ScrollReveal>
              <SectionHeading title={group.heading} />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <Faq items={group.items} />
            </ScrollReveal>
          </div>
        </Section>
      ))}

      <CTABand
        title="Still have a question?"
        lede="Message us on WhatsApp. We answer honestly, including when the answer is that we are not the right fit."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
