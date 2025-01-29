import React, { createContext, useState, useContext } from 'react';

// Create Context
const CartContext = createContext();

// Custom Hook to use Cart Context
export const useCart = () => useContext(CartContext);

// Cart Provider
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Function to add item to cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

