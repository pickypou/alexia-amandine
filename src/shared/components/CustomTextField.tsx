import React from "react";
import type { InputHTMLAttributes } from "react";
import'@styles/customTextField.css';

interface CustomTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string; 
  suffix?: React.ReactNode; // Optional suffix for file input
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  error,
  className,
  suffix,
  ...inputProps
}) => {
  const isFileInput = inputProps.type === "file";
  const inputId = inputProps.name || "file-" + Math.random().toString(36).slice(2, 8);

  return (
    <div className={`custom-text-field ${className ??  ""}`}>
      {label && <label htmlFor={inputId}>{label}</label>}
{isFileInput ? (
  <>
    <label htmlFor={inputId} className="custom-file-label">📁 Choisir un fichier</label>
    <input id={inputId} {...inputProps} className="hidden-file-input" />
  </>
) : (
  <div className="input-wrapper">
  <input id={inputId} {...inputProps} className={suffix ? 'has-suffix' : ''} />
  {suffix && <div className="input-suffix">{suffix}</div>}
</div>

)}

      

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default CustomTextField;
