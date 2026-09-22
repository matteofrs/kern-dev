"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/lib/data";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const CATEGORIES = ["Tous", "Vitrine", "SaaS", "IA"] as const;

/** Vignette projet : illustration CSS/SVG stylisée générée localement à partir de la palette. */
function Artwork({ p }: { p: Project }) {
  const [a, b] = p.palette;
  return (
    <div
      className="relative h-60 w-full overflow-hidden md:h-72"
      role="img"
      aria-label={`Illustration stylisée du projet ${p.title}`}
    >
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`g-${p.slug}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={b} />
            <stop offset="100%" stopColor="#0e0c09" />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill={`url(#g-${p.slug})`} />
        <circle cx="290" cy="110" r="90" fill={a} opacity="0.85" />
        <circle cx="290" cy="110" r="55" fill="#0e0c09" opacity="0.9" />
        <path
          d="M0 240 L400 190 L400 300 L0 300 Z"
          fill={a}
          opacity="0.25"
        />
        {[...Array(7)].map((_, i) => (
          <rect
            key={i}
            x={30 + i * 22}
            y={200 - i * 14}
            width="6"
            height={i * 14 + 12}
            fill={a}
            opacity="0.75"
          />
        ))}
      </svg>
      <span className="absolute right-4 top-4 bg-ink/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-bone">
        {p.category}
      </span>
    </div>
  );
}

export default function ProjectGallery({ projects }: { projects: Project[] }) {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("Tous");
  const reduced = useReducedMotion();
  const filtered =
    cat === "Tous" ? projects : projects.filter((p) => p.category === cat);

  return (
    <>
      {/* Filtres */}
      <div role="group" aria-label="Filtrer par catégorie" className="mt-12 flex flex-wrap gap-3">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            aria-pressed={cat === c}
            className={`rounded-full border px-5 py-2 text-sm font-semibold uppercase tracking-widest transition-all ${
              cat === c
                ? "border-ember bg-ember text-ink"
                : "border-bone/20 text-bone-dim hover:border-bone/50 hover:text-bone"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Signature 9 — grille asymétrique brutalement découpée, coins nets */}
      <motion.ul layout className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-12">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, idx) => {
            // rythme asymétrique : spans alternés 7/5, offsets verticaux
            const wide = idx % 2 === 0;
            const span = wide ? "md:col-span-7" : "md:col-span-5";
            const offset =
              idx % 2 === 1 ? "md:translate-y-10" : idx % 4 === 2 ? "md:-translate-y-4" : "";
            return (
              <motion.li
                key={p.slug}
                layout={!reduced}
                initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 24 }}
                animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                data-cursor-label="Voir →"
                className={`group overflow-hidden border border-bone/15 bg-ink-soft transition-colors hover:border-ember hover:bg-ink ${span} ${offset}`}
              >
                <div className="transition-transform duration-500 group-hover:scale-[1.02]">
                  <Artwork p={p} />
                </div>
                <div className="flex items-start justify-between gap-4 border-t border-bone/10 p-6">
                  <div>
                    <h2 className="text-display text-2xl">{p.title}</h2>
                    <p className="mt-1 text-sm text-bone-dim">{p.client}</p>
                  </div>
                  <span className="text-display text-xl text-bone/20 transition-colors group-hover:text-ember">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-bone/10 px-6 py-4">
                  <p className="text-sm font-semibold text-jade">{p.result}</p>
                  <p className="text-xs text-bone-dim">{p.year}</p>
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
