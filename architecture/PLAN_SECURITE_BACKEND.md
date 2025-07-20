# Plan Sécurité Backend pour FleshBook

## Objectif
Assurer une sécurité optimale pour les données et interactions rituelles des Sinners, tout en respectant l’esthétique sacrée de FleshBook.

---

## Authentification

### 🔒 JWT (JSON Web Tokens)

* Utilisation de tokens pour sécuriser les sessions utilisateur.
* Middleware `authMiddleware.js` :
  - Vérification des tokens.
  - Décodage des informations utilisateur.

### 🛡️ Rôles des Sinners

* **Gardien** : Accès aux fonctionnalités avancées (modération).
* **Voyageur** : Accès standard.
* **Témoin** : Accès limité (lecture seule).

---

## Protection des Endpoints

### 🔥 Routes protégées

* Toutes les routes de création (`POST`) et d’accès personnel (`/miens`, `/perso`, `/collectif`) exigent une authentification.
* Vérification des permissions pour les actions sensibles (exclusion, modification).

### 🩸 Limitation des requêtes

* Implémentation de limites de fréquence pour éviter les abus.
* Exemple :
  - Maximum 10 Échos par minute.
  - Maximum 5 Offrandes par heure.

---

## Tests et Résilience

* Tests automatisés pour vérifier la robustesse des mécanismes de sécurité.
* Simulation d’attaques courantes (brute force, injection).

---

**FleshBook :: Là où la sécurité protège les rituels sacrés.**
