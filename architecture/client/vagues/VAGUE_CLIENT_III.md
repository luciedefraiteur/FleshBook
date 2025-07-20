# VAGUE CLIENT III – Le Routage et les Pages

Cette vague établit la structure de navigation de l'application FleshBook. L'objectif est de définir les routes principales, de créer les composants de page correspondants et d'implémenter la protection des routes nécessitant une authentification.

---

## ✴️ Objectifs de cette Vague III

1.  **Configuration du Routeur**: Mettre en place `react-router-dom` dans `AppRouter.jsx`.
2.  **Création des Pages**: Déplacer la logique de `App.jsx` vers des composants de page dédiés (`HomePage.jsx`, `LoginPage.jsx`, `RegisterPage.jsx`, `ProfilePage.jsx`).
3.  **Protection des Routes**: Implémenter le composant `PrivateRoute.jsx` pour sécuriser l'accès aux pages nécessitant une authentification.
4.  **Intégration dans `App.jsx`**: Utiliser `AppRouter` comme composant principal dans `App.jsx`.

---

## 🜃 Consignes techniques précises

*   **`client/src/routes/PrivateRoute.jsx`**: Créer ce composant.

    ```javascript
    import React from 'react';
    import { Route, Navigate } from 'react-router-dom';
    import { useAuth } from '../contexts/AuthContext';

    const PrivateRoute = ({ children }) => {
      const { token } = useAuth();
      return token ? children : <Navigate to="/login" />;
    };

    export default PrivateRoute;
    ```

*   **`client/src/pages/LoginPage.jsx`**: Créer la page de connexion.

    ```javascript
    import React from 'react';
    import ConnexionForm from '../features/auth/ConnexionForm';
    import InscriptionForm from '../features/auth/InscriptionForm';
    import { useAuth } from '../contexts/AuthContext';
    import { inscrireSinner, connecterSinner } from '../api/authApi';
    import { useNavigate } from 'react-router-dom';

    export default function LoginPage() {
      const { login } = useAuth();
      const navigate = useNavigate();
      const [loading, setLoading] = React.useState(false);
      const [message, setMessage] = React.useState('');

      async function handleRegister({ email, name, password }) {
        setLoading(true);
        const res = await inscrireSinner({ email, name, password });
        setLoading(false);
        setMessage(res.message || res.error);
      }

      async function handleLogin({ email, password }) {
        setLoading(true);
        const res = await connecterSinner({ email, password });
        setLoading(false);
        if (res.token) {
          login(res.token, res.user || null);
          setMessage('Connexion rituelle réussie.');
          navigate('/'); // Rediriger vers la page d'accueil après connexion
        } else {
          setMessage(res.error);
        }
      }

      return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #333', borderRadius: '8px', background: '#111' }}>
          <h2 style={{ color: '#e10600', textAlign: 'center' }}>Accès au Rituel</h2>
          <InscriptionForm onRegister={handleRegister} loading={loading} />
          <ConnexionForm onLogin={handleLogin} loading={loading} />
          {message && <div style={{ background: '#300', color: '#fff', padding: 8, borderRadius: 6, marginTop: 12 }}>{message}</div>}
        </div>
      );
    }
    ```

*   **`client/src/pages/HomePage.jsx`**: Créer la page d'accueil (Abîme).

    ```javascript
    import React, { useState, useEffect } from 'react';
    import AbimeFeed from '../features/feed/AbimeFeed';
    import OffrandeForm from '../features/feed/OffrandeForm';
    import { useAuth } from '../contexts/AuthContext';
    import { creerOffrande, getAbime } from '../api/offrandesApi';

    export default function HomePage() {
      const { token } = useAuth();
      const [abime, setAbime] = useState([]);
      const [loading, setLoading] = useState(false);
      const [message, setMessage] = useState('');

      useEffect(() => {
        if (token) {
          getAbime(token).then(res => {
            setAbime(Array.isArray(res) ? res : []);
          });
        }
      }, [token]);

      async function handleOffrande(text) {
        setLoading(true);
        const res = await creerOffrande({ token, text });
        setLoading(false);
        setMessage(res._id ? 'Offrande envoyée.' : res.message || res.error);
        if (res._id) {
          const updatedAbime = await getAbime(token);
          setAbime(Array.isArray(updatedAbime) ? updatedAbime : []);
        }
      }

      return (
        <>
          {token && <OffrandeForm onSubmit={handleOffrande} disabled={loading} />}
          <AbimeFeed offrandes={abime} />
          {message && <div style={{ background: '#300', color: '#fff', padding: 8, borderRadius: 6, marginTop: 12 }}>{message}</div>}
        </>
      );
    }
    ```

*   **`client/src/pages/ProfilePage.jsx`**: Créer la page de profil (simplifiée pour l'instant).

    ```javascript
    import React from 'react';
    import ProfilSinner from '../features/profile/ProfilSinner';
    import { useAuth } from '../contexts/AuthContext';

    export default function ProfilePage() {
      const { user } = useAuth();

      // Données factices pour le profil en attendant l'API
      const sinnerData = user ? {
        _id: user._id,
        name: user.nom,
        avatar: 'https://via.placeholder.com/150/800000/FFFFFF?text=Sinner',
        offrandes: [], // À remplir avec les offrandes de l'utilisateur
      } : null;

      if (!sinnerData) {
        return <div style={{ color: '#f5e6e6', textAlign: 'center', marginTop: '50px' }}>Chargement du profil...</div>;
      }

      return (
        <ProfilSinner sinnerData={sinnerData} onBackClick={() => { /* Gérer le retour */ }} />
      );
    }
    ```

*   **`client/src/routes/AppRouter.jsx`**: Créer le routeur principal.

    ```javascript
    import React from 'react';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    import HomePage from '../pages/HomePage';
    import LoginPage from '../pages/LoginPage';
    import ProfilePage from '../pages/ProfilePage';
    import PrivateRoute from './PrivateRoute';
    import Header from '../components/layout/Header';
    import Sidebar from '../components/layout/Sidebar';

    const AppRouter = () => {
      return (
        <Router>
          <div style={{ display: 'flex', minHeight: '100vh', background: 'radial-gradient(circle at top, #1a0505 0%, #0a0000 100%)' }}>
            <Sidebar /> {/* La sidebar sera gérée globalement ou via un contexte */}
            <div style={{ flex: 1, marginLeft: 180, maxWidth: 800, margin: '0 auto', minHeight: '100vh', fontFamily: 'EB Garamond, serif', background: 'rgba(26, 10, 10, 0.95)', color: '#f5e6e6', padding: 0, boxShadow: '0 0 30px rgba(128, 0, 0, 0.3)', position: 'relative', backdropFilter: 'blur(10px)', border: '1px solid rgba(128, 0, 0, 0.2)', borderTop: 'none', borderBottom: 'none' }}>
              <Header />
              <div style={{ padding: '24px 32px', position: 'relative' }}>
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<LoginPage />} /> {/* Inscription sur la même page pour l'instant */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
                  {/* Ajoutez d'autres routes ici */}
                  <Route path="*" element={<h1 style={{ color: '#b00', textAlign: 'center', marginTop: '50px' }}>404 - Abîme Inconnu</h1>} />
                </Routes>
              </div>
            </div>
          </div>
        </Router>
      );
    };

    export default AppRouter;
    ```

*   **`client/src/App.jsx`**: Simplifier `App.jsx` pour qu'il ne contienne que le `AuthProvider` et `AppRouter`.

    ```javascript
    import React from 'react';
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

---

## 📂 Résultat attendu

Une application avec une structure de routage claire, des pages dédiées pour les fonctionnalités principales, et une protection d'accès pour les routes sensibles. L'expérience utilisateur sera plus structurée et sécurisée.
