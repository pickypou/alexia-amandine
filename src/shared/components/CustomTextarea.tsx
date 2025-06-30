import React from "react";
import "@styles/customTextarea.css"; // si tu veux du style séparé

interface CustomTextareaProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  name?: string;
  rows?: number;
  error?: string;
}

const CustomTextarea: React.FC<CustomTextareaProps> = ({
  label,
  value,
  onChange,
  placeholder,
  name,
  rows = 4,
  error,
}) => {
  return (
    <div className="custom-textarea-container mt-5">
      <label className="custom-label">{label}</label>
      <textarea
        className={`custom-textarea ${error ? "has-error" : ""}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        rows={rows}
      />
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default CustomTextarea;
