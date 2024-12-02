// header.js
import React from 'react';
import {Link} from 'react-router-dom';
import Cart from '../assets/images/Cart.png';

const Header = () => {
  return( 
  
  <header className='flex-justify-between items-center'>
    <Link to="/" className='text-xl font-semibold'>Home</Link>
    <div className='w-10 h-10 bg-gray-100 rounded-full flex justify-center items-center position-relative'>
        <img src = {Cart} alt = "" className='w-6'/>
       
        <span className='absolute  top-2/3 right-1/2 bg-blue-500  text-white text-sm  w-5 h-5 rounded-full' > 0 </span>
    </div>
    </header>)
};

export default Header;
