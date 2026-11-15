'use client';

import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
  color: string;
};

const COLORS = ['#A8B4C0', '#8396AB', '#D3D9DF', '#5B6B7F'];

// 1 = original particle count; 1.5 = 50% more particles.
const PARTICLE_DENSITY = 2;

// Control background density here.
const PARTICLE_SETTINGS = {
  mobile: { minCount: 45, maxCount: 65, areaPerParticle: 6000, connectionDistance: 105 },
  tablet: { minCount: 70, maxCount: 100, areaPerParticle: 8500, connectionDistance: 125 },
  desktop: { minCount: 105, maxCount: 165, areaPerParticle: 8200, connectionDistance: 140 },
} as const;

export default function InteractiveParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const pointer = {
      x: -10000,
      y: -10000,
      active: false,
    };

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let animationId = 0;
    let connectionDistance: number = PARTICLE_SETTINGS.desktop.connectionDistance;

    const createParticles = () => {
      const settings =
        width < 640
          ? PARTICLE_SETTINGS.mobile
          : width < 1024
            ? PARTICLE_SETTINGS.tablet
            : PARTICLE_SETTINGS.desktop;

      const baseCount = Math.min(
        Math.max(Math.floor((width * height) / settings.areaPerParticle), settings.minCount),
        settings.maxCount,
      );
      const count = Math.round(baseCount * PARTICLE_DENSITY);

      connectionDistance = settings.connectionDistance;

      particles = Array.from({ length: count }, () => {
        const x = Math.random() * width;
        const y = Math.random() * height;

        return {
          x,
          y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: Math.random() * 1.3 + 0.7,
          phase: Math.random() * Math.PI * 2,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        };
      });
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      // More particles, with slightly softer lines to avoid visual clutter.
      const maxDistanceSquared = connectionDistance * connectionDistance;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distanceSquared = dx * dx + dy * dy;

          // Avoid sqrt for pairs that are too far apart.
          if (distanceSquared < maxDistanceSquared) {
            const distance = Math.sqrt(distanceSquared);
            const opacity = (1 - distance / connectionDistance) * 0.13;

            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.strokeStyle = `rgba(168,180,192,${opacity})`;
            context.lineWidth = 0.65;
            context.stroke();
          }
        }
      }

      particles.forEach((particle) => {
        const pulse = 0.65 + Math.sin(frame * 0.012 + particle.phase) * 0.2;

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = particle.color;
        context.globalAlpha = pulse;
        context.fill();
      });

      context.globalAlpha = 1;
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const nextWidth = bounds.width;
      const nextHeight = bounds.height;

      if (nextWidth <= 0 || nextHeight <= 0) return;

      // ResizeObserver can fire more than once; don't randomize the particles unnecessarily.
      if (width === nextWidth && height === nextHeight) return;

      width = nextWidth;
      height = nextHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      createParticles();
      draw();
    };

    const animate = () => {
      frame += 1;

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > width) {
          particle.vx *= -1;
        }

        if (particle.y < 0 || particle.y > height) {
          particle.vy *= -1;
        }

        if (pointer.active) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const interactionRadius = 130;

          if (distance > 0 && distance < interactionRadius) {
            const force = (1 - distance / interactionRadius) * 0.65;

            particle.x += (dx / distance) * force;
            particle.y += (dy / distance) * force;
          }
        }
      });

      draw();
      animationId = requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;

      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const start = () => {
      cancelAnimationFrame(animationId);

      if (!reducedMotion.matches) {
        animationId = requestAnimationFrame(animate);
      } else {
        draw();
      }
    };

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        start();
      }
    };

    resize();
    start();

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerout', handlePointerLeave);
    document.addEventListener('visibilitychange', handleVisibility);
    reducedMotion.addEventListener('change', start);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerout', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
      reducedMotion.removeEventListener('change', start);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
