import React from "react";
import type { IUserProps } from "./User.props";
import { Link } from "react-router-dom";
import { Button } from "../../atoms/Button";
import "./User.scss";

export const User: React.FC<IUserProps> = ({ page, id, onInteract }) => {
  if (page && id && onInteract)
    return (
      <>
        <h1>En cours de développement</h1>
        <Link to={`/admin/users`} className="btn-link">
          <Button
            className="secondary-button inline-button back-button"
            content="Retour"
          />
        </Link>
      </>
    );
};
