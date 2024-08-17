import React from 'react'
import { Link } from 'react-router-dom'
import './css/Navbar.css'


const Navbar = () => {
  return (
	<div>
		<nav className='navbar'>
			<Link to="/" className='navbar-logo'>
				<img src={'images/logo.png'} alt="Logo" />
			</Link>
			
			<ul className='navbar-list'>
				<li><Link to="/"> Home </Link></li>
				<li><Link to="/map">Tailgate Map</Link></li>
				<li><Link to="/info">Info</Link></li>
				<li><Link to="/faq">FAQ</Link></li>
			</ul>
		</nav>
	</div>
  )
}

export default Navbar