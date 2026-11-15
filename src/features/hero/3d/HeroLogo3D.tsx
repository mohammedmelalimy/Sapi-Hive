'use client';

import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Image from 'next/image';
import icon from '../assets/sapihive-brand-icon.png';
// Both About and Home now use the *same approved contour source*.
import { logoPaths } from '../../about/aboutLogoPaths';
import type { HeroLogoMotion } from './heroLogoMotion';

function outline(points: ReadonlyArray<readonly [number, number]>) {
  const shape = new THREE.Shape();
  const first = points[0];
  const last = points[points.length - 1];
  shape.moveTo((first[0] + last[0]) / 2, (first[1] + last[1]) / 2);
  for (let i = 0; i < points.length; i += 1) {
    const point = points[i];
    const next = points[(i + 1) % points.length];
    shape.quadraticCurveTo(point[0], point[1], (point[0] + next[0]) / 2, (point[1] + next[1]) / 2);
  }
  shape.closePath();
  return shape;
}

const WHITE = new THREE.Color('#F8FAFC');
const AMBER = new THREE.Color('#F2A900');
const WHITE_GLOW = new THREE.Color('#223A51');

function BrandSculpture({ motion, rtl }: { motion: HeroLogoMotion; rtl: boolean }) {
  const root = useRef<THREE.Group>(null);
  const pieces = useRef<Array<THREE.Group | null>>([]);
  const { size } = useThree();

  // Geometry copied from AboutBrandCanvas: same 3D depth and curved bevel.
  const geometries = useMemo(() => logoPaths.map(part => new THREE.ExtrudeGeometry(
    outline(part.points as unknown as ReadonlyArray<readonly [number, number]>),
    {
      depth: 0.38,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.045,
      bevelSize: 0.045,
      bevelSegments: 4,
      curveSegments: 8,
    },
  )), []);

  // Match About's real physical materials, not the older flat MeshStandardMaterial.
  const materials = useMemo(() => logoPaths.map(part => new THREE.MeshPhysicalMaterial({
    color: part.amber ? '#F2A900' : '#F8FAFC',
    metalness: 0.11,
    roughness: 0.31,
    clearcoat: 0.4,
    clearcoatRoughness: 0.22,
    emissive: part.amber ? '#F2A900' : '#223A51',
    emissiveIntensity: part.amber ? 0.15 : 0.025,
    transparent: true,
    opacity: 0,
  })), []);

  useEffect(() => () => {
    geometries.forEach(geometry => geometry.dispose());
    materials.forEach(material => material.dispose());
  }, [geometries, materials]);

  useFrame(({ camera, clock }, delta) => {
    const sculpture = root.current;
    if (!sculpture) return;

    const mobile = size.width < 768;
    const reducedMotion = typeof window !== 'undefined'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const assembly = THREE.MathUtils.clamp(motion.assembly, 0, 1);
    const depth = THREE.MathUtils.clamp(motion.depth, 0, 1);
    const focused = THREE.MathUtils.clamp(motion.focusMode, 0, 1);
    const final = THREE.MathUtils.clamp(motion.final, 0, 1);
    const exit = THREE.MathUtils.clamp(motion.exit, 0, 1);
    const scaleBase = mobile
      ? Math.min(0.62, size.width / 650)
      : Math.min(1.0, size.width / 1550 + 0.15);
    const scale = scaleBase * (1 - final * 0.31) * (1 - focused * (mobile ? 0.02 : 0.12));
    sculpture.scale.setScalar(THREE.MathUtils.damp(sculpture.scale.x, scale, 8, delta));

    // Preserve the original GSAP positions and Arabic/English mirroring.
    const targetX = mobile ? 0 : (rtl ? 1.75 : -1.75) * focused;
    const idleFloat = reducedMotion ? 0 : Math.sin(clock.elapsedTime * 0.8) * 0.07 * assembly;
    const targetY = (mobile ? 0.72 * focused : 0.15 * focused) + 1.38 * final + idleFloat;
    sculpture.position.x = THREE.MathUtils.damp(sculpture.position.x, targetX, 8, delta);
    sculpture.position.y = THREE.MathUtils.damp(sculpture.position.y, targetY, 8, delta);

    // About's characteristic gentle tilt and idle rotation, while the existing
    // scroll timeline still controls depth, service focus and the final chapter.
    const idleRotation = reducedMotion ? 0 : Math.sin(clock.elapsedTime * 0.5) * 0.15;
    sculpture.rotation.x = THREE.MathUtils.damp(
      sculpture.rotation.x, -0.12 - 0.18 * depth * (1 - final), 5.5, delta,
    );
    sculpture.rotation.y = THREE.MathUtils.damp(
      sculpture.rotation.y, 0.24 + idleRotation + 0.24 * depth * (1 - final), 5.5, delta,
    );
    sculpture.rotation.z = THREE.MathUtils.damp(
      sculpture.rotation.z, 0.06 * depth * (1 - final), 7, delta,
    );

    camera.position.x = THREE.MathUtils.damp(camera.position.x, depth * 0.32 * (1 - final), 5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 0.15 * depth * (1 - final), 5, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, 13 - depth * 1.0, 5, delta);
    camera.lookAt(0, 0, 0);

    logoPaths.forEach((part, index) => {
      const piece = pieces.current[index];
      if (!piece) return;
      const theta = index * 2.3999632;
      const dx = Math.cos(theta) * (1.9 + (index % 3) * 0.5);
      const dy = Math.sin(theta) * (1.7 + (index % 4) * 0.37);
      const dz = 1.2 + (index % 4) * 0.68;
      piece.position.set(dx * (1 - assembly), dy * (1 - assembly), dz * (1 - assembly));
      piece.rotation.set(
        (1 - assembly) * (index % 2 ? -0.9 : 0.8),
        (1 - assembly) * ((index % 3) - 1) * 1.1,
        (1 - assembly) * 1.1,
      );
      piece.scale.setScalar(0.72 + assembly * 0.28);

      const material = materials[index];
      // Retain the existing five-Hive Amber emphasis during the service steps.
      const selected = !part.amber && focused > 0.1 && part.serviceGroup === Math.round(motion.focus);
      material.color.lerpColors(part.amber ? AMBER : WHITE, AMBER, selected ? Math.min(1, focused * 0.88) : 0);
      material.emissive.copy(part.amber || selected ? AMBER : WHITE_GLOW);
      material.emissiveIntensity = selected ? 0.28 : part.amber ? 0.15 : 0.025;
      material.opacity = Math.min(1, Math.max(0, assembly * 2.8 - 0.18)) * (1 - exit);
    });
  });

  return (
    <>
      {/* Same light setup used by the 3D icon on About. */}
      <ambientLight intensity={1.45} />
      <hemisphereLight args={['#ffffff', '#314A63', 1.3]} />
      <directionalLight position={[2.8, 5.0, 6]} intensity={2.4} color="#FFFFFF" />
      <directionalLight position={[-4, -2, -1]} intensity={1.8} color="#A9C3DD" />
      <pointLight position={[0.8, -1.7, 4]} color="#F2A900" intensity={3} distance={10} />
      <group ref={root}>
        {logoPaths.map((_, index) => (
          <group key={index} ref={node => { pieces.current[index] = node; }}>
            <mesh geometry={geometries[index]} material={materials[index]} />
          </group>
        ))}
      </group>
    </>
  );
}

export default function HeroLogo3D({ motion, rtl = false }: { motion: HeroLogoMotion; rtl?: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full">
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 13], fov: 35, near: 0.1, far: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        fallback={<div className="grid h-full w-full place-items-center"><Image src={icon} alt="" className="h-48 w-48 object-contain" /></div>}
        style={{ pointerEvents: 'none', background: 'transparent' }}
      >
        <BrandSculpture motion={motion} rtl={rtl} />
      </Canvas>
    </div>
  );
}
