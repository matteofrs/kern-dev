"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Signature 1 — Préloader de marque.
 * Compteur 0→100 en Fraunces géant, rideau qui s'ouvre en clip-path
 * avec le mot-symbole « kern* ». Une seule fois par session (sessionStorage).
 */
export default function Preloader() {
  const reduced = useReducedMotion();
  const [seen, setSeen] = useState<boolean | null>(null);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setSeen(sessionStorage.getItem("kern-preload") === "1");
  }, []);

  useEffect(() => {
    if (seen !== false) return;
    if (reduced) {
      sessionStorage.setItem("kern-preload", "1");
      setDone(true);
      return;
    }
    const dur = 1600;
    const start = performance.now();
    let raf = 0;
    // Filet de sécurité : si requestAnimationFrame ne tourne jamais
    // (onglet économisé, headless), le compteur avance quand même via timer
    // et le rideau finit toujours par se fermer — le scroll ne reste
    // jamais bloqué.
    let last = 0;
    const finish = () => {
      sessionStorage.setItem("kern-preload", "1");
      setTimeout(() => setDone(true), 350);
    };
    const step = (t: number) => {
      last = t;
      const p = Math.min(1, (t - start) / dur);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(step);
      else finish();
    };
    raf = requestAnimationFrame(step);
    const watchdog = setInterval(() => {
      const elapsed = performance.now() - start;
      // aucune frame depuis 800 ms alors que la durée est écoulée → on force
      if (elapsed > dur + 400 && performance.now() - last > 800) {
        cancelAnimationFrame(raf);
        setCount(100);
        finish();
      }
    }, 500);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(watchdog);
    };
  }, [seen, reduced]);

  // Verrouille le scroll pendant le préloader
  useEffect(() => {
    if (seen === false && !done) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [seen, done]);

  if (seen !== false) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          aria-hidden="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          exit={
            reduced
              ? { opacity: 0 }
              : { clipPath: "inset(0 0 100% 0)", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }
          }
          initial={{ clipPath: "inset(0 0 0% 0)" }}
        >
          {/* lignes de coupe décoratives */}
          {!reduced && (
            <>
              <span className="absolute left-6 top-6 h-3 w-3 border-l border-t border-bone/30" />
              <span className="absolute right-6 top-6 h-3 w-3 border-r border-t border-bone/30" />
              <span className="absolute bottom-6 left-6 h-3 w-3 border-b border-l border-bone/30" />
              <span className="absolute bottom-6 right-6 h-3 w-3 border-b border-r border-bone/30" />
            </>
          )}
          <div className="text-center">
            <motion.p
              className="text-display text-[26vw] leading-none md:text-[16vw]"
              initial={reduced ? undefined : { y: "0.15em", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              kern<span className="text-ember">*</span>
            </motion.p>
            <motion.div
              className="mt-4 flex items-end justify-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              <span className="text-display text-6xl tabular-nums md:text-8xl">
                {count}
              </span>
              <span className="mb-2 text-xl text-ember md:mb-3">%</span>
            </motion.div>
            <p className="mt-6 text-xs uppercase tracking-[0.4em] text-bone-dim">
              Studio de développement web — Lyon
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
