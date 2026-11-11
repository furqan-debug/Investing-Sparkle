import Image from 'next/image';
import Link from 'next/link';
import mark from '@/public/brand/investing-sparkle-mark.png';
import { cn } from '@/lib/cn';

/**
 * Brand lockup.
 *
 * The logo is a stacked square — mark above a two-line wordmark — which is far
 * too tall for a 64px header. So in horizontal contexts we pair the cropped
 * mark with the wordmark set in HTML: it stays crisp at any size, scales with
 * the type, and keeps the "INVESTING" green / "SPARKLE" gold split from the
 * original artwork.
 *
 * The full stacked lockup lives at public/brand/investing-sparkle-logo.png for
 * anywhere with vertical room (print, share images, email signatures).
 */

export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src={mark}
      alt=""
      aria-hidden
      priority
      className={cn('h-9 w-auto', className)}
      // The source is 581×548; Next handles the responsive srcset from the import.
    />
  );
}

export function Logo({
  href = '/',
  className,
  markClassName,
}: {
  href?: string | null;
  className?: string;
  markClassName?: string;
}) {
  const inner = (
    <>
      <LogoMark className={markClassName} />
      {/*
        Wordmark. Tracking and weight follow the artwork: "INVESTING" is heavy
        and tight, "SPARKLE" is lighter and widely letterspaced beneath it.
      */}
      <span className="flex flex-col leading-none">
        <span className="text-[1.15rem] font-bold uppercase tracking-[0.06em] text-green-300 md:text-[1.35rem]">
          INVESTING
        </span>
        <span className="mt-[3px] text-[0.62rem] font-semibold uppercase tracking-[0.36em] text-sparkle-400 md:text-[0.68rem]">
          SPARKLE
        </span>
      </span>
    </>
  );

  const classes = cn('flex items-center gap-2.5', className);

  if (href === null) {
    return <span className={classes}>{inner}</span>;
  }

  return (
    <Link href={href} className={classes} aria-label="Investing Sparkle, home">
      {inner}
    </Link>
  );
}
