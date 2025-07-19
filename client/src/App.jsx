import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import AbimeFeed from './components/AbimeFeed';
import OffrandeForm from './components/OffrandeForm';
import ConnexionForm from './components/ConnexionForm';
import InscriptionForm from './components/InscriptionForm';
import Sidebar from './components/Sidebar';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { inscrireSinner, connecterSinner, creerOffrande, getAbime } from './utils/api';
import ProfilSinner from './components/ProfilSinner';


function MainApp() {
  const { token, user, login, logout } = useAuth();
  const [abime, setAbime] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [profileToShow, setProfileToShow] = useState(null);
  const [enchaines, setEnchaines] = useState([]);
  const [corrompus, setCorrompus] = useState([]);

  // Adding debug logs to trace execution
  console.log('MainApp rendu');
  console.log('Données abime:', abime);
  console.log('Données enchaines:', enchaines);
  console.log('Données corrompus:', corrompus);

  // Charge le fil d’offrandes
  useEffect(() => {
    console.log('Effet de chargement des offrandes exécuté');
    getAbime(token).then(res => {
      console.log('Réponse API getAbime:', res);
      setAbime(Array.isArray(res) ? res : []);
    });
  }, [token]);

  // Charge les amis si connecté
  useEffect(() => {
    console.log('Effet de chargement des relations exécuté');
    if (!token) {
      console.log('Token non disponible, relations non chargées');
      setEnchaines([]);
      setCorrompus([]);
      return;
    }
    // Récupère les relations via l’API backend (à adapter selon l’endpoint réel)
    fetch('http://localhost:5000/pecheurs/relations', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => {
        console.log('Réponse API relations:', data);
        setEnchaines(Array.isArray(data.enchaines) ? data.enchaines : []);
        setCorrompus(Array.isArray(data.corrompus) ? data.corrompus : []);
      })
      .catch(err => {
        console.error('Erreur lors du chargement des relations:', err);
        setEnchaines([]);
        setCorrompus([]);
      });
  }, [token]);

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
    } else {
      setMessage(res.error);
    }
  }

  async function handleOffrande(text) {
    setLoading(true);
    const res = await creerOffrande({ token, text });
    setLoading(false);
    setMessage(res._id ? 'Offrande envoyée.' : res.error);
    if (res._id) {
      // Recharge les données de l'Abîme pour synchroniser les informations
      const updatedAbime = await getAbime(token);
      setAbime(Array.isArray(updatedAbime) ? updatedAbime : []);
    }
  }

  const handleProfileClick = (user) => {
    setProfileToShow(user);
  };

  return (
    <BrowserRouter>
      <div style={{ 
        display: 'flex', 
        minHeight: '100vh', 
        background: 'radial-gradient(circle at top, #1a0505 0%, #0a0000 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Sidebar 
          enchaines={enchaines} 
          corrompus={corrompus} 
          onProfileClick={handleProfileClick} 
        />
        <div style={{ 
          flex: 1, 
          marginLeft: 180, 
          maxWidth: 800,
          margin: '0 auto',
          minHeight: '100vh', 
          fontFamily: 'EB Garamond, serif',
          background: 'rgba(26, 10, 10, 0.95)', 
          color: '#f5e6e6', 
          padding: 0, 
          boxShadow: '0 0 30px rgba(128, 0, 0, 0.3)',
          position: 'relative',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(128, 0, 0, 0.2)',
          borderTop: 'none',
          borderBottom: 'none'
        }}>
          <Header />
          <div style={{ 
            padding: '24px 32px',
            position: 'relative'
          }}>
            {/* Affichage du profil à venir */}
            {profileToShow ? (
              <ProfilSinner sinnerData={profileToShow} onBackClick={() => setProfileToShow(null)} />
            ) : (
              <>
                {!token && <>
                  <InscriptionForm onRegister={handleRegister} loading={loading} />
                  <ConnexionForm onLogin={handleLogin} loading={loading} />
                </>}
                {token && <OffrandeForm onSubmit={handleOffrande} disabled={loading} />}
                <AbimeFeed offrandes={abime} />
                {message && <div style={{ background: '#300', color: '#fff', padding: 8, borderRadius: 6, marginTop: 12 }}>{message}</div>}
              </>
            )}
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
