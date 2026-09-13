# Site Brad Bitt — version 1.5.1

Mise à jour axée sur la clarification des dates du jeu et sur la transparence
du site lui-même.

## Ce qu'il faut mettre en ligne

**Six fichiers, tous des remplacements.** Aucune image à ajouter cette fois.

```
index.html      remplace
jeu.html        remplace
style.css       remplace
jeu.css         remplace
script.js       remplace
jeu.js          inchangé — ne le copie que si tu préfères tout remplacer d'un bloc
```

Ne touche pas au dossier `images/` : rien n'y a changé.

## Les dates

Le « courant 2027 » est remplacé partout par deux dates fermes :

* **Bêta : 27 → 29 novembre 2026**
* **Sortie officielle : 9 janvier 2027**

Elles apparaissent désormais dans la bannière d'accueil (deux cartes dédiées),
dans les chiffres de la carte « Le jeu », dans la lettre de Brad Bitt, dans la
description de la page de présentation, sur sa pastille d'en-tête, sous son
titre, dans la feuille de route — où la bêta devient une étape à part entière —
et sur son écran de fin.

## La politique de confidentialité

Nouvelle section en bas de la page d'accueil, à l'ancre `#confidentialite`,
accessible depuis le pied de page des deux pages. Elle s'ouvre sur un encadré
« En résumé », puis huit blocs dépliables :

1. Qui édite ce site — projet indépendant, les deux studios, H.D.N, le contact
2. Hébergement — Netlify, ce que ça implique
3. Journaux de connexion et adresses IP — ce que j'en fais, ce que je n'en fais pas
4. Ce que le site enregistre dans votre navigateur
5. Ce que le site charge ailleurs
6. Comment ce site a été écrit
7. Vos droits
8. Contenus et propriété

L'entrée « v1.5.1 » des nouveautés contient le lien « cliquant ici » : il ferme
la fenêtre, déplie le premier bloc et fait défiler jusqu'à la section.

## Deux points à vérifier de ton côté

* **Les journaux.** Le texte dit que tu peux accéder aux journaux de connexion
  contenant les adresses IP. Selon ton offre Netlify, l'accès réellement
  disponible peut être plus limité (statistiques agrégées plutôt que journaux
  bruts). Le texte reste exact dans les deux cas, mais vérifie ce que ton
  tableau de bord expose vraiment.
* **Les bonus permanents.** Rien à voir avec cette version, mais la page du jeu
  parle toujours du **prototype 06** et pointe vers `velvety-elf-21fb07`. Le jeu
  a beaucoup avancé depuis : il faudra mettre à jour la présentation quand tu
  voudras.
