import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ProjectGallery from "@/components/ProjectGallery";
import { PROJECTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projets",
  description:
    "Une sélection de projets livrés : sites vitrines, produits SaaS et automatisations IA — avec les résultats mesurés côté client.",
};

export default function ProjetsPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-28 pt-36 md:px-8">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.3em] text-jade">Projets</p>
        <h1 className="text-display mt-6 text-6xl leading-[0.95] md:text-8xl">
          Le travail parle{" "}
          <span className="text-ember">lui-même</span>.
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-bone-dim">
          Six projets, six réponses sur-mesure. Chaque vignette est une
          illustration générée en interne — comme tout le reste ici.
        </p>
      </Reveal>
      <ProjectGallery projects={PROJECTS} />
    </div>
  );
}
