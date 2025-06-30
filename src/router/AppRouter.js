import { jsx as _jsx } from "react/jsx-runtime";
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
import ContactPage from "@pages/contactPage/contactPage";
import { AddAvisClient } from "@pages/avis_clients/addAvisClients";
import { AvisClientsList } from "@pages/avis_clients/avisClientsList";
export const router = createBrowserRouter([
    {
        path: "/",
        element: _jsx(App, {}),
        children: [
            { index: true, element: _jsx(Home, {}) },
            { path: "couture/:category", element: _jsx(CreatedListPage, {}) },
            { path: "papier/:category", element: _jsx(CreatedListPage, {}) },
            { path: "crochet/:category", element: _jsx(CreatedListPage, {}) },
            { path: "contact", element: _jsx(ContactPage, {}) },
            { path: "addavisClient", element: _jsx(AddAvisClient, {}) },
            { path: "avisClients", element: _jsx(AvisClientsList, {}) }, // Minuscule ici
            {
                path: "personnalisable/:category",
                element: _jsx(CreatedListPage, { isCustomPage: true })
            },
        ],
    },
    {
        path: "/admin",
        element: _jsx(AdminLayout, {}),
        children: [
            { index: true, element: _jsx(AdminPage, {}) },
            { path: "register", element: _jsx(Register, {}) },
            { path: "login", element: _jsx(Login, {}) },
            { path: "account", element: _jsx(Account, {}) },
            { path: "addCreated", element: _jsx(AddCreated, {}) },
            { path: "deleteCreated", element: _jsx(DeleteCreated, {}) }
        ]
    }
]);
