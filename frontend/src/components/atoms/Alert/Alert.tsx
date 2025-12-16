import { useEffect, useState } from "react";
import React from "react";
import "./Alert.scss";
import type { IAlert } from "./Alert.props";

export const Alert: React.FC<IAlert> = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 100); // Supprime la modale après l'animation
  };

  return (
    <div className={`toast-container ${visible ? "show" : "hide"}`}>
      <div className={`toast ${type}-alert`}>
        <span className="toast-message">{message}</span>
        <button className="toast-close" onClick={handleClose}>
          ✖
        </button>
      </div>
    </div>
  );
};
