import type { Metadata } from 'next';
import { Linkedin } from 'lucide-react';

import { Section, SectionHeading } from '@/components/ui/Section';
import { PhilosophyStrip } from '@/components/PhilosophyStrip';
import { TrustBar } from '@/components/TrustBar';
import { CTABand } from '@/components/CTABand';

import { founders, story, mission, vision, values } from '@/content/about';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'About — two Pakistani builders making investing normal',
  description:
    'Why Investing Sparkle exists, who runs it, and the four principles we do not bend on. Founded in Karachi, May 2025.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-green-950 text-white">
        <div className="container-page py-16 md:py-24">
          <p className="eyebrow text-sparkle-400">About us</p>
          <h1 className="h1 mt-4 max-w-4xl">
            Two Pakistani builders on a mission to make investing normal —{' '}
            <span className="text-sparkle-400">not intimidating.</span>
          </h1>
        </div>
      </section>

      <TrustBar />

      {/* Story */}
      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="Our story" title="Why this exists." />
          <div className="space-y-5">
            {story.map((para) => (
              <p key={para.slice(0, 40)} className="text-lg leading-relaxed text-ink">
                {para}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* Mission & vision */}
      <Section tone="white">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-green-800 p-8 text-white md:p-10">
            <p className="eyebrow text-sparkle-400">Mission</p>
            <p className="mt-4 text-xl leading-relaxed md:text-2xl">{mission}</p>
          </div>
          <div className="rounded-3xl border border-line bg-paper p-8 md:p-10">
            <p className="eyebrow text-green-600">Vision</p>
            <p className="mt-4 text-xl leading-relaxed text-ink md:text-2xl">{vision}</p>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="What we hold to"
          title="Four principles."
          lede="These are not decoration. Each one costs us something, which is how you can tell we mean them."
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {values.map((v, i) => (
            <li key={v.title} className="rounded-2xl border border-line bg-white p-7">
              <span className="font-display text-3xl text-sparkle-500">0{i + 1}</span>
              <h3 className="mt-3 font-sans text-lg font-semibold text-ink">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{v.detail}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Team */}
      <Section tone="white">
        <SectionHeading
          eyebrow="The team"
          title="Who you are actually learning from."
          lede="Both of us teach, and both of us take advisory calls. There is no one else behind the curtain."
        />
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {founders.map((f) => (
            <li key={f.name} className="rounded-3xl border border-line bg-paper p-7 md:p-8">
              <div className="flex items-center gap-5">
                {/* TODO: swap for a real headshot at /public/team/. */}
                <span
                  className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-green-100 font-display text-3xl text-green-800"
                  aria-hidden
                >
                  {f.name.charAt(0)}
                </span>
                <div>
                  <h3 className="font-sans text-xl font-semibold text-ink">{f.name}</h3>
                  <p className="text-sm text-green-700">{f.role}</p>
                  {f.linkedin && (
                    <a
                      href={f.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-muted hover:text-green-700"
                    >
                      <Linkedin className="h-4 w-4" aria-hidden /> LinkedIn
                    </a>
                  )}
                </div>
              </div>
              <p className="mt-5 leading-relaxed text-muted">{f.bio}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Honest position */}
      <Section tone="paper">
        <div className="mx-auto max-w-3xl rounded-3xl border-2 border-green-800 bg-white p-8 md:p-10">
          <h2 className="h3">Where we stand, plainly</h2>
          <div className="mt-5 space-y-4 leading-relaxed text-muted">
            <p>
              We are not licensed investment advisors under the SECP. We provide financial education
              and general guidance. We do not manage investments, execute trades, or hold client
              funds — and we are not trying to become the kind of business that does.
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
      </Section>

      <PhilosophyStrip />
      <CTABand />
    </>
  );
}
