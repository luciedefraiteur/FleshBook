import React, { useState } from 'react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import './forms.scss';

export default function ConnexionForm({ onLogin, loading }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    await onLogin({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h3 className="auth-form-title">Connexion (Rituel)</h3>
      {error && <p className="auth-form-error">{error}</p>}
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        error={!!error && !email}
      />
      <Input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={e => setPassword(e.target.value)}
        error={!!error && !password}
      />
      <Button type="submit" loading={loading}>
        Accomplir le rituel
      </Button>
    </form>
  );
}