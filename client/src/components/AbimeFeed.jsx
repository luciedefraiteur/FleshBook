import React from 'react';
import '../styles/animations.scss';
import '../styles/abimeFeed.scss';

export default function AbimeFeed({ offrandes }) {
  return (
    <section className="abime-feed animate-pulse" style={{ 
      background: 'linear-gradient(to bottom, #221012, #1a0808)',
      borderRadius: 12,
      padding: 24,
      margin: '2rem 0',
      boxShadow: '0 4px 20px rgba(128,0,0,0.2)',
      border: '1px solid rgba(128,0,0,0.15)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '200px',
        background: 'radial-gradient(circle at top, rgba(128,0,0,0.1) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <h2 className="blood-text abime-feed-title animate-hell-glow" style={{ 
        color: '#c00',
        fontFamily: 'UnifrakturCook, Cinzel, serif',
        marginBottom: 24,
        fontSize: '2em',
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        position: 'relative'
      }}>L'Abîme</h2>
      {offrandes.length === 0 ? (
        <div className="ritual-container animate-smoke" style={{ 
          color: '#a88',
          fontStyle: 'italic',
          textAlign: 'center',
          padding: '2rem',
          fontSize: '1.1em',
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
        }}>
          Aucune offrande n'a encore été versée dans l'Abîme…
        </div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {offrandes.map(offrande => (
            <li key={offrande._id} className="post-item hover-lift" style={{ 
              margin: '2em 0',
              padding: '1em',
              borderRadius: 8,
              background: 'rgba(34,16,18,0.6)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              border: '1px solid rgba(128,0,0,0.1)',
              transition: 'all 0.3s ease'
            }}>
              <div className="post-header" style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 8
              }}>
                <span className="post-author animate-hell-glow" style={{ 
                  color: '#fff',
                  fontSize: '1.1em',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                }}>
                  {offrande.sinner?.name || 'Anonyme'}
                </span>
              </div>
              <div className="post-content" style={{
                color: '#f5e6e6',
                lineHeight: 1.6,
                fontSize: '1.05em',
                fontFamily: 'EB Garamond, serif',
                marginBottom: 12,
                whiteSpace: 'pre-wrap'
              }}>
                {offrande.text}
              </div>
              <div className="post-timestamp" style={{ 
                fontSize: '0.85em',
                color: '#a88',
                opacity: 0.8,
                fontStyle: 'italic'
              }}>
                {new Date(offrande.createdAt).toLocaleString('fr-FR', {
                  dateStyle: 'long',
                  timeStyle: 'short'
                })}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
