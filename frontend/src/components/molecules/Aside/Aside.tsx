import type {
  IAsideAdminPageProps,
  IAsideProfilePageProps,
  IAsideResultPageProps,
} from "./Aside.props";
import { NavItem } from "../../atoms/NavItem";
import "./Aside.scss";

export const Aside: React.FC<
  IAsideAdminPageProps | IAsideProfilePageProps | IAsideResultPageProps
> = (props) => {
  const { page } = props;

  if (page === "profile" || page === "admin") {
    const { active } = props;
    return (
      <aside className="sidebar">
        <h2>Menu</h2>
        <nav className="profile-nav">
          {page === "profile" && (
            <ul>
              <li>
                <NavItem
                  to="/profile/home"
                  content="Mon Profil"
                  className={active === "home" ? "active" : ""}
                />
              </li>
              <li>
                <NavItem
                  to="/profile/bookings"
                  content="Réservations"
                  className={active === "bookings" ? "active" : ""}
                />
              </li>
              <li>
                <NavItem
                  to="/profile/vehicles"
                  content="Véhicules"
                  className={active === "vehicles" ? "active" : ""}
                />
              </li>
              <li>
                <NavItem
                  to="/profile/mailbox"
                  content="Messagerie"
                  className={active === "mailbox" ? "active" : ""}
                />
              </li>
              <li>
                <NavItem
                  to="/profile/settings"
                  content="Paramètres"
                  className={active === "settings" ? "active" : ""}
                />
              </li>
              <li>
                <NavItem to="/logout" content="Déconnexion" />
              </li>
            </ul>
          )}

          {page === "admin" && (
            <ul>
              <li>
                <NavItem
                  to="/admin/home"
                  content="Accueil"
                  className={active === "home" ? "active" : ""}
                />
              </li>
              <li>
                <NavItem
                  to="/admin/users"
                  content="Utilisateurs"
                  className={active === "users" ? "active" : ""}
                />
              </li>
              <li>
                <NavItem
                  to="/admin/vehicles"
                  content="Véhicules"
                  className={active === "vehicles" ? "active" : ""}
                />
              </li>
              <li>
                <NavItem
                  to="/admin/categories"
                  content="Catégories"
                  className={active === "categories" ? "active" : ""}
                />
              </li>
              <li>
                <NavItem
                  to="/admin/equipments"
                  content="Équipements"
                  className={active === "equipments" ? "active" : ""}
                />
              </li>
              <li>
                <NavItem
                  to="/admin/pictures"
                  content="Photos"
                  className={active === "pictures" ? "active" : ""}
                />
              </li>
              <li>
                <NavItem
                  to="/admin/bookings"
                  content="Réservations"
                  className={active === "bookings" ? "active" : ""}
                />
              </li>
              <li>
                <NavItem
                  to="/admin/messages"
                  content="Messages"
                  className={active === "messages" ? "active" : ""}
                />
              </li>
            </ul>
          )}
        </nav>
      </aside>
    );
  }
  if (page === "results") {
    return (
      <aside className="sidebar">
        <h2>Filtre</h2>
      </aside>
    );
  }

  return null;
};
