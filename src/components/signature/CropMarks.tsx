/**
 * Signature 12 — Lignes de coupe (crop marks) aux coins du viewport, desktop.
 * Style imprimé, purement décoratif.
 */
export default function CropMarks() {
  const corners = [
    { className: "left-5 top-[4.5rem] border-l border-t" },
    { className: "right-5 top-[4.5rem] border-r border-t" },
    { className: "bottom-5 left-5 border-b border-l" },
    { className: "bottom-5 right-5 border-b border-r" },
  ];
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[65] hidden lg:block"
    >
      {corners.map((c) => (
        <span
          key={c.className}
          className={`absolute h-5 w-5 border-bone/30 ${c.className}`}
        />
      ))}
    </div>
  );
}
