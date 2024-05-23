import React from 'react'
import { Link } from 'react-router-dom'
import './css/Navbar.css'


const Navbar = () => {
  return (
    <div>
      <nav className='navbar'>
        <ul className='navbar-list'>
          <li><Link to="/schedule">Schedule</Link></li>
          <li><Link to="/schedule">Schedule</Link></li>
          <li><Link to="/schedule">Schedule</Link></li>
          <li><Link to="/schedule">Schedule</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar