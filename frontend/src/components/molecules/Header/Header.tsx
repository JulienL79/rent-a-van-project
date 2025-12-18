import { NavItem } from "../../atoms/NavItem";
import { useAuthStore } from "../../../store/useAuthStore";
import { useState } from "react";
import "./Header.scss";
import { useFilterStore } from "../../../store/useFilterStore";
import type { IHeaderItemData } from "./Header.props";
import { HEADER_ITEMS } from "./HeaderData";

export const Header: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { setVehicleType } = useFilterStore();
  const isBurgerActive = isMenuOpen && !isClosing;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClick = () => {
    if (isMenuOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsClosing(false);
      }, 500);
    } else {
      setIsMenuOpen(true);
    }
  };

  const handleNavClick = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
    }, 500);
  };

  const canDisplayItem = (item: IHeaderItemData) => {
    if (!item.visibility || item.visibility === "ALL") return true;

    if (item.visibility === "AUTH") return isAuthenticated;
    if (item.visibility === "GUEST") return !isAuthenticated;
    if (item.visibility === "ADMIN") return user?.role === "admin";

    return false;
  };

  const handleItemAction = (action?: IHeaderItemData["action"]) => {
    switch (action) {
      case "SET_CAMPING_CAR":
        setVehicleType("camping-car");
        scrollToTop();
        break;
      case "SET_VAN":
        setVehicleType("van");
        scrollToTop();
        break;
      default:
        break;
    }
  };

  return (
    <header className="app-header">
      <nav>
        <NavItem to="/" content={"RentAVan"} className="logo" />

        <ul
          className={`nav-links ${isMenuOpen ? "open" : ""} ${isClosing ? "closing" : ""}`}
        >
          {HEADER_ITEMS.filter(canDisplayItem).map((item) => {
            const hasDropdown = !!item.dropdown;

            return (
              <li
                key={item.id}
                className={hasDropdown ? "profile-menu" : ""}
                onMouseEnter={() => hasDropdown && setActiveDropdown(item.id)}
                onMouseLeave={() => hasDropdown && setActiveDropdown(null)}
              >
                <NavItem
                  to={item.to!}
                  content={item.label}
                  onClick={() => {
                    handleItemAction(item.action);
                    handleNavClick();
                  }}
                />

                {hasDropdown && (
                  <ul
                    className={`dropdown ${
                      activeDropdown === item.id ? "open-dropdown" : ""
                    }`}
                  >
                    {item.dropdown!.map((sub) => (
                      <li key={sub.id}>
                        <NavItem
                          to={sub.to!}
                          content={sub.label}
                          onClick={handleNavClick}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>

        <div
          className={`menu-hamburger ${isBurgerActive ? "active" : ""}`}
          id="burger-menu"
          onClick={handleClick}
        >
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </nav>
    </header>
  );
};
