import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar, BookOpen, Calculator, Newspaper } from 'lucide-react';

import { Section, SectionHeading } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { BootcampCard } from '@/components/BootcampCard';
import { ArticleCard } from '@/components/ArticleCard';
import { Faq } from '@/components/Faq';
import { Testimonials } from '@/components/Testimonials';
import { CTABand } from '@/components/CTABand';

import { tools } from '@/content/tools';
import { courses } from '@/content/courses';
import { publishedArticles } from '@/content/insights';
import { faqGroups } from '@/content/faq';
import { learningTestimonials } from '@/content/testimonials';

export const metadata: Metadata = {
  title: 'Learn — everything you need to invest in PSX',
  description:
    'Courses, live bootcamps, free calculators, and honest writing about investing in the Pakistan Stock Exchange. Start from zero.',
  alternates: { canonical: '/learn' },
};

const categories = [
  {
    icon: Calendar,
    title: 'Current Bootcamp',
    detail: 'Three live days, from PSX basics to a portfolio you built yourself.',
    href: '/learn/bootcamp',
  },
  {
    icon: BookOpen,
    title: 'Courses',
    detail: 'Self-paced material covering one topic properly rather than everything shallowly.',
    href: '/learn/courses',
  },
  {
    icon: Calculator,
    title: 'Free Tools',
    detail: 'Calculators and a risk profile quiz. No signup, no cost, no catch.',
    href: '/learn/tools',
  },
  {
    icon: Newspaper,
    title: 'Insights',
    detail: 'Explainers on PSX mechanics, analysis, and the mistakes that cost the most.',
    href: '/learn/insights',
  },
];

export default function LearnPage() {
  const learningFaq = faqGroups.find((g) => g.heading === 'Learning')?.items ?? [];

  return (
    <>
      {/* Hero */}
      <section className="bg-green-950 text-white">
        <div className="container-page py-16 md:py-24">
          <p className="eyebrow text-sparkle-400">Learn</p>
          <h1 className="h1 mt-4 max-w-4xl">
            Everything you need to invest in PSX with confidence —{' '}
            <span className="text-sparkle-400">in one place.</span>
          </h1>
          <p className="lede mt-5 max-w-2xl text-green-100">
            Start with the free tools. Move to a bootcamp or course when you want structure. Nothing
            here assumes you have invested before.
          </p>
        </div>
      </section>

      {/* Category tiles */}
      <Section tone="paper" tight>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ icon: Icon, title, detail, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-colors hover:border-green-300"
              >
                <Icon className="h-8 w-8 text-green-700" aria-hidden />
                <h2 className="mt-4 font-sans text-lg font-semibold text-ink">{title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{detail}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-green-700">
                  Explore
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Currently enrolling */}
      <Section tone="white">
        <SectionHeading eyebrow="Currently enrolling" title="The next live cohort." />
        <div className="mt-10">
          <BootcampCard />
        </div>
      </Section>

      {/* Free tools */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="Free tools"
          title="Use these before you spend anything."
          lede="They are genuinely free. We would rather you form a view of how we explain things before you pay us."
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => {
            const isLive = tool.status === 'live';
            const body = (
              <>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-sans text-lg font-semibold text-ink">{tool.name}</h3>
                  {!isLive && (
                    <span className="shrink-0 rounded-full bg-sparkle-100 px-2.5 py-1 text-xs font-medium text-ink">
                      Soon
                    </span>
                  )}
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{tool.blurb}</p>
                <p className="mt-4 text-xs uppercase tracking-wider text-muted">
                  Gives you: {tool.outcome}
                </p>
                {isLive && (
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-green-700">
                    Open tool <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </span>
                )}
              </>
            );

            const base = 'flex h-full flex-col rounded-2xl border border-line bg-white p-6';

            return (
              <li key={tool.slug}>
                {isLive ? (
                  <Link
                    href={`/learn/tools/${tool.slug}`}
                    className={`${base} transition-colors hover:border-green-300`}
                  >
                    {body}
                  </Link>
                ) : (
                  <div className={`${base} opacity-70`}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Courses */}
      <Section tone="white">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Courses" title="Self-paced material." />
          <Button href="/learn/courses" variant="secondary">
            All courses <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <li key={course.slug}>
              <Link
                href={`/learn/courses/${course.slug}`}
                className="flex h-full flex-col rounded-2xl border border-line bg-paper p-6 transition-colors hover:border-green-300"
              >
                <div className="flex gap-2 text-xs">
                  <span className="rounded-full bg-green-50 px-2.5 py-1 font-medium text-green-700">
                    {course.level}
                  </span>
                  {course.status === 'waitlist' && (
                    <span className="rounded-full bg-sparkle-100 px-2.5 py-1 font-medium text-ink">
                      Waitlist
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-sans text-lg font-semibold text-ink">{course.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{course.outcome}</p>
                <p className="mt-4 text-xs text-muted">{course.duration}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Testimonials */}
      <Section tone="paper">
        <SectionHeading eyebrow="Students" title="What people say after learning with us." />
        <div className="mt-10">
          <Testimonials
            items={learningTestimonials.slice(0, 3)}
            emptyMessage="Our first cohorts have only just finished. Real, attributed testimonials will appear here — we will not write them ourselves in the meantime."
          />
        </div>
      </Section>

      {/* Latest insights */}
      <Section tone="white">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Insights" title="Recent writing." />
          <Link
            href="/learn/insights"
            className="inline-flex items-center gap-1.5 font-semibold text-green-700 hover:text-green-600"
          >
            Read all <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {publishedArticles.slice(0, 3).map((article) => (
            <li key={article.slug}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      </Section>

      {/* Learning FAQ */}
      <Section tone="paper">
        <SectionHeading eyebrow="Questions" title="About learning with us." />
        <div className="mt-8 max-w-3xl">
          <Faq items={learningFaq} />
        </div>
      </Section>

      <CTABand />
    </>
  );
}
