import { db } from "../config/pool.js";
import { categories } from "../schemas/index.js";
import { logger } from "../utils/index.js";
import { eq } from "drizzle-orm";
export const categoriesModel = {
  create: async (category) => {
    try {
      return await db
        .insert(categories)
        .values(category)
        .returning({
          id: categories.id,
        })
        .execute();
    } catch (error) {
      logger.error("Impossible de créer la catégorie:", error);
      throw new Error("La catégorie n'a pas pu être créée");
    }
  },
  delete: async (id) => {
    try {
      return await db.delete(categories).where(eq(categories.id, id)).execute();
    } catch (error) {
      logger.error("Impossible de supprimer la catégorie: ", error);
      throw new Error("La catégorie ne peut pas être supprimé");
    }
  },
  update: async (id, category) => {
    try {
      return await db
        .update(categories)
        .set(category)
        .where(eq(categories.id, id))
        .execute();
    } catch (error) {
      logger.error("Impossible d'update la catégorie: ", error);
      throw new Error("La catégorie ne peut pas être màj");
    }
  },
  get: async (id) => {
    try {
      return await db
        .select({
          name: categories.name,
        })
        .from(categories)
        .where(eq(categories.id, id))
        .execute();
    } catch (error) {
      logger.error("Impossible de récupérer la catégorie: ", error);
      throw new Error("La catégorie ne peut pas être récupéré");
    }
  },
  getByName: async (name) => {
    try {
      return await db
        .select({
          id: categories.id,
        })
        .from(categories)
        .where(eq(categories.name, name))
        .execute();
    } catch (error) {
      logger.error("Impossible de récupérer la catégorie: ", error);
      throw new Error("La catégorie ne peut pas être récupéré");
    }
  },
  getAll: async () => {
    try {
      return await db
        .select({
          name: categories.name,
          id: categories.id,
        })
        .from(categories)
        .execute();
    } catch (error) {
      logger.error(`Impossible de récupérer les categories: `, error);
      return [];
    }
  },
};
