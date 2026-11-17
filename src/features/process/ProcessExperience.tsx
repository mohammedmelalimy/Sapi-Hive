"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown, ArrowUpRight, ArrowLeft, ArrowRight,
  Check, ClipboardList, UsersRound, PlayCircle,
  BadgeCheck, TrendingUp, ShieldCheck, Languages,
  ReceiptText, SlidersHorizontal,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/config";
import { processCopy } from "@/i18n/process";
import { processPageCopy } from "@/i18n/processPage";
import AboutBrand3D from "@/features/about/AboutBrand3D";

gsap.registerPlugin(ScrollTrigger);

const stepIcons = [ClipboardList, UsersRound, PlayCircle, BadgeCheck, TrendingUp] as const;
const assuranceIcons = [ReceiptText, SlidersHorizontal, Languages, ShieldCheck] as const;

function SectionEyebrow({ text, isAr = false, dark = false }: { text: string; isAr?: boolean; dark?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[11px] font-semibold ${isAr ? "tracking-normal" : "uppercase tracking-[0.18em]"} ${dark ? "text-[#0F1B2D]" : "text-[#F2A900]"}`}>
      <span className={`h-[2px] w-8 shrink-0 ${dark ? "bg-[#0F1B2D]" : "bg-[#F2A900]"}`} aria-hidden="true" />
      {text}
    </p>
  );
}

/** Decorative workflow nodes; a process diagram, not a re-created brand logo. */
function ProcessOrbit({ locale }: { locale: Locale }) {
  const copy = processCopy[locale];
  const positions = [
    "left-[38%] top-[1%]",
    "right-[-3%] top-[25%]",
    "right-[10%] bottom-[3%]",
    "left-[4%] bottom-[14%]",
    "left-[-5%] top-[25%]",
  ];
  return (
    <div data-proc-orbit className="relative mx-auto aspect-square w-[min(70vw,265px)] max-w-full sm:w-[min(78vw,320px)] lg:w-full lg:max-w-[550px]" dir="ltr">
      <div aria-hidden="true" className="pointer-events-none absolute inset-[10%] rounded-full border border-white/10" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-[20%] rounded-full border border-dashed border-white/[0.13]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-[27%] rounded-full bg-[radial-gradient(circle,rgba(15,27,45,0.85),rgba(15,27,45,0.1)_70%)] shadow-[0_0_100px_rgba(242,169,0,0.1)]" />
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 500 500" fill="none">
        <circle cx="250" cy="250" r="206" stroke="white" strokeOpacity=".12" strokeWidth="1" strokeDasharray="4 8" />
        <circle data-proc-orbit-trace cx="250" cy="250" r="206" stroke="#F2A900" strokeWidth="2" strokeLinecap="round" strokeDasharray="1295" strokeDashoffset="1295" transform="rotate(-90 250 250)" />
      </svg>
      {/* Same interactive 3D SapiHive sculpture used in the About hero, enlarged for the Process orbit. */}
      <div data-proc-orbit-core className="absolute inset-[24%] z-10 grid place-items-center">
        <AboutBrand3D isArabic={locale === "ar"} />
      </div>
      {copy.steps.map((step, index) => {
        const Icon = stepIcons[index];
        return (
          <div key={index} data-proc-orbit-node aria-hidden="true" className={`pointer-events-none absolute ${positions[index]} z-20 flex items-center gap-1.5 rounded-full border border-white/20 bg-[#0F1B2D] px-2 py-2 shadow-[0_10px_30px_rgba(0,0,0,.23)] sm:gap-2 sm:px-3`}>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F2A900] text-[#0F1B2D] sm:h-9 sm:w-9"><Icon size={16} strokeWidth={1.9} /></span>
            <span className="hidden pe-1 text-[10px] font-semibold text-white sm:block sm:text-[12px]">{step.title}</span>
          </div>
        );
      })}
      <div aria-hidden="true" className="pointer-events-none absolute left-[38%] bottom-[-4%] text-[10px] font-medium tracking-[.18em] text-white/45">01 — 05</div>
    </div>
  );
}

/** Scroll-linked progress illustration. The content in the right column remains fully visible without JS. */
function ProcessRail({ locale, activeIndex }: { locale: Locale; activeIndex: number }) {
  const copy = processPageCopy[locale];
  const steps = processCopy[locale].steps;
  const ActiveIcon = stepIcons[activeIndex];

  return (
    <div className="relative isolate flex min-h-[500px] flex-col overflow-hidden rounded-[30px] bg-[#0F1B2D] p-7 text-[#F5F3EE] shadow-[0_35px_85px_rgba(15,27,45,0.13)] sm:p-9 lg:min-h-[560px]">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[.05] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-5">
        <span className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#F2A900]">{copy.journeyLabel}</span>
        <span dir="ltr" className="text-[12px] text-white/60">{String(activeIndex + 1).padStart(2, "0")} / 05</span>
      </div>

      <div className="relative my-auto flex flex-1 flex-col justify-center py-8">
        <span className="pointer-events-none absolute -end-3 top-3 select-none text-[clamp(8rem,17vw,14rem)] font-semibold leading-none tracking-[-.09em] text-white/[.035]" aria-hidden="true">{String(activeIndex + 1).padStart(2, "0")}</span>
        <div className="relative flex items-center gap-5">
          <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-[24px] border border-[#F2A900]/40 bg-[#F2A900]/10 text-[#F2A900]">
            <ActiveIcon size={36} strokeWidth={1.45} aria-hidden="true" />
          </div>
          <div>
            <div className="text-[11px] text-white/55">{copy.journeyProgress}</div>
            <div className="mt-1 text-[17px] font-semibold text-white sm:text-xl">{steps[activeIndex].title}</div>
          </div>
        </div>
        <div className="relative mt-11 grid grid-cols-5 gap-3" dir="ltr" role="img" aria-label={`${activeIndex + 1} / 5`}>
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full border text-[12px] font-semibold transition-[background-color,border-color,color] duration-300 sm:h-11 sm:w-11 ${index <= activeIndex ? "border-[#F2A900] bg-[#F2A900] text-[#0F1B2D]" : "border-white/25 bg-white/[.045] text-white/55"}`}>
                {index < activeIndex ? <Check size={18} strokeWidth={2.5} aria-hidden="true" /> : String(index + 1).padStart(2, "0")}
              </div>
              <span className={`h-1 w-full rounded-full transition-colors duration-300 ${index <= activeIndex ? "bg-[#F2A900]" : "bg-white/15"}`} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-end justify-between gap-4 border-t border-white/15 pt-5">
        <span className="max-w-[265px] text-[13px] leading-[1.65] text-white/65">{steps[activeIndex].text}</span>
        <span dir="ltr" className="shrink-0 text-[12px] font-semibold text-[#F2A900]">05 {copy.stepsTotal}</span>
      </div>
    </div>
  );
}

export function ProcessExperience({ locale }: { locale: Locale }) {
  const rootRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const copy = processPageCopy[locale];
  const base = processCopy[locale];
  const isAr = locale === "ar";
  const ArrowForLocale = isAr ? ArrowLeft : ArrowRight;
  const PreviousArrow = isAr ? ArrowRight : ArrowLeft;
  const NextArrow = isAr ? ArrowLeft : ArrowRight;
  const ActiveMobileIcon = stepIcons[activeStep];

  useGSAP(() => {
    const root = rootRef.current;
    if (!root) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-proc-stage]", root);
      const trackers = rows.map((row, index) => ScrollTrigger.create({
        trigger: row,
        start: "top 52%",
        end: "bottom 52%",
        onEnter: () => setActiveStep(index),
        onEnterBack: () => setActiveStep(index),
      }));
      return () => trackers.forEach((trigger) => trigger.kill());
    });

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-proc-stage]", root);
      rows.forEach((row) => {
        const parts = gsap.utils.toArray<HTMLElement>("[data-proc-stage-enter]", row);
        gsap.from(parts, {
          autoAlpha: 0,
          y: 36,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: { trigger: row, start: "top 82%", once: true },
        });
      });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const heroItems = gsap.utils.toArray<HTMLElement>("[data-proc-hero-item]", root);
      gsap.from(heroItems, {
        autoAlpha: 0,
        y: 32,
        stagger: 0.13,
        duration: 0.95,
        delay: 0.1,
        ease: "power3.out",
        clearProps: "all",
      });
      const orbit = root.querySelector<HTMLElement>("[data-proc-orbit]");
      if (orbit) {
        gsap.from(orbit, { autoAlpha: 0, scale: 0.92, duration: 1.25, delay: 0.22, ease: "power3.out", clearProps: "all" });
        const trace = orbit.querySelector<SVGElement>("[data-proc-orbit-trace]");
        if (trace) gsap.to(trace, { strokeDashoffset: 0, duration: 2.3, delay: 0.65, ease: "power2.inOut" });
        const nodes = gsap.utils.toArray<HTMLElement>("[data-proc-orbit-node]", orbit);
        gsap.from(nodes, { autoAlpha: 0, scale: 0.75, duration: 0.65, stagger: 0.14, delay: 0.6, ease: "back.out(1.5)", clearProps: "all" });
      }

      const revealItems = gsap.utils.toArray<HTMLElement>("[data-proc-reveal]", root);
      revealItems.forEach((item) => {
        gsap.from(item, {
          autoAlpha: 0,
          y: 34,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: { trigger: item, start: "top 88%", once: true },
        });
      });
    });

    return () => mm.revert();
  }, { scope: rootRef, dependencies: [locale], revertOnUpdate: true });

  return (
    <main ref={rootRef} lang={locale} dir={isAr ? "rtl" : "ltr"} className="w-full min-w-0 max-w-full overflow-x-clip font-sans">
      {/* 01 — INTRO: asymmetric title with a five-stage orbit. */}
      <section aria-labelledby="process-page-title" className="relative isolate overflow-hidden bg-[#0F1B2D] pt-10 pb-9 text-white lg:min-h-[680px] lg:pb-20 lg:pt-16">
        {/* Match About hero's navy-to-slate background without changing the orbit or GSAP. */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_34%,rgba(91,107,127,0.54),transparent_53%),linear-gradient(125deg,#0F1B2D_18%,color-mix(in_srgb,#0F1B2D_65%,#5B6B7F_35%)_100%)]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[.045] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:78px_78px]" aria-hidden="true" />
        <div className="mx-auto grid w-full min-w-0 max-w-[1440px] grid-cols-1 items-center gap-5 px-6 sm:px-9 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,.88fr)] lg:gap-7 lg:px-16">
          <div className="relative z-10 min-w-0 max-w-[820px]">
            <div data-proc-hero-item><SectionEyebrow text={copy.eyebrow} isAr={isAr} /></div>
            <h1 id="process-page-title" className={`mt-5 font-semibold sm:mt-8 ${isAr ? "text-[clamp(2.15rem,8vw,2.8rem)] leading-[1.22] sm:text-[clamp(2.8rem,5.4vw,6.1rem)] sm:leading-[1.3]" : "text-[clamp(2.1rem,8.8vw,2.7rem)] leading-[1.1] tracking-[-.055em] sm:text-[clamp(3.35rem,6vw,6.7rem)] sm:leading-[1.04] sm:tracking-[-.066em]"}`}>
              <span data-proc-hero-item className="block">{copy.heroFirst}</span>
              <span data-proc-hero-item className="block text-[#F2A900]">{copy.heroSecond}</span>
            </h1>
            <p data-proc-hero-item className="mt-4 max-w-[605px] text-[14px] leading-[1.65] text-white/80 sm:mt-7 sm:text-[17px] sm:leading-[1.9]">{base.description}</p>
            <a data-proc-hero-item href="#journey" className="group mt-6 inline-flex items-center sm:mt-9 gap-3 rounded-full border border-white/30 bg-white/[.06] px-6 py-3.5 text-[14px] font-semibold text-white transition-colors duration-300 hover:border-[#F2A900] hover:bg-[#F2A900] hover:text-[#0F1B2D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A900]">
              {copy.heroScroll}<ArrowDown size={17} strokeWidth={1.8} className="transition-transform group-hover:translate-y-1" aria-hidden="true" />
            </a>
          </div>
          <div className="relative mx-auto flex w-full min-w-0 max-w-[590px] items-center justify-center lg:py-5">
            <ProcessOrbit locale={locale} />
          </div>
        </div>
        <div data-proc-hero-item className="mx-auto mt-6 flex max-w-[1440px] items-center justify-between gap-4 border-t border-white/15 px-6 pt-4 text-[10px] font-semibold uppercase tracking-[.19em] text-white/50 sm:px-9 lg:mt-20 lg:px-16">
          <span>{copy.heroNote}</span><span dir="ltr">01 / 05</span>
        </div>
      </section>

      {/* 02 — THE JOURNEY: sticky illustrated rail + five long-form scroll chapters. */}
      <section id="journey" aria-labelledby="process-journey-title" className="scroll-mt-20 bg-[#F5F3EE] py-12 text-[#0F1B2D] lg:py-32">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-9 lg:px-16">
          <div data-proc-reveal className="max-w-[950px]">
            <SectionEyebrow text={copy.journeyEyebrow} isAr={isAr} dark />
            <h2 id="process-journey-title" className={`mt-4 font-semibold sm:mt-6 ${isAr ? "text-[clamp(2rem,7vw,2.5rem)] leading-[1.2] sm:text-[clamp(2.5rem,4.7vw,5.1rem)] sm:leading-[1.25]" : "text-[clamp(2.1rem,7vw,3rem)] leading-[1.13] tracking-[-.045em] sm:text-[clamp(3rem,5vw,5.5rem)] sm:leading-[1.07] sm:tracking-[-.06em]"}`}>
              {copy.journeyTitle} <span className="text-[#F2A900]">{copy.journeyAccent}</span>
            </h2>
            <p className="mt-3 max-w-[610px] text-[14px] leading-[1.7] text-[#5B6B7F] sm:mt-6 sm:text-[18px] sm:leading-[1.9]">{copy.journeyDescription}</p>
          </div>
          <div className="mt-8 grid gap-10 sm:mt-16 lg:mt-20 lg:grid-cols-[minmax(0,.86fr)_minmax(0,1.14fr)] lg:gap-12 xl:gap-20">
            <div className="hidden lg:block">
              <div className="sticky top-[117px]"><ProcessRail locale={locale} activeIndex={activeStep} /></div>
            </div>
            <div className="hidden lg:block">
              {/* Desktop timeline stays scroll-linked; mobile gets the interactive stepper below. */}
              {base.steps.map((step, index) => {
                const Icon = stepIcons[index];
                return (
                  <article key={index} id={`process-step-${index + 1}`} data-proc-stage className="relative flex min-h-[63svh] flex-col justify-center border-b border-[#5B6B7F]/20 py-20 last:border-b-0">
                    <div className="absolute -start-[34px] top-[74px] flex h-[14px] w-[14px] items-center justify-center rounded-full border-[3px] border-[#F5F3EE] bg-[#F2A900] sm:-start-[50px] lg:hidden" aria-hidden="true" />
                    <div data-proc-stage-enter className="flex items-center justify-between gap-5">
                      <span dir="ltr" className="text-[12px] font-semibold tracking-[.14em] text-[#5B6B7F]">{copy.stageText} / {String(index + 1).padStart(2, "0")}</span>
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-[14px] border border-[#5B6B7F]/25 text-[#0F1B2D] sm:h-14 sm:w-14"><Icon size={25} strokeWidth={1.5} aria-hidden="true" /></span>
                    </div>
                    <h3 data-proc-stage-enter className={`mt-7 font-semibold ${isAr ? "text-[clamp(2.35rem,4vw,4.7rem)] leading-[1.3]" : "text-[clamp(2.7rem,4.7vw,5.2rem)] leading-[1.06] tracking-[-.055em]"}`}>{step.title}<span className="text-[#F2A900]">.</span></h3>
                    <p data-proc-stage-enter className="mt-6 max-w-[510px] text-[16px] leading-[1.9] text-[#5B6B7F] sm:text-[18px]">{step.text}</p>
                    <div data-proc-stage-enter className="mt-12 flex items-center gap-3" aria-hidden="true">
                      <div className="h-[3px] w-16 rounded-full bg-[#F2A900]" />
                      <div className="h-[3px] w-7 rounded-full bg-[#5B6B7F]/25" />
                      <div className="h-[3px] w-3 rounded-full bg-[#5B6B7F]/25" />
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Compact mobile flow: all five stages are available without five tall stacked chapters. */}
            <div className="lg:hidden">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] font-semibold uppercase tracking-[.12em] text-[#5B6B7F]">{copy.journeyLabel}</span>
                <span className="shrink-0 text-xs text-[#5B6B7F]" dir="ltr">{String(activeStep + 1).padStart(2, "0")} / 05</span>
              </div>
              <div className="mt-4 grid grid-cols-5 gap-2" role="group" aria-label={copy.journeyLabel}>
                {base.steps.map((step, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-pressed={activeStep === index}
                    aria-controls="process-mobile-active-stage"
                    aria-label={`${copy.stageText} ${index + 1}: ${step.title}`}
                    onClick={() => setActiveStep(index)}
                    className={`flex min-h-12 items-center justify-center rounded-[12px] border text-[13px] font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2A900] ${activeStep === index ? "border-[#F2A900] bg-[#F2A900] text-[#0F1B2D]" : "border-[#5B6B7F]/25 bg-white text-[#5B6B7F]"}`}
                  >
                    <span dir="ltr">{String(index + 1).padStart(2, "0")}</span>
                  </button>
                ))}
              </div>
              <article id="process-mobile-active-stage" aria-live="polite" aria-atomic="true" className="mt-4 overflow-hidden rounded-[24px] border border-[#5B6B7F]/20 bg-white p-6 shadow-[0_14px_40px_rgba(15,27,45,.05)]">
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#0F1B2D] text-[#F2A900]">
                    <ActiveMobileIcon size={24} strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <span dir="ltr" className="text-xs font-semibold tracking-[.14em] text-[#5B6B7F]">{copy.stageText} / {String(activeStep + 1).padStart(2, "0")}</span>
                </div>
                <h3 className={`mt-5 font-semibold text-[#0F1B2D] ${isAr ? "text-[27px] leading-[1.3]" : "text-[30px] leading-[1.1] tracking-[-.055em]"}`}>
                  {base.steps[activeStep].title}<span className="text-[#F2A900]">.</span>
                </h3>
                <p className="mt-3 text-[14px] leading-[1.7] text-[#5B6B7F]">{base.steps[activeStep].text}</p>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#5B6B7F]/20 pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveStep((previous) => Math.max(0, previous - 1))}
                    disabled={activeStep === 0}
                    aria-label={isAr ? "المرحلة السابقة" : "Previous stage"}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[#5B6B7F]/25 text-[#0F1B2D] transition-colors hover:bg-[#F5F3EE] disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <PreviousArrow size={19} aria-hidden="true" />
                  </button>
                  <span dir="ltr" className="text-[12px] font-semibold text-[#5B6B7F]">{String(activeStep + 1).padStart(2, "0")} / 05</span>
                  <button
                    type="button"
                    onClick={() => setActiveStep((previous) => Math.min(base.steps.length - 1, previous + 1))}
                    disabled={activeStep === base.steps.length - 1}
                    aria-label={isAr ? "المرحلة التالية" : "Next stage"}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[#5B6B7F]/25 text-[#0F1B2D] transition-colors hover:bg-[#F5F3EE] disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <NextArrow size={19} aria-hidden="true" />
                  </button>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — RESPONSIBILITY SPLIT. Content follows the Profile's "what you stop doing / keep" model. */}
      <section aria-labelledby="process-overview-title" className="bg-white py-12 text-[#0F1B2D] lg:py-32">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-9 lg:px-16">
          <div data-proc-reveal>
            <SectionEyebrow text={copy.overviewEyebrow} isAr={isAr} dark />
            <h2 id="process-overview-title" className={`mt-4 font-semibold sm:mt-6 ${isAr ? "text-[clamp(1.9rem,7vw,2.35rem)] leading-[1.25] sm:text-[clamp(2.35rem,4.5vw,5rem)] sm:leading-[1.3]" : "text-[clamp(2rem,7.5vw,2.8rem)] leading-[1.13] tracking-[-.04em] sm:text-[clamp(2.8rem,4.8vw,5.2rem)] sm:leading-[1.07] sm:tracking-[-.058em]"}`}>
              {copy.overviewTitle} <span className="text-[#F2A900]">{copy.overviewAccent}</span>
            </h2>
          </div>
          <div className="mt-7 grid gap-4 sm:mt-12 sm:gap-5 lg:mt-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-7">
            <article data-proc-reveal className="flex flex-col rounded-[22px] bg-[#F5F3EE] p-5 sm:rounded-[26px] sm:p-10 lg:min-h-[580px]">
              <div className="flex items-center justify-between gap-4 border-b border-[#5B6B7F]/20 pb-4 sm:pb-6">
                <h3 className="text-[clamp(1.45rem,2.25vw,2rem)] font-semibold">{copy.stopTitle}</h3>
                <span className="text-[12px] font-semibold text-[#5B6B7F]" dir="ltr">01 / 02</span>
              </div>
              <ul className="mt-4 grid grid-cols-2 gap-x-3 sm:mt-6 sm:gap-x-8">
                {copy.stopItems.map((item, index) => (
                  <li key={item} className="flex min-h-[58px] items-center gap-2 border-b border-[#5B6B7F]/20 py-2.5 text-[12px] font-medium leading-[1.45] text-[#5B6B7F] sm:min-h-[65px] sm:gap-3 sm:py-3 sm:text-[15px]">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#5B6B7F]/15 text-[11px] text-[#5B6B7F]" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
            <article data-proc-reveal className="relative isolate flex flex-col overflow-hidden rounded-[22px] bg-[#F2A900] p-5 sm:rounded-[26px] lg:min-h-[580px] lg:p-10">
              <div className="pointer-events-none absolute -end-16 -bottom-16 h-[330px] w-[330px] rounded-full border border-[#0F1B2D]/15" aria-hidden="true" />
              <div className="pointer-events-none absolute -end-6 -bottom-6 h-[240px] w-[240px] rounded-full border border-[#0F1B2D]/15" aria-hidden="true" />
              <div className="flex items-center justify-between gap-4 border-b border-[#0F1B2D]/25 pb-4 sm:pb-6">
                <h3 className="text-[clamp(1.45rem,2.25vw,2rem)] font-semibold">{copy.keepTitle}</h3>
                <span dir="ltr" className="text-[12px] font-semibold text-[#0F1B2D]/65">02 / 02</span>
              </div>
              <div className="relative my-auto py-6 sm:py-10">
                <span className={`block font-semibold ${isAr ? "text-[clamp(1.8rem,6vw,2.3rem)] leading-[1.3] sm:text-[clamp(2.3rem,3.9vw,4.4rem)] sm:leading-[1.37]" : "text-[clamp(1.9rem,6.5vw,2.4rem)] leading-[1.15] tracking-[-.045em] sm:text-[clamp(2.4rem,3.9vw,4.7rem)] sm:leading-[1.12] sm:tracking-[-.055em]"}`}>{copy.keepBody}</span>
              </div>
              <div className="relative border-t border-[#0F1B2D]/25 pt-4 text-[12px] sm:pt-5 font-semibold uppercase tracking-[.12em]">{copy.keepFooter}</div>
            </article>
          </div>
        </div>
      </section>

      {/* 04 — FOUR PROMISES: sourced from Why SapiHive in Company Profile page 9. */}
      <section aria-labelledby="process-why-title" className="relative isolate overflow-hidden bg-[#0F1B2D] py-12 text-white lg:py-32">
        <div className="pointer-events-none absolute -end-28 -top-40 h-[480px] w-[480px] rounded-full border border-white/10" aria-hidden="true" />
        <div className="mx-auto max-w-[1440px] px-6 sm:px-9 lg:px-16">
          <div data-proc-reveal>
            <SectionEyebrow text={copy.whyEyebrow} isAr={isAr} />
            <h2 id="process-why-title" className={`mt-4 font-semibold sm:mt-6 ${isAr ? "text-[clamp(2rem,7vw,2.4rem)] leading-[1.23] sm:text-[clamp(2.4rem,4.7vw,5rem)] sm:leading-[1.3]" : "text-[clamp(2.1rem,7vw,2.9rem)] leading-[1.13] tracking-[-.04em] sm:text-[clamp(2.9rem,5vw,5.5rem)] sm:leading-[1.07] sm:tracking-[-.06em]"}`}>
              {copy.whyTitle} <span className="text-[#F2A900]">{copy.whyAccent}</span>
            </h2>
          </div>
          <div className="mt-7 grid border-t border-white/30 sm:mt-12 md:grid-cols-2 lg:mt-16">
            {copy.assurances.map((item, index) => {
              const Icon = assuranceIcons[index];
              return (
                <article key={index} data-proc-reveal className={`group flex flex-col gap-3 border-b border-white/25 py-5 transition-colors duration-300 hover:bg-white/[.045] lg:min-h-[245px] lg:gap-6 lg:p-8 ${index % 2 === 0 ? "md:border-e" : ""}`}>
                  <div className="flex items-start justify-between gap-5">
                    <span dir="ltr" className="text-[12px] font-semibold tracking-[.12em] text-[#F2A900]">0{index + 1}</span>
                    <Icon size={28} strokeWidth={1.4} className="text-[#F2A900]" aria-hidden="true" />
                  </div>
                  <div className="mt-auto">
                    <h3 className="text-[clamp(1.4rem,2.2vw,2rem)] font-semibold leading-[1.3]">{item.title}</h3>
                    <p className="mt-2 max-w-[470px] text-[14px] leading-[1.65] text-white/80 sm:mt-3 sm:text-[15px] sm:leading-[1.8]">{item.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 05 — CTA. Only internal links; no placeholder external contact endpoint. */}
      <section className="bg-white py-12 text-[#0F1B2D] lg:py-32" aria-labelledby="process-cta-title">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-9 lg:px-16">
          <div data-proc-reveal className="relative isolate overflow-hidden rounded-[24px] bg-[#F2A900] px-6 py-8 text-[#0F1B2D] lg:rounded-[30px] lg:px-16 lg:py-20">
            <div className="pointer-events-none absolute -end-28 -top-28 h-[450px] w-[450px] rounded-full border border-[#0F1B2D]/15" aria-hidden="true" />
            <div className="pointer-events-none absolute -end-10 -top-10 h-[290px] w-[290px] rounded-full border border-[#0F1B2D]/15" aria-hidden="true" />
            <p className={`relative text-[11px] font-semibold ${isAr ? "tracking-normal" : "uppercase tracking-[.18em]"}`}>{copy.ctaEyebrow}</p>
            <h2 id="process-cta-title" className={`relative mt-4 max-w-[980px] font-semibold sm:mt-6 ${isAr ? "text-[clamp(1.9rem,7vw,2.3rem)] leading-[1.23] sm:text-[clamp(2.3rem,4.4vw,5rem)] sm:leading-[1.3]" : "text-[clamp(2rem,7vw,2.6rem)] leading-[1.12] tracking-[-.045em] sm:text-[clamp(2.6rem,4.8vw,5.5rem)] sm:leading-[1.06] sm:tracking-[-.06em]"}`}>
              {copy.ctaTitle} <span className="block">{copy.ctaAccent}</span>
            </h2>
            <div className="relative mt-6 flex flex-col items-stretch gap-3 sm:mt-12 sm:flex-row sm:flex-wrap sm:items-start">
              <Link href={localizedPath(locale, "/contact")} className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#0F1B2D] px-6 py-3.5 text-[14px] font-semibold text-white transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F1B2D]">
                {copy.ctaMain}<ArrowForLocale size={17} strokeWidth={1.8} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <Link href={localizedPath(locale, "/services")} className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-[#0F1B2D]/35 px-6 py-3.5 text-[14px] font-semibold transition-colors duration-300 hover:border-[#0F1B2D] hover:bg-[#0F1B2D]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F1B2D]">
                {copy.ctaOther}<ArrowUpRight size={17} strokeWidth={1.7} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
