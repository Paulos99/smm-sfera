import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности — СММ СФЕРА',
  robots: { index: false, follow: true },
  alternates: { canonical: '/policies/' },
};

/** Alias for old /privacy links → policies#privacy (static-export friendly). */
export default function PrivacyAliasPage() {
  const href = '/policies/#privacy';
  return (
    <main className="legal-page" style={{ padding: '48px 20px', maxWidth: 560, margin: '0 auto' }}>
      <h1 style={{ fontSize: 22, marginBottom: 12 }}>Политика конфиденциальности</h1>
      <p style={{ marginBottom: 16 }}>
        Документ размещён на странице политик.{' '}
        <Link href={href}>Открыть политику →</Link>
      </p>
      <script
        dangerouslySetInnerHTML={{
          __html: `location.replace(${JSON.stringify(href)});`,
        }}
      />
    </main>
  );
}
