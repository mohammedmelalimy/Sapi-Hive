"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getDictionary } from "@/i18n/dictionaries";
import {
  ArrowLeft, ArrowRight, ArrowUpRight, BriefcaseBusiness,
  Code2, Users, UserRoundSearch, Palette, Check, Layers3,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Locale = "en" | "ar";
type Props = { locale: Locale };

// Display-only illustration of the site's established sections. This route does
// not mount or modify the production Hero/WhoWeAre/Services components.
export function SapiHiveCameraPreview({ locale }: Props) {
  const storyRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const isArabic = locale === "ar";
  const d = getDictionary(locale);
  const t = d.preview;
  const features = [
    { slug: "hive-corporate", title: d.services.corporate, Icon: BriefcaseBusiness, subtitle: t.featureSubtitles[0] },
    { slug: "hive-tech", title: d.services.tech, Icon: Code2, subtitle: t.featureSubtitles[1] },
    { slug: "hive-people", title: d.services.people, Icon: Users, subtitle: t.featureSubtitles[2] },
    { slug: "hive-talent", title: d.services.talent, Icon: UserRoundSearch, subtitle: t.featureSubtitles[3] },
    { slug: "hive-creative", title: d.services.creative, Icon: Palette, subtitle: t.featureSubtitles[4] },
  ];
  const stations = [d.hero.eyebrow, d.sections.who.eyebrow, d.sections.services.eyebrow, d.sections.why.eyebrow];
  const [cardIndex, setCardIndex] = useState(2);

  useGSAP(() => {
    const stage = stageRef.current;
    const story = storyRef.current;
    const scenes = sceneRefs.current;
    if (!stage || !story || scenes.some(scene => !scene)) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const progress = { value: 0 };

    // A moving 3D camera path, not four separate fade-up reveals.
    const draw = () => {
      const h = window.innerHeight;
      const p = progress.value;
      scenes.forEach((node, index) => {
        if (!node) return;
        const distance = index - p;
        const magnitude = Math.abs(distance);
        const visible = Math.max(0, Math.min(1, 1.4 - magnitude * 1.48));
        gsap.set(node, reduce ? {
          x: 0, y: 0, z: 0, rotationY: 0, rotationX: 0, rotationZ: 0,
          scale: 1, opacity: magnitude < 0.5 ? 1 : 0,
          pointerEvents: magnitude < 0.4 ? "auto" : "none",
        } : {
          x: 0,
          y: distance * h * 0.86,
          z: -magnitude * Math.min(640, Math.max(350, h * 0.7)),
          rotationY: 0,
          rotationX: -distance * 27,
          rotationZ: 0,
          scale: 1 - Math.min(0.14, magnitude * 0.12),
          opacity: visible,
          pointerEvents: magnitude < 0.34 ? "auto" : "none",
        });
      });
      const next = Math.min(3, Math.max(0, Math.round(p)));
      if (next !== activeRef.current) {
        activeRef.current = next;
        setActive(next);
      }
    };

    const tween = gsap.to(progress, {
      value: 3,
      ease: "none",
      onUpdate: draw,
      scrollTrigger: {
        id: "sapihive-camera-preview",
        trigger: story,
        pin: stage,
        start: "top top",
        end: () => `+=${Math.round(window.innerHeight * 3.15)}`,
        scrub: reduce ? true : 0.8,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefresh: draw,
      },
    });
    draw();
    const onResize = () => draw();
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, { scope: storyRef });

  const jump = (index: number) => {
    const trigger = ScrollTrigger.getById("sapihive-camera-preview");
    if (!trigger) return;
    window.scrollTo({
      top: trigger.start + ((trigger.end - trigger.start) * index) / 3,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  const activeFeature = features[cardIndex];

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="relative min-h-screen bg-[#19283A] text-[#F5F3EE]">
      <section ref={storyRef} className="relative z-0 h-screen" aria-label={t.aria}>
        <div ref={stageRef} className="relative h-dvh w-full overflow-hidden bg-[linear-gradient(118deg,#19283A_0%,#33455A_53%,#526276_100%)]">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_72%_30%,rgba(185,202,223,0.12),transparent_57%)]" />
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:76px_76px]" />
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            {Array.from({ length: 44 }, (_, i) => {
              const x = (i * 47.77 + 11) % 100;
              const y = (i * 29.63 + 7) % 100;
              return <span key={i} className="absolute size-[3px] rounded-full bg-[#CAD6E0]/50" style={{ left: `${x}%`, top: `${y}%`, opacity: 0.2 + (i % 5) * 0.12 }} />;
            })}
          </div>

          {/* Demo header, intentionally independent of your real Header.tsx. */}
          <header className="pointer-events-auto absolute inset-x-4 top-3 z-50 mx-auto max-w-[1480px] rounded-[22px] border border-white/15 bg-[#42566B]/25 px-5 py-4 shadow-[0_12px_48px_rgba(0,0,0,.09)] backdrop-blur-2xl sm:inset-x-8 md:px-8">
            <div className="flex items-center justify-between gap-4">
              <Link href={`/${locale}`} className="flex shrink-0 items-center" aria-label={t.backHomeAria}>
                <Image src="/images/brand/sapihive-logo-light.png" width={175} height={52} alt="SapiHive" className="h-auto w-[135px] object-contain sm:w-[170px]" priority />
              </Link>
              <div className="hidden items-center gap-7 text-sm text-white/80 lg:flex">
                <span>{d.nav.home}</span><span>{d.nav.about}</span><span>{d.nav.services}</span><span>{d.nav.industries}</span><span>{d.nav.process}</span><span>{d.nav.join}</span>
              </div>
              <Link href={`/${locale}`} className="rounded-full border border-[#C69A53]/60 px-3 py-2 text-xs font-semibold text-[#FFE1A8] transition-colors hover:bg-[#C69A53]/10 sm:px-5 sm:text-sm">
                {t.backToWebsite}
              </Link>
            </div>
          </header>

          <div className="absolute inset-0 [perspective:1450px]" style={{ transformStyle: "preserve-3d", perspectiveOrigin: "50% 42%" }}>
            {/* SCENE 01 — LAST HERO FRAME (the actual Hero interactions remain unchanged on the real homepage) */}
            <div ref={node => { sceneRefs.current[0] = node; }} className="pointer-events-auto absolute inset-0 flex items-center justify-center px-5 pt-24 will-change-transform sm:px-10" style={{ transformStyle: "preserve-3d", transformOrigin: "50% 50%" }}>
              <div className="grid w-full max-w-[1250px] grid-cols-1 items-center gap-5 md:grid-cols-2 md:gap-14">
                <div className="rounded-[28px] border border-white/25 bg-white/[.13] p-6 shadow-[0_22px_70px_rgba(0,0,0,.18)] backdrop-blur-2xl sm:p-9">
                  <p className="text-xs font-bold tracking-[.2em] text-[#D6A450]">{d.heroStory.cta.eyebrow}</p>
                  <h1 className="mt-4 text-[clamp(2rem,3.5vw,3.6rem)] font-bold leading-[1.1] tracking-[-.04em]">{d.heroStory.cta.title}</h1>
                  <p className="mt-5 text-sm leading-7 text-[#E3EAF2] sm:text-base">{t.heroDescription}</p>
                  <div className="mt-6 inline-flex rounded-full bg-[#C69A53] px-6 py-3 text-sm font-bold text-[#16283B]">{d.heroStory.cta.button} ↗</div>
                </div>
                <div className="relative mx-auto h-[280px] w-[280px] sm:h-[420px] sm:w-[420px]" aria-label={t.hiveIllustration}>
                  {[[50,9],[19,30],[81,30],[29,72],[71,72],[50,49]].map(([left,top],i) => (
                    <div key={i} className={`absolute grid h-[29%] w-[29%] place-items-center border border-[#BDDBEE]/70 shadow-[0_0_23px_rgba(178,220,255,.22)] ${i===5?"bg-[#C69A53]/80":"bg-[#86ADCB]/20"}`} style={{left:`${left}%`,top:`${top}%`,transform:"translate(-50%,-50%)",clipPath:"polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)"}}>
                      <span className="block h-[58%] w-[58%] border border-white/60" style={{clipPath:"polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)"}} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SCENE 02 — WHO WE ARE */}
            <div ref={node => { sceneRefs.current[1] = node; }} className="pointer-events-none absolute inset-0 flex items-center justify-center px-5 pt-20 will-change-transform sm:px-8" style={{ transformStyle: "preserve-3d" }}>
              <div className="w-full max-w-[1260px] text-center">
                <div className="mb-3 text-xs font-bold tracking-[0.26em] text-[#D6A450]">{d.whoDetailed.label}</div>
                <h2 className="text-[clamp(2.4rem,5vw,5.1rem)] font-bold leading-[1.06] tracking-[-.048em]">{d.whoDetailed.title}<br /><span className="text-[#D6A450]">{d.whoDetailed.highlight}</span></h2>
                <p className="mx-auto mt-5 max-w-[850px] text-sm leading-7 text-[#DCE5EF] sm:text-lg">{t.whoIntro}</p>
                <div className="mx-auto mt-8 flex max-w-[1050px] items-center justify-center gap-3 sm:gap-5">
                  <div className="min-w-0 flex-1 rounded-[22px] border border-white/25 bg-[#496178]/35 p-5 text-start shadow-xl backdrop-blur-xl sm:p-8"><div className="text-[#D6A450]">✧</div><h3 className="mt-3 text-xl font-bold sm:text-4xl">SAPI</h3><p className="mt-2 text-xs sm:text-base">{d.whoDetailed.sapiTitle}</p></div>
                  <div className="h-px w-3 shrink-0 bg-[#D6A450] sm:w-14" />
                  <div className="flex size-16 shrink-0 items-center justify-center rounded-full border border-[#D6A450]/50 bg-[#19283A]/70 shadow-[0_0_24px_rgba(198,154,83,.16)] sm:size-24"><Image src="/images/brand/sapihive-icon-original.png" width={74} height={74} alt="" className="h-[70%] w-[70%] object-contain" /></div>
                  <div className="h-px w-3 shrink-0 bg-[#D6A450] sm:w-14" />
                  <div className="min-w-0 flex-1 rounded-[22px] border border-white/25 bg-[#496178]/35 p-5 text-start shadow-xl backdrop-blur-xl sm:p-8"><div className="text-[#D6A450]">✦</div><h3 className="mt-3 text-xl font-bold sm:text-4xl">HIVE</h3><p className="mt-2 text-xs sm:text-base">{d.whoDetailed.hiveTitle}</p></div>
                </div>
              </div>
            </div>

            {/* SCENE 03 — OUR SERVICES */}
            <div ref={node => { sceneRefs.current[2] = node; }} className="pointer-events-none absolute inset-0 flex items-center justify-center px-5 pt-24 will-change-transform sm:px-8" style={{ transformStyle: "preserve-3d" }}>
              <div className="grid w-full max-w-[1280px] grid-cols-1 items-center gap-7 lg:grid-cols-2 lg:gap-14">
                <div className="max-w-[570px] text-center lg:text-start"><p className="mb-4 text-xs font-bold tracking-[0.24em] text-[#D6A450]">{d.serviceCards.label}</p><h2 className="text-[clamp(2.6rem,5vw,5.2rem)] font-bold leading-[1.07] tracking-[-.05em]">{d.serviceCards.heading} <span className="text-[#D6A450]">{d.serviceCards.highlight}</span></h2><p className="mt-5 text-sm leading-7 text-[#E1E7EF] sm:text-lg">{d.serviceCards.intro}</p></div>
                <div className="mx-auto w-full max-w-[460px]">
                  <div className="mb-5 flex items-center justify-end gap-5" dir="ltr"><button onClick={() => setCardIndex(index => (index + 4) % 5)} className="grid size-10 place-items-center rounded-full border border-white/40 bg-white/5 hover:bg-white/10" aria-label={t.previousCard}><ArrowLeft size={19} /></button><span className="min-w-[75px] text-center font-semibold tabular-nums text-[#E9BD74]">{String(cardIndex + 1).padStart(2, "0")} / 05</span><button onClick={() => setCardIndex(index => (index + 1) % 5)} className="grid size-10 place-items-center rounded-full border border-white/40 bg-white/5 hover:bg-white/10" aria-label={t.nextCard}><ArrowRight size={19} /></button></div>
                  <div className="relative mx-auto h-[295px] w-full sm:h-[380px]">
                    <div className="absolute inset-x-3 top-1 h-[90%] translate-x-5 -rotate-[7deg] rounded-[26px] border border-[#99B4CE]/25 bg-[#1C3046] shadow-2xl" />
                    <div className="absolute inset-x-3 top-2 h-[92%] -translate-x-4 rotate-[4deg] rounded-[26px] border border-[#99B4CE]/40 bg-[#273E56] shadow-2xl" />
                    <div className="relative flex h-full flex-col justify-between rounded-[26px] border border-[#D6A450]/70 bg-[linear-gradient(135deg,#304A64,#14283D)] p-7 shadow-[0_24px_70px_rgba(0,0,0,.35),0_0_23px_rgba(198,154,83,.1)] sm:p-9">
                      <div><div className="flex items-center justify-between text-[#D6A450]"><activeFeature.Icon size={39} strokeWidth={1.5} /><span className="text-sm font-semibold">{String(cardIndex + 1).padStart(2, "0")} / 05</span></div><p className="mt-7 text-xs font-bold tracking-[0.16em] text-[#D6A450]">{d.serviceCards.cardEyebrow}</p><h3 className="mt-2 text-3xl font-bold sm:text-4xl">{activeFeature.title}</h3><p className="mt-2 text-base text-[#DCE6EF]">{activeFeature.subtitle}</p></div>
                      <Link href={`/${locale}/services/${activeFeature.slug}`} className="flex items-center justify-between border-t border-white/20 pt-4 text-sm font-semibold">{d.serviceCards.cardLink} <ArrowUpRight size={19} className="text-[#D6A450]" /></Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SCENE 04 — WHY SAPIHIVE */}
            <div ref={node => { sceneRefs.current[3] = node; }} className="pointer-events-none absolute inset-0 flex items-center justify-center px-5 pt-24 text-center will-change-transform sm:px-8" style={{ transformStyle: "preserve-3d" }}>
              <div className="w-full max-w-[1220px]"><p className="text-xs font-semibold tracking-[0.25em] text-[#D6A450]">{d.sections.why.eyebrow}</p><h2 className="mt-5 text-[clamp(2.6rem,6vw,5.7rem)] font-bold leading-[1.05] tracking-[-.05em]">{t.whyTitle}<br /><span className="text-[#D6A450]">{t.whyHighlight}</span></h2>
                <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">{t.whyCards.map((item,i)=><div key={item.title} className="rounded-2xl border border-white/20 bg-white/[.08] p-5 text-start shadow-xl backdrop-blur-lg sm:p-8"><span className="text-2xl font-bold text-[#D6A450]">0{i+1}</span><h3 className="mt-4 text-2xl font-semibold">{item.title}</h3><p className="mt-2 text-sm text-[#DCE5EF]">{item.description}</p></div>)}</div>
                <Link href={`/${locale}`} className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#D6A450]/70 px-6 py-3 text-sm font-semibold text-[#FFD79D]">{t.returnToWebsite} <ArrowUpRight size={17} /></Link>
              </div>
            </div>
          </div>

          {/* Scene nav shows this is an interactive scroll preview. */}
          <div className="pointer-events-auto absolute inset-x-0 bottom-5 z-40 flex flex-col items-center gap-3 sm:bottom-7">
            <div className="flex items-center gap-3 sm:gap-5">{stations.map((name, i) => <button key={name} onClick={() => jump(i)} type="button" aria-label={`${t.moveTo} ${name}`} aria-current={active === i ? "step" : undefined} className={`h-[5px] rounded-full transition-all duration-300 ${active === i ? "w-11 bg-[#D6A450]" : "w-5 bg-white/30 hover:bg-white/70"}`} />)}</div>
            <p className="text-[10px] font-semibold tracking-[0.22em] text-white/65 sm:text-xs">{stations[active]} · {String(active + 1).padStart(2, "0")} / 04</p>
          </div>
          <div className="pointer-events-none absolute bottom-8 start-6 hidden items-center gap-2 text-xs text-white/40 lg:flex"><Check size={15} className="text-[#D6A450]" /> {t.cameraLabel}</div>
        </div>
      </section>
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 bg-[#142235] px-6 py-16 text-center">
        <h2 className="text-2xl font-semibold">{t.endTitle}</h2>
        <p className="max-w-[600px] text-sm leading-relaxed text-[#DCE5EF]">{t.endDescription}</p>
        <Link href={`/${locale}`} className="rounded-full bg-[#C69A53] px-6 py-3 text-sm font-semibold text-[#142235]">{t.backToSapiHive}</Link>
      </div>
    </div>
  );
}
