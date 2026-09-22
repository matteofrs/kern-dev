import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import HeroCanvas from "@/components/HeroCanvas";
import Marquee from "@/components/Marquee";
import MagneticButton from "@/components/signature/MagneticButton";
import ScrollRead from "@/components/signature/ScrollRead";
import { ScrollProgressLine } from "@/components/signature/SplitWords";
import HeroScrollTitle from "@/components/HeroScrollTitle";
import { SERVICES, PROJECTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "kern dev — Studio de développement web",
};

export default function Home() {
  return (
    <>
      {/* ——— HERO — signature 3 : scroll-telling split-text ——— */}
      <section
        id="hero"
        data-index="Ouverture"
        className="relative flex min-h-svh items-end overflow-hidden pb-16 pt-28"
      >
        <div className="absolute inset-0">
          <HeroCanvas />
        </div>
        <ScrollProgressLine />
        <HeroScrollTitle />
      </section>

      <Marquee />

      {/* ——— MANIFESTO — signature 7 : le site lit le texte au scroll ——— */}
      <section
        id="manifesto"
        data-index="Manifeste"
        className="mx-auto max-w-7xl px-5 py-28 md:px-8"
      >
        <p className="mb-10 text-xs uppercase tracking-[0.3em] text-jade">
          01 — Manifeste
        </p>
        <ScrollRead
          className="text-display max-w-5xl text-4xl leading-tight md:text-6xl"
          text="Nous fabriquons des sites que les gens retiennent — pas des pages qu'ils oublient en dix secondes. Chaque pixel est une décision, chaque interaction une intention."
        />
        <p className="mt-10 max-w-md border-l-2 border-ember pl-5 text-sm leading-relaxed text-bone-dim">
          Zéro template, zéro thème acheté. Le code est écrit à la main, comme
          une lettre — avec des marges, un rythme, et une signature.
        </p>
      </section>

      {/* ——— EXPERTISES ——— */}
      <section
        id="expertises"
        data-index="Expertises"
        aria-labelledby="expertises"
        className="mx-auto max-w-7xl px-5 pb-28 md:px-8"
      >
        <Reveal>
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-jade">
            02 — Expertises
          </p>
          <h2 id="expertises" className="text-display mb-14 max-w-2xl text-4xl leading-tight md:text-5xl">
            Trois expertises, <span className="text-ember">une seule</span> exigence
          </h2>
        </Reveal>
        <ul className="border-y border-bone/15">
          {SERVICES.map((s, i) => (
            <li key={s.slug} className="border-b border-bone/15 last:border-b-0">
              <Reveal delay={i * 0.08}>
                <Link
                  href={`/services#${s.slug}`}
                  className="group grid items-baseline gap-4 py-8 transition-colors hover:bg-ink-soft md:grid-cols-[5rem_1fr_auto] md:gap-8 md:px-6"
                >
                  <span className="text-display text-4xl text-bone/20 transition-colors group-hover:text-ember md:text-5xl">
                    {s.index}
                  </span>
                  <span>
                    <span className="text-display block text-3xl transition-colors group-hover:text-ember md:text-5xl">
                      {s.title}
                    </span>
                    <span className="mt-3 block max-w-xl text-sm leading-relaxed text-bone-dim">
                      {s.short}
                    </span>
                  </span>
                  <span className="text-xs uppercase tracking-widest text-jade">
                    {s.price}
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* ——— PREUVE SOCIALE — blocks nets, asymétriques ——— */}
      <section
        id="preuve"
        data-index="Preuves"
        aria-labelledby="preuve"
        className="border-y border-bone/15 bg-ink-soft py-28"
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-jade">
              03 — Preuves
            </p>
            <h2 id="preuve" className="text-display mb-14 text-4xl leading-tight md:text-5xl">
              Résultats <span className="text-jade">mesurés</span>
            </h2>
          </Reveal>
          <div className="grid gap-px border border-bone/15 bg-bone/15 md:grid-cols-3">
            {PROJECTS.slice(0, 3).map((p, i) => (
              <Reveal
                key={p.slug}
                delay={i * 0.1}
                className={`bg-ink p-10 ${i === 1 ? "md:translate-y-8" : ""}`}
              >
                <p className="text-display text-2xl text-bone">{p.title}</p>
                <p className="mt-2 text-sm text-bone-dim">{p.client}</p>
                <p className="mt-6 text-lg font-semibold text-jade">{p.result}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <blockquote className="mx-auto mt-24 max-w-3xl border-l-2 border-ember pl-6 text-left md:pl-10">
              <p className="text-display text-2xl leading-snug md:text-3xl">
                « Ils ont livré un site que nos concurrents essayent encore de
                copier. Les demandes de devis ont triplé en deux mois. »
              </p>
              <footer className="mt-6 text-sm uppercase tracking-[0.2em] text-bone-dim">
                Claire Morel — Atrium Avocats
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ——— CTA DEVIS — signature 6 : bouton magnétique ——— */}
      <section
        id="contact-cta"
        data-index="Contact"
        className="mx-auto max-w-7xl px-5 py-28 md:px-8"
      >
        <div className="grid items-end gap-10 md:grid-cols-[1fr_auto]">
          <Reveal>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-jade">
              04 — Pour commencer
            </p>
            <h2 className="text-display text-[11vw] leading-[0.9] md:text-7xl">
              Un projet en tête ?
            </h2>
            <p className="mt-6 max-w-md text-bone-dim">
              Racontez-le-nous en trois minutes. Réponse sous 48 h ouvrées,
              devis détaillé sous une semaine.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <MagneticButton href="/contact">
              Lancer un devis <span aria-hidden="true">→</span>
            </MagneticButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}

