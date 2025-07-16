import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/components/AppBar.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
export default function AppBar() {
    const [showDrawer, setShowDrawer] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const toggleDrawer = () => setShowDrawer(!showDrawer);
    const closeDrawer = () => {
        setShowDrawer(false);
        setOpenDropdown(null);
    };
    const toggleDropdown = (name) => {
        setOpenDropdown(prev => (prev === name ? null : name));
    };
    const sections = [
        {
            name: "couture",
            links: [
                ["/couture/sac", "Sacs"],
                ["/couture/trousse-pochette", "Trousses & Pochettes"],
                ["/couture/accessoire", "Accessoires"],
                ["/couture/divers", "Divers"]
            ]
        },
        {
            name: "papier",
            links: [
                ["/papier/emballage", "Emballage"],
                ["/papier/decoration", "Décoration"],
                ["/papier/accessoire", "Accessoires"],
                ["/papier/divers", "Divers"],
                ["/papier/fete-evenement", "Fêtes & événements"]
            ]
        },
        {
            name: "crochet",
            links: [
                ["/crochet/sac-a-main", "Sacs"],
                ["/crochet/peluche", "Peluches"],
                ["/crochet/poupee", "Poupées"],
                ["/crochet/Composition-florale", "Compositions florales"],
                ["/crochet/couverture-c2c", "Couvertures C2C"],
                ["/crochet/accessoire", "Accessoires"]
            ]
        },
        {
            name: "personnalisable",
            links: [
                ["/personnalisable/sac", "Sacs"],
                ["/personnalisable/trousse", "Trousses"],
                ["/personnalisable/textile", "Textiles"],
                ["/personnalisable/adhesif", "Adhésifs"],
                ["/personnalisable/tasse-gobelet", "Tasses & Gobelets"],
                ["/personnalisable/fete-evenement", "Fêtes & événements"],
                ["/personnalisable/accessoire", "Accessoires"]
            ]
        }
    ];
    return (_jsxs(_Fragment, { children: [_jsxs("header", { className: "header", children: [_jsxs("div", { className: "desktop-nav", children: [_jsx(Link, { to: "/", className: "link", children: "Accueil" }), sections.map(section => (_jsxs("div", { className: "dropdown", children: [_jsx("span", { className: "link", onClick: () => toggleDropdown(section.name), children: capitalize(section.name) }), _jsx("div", { className: `dropdown-content ${openDropdown === section.name ? 'visible' : ''}`, children: section.links.map(([to, label]) => (_jsx(Link, { to: to, className: "link-dropdown", children: label }, to))) })] }, section.name))), _jsx(Link, { to: "/contact", className: "link", children: "Contact" }), _jsx(Link, { to: "/avisClients", className: "link", children: "Avis-clients" })] }), _jsx("div", { className: "mobile-nav", children: _jsx("button", { className: "hamburger", onClick: toggleDrawer, children: "\u2630" }) })] }), showDrawer && _jsx("div", { className: "overlay", onClick: closeDrawer }), _jsx("div", { className: `mobile-drawer ${showDrawer ? 'open' : ''}`, children: _jsxs("div", { className: "drawer-content", children: [_jsx(Link, { to: "/", className: "link", onClick: closeDrawer, children: "Accueil" }), sections.map(section => (_jsxs("div", { className: "drawer-section", children: [_jsx("span", { className: "link", onClick: () => toggleDropdown(section.name), style: { cursor: 'pointer' }, children: capitalize(section.name) }), _jsx("div", { className: `dropdown-content ${openDropdown === section.name ? 'visible' : ''}`, children: section.links.map(([to, label]) => (_jsx(Link, { to: to, className: "link-dropdown", onClick: closeDrawer, children: label }, to))) })] }, section.name))), _jsx(Link, { to: "/contact", className: "link", onClick: closeDrawer, children: "Contact" }), _jsx(Link, { to: "/avisClients", className: "link", onClick: closeDrawer, children: "Avis-clients" })] }) })] }));
    function capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
}
