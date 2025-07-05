import React from "react";
import type { InputHTMLAttributes } from "react";
import'@styles/customTextField.css';

interface CustomTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string; 
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  error,
  className,
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
        <input id={inputId} {...inputProps} />
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default CustomTextField;
