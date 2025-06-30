import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import "@styles/customTextarea.css"; // si tu veux du style séparé
const CustomTextarea = ({ label, value, onChange, placeholder, name, rows = 4, error, }) => {
    return (_jsxs("div", { className: "custom-textarea-container mt-5", children: [_jsx("label", { className: "custom-label", children: label }), _jsx("textarea", { className: `custom-textarea ${error ? "has-error" : ""}`, value: value, onChange: onChange, placeholder: placeholder, name: name, rows: rows }), error && _jsx("div", { className: "error-text", children: error })] }));
};
export default CustomTextarea;
