import Link from 'next/link';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'whatsapp';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none text-center';

const variants: Record<Variant, string> = {
  // The logo's gold is the action colour throughout — it should mean "this is the
  // thing to click". Hover lightens rather than darkens, which suits the brand.
  primary: 'bg-sparkle-500 text-green-950 hover:bg-sparkle-400',
  secondary: 'bg-green-800 text-white hover:bg-green-700',
  ghost: 'border-2 border-current text-current hover:bg-current/10',
  whatsapp: 'bg-[#25D366] text-green-950 hover:bg-[#1eb857]',
};

const sizes: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** WhatsApp and other off-site links open in a new tab. */
  external?: boolean;
};

export function Button({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className,
  external,
}: Props) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const isExternal = external ?? /^https?:\/\//.test(href);

  if (isExternal) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
