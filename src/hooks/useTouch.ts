"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Détecte un appareil tactile (pas de pointeur fin) ou prefers-reduced-motion.
 * SSR-safe : true par défaut (comportement conservateur sans client-side JS).
 */
export function useTouchOrReduced(): boolean {
  const reduced = useReducedMotion();
  const [coarse, setCoarse] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setCoarse(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setCoarse(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced || coarse;
}
