import { ShieldCheck } from 'lucide-react';
import { philosophy } from '@/content/site';
import { ScrollReveal } from './ScrollReveal';

export function PhilosophyStrip() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-green-950">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_-10%,rgba(6,113,78,0.35),transparent_70%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sparkle-400/30 to-transparent" />
        <div className="rotate-slow absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]" />
      </div>

      <div className="container-page relative py-16 text-center md:py-24">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl">
            <span className="mono-label text-sparkle-300">Our position</span>
            <ShieldCheck
              className="mx-auto mt-7 h-8 w-8 text-sparkle-400 drop-shadow-[0_0_16px_rgba(235,206,134,0.25)]"
              aria-hidden
            />
            <p className="mx-auto mt-6 max-w-3xl font-display text-[clamp(1.5rem,3vw,2.5rem)] font-semibold leading-[1.12] tracking-[-0.03em]">
              {philosophy.headline}
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
              {philosophy.subline}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
