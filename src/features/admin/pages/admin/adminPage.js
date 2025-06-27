import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Button from "@components/Button";
const AdminPage = () => {
    return (_jsxs("div", { children: [_jsx("h1", { children: "Bienvenue sur la page administration " }), _jsxs("div", { className: "button-container", children: [_jsx(Button, { type: "submit", label: "cr\u00E9er un compte", redirectTo: "/admin/register" }), _jsx(Button, { type: "submit", label: "Je me connecte", redirectTo: "/admin/login" }), _jsx(Button, { type: "submit", label: "Accieul ", redirectTo: "/" })] })] }));
};
export default AdminPage;
