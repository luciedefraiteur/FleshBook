import React from 'react';
import './Button.scss';

const Button = ({ children, onClick, type = 'button', disabled = false, loading = false }) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled || loading} className="common-button">
      {loading ? 'Chargement...' : children}
    </button>
  );
};
export default Button;