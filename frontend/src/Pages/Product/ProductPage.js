import React, { useState } from 'react';
import './ProductPage.css'; 
import icon from './ErosTheBittersweet.jfif';

const ProductPage = () => {
  const [reviews, setReviews] = useState([
    { id: 1, name: "Alice", rating: 5, comment: "A thought-provoking masterpiece!" },
    { id: 2, name: "John", rating: 4, comment: "Really makes you think about love and desire." },
    { id: 3, name: "Sophia", rating: 5, comment: "Absolutely loved it, a must-read!" }
  ]);

  return (
    <div className="product-page">
      {/* Product Display Section */}
      <div className="product-container">
        <div className="product-image">
          <img src={icon} alt="Eros the Bittersweet" />
        </div>
        <div className="product-details">
          <h1 className="product-title">Eros the Bittersweet</h1>
          <p className="product-author">By Anne Carson</p>
          <p className="product-description">
            "Eros the Bittersweet" is a deep dive into the complexities of love, passion, and longing.
            This philosophical exploration of desire combines literature, psychology, and poetic analysis 
            to uncover the paradoxes of love.
          </p>
          <p className="product-price">$19.99</p>
          
          <div className="product-actions">
            <button className="add-to-cart-button">Add to Cart</button>
            <button className="buy-now-button">Buy Now</button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h2>Customer Reviews</h2>
        {reviews.length > 0 ? (
          <ul className="reviews-list">
            {reviews.map((review) => (
              <li key={review.id} className="review-item">
                <strong>{review.name}</strong> - 
                <span className="review-rating">{"⭐".repeat(review.rating)}</span>
                <p>{review.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet. Be the first to leave a review!</p>
        )}
      </div>

      {/* Related Products Section */}
     
    </div>
  );
};

export default ProductPage;

