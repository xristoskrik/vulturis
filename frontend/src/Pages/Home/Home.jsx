import React from "react";
import { products } from "./products";
import "./Home.css";
import { useAuth } from "../../AuthContext";
import { useEffect } from "react";
const Home = () => {
  const { handleToken, user, isLoggedIn } = useAuth();

  useEffect(() => {
    handleToken(); // Automatically fetch user data on component mount
  }, []);
  const randomProducts = [...products]
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  return (
    <div className="home-container">
      <h2 className="welcome-heading">Welcome to our book store!</h2>
      <p>Check out some of our books!</p>
      <div className="random-products-grid">
        {randomProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>
              <strong>${product.price}</strong>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
