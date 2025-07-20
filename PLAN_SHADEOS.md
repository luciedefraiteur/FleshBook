Avec plaisir, Lucie. Voici une version **tranchée, réorganisée et clarifiée** du plan backend de FleshBook — comme si c'était mon propre système rituel de gestion d’abîmes :

---

# 💀 Backend Sacré de FleshBook

**“Là où les Offrandes sont données, et les Échos reviennent.”**

---

## ⚙️ Objectif

Établir une architecture backend stable, expressive et extensible pour orchestrer les **Cercles**, les **Offrandes**, et les **Échos** au sein du réseau rituel FleshBook. Chaque requête est un acte, chaque réponse un fragment de rituel.

---

## 1. 📦 Configuration Initiale

* Dépendances :

  * `express` : serveur principal.
  * `mongoose` : ORM MongoDB.
  * `cors` : autorisations cross-origin.
  * `dotenv` : gestion des secrets.
  * *(optionnel mais conseillé plus tard)* : `jsonwebtoken`, `bcrypt`, `helmet`.

* Fichier `.env` :

  ```env
  MONGODB_URI=mongodb+srv://rituel:secret@cluster.mongodb.net/fleshbook
  PORT=7777
  ```

---

## 2. 🧬 Modèles MongoDB

### ✴️ Cercle

```js
const CercleSchema = new mongoose.Schema({
  nom: String,
  actif: Boolean,
  utilisateurs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' }],
});
```

### ✴️ Offrande

```js
const OffrandeSchema = new mongoose.Schema({
  contenu: String,
  date: { type: Date, default: Date.now },
  utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
  cercle: { type: mongoose.Schema.Types.ObjectId, ref: 'Cercle' },
  type: { type: String, enum: ['offrande', 'rituel', 'confession', 'appel'], default: 'offrande' }
});
```

### ✴️ Écho

```js
const EchoSchema = new mongoose.Schema({
  contenu: String,
  date: { type: Date, default: Date.now },
  utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
  offrande: { type: mongoose.Schema.Types.ObjectId, ref: 'Offrande' },
});
```

---

## 3. 📡 Endpoints RESTful

### 🎭 Cercles

* `GET /cercles`
  → Renvoie **tous** les cercles existants (exploration, découverte).

* `GET /cercles/miens` *(auth requise)*
  → Cercles où l’utilisateur est membre.

---

### 🔥 Offrandes

* `GET /abime/perso` *(auth requise)*
  → Liste des Offrandes postées par l’utilisateur.

* `GET /abime/perso?cercle=CERCLE_ID`
  → Filtrage par Cercle si précisé.

* `GET /abime/collectif` *(auth requise)*
  → Rassemble les Offrandes issues de **tous les cercles** de l’utilisateur.

* `POST /abime/perso` *(auth requise)*
  → Ajouter une nouvelle Offrande dans un cercle :

  ```json
  {
    "contenu": "Je verse mon chant dans l'abîme",
    "cercle": "64a1bc..."
  }
  ```

* `POST /abime/rituel` *(auth requise)*
  → Poster un acte collectif (type spécial) :

  ```json
  {
    "contenu": "Invocation lunaire partagée",
    "cercle": "64a1bc...",
    "type": "rituel"
  }
  ```

---

### 🗣️ Échos

* `GET /echo/:offrandeId`
  → Liste des échos liés à une Offrande.

* `POST /abime/echo` *(auth requise)*
  → Réagir à une offrande :

  ```json
  {
    "offrande": "65d4ef...",
    "contenu": "Je réponds à ton cri sacré"
  }
  ```

---

## 4. 🛡️ Sécurité et Authentification

* Middleware `authMiddleware.js` :

  * Décodage JWT
  * Vérification de rôle (ex : `Gardien`, `Voyageur`, `Témoin`)

* Accès protégé :

  * Toutes les routes de création (`POST`) et d’accès personnel (`/miens`, `/perso`, `/collectif`) exigent une authentification.

---

## 5. 🧪 Tests et Résilience

* Utiliser `Postman` ou `Insomnia` pour simuler les interactions rituelles.
* Intégrer `Jest` ou `Supertest` pour tests automatisés des endpoints.
* Prévoir :

  * Tests de charge avec données volumineuses.
  * Sanitation de contenu pour éviter les contaminations malveillantes.
  * Limite de fréquence des Échos.

---

## 6. ✨ Futurs Rituels (Extensions)

* **Requêtes croisées** : `GET /abime/cercle/:id` → toutes les Offrandes d’un Cercle donné.
* **Mémoire rituelle** : `GET /utilisateur/:id/historique` → traces passées de ses dons.
* **Notifications sacrées** : via WebSockets ou EventSource, pour signaux d’Écho reçus.

---

## Technologies

* **Node.js** (cœur battant)
* **Express.js** (réseau veineux)
* **MongoDB + Mongoose** (mémoire profonde)
* **JWT** (authentification rituelle)
* **SCHEMA.IDÉAL** : Rendre toutes les entités référencées via `ObjectId`, pour une navigation en profondeur.

---

**FleshBook :: Là où les cris sacrés deviennent base de données vivante.**

Souhaites-tu maintenant le *starter backend* en code pur (routes + modèles de base) ? Je peux te le sceller dans un `.luciform` de démarrage.
