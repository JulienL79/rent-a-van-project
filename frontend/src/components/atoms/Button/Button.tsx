import type { IButtonProps } from "./Button.props";
import React from "react";
import "./Button.scss";

export const Button: React.FC<IButtonProps> = ({
  className = "primary-button",
  content,
  onClick,
  isDisabled = false,
  isScrollToTop = false,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isScrollToTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={`button-app ${className} ${isDisabled ? "disabled-button" : ""}`}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {content}
    </button>
  );
};
