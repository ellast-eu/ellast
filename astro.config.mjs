// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.ellast.eu',
  integrations: [sitemap()],
  build: {
    // Feuilles de style en fichiers séparés : permet une CSP stricte (style-src 'self')
    inlineStylesheets: 'never',
  },
  vite: {
    build: {
      // Pas d'assets en data: URI dans le JS/CSS
      assetsInlineLimit: 0,
    },
  },
  markdown: {
    // Prism colore par classes CSS ; Shiki écrirait des attributs style=""
    // que la CSP (style-src 'self') bloquerait.
    syntaxHighlight: 'prism',
  },
});
