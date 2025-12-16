import { db } from "../config/pool.js";
import { logger } from "../utils/index.js";
import { roles, users, vehicles } from "../schemas/index.js";
import { eq, sql } from "drizzle-orm";
export const userModel = {
  getAll: async () => {
    try {
      const result = await db
        .select({
          id: users.id,
          firstname: users.firstname,
          lastname: users.lastname,
          email: users.email,
          phoneNumber: users.phoneNumber,
          roleName: roles.name,
          vehicleCount: sql`count(${vehicles.id})`,
          createdAt: users.createdAt,
        })
        .from(users)
        .leftJoin(vehicles, eq(users.id, vehicles.userId))
        .leftJoin(roles, eq(users.roleId, roles.id))
        .groupBy(users.id, roles.name);
      return result;
    } catch (error) {
      logger.error("Erreur lors de la récupération des utilisateurs: ", error);
      throw new Error("Impossible de récupérer les utilisateurs");
    }
  },
  get: async (id) => {
    try {
      return await db.query.users.findFirst({
        columns: {
          id: true,
          firstname: true,
          lastname: true,
          phoneNumber: true,
          addressCity: true,
          addressZip: true,
        },
        where: eq(users.id, id),
        with: {
          vehicles: {
            columns: {
              id: true,
              brand: true,
              model: true,
              registrationDate: true,
              isAvailable: true,
            },
            with: {
              category: {
                columns: {
                  name: true,
                },
              },
              pictures: {
                columns: {
                  id: true,
                  src: true,
                },
              },
            },
          },
          pictures: {
            where: (fields, operators) =>
              operators.eq(fields.isProfilePicture, true),
            columns: {
              id: true,
              src: true,
            },
          },
        },
      });
    } catch (error) {
      logger.error("Erreur lors de la récupération de l'utilisateur: ", error);
      throw new Error("Impossible de récupérer l'utilisateur");
    }
  },
  getDetails: async (id) => {
    try {
      return await db.query.users.findFirst({
        columns: {
          id: true,
          firstname: true,
          lastname: true,
          birthdate: true,
          email: true,
          phoneNumber: true,
          createdAt: true,
          drivingLicense: true,
          addressStreet: true,
          addressCity: true,
          addressZip: true,
          addressCountry: true,
        },
        where: eq(users.id, id),
        with: {
          vehicles: {
            columns: {
              id: true,
              brand: true,
              model: true,
              registrationPlate: true,
            },
            with: {
              category: {
                columns: {
                  name: true,
                },
              },
              pictures: {
                columns: {
                  id: true,
                  src: true,
                },
              },
            },
          },
          role: {
            columns: {
              name: true,
            },
          },
          pictures: {
            where: (fields, operators) =>
              operators.eq(fields.isProfilePicture, true),
            columns: {
              id: true,
              src: true,
            },
          },
        },
      });
    } catch (error) {
      logger.error("Erreur lors de la récupération de l'utilisateur: ", error);
      throw new Error("Impossible de récupérer l'utilisateur");
    }
  },
  getCredentials: async (id) => {
    try {
      return await db
        .select({
          password: users.password,
        })
        .from(users)
        .where(eq(users.id, id));
    } catch (error) {
      logger.error("Erreur lors de la récupération de l'utilisateur: ", error);
      throw new Error("Impossible de récupérer l'utilisateur");
    }
  },
  findByCredentials: async (email) => {
    try {
      return await db
        .select({
          id: users.id,
          password: users.password,
          email: users.email,
          firstname: users.firstname,
          lastname: users.lastname,
          tempTokenId: users.tempTokenId,
        })
        .from(users)
        .where(eq(users.email, email));
    } catch (error) {
      logger.error("Erreur lors de la récupération de l'utilisateur: ", error);
      throw new Error("Impossible de récupérer l'utilisateur");
    }
  },
  findByPhoneNumber: async (phoneNumber) => {
    try {
      return await db
        .select({
          id: users.id,
        })
        .from(users)
        .where(eq(users.phoneNumber, phoneNumber));
    } catch (error) {
      logger.error("Erreur lors de la récupération de l'utilisateur: ", error);
      throw new Error("Impossible de récupérer l'utilisateur");
    }
  },
  getRoleByUser: async (id) => {
    try {
      return await db
        .select({
          role: {
            name: roles.name,
          },
        })
        .from(users)
        .leftJoin(roles, eq(users.roleId, roles.id))
        .where(eq(users.id, id))
        .execute();
    } catch (error) {
      logger.error(
        `Erreur lors de la récupération du rôle de l'utilisateur ${id}:`,
        error,
      );
      throw new Error(`Impossible de récupérer le rôle de l'utilisateur ${id}`);
    }
  },
  create: async (user) => {
    try {
      return await db.insert(users).values(user).returning({
        id: users.id,
      });
    } catch (error) {
      logger.error("Erreur lors de la création de l'utilisateur: ", error);
      throw new Error("Impossible de créer l'utilisateur");
    }
  },
  update: async (id, user) => {
    try {
      return await db.update(users).set(user).where(eq(users.id, id));
    } catch (error) {
      logger.error("Erreur lors de la mise à jour de l'utilisateur: ", error);
      throw new Error("Impossible de mettre à jour l'utilisateur");
    }
  },
  delete: async (id) => {
    try {
      return await db.delete(users).where(eq(users.id, id));
    } catch (error) {
      logger.error("Erreur lors de la suppression de l'utilisateur: ", error);
      throw new Error("Impossible de supprimer l'utilisateur");
    }
  },
};
