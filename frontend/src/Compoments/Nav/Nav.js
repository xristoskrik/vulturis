import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../src/AuthContext';
import './nav.css';

const Nav = () => {
  const { isLoggedIn, user, logout } = useAuth(); // Access login state and logout function

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        {!isLoggedIn ? (
          <ul>
            <li><Link to="/login">Login</Link></li>
            <p>|</p>
            <li><Link to="/register">Register</Link></li>
          </ul>
        ) : (
          <div className="top-bar-user">
            <p>Welcome, {user} <button onClick={logout} className="logout-button">Logout</button></p>

          </div>
        )}
      </div>

      {/* Navbar */}
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

export default Nav;

