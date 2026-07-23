import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";

import { ProductProvider } from "./context/ProductContext";
import { OrderProvider } from "./context/OrderContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductProvider>
        <OrderProvider>
          <App />
        </OrderProvider>
      </ProductProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
