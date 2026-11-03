# ellast.eu

Portfolio et blog de Stella Caltagirone, construit avec [Astro](https://astro.build).
Site 100 % statique : pas de base de données, pas de back-office, aucun script tiers.

## Démarrer

```bash
npm install
npm run dev          # http://localhost:4321, dépôts GitHub réels
npm run sample       # idem, avec des dépôts d'exemple (hors ligne)
npm run build        # génère le site dans dist/
```

## Où modifier quoi

| Quoi                                   | Où                                    |
| -------------------------------------- | ------------------------------------- |
| Nom, liens, courriel                   | `src/site.config.ts`                  |
| Projets mis en avant, dépôts masqués   | `src/site.config.ts` (`FEATURED`, `HIDDEN`) |
| Articles                               | `src/content/blog/*.md`               |
| Commandes du terminal                  | `src/components/Terminal.astro` (objet `commandes`) |
| Couleurs et polices                    | `src/styles/global.css` (`:root`)     |
| Page À propos                          | `src/pages/a-propos.astro`            |

Les dépôts sont lus sur l'API GitHub **au moment du build** : les visiteurs ne contactent jamais GitHub.
Pour un projet, ajouter des *topics* sur GitHub les fait apparaître sous forme d'étiquettes.

## Publier sur GitHub Pages

1. Crée un dépôt (par ex. `Numidara/ellast`) et pousse ce dossier sur la branche `main`.
2. Dans le dépôt : **Settings → Pages → Source : GitHub Actions**.
3. Le workflow `.github/workflows/deploy.yml` construit et publie à chaque push, et chaque nuit (pour rafraîchir la liste des dépôts).
4. DNS chez OVH, zone `ellast.eu` :
   - `www` → enregistrement **CNAME** vers `numidara.github.io.`
   - domaine nu `ellast.eu` → quatre enregistrements **A** : `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
5. Dans **Settings → Pages**, saisis `www.ellast.eu` comme domaine personnalisé, attends le certificat, puis coche **Enforce HTTPS**.
   Pense à vérifier le domaine dans les paramètres de ton compte GitHub (*Pages → Verified domains*) pour empêcher un tiers de le revendiquer.

Le fichier `public/CNAME` contient déjà `www.ellast.eu`.

## Publier sur ton hébergement OVH à la place

`npm run build`, puis envoie le contenu de `dist/` à la racine web (SFTP ou `rsync`).
Sur un hébergement Apache, le fichier `public/.htaccess` ajoute les en-têtes de sécurité
que GitHub Pages ne permet pas (HSTS, `frame-ancestors`, `X-Content-Type-Options`…).

## Sécurité

- CSP stricte (`script-src 'self'; style-src 'self'`) : aucun script ni style en ligne.
  Les données du terminal sont dans un bloc `application/json`, jamais exécuté.
- Le terminal construit son affichage avec `textContent`, jamais `innerHTML` :
  une description de dépôt piégée ne peut pas injecter de HTML.
- Polices auto-hébergées (pas de Google Fonts), donc aucun appel tiers.
