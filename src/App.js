//import logo from 'C:/Users/Amanda/Pictures/Saved Pictures/engraving-of-cinereous-vulture-vector-18919332.jpg';
import './App.css';
import React from 'react';
import Layout from './Components/layout';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from 'react-router-dom';  // Correct import
import Navbar from './Components/inc/Navbar';
import Home from './Components/pages/home';
import Detail from './Components/pages/detail'
import AboutUs from './Components/pages/about-us';
import Contact from './Components/pages/contact';


const root=document.getElementById("root");

//ReactDOM.createRoot(root).render(
  //<BrowserRouter>  {/* Wrap the whole app with BrowserRouter */}
   // <App />
  //</BrowserRouter>
//);  

// Main App Component
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=':slug' element={<Detail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
