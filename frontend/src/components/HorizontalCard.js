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

  console.log(image);

  return (
    <div className="horizontal-card" ref={cardRef}>
      <img src={`/images/${image}`} alt={`${seller}'s product`} className="horizontal-card-img" />
      <div className="horizontal-card-content">
        <h2 className="seller">{seller}</h2>
        <p><span className='label'>Contact:</span> {phone}</p>
        <p><span className='label'>Price:</span> ${price}</p>
        <p><span className='label'>Game:</span> {game}</p>
        {/* Conditionally render "Section" instead of "Classification" */}
        <p>
          <span className='label'>
            {game === 'Arkansas' ? 'Section' : 'Classification'}:
          </span> {classification}
        </p>
      </div>
    </div>
  );
};

export default HorizontalCard;
