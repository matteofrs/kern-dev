import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/signature/MagneticButton";
import { SERVICES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Sites vitrines d'exception, produits SaaS sur-mesure et automatisations IA — offres détaillées, tarifs indicatifs, parcours clair vers votre devis.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-28 pt-36 md:px-8">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.3em] text-jade">Services</p>
        <h1 className="text-display mt-6 text-6xl leading-[0.95] md:text-8xl">
          Trois façons de vous{" "}
          <span className="text-ember">faire gagner</span>.
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-bone-dim">
          Pas de forfait mystère : chaque offre est détaillée, chiffrée et
          livrée avec un calendrier. Choisissez votre terrain de jeu.
        </p>
      </Reveal>

      <div className="mt-24 space-y-28">
        {SERVICES.map((s, i) => (
          <article key={s.slug} id={s.slug} className="scroll-mt-28">
            <Reveal>
              <div className="grid gap-10 md:grid-cols-[5rem_1fr_19rem]">
                <span
                  aria-hidden="true"
                  className="text-display text-6xl text-bone/15 md:text-8xl"
                >
                  {s.index}
                </span>
                <div>
                  <h2 className="text-display text-4xl md:text-5xl">{s.title}</h2>
                  <p className="mt-6 max-w-2xl leading-relaxed text-bone-dim">
                    {s.long}
                  </p>
                  <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <span aria-hidden="true" className="mt-0.5 text-ember">
                          ✳
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <aside className="h-fit rounded-2xl border border-bone/10 bg-ink-soft p-6">
                  <p className="text-xs uppercase tracking-[0.25em] text-bone-dim">
                    Investissement
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-jade">{s.price}</p>
                  <p className="mt-1 text-sm text-bone-dim">Délai : {s.delay}</p>
                  <Link
                    href={`/contact?type=${encodeURIComponent(s.title)}`}
                    className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-ember px-5 py-3 text-sm font-bold uppercase tracking-widest text-ink transition-transform hover:scale-[1.03] active:scale-95"
                  >
                    Demander un devis
                  </Link>
                </aside>
              </div>
            </Reveal>
            {i < SERVICES.length - 1 && (
              <div aria-hidden="true" className="mt-24 h-px bg-bone/10" />
            )}
          </article>
        ))}
      </div>

      <Reveal className="mt-28 text-center">
        <p className="text-display text-3xl md:text-4xl">
          Hésitant entre deux offres ?
        </p>
        <p className="mx-auto mt-4 max-w-md text-bone-dim">
          Décrivez votre besoin — on vous oriente gratuitement vers la bonne
          approche.
        </p>
        <div className="mt-8 flex justify-center">
          <MagneticButton href="/contact">
            Parler du projet <span aria-hidden="true">→</span>
          </MagneticButton>
        </div>
      </Reveal>
    </div>
  );
}
