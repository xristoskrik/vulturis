import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../src/AuthContext';
import { useCart } from '../../../src/CartContext'; 
import './nav.css';
import cartIcon from './Cart.png';

const Nav = () => {
  const { isLoggedIn, user, logout } = useAuth(); 
  const { cart } = useCart(); 

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        {!isLoggedIn ? (
          <ul>
            <li><Link to="/login">Login or Register</Link></li>
            <li>
              <Link to="/checkout">
                <img src={cartIcon} alt="Cart" className="cart-icon" />
                <span className="cart-count">{cart.length}</span>
              </Link>
            </li>
          </ul>
        ) : (
          <div className="top-bar-user">
            <p>
              Welcome, {user} <button onClick={logout} className="logout-button">Logout</button>
            </p>
            <Link to="/checkout">
              <img src={cartIcon} alt="Cart" className="cart-icon" />
              <span className="cart-count">{cart.length}</span>
            </Link>
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

