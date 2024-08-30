// src/components/ThankYou.js
import React from 'react';
import './css/ThankYou.css'; // Make sure to import the CSS

const ThankYou = () => {
  return (
      <div className = "outerDiv">
    <div className="thank-you-page">
      <h1>Success!</h1>
      <p>Your listing has been created.</p>
      <button className="button" onClick={() => window.location.href = '/'}>Go to Home</button>
    </div>
    </div>
  );
};

export default ThankYou;
