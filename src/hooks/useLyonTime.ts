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
  const time = fmt.format(now);
  const hour = parseInt(time.slice(0, 2), 10);
  const open = hour >= 9 && hour < 19;
  return { time, open, ready: true };
}
