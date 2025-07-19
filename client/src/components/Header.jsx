import logo from '../assets/logo/logo.png';
import sigil from '../assets/sigil/sigil.svg';
import '../styles/header.scss';

export default function Header() {
  return (
    <header className="theme-transition" style={{ 
      background: '#000', 
      color: '#fff', 
      padding: '1rem', 
      textAlign: 'center', 
      fontFamily: 'Cinzel, serif', 
      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      animation: 'hellGlow 3s infinite'
    }}>
      <img src={sigil} alt="Sigil" className="sigil floating-element" style={{ 
        width: '48px', 
        height: '48px', 
        marginRight: '1rem',
        animation: 'sigilRotate 5s linear infinite'
      }} />
      <h1 className="blood-text" style={{ 
        animation: 'bloodRipple 2s infinite'
      }}>FleshBook</h1>
    </header>
  );
}