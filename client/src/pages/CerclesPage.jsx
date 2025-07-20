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