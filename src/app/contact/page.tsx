import type { Metadata } from "next";
import { Suspense } from "react";
import Reveal from "@/components/Reveal";
import ContactContent from "@/components/ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Demandez un devis : racontez votre projet en trois minutes, réponse sous 48 h ouvrées.",
};

export default function ContactPage() {
  return (
    <div className="page-shell">
      <Reveal>
        <p className="kicker mb-0">Contact</p>
        <h1 className="h1">
          Parlons <span className="text-ember">chiffres</span> &{" "}
          <span className="text-jade">visions</span>.
        </h1>
      </Reveal>
      <Suspense>
        <ContactContent />
      </Suspense>
    </div>
  );
}
