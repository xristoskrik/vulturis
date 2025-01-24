import React from 'react';
import ProductCart from './ProductCart';
import { products } from './products';
import "./cart.css";

const Cart = () => {
  return (
    <div className="cart-page">

      <div className="cart-grid">
        {products.map((product) => (
          <ProductCart key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};

export default Cart;

