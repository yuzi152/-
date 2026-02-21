import React from 'react';
import ReactDOM from 'react-dom/client';
import { ResumeProvider } from './contexts/ResumeContext';
import App from './App';
import './styles/globals.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ResumeProvider>
      <App />
    </ResumeProvider>
  </React.StrictMode>
);