# VAGUE CLIENT VI – L'Intégration des Cercles et des Échos

Cette vague vise à compléter l'intégration des fonctionnalités sociales de FleshBook en permettant aux utilisateurs de visualiser et d'interagir avec les Cercles et les Échos. L'objectif est de rendre l'application pleinement interactive et de refléter la structure communautaire du backend.

---

## ✴️ Objectifs de cette Vague VI

1.  **Affichage des Cercles**: Créer une page pour lister les Cercles et une page pour afficher les détails d'un Cercle spécifique.
2.  **Interaction avec les Échos**: Permettre aux utilisateurs de voir les Échos sous les Offrandes et d'en créer de nouveaux.
3.  **Mise à Jour de la Sidebar**: Afficher les Cercles de l'utilisateur dans la Sidebar.

---

## 🜃 Consignes techniques précises

*   **`client/src/api/cerclesApi.js`**: Créer un nouveau fichier pour les appels API liés aux Cercles.

    ```javascript
    const API_URL = 'http://localhost:5000';

    export async function getCercles(token) {
      const res = await fetch(`${API_URL}/api/cercles`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return res.json();
    }

    export async function getCercleById({ token, id }) {
      const res = await fetch(`${API_URL}/api/cercles/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return res.json();
    }

    export async function createCercle({ token, nom }) {
      const res = await fetch(`${API_URL}/api/cercles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nom })
      });
      return res.json();
    }
    ```

*   **`client/src/api/echosApi.js`**: Créer un nouveau fichier pour les appels API liés aux Échos.

    ```javascript
    const API_URL = 'http://localhost:5000';

    export async function getEchosForOffrande({ token, offrandeId }) {
      const res = await fetch(`${API_URL}/api/echos/offrande/${offrandeId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return res.json();
    }

    export async function createEcho({ token, offrandeId, contenu }) {
      const res = await fetch(`${API_URL}/api/echos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ offrandeId, contenu })
      });
      return res.json();
    }
    ```

*   **`client/src/pages/CerclesPage.jsx`**: Créer une page pour lister les cercles.

    ```javascript
    import React, { useEffect, useState } from 'react';
    import { Link } from 'react-router-dom';
    import { useAuth } from '../contexts/AuthContext';
    import { getCercles, createCercle } from '../api/cerclesApi';
    import useApi from '../hooks/useApi';
    import Input from '../components/common/Input';
    import Button from '../components/common/Button';

    export default function CerclesPage() {
      const { token } = useAuth();
      const [nomCercle, setNomCercle] = useState('');

      const { data: cercles, loading: cerclesLoading, error: cerclesError, execute: fetchCercles } = useApi(getCercles);
      const { loading: createLoading, error: createError, execute: executeCreateCercle } = useApi(createCercle);

      useEffect(() => {
        if (token) {
          fetchCercles(token);
        }
      }, [token, fetchCercles]);

      const handleCreateCercle = async (e) => {
        e.preventDefault();
        if (!nomCercle) return;
        const res = await executeCreateCercle({ token, nom: nomCercle });
        if (res && !res.error) {
          setNomCercle('');
          fetchCercles(token); // Recharger la liste des cercles
        }
      };

      if (cerclesLoading) return <div style={{ color: '#f5e6e6', textAlign: 'center', marginTop: '50px' }}>Chargement des cercles...</div>;
      if (cerclesError) return <div style={{ background: '#300', color: '#fff', padding: 8, borderRadius: 6, marginTop: 12 }}>Erreur: {cerclesError}</div>;

      return (
        <div style={{ padding: '24px 32px' }}>
          <h1 style={{ color: '#e10600', textAlign: 'center' }}>Les Cercles</h1>
          <form onSubmit={handleCreateCercle} style={{ marginBottom: '20px' }}>
            <Input
              placeholder="Nom du nouveau Cercle"
              value={nomCercle}
              onChange={(e) => setNomCercle(e.target.value)}
            />
            <Button type="submit" loading={createLoading}>Créer un Cercle</Button>
            {createError && <div style={{ background: '#300', color: '#fff', padding: 8, borderRadius: 6, marginTop: 12 }}>Erreur: {createError}</div>}
          </form>

          {cercles && cercles.length > 0 ? (
            <ul>
              {cercles.map(cercle => (
                <li key={cercle._id} style={{ marginBottom: '10px' }}>
                  <Link to={`/cercles/${cercle._id}`} style={{ color: '#f5e6e6', textDecoration: 'none' }}>
                    {cercle.nom} ({cercle.utilisateurs.length} membres)
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: '#a88' }}>Aucun cercle trouvé.</p>
          )}
        </div>
      );
    }
    ```

*   **`client/src/pages/CercleDetailsPage.jsx`**: Créer une page pour afficher les détails d'un cercle.

    ```javascript
    import React, { useEffect } from 'react';
    import { useParams } from 'react-router-dom';
    import { useAuth } from '../contexts/AuthContext';
    import { getCercleById } from '../api/cerclesApi';
    import useApi from '../hooks/useApi';

    export default function CercleDetailsPage() {
      const { id } = useParams();
      const { token } = useAuth();

      const { data: cercle, loading, error, execute: fetchCercle } = useApi(getCercleById);

      useEffect(() => {
        if (token && id) {
          fetchCercle({ token, id });
        }
      }, [token, id, fetchCercle]);

      if (loading) return <div style={{ color: '#f5e6e6', textAlign: 'center', marginTop: '50px' }}>Chargement du cercle...</div>;
      if (error) return <div style={{ background: '#300', color: '#fff', padding: 8, borderRadius: 6, marginTop: 12 }}>Erreur: {error}</div>;
      if (!cercle) return <div style={{ color: '#f5e6e6', textAlign: 'center', marginTop: '50px' }}>Cercle non trouvé.</div>;

      return (
        <div style={{ padding: '24px 32px' }}>
          <h1 style={{ color: '#e10600' }}>Cercle: {cercle.nom}</h1>
          <h2 style={{ color: '#f5e6e6' }}>Membres:</h2>
          <ul>
            {cercle.utilisateurs.map(user => (
              <li key={user._id} style={{ color: '#a88' }}>{user.nom}</li>
            ))}
          </ul>
          {/* Ici, on pourrait ajouter les offrandes spécifiques à ce cercle */}
        </div>
      );
    }
    ```

*   **`client/src/features/feed/AbimeFeed.jsx`**: Modifier pour afficher les Échos sous chaque Offrande et permettre d'en ajouter.

    ```javascript
    import React, { useState, useEffect } from 'react';
    import { Link } from 'react-router-dom';
    import Input from '../../components/common/Input';
    import Button from '../../components/common/Button';
    import { useAuth } from '../../contexts/AuthContext';
    import { getEchosForOffrande, createEcho } from '../../api/echosApi';
    import useApi from '../../hooks/useApi';
    import '../../styles/animations.scss';
    import './abimeFeed.scss';

    export default function AbimeFeed({ offrandes }) {
      const { token } = useAuth();

      const OffrandeItem = ({ offrande }) => {
        const [showComments, setShowComments] = useState(false);
        const [newComment, setNewComment] = useState('');

        const { data: echos, loading: echosLoading, error: echosError, execute: fetchEchos } = useApi(getEchosForOffrande);
        const { loading: createEchoLoading, error: createEchoError, execute: executeCreateEcho } = useApi(createEcho);

        useEffect(() => {
          if (showComments && token && offrande._id) {
            fetchEchos({ token, offrandeId: offrande._id });
          }
        }, [showComments, token, offrande._id, fetchEchos]);

        const handleAddComment = async (e) => {
          e.preventDefault();
          if (!newComment.trim()) return;
          const res = await executeCreateEcho({ token, offrandeId: offrande._id, contenu: newComment });
          if (res && !res.error) {
            setNewComment('');
            fetchEchos({ token, offrandeId: offrande._id }); // Recharger les échos
          }
        };

        return (
          <li key={offrande._id} className="post-item hover-lift">
            <div className="post-header">
              <span className="post-author animate-hell-glow">
                {offrande.utilisateur ? (
                  <Link to={`/profile/${offrande.utilisateur._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {offrande.utilisateur.nom || 'Anonyme'}
                  </Link>
                ) : (
                  'Anonyme'
                )}
              </span>
            </div>
            <div className="post-content">
              {offrande.contenu}
            </div>
            <div className="post-timestamp">
              {new Date(offrande.date).toLocaleString('fr-FR', {
                dateStyle: 'long',
                timeStyle: 'short'
              })}
            </div>
            <button onClick={() => setShowComments(!showComments)} style={{ marginTop: '10px', background: 'none', border: 'none', color: '#a88', cursor: 'pointer' }}>
              {showComments ? 'Masquer les Échos' : `Voir les Échos (${echos ? echos.length : 0})`}
            </button>

            {showComments && (
              <div className="comments-section">
                {echosLoading && <p style={{ color: '#a88' }}>Chargement des échos...</p>}
                {echosError && <p style={{ background: '#300', color: '#fff', padding: 8, borderRadius: 6, marginTop: 12 }}>Erreur: {echosError}</p>}
                {echos && echos.length > 0 ? (
                  <ul>
                    {echos.map(echo => (
                      <li key={echo._id} style={{ marginBottom: '5px', borderLeft: '2px solid #800', paddingLeft: '10px' }}>
                        <span style={{ fontWeight: 'bold', color: '#f5e6e6' }}>{echo.utilisateur.nom}: </span>
                        <span style={{ color: '#a88' }}>{echo.contenu}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ color: '#a88' }}>Aucun écho pour l'instant.</p>
                )}
                <form onSubmit={handleAddComment} style={{ marginTop: '10px' }}>
                  <Input
                    placeholder="Ajouter un écho..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <Button type="submit" loading={createEchoLoading}>Écho</Button>
                  {createEchoError && <p className="error-message">{createEchoError}</p>}
                </form>
              </div>
            )}
          </li>
        );
      };

      return (
        <section className="abime-feed animate-pulse">
          <div className="abime-feed-header" />
          <h2 className="blood-text abime-feed-title animate-hell-glow">L'Abîme</h2>
          {offrandes.length === 0 ? (
            <div className="ritual-container animate-smoke">
              Aucune offrande n'a encore été versée dans l'Abîme…
            </div>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {offrandes.map(offrande => (
                <OffrandeItem key={offrande._id} offrande={offrande} />
              ))}
            </ul>
          )}
        </section>
      );
    }
    ```

*   **`client/src/routes/AppRouter.jsx`**: Ajouter les routes pour les Cercles.

    ```javascript
    // ... (imports existants)
    import CerclesPage from '../pages/CerclesPage';
    import CercleDetailsPage from '../pages/CercleDetailsPage';

    const AppRouter = () => {
      return (
        <Router>
          {/* ... */}
          <Routes>
            {/* ... */}
            <Route path="/cercles" element={<PrivateRoute><CerclesPage /></PrivateRoute>} />
            <Route path="/cercles/:id" element={<PrivateRoute><CercleDetailsPage /></PrivateRoute>} />
            {/* ... */}
          </Routes>
          {/* ... */}
        </Router>
      );
    };
    ```

*   **`client/src/components/layout/Sidebar.jsx`**: Ajouter un lien vers la page des Cercles.

    ```javascript
    // ... (imports existants)
    import { Link } from 'react-router-dom';

    export default function Sidebar({ enchaines = [], corrompus = [], onProfileClick }) {
      // ...
      return (
        <aside className="sidebar theme-transition">
          {isConnected ? (
            <>
              {/* ... Sections Enchaînés et Corrompus */}
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <Link to="/cercles" style={{ color: '#e10600', textDecoration: 'none', fontWeight: 'bold' }}>
                  Voir les Cercles
                </Link>
              </div>
              {/* ... */}
            </>
          ) : (
            // ...
          )}
        </aside>
      );
    }
    ```

---

## 📂 Résultat attendu

Une application FleshBook où les utilisateurs peuvent explorer les Cercles, créer et visualiser les Échos sous les Offrandes, et naviguer de manière plus interconnectée. Le système social est désormais pleinement fonctionnel.
