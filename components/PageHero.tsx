import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * Shared page header.
 *
 * Every inner page uses this so the type scale, vertical rhythm, and content
 * width stay identical from page to page. `aside` renders a right-hand panel
 * (pricing, key facts); `children` renders extra content beneath the lede.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  back,
  aside,
  children,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  back?: { href: string; label: string };
  aside?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        'relative overflow-hidden border-b border-line bg-white/[0.012]',
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(60%_90%_at_18%_-20%,rgba(6,113,78,0.24),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      <div className="container-page relative py-14 md:py-20">
        {back && (
          <Link
            href={back.href}
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-sparkle-300"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> {back.label}
          </Link>
        )}

        <div
          className={cn(
            back ? 'mt-6' : undefined,
            aside ? 'grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-start' : undefined
          )}
        >
          <div className={cn(!aside && 'max-w-3xl')}>
            {eyebrow && <p className="eyebrow text-sparkle-400">{eyebrow}</p>}
            <h1 className={cn('h1', eyebrow && 'mt-4')}>{title}</h1>
            {lede && <p className="lede mt-5 max-w-2xl">{lede}</p>}
            {children && <div className="mt-7">{children}</div>}
          </div>

          {aside && <div>{aside}</div>}
        </div>
      </div>
    </section>
  );
}
