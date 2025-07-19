import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/animations.scss';
import '../styles/sidebar.scss';

export default function Sidebar({ enchaines = [], corrompus = [], onProfileClick }) {
  const { token } = useAuth();
  const isConnected = !!token;

  // Fonction améliorée pour supprimer les doublons
  const removeDuplicates = (users) => {
    const seen = new Set();
    return users.filter(user => {
      const id = user._id || user.id;
      if (!id || seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  };

  const enchainesUnique = removeDuplicates(enchaines);
  const corrompusUnique = removeDuplicates(corrompus);

  // Composant réutilisable pour les éléments utilisateur
  const UserItem = ({ user, onClick }) => (
    <div 
      key={user._id || user.id} 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: 10, 
        cursor: 'pointer',
        padding: '4px',
        borderRadius: '4px',
        transition: 'background-color 0.2s ease'
      }} 
      onClick={() => onClick && onClick(user)}
      onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(128, 0, 0, 0.1)'}
      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      className="sidebar-user-item hover-lift"
    >
      <Link to={`/damne/${user._id}`} className="sidebar-user-link">
        <img 
          src={user.avatar} 
          alt={user.name} 
          style={{ 
            width: 32, 
            height: 32, 
            borderRadius: '50%', 
            marginRight: 8, 
            border: '1.5px solid #800', 
            background: '#222',
            objectFit: 'cover'
          }} 
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiMyMjIiLz4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxMiIgcj0iNSIgZmlsbD0iIzgwMCIvPgo8cGF0aCBkPSJNOCAyNmMwLTQgNC04IDgtOHM4IDQgOCA4IiBmaWxsPSIjODAwIi8+Cjwvc3ZnPgo=';
          }}
          className="sidebar-user-avatar animate-ripple"
        />
        <span style={{ fontSize: '0.9em', wordBreak: 'break-word' }}>
          {user.name}
        </span>
      </Link>
    </div>
  );

  // Section réutilisable
  const UserSection = ({ title, users, emptyMessage }) => (
    <div style={{ marginBottom: 24 }}>
      <div style={{ 
        color: '#b00', 
        fontWeight: 700, 
        fontSize: '1.1em', 
        marginBottom: 12,
        borderBottom: '1px solid rgba(128, 0, 0, 0.3)',
        paddingBottom: '4px'
      }} className="sidebar-section-title animate-hell-glow">
        {title} ({users.length})
      </div>
      {users.length === 0 ? (
        <div style={{ 
          color: '#a88', 
          fontStyle: 'italic', 
          fontSize: '0.85em',
          padding: '8px 0'
        }}>
          {emptyMessage}
        </div>
      ) : (
        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {users.map(user => (
            <UserItem 
              key={user._id || user.id} 
              user={user} 
              onClick={onProfileClick} 
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <aside className="sidebar theme-transition" style={{ 
      background: '#0b0000', 
      color: '#f5e6e6', 
      padding: '1rem', 
      width: '180px', 
      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      position: 'fixed',
      top: 0,
      bottom: 0,
      overflowY: 'auto'
    }}>
      {isConnected ? (
        <>
          <UserSection 
            title="Enchaînés" 
            users={enchainesUnique} 
            emptyMessage="Aucun pour l'instant…" 
          />
          
          <UserSection 
            title="Corrompus" 
            users={corrompusUnique} 
            emptyMessage="Aucun pour l'instant…" 
          />
          
          <div style={{ 
            marginTop: 'auto',
            fontSize: '0.85em', 
            color: '#a88', 
            textAlign: 'center',
            borderTop: '1px solid rgba(128, 0, 0, 0.2)',
            paddingTop: '16px'
          }}>
            <span style={{ fontStyle: 'italic' }}>
              Suggestions, notifications, etc.<br/>
              bientôt…
            </span>
          </div>
        </>
      ) : (
        <div style={{ 
          color: '#a88', 
          fontStyle: 'italic', 
          marginTop: 40, 
          textAlign: 'center',
          fontSize: '0.9em',
          lineHeight: 1.4
        }}>
          Connecte-toi pour découvrir tes enchaînés et corrompus.
        </div>
      )}
    </aside>
  );
}