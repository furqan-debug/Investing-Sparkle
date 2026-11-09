/**
 * Shared SVG gooey filter for the Leonardo-style button fill.
 *
 * Mounted once in the root layout; `.goo-fill` in globals.css references it
 * via `filter: url(#goo-button)`. The blur + strong alpha threshold
 * transforms a cluster of overlapping circles into one organic liquid
 * shape — the "gooey / liquid blob" look of Leonardo.ai's buttons.
 */
export function GooFilter() {
  return (
    <svg aria-hidden width="0" height="0" focusable="false" style={{ position: 'absolute' }}>
      <defs>
        <filter id="goo-button" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
            result="goo"
          />
        </filter>
      </defs>
    </svg>
  );
}
