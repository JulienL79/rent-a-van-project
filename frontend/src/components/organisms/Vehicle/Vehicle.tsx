import { useEffect, useState } from "react";
import type {
  IVehicleProps,
  TVehicleBooker,
  TVehicleDetails,
} from "./Vehicle.props";
import {
  deleteVehicle,
  fetchVehicleById,
  fetchVehicleDetails,
  updateVehicle,
} from "../../../api/vehicleApi";
import { handleError, handleSuccess } from "../../../utils/feedbackHandler";
import { Button } from "../../atoms/Button";
import { Modal } from "../Modal";
import type { VehicleUpdatePayload } from "@rent-a-van/shared/types/vehicle.type";
import { updateVehicleFormData } from "./UpdateVehicleFormData";
import type { IFormProps } from "../../organisms/Form";
import type { FormSubmitResult } from "../../../types/FormSubmitResult";
import {
  fuelTypeOptions,
  gearTypeOptions,
} from "../../pages/Profile/ProfileVehicle/VehicleData";
import { fetchAllCategories } from "../../../api/categoryApi";
import { fetchAllEquipments } from "../../../api/equipmentApi";
import { Carousel } from "../../molecules/Carousel/Carousel";
import "./Vehicle.scss";
import { Link, useNavigate } from "react-router-dom";
import { zodFieldErrors } from "@rent-a-van/shared/utils/zodFieldErrors";
import { vehiclesUpdateValidation } from "@rent-a-van/shared/validators";

export const Vehicle: React.FC<IVehicleProps> = ({ page, id, onInteract }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [vehicleDatas, setVehicleDatas] = useState<
    TVehicleBooker | TVehicleDetails | null
  >(null);
  const [isConfirmModalOpened, setIsConfirmModalOpened] =
    useState<boolean>(false);
  const [isUpdatingVehicle, setIsUpdatingVehicle] = useState<boolean>(false);
  const [formDatas, setFormDatas] = useState<IFormProps>(updateVehicleFormData);
  const [locationCode, setLocationCode] = useState<string>("");
  const navigate = useNavigate();

  const toVehicleUpdatePayload = (
    vehicle: TVehicleDetails,
  ): VehicleUpdatePayload => {
    return {
      brand: vehicle.brand,
      model: vehicle.model,
      mileage: Number(vehicle.mileage),
      description: vehicle.description,
      numberOfSeats: Number(vehicle.numberOfSeats),
      numberOfSleepingPlaces: Number(vehicle.numberOfSleepingPlaces),
      length: vehicle.length,
      height: vehicle.height,
      weight: vehicle.weight,
      fuelType: vehicle.fuelType,
      gearType: vehicle.gearType,
      consumption: vehicle.consumption,
      cityName: vehicle.cityName,
      cityCode: locationCode,
      basePrice: vehicle.basePrice,
      categoryId: vehicle.category?.id ?? "",
      registrationPlate: vehicle.registrationPlate,
      registrationDate: new Date(vehicle.registrationDate),
      insuranceNumber: vehicle.insuranceNumber,
      insuranceExpirationDate: new Date(vehicle.insuranceExpirationDate),
      equipmentIds: vehicle.vehiclesToEquipments.map((v) => v.equipment.id),
    };
  };

  const deleteVehicleById = async (id: string) => {
    try {
      await deleteVehicle(id);
      handleSuccess("Véhicule supprimé avec succès !");
      navigate("/profile/vehicles");
      return { ok: true };
    } catch (err) {
      handleError(
        err,
        "Une erreur est survenue lors de la suppression du véhicule",
      );
      return { ok: false, errors: {} };
    }
  };

  // Fonction pour gérer la soumission du formulaire de mise à jour des informations du véhicules
  const handleSubmit = async (formData: {
    [key: string]: any;
  }): Promise<FormSubmitResult> => {
    try {
      const payload = {
        ...formData,
        cityCode: locationCode,
      };
      const payloadParsed = vehiclesUpdateValidation.safeParse(payload);
      if (!payloadParsed.success) {
        const errors = zodFieldErrors(payloadParsed.error);
        return { ok: false, errors: errors };
      }

      await updateVehicle(id, payloadParsed.data);
      setIsUpdatingVehicle(false);
      setLocationCode("");
      handleSuccess("Véhicule mis à jour avec succès !");
      onInteract();
      return { ok: true };
    } catch (error: any) {
      if (error.data && typeof error.data === "object") {
        return { ok: false, errors: error.data };
      }
      return { ok: false, errors: {} };
    }
  };

  // Mettre à jour les données du formulaire lorsque les détails du véhicule changent
  const prepareUpdateFormData = async (vehicle: TVehicleDetails) => {
    const categories = await fetchAllCategories();
    const equipments = await fetchAllEquipments();

    const onChangeSuggestion = (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const { dataset } = e.target as HTMLInputElement;
      if (dataset.code) {
        setLocationCode(dataset.code);
      }
    };

    const payload = toVehicleUpdatePayload(vehicle);
    const newFormData = { ...updateVehicleFormData };

    newFormData.fields = newFormData.fields.map((field) => {
      let options: { label: string; value: string }[] = [];
      let value: string | string[] = "";

      switch (field.id) {
        case "categoryId":
          options =
            categories?.data.map((cat) => ({
              label: cat.name,
              value: cat.id,
            })) ?? [];
          value = payload.categoryId;
          break;
        case "gearType":
          options = gearTypeOptions;
          value = payload.gearType;
          break;
        case "fuelType":
          options = fuelTypeOptions;
          value = payload.fuelType;
          break;
        case "equipmentIds":
          options =
            equipments?.data.map((e) => ({ label: e.name, value: e.id })) ?? [];
          value = Array.isArray(payload.equipmentIds)
            ? payload.equipmentIds
            : [];
          break;
        default:
          const rawValue = payload[field.id as keyof VehicleUpdatePayload];
          if (field.type === "date" && typeof rawValue === "string") {
            value = rawValue.split("T")[0];
          } else if (Array.isArray(rawValue)) {
            value = rawValue.map((v) => String(v));
          } else if (
            typeof rawValue === "string" ||
            typeof rawValue === "number" ||
            typeof rawValue === "boolean"
          ) {
            value = String(rawValue);
          }
          break;
      }

      return {
        ...field,
        options,
        value,
        ...(field.kind === "suggestion"
          ? { onChange: onChangeSuggestion }
          : {}),
      };
    });

    setFormDatas(newFormData);
  };

  useEffect(() => {
    if (!vehicleDatas || page === "search") return;

    prepareUpdateFormData(vehicleDatas as TVehicleDetails);
  }, [vehicleDatas]);

  useEffect(() => {
    const loadData = async () => {
      if (!id || !page) return;

      setIsLoading(true);

      if (page === "profile" || page === "admin") {
        try {
          const data = await fetchVehicleDetails(id);
          if (!data) throw new Error();
          setVehicleDatas(data.data as TVehicleDetails);
          setLocationCode(data.data.cityCode);
        } catch (err) {
          handleError(
            err,
            "Impossible de récupérer les informations du véhicule",
          );
        }
      } else {
        try {
          const data = await fetchVehicleById(id);
          if (!data) throw new Error();
          setVehicleDatas(data.data as TVehicleBooker);
        } catch (err) {
          handleError(
            err,
            "Impossible de récupérer les informations du véhicule",
          );
        }
      }
      setIsLoading(false);
    };
    if (!isUpdatingVehicle) {
      loadData();
    }
  }, [isUpdatingVehicle]);

  if (isLoading) {
    return <></>;
  }

  if (!vehicleDatas) {
    return (
      <>
        <h1>Véhicule introuvable</h1>
        <Link
          to={
            page === "search"
              ? "/search/results"
              : `/${page === "admin" ? "admin" : "profile"}/vehicles`
          }
          className="btn-link"
        >
          <Button
            className="secondary-button inline-button back-button"
            content="Retour"
          />
        </Link>
      </>
    );
  }

  if (page === "profile" || page === "admin") {
    const vehicle = vehicleDatas as TVehicleDetails;
    return (
      <>
        <div className="vehicle-details">
          {vehicle.pictures && vehicle.pictures.length > 0 && (
            <Carousel images={vehicle.pictures} />
          )}

          <div className="vehicle-header">
            <h1>
              {vehicle.brand} - {vehicle.model}
            </h1>
            <Link
              to={`/${page === "admin" ? "admin" : "profile"}/vehicles`}
              className="btn-link"
            >
              <Button
                className="secondary-button inline-button back-button"
                content="Retour"
              />
            </Link>

            <p className="price">
              <strong>Prix de base : </strong>
              {vehicle.basePrice}€ / jour
            </p>
            <p className="availability">
              <strong>Disponibilité : </strong>{" "}
              {vehicle.isAvailable ? "Disponible" : "Indisponible"}
            </p>
          </div>

          {page === "admin" && (
            <div className="vehicle-section">
              <h2>Informations administrateur</h2>
              <ul className="vehicle-specs">
                <li>
                  <strong>ID du véhicule :</strong> {vehicle.id}
                </li>
                <li>
                  <strong>ID du propriétaire :</strong> {vehicle.user.id}
                </li>
              </ul>
            </div>
          )}

          <div className="vehicle-section">
            <h2>Description</h2>
            <p>{vehicle.description}</p>
          </div>

          <div className="vehicle-section">
            <h2>Caractéristiques techniques</h2>
            <ul className="vehicle-specs">
              <li>
                <strong>Kilométrage :</strong> {vehicle.mileage} km
              </li>
              <li>
                <strong>Consommation :</strong> {vehicle.consumption} L/100km
              </li>
              <li>
                <strong>Type de carburant :</strong> {vehicle.fuelType}
              </li>
              <li>
                <strong>Boîte de vitesse :</strong> {vehicle.gearType}
              </li>
              <li>
                <strong>Nombre de places assises :</strong>{" "}
                {vehicle.numberOfSeats}
              </li>
              <li>
                <strong>Nombre de couchages :</strong>{" "}
                {vehicle.numberOfSleepingPlaces}
              </li>
              <li>
                <strong>Dimensions :</strong> {vehicle.length}m (L) x{" "}
                {vehicle.height}m (H)
              </li>
              <li>
                <strong>Poids :</strong> {vehicle.weight} kg
              </li>
            </ul>
          </div>

          <div className="vehicle-section">
            <h2>Localisation</h2>
            <p>
              {vehicle.cityName} ({vehicle.cityCode})
            </p>
          </div>

          <div className="vehicle-section">
            <h2>Informations d’immatriculation</h2>
            <ul>
              <li>
                <strong>Plaque :</strong> {vehicle.registrationPlate}
              </li>
              <li>
                <strong>Date d’immatriculation :</strong>{" "}
                {vehicle.registrationDate}
              </li>
            </ul>
          </div>

          <div className="vehicle-section">
            <h2>Assurance</h2>
            <ul>
              <li>
                <strong>Numéro :</strong> {vehicle.insuranceNumber}
              </li>
              <li>
                <strong>Expiration :</strong> {vehicle.insuranceExpirationDate}
              </li>
            </ul>
          </div>

          {vehicle.vehiclesToEquipments &&
            vehicle.vehiclesToEquipments.length > 0 && (
              <div className="vehicle-section">
                <h2>Équipements</h2>
                <div className="vehicle-features">
                  {vehicle.vehiclesToEquipments.map((item) => (
                    <span key={item.equipment.id} className="feature">
                      {/* <img src={item.equipment.icon} alt={item.equipment.name} className="feature-icon" /> */}
                      {item.equipment.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

          <div className="vehicle-section">
            <h2>Catégorie</h2>
            <p>{vehicle.category.name}</p>
          </div>

          {vehicle.pricePeriods && vehicle.pricePeriods.length > 0 && (
            <div className="vehicle-section">
              <h2>Périodes tarifaires</h2>
              <ul className="price-periods">
                {vehicle.pricePeriods.map((period) => (
                  <li key={period.id}>
                    <strong>{period.name}</strong> : du {period.startDate} au{" "}
                    {period.endDate} (x{period.coefficient})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="button-group">
          <Button
            className="primary-button"
            content="Modifier"
            onClick={() => setIsUpdatingVehicle(true)}
          />
          <Button
            className="danger-button"
            content="Supprimer"
            onClick={() => setIsConfirmModalOpened(true)}
          />
        </div>

        {isConfirmModalOpened && (
          <Modal
            onClose={() => setIsConfirmModalOpened(false)}
            onConfirm={() => {
              setIsConfirmModalOpened(false);
              deleteVehicleById(id);
              onInteract();
            }}
            modalType="confirm"
          />
        )}

        {isUpdatingVehicle && formDatas && (
          <Modal
            onClose={() => setIsUpdatingVehicle(false)}
            formType="updateVehicle"
            form={formDatas}
            onSubmit={handleSubmit}
            modalType="form"
          />
        )}
      </>
    );
  }

  if (page === "search") {
    const vehicle = vehicleDatas as TVehicleBooker;
    return (
      <>
        <div className="vehicle-header">
          <h1>
            {vehicle.brand} - {vehicle.model}
          </h1>
          <Link to={`/search/results`} className="btn-link">
            <Button
              className="secondary-button inline-button back-button"
              content="Retour"
            />
          </Link>

          <p className="price">
            <strong>Prix total : </strong>
            {vehicle.totalPrice}€
          </p>
        </div>

        <div className="button-group">
          <Button
            className="primary-button"
            content="Réserver"
            onClick={() => {}}
          />
        </div>
      </>
    );
  }

  return null;
};
