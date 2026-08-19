import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Globe, Languages, Users } from 'lucide-react';

import { Section, SectionHeading } from '@/components/ui/Section';
import { BootcampCard } from '@/components/BootcampCard';
import { Testimonials } from '@/components/Testimonials';
import { CTABand } from '@/components/CTABand';
import { sortedPastCohorts } from '@/content/bootcamp';
import { formatDate } from '@/lib/format';

export const metadata: Metadata = {
  title: 'Past bootcamp cohorts',
  description:
    'Every Stock Market Investor Boot Camp cohort we have run, with what changed between them.',
  alternates: { canonical: '/learn/bootcamp/archive' },
};

export default function BootcampArchivePage() {
  // While no cohort has finished, this route 404s rather than publishing a page
  // whose only content is that there is no content. It appears automatically
  // once the first entry is added to content/bootcamp.ts.
  if (sortedPastCohorts.length === 0) notFound();

  return (
    <>
      <section className="bg-green-950 text-white">
        <div className="container-page py-14 md:py-20">
          <Link
            href="/learn/bootcamp"
            className="inline-flex items-center gap-1.5 text-sm text-green-200 hover:text-sparkle-400"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> Current bootcamp
          </Link>
          <h1 className="h1 mt-5">Past cohorts</h1>
          <p className="lede mt-4 max-w-2xl text-green-100">
            Every cohort we have run, in order, including what we changed afterwards.{' '}
            {sortedPastCohorts.length}{' '}
            {sortedPastCohorts.length === 1 ? 'cohort' : 'cohorts'} completed so far.
          </p>
        </div>
      </section>

      <Section tone="paper">
        <ol className="space-y-6">
          {sortedPastCohorts.map((cohort) => (
            <li key={cohort.cohort} className="rounded-3xl border border-line bg-white p-8 md:p-10">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="h3">{cohort.cohort}</h2>
                <time dateTime={cohort.endedOn} className="text-sm text-muted">
                  Finished {formatDate(cohort.endedOn)}
                </time>
              </div>

              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-muted">
                <li className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-700" aria-hidden />
                  {cohort.cohort}
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-green-700" aria-hidden />
                  {cohort.format}
                </li>
                <li className="flex items-center gap-2">
                  <Languages className="h-4 w-4 text-green-700" aria-hidden />
                  {cohort.language}
                </li>
                {cohort.attendees !== null && (
                  <li className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-green-700" aria-hidden />
                    {cohort.attendees} attendees
                  </li>
                )}
              </ul>

              {cohort.note && (
                <p className="mt-5 rounded-2xl bg-green-50 p-5 text-sm leading-relaxed text-green-800">
                  <span className="font-semibold">What we changed after this cohort: </span>
                  {cohort.note}
                </p>
              )}

              {cohort.testimonials.length > 0 && (
                <div className="mt-7">
                  <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-muted">
                    From this cohort
                  </h3>
                  <div className="mt-4">
                    <Testimonials items={cohort.testimonials} />
                  </div>
                </div>
              )}
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="white">
        <SectionHeading eyebrow="Next up" title="The cohort now enrolling." />
        <div className="mt-10">
          <BootcampCard />
        </div>
      </Section>

      <CTABand />
    </>
  );
}
