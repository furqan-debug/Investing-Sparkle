import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Radio, BookOpen, Calculator, Newspaper } from 'lucide-react';

import { Section, SectionHeading } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PageHero } from '@/components/PageHero';
import { LiveSessionCard } from '@/components/LiveSessionCard';
import { ArticleCard } from '@/components/ArticleCard';
import { Faq } from '@/components/Faq';
import { Testimonials } from '@/components/Testimonials';
import { CTABand } from '@/components/CTABand';

import { liveSession } from '@/content/live-session';
import { tools } from '@/content/tools';
import { courses } from '@/content/courses';
import { publishedArticles } from '@/content/insights';
import { faqGroups } from '@/content/faq';
import { learningTestimonials } from '@/content/testimonials';

export const metadata: Metadata = {
  title: 'Learn | Everything you need to invest in PSX',
  description:
    'Courses, free live sessions, free calculators, and honest writing about investing in the Pakistan Stock Exchange. Start from zero.',
  alternates: { canonical: '/learn' },
};

const categories = [
  {
    icon: Radio,
    title: 'Free Live Session',
    detail: `${liveSession.title} · ${liveSession.date}. Free to attend on Facebook Live.`,
    href: '/live',
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
      <PageHero
        eyebrow="Learn"
        title={
          <>
            Everything you need to invest in PSX with confidence,{' '}
            <span className="text-sparkle-400">in one place.</span>
          </>
        }
        lede="Start with the free tools. Join a free live session or a course when you want structure. Nothing here assumes you have invested before."
      />

      <Section tone="paper" tight>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ icon: Icon, title, detail, href }, i) => (
            <li key={href}>
              <ScrollReveal delay={0.06 * i}>
                <Link href={href} className="card group flex h-full flex-col p-5">
                  <div className="grid h-10 w-10 place-items-center rounded-xl border border-green-500/20 bg-green-500/[0.07]">
                    <Icon className="h-5 w-5 text-green-400" aria-hidden />
                  </div>
                  <h2 className="mt-3.5 font-sans text-base font-semibold text-ink">{title}</h2>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{detail}</p>
                  <span className="mt-3.5 inline-flex items-center gap-1.5 text-sm font-semibold text-sparkle-300">
                    Explore
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white">
        <ScrollReveal>
          <SectionHeading eyebrow="Free live session" title="Join us on Facebook Live." />
        </ScrollReveal>
        <ScrollReveal animation="scale-in" delay={0.1}>
          <div className="mt-8">
            <LiveSessionCard />
          </div>
        </ScrollReveal>
      </Section>

      <Section tone="paper">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Free tools"
            title="Use these before you spend anything."
            lede="They are genuinely free. We would rather you form a view of how we explain things before you pay us."
          />
        </ScrollReveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, i) => {
            const isLive = tool.status === 'live';
            const body = (
              <>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-sans text-base font-semibold text-ink">{tool.name}</h3>
                  {!isLive && (
                    <span className="mono-label shrink-0 rounded-full border border-sparkle-400/25 bg-sparkle-400/[0.06] px-2.5 py-1 text-[10px] text-sparkle-300">
                      Soon
                    </span>
                  )}
                </div>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{tool.blurb}</p>
                <p className="mono-label mt-3.5 text-[10px]">
                  Gives you: {tool.outcome}
                </p>
                {isLive && (
                  <span className="mt-2.5 inline-flex items-center gap-1.5 text-sm font-semibold text-sparkle-300">
                    Open tool <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </span>
                )}
              </>
            );

            return (
              <li key={tool.slug}>
                <ScrollReveal delay={0.06 * i}>
                  {isLive ? (
                    <Link
                      href={`/learn/tools/${tool.slug}`}
                      className="card flex h-full flex-col p-5"
                    >
                      {body}
                    </Link>
                  ) : (
                    <div className="card flex h-full flex-col p-5 opacity-70">{body}</div>
                  )}
                </ScrollReveal>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="white">
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Courses" title="Self-paced material." />
            <Button href="/learn/courses" variant="secondary">
              All courses <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </ScrollReveal>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, i) => (
            <li key={course.slug}>
              <ScrollReveal delay={0.06 * i}>
                <Link
                  href={`/learn/courses/${course.slug}`}
                  className="card flex h-full flex-col p-5"
                >
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-1 font-medium text-green-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
                      {course.level}
                    </span>
                    {course.status === 'waitlist' && (
                      <span className="mono-label rounded-full border border-sparkle-400/25 bg-sparkle-400/[0.06] px-2.5 py-1 text-[10px] text-sparkle-300">
                        Waitlist
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3.5 font-sans text-base font-semibold text-ink">
                    {course.title}
                  </h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{course.outcome}</p>
                  <p className="mt-3.5 text-xs text-muted">{course.duration}</p>
                </Link>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="paper">
        <ScrollReveal>
          <SectionHeading eyebrow="Students" title="What people say after learning with us." />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="mt-8">
            <Testimonials
              items={learningTestimonials.slice(0, 3)}
              emptyMessage="Our first cohorts have only just finished. Real, attributed testimonials will appear here. We will not write them ourselves in the meantime."
            />
          </div>
        </ScrollReveal>
      </Section>

      <Section tone="white">
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Insights" title="Recent writing." />
            <Link
              href="/learn/insights"
              className="link-hover inline-flex items-center gap-1.5 text-sm font-semibold text-green-700"
            >
              Read all <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </ScrollReveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {publishedArticles.slice(0, 3).map((article, i) => (
            <li key={article.slug}>
              <ScrollReveal delay={0.06 * i}>
                <ArticleCard article={article} />
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="paper">
        <ScrollReveal>
          <SectionHeading eyebrow="Questions" title="About learning with us." />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="mt-6 max-w-2xl">
            <Faq items={learningFaq} />
          </div>
        </ScrollReveal>
      </Section>

      <CTABand />
    </>
  );
}
