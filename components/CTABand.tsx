import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { ScrollReveal } from './ScrollReveal';
import { whatsappLink, whatsappMessages } from '@/content/whatsapp';

export function CTABand({
  title = 'Ready to invest with clarity?',
  lede = 'Start with the free material. Book a call when you want a plan built around your situation.',
}: {
  title?: string;
  lede?: string;
}) {
  return (
    <section className="hero-gradient relative overflow-hidden border-t border-line">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sparkle-400/30 to-transparent" />
        <div className="rotate-slow absolute right-[16%] top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border border-white/[0.04]" />
        <div className="float absolute left-[12%] top-[24%] h-1.5 w-1.5 rounded-full bg-sparkle-400/30" />
      </div>

      <div className="container-page relative py-16 text-center md:py-24">
        <ScrollReveal>
          <span className="mono-label text-sparkle-300">Next step</span>
          <h2 className="h2 mt-4">{title}</h2>
          <p className="lede mx-auto mt-4 max-w-2xl">{lede}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/learn" size="lg" goo="var(--color-sparkle-300)" gooScale>
              Start learning <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button
              href={whatsappLink(whatsappMessages.exploreAdvisory)}
              variant="secondary"
              size="lg"
            >
              <MessageCircle className="h-4 w-4" aria-hidden /> Book advisory call
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
