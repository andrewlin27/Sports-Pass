import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Card from './Card';
import './css/Buy.css';
import { Link } from 'react-router-dom';

const Buy = () => {
  const [posts, setPosts] = useState([]); // Original list of posts
  const [filteredPosts, setFilteredPosts] = useState([]); // Filtered list to display
  const [selectedGame, setSelectedGame] = useState(''); // Selected game for filtering
  const [selectedClassification, setSelectedClassification] = useState(''); // Selected classification for filtering

  const fetchPosts = async () => {
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

      updatedData.sort((a, b) => new Date(b.postingDate) - new Date(a.postingDate));

      setPosts(updatedData);
      setFilteredPosts(updatedData); // Initialize filteredPosts with all posts
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleFilterChange = useCallback(() => {
    let filtered = posts;

    if (selectedGame) {
      filtered = filtered.filter(post => post.game === selectedGame);
    }

    if (selectedClassification) {
      filtered = filtered.filter(post => post.classification === selectedClassification);
    }

    setFilteredPosts(filtered);
  }, [posts, selectedGame, selectedClassification]);

  useEffect(() => {
    handleFilterChange();
  }, [handleFilterChange]);

  // Generate the list of unique games and classifications from the original posts array
  const uniqueGames = [...new Set(posts.map(post => post.game))];
  const uniqueClassifications = [...new Set(posts.map(post => post.classification))];

  return (
    <div className="buy-container">
      <div className="filter-bar">
        <div className="filter-group">
          <label>Game:</label>
          <select value={selectedGame} onChange={(e) => setSelectedGame(e.target.value)}>
            <option value="">All Games</option>
            {uniqueGames.map(game => (
              <option key={game} value={game}>{game}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Classification:</label>
          <select value={selectedClassification} onChange={(e) => setSelectedClassification(e.target.value)}>
            <option value="">All Classifications</option>
            {uniqueClassifications.map(classification => (
              <option key={classification} value={classification}>{classification}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="cards-container">
        <div className="cards">
          {filteredPosts.map(item => (
            <Link key={item.id} to={`/card/${item.id}`} className="card-link">
              <Card {...item} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Buy;
