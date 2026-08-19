import Link from 'next/link';
import { Linkedin, Instagram, Facebook, Youtube, Mail, MessageCircle, MapPin } from 'lucide-react';
import { site, footerDisclaimer } from '@/content/site';
import { footerNav, legalNav } from '@/content/nav';
import { whatsappLink, whatsappMessages } from '@/content/whatsapp';
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
      <div className="container-page py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 — brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-sparkle-400 font-display text-xl text-green-950">
                IS
              </span>
              <span className="font-display text-xl leading-none tracking-wide text-white">
                Investing<span className="text-sparkle-400"> Sparkle</span>
              </span>
            </Link>
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
              <h2 className="font-display text-lg tracking-wide text-white">{col.heading}</h2>
              <ul className="mt-4 space-y-2.5">
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
        <div className="mt-12 border-t border-white/10 pt-10">
          <Newsletter variant="dark" />
        </div>

        {/* Contact block */}
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-8 text-sm">
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
            href={`mailto:${site.contact.emailGeneral}`}
            className="flex items-center gap-2 transition-colors hover:text-sparkle-400"
          >
            <Mail className="h-4 w-4" aria-hidden />
            {site.contact.emailGeneral}
          </a>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4" aria-hidden />
            {site.contact.address}
          </span>
        </div>

        {/* Disclaimer */}
        <p className="mt-8 max-w-4xl text-xs leading-relaxed text-green-200/80">
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
