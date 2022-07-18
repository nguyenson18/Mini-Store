import React from 'react';
// import { Counter } from './features/counter/Counter';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import {AuthProvider} from './contexts/AuthContext';
import Router from './routes';
import CartContextProvider from './contexts/CartContext';

function App() {
  return (
    <AuthProvider>
      <CartContextProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </CartContextProvider>
    </AuthProvider>
  );
}

export default App;
