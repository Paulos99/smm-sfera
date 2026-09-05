'use client';

import { useEffect, useRef } from 'react';
import { arsenalSocialLogos } from '@/data/home';
import { isWeakDevice } from '@/lib/weakDevice';

type Body = { x: number; y: number; vx: number; vy: number; radius: number; angle: number; spin: number; image: HTMLImageElement };

export default function ArsenalLogoRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const card = canvas?.closest('.arsenal-card') as HTMLElement | null;
    const context = canvas?.getContext('2d');
    if (!canvas || !card || !context) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (isWeakDevice()) return;

    const images = arsenalSocialLogos.map((source) => {
      const image = new Image();
      image.src = source;
      return image;
    });
    let bodies: Body[] = [];
    let width = 1;
    let height = 1;
    let spawned = 0;
    let spawnClock = 0;
    let lastTime = performance.now();
    let frame = 0;
    let running = false;

    const resize = () => {
      canvas.style.removeProperty('width');
      canvas.style.removeProperty('height');
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const ratio = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      bodies = [];
      spawned = 0;
      spawnClock = 0;
    };

    const spawnBody = () => {
      const radius = width < 320 ? 14 + Math.random() * 8 : 16 + Math.random() * 12;
      bodies.push({
        x: radius + Math.random() * Math.max(1, width - radius * 2),
        y: -radius - Math.random() * 80,
        vx: (Math.random() - 0.5) * 36,
        vy: 18 + Math.random() * 28,
        radius,
        angle: (Math.random() - 0.5) * 0.6,
        spin: (Math.random() - 0.5) * 1.4,
        image: images[spawned % images.length],
      });
      spawned += 1;
    };

    const simulate = (delta: number) => {
      const steps = 2;
      const step = delta / steps;
      for (let pass = 0; pass < steps; pass += 1) {
        bodies.forEach((body) => {
          body.vy += 780 * step;
          body.x += body.vx * step;
          body.y += body.vy * step;
          body.angle += body.spin * step;
          if (body.x - body.radius < 0) { body.x = body.radius; body.vx = Math.abs(body.vx) * 0.28; body.spin *= -0.65; }
          if (body.x + body.radius > width) { body.x = width - body.radius; body.vx = -Math.abs(body.vx) * 0.28; body.spin *= -0.65; }
          if (body.y + body.radius > height) {
            body.y = height - body.radius;
            body.vy = Math.abs(body.vy) > 36 ? -Math.abs(body.vy) * 0.14 : 0;
            body.vx *= 0.72;
            body.spin *= 0.7;
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
            if (distanceSquared <= 0.001 || distanceSquared >= minimum * minimum) continue;
            const distance = Math.sqrt(distanceSquared);
            const normalX = deltaX / distance;
            const normalY = deltaY / distance;
            const overlap = (minimum - distance) * 0.5;
            a.x -= normalX * overlap;
            a.y -= normalY * overlap;
            b.x += normalX * overlap;
            b.y += normalY * overlap;
            const relativeVelocity = (b.vx - a.vx) * normalX + (b.vy - a.vy) * normalY;
            if (relativeVelocity < 0) {
              const impulse = -relativeVelocity * 0.48;
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
        context.globalAlpha = 0.92;
        const sourceWidth = body.image.naturalWidth || body.image.width || 1;
        const sourceHeight = body.image.naturalHeight || body.image.height || 1;
        const box = body.radius * 2;
        const scale = Math.min(box / sourceWidth, box / sourceHeight);
        const drawWidth = sourceWidth * scale;
        const drawHeight = sourceHeight * scale;
        context.drawImage(body.image, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
        context.restore();
      });
    };

    const tick = (time: number) => {
      if (!running) return;
      if (document.hidden) {
        lastTime = time;
        frame = window.requestAnimationFrame(tick);
        return;
      }
      const delta = Math.min(0.03, Math.max(0.001, (time - lastTime) / 1000));
      lastTime = time;
      const targetCount = width < 320 ? 28 : 42;
      spawnClock += delta;
      while (spawnClock >= 0.055 && spawned < targetCount) {
        spawnClock -= 0.055;
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

    const visibilityObserver = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), { threshold: 0.12 });
    const resizeObserver = new ResizeObserver(resize);
    resize();
    visibilityObserver.observe(card);
    resizeObserver.observe(card);
    return () => {
      stop();
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="arsenal-physics-canvas" aria-hidden="true" />;
}
