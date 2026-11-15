"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import brandIcon from "@/features/hero/assets/sapihive-brand-icon.png";
import { logoPaths } from "./aboutLogoPaths";

export type AboutBrandOrientation = { x: number; y: number; dragging: boolean; reduceMotion: boolean };

function outline(points: ReadonlyArray<readonly [number, number]>) {
  const shape = new THREE.Shape();
  const first = points[0];
  const last = points[points.length - 1];
  shape.moveTo((first[0] + last[0]) / 2, (first[1] + last[1]) / 2);
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    const next = points[(i + 1) % points.length];
    shape.quadraticCurveTo(point[0], point[1], (point[0] + next[0]) / 2, (point[1] + next[1]) / 2);
  }
  shape.closePath();
  return shape;
}

function Sculpture({ orientation }: { orientation: RefObject<AboutBrandOrientation> }) {
  const group = useRef<THREE.Group>(null);
  const geometry = useMemo(
    () => logoPaths.map(({ points }) => new THREE.ExtrudeGeometry(outline(points), {
      depth: 0.38,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.045,
      bevelSize: 0.045,
      bevelSegments: 4,
      curveSegments: 8,
    })),
    [],
  );
  const material = useMemo(
    () => logoPaths.map(({ amber }) => new THREE.MeshPhysicalMaterial({
      color: amber ? "#F2A900" : "#F8FAFC",
      metalness: 0.11,
      roughness: 0.31,
      clearcoat: 0.4,
      clearcoatRoughness: 0.22,
      emissive: amber ? "#F2A900" : "#223A51",
      emissiveIntensity: amber ? 0.15 : 0.025,
    })),
    [],
  );

  useEffect(() => () => {
    geometry.forEach(g => g.dispose());
    material.forEach(m => m.dispose());
  }, [geometry, material]);

  useFrame(({ clock }, delta) => {
    const node = group.current;
    const motion = orientation.current;
    if (!node || !motion) return;
    const idle = motion.dragging || motion.reduceMotion ? 0 : Math.sin(clock.elapsedTime * 0.5) * 0.15;
    const float = motion.reduceMotion ? 0 : Math.sin(clock.elapsedTime * 0.8) * 0.07;
    node.rotation.x = THREE.MathUtils.damp(node.rotation.x, motion.x, 5.5, delta);
    node.rotation.y = THREE.MathUtils.damp(node.rotation.y, motion.y + idle, 5.5, delta);
    node.rotation.z = THREE.MathUtils.damp(node.rotation.z, 0, 5.5, delta);
    node.position.y = THREE.MathUtils.damp(node.position.y, float, 4.0, delta);
  });

  return (
    <>
      <ambientLight intensity={1.45} />
      <hemisphereLight args={["#ffffff", "#314A63", 1.3]} />
      <directionalLight position={[2.8, 5.0, 6]} intensity={2.4} color="#FFFFFF" />
      <directionalLight position={[-4, -2, -1]} intensity={1.8} color="#A9C3DD" />
      <pointLight position={[0.8, -1.7, 4]} color="#F2A900" intensity={3} distance={10} />
      <group ref={group}>
        {logoPaths.map((part, index) => (
          <mesh key={index} geometry={geometry[index]} material={material[index]} />
        ))}
      </group>
    </>
  );
}

export default function AboutBrandCanvas({ orientation }: { orientation: RefObject<AboutBrandOrientation> }) {
  return (
    <div className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 9.4], fov: 34, near: 0.1, far: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        fallback={<Image src={brandIcon} alt="" unoptimized className="h-[80%] w-[80%] object-contain" />}
        style={{ pointerEvents: "none", background: "transparent" }}
      >
        <Sculpture orientation={orientation} />
      </Canvas>
    </div>
  );
}
