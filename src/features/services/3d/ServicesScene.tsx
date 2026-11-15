"use client";

import { Canvas, ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export type Service3D = { slug: string; name: string; description: string; short: string };

type Props = {
  services: Service3D[];
  selected: number | null;
  hovered: number | null;
  onSelect: (index: number | null) => void;
  onHover: (index: number | null) => void;
  reducedMotion: boolean;
};

// A five-piece spatial showroom rather than a second copy of the Hero hive.
const PLACES: [number, number, number][] = [
  [-2.65, 1.15, -0.65], [0, 1.55, -0.9], [2.65, 1.15, -0.65],
  [-1.38, -1.35, 0.15], [1.38, -1.35, 0.15],
];
const TONES = ["#B6D5E7", "#C69A53", "#9CB6D2", "#A8C9CF", "#D5BB91"];

function makeTileGeometry() {
  // Six-sided, beveled service medallion with a solid face; unlike the old hollow rings.
  const shape = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const a = Math.PI / 6 + i * Math.PI / 3;
    const x = Math.cos(a) * 0.95;
    const y = Math.sin(a) * 0.95;
    i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y);
  }
  shape.closePath();
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.2, bevelEnabled: true, bevelThickness: 0.08,
    bevelSize: 0.06, bevelSegments: 4, curveSegments: 1,
  });
  geometry.center();
  return geometry;
}

function Tile({ index, selected, hovered, onSelect, onHover, reducedMotion }: {
  index: number; selected: number | null; hovered: number | null;
  onSelect: Props["onSelect"]; onHover: Props["onHover"]; reducedMotion: boolean;
}) {
  const moving = useRef<THREE.Group>(null);
  const geometry = useMemo(makeTileGeometry, []);
  const active = selected === index;
  const hot = hovered === index;
  const chosen = active || hot;
  useFrame(({ clock }, dt) => {
    const g = moving.current;
    if (!g) return;
    const k = reducedMotion ? 1 : 1 - Math.exp(-dt * 7);
    const float = reducedMotion ? 0 : Math.sin(clock.elapsedTime * 0.75 + index * 1.4) * 0.055;
    g.position.z = THREE.MathUtils.lerp(g.position.z, active ? 1.3 : hot ? 0.58 : 0, k);
    g.position.y = THREE.MathUtils.lerp(g.position.y, float + (chosen ? 0.1 : 0), k);
    const target = active ? 1.18 : hot ? 1.09 : 1;
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, target, k));
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, active ? -0.15 : hot ? -0.07 : 0, k);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, active ? 0.13 : 0, k);
  });
  const pick = (e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); onSelect(active ? null : index); };
  return (
    <group position={PLACES[index]}>
      <group ref={moving}>
        <mesh geometry={geometry} onClick={pick}
          onPointerOver={e => { e.stopPropagation(); onHover(index); }}
          onPointerOut={e => { e.stopPropagation(); onHover(null); }}>
          <meshPhysicalMaterial color={chosen ? "#D5B57E" : TONES[index]}
            metalness={0.38} roughness={0.25} clearcoat={1} clearcoatRoughness={0.1}
            emissive={chosen ? "#9B7132" : "#162B41"}
            emissiveIntensity={active ? 0.26 : hot ? 0.18 : 0.07} />
        </mesh>
        {/* Inset panel gives each object genuine depth without creating a separate HTML root. */}
        <mesh position={[0, 0, 0.19]} onClick={pick}>
          <circleGeometry args={[0.59, 6]} />
          <meshPhysicalMaterial color="#183248" metalness={0.22} roughness={0.35}
            side={THREE.DoubleSide} />
        </mesh>
        {/* Three native 3D details instead of pixelated HTML labels on the object. */}
        <group position={[0, 0, 0.211]}>
          <mesh rotation={[0, 0, index * 0.55]}>
            <torusGeometry args={[0.31, 0.022, 8, 36]} />
            <meshBasicMaterial color={chosen ? "#F5D99F" : "#C0D7E6"} />
          </mesh>
          <mesh position={[0, 0, 0.012]}>
            <octahedronGeometry args={[0.145, 0]} />
            <meshStandardMaterial color={TONES[index]} metalness={0.7} roughness={0.2}/>
          </mesh>
        </group>
      </group>
    </group>
  );
}

function CameraRig({ selected, reducedMotion }: { selected: number | null; reducedMotion: boolean }) {
  const { camera, size } = useThree();
  const look = useRef(new THREE.Vector3());
  useFrame((_, dt) => {
    const mobile = size.width < 650;
    const p = selected === null ? null : PLACES[selected];
    const goal = p
      ? new THREE.Vector3(p[0] * (mobile ? 0.22 : 0.65), p[1] * (mobile ? 0.18 : 0.6), mobile ? 12.2 : 7.6)
      : new THREE.Vector3(0, 0, mobile ? 16 : 10.8);
    const target = p ? new THREE.Vector3(p[0] * 0.3, p[1] * 0.3, 0) : new THREE.Vector3();
    const k = reducedMotion ? 1 : 1 - Math.exp(-dt * 3.6);
    camera.position.lerp(goal, k);
    look.current.lerp(target, k);
    camera.lookAt(look.current);
  });
  return null;
}

function Stage(props: Props) {
  return <>
    <ambientLight intensity={1.5} />
    <directionalLight position={[3, 6, 8]} intensity={2.6} color="#DFEFFF" />
    <pointLight position={[-4, -1, 5]} intensity={25} distance={14} color="#C69A53" />
    {props.services.slice(0, 5).map((s, i) =>
      <Tile key={s.slug} index={i} selected={props.selected} hovered={props.hovered}
        onSelect={props.onSelect} onHover={props.onHover} reducedMotion={props.reducedMotion}/>
    )}
    <CameraRig selected={props.selected} reducedMotion={props.reducedMotion}/>
  </>;
}

export default function ServicesScene(props: Props) {
  return <Canvas className="!absolute !inset-0"
    dpr={[1, 1.7]} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
    camera={{ position: [0, 0, 10.8], fov: 43 }}
    onPointerMissed={() => props.onSelect(null)} style={{ background: "transparent" }}>
    <Stage {...props}/>
  </Canvas>;
}
