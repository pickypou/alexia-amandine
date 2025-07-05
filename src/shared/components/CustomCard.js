import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from "react";
import "@styles/customCard.css"; // On ajoute les styles plus bas
const CustomCard = ({ name, description, imageUrl, price, message, onDelete, }) => {
    const [expanded, setExpanded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const handleKeyDown = (e) => {
        if (e.key === 'Escape')
            setShowModal(false);
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "card-wrapper", children: _jsxs("div", { className: "custom-card", children: [imageUrl && (_jsx("img", { src: imageUrl, alt: name, className: "custom-card-image", onClick: () => setShowModal(true), style: { cursor: 'zoom-in' } })), _jsxs("div", { className: "custom-card-content", children: [_jsxs("div", { className: "custom-card-header", children: [_jsx("h3", { className: "custom-card-title", children: name }), onDelete && (_jsx("button", { onClick: onDelete, className: "custom-card-delete", "aria-label": "Supprimer", title: "Supprimer", children: "\uD83D\uDDD1\uFE0F" }))] }), message && (_jsx("p", { className: `custom-card-message ${expanded ? 'expanded' : ''}`, onClick: () => setExpanded(!expanded), style: { cursor: 'pointer' }, title: "Cliquez pour voir plus", children: message })), _jsx("p", { className: "custom-card-description", children: description }), price !== undefined && (_jsxs("p", { className: "custom-card-price", children: [price, " \u20AC"] }))] })] }) }), showModal && (_jsx("div", { className: "modal-overlay", onClick: () => setShowModal(false), onKeyDown: handleKeyDown, tabIndex: 0, children: _jsx("img", { src: imageUrl, alt: name, className: "modal-image", onClick: (e) => e.stopPropagation() }) }))] }));
};
export default CustomCard;
