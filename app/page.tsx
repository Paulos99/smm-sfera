'use client';

import { type CSSProperties, FormEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Award, Bot, CalendarClock, ChartNoAxesColumnDecreasing, ChartNoAxesCombined, Clapperboard, GraduationCap, Handshake, Megaphone, Route, Share2, ShieldAlert, ShoppingCart, Smartphone, Sparkles, Target, TrendingUp, UsersRound, Video, type LucideIcon } from 'lucide-react';
import Lenis from 'lenis';
import { asset } from '@/lib/asset';

const missions = [
  { code: 'MSN—041', sector: 'FASHION / RETAIL', title: 'Вывели новый бренд из тени', text: 'С нуля собрали позиционирование, контент-систему и трафик до первой тысячи целевых заявок.', stat: '+270%', label: 'рост охватов', tone: 'red', objective: 'Запустить новый fashion-бренд и занять заметное место в ленте целевой аудитории.', actions: ['Стратегия запуска', 'Визуальная система', 'Таргет и посевы'], result: 'Стабильный поток заявок и узнаваемый образ бренда за первые 90 дней.' },
  { code: 'MSN—087', sector: 'BEAUTY / E-COM', title: 'Захватили внимание аудитории', text: 'Перезапустили визуальный язык, рубрикатор и influence-направление для масштабирования продаж.', stat: '+185%', label: 'к вовлечённости', tone: 'blue', objective: 'Обновить коммуникацию beauty-проекта и связать контент с продажами.', actions: ['Контент-платформа', 'Influence-маркетинг', 'E-com аналитика'], result: 'Рост вовлечённости, сохранений и переходов в карточки товаров.' },
  { code: 'MSN—112', sector: 'B2B / TECH', title: 'Превратили сложное в интересное', text: 'Собрали экспертную медиа-машину: от стратегии Telegram до лидогенерации и аналитики.', stat: '×3,2', label: 'рост лидов', tone: 'yellow', objective: 'Объяснить сложный технологичный продукт и увеличить число квалифицированных обращений.', actions: ['Экспертный Telegram', 'Видео-разборы', 'Лидогенерация'], result: 'Контент стал самостоятельным каналом привлечения B2B-лидов.' },
  { code: 'MSN—126', sector: 'FOOD / HORECA', title: 'Собрали очередь до открытия', text: 'Провели локальную разведку, прогрели район и превратили запуск новой точки в городское событие.', stat: '4,8K', label: 'гостей за месяц', tone: 'blue', objective: 'Запустить новую точку без зависимости от наружной рекламы.', actions: ['Локальный контент', 'UGC-механика', 'Гео-таргет'], result: 'План первого месяца был выполнен уже на девятнадцатый день.' },
  { code: 'MSN—153', sector: 'REAL ESTATE', title: 'Сделали метры желанными', text: 'Перевели язык застройщика с квадратных метров на сценарии жизни и построили воронку из соцсетей.', stat: '+64%', label: 'целевых лидов', tone: 'yellow', objective: 'Увеличить долю качественных обращений на старте нового жилого комплекса.', actions: ['Коммуникационная идея', '3D и motion', 'Performance-воронка'], result: 'Снижение стоимости квалифицированного обращения при росте объёма.' },
  { code: 'MSN—204', sector: 'EDTECH / HR', title: 'Завербовали лучших', text: 'Создали карьерное медиа, которое показало команду изнутри и ускорило набор редких специалистов.', stat: '×2,4', label: 'откликов', tone: 'red', objective: 'Повысить привлекательность работодателя среди senior-специалистов.', actions: ['HR-бренд платформа', 'Герои команды', 'Контент-рекрутинг'], result: 'Больше релевантных откликов и короче цикл найма.' },
];

const signals:Array<[string,string]> = [
  ['01', 'Социальные сети не приводят клиентов'],
  ['02', 'Контент выходит нерегулярно'],
  ['03', 'Нет единой стратегии продвижения'],
  ['04', 'Бренд выглядит слабее конкурентов'],
  ['05', 'Команде не хватает ресурсов на маркетинг'],
  ['06', 'Нет понятной аналитики и контроля'],
];

const arsenalMissions:Array<[string,string,string[]]> = [
  ['01', 'SMM', ['Ведение социальных сетей', 'Контент-план и публикации', 'Аналитика и развитие']],
  ['02', 'Content production', ['Фото- и видеоконтент', 'Монтаж коротких роликов', 'Motion и AI-контент']],
  ['03', 'Продвижение', ['Блогеры и UGC', 'Посевы в сообществах', 'Таргет и коллаборации']],
  ['04', 'Marketplace', ['Карточки товаров', 'Rich-контент', 'Фото и видео']],
  ['05', 'Стратегия', ['Маркетинговая стратегия', 'Исследования и аналитика', 'Консалтинг']],
  ['06', 'Обучение', ['Корпоративные программы', 'AI-инструменты', 'SMM для команды']],
  ['07', 'Digital', ['Сайты и спецпроекты', 'CRM и автоматизация', 'Чат-боты и воронки']],
];

const whyItems:Array<[string,string,string,string]> = [
  ['01', '10+', 'лет маркетингового опыта', 'За плечами команды — сотни запусков и системная работа с бизнесом.'],
  ['02', 'Данные', 'вместо догадок', 'Каждое решение проверяем цифрами, гипотезами и понятными KPI.'],
  ['03', 'In-house', 'собственный продакшн', 'Создаём стратегию, дизайн, тексты, видео и motion внутри одной команды.'],
  ['04', 'AI', 'с пользой для результата', 'Внедряем технологии там, где они ускоряют работу и усиливают идею.'],
  ['05', 'ROI', 'фокус на бизнесе', 'Смотрим не только на охваты, а на заявки, продажи и долгосрочный рост.'],
  ['06', '24/7', 'сопровождение миссии', 'Остаёмся рядом от первой разведки до отчёта и следующего шага.'],
];

const signalIcons:LucideIcon[] = [Smartphone, CalendarClock, Route, ShieldAlert, UsersRound, ChartNoAxesColumnDecreasing];
const arsenalIcons:LucideIcon[] = [Share2, Clapperboard, Megaphone, ShoppingCart, Target, GraduationCap, Bot];
const whyIcons:LucideIcon[] = [Award, ChartNoAxesCombined, Video, Sparkles, TrendingUp, Handshake];
const whyCardPositions = [
  { x:2.5, y:0 }, { x:8.5, y:0 }, { x:2, y:1 },
  { x:6, y:1 }, { x:10, y:1 }, { x:6, y:2 },
];

const clientLogos = Array.from({ length: 13 }, (_, index) => asset(`/assets/clients/client-${String(index + 1).padStart(2, '0')}.png`));

const arsenalSocialLogos = [
  asset('/assets/social-yandex-business.png'),
  asset('/assets/social-ok.png'),
  asset('/assets/social-telegram.png'),
  asset('/assets/social-max.png'),
  asset('/assets/social-shorts.png'),
  asset('/assets/social-wibes.png'),
  asset('/assets/social-vk.png'),
];

const agents = [
  { id: 'A—001', role: 'Основатель агентства', name: 'Радмила', image: asset('/assets/team/radmila.png'), description: 'Командир штаба СММ СФЕРА. 20+ лет в маркетинге, множество бизнес-стартапов и стратегическое чутьё, которое превращает идеи в работающие компании.' },
  { id: 'A—014', role: 'Digital-проекты и арт-дирекшн', name: 'Дмитрий', image: asset('/assets/team/dmitry.png'), description: 'Руководит крупными digital-миссиями и визуальным направлением штаба. 5+ лет в дизайне; держит под контролем проект от первого макета до запуска.' },
  { id: 'A—007', role: 'Видеорежиссура и трафик', name: 'Анна', image: asset('/assets/team/anna.png'), description: 'Режиссирует съёмки, монтирует истории и наводит таргет точно в аудиторию. 5+ лет в маркетинге, основатель внутренней миссии «Выгодный Китай».' },
  { id: 'A—010', role: 'Управляющая агентством', name: 'Алина', image: asset('/assets/team/alina.png'), description: 'Координирует операции, аналитику, отчётность, стратегии и воронки. 10+ лет опыта, автор образовательных проектов «СММ ШКОЛА» и «НЕЙРОСФЕРА».' },
  { id: 'A—021', role: 'Influence и продвижение', name: 'Александра', image: asset('/assets/team/alexandra.png'), description: 'Разворачивает рекламные операции в соцсетях: блогеры, посевы, UGC и коллаборации. Её партнёрская база помогает собрать эффективную воронку для любого бизнеса.' },
  { id: 'A—028', role: 'Полевой фото- и видеоагент', name: 'Диана', image: asset('/assets/team/diana.png'), description: 'Ловит живые кадры прямо в поле, превращает события и процессы бизнеса в убедительные визуальные истории. Быстро собирает контент под любой формат и площадку.' },
  { id: 'A—034', role: 'Мобильный продакшн', name: 'Варвара', image: asset('/assets/team/varvara.png'), description: 'Универсальный агент съёмочной группы: фото, вертикальное видео, backstage и оперативный монтаж. Находит сильный ракурс даже в самых сложных вводных.' },
  { id: 'A—040', role: 'Яндекс.Бизнес и реклама', name: 'Татьяна', image: asset('/assets/team/tatiana.png'), description: 'Навигатор по рекламной экосистеме Яндекса с опытом 20+ лет. Усиливает карточки бизнеса, локальное присутствие и кампании так, чтобы бренд находили именно его клиенты.' },
];

const radarTargets = [
  ['Кофейня', '18%', '21%'], ['Ритейл', '67%', '17%'], ['IT-сервис', '78%', '58%'], ['Fashion', '23%', '71%'],
  ['HoReCa', '47%', '31%'], ['Завод', '61%', '76%'], ['Недвижимость', '34%', '48%'], ['EdTech', '83%', '33%'],
];

const painTargets = [
  { label: 'Нет заявок', left: '50%', top: '13%' },
  { label: 'Реклама не окупается', left: '78%', top: '25%' },
  { label: 'Бренд не замечают', left: '86%', top: '52%' },
  { label: 'Контент не продаёт', left: '69%', top: '80%' },
  { label: 'Охваты падают', left: '31%', top: '80%' },
  { label: 'Нет стратегии', left: '14%', top: '52%' },
  { label: 'Рост остановился', left: '22%', top: '25%' },
];

function ArsenalLogoRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.closest('.arsenal-card') as HTMLElement | null;
    const context = canvas?.getContext('2d');
    if (!canvas || !section || !context) return;

    type Body = { x:number; y:number; vx:number; vy:number; radius:number; angle:number; spin:number; image:HTMLImageElement };
    type Obstacle = { left:number; top:number; right:number; bottom:number };
    const images = arsenalSocialLogos.map((source) => {
      const image = new Image();
      image.src = source;
      return image;
    });
    let bodies:Body[] = [];
    let obstacles:Obstacle[] = [];
    let width = 1;
    let height = 1;
    let ratio = 1;
    let spawned = 0;
    let spawnClock = 0;
    let lastTime = performance.now();
    let frame = 0;
    let running = false;

    const resize = () => {
      const sectionRect = section.getBoundingClientRect();
      width = Math.max(1, sectionRect.width);
      height = Math.max(1, sectionRect.height);
      ratio = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      obstacles = Array.from(section.querySelectorAll<HTMLElement>('.arsenal-card')).map((card) => {
        const rect = card.getBoundingClientRect();
        return { left:rect.left - sectionRect.left, top:rect.top - sectionRect.top, right:rect.right - sectionRect.left, bottom:rect.bottom - sectionRect.top };
      });
      bodies = [];
      spawned = 0;
      spawnClock = 0;
    };

    const spawnBody = () => {
      const radius = width < 380 ? 10 + Math.random() * 7 : 12 + Math.random() * 9;
      bodies.push({
        x:radius + Math.random() * Math.max(1, width - radius * 2),
        y:-radius - Math.random() * 70,
        vx:(Math.random() - .5) * 54,
        vy:25 + Math.random() * 44,
        radius,
        angle:(Math.random() - .5) * .55,
        spin:(Math.random() - .5) * 1.25,
        image:images[spawned % images.length],
      });
      spawned += 1;
    };

    const collideWithObstacle = (body:Body, obstacle:Obstacle) => {
      const closestX = Math.max(obstacle.left, Math.min(body.x, obstacle.right));
      const closestY = Math.max(obstacle.top, Math.min(body.y, obstacle.bottom));
      const deltaX = body.x - closestX;
      const deltaY = body.y - closestY;
      const distanceSquared = deltaX * deltaX + deltaY * deltaY;
      if (distanceSquared >= body.radius * body.radius) return;
      const distance = Math.sqrt(distanceSquared);
      if (distance > .001) {
        const overlap = body.radius - distance;
        const normalX = deltaX / distance;
        const normalY = deltaY / distance;
        body.x += normalX * overlap;
        body.y += normalY * overlap;
        const velocityAlongNormal = body.vx * normalX + body.vy * normalY;
        if (velocityAlongNormal < 0) {
          body.vx -= 1.28 * velocityAlongNormal * normalX;
          body.vy -= 1.28 * velocityAlongNormal * normalY;
        }
      } else {
        body.y = obstacle.top - body.radius;
        body.vy *= -.2;
      }
      body.vx *= .9;
      body.spin *= .88;
    };

    const simulate = (delta:number) => {
      const steps = 2;
      const step = delta / steps;
      for (let pass = 0; pass < steps; pass += 1) {
        bodies.forEach((body) => {
          body.vy += 620 * step;
          body.x += body.vx * step;
          body.y += body.vy * step;
          body.angle += body.spin * step;
          if (body.x - body.radius < 0) { body.x = body.radius; body.vx = Math.abs(body.vx) * .42; body.spin *= -.7; }
          if (body.x + body.radius > width) { body.x = width - body.radius; body.vx = -Math.abs(body.vx) * .42; body.spin *= -.7; }
          obstacles.forEach((obstacle) => collideWithObstacle(body, obstacle));
          if (body.y + body.radius > height) {
            body.y = height - body.radius;
            body.vy = Math.abs(body.vy) > 28 ? -Math.abs(body.vy) * .18 : 0;
            body.vx *= .86;
            body.spin *= .8;
          }
        });

        for (let first = 0; first < bodies.length; first += 1) {
          for (let second = first + 1; second < bodies.length; second += 1) {
            const a = bodies[first];
            const b = bodies[second];
            const deltaX = b.x - a.x;
            const deltaY = b.y - a.y;
            const minimum = a.radius + b.radius;
            const distanceSquared = deltaX * deltaX + deltaY * deltaY;
            if (distanceSquared <= .001 || distanceSquared >= minimum * minimum) continue;
            const distance = Math.sqrt(distanceSquared);
            const normalX = deltaX / distance;
            const normalY = deltaY / distance;
            const overlap = (minimum - distance) * .5;
            a.x -= normalX * overlap;
            a.y -= normalY * overlap;
            b.x += normalX * overlap;
            b.y += normalY * overlap;
            const relativeVelocity = (b.vx - a.vx) * normalX + (b.vy - a.vy) * normalY;
            if (relativeVelocity < 0) {
              const impulse = -relativeVelocity * .56;
              a.vx -= impulse * normalX;
              a.vy -= impulse * normalY;
              b.vx += impulse * normalX;
              b.vy += impulse * normalY;
            }
          }
        }
      }
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      bodies.forEach((body) => {
        if (!body.image.complete) return;
        context.save();
        context.translate(body.x, body.y);
        context.rotate(body.angle);
        context.globalAlpha = .82;
        context.shadowColor = 'rgba(0,0,0,.34)';
        context.shadowBlur = 14;
        context.shadowOffsetY = 7;
        context.drawImage(body.image, -body.radius, -body.radius, body.radius * 2, body.radius * 2);
        context.restore();
      });
    };

    const tick = (time:number) => {
      if (!running) return;
      const delta = Math.min(.03, Math.max(.001, (time - lastTime) / 1000));
      lastTime = time;
      const targetCount = width < 380 ? 24 : 38;
      spawnClock += delta;
      while (spawnClock >= .14 && spawned < targetCount) {
        spawnClock -= .14;
        spawnBody();
      }
      simulate(delta);
      draw();
      frame = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTime = performance.now();
      frame = window.requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      window.cancelAnimationFrame(frame);
    };

    const visibilityObserver = new IntersectionObserver(([entry]) => entry.isIntersecting ? start() : stop(), { threshold:.08 });
    const resizeObserver = new ResizeObserver(resize);
    resize();
    visibilityObserver.observe(section);
    resizeObserver.observe(section);
    return () => {
      stop();
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="arsenal-physics-canvas" aria-hidden="true" />;
}

export default function Home() {
  const [formStatus, setFormStatus] = useState<'idle' | 'ok' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [selectedMission, setSelectedMission] = useState<number | null>(null);
  const [teamExpanded, setTeamExpanded] = useState(false);
  const [activeSignals, setActiveSignals] = useState<number[]>([]);
  const [radarActive, setRadarActive] = useState([0, 4]);
  const [painTarget, setPainTarget] = useState(0);
  const [shotTarget, setShotTarget] = useState<number | null>(null);
  const [whyActive, setWhyActive] = useState<number | null>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = 'light';
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible'));
    }, { threshold: .12 });
    document.querySelectorAll('.reveal, .arsenal-section').forEach((node) => observer.observe(node));
    const radarTimer = window.setInterval(() => {
      const first = Math.floor(Math.random() * radarTargets.length);
      let second = Math.floor(Math.random() * radarTargets.length);
      if (second === first) second = (second + 3) % radarTargets.length;
      setRadarActive([first, second]);
    }, 1450);
    return () => {
      observer.disconnect();
      window.clearInterval(radarTimer);
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
    setShotTarget(null);
    const fireTimer = window.setTimeout(() => setShotTarget(painTarget), 2850);
    const nextTargetTimer = window.setTimeout(() => {
      setShotTarget(null);
      setPainTarget((current) => (current + 1) % painTargets.length);
    }, 4400);
    return () => {
      window.clearTimeout(fireTimer);
      window.clearTimeout(nextTargetTimer);
    };
  }, [painTarget]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(pointer: fine)');
    if (prefersReducedMotion.matches || !finePointer.matches) return;
    const lenis = new Lenis({
      autoRaf:true,
      lerp:.115,
      wheelMultiplier:.78,
      smoothWheel:true,
      syncTouch:false,
      anchors:{ offset:-96 },
    });
    return () => lenis.destroy();
  }, []);

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
    const telegram = (window as Window & { TELEGRAM_CONFIG?: { BOT_TOKEN?: string; CHAT_ID?: string } }).TELEGRAM_CONFIG;
    const token = telegram?.BOT_TOKEN?.trim();
    const chatId = telegram?.CHAT_ID?.trim();
    if (!token || !chatId || token === 'YOUR_BOT_TOKEN' || chatId === 'YOUR_CHAT_ID') {
      setFormStatus('error');
      setFormMessage('Форма пока не подключена к Telegram. Напишите на smmsfera2026@mail.ru или по телефону +7 (920) 365-61-33.');
      return;
    }
    const text = [
      'Заявка с сайта СММ СФЕРА',
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      company ? `Компания: ${company}` : '',
      username ? `Telegram/VK: ${username}` : '',
      message ? `Задача: ${message}` : '',
      `Согласие на обработку ПД: да (${new Date().toISOString()})`,
    ].filter(Boolean).join('\n');
    try {
      const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text }),
      });
      if (!response.ok) throw new Error('telegram');
      setFormStatus('ok');
      setFormMessage('Задание принято. Координатор выйдет на связь.');
      form.reset();
      setConsent(false);
    } catch {
      setFormStatus('error');
      setFormMessage('Не удалось отправить заявку. Напишите на smmsfera2026@mail.ru.');
    }
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="СММ СФЕРА — на главную"><img src={asset('/assets/logo-red.png')} alt="" /><span className="brand-wordmark">СММ СФЕРА</span></a>
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
          <div className="hero-logo-pulse"><img src={asset('/assets/logo-red.png')} alt="СММ СФЕРА" /></div>
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
                {radarTargets.map(([name, left, top], index) => <span className={`radar-target is-logo ${radarActive.includes(index) ? 'is-detected' : ''}`} style={{ left, top }} key={`${name}-${index}`}><img src={clientLogos[index % clientLogos.length]} alt="" /></span>)}
              </div>
              <div className="intel-stats">
                <small>Оперативная статистика / 2026</small>
                <div><strong>92%</strong><span>клиентов продолжают работу после первой миссии</span></div>
                <ul><li>Погружаемся в бизнес</li><li>Говорим на языке цифр</li><li>Работаем одной командой</li></ul>
              </div>
            </aside>
            <div className="case-bento">
              {missions.map((mission, index) => <button className={`case-bento-card case-tone-${mission.tone} reveal`} type="button" onClick={() => setSelectedMission(index)} key={mission.code} style={{ transitionDelay: `${index * 60}ms` }}>
                <div><span>{mission.code}</span><small>{mission.sector}</small></div>
                <strong>{mission.title}</strong>
                <p>{mission.text}</p>
                <div className="case-bento-result"><b>{mission.stat}</b><span>{mission.label}</span><i>↗</i></div>
              </button>)}
            </div>
          </div>
          <div className="client-logo-marquee" aria-label="Логотипы клиентов"><div className="client-logo-track">{[0, 1].map((copy) => <div className="client-logo-segment" aria-hidden="true" key={copy}>{clientLogos.map((logo, index) => <span key={`${copy}-${index}`}><img src={logo} alt="" /></span>)}</div>)}</div></div>
        </div>
      </section>

      <section className="section arsenal-section" id="services">
        <ArsenalLogoRain />
        <div className="section-title reveal"><h2>Наш арсенал — <em className="shimmer-text">7 миссий</em><br />для роста бизнеса</h2><p>Можно выбрать отдельную задачу или собрать из миссий единый маршрут продвижения.</p></div>
        <div className="arsenal-bento">
          {arsenalMissions.map(([number, title, items], index) => {
            const ArsenalIcon = arsenalIcons[index];
            return <article className={`arsenal-card reveal arsenal-card-${index + 1}`} key={number} style={{ transitionDelay: `${index * 55}ms` }}>
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
            <div className="operation-markers" aria-hidden="true">{[['5%','52.6%','01'],['25%','36.8%','02'],['45%','55.3%','03'],['70%','39.5%','04'],['95%','50%','05']].map(([left,top,label]) => <span className="operation-flow-marker" style={{ '--marker-left': left, '--marker-top': top } as CSSProperties} key={label}>{label}</span>)}</div>
            {[['01','Разведка','Бриф, аудит и интервью. Находим настоящую задачу за симптомами.'],['02','План операции','Собираем стратегию, команду, KPI и медиаплан.'],['03','Выход в поле','Запускаем контент, трафик и работу с аудиторией.'],['04','Контроль','Еженедельно сверяемся с цифрами и усиливаем связки.'],['05','Рапорт','Фиксируем результат и план следующей миссии.']].map(([number,title,text],index)=><div className="operation-step reveal" key={number} style={{ transitionDelay:`${index*70}ms` }}><span className="operation-mobile-marker" aria-hidden="true">{number}</span><h3>{title}</h3><p>{text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section why-section" id="why">
        <div className="section-title reveal"><h2>Почему бизнес<br /><em className="shimmer-text">выбирает нас</em></h2><p>Мы подключаемся как партнёр: видим общую задачу, держим темп и отвечаем за результат всей операции.</p></div>
        <div className={`why-bento ${whyActive !== null ? 'is-repelling' : ''}`}>
          {whyItems.map(([number, stat, label, text], index) => {
            const WhyIcon = whyIcons[index];
            const activePosition = whyActive === null ? null : whyCardPositions[whyActive];
            const position = whyCardPositions[index];
            const directionX = activePosition ? Math.sign(position.x - activePosition.x) || (index < whyActive! ? -1 : 1) : 0;
            const directionY = activePosition ? Math.sign(position.y - activePosition.y) || (index % 2 === 0 ? -1 : 1) : 0;
            const distance = whyActive === null ? 0 : Math.abs(index - whyActive);
            const isActive = whyActive === index;
            const motionStyle = {
              '--why-x': `${isActive ? 0 : directionX * Math.max(32, 62 - distance * 6)}px`,
              '--why-y': `${isActive ? 0 : directionY * Math.max(10, 22 - distance * 2)}px`,
              '--why-ry': `${isActive ? 0 : directionX * -Math.max(5, 14 - distance)}deg`,
              '--why-rx': `${isActive ? 0 : directionY * Math.max(2, 7 - distance * .7)}deg`,
              '--why-scale': whyActive === null ? 1 : isActive ? 1.075 : .93,
            } as CSSProperties;
            return <article
              className={`why-card why-card-${index + 1} ${isActive ? 'is-repulsion-active' : ''}`}
              key={number}
              style={motionStyle}
              onMouseEnter={() => setWhyActive(index)}
              onMouseLeave={() => setWhyActive(null)}
            >
              <div><span>{number}</span><WhyIcon className="why-card-icon" aria-hidden="true" /></div><strong>{stat}</strong><h3>{label}</h3><p>{text}</p>
            </article>})}
        </div>
      </section>

      <section className="section team" id="team">
        <div className="section-kicker reveal"><span>05</span> Личный состав</div>
        <div className="section-title reveal"><h2>Вашу задачу ведут<br /><em className="shimmer-text">спецагенты</em></h2><div className="team-intro"><p>Не отделы на расстоянии, а единая оперативная группа.</p><div className="team-actions"><button className="team-toggle" type="button" onClick={() => setTeamExpanded((value) => !value)} aria-expanded={teamExpanded}>{teamExpanded ? 'Собрать агентов' : 'Раскрыть личный состав'} <span>{teamExpanded ? '−' : '+'}</span></button><a className="team-join" href="#contact">Стать частью СПЕЦАГЕНСТВА <span>↗</span></a></div></div></div>
        <div className={`agent-grid agent-stack ${teamExpanded ? 'is-expanded' : ''}`}>
          {agents.map((agent,index)=><article className="team-card reveal" key={agent.id} style={{ transitionDelay:`${index*90}ms` }}><span className="agent-pin" aria-hidden="true" /><div className="team-photo"><img src={agent.image} alt={agent.name} /><span>{agent.id}</span><i /></div><div className="team-card-copy"><small>{agent.role}</small><h3>{agent.name}</h3><p>{agent.description}</p></div></article>)}
        </div>
      </section>

      <section className="contact section" id="contact">
        <div className="contact-intro reveal"><div className="section-kicker"><span>06</span> Связь со штабом</div><h2>Передайте<br /><em className="shimmer-text contact-shimmer">задание</em></h2><p>Опишите задачу — координатор свяжется с вами, задаст несколько точных вопросов и предложит следующий шаг.</p><div className="secure"><i>✓</i><span>Заявка уходит координатору<br /><small>Без согласия данные не отправляем</small></span></div></div>
        <div className="contact-panel reveal">
          <form className="brief-form" onSubmit={submitBrief}>
            <label><span>Ваше имя *</span><input name="name" required placeholder="Как к вам обращаться?" autoComplete="name" /></label>
            <label><span>Компания / бизнес / блог</span><input name="company" placeholder="Название или ссылка" /></label>
            <label><span>Телефон *</span><input name="phone" type="tel" required placeholder="+7 (___) ___-__-__" autoComplete="tel" /></label>
            <label><span>Telegram / VK</span><input name="username" placeholder="@username" /></label>
            <label className="wide"><span>Кратко о задаче</span><textarea name="message" rows={4} placeholder="Цель, сроки, вводные — всё, что уже известно" /></label>
            <label className="wide consent-check">
              <input type="checkbox" name="consent" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
              <span>Даю согласие на обработку персональных данных. Ознакомлен(а) с <Link href="/policies#privacy">Политикой</Link> и <Link href="/policies#consent">Согласием</Link>.</span>
            </label>
            <div className="form-footer"><p>Кнопка активна только после отметки согласия.</p><button className="button button-primary" type="submit" disabled={!consent}>Передать в штаб <span>↗</span></button></div>
            {formStatus !== 'idle' && <div className={formStatus === 'ok' ? 'form-success' : 'form-error'} role="status">{formMessage}</div>}
          </form>
          <div className="contact-details">
            <p><small>Телефон штаба</small><a href="tel:+79203656133">+7 (920) 365-61-33</a></p>
            <p><small>Адрес агентства</small><span>Иваново, Шереметевский пр-т, 1</span></p>
            <div className="contact-socials"><a className="social-vk" href="https://vk.com/smm_sfera" target="_blank" rel="noreferrer" aria-label="Написать в VK"><img src={asset('/assets/social-vk.png')} alt="" /></a><a className="social-telegram" href="https://t.me/+79203656133" target="_blank" rel="noreferrer" aria-label="Написать в Telegram"><img src={asset('/assets/social-telegram.png')} alt="" /></a></div>
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
        <a className="footer-brand" href="#top"><img src={asset('/assets/logo-red.png')} alt="" /><span>СММ СФЕРА</span></a>
        <div><span>Разделы</span><a href="#cases">Архив операций</a><a href="#services">Наш арсенал</a><a href="#operation">Протокол операции</a><a href="#why">Почему выбирают нас</a></div>
        <div><span>Агентство</span><a href="#team">Спецагенты</a><a href="#contact">Передать задание</a><Link href="/policies">Политики</Link><a href="tel:+79203656133">+7 (920) 365-61-33</a></div>
        <p>© 2026 СММ СФЕРА<br />ИП Соркина Радмила Вячеславовна<br />ИНН 450101448176 · ОГРНИП 310370204700173</p>
      </footer>
    </main>
  );
}
