import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import PasswordPrompt from './PasswordPrompt';
import './css/DeletePosts.css';

const DeletePosts = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [deletedPosts, setDeletedPosts] = useState([]);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

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
        phone: item.contact,
        password: item.password,
        timestamp: item.timestamp // Add this to use in the delete request
      }));

      setPosts(updatedData);
      setFilteredPosts(updatedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = posts.filter(post =>
      post.seller.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const handleDeletePost = async (password) => {
    if (postToDelete && password === postToDelete.password) {
      try {
        await axios.delete(`https://sxpktops93.execute-api.us-east-2.amazonaws.com/prod/post/${postToDelete.timestamp}`);
        setFilteredPosts(filteredPosts.filter(post => post.id !== postToDelete.id));
        setDeletedPosts([...deletedPosts, postToDelete.id]);
        setShowPasswordPrompt(false);
        setPostToDelete(null);
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    } else {
      console.error('Invalid password');
      setShowPasswordPrompt(false);
      setPostToDelete(null);
    }
  };

  const handleShowPasswordPrompt = (post) => {
    setPostToDelete(post);
    setShowPasswordPrompt(true);
  };

  const handleCancel = () => {
    setShowPasswordPrompt(false);
    setPostToDelete(null);
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
              <Card className="delete-card" {...post} />
              <h1>{post.seller}</h1>
              <button onClick={() => handleShowPasswordPrompt(post)}>Delete</button>
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
      {showPasswordPrompt && (
        <PasswordPrompt
          post={postToDelete}
          onConfirm={handleDeletePost}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default DeletePosts;
