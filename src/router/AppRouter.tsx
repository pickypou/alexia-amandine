import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "@pages/home/pages/home";
import AdminPage from "../features/admin/pages/admin/adminPage";
import Login from "@auth/login";
import Register from "@auth/register";

import AdminLayout from "@layouts/adminLayout";
import Account from "@admin/pages/acount/account";
import CoutureByNamePage from "@pages/couture/CoutureByNamePage";
import AddCouture from "@admin/pages/couture/addCouture";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Layout principal (contient AppBar, Footer, etc.)
    children: [
      { index: true, element: <Home /> }, // Page d'accueil
     { path: "couture/:category", element: <CoutureByNamePage /> }
 // Page de couture par catégorie
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout />, 
    children: [
      { index: true, element: <AdminPage /> },
      {path: "register", element: <Register />},
      {path: "login", element: <Login /> }, 
      {path: "account", element: <Account /> },
      {path: 'addCouture', element: <AddCouture />}
     
    ]// Page d'administration
  }
]);