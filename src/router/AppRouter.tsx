import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "@pages/home/pages/home";
import AdminPage from "../features/admin/pages/adminPage";
import Login from "@auth/login";
import Register from "@auth/register";

import AdminLayout from "@layouts/adminLayout";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Layout principal (contient AppBar, Footer, etc.)
    children: [
      { index: true, element: <Home /> }, // Page d'accueil
   // { path: "admin", element: <AdminPage /> },
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout />, 
    children: [
      { index: true, element: <AdminPage /> },
      {path: "register", element: <Register />},
      {path: "login", element: <Login /> } // Page d'administration
     
    ]// Page d'administration
  }
]);