"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import InteractiveParticles from "@/features/hero/3d/InteractiveParticles";

/**
 * One continuous particle field behind Hero → Who We Are → Our Services.
 * The canvas is fixed to the viewport, so pinned Hero scroll chapters and
 * normal section entrances share the exact same network without resets.
 * It fades out as Our Services leaves; all subsequent sections stay clean.
 */
export function HomeSectionParticles() {
  const pathname = usePathname();
  const hostRef = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let frameId = 0;
    let lastActive: boolean | null = null;

    const update = () => {
      frameId = 0;
      const hero = document.getElementById("hero");
      const services = document.getElementById("services");
      const hasHomeSections = Boolean(hero && services);

      // Never show this network on About, Contact, individual services etc.
      if (!hasHomeSections) {
        host.style.opacity = "0";
        host.style.visibility = "hidden";
        if (lastActive !== false) {
          lastActive = false;
          setRunning(false);
        }
        return;
      }

      const bottom = services!.getBoundingClientRect().bottom;
      const height = window.innerHeight;
      // Keep full strength through Hero and WHO WE ARE, and most of Services.
      // Finish the transition before the next section fills the screen.
      const fadeStart = height * 0.70;
      const fadeEnd = height * 0.08;
      const opacity = Math.max(0, Math.min(1, (bottom - fadeEnd) / (fadeStart - fadeEnd)));

      host.style.opacity = opacity.toFixed(3);
      host.style.visibility = opacity > 0.001 ? "visible" : "hidden";

      const active = opacity > 0.001;
      if (active !== lastActive) {
        lastActive = active;
        // Stop the RAF-based canvas when the first three sections are gone.
        setRunning(active);
      }
    };

    const schedule = () => {
      if (!frameId) frameId = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    // Recheck after GSAP pin spacers / client navigation modify the layout.
    const observer = new MutationObserver(schedule);
    const main = document.querySelector("main");
    if (main) observer.observe(main, { childList: true });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, [pathname]);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ opacity: 0, visibility: "hidden", willChange: "opacity" }}
    >
      {running ? <InteractiveParticles /> : null}
    </div>
  );
}
