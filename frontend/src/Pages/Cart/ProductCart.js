import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../CartContext'; // Import Cart Context
import './cart.css';

const ProductCart = ({ data }) => {
  const { id, name, price, image, slug } = data;
  const { addToCart } = useCart(); // Get addToCart function

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
        <button className="cart-button" onClick={() => addToCart({ id, name, price, image, slug })}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCart;

