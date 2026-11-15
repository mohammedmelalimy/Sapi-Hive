"use client";

// Five equally spaced outer rings, one central core.
// All coordinates are in the fixed 640 x 560 SVG stage.
const RADIUS = 148;
const cx = 320;
const cy = 280;
export const HIVE_NODES = [
  { id: "core", x: 0, y: 0, serviceIndex: null },
  ...[0, 1, 2, 3, 4].map((i) => {
    const radians = (-90 + i * 72) * Math.PI / 180;
    return { id: ["corporate", "tech", "people", "talent", "creative"][i], x: Math.round(Math.cos(radians) * RADIUS * 100) / 100, y: Math.round(Math.sin(radians) * RADIUS * 100) / 100, serviceIndex: i };
  }),
];
export const HIVE_POSITIONS = HIVE_NODES.map(({ x, y }) => ({ x, y }));

const OUTER = "M70 5 L128 38 L128 102 L70 135 L12 102 L12 38 Z";
const INNER = "M70 31 L106 52 L106 88 L70 109 L34 88 L34 52 Z";

function HexRing({ index }: { index: number }) {
  const gold = index === 0;
  const id = `sph-fill-${index}`;
  return (
    <svg viewBox="0 0 140 140" aria-hidden="true" className="h-full w-full overflow-visible">
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gold ? "#F5D792" : "#EDF9FF"} stopOpacity={gold ? 0.92 : 0.72} />
          <stop offset="50%" stopColor={gold ? "#BC8A3C" : "#78A0B8"} stopOpacity={gold ? 0.85 : 0.24} />
          <stop offset="100%" stopColor={gold ? "#EAC679" : "#D8F1FF"} stopOpacity={gold ? 0.9 : 0.62} />
        </linearGradient>
      </defs>
      <path d={OUTER} transform="translate(0 4)" stroke={gold ? "#90652D" : "#48677C"} strokeWidth="5" fill="none" opacity="0.55" />
      <path d={`${OUTER} ${INNER}`} fill={`url(#${id})`} fillRule="evenodd" stroke={gold ? "#F1CF83" : "#C5E1F1"} strokeWidth="2.8" strokeLinejoin="round" />
      <path d={INNER} fill="none" stroke={gold ? "#F5E0A8" : "#8EB1C7"} strokeWidth="2" />
      <path d="M12 38 L70 5 L128 38" stroke="#F5FBFF" fill="none" strokeOpacity="0.75" strokeWidth="2.2" />
      <path data-hive-active-edge d={OUTER} fill="none" stroke="#FFD27C" strokeWidth="5.5" opacity="0" style={{ filter: "drop-shadow(0 0 6px #D9AB62)" }} />
    </svg>
  );
}

const LABELS = [
  { x: 320, y: 28 },
  { x: 581, y: 135 },
  { x: 558, y: 444 },
  { x: 95, y: 495 },
  { x: 56, y: 135 },
];

function Callout({ index, label }: { index: number; label: string }) {
  const node = HIVE_NODES[index + 1];
  const anchor = LABELS[index];
  const dx = cx + node.x - anchor.x;
  const dy = cy + node.y - anchor.y;
  const len = Math.hypot(dx, dy) || 1;
  const x2 = Math.round((cx + node.x - dx / len * 72) * 100) / 100;
  const y2 = Math.round((cy + node.y - dy / len * 72) * 100) / 100;
  const marker = `sph-arrow-${index}`;
  return (
    <div data-hive-callout data-service-index={index} className="pointer-events-none invisible absolute inset-0 opacity-0">
      <svg viewBox="0 0 640 560" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        <defs><marker id={marker} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6" fill="none" stroke="#E4B568" strokeWidth="1.4" /></marker></defs>
        <path d={`M${anchor.x} ${anchor.y} L${x2} ${y2}`} fill="none" stroke="#BCD4E2" strokeWidth="1.5" markerEnd={`url(#${marker})`} />
      </svg>
      <div className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-[#9CB4C4]/40 bg-[#15283B]/95 px-3 py-1.5 text-[12px] font-medium text-white shadow-lg" style={{ left: anchor.x, top: anchor.y }}>
        <span className="me-2 text-[#E4B568]">{String(index + 1).padStart(2, "0")}</span>{label}
      </div>
    </div>
  );
}

export function GlassHive({ labels }: { labels: string[] }) {
  return (
    <div data-hive-root aria-hidden="true" className="pointer-events-none invisible absolute left-1/2 top-1/2 h-[560px] w-[640px] will-change-transform" style={{ marginLeft: -320, marginTop: -280, transformStyle: "preserve-3d" }}>
      {HIVE_NODES.map((node, i) => (
        <div key={node.id} data-hive-piece className="invisible absolute left-1/2 top-1/2 h-[140px] w-[140px] will-change-transform" style={{ marginLeft: -70, marginTop: -70, transformStyle: "preserve-3d" }}>
          <HexRing index={i} />
        </div>
      ))}
      {/* Desktop: arrows stay attached to the hive and travel with it. */}
      <div className="hidden md:contents">{labels.map((label, i) => <Callout key={i} index={i} label={label} />)}</div>
      {/* Mobile: compact numbers on each node instead of off-screen leader lines. */}
      {HIVE_NODES.slice(1).map((node, i) => (
        <div key={node.id} data-mobile-marker className="invisible absolute hidden h-7 w-7 items-center justify-center rounded-full border border-[#E4B568]/60 bg-[#13263A] text-[11px] font-semibold text-[#E4B568] opacity-0 max-md:flex" style={{ left: cx + node.x + 32, top: cy + node.y - 58 }}>
          {i + 1}
        </div>
      ))}
    </div>
  );
}
