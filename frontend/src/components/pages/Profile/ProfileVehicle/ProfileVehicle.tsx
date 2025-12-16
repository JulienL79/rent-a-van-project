import { Card, type IVehicleCardPropsProfile } from "../../../molecules/Card";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../../../store/useAuthStore";
import {
  createVehicle,
  deleteVehicle,
  fetchVehiclesByUser,
} from "../../../../api/vehicleApi";
import { Button } from "../../../atoms/Button";
import { Modal } from "../../../organisms/Modal";
import { addVehicleFormData } from "./AddVehicleFormData";
import { fetchAllCategories } from "../../../../api/categoryApi";
import { fetchAllEquipments } from "../../../../api/equipmentApi";
import { fuelTypeOptions, gearTypeOptions } from "./VehicleData";
import type { VehicleRegisterPayload } from "@rent-a-van/shared/types/vehicle.type";
import type { FormSubmitResult } from "../../../../types/FormSubmitResult";
import type { IFormProps } from "../../../organisms/Form";
import { handleError, handleSuccess } from "../../../../utils/feedbackHandler";

export const ProfileVehicle = () => {
  const [vehicleDatas, setVehicleDatas] = useState<
    IVehicleCardPropsProfile[] | null
  >(null);
  const [isAddingVehicle, setIsAddingVehicle] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formDataWithOptions, setFormDataWithOptions] =
    useState<IFormProps>(addVehicleFormData);
  const [locationCode, setLocationCode] = useState<string>("");
  const [deletedVehicleCount, setDeletedVehicleCount] = useState<number>(0);
  const [addedVehicleCount, setAddedVehicleCount] = useState<number>(0);
  const { user } = useAuthStore();

  // Récupère les données nécessaire pour le formulaire de création
  const prepareFormData = async () => {
    // Récupérer les options
    const categories = await fetchAllCategories();
    const equipments = await fetchAllEquipments();

    // Préparer le onChange des suggestion
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

    // Cloner le formulaire pour ne pas muter l'original
    const newFormData = { ...addVehicleFormData };

    // Mettre à jour les options pour les champs concernés
    newFormData.fields = newFormData.fields.map((field) => {
      if (field.id === "categoryId") {
        const options =
          categories?.data.map((cat) => ({ label: cat.name, value: cat.id })) ??
          [];
        return {
          ...field,
          options,
          value: options[0]?.value ?? "",
        };
      }
      if (field.id === "gearType") {
        return {
          ...field,
          options: gearTypeOptions,
          value: gearTypeOptions[0]?.value ?? "",
        };
      }
      if (field.id === "fuelType") {
        return {
          ...field,
          options: fuelTypeOptions,
          value: fuelTypeOptions[0]?.value ?? "",
        };
      }
      if (field.id === "equipmentIds") {
        const options =
          equipments?.data.map((f) => ({ label: f.name, value: f.id })) ?? [];
        return {
          ...field,
          options,
          value: [],
        };
      }
      if (field.kind === "suggestion") {
        return {
          ...field,
          onChange: onChangeSuggestion,
        };
      }
      return field;
    });

    // Mettre à jour l'état pour l'utiliser dans FormModal
    setFormDataWithOptions(newFormData);
  };

  // Gère la soumission du form de création de véhicule
  const handleSubmit = async (formData: {
    [key: string]: any;
  }): Promise<FormSubmitResult> => {
    try {
      if (!locationCode) throw new Error("Le code de la ville est manquant");

      const payload: { [key: string]: any } = {
        ...formData,
        cityCode: locationCode,
      };

      await createVehicle(payload as VehicleRegisterPayload);
      setIsAddingVehicle(false);
      setLocationCode("");
      setAddedVehicleCount((prev) => prev + 1);
      handleSuccess("Véhicule ajouté avec succès !");
      return { ok: true };
    } catch (error: any) {
      if (error.data && typeof error.data === "object") {
        return { ok: false, errors: error.data };
      }
      return { ok: false, errors: {} };
    }
  };

  // Ouvre le formulaire d'ajout
  const handleOpenForm = async () => {
    await prepareFormData(); // récupérer les options à jour
    setIsAddingVehicle(true);
  };

  const deleteVehicleById = async (id: string) => {
    try {
      await deleteVehicle(id);
      setDeletedVehicleCount((prev) => prev + 1);
      handleSuccess("Véhicule supprimé avec succès !");
      return { ok: true };
    } catch (err) {
      handleError(
        err,
        "Une erreur est survenue lors de la suppression du véhicule",
      );
      return { ok: false, errors: {} };
    }
  };

  // Fonction pour récupérer les véhicules de l'utilisateur
  const fetchVehicles = async () => {
    if (!user) return [];
    const vehicles = await fetchVehiclesByUser(user.id);
    if (!vehicles) return [];
    return vehicles.data.map((vehicle) => ({
      id: vehicle.id,
      picture: vehicle.pictures[0] ?? null,
      brand: vehicle.brand,
      model: vehicle.model,
      category: vehicle.category.name,
    }));
  };

  // Charger les données des véhicules ou des réservations en fonction de la page
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const vehicleResponses = await fetchVehicles();
      const vehicles: IVehicleCardPropsProfile[] = vehicleResponses.map(
        (vehicle) => ({
          type: "my-vehicles",
          data: vehicle,
          onDelete: () => deleteVehicleById(vehicle.id),
        }),
      );
      setVehicleDatas(vehicles);
      setIsLoading(false);
    };
    loadData();
  }, [deletedVehicleCount, addedVehicleCount]);

  return (
    <>
      <>
        <div className="button-group">
          <Button onClick={handleOpenForm} content="Ajouter un véhicule" />
        </div>
        {!isLoading && (
          <div className="card-list">
            {!vehicleDatas || vehicleDatas.length === 0 ? (
              <h2>Aucun véhicule trouvé</h2>
            ) : (
              <>
                {(vehicleDatas as IVehicleCardPropsProfile[]).map((vehicle) => (
                  <Card
                    key={vehicle.data.id}
                    type="my-vehicles"
                    data={vehicle.data}
                    onDelete={vehicle.onDelete}
                  />
                ))}
              </>
            )}
          </div>
        )}

        {isAddingVehicle && (
          <Modal
            onClose={() => setIsAddingVehicle(false)}
            formType="addVehicle"
            form={formDataWithOptions}
            onSubmit={handleSubmit}
            modalType="form"
          />
        )}
      </>
    </>
  );
};
