import React from "react";
import "./Home.css";
import { useAuth } from "../../AuthContext";
import { useProducts } from "./products"; // Ensure this path is correct
import ProductCart from "../Cart/ProductCart"; // Import ProductCart component

const Home = () => {
  useAuth();

  // Use the custom hook to fetch products
  const { products, loading, error } = useProducts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Select random products
  const randomProducts = [...products]
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);
  console.log(randomProducts);

  return (
    <div className="home-container">
      <h2 className="welcome-heading">Welcome to our book store!</h2>
      <p>Check out some of our books!</p>
      <div className="random-products-grid">
        {randomProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={"https://picsum.photos/id/237/200/300"} // Assuming Image is an object with a `url` field
              alt={product.name}
              className="product-image"
            />
            <h3>{product.name}</h3> {/* Use 'Name' instead of 'name' */}
            <p>{product.description}</p>{" "}
            {/* Use 'Description' instead of 'description' */}
            <p>
              <strong>${product.price}</strong>{" "}
              {/* Use 'Price' instead of 'price' */}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
