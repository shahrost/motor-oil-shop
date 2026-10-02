import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";

import { ProductProvider } from "./context/ProductContext";
import { VehicleProvider } from "./context";
import { OrderProvider } from "./context/OrderContext";
import { CartProvider } from "./context/CartContext";
import { CustomerAuthProvider } from "./context/CustomerAuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <ThemeProvider>
          <ProductProvider>
            <VehicleProvider>
              <OrderProvider>
                <CartProvider>
                  <CustomerAuthProvider>
                    <App />
                  </CustomerAuthProvider>
                </CartProvider>
              </OrderProvider>
            </VehicleProvider>
          </ProductProvider>
        </ThemeProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
