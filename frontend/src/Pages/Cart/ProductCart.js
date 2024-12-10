
import React from 'react';
import { Link } from 'react-router-dom';
import { prod } from './products';

const ProductCart = (props) => {
  const divStyle = {
    backgroundColor: '#00C0C0', // Ocean blue
    color: 'white',
    padding: '20px', // Optional: add some padding for better visual
  };
  const { id, name, price, image, slug } = props.data;
  return (
    <div style={divStyle} className=' p-5 rounded-xl shadow-sm'>
      <Link to={slug}>
        <img src={image} alt='' className='w-full h-80 object-cover object-top drop-shadow-[0_10px_5px_#007]'></img>
      </Link>
      <h3 className='text-2xl py-3 text-center font-medium'>{name} </h3>
      <div className='flex justify-between items-center'>
        <p>
          $<span className='text-2xl font-medium'>{price}</span>
        </p>
        <button className='bg-blue-300 p-2 rounded-md text-sm hover:bg-blue-400'>Add to Cart</button>

      </div>

    </div>
  );
}

export default ProductCart;