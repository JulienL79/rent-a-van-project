import { api } from "./core";
import { handleError } from "../utils/feedbackHandler";

export const fetchAllPictures = async () => {
  try {
    return await api.get<{ message: string; data: any[] }>("/pictures");
  } catch (err) {
    handleError(err, "Erreur lors de la récupération des photos");
  }
};

export const fetchPicturesByVehicle = async (vehicleId: string) => {
  try {
    return await api.get<{ message: string; data: any[] }>(
      `/pictures/vehicle/${vehicleId}`,
    );
  } catch (err) {
    handleError(err, "Erreur lors de la récupération des photos du véhicule");
  }
};

export const deletePicture = async (pictureId: string) => {
  try {
    return await api.delete<any>(`/pictures/${pictureId}`);
  } catch (err) {
    handleError(err, "Erreur lors de la suppression de la photo");
  }
};
