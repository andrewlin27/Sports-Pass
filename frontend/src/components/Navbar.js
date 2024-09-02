import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './css/Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <div>
      <nav className='navbar'>
        <ul className='navbar-list'>
          <li>
            <Link
              to="/info"
              className={location.pathname === '/info' ? 'active' : ''}
            >
              Info
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className={location.pathname === '/' ? 'active' : ''}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/delete"
              className={location.pathname === '/delete' ? 'active' : ''}
            >
              Delete
            </Link>
          </li>
          <li>
            <Link
              to="/faq"
              className={location.pathname === '/faq' ? 'active' : ''}
            >
              FAQ
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
