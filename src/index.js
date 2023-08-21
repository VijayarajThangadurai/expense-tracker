import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import "../node_modules/react-bootstrap/dist/react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from './Components/Store/AuthContextProvider';
// import ExpenseProvider from './Components/Store/ExpenseContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <AuthContextProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </AuthContextProvider>
  
);


