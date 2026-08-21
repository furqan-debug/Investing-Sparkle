'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, MessageCircle } from 'lucide-react';
import { Logo } from './Logo';
import { mainNav } from '@/content/nav';
import { site } from '@/content/site';
import { whatsappLink, whatsappMessages } from '@/content/whatsapp';
import { cn } from '@/lib/cn';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.split('#')[0]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 text-white transition-all duration-300',
        scrolled
          ? 'bg-green-950/90 shadow-lg shadow-green-950/20 backdrop-blur-xl'
          : 'bg-green-950'
      )}
    >
      <div className="container-page">
        <div className="flex h-16 items-center justify-between gap-4 md:h-20">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {mainNav.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:bg-white/10',
                    isActive(item.href) && 'text-sparkle-400'
                  )}
                  aria-expanded={item.children ? openDropdown === item.label : undefined}
                >
                  {item.label}
                  {item.children && <ChevronDown className="h-3.5 w-3.5" aria-hidden />}
                </Link>

                {item.children && openDropdown === item.label && (
                  <div className="absolute left-0 top-full w-60 pt-2 animate-slide-down">
                    <ul className="overflow-hidden rounded-2xl border border-line bg-white py-2 text-ink shadow-lg">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block px-4 py-2.5 text-sm transition-colors hover:bg-green-50"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsappLink(whatsappMessages.float)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-sparkle-500 px-4 py-2.5 text-sm font-semibold text-green-950 transition-colors hover:bg-sparkle-600 md:inline-flex"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              <span className="hidden xl:inline">{site.contact.whatsapp}</span>
              <span className="xl:hidden">Chat with us</span>
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-lg hover:bg-white/10 lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="animate-fade-in fixed inset-x-0 bottom-0 top-16 z-50 overflow-y-auto bg-green-950/95 backdrop-blur-xl lg:hidden">
          <div className="container-page py-6">
            <a
              href={whatsappLink(whatsappMessages.float)}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-6 flex items-center justify-center gap-2 rounded-full bg-sparkle-500 px-5 py-3.5 font-semibold text-green-950"
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
              WhatsApp {site.contact.whatsapp}
            </a>

            <nav aria-label="Mobile">
              <ul className="divide-y divide-white/10">
                {mainNav.map((item) => (
                  <li key={item.label} className="py-1">
                    <Link
                      href={item.href}
                      className="block py-3 font-display text-2xl"
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <ul className="pb-3 pl-1">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block py-2 text-sm text-green-100"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
