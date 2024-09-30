// src/components/ThankYou.js
import React from 'react';
import './css/ThankYou.css'; // Make sure to import the CSS

const ThankYou = () => {
  return (
      <div className = "outerDiv">
    <div className="thank-you-page">
      <h1>Under review!</h1>
      <p>Your listing is under review and will appear within 12 hours if approved.</p>
      <button className="button" onClick={() => window.location.href = '/'}>Go to Home</button>
    </div>
    </div>
  );
};

export default ThankYou;
