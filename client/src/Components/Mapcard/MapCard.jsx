import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MapCard.module.css";

const MapCard = ({ map, handleDownload, onCardSelect, isSelected }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const nav = (id) => {
    navigate(`/maps/${id}`);
  };

  return (
    <div
      className={`${styles.card} ${isSelected ? styles.selected : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // Call onCardSelect when the card is clicked
      onClick={() => onCardSelect(map._id)}
    >
      <div className={styles.content}>
        <h3 className={styles.title}>Map - {map._id}</h3>
        <p>Tiles Count: {map.tileCount}</p>
        <p>Uploaded At: {new Date(map.uploadedAt).toLocaleString()}</p>
      </div>
      {(isHovered || isSelected) && (
        <div className={styles.buttons}>
          {/* Changed onClick handler to call nav function */}
          <button onClick={() => nav(map._id)} className={styles.viewButton}>
            View
          </button>
          <button
            onClick={() => handleDownload(map._id)}
            className={styles.downloadButton}
          >
            Download
          </button>
        </div>
      )}
    </div>
  );
};

export default MapCard;
