import React, { useState, useEffect } from "react";
import ProductCart from "./ProductCart";
import { useProducts } from "./products"; // Ensure you're using the hook for dynamic fetching
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

  // Fetch products dynamically using the useProducts hook
  const { products, loading, error } = useProducts();

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Filter products based on the selected category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.Category === selectedCategory); // Adjust for the 'Category' field
  products.map(
    (p) => (p.image = `http://localhost:8080/images/${p.image.String}`)
  );

  return (
    <div className="cart-page">
      {/* Categories Sidebar */}
      <aside className="categories-container">
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
      </aside>

      {/* Product Grid */}
      <div className="cart-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCart
              key={product.id} // Adjust for the correct field from the API response
              data={product}
            />
          ))
        ) : (
          <p className="no-products">No books available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
