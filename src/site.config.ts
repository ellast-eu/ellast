// Tout ce qui te concerne se règle ici : identité, liens, projets mis en avant.

export const SITE = {
  title: 'ellast',
  author: 'Stella Caltagirone',
  description:
    'Réseaux électriques HTA/BT le jour, cybersécurité le reste du temps. Projets, notes et write-ups.',
  githubUser: 'Numidara',
  // Ajoute ce que tu veux exposer publiquement (laisse vide pour masquer)
  links: {
    github: 'https://github.com/Numidara',
    email: '', // ex. 'contact@ellast.eu'
    linkedin: '',
  },
};

/**
 * Projets mis en avant, dans l'ordre d'affichage.
 * `repo` = nom exact du dépôt GitHub. `pitch` remplace la description GitHub.
 * Les dépôts absents de cette liste apparaissent ensuite, triés par dernière mise à jour.
 */
export const FEATURED: { repo: string; pitch?: string }[] = [
  // { repo: 'govchain', pitch: 'Gouvernance citoyenne décentralisée en pair-à-pair.' },
];

/** Dépôts à ne jamais afficher (forks d'exercice, dépôts de config…). */
export const HIDDEN: string[] = ['Numidara'];

/** Afficher les forks ? */
export const SHOW_FORKS = false;
