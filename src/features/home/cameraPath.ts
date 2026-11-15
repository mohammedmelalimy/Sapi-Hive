/**
 * Pure camera-path maths for <CameraWorld>. No DOM, no GSAP: numbers in, numbers out.
 *
 * World coordinates are CSS pixels: +x right, +y down, +z toward the viewer.
 *
 * Every room has a FIXED top-left corner in this world. The camera starts at (0, 0, 0)
 * and "being at a room" means: camera top-left == room top-left, zero rotation, same depth.
 * In that pose the room fills the screen pixel-for-pixel, exactly like a normal section,
 * so nothing is moving, tilted or scaled when the camera arrives.
 *
 * The camera's whole life is a list of segments laid end to end along the scroll distance:
 *   travel  → fly from one room to the next (eased, banks and pulls back mid-flight)
 *   hold    → rest on the room; the room is perfectly still
 *   pan     → only for rooms taller than the screen: slide straight down through the room
 * Pose is a pure function of scroll, so scrolling up retraces the exact same path.
 */

export type Vec3 = { x: number; y: number; z: number };

export type Pose = Vec3 & { rotateX: number; rotateY: number; rotateZ: number };

export type CameraTuning = {
  /** CSS perspective distance in px. Smaller = stronger 3D. */
  perspective: number;
  /** Horizontal offset of every room from the centre line, × stage width. */
  spreadX: number;
  /** Empty space between one room's bottom and the next room's top, × stage height. */
  gapY: number;
  /** How much of the first room is already peeking in at the bottom edge when the camera starts, × stage height. */
  launchPeek: number;
  /** Scroll distance of one flight between rooms, × stage height. */
  travel: number;
  /** Scroll distance the camera rests (perfectly still) on each room, × stage height. */
  hold: number;
  /** Extra rest after a tall room has been panned to its bottom, × stage height. */
  tailHold: number;
  /** How far (px) the camera backs away from the scene at the middle of a flight. */
  pullBack: number;
  /** Odd-numbered rooms sit this many px deeper than even ones, so flights also move in depth. */
  depth: number;
  /** Peak tilt (deg) at the middle of a flight. Always 0 when resting on a room. */
  bankX: number;
  bankY: number;
  bankZ: number;
};

export const DESKTOP_TUNING: CameraTuning = {
  perspective: 1450,
  spreadX: 0.62,
  gapY: 0.25,
  launchPeek: 0.2,
  travel: 1,
  hold: 0.45,
  tailHold: 0.2,
  pullBack: 380,
  depth: 160,
  bankX: 5,
  bankY: 9,
  bankZ: 3,
};

export const COMPACT_TUNING: CameraTuning = {
  ...DESKTOP_TUNING,
  perspective: 1100,
  spreadX: 0.5,
  pullBack: 260,
  depth: 100,
  bankX: 3,
  bankY: 5,
  bankZ: 1.8,
};

export type RoomPlacement = { x: number; y: number; z: number; height: number };

export type Segment = {
  kind: "travel" | "hold" | "pan";
  /** Scroll offsets (px) measured from where the pin starts. */
  start: number;
  end: number;
  from: Vec3;
  to: Vec3;
};

export type CameraPath = {
  tuning: CameraTuning;
  rooms: RoomPlacement[];
  segments: Segment[];
  /** Total scroll distance the pinned stage needs. */
  total: number;
  /** Scroll offset at which the camera has just arrived at room i. */
  arrive: number[];
  /** Scroll offset at which a tall room starts panning (== arrive when the room fits the screen). */
  panStart: number[];
  /** Scroll offset at which the camera starts leaving room i. */
  leave: number[];
};

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
/** Same curve as GSAP "power2.inOut": zero speed at both ends, so arrivals settle gently. */
const easeInOut = (u: number) => (u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2);

export function buildPath(
  stageW: number,
  stageH: number,
  roomHeights: number[],
  tuning: CameraTuning,
  firstSide: 1 | -1 = 1,
): CameraPath {
  const rooms: RoomPlacement[] = [];
  let top = stageH * (1 - tuning.launchPeek);

  roomHeights.forEach((measured, i) => {
    const height = Math.max(Math.round(measured), stageH);
    const side = i % 2 === 0 ? firstSide : -firstSide;
    rooms.push({
      x: Math.round(side * stageW * tuning.spreadX),
      y: Math.round(top),
      z: i % 2 === 0 ? 0 : -tuning.depth,
      height,
    });
    top += height + stageH * tuning.gapY;
  });

  const segments: Segment[] = [];
  const arrive: number[] = [];
  const panStart: number[] = [];
  const leave: number[] = [];

  let s = 0;
  let cam: Vec3 = { x: 0, y: 0, z: 0 };
  const add = (kind: Segment["kind"], length: number, to: Vec3) => {
    if (length <= 0) return;
    segments.push({ kind, start: s, end: s + length, from: cam, to });
    s += length;
    cam = to;
  };

  rooms.forEach((room, i) => {
    const home: Vec3 = { x: room.x, y: room.y, z: room.z };
    add("travel", tuning.travel * stageH, home);
    arrive[i] = s;
    add("hold", tuning.hold * stageH, home);
    panStart[i] = s;
    const overflow = room.height - stageH;
    if (overflow > 0) {
      add("pan", overflow, { ...home, y: room.y + overflow });
      add("hold", tuning.tailHold * stageH, cam);
    }
    leave[i] = s;
  });

  return { tuning, rooms, segments, total: s, arrive, panStart, leave };
}

const REST: Pose = { x: 0, y: 0, z: 0, rotateX: 0, rotateY: 0, rotateZ: 0 };

/** Camera pose for a scroll offset (px from the pin start). */
export function poseAt(path: CameraPath, scroll: number): Pose {
  const { segments, total, tuning } = path;
  if (!segments.length) return REST;

  const s = clamp(scroll, 0, total);
  const seg = segments.find((g) => s <= g.end) ?? segments[segments.length - 1];
  const u = clamp((s - seg.start) / (seg.end - seg.start), 0, 1);

  if (seg.kind === "hold") return { ...seg.from, rotateX: 0, rotateY: 0, rotateZ: 0 };

  if (seg.kind === "pan") {
    return { x: seg.from.x, y: lerp(seg.from.y, seg.to.y, u), z: seg.from.z, rotateX: 0, rotateY: 0, rotateZ: 0 };
  }

  // travel
  const e = easeInOut(u);
  const bell = Math.sin(Math.PI * e); // 0 at both ends, 1 in the middle
  const dirX = Math.sign(seg.to.x - seg.from.x);

  return {
    x: lerp(seg.from.x, seg.to.x, e),
    y: lerp(seg.from.y, seg.to.y, e),
    z: lerp(seg.from.z, seg.to.z, e) + tuning.pullBack * bell,
    // Lean toward the side we're heading to, nose slightly down, small roll into the turn.
    rotateX: tuning.bankX * bell,
    rotateY: -dirX * tuning.bankY * bell,
    rotateZ: -dirX * tuning.bankZ * bell,
  };
}
