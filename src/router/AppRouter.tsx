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
import ContactPage from "@pages/contactPage/contactPage";
import { AddAvisClient } from "@pages/avis_clients/addAvisClients";
import { AvisClientsList } from "@pages/avis_clients/avisClientsList";
import DeleteAvisClients from "@admin/pages/adminDeleteAvisClients/AdminDeleteAvisClients";
import DeleteCreated from "@admin/pages/adminDeleteCreated/deleteCreated";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
   
    children: [
      { index: true, element: <Home /> },
      { path: "couture/:category", element: <CreatedListPage /> },
      { path: "papier/:category", element: <CreatedListPage /> },
      { path: "crochet/:category", element: <CreatedListPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "addavisClient", element: <AddAvisClient /> },
      { path: "avisClients", element: <AvisClientsList /> }, // Minuscule ici
      { 
        path: "personnalisable/:category",
        element: <CreatedListPage isCustomPage={true} />
      },
     
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminPage /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> }, 
      { path: "account", element: <Account /> },
      { path: "addCreated", element: <AddCreated /> },
      { path: "deleteCreated", element: <DeleteCreated /> },
      { path: "deleteAvis", element: <DeleteAvisClients />}
    ]
  }
]);