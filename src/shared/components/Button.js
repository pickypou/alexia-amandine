import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { useNavigate } from "react-router-dom";
const Button = ({ label, type = 'default', onClick, redirectTo, disabled, }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        if (onClick)
            onClick();
        if (redirectTo)
            navigate(redirectTo);
    };
    const baseClass = 'btn';
    const typeClass = `btn-${type}`; // => btn-submit, btn-delete, etc.
    const className = `${baseClass} ${typeClass}`;
    return (_jsx("button", { className: className, onClick: handleClick, disabled: disabled, children: label }));
};
export default Button;
