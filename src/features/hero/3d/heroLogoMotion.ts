/** GSAP modifies these scalar values; React Three Fiber reads them in useFrame. */
export type HeroLogoMotion = {
  assembly: number;
  depth: number;
  focusMode: number;
  focus: number;
  final: number;
  exit: number;
};

export const newHeroLogoMotion = (): HeroLogoMotion => ({
  assembly: 0,
  depth: 0,
  focusMode: 0,
  focus: -1,
  final: 0,
  exit: 0,
});
