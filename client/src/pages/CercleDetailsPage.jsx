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