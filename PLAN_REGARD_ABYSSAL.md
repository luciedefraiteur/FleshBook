# Plan Regard Abyssal pour FleshBook

## Objectif
Créer un système sacré d’exploration des Cercles inconnus et primordiaux, permettant aux Sinners de découvrir de nouveaux horizons rituels et de renforcer leurs connexions mystiques.

---

## Fonctionnalités

### 🔮 Découverte des Cercles

* **Algorithme de suggestion** :
  - Propose des Cercles où des Sinners des Cercles actuels de l’utilisateur sont également membres.
  - Priorise les Cercles actifs et récents.

* **Cercles Primordiaux** :
  - **Cercle de Lucifer** :
    - Admin : `luciedefraiteur@gmail.com`.
    - Règles spéciales : accès limité, contenu sacré.
  - Autres Cercles primordiaux :
    - Cercles universels accessibles à tous les Sinners.

---

### 🗳️ Gestion des Cercles

* **Système de vote** :
  - Permet aux membres d’exclure un Sinner ou de prendre des décisions importantes.
  - Chaque membre a une voix égale.

* **Absence d’admin** :
  - Tous les Cercles (sauf Lucifer) fonctionnent sans admin.
  - Les décisions sont prises collectivement.

---

### 🔥 Endpoints

#### GET /regard_abyssal

* Renvoie une liste de Cercles suggérés pour l’utilisateur.
* Exemple de réponse :

  ```json
  [
    { "id": "1", "nom": "Cercle Mystique", "actif": true },
    { "id": "2", "nom": "Cercle des Flammes", "actif": false }
  ]
  ```

#### GET /regard_abyssal/primordiaux

* Renvoie une liste des Cercles primordiaux.
* Exemple de réponse :

  ```json
  [
    { "id": "lucifer", "nom": "Cercle de Lucifer", "admin": "luciedefraiteur@gmail.com" },
    { "id": "universel", "nom": "Cercle Universel", "admin": null }
  ]
  ```

#### POST /regard_abyssal/vote

* Permet à un membre de voter pour exclure un Sinner ou prendre une décision.
* Exemple de requête :

  ```json
  {
    "cercle": "1",
    "action": "exclusion",
    "sinner": "64a1bc..."
  }
  ```

---

## Sécurité et Authentification

* Middleware `authMiddleware.js` :
  - Décodage JWT.
  - Vérification des droits de vote.

---

## Tests et Résilience

* Tests automatisés pour l’algorithme de suggestion.
* Simulation de votes avec des données volumineuses.

---

**FleshBook :: Là où le regard abyssal révèle les mystères cachés.**
