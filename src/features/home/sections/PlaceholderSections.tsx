"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { localizedPath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

gsap.registerPlugin(ScrollTrigger);

type D = ReturnType<typeof getDictionary>;
type SectionKey = Exclude<keyof D["sections"], "who" | "services">;
type Variant = "stagger" | "curtain" | "focus" | "scale" | "accent" | "reveal";

type PreviewProps = {
  locale: Locale;
  dict: D;
  id: string;
  kind: SectionKey;
  path: string;
  light?: boolean;
  variant: Variant;
};

function Preview({ locale, dict, id, kind, path, light = false, variant }: PreviewProps) {
  const rootRef = useRef<HTMLElement>(null);
  const s = dict.sections[kind];

  useGSAP(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const label = root.querySelector<HTMLElement>("[data-reveal-label]");
    const title = root.querySelector<HTMLElement>("[data-reveal-title]");
    const description = root.querySelector<HTMLElement>("[data-reveal-description]");
    const link = root.querySelector<HTMLElement>("[data-reveal-link]");
    const line = root.querySelector<HTMLElement>("[data-reveal-accent]");
    if (!label || !title || !description || !link || !line) return;

    // Animate the CONTENT, not the section background or camera position.
    // Reverse actions make the entrance repeat when scrolling back up.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top 80%",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
      },
      defaults: { ease: "power3.out" },
    });

    if (variant === "stagger") {
      tl.from(label, { autoAlpha: 0, y: 12, duration: 0.42 })
        .from(title, { autoAlpha: 0, y: 35, duration: 0.75 }, "-=0.15")
        .from(description, { autoAlpha: 0, y: 22, duration: 0.62 }, "-=0.42")
        .from(link, { autoAlpha: 0, y: 14, duration: 0.46 }, "-=0.3");
    } else if (variant === "curtain") {
      tl.from(title, { clipPath: "inset(0 0 100% 0)", y: 10, duration: 0.88, ease: "power2.inOut" })
        .from([label, description, link], { autoAlpha: 0, y: 10, stagger: 0.12, duration: 0.48 }, "-=0.46");
    } else if (variant === "scale") {
      tl.from(title, { autoAlpha: 0, scale: 0.92, transformOrigin: "50% 60%", duration: 0.9 })
        .from([label, description, link], { autoAlpha: 0, y: 13, stagger: 0.12, duration: 0.5 }, "-=0.45");
    } else if (variant === "focus") {
      tl.from(title, { autoAlpha: 0, filter: "blur(8px)", duration: 0.86 })
        .from([label, description, link], { autoAlpha: 0, y: 12, stagger: 0.12, duration: 0.5 }, "-=0.5");
    } else if (variant === "accent") {
      tl.from(line, { scaleX: 0, transformOrigin: "left center", duration: 0.7, ease: "power2.inOut" })
        .from(title, { autoAlpha: 0, y: 24, duration: 0.68 }, "-=0.4")
        .from([label, description, link], { autoAlpha: 0, y: 10, stagger: 0.1, duration: 0.45 }, "-=0.4");
    } else {
      tl.from(title, { clipPath: "inset(0 0 100% 0)", duration: 0.72 })
        .from([label, description, link], { autoAlpha: 0, stagger: 0.1, duration: 0.48 }, "-=0.3");
    }

    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, { scope: rootRef, dependencies: [variant, locale], revertOnUpdate: true });

  return (
    <section
      ref={rootRef}
      id={id}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={light ? "bg-[#f5f3ee] text-[#0f1b2d]" : "bg-[#203147] text-[#f5f3ee]"}
    >
      <div className="section-shell relative">
        <div data-reveal-accent className="mb-5 h-px w-16 bg-[#C69A53]" aria-hidden="true" />
        <p data-reveal-label className={`section-label ${locale === "ar" ? "!tracking-normal" : ""}`}>{s.eyebrow}</p>
        <h2 data-reveal-title className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">{s.title}</h2>
        <p data-reveal-description className="mt-5 max-w-xl opacity-75">{s.body}</p>
        <Link data-reveal-link className="mt-8 inline-block rounded-full border border-current px-6 py-3 text-sm" href={localizedPath(locale, path)}>{s.link} ↗</Link>
      </div>
    </section>
  );
}

type Props = { locale: Locale; dict: D };
export const WhySapiHiveSection = (p: Props) => <Preview {...p} id="why-sapihive" kind="why" path="/about" variant="stagger" />;
export const IndustriesSection = (p: Props) => <Preview {...p} id="industries-preview" kind="industries" path="/industries" variant="curtain" light />;
export const ProcessSection = (p: Props) => <Preview {...p} id="process-preview" kind="process" path="/process" variant="scale" />;
export const ExpertiseSection = (p: Props) => <Preview {...p} id="expertise-preview" kind="expertise" path="/about" variant="focus" light />;
export const WorkSection = (p: Props) => <Preview {...p} id="work-preview" kind="work" path="/contact" variant="accent" />;
export const JoinSection = (p: Props) => <Preview {...p} id="join-preview" kind="join" path="/join-us" variant="reveal" light />;
