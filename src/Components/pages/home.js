import React from 'react';

import {products } from './products';

function Home(){

    return(
        //creating a bootstrap class
        <div className = "container">
            <div className="card mt-4">
                <div className="card-body">
                    <h1 className  = 'text-3xl my-5'>List Products</h1>
                    <h2>
                        Home Page 
                    </h2>
                </div>
            </div>
        </div>
    );
}

export default Home;