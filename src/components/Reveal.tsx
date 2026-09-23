"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "article" | "span" | "h2";
};

/** Révélation au scroll — cohérente sur tout le site, respecte prefers-reduced-motion. */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 14,
}: Props) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      // whileInView (et non animate+useInView) : framer-motion reteste la
      // visibilité après hydratation/layout shift — aucune cible ne peut
      // rester bloquée à opacity:0 si l'observer rate le premier passage.
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
