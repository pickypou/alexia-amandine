import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/layouts/PublicLayout.tsx
import AppBar from '@components/AppBar';
import Footer from '@components/Footer';
import HomePage from '@pages/home/pages/home';
import { Outlet } from 'react-router-dom';
const PublicLayout = () => {
    return (_jsxs(_Fragment, { children: [_jsx(AppBar, {}), _jsxs("main", { style: { minHeight: '80vh' }, children: [_jsx(HomePage, {}), _jsx(Outlet, {}), " "] }), _jsx(Footer, {})] }));
};
export default PublicLayout;
