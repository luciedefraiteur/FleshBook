# VAGUE CLIENT IV – La Gestion des Données et des Erreurs

Cette vague vise à centraliser et à standardiser la manière dont l'application client interagit avec le backend et gère les erreurs. L'objectif est d'améliorer la robustesse, la maintenabilité et l'expérience utilisateur en fournissant un feedback clair sur l'état des opérations.

---

## ✴️ Objectifs de cette Vague IV

1.  **Hook `useApi`**: Créer un hook générique pour encapsuler la logique des appels API (chargement, erreur, données).
2.  **Gestion des Erreurs Globales**: Mettre en place un mécanisme pour afficher les messages d'erreur provenant des appels API.
3.  **Intégration des Hooks**: Utiliser `useApi` dans les pages et composants qui effectuent des requêtes au backend.

---

## 🜃 Consignes techniques précises

*   **`client/src/hooks/useApi.js`**: Créer ce hook.

    ```javascript
    import { useState, useCallback } from 'react';

    const useApi = (apiFunction) => {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

      const execute = useCallback(async (...args) => {
        setLoading(true);
        setError(null);
        try {
          const result = await apiFunction(...args);
          if (result.error) {
            setError(result.error);
            setData(null);
          } else {
            setData(result);
          }
          return result;
        } catch (err) {
          setError(err.message || 'Une erreur inattendue est survenue.');
          setData(null);
          return { error: err.message || 'Une erreur inattendue est survenue.' };
        } finally {
          setLoading(false);
        }
      }, [apiFunction]);

      return { data, loading, error, execute };
    };

    export default useApi;
    ```

*   **`client/src/App.jsx`**: Ajouter un état pour les messages globaux et un composant pour les afficher.

    ```javascript
    // ... (imports existants)
    import { AuthProvider } from './contexts/AuthContext';
    import AppRouter from './routes/AppRouter';
    import './styles/main.scss';

    export default function App() {
      return (
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      );
    }
    ```

*   **`client/src/pages/LoginPage.jsx`**: Utiliser `useApi` pour les appels d'authentification.

    ```javascript
    import React, { useState } from 'react';
    import ConnexionForm from '../features/auth/ConnexionForm';
    import InscriptionForm from '../features/auth/InscriptionForm';
    import { useAuth } from '../contexts/AuthContext';
    import { inscrireSinner, connecterSinner } from '../api/authApi';
    import { useNavigate } from 'react-router-dom';
    import useApi from '../hooks/useApi'; // Import du hook

    export default function LoginPage() {
      const { login } = useAuth();
      const navigate = useNavigate();

      const { loading: registerLoading, error: registerError, execute: executeRegister } = useApi(inscrireSinner);
      const { loading: loginLoading, error: loginError, execute: executeLogin } = useApi(connecterSinner);

      async function handleRegister(formData) {
        const res = await executeRegister(formData);
        if (res && !res.error) {
          // Gérer le succès de l'inscription (ex: afficher un message, rediriger)
          console.log('Inscription réussie:', res);
        }
      }

      async function handleLogin(formData) {
        const res = await executeLogin(formData);
        if (res && res.token) {
          login(res.token, res.user || null);
          navigate('/');
        }
      }

      return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #333', borderRadius: '8px', background: '#111' }}>
          <h2 style={{ color: '#e10600', textAlign: 'center' }}>Accès au Rituel</h2>
          {registerError && <div style={{ background: '#300', color: '#fff', padding: 8, borderRadius: 6, marginTop: 12 }}>{registerError}</div>}
          {loginError && <div style={{ background: '#300', color: '#fff', padding: 8, borderRadius: 6, marginTop: 12 }}>{loginError}</div>}
          <InscriptionForm onRegister={handleRegister} loading={registerLoading} />
          <ConnexionForm onLogin={handleLogin} loading={loginLoading} />
        </div>
      );
    }
    ```

*   **`client/src/pages/HomePage.jsx`**: Utiliser `useApi` pour les appels d'offrandes.

    ```javascript
    import React, { useState, useEffect } from 'react';
    import AbimeFeed from '../features/feed/AbimeFeed';
    import OffrandeForm from '../features/feed/OffrandeForm';
    import { useAuth } from '../contexts/AuthContext';
    import { creerOffrande, getAbime } from '../api/offrandesApi';
    import useApi from '../hooks/useApi'; // Import du hook

    export default function HomePage() {
      const { token } = useAuth();
      const [abime, setAbime] = useState([]);

      const { loading: offrandeLoading, error: offrandeError, execute: executeCreerOffrande } = useApi(creerOffrande);
      const { loading: abimeLoading, error: abimeError, execute: executeGetAbime } = useApi(getAbime);

      useEffect(() => {
        if (token) {
          executeGetAbime(token).then(res => {
            setAbime(Array.isArray(res) ? res : []);
          });
        }
      }, [token, executeGetAbime]);

      async function handleOffrande(text) {
        const res = await executeCreerOffrande({ token, text });
        if (res && !res.error) {
          const updatedAbime = await executeGetAbime(token);
          setAbime(Array.isArray(updatedAbime) ? updatedAbime : []);
        }
      }

      return (
        <>
          {offrandeError && <div style={{ background: '#300', color: '#fff', padding: 8, borderRadius: 6, marginTop: 12 }}>{offrandeError}</div>}
          {abimeError && <div style={{ background: '#300', color: '#fff', padding: 8, borderRadius: 6, marginTop: 12 }}>{abimeError}</div>}
          {token && <OffrandeForm onSubmit={handleOffrande} disabled={offrandeLoading} />}
          <AbimeFeed offrandes={abime} />
        </>
      );
    }
    ```

---

## 📂 Résultat attendu

Une gestion des appels API et des erreurs plus propre et réutilisable. Les utilisateurs recevront un feedback clair en cas de problème, améliorant ainsi l'expérience globale de l'application.
