import React, { useState } from 'react';
import './ProductPage.css'; 
import { useProducts } from './useProducts';
import icon1 from './historyOfTime.jpg';
import icon2 from './iliad.jpg';
import icon3 from './pride&Prejudice.jpg';
import icon4 from './theFaultInOurStars.jpg';
import icon5 from './Republic.jpg';
import icon6 from './ThePrince.jpg';
import icon7 from './onBeauty.jpeg';
import icon8 from './persuasion.jpg';
import icon9 from './annaKarenina.jpg';
import icon10 from './HouseOfTheProphet.jpg';
import icon11 from './Hindu.jpg';
import icon12 from './letters.jpg';
import icon13 from './women.jpg';
import icon14 from './divine.jpeg';
import icon15 from './theWay.jpeg';

const ProductPage = () => {
  const { products, loading, error } = useProducts(); // Fetch products using the hook
  const [reviews, setReviews] = useState([
    { id: 1, name: "Alice", rating: 5, comment: "A thought-provoking masterpiece!" },
    { id: 2, name: "John", rating: 4, comment: "Really makes you think about love and desire." },
    { id: 3, name: "Sophia", rating: 5, comment: "Absolutely loved it, a must-read!" }
  ]);

  const [selectedGenre, setSelectedGenre] = useState(null);

  const genreBooks = {
    "History-Literature": [
      { id: 1, title: "The History of Time", author: "Stephen Hawking", price: "$15.00", imgSrc: icon1 },
      { id: 2, title: "The Iliad", author: "Homer", price: "$10.00", imgSrc: icon2 }
    ],
    Comedy: [
      { id: 15, title: "Divine Comedy", author: "Niccolò Machiavelli", price: "$15.00", imgSrc: icon14 },
      { id: 16, title: "The Way You Make Me Feel", author: "Maurene Goo", price: "$10.80", imgSrc: icon15 }
    ],
    "Romantic Drama": [
      { id: 3, title: "Pride and Prejudice", author: "Jane Austen", price: "$12.00", imgSrc: icon3 },
      { id: 4, title: "The Fault in Our Stars", author: "John Green", price: "$14.00", imgSrc: icon4 }
    ],
    Politics: [
      { id: 5, title: "The Republic", author: "Plato", price: "$18.00", imgSrc: icon5 },
      { id: 6, title: "The Prince", author: "Niccolò Machiavelli", price: "$16.00", imgSrc: icon6 }
    ],
    History: [
      { id: 7, title: "On Beauty", author: "Umberto Eco", price: "$20.00", imgSrc: icon7 },
      { id: 8, title: "On Ugliness", author: "Umberto Eco", price: "$20.00", imgSrc: icon7 }
    ],
    Romance: [
      { id: 9, title: "Persuasion", author: "Jane Austen", price: "$11.90", imgSrc: icon8 },
      { id: 10, title: "Anna Karenina", author: "Leo Tolstoy", price: "$12.90", imgSrc: icon9 }
    ],
    "Historical Mysticism": [
      { id: 11, title: "The House of the Prophet", author: "Claude Addas", price: "$10.90", imgSrc: icon10 },
      { id: 12, title: "Hindu Mysticism", author: "Surendranath Gupta", price: "$25.00", imgSrc: icon11 }
    ],
    "Ancient Greek Literature": [
      { id: 13, title: "Ancient Greek Literary Letters", author: "Patricia A. Rosenmeyer", price: "$18.80", imgSrc: icon12 },
      { id: 14, title: "Women Writers of Ancient Greece and Rome", author: "I.M. Plant", price: "$20.00", imgSrc: icon13 }
    ]
  };

  const handleGenreClick = (genre) => {
  
  //some debugging lines 
   console.log("Selected genre:", genre);  // Logging the selected genre
  console.log("Books for selected genre:", genreBooks[genre]);
    setSelectedGenre(genre); 
  };

  return (
    <div className="product-page">
      <div className="product-container">
        <div className="product-image">
          <img src={icon2} alt="Iliad" />
        </div>
        <div className="product-details">
          <h1 className="product-title">Eros the Bittersweet</h1>
          <p className="product-author">By Anne Carson</p>
          <p className="product-description">
            "Eros the Bittersweet" is a deep dive into the complexities of love, passion, and longing.
            This philosophical exploration of desire combines literature, psychology, and poetic analysis 
            to uncover the paradoxes of love.
          </p>
          <p className="product-price">$12.00</p>
          <div className="product-actions">
            <button className="add-to-cart-button">Add to Cart</button>
            <button className="buy-now-button">Buy Now</button>
          </div>
        </div>
      </div>

      <div className="genre-buttons">
        <button onClick={() => handleGenreClick("History-Literature")}>History-Literature</button>
        <button onClick={() => handleGenreClick("Comedy")}>Comedy</button>
        <button onClick={() => handleGenreClick("Romantic Drama")}>Romantic Drama</button>
        <button onClick={() => handleGenreClick("Politics")}>Politics</button>
        <button onClick={() => handleGenreClick("History")}>History</button>
        <button onClick={() => handleGenreClick("Romance")}>Romance</button>
        <button onClick={() => handleGenreClick("Historical Mysticism")}>Historical Mysticism</button>
        <button onClick={() => handleGenreClick("Ancient Greek Literature")}>Ancient Greek Literature</button>
      </div>

      <div className="related-products">
        <h2>{selectedGenre ? `${selectedGenre} Books` : "Select a Genre"}</h2>
        {selectedGenre ? (
          genreBooks[selectedGenre] && genreBooks[selectedGenre].length > 0 ? (
            <div className="books-list">
              {genreBooks[selectedGenre].map((book) => (
                <div key={book.id} className="book-item">
                  <img src={book.imgSrc} alt={book.title} />
                  <div className="book-details">
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                    <p className="book-price">{book.price}</p>
                    <button className="add-to-cart-button">Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No books available in this category.</p>
          )
        ) : (
          <p>Select a genre to view books.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;

