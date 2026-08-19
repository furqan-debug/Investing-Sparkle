import { ImageResponse } from 'next/og';
import { site } from '@/content/site';

/**
 * Social share image, generated at build time.
 *
 * This replaces the /public/og-image.png the pre-launch checklist asked for —
 * there is nothing to design or keep in sync, and it inherits the brand colours
 * from the same palette the site uses.
 *
 * Individual pages can override this by adding their own opengraph-image file
 * in their route folder.
 */

export const alt = `${site.name} — Learn to invest in Pakistan`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #071f16 0%, #0f4c3a 100%)',
          padding: 80,
          fontFamily: 'sans-serif',
        }}
      >
        {/* Wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 72,
              height: 72,
              borderRadius: 16,
              background: '#FFC72C',
              color: '#071f16',
              fontSize: 40,
              fontWeight: 700,
            }}
          >
            IS
          </div>
          <div style={{ display: 'flex', fontSize: 40, fontWeight: 700, color: '#ffffff' }}>
            Investing
            <span style={{ color: '#FFC72C', marginLeft: 12 }}>Sparkle</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.1,
              letterSpacing: -1,
            }}
          >
            Learn to invest in Pakistan —
          </div>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              color: '#FFC72C',
              lineHeight: 1.1,
              letterSpacing: -1,
            }}
          >
            with confidence, not guesswork.
          </div>
        </div>

        {/* Trust anchor */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 28,
            color: '#b3e0cd',
          }}
        >
          <div style={{ display: 'flex', width: 12, height: 12, borderRadius: 6, background: '#FFC72C' }} />
          We teach. You execute. Your account, your decisions.
        </div>
      </div>
    ),
    size
  );
}
