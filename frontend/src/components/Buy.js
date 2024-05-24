import React from 'react';
import Card from './Card';
import samplePosts from '../samplePosts';
import './css/Buy.css';

const cards = samplePosts.map(item => {
  return <Card key={item.id} {...item} />;
});

const Buy = () => {
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
