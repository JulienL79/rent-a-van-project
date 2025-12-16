import { api } from "./core";
import { handleError } from "../utils/feedbackHandler";

export const fetchAllPricePeriods = async () => {
  try {
    return await api.get<any[]>("/price-periods");
  } catch (err) {
    handleError(err, "Erreur lors de la récupération des périodes de prix");
  }
};

export const fetchPricePeriodsByVehicleId = async (vehicleId: string) => {
  try {
    return await api.get<any[]>(`/price-periods/vehicles/${vehicleId}`);
  } catch (err) {
    handleError(
      err,
      "Erreur lors de la récupération des périodes de prix du véhicule",
    );
  }
};

export const fetchPricePeriodById = async (id: string) => {
  try {
    return await api.get<any>(`/price-periods/${id}`);
  } catch (err) {
    handleError(err, "Erreur lors de la récupération de la période de prix");
  }
};

export const createPricePeriod = async (pricePeriodData: any) => {
  try {
    return await api.post<any>("/price-periods", pricePeriodData);
  } catch (err) {
    handleError(err, "Erreur lors de la création de la période de prix");
  }
};

export const updatePricePeriod = async (id: string, pricePeriodData: any) => {
  try {
    return await api.put<any>(`/price-periods/${id}`, pricePeriodData);
  } catch (err) {
    handleError(err, "Erreur lors de la modification de la période de prix");
  }
};

export const deletePricePeriod = async (id: string) => {
  try {
    return await api.delete<any>(`/price-periods/${id}`);
  } catch (err) {
    handleError(err, "Erreur lors de la suppression de la période de prix");
  }
};
