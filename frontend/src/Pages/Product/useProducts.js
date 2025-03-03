import { useState, useEffect } from "react";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((response) => {
        // Check if the response is successful
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then((data) => {
        // Normalize the product keys to lowercase if necessary
        const normalizedData = data.map((product) => ({
          id: product.ID, // Adjust this to match the actual product data
          name: product.Name,
          price: product.Price,
          category: product.Category,
          image: product.Image,
        }));

        console.log("Normalized products:", normalizedData);
        setProducts(normalizedData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error); // Handle any errors that happen during the fetch
        setLoading(false);
      });
  }, []); // Empty dependency array means this runs once when the component mounts

  return { products, loading, error };
};

