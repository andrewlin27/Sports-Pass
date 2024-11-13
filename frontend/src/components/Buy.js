import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import './css/Buy.css';
import { Link } from 'react-router-dom';


const Buy = () => {
  const [posts, setPosts] = useState([]); // Original list of posts
  const [filteredPosts, setFilteredPosts] = useState([]); // Filtered list to display
  const [selectedGames, setSelectedGames] = useState([]); // Selected games for filtering
  const [selectedClassification, setSelectedClassification] = useState(''); // Selected classification for filtering
  const [sortOption, setSortOption] = useState('postingDate'); // Default sorting by posting date

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://sxpktops93.execute-api.us-east-2.amazonaws.com/prod/post?gettrue=yes');
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

  const handleGameFilterChange = (game) => {
    const updatedSelectedGames = game ? [game] : [];
    setSelectedGames(updatedSelectedGames);
    applyFilters(updatedSelectedGames, selectedClassification, sortOption);
  };

  const handleClassificationFilterChange = (classification) => {
    setSelectedClassification(classification);
    applyFilters(selectedGames, classification, sortOption);
  };

  const handleSortChange = (e) => {
    const newSortOption = e.target.value;
    setSortOption(newSortOption);
    applyFilters(selectedGames, selectedClassification, newSortOption);
  };

  const applyFilters = (games, classification, sortOption) => {
    let filtered = posts;

    if (games.length > 0) {
      filtered = filtered.filter(post => games.includes(post.game));
    }

    if (classification) {
      filtered = filtered.filter(post => post.classification === classification || classification === '');
    }

    // Apply sorting based on the selected sort option
    let sortedPosts;
    if (sortOption === 'postingDate') {
      sortedPosts = [...filtered].sort((a, b) => new Date(b.postingDate) - new Date(a.postingDate));
    } else if (sortOption === 'price') {
      sortedPosts = [...filtered].sort((a, b) => a.price - b.price);
    } else {
      sortedPosts = filtered;
    }
    

    setFilteredPosts(sortedPosts);
  };

  // Generate the list of unique games and classifications from the original posts array
  // const uniqueGames = [...new Set(posts.map(post => post.game))];
  // console.log(uniqueGames);
  const uniqueGames = ['Notre Dame', 'McNeese State', 'Bowling Green', 'Arkansas', 'Missouri', 'LSU', 'NM State', 'Texas'];
  // console.log(ug)
  const classifications = ['U1', 'U2', 'U3', 'U4'];

  return (
    <div className="buy-container">
      <div className="filter-bar">
        <div className="filter-group">
          <label htmlFor="game-filter">Game</label>
          <select id="game-filter" onChange={(e) => handleGameFilterChange(e.target.value)} value={selectedGames[0] || ''}>
            <option value="">All Games</option>
            {uniqueGames.map(game => (
              <option key={game} value={game}>
                {game}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="classification-filter">Classification</label>
          <select id="classification-filter" onChange={(e) => handleClassificationFilterChange(e.target.value)} value={selectedClassification}>
            <option value="">All Classifications</option>
            {classifications.map(classification => (
              <option key={classification} value={classification}>
                {classification}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="sort-filter">Sort By</label>
          <select id="sort-filter" value={sortOption} onChange={handleSortChange}>
            <option value="postingDate">Posting Date</option>
            <option value="price">Price</option>
          </select>
          </div>
      </div>
      <div className="cards-container">
        <div className="cards">
        {filteredPosts.length > 0 ?
          (filteredPosts.map(item => (
            <Link key={item.id} to={`/card/${item.id}`} className="card-link">
              <Card className="buy-card" {...item} />
            </Link>
          )))
          :
          <p></p>
        }

        </div>
      </div>
    </div>
  );
};

export default Buy;
