import React from 'react';
import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar';
import Info from './components/Info';
import Buy from './components/Buy';
import Sell from './components/Sell';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import HorizontalCardPage from './components/HorizontalCardPage';
import Map from './components/Map';
import FAQ from './components/FAQ';
import DeletePosts from './components/DeletePosts'
import Maintenance from './components/Maintenance';


const App = () => {
  const location = useLocation();

  return (
    <div className="App">
      <Navbar />
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          timeout={300}
          classNames="fade"
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<Map />} />
            <Route path="/infos" element={<Info />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/card/:id" element={<HorizontalCardPage />} />
            <Route path="/delete" element={<DeletePosts/>} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
