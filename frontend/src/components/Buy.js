import React, { useState } from 'react';
import Card from './Card';
import samplePosts from '../samplePosts';
import './css/Buy.css';
import { Link } from 'react-router-dom';

const Buy = () => {
  const [selectedGames, setSelectedGames] = useState([]);

  const handleGameFilterChange = (game) => {
    setSelectedGames(prevSelectedGames =>
      prevSelectedGames.includes(game)
        ? prevSelectedGames.filter(selectedGame => selectedGame !== game)
        : [...prevSelectedGames, game]
    );
  };

  const filteredPosts = selectedGames.length === 0 
  ? samplePosts 
  : samplePosts.filter(post => selectedGames.includes(post.game));

const sortedFilteredPosts = [...filteredPosts].sort((a, b) => new Date(b.postingDate) - new Date(a.postingDate));

const cards = sortedFilteredPosts.map(item => (
  <Link key={item.id} to={`/card/${item.id}`} className="card-link">
    <Card {...item} />
  </Link>
));


  const uniqueGames = [...new Set(samplePosts.map(post => post.game))];

  return (
    <div className="buy-container">
      <div className="filter-container">
        <div className="dropdown">
          <button className="dropbtn">Filter</button>
          <div className="dropdown-content">
            {uniqueGames.map(game => (
              <div key={game}>
                <input 
                  type="checkbox" 
                  id={`filter-${game}`} 
                  checked={selectedGames.includes(game)} 
                  onChange={() => handleGameFilterChange(game)}
                />
                <label htmlFor={`filter-${game}`}>{game}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="cards-container">
        <div className="cards">
          {cards}
        </div>
      </div>
    </div>
  );
};

export default Buy;
