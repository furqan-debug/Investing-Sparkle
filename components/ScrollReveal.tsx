'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

type Animation = 'fade-up' | 'fade-in' | 'scale-in';

const animClass: Record<Animation, string> = {
  'fade-up': 'animate-fade-up',
  'fade-in': 'animate-fade-in',
  'scale-in': 'animate-scale-in',
};

export function ScrollReveal({
  children,
  animation = 'fade-up',
  delay,
  className,
}: {
  children: React.ReactNode;
  animation?: Animation;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        visible ? animClass[animation] : 'opacity-0',
        className
      )}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
