import { api } from "./core";
import { handleError } from "../utils/feedbackHandler";

export const fetchAllBookings = async () => {
  try {
    return await api.get<{ message: string; data: any[] }>("/bookings");
  } catch (err) {
    handleError(err, "Erreur lors de la récupération des réservations");
  }
};

export const fetchBookingsByOwner = async (ownerId: string) => {
  try {
    return await api.get<{ message: string; data: any[] }>(
      `/bookings/owner/${ownerId}`,
    );
  } catch (err) {
    handleError(
      err,
      "Erreur lors de la récupération des réservations du propriétaire",
    );
  }
};

export const fetchBookingsByRenter = async (renterId: string) => {
  try {
    return await api.get<{ message: string; data: any[] }>(
      `/bookings/renter/${renterId}`,
    );
  } catch (err) {
    handleError(
      err,
      "Erreur lors de la récupération des réservations du locataire",
    );
  }
};

export const fetchBookingsByVehicle = async (vehicleId: string) => {
  try {
    return await api.get<{ message: string; data: any[] }>(
      `/bookings/vehicle/${vehicleId}`,
    );
  } catch (err) {
    handleError(
      err,
      "Erreur lors de la récupération des réservations du véhicule",
    );
  }
};

export const fetchBookingById = async (bookingId: string) => {
  try {
    return await api.get<{ message: string; data: any }>(
      `/bookings/${bookingId}`,
    );
  } catch (err) {
    handleError(err, "Erreur lors de la récupération de la réservation");
  }
};

export const createBooking = async (bookingData: any) => {
  try {
    return await api.post<any>("/bookings", bookingData);
  } catch (err) {
    handleError(err, "Erreur lors de la création de la réservation");
  }
};

export const updateBooking = async (bookingId: string, bookingData: any) => {
  try {
    return await api.put<any>(`/bookings/${bookingId}`, bookingData);
  } catch (err) {
    handleError(err, "Erreur lors de la modification de la réservation");
  }
};

export const deleteBooking = async (bookingId: string) => {
  try {
    return await api.delete<any>(`/bookings/${bookingId}`);
  } catch (err) {
    handleError(err, "Erreur lors de la suppression de la réservation");
  }
};
