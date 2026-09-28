'use client';

import { useEffect } from 'react';
import { onCookieConsentChange, readCookieConsent } from '@/lib/cookieConsent';

export const YANDEX_METRIKA_ID = 112857813;

const TAG_SRC = `https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRIKA_ID}`;

type YmFunction = ((...args: unknown[]) => void) & { a?: unknown[][]; l?: number };
type MetrikaWindow = Window & { ym?: YmFunction; __smmsferaYmLoaded?: boolean };

/** Injects tag.js and inits the counter. Called only after the visitor pressed «Принять». */
function loadYandexMetrika() {
  const w = window as MetrikaWindow;
  if (w.__smmsferaYmLoaded) return;
  w.__smmsferaYmLoaded = true;

  if (!w.ym) {
    const ym: YmFunction = (...args: unknown[]) => {
      (ym.a = ym.a || []).push(args);
    };
    w.ym = ym;
  }
  w.ym.l = Date.now();

  const alreadyInjected = Array.from(document.scripts).some((script) => script.src === TAG_SRC);
  if (!alreadyInjected) {
    const script = document.createElement('script');
    script.async = true;
    script.src = TAG_SRC;
    document.head.appendChild(script);
  }

  w.ym(YANDEX_METRIKA_ID, 'init', {
    ssr: true,
    webvisor: true,
    clickmap: true,
    accurateTrackBounce: true,
    trackLinks: true,
  });
}

/** Removes Metrika's own cookies/storage for this site when consent is withdrawn. */
function clearYandexMetrikaData() {
  const host = window.location.hostname;
  const domains = ['', host, `.${host}`, `.${host.replace(/^www\./, '')}`];
  document.cookie.split(';').forEach((pair) => {
    const name = pair.split('=')[0]?.trim();
    if (!name || !name.startsWith('_ym')) return;
    domains.forEach((domain) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain ? `; domain=${domain}` : ''}`;
    });
  });
  try {
    Object.keys(window.localStorage)
      .filter((key) => key.startsWith('_ym'))
      .forEach((key) => window.localStorage.removeItem(key));
  } catch {
    // ignore
  }
}

/**
 * Yandex Metrika gated behind cookie consent: nothing is rendered or requested
 * until the stored choice is `accepted` (no script tag, no ym init, no noscript pixel).
 */
export default function YandexMetrika() {
  useEffect(() => {
    const stored = readCookieConsent()?.choice;
    if (stored === 'accepted') loadYandexMetrika();
    else if (stored === 'necessary') clearYandexMetrikaData();
    return onCookieConsentChange((choice) => {
      if (choice === 'accepted') {
        loadYandexMetrika();
      } else if (choice === 'necessary') {
        clearYandexMetrikaData();
        // Consent withdrawn while Metrika was running in this tab: reload so it is no longer active.
        if ((window as MetrikaWindow).__smmsferaYmLoaded) window.location.reload();
      }
    });
  }, []);

  return null;
}
