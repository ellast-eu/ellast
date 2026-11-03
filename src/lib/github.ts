import { SITE, FEATURED, HIDDEN, SHOW_FORKS } from '../site.config';
import sample from '../data/repos.sample.json';

export interface Repo {
  name: string;
  description: string;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  topics: string[];
  archived: boolean;
  fork: boolean;
  updatedAt: string;
  featured: boolean;
}

interface ApiRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  topics?: string[];
  archived: boolean;
  fork: boolean;
  pushed_at: string;
}

let cache: { repos: Repo[]; source: 'github' | 'sample' | 'none' } | null = null;

/**
 * Récupère les dépôts publics au moment du build (aucun appel côté visiteur).
 * En CI, GITHUB_TOKEN évite la limite de 60 requêtes/heure de l'API anonyme.
 * ELLAST_SAMPLE_REPOS=1 force des données d'exemple pour travailler hors ligne.
 */
export async function getRepos() {
  if (cache) return cache;

  let raw: ApiRepo[] = [];
  let source: 'github' | 'sample' | 'none' = 'none';

  if (process.env.ELLAST_SAMPLE_REPOS === '1') {
    raw = sample as ApiRepo[];
    source = 'sample';
  } else {
    try {
      const headers: Record<string, string> = {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'ellast-site-build',
      };
      if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
      const res = await fetch(
        `https://api.github.com/users/${SITE.githubUser}/repos?per_page=100&sort=pushed&type=owner`,
        { headers },
      );
      if (!res.ok) throw new Error(`GitHub API ${res.status}`);
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error('Réponse inattendue');
      raw = data;
      source = 'github';
    } catch (err) {
      console.warn(`[ellast] Dépôts GitHub indisponibles : ${(err as Error).message}`);
    }
  }

  const featuredIndex = new Map(FEATURED.map((f, i) => [f.repo.toLowerCase(), i]));
  const pitches = new Map(FEATURED.map((f) => [f.repo.toLowerCase(), f.pitch]));

  const repos = raw
    .filter((r) => SHOW_FORKS || !r.fork)
    .filter((r) => !HIDDEN.map((h) => h.toLowerCase()).includes(r.name.toLowerCase()))
    .map<Repo>((r) => {
      const key = r.name.toLowerCase();
      return {
        name: r.name,
        description: pitches.get(key) ?? r.description ?? '',
        url: r.html_url,
        homepage: r.homepage || null,
        language: r.language,
        stars: r.stargazers_count,
        topics: r.topics ?? [],
        archived: r.archived,
        fork: r.fork,
        updatedAt: r.pushed_at,
        featured: featuredIndex.has(key),
      };
    })
    .sort((a, b) => {
      const fa = featuredIndex.get(a.name.toLowerCase());
      const fb = featuredIndex.get(b.name.toLowerCase());
      if (fa !== undefined && fb !== undefined) return fa - fb;
      if (fa !== undefined) return -1;
      if (fb !== undefined) return 1;
      return b.updatedAt.localeCompare(a.updatedAt);
    });

  cache = { repos, source };
  return cache;
}

export const formatDate = (iso: string | Date) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
