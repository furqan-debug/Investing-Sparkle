import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Section, SectionHeading } from '@/components/ui/Section';
import { BootcampCard } from '@/components/BootcampCard';
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
      <section className="bg-green-950 text-white">
        <div className="container-page py-16 md:py-24">
          <p className="eyebrow text-sparkle-400">Courses</p>
          <h1 className="h1 mt-4 max-w-3xl">Learn it properly, in the right order.</h1>
          <p className="lede mt-5 max-w-2xl text-green-100">
            Each course covers one thing thoroughly rather than everything superficially. If you
            want the full arc in three days instead, the live bootcamp is below.
          </p>
        </div>
      </section>

      <Section tone="paper">
        <SectionHeading eyebrow="Self-paced" title="Available courses." />
        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <li key={course.slug}>
              <Link
                href={`/learn/courses/${course.slug}`}
                className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-colors hover:border-green-300"
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

                <h2 className="mt-4 font-sans text-lg font-semibold text-ink">{course.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{course.outcome}</p>

                <dl className="mt-5 space-y-1 border-t border-line pt-4 text-xs text-muted">
                  <div className="flex justify-between gap-3">
                    <dt>Duration</dt>
                    <dd className="text-right text-ink">{course.duration}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt>Language</dt>
                    <dd className="text-right text-ink">{course.language}</dd>
                  </div>
                </dl>

                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-green-700">
                  Course details <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-9 max-w-2xl text-sm leading-relaxed text-muted">
          More courses are in production. The bootcamp covers the full arc (foundations, analysis,
          and portfolio construction) in three live days if you would rather not wait.
        </p>
      </Section>

      <Section tone="white">
        <SectionHeading eyebrow="Live" title="Or join the next bootcamp." />
        <div className="mt-10">
          <BootcampCard />
        </div>
      </Section>

      <CTABand />
    </>
  );
}
