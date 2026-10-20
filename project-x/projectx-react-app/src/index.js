import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // ← ADD THIS LINE
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);