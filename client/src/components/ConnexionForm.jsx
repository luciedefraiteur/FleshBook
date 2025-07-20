import React, { useState } from 'react';
import '../styles/forms.scss';

export default function ConnexionForm({ onLogin, loading }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <form onSubmit={e => { e.preventDefault(); onLogin({ email, password }); }} style={{ background: '#1a0a0a', borderRadius: 12, padding: 16, margin: '1rem 0', boxShadow: '0 0 8px #800', maxWidth: '400px', margin: 'auto' }}>
      <h3 style={{ color: '#b00', fontFamily: 'Cinzel, serif', marginBottom: 8 }}>Connexion (Rituel)</h3>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ width: '100%', marginBottom: 8, borderRadius: 6, border: '1px solid #800', background: '#221012', color: '#fff', padding: 8 }}
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ width: '100%', marginBottom: 8, borderRadius: 6, border: '1px solid #800', background: '#221012', color: '#fff', padding: 8 }}
        required
      />
      <button type="submit" disabled={loading} style={{ width: '100%', background: '#800', color: '#fff', border: 'none', borderRadius: 6, padding: 8, fontWeight: 600 }}>
        {loading ? 'Connexion...' : 'Accomplir le rituel'}
      </button>
    </form>
  );
}
