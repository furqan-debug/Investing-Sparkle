import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

import { PageHero } from '@/components/PageHero';
import { Section, SectionHeading } from '@/components/ui/Section';
import { ToolGate } from '@/components/auth/ToolGate';
import { CTABand } from '@/components/CTABand';
import { SourceNote } from './ToolUI';
import { getCategory, getTool } from '@/content/tools';
import { TAX_YEAR, VERIFIED_ON } from '@/content/tax-rates';
import { formatDate } from '@/lib/format';
import type { ToolPageContent } from '@/content/tool-pages';

/**
 * Shared page frame for a calculator.
 *
 * The page files stay thin: they export metadata and pass the matching tool
 * component as children. Everything else, including the category back link,
 * the gate, the method section and the sources, lives here.
 */
export function ToolPage({
  content,
  children,
  structuredData,
}: {
  content: ToolPageContent;
  children: ReactNode;
  structuredData?: Record<string, unknown>;
}) {
  const category = getCategory(content.category);
  const related = content.related.map((slug) => getTool(slug)).filter(Boolean);

  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}

      <PageHero
        back={{ href: `/learn/tools/category/${category?.slug ?? 'tax-zakat'}`, label: category?.name ?? 'All free tools' }}
        eyebrow={`${category?.name ?? 'Free tool'} · Free tool`}
        title={content.title}
        lede={content.lede}
      >
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
          {category?.slug === 'tax-zakat' && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.02] px-2.5 py-1">
              <Check className="h-3 w-3 text-green-400" aria-hidden /> Tax year {TAX_YEAR}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.02] px-2.5 py-1">
            Verified {formatDate(VERIFIED_ON)}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.02] px-2.5 py-1">
            Google sign-in
          </span>
        </div>
      </PageHero>

      <Section tone="paper">
        <ToolGate>{children}</ToolGate>
      </Section>

      <Section tone="white">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="How this is calculated" title={content.howTitle} />
          <p className="lede mt-4">{content.howBody}</p>

          <div className="prose-article mt-7">
            {content.sections.map((section) => (
              <div key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-8">
            <SourceNote
              sources={content.sources}
              extra={content.sourceExtra}
              title={content.sourceTitle}
              intro={content.sourceIntro}
            />
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="paper" tight>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <SectionHeading eyebrow="Keep going" title="The next number to check." />
            <Link
              href={`/learn/tools/category/${category?.slug ?? 'tax-zakat'}`}
              className="link-hover text-sm font-medium text-green-300"
            >
              All {category?.name ?? 'tools'}
            </Link>
          </div>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((tool) =>
              tool ? (
                <li key={tool.slug}>
                  {tool.status === 'live' ? (
                    <Link
                      href={`/learn/tools/${tool.slug}`}
                      className="card flex h-full flex-col p-5"
                    >
                      <span className="font-sans text-sm font-semibold text-ink">{tool.name}</span>
                      <span className="mt-2 flex-1 text-xs leading-relaxed text-muted">
                        {tool.blurb}
                      </span>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-sparkle-300">
                        Open tool <ArrowRight className="h-3 w-3" aria-hidden />
                      </span>
                    </Link>
                  ) : (
                    <div className="card flex h-full flex-col p-5 opacity-70">
                      <span className="font-sans text-sm font-semibold text-ink">{tool.name}</span>
                      <span className="mt-2 flex-1 text-xs leading-relaxed text-muted">
                        {tool.blurb}
                      </span>
                      <span className="mono-label mt-4 text-[10px] text-sparkle-300">
                        Coming soon
                      </span>
                    </div>
                  )}
                </li>
              ) : null
            )}
          </ul>
        </Section>
      )}

      <CTABand />
    </>
  );
}
