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