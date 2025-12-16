import { db } from "../config/pool.js";
import { and, gte, lte, or } from "drizzle-orm";
import { calculateDistance } from "./index.js";
import { bookings } from "../schemas/index.js";
import { categoriesModel, vehiclesModel } from "../models/index.js";

/**
 * Recherche de véhicules disponibles avec filtrage géographique et par disponibilité.
 * @param startDateInput - Date de début de la recherche.
 * @param endDateInput - Date de fin de la recherche.
 * @param cityCoordinates - Coordonnées de la ville recherchée (latitude, longitude).
 * @param radius - Rayon en kilomètres autour de la ville.
 * @returns Liste des véhicules disponibles.
 */
export const searchVehicles = async ({
  startDateInput,
  endDateInput,
  cityCoordinates,
  radius,
  category,
}: {
  startDateInput: Date;
  endDateInput: Date;
  cityCoordinates: { latitude: number; longitude: number };
  radius: number;
  category: "van" | "camping-car";
}): Promise<any[]> => {
  // Étape 0 : Validation des dates
  if (startDateInput >= endDateInput) {
    throw new Error("La date de début doit être antérieure à la date de fin.");
  }

  // Étape 1 : Récupérer les véhicules de la bonne catégorie
  const [categoryDetails] = await categoriesModel.getByName(category);
  const vehiclesByCategory = await vehiclesModel.getAllByCategory(
    categoryDetails.id,
  );

  if (vehiclesByCategory.length === 0) return [];

  // Étape 2 : Récupérer les IDs des véhicules réservés sur la période
  const unavailableVehicleIds = await db
    .select({ vehicleId: bookings.vehicleId })
    .from(bookings)
    .where(
      or(
        and(
          gte(bookings.startDate, startDateInput),
          lte(bookings.startDate, endDateInput),
        ),
        and(
          gte(bookings.endDate, startDateInput),
          lte(bookings.endDate, endDateInput),
        ),
        and(
          lte(bookings.startDate, startDateInput),
          gte(bookings.endDate, endDateInput),
        ),
      ),
    );

  const unavailableIds = unavailableVehicleIds
    .map((row) => row.vehicleId)
    .filter((id): id is string => id !== null);

  // Étape 3 : Exclure les véhicules indisponibles
  const availableVehicles = vehiclesByCategory.filter(
    (vehicle) =>
      vehicle.isAvailable === true && !unavailableIds.includes(vehicle.id),
  );

  // Étape 4 : Filtrage géographique (en mémoire)
  const filteredByLocation = availableVehicles.filter((vehicle) => {
    const distance = calculateDistance(
      cityCoordinates.latitude,
      cityCoordinates.longitude,
      parseFloat(vehicle.latCoordinates),
      parseFloat(vehicle.lonCoordinates),
    );
    return distance <= radius;
  });

  return filteredByLocation;
};
