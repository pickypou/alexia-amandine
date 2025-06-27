import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import '@styles/customTextField.css';
const CustomTextField = ({ label, error, className, ...inputProps }) => {
    const isFileInput = inputProps.type === "file";
    const inputId = inputProps.name || "file-" + Math.random().toString(36).slice(2, 8);
    return (_jsxs("div", { className: `custom-text-field ${className ?? ""}`, children: [label && _jsx("label", { htmlFor: inputId, children: label }), isFileInput ? (_jsxs(_Fragment, { children: [_jsx("label", { htmlFor: inputId, className: "custom-file-label", children: "\uD83D\uDCC1 Choisir un fichier" }), _jsx("input", { id: inputId, ...inputProps, className: "hidden-file-input" })] })) : (_jsx("input", { id: inputId, ...inputProps })), error && _jsx("p", { className: "error-message", children: error })] }));
};
export default CustomTextField;
