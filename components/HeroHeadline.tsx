'use client';

import { useEffect, useState } from 'react';

export function HeroHeadline() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(true);
      return;
    }
    const t = setTimeout(() => setRevealed(true), 550);
    return () => clearTimeout(t);
  }, []);

  return (
    <h1 className="hero-title mt-6">
      Learn to invest in Pakistan with confidence,{' '}
      <span
        className="accent-serif inline-block transition-all duration-700 ease-out"
        style={{
          opacity: revealed ? 1 : 0,
          translate: revealed ? 'none' : '0 0.25em',
        }}
      >
        not guesswork.
      </span>
    </h1>
  );
}
