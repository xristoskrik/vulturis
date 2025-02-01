import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./cart.css";
import { useCart } from "../../CartContext"; // Import Cart Context
const ProductCart = (props) => {
  const { id, name, price, image, slug } = props.data;

  // State to manage cart items
  const [cart, setCart] = useState([]);
  const { addToCart } = useCart();
  // Add to Cart Handler
  const addToCart2 = () => {
    const product = { id, name, price, image, slug };
    setCart((prevCart) => [...prevCart, product]); // Add product to the cart
    addToCart({ id, name, price, image, slug });
  };

  return (
    <div className="cart-container">
      <Link to={`/product/${slug}`}>
        <img src={image} alt={name} className="cart-image" />
      </Link>
      <h3 className="cart-title">{name}</h3>
      <div className="cart-footer">
        <p className="cart-price">
          $<span>{price}</span>
        </p>
        <button className="cart-button" onClick={addToCart2}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
