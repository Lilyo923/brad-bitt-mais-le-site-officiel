# Site Brad Bitt — version 1.4.1

## Ce qu'il faut mettre en ligne

**Cinq remplacements et un fichier nouveau**, tous à la racine. Aucune image à
ajouter, `jeu.js` est inchangé.

```
index.html            remplace
jeu.html              remplace
style.css             remplace
jeu.css               remplace
script.js             remplace
confidentialite.html  NOUVEAU
```

La page est servie à l'adresse `/confidentialite`, comme `/jeu` l'est
aujourd'hui : Netlify résout les URL propres, c'est vérifié.

## Les dates

Le « courant 2027 » est remplacé partout par deux dates fermes :

* **Bêta : 27 → 29 novembre 2026**, avec les trois premiers niveaux
* **Sortie officielle : 9 janvier 2027**

## La politique de confidentialité

Elle n'est plus une section de la page d'accueil mais **une page à part
entière**, avec l'en-tête et le pied de page du site et un lien « Retour au
site ». On y accède de deux façons, et pas une de plus :

* le bouton **Confidentialité** du pied de page, sur les trois pages ;
* le lien **« cliquant ici »** dans l'entrée v1.4.1 des nouveautés.

## La lettre

Le bouton « Lire la lettre » et tout son contenu ont été retirés — du HTML, du
script et de la feuille de style. La bannière d'accueil ne propose plus que
« Voir la présentation ». Rien n'en est dit dans le journal des mises à jour,
comme demandé.

## La feuille de route

« Les niveaux » et « Le hub et tout autour » passent en **Fait**. Une nouvelle
étape **En cours — Les tests** prend le relais : optimiser, corriger les bugs,
ajouter du contenu supplémentaire. Le chapeau de la section le dit aussi en
clair, et l'étape bêta précise qu'elle ouvre les trois premiers niveaux.

## Un correctif au passage

Les écouteurs de la fenêtre des nouveautés étaient branchés dans un
`requestAnimationFrame`. Quand le navigateur met l'image en pause — onglet en
arrière-plan, économie d'énergie — les cartes restaient inertes : impossible de
les déplier. Ils sont maintenant branchés immédiatement, le HTML étant déjà en
place à ce moment-là.

## Deux points en suspens

* **Les journaux.** Le texte dit que tu peux accéder aux journaux contenant les
  adresses IP. Vérifie ce que ton offre Netlify expose réellement.
* **Le prototype.** La page du jeu parle toujours du **prototype 06** et pointe
  vers `velvety-elf-21fb07`, alors que la feuille de route annonce désormais que
  tout est fait. C'est le prochain décalage à rattraper.
