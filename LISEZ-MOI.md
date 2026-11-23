# Site Brad Bitt — version 1.6 · la bande-son

## Ce qu'il faut mettre en ligne

**Quatre remplacements et une image nouvelle.** `jeu.html`, `jeu.css` et
`jeu.js` n'ont pas bougé.

```
index.html                      remplace
style.css                       remplace
script.js                       remplace
confidentialite.html            remplace
images/ost/pochette-beta.png    NOUVEAU  (créer le dossier images/ost/)
```

## La rubrique Musiques

Elle ne dit plus « prochainement ». C'est désormais une vraie section, en pleine
largeur, à la place de la carte qui faisait la paire avec « L'histoire de Bitt »
— cette dernière reste, seule, juste en dessous.

Elle contient la pochette (cliquable), la date, la durée, la phrase d'accroche
et **les sept titres avec leurs durées**, pris directement sur l'album :

| | Titre | Durée |
|---|---|---|
| 01 | Menu principal | 3:52 |
| 02 | level_intro_theme | 2:23 |
| 03 | base | 2:15 |
| 04 | level1 | 2:31 |
| 05 | level2 | 2:11 |
| 06 | level3 | 2:39 |
| 07 | Mini-boss_3 | 2:52 |

## Le clic sur la pochette

Il ouvre une fenêtre où tout entre à son tour : la pochette apparaît en
grandissant légèrement avec un halo rose, le texte et la phrase d'accroche
montent derrière, puis le lecteur se révèle. **La lecture démarre toute seule.**

Le lecteur SoundCloud **n'est chargé qu'à cet instant** — vérifié : zéro requête
vers SoundCloud tant qu'on ne clique pas. Fermer la fenêtre détruit le lecteur
et coupe le son, comme pour les épisodes.

Un rappel discret a été glissé dans la rubrique bêta, puisque l'album est
explicitement « avant la bêta » : il renvoie vers la section Musiques.

## La politique de confidentialité

SoundCloud est un nouveau tiers : il est déclaré, avec la précision qui compte —
le lecteur ne se charge que sur clic, donc aucune adresse IP ne lui parvient
avant. La date de mise à jour passe au 23 novembre 2026.

## Un point à trancher

**Les titres sont ceux publiés sur SoundCloud**, et plusieurs ressemblent à des
noms de fichiers de travail : `level_intro_theme`, `base`, `level1`, `level2`,
`level3`, `Mini-boss_3`. Je les ai repris tels quels plutôt que d'inventer des
noms — le site dit la même chose que l'album, c'est le minimum.

Si tu les renommes sur SoundCloud (« Le niveau 1 », « La base », « Mini-boss »…),
dis-le-moi et je mets la liste à jour. Elle est écrite à deux endroits :
`index.html` (la section) et `PISTES_OST` en haut de `script.js`.
