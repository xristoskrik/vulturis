import React, { useState } from "react";
import ProductCart from "./ProductCart";
import { products } from "./products";
import "./cart.css";

const categories = [
  "All",
  "History-Literature",
  "Comedy",
  "Romantic Drama",
  "Politics",
  "History",
  "Romance",
  "Historical Mysticism",
  "Ancient Greek Literature",
];

const Cart = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="cart-page">
      {/* Categories at the Top */}
      <div className="categories-container">
        {categories.map((category) => (
          <div
            key={category}
            className={`category-item ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </div>
        ))}
      </div>

      {/* Product Grid */}
      <div className="cart-grid">
        {filteredProducts.map((product) => (
          <ProductCart key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};

export default Cart;

