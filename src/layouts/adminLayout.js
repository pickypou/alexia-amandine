import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/layouts/AdminLayout.tsx
import Footer from '@components/Footer';
import { Outlet } from 'react-router-dom';
const AdminLayout = () => {
    return (_jsxs("div", { className: "app-container", children: [_jsx("main", { className: "main-content", children: _jsx(Outlet, {}) }), _jsx(Footer, {})] }));
};
export default AdminLayout;
