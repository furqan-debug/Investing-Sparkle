'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/cn';

/**
 * Google Identity Services button.
 *
 * Google renders its own button into an iframe, which is the only way to get a
 * real Google credential without opening a popup ourselves. While that loads,
 * or if the script is blocked, a matching placeholder keeps the layout steady.
 *
 * The credential is an ID token, not an access token. It is posted to our own
 * route for verification; nothing is trusted from the client.
 */

type CredentialResponse = { credential?: string };

type GoogleIdentity = {
  accounts: {
    id: {
      initialize: (options: {
        client_id: string;
        callback: (response: CredentialResponse) => void;
        auto_select?: boolean;
        cancel_on_tap_outside?: boolean;
        ux_mode?: 'popup' | 'redirect';
      }) => void;
      renderButton: (parent: HTMLElement, options: Record<string, string | number | boolean>) => void;
    };
  };
};

declare global {
  interface Window {
    google?: GoogleIdentity;
  }
}

const SCRIPT_ID = 'google-identity-services';
let scriptPromise: Promise<void> | null = null;

function loadGoogleScript(): Promise<void> {
  if (window.google?.accounts?.id) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    const script = existing ?? document.createElement('script');

    script.addEventListener('load', () => resolve(), { once: true });
    script.addEventListener(
      'error',
      () => {
        scriptPromise = null;
        reject(new Error('Google script failed to load'));
      },
      { once: true }
    );

    if (!existing) {
      script.id = SCRIPT_ID;
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  });

  return scriptPromise;
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" className="h-[18px] w-[18px]" aria-hidden focusable="false">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

export function GoogleSignInButton({
  clientId,
  onCredential,
  pending = false,
}: {
  clientId: string;
  onCredential: (credential: string) => void;
  /** True while the credential is being verified server-side. */
  pending?: boolean;
}) {
  const holder = useRef<HTMLDivElement>(null);
  const callback = useRef(onCredential);
  const [status, setStatus] = useState<'loading' | 'ready' | 'unavailable'>('loading');

  useEffect(() => {
    callback.current = onCredential;
  }, [onCredential]);

  useEffect(() => {
    if (!clientId) {
      setStatus('unavailable');
      return;
    }

    let cancelled = false;

    loadGoogleScript()
      .then(() => {
        const node = holder.current;
        const google = window.google?.accounts.id;
        if (cancelled || !node || !google) return;

        // Google's button is an iframe with a fixed width, so it has to be told
        // a number rather than stretched by CSS. Clamp to the smallest size it
        // will accept, and never wider than the card.
        const width = Math.min(360, Math.max(200, Math.floor(node.clientWidth || 320)));

        google.initialize({
          client_id: clientId,
          ux_mode: 'popup',
          auto_select: false,
          cancel_on_tap_outside: true,
          callback: (response) => {
            if (response.credential) callback.current(response.credential);
          },
        });

        node.innerHTML = '';
        google.renderButton(node, {
          type: 'standard',
          theme: 'filled_black',
          size: 'large',
          shape: 'pill',
          text: 'continue_with',
          logo_alignment: 'left',
          width,
        });

        setStatus('ready');
      })
      .catch(() => {
        if (!cancelled) setStatus('unavailable');
      });

    return () => {
      cancelled = true;
    };
  }, [clientId]);

  return (
    <div>
      <div className="relative min-h-11">
        <div
          ref={holder}
          className={cn(
            'flex min-h-11 justify-center',
            status !== 'ready' && 'pointer-events-none invisible'
          )}
        />

        {status !== 'ready' && (
          <div
            aria-hidden
            className={cn(
              'absolute inset-0 flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.06] text-sm font-medium text-ink',
              status === 'unavailable' && 'opacity-60'
            )}
          >
            <GoogleMark />
            {pending ? 'Signing in…' : 'Continue with Google'}
          </div>
        )}
      </div>

      {status === 'unavailable' && (
        <p className="mt-2.5 text-center text-xs leading-relaxed text-amber-200/80">
          Google sign-in could not load. Check your connection, then refresh the page.
        </p>
      )}
    </div>
  );
}
