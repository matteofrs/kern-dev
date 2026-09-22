"use client";

import { useLyonTime } from "@/hooks/useLyonTime";

/**
 * Signature 8 — Marque-page temps réel dans le header.
 * Heure de Lyon HH:MM:SS + statut « Bureau ouvert/fermé » (9h–19h).
 */
export default function LyonClock() {
  const { time, open, ready } = useLyonTime();
  return (
    <p
      className="hidden items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-bone-dim lg:flex"
      aria-label={`Heure à Lyon : ${time}. Bureau ${open ? "ouvert" : "fermé"}.`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${open ? "bg-jade" : "bg-ember"}`}
      />
      <span className="tabular-nums">Lyon {ready ? time : "--:--:--"}</span>
      <span aria-hidden="true" className="text-bone-dim/40">·</span>
      <span>{open ? "Bureau ouvert" : "Bureau fermé"}</span>
    </p>
  );
}
