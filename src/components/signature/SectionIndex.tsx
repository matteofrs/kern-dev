"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type Section = { id: string; label: string };

/**
 * Signature 5 — Navigation index latérale.
 * Timeline verticale des sections (dots + labels au hover), desktop uniquement.
 * Lit les éléments [data-index] de la page ; IntersectionObserver pour l'état actif.
 * Recollecte à chaque navigation (pathname) et via MutationObserver —
 * sinon la timeline pointerait des sections de la page précédente.
 */
export default function SectionIndex() {
  const pathname = usePathname();
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
    // Recollecte si le DOM change (contenu dynamique monté après coup)
    const mo = new MutationObserver(collect);
    mo.observe(document.getElementById("contenu") ?? document.body, {
      childList: true,
      subtree: true,
    });
    return () => mo.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (sections.length === 0) return;
    // Filtre les cibles réellement présentes — jamais de dot pointant
    // vers une section inexistante.
    const existing = sections.filter((s) => document.getElementById(s.id));
    if (existing.length === 0) return;
    observer.current?.disconnect();
    observer.current = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveId(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    existing.forEach((s) => {
      observer.current?.observe(document.getElementById(s.id)!);
    });
    return () => observer.current?.disconnect();
  }, [sections]);

  const visible = sections.filter(
    (s, i, arr) => arr.findIndex((x) => x.id === s.id) === i
  );
  if (visible.length < 2) return null;

  return (
    <nav
      aria-label="Sommaire de la page"
      className="group fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex"
    >
      {visible.map((s) => {
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
