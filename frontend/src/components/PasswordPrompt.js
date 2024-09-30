import React, { useState } from 'react';
import './css/PasswordPrompt.css';
import bcrypt from 'bcryptjs';

const PasswordPrompt = ({ post, onConfirm, onCancel }) => {
  const [password, setPassword] = useState('');

  const handleConfirm = async () => {
    const match = await bcrypt.compare(password, post.password);
    if (match) {
      onConfirm(password, post);  // Pass the password and post object to onConfirm
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
