import React, { useRef, useEffect } from 'react';
import './css/HorizontalCard.css';


const HorizontalCard = ({ id, seller, price, classification, postingDate, game, image, phone, onBack }) => {
    const cardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        onBack();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onBack]);

  console.log(image)


  // const calculateClassification = (classification) => {
  //   switch (classification) {
  //     case 'Freshman':
  //       return 'U1';
  //     case 'Sophomore':
  //       return 'U2';
  //     case 'Junior':
  //       return 'U3';
  //     case 'Senior':
  //       return 'U4';
  //     default:
  //       return 'Unknown'; // Optional: handle cases where the classification doesn't match any of the known values
  //   }
  // };

  return (
    <div className="horizontal-card" ref={cardRef}>
      <img src={`/images/${image}`}alt={`${seller}'s product`} className="horizontal-card-img" />
      <div className="horizontal-card-content">
        <h2 className = "seller">{seller}</h2>
        <p> Contact: {phone}</p>
        <p>Price: ${price}</p>
        <p>Game: {game}</p>
        <p>Classification: {classification}</p>
      </div>
    </div>
  );
};

export default HorizontalCard;
