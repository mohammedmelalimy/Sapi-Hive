"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent, type KeyboardEvent } from "react";
import brandIcon from "@/features/hero/assets/sapihive-brand-icon.png";
import type { AboutBrandOrientation } from "./AboutBrandCanvas";

const AboutBrandCanvas = dynamic(() => import("./AboutBrandCanvas"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center" aria-hidden="true">
      <Image src={brandIcon} alt="" priority unoptimized className="h-[80%] w-[80%] object-contain" />
    </div>
  ),
});

export default function AboutBrand3D({ isArabic }: { isArabic: boolean }) {
  // Keep the gesture state outside React renders: Three.js reads these values each frame.
  const orientation = useRef<AboutBrandOrientation>({ x: -0.12, y: 0.24, dragging: false, reduceMotion: false });
  const pointer = useRef<{ id: number; x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { orientation.current.reduceMotion = media.matches; };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    pointer.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
    orientation.current.dragging = true;
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const last = pointer.current;
    if (!last || last.id !== event.pointerId) return;
    const deltaX = event.clientX - last.x;
    const deltaY = event.clientY - last.y;
    orientation.current.y += deltaX * 0.009;
    orientation.current.x = Math.max(-0.68, Math.min(0.68, orientation.current.x - deltaY * 0.006));
    pointer.current = { id: last.id, x: event.clientX, y: event.clientY };
  };

  const stopDrag = () => {
    pointer.current = null;
    orientation.current.dragging = false;
    setDragging(false);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") orientation.current.y -= 0.22;
    else if (event.key === "ArrowRight") orientation.current.y += 0.22;
    else if (event.key === "ArrowUp") orientation.current.x = Math.min(0.68, orientation.current.x + 0.17);
    else if (event.key === "ArrowDown") orientation.current.x = Math.max(-0.68, orientation.current.x - 0.17);
    else return;
    event.preventDefault();
  };

  return (
    <div
      role="group"
      tabIndex={0}
      aria-label={isArabic ? "مجسم أيقونة SapiHive ثلاثي الأبعاد. اسحب لتدويره أو استخدم مفاتيح الأسهم." : "Interactive three-dimensional SapiHive logo. Drag to rotate or use arrow keys."}
      title={isArabic ? "اسحب لتدوير الأيقونة" : "Drag to rotate the logo"}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDrag}
      onPointerCancel={stopDrag}
      onLostPointerCapture={stopDrag}
      onKeyDown={onKeyDown}
      className={`relative aspect-square w-full select-none rounded-[36px] outline-none focus-visible:ring-2 focus-visible:ring-[#F2A900] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0F1B2D] ${dragging ? "cursor-grabbing" : "cursor-grab"} [touch-action:pan-y]`}
    >
      <AboutBrandCanvas orientation={orientation} />
    </div>
  );
}
