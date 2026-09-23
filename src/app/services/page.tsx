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
    <div className="page-shell">
      <Reveal>
        <p className="kicker mb-0">Services</p>
        <h1 className="h1">
          Trois façons de vous{" "}
          <span className="text-ember">faire gagner</span>.
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-bone-dim">
          Pas de forfait mystère : chaque offre est détaillée, chiffrée et
          livrée avec un calendrier. Choisissez votre terrain de jeu.
        </p>
      </Reveal>

      <div className="section-gap">
        {SERVICES.map((s, i) => (
          <article key={s.slug} id={s.slug} className="scroll-mt-28">
            <Reveal>
              <div className="grid gap-10 md:grid-cols-[5rem_1fr_19rem]">
                <span
                  aria-hidden="true"
                  className="text-display text-5xl text-bone/15 md:text-7xl"
                >
                  {s.index}
                </span>
                <div>
                  <h2 className="h2">{s.title}</h2>
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
                <aside className="panel h-fit p-6">
                  <p className="text-xs uppercase tracking-[0.25em] text-bone-dim">
                    Investissement
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-jade">{s.price}</p>
                  <p className="mt-1 text-sm text-bone-dim">Délai : {s.delay}</p>
                  <Link
                    href={`/contact?type=${encodeURIComponent(s.title)}`}
                    className="btn-primary mt-6 w-full"
                  >
                    Demander un devis
                  </Link>
                </aside>
              </div>
            </Reveal>
            {i < SERVICES.length - 1 && (
              <div aria-hidden="true" className="my-24 h-px bg-bone/15 md:my-32" />
            )}
          </article>
        ))}
      </div>

      <Reveal className="section-gap text-center">
        <p className="h2">
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
