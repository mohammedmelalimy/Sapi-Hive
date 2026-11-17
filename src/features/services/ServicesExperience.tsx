"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { localizedPath, type Locale } from "@/i18n/config";
import { getServices } from "@/i18n/services";
import styles from "./ServicesExperience.module.css";

gsap.registerPlugin(ScrollTrigger);

type ServiceSlug = "hive-corporate" | "hive-tech" | "hive-people" | "hive-talent" | "hive-creative";
const order: ServiceSlug[] = ["hive-corporate", "hive-tech", "hive-people", "hive-talent", "hive-creative"];

const copy = {
  en: {
    eyebrow: "SAPIHIVE  /  WORKFORCE-AS-A-SERVICE",
    heroLine1: "Your business.",
    heroLine2: "Our people.",
    intro: "Five specialist Hives. One partner that builds, employs and manages the teams behind your next move.",
    discover: "Discover our expertise",
    featured: "THE FIVE HIVES",
    scroll: "SCROLL TO EXPLORE",
    index: "EXPLORE THE HIVE",
    serviceLabel: "OUR SERVICES",
    serviceTitle1: "Different expertise.",
    serviceTitle2: "One direction.",
    serviceIntro: "Explore the specialist teams that can help your business move forward.",
    open: "Explore service",
    all: "ALL SERVICES",
    cap: "WHAT WE DO",
    section3label: "WHY SAPIHIVE",
    section3title1: "Less complexity.",
    section3title2: "More capability.",
    section3body: "We take care of building and running the team. You stay focused on the business and the results.",
    reasons: [
      { no: "01", title: "One monthly invoice", body: "Salaries, HR and compliance handled together." },
      { no: "02", title: "You stay in control", body: "Interview, approve and direct your team." },
      { no: "03", title: "Bilingual by default", body: "Arabic and English teams, ready to work." },
      { no: "04", title: "Built to adapt", body: "Scale your team as your needs change." },
    ],
    endLabel: "YOUR NEXT MOVE",
    endTitle: "Need a team?\nLet's build one.",
    endBody: "Tell us what you're working on. We'll find the right people and the right way forward.",
    endAction: "Let's talk business",
    offerings: "CORE CAPABILITIES",
    mobileHint: "Explore our five specialist Hives",
    categories: {
      "hive-corporate": "BUSINESS OPERATIONS",
      "hive-tech": "DIGITAL & ENGINEERING",
      "hive-people": "HUMAN RESOURCES",
      "hive-talent": "EVENTS & ACTIVATIONS",
      "hive-creative": "BRAND & CONTENT",
    },
  },
  ar: {
    eyebrow: "سابي هايف  /  القوى العاملة كخدمة",
    heroLine1: "شغلك يكبر.",
    heroLine2: "وإحنا فريقك.",
    intro: "خمس خدمات متخصصة وشريك واحد بيبني ويدير الفرق اللي تساعد شركتك تاخد خطوتها الجاية.",
    discover: "اكتشف خدماتنا",
    featured: "الخدمات الخمسة",
    scroll: "تصفّح الخدمات",
    index: "اكتشف الخدمة",
    serviceLabel: "خدماتنا",
    serviceTitle1: "خبرات مختلفة.",
    serviceTitle2: "واتجاه واحد.",
    serviceIntro: "اختار الفريق المتخصص اللي يناسب احتياج شركتك ويساعدها تتحرك لقدام.",
    open: "اكتشف تفاصيل الخدمة",
    all: "جميع الخدمات",
    cap: "التخصصات",
    section3label: "ليه سابي هايف؟",
    section3title1: "تعقيد أقل.",
    section3title2: "وإمكانيات أكتر.",
    section3body: "بنتولى بناء الفريق وإدارته، وإنت تفضل مركز على شركتك والنتائج اللي عاوز تحققها.",
    reasons: [
      { no: "01", title: "فاتورة شهرية واحدة", body: "الرواتب والموارد البشرية والمتطلبات الإدارية في مكان واحد." },
      { no: "02", title: "التحكم في إيدك", body: "بتقابل أعضاء فريقك وتوافق عليهم وتوجّه شغلهم." },
      { no: "03", title: "عربي وإنجليزي", body: "فرق جاهزة للتواصل والعمل باللغتين." },
      { no: "04", title: "مرونة في التوسع", body: "كبر أو عدّل فريقك حسب احتياج شركتك." },
    ],
    endLabel: "خطوتك الجاية",
    endTitle: "محتاج فريق؟\nخلينا نبنيه سوا.",
    endBody: "احكيلنا عن احتياج شركتك ونساعدك توصل للناس والخبرات المناسبة.",
    endAction: "تواصل مع فريقنا",
    offerings: "مجالات العمل",
    mobileHint: "اكتشف خدماتنا الخمس المتخصصة",
    categories: {
      "hive-corporate": "العمليات وإدارة الأعمال",
      "hive-tech": "التقنية والبرمجيات",
      "hive-people": "التوظيف والموارد البشرية",
      "hive-talent": "الفعاليات والحملات",
      "hive-creative": "الهوية والمحتوى",
    },
  },
} as const;

const cardClasses: Record<ServiceSlug, string> = {
  "hive-corporate": `${styles.corporate} lg:col-span-7 lg:row-span-2`,
  "hive-tech": `${styles.tech} lg:col-span-5`,
  "hive-people": `${styles.people} lg:col-span-5`,
  "hive-talent": `${styles.talent} lg:col-span-5`,
  "hive-creative": `${styles.creative} lg:col-span-7`,
};

export function ServicesExperience({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const [activeMobileSlide, setActiveMobileSlide] = useState(0);
  const mobileSliderRef = useRef<HTMLDivElement>(null);
  const mobileIndexRef = useRef(0);
  const pauseAutoplayUntilRef = useRef(0);
  const ar = locale === "ar";
  const t = copy[locale];
  const data = getServices(locale);
  const services = order.flatMap((slug) => {
    const item = data.find((s) => s.slug === slug);
    return item ? [{ ...item, slug }] : [];
  });
  const url = (path: string) => localizedPath(locale, path);


  // Native horizontal scroll + CSS scroll-snap: touch swiping, keyboard-accessible
  // navigation and autoplay without shifting the document's layout width.
  const scrollToMobileSlide = useCallback((requestedIndex: number, behavior: ScrollBehavior = "smooth") => {
    const track = mobileSliderRef.current;
    if (!track) return;
    const slides = Array.from(track.querySelectorAll<HTMLElement>("[data-sv-slide]"));
    if (!slides.length) return;
    const index = ((requestedIndex % slides.length) + slides.length) % slides.length;
    const target = slides[index];
    const trackBox = track.getBoundingClientRect();
    const slideBox = target.getBoundingClientRect();
    // Physical pixel delta also works with negative scrollLeft in RTL browsers.
    const offset = slideBox.left + slideBox.width / 2 - (trackBox.left + trackBox.width / 2);
    track.scrollBy({ left: offset, behavior });
    mobileIndexRef.current = index;
    setActiveMobileSlide(index);
  }, []);

  const selectMobileSlide = (index: number) => {
    pauseAutoplayUntilRef.current = Date.now() + 8500;
    scrollToMobileSlide(index);
  };

  useEffect(() => {
    const track = mobileSliderRef.current;
    if (!track) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isVisible = false;
    let pointerIsDown = false;
    let hovering = false;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = Boolean(entry?.isIntersecting); },
      { threshold: 0.4 },
    );
    observer.observe(track);

    const onScroll = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const center = track.getBoundingClientRect().left + track.clientWidth / 2;
        const slides = track.querySelectorAll<HTMLElement>("[data-sv-slide]");
        let closest = 0;
        let minDistance = Infinity;
        slides.forEach((slide, i) => {
          const box = slide.getBoundingClientRect();
          const distance = Math.abs(box.left + box.width / 2 - center);
          if (distance < minDistance) { minDistance = distance; closest = i; }
        });
        if (mobileIndexRef.current !== closest) {
          mobileIndexRef.current = closest;
          setActiveMobileSlide(closest);
        }
      });
    };
    const onPointerDown = () => {
      pointerIsDown = true;
      pauseAutoplayUntilRef.current = Date.now() + 8500;
    };
    const onPointerUp = () => {
      pointerIsDown = false;
      pauseAutoplayUntilRef.current = Date.now() + 8500;
    };
    const onMouseEnter = () => { hovering = true; };
    const onMouseLeave = () => { hovering = false; };
    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });
    track.addEventListener("mouseenter", onMouseEnter);
    track.addEventListener("mouseleave", onMouseLeave);

    const timer = window.setInterval(() => {
      if (motion.matches || document.hidden || !isVisible || hovering || pointerIsDown ||
          track.contains(document.activeElement) || Date.now() < pauseAutoplayUntilRef.current) return;
      const next = (mobileIndexRef.current + 1) % order.length;
      // Reset to slide 1 instantly instead of scrolling backwards past 4 cards.
      scrollToMobileSlide(next, next === 0 ? "instant" : "smooth");
    }, 4200);

    return () => {
      window.clearInterval(timer);
      observer.disconnect();
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      track.removeEventListener("mouseenter", onMouseEnter);
      track.removeEventListener("mouseleave", onMouseLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [scrollToMobileSlide]);


  useGSAP(() => {
    if (!root.current) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const hero = gsap.timeline({ defaults: { ease: "power3.out" } });
      hero.from("[data-v4-hero-line]", { yPercent: 106, duration: 1.05, stagger: 0.16 })
        .from("[data-v4-hero-copy]", { y: 24, opacity: 0, duration: .8 }, "-=.58")
        .from("[data-v4-index-row]", { x: ar ? -65 : 65, opacity: 0, stagger: .085, duration: .76 }, "-=.95");

      gsap.utils.toArray<HTMLElement>("[data-v4-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0, y: 44, duration: .95, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });
    });

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-v4-card]").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0, y: 95, rotate: i % 2 ? 2 : -2, scale: .96,
          duration: 1.12, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 94%", once: true },
        });
      });
      gsap.to("[data-v4-hero-bg]", {
        yPercent: 16, ease: "none",
        scrollTrigger: { trigger: "[data-v4-hero]", start: "top top", end: "bottom top", scrub: 1.15 },
      });
      gsap.utils.toArray<HTMLElement>("[data-v4-trait]").forEach((el, i) => {
        gsap.from(el, {
          x: i % 2 === 0 ? -50 : 50, opacity: 0, duration: .85,
          scrollTrigger: { trigger: el, start: "top 91%", once: true },
        });
      });
    });
    return () => mm.revert();
  }, { scope: root, dependencies: [locale], revertOnUpdate: true });

  return (
    <main ref={root} dir={ar ? "rtl" : "ltr"} lang={locale} className={`${styles.palette} w-full min-w-0 overflow-x-clip bg-[#F5F3EE] text-[#0F1B2D]`}>
      {/* 01 — Hero: one visual continuation of the internal-page navy navbar */}
      <section data-v4-hero aria-labelledby="sapi-services-title" className={`${styles.hero} relative isolation-isolate overflow-hidden text-white`}>
        <div data-v4-hero-bg className={styles.heroAtmosphere} aria-hidden="true" />
        <div className="relative z-10 mx-auto grid w-full min-w-0 max-w-[1440px] grid-cols-1 gap-10 px-5 pb-14 pt-14 sm:px-9 md:pb-20 lg:min-h-[590px] lg:grid-cols-[minmax(0,1.14fr)_minmax(0,.86fr)] lg:items-center lg:gap-24 lg:px-12 lg:py-20 xl:px-16">
          <div className="min-w-0">
            <div className="mb-7 flex min-w-0 items-center gap-3 text-[10px] font-semibold tracking-[.15em] text-white/60 sm:text-[11px]">
              <span className="h-px w-8 bg-[#F2A900]" /> {t.eyebrow}
            </div>
            <h1 id="sapi-services-title" className={`font-semibold ${ar ? "text-[clamp(2rem,8vw,2.55rem)] sm:text-[clamp(2.55rem,5.4vw,5.4rem)] leading-[1.3]" : "text-[clamp(2.15rem,9.2vw,3.3rem)] sm:text-[clamp(3.3rem,6.5vw,7.2rem)] leading-[1.06] sm:leading-[.99] tracking-[-.065em] sm:tracking-[-.079em]"}`}>
              <span className="block overflow-hidden pb-[.12em]"><span data-v4-hero-line className="block">{t.heroLine1}</span></span>
              <span className="block overflow-hidden pb-[.12em]"><span data-v4-hero-line className="block text-[var(--sv-soft-amber)]">{t.heroLine2}</span></span>
            </h1>
            <p data-v4-hero-copy className="mt-4 max-w-full sm:max-w-[565px] text-[15px] leading-[1.85] text-white/65 sm:text-[17px]">{t.intro}</p>
            <div data-v4-hero-copy className="mt-8 flex min-w-0 flex-wrap items-center gap-4 sm:gap-5">
              <a href="#our-hives" className={`${styles.roundCta} group inline-flex items-center gap-3 rounded-full bg-[var(--sv-soft-amber)] px-6 py-3.5 text-[13px] font-semibold text-[#0F1B2D] transition-colors hover:bg-white`}>
                {t.discover} <ArrowDownRight size={16} aria-hidden="true" className={`transition-transform group-hover:translate-y-1 ${ar ? "-scale-x-100" : ""}`} />
              </a>
              <span className="hidden text-[10px] tracking-[.17em] text-white/40 sm:inline">{t.scroll}</span>
            </div>
          </div>

          <div className={`${styles.heroIndex} relative hidden lg:block`} aria-label={t.featured}>
            <div className="mb-5 flex items-center justify-between border-b border-white/20 pb-3 text-[10px] font-semibold tracking-[.16em] text-white/55">
              <span>{t.featured}</span>
            </div>
            {services.map((service, i) => (
              <Link data-v4-index-row key={service.slug} href={url(`/services/${service.slug}`)} className={`${styles.indexRow} group flex items-center gap-3 border-b border-white/15 py-3.5`}>
                <span className="w-8 shrink-0 text-[12px] text-[var(--sv-soft-amber)]" dir="ltr">0{i + 1}</span>
                <span className="flex-1 text-[clamp(1.1rem,1.7vw,1.45rem)] font-medium tracking-[-.035em]" dir="ltr">{service.title}</span>
                <ArrowUpRight aria-hidden="true" size={19} className={`shrink-0 text-white/45 transition-all group-hover:text-[var(--sv-soft-amber)] ${ar ? "-scale-x-100" : ""}`} />
              </Link>
            ))}
            <div className={`${styles.indexGhost} pointer-events-none`} aria-hidden="true">05</div>
          </div>
        </div>
        <div className="relative z-10 h-px bg-white/10"/>
      </section>

      {/* 02 — The five asymmetric service cards: intentional typography, no stock photos */}
      <section id="our-hives" aria-labelledby="sapi-hives-heading" className="scroll-mt-20 min-w-0 overflow-x-clip bg-[#F5F3EE] py-12 sm:py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full min-w-0 max-w-[1440px] px-5 sm:px-9 lg:px-12 xl:px-16">
          <div data-v4-reveal className="mb-9 flex flex-col gap-5 md:flex-row md:items-end md:justify-between lg:mb-12">
            <div>
              <p className="text-[11px] font-semibold tracking-[.14em] text-[#5B6B7F]">{t.serviceLabel}</p>
              <h2 id="sapi-hives-heading" className={`mt-4 font-semibold ${ar ? "text-[clamp(1.8rem,7vw,2.35rem)] sm:text-[clamp(2rem,3.8vw,3.85rem)] leading-[1.4]" : "text-[clamp(2.05rem,8.3vw,2.6rem)] sm:text-[clamp(2.6rem,4.4vw,5rem)] leading-[1.09] sm:leading-[1.06] tracking-[-.06em]"}`}>
                {t.serviceTitle1}<span className="block text-[#5B6B7F]">{t.serviceTitle2}</span>
              </h2>
            </div>
            <p className="max-w-[340px] text-[14px] leading-[1.8] text-[#5B6B7F] sm:text-[15px]">{t.serviceIntro}</p>
          </div>

          {/* Mobile: one compact, swipeable autoplay slider. Desktop Bento remains untouched. */}
          <div className={`${styles.mobileCarousel} md:hidden`} aria-label={t.featured}>
            <div className={styles.mobileCarouselTop}>
              <p className={styles.mobileCarouselHint}>{t.mobileHint}</p>
              <div className={styles.mobileCarouselControls} aria-label={ar ? "التنقل بين الخدمات" : "Service slider navigation"}>
                <button type="button" className={styles.mobileCarouselArrow}
                  aria-label={ar ? "الخدمة السابقة" : "Previous service"}
                  onClick={() => selectMobileSlide(mobileIndexRef.current - 1)}>
                  {ar ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
                <button type="button" className={styles.mobileCarouselArrow}
                  aria-label={ar ? "الخدمة التالية" : "Next service"}
                  onClick={() => selectMobileSlide(mobileIndexRef.current + 1)}>
                  {ar ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                </button>
              </div>
            </div>
            <div ref={mobileSliderRef} className={styles.mobileCarouselTrack}
              role="region" aria-roledescription="carousel"
              aria-label={ar ? "خدمات سابي هايف الخمس" : "SapiHive's five services"}>
              {services.map((service) => (
                <article key={service.slug} data-sv-slide
                  className={`${styles.mobileSlide} ${styles[`mobileSlide_${service.slug.replaceAll("-", "_")}`]}`}>
                  <Link href={url(`/services/${service.slug}`)} className={styles.mobileSlideLink}>
                    <div className={styles.mobileSlideTop}>
                      <span className={styles.mobileSlideCategory}>{t.categories[service.slug]}</span>
                      <span className={styles.mobileSlideArrow} aria-hidden="true">
                        <ArrowUpRight size={19} className={ar ? "-scale-x-100" : ""} />
                      </span>
                    </div>
                    <div className={styles.mobileSlideContent}>
                      <h3 className={styles.mobileSlideTitle} dir="ltr" style={{ textAlign: ar ? "right" : "left" }}>{service.title}</h3>
                      <p className={styles.mobileSlideDescription}>{service.description}</p>
                      <div className={styles.mobileSlideTags}>
                        {service.offerings.slice(0, 2).map((offering) => <span key={offering}>{offering}</span>)}
                      </div>
                      <span className={styles.mobileSlideAction}>{t.open} <ArrowUpRight size={15} className={ar ? "-scale-x-100" : ""} /></span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
            <div className={styles.mobileCarouselDots} role="group" aria-label={ar ? "اختيار الخدمة" : "Choose a service"}>
              {services.map((service, index) => (
                <button type="button" key={service.slug}
                  className={`${styles.mobileCarouselDot} ${activeMobileSlide === index ? styles.mobileCarouselDotActive : ""}`}
                  onClick={() => selectMobileSlide(index)}
                  aria-label={`${ar ? "عرض" : "Show"} ${service.title}`}
                  aria-current={activeMobileSlide === index ? "true" : undefined} />
              ))}
            </div>
          </div>

          {/* Keep the original asymmetric Bento Grid unchanged for tablets/desktop. */}
          <div className={`${styles.bento} hidden min-w-0 grid-cols-1 gap-3 md:grid md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[285px] lg:gap-4 xl:auto-rows-[292px]`}>
            {services.map((service, i) => (
              <article key={service.slug} data-v4-card className={`min-w-0 ${cardClasses[service.slug]} ${i === 0 ? "sm:col-span-2" : ""}`}>
                <Link href={url(`/services/${service.slug}`)} className={`${styles.card} group relative flex min-w-0 min-h-[260px] flex-col overflow-hidden rounded-[24px] p-6 sm:min-h-[285px] lg:h-full lg:min-h-0 lg:p-8`} aria-label={`${t.open}: ${service.title}`}>
                  <span className={styles.cardMark} aria-hidden="true">0{i + 1}</span>
                  <div className="relative z-10 flex items-center justify-between gap-3">
                    <span className="text-[10px] font-bold tracking-[.15em] opacity-65">{t.categories[service.slug]}</span>
                    <span className={`${styles.cardArrow} grid size-10 shrink-0 place-items-center rounded-full border border-current/25`}><ArrowUpRight size={18} aria-hidden="true" className={ar ? "-scale-x-100" : ""} /></span>
                  </div>
                  <div className="relative z-10 mt-auto min-w-0 max-w-full sm:max-w-[400px]">
                    <h3 className={`font-semibold tracking-[-.065em] ${i === 0 ? "text-[clamp(1.95rem,7.9vw,2.65rem)] sm:text-[clamp(2.65rem,4.3vw,4.8rem)]" : "text-[clamp(1.85rem,7.4vw,2rem)] sm:text-[clamp(2rem,3vw,3.15rem)]"}`} dir="ltr" style={{ textAlign: ar ? "right" : "left" }}>{service.title}</h3>
                    <p className={`mt-1 max-w-full break-words sm:max-w-[355px] text-[13px] leading-[1.65] ${i === 0 ? "text-white/65" : "text-[#5B6B7F]"}`}>{service.description}</p>
                    <div className={`${styles.cardCapabilities} mt-4 flex flex-wrap gap-x-2 gap-y-1.5`}>
                      {service.offerings.slice(0, i === 0 ? 4 : 2).map((offering) => <span key={offering} className="max-w-full break-words rounded-full border border-current/15 px-3 py-1.5 text-[10px] leading-[1.25]">{offering}</span>)}
                    </div>
                    <div className="mt-5 flex items-center gap-2 text-[12px] font-semibold"><span>{t.open}</span><ArrowUpRight size={15} className={ar ? "-scale-x-100" : ""} /></div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — Direct business value, not another restatement of the service cards */}
      <section aria-labelledby="sapi-value-heading" className="min-w-0 overflow-x-clip border-t border-[#0F1B2D]/10 bg-[#F5F3EE] py-12 sm:py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full min-w-0 max-w-[1440px] px-5 sm:px-9 lg:px-12 xl:px-16">
          <div data-v4-reveal className="flex max-w-[950px] min-w-0 flex-col items-start">
            <p className="text-[11px] font-semibold tracking-[.14em] text-[#5B6B7F]">{t.section3label}</p>
            <h2 id="sapi-value-heading" className={`mt-4 font-semibold ${ar ? "text-[clamp(2.3rem,4.5vw,4.8rem)] leading-[1.34]" : "text-[clamp(2.15rem,8.6vw,2.6rem)] sm:text-[clamp(2.6rem,4.8vw,5.25rem)] leading-[1.09] sm:leading-[1.06] tracking-[-.06em]"}`}>{t.section3title1}<span className="block text-[#5B6B7F]">{t.section3title2}</span></h2>
            <p className="mt-5 max-w-[660px] text-[15px] leading-[1.85] text-[#5B6B7F] sm:mt-7 sm:text-[16px]">{t.section3body}</p>
          </div>
          <div className="mt-9 grid gap-0 border-t border-[#0F1B2D]/10 md:mt-12 md:grid-cols-2 lg:grid-cols-4">
            {t.reasons.map((reason) => (
              <div data-v4-trait key={reason.no} className={`${styles.trait} border-b border-[#0F1B2D]/10 px-1 py-6 md:px-5 lg:border-e lg:py-9 first:ps-0 last:border-e-0`}>
                <div className="mb-6 flex items-center justify-between"><span className="text-xs font-semibold text-[#5B6B7F]" dir="ltr">{reason.no}</span><Plus size={17} className="text-[#F2A900]" aria-hidden="true" /></div>
                <h3 className="text-[19px] font-semibold tracking-[-.035em]">{reason.title}</h3>
                <p className="mt-3 max-w-[230px] text-[13px] leading-[1.8] text-[#5B6B7F]">{reason.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — A clean, conversion-focused finish */}
      <section className="min-w-0 overflow-x-clip bg-[#F5F3EE] px-5 py-12 sm:px-9 sm:py-16 lg:px-12 xl:px-16">
        <div data-v4-reveal className={`${styles.cta} relative mx-auto flex min-w-0 max-w-[1312px] flex-col gap-9 overflow-hidden rounded-[25px] px-7 py-11 sm:px-10 sm:py-14 lg:flex-row lg:items-end lg:justify-between lg:gap-20 lg:px-14 lg:py-16`}>
          <div className="relative z-10 min-w-0 max-w-[820px]">
            <p className="text-[10px] font-semibold tracking-[.15em] text-[#5B6B7F]">{t.endLabel}</p>
            <h2 className={`mt-5 whitespace-pre-line font-semibold ${ar ? "text-[clamp(1.9rem,7.6vw,2.3rem)] sm:text-[clamp(2.3rem,4.6vw,5.1rem)] leading-[1.3]" : "text-[clamp(2.1rem,8.2vw,2.7rem)] sm:text-[clamp(2.7rem,5vw,5.7rem)] leading-[1.12] sm:leading-[1.05] tracking-[-.073em]"}`}>{t.endTitle}</h2>
            <p className="mt-5 max-w-[455px] text-[14px] leading-[1.85] text-[#5B6B7F] sm:text-[16px]">{t.endBody}</p>
          </div>
          <Link href={url("/contact")} className="group relative z-10 inline-flex w-fit shrink-0 items-center gap-4 rounded-full bg-[#0F1B2D] px-6 py-4 text-[13px] font-semibold text-white transition-all hover:bg-[#5B6B7F] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A900] sm:px-7">
            {t.endAction}<ArrowUpRight size={17} className={`transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 ${ar ? "-scale-x-100" : ""}`} />
          </Link>
          <span className={styles.ctaWatermark} aria-hidden="true">S.</span>
        </div>
      </section>
    </main>
  );
}
