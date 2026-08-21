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
    <section className="hero-gradient relative overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="float absolute right-[12%] top-[25%] h-2 w-2 rounded-full bg-sparkle-400/20" />
        <div className="float-reverse absolute left-[8%] bottom-[30%] h-1.5 w-1.5 rounded-full bg-green-400/15" />
        <div className="rotate-slow absolute right-[20%] bottom-[10%] h-32 w-32 rounded-full border border-white/[0.03]" />
      </div>

      <div className="container-page relative py-16 text-center md:py-24">
        <ScrollReveal>
          <h2 className="h2">{title}</h2>
          <p className="lede mx-auto mt-4 max-w-2xl text-green-200">{lede}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/learn" size="lg">
              Start Learning <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button
              href={whatsappLink(whatsappMessages.exploreAdvisory)}
              variant="ghost"
              size="lg"
              className="text-white"
            >
              <MessageCircle className="h-4 w-4" aria-hidden /> Book Advisory Call
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
