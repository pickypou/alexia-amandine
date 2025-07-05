import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import "@styles/appBar.css";
export default function AppBarAdmin() {
    const navigate = useNavigate();
    const auth = getAuth();
    const [showDrawer, setShowDrawer] = useState(false);
    const toggleDrawer = () => setShowDrawer((prev) => !prev);
    const closeDrawer = () => setShowDrawer(false);
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/");
        }
        catch (error) {
            console.error("Erreur lors de la déconnexion :", error);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs("header", { className: "header", children: [_jsxs("nav", { className: "desktop-nav", children: [_jsx(Link, { to: "/admin/account", className: "link", children: "Accueil" }), _jsx(Link, { to: "/admin/addCreated", className: "link", children: "Ajouter une cr\u00E9ation" }), _jsx(Link, { to: "/admin/deleteCreated", className: "link", children: "Supprimer une cr\u00E9ation" }), _jsx(Link, { to: "/admin/deleteAvis", className: "link", children: "Supprimer un avis client" }), _jsx("button", { className: "iconbutton", onClick: handleLogout, "aria-label": "D\u00E9connexion", style: {
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    color: "var(--color-surface)",
                                    fontSize: "1.5rem",
                                    marginLeft: "1rem",
                                }, title: "Se d\u00E9connecter", children: "\uD83D\uDD12" })] }), _jsx("div", { className: "mobile-nav", children: _jsx("button", { className: "hamburger", onClick: toggleDrawer, children: "\u2630" }) })] }), showDrawer && _jsx("div", { className: "overlay", onClick: closeDrawer }), _jsx("div", { className: `mobile-drawer ${showDrawer ? "open" : ""}`, children: _jsxs("div", { className: "drawer-content", children: [_jsx(Link, { to: "/admin/account", className: "link", onClick: closeDrawer, children: "Accueil" }), _jsx(Link, { to: "/admin/addCreated", className: "link", onClick: closeDrawer, children: "Ajouter une cr\u00E9ation" }), _jsx(Link, { to: "/admin/deleteCreated", className: "link", onClick: closeDrawer, children: "Supprimer une cr\u00E9ation" }), _jsx(Link, { to: "/admin/deleteAvis", className: "link", onClick: closeDrawer, children: "Supprimer un avis client" }), _jsx("button", { className: "iconbutton", onClick: () => {
                                closeDrawer();
                                handleLogout();
                            }, style: {
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "var(--color-surface)",
                                fontSize: "1.5rem",
                                marginTop: "1rem",
                            }, children: "\uD83D\uDD12 D\u00E9connexion" })] }) })] }));
}
