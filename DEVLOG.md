 --- Jour 1 / 14h30 - 17h30 ---
 Accompli : configuration du projet et installation des dépendances du front, recherche design pour l'UI
 Problème : Les modèles d'inspiration de design ne fournissent pas l'avantage de Figma pour faciliter le dev front
 Solution : J'ai décidé de trouver les couleurs via un picker image en ligne, et definir les dimensions pendant le developpement d l'UI
 Choix : J'ai utilisé React js + React Router + l'api Context de react + Sass, car s'était suffisant pour la taille actuelle du projet

 --- Jour 1 / 22h30 - 23h30 ---
 Accompli : Developpement du layer principal et devellopement du dashboard
 Problème : Sans les dimension et valeurs de couleurs, beaucoup d'aller et retour pour trouver des tokens UI appreciables
 Solution : J'ai utilisé le devTool pour inspécter les dimensions et le responsive
 Choix : 

  --- Jour 2 / 16h00 - 00h00 ---
 Accompli : implementation de l'interface UI
 Problème : Difficultés avec le responsive (1), manque de temps pour la partie Commandes
 Solution : j'ai utiliser un Position: fixed sur la sidebar et un marging-left: width(sidebar) sur le main (contenu)
 Choix : 

  --- Jour 3 / 00h00 - 10h00 ---
 Accompli : implementation de l'api en backend
 Problème : Pas assez de temps pour documenter l'api, un probleme avec un adaptateur sqlite, difficle à mettre au format json les retours de await db.$queryRaw
 Solution : J'ai utilisé postgresql et un adaptateur, pour les retour de donnée je suis passé à d'autres taches
 Choix : J'ai utilisé node + express + postgresql + zod
