import { AlertTriangle } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { formatDate } from '@/lib/format';

/**
 * Shared shell for the legal pages.
 *
 * The review banner is deliberate and should stay visible until a Pakistani
 * lawyer has reviewed the text. The master plan budgets an hour of a lawyer's
 * time for exactly this — these drafts are a starting point for that review,
 * not a substitute for it. Remove the banner by passing `reviewed`.
 */
export function LegalPage({
  title,
  updated,
  reviewed,
  children,
}: {
  title: string;
  updated: string;
  reviewed?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="bg-green-950 text-white">
        <div className="container-page py-14 md:py-20">
          <p className="eyebrow text-sparkle-400">Legal</p>
          <h1 className="h1 mt-4">{title}</h1>
          <p className="mt-4 text-sm text-green-200">
            Last updated <time dateTime={updated}>{formatDate(updated)}</time>
          </p>
        </div>
      </section>

      <Section tone="paper">
        <div className="mx-auto max-w-3xl">
          {!reviewed && (
            <div className="mb-10 flex gap-3 rounded-2xl border-l-4 border-warning bg-sparkle-100 p-5">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-warning" aria-hidden />
              <p className="text-sm leading-relaxed text-ink">
                <strong>Internal note, remove before launch.</strong> This is a working draft
                written to cover the right ground, not legal advice. Have a Pakistani lawyer review
                and adapt it to your actual operations before the site goes live, then set{' '}
                <code className="rounded bg-white px-1.5 py-0.5 text-xs">reviewed</code> on this
                page to hide this banner.
              </p>
            </div>
          )}

          <div className="prose-article">{children}</div>
        </div>
      </Section>
    </>
  );
}
