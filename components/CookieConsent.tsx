'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  onCookieConsentChange,
  readCookieConsent,
  resetCookieConsent,
  saveCookieConsent,
} from '@/lib/cookieConsent';

/**
 * Cookie consent banner. Renders nothing on the server / first paint (static export safe)
 * and appears after mount only when no choice is stored.
 */
export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Read localStorage only after mount so the static HTML and hydration stay identical.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(readCookieConsent() === null);
    return onCookieConsentChange((choice) => setOpen(choice === null));
  }, []);

  if (!open) return null;

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-text"
    >
      <p id="cookie-banner-title" className="cookie-banner-title">Файлы cookie</p>
      <p id="cookie-banner-text" className="cookie-banner-text">
        Мы используем cookie и Яндекс Метрику, чтобы понимать, как посетители пользуются сайтом.
        Нажимая «Принять», вы соглашаетесь на обработку этих данных. Подробнее — в{' '}
        <Link href="/policies#cookies">Политике конфиденциальности</Link>.
      </p>
      <div className="cookie-banner-actions">
        <button type="button" className="cookie-banner-button is-primary" onClick={() => saveCookieConsent('accepted')}>
          Принять
        </button>
        <button type="button" className="cookie-banner-button" onClick={() => saveCookieConsent('necessary')}>
          Только необходимые
        </button>
      </div>
    </div>
  );
}

/** Footer / policy link that clears the stored choice and shows the banner again. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className ?? 'cookie-settings-link'} onClick={() => resetCookieConsent()}>
      Настройки cookie
    </button>
  );
}
