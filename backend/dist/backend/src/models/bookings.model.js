import { db } from "../config/pool.js";
import { bookings } from "../schemas/index.js";
import { logger } from "../utils/index.js";
import { and, eq, gte, lte, or } from "drizzle-orm";
export const bookingsModel = {
  create: async (ownerData, vehicleData, renterData, bookingData, amount) => {
    try {
      return await db
        .insert(bookings)
        .values({
          ...bookingData,
          renterId: renterData.id,
          renterName: `${renterData.firstname} ${renterData.lastname}`,
          ownerName: `${ownerData.firstname} ${ownerData.lastname}`,
          ownerAddressStreet: ownerData.addressStreet,
          ownerAddressZip: ownerData.addressZip,
          ownerAddressCity: ownerData.addressCity,
          ownerAddressCountry: ownerData.addressCountry,
          vehiclePlate: vehicleData.registrationPlate,
          amount: amount,
        })
        .returning({
          id: bookings.id,
        })
        .execute();
    } catch (error) {
      logger.error("Impossible de créer la réservation:", error);
      throw new Error("La réservation n'a pas pu être créée");
    }
  },
  delete: async (id) => {
    try {
      return await db.delete(bookings).where(eq(bookings.id, id)).execute();
    } catch (error) {
      logger.error("Impossible de supprimer la réservation: ", error);
      throw new Error("La réservation ne peut pas être supprimé");
    }
  },
  update: async (id, booking) => {
    try {
      return await db
        .update(bookings)
        .set(booking)
        .where(eq(bookings.id, id))
        .execute();
    } catch (error) {
      logger.error("Impossible d'update la réservation: ", error);
      throw new Error("La réservation ne peut pas être màj");
    }
  },
  getAllByRenter: async (userId) => {
    try {
      return await db.query.bookings.findMany({
        where: eq(bookings.renterId, userId),
      });
    } catch (error) {
      logger.error(
        `Impossible de récupérer les véhicules de ${userId}: +`,
        error,
      );
      return [];
    }
  },
  getAllByOwner: async (userId) => {
    try {
      return await db.query.bookings.findMany({
        where: eq(bookings.ownerId, userId),
      });
    } catch (error) {
      logger.error(
        `Impossible de récupérer les véhicules de ${userId}: +`,
        error,
      );
      return [];
    }
  },
  getAllByVehicle: async (vehicleId) => {
    try {
      return await db.query.bookings.findMany({
        where: eq(bookings.vehicleId, vehicleId),
      });
    } catch (error) {
      logger.error(
        `Impossible de récupérer les véhicules de ${vehicleId}: +`,
        error,
      );
      return [];
    }
  },
  findByDatesAndVehicle: async (startDate, endDate, vehicleId) => {
    try {
      return await db.query.bookings.findMany({
        where: and(
          eq(bookings.vehicleId, vehicleId),
          or(
            and(
              gte(bookings.startDate, startDate),
              lte(bookings.startDate, endDate),
            ),
            and(
              gte(bookings.endDate, startDate),
              lte(bookings.endDate, endDate),
            ),
            and(
              lte(bookings.startDate, startDate),
              gte(bookings.endDate, endDate),
            ),
          ),
        ),
      });
    } catch (error) {
      logger.error(
        "Impossible de récupérer les réservations par dates et véhicule: ",
        error,
      );
      throw new Error("Les réservations ne peuvent pas être récupérées");
    }
  },
  get: async (id) => {
    try {
      return await db.query.bookings.findFirst({
        where: eq(bookings.id, id),
      });
    } catch (error) {
      logger.error("Impossible de récupérer la réservation: ", error);
      throw new Error("La réservation ne peut pas être récupérée");
    }
  },
  getAll: async () => {
    try {
      return await db.query.bookings.findMany({
        columns: {
          id: true,
          ownerId: true,
          renterId: true,
          vehicleId: true,
          createdAt: true,
          status: true,
          amount: true,
        },
      });
    } catch (error) {
      logger.error(`Impossible de récupérer les véhicules: `, error);
      return [];
    }
  },
};
