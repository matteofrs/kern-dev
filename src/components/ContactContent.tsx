"use client";

import { useSearchParams } from "next/navigation";
import Reveal from "@/components/Reveal";
import DevisForm from "@/components/DevisForm";
import { SITE } from "@/lib/data";

export default function ContactContent() {
  const params = useSearchParams();
  const type = params.get("type") ?? undefined;
  const defaultType =
    type && ["Sites vitrines", "Produits SaaS", "Automatisations IA"].includes(type)
      ? type
      : undefined;

  return (
    <div className="mt-16 grid gap-16 lg:grid-cols-[1.4fr_1fr]">
      <Reveal>
        <DevisForm defaultType={defaultType} />
      </Reveal>
      <Reveal delay={0.15}>
        <aside className="space-y-10 lg:sticky lg:top-32">
          <div>
            <h2 className="text-xs uppercase tracking-[0.25em] text-bone-dim">
              Coordonnées
            </h2>
            <ul className="mt-4 space-y-3 text-lg">
              <li>
                <a href={`mailto:${SITE.email}`} className="link-underline text-bone">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone.replaceAll(" ", "")}`}
                  className="link-underline text-bone"
                >
                  {SITE.phone}
                </a>
              </li>
              <li className="text-bone-dim">{SITE.city}</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xs uppercase tracking-[0.25em] text-bone-dim">
              Disponibilités
            </h2>
            <p className="mt-4 flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-jade opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-jade" />
              </span>
              Prochain créneau : <strong>novembre 2026</strong>
            </p>
            <p className="mt-3 text-sm text-bone-dim">
              Réponse garantie sous 48 h ouvrées. Appel découverte de 30 min
              offert, sans engagement.
            </p>
          </div>
          <div className="rounded-2xl border border-bone/10 bg-ink-soft p-6">
            <p className="text-display text-xl">« Réactif, précis, exigeant. »</p>
            <p className="mt-2 text-sm text-bone-dim">
              — chacun de nos clients, à un moment ou un autre
            </p>
          </div>
        </aside>
      </Reveal>
    </div>
  );
}
