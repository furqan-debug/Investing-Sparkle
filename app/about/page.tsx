import type { Metadata } from 'next';

import { Section, SectionHeading } from '@/components/ui/Section';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PhilosophyStrip } from '@/components/PhilosophyStrip';
import { TrustBar } from '@/components/TrustBar';
import { CTABand } from '@/components/CTABand';

import { story, mission, vision, values } from '@/content/about';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'About | Making investing in Pakistan normal, not intimidating',
  description:
    'Why Investing Sparkle exists, the four principles we do not bend on, and an honest account of our licensing status. Founded in Karachi, May 2025.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-green-950 text-white">
        <div className="container-page py-16 md:py-24">
          <p className="eyebrow animate-fade-in text-sparkle-400">About us</p>
          <h1 className="h1 mt-4 max-w-4xl animate-fade-up">
            Two Pakistani builders on a mission to make investing normal,{' '}
            <span className="text-sparkle-400">not intimidating.</span>
          </h1>
        </div>
      </section>

      <TrustBar />

      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <ScrollReveal>
            <SectionHeading eyebrow="Our story" title="Why this exists." />
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="space-y-5">
              {story.map((para) => (
                <p key={para.slice(0, 40)} className="text-lg leading-relaxed text-ink">
                  {para}
                </p>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </Section>

      <Section tone="white">
        <div className="grid gap-6 md:grid-cols-2">
          <ScrollReveal>
            <div className="rounded-3xl bg-green-900 p-8 text-white md:p-10">
              <p className="eyebrow text-sparkle-400">Mission</p>
              <p className="mt-4 text-xl leading-relaxed md:text-2xl">{mission}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="card p-8 md:p-10">
              <p className="eyebrow text-green-600">Vision</p>
              <p className="mt-4 text-xl leading-relaxed text-ink md:text-2xl">{vision}</p>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      <Section tone="paper">
        <ScrollReveal>
          <SectionHeading
            eyebrow="What we hold to"
            title="Four principles."
            lede="These are not decoration. Each one costs us something, which is how you can tell we mean them."
          />
        </ScrollReveal>
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {values.map((v, i) => (
            <li key={v.title}>
              <ScrollReveal delay={0.08 * i}>
                <div className="card p-7">
                  <span className="font-display text-3xl text-sparkle-500">0{i + 1}</span>
                  <h3 className="mt-3 font-sans text-lg font-semibold text-ink">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{v.detail}</p>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="paper">
        <ScrollReveal animation="scale-in">
          <div className="card mx-auto max-w-3xl border-l-4 border-l-green-800 p-8 md:p-10">
            <h2 className="h3">Where we stand, plainly</h2>
            <div className="mt-5 space-y-4 leading-relaxed text-muted">
              <p>
                We are not licensed investment advisors under the SECP. We provide financial education
                and general guidance. We do not manage investments, execute trades, or hold client
                funds, and we are not trying to become the kind of business that does.
              </p>
              <p>
                We earn from course fees and advisory fees. We take no commission on your trades, no
                payment from brokers, and no referral fees. Nothing we teach you is influenced by what
                we would earn if you acted on it.
              </p>
              <p>
                We started in {site.founded}. We are early, our first cohorts have only just finished,
                and we have not yet accumulated years of testimonials. We would rather tell you that
                than manufacture social proof.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      <PhilosophyStrip />
      <CTABand />
    </>
  );
}
