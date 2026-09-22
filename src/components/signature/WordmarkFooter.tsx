"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Signature 10 — Wordmark monumental « kern*dev » en pied de page.
 * Le texte géant (18vw) se remplit au scroll : contour braise → plein os,
 * via deux couches texte dont la couche pleine est révélée en clip-path.
 * Reduced-motion : texte plein directement lisible.
 */
export default function WordmarkFooter() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end 0.9"],
  });
  // le voile descend du haut vers le bas : le plein se révèle
  const fill = useTransform(scrollYProgress, [0, 1], ["inset(0 0 100% 0)", "inset(0 0 0% 0)"]);
  // légère montée du mot entier
  const y = useTransform(scrollYProgress, [0, 1], ["0.12em", "0em"]);

  if (reduced) {
    return (
      <div className="select-none overflow-hidden px-5 md:px-8" aria-hidden="true">
        <p className="text-display whitespace-nowrap text-[18vw] leading-[0.85] tracking-tight text-bone">
          kern<span className="text-ember">*</span>dev
        </p>
      </div>
    );
  }

  return (
    <div ref={ref} className="select-none overflow-hidden px-5 md:px-8" aria-hidden="true">
      <motion.p
        style={{ y }}
        className="text-display relative whitespace-nowrap text-[18vw] leading-[0.85] tracking-tight"
      >
        {/* couche contour */}
        <span className="text-outline block">kern*dev</span>
        {/* couche pleine révélée au scroll */}
        <motion.span
          style={{ clipPath: fill }}
          className="absolute inset-0 block text-bone"
        >
          kern<span className="text-ember">*</span>dev
        </motion.span>
      </motion.p>
    </div>
  );
}
