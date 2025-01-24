import React from 'react';
import ProductCart from './ProductCart';
import { products } from './products.js';
import "./cart.css"
const Cart = () => {

    return (
        //creating a bootstrap class
        <div>
            <h1 className='text-3xl my-5'>List Products</h1>
            <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5'>
                {products.map((product, key) =>
                    <ProductCart key={key} data={product} />

                )}
            </div>

        </div>


    );
}

export default Cart;
