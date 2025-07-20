# Plan Gestion des Cercles pour FleshBook

## Objectif
Créer un système sacré pour la création, la gestion, et l’évolution des Cercles, permettant aux Sinners de participer activement à leur organisation rituelle.

---

## Fonctionnalités

### ✨ Engendrer un Cercle

* **Endpoint : POST /cercle/engendrer**
  - Permet à un Sinner de créer un nouveau Cercle.
  - Exemple de requête :

    ```json
    {
      "nom": "Cercle des Étoiles",
      "description": "Un lieu pour contempler les mystères célestes."
    }
    ```

  - Exemple de réponse :

    ```json
    {
      "message": "Cercle engendré avec succès",
      "cercle": {
        "id": "64a1bc...",
        "nom": "Cercle des Étoiles",
        "description": "Un lieu pour contempler les mystères célestes.",
        "actif": true
      }
    }
    ```

---

### 🗳️ Prière pour le Cercle

* **Poids des prières** :
  - Les prières des Sinners sont pondérées par leur ancienneté dans le Cercle.
  - Exemple :
    - Sinner présent depuis 1 an → 1 voix.
    - Sinner présent depuis 5 ans → 5 voix.

* **Endpoint : POST /cercle/priere**
  - Permet de prier pour des décisions importantes (exclusion, changement de règles).
  - Exemple de requête :

    ```json
    {
      "cercle": "64a1bc...",
      "action": "exclusion",
      "sinner": "65d4ef..."
    }
    ```

---

### 🔄 Évolution des Cercles

* **Endpoint : PATCH /cercle/evolution**
  - Permet de modifier les règles ou la description d’un Cercle.
  - Exemple de requête :

    ```json
    {
      "cercle": "64a1bc...",
      "description": "Un lieu pour les rituels lunaires."
    }
    ```

---

## Sécurité et Authentification

* Middleware `authMiddleware.js` :
  - Décodage JWT.
  - Vérification des droits de vote et de création.

---

## Tests et Résilience

* Tests automatisés pour la création et l’évolution des Cercles.
* Simulation de votes avec des pondérations.

---

**FleshBook :: Là où les Cercles naissent et évoluent dans l’harmonie rituelle.**
