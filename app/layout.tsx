import type { Metadata } from 'next';
import './globals.css';
import YandexMetrika from '@/components/YandexMetrika';
import CookieConsent from '@/components/CookieConsent';

const siteUrl = 'https://smmsfera.ru';

const title = 'СММ в Иваново — ведение соцсетей под ключ | SMM-агентство «СММ СФЕРА»';
const description =
  'Ведение соцсетей в Иваново под ключ: ВКонтакте, Telegram, контент-план, съёмка, таргет и отчёты. SMM-агентство «СММ СФЕРА». Цены и заявка.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: '/' },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/`,
    siteName: 'СММ СФЕРА',
    images: [
      {
        url: `${siteUrl}/og.jpg`,
        width: 1200,
        height: 630,
        alt: 'SMM-агентство «СММ СФЕРА» — ведение соцсетей в Иваново',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [`${siteUrl}/og.jpg`],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'СММ СФЕРА',
  url: `${siteUrl}/`,
  image: `${siteUrl}/og.jpg`,
  logo: `${siteUrl}/assets/logo-red.webp`,
  telephone: '+79960263509',
  email: 'smm.sfera@mail.ru',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Шереметевский пр-т, 1',
    addressLocality: 'Иваново',
    addressRegion: 'Ивановская область',
    addressCountry: 'RU',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 56.9973571,
    longitude: 40.9808854,
  },
  areaServed: [
    { '@type': 'City', name: 'Иваново' },
    { '@type': 'AdministrativeArea', name: 'Ивановская область' },
    { '@type': 'Country', name: 'Russia' },
  ],
  sameAs: ['https://vk.com/smm_sfera', 'https://t.me/+79960263509'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" data-theme="light">
      <body>
        <YandexMetrika />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <noscript>
          <div
            style={{
              padding: '12px 16px',
              fontFamily: 'system-ui, sans-serif',
              fontSize: 14,
              lineHeight: 1.45,
              borderBottom: '1px solid #ddd',
            }}
          >
            СММ СФЕРА — SMM-агентство в Иваново.{' '}
            <a href="tel:+79960263509">+7 (996) 026-35-09</a>
            {' · '}
            <a href={`${siteUrl}/policies/`}>Политики</a>
          </div>
        </noscript>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
