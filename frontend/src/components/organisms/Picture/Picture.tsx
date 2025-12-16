import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../atoms/Button";
import type { IPictureProps } from "./Picture.props";
import "./Picture.scss";

export const Picture: React.FC<IPictureProps> = ({ page, id, onInteract }) => {
  if (page && id && onInteract)
    return (
      <>
        <h1>En cours de développement</h1>
        <Link to={`/admin/pictures`} className="btn-link">
          <Button
            className="secondary-button inline-button back-button"
            content="Retour"
          />
        </Link>
      </>
    );
};
