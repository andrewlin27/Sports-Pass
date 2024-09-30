import React, { useState } from 'react';
import './css/PasswordPrompt.css';

const PasswordPrompt = ({ post, onConfirm, onCancel }) => {
  const [password, setPassword] = useState('');

  const handleConfirm = async () => {
    const response = await fetch(`https://sxpktops93.execute-api.us-east-2.amazonaws.com/prod/post/${post.timestamp}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: password
      }),
    });

    if (response.ok) {
      onConfirm(); 
    } else {
      alert("Incorrect password. Contact aggiepasses@gmail.com if you forgot your password.");
    }
  };

  return (
    <div className="password-prompt-overlay">
      <div className="password-prompt-container">
        <h2>Enter your password to confirm</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <div className="password-prompt-buttons">
          <button onClick={handleConfirm}>Confirm</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default PasswordPrompt;
