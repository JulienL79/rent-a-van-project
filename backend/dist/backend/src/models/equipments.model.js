import { db } from "../config/pool.js";
import { equipments } from "../schemas/index.js";
import { logger } from "../utils/index.js";
import { eq, or } from "drizzle-orm";
export const equipmentsModel = {
  create: async (equipment) => {
    try {
      const nameExists = await db
        .select()
        .from(equipments)
        .where(eq(equipments.name, equipment.name))
        .execute();
      const iconExists = await db
        .select()
        .from(equipments)
        .where(eq(equipments.icon, equipment.icon))
        .execute();
      if (nameExists.length > 0 || iconExists.length > 0) {
        throw new Error("Un équipement existe déjà avec ce nom ou cet icône.");
      }
      return await db
        .insert(equipments)
        .values(equipment)
        .returning({ id: equipments.id })
        .execute();
    } catch (error) {
      logger.error("Impossible de créer l'équipement:", error);
      throw new Error("L'équipement n'a pas pu être créé.");
    }
  },
  delete: async (id) => {
    try {
      return await db.delete(equipments).where(eq(equipments.id, id)).execute();
    } catch (error) {
      logger.error("Impossible de supprimer l'équipement: ", error);
      throw new Error("L'équipement ne peut pas être supprimé");
    }
  },
  update: async (id, equipment) => {
    try {
      const existingEquipments = await db
        .select()
        .from(equipments)
        .where(
          or(
            eq(equipments.name, equipment.name),
            eq(equipments.icon, equipment.icon),
          ),
        )
        .execute();
      if (existingEquipments.length > 0) {
        throw new Error("Une equipment existe déjà avec ces attributs.");
      }
      return await db
        .update(equipments)
        .set(equipment)
        .where(eq(equipments.id, id))
        .execute();
    } catch (error) {
      logger.error("Impossible d'update l'équipement: ", error);
      throw new Error("L'équipement ne peut pas être màj");
    }
  },
  get: async (id) => {
    try {
      return await db
        .select()
        .from(equipments)
        .where(eq(equipments.id, id))
        .execute();
    } catch (error) {
      logger.error("Impossible de récupérer l'équipement: ", error);
      throw new Error("L'équipement ne peut pas être récupéré");
    }
  },
  getAll: async () => {
    try {
      return await db.select().from(equipments).execute();
    } catch (error) {
      logger.error(`Impossible de récupérer les equipements: `, error);
      return [];
    }
  },
};
