import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../CartContext"; // Assuming this is your Cart context
import "./cart.css";

const ProductCart = ({ data }) => {
  const { id, name, price, image, slug } = data;
  const { addToCart } = useCart(); // Get addToCart function from CartContext

  // Handle the click event for the Add to Cart button
  const handleAddToCart = () => {
    addToCart({ id, name, price, image, slug });
  };

  return (
    <div className="cart-container">
      {/* Product Link */}
      <Link to={`/product/${slug}`} className="product-link">
        <img src={image} alt={name} className="cart-image" />
      </Link>

      {/* Product Title */}
      <h3 className="cart-title">{name}</h3>

      <div className="cart-footer">
        {/* Product Price */}
        <p className="cart-price">${price}</p>

        {/* Add to Cart Button */}
        <button className="cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
