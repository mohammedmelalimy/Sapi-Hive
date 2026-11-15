"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type CameraSectionProps = {
  children: ReactNode;
  /** 0 = camera comes from lower-right, 1 = lower-left, etc. */
  index: number;
};

/**
 * Vertical scrolling remains native; only the scene's 3D camera angle changes.
 * Entry alternates lower-right / lower-left for successive homepage sections.
 * Exit pulls the previous scene gently into the opposite side and into depth.
 * A stable outer wrapper prevents transformed content from changing trigger geometry.
 *
 * This wrapper deliberately animates a separate [data-camera-stage] element:
 * sections own their own GSAP transitions, and Hero owns the first WHO WE ARE
 * handoff, so these transformations must not overwrite the section's transform.
 */
export function CameraSection({ children, index }: CameraSectionProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const stage = root?.querySelector<HTMLElement>("[data-camera-stage]");
      if (!root || !stage) return;

      const media = gsap.matchMedia();
      media.add(
        {
          desktop: "(min-width: 768px)",
          mobile: "(max-width: 767px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { mobile, reduceMotion } = context.conditions ?? {};
          if (reduceMotion) {
            gsap.set(stage, { clearProps: "all" });
            return;
          }

          const side = index % 2 === 0 ? 1 : -1;
          const compact = Boolean(mobile);

          const entry = {
            x: compact ? side * 26 : side * 125,
            y: compact ? 38 : 95,
            z: compact ? -70 : -190,
            rotationX: compact ? -5 : -13,
            rotationY: side * (compact ? -5 : -13),
            rotationZ: side * (compact ? -1.1 : -2.7),
            scale: compact ? 0.975 : 0.92,
            transformOrigin: "50% 50%",
            force3D: true,
          };

          const exit = {
            x: compact ? -side * 20 : -side * 95,
            y: compact ? -28 : -65,
            z: compact ? -45 : -125,
            rotationX: compact ? 4 : 9,
            rotationY: -side * (compact ? -4 : -10),
            rotationZ: -side * (compact ? -0.8 : -2),
            scale: compact ? 0.985 : 0.95,
            force3D: true,
          };

          // One timeline avoids conflicting enter/exit tweens on the same stage.
          // On reverse scroll it retraces the same zigzag path automatically.
          const camera = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.65,
              invalidateOnRefresh: true,
              // No pin and no extra scroll space; the Hero owns its pin.
            },
          });

          camera
            .fromTo(
              stage,
              entry,
              {
                x: 0,
                y: 0,
                z: 0,
                rotationX: 0,
                rotationY: 0,
                rotationZ: 0,
                scale: 1,
                duration: 0.33,
                immediateRender: false,
              },
            )
            .to({}, { duration: 0.44 }) // Hold steady while content is read.
            .to(stage, { ...exit, duration: 0.23 });
        },
      );

      return () => media.revert();
    },
    { scope: rootRef, dependencies: [index], revertOnUpdate: true },
  );

  return (
    <div
      ref={rootRef}
      data-sapihive-camera-section
      data-camera-direction={index % 2 === 0 ? "lower-right" : "lower-left"}
      className="relative w-full max-w-full overflow-x-clip"
      style={{ perspective: "1450px", perspectiveOrigin: "50% 38%" }}
    >
      <div data-camera-stage className="relative w-full" style={{ transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </div>
  );
}
