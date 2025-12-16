import { db } from "../config/pool.js";
import { vehicles, pricePeriods } from "../schemas/index.js";
import { eq } from "drizzle-orm";

/**
 * Arrondit une date à l'heure la plus proche.
 * Si les minutes >= 30, arrondit à l'heure supérieure.
 */
const roundToNearestHour = (date: Date): Date => {
  const roundedDate = new Date(date);
  if (roundedDate.getMinutes() >= 30) {
    roundedDate.setHours(roundedDate.getHours() + 1);
  }
  roundedDate.setMinutes(0, 0, 0);
  return roundedDate;
};

/**
 * Calcule le prix final d'une réservation.
 * @param vehicleId - ID du véhicule.
 * @param startDateInput - Date de début de la réservation.
 * @param endDateInput - Date de fin de la réservation.
 * @returns Le prix total de la réservation.
 */
export const calculateReservationPrice = async ({
  vehicleId,
  startDateInput,
  endDateInput,
}: {
  vehicleId: string;
  startDateInput: Date;
  endDateInput: Date;
}): Promise<{
  priceByDay: number;
  durationDays: number;
  totalPrice: number;
}> => {
  // Arrondir les dates à l'heure la plus proche
  const startDate = roundToNearestHour(startDateInput);
  const endDate = roundToNearestHour(endDateInput);

  // Validation des dates
  if (startDate >= endDate) {
    throw new Error("La date de début doit être antérieure à la date de fin.");
  }

  // Récupérer les informations du véhicule
  const vehicle = await db
    .select()
    .from(vehicles)
    .where(eq(vehicles.id, vehicleId));
  if (!vehicle) {
    throw new Error("Véhicule introuvable.");
  }

  const basePrice = parseFloat(vehicle[0].basePrice);
  if (!basePrice || isNaN(basePrice)) {
    throw new Error("Le tarif de base du véhicule est invalide.");
  }

  // Calcul de la durée en heures
  const durationMs = endDate.getTime() - startDate.getTime();
  const durationHours = Math.ceil(durationMs / (1000 * 60 * 60)); // Arrondi à l'heure supérieure

  // Calcul de la durée en jours (chaque jour commencé compte)
  const durationDays = Math.ceil(durationHours / 24);

  // Récupérer les périodes tarifaires applicables
  const periods = await db
    .select()
    .from(pricePeriods)
    .where(eq(pricePeriods.vehicleId, vehicleId));
  const applicablePeriods = periods.filter(
    (period) =>
      startDate < new Date(period.endDate) &&
      endDate > new Date(period.startDate),
  );

  // Calcul du coefficient maximal applicable
  let maxCoefficient = 1;
  for (const period of applicablePeriods) {
    maxCoefficient = Math.max(maxCoefficient, parseFloat(period.coefficient));
  }

  // Calcul du prix final
  const priceByDay = basePrice * maxCoefficient;
  const totalPrice = priceByDay * durationDays;

  return {
    priceByDay,
    durationDays,
    totalPrice,
  };
};
