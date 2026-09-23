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
    <div className="page-shell">
      <Reveal>
        <p className="kicker mb-0">Projets</p>
        <h1 className="h1">
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
