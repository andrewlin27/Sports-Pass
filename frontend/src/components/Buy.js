import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import './css/Buy.css';
import { Link } from 'react-router-dom';

const Buy = () => {
  const [posts, setPosts] = useState([]); // Original list of posts
  const [filteredPosts, setFilteredPosts] = useState([]); // Filtered list to display
  const [selectedGames, setSelectedGames] = useState([]); // Selected games for filtering

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://sxpktops93.execute-api.us-east-2.amazonaws.com/prod/post');
      const data = response.data;

      const updatedData = data.map((item, index) => {
        const gameWithUnderscores = item.game.replace(/\s+/g, '_');
        console.log(gameWithUnderscores);

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

      setPosts(updatedData);
      setFilteredPosts(updatedData); // Initialize filteredPosts with all posts
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleGameFilterChange = (game) => {
    const updatedSelectedGames = selectedGames.includes(game)
      ? selectedGames.filter(selectedGame => selectedGame !== game)
      : [...selectedGames, game];

    setSelectedGames(updatedSelectedGames);

    if (updatedSelectedGames.length === 0) {
      setFilteredPosts(posts); // Reset to all posts if no filter is selected
    } else {
      setFilteredPosts(posts.filter(post => updatedSelectedGames.includes(post.game)));
    }
  };

  // Generate the list of unique games from the original posts array
  const uniqueGames = [...new Set(posts.map(post => post.game))];

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
