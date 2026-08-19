import { ImageResponse } from 'next/og';

/**
 * Favicon, generated at build time from the brand palette — the yellow "IS"
 * mark that appears in the header, at tab size.
 *
 * Next serves this at /icon and wires the <link> tag automatically, so no
 * favicon.ico file is needed.
 */

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FFC72C',
          color: '#071f16',
          fontSize: 34,
          fontWeight: 700,
          fontFamily: 'sans-serif',
          borderRadius: 12,
        }}
      >
        IS
      </div>
    ),
    size
  );
}
