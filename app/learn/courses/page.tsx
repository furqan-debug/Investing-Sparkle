import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Section, SectionHeading } from '@/components/ui/Section';
import { PageHero } from '@/components/PageHero';
import { LiveSessionCard } from '@/components/LiveSessionCard';
import { CTABand } from '@/components/CTABand';
import { courses } from '@/content/courses';

export const metadata: Metadata = {
  title: 'Courses | structured learning for PSX investors',
  description:
    'Self-paced courses covering PSX fundamentals, analysis, and portfolio building. Written for people starting from zero.',
  alternates: { canonical: '/learn/courses' },
};

export default function CoursesPage() {
  return (
    <>
      <PageHero
        eyebrow="Courses"
        title="Learn it properly, in the right order."
        lede="Each course covers one thing thoroughly rather than everything superficially. If you want something free to start with, join our Facebook Live session."
      />

      <Section tone="paper">
        <SectionHeading eyebrow="Self-paced" title="Available courses." />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <li key={course.slug}>
              <Link
                href={`/learn/courses/${course.slug}`}
                className="card flex h-full flex-col p-5"
              >
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-green-50 px-2.5 py-1 font-medium text-green-700">
                    {course.level}
                  </span>
                  {course.status === 'waitlist' && (
                    <span className="rounded-full bg-sparkle-100 px-2.5 py-1 font-medium text-ink">
                      Waitlist
                    </span>
                  )}
                </div>

                <h2 className="mt-3.5 font-sans text-base font-semibold text-ink">{course.title}</h2>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{course.outcome}</p>

                <dl className="mt-4 space-y-1 border-t border-line pt-3.5 text-xs text-muted">
                  <div className="flex justify-between gap-3">
                    <dt>Duration</dt>
                    <dd className="text-right text-ink">{course.duration}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt>Language</dt>
                    <dd className="text-right text-ink">{course.language}</dd>
                  </div>
                </dl>

                <span className="mt-3.5 inline-flex items-center gap-1.5 text-sm font-semibold text-green-700">
                  Course details <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-7 max-w-2xl text-sm leading-relaxed text-muted">
          More courses are in production. Our free Facebook Live sessions cover one topic at a time
          while you wait.
        </p>
      </Section>

      <Section tone="white">
        <SectionHeading eyebrow="Free" title="Or join us live." />
        <div className="mt-8">
          <LiveSessionCard />
        </div>
      </Section>

      <CTABand />
    </>
  );
}
