import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  ArrowRight,
  Calculator,
  Check,
  Coins,
  Compass,
  GraduationCap,
  TrendingUp,
} from 'lucide-react';

import { Section, SectionHeading } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ScrollReveal';
import { HeroHeadline } from '@/components/HeroHeadline';
import { TrustBar } from '@/components/TrustBar';
import { PhilosophyStrip } from '@/components/PhilosophyStrip';
import { LiveSessionCard } from '@/components/LiveSessionCard';
import { Testimonials } from '@/components/Testimonials';
import { ArticleCard } from '@/components/ArticleCard';
import { CTABand } from '@/components/CTABand';

import { site } from '@/content/site';
import { liveSession } from '@/content/live-session';
import { problems, journey, journeyNote } from '@/content/about';
import { publishedArticles } from '@/content/insights';
import { tools } from '@/content/tools';
import { learningTestimonials } from '@/content/testimonials';

export const metadata: Metadata = {
  title: 'Learn to invest in Pakistan with confidence, not guesswork',
  description: site.description,
  alternates: { canonical: '/' },
};

const toolIcons = [Compass, TrendingUp, Calculator, Coins];

/**
 * The home strip is ordered for variety rather than by registry order: one
 * question about you, one about monthly investing, then the two tax figures
 * people search for most.
 */
const homeToolSlugs = [
  'risk-profile',
  'sip-calculator',
  'salary-income-tax-calculator',
  'zakat-calculator',
];

const heroSignals = ['We never touch your money', 'Since May 2025', 'Karachi, Pakistan'];

export default function HomePage() {
  const featuredTools = homeToolSlugs
    .map((slug) => tools.find((tool) => tool.slug === slug))
    .filter((tool) => tool !== undefined);
  const latestArticles = publishedArticles.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="hero-art" aria-hidden>
          <Image
            src="/brand/hero-psx-bull.png"
            alt=""
            fill
            priority
            quality={82}
            sizes="100vw"
          />
        </div>

        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute -left-24 top-24 h-72 w-72 rounded-full border border-white/[0.04]" />
          <div className="absolute right-[8%] top-[18%] h-1 w-1 rounded-full bg-sparkle-400/40" />
          <div className="absolute left-[42%] top-[12%] h-1.5 w-1.5 rounded-full bg-green-400/20" />
        </div>

        <div className="container-page relative z-10 pb-16 pt-14 md:pb-24 md:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
            <div>
              <Link
                href="/live"
                className="mono-label inline-flex items-center gap-2.5 rounded-full border border-sparkle-400/30 bg-sparkle-400/[0.06] px-3.5 py-2 text-sparkle-300 transition-colors hover:border-sparkle-400/55 hover:bg-sparkle-400/[0.1]"
              >
                <span className="signal-dot" aria-hidden />
                Free Facebook Live / {liveSession.date}
              </Link>

              <HeroHeadline />

              <p className="lede mt-6 max-w-[46ch] animate-fade-up stagger-1">
                Structured education and personal guidance for PSX investors. You keep control of
                your money. Always.
              </p>

              <div className="mt-8 flex flex-col gap-3 animate-fade-up stagger-2 sm:flex-row sm:items-center">
                <Button href="/learn" size="lg" goo="var(--color-sparkle-300)" gooScale>
                  Start learning <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
                <Button href="/live" variant="secondary" size="lg">
                  Join the free live session
                </Button>
              </div>

              <ul className="mt-9 flex animate-fade-up flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5 text-[13px] text-muted stagger-3">
                {heroSignals.map((signal) => (
                  <li key={signal} className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-sparkle-400" aria-hidden />
                    {signal}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="glass relative rounded-[28px] bg-[linear-gradient(180deg,rgba(8,14,10,0.88),rgba(3,6,4,0.95))] p-6 animate-scale-in stagger-2 md:p-7">
              <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
                <span className="mono-label text-sparkle-300">The path</span>
                <span className="mono-label">04 steps</span>
              </div>

              <ol className="mt-1">
                {journey.map((step) => (
                  <li
                    key={step.step}
                    className="grid grid-cols-[30px_1fr] gap-3 border-b border-line py-3.5 last:border-0"
                  >
                    <span className="mono-label pt-1 text-sparkle-400">{step.step}</span>
                    <span>
                      <Link
                        href={step.href}
                        className="font-display text-[15px] font-semibold tracking-[-0.01em] text-ink transition-colors hover:text-sparkle-300"
                      >
                        {step.title}
                      </Link>
                      <span className="mt-1 block text-[12.5px] leading-relaxed text-muted">
                        {step.detail}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="mono-label">Education first</span>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-sparkle-300 transition-colors hover:text-sparkle-200"
                >
                  Compare services <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <TrustBar />

      {/* Free live session */}
      <Section tone="white" tight>
        <ScrollReveal>
          <LiveSessionCard />
        </ScrollReveal>
      </Section>

      {/* Why we exist */}
      <Section tone="paper">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Why we exist"
            title="Investing in Pakistan is not hard because the market is complicated."
            lede="It is hard because almost nobody is teaching it properly. These are the four problems we built the company around."
          />
        </ScrollReveal>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {problems.map((p, i) => (
            <li key={p.title}>
              <ScrollReveal delay={0.06 * i}>
                <div className="card h-full p-6">
                  <div className="flex items-center gap-3">
                    <span className="mono-label text-sparkle-400">0{i + 1}</span>
                    <span className="h-px flex-1 bg-line" aria-hidden />
                  </div>
                  <h3 className="mt-4 font-sans text-base font-semibold text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.detail}</p>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* Our approach */}
      <Section tone="white">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Our approach"
            title="Two pillars, and one of them does most of the work."
          />
        </ScrollReveal>
        <div className="mt-10 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <ScrollReveal delay={0.08}>
            <div className="relative h-full overflow-hidden rounded-[24px] border border-sparkle-400/20 bg-green-900 p-6 md:p-8">
              <span className="mono-label text-sparkle-300">01 / Learn</span>
              <GraduationCap className="mt-6 h-8 w-8 text-sparkle-400" aria-hidden />
              <h3 className="h3 mt-4">Learn</h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted md:text-base">
                Structured courses, free live sessions, and free tools. Understand PSX from first
                principles, in the right order, without needing anyone to tell you what to buy.
              </p>
              <Button href="/learn" size="lg" className="mt-7">
                Explore learning <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.16}>
            <div className="card h-full p-6 md:p-8">
              <span className="mono-label">02 / Guide</span>
              <Compass className="mt-6 h-8 w-8 text-green-400" aria-hidden />
              <h3 className="h3 mt-4">Guide</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                One-on-one advisory when you want a plan built <em>with</em> you. Not for you, and
                never instead of you.
              </p>
              <Link
                href="/services"
                className="link-hover mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-sparkle-300"
              >
                See advisory services <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* Free tools */}
      <Section tone="paper">
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Free tools"
              title="Start with the tools."
              lede="Nothing to pay and no card. Sign in with Google once and every calculator and the risk profile quiz open."
            />
          </div>
        </ScrollReveal>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredTools.map((tool, i) => {
            const Icon = toolIcons[i % toolIcons.length];
            const isLive = tool.status === 'live';

            const inner = (
              <>
                <div className="flex items-center justify-between">
                  <div className="grid h-10 w-10 place-items-center rounded-xl border border-green-500/20 bg-green-500/[0.08]">
                    <Icon className="h-5 w-5 text-green-400" aria-hidden />
                  </div>
                  <span className="mono-label">0{i + 1}</span>
                </div>
                <h3 className="mt-4 font-sans text-base font-semibold text-ink">{tool.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{tool.blurb}</p>
                <p className="mt-4 text-sm font-semibold text-sparkle-300">
                  {isLive ? 'Open tool →' : 'Coming soon'}
                </p>
              </>
            );

            return (
              <li key={tool.slug}>
                <ScrollReveal delay={0.06 * i}>
                  {isLive ? (
                    <Link
                      href={`/learn/tools/${tool.slug}`}
                      className="card flex h-full flex-col p-6"
                    >
                      {inner}
                    </Link>
                  ) : (
                    <div className="card flex h-full flex-col p-6 opacity-60">{inner}</div>
                  )}
                </ScrollReveal>
              </li>
            );
          })}
        </ul>

        <div className="mt-8">
          <Button href="/learn/tools" variant="secondary">
            View all free tools <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </Section>

      {/* The path */}
      <Section tone="white">
        <ScrollReveal>
          <SectionHeading
            eyebrow="How this works"
            title="Four steps. Most people should stop after two."
          />
        </ScrollReveal>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {journey.map((step, i) => (
            <li key={step.step}>
              <ScrollReveal delay={0.08 * i}>
                <div className="card flex h-full flex-col p-6">
                  <span className="mono-label text-sparkle-400">{step.step}</span>
                  <h3 className="mt-4 font-sans text-base font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{step.detail}</p>
                  <Link
                    href={step.href}
                    className="link-hover mt-4 inline-flex items-center gap-1 text-sm font-semibold text-sparkle-300"
                  >
                    Learn more <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ol>

        <ScrollReveal delay={0.3}>
          <p className="mx-auto mt-8 max-w-2xl rounded-2xl border border-sparkle-400/20 bg-sparkle-400/[0.04] px-5 py-4 text-center text-sm font-medium text-muted md:text-base">
            {journeyNote}
          </p>
        </ScrollReveal>
      </Section>

      {/* Philosophy */}
      <PhilosophyStrip />

      {/* Testimonials */}
      <Section tone="paper">
        <ScrollReveal>
          <SectionHeading eyebrow="In their words" title="What students say." />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="mt-10">
            <Testimonials
              items={learningTestimonials.slice(0, 3)}
              emptyMessage="Our first cohorts have just finished. We would rather show you nothing here than write testimonials ourselves. Real ones are coming."
            />
          </div>
        </ScrollReveal>
      </Section>

      {/* Insights */}
      <Section tone="white">
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Insights" title="Recent writing." />
            <Link
              href="/learn/insights"
              className="link-hover inline-flex items-center gap-1.5 text-sm font-semibold text-sparkle-300"
            >
              Read all articles <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </ScrollReveal>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {latestArticles.map((article, i) => (
            <li key={article.slug}>
              <ScrollReveal delay={0.06 * i}>
                <ArticleCard article={article} />
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* About preview */}
      <Section tone="paper">
        <ScrollReveal animation="scale-in">
          <div className="glass grid gap-8 rounded-[24px] p-6 md:grid-cols-[1fr_1.2fr] md:p-8">
            <div>
              <p className="eyebrow text-sparkle-400">Who we are</p>
              <p className="mt-4 text-base leading-relaxed text-ink md:text-lg">
                Built by two Pakistani builders who watched too many friends lose money on WhatsApp
                tips.
              </p>
              <Link
                href="/about"
                className="link-hover mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sparkle-300"
              >
                Read our story <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>

            <div className="border-t border-line pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <p className="text-sm font-semibold text-ink">Where we stand, plainly</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                We are not SECP-licensed investment advisors. We earn from course and advisory fees
                only: no commission on your trades, no payment from brokers, no referral fees.
                Nothing we teach is influenced by what we would earn if you acted on it.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* Final CTA */}
      <CTABand />
    </>
  );
}
