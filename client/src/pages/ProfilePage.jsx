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
      if (id && user && id !== user._id) {
        // Afficher le profil d'un autre Sinner
        fetchOtherProfile({ token, id });
      } else if (user) {
        // Afficher le profil de l'utilisateur connecté
        fetchMyProfile(token);
      }
    }
  }, [token, id, user, fetchMyProfile, fetchOtherProfile]);

  useEffect(() => {
    if (id && user && id !== user._id) {
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
      isCurrentUser={!id || (user && id === user._id)} // Indiquer si c'est le profil de l'utilisateur connecté
      updateLoading={updateLoading}
      updateError={updateError}
    />
  );
}