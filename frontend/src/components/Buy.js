import React, { useState } from 'react';
import Card from './Card';
import HorizontalCard from './HorizontalCard';
import samplePosts from '../samplePosts';
import './css/Buy.css';

const Buy = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (item) => {
    setSelectedCard(item);
  };

  const handleBackClick = () => {
    setSelectedCard(null);
  };

  const cards = samplePosts.map(item => (
    <Card key={item.id} {...item} onClick={() => handleCardClick(item)} />
  ));

  return (
    <div className="buy-container">
      <div className="cards-container">
        <div className="cards">
          {cards}
        </div>
      </div>
      {selectedCard && (
        <div className="horizontal-card-container">
          <HorizontalCard {...selectedCard} onBack={handleBackClick} />
        </div>
      )}
    </div>
  );
};

export default Buy;
