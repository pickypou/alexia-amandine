import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/AppRouter"; // Importez votre router
import 'bootstrap/dist/css/bootstrap.min.css';
import '@styles/global.css';
import '@styles/button.css';
import "@styles/appBar.css";
ReactDOM.createRoot(document.getElementById("root")).render(_jsxs(React.StrictMode, { children: [_jsx(RouterProvider, { router: router }), " "] }));
