import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { whatsappLink, whatsappMessages } from '@/content/whatsapp';

/** Closing call to action, repeated at the foot of most pages. */
export function CTABand({
  title = 'Ready to invest with clarity?',
  lede = 'Start with the free material. Book a call when you want a plan built around your situation.',
}: {
  title?: string;
  lede?: string;
}) {
  return (
    <section className="bg-green-950 text-white">
      <div className="container-page py-16 text-center md:py-24">
        <h2 className="h2">{title}</h2>
        <p className="lede mx-auto mt-4 max-w-2xl text-green-100">{lede}</p>
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
      </div>
    </section>
  );
}
