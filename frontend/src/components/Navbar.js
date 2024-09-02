import React from 'react'
import { Link } from 'react-router-dom'
import './css/Navbar.css'

const Navbar = () => {
  return (
    <div>
      <nav className='navbar'>
        
        
        <ul className='navbar-list'>
          {/* <li><Link to="/map">Tailgate Map</Link></li> */}
          <li><Link to="/info">Info</Link></li>
          <Link to="/" className='navbar-logo'>
              <img src={'images/ticketLogo.jpeg'} alt="Logo" />
          </Link>
          <li><Link to="/faq">FAQ</Link></li>
          <li><Link to="/delete">Delete</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
