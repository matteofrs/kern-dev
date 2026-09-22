"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Split-text custom : découpe un texte en mots révélés au scroll.
 * Pas de lib externe.
 */
export function SplitWords({
  text,
  progress,
  range,
  className = "",
}: {
  text: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  /** portion [0..1] de la scroll-progress pendant laquelle ce bloc se révèle */
  range: [number, number];
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <WordReveal
          key={`${w}-${i}`}
          word={w}
          index={i}
          total={words.length}
          progress={progress}
          range={range}
        />
      ))}
    </span>
  );
}

function WordReveal({
  word,
  index,
  total,
  progress,
  range,
}: {
  word: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const [r0, r1] = range;
  const start = r0 + ((r1 - r0) * index) / total;
  const end = Math.min(1, start + (r1 - r0) / total + 0.06);
  const y = useTransform(progress, [start, end], ["110%", "0%"]);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  return (
    <span className="inline-block overflow-hidden pb-1 align-bottom">
      <motion.span style={{ y, opacity }} className="inline-block will-change-transform">
        {word}
        {"\u00A0"}
      </motion.span>
    </span>
  );
}

/**
 * Signature 3 — Hero scroll-telling.
 * La caméra de la scène 3D plonge au scroll (géré dans HeroScene via window.scrollY),
 * le titre se révèle mot à mot, et une ligne verticale de progression
 * relie le hero à la section suivante.
 */
export function ScrollProgressLine() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (reduced) return null;

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute left-1/2 top-full h-40 w-px -translate-x-1/2 md:h-56">
      <motion.span
        className="block h-full w-px origin-top bg-gradient-to-b from-ember via-jade to-transparent"
        style={{ scaleY }}
      />
    </div>
  );
}
