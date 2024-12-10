import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './Compoments/Nav/Nav';
import Login from './Pages/Login/Login.jsx';
import Register from './Pages/Register/Register.js';
import Checkout from './Pages/Checkout/Checkout.js';
import Contact from './Pages/Contact/Contact.js';
import Home from './Pages/Home/Home.jsx';
import Cart from './Pages/Cart/Cart.js'


const About = () => <h2>About Us</h2>;
const Genres = () => <h2>Explore Genres</h2>;


// will replace with pages later

function App() {
  return (
    <Router>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

