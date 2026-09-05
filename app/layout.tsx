import type { Metadata } from 'next';
import './globals.css';

const siteUrl = 'https://paulos99.github.io/smm-sfera';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'СММ СФЕРА — спецагентство полного цикла',
  description: 'Маркетинговые операции особой важности: стратегия, контент, продвижение и аналитика.',
  icons: { icon: '/favicon.png' },
  openGraph: {
    title: 'СММ СФЕРА — спецагентство полного цикла',
    description: 'Маркетинговые операции особой важности: стратегия, контент, продвижение и аналитика.',
    images: [{ url: `${siteUrl}/og.jpg`, width: 1200, height: 630, alt: 'СММ СФЕРА — маркетинговые операции особой важности' }],
    locale: 'ru_RU',
    type: 'website',
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
        {children}
      </body>
    </html>
  );
}
