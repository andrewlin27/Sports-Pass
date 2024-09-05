import React from 'react';
import './css/Card.css';

const Card = ({ id, className, seller, price, classification, postingDate, image, onClick }) => {
  const calculateDateDifference = (date) => {
    console.log(date); // Ensure the date format is correct
    const postDate = new Date(date + "T00:00:00"); // Parse the date string correctly
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time part to 00:00:00 for comparison

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
    <div className={className} onClick={onClick}>
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
