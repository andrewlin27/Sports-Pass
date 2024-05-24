import React from 'react';
import './css/Card.css';

const Card = ({ id, seller, price, classification, postingDate, game, image }) => {
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

  return (
    <div className="card">
      <div className="card-date-badge">{calculateDateDifference(postingDate)}</div>
      <img src={`images/${image}`} alt={`${seller}'s product`} className="card-img" />
      <div className="card-content">
        <h2 className="card-seller">{seller}</h2>
        <p className="card-price">{price}</p>
      </div>
    </div>
  );
};

export default Card;
