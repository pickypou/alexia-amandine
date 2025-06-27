import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import "@styles/customCard.css"; // On ajoute les styles plus bas
const CustomCard = ({ name, description, imageUrl, price, onDelete, }) => {
    return (_jsx("div", { className: "card-wrapper", children: _jsxs("div", { className: "custom-card", children: [imageUrl && (_jsx("img", { src: imageUrl, alt: name, className: "custom-card-image" })), _jsxs("div", { className: "custom-card-content", children: [_jsxs("div", { className: "custom-card-header", children: [_jsx("h3", { className: "custom-card-title", children: name }), onDelete && (_jsx("button", { onClick: onDelete, className: "custom-card-delete", "aria-label": "Supprimer", title: "Supprimer", children: "\uD83D\uDDD1\uFE0F" }))] }), _jsx("p", { className: "custom-card-description", children: description }), price !== undefined && (_jsxs("p", { className: "custom-card-price", children: [price, " \u20AC"] }))] })] }) }));
};
export default CustomCard;
