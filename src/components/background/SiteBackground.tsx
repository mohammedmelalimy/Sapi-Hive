import { HomeSectionParticles } from "./HomeSectionParticles";

/** Shared gradient everywhere; particles run only behind the first three home sections. */
export function SiteBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#19283A]">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,#19283A_0%,#33455A_52%,#526276_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_42%,rgba(168,180,192,0.18),transparent_65%)]" />
      <HomeSectionParticles />
    </div>
  );
}
