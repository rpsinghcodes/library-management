import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import AuthrProvider from './context/AuthContext';
import './index.css'
import App from './App.jsx'
import BooksProvider from './context/BooksContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthrProvider>
    <BooksProvider>
      <App />
      </BooksProvider>
      </AuthrProvider>
    </BrowserRouter>
  </StrictMode>,
)
