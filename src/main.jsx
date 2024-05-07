import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import { CurrentUserProvider } from './contexts/CurrentUserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const queryClient = new QueryClient();  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>  
      <Router>
        <CurrentUserProvider>    
          <App />
        </CurrentUserProvider>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);
