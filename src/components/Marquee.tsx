const ITEMS = ["Sites vitrines", "Produits SaaS", "Automatisations IA", "Next.js", "Motion design", "3D temps réel"];

export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-bone/10 py-5" aria-hidden="true">
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className="flex items-center gap-10 text-sm uppercase tracking-[0.3em] text-bone-dim">
            {item} <span className="text-ember">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}
