import { site } from '@/content/site';

/**
 * Trust bar — real numbers only.
 *
 * Stats whose value is null in content/site.ts are dropped entirely rather than
 * rendered as "0+" or a placeholder. If every stat is unset, the whole bar
 * disappears. An empty space is better than an invented number.
 */
export function TrustBar() {
  const stats = site.trustBar.filter((s) => s.value);
  if (stats.length === 0) return null;

  return (
    <div className="border-y border-line bg-white">
      <div className="container-page">
        <dl className="grid grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
          {stats.map((stat) => (
            /*
             * flex-col-reverse puts the value above the label visually while
             * keeping dt before dd in the DOM — so the pairing is announced
             * once, in the right order, rather than duplicating the label in a
             * visually-hidden element.
             */
            <div key={stat.label} className="flex flex-col-reverse px-2 py-7 text-center md:px-6">
              <dt className="mt-2 text-xs font-medium uppercase tracking-wider text-muted">
                {stat.label}
              </dt>
              <dd className="font-display text-2xl leading-none text-green-800 md:text-3xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
