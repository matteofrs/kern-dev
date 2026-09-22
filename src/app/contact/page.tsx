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
    <div className="mx-auto max-w-7xl px-5 pb-28 pt-36 md:px-8">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.3em] text-jade">Contact</p>
        <h1 className="text-display mt-6 text-6xl leading-[0.95] md:text-8xl">
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
