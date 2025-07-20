import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ProfilePage from '../pages/ProfilePage';
import PrivateRoute from './PrivateRoute';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import CerclesPage from '../pages/CerclesPage';
import CercleDetailsPage from '../pages/CercleDetailsPage';

const AppRouter = () => {
  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh', background: 'radial-gradient(circle at top, #1a0505 0%, #0a0000 100%)' }}>
        <Sidebar /> {/* La sidebar sera gérée globalement ou via un contexte */}
        <div style={{ flex: 1, marginLeft: 180, maxWidth: 800, margin: '0 auto', minHeight: '100vh', fontFamily: 'EB Garamond, serif', background: 'rgba(26, 10, 10, 0.95)', color: '#f5e6e6', padding: 0, boxShadow: '0 0 30px rgba(128, 0, 0, 0.3)', position: 'relative', border: '1px solid rgba(128, 0, 0, 0.2)', borderTop: 'none', borderBottom: 'none' }}>
          <Header />
          <div style={{ padding: '24px 32px', position: 'relative' }}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<LoginPage />} /> {/* Inscription sur la même page pour l'instant */}
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
              <Route path="/profile/:id" element={<ProfilePage />} />
              <Route path="/cercles" element={<PrivateRoute><CerclesPage /></PrivateRoute>} />
              <Route path="/cercles/:id" element={<PrivateRoute><CercleDetailsPage /></PrivateRoute>} />
              {/* Ajoutez d'autres routes ici */}
              <Route path="*" element={<h1 style={{ color: '#b00', textAlign: 'center', marginTop: '50px' }}>404 - Abîme Inconnu</h1>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default AppRouter;