import { PageMeta } from "../atoms/PageMeta";

export function Legal() {
  return (
    <div className="page">
      <PageMeta
        title="RentAVan - Mentions légales"
        description="Consultez les informations légales concernant RentAVan, y compris l’éditeur, l’hébergement et les droits applicables."
      />

      <section className="content">
        <h1>Mentions Légales</h1>

        <article className="paragraph">
          <h2>1. Informations légales</h2>
          <ul>
            <li>
              <strong>Nom de la société :</strong> Rentavan SAS
            </li>
            <li>
              <strong>Forme juridique :</strong> Société par Actions Simplifiée
            </li>
            <li>
              <strong>Capital social :</strong> 50 000 €
            </li>
            <li>
              <strong>Siège social :</strong> 123 Avenue des Camping-cars, 75000
              Paris, France
            </li>
            <li>
              <strong>Numéro RCS :</strong> Paris B 123 456 789
            </li>
            <li>
              <strong>Numéro de TVA intracommunautaire :</strong> FR 12 345 678
              901
            </li>
          </ul>
        </article>

        <article className="paragraph">
          <h2>2. Directeur de la publication</h2>
          <ul>
            <li>
              <strong>Nom :</strong> Jean Dupont
            </li>
            <li>
              <strong>Fonction :</strong> Président de Rentavan SAS
            </li>
          </ul>
        </article>

        <article className="paragraph">
          <h2>3. Hébergeur du site</h2>
          <ul>
            <li>
              <strong>Nom :</strong> OVHcloud
            </li>
            <li>
              <strong>Adresse :</strong> 2 rue Kellermann, 59100 Roubaix, France
            </li>
            <li>
              <strong>Téléphone :</strong> +33 9 72 10 10 07
            </li>
          </ul>
        </article>

        <article className="paragraph">
          <h2>4. Propriété intellectuelle</h2>
          <ul>
            <li>
              <strong>Description :</strong> L'ensemble des éléments figurant
              sur le site Rentavan (textes, images, logos, etc.) est protégé par
              le droit d'auteur, le droit des marques et le droit des brevets.
            </li>
            <li>
              <strong>Interdiction :</strong> Toute reproduction,
              représentation, utilisation ou adaptation, sous quelque forme que
              ce soit, de tout ou partie de ces éléments sans l'accord écrit
              préalable de Rentavan est strictement interdite.
            </li>
          </ul>
        </article>

        <article className="paragraph">
          <h2>5. Protection des données personnelles</h2>
          <ul>
            <li>
              <strong>Législation :</strong> Conformément à la loi Informatique
              et Libertés du 6 janvier 1978 modifiée et au Règlement Général sur
              la Protection des Données (RGPD).
            </li>
            <li>
              <strong>Droits :</strong> Vous disposez d'un droit d'accès, de
              rectification, d'effacement et de portabilité de vos données
              personnelles.
            </li>
            <li>
              <strong>Contact :</strong> Pour exercer ces droits ou poser une
              question, contactez-nous à :{" "}
              <a
                href="mailto:privacy@rentavan.com"
                target="_blank"
                className="text-link"
              >
                privacy@rentavan.com
              </a>
              .
            </li>
          </ul>
        </article>

        <article className="paragraph">
          <h2>6. Cookies</h2>
          <ul>
            <li>
              <strong>Utilisation :</strong> Le site Rentavan utilise des
              cookies pour améliorer l'expérience utilisateur.
            </li>
            <li>
              <strong>Consentement :</strong> En naviguant sur notre site, vous
              acceptez l'utilisation de ces cookies.
            </li>
            <li>
              <strong>Informations :</strong> Consultez notre politique de
              confidentialité pour en savoir plus.
            </li>
          </ul>
        </article>

        <article className="paragraph">
          <h2>7. Liens hypertextes</h2>
          <ul>
            <li>
              <strong>Présence :</strong> Le site Rentavan peut contenir des
              liens vers des sites tiers.
            </li>
            <li>
              <strong>Responsabilité :</strong> Rentavan n'exerce aucun contrôle
              sur ces sites et décline toute responsabilité quant à leur
              contenu.
            </li>
          </ul>
        </article>

        <article className="paragraph">
          <h2>8. Droit applicable et juridiction compétente</h2>
          <ul>
            <li>
              <strong>Réglementation :</strong> Les présentes mentions légales
              sont régies par le droit français.
            </li>
            <li>
              <strong>Litiges :</strong> En cas de conflit, seuls les tribunaux
              français seront compétents.
            </li>
          </ul>
        </article>

        <article className="paragraph">
          <h2>9. Contact</h2>
          <ul>
            <li>
              <strong>Support :</strong> Pour toute question concernant ces
              mentions légales, contactez-nous à :{" "}
              <a
                href="mailto:privacy@rentavan.com"
                target="_blank"
                className="text-link"
              >
                privacy@rentavan.com
              </a>
              .
            </li>
          </ul>
        </article>
      </section>
    </div>
  );
}
