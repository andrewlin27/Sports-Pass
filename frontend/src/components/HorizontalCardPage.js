import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HorizontalCard from './HorizontalCard';
import './css/HorizontalCardPage.css'

const HorizontalCardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const fetchPostById = async () => {
      try {
        const response = await axios.get('https://sxpktops93.execute-api.us-east-2.amazonaws.com/prod/post');
        const data = response.data;

        const updatedData = data.map((item, index) => {
          const gameWithUnderscores = item.game.replace(/\s+/g, '_');

          return {
            id: index + 1,
            seller: item.name,
            price: parseFloat(item.price),
            postingDate: item.timestamp.split('T')[0],
            classification: item.class,
            game: item.game,
            image: `${gameWithUnderscores}.jpeg`,
            phone: item.contact
          };
        });

        const foundCard = updatedData.find(item => item.id === parseInt(id));
        setSelectedCard(foundCard);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPostById();
  }, [id]);

  const handleBackClick = () => {
    navigate('/buy');
  };

  if (!selectedCard) {
    return <div></div>;
  }

  return (
    <div className="horizontal-card-page-container">
      <HorizontalCard {...selectedCard} onBack={handleBackClick} />
    </div>
  );
};

export default HorizontalCardPage;
