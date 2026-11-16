# Site Brad Bitt — version 1.5 · la bêta

## Ce qu'il faut mettre en ligne

**Cinq remplacements et une image nouvelle.** `jeu.js` et `confidentialite.html`
n'ont pas bougé.

```
index.html                          remplace
style.css                           remplace
script.js                           remplace
jeu.html                            remplace
jeu.css                             remplace
images/jeu/brad-beta-testeur.png    NOUVEAU  (à ajouter dans images/jeu/)
```

## La rubrique bêta

Elle s'ouvre juste sous le hero, à la place de l'ancienne bannière des dates —
qu'elle remplace entièrement, puisqu'elle dit la même chose en mieux. Un lien
**Bêta** apparaît aussi dans le menu et dans le pied de page, et la pastille
d'en-tête de la page de présentation y renvoie.

### Elle se débrouille seule

Trois états sont écrits dans la page, et c'est l'heure qui décide lequel
s'affiche. **Tu publies une fois, tu ne touches plus à rien :**

| Quand | Ce qui s'affiche |
|---|---|
| Jusqu'au 27 nov. 20 h | « La bêta arrive » + décompte jusqu'à l'ouverture |
| Du 27 au 29 nov. | « La bêta est ouverte » + temps restant + « Jouer maintenant » |
| Après le 29 nov. | « Rendez-vous le 9 janvier » + décompte vers la sortie |

### L'heure est celle du serveur, pas celle du visiteur

Avancer l'horloge de son ordinateur est la première chose qu'on essaie. La page
demande donc l'heure au serveur qui l'héberge — l'en-tête `Date` de sa propre
réponse, aucun service extérieur — puis compte localement à partir de là. C'est
exactement le procédé de `js/compte.js` dans le jeu, pour que les deux comptes
à rebours restent d'accord entre eux.

### Ce qu'elle contient

* le décompte en jours / heures / minutes / secondes, mêmes libellés que le jeu ;
* le **skin « bêta-testeur »** animé, repris de `assets/brad/brad-beta-testeur.png`
  du jeu et agrandi ×4 ;
* trois boutons : ouvrir le jeu, **ajouter à mon agenda** (un fichier `.ics`
  fabriqué dans le navigateur, sans appel extérieur), voir la présentation ;
* quatre chiffres : 3 niveaux, 3 jours, 1 skin, 0 € ;
* une réplique du **BRADDY3000** qui tourne toutes les 9 secondes — ce sont
  celles de `js/compte.js`, pour que ce soit la même voix des deux côtés.

## Au passage

La page de présentation pointait encore vers `velvety-elf-21fb07` — le
prototype 06 d'août. Les **trois liens** mènent maintenant à
`bbittmaislejeu.netlify.app`, et le libellé passe de « Jouer au prototype »
à « Ouvrir le jeu ».

## Deux choses à vérifier

* **L'heure de fermeture est une hypothèse.** `edition.js` fixe l'ouverture au
  27 à 20 h, mais ne dit rien de la fin. J'ai retenu le **29 novembre à minuit**
  (heure de Paris). Si la bêta ferme à une autre heure, c'est `data-fermeture`
  dans `index.html` qu'il faut changer — une seule ligne, en UTC.
* **La page de présentation parle toujours du prototype 06** et décrit le seul
  niveau d'introduction, alors que le jeu a dix niveaux, un hub et des boss.
  Les liens sont rattrapés, pas le texte : c'est le chantier suivant.
