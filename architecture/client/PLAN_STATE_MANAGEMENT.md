# PLAN DE GESTION D'ÉTAT – CLIENT FLESHBOOK

Ce plan détaille l'approche de la gestion de l'état global et local dans l'application client de FleshBook, assurant une source unique de vérité, une réactivité optimale et une synchronisation efficace avec le backend.

---

## ✴️ Principes Fondamentaux

*   **Source Unique de Vérité**: Chaque donnée d'état a un propriétaire clair.
*   **Performance**: Minimiser les re-rendus inutiles.
*   **Maintenabilité**: Faciliter la compréhension et la modification des flux de données.
*   **Synchronisation**: Assurer la cohérence entre l'état client et les données du backend.

---

## 📊 Stratégies de Gestion d'État

### 1. État Global (Context API)

Pour les données accessibles par de nombreux composants à travers l'application, sans la complexité d'une bibliothèque de gestion d'état dédiée (Redux, Zustand).

*   **`AuthContext.jsx`**: Gère l'état d'authentification de l'utilisateur (`token`, `user`, `login`, `logout`). C'est le contexte le plus critique, car il conditionne l'accès à de nombreuses fonctionnalités.
    *   **Données**: `token` (JWT), `user` (objet Sinner simplifié: `_id`, `nom`, `email`, `rôles`).
    *   **Actions**: `login(token, user)`, `logout()`, `register(data)` (via API).
    *   **Persistance**: Le `token` et les informations de base de l'utilisateur peuvent être stockés dans le `localStorage` pour maintenir la session entre les rechargements de page.

*   **`ThemeContext.jsx` (Optionnel)**: Si des thèmes visuels complexes sont envisagés, un contexte dédié pourrait gérer les préférences de thème de l'utilisateur.

### 2. État Local (useState, useReducer)

Pour les données qui ne sont pertinentes que pour un composant spécifique ou un sous-arbre de composants.

*   **`useState`**: Pour la plupart des états simples (valeurs de formulaires, toggles, messages d'erreur temporaires).
*   **`useReducer`**: Pour les états plus complexes avec des transitions multiples ou des logiques de mise à jour interdépendantes (ex: gestion d'un formulaire multi-étapes, état d'un composant de filtre).

### 3. Gestion des Données Asynchrones (Hooks Personnalisés)

Pour gérer les appels API et leurs états associés (chargement, erreur, données).

*   **`useApi.js` (Hook Générique)**: Un hook personnalisé qui encapsule la logique de `fetch` ou `axios`, gérant les états `loading`, `error`, et `data`.
    ```javascript
    // Exemple d'utilisation
    const { data, loading, error, execute } = useApi(someApiCall);
    // ... execute() pour déclencher l'appel
    ```
*   **Hooks Spécifiques aux Entités**: Des hooks comme `useOffrandes()`, `useCercles()`, `useSinnerProfile()` qui utilisent `useApi` en interne et fournissent des fonctions pour interagir avec les données (ex: `addOffrande`, `updateCercle`).

### 4. Synchronisation avec le Backend

*   **Requêtes RESTful**: Utilisation des endpoints RESTful du backend pour toutes les opérations CRUD.
*   **Gestion des Erreurs**: Les erreurs du backend sont capturées et affichées de manière cohérente côté client.
*   **Revalidation des Données**: Après une modification (création, mise à jour, suppression), les données pertinentes sont rechargées ou mises à jour localement pour refléter les changements du backend.

---

## 🔗 Cohérence avec l'Architecture Serveur

*   **Modèles Partagés**: Bien que le client n'utilise pas Mongoose, la structure des données (`Sinner`, `Offrande`, `Cercle`, `Echo`) est directement calquée sur les schémas du backend, assurant une compatibilité des données.
*   **Authentification**: Le `AuthContext` est directement lié au système d'authentification JWT du backend.
*   **Endpoints API**: Les appels API sont structurés pour correspondre aux routes définies dans le backend (`/api/auth`, `/api/offrandes`, etc.).

---

Ce plan assure une gestion d'état robuste et prévisible, essentielle pour une application complexe et interactive comme FleshBook.
