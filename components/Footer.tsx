import Link from 'next/link';
import {
  ArrowRight,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  Mail,
  MessageCircle,
  MapPin,
  Radio,
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
  // Only render icons for profiles that actually exist — a dead social link is
  // listed in the plan as a trust anti-pattern.
  const socials = Object.entries(site.social).filter(([, url]) => Boolean(url)) as [
    keyof typeof site.social,
    string,
  ][];

  return (
    <footer className="bg-green-950 text-green-100">
      <div className="container-page py-10 md:py-14">
        <Link
          href="/live"
          className="group mb-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-sparkle-400/30 bg-white/[0.04] px-5 py-4 transition-colors hover:border-sparkle-400/60 hover:bg-white/[0.07]"
        >
          <span className="flex items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sparkle-400/15 text-sparkle-400">
              <Radio className="h-4 w-4" aria-hidden />
            </span>
            <span>
              <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-sparkle-400">
                {liveSession.eyebrow} · {liveSession.date}
              </span>
              <span className="mt-0.5 block font-display text-lg text-white">
                {liveSession.title}
              </span>
            </span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-sparkle-400">
            Session details
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </span>
        </Link>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 — brand */}
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed">{site.tagline}</p>

            {socials.length > 0 && (
              <div className="mt-5 flex gap-2">
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
                      className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition-colors hover:bg-sparkle-400 hover:text-green-950"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Columns 2–4 */}
          {footerNav.map((col) => (
            <div key={col.heading}>
              <h2 className="font-display text-base text-white">{col.heading}</h2>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className="text-sm transition-colors hover:text-sparkle-400">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-9 border-t border-white/10 pt-8">
          <Newsletter variant="dark" />
        </div>

        {/* Contact block */}
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-sm">
          <a
            href={whatsappLink(whatsappMessages.float)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-sparkle-400"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            WhatsApp {site.contact.whatsapp}
          </a>
          <a
            href={`mailto:${site.contact.email}`}
            className="flex items-center gap-2 transition-colors hover:text-sparkle-400"
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
        <p className="mt-6 max-w-4xl text-xs leading-relaxed text-green-200/80">
          {footerDisclaimer}
        </p>
      </div>

      {/* Legal row */}
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {legalNav.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-sparkle-400">
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-green-200/70">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
