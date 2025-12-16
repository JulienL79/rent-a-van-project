import { NavItem } from "../../atoms/NavItem";
import "./Footer.scss";

export const Footer = () => {
  return (
    <footer className="app-footer">
      <p>&copy; 2025 RentAVan. Tous droits réservés.</p>
      <div className="footer-links">
        <NavItem to={`/legal`} content={"Mentions légales"} />
        <NavItem to={`/terms`} content={"CGV"} />
        <NavItem to={`/privacy`} content={"Politique de confidentialité"} />
        <NavItem to={`/contact`} content={"Contact"} />
      </div>
    </footer>
  );
};
