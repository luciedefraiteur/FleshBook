# PLAN DE ROUTING ET NAVIGATION – CLIENT FLESHBOOK

Ce plan définit la structure de navigation et de routage de l'application client de FleshBook, assurant une expérience utilisateur fluide et sécurisée, en accord avec les principes d'accès et de protection des données du backend.

---

## ✴️ Principes Fondamentaux

*   **Clarté**: Des chemins d'URL intuitifs et significatifs.
*   **Sécurité**: Protection des routes sensibles nécessitant une authentification.
*   **Flexibilité**: Facilité d'ajout de nouvelles routes et de gestion des redirections.
*   **Expérience Utilisateur**: Navigation fluide et gestion des états de chargement/erreur.

---

## 🗺️ Structure de Routage

Nous utiliserons `react-router-dom` pour gérer la navigation côté client.

### 1. Routes Principales

*   **`/` (Page d'Accueil / Abîme)**: Le flux principal des Offrandes. Accessible à tous, mais les fonctionnalités interactives nécessitent une connexion.
*   **`/login`**: Page de connexion pour les Sinners.
*   **`/register`**: Page d'inscription pour les nouveaux Sinners.
*   **`/profile`**: Profil du Sinner connecté. Nécessite une authentification.
*   **`/profile/:id`**: Profil public d'un autre Sinner. Peut être accessible sans authentification pour une consultation limitée, mais les détails complets nécessitent une connexion.
*   **`/offrandes/:id`**: Vue détaillée d'une Offrande spécifique.
*   **`/cercles`**: Liste des Cercles auxquels le Sinner appartient (si connecté) ou liste des cercles publics.
*   **`/cercles/:id`**: Vue détaillée d'un Cercle spécifique.
*   **`/404`**: Page d'erreur pour les routes non trouvées.

### 2. Routes Protégées

Les routes nécessitant une authentification seront enveloppées dans un composant `PrivateRoute`.

*   **`PrivateRoute.jsx`**: Un composant qui vérifie la présence d'un `token` d'authentification. Si le `token` est absent ou invalide, l'utilisateur est redirigé vers la page de connexion.

    ```javascript
    import React from 'react';
    import { Route, Redirect } from 'react-router-dom';
    import { useAuth } from '../contexts/AuthContext';

    const PrivateRoute = ({ component: Component, ...rest }) => {
      const { token } = useAuth();
      return (
        <Route
          {...rest}
          render={props =>
            token ? (
              <Component {...props} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      );
    };

    export default PrivateRoute;
    ```

### 3. Configuration du Routeur

Le fichier `AppRouter.jsx` (ou directement dans `App.jsx` si le routage est simple) centralisera la définition de toutes les routes.

*   **`routes/AppRouter.jsx`**:

    ```javascript
    import React from 'react';
    import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
    import HomePage from '../pages/HomePage';
    import LoginPage from '../pages/LoginPage';
    import RegisterPage from '../pages/RegisterPage';
    import ProfilePage from '../pages/ProfilePage';
    import PrivateRoute from './PrivateRoute';
    // ... autres imports de pages

    const AppRouter = () => {
      return (
        <Router>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <PrivateRoute path="/profile" component={ProfilePage} exact />
            <Route path="/profile/:id" component={ProfilePage} /> {/* Public view */}
            <Route path="/" component={HomePage} exact />
            {/* ... autres routes publiques */}
            <Route component={() => <div>404 - Page non trouvée</div>} />
          </Switch>
        </Router>
      );
    };

    export default AppRouter;
    ```

### 4. Redirections et Gestion des Erreurs de Route

*   **Redirections**: Utilisation de `Redirect` de `react-router-dom` pour les redirections conditionnelles (ex: après connexion).
*   **404**: Une route générique en fin de `Switch` pour capturer toutes les routes non définies.

---

## 🔗 Cohérence avec l'Architecture Serveur

*   **Endpoints d'Authentification**: Les routes `/login` et `/register` du client interagissent directement avec les endpoints `/api/auth/login` et `/api/auth/register` du backend.
*   **Protection des Routes**: Le `PrivateRoute` côté client reflète la protection des routes du backend par le middleware d'authentification.
*   **Identifiants**: L'utilisation de `:id` dans les routes client correspond aux identifiants d'entités (`_id`) du backend.

---

Ce plan assure une navigation claire et sécurisée, essentielle pour une application où l'accès aux données est conditionné par l'identité du Sinner.
