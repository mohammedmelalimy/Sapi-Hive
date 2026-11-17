'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Users,
  UserRoundSearch,
  Palette
} from 'lucide-react';

import type { Locale } from '@/i18n/config';
import type { getDictionary } from '@/i18n/dictionaries';
import { getServices } from '@/i18n/services';
import CardSwap, { Card } from '@/features/services/components/CardSwap';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  locale: Locale;
  dict: ReturnType<typeof getDictionary>;
};

type CardSwapController = {
  next: () => void;
  prev: () => void;
};

type ScreenMode = 'mobile' | 'tablet' | 'laptop' | 'desktop';

const ICONS = [BriefcaseBusiness, Code2, Users, UserRoundSearch, Palette] as const;

export function ServicesSection({ locale, dict }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const swapRef = useRef<CardSwapController | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [screenMode, setScreenMode] = useState<ScreenMode>('desktop');

  const arabic = locale === 'ar';
  const t = dict.serviceCards;
  const items = useMemo(() => getServices(locale), [locale]);
  const isMobile = screenMode === 'mobile';
  const isTablet = screenMode === 'tablet';
  const isLaptop = screenMode === 'laptop';

  // Only remount the deck on a breakpoint change, never during scrolling.
  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 639px)');
    const tablet = window.matchMedia('(min-width: 640px) and (max-width: 1023px)');
    const laptop = window.matchMedia('(min-width: 1024px) and (max-width: 1279px)');
    const update = () =>
      setScreenMode(
        mobile.matches
          ? 'mobile'
          : tablet.matches
            ? 'tablet'
            : laptop.matches
              ? 'laptop'
              : 'desktop'
      );

    update();
    mobile.addEventListener('change', update);
    tablet.addEventListener('change', update);
    laptop.addEventListener('change', update);
    return () => {
      mobile.removeEventListener('change', update);
      tablet.removeEventListener('change', update);
      laptop.removeEventListener('change', update);
    };
  }, []);

  useGSAP(
    () => {
      const root = rootRef.current;
      // Preserve Card Swap; animate the section intro independently.
      if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const blocks = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll('[data-services-reveal]')
      );
      const animations = blocks.map((el, i) =>
        gsap.fromTo(
          el,
          i === 0
            ? { autoAlpha: 0, clipPath: 'inset(0 0 100% 0)' }
            : { autoAlpha: 0, y: 28, scale: 0.98 },
          {
            autoAlpha: 1,
            ...(i === 0 ? { clipPath: 'inset(0 0 0% 0)' } : { y: 0, scale: 1 }),
            duration: i === 0 ? 1.0 : 0.8,
            ease: i === 0 ? 'power2.inOut' : 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      );
      return () => {
        animations.forEach((animation) => {
          animation.scrollTrigger?.kill();
          animation.kill();
        });
      };
    },
    { scope: rootRef }
  );

  return (
    <section
      id="services"
      ref={rootRef}
      dir={arabic ? 'rtl' : 'ltr'}
      aria-label={arabic ? 'خدماتنا' : 'Our Services'}
      className="relative isolate overflow-hidden bg-transparent py-16 text-[#F5F3EE] sm:py-20 lg:py-24"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-[1480px] grid-cols-1 gap-y-7 px-5 sm:gap-y-8 sm:px-8 lg:min-h-[660px] lg:grid-cols-2 lg:items-center lg:gap-x-10 lg:px-12 xl:gap-x-16 xl:px-20">
        {/* LEFT 50% — static introduction, readable with no competing card panel. */}
        <div data-services-reveal className="min-w-0 lg:self-center lg:pb-8">
          <p
            className={`mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase text-[#F2A900] sm:text-xs ${arabic ? 'tracking-normal' : 'tracking-[0.19em]'}`}
          >
            <span className="h-px w-9 bg-[#F2A900]" />
            {t.label}
            <span className="h-px w-9 bg-[#F2A900]/50" />
          </p>

          <h2
            className={`text-[clamp(2rem,4.4vw,4.3rem)] font-semibold leading-[1.08] ${arabic ? 'tracking-normal leading-[1.3]' : 'tracking-[-0.04em]'}`}
          >
            {t.heading}
            <span className="block text-[#F2A900]">{t.highlight}</span>
          </h2>

          <p className="mt-4 max-w-[580px] text-sm leading-[1.8] text-[#D3D9DF] sm:mt-5 sm:text-base lg:text-lg">
            {t.intro}
          </p>
        </div>

        {/* RIGHT 50% — arrows at the top, original React Bits stack below. */}
        <div
          data-services-reveal
          className="relative min-w-0 lg:flex lg:min-h-[600px] lg:flex-col lg:justify-center"
        >
          <div
            className="mb-5 flex shrink-0 items-center justify-center gap-4 lg:mb-0 lg:justify-end"
            dir="ltr"
          >
            <button
              type="button"
              onClick={() => swapRef.current?.prev()}
              aria-label={t.previous}
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/45 bg-[#15283A]/50 text-white transition-colors hover:border-[#F2A900] hover:bg-[#F2A900]/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A900] sm:size-12"
            >
              <ArrowLeft size={20} strokeWidth={1.8} />
            </button>

            <span
              aria-live="polite"
              aria-atomic="true"
              className="min-w-[78px] text-center text-sm font-semibold tabular-nums tracking-[0.08em] text-[#F5F3EE] sm:text-base"
            >
              <span className="text-[#F2A900]">{String(activeIndex + 1).padStart(2, '0')}</span>
              <span className="mx-2 text-[#A8B4C0]">/</span>
              05
            </span>

            <button
              type="button"
              onClick={() => swapRef.current?.next()}
              aria-label={t.next}
              className="inline-flex size-11 items-center justify-center rounded-full border border-[#F2A900]/70 bg-[#F2A900]/10 text-[#F2A900] transition-colors hover:bg-[#F2A900]/25 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A900] sm:size-12"
            >
              <ArrowRight size={20} strokeWidth={1.8} />
            </button>
          </div>

          <div className="w-full lg:pt-5">
            <div className="relative mx-auto h-[445px] w-full max-w-[380px] overflow-visible sm:h-[510px] sm:max-w-[780px] lg:h-[545px] lg:max-w-[530px] xl:h-[570px] xl:max-w-[620px]">
              <CardSwap
                ariaLabel={t.stack}
                ariaRoleDescription={t.stackRole}
                key={screenMode}
                ref={swapRef}
                width={isMobile ? 310 : isTablet ? 400 : isLaptop ? 326 : 404}
                height={isMobile ? 368 : isTablet ? 410 : isLaptop ? 402 : 442}
                cardDistance={isMobile ? 22 : isTablet ? 54 : isLaptop ? 38 : 60}
                verticalDistance={isMobile ? 17 : isTablet ? 21 : 24}
                depth={isMobile ? 35 : isTablet ? 68 : 90}
                skewAmount={isMobile ? 2 : 4}
                visibleCards={isMobile ? 3 : isTablet ? 4 : isLaptop ? 3 : 4}
                delay={5000}
                autoplay
                pauseOnHover
                draggable
                speed={1}
                bounce={0.26}
                parallax={isMobile ? 0 : 0.18}
                hoverSpread={isMobile ? 0.02 : 0.08}
                dim={0.26}
                cardRadius={25}
                intro
                theme="dark"
                onChange={(index) => setActiveIndex(index)}
                className="!h-full !w-full"
              >
                {items.map((service, index) => {
                  const Icon = ICONS[index] ?? BriefcaseBusiness;
                  const active = index === activeIndex;
                  return (
                    <Card
                      key={service.slug}
                      className="!overflow-hidden !rounded-[25px] !border !border-[#7F9AB1]/60 !bg-[#172C41]"
                    >
                      <article className="relative flex h-full min-h-0 flex-col overflow-hidden bg-[linear-gradient(145deg,#264058_0%,#152B40_55%,#0B2336_100%)] px-5 pb-5 pt-6 text-white sm:px-8 sm:pb-7 sm:pt-8">
                        <div className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-[#F2A900]/[0.12] blur-3xl" />
                        <div className="relative flex items-start justify-between gap-3">
                          <span className="inline-flex size-[50px] items-center justify-center rounded-2xl border border-[#F2A900]/40 bg-[#F2A900]/10 text-[#F2A900] sm:size-[62px]">
                            <Icon size={isMobile ? 25 : 31} strokeWidth={1.65} />
                          </span>
                          <span className="pt-1 text-[12px] font-semibold tabular-nums tracking-[0.11em] text-[#F2A900] sm:text-sm">
                            {String(index + 1).padStart(2, '0')} / 05
                          </span>
                        </div>

                        <div className="relative mt-5 flex-1 sm:mt-7">
                          <p
                            className={`mb-2 text-[10px] font-bold uppercase text-[#F2A900] sm:mb-3 sm:text-xs ${arabic ? 'tracking-normal' : 'tracking-[0.16em]'}`}
                          >
                            {t.cardEyebrow}
                          </p>
                          <h3
                            className={`text-[26px] font-semibold leading-tight text-white sm:text-[36px] ${arabic ? 'tracking-normal' : 'tracking-[-0.035em]'}`}
                          >
                            {service.title}
                          </h3>
                          <p className="mt-3 max-w-[395px] text-[13px] leading-[1.75] text-[#DEE7EE] sm:mt-5 sm:text-[16px] sm:leading-[1.8]">
                            {t.details[service.slug]}
                          </p>
                        </div>

                        <div className="relative mt-5 border-t border-[#A8B4C0]/35 pt-4 sm:pt-5">
                          {active ? (
                            <Link
                              href={`/${locale}/services/${service.slug}`}
                              onClick={(event) => event.stopPropagation()}
                              className="inline-flex w-full items-center justify-between gap-3 text-sm font-semibold text-[#F5F3EE] transition-colors hover:text-[#F2A900] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A900] sm:text-base"
                            >
                              {t.cardLink}
                              <ArrowUpRight
                                size={22}
                                className="shrink-0 text-[#F2A900] rtl:-scale-x-100"
                              />
                            </Link>
                          ) : (
                            <div
                              aria-hidden="true"
                              className="flex items-center justify-between gap-3 text-sm font-semibold text-[#D3D9DF] sm:text-base"
                            >
                              <span>{t.cardLink}</span>
                              <ArrowUpRight
                                size={22}
                                className="shrink-0 text-[#F2A900] rtl:-scale-x-100"
                              />
                            </div>
                          )}
                        </div>
                      </article>
                    </Card>
                  );
                })}
              </CardSwap>
            </div>

            <div className="mx-auto mt-1 flex max-w-[310px] flex-col items-center gap-3 sm:max-w-none">
              <div className="flex items-center gap-1.5 lg:hidden" aria-label={t.position}>
                {items.map((service, i) => (
                  <span
                    key={service.slug}
                    className={`h-1.5 rounded-full transition-all ${i === activeIndex ? 'w-5 bg-[#F2A900]' : 'w-1.5 bg-[#A8B4C0]/55'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
