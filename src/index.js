import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StateProvider } from './StateContext';
import { BrowserRouter as Router } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StateProvider>
    <Router>
      <Navbar/>
      <App />
      <Footer/>
    </Router>
  </StateProvider>
  

  
);
