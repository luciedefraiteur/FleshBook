# Plan pour la Vue Rituelle de FleshBook

## Objectif
Créer une interface immersive et rituelle qui permet aux utilisateurs de consulter leur propre Abîme personnel tout en interagissant avec l'Abîme collectif.

## Structure de la Vue

### 1. **Sidebar Droite : L'Abîme Personnel**
- **Mon Cercle** :
  - Liste des groupes auxquels l'utilisateur appartient.
  - Chaque groupe est représenté par un sigil ou une icône rituelle.
  - Animation subtile pour indiquer l'activité récente dans le groupe.
- **Mon Abîme** :
  - Aperçu des publications récentes de l'utilisateur dans l'Abîme.
  - Effet visuel de pulsation pour chaque publication, simulant un battement de cœur.
  - Bouton pour accéder à la vue complète de l'Abîme personnel.

### 2. **Section Centrale : L'Abîme Collectif**
- Fil principal des publications des cercles de l'utilisateur.
- Effets visuels de fumée sombre et de braises mouvantes pour renforcer l'esthétique rituelle.
- Indicateurs rituels pour chaque publication (exemple : aura autour des avatars).

### 3. **Sidebar Gauche : Navigation et Interactions**
- Liste des cercles actifs avec indicateurs d'activité.
- Boutons pour accéder aux rituels spéciaux ou aux paramètres.

## Fonctionnalités
- **Double Vue** : Permet de consulter simultanément l'Abîme personnel et collectif.
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
   - Créer les composants pour la sidebar droite et la vue centrale.
   - Intégrer les animations rituelles.
3. **Tests** :
   - Vérifier la fluidité des interactions entre les deux vues.
   - Tester les performances avec des données volumineuses.

## Esthétique
- Couleurs sombres, rouges et dorées pour une ambiance mystique.
- Polices sacrées : `Cinzel` et `UnifrakturCook`.
- Effets visuels : fumée, pulsations, et aura autour des éléments interactifs.

---

**FleshBook** : Là où l'obscurité rencontre le rituel numérique.
