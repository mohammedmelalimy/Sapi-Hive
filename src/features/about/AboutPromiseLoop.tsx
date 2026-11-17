"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { localizedPath, type Locale } from "@/i18n/config";
import { aboutCopy } from "@/i18n/about";

gsap.registerPlugin(ScrollTrigger);

/**
 * The Promise is deliberately disabled in AboutExperience.tsx.
 * When enabled, it reveals three typographic statements on scroll,
 * with no wavy SVG path, moving flag, or endless horizontal marquee.
 * Typography inherits the site's Poppins / Noto Sans Arabic stack.
 */
export default function AboutPromiseLoop({ locale }: { locale: Locale }) {
  const isArabic = locale === "ar";
  const t = aboutCopy[locale];
  const rootRef = useRef<HTMLElement>(null);
  const statements = [t.closingLineA, t.closingLineB, t.closingLineC];

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const words = root.querySelectorAll<HTMLElement>("[data-promise-line]");
        const details = root.querySelectorAll<HTMLElement>("[data-promise-detail]");
        const intro = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });
        intro
          .from(words, {
            autoAlpha: 0,
            y: 32,
            duration: 0.58,
            stagger: 0.14,
            ease: "power3.out",
          })
          .from(details, {
            autoAlpha: 0,
            y: 15,
            duration: 0.42,
            stagger: 0.12,
            ease: "power2.out",
          }, "-=0.2");
      });

      return () => media.revert();
    },
    { scope: rootRef, dependencies: [locale], revertOnUpdate: true },
  );

  return (
    <section
      ref={rootRef}
      aria-labelledby="about-promise-title"
      lang={locale}
      dir={isArabic ? "rtl" : "ltr"}
      className="relative isolate overflow-hidden bg-white py-14 text-[#0F1B2D] sm:py-20"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-9 lg:px-16">
        <div className={`flex items-center gap-3 text-[11px] font-bold text-[#F2A900] ${isArabic ? "tracking-normal" : "uppercase tracking-[.18em]"}`}>
          <span aria-hidden="true" className="h-px w-9 shrink-0 bg-[#F2A900]" />
          {t.closingLabel}
        </div>

        <h2 id="about-promise-title" className="sr-only">
          {statements.join(" ")}
        </h2>

        <div className="mt-9 grid grid-cols-1 sm:mt-12 sm:grid-cols-3">
          {statements.map((statement, index) => (
            <div
              key={index}
              data-promise-line
              className={`flex min-h-[112px] items-center justify-center border-b border-[#5B6B7F]/25 px-4 py-7 text-center sm:min-h-[155px] sm:border-b-0 ${index < 2 ? "sm:border-e" : ""}`}
            >
              <span
                className={`font-semibold text-[clamp(1.65rem,3.15vw,3.6rem)] leading-[1.17] ${isArabic ? "tracking-normal" : "tracking-[-0.055em]"} ${index === 1 ? "text-[#F2A900]" : "text-[#0F1B2D]"}`}
              >
                {statement}
              </span>
            </div>
          ))}
        </div>

        <div data-promise-detail className="mt-10 flex flex-col gap-6 sm:mt-12 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <p className="max-w-[620px] text-[14px] leading-[1.9] text-[#5B6B7F] sm:text-[15px]">
            {t.closingNote}
          </p>
          <Link
            href={localizedPath(locale, "/services")}
            className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full border border-[#0F1B2D]/35 px-6 py-3 text-[13px] font-semibold text-[#0F1B2D] transition-colors hover:border-[#F2A900] hover:bg-[#F2A900] hover:text-[#0F1B2D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A900]"
          >
            {isArabic ? "اكتشف خدماتنا" : "Explore our services"}
            <ArrowUpRight size={17} strokeWidth={1.8} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
