import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Check, MessageCircle } from 'lucide-react';

import { Section, SectionHeading } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/PageHero';
import { Faq } from '@/components/Faq';
import { Testimonials } from '@/components/Testimonials';
import { PhilosophyStrip } from '@/components/PhilosophyStrip';

import { courses, getCourse } from '@/content/courses';
import { site, paymentMethods } from '@/content/site';
import { whatsappLink, whatsappMessages } from '@/content/whatsapp';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};

  return {
    title: course.title,
    description: course.outcome,
    alternates: { canonical: `/learn/courses/${course.slug}` },
  };
}

export default async function CoursePage({ params }: Params) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const enrollLink = whatsappLink(whatsappMessages.courseEnroll(course.title));

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.outcome,
    inLanguage: 'ur',
    provider: { '@type': 'Organization', name: site.name, sameAs: site.url },
  };

  return (
    <>
      {/* Hero */}
      <PageHero
        back={{ href: '/learn/courses', label: 'All courses' }}
        eyebrow="Course"
        title={course.title}
        lede={course.outcome}
      >
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-sparkle-400 px-3 py-1 font-semibold text-green-950">
            {course.level}
          </span>
          {course.status === 'waitlist' && (
            <span className="rounded-full border border-white/25 px-3 py-1 font-semibold">
              Waitlist open
            </span>
          )}
        </div>

        <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Duration', course.duration],
            ['Format', course.format],
            ['Language', course.language],
            ['Price', course.price],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs uppercase tracking-wider text-green-300">{label}</dt>
              <dd className="mt-1 text-sm font-medium">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6">
          <Button href={enrollLink} size="lg" variant="whatsapp">
            <MessageCircle className="h-4 w-4" aria-hidden />
            {course.status === 'waitlist' ? 'Join the waitlist' : 'Enroll via WhatsApp'}
          </Button>
        </div>
      </PageHero>

      {/* Who this is for */}
      <Section tone="paper">
        <SectionHeading eyebrow="Who this is for" title="You will get the most from this if:" />
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {course.forWhom.map((item) => (
            <li key={item} className="flex gap-2.5 rounded-xl border border-line bg-white p-4">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" aria-hidden />
              <span className="text-sm leading-relaxed text-ink">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* What you'll learn */}
      <Section tone="white">
        <SectionHeading eyebrow="Outcomes" title="What you will be able to do." />
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {course.learn.map((item) => (
            <li key={item} className="flex gap-2.5 rounded-xl bg-paper p-4">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" aria-hidden />
              <span className="text-sm leading-relaxed text-ink">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Curriculum */}
      <Section tone="paper">
        <SectionHeading eyebrow="Curriculum" title="Module by module." />
        <ol className="mt-8 space-y-3">
          {course.curriculum.map((mod) => (
            <li key={mod.module} className="rounded-2xl border border-line bg-white p-5">
              <h3 className="font-sans text-base font-semibold text-ink">{mod.module}</h3>
              <ul className="mt-2.5 grid gap-1.5 sm:grid-cols-2">
                {mod.topics.map((topic) => (
                  <li key={topic} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-green-600" aria-hidden />
                    {topic}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>


      {/* Included + pricing */}
      <Section tone="white">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-6 md:p-7">
            <h2 className="h3">What’s included</h2>
            <ul className="mt-4 space-y-2.5">
              {course.includes.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-ink">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-sparkle-400/25 bg-white/[0.02] p-6 text-center">
            <p className="mono-label text-sparkle-300">Price</p>
            <p className="num mt-4 text-[1.75rem] leading-none text-sparkle-300 md:text-[2.1rem]">{course.price}</p>
            <p className="mt-4 text-sm text-muted">Payment via {paymentMethods.join(' · ')}</p>
            <Button
              href={enrollLink}
              size="lg"
              className="mt-6 w-full"
              goo="var(--color-sparkle-300)"
              gooScale
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              {course.status === 'waitlist' ? 'Join the waitlist' : 'Enroll via WhatsApp'}
            </Button>
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section tone="paper">
        <SectionHeading eyebrow="Students" title="What past students said." />
        <div className="mt-8">
          <Testimonials
            items={course.testimonials}
            emptyMessage="This course has not run long enough to have testimonials worth publishing. When it does, they will appear here with real names attached."
          />
        </div>
      </Section>

      <PhilosophyStrip />

      {/* FAQ */}
      <Section tone="white" tight>
        <SectionHeading eyebrow="Questions" title="About this course." />
        <div className="mt-6 max-w-2xl">
          <Faq items={course.faq} />
        </div>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
    </>
  );
}
