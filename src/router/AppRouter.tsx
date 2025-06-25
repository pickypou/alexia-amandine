import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "@pages/home/pages/home";
import AdminPage from "../features/admin/pages/admin/adminPage";
import Login from "@auth/login";
import Register from "@auth/register";
import AdminLayout from "@layouts/adminLayout";
import Account from "@admin/pages/acount/account";
import CreatedListPage from '@pages/createdPage/CreatedListPage';
import AddCreated from "@admin/pages/adminAddCreated/addCreated";
import DeleteCreated from "@admin/pages/admin/adminDeleteCreated/deleteCreated";


export const router = createBrowserRouter([
  {
     path: "/",
  element: <App />,
  children: [
    { index: true, element: <Home /> },

    // ✅ Pages par collection et catégorie
    { path: "couture/:category", element: <CreatedListPage /> },
    { path: "papier/:category", element: <CreatedListPage /> },
    { path: "crochet/:category", element: <CreatedListPage /> },

    // ✅ Pages personnalisables
{
  path: "personnalisable/:category",
  element: <CreatedListPage isCustomPage={true} />
}
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
      {path: 'addCreated', element: <AddCreated />},
      {path: 'deleteCreated', element: <DeleteCreated />}
     
    ]// Page d'administration
  }
]);