"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const LABELS: Record<string, string> = {
  "/": "Accueil",
  "/services": "Services",
  "/projets": "Projets",
  "/a-propos": "À propos",
  "/contact": "Contact",
};

/**
 * Signature 2 — Transitions de pages signature.
 * Un rideau plein écran traverse le viewport avec le nom de la page de
 * destination en Fraunces géant qui glisse, puis le nouveau contenu apparaît.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [curtain, setCurtain] = useState<string | null>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (reduced) return;
    setCurtain(LABELS[pathname] ?? "kern*dev");
    const t = setTimeout(() => setCurtain(null), 1150);
    return () => clearTimeout(t);
  }, [pathname, reduced]);

  if (reduced) return <>{children}</>;

  return (
    <>
      <AnimatePresence>
        {curtain && (
          <motion.div
            key={`curtain-${pathname}`}
            aria-hidden="true"
            className="fixed inset-0 z-[90] flex items-center overflow-hidden bg-ember"
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{
              clipPath: ["inset(100% 0 0 0)", "inset(0% 0 0% 0)", "inset(0% 0 0% 0)", "inset(0 0 100% 0)"],
              transition: { duration: 1.15, times: [0, 0.4, 0.6, 1], ease: "easeInOut" },
            }}
            exit={{ opacity: 0 }}
          >
            <motion.span
              className="text-display whitespace-nowrap px-8 text-[18vw] leading-none text-ink md:text-[12vw]"
              initial={{ x: "35%" }}
              animate={{ x: "-8%" }}
              transition={{ duration: 1.15, ease: [0.65, 0, 0.35, 1] }}
            >
              {curtain}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.45 }}
      >
        {children}
      </motion.div>
    </>
  );
}
