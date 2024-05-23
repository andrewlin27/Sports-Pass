import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Schedule from './components/Schedule';

function App() {
  return (
    <div className="App">
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/schedule" element={<Schedule/>} />
      </Routes>

      <Footer/>
    </div>
  );
}
export default App;
