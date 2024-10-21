import './Nav.css'


//importing router link

import { Link, NavLink } from 'react-router-dom'

//importing Logo

import Logo from 'C:\Users\Amanda\Documents\UNIVERSITY\vulturis\Frontend\engraving-of-cinereous-vulture-vector-18919332.jpg'

//importing  NavData

import {navLinks,navRight } from 'C:\Users\Amanda\Documents\UNIVERSITY\vulturis\Frontend\DataFrEnd\Data.js'


//importing enu button
import { AiOutlineMenu } from "react-icons/ai";
//importing closing button
import { MdOutlineClose } from "react-icons/md";

export default function Nav()
{
    return(
        <nav>
            <div className = "container nav-container">
                {//logo : Not sure yet how i will include it here -> I named the class after the 
                }
            <Link  to={'/'} className = 'engraving-of-cinereous-vulture-vector-18919332'></Link>
            <img   src={Logo} alt="Logo" />
</div>
            {/*.............Nav links..............*/}
            <ul class name= "nav-links">
                navLinks.map(({name, path},index) =&gt; {
                    return(
                        <li key={index}>
                            <NavLink to={path}>{
                                name}
                                </NavLink>
                        </li>
                    )
                &rbrace;
                )
                
            </ul>
            {/*.............Nav links..............*/}
            <div className="nav-right">{
            
            navRight.managements.map(({icon,link},index)=>{
                return(
                    <Link key={item,index}  className='management-icons' to={item.link}>


                    <item.icon/>
                    </Link>
                )
            })
            }
            <button className = 'menu-button btn btn-border'>
            <AiOutlineMenu />
            <MdOutlineClose />
                </button>          

            </div>

        </nav>
    )
}