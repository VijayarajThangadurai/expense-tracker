import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import "../node_modules/react-bootstrap/dist/react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from "./Store";
// import ExpenseProvider from './Components/Store/ExpenseContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  
    <Provider store={Store}>
  <BrowserRouter>
  
    <App />
    
  </BrowserRouter>
  </Provider>
  
);


