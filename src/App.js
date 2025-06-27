import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AppBar from "./shared/components/AppBar";
import Footer from "./shared/components/Footer";
import { Outlet } from "react-router-dom";
import '@styles/global.css';
export default function App() {
    return (_jsxs("div", { className: "app-container", children: [_jsx(AppBar, {}), _jsxs("main", { className: "main-content", children: [_jsx(Outlet, {}), " "] }), _jsx(Footer, {})] }));
}
