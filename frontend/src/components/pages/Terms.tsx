import { PageMeta } from "../atoms/PageMeta";

export function Terms() {
  return (
    <div className="page">
      <PageMeta
        title="RentAVan - Politique de confidentialité"
        description="Découvrez comment RentAVan collecte, utilise et protège vos données personnelles conformément à la réglementation en vigueur."
      />
      <section className="content">
        <h1>Conditions Générales de Vente</h1>

        <article className="paragraph">
          <p>
            Les présentes Conditions Générales de Vente (CGV) régissent
            l'utilisation des services proposés par Rentavan, plateforme de
            location de camping-cars et de vans entre particuliers.
          </p>
        </article>

        <article className="paragraph">
          <h2>1. Objet</h2>
          <p>
            Rentavan met en relation des propriétaires de camping-cars et de
            vans avec des locataires potentiels. La plateforme facilite la
            réservation et la gestion des locations, sans être partie au contrat
            de location conclu entre le propriétaire et le locataire.
          </p>
        </article>

        <article className="paragraph">
          <h2>2. Inscription et compte utilisateur</h2>
          <p>
            Pour utiliser les services de Rentavan, les utilisateurs doivent
            créer un compte en fournissant des informations exactes et à jour.
            Les utilisateurs sont responsables de la confidentialité de leurs
            identifiants de connexion.
          </p>
        </article>

        <article className="paragraph">
          <h2>3. Conditions de location</h2>
          <ul>
            <li>
              Le locataire doit être âgé d'au moins 21 ans et posséder un permis
              de conduire valide depuis au moins 2 ans.
            </li>
            <li>
              Le locataire s'engage à utiliser le véhicule conformément aux lois
              en vigueur et aux instructions du propriétaire.
            </li>
            <li>
              Le propriétaire s'engage à fournir un véhicule en bon état de
              fonctionnement et conforme à la description fournie sur la
              plateforme.
            </li>
          </ul>
        </article>

        <article className="paragraph">
          <h2>4. Réservation et paiement</h2>
          <p>
            La réservation est considérée comme confirmée après le paiement de
            l'acompte ou du montant total de la location. Les tarifs affichés
            incluent les frais de service de Rentavan.
          </p>
        </article>

        <article className="paragraph">
          <h2>5. Annulation et remboursement</h2>
          <p>
            Les conditions d'annulation et de remboursement varient selon le
            délai avant le début de la location :
          </p>
          <ul>
            <li>Plus de 30 jours : remboursement intégral</li>
            <li>Entre 15 et 30 jours : remboursement de 50%</li>
            <li>Moins de 15 jours : aucun remboursement</li>
          </ul>
        </article>

        <article className="paragraph">
          <h2>6. Assurance et dépôt de garantie</h2>
          <p>
            Tous les véhicules loués via Rentavan doivent être couverts par une
            assurance adaptée. Un dépôt de garantie peut être exigé par le
            propriétaire et sera restitué au locataire après la location, sous
            réserve d'absence de dommages.
          </p>
        </article>

        <article className="paragraph">
          <h2>7. Responsabilités</h2>
          <p>
            Rentavan n'est pas responsable des dommages, pertes ou litiges
            survenant entre le propriétaire et le locataire. Les utilisateurs
            s'engagent à résoudre leurs différends à l'amiable.
          </p>
        </article>

        <article className="paragraph">
          <h2>8. Évaluations et avis</h2>
          <p>
            Les utilisateurs peuvent laisser des évaluations et des avis après
            une location. Rentavan se réserve le droit de modérer ou supprimer
            les avis inappropriés ou frauduleux.
          </p>
        </article>

        <article className="paragraph">
          <h2>9. Modification des CGV</h2>
          <p>
            Rentavan se réserve le droit de modifier les présentes CGV à tout
            moment. Les utilisateurs seront informés des modifications
            importantes par e-mail ou via la plateforme.
          </p>
        </article>

        <article className="paragraph">
          <h2>10. Loi applicable et juridiction compétente</h2>
          <p>
            Les présentes CGV sont régies par le droit français. En cas de
            litige, les tribunaux français seront seuls compétents.
          </p>
        </article>

        <article className="paragraph">
          <p>
            Pour toute question concernant ces CGV, veuillez nous contacter à
            l'adresse suivante :{" "}
            <a
              href="mailto:contact@rentavan.com"
              target="_blank"
              className="text-link"
            >
              contact@rentavan.com
            </a>
          </p>
        </article>
      </section>
    </div>
  );
}
