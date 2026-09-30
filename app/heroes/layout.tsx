import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hero-концепты — черновик | СММ СФЕРА',
  description: 'Внутренний черновик hero-концептов. Страница не для индексации.',
  robots: { index: false, follow: false },
};

export default function HeroesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
