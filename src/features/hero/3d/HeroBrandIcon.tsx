"use client";

import Image from "next/image";
import brandIcon from "../assets/sapihive-brand-icon.png";

/** Approved brand icon, kept unmodified. Its *plane* tilts to give a restrained 3D perspective. */
export function HeroBrandIcon() {
  return (
    <div
      data-hive-root
      aria-hidden="true"
      className="pointer-events-none invisible absolute left-1/2 top-1/2 h-[560px] w-[640px] will-change-transform"
      style={{ marginLeft: -320, marginTop: -280, perspective: 1100 }}
    >
      <div
        data-hive-visual
        className="invisible absolute left-1/2 top-1/2 h-[550px] w-[550px] will-change-transform"
        style={{ marginLeft: -275, marginTop: -275 }}
      >
        <div
          data-hive-shadow
          className="absolute bottom-[4%] left-[16%] h-[15%] w-[68%] rounded-full bg-[#07131F]/35 blur-[28px] opacity-0"
        />
        <div
          data-hive-tilt
          className="absolute inset-0 will-change-transform [transform-style:preserve-3d]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* A restrained offset creates perceived depth, while the original mark stays unchanged. */}
          <div className="absolute inset-0 opacity-20" style={{ transform: "translate3d(0, 14px, -28px)" }}>
            <Image src={brandIcon} alt="" fill priority sizes="(max-width: 767px) 420px, 550px" className="object-contain brightness-[0.40]" />
          </div>
          <div className="absolute inset-0" style={{ transform: "translateZ(18px)" }}>
            <Image src={brandIcon} alt="" fill priority sizes="(max-width: 767px) 420px, 550px" className="object-contain drop-shadow-[0_18px_25px_rgba(0,0,0,0.20)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
