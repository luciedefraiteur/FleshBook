import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/profilSinner.scss';

export default function ProfilSinner({ sinnerData, onBackClick }) {
  const { id } = useParams();

  return (
    <section className="profil-sinner">
      <header className="profil-header">
        <button className="back-button" onClick={onBackClick}>↩ Retour</button>
        <h1 className="profil-title">↘︎ Tu consultes le PÉCHEUR #{id} dans la Salle des Reflets</h1>
      </header>
      <div className="profil-info">
        <img src={sinnerData.avatar} alt={sinnerData.name} className="profil-avatar" />
        <h2 className="profil-name">{sinnerData.name}</h2>
      </div>
      <div className="profil-offrandes">
        <h3>Offrandes :</h3>
        <ul>
          {sinnerData.offrandes.map(offrande => (
            <li key={offrande._id} className="offrande-item">
              <p className="offrande-text">{offrande.text}</p>
              <span className="offrande-date">{new Date(offrande.createdAt).toLocaleString('fr-FR', {
                dateStyle: 'long',
                timeStyle: 'short'
              })}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
