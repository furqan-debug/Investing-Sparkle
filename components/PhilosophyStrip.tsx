import { ShieldCheck } from 'lucide-react';
import { philosophy } from '@/content/site';
import { ScrollReveal } from './ScrollReveal';

export function PhilosophyStrip() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="float-slow absolute right-[10%] top-[20%] h-2 w-2 rounded-full bg-sparkle-400/20" />
        <div className="float absolute left-[15%] bottom-[25%] h-1.5 w-1.5 rounded-full bg-sparkle-300/15" />
        <div className="rotate-slow absolute left-[50%] top-[50%] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.03]" />
      </div>

      <div className="container-page relative py-14 md:py-20">
        <ScrollReveal>
          <div className="mx-auto max-w-4xl text-center">
            <ShieldCheck className="mx-auto h-9 w-9 text-sparkle-400 drop-shadow-[0_0_12px_rgba(196,152,32,0.3)]" aria-hidden />
            <p className="mt-5 font-display text-3xl leading-tight tracking-wide md:text-5xl">
              {philosophy.headline}
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-green-100">{philosophy.subline}</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
