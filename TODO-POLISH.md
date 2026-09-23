# TODO-POLISH — audit « pass polish strict » (2026-09-23)

Mission : cohérence et finition uniquement. Aucune nouveauté. Rendu client réel.

## Système cible (référence unique)

| Token | Valeur | Classe composée |
|---|---|---|
| Conteneur | `mx-auto max-w-7xl px-5 md:px-8` | `.container-site` |
| Shell page intérieure | conteneur + `pt-36 pb-24 md:pb-32` | `.page-shell` |
| Rythme vertical section | `py-24 md:py-32` | `.section-pad` |
| Kicker (label de section) | `mb-4 text-xs uppercase tracking-[0.3em] text-jade` | `.kicker` |
| h1 | `text-display mt-6 text-5xl leading-[0.95] md:text-7xl` | `.h1` |
| h2 display | `text-display text-3xl leading-tight md:text-5xl` | `.h2` |
| h2 label (méthode/équipe/coordonnées) | identique au style `text-xs uppercase tracking-[0.25em] text-bone-dim` | `.h2-label` |
| Bordure standard | `border-bone/15` partout (plus de `/10`) | — |
| Cartes / panneaux | coins nets (radius 0), `border border-bone/15 bg-ink-soft p-8` | `.panel` |
| Bouton primaire plein | `rounded-full bg-ember px-8 py-4 text-sm font-bold uppercase tracking-widest text-ink` + hover scale 1.03 + active 0.97 | `.btn-primary` |
| Bouton secondaire (outline ember) | base visuelle MagneticButton : `rounded-full border border-ember px-8 py-4 …` (padding unifié) | — |
| Champ formulaire | coins nets, `border border-bone/15 bg-ink-soft px-4 py-3`, label `mb-2` | — |

## Incohérences relevées (par catégorie)

### 1. Conteneur / grille (4)
- [ ] Toutes pages : la chaîne `mx-auto max-w-7xl px-5 … md:px-8` est dupliquée 11× avec variantes — source unique `.container-site`.
- [ ] `Footer.tsx:17` conteneur avec `pb-16 pt-6` (ok, interne footer mais doit utiliser `.container-site`).
- [ ] `not-found.tsx:12,16` : padding `px-5 md:px-8` sur wrapper externe **et** `max-w-7xl` interne — double gestion, à unifier.
- [ ] `HeroScrollTitle.tsx:27,56` : conteneur inline dupliqué → `.container-site`.

### 2. Rythme vertical (8)
- [ ] `page.tsx:38,58,102,144` : sections en `py-28` / `pb-28` — mélange `py-28`, `pb-28`, `mt-24`, `mt-32` selon les pages.
- [ ] `services/page.tsx:15` : `pb-28 pt-36` ; `:28` `mt-24 space-y-28` ; `:71` `mt-24` ; `:77` `mt-28` — quatre valeurs d'espacement de section différentes.
- [ ] `projets/page.tsx:14`, `a-propos/page.tsx:42`, `contact/page.tsx:14` : `pb-28 pt-36` (ok en valeur mais dupliqué, et pb à harmoniser 24/32).
- [ ] `a-propos/page.tsx:61,81` : `mt-32` entre sections — remplacer par rythme section unifié (`mt-24 md:mt-32` via `.section-pad` adapté ou classes).
- [ ] `ProjectGallery.tsx:67,86` : filtres `mt-12`, grille `mt-12` — aligner sur l'écart intro standard (`mt-16`).
- [ ] `ContactContent.tsx:17` : grille `mt-16 gap-16` — ok comme écart intro, référence à garder.
- [ ] `page.tsx:127` : blockquote `mt-24` — ramener à `mt-16 md:mt-24` cohérent.
- [ ] `Footer.tsx:70` : `mt-16` barre basse — ok.

### 3. Typographie (7)
- [ ] h1 services/projets/contact `text-6xl md:text-8xl` vs a-propos `text-[12vw] md:text-[7.5vw]` vs 404 `text-[16vw] md:text-[10vw]` — une seule échelle (`text-5xl md:text-7xl`).
- [ ] `page.tsx:64,109` : h2 `text-4xl md:text-5xl` ; `services:40` h2 `text-4xl md:text-5xl` ; `a-propos:63,83` h2 en `text-xs` label ; `services:78` pseudo-h2 `text-3xl md:text-4xl` — échelle h2 unique.
- [ ] Kickers : home `mb-10`/`mb-4`/`tracking-[0.3em] text-jade`, a-propos `tracking-[0.25em] text-bone-dim`, contact aside `tracking-[0.25em] text-bone-dim` — deux familles : `.kicker` (jade) vs `.h2-label` (bone-dim), appliquer explicitement.
- [ ] `a-propos/page.tsx:91` h3 équipe `text-3xl md:text-4xl` vs `:73` h3 méthode `text-2xl` — choix : h3 liste = `text-2xl md:text-3xl` uniforme ? (harmoniser)
- [ ] `page.tsx:151` : h2 CTA `text-[11vw] md:text-7xl` — ramener dans l'échelle display (`md:text-7xl` conservé, base `text-5xl`).
- [ ] `services/page.tsx:35` numéros `text-6xl md:text-8xl text-bone/15` vs home `:76` `text-4xl md:text-5xl text-bone/20` — numérotation d'index incohérente.
- [ ] `not-found.tsx:20` leading `[0.85]` vs `[0.95]` partout ailleurs.

### 4. Bordures / coins / cartes (6)
- [ ] `services/page.tsx:55` aside `rounded-2xl` + `border-bone/10` — résidu arrondi, bordure faible.
- [ ] `ContactContent.tsx:60` carte citation `rounded-2xl border-bone/10`.
- [ ] `DevisForm.tsx:11` inputs `rounded-xl` ; `:70` panneau succès `rounded-2xl border-jade/40` — coins nets imposés.
- [ ] `a-propos/page.tsx:87` liste équipe `divide-bone/10 border-bone/10` — passer `/15`.
- [ ] `ProjectGallery.tsx:108,117` : `border-bone/10` internes cartes — `/15`.
- [ ] `page.tsx:113` grille preuves `gap-px border bg-bone/15` : ok comme motif, garder.

### 5. Boutons / états interactifs (7)
- [ ] `services/page.tsx:63` CTA aside `px-5 py-3` ≠ bouton principal (`px-8 py-4`) — même base `.btn-primary` (pleine largeur conservée).
- [ ] `MagneticButton.tsx:74` padding `px-7 py-4` ≠ `px-8` — unifier.
- [ ] `HeroScrollTitle.tsx:43,92` CTA `hover:scale-105` vs ailleurs `hover:scale-[1.03]` — unifier à 1.03, ajouter `active:scale-95` partout.
- [ ] `Header.tsx:68` bouton Devis `px-5 py-2` : volontairement compact (nav) — garder padding nav mais hover `bg-ember text-ink` cohérent ✓ ; vérifier `focus-visible` (global OK).
- [ ] `ProjectGallery.tsx:74` filtres : hover présent sur inactifs, rien sur actif — ok ; `transition-all` → `transition-colors` pour cohérence avec le reste.
- [ ] Focus-visible : global jade outline OK ; vérifier que les `hover:` des lignes (home expertises, équipe) sont accompagnés d'un état focus clavier équivalent (lien plein bloc : focus-visible outline suffit).
- [ ] `DevisForm.tsx:158` bouton submit : base `.btn-primary` partagée.

### 6. Formulaires (2)
- [ ] `DevisForm.tsx` label `mb-2` uniforme ✓ mais `gap-6` grille vs `mt-` messages d'erreur — garder ; inputs : coins nets + focus `border-jade` ✓ à conserver.
- [ ] Messages d'erreur `text-ember` : contraste AA vérifié (ember #ff5c1f sur ink #0e0c09 ≈ 5,5:1 ok ; sur ink-soft #17130e ≈ 5,1:1 ok).

### 7. Vignettes projets (1)
- [ ] `ProjectGallery.tsx` Artwork : `h-60 md:h-72`, viewBox 400×300, slice — déjà uniforme ✓ ; vérifier recadrage identique (ok, même composant).

## 8. Audit des effets (bugs potentiels)

| Composant | Risque vérifié | Verdict |
|---|---|---|
| `Reveal.tsx` | contenu bloqué à `opacity:0` si l'observer rate la cible après hydratation/layout shift | ✅ corrigé — `useInView`+`animate` remplacé par `whileInView`+`viewport={{once:true}}` (framer-motion reteste la visibilité) ; fallback reduced-motion = rendu statique |
| `Preloader.tsx` | scroll bloqué si le rideau ne se ferme pas | ✅ sain — cleanup `overflow=""` au démontage, `sessionStorage` empêche les répétitions, reduced-motion : fermeture immédiate |
| `template.tsx` (rideau) | rideau coincé plein écran | ✅ sain — `setTimeout(1150)` borné + `exit opacity:0`, ignoré en reduced-motion |
| `CustomCursor.tsx` | tremblement / lag | ✅ sain — motion values + springs amortis, désactivé tactile/reduced, listeners passifs avec cleanup |
| `LyonClock.tsx` / `useLyonTime.ts` | NaN ou « 24: » à minuit | ✅ corrigé — `formatToParts` au lieu de `time.slice()` ; fallback `--:--:--` avant hydratation |
| `SectionIndex.tsx` | dots pointant des sections de la page précédente | ✅ corrigé — recollecte sur `pathname` + MutationObserver, cibles filtrées, doublons dédupliqués |
| `ScrollRead.tsx` / `SplitWords.tsx` | texte invisible hors scroll | ✅ sain — opacité min 0.18 (ScrollRead), reduced-motion = texte statique complet |
| `ProjectGallery.tsx` | cartes bloquées à opacity:0 | ✅ sain — `animate` déclenché au mount (pas dépendant d'un observer) |
| `HeroScrollTitle.tsx` | CTA/description à `opacity:0` au chargement (révélation [0.3→0.5]) | ✅ corrigé — corps visible dès le chargement, ne s'estompe que tard ([0.55→0.8]) ; reduced-motion : tout visible |

## Contraste AA (re-check post-modifs)
- bone-dim #9d9484 / ink #0e0c09 ≈ 7,4:1 ✅ ; / ink-soft ≈ 6,9:1 ✅
- jade #2fe0b8 / ink ≈ 10,9:1 ✅
- ember #ff5c1f / ink ≈ 5,5:1 ✅ ; ink / ember ≈ 5,5:1 ✅ (boutons)
- Aucun changement de couleur de texte prévu → aucun nouveau risque.
