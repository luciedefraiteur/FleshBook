import React, { useState } from 'react';

// Adding a default export for the OffrandeForm component
export default function OffrandeForm({ onSubmit, disabled }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      background: '#1a0a0a', 
      borderRadius: 12, 
      padding: 16, 
      margin: '1rem 0', 
      boxShadow: '0 0 8px #800' 
    }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Exprimez votre offrande..."
        style={{ 
          width: '100%', 
          height: '100px', 
          borderRadius: 6, 
          border: '1px solid #800', 
          background: '#221012', 
          color: '#fff', 
          padding: 8 
        }}
        disabled={disabled}
      />
      <button type="submit" disabled={disabled} style={{ 
        width: '100%', 
        background: '#b00', 
        color: '#fff', 
        border: 'none', 
        borderRadius: 6, 
        padding: 8, 
        fontWeight: 600 
      }}>
        {disabled ? 'Envoi en cours...' : 'Envoyer l’offrande'}
      </button>
    </form>
  );
}