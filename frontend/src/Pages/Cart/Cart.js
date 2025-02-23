import React, { useState, useEffect } from "react";
import ProductCart from "./ProductCart";
import { useProducts } from "./products"; 
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
  const [searchQuery, setSearchQuery] = useState(""); 


  const { products, loading, error } = useProducts();

  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

 
  const filteredProducts = products
    .filter((p) => 
      selectedCategory === "All" || p.Category === selectedCategory
    )
    .filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) 
    );


  products.map(
    (p) => (p.image = `http://localhost:8080/images/${p.image.String}`)
  );

  return (
    <div className="cart-page">
      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a product..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>

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

