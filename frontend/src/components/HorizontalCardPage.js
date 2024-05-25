// HorizontalCardPage.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HorizontalCard from './HorizontalCard';
import samplePosts from '../samplePosts';
import './css/HorizontalCardPage.css'

const HorizontalCardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedCard = samplePosts.find(item => item.id === parseInt(id));

  const handleBackClick = () => {
    navigate('/buy');
  };

  if (!selectedCard) {
    return <div>Card not found</div>;
  }

  return (
    <div className="horizontal-card-page-container">
      <HorizontalCard {...selectedCard} onBack={handleBackClick} />
    </div>
  );
};

export default HorizontalCardPage;
