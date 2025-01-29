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
      {/* Categories Sidebar */}
      <aside className="categories-container">
        <h2 className="category-title">Book Categories</h2>
        {categories.map((category) => (
          <div
            key={category}
            className={`category-item ${selectedCategory === category ? "active" : ""}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </div>
        ))}
      </aside>

      {/* Product Grid */}
      <div className="cart-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCart key={product.id} data={product} />
          ))
        ) : (
          <p className="no-products">No books available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
