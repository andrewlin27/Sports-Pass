import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card'; // Adjust the path if necessary
import './css/DeletePosts.css'; // Add styles as needed

const DeletePosts = () => {
  const [posts, setPosts] = useState([]); // Original list of posts
  const [filteredPosts, setFilteredPosts] = useState([]); // Filtered posts based on search
  const [searchQuery, setSearchQuery] = useState(''); // Search query
  const [deletedPosts, setDeletedPosts] = useState([]); // Track deleted posts

  // Fetch posts from the backend
  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://sxpktops93.execute-api.us-east-2.amazonaws.com/prod/post');
      const data = response.data;

      const updatedData = data.map((item, index) => ({
        id: index + 1,
        seller: item.name,
        price: parseFloat(item.price),
        postingDate: item.timestamp.split('T')[0],
        classification: item.class,
        game: item.game,
        image: `${item.game.replace(/\s+/g, '_')}.jpeg`,
        phone: item.contact
      }));

      setPosts(updatedData);
      setFilteredPosts(updatedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Filter posts based on the search query
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    const filtered = posts.filter(post =>
      post.seller.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredPosts(filtered);
  };

  // Handle post deletion
  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`https://sxpktops93.execute-api.us-east-2.amazonaws.com/prod/post/${id}`);
      setFilteredPosts(filteredPosts.filter(post => post.id !== id));
      setDeletedPosts([...deletedPosts, id]); // Optionally track deleted posts
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="delete-posts-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by seller name"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="posts-container">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <div key={post.id} className="post-item">
              <Card {...post} />
              <h1> {post.seller} </h1>
              <button onClick={() => handleDeletePost(post.id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No posts found</p>
        )}
      </div>
    </div>
  );
};

export default DeletePosts;
