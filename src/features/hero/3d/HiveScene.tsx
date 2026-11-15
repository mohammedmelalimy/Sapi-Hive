'use client';

import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';

function GlassPieces() {
  const positions = useMemo(
    () => [
      [-1.6, 0.65, -0.3],
      [0, 1.3, -0.5],
      [1.6, 0.65, -0.3],
      [-0.8, -0.7, 0.3],
      [0.8, -0.7, 0.3]
    ],
    []
  );

  const geometry = useMemo(() => new THREE.CylinderGeometry(0.9, 0.9, 0.23, 6), []);

  return (
    <group rotation={[0.12, -0.2, Math.PI / 6]}>
      {positions.map((position, index) => (
        <mesh
          key={index}
          position={position as [number, number, number]}
          geometry={geometry}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshPhysicalMaterial
            color="#A8B4C0"
            metalness={0.05}
            roughness={0.15}
            transmission={0.8}
            thickness={0.8}
            ior={1.45}
            transparent
            opacity={0.85}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

export function HiveScene() {
  return (
    <div aria-hidden="true" className="h-full w-full">
      <Canvas
        dpr={[1, 1.5]}
        camera={{
          position: [0, 0, 9],
          fov: 38
        }}
        gl={{
          alpha: true,
          antialias: true
        }}
      >
        <ambientLight intensity={1.5} />

        <directionalLight position={[3, 5, 5]} intensity={2.2} color="#E8EDF2" />

        <directionalLight position={[-4, -2, 3]} intensity={1.2} color="#8192A6" />

        <pointLight position={[-2, -1, 3]} color="#C69A53" intensity={4} distance={12} />

        <Float speed={1} rotationIntensity={0.08} floatIntensity={0.15}>
          <GlassPieces />
        </Float>
      </Canvas>
    </div>
  );
}
