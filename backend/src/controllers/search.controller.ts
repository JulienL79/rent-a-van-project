import { Request, Response } from "express";
import { calculateReservationPrice, searchVehicles } from "../utils/index.js";
import { APIResponse, logger, zodFieldErrors } from "../utils/index.js";
import { searchValidation } from "@rent-a-van/shared/validators/index.js";
import { z } from "zod";
import { geoService } from "../services/index.js";

export const searchController = {
  searchVehicles: async (request: Request, response: Response) => {
    try {
      const { locationCode, radius, startDate, endDate, type } =
        searchValidation.parse(request.body);

      logger.info(
        `[GET] Recherche de véhicule disponibles avec les paramètres suivants : ${type}-${locationCode}-${startDate}-${endDate}-${radius}`,
      );

      const coordinates = await geoService.getCoordinatesByCode(locationCode);
      if (!coordinates || coordinates.length !== 2) {
        throw new Error("Coordonnées invalides");
      }

      const [lat, lon] = coordinates;

      // Effectuer la recherche
      const vehicles = await searchVehicles({
        startDateInput: startDate,
        endDateInput: endDate,
        cityCoordinates: {
          latitude: Number(lat),
          longitude: Number(lon),
        },
        radius: radius,
        category: type,
      });

      // Ajouter le prix total pour chaque véhicule
      const vehiclesWithPrices = await Promise.all(
        vehicles.map(async (vehicle) => {
          const bookingPrice = await calculateReservationPrice({
            vehicleId: vehicle.id,
            startDateInput: startDate,
            endDateInput: endDate,
          });

          return {
            ...vehicle,
            ...bookingPrice, // Ajouter le prix total au véhicule
          };
        }),
      );

      APIResponse(response, vehiclesWithPrices, "OK");
    } catch (error: any) {
      logger.error(
        `Erreur lors de la récupération des réservations de l'utilisateur cible: `,
        error,
      );
      if (error instanceof z.ZodError) {
        return APIResponse(
          response,
          zodFieldErrors(error),
          "Le formulaire est invalide",
          400,
        );
      }
      APIResponse(
        response,
        null,
        "Erreur lors de la récupération des réservations",
        500,
      );
    }
  },
};
