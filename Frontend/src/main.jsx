import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./website/context/AuthProvider.jsx";
import { CartProvider } from "./website/context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="dark:bg-slate-900 dark:text-white min-h-screen">
            <App />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
