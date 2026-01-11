import "./ContactInfo.scss";
import { FontAwesomeIconWrapper } from "../../atoms/FontAwesomeIconWrapper";

export const ContactInfo = () => {
  return (
    <>
      <div className="paragraph">
        <h3>Adresse</h3>
        <p>123 Avenue des Aventuriers, 75001 Paris, France</p>
      </div>
      <div className="paragraph">
        <h3>Téléphone</h3>
        <p>
          <a href="callto:+33123456789" target="_blank">
            +33 1 23 45 67 89
          </a>
        </p>
      </div>
      <div className="paragraph">
        <h3>Email</h3>
        <p>
          <a href="mailto:no-reply-rentavan@gmail.com" target="_blank">
            no-reply-rentavan@gmail.com
          </a>
        </p>
      </div>
      <div className="paragraph">
        <h3>Horaires d'ouverture</h3>
        <p>Lundi - Vendredi : 9h00 - 18h00</p>
        <p>Samedi : 10h00 - 16h00</p>
        <p>Dimanche : Fermé</p>
      </div>
      <div className="social-links">
        <a href="https://facebook.com" target="_blank">
          <FontAwesomeIconWrapper name="faFacebookF" />
        </a>
        <a href="https://twitter.com" target="_blank">
          <FontAwesomeIconWrapper name="faTwitter" />
        </a>
        <a href="https://instagram.com" target="_blank">
          <FontAwesomeIconWrapper name="faInstagram" />
        </a>
      </div>
    </>
  );
};
