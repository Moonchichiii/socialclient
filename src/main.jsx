import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import { CurrentUserProvider } from './contexts/CurrentUserContext'; 
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <CurrentUserProvider>
    <App />
    </CurrentUserProvider> 
  </React.StrictMode>,
)
