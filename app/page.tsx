import type { Metadata } from 'next';
import HomePage from './HomePage';

const siteUrl = 'https://smmsfera.ru';

const title = 'СММ в Иваново — ведение соцсетей под ключ | SMM-агентство «СММ СФЕРА»';
const description =
  'Ведение соцсетей в Иваново под ключ: ВКонтакте, Telegram, контент-план, съёмка, таргет и отчёты. SMM-агентство «СММ СФЕРА». Цены и заявка.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/' },
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

export default function Page() {
  return <HomePage />;
}
