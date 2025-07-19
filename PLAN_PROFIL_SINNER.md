# Plan d'action pour la page profil Sinner

## Objectifs
- Créer une page de profil pour les utilisateurs (Sinners).
- Permettre l'accès aux profils des autres utilisateurs.
- Maintenir une esthétique blasphématoire et rituelle.

## Étapes de développement

### 1. Backend
- Ajouter un endpoint API pour récupérer les informations d'un utilisateur spécifique.
  - Route : `GET /pecheurs/:id`
  - Réponse :
    ```json
    {
      "_id": "<id>",
      "name": "<nom>",
      "avatar": "<url_avatar>",
      "offrandes": [
        {
          "_id": "<id_offrande>",
          "text": "<texte_offrande>",
          "createdAt": "<date>"
        }
      ]
    }
    ```

### 2. Frontend
#### a. Composant ProfilSinner
- Créer un composant React `ProfilSinner`.
- Afficher les informations utilisateur :
  - Nom.
  - Avatar.
  - Liste des offrandes.
- Ajouter un bouton pour revenir à la vue principale.
- Ajouter un breadcrumb ou une indication rituelle du type :
  **« ↘︎ Tu consultes le PÉCHEUR #666 dans la Salle des Reflets »**
- Inclure une URL stylée comme `/damné/666` ou `/salle-des-âmes/666`.

#### b. Intégration dans `App.jsx`
- Ajouter une logique pour afficher le profil d'un utilisateur lorsque son nom est cliqué dans `Sidebar` ou `AbimeFeed`.
- Passer l'ID utilisateur au composant `ProfilSinner`.

### 3. Design
- Utiliser des couleurs sombres et des dégradés rouges pour maintenir l'esthétique rituelle.
- Ajouter des effets visuels comme des ombres et des animations subtiles.
- Utiliser des polices comme `Cinzel` et `UnifrakturCook` pour renforcer le thème.
- Ajouter une aura autour des avatars, changeant selon le nombre d’offrandes.
- Inclure un fond mouvant type **braises / fumée sombre** dans la page de profil.

### 4. Tests
- Vérifier que les informations utilisateur sont correctement récupérées et affichées.
- Tester la navigation entre la vue principale et les profils.
- S'assurer que les erreurs API sont gérées correctement.

## Ressources nécessaires
- Polices : `Cinzel`, `UnifrakturCook`.
- Images d'avatar.
- Données utilisateur dans la base MongoDB.

## Étapes supplémentaires
- Ajouter des fonctionnalités d'édition pour le profil utilisateur.
- Permettre aux utilisateurs de personnaliser leur avatar et leur nom.
- Afficher des statistiques sacrées :
  - Nombre total d’offrandes.
  - Date de première offrande (rituel d’entrée).
  - Blasphème favori (tag symbolique).
- Pour les utilisateurs sans offrande :
  > « Ce pécheur n’a encore rien offert. Que son silence soit pesé par les Juges. »

## Estimation du temps
- Backend : 2 jours.
- Frontend : 3 jours.
- Design : 1 jour.
- Tests : 1 jour.
- Narration et textes rituels : 0.5 jour.

---
Ce plan garantit une expérience utilisateur immersive et conforme au thème blasphématoire et rituelle.

### 🩸 Résumé rituel :

> **Validé par les forces de l’Abîme.**
> Ce plan est une bonne première offrande pour tisser la Salle des Reflets.
> Poursuis l’incantation, ajoute des cris muets, et rends chaque pécheur inoubliable.
