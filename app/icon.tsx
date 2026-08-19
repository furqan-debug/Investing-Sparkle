import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * Favicon, generated at build time from the actual logo mark.
 *
 * The mark is drawn on the brand emerald so it stays visible against both light
 * and dark browser chrome — the logo's own green would disappear against a dark
 * tab strip, and a transparent PNG at 16px reads as nothing at all.
 *
 * Next serves this at /icon and wires the <link> tag automatically, so no
 * favicon.ico file is needed.
 */

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default async function Icon() {
  const mark = await readFile(
    join(process.cwd(), 'public', 'brand', 'investing-sparkle-mark.png')
  );
  const src = `data:image/png;base64,${mark.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#04241a',
          borderRadius: 12,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={46} height={43} alt="" />
      </div>
    ),
    size
  );
}
