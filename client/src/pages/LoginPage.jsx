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