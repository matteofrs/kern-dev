"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { ReactNode } from "react";
import { useTouchOrReduced } from "@/hooks/useTouch";

type Props = {
  children: ReactNode;
  className?: string;
  href: string;
};

/**
 * Signature 6 — Bouton magnétique.
 * Le CTA attire subtilement le curseur (lerp) et se remplit d'un disque braise
 * qui naît à la position exacte du curseur au hover.
 */
export default function MagneticButton({ children, className = "", href }: Props) {
  const disabled = useTouchOrReduced();
  const ref = useRef<HTMLAnchorElement>(null);
  const raf = useRef(0);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const [fill, setFill] = useState<{ x: number; y: number } | null>(null);
  const [hover, setHover] = useState(false);

  const animate = () => {
    const el = ref.current;
    if (!el) return;
    current.current.x += (target.current.x - current.current.x) * 0.18;
    current.current.y += (target.current.y - current.current.y) * 0.18;
    el.style.transform = `translate(${current.current.x.toFixed(2)}px, ${current.current.y.toFixed(2)}px)`;
    if (
      Math.abs(target.current.x - current.current.x) > 0.1 ||
      Math.abs(target.current.y - current.current.y) > 0.1
    ) {
      raf.current = requestAnimationFrame(animate);
    } else {
      el.style.transform = `translate(${target.current.x}px, ${target.current.y}px)`;
    }
  };

  const onMove = (e: React.PointerEvent) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    target.current.x = (e.clientX - rect.left - rect.width / 2) * 0.28;
    target.current.y = (e.clientY - rect.top - rect.height / 2) * 0.35;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(animate);
  };

  const onEnter = (e: React.PointerEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setFill({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setHover(true);
  };

  const onLeave = () => {
    target.current = { x: 0, y: 0 };
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(animate);
    setHover(false);
  };

  return (
    <Link
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      className={`relative inline-flex w-fit items-center gap-3 overflow-hidden rounded-full border border-ember px-8 py-4 text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${
        hover ? "text-ink" : "text-ember"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute rounded-full bg-ember transition-transform duration-500 ease-out"
        style={{
          left: fill ? fill.x - 150 : "50%",
          top: fill ? fill.y - 150 : "50%",
          width: 300,
          height: 300,
          transform: hover ? "scale(1)" : "scale(0)",
        }}
      />
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </Link>
  );
}
