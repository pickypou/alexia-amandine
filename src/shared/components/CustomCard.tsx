import React, { useState} from "react";
import "@styles/customCard.css"; // On ajoute les styles plus bas

type CardProps = {
  name: string;
  description ?: string;
  message ?: string;
  imageUrl?: string;
  price?: string | number;
  onDelete?: () => void; // Optionnel
};

const CustomCard: React.FC<CardProps> = ({
  name,
  description,
  imageUrl,
  price,
  message,
  onDelete,
}) => {
  const [expanded, setExpanded] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') setShowModal(false);
  };


  return (
    <>
    <div className="card-wrapper">
    <div className="custom-card">
      {imageUrl && (
        <img
         src={imageUrl} 
         alt={name}
          className="custom-card-image"
          onClick={() => setShowModal(true)}
              style={{ cursor: 'zoom-in' }}
          />
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
       
         {message && (
            <p
              className={`custom-card-message ${expanded ? 'expanded' : ''}`}
              onClick={() => setExpanded(!expanded)}
              style={{ cursor: 'pointer' }}
              title="Cliquez pour voir plus"
            >
              {message}
            </p>
          )}
        <p className="custom-card-description">{description}</p>
        {price !== undefined && (
          <p className="custom-card-price">{price} €</p>
        )}
      </div>
    </div>
    </div>
       {showModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowModal(false)}
          onKeyDown={handleKeyDown}
          tabIndex={0} // pour capturer la touche Échap
        >
          <img
            src={imageUrl}
            alt={name}
            className="modal-image"
            onClick={(e) => e.stopPropagation()} // Empêche la fermeture au clic sur l'image
          />
        </div>
      )}
</>
  );
};

export default CustomCard;
