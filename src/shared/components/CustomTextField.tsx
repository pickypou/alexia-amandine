import React from "react";
import type { InputHTMLAttributes } from "react";
import'@styles/customTextField.css';

interface CustomTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string; 
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({ label, error, className, ...inputProps }) => {
  return (
    <div className={`custom-text-field ${className ?? ""}`}>
      {label && <label>{label}</label>}
      <input {...inputProps} />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default CustomTextField;
