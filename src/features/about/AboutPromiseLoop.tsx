"use client";

import { useEffect, useId, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { localizedPath, type Locale } from "@/i18n/config";
import { aboutCopy } from "@/i18n/about";

/**
 * Original near-flat SVG marquee with hollow Honey Amber outline text and no colored band.
 * Its actual maximum vertical deviation is only ~9 SVG units, not a steep sine wave.
 * The entire visible band is inside the SVG; no horizontal page overflow.
 */
export default function AboutPromiseLoop({ locale }: { locale: Locale }) {
  const isArabic = locale === "ar";
  const t = aboutCopy[locale];
  const uid = useId().replace(/:/g, "");
  const pathId = `sapi-promise-path-${uid}`;
  const rootRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<SVGTSpanElement>(null);
  const trackRef = useRef<SVGTextPathElement>(null);

  // Use the real, localized Promise text in both languages.
  const words = [t.closingLineA, t.closingLineB, t.closingLineC];
  // Layout uses LTR SVG co-ordinates in both locales; the Arabic words remain Arabic.
  const repetition = `${words.join("   ✦   ")}   ✦   `;

  useEffect(() => {
    const root = rootRef.current;
    const first = firstRef.current;
    const track = trackRef.current;
    if (!root || !first || !track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    let cancelled = false;
    let tween: gsap.core.Tween | undefined;
    let observer: IntersectionObserver | undefined;

    const start = () => {
      if (cancelled) return;
      const period = first.getComputedTextLength();
      if (!Number.isFinite(period) || period <= 0) return;
      tween?.kill();
      const state = { position: 0 };
      const duration = isArabic ? 30 : 27;
      tween = gsap.to(state, {
        position: -period,
        duration,
        ease: "none",
        repeat: -1,
        onUpdate: () => track.setAttribute("startOffset", String(state.position)),
      });
      observer?.disconnect();
      observer = new IntersectionObserver(([entry]) => {
        if (entry?.isIntersecting) tween?.resume();
        else tween?.pause();
      }, { rootMargin: "180px 0px" });
      observer.observe(root);
    };

    // Font metric measurement needs the font to have loaded before computing one loop.
    void document.fonts.ready.then(start);
    return () => {
      cancelled = true;
      tween?.kill();
      observer?.disconnect();
      track.setAttribute("startOffset", "0");
    };
  }, [isArabic, repetition]);

  return (
    <section
      aria-label={t.closingLabel}
      className="relative isolate overflow-hidden bg-white py-12 text-[#0F1B2D] sm:py-16"
    >
      <div data-about-reveal className="mx-auto max-w-[1440px] px-6 sm:px-9 lg:px-16">
        <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.18em] text-[#F2A900]">
          <span aria-hidden="true" className="h-px w-9 shrink-0 bg-[#F2A900]" />
          {t.closingLabel}
        </div>
      </div>

      <div
        ref={rootRef}
        className="relative mt-8 h-[174px] w-full overflow-hidden sm:mt-9 sm:h-[196px] lg:h-[214px]"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          className="block h-full w-full"
          viewBox="0 0 1600 240"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <path
              id={pathId}
              // Medium curvature: approx ±38px
              d="
    M -160 158
    C 210 120 520 120 860 158
    S 1530 196 1910 158
    S 2620 120 2990 158
    S 3700 196 4080 158
    S 4790 120 5160 158
    S 5870 196 6250 158
    S 6960 120 7340 158
    S 8050 196 8440 158
  "
            />
          </defs>
          <text
            fontFamily={
              isArabic ? 'Tahoma, Arial, sans-serif' : 'Inter, Arial, Helvetica, sans-serif'
            }
            fontSize={isArabic ? '71' : '82'}
            fontWeight="750"
            fill="none"
            stroke="#F2A900"
            strokeWidth="1.7"
            strokeLinejoin="round"
            letterSpacing={isArabic ? '0' : '-2.2'}
            style={{ direction: 'ltr' }}
          >
            <textPath ref={trackRef} href={`#${pathId}`} startOffset="0">
              {Array.from({ length: 7 }, (_, index) => (
                <tspan key={index} ref={index === 0 ? firstRef : undefined}>
                  {repetition}
                </tspan>
              ))}
            </textPath>
          </text>
        </svg>
      </div>

      <div
        data-about-reveal
        className="mx-auto mt-2 flex max-w-[1440px] flex-col gap-6 px-6 sm:mt-5 sm:flex-row sm:items-end sm:justify-between sm:gap-10 sm:px-9 lg:px-16"
      >
        <div className="max-w-[620px]">
          {/* Screen readers have the complete slogan even though SVG is decorative. */}
          <h2 className="sr-only">{words.join(' ')}</h2>
          <p className="text-[14px] leading-[1.9] text-[#5B6B7F] sm:text-[15px]">{t.closingNote}</p>
        </div>
        <Link
          href={localizedPath(locale, '/services')}
          className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full border border-[#0F1B2D]/35 px-6 py-3 text-[13px] font-semibold text-[#0F1B2D] transition-colors hover:border-[#F2A900] hover:bg-[#F2A900] hover:text-[#0F1B2D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A900]"
        >
          {isArabic ? 'اكتشف خدماتنا' : 'Explore our services'}
          <ArrowUpRight
            size={17}
            strokeWidth={1.8}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  );
}
