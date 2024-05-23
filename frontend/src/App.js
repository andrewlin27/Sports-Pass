import React from 'react';
import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Schedule from './components/Schedule';
import Buy from './components/Buy';
import Sell from './components/Sell';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

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
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/sell" element={<Sell />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </div>
  );
}

export default App;
