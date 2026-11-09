'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, MessageCircle } from 'lucide-react';
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

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.split('#')[0]);

  return (
    <header
      ref={headerRef}
      className={cn(
        'sticky top-0 z-50 text-white transition-all duration-300',
        scrolled
          ? 'bg-green-950/90 shadow-lg shadow-green-950/20 backdrop-blur-xl'
          : 'bg-green-950'
      )}
    >
      <div className="container-page">
        <div className="flex h-14 items-center justify-between gap-4 md:h-16">
          <Logo markClassName="h-8" />

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
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
                    'flex items-center gap-1 rounded-full px-3 py-2 text-[13px] font-medium transition-colors hover:bg-white/10',
                    isActive(item.href) && 'text-sparkle-400'
                  )}
                  aria-expanded={item.children ? openDropdown === item.label : undefined}
                >
                  {item.label}
                  {item.children && <ChevronDown className="h-3.5 w-3.5" aria-hidden />}
                </Link>

                {item.children && openDropdown === item.label && (
                  <div className="absolute left-0 top-full w-56 pt-2 animate-slide-down">
                    <ul className="overflow-hidden rounded-xl border border-line bg-white py-1.5 text-ink shadow-lg">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block px-4 py-2 text-[13px] transition-colors hover:bg-green-50"
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
              size="md"
              variant="primary"
              className="hidden md:inline-flex"
              goo="var(--color-sparkle-700)"
              gooScale
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              <span className="hidden xl:inline">{site.contact.whatsapp}</span>
              <span className="xl:hidden">Chat with us</span>
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
              className="grid h-9 w-9 place-items-center rounded-lg hover:bg-white/10 lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div
          className="animate-fade-in fixed inset-x-0 bottom-0 z-50 overflow-y-auto overscroll-contain bg-green-950/95 pb-10 backdrop-blur-xl lg:hidden"
          style={{ top: menuTop }}
        >
          <div className="container-page py-5">
            <a
              href={whatsappLink(whatsappMessages.float)}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-5 flex items-center justify-center gap-2 rounded-full bg-sparkle-500 px-5 py-3 text-sm font-semibold text-green-950"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              WhatsApp {site.contact.whatsapp}
            </a>

            <nav aria-label="Mobile">
              <ul className="divide-y divide-white/10">
                {mainNav.map((item) => (
                  <li key={item.label} className="py-0.5">
                    <Link
                      href={item.href}
                      className="block py-2.5 font-display text-xl"
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <ul className="pb-2.5 pl-1">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block py-1.5 text-sm text-green-100"
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
