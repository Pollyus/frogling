import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import Main from '../src/components/Main/Main'
import Registration from '../src/components/RegisterPage/RegisterPage'
import Login from '../src/components/InterPage/InterPage'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
    {/* <Main /> */}
    {/* <Registration></Registration> */}
    {/* <Login/> */}
  </BrowserRouter>
);

reportWebVitals();
