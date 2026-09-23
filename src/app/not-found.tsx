import type { Metadata } from "next";
import Link from "next/link";
import NotFoundScene from "@/components/NotFoundScene";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-svh items-center overflow-hidden" role="alert" aria-label="Page introuvable">
      <div className="absolute inset-0 opacity-70">
        <NotFoundScene />
      </div>
      <div className="container-site pointer-events-none relative z-10 w-full">
        <p className="kicker mb-0">
          Erreur 404 — Hors des sentiers
        </p>
        <h1 className="h1 text-6xl leading-[0.95] md:text-8xl">
          Le tore s'est{" "}
          <span className="text-ember">dénoué</span>.
        </h1>
        <p className="mt-8 max-w-md text-bone-dim">
          Cette page n'a jamais existé, ou elle a glissé dans le nœud. Nos
          quatre bureaux restent accessibles ci-dessous.
        </p>
        <nav aria-label="Retour au site" className="pointer-events-auto mt-10">
          <ul className="flex flex-wrap gap-x-10 gap-y-4">
            {[
              { href: "/", label: "Accueil" },
              { href: "/projets", label: "Projets" },
              { href: "/services", label: "Services" },
              { href: "/contact", label: "Contact" },
            ].map((l, i) => (
              <li key={l.href} className="flex items-baseline gap-3">
                <span className="text-[11px] text-bone-dim">
                  0{i + 1}
                </span>
                <Link
                  href={l.href}
                  className="link-underline text-sm font-semibold uppercase tracking-[0.18em] text-bone"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
