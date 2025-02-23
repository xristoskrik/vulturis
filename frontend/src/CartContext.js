import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a Cart Context
const CartContext = createContext();

// CartProvider to wrap the app and provide cart state
export const CartProvider = ({ children }) => {
  // Load cart from localStorage or default to an empty array
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add product to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingProductIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove product from the cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Update product quantity in the cart
  const updateCartQuantity = (productId, quantity) => {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: quantity } : item
      );
    });
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access the CartContext
export const useCart = () => useContext(CartContext);

