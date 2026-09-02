'use client';

import { useEffect, useState } from 'react';
import './heroes.css';

export default function HeroesPage() {
  const [active, setActive] = useState(1);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('.hero-concept');
    const observer = new IntersectionObserver((entries) => {
      const current = entries.find((entry) => entry.isIntersecting);
      if (current) setActive(Number((current.target as HTMLElement).dataset.concept));
    }, { threshold: .52 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="heroes-showcase">
      <nav className="heroes-nav" aria-label="Навигация по hero-концепциям">
        <a href="/" className="heroes-back" aria-label="Вернуться на главную">СФЕРА</a>
        {[1, 2, 3, 4, 5].map((item) => <a href={`#hero-0${item}`} className={active === item ? 'is-active' : ''} key={item} aria-label={`Концепт ${item}`}>0{item}</a>)}
        <span className="heroes-progress">5 HERO / КОНЦЕПТЫ</span>
      </nav>

      <section className="hero-concept hero-command" id="hero-01" data-concept="1">
        <div className="command-grid" aria-hidden="true" />
        <div className="concept-index"><span>КОНЦЕПТ</span><strong>01</strong></div>
        <div className="command-copy">
          <p className="command-kicker"><i /> СПЕЦАГЕНТСТВО ПОЛНОГО ЦИКЛА · ИВАНОВО</p>
          <h1>Берём бренд<br /><em>в сферу</em><br />влияния</h1>
          <div className="command-bottom">
            <p>Стратегия, контент, трафик и аналитика — одна команда отвечает за всю операцию и её результат.</p>
            <a href="#hero-02">Поставить задачу <span>↗</span></a>
          </div>
        </div>
        <div className="command-radar" aria-label="Сфера влияния СММ СФЕРЫ">
          <div className="radar-orbit orbit-a"><i /></div>
          <div className="radar-orbit orbit-b"><i /></div>
          <div className="radar-sweep-beam" />
          <img src="/assets/logo-red.png" alt="СММ СФЕРА" />
          <span className="target target-a">КОНТЕНТ <b>●</b></span>
          <span className="target target-b">ТРАФИК <b>●</b></span>
          <span className="target target-c">СТРАТЕГИЯ <b>●</b></span>
        </div>
        <div className="command-stats">
          <div><strong>10+</strong><span>лет в поле</span></div>
          <div><strong>400+</strong><span>операций</span></div>
          <div><strong>01</strong><span>команда на весь цикл</span></div>
        </div>
      </section>

      <section className="hero-concept hero-studio" id="hero-02" data-concept="2">
        <div className="studio-noise" aria-hidden="true" />
        <div className="concept-index studio-index"><span>КОНЦЕПТ</span><strong>02 / ЖИВОЙ ШТАБ</strong></div>
        <div className="studio-copy">
          <p className="studio-kicker">СММ СФЕРА · КРЕАТИВНЫЙ СПЕЦОТРЯД</p>
          <h2>Работаем<br /><span>тихо.</span></h2>
          <h2 className="studio-loud">Результат —<br /><em>громко.</em></h2>
          <p className="studio-lead">Не штампуем посты. Погружаемся в бизнес, находим точку роста и собираем под неё людей, идеи и инструменты.</p>
          <a className="studio-button" href="/#contact">Познакомиться с командой <b>↗</b></a>
        </div>
        <div className="studio-collage" aria-label="Креативная команда СММ СФЕРЫ">
          <div className="studio-card card-strategy"><span>СТРАТЕГИЯ</span><img src="/assets/agent-strategy.png" alt="Агент Стратег" /></div>
          <div className="studio-card card-creative"><span>КРЕАТИВ</span><img src="/assets/agent-creative.png" alt="Агент Креатив" /></div>
          <div className="studio-card card-performance"><span>ТРАФИК</span><img src="/assets/agent-performance.png" alt="Агент Трафик" /></div>
          <div className="studio-note note-one">ИДЕЯ<br />+ СМЫСЛ</div>
          <div className="studio-note note-two">ОДНА<br />КОМАНДА</div>
          <div className="studio-arrow" aria-hidden="true">↗</div>
          <div className="studio-stamp">ПРОВЕРЕНО<br />НА ПРАКТИКЕ</div>
        </div>
        <div className="studio-ticker" aria-hidden="true"><div>СТРАТЕГИЯ ✦ КОНТЕНТ ✦ ТРАФИК ✦ ПРОДАКШН ✦ АНАЛИТИКА ✦ СТРАТЕГИЯ ✦ КОНТЕНТ ✦ ТРАФИК ✦ ПРОДАКШН ✦ АНАЛИТИКА ✦ </div></div>
      </section>

      <section className="hero-concept hero-proof" id="hero-03" data-concept="3">
        <div className="concept-index proof-index"><span>КОНЦЕПТ</span><strong>03 / ДОКАЗАТЕЛЬНЫЙ</strong></div>
        <div className="proof-heading">
          <p>СММ ПОЛНОГО ЦИКЛА · 2026</p>
          <h2>Не обещаем<br />охваты.<br /><em>Строим рост.</em></h2>
        </div>
        <div className="proof-side">
          <p>Соединяем стратегию, контент и продвижение в одну управляемую систему. Каждый месяц — цифры, выводы и следующий шаг.</p>
          <a href="/#cases">Смотреть досье проектов <span>↗</span></a>
        </div>
        <div className="proof-metrics">
          <article className="metric-main"><span>ЗАДАЧА № 001</span><strong>×3,2</strong><p>рост целевых лидов в B2B-кейсе</p><i>↗ 218%</i></article>
          <article><span>ОПЫТ</span><strong>10+</strong><p>лет в digital</p></article>
          <article><span>МИССИИ</span><strong>400+</strong><p>выполнено</p></article>
          <article className="metric-dark"><span>КОМАНДА</span><strong>20+</strong><p>специалистов в штабе</p></article>
        </div>
        <div className="proof-seal" aria-hidden="true">СИСТЕМА<br /><b>≠</b><br />СЛУЧАЙНОСТЬ</div>
      </section>

      <section className="hero-concept hero-signal" id="hero-04" data-concept="4">
        <div className="signal-lines" aria-hidden="true" />
        <div className="concept-index signal-index"><span>КОНЦЕПТ</span><strong>04 / ЭФИР</strong></div>
        <div className="signal-title">
          <p><i /> СИГНАЛ УСТАНОВЛЕН</p>
          <h2>Захватываем<br /><em>внимание</em></h2>
          <div><span>01 — СМЫСЛ</span><span>02 — ФОРМА</span><span>03 — ДИСТРИБУЦИЯ</span></div>
        </div>
        <div className="signal-feed" aria-label="Контентная система СММ СФЕРЫ">
          <div className="feed-top"><span>LIVE / CONTENT SYSTEM</span><b>● REC</b></div>
          <div className="feed-screen">
            <div className="feed-card feed-yellow"><small>ПОСТ / 032</small><strong>БРЕНД<br />ГОВОРИТ</strong><i>↗</i></div>
            <div className="feed-card feed-image"><img src="/assets/agent-hero.png" alt="Агент СММ СФЕРЫ" /><span>ГЕРОЙ БРЕНДА</span></div>
            <div className="feed-card feed-blue"><small>ОХВАТ</small><strong>+270%</strong><span>за 90 дней</span></div>
            <div className="feed-card feed-red"><small>REELS / 09:16</small><strong>НЕ<br />ЛИСТАЙ</strong><i>▶</i></div>
          </div>
          <div className="feed-bottom"><span>VK</span><span>TG</span><span>ДЗЕН</span><span>REELS</span><b>04 / 04</b></div>
        </div>
        <div className="signal-action">
          <p>Контент, который узнают без логотипа. Продвижение, которое считают по бизнес-метрикам.</p>
          <a href="/#contact">Выйти на связь <span>↗</span></a>
        </div>
        <div className="signal-marquee" aria-hidden="true"><div>СМЫСЛ СИЛЬНЕЕ ШУМА · СМЫСЛ СИЛЬНЕЕ ШУМА · СМЫСЛ СИЛЬНЕЕ ШУМА · </div></div>
      </section>

      <section className="hero-concept hero-orbit" id="hero-05" data-concept="5">
        <div className="orbit-glow" aria-hidden="true" />
        <div className="concept-index orbit-index"><span>КОНЦЕПТ</span><strong>05 / МАНИФЕСТ</strong></div>
        <div className="orbit-topline"><span>СММ СФЕРА®</span><span>ИВАНОВО · РОССИЯ</span><span>FULL-CYCLE DIGITAL</span></div>
        <div className="orbit-copy">
          <p>ВАШ ВНЕШНИЙ ОТДЕЛ МАРКЕТИНГА</p>
          <h2>Не подрядчик.<br /><em>Часть вашей</em><br />команды.</h2>
        </div>
        <div className="orbit-sphere" aria-hidden="true">
          <div className="sphere-ring sphere-one"><i>СТРАТЕГИЯ</i></div>
          <div className="sphere-ring sphere-two"><i>КРЕАТИВ</i></div>
          <div className="sphere-ring sphere-three"><i>РЕЗУЛЬТАТ</i></div>
          <img src="/assets/logo-red.png" alt="" />
        </div>
        <div className="orbit-footer">
          <p>Вникаем в задачу глубже обычного. Думаем смело. Работаем системно. Отвечаем за результат целиком.</p>
          <a href="/#contact"><span>Обсудить операцию</span><b>↗</b></a>
          <div><span>10+ ЛЕТ</span><span>400+ МИССИЙ</span><span>20+ АГЕНТОВ</span></div>
        </div>
      </section>
    </main>
  );
}
