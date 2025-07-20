import React, { useState } from 'react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import './forms.scss';

export default function InscriptionForm({ onRegister, loading }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !name || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    await onRegister({ email, name, password });
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h3 className="auth-form-title">Inscription (Pacte)</h3>
      {error && <p className="auth-form-error">{error}</p>}
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        error={!!error && !email}
      />
      <Input
        type="text"
        placeholder="Nom"
        value={name}
        onChange={e => setName(e.target.value)}
        error={!!error && !name}
      />
      <Input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={e => setPassword(e.target.value)}
        error={!!error && !password}
      />
      <Button type="submit" loading={loading}>
        Sceller le pacte
      </Button>
    </form>
  );
}