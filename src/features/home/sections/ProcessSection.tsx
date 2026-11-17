'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, UsersRound, Play, BadgeCheck, TrendingUp } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { processCopy } from '@/i18n/process';

gsap.registerPlugin(ScrollTrigger);

const icons = [Search, UsersRound, Play, BadgeCheck, TrendingUp] as const;

type Props = { locale: Locale };

/**
 * Desktop: one pinned GSAP timeline that reveals five stages in-place.
 * Mobile/reduced-motion: the complete five-step process stays in normal flow.
 * No camera transforms, no animated particles and no horizontal scrolling.
 */
export function ProcessSection({ locale }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const content = processCopy[locale];
  const isAr = locale === 'ar';

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      // The entrance and the five steps are ONE pinned timeline on desktop.
      // This guarantees a visible entrance instead of a separate ScrollTrigger
      // that can finish before the user notices it.
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const panels = gsap.utils.toArray<HTMLElement>('[data-process-panel]');
        const labels = gsap.utils.toArray<HTMLElement>('[data-process-step-label]');
        const bar = root.querySelector<HTMLElement>('[data-process-progress-fill]');
        const eyebrowLine = root.querySelector<HTMLElement>('[data-process-eyebrow-line]');
        const eyebrowText = root.querySelector<HTMLElement>('[data-process-eyebrow-text]');
        const titleLines = gsap.utils.toArray<HTMLElement>('[data-process-title-line]');
        const description = root.querySelector<HTMLElement>('[data-process-description]');
        const hint = root.querySelector<HTMLElement>('[data-process-steps-hint]');
        const scene = root.querySelector<HTMLElement>('[data-process-desktop-scene]');
        const stepsNav = root.querySelector<HTMLElement>('[data-process-steps-nav]');

        if (
          panels.length !== 5 ||
          labels.length !== 5 ||
          !bar ||
          !eyebrowLine ||
          !eyebrowText ||
          titleLines.length !== 2 ||
          !description ||
          !hint ||
          !scene ||
          !stepsNav
        )
          return;

        // These states only apply with JS + desktop + motion enabled.
        gsap.set(panels, { autoAlpha: 0, y: 0, filter: 'blur(0px)' });
        gsap.set(panels[0], { autoAlpha: 1 });
        gsap.set(labels, { opacity: 0.4 });
        gsap.set(labels[0], { opacity: 1 });
        gsap.set(bar, { scaleX: 0.2 });
        gsap.set(eyebrowLine, {
          scaleX: 0,
          transformOrigin: isAr ? 'right center' : 'left center'
        });
        gsap.set(eyebrowText, { autoAlpha: 0, y: 12 });
        gsap.set(titleLines, { yPercent: 105, autoAlpha: 0 });
        gsap.set(description, { autoAlpha: 0, y: 17 });
        gsap.set(hint, { autoAlpha: 0, y: 10 });
        gsap.set(scene, { autoAlpha: 0, y: 30, scale: 0.94, filter: 'blur(9px)' });
        gsap.set(stepsNav, { autoAlpha: 0, y: 16 });

        const master = gsap.timeline({ defaults: { ease: 'none' } });

        // 01: Distinct entrance: line draw, two-line mask, scene focus, timeline reveal.
        // Scrubbed as part of the pinned story, so it plays on entry and reverses on return.
        master
          .to(eyebrowLine, { scaleX: 1, duration: 0.28, ease: 'power2.out' }, 0.05)
          .to(eyebrowText, { autoAlpha: 1, y: 0, duration: 0.32, ease: 'power2.out' }, 0.1)
          .to(titleLines[0], { autoAlpha: 1, yPercent: 0, duration: 0.5, ease: 'power3.out' }, 0.18)
          .to(titleLines[1], { autoAlpha: 1, yPercent: 0, duration: 0.5, ease: 'power3.out' }, 0.31)
          .to(description, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.5)
          .to(
            scene,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
              duration: 0.65,
              ease: 'power3.out'
            },
            0.42
          )
          .to(hint, { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.77)
          .to(stepsNav, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 0.78)
          .to({}, { duration: 0.22 });

        // 02: The five-step story starts only AFTER the entrance is finished.
        // Use a shared timeline so ScrollTrigger cannot race with the entrance.
        const firstStepAt = master.duration();
        for (let i = 1; i < panels.length; i++) {
          const at = firstStepAt + (i - 1) * 0.95;
          master.to(
            panels[i - 1],
            { autoAlpha: 0, y: -12, filter: 'blur(5px)', duration: 0.32 },
            at + 0.08
          );
          master.fromTo(
            panels[i],
            { autoAlpha: 0, y: 15, filter: 'blur(5px)' },
            { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.42 },
            at + 0.37
          );
          master.to(bar, { scaleX: (i + 1) / panels.length, duration: 0.78 }, at + 0.08);
          master.to(labels[i - 1], { opacity: 0.4, duration: 0.25 }, at + 0.18);
          master.to(labels[i], { opacity: 1, duration: 0.4 }, at + 0.38);
        }
        master.to({}, { duration: 0.18 });

        const scroll = ScrollTrigger.create({
          trigger: root,
          start: 'top top',
          end: () => `+=${Math.max(1450, Math.round(window.innerHeight * 2.95))}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          animation: master,
          anticipatePin: 1,
          invalidateOnRefresh: true
        });

        return () => {
          scroll.kill();
          master.kill();
        };
      });

      mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
        const eyebrowLine = root.querySelector<HTMLElement>('[data-process-eyebrow-line]');
        const eyebrowText = root.querySelector<HTMLElement>('[data-process-eyebrow-text]');
        const titleLines = gsap.utils.toArray<HTMLElement>('[data-process-title-line]');
        const description = root.querySelector<HTMLElement>('[data-process-description]');
        const items = gsap.utils.toArray<HTMLElement>('[data-process-mobile-item]');

        const intro = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top 83%',
            toggleActions: 'play none none reverse'
          }
        });
        if (eyebrowLine)
          intro.from(
            eyebrowLine,
            { scaleX: 0, transformOrigin: isAr ? 'right' : 'left', duration: 0.4 },
            0
          );
        if (eyebrowText) intro.from(eyebrowText, { autoAlpha: 0, y: 13, duration: 0.45 }, 0.05);
        if (titleLines.length)
          intro.from(
            titleLines,
            { autoAlpha: 0, yPercent: 105, duration: 0.7, stagger: 0.12, ease: 'power3.out' },
            0.12
          );
        if (description) intro.from(description, { autoAlpha: 0, y: 20, duration: 0.55 }, 0.42);

        items.forEach((item, index) => {
          gsap.from(item, {
            y: 24,
            autoAlpha: 0,
            scale: 0.97,
            duration: 0.7,
            delay: Math.min(index * 0.04, 0.16),
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            }
          });
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [locale], revertOnUpdate: true }
  );

  return (
    <section
      ref={rootRef}
      id="our-process"
      data-our-process
      dir={isAr ? 'rtl' : 'ltr'}
      lang={locale}
      className="relative isolate w-full bg-[#0F1B2D] text-[#F5F3EE]"
      aria-labelledby="our-process-title"
    >
      <div
        data-process-stage
        className="mx-auto flex w-full max-w-[1600px] flex-col justify-center px-5 py-16 sm:px-8 md:px-12 lg:min-h-[100svh] lg:px-16 lg:py-20 xl:px-20"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-12 xl:gap-16">
          <header data-process-heading className="max-w-[570px]">
            <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold text-[#F2A900]">
              <span
                data-process-eyebrow-line
                aria-hidden="true"
                className="h-[2px] w-9 shrink-0 bg-[#F2A900]"
              />
              <span
                data-process-eyebrow-text
                className={isAr ? 'tracking-normal' : 'uppercase tracking-[0.19em]'}
              >
                {content.eyebrow}
              </span>
            </div>
            <h2
              id="our-process-title"
              className="max-w-[600px] text-[clamp(2rem,3.4vw,3.55rem)] font-semibold leading-[1.15] tracking-tight"
            >
              <span className="block overflow-hidden">
                <span data-process-title-line className="block">
                  {content.title}
                </span>
              </span>
              <span className="block overflow-hidden">
                <span data-process-title-line className="block text-[#F2A900]">
                  {content.titleAccent}
                </span>
              </span>
            </h2>
            <p
              data-process-description
              className="mt-6 max-w-[560px] text-[14px] leading-[1.85] text-[#F5F3EE]/80 sm:text-[15px]"
            >
              {content.description}
            </p>
            <p
              data-process-steps-hint
              className="mt-6 hidden text-[12px] font-medium text-[#F2A900] lg:block"
            >
              {content.stepsLabel}
            </p>
          </header>

          {/* Desktop-only typographic scene: one stage at a time, not another card carousel. */}
          <div
            data-process-desktop-scene
            className="relative hidden h-[330px] lg:motion-safe:block xl:h-[365px]"
          >
            <div
              className={`pointer-events-none absolute inset-y-4 w-px bg-[#F2A900]/40 ${isAr ? 'right-0' : 'left-0'}`}
              aria-hidden="true"
            />
            <div
              className={`pointer-events-none absolute -top-2 h-52 w-52 rounded-full bg-[#F2A900]/[0.055] blur-[65px] ${isAr ? 'left-6' : 'right-6'}`}
              aria-hidden="true"
            />
            {content.steps.map((step, index) => {
              const Icon = icons[index];
              return (
                <article
                  key={index}
                  data-process-panel
                  className={`absolute inset-0 flex flex-col justify-center overflow-hidden py-5 ${isAr ? 'pr-9 md:pr-12' : 'pl-9 md:pl-12'} ${index === 0 ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                >
                  <span
                    className={`pointer-events-none absolute bottom-0 select-none text-[clamp(8rem,17vw,15rem)] font-bold leading-none text-white/[0.045] ${isAr ? 'left-2' : 'right-2'}`}
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="relative z-10 mb-6 flex items-center gap-4">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#F2A900]/35 bg-[#F2A900]/10 text-[#F2A900]">
                      <Icon size={27} strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <span
                      dir="ltr"
                      className="text-[13px] font-semibold tracking-[0.17em] text-[#F2A900]"
                    >
                      {String(index + 1).padStart(2, '0')} / 05
                    </span>
                  </div>
                  <h3 className="relative z-10 text-[clamp(2.4rem,4vw,4.3rem)] font-semibold leading-tight tracking-tight">
                    {step.title}
                  </h3>
                  <p className="relative z-10 mt-5 max-w-[520px] text-[16px] leading-[1.85] text-[#F5F3EE]/85 xl:text-[17px]">
                    {step.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        {/* The 5 linked stages are the progress timeline, no drawn ring or camera effect. */}
        <div
          data-process-steps-nav
          className="mt-12 hidden lg:motion-safe:block xl:mt-16"
          aria-hidden="true"
        >
          <div className="relative h-[2px] bg-white/15">
            <span
              data-process-progress-fill
              className={`absolute inset-y-0 w-full bg-[#F2A900] ${isAr ? 'right-0 origin-right' : 'left-0 origin-left'}`}
              style={{ transform: 'scaleX(0.2)' }}
            />
          </div>
          <div className="grid grid-cols-5 gap-3 pt-5">
            {content.steps.map((step, index) => (
              <div
                key={index}
                data-process-step-label
                className={index === 0 ? 'opacity-100' : 'opacity-45'}
              >
                <span
                  dir="ltr"
                  className="mb-2 block text-[11px] font-bold tracking-wider text-[#F2A900]"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="block text-[12px] font-semibold text-white xl:text-[14px]">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Native vertical layout on touch devices and for reduced-motion preference. */}
        <div
          className="relative mt-10 space-y-4 lg:motion-safe:hidden"
          aria-label={content.stepsLabel}
        >
          <div
            className={`pointer-events-none absolute inset-y-7 w-px bg-[#F2A900]/35 ${isAr ? 'right-[24px]' : 'left-[24px]'}`}
            aria-hidden="true"
          />
          {content.steps.map((step, index) => {
            const Icon = icons[index];
            return (
              <article
                key={index}
                data-process-mobile-item
                className={`relative flex gap-5 rounded-[22px] border border-white/10 bg-[#5B6B7F]/20 p-5 shadow-[0_12px_35px_rgba(15,27,45,0.12)] sm:p-6 ${isAr ? 'text-right' : 'text-left'}`}
              >
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#F2A900]/40 bg-[#0F1B2D] text-[#F2A900]">
                  <Icon size={21} strokeWidth={1.7} aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <span
                    dir="ltr"
                    className={`block text-[11px] font-semibold tracking-wider text-[#F2A900] ${isAr ? 'text-right' : 'text-left'}`}
                  >
                    {String(index + 1).padStart(2, '0')} / 05
                  </span>
                  <h3 className="mt-2 text-[20px] font-semibold leading-snug sm:text-[23px]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-[1.8] text-[#F5F3EE]/80 sm:text-[14px]">
                    {step.text}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
