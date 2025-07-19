import React, { useState } from 'react';
import '../styles/forms.scss';

export default function InscriptionForm({ onRegister, loading }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  return (
    <form onSubmit={e => { e.preventDefault(); onRegister({ email, name, password }); }} style={{ background: '#1a0a0a', borderRadius: 12, padding: 16, margin: '1rem 0', boxShadow: '0 0 8px #800' }}>
      <h3 style={{ color: '#b00', fontFamily: 'Cinzel, serif', marginBottom: 8 }}>Inscription (Pacte)</h3>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ width: '100%', marginBottom: 8, borderRadius: 6, border: '1px solid #800', background: '#221012', color: '#fff', padding: 8 }}
        required
      />
      <input
        type="text"
        placeholder="Nom"
        value={name}
        onChange={e => setName(e.target.value)}
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
      <button type="submit" disabled={loading} style={{ width: '100%', background: '#b00', color: '#fff', border: 'none', borderRadius: 6, padding: 8, fontWeight: 600 }}>
        {loading ? 'Inscription...' : 'Sceller le pacte'}
      </button>
    </form>
  );
}
