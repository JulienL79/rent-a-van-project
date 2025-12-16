import type {
  IVehicleCardPropsResult,
  IVehicleCardPropsProfile,
  IBookingCardPropsOwner,
  IBookingCardPropsRenter,
} from "./Card.props";
import "./Card.scss";
import { Image } from "../../atoms/Image";
import { Link } from "react-router-dom";
import { Button } from "../../atoms/Button";
import { formatShortDateFr } from "../../../utils/DateConverter";
import { useState } from "react";
import { Modal } from "../../organisms/Modal";

export const Card: React.FC<
  | IVehicleCardPropsProfile
  | IVehicleCardPropsResult
  | IBookingCardPropsOwner
  | IBookingCardPropsRenter
> = (props) => {
  const { type, data } = props;
  const [isConfirmModalOpened, setIsConfirmModalOpened] =
    useState<boolean>(false);

  if (type === "result") {
    const { onSelect } = props;
    return (
      <div className={`card ${type}-card`}>
        <Image
          className="card-image"
          src={data.pictures[0]?.src || "https://placehold.co/400x300"}
          alt={`${data.brand} ${data.model}`}
        />
        <div className="card-details">
          <h2>
            {data.brand} {data.model}
          </h2>
          <>
            <p>
              <strong>Prix total : </strong>
              {data.totalPrice}€
            </p>
            <p>
              <strong>Description : </strong>
              {data.description}
            </p>
          </>
          <div className="card-actions">
            <Link to={`/search/vehicle/${data.id}`} className="btn-link">
              <Button className="primary-button" content="Voir" />
            </Link>
            <Button
              className="primary-button"
              content="Réserver"
              onClick={onSelect}
            />
          </div>
        </div>
      </div>
    );
  }

  if (type === "my-vehicles") {
    const { onDelete } = props;
    return (
      <>
        <div className={`card ${type}-card`}>
          <Image
            className="card-image"
            src={data.picture || "https://placehold.co/400x300"}
            alt={`${data.brand} ${data.model}`}
          />
          <div className="card-details">
            <h2>
              {data.brand} {data.model}
            </h2>
            <p>Type : {data.category}</p>
            <div className="card-actions">
              <Link
                to={`/profile/vehicle-details/${data.id}`}
                className="btn-link"
              >
                <Button className="primary-button" content="Voir" />
              </Link>
              <Button
                className="danger-button"
                content="Supprimer"
                onClick={() => setIsConfirmModalOpened(true)}
              />
            </div>
          </div>
        </div>
        {isConfirmModalOpened && (
          <Modal
            onClose={() => setIsConfirmModalOpened(false)}
            onConfirm={() => {
              setIsConfirmModalOpened(false);
              onDelete();
            }}
            modalType="confirm"
          />
        )}
      </>
    );
  }

  if (type === "renter" || type === "owner") {
    return (
      <div className={`card ${type}-card`}>
        <div className="card-details">
          <h2>{type === "owner" ? data.renterName : data.ownerName}</h2>
          {type === "owner" && (
            <p>
              <span className="primary-color-darked">Vehicule : </span>
              {data.vehiclePlate}
            </p>
          )}
          <p>
            <span className="primary-color-darked">Date de début : </span>{" "}
            {formatShortDateFr(new Date(data.startDate))}
          </p>
          <p>
            <span className="primary-color-darked">Date de fin : </span>
            {formatShortDateFr(new Date(data.endDate))}
          </p>
          <p>
            <span className="primary-color-darked">
              {type === "owner" ? "Loueur" : "Propriétaire"} :{" "}
            </span>
            {type === "owner" ? data.renterName : data.ownerName}
          </p>
          <p>
            <span className="primary-color-darked">Prix total : </span>
            {data.amount}
          </p>
          <p>
            <span className="primary-color-darked">Status : </span>
            {data.status}
          </p>
          <div className="card-actions">
            <Link to={`profile/booking/${data.id}`} className="btn-link">
              <Button className="primary-button" content="Voir le détail" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
