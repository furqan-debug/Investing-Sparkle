'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, MessageCircle, X } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from './ui/Button';
import { mainNav } from '@/content/nav';
import { site } from '@/content/site';
import { whatsappLink, whatsappMessages } from '@/content/whatsapp';
import { cn } from '@/lib/cn';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [menuTop, setMenuTop] = useState(56);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const update = () => {
      const bottom = headerRef.current?.getBoundingClientRect().bottom;
      if (bottom) setMenuTop(bottom);
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update);
    };
  }, [open]);

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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.split('#')[0]);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          'sticky top-0 z-50 border-b transition-all duration-300',
          scrolled
            ? 'border-line bg-paper/85 backdrop-blur-xl'
            : 'border-transparent bg-paper/60 backdrop-blur-md'
        )}
      >
        <div className="container-page">
          <div className="flex h-14 items-center justify-between gap-4 md:h-16">
            <Logo markClassName="h-7 md:h-8" />

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
                      'flex items-center gap-1 rounded-full px-3.5 py-2 text-[13px] font-medium text-muted transition-colors hover:bg-white/[0.05] hover:text-ink',
                      isActive(item.href) && 'text-sparkle-400'
                    )}
                    aria-expanded={item.children ? openDropdown === item.label : undefined}
                  >
                    {item.label}
                    {item.children && <ChevronDown className="h-3.5 w-3.5 opacity-60" aria-hidden />}
                  </Link>

                  {item.children && openDropdown === item.label && (
                    <div className="absolute left-0 top-full w-60 animate-slide-down pt-2">
                      <ul className="overflow-hidden rounded-2xl border border-line bg-[#0a110d] py-1.5 shadow-lg">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block px-4 py-2.5 text-[13px] text-muted transition-colors hover:bg-white/[0.05] hover:text-ink"
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
              <Button
                href={whatsappLink(whatsappMessages.float)}
                external
                size="sm"
                variant="secondary"
                className="hidden md:inline-flex"
              >
                <MessageCircle className="h-4 w-4 text-green-400" aria-hidden />
                <span className="hidden xl:inline">{site.contact.whatsapp}</span>
                <span className="xl:hidden">WhatsApp</span>
              </Button>

              <button
                type="button"
                onClick={() => {
                  if (!open) {
                    const bottom = headerRef.current?.getBoundingClientRect().bottom;
                    if (bottom) setMenuTop(bottom);
                  }
                  setOpen((v) => !v);
                }}
                className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-white/20 hover:text-ink lg:hidden"
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                aria-controls="mobile-menu"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/*
        Rendered outside <header> on purpose: the header uses backdrop-filter,
        which makes it a containing block for fixed children and would collapse
        this panel.
      */}
      {open && (
        <div
          id="mobile-menu"
          className="animate-fade-in fixed inset-x-0 bottom-0 z-[60] overflow-y-auto overscroll-contain border-t border-line bg-[#040705]/98 pb-10 backdrop-blur-2xl lg:hidden"
          style={{ top: menuTop }}
        >
          <div className="container-page py-6">
            <a
              href={whatsappLink(whatsappMessages.float)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary btn--md mb-7 w-full"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              WhatsApp {site.contact.whatsapp}
            </a>

            <nav aria-label="Mobile">
              <ul>
                {mainNav.map((item) => (
                  <li key={item.label} className="border-b border-line">
                    <Link
                      href={item.href}
                      className="flex items-baseline justify-between py-4 font-display text-2xl font-semibold tracking-[-0.03em]"
                    >
                      {item.label}
                      <span className="mono-label text-sparkle-400">
                        {String(mainNav.indexOf(item) + 1).padStart(2, '0')}
                      </span>
                    </Link>
                    {item.children && (
                      <ul className="pb-3 pl-1">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block py-2 text-sm text-muted transition-colors hover:text-ink"
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

            <p className="mt-7 text-sm text-muted">
              {site.contact.email}
              <span className="mx-2 text-white/20">/</span>
              {site.location}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
