"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FileText,
  Languages,
  RefreshCw,
  SlidersHorizontal,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import { whySapiHiveCopy } from "@/i18n/whySapiHive";
import styles from "./WhySapiHiveSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const ICONS = [UsersRound, FileText, SlidersHorizontal, TrendingUp, Languages, RefreshCw] as const;
const wrap = (value: number, length: number) => ((value % length) + length) % length;

// 6 unique benefits x 2 cycles = 12 actual faces on a true 360-degree CSS-3D ring.
// The repetition happens at the *back* of the ring; no duplicate is visible in the front arc.
const RING_COPIES = 2;
const STEP_DEGREES = 360 / (6 * RING_COPIES);

type Props = { locale: Locale };
type Drag = {
  id: number;
  startX: number;
  startPosition: number;
  lastX: number;
  lastTime: number;
  velocity: number;
} | null;

export function WhySapiHiveSection({ locale }: Props) {
  const copy = whySapiHiveCopy[locale];
  const count = copy.benefits.length; // 6
  const faces = count * RING_COPIES; // 12
  const isArabic = locale === "ar";
  const rootRef = useRef<HTMLElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const mobileStageRef = useRef<HTMLDivElement>(null);
  const mobileCardsRef = useRef<(HTMLElement | null)[]>([]);
  const position = useRef({ value: 0 });
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const dragRef = useRef<Drag>(null);
  const hovering = useRef(false);
  const visible = useRef(false);
  const lastInteraction = useRef(Date.now());
  const faceRef = useRef(0);
  const [frontFace, setFrontFace] = useState(0);

  const draw = useCallback((value: number) => {
    position.current.value = value;
    // Rotate the ENTIRE cylinder, not the cards independently.
    if (ringRef.current) {
      ringRef.current.style.transform = `translateZ(calc(0px - var(--ring-radius))) rotateY(${(-value * STEP_DEGREES).toFixed(3)}deg)`;
    }
    // MOBILE: a separate, measured 3D coverflow keeps the active card at full
    // readable size and shows only small angled peeks of its neighbours.
    // 12 faces on a narrow 3D cylinder caused perspective shrink + clipping.
    const mobileWidth = mobileStageRef.current?.clientWidth ?? 0;
    if (mobileWidth > 0) {
      const spacing = mobileWidth * 0.78;
      mobileCardsRef.current.forEach((element, index) => {
        if (!element) return;
        const delta = wrap(index - value + count / 2, count) - count / 2;
        const magnitude = Math.abs(delta);
        const logicalDirection = isArabic ? -1 : 1;
        const x = delta * spacing * logicalDirection;
        const z = -Math.min(magnitude, 2) * 105;
        const angle = -delta * 27 * logicalDirection;
        const scale = 1 - Math.min(magnitude, 1.4) * 0.075;
        element.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(2)}px, 0px, ${z.toFixed(2)}px) rotateY(${angle.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        element.style.opacity = magnitude > 1.55 ? "0" : String(Math.max(0.35, 1 - magnitude * 0.52));
        element.style.visibility = magnitude > 1.55 ? "hidden" : "visible";
        element.style.zIndex = String(100 - Math.round(magnitude * 20));
      });
    }
    const nextFace = wrap(Math.round(value), faces);
    if (faceRef.current !== nextFace) {
      faceRef.current = nextFace;
      setFrontFace(nextFace);
    }
  }, [faces, count, isArabic]);

  const settle = useCallback((target: number, duration = 0.9) => {
    tweenRef.current?.kill();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      draw(target);
      return;
    }
    tweenRef.current = gsap.to(position.current, {
      value: target,
      duration,
      ease: "power3.out",
      overwrite: "auto",
      onUpdate: () => draw(position.current.value),
    });
  }, [draw]);

  const navigate = useCallback((direction: number) => {
    lastInteraction.current = Date.now();
    settle(Math.round(position.current.value) + direction);
  }, [settle]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    tweenRef.current?.kill();
    lastInteraction.current = Date.now();
    dragRef.current = {
      id: event.pointerId,
      startX: event.clientX,
      startPosition: position.current.value,
      lastX: event.clientX,
      lastTime: performance.now(),
      velocity: 0,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    const mobileWidth = mobileStageRef.current?.clientWidth ?? 0;
    const stageWidth = mobileWidth || stageRef.current?.clientWidth || 1280;
    const pixelsPerCard = mobileWidth > 0
      ? Math.max(160, mobileWidth * 0.62)
      : Math.max(145, Math.min(245, stageWidth * 0.145));
    const movement = event.clientX - drag.startX;
    const now = performance.now();
    const dt = Math.max(8, now - drag.lastTime);
    const instantaneous = -(event.clientX - drag.lastX) / pixelsPerCard / dt;
    drag.velocity = drag.velocity * 0.68 + instantaneous * 0.32;
    drag.lastX = event.clientX;
    drag.lastTime = now;
    draw(drag.startPosition - movement / pixelsPerCard);
  };

  const onPointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    dragRef.current = null;
    lastInteraction.current = Date.now();
    const inertia = Math.max(-1.1, Math.min(1.1, drag.velocity * 185));
    settle(Math.round(position.current.value + inertia), 0.95);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  useEffect(() => {
    draw(position.current.value);
    const root = rootRef.current;
    if (!root) return;
    const watch = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
    }, { threshold: 0.35 });
    watch.observe(root);

    // Slow step-by-step rotation, not an aggressive continuous spin.
    const interval = window.setInterval(() => {
      if (
        !visible.current || hovering.current || dragRef.current || document.hidden ||
        window.matchMedia("(max-width: 700px)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        Date.now() - lastInteraction.current < 7500
      ) return;
      settle(Math.round(position.current.value) + 1, 1.35);
    }, 6200);
    return () => {
      window.clearInterval(interval);
      watch.disconnect();
      tweenRef.current?.kill();
    };
  }, [draw, settle]);

  useGSAP(() => {
    const root = rootRef.current;
    if (!root) return;

    const eyebrow = root.querySelector("[data-why-eyebrow]");
    const heading = root.querySelector("[data-why-heading]");
    const intro = root.querySelector("[data-why-intro]");
    const reel = root.querySelector("[data-why-reel]");
    if (!eyebrow || !heading || !intro || !reel) return;

    // Entrance progress is tied to *vertical scrolling* instead of firing
    // long before the section is visible. Scrolling back up reverses it.
    // Animate the outer reel wrapper only; NEVER animate `ringRef` or the
    // 3D card transforms, which are reserved for drag / momentum rotation.
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set([eyebrow, heading, intro, reel], { clearProps: "all" });
    });

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top 90%",
          end: "top 30%",
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        eyebrow,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.23 },
        0,
      )
        .fromTo(
          heading,
          { autoAlpha: 0, y: 30, clipPath: "inset(0 0 100% 0)" },
          { autoAlpha: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.43 },
          0.08,
        )
        .fromTo(
          intro,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.31 },
          0.29,
        )
        .fromTo(
          reel,
          { autoAlpha: 0, y: 46, scale: 0.955 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.51 },
          0.36,
        );
    });

    return () => media.revert();
  }, { scope: rootRef, dependencies: [locale], revertOnUpdate: true });

  return (
    <section
      ref={rootRef}
      id="why-sapihive"
      dir={isArabic ? "rtl" : "ltr"}
      lang={locale}
      aria-labelledby="why-sapihive-heading"
      className={`relative isolate w-full overflow-x-clip bg-white text-[#0F1B2D] pt-[76px] pb-9 sm:pt-[126px] sm:pb-8 ${isArabic ? "font-['Segoe_UI',Tahoma,Arial,sans-serif]" : "font-sans"}`}
    >
      {/* All visible styling and responsive layout use Tailwind CSS. */}
      <div className="relative z-10 mx-auto w-full max-w-[1700px] px-5 sm:px-10 lg:px-[6vw]">
        <p data-why-eyebrow className={`mb-3 flex items-center gap-3 text-[11px] font-bold text-[#F2A900] ${isArabic ? "tracking-normal" : "uppercase tracking-[0.18em]"}`}>
          <span className="h-[2px] w-8 shrink-0 bg-[#F2A900]" />
          {copy.eyebrow}
        </p>
        <h2
          id="why-sapihive-heading"
          data-why-heading
          className={`m-0 max-w-[1050px] font-bold text-[#0F1B2D] ${isArabic ? "text-[clamp(1.8rem,3.1vw,3rem)] leading-[1.45] tracking-normal" : "text-[clamp(2rem,3.4vw,3.35rem)] leading-[1.16] tracking-[-0.045em]"}`}
        >
          {copy.headingTop}{" "}
          <span className="text-[#F2A900]">{copy.headingBottom}</span>
        </h2>
        <p
          data-why-intro
          className={`mt-3 max-w-[720px] text-[15px] text-[#405168] sm:text-base ${isArabic ? "leading-[2]" : "leading-[1.7]"}`}
        >
          {copy.intro}
        </p>
      </div>

      {/* The circle is a real 3D arrangement, NOT a visible orbit or a flat carousel.
          Keep the ring geometry in LTR; each card gets its own RTL/LTR text flow. */}
      <div data-why-reel className="relative mt-5 w-full sm:mt-2">
        <div
          ref={stageRef}
          dir="ltr"
          className={`${styles.stage} relative hidden h-[318px] w-full sm:block cursor-grab select-none touch-pan-y outline-offset-[-5px] focus-visible:outline-2 focus-visible:outline-[#F2A900] active:cursor-grabbing sm:h-[318px] lg:h-[345px]`}
          role="region"
          aria-roledescription="carousel"
          aria-label={isArabic ? "مميزات SapiHive، استخدم أسهم لوحة المفاتيح للتنقل" : "SapiHive benefits. Use the arrow keys to explore."}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerEnd}
          onPointerCancel={onPointerEnd}
          onLostPointerCapture={() => {
            if (dragRef.current) {
              dragRef.current = null;
              settle(Math.round(position.current.value));
            }
          }}
          onPointerEnter={() => { hovering.current = true; }}
          onPointerLeave={() => { hovering.current = false; }}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") { event.preventDefault(); navigate(1); }
            if (event.key === "ArrowLeft") { event.preventDefault(); navigate(-1); }
          }}
        >
          <div ref={ringRef} className={styles.ring}>
            {Array.from({ length: faces }, (_, faceIndex) => {
              const index = faceIndex % count;
              const item = copy.benefits[index];
              const Icon = ICONS[index];
              const active = frontFace === faceIndex;
              return (
                <article
                  key={faceIndex}
                  className={`${styles.card3d} absolute left-1/2 top-1/2 flex h-[294px] w-[min(84vw,352px)] flex-col justify-between rounded-[20px] border p-5 text-[#0F1B2D] shadow-[0_22px_45px_rgba(15,27,45,0.10)] backdrop-blur-xl transition-[border-color,box-shadow,background-color] duration-300 sm:h-[255px] sm:p-6 lg:h-[272px] lg:w-[clamp(270px,24.5vw,390px)] ${active ? "border-[#AAB5C3]/70 bg-white/80 shadow-[0_26px_60px_rgba(15,27,45,0.16),0_0_22px_rgba(255,255,255,0.96)]" : "border-[#C2CBD5]/80 bg-[linear-gradient(145deg,rgba(255,255,255,0.65),rgba(233,240,248,0.42))]"}`}
                  aria-hidden={!active}
                  data-front={active ? "true" : "false"}
                  style={{ transform: `translate(-50%, -50%) rotateY(${faceIndex * STEP_DEGREES}deg) translateZ(var(--ring-radius))` }}
                  dir={isArabic ? "rtl" : "ltr"}
                  lang={locale}
                >
                  <div className="flex items-center justify-between gap-3 text-[#F2A900]">
                    <Icon size={27} strokeWidth={1.75} aria-hidden="true" />
                    <span dir="ltr" className="text-[11px] font-bold tabular-nums tracking-[0.06em] text-[#667589]">
                      {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                    </span>
                  </div>
                  <div className={`mt-auto ${isArabic ? "text-right" : "text-left"}`}>
                    <h3 className={`m-0 font-bold text-[#0F1B2D] ${isArabic ? "text-[21px] leading-[1.55] sm:text-[22px]" : "text-[21px] leading-[1.3] tracking-[-0.025em] sm:text-[clamp(19px,1.8vw,26px)]"}`}>
                      {item.title}
                    </h3>
                    <p className={`mt-2 text-[#405168] ${isArabic ? "text-[14px] leading-[1.75] sm:text-[15px]" : "text-[14px] leading-[1.6] sm:text-[15px]"}`}>
                      {item.description}
                    </p>
                    <span aria-hidden="true" className={`mt-3 block h-[3px] w-9 rounded-full bg-[#F2A900] ${isArabic ? "mr-0 ml-auto" : ""}`} />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        {/* Mobile: separate coverflow; desktop keeps the original 360deg ring.
            A real CSS-3D cylinder is too dense for 360–430px viewports. */}
        <div
          ref={mobileStageRef}
          dir="ltr"
          className={`${styles.mobileStage} relative h-[322px] w-full cursor-grab select-none touch-pan-y active:cursor-grabbing sm:hidden`}
          role="region"
          aria-roledescription="carousel"
          aria-label={isArabic ? "مميزات SapiHive، اسحب للتنقل بين البطاقات" : "SapiHive benefits, swipe to browse"}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerEnd}
          onPointerCancel={onPointerEnd}
          onLostPointerCapture={() => {
            if (dragRef.current) {
              dragRef.current = null;
              settle(Math.round(position.current.value));
            }
          }}
          onPointerEnter={() => { hovering.current = true; }}
          onPointerLeave={() => { hovering.current = false; }}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") { event.preventDefault(); navigate(isArabic ? -1 : 1); }
            if (event.key === "ArrowLeft") { event.preventDefault(); navigate(isArabic ? 1 : -1); }
          }}
        >
          {copy.benefits.map((item, index) => {
            const Icon = ICONS[index];
            const selected = frontFace % count === index;
            return (
              <article
                key={index}
                ref={(node) => { mobileCardsRef.current[index] = node; }}
                dir={isArabic ? "rtl" : "ltr"}
                lang={locale}
                aria-hidden={!selected}
                className={`${styles.mobileCard} absolute left-1/2 top-1/2 flex h-[264px] w-[min(78vw,334px)] flex-col justify-between rounded-[20px] border border-[#CFD7E1] bg-[linear-gradient(145deg,rgba(255,255,255,0.94),rgba(239,244,250,0.95))] p-5 text-[#0F1B2D] shadow-[0_18px_36px_rgba(15,27,45,0.12)]`}
              >
                <div className="flex items-center justify-between gap-3 text-[#F2A900]">
                  <Icon size={25} strokeWidth={1.7} aria-hidden="true" />
                  <span dir="ltr" className="text-[11px] font-bold tabular-nums tracking-[0.05em] text-[#667589]">
                    {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                  </span>
                </div>
                <div className={`mt-auto ${isArabic ? "text-right" : "text-left"}`}>
                  <h3 className={`m-0 font-bold text-[#0F1B2D] ${isArabic ? "text-[19px] leading-[1.45]" : "text-[20px] leading-[1.24] tracking-[-0.025em]"}`}>
                    {item.title}
                  </h3>
                  <p className={`mt-2 text-[13px] text-[#405168] ${isArabic ? "leading-[1.8]" : "leading-[1.55]"}`}>
                    {item.description}
                  </p>
                  <span aria-hidden="true" className={`mt-3 block h-[3px] w-9 rounded-full bg-[#F2A900] ${isArabic ? "ml-auto mr-0" : ""}`} />
                </div>
              </article>
            );
          })}
        </div>
        {/* Mobile-only pagination: no arrows or swipe instruction. */}
        <div className="mt-0 flex items-center justify-center gap-2 pb-2 sm:hidden" role="group" aria-label={isArabic ? "التنقل بين المميزات" : "Benefit navigation"}>
          {copy.benefits.map((item, index) => {
            const selected = frontFace % count === index;
            return (
              <button
                key={index}
                type="button"
                aria-label={isArabic ? `الميزة ${index + 1}: ${item.title}` : `Benefit ${index + 1}: ${item.title}`}
                aria-current={selected ? "true" : undefined}
                onClick={() => {
                  lastInteraction.current = Date.now();
                  const delta = wrap(index - (frontFace % count) + Math.floor(count / 2), count) - Math.floor(count / 2);
                  settle(Math.round(position.current.value) + delta, 0.75);
                }}
                className="flex h-8 w-7 items-center justify-center"
              >
                <span className={`block h-[5px] rounded-full transition-all duration-300 ${selected ? "w-6 bg-[#F2A900]" : "w-[5px] bg-[#A6B2C0]"}`} />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
