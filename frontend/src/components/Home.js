import React from 'react';
import { Link } from 'react-router-dom';
import './css/Home.css';

const Home = () => {
  return (
    <div className="Home">
      <header className="Home-header">
        <h1 className="title"> Aggie Passes </h1>
        <div className="button-container">
          <Link to="/buy"> <button className="btn btn-buy">Buy Now</button> </Link>
          <Link to="/sell"> <button className="btn btn-sell">Sell Now</button> </Link>
        </div>
      </header>


      
    </div>
  );
};

export default Home;
