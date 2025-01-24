import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SecondApp from './components/numerologyCalculator/SecondApp';
import { register } from './ServiceWorker';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

register();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/galaxy" element={<SecondApp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);