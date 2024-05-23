import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Schedule from './components/Schedule';
import Buy from './components/Buy';
import Sell from './components/Sell';

function App() {
  return (
    <div className="App">
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/schedule" element={<Schedule/>} />
        <Route path="/buy" element={<Buy/>} />
        <Route path="/sell" element={<Sell/>} />
      </Routes>

      <Footer/>
    </div>
  );
}
export default App;
