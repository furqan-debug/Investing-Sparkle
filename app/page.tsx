import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, GraduationCap, Compass, Calculator, TrendingUp } from 'lucide-react';

import { Section, SectionHeading } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ScrollReveal';
import { HeroHeadline } from '@/components/HeroHeadline';
import { TrustBar } from '@/components/TrustBar';
import { PhilosophyStrip } from '@/components/PhilosophyStrip';
import { BootcampCard } from '@/components/BootcampCard';
import { Testimonials } from '@/components/Testimonials';
import { ArticleCard } from '@/components/ArticleCard';
import { CTABand } from '@/components/CTABand';

import { site } from '@/content/site';
import { bootcamp } from '@/content/bootcamp';
import { problems, journey, journeyNote } from '@/content/about';
import { publishedArticles } from '@/content/insights';
import { tools } from '@/content/tools';
import { learningTestimonials } from '@/content/testimonials';

export const metadata: Metadata = {
  title: 'Learn to invest in Pakistan with confidence, not guesswork',
  description: site.description,
  alternates: { canonical: '/' },
};

const toolIcons = [Compass, TrendingUp, Calculator];

export default function HomePage() {
  const featuredTools = tools.filter((t) => t.featured).slice(0, 3);
  const latestArticles = publishedArticles.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden text-white">
        {/* Floating decorative elements */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="float absolute right-[15%] top-[12%] h-2 w-2 rounded-full bg-sparkle-400/30" />
          <div className="float-reverse absolute left-[10%] top-[60%] h-1.5 w-1.5 rounded-full bg-green-400/20" />
          <div className="float-slow absolute right-[25%] bottom-[20%] h-3 w-3 rounded-full bg-sparkle-400/15" />
          <div className="pulse-soft absolute left-[30%] top-[20%] h-1 w-1 rounded-full bg-sparkle-300/40" />
          <div className="float absolute right-[40%] top-[35%] h-1.5 w-1.5 rounded-full bg-green-300/15" style={{ animationDelay: '2s' }} />
          <div className="rotate-slow absolute right-[8%] bottom-[35%] h-24 w-24 rounded-full border border-white/[0.03]" />
          <div className="rotate-slow absolute left-[5%] top-[15%] h-40 w-40 rounded-full border border-sparkle-400/[0.04]" style={{ animationDirection: 'reverse' }} />
        </div>

        <div className="container-page relative py-20 md:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
            <div>
              {bootcamp.status === 'enrolling' && (
                <Link
                  href="/learn/bootcamp"
                  className="animate-fade-in eyebrow rounded-full bg-sparkle-400 px-3.5 py-1.5 text-green-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-sparkle-300 hover:shadow-lg hover:shadow-sparkle-400/20"
                >
                  New bootcamp · {bootcamp.cohort}
                </Link>
              )}

              <HeroHeadline />

              <p className="lede mt-5 max-w-xl animate-fade-up stagger-1 text-green-100">
                Structured education and personal guidance for PSX investors. You keep control of
                your money. Always.
              </p>

              <div className="mt-8 flex flex-col gap-3 animate-fade-up stagger-2 sm:flex-row sm:items-center">
                <Button href="/learn" size="lg">
                  Start Learning <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
                <Link
                  href="/services"
                  className="link-hover inline-flex items-center gap-1.5 px-2 py-2 font-semibold text-sparkle-400 transition-colors hover:text-sparkle-300"
                >
                  Explore Advisory <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>

            <div className="animate-scale-in stagger-3">
              <div className="group rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition-all duration-500 hover:border-sparkle-400/20 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-sparkle-400/5">
                <p className="eyebrow text-sparkle-400">The path</p>
                <ul className="mt-5 space-y-4">
                  {journey.map((s) => (
                    <li key={s.step} className="flex gap-4">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-green-700 font-display text-base text-white transition-colors duration-300 group-hover:bg-green-600">
                        {s.step}
                      </span>
                      <span>
                        <span className="block font-semibold leading-tight">{s.title}</span>
                        <span className="mt-0.5 block text-sm text-green-100">{s.detail}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <TrustBar />

      {/* Why we exist */}
      <Section tone="paper">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Why we exist"
            title="Investing in Pakistan is not hard because the market is complicated."
            lede="It is hard because almost nobody is teaching it properly. These are the four problems we built the company around."
          />
        </ScrollReveal>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {problems.map((p, i) => (
            <li key={p.title}>
              <ScrollReveal delay={0.08 * i}>
                <div className="card p-6">
                  <h3 className="font-sans text-lg font-semibold text-ink">{p.title}</h3>
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
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <ScrollReveal delay={0.1}>
            <div className="rounded-3xl bg-green-900 p-8 text-white md:p-10">
              <GraduationCap className="h-9 w-9 text-sparkle-400" aria-hidden />
              <h3 className="h3 mt-5">Learn</h3>
              <p className="mt-3 max-w-lg text-green-100">
                Structured courses, live bootcamps, and free tools. Understand PSX from first
                principles, in the right order, without needing anyone to tell you what to buy.
              </p>
              <Button href="/learn" size="lg" className="mt-7">
                Explore Learning <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="card p-8 md:p-10">
              <Compass className="h-9 w-9 text-green-700" aria-hidden />
              <h3 className="h3 mt-5">Guide</h3>
              <p className="mt-3 text-muted">
                One-on-one advisory when you want a plan built <em>with</em> you. Not for you, and
                never instead of you.
              </p>
              <Link
                href="/services"
                className="link-hover mt-7 inline-flex items-center gap-1.5 font-semibold text-green-700"
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
              eyebrow="Free, no signup"
              title="Start with the tools."
              lede="Nothing to pay, nothing to join. Use them, and see whether the way we explain things works for you."
            />
          </div>
        </ScrollReveal>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {featuredTools.map((tool, i) => {
            const Icon = toolIcons[i % toolIcons.length];
            const isLive = tool.status === 'live';

            const inner = (
              <>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-green-50">
                  <Icon className="h-6 w-6 text-green-700" aria-hidden />
                </div>
                <h3 className="mt-4 font-sans text-lg font-semibold text-ink">{tool.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{tool.blurb}</p>
                <p className="mt-4 text-sm font-semibold text-green-700">
                  {isLive ? 'Open tool →' : 'Coming soon'}
                </p>
              </>
            );

            return (
              <li key={tool.slug}>
                <ScrollReveal delay={0.08 * i}>
                  {isLive ? (
                    <Link
                      href={`/learn/tools/${tool.slug}`}
                      className="card flex h-full flex-col p-6"
                    >
                      {inner}
                    </Link>
                  ) : (
                    <div className="card flex h-full flex-col p-6 opacity-70">{inner}</div>
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

      {/* Currently enrolling */}
      <Section tone="white">
        <ScrollReveal>
          <SectionHeading eyebrow="Currently enrolling" title="The next cohort." />
        </ScrollReveal>
        <ScrollReveal animation="scale-in" delay={0.15}>
          <div className="mt-10">
            <BootcampCard />
          </div>
        </ScrollReveal>
      </Section>

      {/* The path */}
      <Section tone="paper">
        <ScrollReveal>
          <SectionHeading
            eyebrow="How this works"
            title="Four steps. Most people should stop after two."
          />
        </ScrollReveal>
        <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {journey.map((step, i) => (
            <li key={step.step}>
              <ScrollReveal delay={0.1 * i}>
                <div className="card flex h-full flex-col p-6">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-green-700 font-display text-lg text-white">
                    {step.step}
                  </span>
                  <h3 className="mt-4 font-sans text-lg font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{step.detail}</p>
                  <Link
                    href={step.href}
                    className="link-hover mt-4 inline-flex items-center gap-1 text-sm font-semibold text-green-700"
                  >
                    Learn more <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ol>

        <ScrollReveal delay={0.4}>
          <p className="mx-auto mt-9 max-w-2xl rounded-2xl border border-sparkle-300 bg-sparkle-50 px-6 py-5 text-center font-medium text-ink">
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
        <ScrollReveal delay={0.15}>
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
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Insights" title="Recent writing." />
            <Link
              href="/learn/insights"
              className="link-hover inline-flex items-center gap-1.5 font-semibold text-green-700"
            >
              Read all articles <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </ScrollReveal>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {latestArticles.map((article, i) => (
            <li key={article.slug}>
              <ScrollReveal delay={0.08 * i}>
                <ArticleCard article={article} />
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* About preview */}
      <Section tone="paper">
        <ScrollReveal animation="scale-in">
          <div className="card grid gap-8 overflow-hidden p-8 md:grid-cols-[1fr_1.2fr] md:p-10">
            <div>
              <p className="eyebrow text-green-600">Who we are</p>
              <p className="mt-3 text-lg leading-relaxed text-ink">
                Built by two Pakistani builders who watched too many friends lose money on WhatsApp
                tips.
              </p>
              <Link
                href="/about"
                className="link-hover mt-4 inline-flex items-center gap-1.5 font-semibold text-green-700"
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
