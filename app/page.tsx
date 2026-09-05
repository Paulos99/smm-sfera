'use client';

import { type CSSProperties, FormEvent, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import Link from 'next/link';
import { Award, Bot, CalendarClock, ChartNoAxesColumnDecreasing, ChartNoAxesCombined, Clapperboard, GraduationCap, Handshake, Megaphone, Route, Share2, ShieldAlert, ShoppingCart, Smartphone, Sparkles, Target, TrendingUp, UsersRound, Video, type LucideIcon } from 'lucide-react';
import Lenis from 'lenis';
import ArsenalLogoRain from '@/components/ArsenalLogoRain';
import { asset } from '@/lib/asset';
import { officialContactEmail, submitLead } from '@/lib/submitLead';
import {
  agents,
  arsenalMissions,
  clientLogos,
  missions,
  operationMarkers,
  operationSteps,
  painTargets,
  radarTargets,
  signals,
  whyItems,
  type Agent,
} from '@/data/home';

const signalIcons: LucideIcon[] = [Smartphone, CalendarClock, Route, ShieldAlert, UsersRound, ChartNoAxesColumnDecreasing];
const arsenalIcons: LucideIcon[] = [Share2, Clapperboard, Megaphone, ShoppingCart, Target, GraduationCap, Bot];
const whyIcons: LucideIcon[] = [Award, ChartNoAxesCombined, Video, Sparkles, TrendingUp, Handshake];

function AgentCard({ agent }: { agent: Agent }) {
  return (
    <article className="team-card">
      <span className="agent-pin" aria-hidden="true" />
      <div className="team-photo">
        <img src={agent.image} alt={agent.name} loading="lazy" decoding="async" />
        <span>{agent.id}</span>
        <i />
      </div>
      <div className="team-card-copy">
        <small>{agent.role}</small>
        <h3>{agent.name}</h3>
        <p>{agent.description}</p>
      </div>
    </article>
  );
}

export default function Home() {
  const [formStatus, setFormStatus] = useState<'idle' | 'ok' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [selectedMission, setSelectedMission] = useState<number | null>(null);
  const [teamExpanded, setTeamExpanded] = useState(false);
  const [activeSignals, setActiveSignals] = useState<number[]>([]);
  const [painTarget, setPainTarget] = useState(0);
  const [shotTarget, setShotTarget] = useState<number | null>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = 'light';
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible'));
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach((node) => observer.observe(node));
    const onVisibility = () => document.documentElement.classList.toggle('is-page-hidden', document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(pointer: fine)');
    const lenis = prefersReducedMotion.matches || !finePointer.matches ? null : new Lenis({
      autoRaf: true,
      lerp: 0.14,
      wheelMultiplier: 0.88,
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -96 },
    });
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      lenis?.destroy();
    };
  }, []);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setSelectedMission(null);
    }
    window.addEventListener('keydown', closeOnEscape);
    document.body.classList.toggle('modal-open', selectedMission !== null);
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
      document.body.classList.remove('modal-open');
    };
  }, [selectedMission]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setShotTarget(null);
    const fireTimer = window.setTimeout(() => setShotTarget(painTarget), 1800);
    const nextTargetTimer = window.setTimeout(() => {
      setShotTarget(null);
      setPainTarget((current) => (current + 1) % painTargets.length);
    }, 3200);
    return () => {
      window.clearTimeout(fireTimer);
      window.clearTimeout(nextTargetTimer);
    };
  }, [painTarget]);

  function toggleTeam() {
    const apply = () => setTeamExpanded((value) => !value);
    if (typeof document.startViewTransition !== 'function' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      apply();
      return;
    }
    document.startViewTransition(() => {
      flushSync(apply);
    });
  }

  async function submitBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!consent) {
      setFormStatus('error');
      setFormMessage('Отметьте согласие на обработку персональных данных.');
      return;
    }
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const company = String(data.get('company') || '').trim();
    const username = String(data.get('username') || '').trim();
    const message = String(data.get('message') || '').trim();
    if (!name || !phone) {
      setFormStatus('error');
      setFormMessage('Заполните имя и телефон.');
      return;
    }
    setFormStatus('idle');
    setFormMessage('');
    const result = await submitLead({ name, phone, company, username, message });
    const publicEmail = officialContactEmail();
    if (result.ok) {
      setFormStatus('ok');
      setFormMessage('Задание принято. Координатор выйдет на связь.');
      form.reset();
      setConsent(false);
      return;
    }
    setFormStatus('error');
    setFormMessage(`Не удалось отправить заявку. Напишите на ${publicEmail} или позвоните +7 (996) 026-35-09.`);
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="СММ СФЕРА — на главную"><img src={asset('/assets/logo-red.webp')} alt="" fetchPriority="high" decoding="async" /><span className="brand-wordmark">СММ СФЕРА</span></a>
        <nav aria-label="Основная навигация">
          <a href="#cases">Миссии</a><a href="#services">Арсенал</a><a href="#team">Агенты</a>
        </nav>
        <div className="header-actions">
          <a className="header-cta" href="#contact">Передать задание</a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-backword" aria-hidden="true"><div className="hero-backword-track"><div className="hero-backword-segment"><span>ДИДЖИТАЛ АГЕНСТВО</span><span>ДИДЖИТАЛ АГЕНСТВО</span></div><div className="hero-backword-segment"><span>ДИДЖИТАЛ АГЕНСТВО</span><span>ДИДЖИТАЛ АГЕНСТВО</span></div></div></div>
        <div className="hero-copy">
          <div className="eyebrow hero-badge"><span>Диджитал агенство «СММ СФЕРА»</span><b>Иваново • 24/7</b></div>
          <h1>Маркетинговые<br />операции <em className="hero-special shimmer-text">особой</em><br />важности</h1>
          <p>Спецагенты по продвижению берут на себя весь цикл: стратегия, контент, трафик и отчётность. Работаем тихо. Результаты говорят громко.</p>
          <div className="hero-actions"><a className="button button-primary" href="#contact">Поставить задачу <span>↗</span></a><a className="text-link" href="#cases">Смотреть досье <span>↓</span></a></div>
        </div>
        <div className="hero-visual hero-logos" aria-label="Логотип СММ СФЕРА и маркетинговые боли клиентов">
          <div className="hero-logo-pulse"><img src={asset('/assets/logo-red.webp')} alt="СММ СФЕРА" fetchPriority="high" decoding="async" /></div>
          {painTargets.map((pain, index) => <div className={`pain-target ${painTarget === index ? 'is-active' : ''} ${shotTarget === index ? 'is-shot' : ''}`} style={{ '--target-left': pain.left, '--target-top': pain.top } as CSSProperties} key={pain.label}><span>{pain.label}</span><i className="shot-burst" aria-hidden="true" /></div>)}
          <div className={`target-reticle ${shotTarget === painTarget ? 'is-firing' : ''}`} style={{ left: painTargets[painTarget].left, top: painTargets[painTarget].top }} aria-hidden="true"><i /><b /></div>
        </div>
        <div className="hero-stats" role="group" aria-label="10+ лет в поле, 400+ миссий выполнено, 20+ агентов в штабе">
          <span className="hero-stats-track">
            {[0, 1].map((copy) => <span className="hero-stats-segment" aria-hidden="true" key={copy}>
              <span className="hero-stat-item"><strong>10+</strong> лет в поле</span><i>✦</i>
              <span className="hero-stat-item"><strong>400+</strong> миссий выполнено</span><i>✦</i>
              <span className="hero-stat-item"><strong>20+</strong> агентов в штабе</span><i>✦</i>
            </span>)}
          </span>
        </div>
      </section>

      <div className="ticker" aria-label="Направления работы"><div className="ticker-track">{[0, 1].map((copy) => <div className="ticker-segment" aria-hidden="true" key={copy}><span>СТРАТЕГИЯ</span><i>✦</i><span>КОНТЕНТ</span><i>✦</i><span>ПРОДАКШН</span><i>✦</i><span>ТРАФИК</span><i>✦</i><span>СПЕЦПРОЕКТЫ</span><i>✦</i></div>)}</div></div>

      <section className="section signals-section" id="signals">
        <div className="signals-bento">
          <div className="signals-heading reveal">
            <h2>Когда мы <em className="shimmer-text">нужны бизнесу</em></h2>
            <p>Отметьте ситуации, которые узнали в своём проекте. Чем больше сигналов, тем важнее начать операцию сейчас.</p>
            <div className="signal-meter" style={{ '--signal-level': `${activeSignals.length / signals.length * 100}%` } as CSSProperties}>
              <div><span>Уровень сигнала</span><strong>{activeSignals.length} / {signals.length}</strong></div>
              <i><b /></i>
              <small>{activeSignals.length < 2 ? 'Периметр спокоен' : activeSignals.length < 4 ? 'Нужна разведка' : 'Требуется спецоперация'}</small>
              {activeSignals.length >= 2 && <a className="signal-meter-cta" href="#contact">Передать задачи <span>↗</span></a>}
            </div>
          </div>
          {signals.map(([number, text], index) => {
            const selected = activeSignals.includes(index);
            const SignalIcon = signalIcons[index];
            return <button className={`signal-card ${selected ? 'is-selected' : ''}`} type="button" aria-pressed={selected} onClick={() => setActiveSignals((current) => selected ? current.filter((item) => item !== index) : [...current, index])} key={number}><span className="signal-card-icon" aria-hidden="true"><SignalIcon /></span><i aria-hidden="true">{selected ? '✓' : '+'}</i><strong>{text}</strong></button>;
          })}
        </div>
      </section>

      <section className="section intel-cases" id="cases">
        <div className="intel-cases-shell">
          <div className="section-title reveal"><h2>Архив <em className="shimmer-text">успешных</em><br />операций</h2><p>Радар фиксирует новые задачи, а справа собраны уже выполненные миссии. Нажмите на карточку, чтобы открыть полное досье.</p></div>
          <div className="intel-cases-layout">
            <aside className="intel-column reveal">
              <div className="intel-radar radar" aria-label="Радар бизнес-задач">
                <div className="radar-sweep" />
                <div className="radar-center" />
                {radarTargets.map(([name, left, top], index) => <span className="radar-target is-logo is-detected" style={{ left, top, animationDelay: `${index * 0.42}s` }} key={`${name}-${index}`}><img src={clientLogos[index % clientLogos.length]} alt="" loading="lazy" decoding="async" /></span>)}
              </div>
              <div className="intel-stats">
                <small>Оперативная статистика / 2026</small>
                <div><strong>92%</strong><span>клиентов продолжают работу после первой миссии</span></div>
                <ul><li>Погружаемся в бизнес</li><li>Говорим на языке цифр</li><li>Работаем одной командой</li></ul>
              </div>
            </aside>
            <div className="case-bento">
              {missions.map((mission, index) => <button className={`case-bento-card case-tone-${mission.tone} reveal`} type="button" onClick={() => setSelectedMission(index)} key={mission.code}>
                <div><span>{mission.code}</span><small>{mission.sector}</small></div>
                <strong>{mission.title}</strong>
                <p>{mission.text}</p>
                <div className="case-bento-result"><b>{mission.stat}</b><span>{mission.label}</span><i>↗</i></div>
              </button>)}
            </div>
          </div>
          <div className="client-logo-marquee" aria-label="Логотипы клиентов"><div className="client-logo-track">{[0, 1].map((copy) => <div className="client-logo-segment" aria-hidden="true" key={copy}>{clientLogos.map((logo, index) => <span key={`${copy}-${index}`}><img src={logo} alt="" loading="lazy" decoding="async" /></span>)}</div>)}</div></div>
        </div>
      </section>

      <section className="section arsenal-section" id="services">
        <div className="section-title reveal"><h2>Наш арсенал — <em className="shimmer-text">7 миссий</em><br />для роста бизнеса</h2><p>Можно выбрать отдельную задачу или собрать из миссий единый маршрут продвижения.</p></div>
        <div className="arsenal-bento">
          {arsenalMissions.map(([number, title, items], index) => {
            const ArsenalIcon = arsenalIcons[index];
            return <article className={`arsenal-card reveal arsenal-card-${index + 1}`} key={number}>
            {index === 0 && <ArsenalLogoRain />}
            <div><span>{number}</span><ArsenalIcon className="arsenal-card-icon" aria-hidden="true" /><i>МИССИЯ</i></div>
            <h3>{title}</h3>
            <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
            <a href="#contact" aria-label={`Обсудить миссию ${title}`}>Выбрать <span>↗</span></a>
          </article>})}
        </div>
      </section>

      <section className="operation section" id="operation">
        <h2 className="operation-title reveal">Входим в проект<br /><em>без лишнего шума</em></h2>
        <p className="operation-description reveal">Каждый этап прозрачен: от первой разведки до итогового рапорта и плана следующего усиления.</p>
        <div className="operation-track-scroll">
          <div className="operation-steps">
            <svg className="operation-flow" viewBox="0 0 1000 190" preserveAspectRatio="none" aria-hidden="true"><path className="operation-flow-base" d="M50 100 C120 24 180 24 250 70 S380 160 450 105 S600 12 700 75 S850 158 950 95" pathLength="1" /><path className="operation-flow-runner" d="M50 100 C120 24 180 24 250 70 S380 160 450 105 S600 12 700 75 S850 158 950 95" pathLength="1" /></svg>
            <div className="operation-markers" aria-hidden="true">{operationMarkers.map(([left, top, label]) => <span className="operation-flow-marker" style={{ '--marker-left': left, '--marker-top': top } as CSSProperties} key={label}>{label}</span>)}</div>
            {operationSteps.map(([number, title, text]) => <div className="operation-step reveal" key={number}><span className="operation-mobile-marker" aria-hidden="true">{number}</span><h3>{title}</h3><p>{text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section why-section" id="why">
        <div className="section-title reveal"><h2>Почему бизнес<br /><em className="shimmer-text">выбирает нас</em></h2><p>Мы подключаемся как партнёр: видим общую задачу, держим темп и отвечаем за результат всей операции.</p></div>
        <div className="why-bento">
          {whyItems.map(([number, stat, label, text], index) => {
            const WhyIcon = whyIcons[index];
            return <article className={`why-card why-card-${index + 1}`} key={number}>
              <div><span>{number}</span><WhyIcon className="why-card-icon" aria-hidden="true" /></div><strong>{stat}</strong><h3>{label}</h3><p>{text}</p>
            </article>})}
        </div>
      </section>

      <section className="section team" id="team">
        <div className="section-kicker reveal"><span>05</span> Личный состав</div>
        <div className="section-title reveal"><h2>Вашу задачу ведут<br /><em className="shimmer-text">спецагенты</em></h2><div className="team-intro"><p>Не отделы на расстоянии, а единая оперативная группа.</p><div className="team-actions"><button className="team-toggle" type="button" onClick={toggleTeam} aria-expanded={teamExpanded}>{teamExpanded ? 'Собрать агентов' : 'Раскрыть личный состав'} <span>{teamExpanded ? '−' : '+'}</span></button></div></div></div>
        <div className={`agent-grid agent-stack ${teamExpanded ? 'is-expanded' : ''}`}>
          {agents.map((agent) => <AgentCard agent={agent} key={agent.id} />)}
        </div>
      </section>

      <section className="contact section" id="contact">
        <div className="contact-intro reveal"><div className="section-kicker"><span>06</span> Связь со штабом</div><h2>Передайте<br /><em className="shimmer-text contact-shimmer">задание</em></h2><p>Опишите задачу — координатор свяжется с вами, задаст несколько точных вопросов и предложит следующий шаг.</p><div className="secure"><i>✓</i><span>Заявка уходит координатору на почту<br /><small>Без согласия данные не отправляем · без рекламной рассылки</small></span></div></div>
        <div className="contact-panel reveal">
          <form className="brief-form" onSubmit={submitBrief}>
            <label><span>Ваше имя *</span><input name="name" required placeholder="Как к вам обращаться?" autoComplete="name" /></label>
            <label><span>Компания / бизнес / блог</span><input name="company" placeholder="Название или ссылка" /></label>
            <label><span>Телефон *</span><input name="phone" type="tel" required placeholder="+7 (___) ___-__-__" autoComplete="tel" /></label>
            <label><span>Telegram / VK</span><input name="username" placeholder="@username" /></label>
            <label className="wide"><span>Кратко о задаче</span><textarea name="message" rows={4} placeholder="Цель, сроки, вводные — всё, что уже известно" /></label>
            <label className="wide consent-check">
              <input type="checkbox" name="consent" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
              <span>Даю согласие на обработку персональных данных для ответа на заявку и оказания услуг. Рекламную рассылку не запрашиваю. Ознакомлен(а) с <Link href="/policies#privacy">Политикой</Link> и <Link href="/policies#consent">Согласием</Link>.</span>
            </label>
            <div className="form-footer"><p>Кнопка активна только после отметки согласия.</p><button className="button button-primary" type="submit" disabled={!consent}>Передать в штаб <span>↗</span></button></div>
            {formStatus !== 'idle' && <div className={formStatus === 'ok' ? 'form-success' : 'form-error'} role="status">{formMessage}</div>}
          </form>
          <div className="contact-details">
            <p><small>Телефон штаба</small><a href="tel:+79960263509">+7 (996) 026-35-09</a></p>
            <p><small>Почта</small><a href="mailto:smmsfera@mail.ru">smmsfera@mail.ru</a></p>
            <p><small>Офис</small><span>Иваново, Шереметевский пр-т, 1</span></p>
            <div className="contact-socials"><a className="social-vk" href="https://vk.com/smm_sfera" target="_blank" rel="noreferrer" aria-label="Написать в VK"><img src={asset('/assets/social-vk.webp')} alt="" loading="lazy" decoding="async" /></a><a className="social-telegram" href="https://t.me/+79960263509" target="_blank" rel="noreferrer" aria-label="Написать в Telegram"><img src={asset('/assets/social-telegram.webp')} alt="" loading="lazy" decoding="async" /></a></div>
          </div>
        </div>
      </section>

      {selectedMission !== null && <div className="dossier-modal" role="dialog" aria-modal="true" aria-labelledby="dossier-title" onMouseDown={(event) => event.target === event.currentTarget && setSelectedMission(null)}>
        <article className={`dossier-sheet mission-${missions[selectedMission].tone}`}>
          <button className="modal-close" type="button" onClick={() => setSelectedMission(null)} aria-label="Закрыть досье">×</button>
          <div className="dossier-code"><span>{missions[selectedMission].code}</span><b>Доступ разрешён</b></div>
          <small>{missions[selectedMission].sector}</small>
          <h2 id="dossier-title">{missions[selectedMission].title}</h2>
          <div className="dossier-layout"><div><span>Задача</span><p>{missions[selectedMission].objective}</p></div><div><span>Ход операции</span><ul>{missions[selectedMission].actions.map((action) => <li key={action}>{action}</li>)}</ul></div></div>
          <div className="dossier-outcome"><strong>{missions[selectedMission].stat}</strong><div><span>{missions[selectedMission].label}</span><p>{missions[selectedMission].result}</p></div></div>
          <a href="#contact" onClick={() => setSelectedMission(null)}>Обсудить похожую миссию <span>↗</span></a>
        </article>
      </div>}

      <footer className="site-footer reveal">
        <a className="footer-brand" href="#top"><img src={asset('/assets/logo-red.webp')} alt="" loading="lazy" decoding="async" /><span>СММ СФЕРА</span></a>
        <div><span>Разделы</span><a href="#cases">Архив операций</a><a href="#services">Наш арсенал</a><a href="#operation">Протокол операции</a><a href="#why">Почему выбирают нас</a></div>
        <div><span>Агентство</span><a href="#team">Спецагенты</a><a href="#contact">Передать задание</a><Link href="/policies">Политики</Link><a href="tel:+79960263509">+7 (996) 026-35-09</a><a href="mailto:smmsfera@mail.ru">smmsfera@mail.ru</a></div>
        <p>© 2026 СММ СФЕРА<br />ИП Соркина Радмила Вячеславовна<br />ИНН 450101448176 · ОГРНИП 310370204700173</p>
      </footer>
    </main>
  );
}
