import React from 'react';
import './css/Card.css';

const Card = ({ id, seller, price, classification, postingDate, image, onClick }) => {
  const calculateDateDifference = (date) => {
    const postDate = new Date(date);
    const today = new Date();
    const differenceInTime = today - postDate;
    
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    console.log(classification)
    console.log(image)

    if (differenceInDays === 0) {
      return 'Posted Today';
    } else if (differenceInDays === 1) {
      return 'Posted Yesterday';
    } else {
      return `${differenceInDays} Days Ago`;
    }
  };

  return (
    <div className="card" onClick={onClick}>
      <div className="card-date-badge">{calculateDateDifference(postingDate)}</div>
      <div className="card-img-container">
        <img src={`images/${image}`} alt={`${seller}'s product`} className="card-img" />
      </div>
      <div className="card-content">
        <h3 className="card-price">${price}</h3>
        <p className="card-classification">{classification}</p>
      </div>
    </div>
  );
};

export default Card;
