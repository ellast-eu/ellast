---
title: "Ce que la consignation électrique m'a appris sur le moindre privilège"
description: "Article d'exemple : remplace-le par le tien. Il montre la mise en forme (titres, code, citation)."
date: 2026-11-03
tags: [méthode, sécurité]
---

> Article d'exemple pour tester la mise en page. Supprime ce fichier ou réécris-le.

Sur un réseau HTA, on ne touche jamais un ouvrage parce qu'on « pense » qu'il est hors tension. On le **sépare**, on le **condamne**, on **vérifie l'absence de tension**, puis on le **met à la terre**. Quatre étapes, toujours dans cet ordre, quel que soit le niveau d'expérience.

## Le parallèle

| Consignation électrique      | Système d'information                     |
| ---------------------------- | ----------------------------------------- |
| Séparer l'ouvrage            | Segmenter le réseau, isoler la machine    |
| Condamner l'organe de coupure | Retirer les droits, verrouiller le compte |
| Vérifier l'absence de tension | Auditer : la porte est-elle vraiment fermée ? |
| Mettre à la terre            | Journaliser, surveiller                   |

## Un peu de code pour le rendu

```bash
# Qui a encore un shell sur cette machine ?
awk -F: '$7 !~ /(nologin|false)$/ {print $1, $7}' /etc/passwd
```

## Pour écrire un nouvel article

Crée un fichier `.md` dans `src/content/blog/`, avec le même en-tête que celui-ci. Mets `draft: true` pour le garder hors ligne.
