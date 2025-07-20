import React, { useState, useEffect } from 'react';
import AbimeFeed from '../features/feed/AbimeFeed';
import OffrandeForm from '../features/feed/OffrandeForm';
import ConnexionForm from '../features/auth/ConnexionForm';
import InscriptionForm from '../features/auth/InscriptionForm';
import { useAuth } from '../contexts/AuthContext';
import { creerOffrande, getAbime } from '../api/offrandesApi';
import { inscrireSinner, connecterSinner } from '../api/authApi';
import useApi from '../hooks/useApi';

export default function HomePage() {
  const { token, login } = useAuth();
  const [abime, setAbime] = useState([]);

  const { loading: offrandeLoading, error: offrandeError, execute: executeCreerOffrande } = useApi(creerOffrande);
  const { loading: abimeLoading, error: abimeError, execute: executeGetAbime } = useApi(getAbime);

  const { loading: registerLoading, error: registerError, execute: executeRegister } = useApi(inscrireSinner);
  const { loading: loginLoading, error: loginError, execute: executeLogin } = useApi(connecterSinner);

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

  async function handleRegister(formData) {
    const res = await executeRegister(formData);
    if (res && !res.error) {
      console.log('Inscription réussie:', res);
    }
  }

  async function handleLogin(formData) {
    const res = await executeLogin(formData);
    if (res && res.token) {
      login(res.token, res.user || null);
    } else {
      // Gérer l'erreur de connexion ici si nécessaire
    }
  }

  return (
    <>
      {!token && (
        <>
          {registerError && <div style={{ background: '#300', color: '#fff', padding: 8, borderRadius: 6, marginTop: 12 }}>{registerError}</div>}
          {loginError && <div style={{ background: '#300', color: '#fff', padding: 8, borderRadius: 6, marginTop: 12 }}>{loginError}</div>}
          <InscriptionForm onRegister={handleRegister} loading={registerLoading} />
          <ConnexionForm onLogin={handleLogin} loading={loginLoading} />
        </>
      )}
      {offrandeError && <div style={{ background: '#300', color: '#fff', padding: 8, borderRadius: 6, marginTop: 12 }}>{offrandeError}</div>}
      {abimeError && <div style={{ background: '#300', color: '#fff', padding: 8, borderRadius: 6, marginTop: 12 }}>{abimeError}</div>}
      {token && <OffrandeForm onSubmit={handleOffrande} disabled={offrandeLoading} />}
      <AbimeFeed offrandes={abime} />
    </>
  );
}