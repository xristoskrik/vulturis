import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Login from './Pages/Login/Login.jsx';
import Register from './Pages/Register/Register.js';

const Home = () => <h2>Welcome to the Home Page!</h2>;
const About = () => <h2>About Us</h2>;
const Genres = () => <h2>Explore Genres</h2>;
const Contact = () => <h2>Contact Us</h2>;
const Cart = () => <h2>Your Cart</h2>;

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
	  <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

