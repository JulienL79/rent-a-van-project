import { api } from "./core";
import { handleError } from "../utils/feedbackHandler";

export const fetchAllEquipments = async () => {
  try {
    return await api.get<{ message: string; data: any[] }>("/equipments");
  } catch (err) {
    handleError(err, "Erreur lors de la récupération des équipements");
  }
};

export const fetchEquipmentById = async (equipmentId: string) => {
  try {
    return await api.get<{ message: string; data: any }>(
      `/equipments/${equipmentId}`,
    );
  } catch (err) {
    handleError(err, "Erreur lors de la récupération de l'équipement");
  }
};

export const createEquipment = async (equipmentData: any) => {
  try {
    return await api.post<any>("/equipments", equipmentData);
  } catch (err) {
    handleError(err, "Erreur lors de la création de l'équipement");
  }
};

export const updateEquipment = async (
  equipmentId: string,
  equipmentData: any,
) => {
  try {
    return await api.put<any>(`/equipments/${equipmentId}`, equipmentData);
  } catch (err) {
    handleError(err, "Erreur lors de la modification de l'équipement");
  }
};

export const deleteEquipment = async (equipmentId: string) => {
  try {
    return await api.delete<any>(`/equipments/${equipmentId}`);
  } catch (err) {
    handleError(err, "Erreur lors de la suppression de l'équipement");
  }
};
