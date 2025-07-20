import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import AppRouter from './routes/AppRouter';
import './styles/main.scss';
import ConnexionForm from './components/ConnexionForm';

export default function App() {
  const [message, setMessage] = useState('');

  const handleLogin = (credentials) => {
    // Logique de connexion
  };

  return (
    <AuthProvider>
      <AppRouter />
      <ConnexionForm onLogin={handleLogin} loading={false} />
      {message && (
        <div
          style={{
            background: '#b00',
            color: '#fff',
            padding: '10px',
            borderRadius: '6px',
            marginTop: '12px',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          {message}
        </div>
      )}
    </AuthProvider>
  );
}