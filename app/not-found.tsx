import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { whatsappLink, whatsappMessages } from '@/content/whatsapp';

export default function NotFound() {
  return (
    <section className="bg-green-950 text-white">
      <div className="container-page grid min-h-[60vh] place-items-center py-20 text-center">
        <div className="max-w-lg">
          <p className="font-display text-7xl text-sparkle-400 md:text-8xl">404</p>
          <h1 className="h2 mt-4">Looks like this page invested elsewhere.</h1>
          <p className="lede mt-4 text-green-100">
            The page you were after does not exist, or it moved. Here is where to go instead.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/" size="lg">
              Back to home
            </Button>
            <Button href="/learn" variant="ghost" size="lg" className="text-white">
              Browse Learn
            </Button>
          </div>

          <p className="mt-6 text-sm text-green-200">
            Or{' '}
            <a
              href={whatsappLink(whatsappMessages.contact)}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-sparkle-400"
            >
              message us on WhatsApp
            </a>{' '}
            and we will point you to the right place.
          </p>

          <p className="mt-8 text-xs text-green-300">
            If you got here from a link on this site,{' '}
            <Link href="/contact" className="underline underline-offset-2">
              tell us
            </Link>{' '}
            — broken links are our fault, not yours.
          </p>
        </div>
      </div>
    </section>
  );
}
