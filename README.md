# kern dev

Site vitrine premium du studio **kern dev** — sites vitrines d'exception, produits SaaS et automatisations IA.

## Stack

- **Next.js 15.5** (App Router) + **TypeScript strict**
- **Tailwind CSS v4** (via `@tailwindcss/postcss`)
- **Motion** : framer-motion 13 (transitions de page via `template.tsx`, reveals au scroll, menu mobile animé)
- **3D** : three.js + @react-three/fiber + @react-three/drei — hero interactif (tore noué signature, réactif souris + drift au scroll, lazy-loadé, repli statique si `prefers-reduced-motion`)
- **Typographies** : Fraunces (variable, SOFT/WONK) + Space Grotesk via `next/font/google`

## Lancer le projet

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build production
npm run lint       # ESLint (next/core-web-vitals)
```

> NPM uniquement — aucun autre gestionnaire de paquets.

## Pages

| Route       | Contenu |
|-------------|---------|
| `/`         | Hero 3D, marquee, manifeste, 3 expertises, preuve sociale, CTA devis |
| `/services` | 3 offres détaillées (tarifs indicatifs, délais, features) + liens devis présélectionnés |
| `/projets`  | Galerie filtrable (Vitrine / SaaS / IA), 6 projets, vignettes SVG générées localement |
| `/a-propos` | Manifesto typographique, méthode en 4 étapes, équipe |
| `/contact`  | Formulaire de devis validé côté front (POST simulé, état de succès animé) + coordonnées |

## Notes design

- **Palette** : encre chaude `#0e0c09`, os `#ece4d6`, accents **braise** `#ff5c1f` et **jade électrique** `#2fe0b8` — aucun bleu générique.
- **Grain** subtil global (SVG `feTurbulence`) pour la texture.
- **Motion** au service du sens : transitions de page fondues + flou, reveals décalés, hover magnétique sur les liens, micro-interactions sur les boutons.
- **Accessibilité** : skip-link, `prefers-reduced-motion` respecté partout (hook `useReducedMotion` partagé), contrastes AA, focus visible jade, navigation clavier, aria sur filtres et formulaire.
- **Perf** : canvas 3D lazy-loadé (`next/dynamic`, `ssr: false`), pages entièrement statiques, polices auto-hébergées par next/font (pas de flash).
- **Sécurité** : headers dans `next.config.ts` (CSP souple, X-Frame-Options, nosniff…), aucun secret dans le repo.
