import { db } from "../config/pool.js";
import { vehicles, vehiclesToEquipments } from "../schemas/index.js";
import { logger } from "../utils/index.js";
import { and, eq, inArray } from "drizzle-orm";
export const vehiclesModel = {
  create: async (vehicle) => {
    try {
      return await db
        .insert(vehicles)
        .values(vehicle)
        .returning({
          id: vehicles.id,
        })
        .execute();
    } catch (error) {
      logger.error("Impossible de créer le véhicule:", error);
      throw new Error("Le véhicule n'a pas pu être créée");
    }
  },
  delete: async (id) => {
    try {
      return await db.delete(vehicles).where(eq(vehicles.id, id)).execute();
    } catch (error) {
      logger.error("Impossible de supprimer le véhicule: ", error);
      throw new Error("Le véhicule ne peut pas être supprimé");
    }
  },
  update: async (id, vehicle) => {
    try {
      return await db
        .update(vehicles)
        .set(vehicle)
        .where(eq(vehicles.id, id))
        .execute();
    } catch (error) {
      logger.error("Impossible d'update le véhicule: ", error);
      throw new Error("Le véhicule ne peut pas être màj");
    }
  },
  getAllByUser: async (userId) => {
    try {
      return await db.query.vehicles.findMany({
        where: eq(vehicles.userId, userId),
        columns: {
          id: true,
          brand: true,
          model: true,
          registrationDate: true,
          cityName: true,
          cityCode: true,
          basePrice: true,
          isAvailable: true,
        },
        with: {
          pictures: {
            columns: {
              id: true,
              src: true,
            },
            limit: 1,
          },
          category: {
            columns: {
              name: true,
            },
          },
        },
      });
    } catch (error) {
      logger.error(
        `Impossible de récupérer les véhicules de ${userId}: +`,
        error,
      );
      return [];
    }
  },
  getAllByCategory: async (id) => {
    try {
      return await db.query.vehicles.findMany({
        where: eq(vehicles.categoryId, id),
        columns: {
          id: true,
          brand: true,
          model: true,
          fuelType: true,
          numberOfSeats: true,
          numberOfSleepingPlaces: true,
          gearType: true,
          consumption: true,
          description: true,
          cityName: true,
          cityCode: true,
          latCoordinates: true,
          lonCoordinates: true,
          isAvailable: true,
        },
        with: {
          pictures: {
            columns: {
              id: true,
              src: true,
            },
            limit: 1,
          },
        },
      });
    } catch (error) {
      logger.error(
        `Impossible de récupérer les véhicules de la catégorie ${id}: +`,
        error,
      );
      return [];
    }
  },
  get: async (id) => {
    try {
      return await db.query.vehicles.findFirst({
        where: eq(vehicles.id, id),
        columns: {
          id: true,
          brand: true,
          model: true,
          mileage: true,
          description: true,
          numberOfSeats: true,
          numberOfSleepingPlaces: true,
          length: true,
          height: true,
          weight: true,
          fuelType: true,
          gearType: true,
          consumption: true,
          registrationDate: true,
          cityName: true,
          cityCode: true,
          latCoordinates: true,
          lonCoordinates: true,
          basePrice: true,
          isAvailable: true,
        },
        with: {
          pictures: {
            columns: {
              id: true,
              src: true,
            },
          },
          user: {
            columns: {
              id: true,
              firstname: true,
              lastname: true,
            },
            with: {
              pictures: {
                columns: {
                  id: true,
                  src: true,
                },
              },
            },
          },
          category: {
            columns: {
              id: true,
              name: true,
            },
          },
          vehiclesToEquipments: {
            with: {
              equipment: true,
            },
          },
        },
      });
    } catch (error) {
      logger.error("Impossible de récupérer le véhicule: ", error);
      throw new Error("Le véhicule ne peut pas être récupéré");
    }
  },
  getDetails: async (id) => {
    try {
      return await db.query.vehicles.findFirst({
        where: eq(vehicles.id, id),
        with: {
          pictures: {
            columns: {
              id: true,
              src: true,
            },
          },
          user: {
            columns: {
              id: true,
              firstname: true,
              lastname: true,
            },
            with: {
              pictures: {
                columns: {
                  id: true,
                  src: true,
                },
              },
            },
          },
          category: {
            columns: {
              id: true,
              name: true,
            },
          },
          pricePeriods: true,
          vehiclesToEquipments: {
            with: {
              equipment: true,
            },
          },
        },
      });
    } catch (error) {
      logger.error("Impossible de récupérer le véhicule: +", error);
      throw new Error("Le véhicule ne peut pas être récupéré");
    }
  },
  getAll: async () => {
    try {
      return await db.query.vehicles.findMany({
        columns: {
          id: true,
          brand: true,
          model: true,
          registrationPlate: true,
          cityName: true,
          userId: true,
          createdAt: true,
        },
      });
    } catch (error) {
      logger.error(`Impossible de récupérer les véhicules: `, error);
      return [];
    }
  },
  attachEquipments: async (vehicleId, equipmentIds) => {
    try {
      const values = equipmentIds.map((equipmentId) => ({
        vehicleId,
        equipmentId,
      }));
      await db
        .insert(vehiclesToEquipments)
        .values(values)
        .onConflictDoNothing()
        .execute();
    } catch (error) {
      logger.error(
        "Impossible d'attacher les équipements au véhicule: ",
        error,
      );
      throw new Error(
        "Les équipements ne peuvent pas être attachés au véhicule",
      );
    }
  },
  getEquipments: async (vehicleId) => {
    try {
      const result = await db.query.vehiclesToEquipments.findMany({
        where: eq(vehiclesToEquipments.vehicleId, vehicleId),
        with: {
          equipment: {
            columns: {
              id: true,
              name: true,
              icon: true,
            },
          },
        },
      });
      return result.map((relation) => relation.equipment);
    } catch (error) {
      logger.error("Erreur lors de la récupération des équipements :", error);
      throw new Error("Impossible de récupérer les équipements du véhicule");
    }
  },
  detachEquipments: async (vehicleId, equipmentIds) => {
    try {
      await db
        .delete(vehiclesToEquipments)
        .where(
          and(
            eq(vehiclesToEquipments.vehicleId, vehicleId),
            inArray(vehiclesToEquipments.equipmentId, equipmentIds),
          ),
        )
        .execute();
    } catch (error) {
      logger.error("Erreur lors du détachement des équipements :", error);
      throw new Error("Impossible de détacher les équipements du véhicule");
    }
  },
};
