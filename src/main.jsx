import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss';
import App from './App.jsx';

//Get the root element from the HTML
const rootElement = document.getElementById('root');

//Create a React root and render the App component inside StrictMode

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
