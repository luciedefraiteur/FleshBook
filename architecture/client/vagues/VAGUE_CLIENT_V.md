# VAGUE CLIENT V – L'Expérience Utilisateur Avancée

Cette vague vise à enrichir l'expérience utilisateur de FleshBook en implémentant des fonctionnalités clés liées aux profils des Sinners, à la navigation dynamique et à l'affichage des données complexes du backend. L'objectif est de rendre l'application plus interactive et personnalisée.

---

## ✴️ Objectifs de cette Vague V

1.  **Affichage du Profil Sinner**: Récupérer et afficher les données du profil du Sinner connecté et d'autres Sinners.
2.  **Mise à Jour du Profil**: Permettre au Sinner de modifier ses informations de profil.
3.  **Navigation Dynamique**: Intégrer la navigation vers les profils des Sinners depuis la Sidebar et le fil de l'Abîme.
4.  **Affichage des Cercles et Offrandes Liées**: Afficher les cercles et les offrandes associées aux profils des Sinners.

---

## 🜃 Consignes techniques précises

*   **`client/src/api/sinnersApi.js`**: Créer un nouveau fichier pour les appels API liés aux Sinners.

    ```javascript
    const API_URL = 'http://localhost:5000';

    export async function getSinnerProfile(token) {
      const res = await fetch(`${API_URL}/api/sinners/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return res.json();
    }

    export async function updateSinnerProfile({ token, data }) {
      const res = await fetch(`${API_URL}/api/sinners/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      return res.json();
    }

    export async function getSinnerById({ token, id }) {
      const res = await fetch(`${API_URL}/api/sinners/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return res.json();
    }
    ```

*   **`client/src/pages/ProfilePage.jsx`**: Mettre à jour la page de profil pour récupérer les données via l'API.

    ```javascript
    import React, { useState, useEffect } from 'react';
    import { useParams } from 'react-router-dom';
    import ProfilSinner from '../features/profile/ProfilSinner';
    import { useAuth } from '../contexts/AuthContext';
    import { getSinnerProfile, getSinnerById, updateSinnerProfile } from '../api/sinnersApi';
    import useApi from '../hooks/useApi';

    export default function ProfilePage() {
      const { user, token } = useAuth();
      const { id } = useParams(); // ID du sinner à afficher (si différent de l'utilisateur connecté)
      const [displaySinner, setDisplaySinner] = useState(null);

      const { execute: fetchMyProfile, data: myProfileData, loading: myProfileLoading, error: myProfileError } = useApi(getSinnerProfile);
      const { execute: fetchOtherProfile, data: otherProfileData, loading: otherProfileLoading, error: otherProfileError } = useApi(getSinnerById);
      const { execute: executeUpdateProfile, loading: updateLoading, error: updateError } = useApi(updateSinnerProfile);

      useEffect(() => {
        if (token) {
          if (id && id !== user._id) {
            // Afficher le profil d'un autre Sinner
            fetchOtherProfile({ token, id });
          } else {
            // Afficher le profil de l'utilisateur connecté
            fetchMyProfile(token);
          }
        }
      }, [token, id, user, fetchMyProfile, fetchOtherProfile]);

      useEffect(() => {
        if (id && id !== user._id) {
          setDisplaySinner(otherProfileData);
        } else {
          setDisplaySinner(myProfileData);
        }
      }, [myProfileData, otherProfileData, id, user]);

      const handleUpdateProfile = async (formData) => {
        const res = await executeUpdateProfile({ token, data: formData });
        if (res && !res.error) {
          // Gérer le succès de la mise à jour
          console.log('Profil mis à jour:', res);
          // Recharger le profil après mise à jour
          fetchMyProfile(token);
        }
      };

      if (myProfileLoading || otherProfileLoading) {
        return <div style={{ color: '#f5e6e6', textAlign: 'center', marginTop: '50px' }}>Chargement du profil...</div>;
      }

      if (myProfileError || otherProfileError) {
        return <div style={{ background: '#300', color: '#fff', padding: 8, borderRadius: 6, marginTop: 12 }}>Erreur: {myProfileError || otherProfileError}</div>;
      }

      if (!displaySinner) {
        return <div style={{ color: '#f5e6e6', textAlign: 'center', marginTop: '50px' }}>Profil non trouvé.</div>;
      }

      return (
        <ProfilSinner
          sinnerData={displaySinner}
          onBackClick={() => window.history.back()} // Simple retour en arrière
          onUpdateProfile={handleUpdateProfile} // Passer la fonction de mise à jour
          isCurrentUser={!id || id === user._id} // Indiquer si c'est le profil de l'utilisateur connecté
          updateLoading={updateLoading}
          updateError={updateError}
        />
      );
    }
    ```

*   **`client/src/features/profile/ProfilSinner.jsx`**: Adapter le composant pour afficher les données réelles et permettre la mise à jour.

    ```javascript
    import React, { useState } from 'react';
    import { Link } from 'react-router-dom';
    import Input from '../../components/common/Input';
    import Button from '../../components/common/Button';
    import './profilSinner.scss';

    export default function ProfilSinner({ sinnerData, onBackClick, onUpdateProfile, isCurrentUser, updateLoading, updateError }) {
      const [isEditing, setIsEditing] = useState(false);
      const [name, setName] = useState(sinnerData.nom || '');
      const [email, setEmail] = useState(sinnerData.email || '');

      const handleSave = () => {
        onUpdateProfile({ nom: name, email: email });
        setIsEditing(false);
      };

      return (
        <section className="profil-sinner">
          <header className="profil-header">
            <button className="back-button" onClick={onBackClick}>↩ Retour</button>
            <h1 className="profil-title">↘︎ Profil de {sinnerData.nom}</h1>
          </header>
          <div className="profil-info">
            <img src="https://via.placeholder.com/150/800000/FFFFFF?text=Sinner" alt={sinnerData.nom} className="profil-avatar" />
            {isEditing ? (
              <>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom" />
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <Button onClick={handleSave} loading={updateLoading}>Sauvegarder</Button>
                {updateError && <p className="error-message">{updateError}</p>}
              </>
            ) : (
              <>
                <h2 className="profil-name">{sinnerData.nom}</h2>
                {isCurrentUser && <p className="profil-email">{sinnerData.email}</p>}
                {isCurrentUser && <Button onClick={() => setIsEditing(true)}>Modifier le profil</Button>}
              </>
            )}
          </div>

          <div className="profil-cercles">
            <h3>Cercles:</h3>
            {sinnerData.cercles && sinnerData.cercles.length > 0 ? (
              <ul>
                {sinnerData.cercles.map(cercle => (
                  <li key={cercle._id}><Link to={`/cercles/${cercle._id}`}>{cercle.nom}</Link></li>
                ))}
              </ul>
            ) : (
              <p>Aucun cercle pour l'instant.</p>
            )}
          </div>

          <div className="profil-offrandes">
            <h3>Offrandes:</h3>
            {sinnerData.offrandes && sinnerData.offrandes.length > 0 ? (
              <ul>
                {sinnerData.offrandes.map(offrande => (
                  <li key={offrande._id} className="offrande-item">
                    <p className="offrande-text">{offrande.contenu}</p>
                    <span className="offrande-date">{new Date(offrande.date).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucune offrande pour l'instant.</p>
            )}
          </div>
        </section>
      );
    }
    ```

*   **`client/src/components/layout/Sidebar.jsx`**: Mettre à jour la Sidebar pour inclure des liens vers les profils des Sinners.

    ```javascript
    // ... (imports existants)
    import { Link } from 'react-router-dom';

    // ... (UserItem et UserSection existants)

    // Dans UserItem, le Link est déjà présent, s'assurer qu'il pointe vers /profile/:id
    // <Link to={`/profile/${user._id}`} className="sidebar-user-link">
    ```

*   **`client/src/features/feed/AbimeFeed.jsx`**: Mettre à jour pour inclure des liens vers les profils des auteurs d'offrandes.

    ```javascript
    // ... (imports existants)
    import { Link } from 'react-router-dom';

    export default function AbimeFeed({ offrandes }) {
      return (
        // ...
        <span className="post-author animate-hell-glow">
          {offrande.utilisateur ? (
            <Link to={`/profile/${offrande.utilisateur._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
              {offrande.utilisateur.nom || 'Anonyme'}
            </Link>
          ) : (
            'Anonyme'
          )}
        </span>
        // ...
      );
    }
    ```

*   **`client/src/routes/AppRouter.jsx`**: Ajouter la route pour le profil par ID.

    ```javascript
    // ... (imports existants)
    <Route path="/profile/:id" element={<ProfilePage />} />
    ```

---

## 📂 Résultat attendu

Une application plus riche et interactive. Les utilisateurs peuvent consulter et modifier leurs profils, naviguer vers les profils d'autres Sinners, et voir les liens entre les Offrandes et leurs auteurs, ainsi que les Cercles associés.
