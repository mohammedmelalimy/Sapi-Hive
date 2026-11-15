"use client";

import { Children, useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Actual spatial camera journey.
 * The panels are parked at fixed positions in a shared 3D world.
 * Only the WORLD moves (the inverse of a moving virtual camera).
 * Unlike per-section entrance transforms, there is no text flying in.
 */
export function CameraJourney({ children, locale = "en" }: { children: ReactNode; locale?: "en" | "ar" }) {
  const journeyRef = useRef<HTMLElement>(null);
  const count = Children.count(children);

  useGSAP(() => {
    const journey = journeyRef.current;
    if (!journey) return;

    const viewport = journey.querySelector<HTMLElement>("[data-camera-viewport]");
    const world = journey.querySelector<HTMLElement>("[data-camera-world]");
    const panels = Array.from(journey.querySelectorAll<HTMLElement>("[data-camera-panel]"));
    if (!viewport || !world || panels.length < 2) return;

    // Mobile / reduced-motion: retain native document scrolling; never crop
    // tall cards, menus, or translated paragraphs inside a pinned viewport.
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      let positionIndex = -1;
      const readPosition = (i: number) => ({
        x: i === 0 ? 0 : (i % 2 ? -0.46 : 0.46) * window.innerWidth,
        y: i * window.innerHeight * 1.06,
        z: -i * 25,
      });
      const start = readPosition(0);
      const sceneSpacing = () => Math.max(700, window.innerHeight * 1.10);
      const virtualCamera = gsap.timeline({ paused: true, defaults: { ease: "none" } });

      // Place ALL scenes in 3D space once. No animations on panels themselves.
      panels.forEach((panel, i) => {
        gsap.set(panel, {
          x: () => readPosition(i).x,
          y: () => readPosition(i).y,
          z: () => readPosition(i).z,
          force3D: true,
        });
      });
      gsap.set(world, { x: -start.x, y: -start.y, z: -start.z, rotationX: 0, rotationY: 0, rotationZ: 0, force3D: true });

      // Disable pointer/keyboard interaction in distant scenes. All the
      // content still exists in React and service cards stay interactive.
      const activate = (index: number) => {
        if (positionIndex === index) return;
        positionIndex = index;
        panels.forEach((panel, i) => {
          panel.inert = i !== index;
          panel.style.pointerEvents = i === index ? "auto" : "none";
        });
      };
      activate(0);

      // During each journey segment the camera goes forward and down, with
      // a slight alternating turn. It settles square-on at every destination.
      for (let i = 0; i < panels.length; i++) {
        virtualCamera.addLabel(`scene-${i}`);
        virtualCamera.to({}, { duration: i === 0 ? 0.65 : 0.85 }); // pause at each destination
        if (i === panels.length - 1) break;

        const sign = i % 2 === 0 ? -1 : 1;
        virtualCamera.to(world, {
          x: () => -(readPosition(i).x + readPosition(i + 1).x) / 2,
          y: () => -(readPosition(i).y + readPosition(i + 1).y) / 2,
          z: () => -(readPosition(i).z + readPosition(i + 1).z) / 2 - 190,
          rotationX: -8,
          rotationY: sign * 13,
          rotationZ: sign * -1.8,
          duration: 0.48,
          ease: "sine.inOut",
        });
        virtualCamera.to(world, {
          x: () => -readPosition(i + 1).x,
          y: () => -readPosition(i + 1).y,
          z: () => -readPosition(i + 1).z,
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
          duration: 0.52,
          ease: "sine.inOut",
        });
      }

      // The single pin begins AFTER the hero's pinned storytelling + shatter.
      // GSAP creates the scroll distance; the document doesn't need fake
      // giant margins or individually animated sections.
      const trigger = ScrollTrigger.create({
        id: "sapihive-spatial-camera",
        trigger: journey,
        start: "top top",
        end: () => `+=${Math.round(sceneSpacing() * (panels.length - 1) + window.innerHeight * 1.1)}`,
        animation: virtualCamera,
        pin: true,
        pinSpacing: true,
        scrub: 0.85,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        refreshPriority: 0,
        onRefreshInit: () => {
          panels.forEach((panel, i) => gsap.set(panel, {
            x: readPosition(i).x,
            y: readPosition(i).y,
            z: readPosition(i).z,
          }));
        },
        onUpdate: self => {
          // Find the destination closest to camera, not the next DOM block.
          const p = virtualCamera.time();
          let closest = 0;
          let best = Infinity;
          for (let i = 0; i < panels.length; i++) {
            const delta = Math.abs(p - (virtualCamera.labels[`scene-${i}`] ?? 0));
            if (delta < best) { best = delta; closest = i; }
          }
          activate(closest);
        },
        onLeave: () => activate(panels.length - 1),
        onEnterBack: () => activate(panels.length - 1),
      });

      // Geometry is rebuilt when browser dimensions change (GSAP refresh).
      // Functions in x/y/z above are re-evaluated on refresh.
      return () => {
        trigger.kill();
        virtualCamera.kill();
        panels.forEach(panel => {
          panel.inert = false;
          panel.style.pointerEvents = "";
          gsap.set(panel, { clearProps: "transform" });
        });
        gsap.set(world, { clearProps: "transform" });
      };
    });
    return () => mm.revert();
  }, { scope: journeyRef, dependencies: [count], revertOnUpdate: true });

  return (
    <section
      ref={journeyRef}
      id="sapihive-camera-journey"
      data-camera-journey
      aria-label={locale === "ar" ? "أقسام الصفحة الرئيسية لموقع SapiHive" : "SapiHive homepage sections"}
      className="relative z-20 w-full max-w-full [overflow-x:clip] lg:h-dvh motion-reduce:lg:h-auto"
    >
      <div
        data-camera-viewport
        className="relative w-full max-w-full lg:h-full lg:overflow-hidden motion-reduce:lg:h-auto motion-reduce:lg:overflow-visible"
        style={{ perspective: "1350px", perspectiveOrigin: "50% 48%" }}
      >
        <div
          data-camera-world
          className="relative flex w-full flex-col lg:absolute lg:inset-0 lg:block motion-reduce:lg:relative motion-reduce:lg:flex motion-reduce:lg:flex-col"
          style={{ transformStyle: "preserve-3d" }}
        >
          {Children.map(children, (child, index) => (
            <div
              key={index}
              data-camera-panel
              data-camera-scene={index}
              className="relative w-full lg:absolute lg:inset-0 lg:h-full lg:w-full motion-reduce:lg:relative motion-reduce:lg:min-h-dvh"
              style={{ backfaceVisibility: "hidden" }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
