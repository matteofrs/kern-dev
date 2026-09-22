"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { SplitWords } from "@/components/signature/SplitWords";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Signature 3 — Titre hero scroll-telling.
 * Le texte se révèle mot à mot quand la section entre, et se dissipe
 * légèrement quand l'utilisateur commence à scroller (camera plonge dans
 * HeroScene). Reduced-motion : texte statique.
 */
export default function HeroScrollTitle() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bodyOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  if (reduced) {
    return (
      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-jade">
          Studio web — Lyon, France
        </p>
        <h1 className="text-display text-[13vw] leading-[0.92] md:text-[8.5vw]">
          Le <span className="text-ember">code</span> précis.
          <br />
          Le design qui <span className="text-jade">touche</span>.
        </h1>
        <div className="pointer-events-auto mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-md text-bone-dim">
            Sites vitrines d'exception, produits SaaS robustes et automatisations
            IA. Zéro template, que du sur-mesure.
          </p>
          <Link
            href="/contact"
            className="inline-flex w-fit items-center gap-3 rounded-full bg-ember px-7 py-4 text-sm font-bold uppercase tracking-widest text-ink transition-transform hover:scale-105 active:scale-95"
          >
            Demander un devis <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{ opacity: titleOpacity }}
      className="pointer-events-none relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8"
    >
      <p className="mb-6 text-xs uppercase tracking-[0.3em] text-jade">
        Studio web — Lyon, France
      </p>
      <h1 className="text-display text-[13vw] leading-[0.92] md:text-[8.5vw]">
        <span className="block">
          <SplitWords text="Le" progress={scrollYProgress} range={[0, 0.05]} />
          <SplitWords
            text="code"
            className="text-ember"
            progress={scrollYProgress}
            range={[0.03, 0.1]}
          />
          <SplitWords text="précis." progress={scrollYProgress} range={[0.08, 0.16]} />
        </span>
        <span className="block">
          <SplitWords text="Le design qui" progress={scrollYProgress} range={[0.14, 0.28]} />
          <SplitWords
            text="touche."
            className="text-jade"
            progress={scrollYProgress}
            range={[0.26, 0.38]}
          />
        </span>
      </h1>
      <motion.div
        style={{ opacity: bodyOpacity }}
        className="pointer-events-auto mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
      >
        <p className="max-w-md text-bone-dim">
          Sites vitrines d'exception, produits SaaS robustes et automatisations
          IA. Zéro template, que du sur-mesure.
        </p>
        <Link
          href="/contact"
          className="inline-flex w-fit items-center gap-3 rounded-full bg-ember px-7 py-4 text-sm font-bold uppercase tracking-widest text-ink transition-transform hover:scale-105 active:scale-95"
        >
          Demander un devis <span aria-hidden="true">→</span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
