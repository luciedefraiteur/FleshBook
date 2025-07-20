# PLAN D'ARCHITECTURE – CLIENT FLESHBOOK

Ce document définit l'architecture du client React de FleshBook. L'objectif est de créer une structure de projet claire, maintenable et évolutive, qui reflète l'esthétique sombre et les thèmes rituels de l'application.

---

## ✴️ Philosophie Directrice

1.  **Séparation des Responsabilités (SoC)**: Chaque partie de l'application a un rôle unique et bien défini.
2.  **Modularité**: Le code est organisé en modules fonctionnels (features) pour faciliter la compréhension et la réutilisation.
3.  **Convention sur la Configuration**: Utiliser les conventions de nommage et de style existantes pour une cohérence totale.

---

## 📂 Structure de Dossiers Proposée

Basée sur la structure actuelle, nous allons l'affiner en adoptant une approche orientée "feature".

```
client/src/
│
├── **api/**          # Centralise toutes les interactions avec le backend.
│   ├── authApi.js      # Appels liés à l'authentification (login, register).
│   ├── offrandesApi.js # Appels CRUD pour les Offrandes.
│   ├── cerclesApi.js   # Appels CRUD pour les Cercles.
│   └── ... (et ainsi de suite pour chaque entité du backend).
│
├── **assets/**       # Fichiers statiques (images, polices, icônes).
│   ├── fonts/
│   ├── icons/
│   └── images/
│
├── **components/**   # Composants UI réutilisables et globaux.
│   ├── **common/**     # Atomes UI (Button, Input, Card, Spinner...).
│   │   ├── Button.jsx
│   │   └── Input.jsx
│   ├── **layout/**     # Composants de structure (Header, Sidebar, Footer, Layout).
│   │   ├── Header.jsx
│   │   └── Layout.jsx
│   └── **ui/**         # Composants plus complexes (Modal, Notifications...).
│       └── Modal.jsx
│
├── **constants/**    # Constantes de l'application.
│   ├── routes.js     # Chemins des routes de l'application.
│   └── config.js     # Configuration générale (URL de l'API, etc.).
│
├── **contexts/**     # Contexte React pour la gestion d'état global.
│   ├── AuthContext.jsx # Gère l'état de l'utilisateur et les tokens JWT.
│   └── ThemeContext.jsx  # Pour basculer entre thèmes (ex: Clair/Sombre).
│
├── **features/**     # Dossiers par fonctionnalité métier (le cœur de l'app).
│   ├── **auth/**
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── **feed/**
│   │   ├── AbimeFeed.jsx
│   │   └── Offrande.jsx
│   ├── **profile/**
│   │   ├── ProfilePage.jsx
│   │   └── EditProfile.jsx
│   └── **cercles/**
│       ├── CercleList.jsx
│       └── CercleDetails.jsx
│
├── **hooks/**        # Hooks React personnalisés.
│   ├── useAuth.js      # Hook pour accéder facilement à AuthContext.
│   └── useApi.js       # Hook générique pour gérer les appels API (loading, error, data).
│
├── **pages/**        # Composants de haut niveau qui représentent les pages de l'application.
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   ├── ProfilePage.jsx
│   └── ...
│
├── **routes/**       # Configuration du routing.
│   ├── AppRouter.jsx   # Définit toutes les routes de l'application.
│   └── PrivateRoute.jsx # Wrapper pour les routes nécessitant une authentification.
│
├── **styles/**       # Fichiers de style globaux et variables SASS.
│   ├── _variables.scss # Couleurs, polices, mixins SASS.
│   ├── _base.scss      # Styles de base (reset, typographie).
│   ├── _animations.scss
│   └── main.scss       # Point d'entrée principal qui importe tous les autres.
│
├── **utils/**        # Fonctions utilitaires diverses.
│   ├── validators.js   # Fonctions de validation pour les formulaires.
│   └── date.js         # Fonctions de formatage de date.
│
├── App.jsx           # Composant racine de l'application.
├── main.jsx          # Point d'entrée de l'application (rendu de <App />).
└── index.css         # Styles globaux de base.

```

---

## 🜃 Justification des Changements

*   **`api/`**: Sépare la logique de communication réseau du reste de l'application, ce qui la rend plus facile à maintenir et à tester.
*   **`features/`**: C'est le changement le plus important. Organiser par fonctionnalité (authentification, fil d'actualité, profil) plutôt que par type de fichier (tous les composants dans un seul dossier) rend le code plus facile à trouver, à comprendre et à faire évoluer. Chaque dossier "feature" est un mini-module quasi-autonome.
*   **`pages/`**: Clarifie quels composants sont des "pages" complètes, qui assemblent des composants plus petits des dossiers `features` et `components`.
*   **`hooks/`**: Centralise la logique réutilisable et complexe, allégeant les composants.
*   **`routes/`**: Dédie un dossier à la configuration du routage, ce qui est plus propre lorsque l'application a de nombreuses routes et des logiques de protection.
*   **`constants/`**: Regroupe les valeurs magiques et les chaînes de caractères en un seul endroit.

Cette architecture est un guide. L'implémentation se fera progressivement, en commençant par la réorganisation des fichiers existants dans cette nouvelle structure.
