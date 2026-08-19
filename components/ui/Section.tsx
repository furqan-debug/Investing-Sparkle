import { cn } from '@/lib/cn';

type Tone = 'paper' | 'white' | 'green' | 'greenDeep' | 'sparkle';

const tones: Record<Tone, string> = {
  paper: 'bg-paper text-ink',
  white: 'bg-white text-ink',
  green: 'bg-green-800 text-white',
  greenDeep: 'bg-green-950 text-white',
  sparkle: 'bg-sparkle-100 text-ink',
};

export function Section({
  children,
  tone = 'paper',
  className,
  id,
  tight,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
  tight?: boolean;
}) {
  return (
    <section id={id} className={cn(tones[tone], tight ? 'py-12' : 'py-16 md:py-24', className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}

/** Standard section heading block: eyebrow, headline, optional supporting line. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'left',
  invert,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: 'left' | 'center';
  invert?: boolean;
}) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center')}>
      {eyebrow && (
        <p className={cn('eyebrow mb-3', invert ? 'text-sparkle-400' : 'text-green-600')}>
          {eyebrow}
        </p>
      )}
      <h2 className="h2">{title}</h2>
      {lede && (
        <p className={cn('lede mt-4', invert ? 'text-green-100' : 'text-muted')}>{lede}</p>
      )}
    </div>
  );
}
