import Link from 'next/link';
import {
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Youtube,
} from 'lucide-react';
import { Logo } from './Logo';
import { site, footerDisclaimer } from '@/content/site';
import { footerNav, legalNav } from '@/content/nav';
import { whatsappLink, whatsappMessages } from '@/content/whatsapp';
import { liveSession } from '@/content/live-session';
import { Newsletter } from './Newsletter';

const socialIcons = {
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
} as const;

export function Footer() {
  // Only render icons for profiles that actually exist, a dead social link is
  // listed in the plan as a trust anti-pattern.
  const socials = Object.entries(site.social).filter(([, url]) => Boolean(url)) as [
    keyof typeof site.social,
    string,
  ][];

  return (
    <footer className="relative overflow-hidden border-t border-line bg-[#030604]">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_10%_0%,rgba(6,113,78,0.16),transparent_65%)]" />
      </div>

      <div className="container-page relative py-14 md:py-20">
        <Link
          href="/live"
          className="group mb-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-sparkle-400/25 bg-sparkle-400/[0.045] px-5 py-4 transition-colors hover:border-sparkle-400/45 hover:bg-sparkle-400/[0.07]"
        >
          <span className="flex items-center gap-3.5">
            <span className="signal-dot" aria-hidden />
            <span>
              <span className="mono-label block text-sparkle-300">
                {liveSession.eyebrow} / {liveSession.date}
              </span>
              <span className="mt-1.5 block font-display text-lg font-semibold tracking-[-0.02em] text-ink">
                {liveSession.title}
              </span>
            </span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-sparkle-300">
            Session details
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </span>
        </Link>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1, brand */}
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">{site.tagline}</p>

            {socials.length > 0 && (
              <div className="mt-6 flex gap-2">
                {socials.map(([key, url]) => {
                  const Icon = socialIcons[key as keyof typeof socialIcons];
                  if (!Icon) return null;
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={key}
                      className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-sparkle-400/40 hover:text-sparkle-300"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Columns 2 to 4 */}
          {footerNav.map((col) => (
            <div key={col.heading}>
              <h2 className="mono-label">{col.heading}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-sparkle-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 border-t border-line pt-10">
          <Newsletter variant="dark" />
        </div>

        {/* Contact block */}
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-7 text-sm text-muted">
          <a
            href={whatsappLink(whatsappMessages.float)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-sparkle-300"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            WhatsApp {site.contact.whatsapp}
          </a>
          <a
            href={`mailto:${site.contact.email}`}
            className="flex items-center gap-2 transition-colors hover:text-sparkle-300"
          >
            <Mail className="h-4 w-4" aria-hidden />
            {site.contact.email}
          </a>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4" aria-hidden />
            {site.contact.address}
          </span>
        </div>

        {/* Disclaimer */}
        <p className="mt-7 max-w-4xl text-xs leading-relaxed text-low/90">{footerDisclaimer}</p>
      </div>

      {/* Legal row */}
      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-3 py-5 text-xs text-low sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-sparkle-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
