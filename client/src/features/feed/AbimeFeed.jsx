import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../contexts/AuthContext';
import { getEchosForOffrande, createEcho } from '../../api/echosApi';
import useApi from '../../hooks/useApi';
import '../../styles/_animations.scss';
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