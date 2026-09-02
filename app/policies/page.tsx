import Link from 'next/link';
import type { Metadata } from 'next';
import privacy from '@/data/privacy.json';
import consent from '@/data/consent.json';
import { asset } from '@/lib/asset';

export const metadata: Metadata = {
  title: 'Политики — СММ СФЕРА',
  description: 'Политика обработки персональных данных и согласие на обработку персональных данных СММ СФЕРА.',
  robots: { index: false, follow: false },
};

function Paragraphs({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, index) => {
        const isHeading = /^(Термины|Приложение|Согласие|Политика обработки|Оператор:|\d+(\.\d+)*\.?\s)/.test(line) && line.length < 180;
        const Tag = index === 0 || isHeading ? 'h3' : 'p';
        return <Tag key={`${index}-${line.slice(0, 24)}`}>{line}</Tag>;
      })}
    </>
  );
}

export default function PoliciesPage() {
  return (
    <main className="legal-page">
      <header className="legal-top">
        <Link href="/" className="legal-back">← На главную</Link>
        <Link className="brand legal-brand" href="/">
          <img src={asset('/assets/logo-red.webp')} alt="" />
          <span>СММ СФЕРА</span>
        </Link>
      </header>

      <div className="legal-wrap">
        <h1>Юридические документы</h1>
        <p className="legal-lead">
          Документы размещены в редакции, предоставленной оператором 02.09.2026.
          Оператор: ИП Соркина Радмила Вячеславовна, ИНН 450101448176, ОГРНИП 310370204700173.
        </p>
        <nav className="legal-toc" aria-label="Содержание документов">
          <a href="#privacy">Политика обработки персональных данных</a>
          <a href="#consent">Согласие на обработку персональных данных</a>
        </nav>

        <article id="privacy" className="legal-doc">
          <h2>Политика обработки персональных данных</h2>
          <Paragraphs lines={privacy} />
        </article>

        <article id="consent" className="legal-doc">
          <h2>Согласие на обработку персональных данных</h2>
          <Paragraphs lines={consent} />
        </article>
      </div>
    </main>
  );
}
