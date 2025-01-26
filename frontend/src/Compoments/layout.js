import React from 'react' ;
import {Outlet}  from 'react-router-dom';
import Header from './header';
import {CartTab} from './cartTab';

 const Layout =()=>{
    return (

        <div className='bg-zinc-200'>
            <main>
                <Header/>
                <Outlet/>
            </main>
            <CartTab/>{/*Displays the list of books currently in the cart */}
            Layout
        </div>
    );
 };

 export default Layout;