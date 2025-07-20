import React from 'react';
import './Input.scss';

const Input = ({ type = 'text', placeholder, value, onChange, error = false }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`common-input ${error ? 'common-input--error' : ''}`}
    />
  );
};
export default Input;