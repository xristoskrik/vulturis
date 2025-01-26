import React from 'react';
import {Link} from 'react-router-dom';
function Navbar(){

    return(
        //creating a bootstrap class
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/AboutUs">About Us</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/Contact">Contact</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Our Products 
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="/">Books</a>
                 
                    <a class="dropdown-item" href="/"><li>  History</li></a>
                    <a class="dropdown-item" href="/"><li>  Literature and Fiction </li></a>
                    <a class="dropdown-item" href="/"><li>  Children's Books  </li></a>  
                   
                  </li>
                  <li><a class="dropdown-item" href="/">Stationery</a></li>
                  <li><hr class="dropdown-divider"></hr></li>
                  <li><a class="dropdown-item" href="/">Games</a></li>
                </ul>
              </li>
              <li class="nav-item">
               
              </li>
            </ul>
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
              </input>
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    );
}

export default Navbar;






