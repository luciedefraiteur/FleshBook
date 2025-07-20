# Plan de Développement Backend pour FleshBook

## Objectif
Mettre en place une structure backend robuste pour gérer les cercles et les publications personnelles, tout en assurant une intégration fluide avec le frontend.

## Étapes de Développement

### 1. **Configuration Initiale**
- Installer les dépendances nécessaires :
  - `express` pour le serveur.
  - `mongoose` pour la gestion de MongoDB.
  - `cors` pour gérer les requêtes cross-origin.
  - `dotenv` pour les variables d'environnement.
- Configurer le fichier `.env` pour les informations sensibles (exemple : URI MongoDB).

### 2. **Structure des Endpoints**

#### Cercles
- **Endpoint : `GET /cercles`**
  - Récupère la liste des cercles auxquels l'utilisateur appartient.
  - Exemple de réponse :
    ```json
    [
      { "id": "1", "nom": "Cercle Mystique", "actif": true },
      { "id": "2", "nom": "Cercle des Flammes", "actif": false }
    ]
    ```

#### Publications Personnelles
- **Endpoint : `GET /abime/perso`**
  - Récupère les publications personnelles de l'utilisateur.
  - Exemple de réponse :
    ```json
    [
      { "id": "101", "contenu": "Ma première publication", "date": "2025-07-20" },
      { "id": "102", "contenu": "Rituel accompli", "date": "2025-07-19" }
    ]
    ```

### 3. **Modèles MongoDB**

#### Cercle
- Schéma :
  ```javascript
  const CercleSchema = new mongoose.Schema({
    nom: String,
    actif: Boolean,
    utilisateurs: [String],
  });
  ```

#### Offrande
- Schéma :
  ```javascript
  const OffrandeSchema = new mongoose.Schema({
    contenu: String,
    date: Date,
    utilisateur: String,
  });
  ```

### 4. **Tests et Validation**
- Tester les endpoints avec `Postman` ou `Insomnia`.
- Vérifier les performances avec des données volumineuses.
- Assurer la sécurité des données avec des validations et des contrôles d'accès.

### 5. **Gestion des Offrandes et des "Échos" (Commentaires)**

#### Offrandes
- **Endpoint : `POST /abime/perso`**
  - Permet à l'utilisateur de publier une Offrande dans son Abîme personnel.
  - Exemple de requête :
    ```json
    {
      "contenu": "Ma nouvelle Offrande",
      "date": "2025-07-20",
      "cercle": "Cercle Mystique"
    }
    ```
  - Exemple de réponse :
    ```json
    {
      "message": "Offrande ajoutée avec succès",
      "offrande": {
        "id": "103",
        "contenu": "Ma nouvelle Offrande",
        "date": "2025-07-20",
        "cercle": "Cercle Mystique"
      }
    }
    ```

#### Échos (Commentaires)
- **Endpoint : `POST /abime/echo`**
  - Permet à l'utilisateur de réagir à une publication avec un "Écho".
  - Exemple de requête :
    ```json
    {
      "IdOffrande": "101",
      "contenu": "Un écho à votre rituel",
      "date": "2025-07-20",
      "utilisateur": "Utilisateur1"
    }
    ```
  - Exemple de réponse :
    ```json
    {
      "message": "Écho ajouté avec succès",
      "echo": {
        "id": "201",
        "IdOffrande": "101",
        "contenu": "Un écho à votre rituel",
        "date": "2025-07-20",
        "utilisateur": "Utilisateur1"
      }
    }
    ```

### 6. **Endpoints supplémentaires pour une expérience rituelle enrichie**

#### GET /abime/collectifLucide

* Fil d’Offrandes des cercles auxquels j’appartiens
* Requête personnalisée (`$in` sur les cercles de l’utilisateur)

#### POST /abime/rituel

* Pour poster une *Offrande rituelle collective* visible par plusieurs cercles
* Peut introduire un champ `type: "rituel" | "confession" | "appel"`

#### GET /echo/:IdOffrande

* Pour récupérer tous les Échos d’une Offrande
* Structure utile pour frontend commenté

---

### 7. **Améliorations et clarifications**

#### Endpoint `/cercles` ambigu

Actuellement :

> `"GET /cercles"` → récupère tous les cercles de l’utilisateur.

Suggestion :
Fais une distinction explicite entre **tous les cercles existants** (pour en rejoindre un) et **les cercles de l’utilisateur** :

```bash
GET /cercles         -> tous les cercles (recherche, exploration)
GET /cercles/mien    -> cercles de l’utilisateur authentifié
```

Ou alors ajoute un paramètre :

```bash
GET /cercles?user=true
```

#### Liens entre Offrandes, Cercles et Utilisateurs

Ton schéma `Offrande` contient bien le champ `"cercle"`, mais ce champ est un `String`.

Suggestion :
Déclare une **relation explicite avec l’ID du cercle** via `mongoose.Schema.Types.ObjectId`, pour mieux peupler ou requêter :

```js
const OffrandeSchema = new mongoose.Schema({
  contenu: String,
  date: Date,
  utilisateur: { type: String, required: true },
  cercle: { type: mongoose.Schema.Types.ObjectId, ref: 'Cercle' },
});
```

Même chose pour les Échos (référence vers l’IdOffrande).

#### Sécurité et authentification

Mentionner dès maintenant un plan d’intégration de JWT ou middleware d’auth :

* `authMiddleware.js` pour sécuriser `POST /abime/perso` ou `/echo`
* Ajout futur de rôles ? (Gardien, Témoin, Voyageur ?)

#### Redondance potentielle dans `/abime/perso`

Actuellement, ce endpoint récupère *les Offrandes personnelles*. Mais si on commence à poster dans plusieurs cercles, ça peut devenir flou.

Suggestion :
Clarifie le comportement :

* Soit `/abime/perso` regroupe tout ce que j’ai posté (peu importe le cercle),
* Soit tu permets un filtrage :

```bash
GET /abime/perso?cercle=CercleId
```
