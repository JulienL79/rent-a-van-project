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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { setVehicleType } = useFilterStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setTimeout(() => setIsMenuOpen(false), 200);
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

        <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
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
                    closeMenu();
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
                          onClick={closeMenu}
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
          className={`menu-hamburger ${isMenuOpen ? "active" : ""}`}
          id="burger-menu"
          onClick={toggleMenu}
        >
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </nav>
    </header>
  );
};
