"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Status = "idle" | "sending" | "success";

const inputCls =
  "w-full rounded-xl border border-bone/15 bg-ink-soft px-4 py-3 text-bone placeholder:text-bone-dim/50 transition-colors focus:border-jade focus:outline-none";
const labelCls = "mb-2 block text-xs uppercase tracking-[0.2em] text-bone-dim";

export default function DevisForm({ defaultType }: { defaultType?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const reduced = useReducedMotion();

  function validate(data: FormData) {
    const e: Record<string, string> = {};
    const nom = String(data.get("nom") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const type = String(data.get("type") ?? "");
    const budget = String(data.get("budget") ?? "");
    const message = String(data.get("message") ?? "").trim();
    if (nom.length < 2) e.nom = "Votre nom (2 caractères minimum).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      e.email = "Adresse email invalide.";
    if (!type) e.type = "Choisissez un type de projet.";
    if (!budget) e.budget = "Indiquez une fourchette de budget.";
    if (message.length < 20)
      e.message = "Décrivez votre projet en quelques phrases (20 caractères min).";
    return e;
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = new FormData(form);
    const e = validate(data);
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const first = form.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }
    setStatus("sending");
    // POST simulé — aucun backend requis
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("success");
  }

  const fieldError = (k: string) =>
    errors[k] ? (
      <p id={`err-${k}`} role="alert" className="mt-2 text-sm text-ember">
        {errors[k]}
      </p>
    ) : null;

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="ok"
            role="status"
            initial={reduced ? undefined : { opacity: 0, scale: 0.9 }}
            animate={reduced ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-jade/40 bg-ink-soft p-12 text-center"
          >
            <motion.div
              initial={reduced ? undefined : { scale: 0 }}
              animate={reduced ? undefined : { scale: 1 }}
              transition={{ delay: 0.25, type: "spring", stiffness: 200 }}
              aria-hidden="true"
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-jade text-3xl text-ink"
            >
              ✓
            </motion.div>
            <h2 className="text-display mt-6 text-3xl">C'est envoyé.</h2>
            <p className="mx-auto mt-3 max-w-sm text-bone-dim">
              Merci ! Nous revenons vers vous sous 48 h ouvrées avec un premier
              retour sur votre projet.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            initial={reduced ? undefined : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            className="grid gap-6 sm:grid-cols-2"
          >
            <div>
              <label htmlFor="nom" className={labelCls}>Nom *</label>
              <input
                id="nom" name="nom" type="text" autoComplete="name" required
                className={inputCls} placeholder="Ada Lovelace"
                aria-invalid={!!errors.nom} aria-describedby={errors.nom ? "err-nom" : undefined}
              />
              {fieldError("nom")}
            </div>
            <div>
              <label htmlFor="email" className={labelCls}>Email *</label>
              <input
                id="email" name="email" type="email" autoComplete="email" required
                className={inputCls} placeholder="ada@exemple.fr"
                aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-email" : undefined}
              />
              {fieldError("email")}
            </div>
            <div>
              <label htmlFor="type" className={labelCls}>Type de projet *</label>
              <select
                id="type" name="type" required defaultValue={defaultType ?? ""}
                className={inputCls}
                aria-invalid={!!errors.type} aria-describedby={errors.type ? "err-type" : undefined}
              >
                <option value="" disabled>Choisir…</option>
                <option>Sites vitrines</option>
                <option>Produits SaaS</option>
                <option>Automatisations IA</option>
                <option>Je ne sais pas encore</option>
              </select>
              {fieldError("type")}
            </div>
            <div>
              <label htmlFor="budget" className={labelCls}>Budget *</label>
              <select
                id="budget" name="budget" required defaultValue=""
                className={inputCls}
                aria-invalid={!!errors.budget} aria-describedby={errors.budget ? "err-budget" : undefined}
              >
                <option value="" disabled>Choisir…</option>
                <option>Moins de 5 000 €</option>
                <option>5 000 € — 15 000 €</option>
                <option>15 000 € — 40 000 €</option>
                <option>Plus de 40 000 €</option>
              </select>
              {fieldError("budget")}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className={labelCls}>Votre projet *</label>
              <textarea
                id="message" name="message" required rows={6}
                className={inputCls}
                placeholder="Contexte, objectifs, échéances…"
                aria-invalid={!!errors.message} aria-describedby={errors.message ? "err-message" : undefined}
              />
              {fieldError("message")}
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex items-center gap-3 rounded-full bg-ember px-8 py-4 text-sm font-bold uppercase tracking-widest text-ink transition-all hover:scale-[1.03] active:scale-95 disabled:cursor-wait disabled:opacity-60"
              >
                {status === "sending" ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="h-4 w-4 animate-spin rounded-full border-2 border-ink border-t-transparent"
                    />
                    Envoi en cours…
                  </>
                ) : (
                  <>
                    Envoyer la demande
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
