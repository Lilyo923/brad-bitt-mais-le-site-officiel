# Site Brad Bitt — version 1.4

## Corrections du 24/08

* **La chemise de Brad.** Sa planche de sprites avait des trous : le blanc sous le
  visage, entre les revers de la veste, était transparent — le fond du site passait
  au travers. `images/jeu/brad-planche.png` a été régénérée en rebouchant les
  316 pixels concernés. **Le même défaut existe dans le jeu** : le fichier corrigé
  est fourni à côté du site sous le nom `brad-corrige-pour-le-jeu.png`, à copier sur
  `Jeu/assets/brad/brad.png` si tu veux le rattraper là aussi.
* **Le cadre « Écran d'accueil ».** Il était vide : la capture avait été prise avant
  que le jeu n'ait dessiné sa première image. Elle a été refaite.
* **Le bouton « Voir l'épisode ».** Il occupe maintenant toute la largeur du dos de
  la carte, il arrête lui-même la propagation du clic, et la face cachée n'intercepte
  plus rien (`pointer-events`). La carte ne se retourne plus dans son dos, ni à la
  souris ni au clavier.
* **Le Serra-Lanceur est déjà l'ennemi insensible aux coups.** La note qui annonçait
  cette variante « à venir » disait donc une chose qui existe. Elle ne parle plus que
  des boss secondaires, et la fiche du Lanceur porte maintenant l'étiquette
  « Insensible aux coups ».
* **« 05 » se lisait comme cinq prototypes.** La statistique de la page d'accueil
  affiche `01 — prototype jouable`. Le numéro de version, lui, reste indiqué là où
  il a du sens : sur la page du jeu.
* **Nouveau lien du prototype** (`velvety-elf-21fb07`), aux trois endroits où il apparaît.
  Cette version s'appelle **prototype 06** : les mentions « Prototype 05 » ont suivi.
  Vérifié dans le code en ligne — mêmes deux zones, même palette, porte toujours à la
  tuile 256, toujours 27 ennemis : les captures et les chiffres de la page restent justes.
* **Plus d'emoji.** Les trois pictogrammes de la section « combat » — le saut, le
  corps à corps, le Brad-Shy — sont des SVG dessinés, qui suivent la couleur du thème.

## Ce qui change

* **Le jeu n'est plus « suspendu ».** Partout où le site parlait d'une suspension
  pour une durée indéterminée, il annonce maintenant une **sortie visée courant 2027** :
  bannière d'accueil, lettre de Brad Bitt, carte du jeu, nouveautés.
* **Refonte visuelle complète** de la page d'accueil (typographie, thèmes clair et
  sombre, en-tête en verre, hero animé, cartes d'épisodes avec vignettes YouTube).
* **Le lien Canva a disparu.** Le bouton « Découvrir » ouvre désormais `jeu.html`,
  une page de présentation qui se découvre en faisant défiler : chaque section
  apparaît à mesure qu'on descend, et la capture du niveau se transforme
  d'extérieur en intérieur au fil du défilement.

## Ce qu'il faut mettre en ligne

Copie ces fichiers **à la racine du site**, à côté de ton `index.html` actuel :

```
index.html          (remplace l'ancien)
style.css           (remplace l'ancien)
script.js           (remplace l'ancien)
jeu.html            (nouveau)
jeu.css             (nouveau)
jeu.js              (nouveau)
images/jeu/…        (nouveau dossier — à AJOUTER dans images/, sans rien effacer)
```

**Important :** le dossier `images/` livré ici ne contient que le sous-dossier `jeu/`.
Il faut le **fusionner** avec ton dossier `images/` existant, pas le remplacer :
tes logos (`logo bb site clair.png`, `logo bb site sombre.png`) et le dossier
`images/web/` (favicons, `site.webmanifest`) restent indispensables.

Aucune dépendance, aucun script de build. Les polices viennent de Google Fonts.

## Contenu de images/jeu/

| Fichier | D'où il vient |
|---|---|
| `brad-planche.png` | la planche de sprites de Brad du prototype, agrandie ×4 |
| `ennemis/*.png` | les sprites des Serra du prototype, agrandis ×6 |
| `uniformes/*.png` | tes onze uniformes, détourés du fond blanc et remis à l'échelle |
| `captures/*.png` | trois captures prises directement dans le prototype en ligne |
| `skyline-*.svg` | silhouettes de tours générées, utilisées comme masques CSS |
| `logo-imagine.png`, `logo-hwr.png` | les logos des studios du prototype |

## Deux ou trois choses à vérifier de ton côté

* **Quatorze pistes.** La page annonce « quatorze pistes déjà composées » :
  c'est le nombre de fichiers dans ton dossier `mais les musiques`. À ajuster si
  tu comptes autrement.
* **BRADDY3000.** Tes notes le présentent à la fois comme l'adversaire que Brad
  pourchasse et comme l'assistant de la boutique. La page a retenu la seconde
  version (narrateur et assistant) et laisse Kirby67 dans le rôle de la cible.
* **Serra-Boost.** Les notes le décrivaient comme invulnérable et lanceur de bombes ;
  dans le prototype c'est le coureur. La page décrit le coureur et mentionne la
  variante invulnérable comme prévue.
* **Les captures** viennent du prototype en ligne. Vérifié sur le prototype 06 :
  mêmes zones, même palette, même porte à la tuile 256, mêmes 27 ennemis —
  elles restent fidèles. À refaire quand les décors changeront.

## Réglages utiles

* `script.js` → `NEWS_VERSION` : incrémente à chaque mise à jour pour réafficher
  la pastille « nouveautés », et ajoute une entrée en haut de `NEWS_HISTORY`.
* `script.js` → `PANELS.letter` : le texte de la lettre.
* `jeu.js` → le fondu entre les deux zones se règle dans `majZone()`.
