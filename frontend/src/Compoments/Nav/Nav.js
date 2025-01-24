import React from 'react';
import './nav.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <div className="top-bar">
        <ul>
            <li><Link to="/login">Login</Link></li>
	    <p>|</p>
             <li><Link to="/register">Register</Link></li>	
          </ul>
      </div>

      <header className="navbar">
        <h1 className="navbar-title">
          <img src="image2.png" alt="Logo" style={{ width: '100px', height: '100px' }} />
        </h1>
        <nav className="navbar-links">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/cart">Products</Link></li>
	    <li><Link to="/checkout">Checkout</Link></li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;

