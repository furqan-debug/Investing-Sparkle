import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { site } from '@/content/site';

/**
 * Social share image, generated at build time from the real logo mark and the
 * sampled brand colours — so there is no separate asset to design or keep in
 * sync when the brand changes.
 *
 * Individual pages can override this by adding their own opengraph-image file
 * in their route folder.
 */

export const alt = `${site.name} — Learn to invest in Pakistan`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const mark = await readFile(
    join(process.cwd(), 'public', 'brand', 'investing-sparkle-mark.png')
  );
  const markSrc = `data:image/png;base64,${mark.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #04241a 0%, #084b36 100%)',
          padding: 72,
          fontFamily: 'sans-serif',
        }}
      >
        {/* Lockup */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} width={85} height={80} alt="" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                fontSize: 38,
                fontWeight: 700,
                color: '#00B578',
                letterSpacing: 1,
                lineHeight: 1,
              }}
            >
              INVESTING
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 500,
                color: '#C49820',
                letterSpacing: 11,
                lineHeight: 1,
                marginTop: 6,
              }}
            >
              SPARKLE
            </div>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.12,
              letterSpacing: -1,
            }}
          >
            Learn to invest in Pakistan —
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: '#DDAF33',
              lineHeight: 1.12,
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
            fontSize: 26,
            color: '#A9EBD2',
          }}
        >
          <div
            style={{ display: 'flex', width: 12, height: 12, borderRadius: 6, background: '#C49820' }}
          />
          We teach. You execute. Your account, your decisions.
        </div>
      </div>
    ),
    size
  );
}
