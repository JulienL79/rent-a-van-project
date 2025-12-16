import { PageMeta } from "../atoms/PageMeta";

export function Privacy() {
  return (
    <div className="page">
      <PageMeta
        title="RentAVan - Politique de confidentialité"
        description="Découvrez comment RentAVan collecte, utilise et protège vos données personnelles conformément à la réglementation en vigueur."
      />

      <section className="content">
        <h1>Politique de confidentialité</h1>

        <article className="paragraph">
          <p>
            Chez RentAVan, nous accordons une grande importance à la protection
            de vos données personnelles. Cette politique de confidentialité
            explique comment nous collectons, utilisons et protégeons vos
            informations lorsque vous utilisez notre site web et nos services.
          </p>
        </article>

        <article className="paragraph">
          <h2>1. Collecte des données</h2>
          <p>
            Nous collectons les informations que vous nous fournissez
            directement lorsque vous :
          </p>
          <ul>
            <li>Créez un compte utilisateur</li>
            <li>Effectuez une réservation</li>
            <li>Contactez notre service client</li>
            <li>Participez à nos enquêtes ou promotions</li>
          </ul>
        </article>

        <article className="paragraph">
          <h2>2. Types de données collectées</h2>
          <p>Les données personnelles que nous pouvons collecter incluent :</p>
          <ul>
            <li>Nom et prénom</li>
            <li>Adresse e-mail</li>
            <li>Numéro de téléphone</li>
            <li>Adresse postale</li>
            <li>
              Informations de paiement (traitées de manière sécurisée par nos
              prestataires de paiement)
            </li>
            <li>Informations sur votre véhicule (pour les propriétaires)</li>
          </ul>
        </article>

        <article className="paragraph">
          <h2>3. Utilisation des données</h2>
          <p>Nous utilisons vos données personnelles pour :</p>
          <ul>
            <li>Gérer votre compte et vos réservations</li>
            <li>Vous fournir le service demandé</li>
            <li>Communiquer avec vous concernant nos services</li>
            <li>Améliorer nos services et votre expérience utilisateur</li>
            <li>Respecter nos obligations légales</li>
          </ul>
        </article>

        <article className="paragraph">
          <h2>4. Protection des données</h2>
          <p>
            Nous mettons en place des mesures de sécurité techniques et
            organisationnelles pour protéger vos données personnelles contre
            tout accès non autorisé, perte ou altération.
          </p>
        </article>

        <article className="paragraph">
          <h2>5. Partage des données</h2>
          <p>
            Nous ne vendons jamais vos données personnelles à des tiers. Nous
            pouvons partager vos informations avec :
          </p>
          <ul>
            <li>Nos prestataires de services (ex : hébergement, paiement)</li>
            <li>Les autorités compétentes lorsque la loi l'exige</li>
          </ul>
        </article>

        <article className="paragraph">
          <h2>6. Vos droits</h2>
          <p>
            Conformément au Règlement Général sur la Protection des Données
            (RGPD), vous disposez des droits suivants :
          </p>
          <ul>
            <li>Droit d'accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit à l'effacement (droit à l'oubli)</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité des données</li>
            <li>Droit d'opposition</li>
          </ul>
        </article>

        <article className="paragraph">
          <h2>7. Cookies</h2>
          <p>
            Nous utilisons des cookies pour améliorer votre expérience sur notre
            site. Vous pouvez gérer vos préférences en matière de cookies via
            les paramètres de votre navigateur.
          </p>
        </article>

        <article className="paragraph">
          <h2>8. Modifications de la politique de confidentialité</h2>
          <p>
            Nous nous réservons le droit de modifier cette politique de
            confidentialité à tout moment. Toute modification sera publiée sur
            cette page avec une date de mise à jour.
          </p>
        </article>

        <article className="paragraph">
          <h2>9. Nous contacter</h2>
          <p>
            Si vous avez des questions concernant cette politique de
            confidentialité ou l'utilisation de vos données personnelles,
            veuillez nous contacter à l'adresse suivante :{" "}
            <a
              href="mailto:privacy@rentavan.com"
              target="_blank"
              className="text-link"
            >
              privacy@rentavan.com
            </a>
          </p>
        </article>
      </section>
    </div>
  );
}
