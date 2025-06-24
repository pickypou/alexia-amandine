import React from "react";
import "@styles/customCard.css"; // On ajoute les styles plus bas

type CardProps = {
  name: string;
  description: string;
  imageUrl?: string;
  price?: string | number;
  onDelete?: () => void; // Optionnel
};

const CustomCard: React.FC<CardProps> = ({
  name,
  description,
  imageUrl,
  price,
  onDelete,
}) => {
  return (
    <div className="card-wrapper">
    <div className="custom-card">
      {imageUrl && (
        <img src={imageUrl} alt={name} className="custom-card-image" />
      )}
      <div className="custom-card-content">
        <div className="custom-card-header">
          <h3 className="custom-card-title">{name}</h3>
          {onDelete && (
            <button
              onClick={onDelete}
              className="custom-card-delete"
              aria-label="Supprimer"
              title="Supprimer"
            >
              🗑️
            </button>
          )}
        </div>
        <p className="custom-card-description">{description}</p>
        {price !== undefined && (
          <p className="custom-card-price">{price} €</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default CustomCard;
