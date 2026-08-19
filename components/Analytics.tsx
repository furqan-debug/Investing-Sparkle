'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

/**
 * Consent-gated analytics.
 *
 * Nothing loads until the visitor accepts cookies. That is both the honest
 * reading of the consent banner and the safer default given the plan's
 * privacy-friendly stance.
 *
 * TODO — fill these in via environment variables in .env.local:
 *   NEXT_PUBLIC_PLAUSIBLE_DOMAIN   e.g. investingsparkle.com   (Plausible)
 *   NEXT_PUBLIC_GA_ID              e.g. G-XXXXXXXXXX           (GA4)
 *   NEXT_PUBLIC_FB_PIXEL_ID        e.g. 123456789012345        (Meta Pixel)
 * Any variable left unset simply means that script never loads.
 */

const STORAGE_KEY = 'is-cookie-consent';

export function Analytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    try {
      setConsented(localStorage.getItem(STORAGE_KEY) === 'accepted');
    } catch {
      /* storage unavailable — stay off */
    }

    const onConsent = (e: Event) => {
      setConsented((e as CustomEvent<string>).detail === 'accepted');
    };
    window.addEventListener('cookie-consent', onConsent);
    return () => window.removeEventListener('cookie-consent', onConsent);
  }, []);

  if (!consented) return null;

  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

  return (
    <>
      {plausibleDomain && (
        <Script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      )}

      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      )}

      {pixelId && (
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}
