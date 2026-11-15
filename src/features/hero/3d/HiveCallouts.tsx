"use client";

type HiveCalloutsProps = { names: string[] };

/**
 * Five service pointers around the ORIGINAL SapiHive icon.
 * This is a flat annotation overlay: there are no hexagons, no decorative
 * orbital rings, and the annotated icon never docks to the side.
 */
const CALLOUTS = [
  { left: "50%", top: "12%", path: "M550 122 L550 219" },
  { left: "87%", top: "31%", path: "M947 222 L705 321" },
  { left: "84%", top: "77%", path: "M903 510 L689 440" },
  { left: "16%", top: "77%", path: "M197 510 L410 440" },
  { left: "13%", top: "31%", path: "M151 222 L393 321" },
] as const;

export function HiveCallouts({ names }: HiveCalloutsProps) {
  return (
    <div
      data-hive-callouts
      aria-hidden="true"
      className="pointer-events-none invisible absolute left-1/2 top-[53%] z-[19] hidden aspect-[1100/650] w-[min(96vw,1120px)] -translate-x-1/2 -translate-y-1/2 opacity-0 md:block"
    >
      <svg
        viewBox="0 0 1100 650"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <defs>
          <marker id="sph-callout-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4" orient="auto">
            <path d="M0 0 L7 4 L0 8" fill="none" stroke="#F2A900" strokeWidth="1.3" />
          </marker>
        </defs>
        {CALLOUTS.map(({ path }, index) => (
          <path
            key={index}
            data-hive-leader
            data-service-index={index}
            d={path}
            fill="none"
            stroke="#D5DEE8"
            strokeWidth="1.55"
            strokeLinecap="round"
            opacity="0"
            markerEnd="url(#sph-callout-arrow)"
          />
        ))}
      </svg>
      {CALLOUTS.map(({ left, top }, index) => (
        <div
          key={index}
          data-hive-callout
          data-service-index={index}
          className="invisible absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-[#9CB4C4]/45 bg-[#112238]/90 px-3 py-2 text-xs font-medium text-white opacity-0 shadow-[0_12px_28px_rgba(6,15,28,.28)] backdrop-blur-md lg:px-4 lg:text-sm"
          style={{ left, top }}
        >
          <span data-hive-callout-number className="font-semibold tabular-nums text-[#F2A900]">{String(index + 1).padStart(2, "0")}</span>
          <span dir="ltr">{names[index]}</span>
        </div>
      ))}
    </div>
  );
}
