import { Request, Response } from "express";
import {
  APIResponse,
  calculateReservationPrice,
  logger,
  zodFieldErrors,
} from "../utils/index.js";
import { bookingsModel, userModel, vehiclesModel } from "../models/index.js";
import {
  bookingsRegisterValidation,
  bookingsUpdateValidation,
} from "@rent-a-van/shared/validators/index.js";
import { z } from "zod";
import { db } from "../config/pool.js";
import { eq } from "drizzle-orm";
import { users, vehicles } from "../schemas/index.js";

export const bookingsController = {
  get: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      logger.info(`[GET] Récupérer la réservation avec l'id: ${id}`);

      const booking = await bookingsModel.get(id);
      if (!booking) {
        logger.error("Véhicule inexistant");
        return APIResponse(response, null, "Véhicule inexistant", 400);
      }

      APIResponse(response, booking, "OK");
    } catch (error: any) {
      logger.error("Erreur lors de la récupération de la réservation: ", error);
      APIResponse(
        response,
        null,
        "Erreur lors de la récupération de la réservation",
        500,
      );
    }
  },
  create: async (request: Request, response: Response) => {
    try {
      logger.info("[POST] Créer une réservation"); // Log d'information en couleur

      const bookingData = bookingsRegisterValidation.parse(request.body);
      const { user } = response.locals;

      // Récupération des données du propriétaire
      const owner = await db.query.users.findFirst({
        columns: {
          id: true,
          firstname: true,
          lastname: true,
          addressStreet: true,
          addressCity: true,
          addressZip: true,
          addressCountry: true,
        },
        where: eq(users.id, bookingData.ownerId),
      });

      if (!owner) {
        logger.error("User inexistant");
        return APIResponse(response, null, "User inexistant", 400);
      }

      // Récupération des données du propriétaire
      const renter = await db.query.users.findFirst({
        columns: {
          id: true,
          firstname: true,
          lastname: true,
        },
        where: eq(users.id, user.id),
      });

      if (!renter) {
        logger.error("User inexistant");
        return APIResponse(response, null, "User inexistant", 400);
      }

      // Récupération des données du véhicule
      const vehicle = await db.query.vehicles.findFirst({
        columns: {
          id: true,
          userId: true,
          registrationPlate: true,
        },
        where: eq(vehicles.id, bookingData.vehicleId),
      });

      if (!vehicle) {
        logger.error("Vehicule inexistant");
        return APIResponse(response, null, "Vehicule inexistant", 400);
      }

      if (vehicle.userId !== bookingData.ownerId) {
        logger.error("Vehicule n'appartenant pas à ce propriétaire");
        return APIResponse(
          response,
          null,
          "Vehicule n'appartenant pas à ce propriétaire",
          400,
        );
      }

      const bookingPrice = await calculateReservationPrice({
        vehicleId: vehicle.id,
        startDateInput: new Date(bookingData.startDate),
        endDateInput: new Date(bookingData.endDate),
      });
      const amount = bookingPrice.totalPrice.toFixed(2);

      const booking = await bookingsModel.create(
        owner,
        vehicle,
        renter,
        bookingData,
        amount,
      );
      APIResponse(response, booking, "OK", 201);
    } catch (error: any) {
      logger.error("Erreur lors de la création de la réservation: ", error);
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
        "Erreur lors de la création de la réservation",
        500,
      );
    }
  },
  delete: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      logger.info(`[DELETE] Supprimer la réservation avec l'id: ${id}`);

      const booking = await bookingsModel.get(id);
      if (!booking) {
        logger.error("Véhicule inexistant");
        return APIResponse(response, null, "Véhicule inexistant", 400);
      }

      await bookingsModel.delete(id);
      APIResponse(response, null, "OK", 201);
    } catch (error: any) {
      logger.error("Erreur lors de la suppression de la réservation: ", error);
      APIResponse(
        response,
        null,
        "Erreur lors de la suppression de la réservation",
        500,
      );
    }
  },
  update: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      logger.info(`[UPDATE] Modifier la réservation avec l'id: ${id}`);

      const booking = await bookingsModel.get(id);
      if (!booking) {
        logger.error("Véhicule inexistant");
        return APIResponse(response, null, "Véhicule inexistant", 400);
      }

      const bookingData = bookingsUpdateValidation.parse(request.body);
      const now = new Date();
      bookingData.updatedAt = now;

      await bookingsModel.update(id, bookingData);
      APIResponse(response, null, "OK", 201);
    } catch (error: any) {
      logger.error("Erreur lors de la màj de la réservation: ", error);
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
        "Erreur lors de la màj de la réservation",
        500,
      );
    }
  },
  getAllByOwner: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      logger.info(
        `[GET] Récupérer tous les réservations de l'utilisateur propriétaire : ${id}`,
      ); // Log d'information en couleur

      const user = await userModel.get(id);
      if (!user) {
        logger.error("User inexistant");
        return APIResponse(response, null, "User inexistant", 400);
      }

      const bookings = await bookingsModel.getAllByOwner(id);
      APIResponse(response, bookings, "OK");
    } catch (error: any) {
      logger.error(
        `Erreur lors de la récupération des réservations de l'utilisateur cible: `,
        error,
      );
      APIResponse(
        response,
        null,
        "Erreur lors de la récupération des réservations",
        500,
      );
    }
  },
  getAllByRenter: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      logger.info(
        `[GET] Récupérer tous les réservations de l'utilisateur client : ${id}`,
      ); // Log d'information en couleur

      const user = await userModel.get(id);
      if (!user) {
        logger.error("User inexistant");
        return APIResponse(response, null, "User inexistant", 400);
      }

      const bookings = await bookingsModel.getAllByRenter(id);
      APIResponse(response, bookings, "OK");
    } catch (error: any) {
      logger.error(
        `Erreur lors de la récupération des réservations de l'utilisateur cible: `,
        error,
      );
      APIResponse(
        response,
        null,
        "Erreur lors de la récupération des réservations",
        500,
      );
    }
  },
  getAllByVehicle: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      logger.info(
        `[GET] Récupérer tous les réservations liés au véhicule : ${id}`,
      ); // Log d'information en couleur

      const vehicle = await vehiclesModel.get(id);
      if (!vehicle) {
        logger.error("Vehicule inexistant");
        return APIResponse(response, null, "Vehicule inexistant", 400);
      }

      const bookings = await bookingsModel.getAllByVehicle(id);
      APIResponse(response, bookings, "OK");
    } catch (error: any) {
      logger.error(
        `Erreur lors de la récupération des réservations de l'utilisateur cible: `,
        error,
      );
      APIResponse(
        response,
        null,
        "Erreur lors de la récupération des réservations",
        500,
      );
    }
  },
  getAll: async (request: Request, response: Response) => {
    try {
      logger.info("[GET] Récupérer tous les réservations"); // Log d'information en couleur

      const booking = await bookingsModel.getAll();
      APIResponse(response, booking, "OK");
    } catch (error: any) {
      logger.error("Erreur lors de la récupération des réservations: ", error);
      APIResponse(
        response,
        null,
        "Erreur lors de la récupération des réservations",
        500,
      );
    }
  },
};
