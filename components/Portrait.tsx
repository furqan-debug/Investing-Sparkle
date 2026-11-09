/**
 * Illustrated portraits for the "What students say" section.
 *
 * These are hand-drawn flat vector portraits, NOT photographs, and not
 * depictions of any real person. They exist so the section reads as
 * considered and human while nothing about them pretends to be identity
 * verification.
 *
 * Once a student gives explicit permission to publish a real photo, drop it
 * in /public/testimonials/<slug>.jpg and set `photo` on the matching entry
 * in content/testimonials.ts — the component prefers `photo` over `portrait`,
 * so no other change is needed.
 */
import type { Testimonial } from '@/content/testimonials';

type Config = {
  skin: string;
  skinShade: string;
  hair: string;
  hairStyle: 'bun' | 'short' | 'hijab' | 'waves' | 'crew';
  clothing: 'kurta' | 'vest' | 'coat' | 'tee' | 'shalwar';
  clothingColor: string;
  dupatta: string;
  accessory: 'glasses' | 'earring' | 'none';
};

const skinTones = ['#8d5524', '#a9714b', '#c68642', '#e0ac69'] as const;

const portraits: Record<string, Config> = {
  'Ayesha R.': {
    skin: skinTones[2],
    skinShade: '#9c6a34',
    hair: '#241811',
    hairStyle: 'bun',
    clothing: 'shalwar',
    clothingColor: '#e8e6df',
    dupatta: '#0f766e',
    accessory: 'earring',
  },
  'Usman K.': {
    skin: skinTones[1],
    skinShade: '#7d5434',
    hair: '#1b140f',
    hairStyle: 'short',
    clothing: 'vest',
    clothingColor: '#d6c5a3',
    dupatta: '#243b53',
    accessory: 'none',
  },
  'Fatima S.': {
    skin: skinTones[0],
    skinShade: '#5f3a18',
    hair: '#1b140f',
    hairStyle: 'hijab',
    clothing: 'coat',
    clothingColor: '#f5f5f0',
    dupatta: '#0f766e',
    accessory: 'none',
  },
  'Hassan M.': {
    skin: skinTones[3],
    skinShade: '#b9803f',
    hair: '#100c09',
    hairStyle: 'short',
    clothing: 'kurta',
    clothingColor: '#243b53',
    dupatta: '#243b53',
    accessory: 'glasses',
  },
  'Sana A.': {
    skin: skinTones[3],
    skinShade: '#b9803f',
    hair: '#241811',
    hairStyle: 'bun',
    clothing: 'shalwar',
    clothingColor: '#c49820',
    dupatta: '#7c2d12',
    accessory: 'earring',
  },
  'Ahmed J.': {
    skin: skinTones[2],
    skinShade: '#9c6a34',
    hair: '#100c09',
    hairStyle: 'crew',
    clothing: 'tee',
    clothingColor: '#f5f5f0',
    dupatta: '#243b53',
    accessory: 'none',
  },
  'Bilal T.': {
    skin: skinTones[1],
    skinShade: '#7d5434',
    hair: '#2b2b2b',
    hairStyle: 'waves',
    clothing: 'tee',
    clothingColor: '#4f46e5',
    dupatta: '#243b53',
    accessory: 'none',
  },
  'Nadia H.': {
    skin: skinTones[2],
    skinShade: '#9c6a34',
    hair: '#1b140f',
    hairStyle: 'hijab',
    clothing: 'coat',
    clothingColor: '#f5f5f0',
    dupatta: '#c49820',
    accessory: 'none',
  },
};

function fallbackPortrait(name: string): Config {
  // Deterministic, neutral portrait for names without a drawn variant.
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  const skin = skinTones[hash % skinTones.length];
  return {
    skin,
    skinShade: '#5f3a18',
    hair: '#1b140f',
    hairStyle: ['bun', 'short', 'waves', 'crew'][hash % 4] as Config['hairStyle'],
    clothing: 'kurta',
    clothingColor: '#243b53',
    dupatta: '#0f766e',
    accessory: 'none',
  };
}

export function Portrait({
  name,
  className = '',
}: {
  name: string;
  className?: string;
}) {
  const c: Config = portraits[name] ?? fallbackPortrait(name);
  const clip = `portrait-clip-${name.replace(/[^a-z0-9]/gi, '-')}`;

  return (
    <svg
      viewBox="0 0 96 96"
      role="img"
      aria-label={`Illustration of a person`}
      className={`h-10 w-10 rounded-full ring-1 ring-green-800/10 ${className}`}
    >
      <defs>
        <clipPath id={clip}>
          <circle cx="48" cy="48" r="48" />
        </clipPath>
        <radialGradient id={`${clip}-bg`} cx="0.35" cy="0.35" r="1.15">
          <stop offset="0%" stopColor="#0e3b2a" />
          <stop offset="100%" stopColor="#04241a" />
        </radialGradient>
      </defs>

      <g clipPath={`url(#${clip})`}>
        <circle cx="48" cy="48" r="48" fill={`url(#${clip}-bg)`} />

        {/* shoulders / clothing */}
        <path d="M8 96 C 9 74 26 64 48 64 C 70 64 87 74 88 96 Z" fill={c.clothingColor} />
        {c.clothing === 'coat' && (
          <>
            <path d="M48 66 L 36 96 L 30 96 Z" fill="#d8d8d0" />
            <path d="M48 66 L 60 96 L 66 96 Z" fill="#d8d8d0" />
          </>
        )}
        {c.clothing === 'vest' && (
          <path d="M33 67 C 40 74 56 74 63 67 L 60 96 L 36 96 Z" fill={c.dupatta} opacity="0.95" />
        )}
        {c.clothing === 'shalwar' && (
          <>
            <path d="M48 66 L 34 96 L 62 96 Z" fill="#f1efe6" />
            <path d="M30 66 L 24 96 L 29 96 Z" fill={c.dupatta} />
            <path d="M66 66 L 72 96 L 67 96 Z" fill={c.dupatta} />
          </>
        )}
        {c.clothing === 'tee' && <path d="M40 64 L 48 72 L 56 64 L 54 60 L 44 60 Z" fill="#ffffff" opacity="0.9" />}

        {/* dupatta draped over one shoulder (shalwar look) */}
        {c.clothing === 'shalwar' && (
          <path d="M22 62 C 40 74 60 74 74 62 L 74 70 C 58 82 36 82 22 70 Z" fill={c.dupatta} />
        )}

        {/* neck */}
        <rect x="40" y="46" width="16" height="16" rx="5" fill={c.skin} />

        {/* hijab back (drawn before face) */}
        {c.hairStyle === 'hijab' && (
          <path d="M48 4 C 26 4 18 26 20 54 C 21 70 28 78 48 78 C 68 78 75 70 76 54 C 78 26 70 4 48 4 Z" fill={c.dupatta} />
        )}

        {/* face */}
        <ellipse cx="48" cy="36" rx="15.5" ry="17.5" fill={c.skin} />
        <ellipse cx="48" cy="40" rx="15.5" ry="10" fill={c.skinShade} opacity="0.35" />

        {/* ears */}
        <ellipse cx="32.5" cy="38" rx="2.6" ry="4" fill={c.skin} />
        <ellipse cx="63.5" cy="38" rx="2.6" ry="4" fill={c.skin} />

        {/* hair (skipped for hijab) */}
        {c.hairStyle !== 'hijab' && (
          <>
            {c.hairStyle === 'short' && (
              <path
                d="M33 29 C 34 12 66 12 65 30 C 61 25 41 25 33 29 Z"
                fill={c.hair}
              />
            )}
            {c.hairStyle === 'bun' && (
              <>
                <path
                  d="M31 34 C 29 9 69 9 67 34 C 64 32 53 29 48 29 C 43 29 34 32 31 34 Z"
                  fill={c.hair}
                />
                <circle cx="48" cy="13" r="5" fill={c.hair} />
              </>
            )}
            {c.hairStyle === 'waves' && (
              <path
                d="M30 36 C 27 10 69 10 66 36 C 60 27 56 19 48 19 C 40 19 36 27 30 36 Z"
                fill={c.hair}
              />
            )}
            {c.hairStyle === 'crew' && (
              <path
                d="M33 30 C 35 14 63 14 63 30 C 56 27 42 27 33 30 Z"
                fill={c.hair}
              />
            )}
          </>
        )}

        {/* face features */}
        <g stroke="#1b140f" strokeWidth="1.4" strokeLinecap="round" fill="none">
          {/* brows */}
          <path d="M38 31.5 L 44 30.6" />
          <path d="M52 30.6 L 58 31.5" />
          {/* nose */}
          <path d="M48 36 L 46.4 41 L 50 41" />
          {/* smile */}
          <path d="M42.5 47.5 C 46 50.4 52 50.4 55.5 47.5" />
        </g>
        <g fill="#1b140f">
          <ellipse cx="41.5" cy="36" rx="1.6" ry="1.3" />
          <ellipse cx="54.5" cy="36" rx="1.6" ry="1.3" />
        </g>
        <g stroke="#1b140f" strokeWidth="0.8" strokeLinecap="round" opacity="0.5">
          <path d="M39.5 33.6 L 43.5 33.6" />
          <path d="M52.5 33.6 L 56.5 33.6" />
        </g>

        {/* glasses */}
        {c.accessory === 'glasses' && (
          <g stroke="#1b140f" strokeWidth="1.6" fill="none" opacity="0.9">
            <circle cx="41.5" cy="36.5" r="5.4" />
            <circle cx="54.5" cy="36.5" r="5.4" />
            <path d="M46.9 36.5 L 49.1 36.5" />
          </g>
        )}

        {/* earring */}
        {c.accessory === 'earring' && (
          <circle cx="63.5" cy="42.5" r="1.35" fill="#c49820" />
        )}
      </g>
    </svg>
  );
}


