"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Wrapper : lazy-load du canvas 3D, repli statique si reduced-motion. */
const HeroScene = dynamic(() => import("@/components/HeroScene"), {
  ssr: false,
  loading: () => <StaticFallback />,
});

function StaticFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 55% 45% at 60% 45%, rgba(255,92,31,0.22), transparent 65%), radial-gradient(ellipse 40% 35% at 30% 70%, rgba(47,224,184,0.12), transparent 60%)",
      }}
    />
  );
}

export default function HeroCanvas() {
  const reduced = useReducedMotion();
  if (reduced) return <StaticFallback />;
  return <HeroScene />;
}
