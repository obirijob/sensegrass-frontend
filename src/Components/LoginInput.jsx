import React from 'react';

function LoginInput({ placeholder, label, password, onInput, required }) {
  return (
    <div className="login-input">
      <label htmlFor="lginput">{label}</label>
      <input
        required={required}
        type={password ? 'password' : 'text'}
        onInput={onInput}
        placeholder={placeholder}
      />
    </div>
  );
}

export default LoginInput;
