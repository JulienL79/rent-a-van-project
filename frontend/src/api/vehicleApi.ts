import type {
  VehicleRegisterPayload,
  VehicleUpdatePayload,
} from "@rent-a-van/shared/types/vehicle.type";
import { api } from "./core";
import { handleError } from "../utils/feedbackHandler";

export const fetchAllVehicles = async () => {
  try {
    return await api.get<{ message: string; data: any[] }>("/vehicles");
  } catch (err) {
    handleError(err, "Erreur lors de la récupération des véhicules");
  }
};

export const fetchVehicleDetails = async (id: string) => {
  try {
    return await api.get<{ message: string; data: any }>(
      `/vehicles/details/${id}`,
    );
  } catch (err) {
    handleError(err, "Erreur lors de la récupération des détails du véhicule");
  }
};

export const fetchVehiclesByUser = async (userId: string) => {
  try {
    return await api.get<{ message: string; data: any[] }>(
      `/vehicles/user/${userId}`,
    );
  } catch (err) {
    handleError(
      err,
      "Erreur lors de la récupération des véhicules de l'utilisateur",
    );
  }
};

export const fetchVehicleById = async (id: string) => {
  try {
    return await api.get<{ message: string; data: any }>(`/vehicles/${id}`);
  } catch (err) {
    handleError(err, "Erreur lors de la récupération du véhicule");
  }
};

export const createVehicle = async (vehicleData: VehicleRegisterPayload) => {
  try {
    return await api.post<any>("/vehicles", vehicleData);
  } catch (err) {
    handleError(err, "Erreur lors de la création du véhicule");
  }
};

export const updateVehicle = async (
  id: string,
  vehicleData: VehicleUpdatePayload,
) => {
  try {
    return await api.put<any>(`/vehicles/${id}`, vehicleData);
  } catch (err) {
    handleError(err, "Erreur lors de la modification du véhicule");
  }
};

export const updateVehiclePictures = async (id: string, pictures: File[]) => {
  try {
    const formData = new FormData();
    pictures.forEach((file) => formData.append("pictures", file));
    return await api.put<any>(`/vehicles/pictures/${id}`, formData);
  } catch (err) {
    handleError(err, "Erreur lors de la mise à jour des photos du véhicule");
  }
};

export const deleteVehicle = async (id: string) => {
  try {
    return await api.delete<any>(`/vehicles/${id}`);
  } catch (err) {
    handleError(err, "Erreur lors de la suppression du véhicule");
  }
};
