import type { Metadata } from 'next';
import './globals.css';

const siteUrl = 'https://paulos99.github.io/smm-sfera';

const title = 'СММ СФЕРА — SMM-агентство в Иваново | стратегия, контент, трафик';
const description =
  'SMM-агентство полного цикла в Иваново: стратегия, контент, продвижение и аналитика. Спецагенты по маркетинговым операциям — от брифа до отчётности.';

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
        alt: 'СММ СФЕРА — маркетинговые операции особой важности',
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
  telephone: '+79960263509',
  email: 'smmsfera@mail.ru',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Шереметевский пр-т, 1',
    addressLocality: 'Иваново',
    addressRegion: 'Ивановская область',
    addressCountry: 'RU',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Russia',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" data-theme="light">
      <body>
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
      </body>
    </html>
  );
}
