import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check, MessageCircle } from 'lucide-react';

import { Section, SectionHeading } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
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
      <section className="bg-green-950 text-white">
        <div className="container-page py-14 md:py-20">
          <Link
            href="/learn/courses"
            className="inline-flex items-center gap-1.5 text-sm text-green-200 hover:text-sparkle-400"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> All courses
          </Link>

          <div className="mt-6 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-sparkle-400 px-3 py-1 font-semibold text-green-950">
              {course.level}
            </span>
            {course.status === 'waitlist' && (
              <span className="rounded-full border border-white/25 px-3 py-1 font-semibold">
                Waitlist open
              </span>
            )}
          </div>

          <h1 className="h1 mt-5 max-w-4xl">{course.title}</h1>
          <p className="lede mt-5 max-w-2xl text-green-100">{course.outcome}</p>

          <dl className="mt-9 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
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

          <div className="mt-9">
            <Button href={enrollLink} size="lg" variant="whatsapp">
              <MessageCircle className="h-4 w-4" aria-hidden />
              {course.status === 'waitlist' ? 'Join the waitlist' : 'Enroll via WhatsApp'}
            </Button>
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <Section tone="paper">
        <SectionHeading eyebrow="Who this is for" title="You will get the most from this if:" />
        <ul className="mt-9 grid gap-4 md:grid-cols-2">
          {course.forWhom.map((item) => (
            <li key={item} className="flex gap-3 rounded-2xl border border-line bg-white p-5">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-600" aria-hidden />
              <span className="text-sm leading-relaxed text-ink">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* What you'll learn */}
      <Section tone="white">
        <SectionHeading eyebrow="Outcomes" title="What you will be able to do." />
        <ul className="mt-9 grid gap-4 md:grid-cols-2">
          {course.learn.map((item) => (
            <li key={item} className="flex gap-3 rounded-2xl bg-paper p-5">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-600" aria-hidden />
              <span className="text-sm leading-relaxed text-ink">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Curriculum */}
      <Section tone="paper">
        <SectionHeading eyebrow="Curriculum" title="Module by module." />
        <ol className="mt-9 space-y-4">
          {course.curriculum.map((mod) => (
            <li key={mod.module} className="rounded-2xl border border-line bg-white p-6">
              <h3 className="font-sans text-lg font-semibold text-ink">{mod.module}</h3>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
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
      <Section tone="paper">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-line bg-white p-7 md:p-8">
            <h2 className="h3">What’s included</h2>
            <ul className="mt-5 space-y-3">
              {course.includes.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border-2 border-green-800 bg-white p-7 text-center md:p-8">
            <p className="eyebrow text-green-600">Price</p>
            <p className="mt-4 font-display text-4xl text-green-800 md:text-5xl">{course.price}</p>
            <p className="mt-5 text-sm text-muted">Payment via {paymentMethods.join(' · ')}</p>
            <Button href={enrollLink} size="lg" variant="whatsapp" className="mt-7 w-full">
              <MessageCircle className="h-4 w-4" aria-hidden />
              {course.status === 'waitlist' ? 'Join the waitlist' : 'Enroll via WhatsApp'}
            </Button>
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section tone="white">
        <SectionHeading eyebrow="Students" title="What past students said." />
        <div className="mt-10">
          <Testimonials
            items={course.testimonials}
            emptyMessage="This course has not run long enough to have testimonials worth publishing. When it does, they will appear here with real names attached."
          />
        </div>
      </Section>

      <PhilosophyStrip />

      {/* FAQ */}
      <Section tone="paper">
        <SectionHeading eyebrow="Questions" title="About this course." />
        <div className="mt-8 max-w-3xl">
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
