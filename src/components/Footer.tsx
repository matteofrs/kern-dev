import Link from "next/link";
import { SITE } from "@/lib/data";
import WordmarkFooter from "@/components/signature/WordmarkFooter";

const LIENS = [
  { href: "/services", label: "Services" },
  { href: "/projets", label: "Projets" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-bone/15">
      {/* Signature 10 — wordmark monumental, se remplit au scroll */}
      <WordmarkFooter />
      <div className="container-site pb-16 pt-6">
        <div className="grid gap-12 border-t border-bone/15 pt-12 md:grid-cols-3">
          <div>
            <p className="text-display text-4xl">
              kern<span className="text-ember">*</span>dev
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-bone-dim">
              {SITE.tagline} — la précision du code, l'exigence du design.{" "}
              {SITE.city}.
            </p>
          </div>
          <nav aria-label="Liens de pied de page">
            <p className="text-xs uppercase tracking-[0.25em] text-bone-dim">
              Plan
            </p>
            <ul className="mt-4 space-y-3">
              {LIENS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline text-bone">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-bone-dim">
              Contact
            </p>
            <ul className="mt-4 space-y-3 text-bone">
              <li>
                <a href={`mailto:${SITE.email}`} className="link-underline">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone.replaceAll(" ", "")}`}
                  className="link-underline"
                >
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-bone-dim">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-jade opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-jade" />
                </span>
                Disponible — prochain créneau : novembre 2026
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-bone/10 pt-8 text-xs text-bone-dim md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} kern dev. Fabriqué à la main, sans template.</p>
          <p>Encre &amp; braise — Lyon, France</p>
        </div>
      </div>
    </footer>
  );
}
