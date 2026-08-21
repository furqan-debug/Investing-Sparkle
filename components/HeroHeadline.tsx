'use client';

import { useEffect, useState } from 'react';

export function HeroHeadline() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(true);
      return;
    }
    const t = setTimeout(() => setRevealed(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <h1 className="h1 mt-5 animate-fade-up">
      Learn to invest in Pakistan with confidence,{' '}
      <span
        className="text-underline-reveal inline-block text-sparkle-400 transition-all duration-700"
        style={{
          opacity: revealed ? 1 : 0,
          translate: revealed ? 'none' : '0 0.3em',
          filter: revealed ? 'none' : 'blur(4px)',
        }}
      >
        not guesswork.
      </span>
    </h1>
  );
}
