import { HomeSectionParticles } from './HomeSectionParticles';

/**
 * SapiHive — Official Brand Background
 *
 * Hive Navy: #0F1B2D
 *
 * Uses the official brand palette.
 * Preserves the existing particles animation.
 */

export function SiteBackground() {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        fixed
        inset-0
        z-0
        overflow-hidden
        bg-[#0F1B2D]
      "
    >
      {/* Official Hive Navy Background */}
      <div className="absolute inset-0 bg-[#0F1B2D]" />

      {/* Existing Particles Animation */}
      <HomeSectionParticles />
    </div>
  );
}
