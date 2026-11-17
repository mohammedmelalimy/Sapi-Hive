"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const LOADER_COMPLETE_EVENT = "sapihive:intro-complete";

/**
 * Branded introductory transition with a circular iris reveal and a solid Hive Navy background.
 * Uses the original logo and runs once per mount. No fake progress bar.
 */
export function IntroLoader({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).loader;
  const [visible, setVisible] = useState(true);
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const screen = screenRef.current;
    if (!screen) return;

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      // The Hero can safely begin its typewriter now that the reveal is complete.
      document.documentElement.dataset.sapihiveIntro = "complete";
      setVisible(false);
      window.dispatchEvent(new Event(LOADER_COMPLETE_EVENT));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(finish);
      return () => cancelAnimationFrame(id);
    }

    const ctx = gsap.context(() => {
      const logo = screen.querySelector<HTMLElement>("[data-loader-logo]");
      const dots = Array.from(screen.querySelectorAll<HTMLElement>("[data-loader-dot]"));
      gsap.set(logo, { autoAlpha: 0, y: 18, filter: "blur(9px)" });
      gsap.set(dots, { autoAlpha: 0, y: 7 });

      // Five subtle loading dots pulse while the branded reveal takes place.
      gsap.to(dots, {
        y: -4,
        scale: 0.75,
        duration: 0.55,
        stagger: { each: 0.13, repeat: -1, yoyo: true },
        ease: "sine.inOut",
        delay: 0.5,
      });

      // A circular *hole* reveals the live Hero underneath. Unlike the
      // previous wipe, the entire loader stays in place while it opens.
      // Both standard and WebKit masks are set for browser compatibility.
      const irisMask =
        "radial-gradient(circle at 50% 50%, " +
        "transparent 0px, transparent var(--iris-radius, 0px), " +
        "#000 calc(var(--iris-radius, 0px) + 2px))";
      const canUseMask =
        CSS.supports("mask-image", "radial-gradient(circle, transparent 10px, black 12px)") ||
        CSS.supports("-webkit-mask-image", "radial-gradient(circle, transparent 10px, black 12px)");

      const intro = gsap.timeline({ onComplete: finish });
      intro
        .to(logo, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power3.out",
        })
        .to(dots, {
          autoAlpha: 1,
          y: 0,
          duration: 0.28,
          stagger: 0.08,
          ease: "power2.out",
        }, "-=0.26")
        .to(logo, {
          scale: 0.93,
          autoAlpha: 0,
          duration: 0.28,
          ease: "power2.inOut",
        }, "+=0.18")
        .to(dots, { autoAlpha: 0, duration: 0.2 }, "<")
        .call(() => {
          if (!canUseMask) return;
          screen.style.maskImage = irisMask;
          screen.style.webkitMaskImage = irisMask;
          screen.style.setProperty("--iris-radius", "0px");
        });

      if (canUseMask) {
        intro.to(screen, {
          "--iris-radius": () =>
            `${Math.ceil(Math.hypot(window.innerWidth / 2, window.innerHeight / 2) + 64)}px`,
          duration: 1.0,
          ease: "power3.inOut",
        });
      } else {
        // Fallback for older browsers: dissolve instead of sliding up.
        intro.to(screen, { autoAlpha: 0, duration: 0.75, ease: "power2.inOut" });
      }
    }, screen);

    return () => {
      ctx.revert();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={screenRef}
      data-intro-screen
      role="status"
      aria-label={t.opening}
      className="fixed inset-0 z-[100] isolate flex items-center justify-center overflow-hidden bg-[#0F1B2D]"
    >
      {/* Original asset: no redraw, no glass card. */}
      <div className="relative z-10 flex flex-col items-center gap-9 px-6">
        <div data-loader-logo className="flex items-center justify-center opacity-0">
          <Image
            src="/images/brand/sapihive-logo-light.png"
            alt={t.logoAlt}
            width={360}
            height={112}
            priority
            sizes="(max-width: 640px) 220px, 290px"
            className="h-auto w-[220px] select-none object-contain sm:w-[290px]"
          />
        </div>
        <div className="flex items-center gap-3" aria-hidden="true">
          {Array.from({ length: 5 }, (_, i) => (
            <span
              key={i}
              data-loader-dot
              className={`h-1.5 w-1.5 rounded-full opacity-0 ${i === 2 ? "bg-[#F2A900]" : "bg-[#F5F3EE]"}`}
            />
          ))}
        </div>
        <span className="sr-only">{t.opening}</span>
      </div>
    </div>
  );
}
