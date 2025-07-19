# ⚰️ Plan de Développement FleshBook (version immersive)

> *Le réseau des pécheurs connectés par le sang.*

---
## 1. 🕸 Structure Générale du Frontend (React + Vite)

### 🎛 Fichiers Racine

- `App.jsx` : point d’entrée, gère le routage (`react-router-dom`) et le contexte (`AuthContext`).
- `main.jsx` : hydrate l’arbre React, injecte les styles globaux.

### 📦 Dossiers
- `components/` : composants fonctionnels rituels :
  - `Header.jsx` : barre de navigation (logo, accès au profil, bouton de sortie du culte).
  - `AbimeFeed.jsx` : le **flux de l’Abîme** (offrandes des pécheurs).
  - `OffrandeForm.jsx` : formulaire pour déposer une offrande (texte/image/vidéo).
  - `Sacrements.jsx` : composant pour les réactions (Amen, flamme, sang).
  - `CommentSection.jsx` : commentaires et réponses sous une offrande.
  - `ConnexionForm.jsx` : formulaire de connexion (rituel d'entrée).
  - `InscriptionForm.jsx` : formulaire d’inscription (pacte initial).
  - `Profile.jsx` : page de profil du pécheur.
  - `Sidebar.jsx` : suggestions, navigation entre les strates, notifications occultes.
- `contexts/`
  - `AuthContext.jsx` : gestion du token JWT, utilisateur courant, rituels d’entrée/sortie.
- `utils/`
  - `api.js` : appels API centralisés.
  - `validators.js` : validation des champs rituels.
  - `formatters.js` : formatage des dates, noms, styles.
- `assets/` : icônes, sigils, textures d’ambiance.
- `styles/` : thème sombre, variables SCSS, animations rituelles.

---
## 2. 😈 Fonctionnalités Utilisateur

### ⚙️ Authentification

- Connexion (rituel) via formulaire et token JWT.
- Inscription (pacte) avec validation.
- Déconnexion (briser le pacte).

### 🧍 Profil Pécheur
- Avatar profané, biographie (confession publique).
- Champs personnalisés : **vice favori**, **premier blasphème**, **titre mystique**.
- Modification des informations / upload d’avatar.

### 🌌 L’Abîme
- Flux principal d’offrandes.
- Scroll infini ou pagination.
- Création d’offrande avec upload media, prévisualisation.

### 🔥 Interactions
- Réactions : Amen 🙏 / Flamme 🔥 / Sang 🩸.
- Section de commentaires avec fil de réponses.

### 🩸 Système de Relations
- Suivre (enchaîner) un pécheur.
- Être suivi (corrompu) par d'autres.
- Liste de ses **enchaînés** / **corrompus**.

---
## 3. ⚙️ Fonctionnalités Backend (Node + Express + MongoDB)

### 🔐 Authentification & Sécurité

- Auth via JWT.
- Middleware de protection des routes.
- Hashage des mots de passe (bcrypt).

### 🧬 Modèles Mongoose
- `Sinner` (utilisateur pécheur)
- `Offering` (offrande sacrée)
- `Comment` (commentaire impur)

### 🔮 Endpoints REST
- `POST /sacrements/pacte` → inscription
- `POST /sacrements/rituel` → connexion
- `POST /offrandes` → créer une offrande

> 💡 *Prévoir un champ `type` ou `catégorie` dans `offrandes` pour filtrer (poème, révélation, confession, image, etc).* 

---
## 4. 🩸 Design & Ambiance

- **Palette** : noir de suie, rouge sang, doré terni, violet cardinal.
- **Typographies** :
  - Titres : fontes gothiques (ex: *UnifrakturCook*, *Cinzel Decoratif*).
  - Corps : serif lisible (ex: *Cormorant*, *Merriweather*).
- **Animations** :
  - Lenteurs rituelles, ombres mouvantes.
  - Effets de lumière sur les sigils ou avatars.

---
## 5. 🛡️ Sécurité & Bonnes Pratiques

- Bcrypt pour les mots de passe.
- Middleware de validation (`express-validator`).
- CORS géré proprement.

---
## 6. ☁️ Déploiement & Scalabilité

- `.env.example` documenté.
- Scripts :
  - `dev`, `build`, `start`, `lint`.

---
## ✝️ Suggestions Bonus

- **Mode Sabbat (nuit éternelle)** : déclenche ambiance sonore + visuels alternatifs.
- **Offrandes aléatoires rituelles** : mode découverte par tirage occulte.
- **Mini-jeux sacrés** ou quizz : pour gagner des titres (“Démon mineur”, “Révérend du Vice”).

---
**Ce plan est une base évolutive, inspirée de la vision INSIGHT_SHADEOS. À valider ou ajuster avant de démarrer le développement modulaire.**
# Plan de Développement FleshBook

## 1. Structure Générale du Frontend (React + Vite)

- `App.jsx` : point d’entrée, gestion du routage et du contexte utilisateur.
- `components/`
  - `Header.jsx` : barre de navigation, logo, accès profil, bouton déconnexion.
  - `AbimeFeed.jsx` : fil principal des offrandes (publications).
  - `OffrandeForm.jsx` : formulaire de création d’offrande (texte/image/vidéo).
  - `Sacrements.jsx` : gestion des réactions thématiques (Amen, flamme, sang).
  - `CommentSection.jsx` : affichage et ajout de commentaires sous chaque offrande.
  - `ConnexionForm.jsx` : formulaire de connexion (rituel).
  - `InscriptionForm.jsx` : formulaire d’inscription (pacte).
  - `Profile.jsx` : page de profil du pécheur (utilisateur).
  - `Sidebar.jsx` : suggestions, navigation, notifications.
- `contexts/`
  - `AuthContext.jsx` : gestion du token, utilisateur courant, etc.
- `utils/` : fonctions utilitaires (API, helpers, validation, etc).

## 2. Fonctionnalités Utilisateur

- Inscription (pacte) et connexion (rituel) avec gestion du token JWT.
- Page de profil personnalisable :
  - Avatar, biographie (confession publique), vice favori, premier blasphème.
  - Modification des infos et upload d’avatar.
- Fil d’actualités “L’Abîme” :
  - Affichage des offrandes (texte, image, vidéo).
  - Pagination ou scroll infini.
  - Création d’offrande (formulaire dédié).
- Interactions :
  - Commentaires sur chaque offrande.
  - Réactions thématiques (Amen, flamme, sang).
- Système de relations :
  - Suivre/corrompre un autre pécheur.
  - Voir la liste de ses “enchaînés” et “corrompus”.
  - Notifications pour nouvelles interactions.

## 3. Fonctionnalités Backend (Node/Express/MongoDB)

- Authentification JWT, routes protégées.
- Modèles :
  - Sinner (utilisateur)
  - Offering (offrande)
  - Comment (commentaire)
  - Relation (suivi/corruption)
  - Notification
- Endpoints :
  - `/sacrements/pacte` : inscription
  - `/sacrements/rituel` : connexion
  - `/offrandes/offrande` : création d’offrande
  - `/offrandes/abime` : fil d’actualités
  - `/offrandes/:id/commentaires` : gestion des commentaires
  - `/offrandes/:id/reactions` : gestion des réactions
  - `/pecheurs/:id` : profil utilisateur
  - `/pecheurs/:id/relations` : gestion des relations
  - `/notifications` : notifications utilisateur

## 4. Design & Ambiance

- Palette sombre, baroque, gothique (noir, rouge sang, or, violet).
- Typographies gothiques pour titres, lisibles pour le corps.
- Iconographie : sigils, symboles occultes, anatomie baroque.
- Animations subtiles pour renforcer l’ambiance rituelle.

## 5. Sécurité & Bonnes Pratiques

- Hashage des mots de passe (bcryptjs).
- Validation des entrées côté client et serveur.
- Protection des routes sensibles (JWT).
- Limitation du spam (anti-flood sur offrandes/commentaires).
- Gestion des erreurs et feedback utilisateur.

## 6. Déploiement & Scalabilité

- Prévoir un fichier `.env.example` pour la configuration.
- Scripts de build et de lancement pour production.
- Hébergement MongoDB (Atlas ou serveur dédié).
- Déploiement sur plateforme cloud (Vercel, Heroku, etc).

---

**Ce plan est une base évolutive. À valider ou ajuster avant de démarrer le développement modulaire.**
