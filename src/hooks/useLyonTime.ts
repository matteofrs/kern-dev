"use client";

import { useEffect, useState } from "react";

/** Heure de Lyon (Europe/Paris) + statut bureau ouvert/fermé (9h–19h). */
export function useLyonTime() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return { time: "--:--:--", open: false, ready: false };

  const fmt = new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Europe/Paris",
  });
  // formatToParts évite les surprises « 24:xx:xx » de hour12:false à minuit
  const parts = fmt.formatToParts(now);
  const get = (t: string) =>
    parts.find((p) => p.type === t)?.value ?? "00";
  const time = `${get("hour")}:${get("minute")}:${get("second")}`;
  const hour = parseInt(get("hour"), 10);
  const open = hour >= 9 && hour < 19;
  return { time, open, ready: true };
}
