import { ShieldCheck } from 'lucide-react';
import { philosophy } from '@/content/site';

/**
 * The trust anchor band. The master plan calls this non-negotiable: it appears
 * in some form on every page, and it is the one message that should survive
 * every future redesign.
 */
export function PhilosophyStrip() {
  return (
    <section className="bg-green-800 text-white">
      <div className="container-page py-14 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <ShieldCheck className="mx-auto h-9 w-9 text-sparkle-400" aria-hidden />
          <p className="mt-5 font-display text-3xl leading-tight tracking-wide md:text-5xl">
            {philosophy.headline}
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-green-100">{philosophy.subline}</p>
        </div>
      </div>
    </section>
  );
}
