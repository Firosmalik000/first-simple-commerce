import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ProductProvider from './contexts/ProductContext';

import CartProvider from './contexts/CartContext';
import DarkModeContextProvider from './contexts/DarkModeContext';
import { AuthContextProvider } from './contexts/AuthContext';
import { SnackbarProvider } from 'notistack';
import AddressProvider from './contexts/adressContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DarkModeContextProvider>
    <CartProvider>
      <ProductProvider>
        <SnackbarProvider>
          <AuthContextProvider>
            <AddressProvider>
              <React.StrictMode>
                <App />
              </React.StrictMode>
            </AddressProvider>
          </AuthContextProvider>
        </SnackbarProvider>
      </ProductProvider>
    </CartProvider>
  </DarkModeContextProvider>
);
