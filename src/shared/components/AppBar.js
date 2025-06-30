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
                ["/couture/trousse", "Trousses/pochettes"],
                ["/couture/accessoires", "Accessoires"],
                ["/couture/divers", "Divers"]
            ]
        },
        {
            name: "papier",
            links: [
                ["/papier/emballage", "Emballage"],
                ["/papier/decoration", "Décoration"],
                ["/papier/accessoires", "Accessoires"],
                ["/papier/divers", "Divers"],
                ["/papier/fetes", "Fêtes/événements"]
            ]
        },
        {
            name: "crochet",
            links: [
                ["/crochet/sacs", "Sacs"],
                ["/crochet/peluches", "Peluches"],
                ["/crochet/poupees", "Poupées"],
                ["/crochet/Compositions-florales", "Compositions florales"],
                ["/crochet/couvertures", "Couvertures C2C"]
            ]
        },
        {
            name: "personnalisable",
            links: [
                ["/personnalisable/sac", "Sacs"],
                ["/personnalisable/trousses", "Trousses"],
                ["/personnalisable/textiles", "Textiles"],
                ["/personnalisable/Adhesif", "Adhésifs"],
                ["/personnalisable/tasses", "Tasses/Gobelets"],
                ["/personnalisable/fetes", "Fêtes/événements"],
                ["/personnalisable/accessoires", "Accessoires"]
            ]
        }
    ];
    return (_jsxs(_Fragment, { children: [_jsxs("header", { className: "header", children: [_jsxs("div", { className: "desktop-nav", children: [_jsx(Link, { to: "/", className: "link", children: "Accueil" }), sections.map(section => (_jsxs("div", { className: "dropdown", children: [_jsx("span", { className: "link", onClick: () => toggleDropdown(section.name), children: capitalize(section.name) }), _jsx("div", { className: `dropdown-content ${openDropdown === section.name ? 'visible' : ''}`, children: section.links.map(([to, label]) => (_jsx(Link, { to: to, className: "link-dropdown", children: label }, to))) })] }, section.name))), _jsx(Link, { to: "/contact", className: "link", children: "Contact" }), _jsx(Link, { to: "/avisClients", className: "link", children: "Avis-clients" })] }), _jsxs("div", { className: "mobile-nav", children: [_jsx("button", { className: "hamburger", onClick: toggleDrawer, children: "\u2630" }), _jsx(Link, { to: "/", className: "link", children: "Accueil" })] })] }), showDrawer && _jsx("div", { className: "overlay", onClick: closeDrawer }), _jsx("div", { className: `mobile-drawer ${showDrawer ? 'open' : ''}`, children: _jsxs("div", { className: "drawer-content", children: [_jsx(Link, { to: "/", className: "link", onClick: closeDrawer, children: "Accueil" }), sections.map(section => (_jsxs("div", { className: "drawer-section", children: [_jsx("span", { className: "link", onClick: () => toggleDropdown(section.name), style: { cursor: 'pointer' }, children: capitalize(section.name) }), _jsx("div", { className: `dropdown-content ${openDropdown === section.name ? 'visible' : ''}`, children: section.links.map(([to, label]) => (_jsx(Link, { to: to, className: "link-dropdown", onClick: closeDrawer, children: label }, to))) })] }, section.name))), _jsx(Link, { to: "/contact", className: "link", onClick: closeDrawer, children: "Contact" }), _jsx(Link, { to: "/avisClients", className: "link", onClick: closeDrawer, children: "Avis-clients" })] }) })] }));
    function capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
}
