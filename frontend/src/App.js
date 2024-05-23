import React from 'react';
import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Schedule from './components/Schedule';
import Buy from './components/Buy';
import Sell from './components/Sell';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/schedule" element={<Schedule/>} />
          <Route path="/buy" element={<Buy/>} />
          <Route path="/sell" element={<Sell/>} />
        </Routes>

        <Footer/>
      </BrowserRouter>
    </div>
  );
}
export default App;
