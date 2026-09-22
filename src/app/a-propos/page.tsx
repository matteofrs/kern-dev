import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Manifesto, méthode et équipe de kern dev — un studio qui croit que le web mérite mieux que des templates.",
};

const ETAPES = [
  {
    n: "01",
    title: "Écouter",
    text: "Un atelier d'une demi-journée pour comprendre votre métier, vos clients et ce qui vous rend vraiment différent. Pas de brief PDF de trente pages — une vraie conversation.",
  },
  {
    n: "02",
    title: "Dessiner",
    text: "Direction artistique et prototypes interactifs. Vous voyez le résultat avant qu'on écrive la première ligne de code — et on itère ensemble jusqu'à la bonne sensation.",
  },
  {
    n: "03",
    title: "Construire",
    text: "Développement en sprints courts, démo chaque semaine. Vous suivez l'avancement sur un environnement de staging, pas dans un tableur.",
  },
  {
    n: "04",
    title: "Mesurer",
    text: "Après le lancement, on mesure : performance, conversions, comportement. Un mois de réglages inclus, puis un plan clair pour la suite.",
  },
];

const EQUIPE = [
  { name: "Matt Kern", role: "Fondateur & lead dev", note: "Ex-agences, 12 ans de web. Obsédé par les millisecondes et les kerning." },
  { name: "Inès Diallo", role: "Directrice artistique", note: "Typographe reconvertie. Elle refuse les carrousels depuis 2016." },
  { name: "Théo Lambert", role: "Ingénieur IA", note: "Fait travailler les LLM à la chaîne, avec garde-fous et méthode." },
];

export default function AProposPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-28 pt-36 md:px-8">
      {/* Manifesto typographique */}
      <Reveal>
        <p className="text-xs uppercase tracking-[0.3em] text-jade">Manifesto</p>
      </Reveal>
      <div className="mt-10 space-y-6">
        <Reveal delay={0.05}>
          <h1 className="text-display text-[12vw] leading-[0.9] md:text-[7.5vw]">
            Le web mérite <span className="text-ember">mieux</span> que des
            templates.
          </h1>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="text-display max-w-3xl text-2xl leading-snug text-bone-dim md:text-4xl">
            Chaque marque a une voix. Un site générique la rend{" "}
            <span className="text-bone">muette</span>. Nous écrivons le code et
            traçons les formes qui la rendent{" "}
            <span className="text-jade">inoubliable</span>.
          </p>
        </Reveal>
      </div>

      {/* Méthode */}
      <section aria-labelledby="methode" className="mt-32">
        <Reveal>
          <h2 id="methode" className="mb-14 text-xs uppercase tracking-[0.25em] text-bone-dim">
            La méthode, en quatre temps
          </h2>
        </Reveal>
        <ol className="grid gap-px overflow-hidden rounded-2xl bg-bone/10 md:grid-cols-2 lg:grid-cols-4">
          {ETAPES.map((e, i) => (
            <Reveal key={e.n} delay={i * 0.1} className="group bg-ink p-8 transition-colors hover:bg-ink-soft">
              <span className="text-display text-5xl text-bone/15 transition-colors group-hover:text-ember">
                {e.n}
              </span>
              <h3 className="text-display mt-6 text-2xl">{e.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-bone-dim">{e.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Équipe */}
      <section aria-labelledby="equipe" className="mt-32">
        <Reveal>
          <h2 id="equipe" className="mb-14 text-xs uppercase tracking-[0.25em] text-bone-dim">
            L'équipe
          </h2>
        </Reveal>
        <ul className="divide-y divide-bone/10 border-y border-bone/10">
          {EQUIPE.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08}>
              <li className="grid gap-2 py-8 md:grid-cols-[1fr_auto_1fr] md:items-baseline md:gap-8">
                <h3 className="text-display text-3xl md:text-4xl">{m.name}</h3>
                <p className="text-sm uppercase tracking-widest text-ember">
                  {m.role}
                </p>
                <p className="text-sm leading-relaxed text-bone-dim">{m.note}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>
    </div>
  );
}
