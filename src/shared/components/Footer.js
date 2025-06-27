import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import '../../styles/footer.css';
export default function Footer() {
    return (_jsxs("footer", { className: "footer footer-row", children: [_jsx(Link, { to: "/admin", children: _jsx("img", { src: "images/logo.jpg", className: "img-footer" }) }), "\u00A9 ", new Date().getFullYear(), " F\u00E9erique & p\u00E9tillante tout drois r\u00E9serv\u00E9", _jsx("a", { href: 'https://ludovicspysschaert.fr/', children: "Cr\u00E9ation Ludovic SPYSSCHAERT" })] }));
}
