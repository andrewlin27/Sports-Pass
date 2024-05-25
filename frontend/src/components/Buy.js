import React, { useState } from 'react';
import Card from './Card';
import HorizontalCard from './HorizontalCard';
import samplePosts from '../samplePosts';
import './css/Buy.css';
import { Link } from 'react-router-dom';

const Buy = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (item) => {
    setSelectedCard(item);
  };

  const handleBackClick = () => {
    setSelectedCard(null);
  };

  // const cards = samplePosts.map(item => (
  //   <Card key={item.id} {...item} onClick={() => handleCardClick(item)} />
  // ));

  const cards = samplePosts.map(item => (
    <Link key={item.id} to={`/card/${item.id}`} className="card-link">
      <Card {...item} />
    </Link>
  ));

  return (
    <div className="buy-container">
      <div className="cards-container">
        <div className="cards">
          {cards}
        </div>
      </div>
    </div>
  );
};

export default Buy;
