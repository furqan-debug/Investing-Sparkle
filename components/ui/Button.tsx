import Link from 'next/link';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'whatsapp';
type Size = 'md' | 'lg';

const base =
  'btn-liquid btn-shimmer inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-sm disabled:opacity-50 disabled:pointer-events-none text-center';

const variants: Record<Variant, string> = {
  primary: 'btn-liquid--primary bg-sparkle-500 text-green-950',
  secondary: 'btn-liquid--secondary bg-green-800 text-white',
  ghost: 'btn-liquid--ghost border border-current text-current',
  whatsapp: 'btn-liquid--whatsapp bg-[#25D366] text-green-950',
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
