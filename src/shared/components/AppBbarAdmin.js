import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/shared/components/AppBarAdmin.tsx
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import '@styles/appBar.css';
export default function AppBarAdmin() {
    const navigate = useNavigate();
    const auth = getAuth();
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/'); // redirige vers /home après déconnexion
        }
        catch (error) {
            console.error("Erreur lors de la déconnexion :", error);
        }
    };
    return (_jsx("header", { className: "header", children: _jsxs("nav", { children: [_jsx(Link, { to: "/admin/account", className: "link", children: "Accueil" }), _jsx(Link, { to: "/admin/addCreated", className: "link", children: "Ajouter une cr\u00E9ation" }), _jsx(Link, { to: "/admin/deleteCreated", className: "link", children: "supprimer une cr\u00E9ation" }), _jsx("button", { onClick: handleLogout, "aria-label": "D\u00E9connexion", style: {
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--color-primary)',
                        fontSize: '1.5rem',
                        marginLeft: '1rem'
                    }, title: "Se d\u00E9connecter", children: "\uD83D\uDD12" })] }) }));
}
