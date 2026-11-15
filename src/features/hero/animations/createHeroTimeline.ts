import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { HeroLogoMotion } from '../3d/heroLogoMotion';

gsap.registerPlugin(ScrollTrigger);

type HeroOptions = { onReturnToStart?: () => void };

/** A single scroll-scrubbed story. R3F reads GSAP's motion object each frame. */
export function createHeroTimeline(hero: HTMLElement, motion: HeroLogoMotion, options: HeroOptions = {}) {
  const copy = hero.querySelector<HTMLElement>('[data-hero-copy]');
  const callouts = hero.querySelector<HTMLElement>('[data-hive-callouts]');
  const pills = Array.from(hero.querySelectorAll<HTMLElement>('[data-hive-callout]'));
  const lines = Array.from(hero.querySelectorAll<SVGPathElement>('[data-hive-leader]'));
  const mobilePills = hero.querySelector<HTMLElement>('[data-mobile-hives]');
  const focusPanel = hero.querySelector<HTMLElement>('[data-focus-panel]');
  const slides = Array.from(hero.querySelectorAll<HTMLElement>('[data-focus-slide]'));
  const cta = hero.querySelector<HTMLElement>('[data-hero-cta]');

  if (!copy || !callouts || !mobilePills || !focusPanel || !cta || slides.length !== 5 || pills.length !== 5 || lines.length !== 5) {
    console.warn('SapiHive 3D hero: missing storyboard elements');
    return () => {};
  }

  Object.assign(motion, { assembly: 0, depth: 0, focusMode: 0, focus: -1, final: 0, exit: 0 });
  gsap.set(copy, { autoAlpha: 1, y: 0 });
  gsap.set([callouts, mobilePills, focusPanel, cta], { autoAlpha: 0 });
  gsap.set(pills, { autoAlpha: 0, y: 14, scale: 0.92, transformOrigin: '50% 50%' });
  gsap.set(lines, { autoAlpha: 0 });
  lines.forEach(line => {
    const total = line.getTotalLength();
    gsap.set(line, { strokeDasharray: total, strokeDashoffset: total });
  });
  gsap.set(slides, { autoAlpha: 0, y: 24, scale: 0.97 });

  const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } });

  // 01 — opening typewriter gives way to the actual sculptural mark.
  tl.addLabel('intro');
  tl.to(copy, { autoAlpha: 0, y: -34, duration: 0.8, ease: 'power2.inOut' });

  // 02 — the 13 original pieces assemble in genuine three-dimensional space.
  tl.addLabel('assemble');
  tl.to(motion, { assembly: 1, duration: 1.9, ease: 'power2.inOut' });
  tl.to({}, { duration: 0.40 });

  // 03 — perspective and dolly reveal the EXTRUDED mark, not a rotated image.
  tl.addLabel('depth');
  tl.to(motion, { depth: 1, duration: 1.38, ease: 'sine.inOut' });
  tl.to({}, { duration: 0.25 });

  // 04 — five named services and connecting arrow leaders annotate the sculpture.
  tl.addLabel('five-hives');
  tl.set([callouts, mobilePills], { autoAlpha: 1 });
  tl.to(pills, { autoAlpha: 1, y: 0, scale: 1, duration: 0.52, stagger: 0.10, ease: 'power2.out' });
  tl.to(lines, { autoAlpha: 0.84, strokeDashoffset: 0, duration: 0.72, stagger: 0.10, ease: 'power2.out' }, '<');
  tl.to({}, { duration: 0.76 });

  // 05 — one Hive at a time; parts of the *original logo* take the Amber accent.
  tl.addLabel('services');
  tl.to([callouts, mobilePills], { autoAlpha: 0, duration: 0.30 });
  tl.to(motion, { focusMode: 1, focus: 0, duration: 0.82, ease: 'power2.inOut' }, '<');
  tl.set(focusPanel, { autoAlpha: 1 }, '<');
  slides.forEach((slide, i) => {
    tl.addLabel(`hive-${i + 1}`);
    if (i > 0) tl.to(motion, { focus: i, duration: 0.36, ease: 'sine.inOut' });
    tl.fromTo(slide,
      { autoAlpha: 0, y: 24, scale: 0.97 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: 'power3.out', immediateRender: false },
    );
    tl.to({}, { duration: 1.25 });
    tl.to(slide, { autoAlpha: 0, y: -18, duration: 0.36, ease: 'power2.inOut' });
  });

  // 06 — sculpture recentres above a direct CTA, no overlay / no duplicate icon.
  tl.addLabel('final-cta');
  tl.to(focusPanel, { autoAlpha: 0, duration: 0.12 });
  tl.to(motion, { focusMode: 0, depth: 0.3, final: 1, focus: -1, duration: 1.2, ease: 'power3.inOut' }, '<');
  tl.fromTo(cta,
    { autoAlpha: 0, y: 25 },
    { autoAlpha: 1, y: 0, duration: 0.67, ease: 'power2.out', immediateRender: false },
    '>-0.15',
  );
  tl.to({}, { duration: 1.45 });

  // Seamless release into WHO WE ARE, no final blank scroll chapter.
  tl.addLabel('handoff');
  tl.to(motion, { exit: 1, duration: 0.8, ease: 'power2.inOut' });
  tl.to(cta, { autoAlpha: 0, y: -25, duration: 0.65, ease: 'power2.inOut' }, '<');

  let reentering = false;
  let hasScrolledIntoStory = false;
  let resetDone = false;
  let destroyed = false;
  let returnOverlay: HTMLElement | null = null;
  let overlayIn: gsap.core.Tween | null = null;
  let overlayOut: gsap.core.Tween | null = null;
  let restoreFrame = 0;
  const onReenter = (self: ScrollTrigger) => {
    // Scrolling up from WHO WE ARE replays the Hero from its beginning,
    // instead of forcing a reverse viewing of five services and a final CTA.
    if (reentering || destroyed) return;
    reentering = true;
    const overlay = document.createElement('div');
    overlay.setAttribute('aria-hidden', 'true');
    Object.assign(overlay.style, {
      position: 'fixed', inset: '0', zIndex: '45', pointerEvents: 'none',
      opacity: '0', background: 'linear-gradient(120deg,rgba(15,27,45,.97),rgba(54,75,98,.97))',
    });
    returnOverlay = overlay;
    document.body.appendChild(overlay);
    const jump = () => {
      if (destroyed) return;
      const html = document.documentElement;
      const original = html.style.scrollBehavior;
      html.style.scrollBehavior = 'auto';
      window.scrollTo({ top: Math.max(0, self.start + 1), behavior: 'instant' as ScrollBehavior });
      self.getTween()?.pause();
      tl.progress(0);
      Object.assign(motion, { assembly: 0, depth: 0, focusMode: 0, focus: -1, final: 0, exit: 0 });
      hasScrolledIntoStory = false;
      resetDone = true;
      options.onReturnToStart?.();
      ScrollTrigger.update();
      restoreFrame = window.requestAnimationFrame(() => {
        html.style.scrollBehavior = original;
        overlayOut = gsap.to(overlay, { opacity: 0, duration: 0.36, onComplete: () => {
          overlay.remove();
          if (returnOverlay === overlay) returnOverlay = null;
          reentering = false;
        }});
      });
    };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) jump();
    else overlayIn = gsap.to(overlay, { opacity: 1, duration: 0.18, onComplete: jump });
  };

  const trigger = ScrollTrigger.create({
    id: 'sapihive-hero-3d-story',
    trigger: hero,
    animation: tl,
    start: 'top top',
    end: () => `+=${Math.round(window.innerHeight * tl.duration() * (window.innerWidth < 768 ? 0.39 : 0.46))}`,
    pin: true,
    pinSpacing: true,
    scrub: 0.55,
    anticipatePin: 1,
    refreshPriority: 10,
    invalidateOnRefresh: true,
    onEnterBack: onReenter,
    onUpdate: (self) => {
      if (self.progress > 0.035) { hasScrolledIntoStory = true; resetDone = false; }
      if (!reentering && hasScrolledIntoStory && !resetDone && self.progress <= 0.0001 && self.direction === -1) {
        resetDone = true;
        hasScrolledIntoStory = false;
        options.onReturnToStart?.();
      }
    },
  });

  return () => {
    destroyed = true;
    overlayIn?.kill();
    overlayOut?.kill();
    if (restoreFrame) cancelAnimationFrame(restoreFrame);
    returnOverlay?.remove();
    trigger.kill();
    tl.kill();
  };
}
