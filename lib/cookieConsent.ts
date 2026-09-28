export const COOKIE_CONSENT_KEY = 'smmsfera_cookie_consent';
/** Bump when the banner text / set of analytics tools changes to ask again. */
export const COOKIE_CONSENT_VERSION = 1;
export const COOKIE_CONSENT_EVENT = 'smmsfera:cookie-consent';

export type CookieConsentChoice = 'accepted' | 'necessary';

export type CookieConsentRecord = {
  choice: CookieConsentChoice;
  version: number;
  date: string;
};

export type CookieConsentEventDetail = { choice: CookieConsentChoice | null };

export function readCookieConsent(): CookieConsentRecord | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CookieConsentRecord>;
    if (parsed.choice !== 'accepted' && parsed.choice !== 'necessary') return null;
    if (parsed.version !== COOKIE_CONSENT_VERSION) return null;
    return { choice: parsed.choice, version: parsed.version, date: String(parsed.date ?? '') };
  } catch {
    return null;
  }
}

function emit(choice: CookieConsentChoice | null) {
  window.dispatchEvent(new CustomEvent<CookieConsentEventDetail>(COOKIE_CONSENT_EVENT, { detail: { choice } }));
}

export function saveCookieConsent(choice: CookieConsentChoice) {
  const record: CookieConsentRecord = { choice, version: COOKIE_CONSENT_VERSION, date: new Date().toISOString() };
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(record));
  } catch {
    // Storage may be unavailable (private mode); the choice still applies to this page view.
  }
  emit(choice);
}

/** Clears the stored choice and re-opens the banner (footer «Настройки cookie»). */
export function resetCookieConsent() {
  try {
    window.localStorage.removeItem(COOKIE_CONSENT_KEY);
  } catch {
    // ignore
  }
  emit(null);
}

export function onCookieConsentChange(listener: (choice: CookieConsentChoice | null) => void) {
  const handler = (event: Event) => listener((event as CustomEvent<CookieConsentEventDetail>).detail?.choice ?? null);
  window.addEventListener(COOKIE_CONSENT_EVENT, handler);
  return () => window.removeEventListener(COOKIE_CONSENT_EVENT, handler);
}
