import React from "react";
import "./css/PriceAlert.css"; // Create and import your custom CSS for styling

const PriceAlert = ({ message, onClose }) => {
  return (
    <div className="price-alert-overlay">
      <div className="price-alert-container">
        <p>{message}</p>
        <button onClick={onClose} className="price-alert-close">
          Close
        </button>
      </div>
    </div>
  );
};

export default PriceAlert;
