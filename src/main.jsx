import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Products from "./pages/Products.jsx";
import Users from "./pages/Users.jsx";
import Home from "./pages/Home.jsx";
import EditProduct from "./pages/EditProduct.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home/>}/>
      <Route path="products" element={<Products />} />
      <Route path="users" element={<Users />} />
      <Route path="editproduct/:id" element={<EditProduct/>}/>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
