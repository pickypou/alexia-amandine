import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import '@styles/footer.css';
export default function Footer() {
    const [open, setOpen] = useState(false);
    const menuContainerRef = useRef(null);
    const buttonRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuContainerRef.current &&
                buttonRef.current &&
                !menuContainerRef.current.contains(event.target) &&
                !buttonRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);
    const toggleMenu = (e) => {
        e.stopPropagation();
        setOpen(!open);
    };
    return (_jsx("footer", { className: "footer", children: _jsxs("div", { className: "footer-content", children: [_jsx(Link, { to: "/admin", children: _jsx("img", { src: "images/logo.jpg", className: "img-footer", alt: "Logo" }) }), _jsxs("span", { children: ["\u00A9 ", new Date().getFullYear(), " F\u00E9erique & p\u00E9tillante tout droits r\u00E9serv\u00E9s"] }), _jsx("a", { href: 'https://ludovicspysschaert.fr/', children: "Cr\u00E9ation Ludovic SPYSSCHAERT" }), _jsxs("div", { className: "menu-container", ref: menuContainerRef, children: [_jsx("button", { ref: buttonRef, className: "menu-button", onClick: toggleMenu, "aria-expanded": open, "aria-label": "Informations l\u00E9gales", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { fill: "black", d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10\n         10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" }) }) }), _jsx("div", { className: `dropdown-menu ${open ? 'open' : ''}`, children: _jsxs("ul", { children: [_jsx("li", { children: _jsx("a", { href: "/mentions-legales.html", target: "_blank", children: "Mentions l\u00E9gales" }) }), _jsx("li", { children: _jsx("a", { href: "/confidentialite.html", target: "_blank", children: "Confidentialit\u00E9" }) }), _jsx("li", { children: _jsx("a", { href: "/cookies.html", target: "_blank", children: "Cookies" }) })] }) })] })] }) }));
}
