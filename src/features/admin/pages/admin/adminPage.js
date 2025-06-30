import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Button from "@components/Button";
const AdminPage = () => {
    return (_jsxs("div", { children: [_jsx("h1", { className: "mt-5", children: "Bienvenue sur la page administration " }), _jsxs("div", { className: "button-container", children: [_jsx(Button, { type: "submit", label: "Je me connecte", redirectTo: "/admin/login" }), _jsx(Button, { type: "submit", label: "retour sur le site ", redirectTo: "/" })] })] }));
};
export default AdminPage;
