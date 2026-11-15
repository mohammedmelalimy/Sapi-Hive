"use client";

import { Children, useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  buildPath,
  poseAt,
  COMPACT_TUNING,
  DESKTOP_TUNING,
  type CameraPath,
} from "./cameraPath";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type CameraWorldProps = {
  /** Every direct child is one "room" placed in the world, in order. */
  children: ReactNode;
  /** Which side the FIRST room sits on. Rooms then alternate. Default: right. */
  firstSide?: "right" | "left";
};

/**
 * One big 3D world, one camera.
 *
 *  - Each child is a room with a FIXED position in the world. Rooms never animate.
 *  - One pinned, full-screen stage shows the world through a CSS perspective camera.
 *  - Scrolling only moves the camera (see cameraPath.ts for the route).
 *  - When the camera reaches a room it rests there with zero tilt, so the room is
 *    perfectly still and sharp. Scrolling back up replays the same route in reverse.
 *
 * DOM:  root > stage (pinned, perspective, clips) > rig (camera tilt) > world (camera position) > rooms
 *
 * Without JS, or with prefers-reduced-motion, none of the world styles are applied and
 * the children are simply stacked like a normal page.
 *
 * Rooms must not rely on their own scroll-linked animations: the camera is the only
 * thing that moves. Any ScrollTrigger animation found inside a room is finished and
 * detached (see settleSectionMotion below).
 */
export function CameraWorld({ children, firstSide = "right" }: CameraWorldProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const rooms = Children.toArray(children);

  useGSAP(
    () => {
      const root = rootRef.current;
      const stage = root?.querySelector<HTMLElement>("[data-camera-stage]");
      const rig = root?.querySelector<HTMLElement>("[data-camera-rig]");
      const world = root?.querySelector<HTMLElement>("[data-camera-world]");
      if (!root || !stage || !rig || !world) return;
      const roomEls = Array.from(world.querySelectorAll<HTMLElement>(":scope > [data-camera-room]"));
      if (!roomEls.length) return;

      const media = gsap.matchMedia();
      media.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          compact: "(max-width: 767px)",
        },
        (context) => {
          const { motion, compact } = context.conditions ?? {};
          if (!motion) return; // reduced motion → plain stacked sections

          const tuning = compact ? COMPACT_TUNING : DESKTOP_TUNING;
          const side = firstSide === "right" ? 1 : -1;

          /* ---------- switch the markup into "world" mode ---------- */
          const restoreStyles = [
            applyStyles(stage, {
              position: "relative",
              width: "100%",
              height: CSS.supports("height", "100svh") ? "100svh" : "100vh",
              // `clip` (unlike `hidden`) never becomes a scroll container, so ScrollTrigger is unaffected.
              overflow: CSS.supports("overflow", "clip") ? "clip" : "hidden",
              perspective: `${tuning.perspective}px`,
              "perspective-origin": "50% 50%",
            }),
            applyStyles(rig, {
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              "transform-style": "preserve-3d",
              "transform-origin": "50% 50%",
              "will-change": "transform",
              transform: "none",
            }),
            applyStyles(world, {
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              "transform-style": "preserve-3d",
              "will-change": "transform",
              transform: "none",
            }),
            ...roomEls.map((el) =>
              applyStyles(el, {
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                "min-height": "100%",
                transform: "none",
              }),
            ),
          ];

          // Old browsers that fall back to overflow:hidden could scroll the stage on focus. Undo that.
          const resetStageScroll = () => {
            stage.scrollTop = 0;
            stage.scrollLeft = 0;
          };
          stage.addEventListener("scroll", resetStageScroll);

          /* ---------- layout: measure, then place every room ---------- */
          let path: CameraPath = buildPath(0, 0, [], tuning, side);

          const measure = () => {
            path = buildPath(
              stage.clientWidth,
              stage.clientHeight,
              roomEls.map((el) => el.offsetHeight),
              tuning,
              side,
            );
            roomEls.forEach((el, i) => {
              const r = path.rooms[i];
              el.style.transform = `translate3d(${r.x}px, ${r.y}px, ${r.z}px)`;
            });
          };

          /* ---------- camera: pose → CSS ---------- */
          const n = (v: number) => Math.round(v * 1000) / 1000;
          const render = (scroll: number) => {
            const p = poseAt(path, scroll);
            // Rig tilts the camera around the screen centre; world slides the scene the opposite way.
            rig.style.transform = `rotateX(${n(p.rotateX)}deg) rotateY(${n(p.rotateY)}deg) rotateZ(${n(p.rotateZ)}deg)`;
            world.style.transform = `translate3d(${n(-p.x)}px, ${n(-p.y)}px, ${n(-p.z)}px)`;
          };

          measure();
          render(0);

          const progress = { p: 0 };
          const tween = gsap.to(progress, {
            p: 1,
            ease: "none",
            onUpdate: () => render(progress.p * path.total),
            scrollTrigger: {
              trigger: stage,
              start: "top top",
              end: () => {
                measure(); // fresh sizes on every refresh (resize, fonts, accordions…)
                return `+=${path.total}`;
              },
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              scrub: 0.5,
              refreshPriority: -1, // refresh after the Hero's pin so our start offset includes it
              onRefreshInit: () => {
                measure();
                render(progress.p * path.total);
              },
            },
          });
          const st = tween.scrollTrigger!;

          /* ---------- rooms must be still: finish any scroll-linked reveal inside them ---------- */
          const settleSectionMotion = () => {
            let settled = 0;
            ScrollTrigger.getAll().forEach((other) => {
              const el = other.trigger;
              if (other === st || !el || !world.contains(el)) return;
              if (other.pin) {
                if (process.env.NODE_ENV !== "production") {
                  console.warn("[CameraWorld] a pinned ScrollTrigger inside a room cannot work in the 3D world:", el);
                }
                return;
              }
              if (!other.animation) return; // callback-only triggers are left alone
              if (Number.isFinite(other.animation.totalDuration())) other.animation.progress(1);
              other.kill();
              settled++;
            });
            if (settled && process.env.NODE_ENV !== "production") {
              console.info(`[CameraWorld] finished and detached ${settled} scroll-linked animation(s) inside rooms.`);
            }
          };
          settleSectionMotion();
          ScrollTrigger.addEventListener("refresh", settleSectionMotion);

          /* ---------- jump the camera to a room (keyboard focus, #anchor links) ---------- */
          const goTo = (index: number, target?: Element | null) => {
            const room = path.rooms[index];
            if (!room) return;
            const H = stage.clientHeight;
            let offset = (path.arrive[index] + path.panStart[index]) / 2;
            const overflow = room.height - H;
            if (target && overflow > 0) {
              let top = 0;
              for (let el = target as HTMLElement | null; el && el !== roomEls[index]; el = el.offsetParent as HTMLElement | null) {
                top += el.offsetTop;
              }
              const want = Math.min(overflow, Math.max(0, top - H * 0.3));
              if (want > 0) offset = path.panStart[index] + want;
            }
            const y = st.start + offset;
            if (Math.abs(window.scrollY - y) > 2) window.scrollTo({ top: y });
          };

          const roomIndexOf = (el: Element | null) => (el ? roomEls.findIndex((r) => r.contains(el)) : -1);

          const onFocusIn = (e: FocusEvent) => {
            const target = e.target as HTMLElement | null;
            const index = roomIndexOf(target);
            if (!target || index < 0) return;
            const rect = target.getBoundingClientRect();
            const visible =
              rect.width > 0 && rect.top >= 0 && rect.left >= 0 &&
              rect.bottom <= window.innerHeight && rect.right <= window.innerWidth;
            const y = window.scrollY;
            const camHere = y >= st.start + path.arrive[index] - 2 && y <= st.start + path.leave[index] + 2;
            if (!(visible && camHere)) goTo(index, target);
          };
          stage.addEventListener("focusin", onFocusIn);

          const sameLocation = (a: string, b: string) => a.replace(/\/$/, "") === b.replace(/\/$/, "");
          const targetFromHash = (hash: string) => {
            const id = decodeURIComponent(hash.replace(/^#/, ""));
            const el = id ? document.getElementById(id) : null;
            return { el, index: roomIndexOf(el) };
          };
          // Only preventDefault (never stopPropagation) so menus etc. still react to the click.
          const onDocClick = (e: MouseEvent) => {
            if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
            if (!a || !a.hash || a.origin !== window.location.origin || !sameLocation(a.pathname, window.location.pathname)) return;
            const { el, index } = targetFromHash(a.hash);
            if (index < 0) return;
            e.preventDefault();
            goTo(index, el);
          };
          const onHashChange = () => {
            const { el, index } = targetFromHash(window.location.hash);
            if (index >= 0) goTo(index, el);
          };
          document.addEventListener("click", onDocClick, true);
          window.addEventListener("hashchange", onHashChange);

          /* ---------- rooms can change height (FAQ accordion, fonts, images) → recompute ---------- */
          let heights = roomEls.map((el) => el.offsetHeight);
          let refreshTimer: ReturnType<typeof setTimeout> | undefined;
          const observer = new ResizeObserver(() => {
            const next = roomEls.map((el) => el.offsetHeight);
            if (next.every((h, i) => h === heights[i])) return;
            heights = next;
            clearTimeout(refreshTimer);
            refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 120);
          });
          roomEls.forEach((el) => observer.observe(el));

          /* ---------- cleanup (breakpoint change, reduced-motion toggle, unmount) ---------- */
          return () => {
            clearTimeout(refreshTimer);
            observer.disconnect();
            ScrollTrigger.removeEventListener("refresh", settleSectionMotion);
            document.removeEventListener("click", onDocClick, true);
            window.removeEventListener("hashchange", onHashChange);
            stage.removeEventListener("focusin", onFocusIn);
            stage.removeEventListener("scroll", resetStageScroll);
            // Release the pin BEFORE restoring inline styles, otherwise ScrollTrigger would put the world styles back.
            st.kill(true);
            tween.kill();
            restoreStyles.forEach((undo) => undo());
          };
        },
      );

      return () => media.revert();
    },
    { scope: rootRef, dependencies: [rooms.length, firstSide], revertOnUpdate: true },
  );

  return (
    <div ref={rootRef} data-sapihive-camera-world className="relative w-full max-w-full">
      <div data-camera-stage className="relative w-full">
        <div data-camera-rig>
          <div data-camera-world>
            {rooms.map((room, i) => (
              <div key={i} data-camera-room data-camera-index={i}>
                {room}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Sets inline styles and returns a function that puts the previous values back. */
function applyStyles(el: HTMLElement, styles: Record<string, string>) {
  const previous = Object.keys(styles).map(
    (k) => [k, el.style.getPropertyValue(k), el.style.getPropertyPriority(k)] as const,
  );
  Object.entries(styles).forEach(([k, v]) => el.style.setProperty(k, v));
  return () =>
    previous.forEach(([k, v, priority]) =>
      v ? el.style.setProperty(k, v, priority) : el.style.removeProperty(k),
    );
}
