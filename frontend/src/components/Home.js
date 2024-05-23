import React from 'react'
import './css/Home.css';

const Home = () => {
  return (
    <div className="Home">
    <header className="Home-header">
      <h1 className="title">Aggie Sports Pass</h1>
      <div className="button-container">
        <button className="btn btn-buy">Buy Now</button>
        <button className="btn btn-sell">Sell Now</button>
      </div>
    </header>
  </div>
  )
}

export default Home