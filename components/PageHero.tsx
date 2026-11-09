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
    <section className={cn('hero-gradient relative overflow-hidden text-white', className)}>
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sparkle-400/[0.06]" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full border border-white/[0.04]" />
      </div>

      <div className="container-page relative py-10 md:py-14">
        {back && (
          <Link
            href={back.href}
            className="inline-flex items-center gap-1.5 text-sm text-green-200 transition-colors hover:text-sparkle-400"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> {back.label}
          </Link>
        )}

        <div
          className={cn(
            back ? 'mt-5' : undefined,
            aside ? 'grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start' : undefined
          )}
        >
          <div className={cn(!aside && 'max-w-3xl')}>
            {eyebrow && <p className="eyebrow text-sparkle-400">{eyebrow}</p>}
            <h1 className={cn('h1', eyebrow && 'mt-3')}>{title}</h1>
            {lede && <p className="lede mt-4 max-w-2xl text-green-100">{lede}</p>}
            {children && <div className="mt-6">{children}</div>}
          </div>

          {aside && <div>{aside}</div>}
        </div>
      </div>
    </section>
  );
}
