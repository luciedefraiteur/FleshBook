# Plan pour la Vue Rituelle de FleshBook

## Objectif
Créer une interface immersive et rituelle qui permet aux utilisateurs de consulter leur propre Abîme personnel tout en interagissant avec l'Abîme collectif.

## Structure de la Vue

### 1. **Sidebar Gauche : La Constellation Rituelle**
- Affiche les cercles auxquels l'utilisateur appartient.
- Animation d’aura pulsante pour indiquer l’activité récente.
- Possibilité de "plier" certains cercles pour simplifier la navigation.
- Inclut une entrée spéciale "Mon Abîme" comme raccourci personnel.

### 2. **Section Centrale : L'Abîme Collectif**
- Fil principal des publications des cercles de l'utilisateur.
- Effets visuels de fumée sombre et de braises mouvantes pour renforcer l'esthétique rituelle.
- Indicateurs rituels pour chaque publication (exemple : aura autour des avatars).

### 3. **Sidebar Droite : Repli Intérieur**
- Vue personnelle de l'utilisateur :
  - **Mon Journal** : Publications personnelles récentes.
  - **Mes Rituels Privés** : Accès à des fonctionnalités introspectives (à activer plus tard).
- Affichage décoratif des sigils représentant les cercles, sous forme non interactive.

## Fonctionnalités
- **Tripartition Sacrée** :
  - Gauche : Monde extérieur (Cercles, Navigations, Portails).
  - Centre : Fusion collective (Abîme vivant).
  - Droite : Repli intérieur (Journal, Rituels privés).
- **Interactions Rituelles** :
  - Réagir aux publications avec des gestes rituels (exemple : "offrir une flamme").
  - Partager des publications entre cercles.
- **Personnalisation** :
  - Choisir les sigils pour représenter ses cercles.
  - Configurer l'apparence de son Abîme personnel.

## Technologies
- **Frontend** : React pour la gestion des composants dynamiques.
- **Backend** : Node.js et MongoDB pour gérer les cercles et les publications.
- **Styles** : SCSS avec animations avancées pour une immersion totale.

## Étapes de Développement
1. **Backend** :
   - Ajouter des endpoints pour récupérer les cercles et les publications personnelles.
   - Exemple : `GET /cercles` et `GET /abime/perso`.
2. **Frontend** :
   - Créer les composants pour la sidebar gauche, la vue centrale et la sidebar droite.
   - Intégrer les animations rituelles.
3. **Tests** :
   - Vérifier la fluidité des interactions entre les trois vues.
   - Tester les performances avec des données volumineuses.

## Esthétique
- Couleurs sombres, rouges et dorées pour une ambiance mystique.
- Polices sacrées : `Cinzel` et `UnifrakturCook`.
- Effets visuels : fumée, pulsations, et aura autour des éléments interactifs.

---

**FleshBook** : Là où l'obscurité rencontre le rituel numérique.
