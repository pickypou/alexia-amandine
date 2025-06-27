import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/AppRouter"; // Importez votre router
ReactDOM.createRoot(document.getElementById("root")).render(_jsxs(React.StrictMode, { children: [_jsx(RouterProvider, { router: router }), " "] }));
