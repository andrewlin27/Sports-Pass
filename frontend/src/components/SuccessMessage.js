import React from 'react';
import './css/SuccessMessage.css'; // Create this CSS file to style the component

const SuccessMessage = ({ message, onClose }) => {
  return (
    <div className="success-message-overlay">
      <div className="success-message">
        <h2>{message}</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SuccessMessage;
