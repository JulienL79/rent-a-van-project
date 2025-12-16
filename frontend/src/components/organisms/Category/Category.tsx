import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../atoms/Button";
import type { ICategoryProps } from "./Category.props";
import "./Category.scss";

export const Category: React.FC<ICategoryProps> = ({
  page,
  id,
  onInteract,
}) => {
  if (page && id && onInteract)
    return (
      <>
        <h1>En cours de développement</h1>
        <Link to={`/admin/categories`} className="btn-link">
          <Button
            className="secondary-button inline-button back-button"
            content="Retour"
          />
        </Link>
      </>
    );
};
