import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, GraduationCap, Compass, Calculator, TrendingUp } from 'lucide-react';

import { Section, SectionHeading } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { TrustBar } from '@/components/TrustBar';
import { PhilosophyStrip } from '@/components/PhilosophyStrip';
import { BootcampCard } from '@/components/BootcampCard';
import { Testimonials } from '@/components/Testimonials';
import { ArticleCard } from '@/components/ArticleCard';
import { CTABand } from '@/components/CTABand';

import { site } from '@/content/site';
import { bootcamp } from '@/content/bootcamp';
import { problems, journey, journeyNote, founders } from '@/content/about';
import { publishedArticles } from '@/content/insights';
import { tools } from '@/content/tools';
import { learningTestimonials } from '@/content/testimonials';

export const metadata: Metadata = {
  title: 'Learn to invest in Pakistan — with confidence, not guesswork',
  description: site.description,
  alternates: { canonical: '/' },
};

const toolIcons = [Compass, TrendingUp, Calculator];

export default function HomePage() {
  const featuredTools = tools.filter((t) => t.featured).slice(0, 3);
  const latestArticles = publishedArticles.slice(0, 3);

  return (
    <>
      {/* 1 — Hero */}
      <section className="relative overflow-hidden bg-green-950 text-white">
        {/* Soft radial wash — decorative only. */}
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-green-700/30 blur-3xl"
          aria-hidden
        />
        <div className="container-page relative py-16 md:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
            <div>
              {bootcamp.status === 'enrolling' && (
                <Link
                  href="/learn/bootcamp"
                  className="eyebrow rounded-full bg-sparkle-400 px-3.5 py-1.5 text-green-950 transition-colors hover:bg-sparkle-300"
                >
                  New bootcamp · {bootcamp.cohort}
                </Link>
              )}

              <h1 className="h1 mt-5">
                Learn to invest in Pakistan — with confidence,{' '}
                <span className="text-sparkle-400">not guesswork.</span>
              </h1>

              <p className="lede mt-5 max-w-xl text-green-100">
                Structured education and personal guidance for PSX investors. You keep control of
                your money — always.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/learn" size="lg">
                  Start Learning <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 px-2 py-2 font-semibold text-sparkle-400 transition-colors hover:text-sparkle-300"
                >
                  Explore Advisory <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>

            {/*
              Hero visual.
              TODO: replace this panel with a founder photograph (you + Masab)
              at /public/team/founders.jpg. Real faces outperform illustration
              for trust, and the plan calls for it explicitly.
            */}
            <div className="relative">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur">
                <p className="eyebrow text-sparkle-400">The path</p>
                <ul className="mt-5 space-y-4">
                  {journey.map((s) => (
                    <li key={s.step} className="flex gap-4">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sparkle-400 font-display text-base text-green-950">
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

      {/* 2 — Trust bar */}
      <TrustBar />

      {/* 3 — Why we exist */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="Why we exist"
          title="Investing in Pakistan is not hard because the market is complicated."
          lede="It is hard because almost nobody is teaching it properly. These are the four problems we built the company around."
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {problems.map((p) => (
            <li key={p.title} className="rounded-2xl border border-line bg-white p-6">
              <h3 className="font-sans text-lg font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.detail}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 4 — Our approach */}
      <Section tone="white">
        <SectionHeading
          eyebrow="Our approach"
          title="Two pillars — and one of them does most of the work."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl bg-green-800 p-8 text-white md:p-10">
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

          <div className="rounded-3xl border border-line bg-paper p-8 md:p-10">
            <Compass className="h-9 w-9 text-green-700" aria-hidden />
            <h3 className="h3 mt-5">Guide</h3>
            <p className="mt-3 text-muted">
              One-on-one advisory when you want a plan built <em>with</em> you — not for you, and
              never instead of you.
            </p>
            <Link
              href="/services"
              className="mt-7 inline-flex items-center gap-1.5 font-semibold text-green-700 hover:text-green-600"
            >
              See advisory services <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </Section>

      {/* 5 — Free tools */}
      <Section tone="paper">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Free, no signup"
            title="Start with the tools."
            lede="Nothing to pay, nothing to join. Use them, and see whether the way we explain things works for you."
          />
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {featuredTools.map((tool, i) => {
            const Icon = toolIcons[i % toolIcons.length];
            const isLive = tool.status === 'live';

            const inner = (
              <>
                <Icon className="h-8 w-8 text-green-700" aria-hidden />
                <h3 className="mt-4 font-sans text-lg font-semibold text-ink">{tool.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{tool.blurb}</p>
                <p className="mt-4 text-sm font-semibold text-green-700">
                  {isLive ? 'Open tool →' : 'Coming soon'}
                </p>
              </>
            );

            const cardClass = 'flex h-full flex-col rounded-2xl border border-line bg-white p-6';

            return (
              <li key={tool.slug}>
                {isLive ? (
                  <Link
                    href={`/learn/tools/${tool.slug}`}
                    className={`${cardClass} transition-colors hover:border-green-300`}
                  >
                    {inner}
                  </Link>
                ) : (
                  <div className={`${cardClass} opacity-70`}>{inner}</div>
                )}
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

      {/* 6 — Currently enrolling */}
      <Section tone="white">
        <SectionHeading eyebrow="Currently enrolling" title="The next cohort." />
        <div className="mt-10">
          <BootcampCard />
        </div>
      </Section>

      {/* 7 — The path */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="How this works"
          title="Four steps — and most people should stop after two."
        />
        <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {journey.map((step) => (
            <li key={step.step} className="rounded-2xl border border-line bg-white p-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-green-800 font-display text-lg text-sparkle-400">
                {step.step}
              </span>
              <h3 className="mt-4 font-sans text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.detail}</p>
              <Link
                href={step.href}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-green-700 hover:text-green-600"
              >
                Learn more <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-9 max-w-2xl rounded-2xl bg-sparkle-100 px-6 py-5 text-center font-medium text-ink">
          {journeyNote}
        </p>
      </Section>

      {/* 8 — Philosophy */}
      <PhilosophyStrip />

      {/* 9 — Testimonials */}
      <Section tone="paper">
        <SectionHeading eyebrow="In their words" title="What students say." />
        <div className="mt-10">
          <Testimonials
            items={learningTestimonials.slice(0, 3)}
            emptyMessage="Our first cohorts have just finished. We would rather show you nothing here than write testimonials ourselves — real ones are coming."
          />
        </div>
      </Section>

      {/* 10 — Insights */}
      <Section tone="white">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Insights" title="Recent writing." />
          <Link
            href="/learn/insights"
            className="inline-flex items-center gap-1.5 font-semibold text-green-700 hover:text-green-600"
          >
            Read all articles <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {latestArticles.map((article) => (
            <li key={article.slug}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      </Section>

      {/* 11 — About preview */}
      <Section tone="paper">
        <div className="grid items-center gap-10 rounded-3xl border border-line bg-white p-8 md:grid-cols-[auto_1fr] md:p-10">
          <div className="flex -space-x-3">
            {founders.map((f) => (
              <span
                key={f.name}
                className="grid h-16 w-16 place-items-center rounded-full border-4 border-white bg-green-100 font-display text-2xl text-green-800"
                aria-hidden
              >
                {f.name.charAt(0)}
              </span>
            ))}
          </div>
          <div>
            <p className="eyebrow text-green-600">Who we are</p>
            <p className="mt-3 text-lg leading-relaxed text-ink">
              Built by two Pakistani builders who watched too many friends lose money on WhatsApp
              tips.
            </p>
            <Link
              href="/about"
              className="mt-4 inline-flex items-center gap-1.5 font-semibold text-green-700 hover:text-green-600"
            >
              Read our story <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </Section>

      {/* 12 — Final CTA */}
      <CTABand />
    </>
  );
}
