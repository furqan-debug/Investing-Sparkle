import Link from 'next/link';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'whatsapp';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold disabled:opacity-50 disabled:pointer-events-none text-center';

const variants: Record<Variant, string> = {
  primary: 'bg-sparkle-500 text-green-950',
  secondary: 'bg-green-800 text-white',
  ghost: 'border border-current text-current',
  whatsapp: 'bg-[#25D366] text-green-950',
};

const sizes: Record<Size, string> = {
  md: 'px-[1.125rem] py-2.5 text-sm',
  lg: 'px-6 py-3 text-sm',
};

const liquidVariants: Record<Variant, string> = {
  primary: 'btn-liquid--primary',
  secondary: 'btn-liquid--secondary',
  ghost: 'btn-liquid--ghost',
  whatsapp: 'btn-liquid--whatsapp',
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;

  /**
   * Leonardo-style gooey blob fill shown on hover — one circle 150% of the
   * button's width, parked on the bottom edge at scale(0). On hover it
   * swells up from the bottom and floods the button with the fill colour.
   * Disabled under prefers-reduced-motion. Only set on the high-impact
   * CTAs; everything else keeps the simpler liquid-wave hover.
   */
  goo?: string;

  /**
   * Label colour once the blob has arrived. The delayed 700ms transition
   * lets the blob arrive before the text changes colour against it.
   */
  gooTextHover?: string;

  /** Header-style: grow the whole button (scale-105 / -95). Cards use blob-only. */
  gooScale?: boolean;
};

export function Button({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className,
  external,
  goo,
  gooTextHover,
  gooScale = false,
}: Props) {
  const isGoo = Boolean(goo);

  const motion = isGoo
    ? gooScale
      ? 'transition-transform duration-200 hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-sm'
      : 'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-sm'
    : 'btn-liquid btn-shimmer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-sm';

  const classes = cn(
    base,
    motion,
    isGoo ? 'group relative isolate overflow-hidden' : liquidVariants[variant],
    variants[variant],
    sizes[size],
    className
  );

  const isExternal = external ?? /^https?:\/\//.test(href);

  const content = isGoo ? (
    <>
      <span
        aria-hidden
        className="goo-fill"
        style={{ '--goo': goo, '--goo-text': gooTextHover } as React.CSSProperties}
      >
        <i />
        <i />
        <i />
      </span>
      <span
        className={cn(
          'goo-label relative z-10 inline-flex items-center justify-center gap-2 transition-colors duration-300',
          gooTextHover && 'delay-700 group-hover:text-[var(--goo-text)]'
        )}
      >
        {children}
      </span>
    </>
  ) : (
    children
  );

  if (isExternal) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
