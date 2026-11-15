"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import AboutBrand3D from "./AboutBrand3D";
import AboutPromiseLoop from "./AboutPromiseLoop";
import { ArrowDown, MoveUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { type Locale } from "@/i18n/config";
import { aboutCopy } from "@/i18n/about";
import brandIcon from "@/features/hero/assets/sapihive-brand-icon.png";

gsap.registerPlugin(ScrollTrigger);

function SectionLabel({ children, light = false, arabic = false }: { children: ReactNode; light?: boolean; arabic?: boolean }) {
  return (
    <div className={`flex items-center gap-3 text-[11px] font-bold uppercase ${arabic ? "tracking-normal" : "tracking-[0.2em]"} ${light ? "text-[#F2A900]" : "text-[#F2A900]"}`}>
      <span aria-hidden="true" className={`h-px w-9 shrink-0 ${light ? "bg-[#F2A900]" : "bg-[#F2A900]"}`} />
      {children}
    </div>
  );
}

/** Standalone About page. The Home page's ScrollTrigger timelines are untouched. */
export function AboutExperience({ locale }: { locale: Locale }) {
  const rootRef = useRef<HTMLElement>(null);
  const t = aboutCopy[locale];
  const isArabic = locale === "ar";

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const heroContent = root.querySelectorAll("[data-about-hero-enter]");
        gsap.from(heroContent, {
          autoAlpha: 0,
          y: 28,
          duration: 0.85,
          stagger: 0.13,
          ease: "power3.out",
          delay: 0.12,
        });

        const mark = root.querySelector<HTMLElement>("[data-about-mark]");
        if (mark) {
          // Animate only the outer container. Let the Three.js mesh handle all 3D rotation.
          gsap.from(mark, { autoAlpha: 0, y: 24, scale: 0.86, duration: 1.15, ease: "power3.out", delay: 0.28 });
        }

        root.querySelectorAll<HTMLElement>("[data-about-reveal]").forEach((element) => {
          gsap.from(element, {
            autoAlpha: 0,
            y: 30,
            duration: 0.78,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 89%",
              toggleActions: "play none none reverse",
            },
          });
        });

        root.querySelectorAll<HTMLElement>("[data-about-value]").forEach((element) => {
          gsap.from(element, {
            autoAlpha: 0,
            y: 27,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          });
        });

        const progress = root.querySelector<HTMLElement>("[data-about-progress]");
        const values = root.querySelector<HTMLElement>("[data-about-values]");
        if (progress && values) {
          gsap.fromTo(progress, { scaleY: 0, transformOrigin: "top center" }, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: values, start: "top 70%", end: "bottom 65%", scrub: true },
          });
        }
      });
      return () => media.revert();
    },
    { scope: rootRef, dependencies: [locale], revertOnUpdate: true },
  );

  return (
    <main ref={rootRef} lang={locale} dir={isArabic ? "rtl" : "ltr"} className="relative w-full overflow-x-clip font-sans" style={{ fontFamily: "Inter, Arial, Helvetica, sans-serif" }}>
      {/* INTRO: distinct from the Home hero, with the original brand mark. */}
      <section
        data-about-hero-section
        aria-labelledby="about-page-title"
        className="relative isolate overflow-hidden bg-[#0F1B2D] pb-12 pt-[115px] text-[#F5F3EE] sm:pb-16 sm:pt-[140px] lg:min-h-[740px] lg:pb-24 lg:pt-[170px]"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_34%,rgba(91,107,127,0.54),transparent_53%),linear-gradient(125deg,#0F1B2D_18%,#253A51_100%)]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_92%)]" aria-hidden="true" />

        <div className="mx-auto grid w-full max-w-[1440px] items-center gap-5 px-6 sm:gap-8 sm:px-9 lg:grid-cols-[minmax(0,1.12fr)_minmax(320px,.88fr)] lg:gap-16 lg:px-16">
          <div className="relative z-10 order-2 max-w-[880px] lg:order-1">
            <div data-about-hero-enter>
              <SectionLabel light arabic={isArabic}>{t.heroLabel}</SectionLabel>
            </div>
            <h1 id="about-page-title" className={`mt-5 font-semibold sm:mt-7 lg:mt-9 ${isArabic ? "text-[clamp(2.45rem,5vw,5rem)] leading-[1.34]" : "text-[clamp(2.9rem,5.6vw,5.8rem)] leading-[1.07] tracking-[-0.06em]"}`}>
              <span data-about-hero-enter className="block">{t.heroTitleA}</span>
              <span data-about-hero-enter className="block text-[#F2A900]">{t.heroTitleB}</span>
            </h1>
            <p data-about-hero-enter className="mt-5 max-w-[620px] text-[15px] leading-[1.8] text-[#D7E0E9] sm:mt-7 sm:text-[17px] sm:leading-[1.9]">
              {t.heroDescription}
            </p>
            <a data-about-hero-enter href="#story" className="group mt-6 inline-flex items-center gap-3 rounded-full sm:mt-9 border border-white/40 px-6 py-3 text-[14px] font-semibold text-white transition-colors duration-300 hover:border-[#F2A900] hover:bg-[#F2A900] hover:text-[#0F1B2D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A900]">
              {t.explore}
              <ArrowDown size={16} strokeWidth={1.8} className="transition-transform group-hover:translate-y-1" aria-hidden="true" />
            </a>
          </div>
          <div className="relative order-1 mx-auto flex aspect-square w-[min(75vw,310px)] items-center justify-center sm:w-[min(70vw,370px)] lg:order-2 lg:-mt-3 lg:w-full lg:max-w-[590px] lg:-translate-y-14">
            <span aria-hidden="true" className="pointer-events-none absolute inset-[9%] rounded-[36%] bg-[radial-gradient(circle,rgba(242,169,0,0.13),transparent_68%)] blur-[44px]" />
            <div data-about-mark className="relative z-10 w-full will-change-transform">
              <AboutBrand3D isArabic={isArabic} />
            </div>
            <div className={`pointer-events-none absolute bottom-[-6%] hidden lg:block ${isArabic ? "right-0" : "left-0"} border-s-2 border-[#F2A900] ps-4 text-[10px] font-medium uppercase leading-5 tracking-[.16em] text-[#D0DCE6] sm:bottom-0`}>
              {t.heroFootnote}
            </div>
          </div>
        </div>
      </section>

      {/* PROMISE: hollow Amber text loop directly after the About Hero. */}
      <AboutPromiseLoop locale={locale} />

      {/* STORY: full-width editorial typography, not a recycled Home card. */}
      <section id="story" aria-labelledby="about-story-title" className="relative bg-[#F5F3EE] py-20 text-[#0F1B2D] sm:py-28 lg:py-32 scroll-mt-24">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-9 lg:px-16">
          <div data-about-reveal>
            <SectionLabel arabic={isArabic}>{t.storyLabel}</SectionLabel>
            <div className="mt-6 grid gap-5 md:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] md:gap-12">
              <h2 id="about-story-title" className={`${isArabic ? "text-[clamp(2.25rem,4.5vw,4.4rem)] leading-[1.3]" : "text-[clamp(2.65rem,4.4vw,4.5rem)] leading-[1.08] tracking-[-.055em]"} font-semibold`}>{t.storyTitle}</h2>
              <p className="max-w-[440px] self-end text-[16px] leading-[1.9] text-[#4D5B6C]">{t.storyBody}</p>
            </div>
          </div>

          <div className="relative mt-14 grid items-stretch gap-3 lg:mt-20 lg:grid-cols-[1fr_180px_1fr] lg:gap-5">
            <article data-about-reveal className="flex min-h-[255px] flex-col justify-between rounded-[25px] border border-[#C8CED4] bg-white p-7 sm:p-9 lg:min-h-[285px]">
              <div className="flex items-center justify-between">
                <span dir="ltr" className="text-[15px] font-semibold tracking-[.22em] text-[#F2A900]">SAPI</span>
                <span className="text-[12px] text-[#748195]">01</span>
              </div>
              <div>
                <h3 className="text-[clamp(1.6rem,2.5vw,2.3rem)] font-semibold text-[#0F1B2D]">{t.sapiWord}</h3>
                <p className="mt-3 max-w-[410px] text-[15px] leading-[1.9] text-[#556578]">{t.sapiDescription}</p>
              </div>
            </article>
            <div data-about-reveal className="relative mx-auto hidden h-full min-h-[220px] w-full items-center justify-center lg:flex">
              <div className="absolute inset-x-0 top-1/2 h-px bg-[#F2A900]/60" />
              <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-[28px] bg-[#0F1B2D] p-5 shadow-[0_15px_35px_rgba(15,27,45,.14)]">
                <Image src={brandIcon} alt="" aria-hidden="true" width={600} height={600} className="h-full w-full object-contain" unoptimized />
              </div>
            </div>
            <article data-about-reveal className="flex min-h-[255px] flex-col justify-between rounded-[25px] border border-[#C8CED4] bg-white p-7 sm:p-9 lg:min-h-[285px]">
              <div className="flex items-center justify-between">
                <span dir="ltr" className="text-[15px] font-semibold tracking-[.22em] text-[#F2A900]">HIVE</span>
                <span className="text-[12px] text-[#748195]">02</span>
              </div>
              <div>
                <h3 className="text-[clamp(1.6rem,2.5vw,2.3rem)] font-semibold text-[#0F1B2D]">{t.hiveWord}</h3>
                <p className="mt-3 max-w-[470px] text-[15px] leading-[1.9] text-[#556578]">{t.hiveDescription}</p>
              </div>
            </article>
          </div>

          <div data-about-reveal className="mt-8 border-s-[3px] border-[#F2A900] ps-6 text-[clamp(1.1rem,2vw,1.6rem)] font-medium leading-[1.75] text-[#0F1B2D] sm:mt-11">
            {t.storyClosing}
          </div>

          <div data-about-reveal className="mt-12 flex flex-wrap items-center justify-between gap-5 rounded-[22px] bg-[#E8E9E8] px-6 py-6 sm:px-9 sm:py-8">
            <div className="flex items-baseline gap-3" dir="ltr">
              <span className="text-[clamp(3.3rem,7vw,5.9rem)] font-semibold leading-none tracking-[-.07em] text-[#0F1B2D]">15<span className="text-[#F2A900]">+</span></span>
              <span className="max-w-[155px] text-[11px] font-bold uppercase leading-5 tracking-[.12em] text-[#435269]" dir={isArabic ? "rtl" : "ltr"}>{t.experienceLabel}</span>
            </div>
            <p className="max-w-[560px] text-[15px] leading-[1.85] text-[#4D5B6C]">{t.experienceDetail}</p>
          </div>
        </div>
      </section>

      {/* VISION / MISSION: architectural split on Steel Slate. */}
      <section aria-labelledby="about-purpose-title" className="relative overflow-hidden bg-[#5B6B7F] py-20 text-white sm:py-28 lg:py-32">
        <div className="pointer-events-none absolute -bottom-24 end-[-110px] h-[350px] w-[350px] rotate-12 rounded-[60px] border border-white/10 sm:h-[500px] sm:w-[500px]" aria-hidden="true" />
        <div className="mx-auto max-w-[1440px] px-6 sm:px-9 lg:px-16">
          <div data-about-reveal>
            <SectionLabel light arabic={isArabic}>{t.purposeLabel}</SectionLabel>
            <h2 id="about-purpose-title" className={`mt-6 max-w-[890px] font-semibold ${isArabic ? "text-[clamp(2.2rem,4.6vw,4.5rem)] leading-[1.3]" : "text-[clamp(2.5rem,4.6vw,4.7rem)] leading-[1.1] tracking-[-.055em]"}`}>{t.purposeTitle}</h2>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[25px] border border-white/20 bg-white/20 lg:mt-16 lg:grid-cols-2">
            <article data-about-reveal className="flex min-h-[300px] flex-col justify-between gap-10 bg-[#506176] px-7 py-9 sm:p-11">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[11px] font-semibold tracking-[.16em] text-[#F2A900]">01 / {t.visionTag}</span>
                <span className="h-px w-12 bg-[#F2A900]/80" />
              </div>
              <div>
                <h3 className="mb-5 text-[clamp(1.8rem,3vw,2.65rem)] font-semibold leading-tight">{t.visionTitle}</h3>
                <p className="max-w-[495px] text-[clamp(1.05rem,1.5vw,1.3rem)] leading-[1.85] text-white/90">{t.vision}</p>
              </div>
            </article>
            <article data-about-reveal className="flex min-h-[300px] flex-col justify-between gap-10 bg-[#42556C] px-7 py-9 sm:p-11">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[11px] font-semibold tracking-[.16em] text-[#F2A900]">02 / {t.missionTag}</span>
                <span className="h-px w-12 bg-[#F2A900]/80" />
              </div>
              <div>
                <h3 className="mb-5 text-[clamp(1.8rem,3vw,2.65rem)] font-semibold leading-tight">{t.missionTitle}</h3>
                <p className="max-w-[500px] text-[clamp(1.05rem,1.5vw,1.3rem)] leading-[1.85] text-white/90">{t.mission}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* VALUES: deliberate timeline rows, rather than another carousel of cards. */}
      <section data-about-values aria-labelledby="about-values-title" className="relative bg-white py-20 text-[#0F1B2D] sm:py-28 lg:py-32">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 sm:px-9 lg:grid-cols-[minmax(240px,.8fr)_minmax(0,1.2fr)] lg:gap-20 lg:px-16">
          <div className="lg:sticky lg:top-40 lg:self-start">
            <div data-about-reveal><SectionLabel arabic={isArabic}>{t.valuesLabel}</SectionLabel></div>
            <h2 id="about-values-title" data-about-reveal className={`mt-6 font-semibold ${isArabic ? "text-[clamp(2.6rem,5vw,5rem)] leading-[1.3]" : "text-[clamp(3.1rem,5.4vw,5.6rem)] leading-[1.04] tracking-[-.06em]"}`}>
              {t.valuesTitleA} <span className="text-[#F2A900]">{t.valuesTitleB}</span>
            </h2>
            <p data-about-reveal className="mt-6 max-w-[370px] text-[15px] leading-[1.9] text-[#536477]">{t.valuesLead}</p>
          </div>
          <div className="relative" data-about-values-list>
            <div aria-hidden="true" className={`absolute bottom-0 top-0 w-px bg-[#DDE1E5] ${isArabic ? "right-0" : "left-0"}`} />
            <div data-about-progress aria-hidden="true" className={`absolute bottom-0 top-0 w-[2px] bg-[#F2A900] ${isArabic ? "right-0" : "left-0"}`} />
            {t.values.map((item, index) => (
              <article key={index} data-about-value className="group relative border-b border-[#DDE1E5] py-8 ps-7 transition-colors duration-300 hover:bg-[#F5F3EE] sm:py-9 sm:ps-9">
                <div className="flex items-start gap-6 sm:gap-9">
                  <span className="pt-1 text-[12px] font-bold text-[#F2A900] tabular-nums" dir="ltr">{String(index + 1).padStart(2, "0")}</span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[clamp(1.22rem,2vw,1.7rem)] font-semibold leading-[1.4] tracking-tight text-[#0F1B2D]">{item.title}</h3>
                    <p className="mt-3 max-w-[640px] text-[15px] leading-[1.85] text-[#58687A]">{item.description}</p>
                  </div>
                  <MoveUpRight size={19} strokeWidth={1.4} className="mt-1 hidden shrink-0 text-[#9FADBB] transition-colors group-hover:text-[#F2A900] sm:block" aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
