import React from "react";
import { Link } from "react-router-dom";
import type { INavItemProps } from "./NavItem.props";
import { useNavigate } from "react-router-dom";
import "./NavItem.scss";

export const NavItem: React.FC<INavItemProps> = ({
  to,
  content,
  className = "",
  onClick,
}) => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
    scrollToTop();
    navigate(to);
  };

  if (onClick === undefined) {
    return (
      <Link to={to} className={`${className}`} onClick={handleClick}>
        {content}
      </Link>
    );
  }

  return (
    <Link to={to} className={`${className}`} onClick={handleClick}>
      {content}
    </Link>
  );
};
