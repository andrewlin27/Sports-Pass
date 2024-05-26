import React from 'react';
import './css/Card.css';

const Card = ({ id, seller, price, classification, postingDate, game, image, phone, onClick }) => {
  const calculateDateDifference = (date) => {
    const postDate = new Date(date);
    const today = new Date();
    const differenceInTime = today - postDate;
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

    if (differenceInDays === 0) {
      return 'Posted Today';
    } else if (differenceInDays === 1) {
      return 'Posted Yesterday';
    } else {
      return `Posted ${differenceInDays} days ago`;
    }
  };

  const calculateClassification = (classification) => {
    switch (classification) {
      case 'Freshman':
        return 'U1';
      case 'Sophomore':
        return 'U2';
      case 'Junior':
        return 'U3';
      case 'Senior':
        return 'U4';
      default:
        return 'Unknown'; // Optional: handle cases where the classification doesn't match any of the known values
    }
  };

  return (
    <div className="card" onClick={onClick}>
      <div className="card-date-badge">{calculateDateDifference(postingDate)}</div>
      <img src={`images/${image}`} alt={`${seller}'s product`} className="card-img" />
      <div className="card-content">
        <h2 className="card-price">${price}</h2>
        <p className="card-description">{calculateClassification(classification)} Sports Pass</p>
      </div>
    </div>
  );
};

export default Card;
