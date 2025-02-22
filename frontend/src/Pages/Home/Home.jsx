import React, { useEffect } from "react";
import { Link } from "react-router-dom"; 
import "./Home.css";
import { useAuth } from "../../AuthContext";
import { useProducts } from "./products"; 

const Home = () => {
  const { handleToken } = useAuth();

  useEffect(() => {
    handleToken(); // Automatically fetch user data on component mount
  }, []);

  // Use the custom hook to fetch products
  const { products, loading, error } = useProducts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Select random products
  const randomProducts = [...products]
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  return (
    <div className="home-container">
      <h2 className="welcome-heading">Welcome to our book store!</h2>
      <p>Check out some of our books!</p>
      <div className="random-products-grid">
        {randomProducts.map((product) => {
          // Convert product name to a slug (replace spaces with underscores)
          const productSlug = product.name.replace(/\s+/g, "_");

          return (
            <div key={product.id} className="product-card">
              <Link to={`/product/${productSlug}`}>
                <img
                  src={`http://localhost:8080/images/${product.image.String}`}
                  alt={product.name}
                  className="product-image"
                />
                <h3>{product.name}</h3>
              </Link>
              <p>{product.description}</p>
              <p>
                <strong>${product.price}</strong>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;

