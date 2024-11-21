import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="navbar">
      <h1 className="navbar-title">Welcome!</h1>
      <nav className="navbar-links">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
	  <li><a href="#">Genres</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Login</a></li>
          <li><a href="#">Cart</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

