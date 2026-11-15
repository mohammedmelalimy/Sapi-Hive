'use client';

import { useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { getDictionary } from '@/i18n/dictionaries';
import brandIcon from './assets/sapihive-brand-icon.png';
import { newHeroLogoMotion } from './3d/heroLogoMotion';
import { createHeroTimeline } from './animations/createHeroTimeline';

const HeroLogo3D = dynamic(() => import('./3d/HeroLogo3D'), { ssr: false });
gsap.registerPlugin(ScrollTrigger);

type Props = { dict: ReturnType<typeof getDictionary> };
const SERVICE_KEYS = ['corporate', 'tech', 'people', 'talent', 'creative'] as const;
const LOCATIONS = [
  { left: '50%', top: '10%', path: 'M500 80 L500 200' },
  { left: '89%', top: '32%', path: 'M871 212 L629 282' },
  { left: '82%', top: '83%', path: 'M818 530 L618 398' },
  { left: '18%', top: '83%', path: 'M184 530 L382 398' },
  { left: '11%', top: '32%', path: 'M129 212 L371 282' },
];

export function HeroSection({ dict }: Props) {
  const heroRef = useRef<HTMLElement>(null);
  const motion = useMemo(newHeroLogoMotion, []);
  const isArabic = dict.nav.home !== 'Home';
  const locale = isArabic ? 'ar' : 'en';
  const services = SERVICE_KEYS.map((key, index) => ({
    name: dict.services[key],
    description: dict.heroStory.descriptions[index],
  }));

  useGSAP(() => {
    const root = heroRef.current;
    if (!root) return;
    const title = root.querySelector<HTMLElement>('[data-typewriter-title]');
    const highlight = root.querySelector<HTMLElement>('[data-typewriter-highlight]');
    const cursor = root.querySelector<HTMLElement>('[data-typewriter-cursor]');
    const eyebrow = root.querySelector<HTMLElement>('[data-hero-eyebrow]');
    const intro = root.querySelector<HTMLElement>('[data-hero-description]');
    const scrollPrompt = root.querySelector<HTMLElement>('[data-hero-scroll-indicator]');
    if (!title || !highlight || !cursor || !eyebrow || !intro || !scrollPrompt) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const chars = Array.from(dict.hero.title);
    const goldChars = Array.from(dict.hero.highlight);
    const counts = { title: 0, highlight: 0 };
    const typewriter = gsap.timeline({ paused: true });
    let scrollCleanup: (() => void) | null = null;
    let refreshId = 0;
    let blink: gsap.core.Tween | null = null;
    let start: (() => void) | null = null;

    const updateTitle = () => { title.textContent = chars.slice(0, Math.round(counts.title)).join(''); };
    const updateHighlight = () => { highlight.textContent = goldChars.slice(0, Math.round(counts.highlight)).join(''); };
    const playIntroAgain = () => {
      typewriter.pause(0);
      counts.title = 0;
      counts.highlight = 0;
      title.textContent = '';
      highlight.textContent = '';
      gsap.set([eyebrow, intro, scrollPrompt], { autoAlpha: 0, y: 15 });
      gsap.set(cursor, { opacity: 1, autoAlpha: 1 });
      blink?.restart();
      typewriter.invalidate().restart();
    };

    if (reduced) {
      title.textContent = dict.hero.title;
      highlight.textContent = dict.hero.highlight;
      gsap.set(cursor, { autoAlpha: 0 });
      gsap.set([eyebrow, intro, scrollPrompt], { autoAlpha: 1, y: 0 });
      motion.assembly = 1;
      motion.depth = 0.25;
    } else {
      title.textContent = '';
      highlight.textContent = '';
      gsap.set([eyebrow, intro, scrollPrompt], { autoAlpha: 0, y: 15 });
      gsap.set(cursor, { autoAlpha: 1 });
      blink = gsap.to(cursor, { opacity: 0, repeat: -1, yoyo: true, duration: 0.42, ease: 'steps(1)', paused: true });
      typewriter
        .to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.3 })
        .to(counts, { title: chars.length, snap: { title: 1 }, duration: Math.max(0.9, chars.length * 0.045), ease: 'none', onUpdate: updateTitle })
        .to(counts, { highlight: goldChars.length, snap: { highlight: 1 }, duration: Math.max(0.3, goldChars.length * 0.065), ease: 'none', onUpdate: updateHighlight })
        .to(intro, { autoAlpha: 1, y: 0, duration: 0.42 })
        .to(scrollPrompt, { autoAlpha: 1, y: 0, duration: 0.3 }, '-=0.15');

      scrollCleanup = createHeroTimeline(root, motion, { onReturnToStart: playIntroAgain });
      refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());
      start = () => { blink?.play(0); typewriter.play(0); };
      if (document.querySelector('[data-intro-screen]')) {
        window.addEventListener('sapihive:intro-complete', start, { once: true });
      } else start();
    }
    return () => {
      if (start) window.removeEventListener('sapihive:intro-complete', start);
      cancelAnimationFrame(refreshId);
      scrollCleanup?.();
      blink?.kill();
      typewriter.kill();
    };
  }, { scope: heroRef, dependencies: [dict.hero.title, dict.hero.highlight, locale], revertOnUpdate: true });

  return (
    <section ref={heroRef} id="hero" data-hero dir={isArabic ? 'rtl' : 'ltr'}
      className="relative isolate flex min-h-dvh w-full items-center overflow-hidden text-[#F5F3EE]">
      {/* Existing background particles are supplied by the page layout. */}
      <div data-hero-logo-3d className="pointer-events-none absolute inset-0 z-10 motion-reduce:hidden" aria-hidden="true">
        <HeroLogo3D motion={motion} rtl={isArabic} />
      </div>

      <div data-hero-copy className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center md:px-[9vw]">
        <p data-hero-eyebrow className={`mb-5 text-xs font-semibold text-[#F2A900] md:mb-7 md:text-sm ${isArabic ? '' : 'tracking-[0.2em]'}`} style={{ opacity: 0 }}>{dict.hero.eyebrow}</p>
        <h1 aria-label={`${dict.hero.title} ${dict.hero.highlight}`} className={`max-w-[820px] text-[clamp(2.6rem,5.1vw,5.7rem)] font-semibold ${isArabic ? 'leading-[1.38]' : 'leading-[1.10] tracking-[-0.045em]'}`}>
          <span data-typewriter-title aria-hidden="true" />{' '}
          <span data-typewriter-highlight aria-hidden="true" className="text-[#F2A900]" />
          <span data-typewriter-cursor aria-hidden="true" className="ms-1 inline-block h-[0.83em] w-[3px] translate-y-[0.08em] bg-[#F2A900]" />
        </h1>
        <p data-hero-description className="mx-auto mt-7 max-w-[530px] text-sm leading-[1.8] text-[#D3D9DF] sm:text-base md:text-lg" style={{ opacity: 0 }}>{dict.hero.intro}</p>
        {/* Kept inside the intro wrapper so GSAP always hides it together with the intro.
            Otherwise the independent typewriter timeline can make it reappear over the final CTA. */}
      <div data-hero-scroll-indicator aria-hidden="true" className="pointer-events-none absolute bottom-7 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 opacity-0">
        <span className={`text-[10px] text-[#D3D9DF] ${isArabic ? '' : 'uppercase tracking-[0.19em]'}`}>{dict.common.scrollToExplore}</span>
        <div className="h-8 w-px bg-gradient-to-b from-[#F2A900] to-transparent" />
      </div>
      </div>

      {/* The five labelled arrows are separate HTML/SVG overlay, never hexagonal props. */}
      <div data-hive-callouts aria-hidden="true" className="pointer-events-none invisible absolute left-1/2 top-1/2 z-20 hidden aspect-[1000/650] w-[min(92vw,1000px)] -translate-x-1/2 -translate-y-1/2 opacity-0 lg:block">
        <svg viewBox="0 0 1000 650" className="absolute inset-0 h-full w-full overflow-visible" fill="none">
          <defs>
            <marker id="sapi-hero-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L7 4 L0 8" fill="none" stroke="#F2A900" strokeWidth="1.5"/></marker>
          </defs>
          {LOCATIONS.map((item, index) => <path key={index} data-hive-leader d={item.path} stroke="#C6D3DE" strokeWidth="1.5" markerEnd="url(#sapi-hero-arrow)" />)}
        </svg>
        {LOCATIONS.map((item, index) => (
          <div key={index} data-hive-callout style={{ left: item.left, top: item.top }}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/25 bg-[#14273B]/80 px-4 py-2.5 text-sm font-medium text-white shadow-xl backdrop-blur-md">
            <span data-hive-callout-number className="text-[#F2A900]">{String(index + 1).padStart(2, '0')}</span>
            <span dir="ltr">{services[index].name}</span>
          </div>
        ))}
      </div>
      <div data-mobile-hives aria-hidden="true" className="pointer-events-none invisible absolute inset-x-4 bottom-[12%] z-20 flex flex-wrap justify-center gap-2 opacity-0 lg:hidden">
        {services.map((service, index) => (
          <span key={index} className="rounded-full border border-white/25 bg-[#14273B]/80 px-2.5 py-2 text-[10px] text-white backdrop-blur-lg" dir="ltr">
            <span className="me-1 text-[#F2A900]">0{index + 1}</span>{service.name}
          </span>
        ))}
      </div>

      {/* Focus chapter: sculpture moves LEFT on desktop and ABOVE on mobile. */}
      <div data-focus-panel className="pointer-events-none invisible absolute inset-x-5 bottom-[9%] z-30 mx-auto h-[195px] max-w-[520px] opacity-0 md:inset-x-auto md:bottom-auto md:end-[7%] md:top-1/2 md:h-[240px] md:w-[min(39vw,520px)] md:-translate-y-1/2">
        {services.map((service, index) => (
          <div key={index} data-focus-slide className="invisible absolute inset-0 flex flex-col justify-center rounded-[24px] border border-[#F2A900]/35 bg-[#122439]/88 p-5 opacity-0 shadow-[0_24px_65px_rgba(4,14,28,.32)] backdrop-blur-xl md:p-9">
            <span className={`mb-3 text-[11px] font-semibold text-[#F2A900] ${isArabic ? '' : 'tracking-[0.18em]'}`}><span>{dict.heroStory.serviceLabel}</span>{' '}<bdi dir="ltr" className="inline-block tabular-nums">{String(index + 1).padStart(2, '0')} / 05</bdi></span>
            <h2 className={`text-[clamp(1.5rem,2.7vw,2.8rem)] font-semibold leading-tight text-white ${isArabic ? "text-right" : "text-left"}`} dir="ltr">{service.name}</h2>
            <p className="mt-4 text-[13px] leading-[1.8] text-[#D3D9DF] md:text-base">{service.description}</p>
            <div className="mt-5 h-[2px] w-[68px] bg-[#F2A900]" />
          </div>
        ))}
      </div>

      {/* CTA directly below the 3D logo. No duplicated logo or overlapping glass card. */}
      <div data-hero-cta className="pointer-events-none invisible absolute inset-x-5 top-[58%] z-30 mx-auto max-w-[720px] text-center opacity-0 md:top-[60%]">
        <p className={`mb-3 text-xs font-semibold text-[#F2A900] ${isArabic ? '' : 'tracking-[0.2em]'}`}>{dict.heroStory.cta.eyebrow}</p>
        <h2 className={`text-[clamp(1.85rem,3.8vw,3.6rem)] font-bold text-white ${isArabic ? 'leading-[1.35]' : 'leading-[1.17] tracking-[-0.035em]'}`}>{dict.heroStory.cta.title}</h2>
        <p className="mx-auto mt-3 max-w-[590px] text-sm leading-relaxed text-[#D3D9DF] md:mt-4 md:text-base">{dict.heroStory.cta.description}</p>
        <Link href={`/${locale}/join-us`} className="pointer-events-auto mt-5 inline-flex items-center gap-2 rounded-full bg-[#F2A900] px-7 py-3 text-sm font-semibold text-[#0F1B2D] transition-colors hover:bg-[#FFBE25] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:mt-6">
          {dict.heroStory.cta.button}<span aria-hidden="true" className="rtl:rotate-180">→</span>
        </Link>
      </div>

      <div data-hero-logo-fallback className="pointer-events-none absolute left-1/2 top-[67%] z-[9] hidden -translate-x-1/2 motion-reduce:block"><Image src={brandIcon} alt="" className="h-40 w-40" /></div>
    </section>
  );
}
