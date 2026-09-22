import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import HeroCanvas from "@/components/HeroCanvas";
import Marquee from "@/components/Marquee";
import { SERVICES, PROJECTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "kern dev — Studio de développement web",
};

export default function Home() {
  return (
    <>
      {/* ——— HERO ——— */}
      <section className="relative flex min-h-svh items-end overflow-hidden pb-16 pt-28">
        <div className="absolute inset-0">
          <HeroCanvas />
        </div>
        <div className="pointer-events-none relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8">
          <Reveal>
            <p className="mb-6 text-xs uppercase tracking-[0.3em] text-jade">
              Studio web — Lyon, France
            </p>
          </Reveal>
          <h1 className="text-display pointer-events-auto text-[13vw] leading-[0.92] md:text-[8.5vw]">
            <Reveal delay={0.1}>
              <span className="block">
                Le <em className="not-italic text-ember">code</em> précis.
              </span>
            </Reveal>
            <Reveal delay={0.22}>
              <span className="block">
                Le design qui <em className="not-italic text-jade">touche</em>.
              </span>
            </Reveal>
          </h1>
          <Reveal delay={0.35}>
            <div className="pointer-events-auto mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <p className="max-w-md text-bone-dim">
                Sites vitrines d'exception, produits SaaS robustes et
                automatisations IA. Zéro template, que du sur-mesure.
              </p>
              <Link
                href="/contact"
                className="group inline-flex w-fit items-center gap-3 rounded-full bg-ember px-7 py-4 text-sm font-bold uppercase tracking-widest text-ink transition-transform hover:scale-105 active:scale-95"
              >
                Demander un devis
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee />

      {/* ——— MANIFESTE COURT ——— */}
      <section className="mx-auto max-w-7xl px-5 py-28 md:px-8">
        <Reveal>
          <h2 className="text-display max-w-4xl text-4xl leading-tight md:text-6xl">
            Nous fabriquons des sites que les gens{" "}
            <span className="text-ember">retiennent</span> — pas des pages qu'ils
            oublient en dix secondes.
          </h2>
        </Reveal>
      </section>

      {/* ——— EXPERTISES ——— */}
      <section aria-labelledby="expertises" className="mx-auto max-w-7xl px-5 pb-28 md:px-8">
        <Reveal>
          <h2 id="expertises" className="mb-14 text-xs uppercase tracking-[0.25em] text-bone-dim">
            Trois expertises, une seule exigence
          </h2>
        </Reveal>
        <ul className="divide-y divide-bone/10 border-y border-bone/10">
          {SERVICES.map((s, i) => (
            <li key={s.slug}>
              <Reveal delay={i * 0.08}>
                <Link
                  href={`/services#${s.slug}`}
                  className="group grid items-baseline gap-4 py-8 transition-colors hover:bg-ink-soft md:grid-cols-[4rem_1fr_auto] md:gap-8 md:px-6"
                >
                  <span className="text-sm text-bone-dim">{s.index}</span>
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

      {/* ——— PREUVE SOCIALE ——— */}
      <section aria-labelledby="preuve" className="border-y border-bone/10 bg-ink-soft py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <h2 id="preuve" className="mb-14 text-xs uppercase tracking-[0.25em] text-bone-dim">
              Résultats mesurés
            </h2>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-2xl bg-bone/10 md:grid-cols-3">
            {PROJECTS.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.1} className="bg-ink p-10">
                <p className="text-display text-2xl text-bone">{p.title}</p>
                <p className="mt-2 text-sm text-bone-dim">{p.client}</p>
                <p className="mt-6 text-lg font-semibold text-jade">{p.result}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <blockquote className="mx-auto mt-20 max-w-3xl text-center">
              <p className="text-display text-2xl leading-snug md:text-3xl">
                « Ils ont livré un site que nos concurrents essayent encore de
                copier. Les demandes de devis ont triplé en deux mois. »
              </p>
              <footer className="mt-6 text-sm text-bone-dim">
                — Claire Morel, Atrium Avocats
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ——— CTA DEVIS ——— */}
      <section className="mx-auto max-w-7xl px-5 py-28 text-center md:px-8">
        <Reveal>
          <h2 className="text-display text-[11vw] leading-none md:text-7xl">
            Un projet en tête ?
          </h2>
          <p className="mx-auto mt-6 max-w-md text-bone-dim">
            Racontez-le-nous en trois minutes. Réponse sous 48 h ouvrées, devis
            détaillé sous une semaine.
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-3 rounded-full border border-jade px-8 py-4 text-sm font-bold uppercase tracking-widest text-jade transition-all hover:bg-jade hover:text-ink"
          >
            Lancer un devis →
          </Link>
        </Reveal>
      </section>
    </>
  );
}
