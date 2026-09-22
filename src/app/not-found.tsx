import type { Metadata } from "next";
import Link from "next/link";
import NotFoundScene from "@/components/NotFoundScene";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-svh items-center overflow-hidden px-5 md:px-8" role="alert" aria-label="Page introuvable">
      <div className="absolute inset-0 opacity-70">
        <NotFoundScene />
      </div>
      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-7xl">
        <p className="text-xs uppercase tracking-[0.3em] text-jade">
          Erreur 404 — Hors des sentiers
        </p>
        <h1 className="text-display mt-6 text-[16vw] leading-[0.85] md:text-[10vw]">
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
