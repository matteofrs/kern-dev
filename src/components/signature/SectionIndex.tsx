"use client";

import { useEffect, useRef, useState } from "react";

type Section = { id: string; label: string };

/**
 * Signature 5 — Navigation index latérale.
 * Timeline verticale des sections (dots + labels au hover), desktop uniquement.
 * Lit les éléments [data-index] de la page ; IntersectionObserver pour l'état actif.
 */
export default function SectionIndex() {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const collect = () => {
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-index]"));
      setSections(
        els.map((el) => ({ id: el.id, label: el.dataset.index ?? el.id }))
      );
    };
    collect();
    // Laisser le temps au contenu dynamique (Reveal etc.) de se monter
    const t = setTimeout(collect, 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (sections.length === 0) return;
    observer.current?.disconnect();
    observer.current = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveId(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.current?.observe(el);
    });
    return () => observer.current?.disconnect();
  }, [sections]);

  if (sections.length < 2) return null;

  return (
    <nav
      aria-label="Sommaire de la page"
      className="group fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex"
    >
      {sections.map((s) => {
        const active = s.id === activeId;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group/item flex items-center gap-3"
          >
            <span
              className={`text-[10px] uppercase tracking-[0.2em] transition-opacity duration-200 ${
                active
                  ? "text-ember opacity-100"
                  : "text-bone-dim opacity-0 group-hover/item:opacity-100"
              }`}
            >
              {s.label}
            </span>
            <span
              aria-hidden="true"
              className={`block rounded-full transition-all duration-300 ${
                active ? "h-2 w-2 bg-ember" : "h-1.5 w-1.5 bg-bone/30 group-hover:bg-bone/60"
              }`}
            />
          </a>
        );
      })}
      <span
        aria-hidden="true"
        className="absolute right-[2.5px] top-2 -z-10 h-[calc(100%-1rem)] w-px bg-bone/10"
      />
    </nav>
  );
}
