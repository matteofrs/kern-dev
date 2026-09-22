"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTouchOrReduced } from "@/hooks/useTouch";

/**
 * Signature 4 — Curseur custom double.
 * Point braise + anneau retardé qui grossit sur les liens et se transforme
 * en « Voir → » sur les éléments marqués [data-cursor-label] (cartes projets).
 * Désactivé sur tactile et si reduced-motion.
 */
export default function CustomCursor() {
  const disabled = useTouchOrReduced();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // centre le point/anneau sur la position du curseur
  const dotX = useTransform(x, (v) => v - 4);
  const dotY = useTransform(y, (v) => v - 4);
  const ringSpringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ringSpringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);

  const ringSize = label ? 64 : active ? 40 : 24;
  const ringX = useTransform(ringSpringX, (v) => v - ringSize / 2);
  const ringY = useTransform(ringSpringY, (v) => v - ringSize / 2);

  useEffect(() => {
    if (disabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const voir = t.closest<HTMLElement>("[data-cursor-label]");
      if (voir) {
        setLabel(voir.dataset.cursorLabel ?? "Voir →");
        setActive(false);
        return;
      }
      setLabel(null);
      setActive(!!t.closest("a, button, [role='button']"));
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [disabled, x, y]);

  if (disabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[95] h-2 w-2 rounded-full bg-ember"
        style={{ x: dotX, y: dotY }}
      />
      <motion.div
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[95] flex items-center justify-center rounded-full border ${
          label
            ? "border-ember bg-ink/90 backdrop-blur-sm"
            : active
              ? "border-ember/70"
              : "border-bone/40"
        }`}
        style={{ x: ringX, y: ringY, width: ringSize, height: ringSize }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        {label && (
          <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-widest text-ember">
            {label}
          </span>
        )}
      </motion.div>
    </>
  );
}
