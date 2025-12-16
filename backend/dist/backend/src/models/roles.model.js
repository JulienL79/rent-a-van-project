import { db } from "../config/pool.js";
import { roles } from "../schemas/index.js";
import { logger } from "../utils/index.js";
import { eq } from "drizzle-orm";
export const rolesModel = {
  create: async (role) => {
    try {
      return await db
        .insert(roles)
        .values(role)
        .returning({
          id: roles.id,
        })
        .execute();
    } catch (error) {
      logger.error("Impossible de créer le role:", error);
      throw new Error("Le role n'a pas pu être créée");
    }
  },
  delete: async (id) => {
    try {
      return await db.delete(roles).where(eq(roles.id, id)).execute();
    } catch (error) {
      logger.error("Impossible de supprimer le role: ", error);
      throw new Error("Le role ne peut pas être supprimé");
    }
  },
  update: async (id, role) => {
    try {
      return await db.update(roles).set(role).where(eq(roles.id, id)).execute();
    } catch (error) {
      logger.error("Impossible d'update le role: +", error);
      throw new Error("Le role ne peut pas être màj");
    }
  },
  get: async (id) => {
    try {
      return await db
        .select({
          name: roles.name,
        })
        .from(roles)
        .where(eq(roles.id, id))
        .execute();
    } catch (error) {
      logger.error("Impossible de récupérer le role: +", error);
      throw new Error("Le role ne peut pas être récupéré");
    }
  },
  getAll: async () => {
    try {
      return await db
        .select({
          name: roles.name,
        })
        .from(roles)
        .execute();
    } catch (error) {
      logger.error(`Impossible de récupérer les roles: `, error);
      return [];
    }
  },
};
