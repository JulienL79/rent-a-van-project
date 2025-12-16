import { NavItem } from "../../atoms/NavItem";
import { useAuthStore } from "../../../store/useAuthStore";
import { useState } from "react";
import "./Header.scss";
import { useFilterStore } from "../../../store/useFilterStore";

export const Header: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { setVehicleType } = useFilterStore();
  const isBurgerActive = isMenuOpen && !isClosing;

  const handleChangeType = (type: "camping-car" | "van") => {
    setVehicleType(type);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClick = () => {
    if (isMenuOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsClosing(false);
      }, 500); // durée de l'animation slideLeft
    } else {
      setIsMenuOpen(true);
    }
  };

  const handleNavClick = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
    }, 500); // même durée que l'animation CSS
  };

  return (
    <header className="app-header">
      <nav>
        <NavItem to="/" content={"RentAVan"} className="logo" />

        <ul
          className={`nav-links ${isMenuOpen ? "open" : ""} ${isClosing ? "closing" : ""}`}
        >
          <li>
            <NavItem
              to={`/`}
              content={"Camping-car"}
              onClick={() => {
                handleChangeType("camping-car");
                scrollToTop();
                handleNavClick();
              }}
            />
          </li>
          <li>
            <NavItem
              to={`/`}
              content={"Van"}
              onClick={() => {
                handleChangeType("van");
                scrollToTop();
                handleNavClick();
              }}
            />
          </li>

          {user && user.role === "admin" && (
            <li
              className="profile-menu"
              onMouseEnter={() => setActiveDropdown("admin")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <NavItem
                to={`/admin/home`}
                content={"Administration"}
                onClick={() => {
                  setActiveDropdown(null);
                  handleNavClick();
                }}
              />
              <ul
                className={`dropdown ${activeDropdown === "admin" ? "open-dropdown" : ""}`}
              >
                <li>
                  <NavItem
                    to="/admin/home"
                    content="Accueil"
                    onClick={() => {
                      setActiveDropdown(null);
                      handleNavClick();
                    }}
                  />
                </li>
                <li>
                  <NavItem
                    to="/admin/users"
                    content="Utilisateurs"
                    onClick={() => {
                      setActiveDropdown(null);
                      handleNavClick();
                    }}
                  />
                </li>
                <li>
                  <NavItem
                    to="/admin/vehicles"
                    content="Véhicules"
                    onClick={() => {
                      setActiveDropdown(null);
                      handleNavClick();
                    }}
                  />
                </li>
                <li>
                  <NavItem
                    to="/admin/categories"
                    content="Catégories"
                    onClick={() => {
                      setActiveDropdown(null);
                      handleNavClick();
                    }}
                  />
                </li>
                <li>
                  <NavItem
                    to="/admin/equipments"
                    content="Équipements"
                    onClick={() => {
                      setActiveDropdown(null);
                      handleNavClick();
                    }}
                  />
                </li>
                <li>
                  <NavItem
                    to="/admin/pictures"
                    content="Photos"
                    onClick={() => {
                      setActiveDropdown(null);
                      handleNavClick();
                    }}
                  />
                </li>
                <li>
                  <NavItem
                    to="/admin/bookings"
                    content="Réservations"
                    onClick={() => {
                      setActiveDropdown(null);
                      handleNavClick();
                    }}
                  />
                </li>
                <li>
                  <NavItem
                    to="/admin/messages"
                    content="Messages"
                    onClick={() => {
                      setActiveDropdown(null);
                      handleNavClick();
                    }}
                  />
                </li>
              </ul>
            </li>
          )}

          <li
            className="profile-menu"
            onMouseEnter={() => setActiveDropdown("user")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            {isAuthenticated ? (
              <>
                <NavItem
                  to={`/profile/home`}
                  content={"Mon espace"}
                  onClick={() => {
                    setActiveDropdown(null);
                    handleNavClick();
                  }}
                />
                <ul
                  className={`dropdown ${activeDropdown === "user" ? "open-dropdown" : ""}`}
                >
                  <li>
                    <NavItem
                      to={`/profile/home`}
                      content={"Mon Profil"}
                      onClick={() => {
                        setActiveDropdown(null);
                        handleNavClick();
                      }}
                    />
                  </li>
                  <li>
                    <NavItem
                      to={`/profile/bookings`}
                      content={"Réservations"}
                      onClick={() => {
                        setActiveDropdown(null);
                        handleNavClick();
                      }}
                    />
                  </li>
                  <li>
                    <NavItem
                      to={`/profile/vehicles`}
                      content={"Véhicules"}
                      onClick={() => {
                        setActiveDropdown(null);
                        handleNavClick();
                      }}
                    />
                  </li>
                  <li>
                    <NavItem
                      to={`/profile/mailbox`}
                      content={"Messagerie"}
                      onClick={() => {
                        setActiveDropdown(null);
                        handleNavClick();
                      }}
                    />
                  </li>
                  <li>
                    <NavItem
                      to={`/profile/settings`}
                      content={"Paramètres"}
                      onClick={() => {
                        setActiveDropdown(null);
                        handleNavClick();
                      }}
                    />
                  </li>
                  <li>
                    <NavItem
                      to={`/logout`}
                      content={"Déconnexion"}
                      onClick={() => {
                        setActiveDropdown(null);
                        handleNavClick();
                      }}
                    />
                  </li>
                </ul>
              </>
            ) : (
              <>
                <NavItem
                  to={`/login`}
                  content={"Mon espace"}
                  onClick={() => {
                    setActiveDropdown(null);
                    handleNavClick();
                  }}
                />
                <ul
                  className={`dropdown ${activeDropdown === "user" ? "open-dropdown" : ""}`}
                >
                  <li>
                    <NavItem
                      to={`/login`}
                      content={"Se Connecter"}
                      onClick={() => {
                        setActiveDropdown(null);
                        handleNavClick();
                      }}
                    />
                  </li>
                  <li>
                    <NavItem
                      to={`/register`}
                      content={"S'inscrire"}
                      onClick={() => {
                        setActiveDropdown(null);
                        handleNavClick();
                      }}
                    />
                  </li>
                </ul>
              </>
            )}
          </li>
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
