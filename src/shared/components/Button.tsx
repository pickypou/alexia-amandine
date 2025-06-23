import React from "react";
import { useNavigate } from "react-router-dom";
import '@styles/button.css'; 

type ButtonType = 'submit' | 'delete' | 'add' | 'default';

interface ButtonProps {
  label: string;
  type?: ButtonType;
  onClick?: () => void;
  redirectTo?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  type = 'default',
  onClick,
  redirectTo,
  disabled,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick();
    if (redirectTo) navigate(redirectTo);
  };

  const baseClass = 'btn';
  const typeClass = `btn-${type}`; // => btn-submit, btn-delete, etc.
  const className = `${baseClass} ${typeClass}`;

  return (
    <button className= {className}  onClick={handleClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
