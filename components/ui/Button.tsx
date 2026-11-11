import Link from 'next/link';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'whatsapp';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary: 'btn--primary',
  secondary: 'btn--secondary',
  ghost: 'btn--ghost',
  // Kept for call-site compatibility. WhatsApp is no longer its own loud
  // green: it reads as a neutral secondary action and the brand mark supplies
  // the recognition instead.
  whatsapp: 'btn--secondary',
};

const sizes: Record<Size, string> = {
  sm: 'btn--sm',
  md: 'btn--md',
  lg: 'btn--lg',
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;

  /**
   * Gooey blob fill shown on hover, reserved for the one high-impact CTA in a
   * view. The blob swells from the bottom edge and floods the button with the
   * supplied colour. Disabled under prefers-reduced-motion.
   */
  goo?: string;

  /**
   * Label colour once the blob has arrived. The delayed transition lets the
   * blob land before the text changes colour against it.
   */
  gooTextHover?: string;

  /** Header-style: grow the whole button instead of only flooding it. */
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

  const classes = cn(
    'btn group',
    variants[variant],
    sizes[size],
    isGoo && 'relative isolate overflow-hidden',
    isGoo && gooScale && 'hover:scale-[1.02] active:scale-[0.98]',
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
          'relative z-10 inline-flex items-center justify-center gap-2 transition-colors duration-300',
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
