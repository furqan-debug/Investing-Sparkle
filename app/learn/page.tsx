import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar, BookOpen, Calculator, Newspaper } from 'lucide-react';

import { Section, SectionHeading } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ScrollReveal';
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
  title: 'Learn | Everything you need to invest in PSX',
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
      <section className="bg-green-950 text-white">
        <div className="container-page py-16 md:py-24">
          <p className="eyebrow animate-fade-in text-sparkle-400">Learn</p>
          <h1 className="h1 mt-4 max-w-4xl animate-fade-up">
            Everything you need to invest in PSX with confidence,{' '}
            <span className="text-sparkle-400">in one place.</span>
          </h1>
          <p className="lede mt-5 max-w-2xl animate-fade-up stagger-1 text-green-100">
            Start with the free tools. Move to a bootcamp or course when you want structure. Nothing
            here assumes you have invested before.
          </p>
        </div>
      </section>

      <Section tone="paper" tight>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ icon: Icon, title, detail, href }, i) => (
            <li key={href}>
              <ScrollReveal delay={0.08 * i}>
                <Link href={href} className="card group flex h-full flex-col p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-green-50">
                    <Icon className="h-6 w-6 text-green-700" aria-hidden />
                  </div>
                  <h2 className="mt-4 font-sans text-lg font-semibold text-ink">{title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{detail}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-green-700">
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
          <SectionHeading eyebrow="Currently enrolling" title="The next live cohort." />
        </ScrollReveal>
        <ScrollReveal animation="scale-in" delay={0.15}>
          <div className="mt-10">
            <BootcampCard />
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
        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, i) => {
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

            return (
              <li key={tool.slug}>
                <ScrollReveal delay={0.08 * i}>
                  {isLive ? (
                    <Link
                      href={`/learn/tools/${tool.slug}`}
                      className="card flex h-full flex-col p-6"
                    >
                      {body}
                    </Link>
                  ) : (
                    <div className="card flex h-full flex-col p-6 opacity-70">{body}</div>
                  )}
                </ScrollReveal>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="white">
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Courses" title="Self-paced material." />
            <Button href="/learn/courses" variant="secondary">
              All courses <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </ScrollReveal>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, i) => (
            <li key={course.slug}>
              <ScrollReveal delay={0.08 * i}>
                <Link
                  href={`/learn/courses/${course.slug}`}
                  className="card flex h-full flex-col p-6"
                >
                  <div className="flex gap-2 text-xs">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-1 font-medium text-green-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
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
          <div className="mt-10">
            <Testimonials
              items={learningTestimonials.slice(0, 3)}
              emptyMessage="Our first cohorts have only just finished. Real, attributed testimonials will appear here. We will not write them ourselves in the meantime."
            />
          </div>
        </ScrollReveal>
      </Section>

      <Section tone="white">
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Insights" title="Recent writing." />
            <Link
              href="/learn/insights"
              className="link-hover inline-flex items-center gap-1.5 font-semibold text-green-700"
            >
              Read all <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </ScrollReveal>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {publishedArticles.slice(0, 3).map((article, i) => (
            <li key={article.slug}>
              <ScrollReveal delay={0.08 * i}>
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
          <div className="mt-8 max-w-3xl">
            <Faq items={learningFaq} />
          </div>
        </ScrollReveal>
      </Section>

      <CTABand />
    </>
  );
}
