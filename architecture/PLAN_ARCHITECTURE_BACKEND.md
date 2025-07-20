# Plan Architecture Backend pour FleshBook

## Objectif
Créer une architecture backend sacrée et cohérente pour orchestrer les **Cercles**, les **Offrandes**, les **Échos**, et les **Sinners** au sein du réseau rituel FleshBook. Chaque entité et chaque endpoint doit être relié de manière explicite et harmonieuse.

---

## Structure des Endpoints

### 🎭 Cercles

* `GET /cercles`
  → Renvoie **tous** les cercles existants (exploration, découverte).

* `GET /cercles/miens` *(auth requise)*
  → Cercles où l’utilisateur est membre.

* `POST /cercle/engendrer`
  → Permet à un Sinner de créer un nouveau Cercle.

* `POST /cercle/priere`
  → Permet de prier pour des décisions importantes (exclusion, changement de règles).

* `PATCH /cercle/evolution`
  → Permet de modifier les règles ou la description d’un Cercle.

---

### 🔥 Offrandes

* `GET /abime/perso` *(auth requise)*
  → Liste des Offrandes postées par l’utilisateur (lié au Sinner).

* `GET /abime/perso?cercle=CERCLE_ID`
  → Filtrage par Cercle si précisé.

* `GET /abime/collectifLucide` *(auth requise)*
  → Rassemble les Offrandes issues de **tous les cercles** de l’utilisateur.

* `POST /abime/perso`
  → Ajouter une nouvelle Offrande dans un cercle.

* `POST /abime/rituel`
  → Poster un acte collectif (type spécial).

---

### 🗣️ Échos

* `GET /echo/:IdOffrande`
  → Liste des Échos liés à une Offrande.

* `POST /abime/echo`
  → Réagir à une offrande.

---

### 🩸 Sinners

* `GET /sinner/:id`
  → Récupère les informations d’un Sinner spécifique.

* `GET /sinner/:id/offrandes`
  → Liste des Offrandes d’un Sinner donné.

* `GET /sinner/:id/cercles`
  → Liste des Cercles auxquels appartient un Sinner.

---

## Relations entre les Entités

### ✴️ Cercle

* Relie plusieurs **Sinners**.
* Contient des **Offrandes**.

### ✴️ Offrande

* Reliée à un **Sinner** (créateur).
* Reliée à un **Cercle**.
* Peut recevoir plusieurs **Échos**.

### ✴️ Écho

* Relié à une **Offrande**.
* Relié à un **Sinner** (créateur).

### ✴️ Sinner

* Relié à plusieurs **Cercles**.
* Créateur de plusieurs **Offrandes**.
* Créateur de plusieurs **Échos**.

---

## Sécurité et Authentification

* Middleware `authMiddleware.js` :
  * Décodage JWT
  * Vérification de rôle (ex : `Gardien`, `Voyageur`, `Témoin`)

* Accès protégé :
  * Toutes les routes de création (`POST`) et d’accès personnel (`/miens`, `/perso`, `/collectif`) exigent une authentification.

---

## Tests et Résilience

* Utiliser `Postman` ou `Insomnia` pour simuler les interactions rituelles.
* Intégrer `Jest` ou `Supertest` pour tests automatisés des endpoints.
* Prévoir :
  * Tests de charge avec données volumineuses.
  * Sanitation de contenu pour éviter les contaminations malveillantes.
  * Limite de fréquence des Échos.

---

**FleshBook :: Là où les cris sacrés deviennent base de données vivante.**
