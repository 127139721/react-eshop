import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { UserProvider } from "./contexts/user.context";
import { CategoriesProvider  } from "./contexts/categories.context";
import { CartProvider  } from "./contexts/cart.context";
import "./index.scss";

const rootElement = document.getElementById("root");

//代表 ProductProvider 可以取用 UserProvider data, ex.某些 products 只能給特定 users 看到
render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CategoriesProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CategoriesProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
