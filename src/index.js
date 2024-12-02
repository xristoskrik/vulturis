import React from 'react';
import Howl from 'react-howler';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//adding bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

//import 'bootstrap\\dist\\css\\bundle.min.js';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  //document.getElementById('bookapp')
);
//import React, { useState } from 'react';

//Bitch put some music ---> Afierwmeno ston Niko


const MusicWithURL = () => {
    return (
        <div>
            <audio controls>
                <source src="https://www.youtube.com/watch?v=Lq-i6d86leg" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default MusicWithURL;


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
