"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Mot révélé au chargement (stagger) — jamais dépendant du scroll :
 *  le titre doit être visible dès l'arrivée sur la page. */
function WordIn({
  text,
  delay,
  className = "",
}: {
  text: string;
  delay: number;
  className?: string;
}) {
  return (
    <span className={`inline-block overflow-hidden pb-1 align-bottom ${className}`}>
      <motion.span
        className="inline-block will-change-transform"
        initial={{ y: "110%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.7, delay, ease: EASE }}
      >
        {text}
        {"\u00A0"}
      </motion.span>
    </span>
  );
}

/**
 * Signature 3 — Titre hero.
 * Révélé mot à mot au chargement, se dissipe légèrement quand
 * l'utilisateur scrolle (la caméra plonge dans HeroScene).
 * Reduced-motion : texte statique.
 */
export default function HeroScrollTitle() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Corps visible d'emblée — jamais de contenu invisible au chargement.
  // Le titre se dissipe au scroll ; le corps reste lisible puis s'estompe tard.
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bodyOpacity = useTransform(scrollYProgress, [0.55, 0.8], [1, 0]);

  if (reduced) {
    return (
      <div className="container-site pointer-events-none relative z-10 w-full">
        <p className="kicker mb-6">
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
            className="btn-primary w-fit"
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
      className="container-site pointer-events-none relative z-10 w-full"
    >
      <p className="kicker mb-6">
        Studio web — Lyon, France
      </p>
      <h1 className="text-display text-[13vw] leading-[0.92] md:text-[8.5vw]">
        <span className="block">
          <WordIn text="Le" delay={0.05} />
          <WordIn text="code" className="text-ember" delay={0.12} />
          <WordIn text="précis." delay={0.19} />
        </span>
        <span className="block">
          <WordIn text="Le design qui" delay={0.26} />
          <WordIn text="touche." className="text-jade" delay={0.36} />
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
          className="btn-primary w-fit"
        >
          Demander un devis <span aria-hidden="true">→</span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
