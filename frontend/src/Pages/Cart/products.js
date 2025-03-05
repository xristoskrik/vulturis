import { useState, useEffect } from "react";


export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((response) => response.json())
      .then((data) => {
        // Normalize the product keys to lowercase
        const normalizedData = data.map((product) => ({
          id: product.ID, // Change ID to id
          name: product.Name,
          price: product.Price,
          category: product.Category,
          image: product.Image,
          // Add other fields as needed
        }));

        console.log("Normalized products:", normalizedData);
        setProducts(normalizedData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return { products, loading, error };
};

// If needed, you can also export the products array directly:
export const products = [ //maybe should change that
 
     
];
