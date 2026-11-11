import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { whatsappLink, whatsappMessages } from '@/content/whatsapp';

export default function NotFound() {
  return (
    <section className="hero-gradient relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sparkle-400/25 to-transparent" />
        <div className="rotate-slow absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]" />
      </div>

      <div className="container-page relative grid min-h-[60vh] place-items-center py-20 text-center md:py-28">
        <div className="max-w-lg">
          <p className="num text-6xl tracking-[-0.04em] text-sparkle-400 md:text-7xl">404</p>
          <h1 className="h2 mt-5">Looks like this page invested elsewhere.</h1>
          <p className="lede mt-3">
            The page you were after does not exist, or it moved. Here is where to go instead.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-2.5 sm:flex-row">
            <Button href="/" size="lg" goo="var(--color-sparkle-300)" gooScale>
              Back to home
            </Button>
            <Button href="/learn" variant="secondary" size="lg">
              Browse Learn
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted">
            Or{' '}
            <a
              href={whatsappLink(whatsappMessages.contact)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sparkle-300 underline decoration-sparkle-400/40 underline-offset-2 hover:text-sparkle-200"
            >
              message us on WhatsApp
            </a>{' '}
            and we will point you to the right place.
          </p>

          <p className="mt-6 text-xs text-low">
            If you got here from a link on this site,{' '}
            <Link href="/contact" className="text-sparkle-300 underline underline-offset-2">
              tell us
            </Link>
            . Broken links are our fault, not yours.
          </p>
        </div>
      </div>
    </section>
  );
}
